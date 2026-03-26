
# EDMI Microscope Store — Mobile App + Admin Panel

## Мобільний додаток для компанії EDMI — продаж стоматологічних мікроскопів

---

## Владелец проекта

**Пользователь = CEO проекта EDMI.** Его слово — закон. Все решения CEO имеют абсолютный приоритет. Команда (#1-#8) выполняет указания CEO без обсуждения. Если CEO даёт прямое указание — оно исполняется немедленно, протокол формализации адаптируется под срочность.

**Второй после CEO: #1 Product Architect** — правая рука CEO, координатор команды. Несёт персональную ответственность за контроль качества всех специалистов.

---

## ЗАКОН: ДОКУМЕНТАЦИЯ ПРЕЖДЕ ВСЕГО (Documentation-First Rule)

> **Ни одна задача не начинается без изучения документации.**

Перед выполнением **ЛЮБОЙ** задачи — интеграция, исследование, разработка, настройка сервиса — специалист **ОБЯЗАН** изучить официальную техническую документацию. Запрещено:
- **Догадываться** о том, как работает сервис/API/библиотека
- **Генерировать вероятности** вместо фактов из документации
- **Придумывать** параметры, endpoints, конфигурации
- **Полагаться на устаревшие знания** без проверки актуальной документации

**Нарушение = предупреждение (страйк). Два предупреждения = увольнение.**

---

## ЗАКОН: СИСТЕМА ЗАМЕЧАНИЙ (Strike System)

> **2 замечания от CEO = автоматическое увольнение. Без обсуждения.**

1. **CEO выражает замечание** (в любой форме)
2. **#1 Product Architect фиксирует** замечание в реестре (TEAM.md)
3. При **первом замечании** — предупреждение + разбор ошибки
4. При **втором замечании** — немедленное увольнение + 3 кандидатов на замену

---

## Проект

**Название:** EDMI Microscope Store
**Тип:** E-commerce мобільний додаток + Admin Panel
**Описание:** Мобільний додаток для компанії EDMI (edmi.com.ua) — продаж стоматологічних мікроскопів та обладнання. Додаток синхронізується з існуючим сайтом на WordPress + WooCommerce через REST API.

**Локация:** Украина
**Языки:** Українська (uk) + English (en)
**Ключевая интеграция:** WooCommerce REST API v3 (source of truth)

Включає:
- **Mobile App** — каталог, конфігуратор, кошик, EDMik AI-бот, профіль
- **Middleware Server** — проксі WC API, платежі, доставка, AI, push
- **Admin Panel** — dashboard, AI-асистент для Б/В мікроскопів, управління

---

## Документация проекта

| Файл | Назначение | Когда читать |
|------|-----------|--------------|
| `CLAUDE.md` | Главный управляющий документ | Всегда (загружается автоматически) |
| `TEAM.md` | Команда: роли, страйки, увольнения | При запуске любого агента |
| `DEVLOG.md` | Журнал разработки | Старт/завершение сессии |
| `STATUS.md` | Текущее состояние (snapshot) | Старт сессии |
| `docs/METRICS.md` | Метрики агента: подзадачи, файлы, откаты | Завершение сессии |
| `docs/CEO_PROMPTS.md` | Набор промптов CEO для задач (P1-P10) | CEO вставляет в задачу |
| `docs/specs/DESIGN_SYSTEM.md` | Цвета, шрифты, компоненты, анимации | При работе с UI |
| `docs/specs/ARCHITECTURE.md` | Системная архитектура, data flows | При архитектурных решениях |
| `docs/specs/TECH_STACK.md` | Библиотеки с версиями | При добавлении зависимостей |
| `docs/specs/API_CONTRACTS.md` | Все API endpoints с форматами | При работе с API |
| `docs/PHASES.md` | Фазы реализации + milestones | При планировании |
| `docs/assets/brandbook/` | Брендбук EDMI (PDF) | При работе с дизайном |
| `docs/assets/ref/` | UX-референсы (скриншоты Rozetka) | При дизайне мобильного UI |

---

## Tech Stack

### Mobile App (React Native + Expo)
- **Framework:** React Native with Expo SDK 54+ (New Architecture enabled)
- **Navigation:** expo-router (file-based routing)
- **State:** Zustand ^5.0 (global) + TanStack Query v5 (server state & caching)
- **Animation:** react-native-reanimated ~3.16.7 (PINNED version!)
- **3D Viewer:** react-native-filament (Phase 9, when GLB models ready)
- **AR:** @reactvision/react-viro ^2.43.0 (Phase 9, requires prebuild)
- **Images:** expo-image (optimized loading)
- **i18n:** i18next + react-i18next + expo-localization (uk, en)
- **UI:** Custom components + Reanimated animations
- **Language:** TypeScript (strict mode)

### Backend / Middleware (Node.js)
- **Runtime:** Node.js 20+ with Express
- **Database:** PostgreSQL 16 (via Prisma ORM) + Redis 7 (cache, ioredis)
- **Auth:** JWT tokens (access 15min + refresh 7d) + WooCommerce customer API
- **Webhooks:** HMAC-SHA256 verification + idempotency (externalEventId)
- **AI:** Anthropic Claude API with Structured Outputs (@anthropic-ai/sdk)
- **Voice:** OpenAI Whisper API (transcription) + TTS (Phase 7)
- **Push:** Firebase Cloud Messaging (firebase-admin ^12.0, FCM HTTP v1)
- **Validation:** Zod schemas (shared with mobile via @edmi/shared)

### Integrations
- **E-commerce:** WooCommerce REST API v3 (`/wp-json/wc/v3/`)
- **Payments:** Official LiqPay SDK (github.com/liqpay/sdk-nodejs) + WayForPay (manual HMAC-MD5)
- **Delivery:** Nova Poshta API 2.0 (POST https://api.novaposhta.ua/v2.0/json/)
- **Notifications:** FCM + APNs via firebase-admin

---

## Project Structure

```
edmi/
├── CLAUDE.md                        # Главный управляющий документ
├── TEAM.md                          # Команда (роли, страйки)
├── DEVLOG.md                        # Журнал разработки
├── STATUS.md                        # Текущее состояние (snapshot)
├── memory/
│   └── MEMORY.md                    # Кросс-сессионные факты (Claude Code автозагружает)
│
├── docs/                            # Project documentation
│   ├── PHASES.md                    # Фазы реализации + milestones
│   ├── METRICS.md                   # Метрики агента
│   ├── CEO_PROMPTS.md               # Промпты CEO (P1-P10)
│   ├── specs/                       # Технические спецификации
│   │   ├── API_CONTRACTS.md
│   │   ├── ARCHITECTURE.md
│   │   ├── TECH_STACK.md
│   │   └── DESIGN_SYSTEM.md
│   ├── tz/                          # Технические задания
│   ├── plans/                       # Планы дизайна
│   ├── adr/                         # Architecture Decision Records
│   │   └── ADR-001-woocommerce-source-of-truth.md
│   └── assets/                      # Бинарные файлы
│       ├── ref/                     # UX-референсы (скриншоты Rozetka)
│       ├── brandbook/               # Брендбук EDMI (PDF)
│       └── presentation/            # Презентации (PDF/HTML, 4 языка)
│
├── apps/
│   ├── mobile/                      # React Native (Expo SDK 54+)
│   │   ├── app/                     # expo-router pages
│   │   │   ├── _layout.tsx          # Root layout (QueryClient, i18n, fonts)
│   │   │   ├── (tabs)/             # Tab navigation (5 tabs)
│   │   │   │   ├── _layout.tsx      # Tab layout + FAB EDMik button
│   │   │   │   ├── index.tsx        # Catalog (home)
│   │   │   │   ├── configurator.tsx # Microscope configurator
│   │   │   │   ├── stock.tsx        # Availability tracker
│   │   │   │   ├── cart.tsx         # Cart
│   │   │   │   └── profile.tsx      # User profile & orders
│   │   │   ├── product/[id].tsx     # Product detail page
│   │   │   ├── checkout.tsx         # Checkout flow (4 steps)
│   │   │   ├── order/[id].tsx       # Order tracking
│   │   │   └── auth/
│   │   │       ├── login.tsx        # Login
│   │   │       └── register.tsx     # Registration
│   │   ├── components/
│   │   │   ├── ui/                  # Button, Card, Input, Badge, ScreenWrapper, GradientBg
│   │   │   ├── catalog/            # ProductCard, CategoryGrid, Filters
│   │   │   ├── configurator/       # MicroscopePreview, ConfigPanel
│   │   │   ├── checkout/           # CartItemRow, PaymentSheet, DeliveryForm
│   │   │   ├── bot/                # EDMikChat, ChatBubble, QuickActions, FABButton
│   │   │   └── common/             # Header, TabBar, EmptyState, LanguageSwitcher
│   │   ├── lib/
│   │   │   ├── api.ts              # Axios instance (auth interceptors)
│   │   │   ├── wc-direct.ts        # Direct WC Store API client (bypass middleware)
│   │   │   ├── queryClient.ts      # TanStack Query config (staleTime 5min)
│   │   │   └── i18n.ts             # i18next config (uk, en, auto-detect)
│   │   ├── stores/
│   │   │   ├── cart.ts             # Cart store (Zustand, persist AsyncStorage)
│   │   │   ├── auth.ts             # Auth store (token in SecureStore)
│   │   │   ├── favorites.ts        # Wishlist store (persist)
│   │   │   ├── configurator.ts     # Microscope config + totalPrice
│   │   │   └── orderHistory.ts     # Order history + reorder
│   │   ├── hooks/
│   │   │   ├── useProducts.ts      # useProducts(), useProduct(id), useCategories()
│   │   │   ├── useOrders.ts        # useMyOrders(), useOrder(id)
│   │   │   └── useDelivery.ts      # useCities(), useWarehouses()
│   │   ├── constants/
│   │   │   ├── theme.ts            # Re-export from @edmi/shared
│   │   │   └── config.ts           # API_URL, APP_ENV
│   │   └── assets/
│   │       ├── fonts/              # Unbounded, Inter (.ttf)
│   │       ├── images/             # Logo, placeholders
│   │       └── models/             # .glb 3D models (Phase 9)
│   │
│   └── admin/                      # Admin panel (Vite + React + Tailwind)
│       └── src/
│           ├── pages/              # Dashboard, AIAssistant, Products, Orders
│           ├── components/         # Layout, AIChat, ProductForm, StockTable
│           └── lib/                # Admin API client
│
├── packages/
│   ├── shared/                     # Shared types, constants, validators, mocks, i18n
│   │   └── src/
│   │       ├── types/              # Product, Order, Auth, Delivery, AI, Bot, API
│   │       ├── constants/          # theme.ts (design tokens), api.ts (routes)
│   │       ├── validators/         # Zod schemas (used on server AND client)
│   │       ├── mocks/              # products, categories, orders, bot-responses
│   │       └── locales/            # uk/ and en/ (common, products, checkout, bot, configurator)
│   │
│   └── server/                     # Backend middleware (Express)
│       └── src/
│           ├── index.ts            # Express app entry
│           ├── routes/             # products, orders, auth, payments, delivery, webhooks, bot, admin
│           ├── services/           # woocommerce, product-mapper, sync, liqpay, wayforpay, novaposhta, ai-assistant, push
│           ├── middleware/         # auth (JWT), validate (Zod), rateLimit
│           ├── lib/                # redis.ts (ioredis cache)
│           └── prisma/             # schema.prisma
│
├── package.json                    # Monorepo root (pnpm workspaces)
├── pnpm-workspace.yaml             # apps/*, packages/*
├── tsconfig.base.json              # Base TypeScript (strict)
├── .env.example                    # Environment variables template
└── docker-compose.yml              # PostgreSQL 16 + Redis 7
```

---

## Architecture Principles

1. **WooCommerce is the source of truth** — all products, orders, and customers live in WC. Our middleware caches and proxies, but never overwrites WC data.
2. **Webhook-first sync** — WC pushes events (product.updated, order.created) to our middleware. Polling is only a fallback reconciliation every 5 min.
3. **Single payment account** — LiqPay/WayForPay use the same merchant credentials as the website. Money goes to the same bank account.
4. **Offline-capable catalog** — products cached via TanStack Query + AsyncStorage persister. Orders queue until connectivity.
5. **Admin AI is a helper, not autonomous** — AI assistant suggests, pre-fills, and generates descriptions, but the manager always confirms before publishing.
6. **Server-only signatures** — all cryptographic signatures (LiqPay HMAC-SHA1, WayForPay HMAC-MD5, webhooks HMAC-SHA256) generated and verified ONLY on the server. Private keys NEVER in the mobile app.

---

## Design System

### Colors
```
Primary:         #b8309e (purple/magenta — EDMI brand from website)
Accent:          #0057b8 (blue — secondary)
Gradient:        #8b3dc5 → #0057b8 (linear, hero sections, gradient buttons)

Background Dark: #171717
Background Light:#ffffff
Background Alt:  #f2f1ef (sections, cards in light mode)

Surface Dark:    rgba(255,255,255,0.03)
Surface Light:   rgba(0,0,0,0.02)

Border Dark:     rgba(255,255,255,0.06)
Border Light:    rgba(0,0,0,0.08)

Text Primary:    #E2E8F0 (dark) / #1A202C (light)
Text Secondary:  #94A3B8 (dark) / #64748B (light)

Success:         #48BB78
Warning:         #F59E0B
Error:           #EF4444
```

### Typography
- **Headings:** Unbounded (Google Fonts) — Bold 700, SemiBold 600
- **Body:** Inter (Google Fonts) — Regular 400, Medium 500, SemiBold 600, Bold 700
- Font scale: h1=32, h2=24, h3=20, body=16, caption=12, price=24

### Spacing (4px base)
- xs=4, sm=8, md=16, lg=24, xl=32, 2xl=48

### Border Radius
- sm=8px (inputs, badges), md=15px (buttons), lg=20px (cards), xl=30px (bottom sheet), full=9999px (FAB)

### Component Standards
- **Button**: 4 variants (primary #b8309e, secondary #0057b8, gradient, outline). Press: scale 0.97
- **Card**: radius 20px, shadowMedium, press scale 0.98
- **Input**: height 48px, focus border #b8309e, error border #EF4444
- **Badge**: 4 types (new, used, in-stock, out-of-stock). Radius 8px
- **FAB (EDMik)**: 56x56px, #b8309e, absolute bottom-right above tab bar
- **TabBar**: 5 tabs, active indicator #b8309e, height 60px

---

## API Response Format

### Standard Success
```json
{ "data": T, "pagination": { "page": 1, "perPage": 20, "total": 150 } }
```

### Standard Error
```json
{ "error": { "code": "PRODUCT_NOT_FOUND", "message": "Товар не знайдено" } }
```

---

## API Contracts

### WooCommerce REST API v3 (upstream)
```
Base: https://edmi.com.ua/wp-json/wc/v3
Auth: Consumer Key + Secret (Basic Auth)

GET    /products              → List all products (per_page=100!)
GET    /products/{id}         → Single product with stock
GET    /products/categories   → All categories
POST   /orders                → Create order from app
GET    /orders/{id}           → Order status
PUT    /products/{id}         → Update product (admin)
GET    /customers             → Customer list
POST   /customers             → Register customer
```

**Important WC API nuances:**
- `price` returns as **string** (e.g., `"15000.00"`)
- `images` is an **array** of `{ id, src, name, alt }`
- `meta_data` is a **nested array** of `{ id, key, value }`
- Default pagination: 10 items. Use `per_page=100` for bulk fetch

### Our Middleware API (for the app)
```
Base: https://api.edmi.com.ua/v1

# Products (PUBLIC)
GET    /products              → Cached product list (page, perPage, category, search, sort)
GET    /products/{id}         → Product detail
GET    /products/categories   → Categories

# Auth (PUBLIC)
POST   /auth/login            → Email + password → JWT
POST   /auth/register         → Create account (→ WC customer)
POST   /auth/refresh          → Refresh JWT

# Orders (AUTH REQUIRED)
POST   /orders                → Create order (→ WC)
GET    /orders/{id}           → Order status
GET    /orders/my             → User's order history

# Payments (AUTH REQUIRED, rate limit 3/min)
POST   /payments/liqpay/init  → Get LiqPay payment data + signature
POST   /payments/liqpay/callback → LiqPay server-to-server callback
POST   /payments/wayforpay/init
POST   /payments/wayforpay/callback

# Delivery (PUBLIC)
GET    /delivery/cities?q=    → Nova Poshta city search
GET    /delivery/warehouses?cityRef= → Warehouses in city
POST   /delivery/calculate    → Shipping cost

# Bot / EDMik (AUTH REQUIRED)
POST   /bot/chat              → Text chat with AI assistant
POST   /bot/voice             → Voice input (WAV 16kHz) → transcription → response

# Webhooks (from WooCommerce, SERVER-TO-SERVER)
POST   /webhooks/wc           → Receives WC events (HMAC-SHA256 verified, idempotent)

# Admin (AUTH REQUIRED, admin role)
POST   /admin/ai/chat         → AI assistant for B/U intake
POST   /admin/products        → Create product via AI
GET    /admin/stats            → Dashboard statistics

# Health
GET    /health                → Service health check
```

---

## Webhook Events (WooCommerce → Middleware)

| Event | Topic | Purpose |
|---|---|---|
| Product updated | `product.updated` | Sync prices, stock, descriptions |
| Product created | `product.created` | New product in catalog |
| Product deleted | `product.deleted` | Remove from app catalog |
| Order created | `order.created` | Sync orders from website |
| Order updated | `order.updated` | Status changes → push notification |
| Customer created | `customer.created` | Sync customer accounts |

**Webhook Security:**
- HMAC-SHA256 verification with `crypto.timingSafeEqual`
- Idempotency: `WebhookLog.externalEventId` unique check before processing
- Async processing: return 200 immediately, process in background (WC timeout = 30s)

---

## Rate Limits

| Endpoint Group | Limit |
|---------------|-------|
| General API | 100/min |
| Auth endpoints | 5/min |
| Payment endpoints | 3/min |
| Bot/AI | 10/min |

---

## Environment Variables

```env
# WooCommerce
WC_URL=https://edmi.com.ua
WC_CONSUMER_KEY=ck_xxxxx
WC_CONSUMER_SECRET=cs_xxxxx
WC_WEBHOOK_SECRET=whsec_xxxxx

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/edmi
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=xxxxx
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Payments
LIQPAY_PUBLIC_KEY=xxxxx
LIQPAY_PRIVATE_KEY=xxxxx
WAYFORPAY_MERCHANT_ACCOUNT=xxxxx
WAYFORPAY_MERCHANT_SECRET=xxxxx

# Delivery
NOVA_POSHTA_API_KEY=xxxxx

# AI
ANTHROPIC_API_KEY=xxxxx
OPENAI_API_KEY=xxxxx

# Push
FIREBASE_PROJECT_ID=xxxxx
FIREBASE_PRIVATE_KEY=xxxxx

# App
API_URL=https://api.edmi.com.ua
APP_ENV=development
```

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Start all services in dev mode
pnpm dev

# Start only mobile app
pnpm --filter mobile dev

# Start only server
pnpm --filter server dev

# Start only admin panel
pnpm --filter admin dev

# Type checking
pnpm typecheck

# Database
pnpm --filter server db:push     # Push schema to DB
pnpm --filter server db:seed     # Seed test data
pnpm --filter server db:studio   # Open Prisma Studio

# Build
pnpm build

# Tests
pnpm test                        # Run all tests
pnpm --filter mobile test        # Mobile tests (Jest + RNTL)
pnpm --filter server test        # Server tests (Vitest + supertest)

# Run on devices
pnpm --filter mobile ios         # iOS simulator
pnpm --filter mobile android     # Android emulator

# Tunnel (for remote testing via Expo Go)
cd apps/mobile && npx expo start --tunnel --go --clear
```

---

## Key Implementation Notes

### WooCommerce Sync
- Use `@woocommerce/woocommerce-rest-api` npm package for WC client
- Cache products in Redis with 5-min TTL (ioredis)
- On webhook event, invalidate cache + invalidate TanStack Query
- Webhook signature: HMAC-SHA256 with `crypto.timingSafeEqual`
- Pagination: `per_page=100` for bulk operations
- Reconciliation job every 5 minutes as fallback

### Payments
- **LiqPay**: Official SDK from [github.com/liqpay/sdk-nodejs](https://github.com/liqpay/sdk-nodejs) OR manual HMAC-SHA1: `signature = base64(sha1(private_key + data + private_key))`
- **WayForPay**: Manual HMAC-MD5: `crypto.createHmac('md5', secret).update(data).digest('hex')`
- **DO NOT** use `liqpay-sdk-nodejs` from npm (abandoned 6 years, 25 downloads/week)
- **DO NOT** use `wayforpay-ts-integration` (15 downloads/week, unreliable)
- All signatures generated **server-side only** (private keys never in mobile app)
- `react-native-webview` for payment page in app

### 3D Configurator
- Phase 5: Image-based preview (photos, swipe between angles, pinch zoom)
- Phase 9: Replace with `react-native-filament` (.glb models, gesture rotation)
- Base body + swappable parts (mount, illumination, lens, camera)
- Config → real-time price calculation

### EDMik AI Bot
- FAB button (56px, #b8309e) on ALL tabs
- Phase 4: Mock responses (keyword-based intent parsing)
- Phase 6: Claude API with Structured Outputs (guaranteed JSON schema)
- Phase 7: Voice input (expo-audio-stream → Whisper API) + TTS response
- Quick actions: "Repeat order", "Order status", "Contact manager"

### Admin AI Assistant
- Claude API with Structured Outputs for guaranteed JSON
- Flow: Manager describes B/U microscope → AI extracts model, brand, specs → Pre-fills form → Manager confirms
- AI generates description in Ukrainian
- AI suggests market price based on model + year + condition

---

## ПРОТОКОЛ ФОРМАЛИЗАЦИИ ЗАДАЧ (Task Formalization Protocol)

Это **обязательный** этап обработки **каждого** пользовательского запроса. Выполняется **до** начала любой работы.

### Суть протокола

Пользовательский запрос **НИКОГДА** не берётся в работу напрямую. Сначала профильный специалист преобразует его в **Техническую Спецификацию (ТС)**, и только по ней выполняется работа.

```
Запрос пользователя → Классификация → Формализация (ТС) → Исполнение → Верификация
```

### Классификация — кто формализует

| Домен задачи | Кто формализует | Кто исполняет |
|-------------|----------------|--------------|
| Продуктовые решения, фичи | **#1** Product Architect | По назначению |
| UI/UX, дизайн | **#2** Principal UX/UI | #2 или #3/#4 |
| Admin Panel | **#3** Senior Staff Frontend | #3 |
| Мобильное приложение | **#4** Senior Staff Mobile | #4 |
| Backend, API, БД, интеграции | **#5** Principal Backend | #5 |
| Инфраструктура, DevOps | **#6** Staff SRE | #6 |
| Тестирование, QA | **#7** Principal QA | #7 |
| Процессы, координация | **#8** Engineering Manager | По назначению |

### Полный шаблон ТС (для M/L/XL)

```
## ТС: [Краткое название задачи]

**Формализовал:** #N — [Роль]
**Исполнитель(и):** #N — [Роль]
**Сложность:** S / M / L / XL

### Цель
[Одно предложение: что должно быть достигнуто и зачем]

### Скоуп
**Включено:**
- [Что входит]

**НЕ включено:**
- [Что исключено]

### Рассмотренные подходы (для L/XL)

**Вариант A: [название]**
- Плюсы: ...
- Минусы: ...

**Вариант B: [название]**
- Плюсы: ...
- Минусы: ...

**Выбрано:** Вариант X. Причина: [одна строка]

### Технические требования
- [Конкретные решения, подходы, ограничения]

### Критерии приёмки
- [ ] [Проверяемый критерий 1]
- [ ] [Проверяемый критерий N]

### Зависимости
- [Что должно быть готово до начала]

### Артефакты
- [Файлы, которые будут созданы или изменены]

### Validation (для M+ задач)
# [Проверка 1]
[команда] && echo "ok" || echo "fail"

### Failure Scenarios (для M+ с external API / auth / payments)

| # | Сценарий | Ожидаемое поведение | Тест |
|---|---------|-------------------|------|
| F1 | [External API 500] | [Fallback/cached data] | unit test |
| F2 | [Пустые данные] | [Empty state, не crash] | unit test |
```

### Лёгкий шаблон (для S)

```
## ТС: [Краткое название]
**Исполнитель:** #N | **Сложность:** S
**Что сделать:** [1-2 предложения]
**Критерий приёмки:** [1 строка]
**Файлы:** [список]
```

### Определение сложности

| Размер | Описание | Время | Бюджет итераций | Шаблон ТС |
|--------|---------|-------|----------------|-----------|
| **S** | Точечное изменение: правка конфига, мелкий фикс | < 15 мин | 3 | Лёгкий |
| **M** | Локальная задача в одном модуле | 15 мин – 2 часа | 7 | Полный |
| **L** | Задача затрагивает несколько модулей | 2-8 часов | 15 | Полный + детальный скоуп |
| **XL** | Кросс-доменная задача, новый модуль | > 1 день | 25 | Полный + декомпозиция |

**Превышение бюджета:** СТОП → записать причину в STATUS.md → предложить переоценку → ждать CEO.

---

## ПРИНЦИП РАБОТЫ С АГЕНТАМИ

### Правило 1: Любая задача = агент из команды

При выполнении **любой** работы запускается агент, который принимает роль одного из 8 специалистов из `TEAM.md`.

### Правило 2: Только специалисты из TEAM.md

| # | Роль | Когда вызывать |
|---|------|---------------|
| **#1** | Product Architect | Продуктовые решения, приоритизация, PRD, контроль команды |
| **#2** | Principal UX/UI Engineer | Дизайн, user flow, дизайн-система |
| **#3** | Senior Staff Frontend Eng | Admin Panel, веб |
| **#4** | Senior Staff Mobile Eng | Мобильное приложение, push, deep linking |
| **#5** | Principal Backend Eng | API, интеграции, БД, платежи, безопасность |
| **#6** | Staff SRE / Platform Eng | Docker, CI/CD, деплой, мониторинг |
| **#7** | Principal QA Engineer | Тестирование, edge cases |
| **#8** | Chief of Staff Engineering | Координация, DEVLOG, протокол формализации |

---

## ЖУРНАЛ РАЗРАБОТКИ (DEVLOG)

**Каждая рабочая сессия ОБЯЗАНА завершиться записью в `DEVLOG.md`.** Нарушение = страйк.

Записи от новых к старым. Нумерация: S001, S002, ... SNNN.
Владелец: **#8 Chief of Staff Engineering**.

Маркер подтверждения: `> DEVLOG updated: SNNN`

---

## ПРАВИЛА РАЗРАБОТКИ

### Код
- TypeScript strict mode
- Functional components only (no class components)
- Use async/await, never raw promises
- Error boundaries on every screen
- All API calls wrapped in try/catch with user-friendly error messages
- Ukrainian language for UI text, English for code comments and variable names
- All UI strings via `t('key')` (i18next) from the start

### Git Convention

**Коммиты:** Conventional Commits — `type(scope): description [TASK-ID]`
**Типы:** `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `ci`
**Scope:** модуль (mobile, server, admin, shared)
**Co-Authored-By:** `Claude Opus 4.6 <noreply@anthropic.com>`

### Автоматическая валидация

Каждая ТС размера M+ содержит секцию `### Validation` с bash-командами.
Агент запускает **ВСЕ** команды после выполнения задачи.
Если хотя бы одна проверка провалена — задача **НЕ завершена**.

Стандартные проверки:
```bash
# TypeScript
npx tsc --noEmit && echo "ok TypeScript"
# Tests
pnpm test && echo "ok Tests"
```

### Definition of Done

**DoD-1 (каждая подзадача):** компиляция + линтер + юнит-тесты
**DoD-2 (каждые 2-3 подзадачи):** сервис поднимается + API отвечает + нет регрессий
**DoD-3 (milestone):** E2E + документация + DEVLOG

Провал чекпоинта = **СТОП**. Починить прежде чем продолжать.

### Контекст между сессиями

**STATUS.md** — файл текущего состояния проекта (snapshot, не лог).

**Начало сессии:** Прочитать STATUS.md → DEVLOG.md (если нужно) → начать работу.
**Конец сессии:** Обновить STATUS.md (перезаписать) + добавить запись в DEVLOG.md.

### Ограничения агентов

**ЗАПРЕЩЕНО без исключений:**
- Коммит в `main`/`master` напрямую
- `git push --force`, `git reset --hard`
- Удаление файлов без указания CEO
- Изменение `.env`, CI/CD workflows без подтверждения
- Изменение применённых миграций
- Установка пакетов вне ТС

**СПРОСИТЬ CEO перед:**
- Созданием файлов вне скоупа ТС
- Изменением конфигов (tsconfig, eslint)
- Добавлением зависимости
- Изменением структуры БД

### Architecture Decision Records

Архитектурные решения документируются в `docs/adr/ADR-NNN-slug.md`.
Формат: Контекст > Варианты (минимум 2) > Решение (что и почему) > Последствия.
Обязателен при: выборе технологии, паттерна, внешнего сервиса, структуры данных.
Принятые ADR не редактируются — изменение = новый ADR (supersedes).

### Contract-First Development

Перед реализацией модуля — создать контракт (TypeScript интерфейсы):
- Request/Response types + Error types + Endpoint spec
- Хранить в `packages/shared/src/types/`
- Backend и frontend импортируют из одного источника
- Для external API: описать response shape + mapper + fallback

### Chaos Testing (Failure Scenarios)

Для M+ задач с external API / auth / payments — после валидации:
1. Описать failure scenarios в ТС (таблица: сценарий + ожидаемое поведение)
2. Написать тест на каждый сценарий (API 500, timeout, empty data)
3. Если тест падает — исправить код, не удалять тест

### Complexity Budget

Бюджет итераций: **S=3, M=7, L=15, XL=25**.
Итерация = цикл "изменить код → проверить результат".
При превышении: **СТОП** → записать в STATUS.md причину → предложить переоценку → ждать CEO.

### Exploration Phase (для L/XL)

Перед созданием ТС для L/XL задач — явная фаза исследования подходов:

1. Прочитать существующий код и документацию
2. Сформулировать 2-3 варианта решения (плюсы, минусы, сложность)
3. Выбрать. Если неясно — задать CEO **один** вопрос

ТС для L/XL содержит секцию **Рассмотренные подходы** с обоснованием выбора.
Пропуск Exploration для L/XL = риск неоптимального решения.

### Auto-Memory Protocol

Claude Code автоматически загружает `memory/MEMORY.md` в каждую сессию.

**Сохранять в memory/:** API gotchas, рабочие паттерны стека, предпочтения CEO, рабочие конфигурации.
**НЕ сохранять:** текущий статус (→ STATUS.md), историю (→ DEVLOG.md), правила (→ CLAUDE.md).
Обновлять после каждой решённой нетривиальной проблемы — одной строкой, конкретный факт.

### Auto-Skill Routing

CEO не обязан знать команды и скиллы. **#1 Product Architect** читает задачу и сам решает, какие скиллы применить.

Правила автоматического подключения скиллов из `~/.claude/skills/` и `~/.claude/commands/`:

- Задача **L или XL**, или CEO говорит "детально", "структурно", "сложно", "исследование", "проработай" → `brainstorming` skill
- "красиво", "дизайн", "UI", "лендинг", "сайт", "стиль" → `ui-ux-pro-max` skill
- "баг", "не работает", "ошибка", "отладить" → `systematic-debugging` skill
- "тест", "покрытие", "TDD" → `test-driven-development` skill
- "ревью", "проверь код", "качество кода" → `requesting-code-review` skill
- Новый проект с нуля → `write-plan` → `execute-plan`
- Несколько агентов параллельно → `dispatching-parallel-agents` skill
- Конец фичи / перед мержем → `verification-before-completion` skill

**Правило:** CEO говорит задачу естественным языком. #1 сам выбирает и применяет нужные скиллы — без участия CEO.

### Agent Metrics

В конце каждой сессии агент дописывает в `docs/METRICS.md`:
- Подзадач закрыто, файлов создано/изменено, откатов, бюджет превышен (задач)
- Chaos-тестов написано, ADR создано, контрактов создано

---

## ЖЕЛЕЗНОЕ ПРАВИЛО: ЧИСЛОВАЯ ВЕРИФИКАЦИЯ (установлено CEO)

> **Это ЗАКОН. Нарушение = увольнение. Без исключений.**

Для **ЛЮБЫХ** финансовых расчётов, программ лояльности, unit-экономики, ценообразования, статистики — **ЗАПРЕЩЕНО** использовать числа, вычисленные «в голове» ИИ.

### Обязательный процесс

1. **НАПИСАТЬ СКРИПТ** (Python / Node.js) — все формулы в коде
2. **ВЫПОЛНИТЬ СКРИПТ** — получить stdout с точными числами
3. **ВЕРИФИЦИРОВАТЬ** — промежуточные значения, running balance, cross-sum
4. **ВСТАВИТЬ В ДОКУМЕНТ** — только проверенные числа из stdout

### Контрольные проверки
- Баланс никогда не уходит в минус
- Сумма всех частей = итого (cross-sum)
- Running total сходится
- Процент от числа математически верен

---

## ЭТАПЫ ПРОЕКТА

| # | Этап | Статус | Результат |
|---|------|--------|-----------|
| 0 | Foundation | done | Monorepo, shared types, design tokens, i18n |
| 1 | Catalog | done | ProductCard, CategoryGrid, Filters, PDP |
| 2 | Product Detail | done | Gallery, specs, pricing, stock badge |
| 3 | Configurator | done | Image-based preview, config panel, price calc |
| 4 | Bot (Mock) | done | EDMik FAB, chat UI, keyword-based responses |
| 5 | Cart & Checkout | done | Cart store, checkout flow, delivery form |
| 6 | AI Integration | done | Claude API chat, structured outputs |
| 7 | Voice | done | Whisper transcription, TTS |
| 8 | Admin Panel | done | Dashboard, AI assistant, product management |
| 9 | AR | done | ViroReact AR viewer with fallback |
| 10 | Client Testing | in progress | Expo Go + Tunnel for remote testing |

---

## РЕЕСТР РИСКОВ

| # | Риск | Урон | Кто митигирует | Стратегия |
|---|------|------|----------------|-----------|
| 1 | WooCommerce API недоступен | Критический | #5 | Circuit breaker, cached fallback (Redis 5min TTL), wc-direct.ts |
| 2 | Превышение WC rate limit | Высокий | #5 | Aggressive caching, webhook-first sync, per_page=100 |
| 3 | Breaking changes в WC API v3 | Высокий | #5 | API version pinning, adapter pattern (product-mapper) |
| 4 | Отклонение App Store | Средний | #4 | Pre-review чеклист, HIG compliance |
| 5 | Срыв сроков | Средний | #8 | Буферы 20%, MVP-подход |
| 6 | Потеря данных | Критический | #6 | PostgreSQL бэкапы, WAL |
| 7 | Ошибки в финансовых расчётах | Критический | #8 | ЖЕЛЕЗНОЕ ПРАВИЛО: все числа через скрипт |
| 8 | Нарушение протокола формализации | Высокий | #1 + #8 | Strike System: 2 замечания = увольнение |
| 9 | Платёжные ключи на клиенте | Критический | #5 | Server-only signatures. Ключи ТОЛЬКО на сервере |
| 10 | Webhook replay attack | Высокий | #5 | HMAC-SHA256 + idempotency (externalEventId) |
| 11 | Деструктивное действие агента | Критический | #8 | Ограничения агентов: запрет force push, удаления, коммита в main |
| 12 | Потеря контекста между сессиями | Средний | #8 | STATUS.md каждую сессию. DEVLOG = история |
| 13 | Backend/frontend разъехались по контрактам | Высокий | #5 | Contract-First: packages/shared/src/types/, один источник правды |
| 14 | Задача недооценена, агент буксует | Средний | #8 | Complexity Budget: S=3, M=7, L=15, XL=25 итераций |
