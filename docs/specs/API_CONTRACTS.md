# API Контракти EDMI

Повна документація всіх API-контрактів для мобільного додатку EDMI, адмін-панелі та серверного middleware.

---

## Стандарт відповідей (Response Format)

Усі відповіді API дотримуються єдиного формату.

### Success Response
```json
{
  "data": T,
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 150
  }
}
```
`pagination` включається **тільки** для list-ендпоінтів, що повертають колекції.

### Error Response
```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Товар не знайдено"
  }
}
```

### Error Codes
| Code | HTTP | Description |
|------|------|-------------|
| VALIDATION_ERROR | 400 | Невалідні дані запиту |
| UNAUTHORIZED | 401 | Токен відсутній або невалідний |
| FORBIDDEN | 403 | Немає доступу |
| NOT_FOUND | 404 | Ресурс не знайдено |
| RATE_LIMIT | 429 | Перевищено ліміт запитів |
| INTERNAL_ERROR | 500 | Внутрішня помилка сервера |
| WC_ERROR | 502 | Помилка WooCommerce API |

---

## 1. WooCommerce REST API v3 (Upstream)

Base URL: `https://edmi.com.ua/wp-json/wc/v3`
Auth: Basic Auth (Consumer Key + Consumer Secret)

### Важливі нюанси
- `price` повертається як **string** (наприклад `"15000.00"`)
- `images` — **array** об'єктів з `src`, `name`, `alt`
- `meta_data` — **array** об'єктів `{ id, key, value }` (вкладена структура)
- Пагінація: default 10 items, максимум `per_page=100`
- Headers відповіді: `X-WP-Total`, `X-WP-TotalPages`

### Endpoints

#### GET /products

Отримання списку товарів з фільтрацією та пагінацією.

```
Query params:
  per_page: number (1-100, default 10)
  page: number (default 1)
  category: number (category ID)
  search: string
  orderby: "date" | "price" | "title" | "popularity"
  order: "asc" | "desc"
  status: "publish" | "draft"
  stock_status: "instock" | "outofstock"

Response: WCProduct[]
```

#### GET /products/{id}

Отримання одного товару за ID з повною інформацією про наявність.

```
Response: WCProduct
```

#### WCProduct type (key fields):
```typescript
interface WCProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable";
  status: "publish" | "draft";
  description: string;
  short_description: string;
  sku: string;
  price: string;          // "15000.00" — STRING!
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_quantity: number | null;
  stock_status: "instock" | "outofstock" | "onbackorder";
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; name: string; alt: string }[];
  attributes: { id: number; name: string; options: string[] }[];
  meta_data: { id: number; key: string; value: any }[];
  date_created: string;
  date_modified: string;
}
```

#### GET /products/categories

Отримання всіх категорій товарів.

```
Response: { id, name, slug, parent, count, image }[]
```

#### POST /orders

Створення замовлення у WooCommerce.

```json
{
  "payment_method": "liqpay",
  "billing": {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "city": "string",
    "address_1": "string"
  },
  "shipping": { ... },
  "line_items": [
    { "product_id": 123, "quantity": 2 }
  ],
  "meta_data": [
    { "key": "nova_poshta_ttn", "value": "string" }
  ]
}
```

#### GET /orders/{id}

Отримання статусу замовлення за ID.

```
Response: WCOrder
```

#### GET /customers, POST /customers

Стандартні ендпоінти WooCommerce для роботи з клієнтами.

---

## 2. Middleware API (Наш сервер -> Мобільний додаток)

Base URL: `https://api.edmi.com.ua/v1` (production) / `http://localhost:3000/api` (dev)

Усі ендпоінти потребують `Authorization: Bearer <jwt_token>`, якщо не позначені як **PUBLIC**.

---

### Products (PUBLIC)

Ендпоінти для роботи з каталогом товарів. Дані кешуються в Redis з TTL 5 хвилин та оновлюються через вебхуки WooCommerce.

#### GET /api/products

Отримання списку товарів з фільтрацією, пошуком та пагінацією.

```
Query: ?page=1&perPage=20&category=5&search=microscope&sort=price_asc

Response:
{
  "data": Product[],
  "pagination": { "page": 1, "perPage": 20, "total": 45 }
}
```

#### GET /api/products/:id

Отримання повної інформації про товар за ID.

```
Response:
{
  "data": Product
}
```

#### GET /api/products/categories

Отримання списку всіх категорій товарів.

```
Response:
{
  "data": Category[]
}
```

### Product type (our mapped type):

Наш middleware маппить типи WooCommerce в зручніший формат: `price` конвертується зі string у number, поля перейменовуються в camelCase.

```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  description: string;
  shortDescription: string;
  sku: string;
  price: number;         // Mapped from string to number!
  regularPrice: number;
  salePrice: number | null;
  onSale: boolean;
  currency: "EUR";
  stockQuantity: number;
  stockStatus: "in_stock" | "out_of_stock" | "on_backorder";
  condition: "new" | "used";
  categories: Category[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  count: number;
  image: string | null;
}

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}
```

---

### Auth

Аутентифікація побудована на JWT-токенах. Access token має короткий термін дії, refresh token — довший. При реєстрації одночасно створюється customer у WooCommerce.

#### POST /api/auth/register (PUBLIC)

Реєстрація нового користувача. Створює акаунт локально та синхронізує з WooCommerce customers.

```json
Request:
{
  "email": "user@example.com",
  "password": "string (min 8)",
  "firstName": "string",
  "lastName": "string",
  "phone": "+380XXXXXXXXX"
}

Response:
{
  "data": {
    "user": UserProfile,
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

#### POST /api/auth/login (PUBLIC)

Авторизація користувача за email та паролем.

```json
Request:
{
  "email": "user@example.com",
  "password": "string"
}

Response:
{
  "data": {
    "user": UserProfile,
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

#### POST /api/auth/refresh (PUBLIC)

Оновлення пари токенів за допомогою refresh token.

```json
Request:
{
  "refreshToken": "jwt..."
}

Response:
{
  "data": {
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

---

### Orders (AUTH REQUIRED)

Ендпоінти для створення та перегляду замовлень. Потребують авторизацію.

#### POST /api/orders

Створення нового замовлення. Middleware створює замовлення у WooCommerce та ініціює оплату.

```json
Request:
{
  "items": [
    { "productId": 123, "quantity": 2 }
  ],
  "shipping": {
    "method": "nova_poshta" | "pickup",
    "city": "string",
    "warehouse": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "+380XXXXXXXXX"
  },
  "payment": {
    "method": "liqpay" | "wayforpay"
  },
  "comment": "string (optional)"
}

Response:
{
  "data": {
    "orderId": 456,
    "status": "pending",
    "total": 30000.00
  }
}
```

#### GET /api/orders/my

Отримання історії замовлень поточного користувача.

```
Response:
{
  "data": Order[],
  "pagination": { ... }
}
```

#### GET /api/orders/:id

Отримання деталей конкретного замовлення. Користувач може бачити тільки свої замовлення.

```
Response:
{
  "data": Order
}
```

### Order type:
```typescript
interface Order {
  id: number;
  status: "pending" | "processing" | "on-hold" | "completed" | "cancelled" | "refunded";
  items: OrderItem[];
  total: number;
  currency: "EUR";
  shipping: ShippingInfo;
  payment: { method: string; status: string };
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}
```

---

### Payments (AUTH REQUIRED)

Ендпоінти для ініціалізації оплати. Використовуються ті самі облікові дані мерчанта, що й на сайті edmi.com.ua — гроші надходять на один рахунок.

#### POST /api/payments/liqpay/init

Ініціалізація оплати через LiqPay. Повертає підписані дані для відкриття платіжної сторінки.

```json
Request:
{
  "orderId": 456,
  "amount": 30000.00,
  "currency": "EUR",
  "description": "Замовлення #456"
}

Response:
{
  "data": {
    "data": "base64_encoded_string",
    "signature": "base64_hmac_sha1_string",
    "paymentUrl": "https://www.liqpay.ua/api/3/checkout?data=...&signature=..."
  }
}
```

Rate limit: **3 requests/min per IP**

#### POST /api/payments/liqpay/callback (SERVER-TO-SERVER, from LiqPay)

Серверний callback від LiqPay після оплати. LiqPay надсилає POST з параметрами `data` та `signature`. Middleware верифікує підпис, оновлює статус замовлення у WooCommerce та надсилає push-сповіщення користувачу.

#### POST /api/payments/wayforpay/init

Ініціалізація оплати через WayForPay.

```json
Request:
{
  "orderId": 456,
  "amount": 30000.00,
  "currency": "EUR",
  "products": [{ "name": "string", "count": 1, "price": 30000 }]
}

Response:
{
  "data": {
    "merchantSignature": "hmac_md5_hex_string",
    "paymentUrl": "https://secure.wayforpay.com/pay?..."
  }
}
```

Rate limit: **3 requests/min per IP**

#### POST /api/payments/wayforpay/callback (SERVER-TO-SERVER, from WayForPay)

Серверний callback від WayForPay після оплати. Аналогічна логіка верифікації та оновлення статусу.

---

### Delivery (PUBLIC)

Проксі до Nova Poshta API для пошуку міст, відділень та розрахунку вартості доставки.

#### GET /api/delivery/cities?q=Київ

Пошук міст за назвою. Мінімум 2 символи для пошуку.

```
Response:
{
  "data": NovaPoshtaCity[]
}
```

#### GET /api/delivery/warehouses?cityRef=abc123

Отримання списку відділень Нової Пошти у вказаному місті.

```
Response:
{
  "data": NovaPoshtaWarehouse[]
}
```

```typescript
interface NovaPoshtaCity {
  ref: string;
  name: string;
  area: string;
}

interface NovaPoshtaWarehouse {
  ref: string;
  number: string;
  name: string;
  address: string;
  cityRef: string;
}
```

#### POST /api/delivery/calculate

Розрахунок вартості доставки між двома містами.

```json
Request:
{
  "citySender": "ref",
  "cityRecipient": "ref",
  "weight": 5,
  "cost": 30000
}

Response:
{
  "data": { "cost": 150, "estimatedDays": 2 }
}
```

---

### Bot (EDMik) (AUTH REQUIRED)

Чат-бот EDMik — AI-асистент для користувачів додатку. Допомагає з пошуком товарів, повторенням замовлень, відповідями на питання про обладнання.

#### POST /api/bot/chat

Надсилання повідомлення боту. Бот аналізує контекст (поточний екран, стан конфігуратора) та повертає текстову відповідь разом з дія-кнопками та релевантними товарами.

```json
Request:
{
  "message": "Повтори моє останнє замовлення",
  "context": {
    "currentScreen": "catalog",
    "configuratorState": { ... }
  }
}

Response:
{
  "data": {
    "text": "Ваше останнє замовлення: OPMI Pico x1. Замовити знову?",
    "actions": [
      { "type": "reorder", "orderId": 123, "label": "Замовити знову" },
      { "type": "navigate", "screen": "catalog", "label": "Переглянути каталог" }
    ],
    "products": [
      { "id": 45, "name": "OPMI Pico", "price": 15000, "image": "..." }
    ]
  }
}
```

#### POST /api/bot/voice (AUTH REQUIRED, Phase 7)

Голосовий ввід для бота. Приймає аудіофайл, транскрибує його та повертає текстову та аудіо-відповідь.

```
Content-Type: multipart/form-data

Request:
  audio: File (WAV, 16kHz, mono)
  language: "uk" | "en"

Response:
{
  "data": {
    "transcription": "Повтори моє останнє замовлення",
    "response": {
      "text": "...",
      "actions": [...],
      "audioUrl": "https://..."
    }
  }
}
```

---

### Webhooks (from WooCommerce -> Server)

Ендпоінт для прийому вебхуків від WooCommerce. Це основний механізм синхронізації даних між сайтом та нашим middleware.

#### POST /api/webhooks/wc (SERVER-TO-SERVER)

Headers:
- `X-WC-Webhook-Signature`: HMAC-SHA256 signature
- `X-WC-Webhook-Topic`: event topic
- `X-WC-Webhook-Resource`: resource type
- `X-WC-Webhook-Event`: event type
- `X-WC-Webhook-Delivery-ID`: unique delivery ID (для ідемпотентності)

Verification:
```
expected = HMAC-SHA256(body, WC_WEBHOOK_SECRET)
if (!crypto.timingSafeEqual(signature, expected)) -> 401
if (WebhookLog.exists(deliveryId)) -> 200 (skip, idempotent)
```

Topics:
| Topic | Payload | Action |
|-------|---------|--------|
| product.created | WCProduct | Додати в кеш + БД |
| product.updated | WCProduct | Оновити кеш + БД |
| product.deleted | { id: number } | Видалити з кешу + БД |
| order.created | WCOrder | Синхронізувати замовлення |
| order.updated | WCOrder | Оновити статус + push notification |
| customer.created | WCCustomer | Синхронізувати клієнта |

---

### Admin (AUTH REQUIRED, admin role)

Ендпоінти для адмін-панелі. Потребують авторизацію з роллю `admin`.

#### POST /api/admin/ai/chat

AI-асистент для менеджера. Допомагає з додаванням б/у мікроскопів: менеджер описує мікроскоп у чаті, AI аналізує опис (та фото, якщо додані), витягує характеристики, пропонує ціну та генерує опис українською мовою. Менеджер завжди підтверджує перед публікацією.

```json
Request:
{
  "message": "Zeiss OPMI Pico, 2019 рік, хороший стан, LED освітлення",
  "images": ["base64..."]
}

Response:
{
  "data": {
    "text": "Ось що я визначив...",
    "product": {
      "brand": "Zeiss",
      "model": "OPMI Pico",
      "year": 2019,
      "condition": "used",
      "specs": { "illumination": "LED", ... },
      "suggestedPrice": 12000,
      "description": "Стоматологічний мікроскоп Zeiss OPMI Pico...",
      "category": "microscopes",
      "tags": ["zeiss", "opmi", "pico", "led"],
      "confidence": 0.92
    }
  }
}
```

#### POST /api/admin/products

Створення нового товару через адмін-панель. Middleware створює товар у WooCommerce та зберігає локальну копію.

```json
Request:
{
  "name": "string",
  "description": "string",
  "price": 12000,
  "category": 5,
  "images": ["base64..."],
  "attributes": [...],
  "stockQuantity": 1,
  "condition": "used"
}

Response:
{
  "data": { "id": 789, "wcId": 790 }
}
```

#### GET /api/admin/stats

Отримання статистики для дашборду адмін-панелі.

```
Response:
{
  "data": {
    "totalProducts": 45,
    "totalOrders": 230,
    "revenue": { "month": 150000, "total": 1200000 },
    "popularProducts": [...],
    "recentOrders": [...]
  }
}
```

---

### Health Check (PUBLIC)

#### GET /health

Перевірка стану сервера та з'єднань з зовнішніми сервісами.

```
Response:
{
  "status": "ok",
  "timestamp": "2026-02-10T...",
  "services": {
    "database": "connected",
    "redis": "connected",
    "woocommerce": "reachable"
  }
}
```

---

## 3. Nova Poshta API (Upstream)

Base URL: `https://api.novaposhta.ua/v2.0/json/`
Method: POST (всі запити)

Наш middleware проксіює запити до Nova Poshta API, щоб не розкривати API-ключ на клієнті.

### Request Format
```json
{
  "apiKey": "NOVA_POSHTA_API_KEY",
  "modelName": "Address",
  "calledMethod": "searchSettlements",
  "methodProperties": {
    "CityName": "Київ",
    "Limit": 20
  }
}
```

### Response Format
```json
{
  "success": true,
  "data": [...],
  "errors": [],
  "warnings": []
}
```

**УВАГА:** Завжди перевіряти `success` flag перед обробкою `data`. У разі помилки `success: false`, деталі знаходяться в масиві `errors`.

### Основні методи

| modelName | calledMethod | Опис |
|-----------|-------------|------|
| Address | searchSettlements | Пошук міст за назвою |
| Address | getWarehouses | Отримання відділень у місті |
| InternetDocument | getDocumentPrice | Розрахунок вартості доставки |
| InternetDocument | save | Створення ТТН (admin) |
| TrackingDocument | getStatusDocuments | Відстеження посилки за ТТН |

Документація: [devcenter.novaposhta.ua](https://devcenter.novaposhta.ua/start)

---

## 4. Rate Limits

| Endpoint Group | Limit | Window |
|---------------|-------|--------|
| General API | 100 requests | 1 minute |
| Auth endpoints | 5 requests | 1 minute |
| Payment endpoints | 3 requests | 1 minute |
| Bot/AI endpoints | 10 requests | 1 minute |
| Webhooks | unlimited | -- |

При перевищенні ліміту сервер повертає HTTP 429 з error code `RATE_LIMIT` та заголовком `Retry-After` (кількість секунд до скидання ліміту).

---

## 5. Аутентифікація та безпека

### JWT Tokens

- **Access Token**: термін дії 15 хвилин, використовується для всіх AUTH REQUIRED ендпоінтів
- **Refresh Token**: термін дії 7 днів, використовується тільки для `/api/auth/refresh`
- Передається у заголовку: `Authorization: Bearer <access_token>`

### Webhook Verification

WooCommerce webhook signature перевіряється через HMAC-SHA256:
```typescript
const expected = crypto
  .createHmac('sha256', WC_WEBHOOK_SECRET)
  .update(rawBody)
  .digest('base64');

if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
  return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid webhook signature' } });
}
```

### Payment Callback Verification

- **LiqPay**: Підпис перевіряється через `SHA1(private_key + data + private_key)` у base64
- **WayForPay**: Підпис перевіряється через `HMAC_MD5(merchant_secret, concatenated_values)`
