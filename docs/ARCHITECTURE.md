# Архітектура EDMI

## 1. Системна архітектура

```
┌─────────────────────┐      ┌──────────────────────┐      ┌─────────────────────┐
│   Mobile App        │      │   Middleware Server   │      │   WooCommerce       │
│   (Expo SDK 54+)    │◄────►│   (Express + Node)   │◄────►│   (WordPress)       │
│                     │ REST │                      │ REST │   edmi.com.ua       │
│  Каталог            │      │  REST API            │      │                     │
│  Конфігуратор       │      │  Webhook listener    │      │  Products           │
│  Наявність          │      │  Auth (JWT)          │      │  Orders             │
│  Кошик + Checkout   │      │  AI (Claude)         │      │  Customers          │
│  EDMik бот          │      │  Payment proxy       │      │  Categories         │
│  Профіль            │      │  Delivery proxy      │      │                     │
└─────────────────────┘      └──────────┬───────────┘      └──────────┬──────────┘
                                        │                             │
                             ┌──────────┴───────────┐                 │ Webhooks
                             │                      │                 │ (6 events)
                      ┌──────┴──────┐      ┌───────┴──────┐          │
                      │ PostgreSQL  │      │    Redis     │◄─────────┘
                      │  16         │      │    7         │
                      │  (Prisma)   │      │  (ioredis)   │
                      │             │      │              │
                      │ Users       │      │ Products     │
                      │ Orders      │      │   TTL: 5min  │
                      │ WebhookLog  │      │ Sessions     │
                      │ SyncState   │      │              │
                      │ Reorder     │      │              │
                      └─────────────┘      └──────────────┘
```

### Зовнішні сервіси

```
Middleware Server
    │
    ├──► LiqPay API          — Платежі (HMAC-SHA1, server-only)
    ├──► WayForPay API       — Платежі (HMAC-MD5, server-only)
    ├──► Nova Poshta API 2.0 — Доставка (POST JSON)
    ├──► Claude API          — AI-асистент EDMik + Admin (Structured Outputs)
    ├──► OpenAI Whisper API  — Транскрипція голосу (Phase 7)
    ├──► OpenAI TTS API      — Синтез мови uk-UA (Phase 7, fallback)
    └──► Firebase FCM        — Push-сповіщення (HTTP v1)
```

---

## 2. Монорепо структура

```
edmi/
├── apps/
│   ├── mobile/          # React Native (Expo SDK 54+)
│   └── admin/           # React web app (Vite + Tailwind)
├── packages/
│   ├── shared/          # Types, constants, validators, mocks, i18n
│   └── server/          # Express middleware server
├── package.json         # Root monorepo config
├── pnpm-workspace.yaml  # pnpm workspaces: apps/*, packages/*
└── docker-compose.yml   # PostgreSQL 16 + Redis 7
```

### Залежності між пакетами

```
@edmi/shared ─────► apps/mobile     (types, constants, validators, mocks, locales)
       │
       ├──────────► packages/server  (types, constants, validators)
       │
       └──────────► apps/admin       (types, constants)
```

- `@edmi/shared` — незалежний пакет, без зовнішніх залежностей
- Усі інші пакети імпортують з `@edmi/shared`
- Зміни в shared автоматично доступні всім пакетам

---

## 3. Потоки даних

### 3.1 Синхронізація товарів (Product Sync)

```
WooCommerce ──webhook POST──► Middleware Server
                                    │
                          ┌─────────┴──────────┐
                          │  1. Verify HMAC     │
                          │     SHA256          │
                          │  2. timingSafeEqual │
                          └─────────┬──────────┘
                                    │
                          ┌─────────┴──────────┐
                          │  3. Check           │
                          │     idempotency     │
                          │     (externalEventId│
                          │      in WebhookLog) │
                          └─────────┬──────────┘
                                    │
                     ┌──────────────┼──────────────┐
                     │              │              │
               Already seen?    New event     Return 200
               → skip, 200         │          immediately
                                   │          (async process)
                          ┌────────┴─────────┐
                          │  4. Invalidate    │
                          │     Redis cache   │
                          │  5. Update        │
                          │     PostgreSQL    │
                          │  6. Log to        │
                          │     WebhookLog    │
                          └────────┬─────────┘
                                   │
                          ┌────────┴─────────┐
                          │  Mobile app:      │
                          │  TanStack Query   │
                          │  refetch on next  │
                          │  request          │
                          └──────────────────┘

Fallback: Reconciliation job кожні 5 хвилин
  → GET /products?modified_after=last_sync_time
  → Порівняння з кешем → оновлення різниць
```

### 3.2 Потік замовлення (Order Flow)

```
Mobile App
    │
    ├─1─► POST /api/orders
    │         │
    │    Server: валідація Zod → створення WC order → return orderId
    │         │
    ├─2─► POST /api/payments/liqpay/init
    │         │
    │    Server: генерація HMAC-SHA1 підпису → return { data, signature, paymentUrl }
    │         │
    ├─3─► Відкриття WebView з LiqPay сторінкою оплати
    │         │
    │    Користувач оплачує
    │         │
    │    LiqPay ──callback──► POST /api/payments/liqpay/callback
    │                              │
    │                    Server: верифікація підпису
    │                              │
    │                    Server: оновлення WC order status
    │                              │
    │                    Server: FCM push → Mobile
    │         │
    └─4─► Push notification: "Замовлення #456 оплачено"
```

### 3.3 Потік EDMik бота

```
Користувач вводить повідомлення / натискає quick action
    │
    ├──► [Phase 4: Локально] Intent parsing за ключовими словами
    │    ├─ "повтори" / "замов знову" → orderHistory store → показати останнє
    │    ├─ "статус" → orderHistory store → показати статус
    │    ├─ "менеджер" → контактна інформація
    │    └─ "ціна" / "скільки" → redirect на каталог
    │
    ├──► [Phase 6: Сервер] POST /api/bot/chat
    │    ├─ Claude API + Structured Outputs
    │    ├─ System prompt: стоматологічні мікроскопи, каталог, замовлення
    │    └─ Response: { text, actions[], products[] }
    │
    └──► [Phase 7: Голос] POST /api/bot/voice
         ├─ expo-audio-stream → WAV 16kHz mono
         ├─ Server → OpenAI Whisper → транскрипція тексту
         ├─ Текст → Claude → відповідь
         └─ TTS: нативний (iOS/Android) або OpenAI TTS API
```

---

## 4. Принципи архітектури

### 1. WooCommerce — джерело правди
Усі товари, замовлення, клієнти зберігаються у WooCommerce. Middleware кешує та проксує, але **ніколи не перезаписує** дані WC. При конфлікті — серверна (WC) версія перемагає.

### 2. Webhook-first синхронізація
WC надсилає events через webhooks (6 типів). Polling — тільки fallback reconciliation кожні 5 хвилин. Webhook обробка:
- HMAC-SHA256 верифікація
- Ідемпотентність (externalEventId)
- Async обробка (return 200 протягом 5 секунд)

### 3. Єдиний платіжний акаунт
LiqPay/WayForPay використовують ті самі merchant credentials що й сайт. Гроші йдуть на той самий банківський рахунок.

### 4. Offline-capable каталог
- **Продукти**: TanStack Query з `staleTime: 5min` + AsyncStorage persister
- **Замовлення**: queue в AsyncStorage, sync при відновленні мережі
- **Конфлікти**: серверна версія перемагає, toast "Дані оновлено"

### 5. AI — помічник, не автономний
AI асистент пропонує, попередньо заповнює, генерує описи, але менеджер завжди підтверджує перед публікацією.

### 6. Серверні підписи
Усі криптографічні підписи генеруються та верифікуються **ТІЛЬКИ** на сервері:
- LiqPay: HMAC-SHA1
- WayForPay: HMAC-MD5
- Webhooks: HMAC-SHA256
Приватні ключі **НІКОЛИ** не потрапляють у мобільний додаток.

---

## 5. Модель безпеки

### Автентифікація
- **JWT** tokens: access (15 хвилин) + refresh (7 днів)
- Access token у headers: `Authorization: Bearer <token>`
- Refresh token: окремий endpoint POST /auth/refresh
- Зберігання: `expo-secure-store` (encrypted keychain iOS / EncryptedSharedPreferences Android)

### Rate Limiting
| Endpoint Group | Limit | Призначення |
|---------------|-------|------------|
| General API | 100/хв | Захист від abuse |
| Auth endpoints | 5/хв | Захист від brute force |
| Payment endpoints | 3/хв | Захист від fraud |
| Bot/AI | 10/хв | Обмеження витрат API |

### Webhook Security
```
1. Отримати body як raw buffer
2. expected = HMAC-SHA256(body, WC_WEBHOOK_SECRET)
3. received = headers['X-WC-Webhook-Signature']
4. crypto.timingSafeEqual(expected, received) — захист від timing attacks
5. Перевірити externalEventId в WebhookLog — ідемпотентність
6. Return 200 негайно, обробити async
```

### Payment Security
- Приватні ключі **тільки** на сервері (.env)
- `crypto.timingSafeEqual` для порівняння підписів
- Rate limit 3 запити/хв на платіжні endpoints
- Audit log для всіх фінансових операцій
- HTTPS обов'язковий для callbacks

---

## 6. Стратегія Offline

### Продукти
- TanStack Query: `staleTime: 5 * 60 * 1000` (5 хвилин)
- AsyncStorage persister: кеш зберігається між сесіями
- При відсутності мережі → показуємо кешовані дані
- При відновленні → автоматичний refetch

### Замовлення
- Queue в AsyncStorage
- Моніторинг мережі: `expo-network`
- При відновленні з'єднання → відправка черги
- Оптимістичний UI: показуємо "Замовлення створено" одразу

### Кошик та обране
- Zustand stores з persist middleware → AsyncStorage
- Працюють повністю офлайн
- Синхронізація з сервером при наступному онлайн-запиті

### Конфлікти
- **Серверна версія завжди перемагає**
- Toast: "Ціна товару оновлена" / "Товар більше не в наявності"
- Автоматичне оновлення кошика при зміні цін

---

## 7. EAS та Build Strategy

| Фаза | Середовище | Обґрунтування |
|------|-----------|---------------|
| Phase 0-5 | **Expo Go** | Усі використовувані бібліотеки сумісні |
| Phase 7+ | **EAS Development Build** | expo-audio-stream, expo-notifications потребують native модулів |
| Phase 9 | **npx expo prebuild** | ViroReact (AR) потребує нативного коду, не сумісний з Expo Go |

### Перехід на EAS Dev Build
```bash
# Встановити EAS CLI
npm install -g eas-cli

# Налаштувати
eas build:configure

# Dev build для Android
eas build --profile development --platform android

# Dev build для iOS
eas build --profile development --platform ios
```

---

## 8. Деплой інфраструктура

### Server → Railway / Render
- **Runtime**: Node.js 20+, Docker
- **Add-ons**: PostgreSQL 16, Redis 7
- **Environment**: .env з усіма ключами
- **Health check**: GET /health
- **Phase 1.5**: мінімальний сервер (GET /products)
- **Phase 6**: повний сервер (all endpoints)

### Mobile → EAS Build
- **Dev**: Expo Go (Phase 0-5) → EAS Dev Build (Phase 7+)
- **Preview**: EAS preview build для тестування
- **Production**: EAS production build → App Store / Google Play
- **OTA**: expo-updates для hotfixes без перезбірки

### Admin → Vercel
- **Framework**: Vite + React
- **Auto-deploy**: з main branch
- **Phase 8**: перший деплой

### WooCommerce
- REST API key: створити вручну в WC Settings
- 6 webhooks: налаштувати вручну в WC > Settings > Advanced > Webhooks
- Delivery URL: `https://api.edmi.com.ua/v1/webhooks/wc`

---

## 9. Prisma Schema (Phase 6)

```prisma
model User {
  id            String   @id @default(cuid())
  wcCustomerId  Int      @unique
  email         String   @unique
  firstName     String
  lastName      String
  phone         String?
  refreshToken  String?
  createdAt     DateTime @default(now())
  orders        Order[]
  reorderSchedules ReorderSchedule[]
}

model CachedProduct {
  id          Int      @id
  wcId        Int      @unique
  data        Json     // Full product data
  updatedAt   DateTime @updatedAt
}

model Order {
  id          String   @id @default(cuid())
  wcOrderId   Int      @unique
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  status      String
  total       Decimal
  items       Json
  shipping    Json
  payment     Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model WebhookLog {
  id              String   @id @default(cuid())
  externalEventId String   @unique  // Idempotency key
  topic           String
  payload         Json
  processedAt     DateTime @default(now())
}

model SyncState {
  id          String   @id @default(cuid())
  resource    String   @unique // "products", "orders"
  lastSyncAt  DateTime
  cursor      String?
}

model ReorderSchedule {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  productId   Int
  intervalDays Int
  nextReminder DateTime
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```
