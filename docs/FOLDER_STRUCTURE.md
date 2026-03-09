# Структура проекту EDMI

## Повна ієрархія папок

```
edmi/
│
├── CLAUDE.md                              # Головна специфікація проекту (для AI)
├── package.json                           # Root монорепо: scripts, workspaces
├── pnpm-workspace.yaml                    # pnpm workspaces: apps/*, packages/*
├── pnpm-lock.yaml                         # Lock file
├── tsconfig.base.json                     # Базовий TypeScript config (strict)
├── .npmrc                                 # shamefully-hoist=true
├── .gitignore                             # Node, Expo, IDE, env files
├── .env.example                           # Шаблон змінних оточення
├── docker-compose.yml                     # PostgreSQL 16 + Redis 7
│
├── docs/                                  # Проектна документація
│   ├── DESIGN_SYSTEM.md                   # Кольори, шрифти, компоненти, анімації
│   ├── ARCHITECTURE.md                    # Системна архітектура, data flows
│   ├── TECH_STACK.md                      # Верифіковані бібліотеки з версіями
│   ├── API_CONTRACTS.md                   # Всі API endpoints з форматами
│   ├── PHASES.md                          # Фази реалізації + milestone видимості
│   └── FOLDER_STRUCTURE.md                # Цей файл
│
├── apps/
│   ├── mobile/                            # React Native (Expo SDK 54+)
│   │   ├── app/                           # expo-router (file-based routing)
│   │   │   ├── _layout.tsx                # Root layout: QueryClient, i18n, fonts, providers
│   │   │   ├── (tabs)/                    # Tab navigation (5 табів)
│   │   │   │   ├── _layout.tsx            # Tab layout + FAB EDMik кнопка
│   │   │   │   ├── index.tsx              # Каталог (головна): hero, categories, products grid
│   │   │   │   ├── configurator.tsx       # Конфігуратор мікроскопа
│   │   │   │   ├── stock.tsx              # Наявність товарів
│   │   │   │   ├── cart.tsx               # Кошик
│   │   │   │   └── profile.tsx            # Профіль користувача
│   │   │   ├── product/
│   │   │   │   └── [id].tsx               # Детальна сторінка товару
│   │   │   ├── order/
│   │   │   │   └── [id].tsx               # Відстеження замовлення
│   │   │   ├── auth/
│   │   │   │   ├── login.tsx              # Логін
│   │   │   │   └── register.tsx           # Реєстрація
│   │   │   └── checkout.tsx               # Checkout flow (4 кроки)
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                        # Базові UI-компоненти
│   │   │   │   ├── Button.tsx             # Primary, Secondary, Gradient, Outline
│   │   │   │   ├── Card.tsx               # Radius 20px, shadow, press animation
│   │   │   │   ├── Input.tsx              # Label, focus #b8309e, error state
│   │   │   │   ├── Badge.tsx              # New, Used, In Stock, Out of Stock
│   │   │   │   ├── ScreenWrapper.tsx      # SafeAreaView + padding + pull-to-refresh
│   │   │   │   └── GradientBackground.tsx # LinearGradient #8b3dc5→#0057b8
│   │   │   │
│   │   │   ├── catalog/                   # Каталог компоненти
│   │   │   │   ├── ProductCard.tsx        # Картка товару (фото, ціна, badge, heart)
│   │   │   │   ├── CategoryGrid.tsx       # Горизонтальний scroll категорій
│   │   │   │   └── Filters.tsx            # Чіпи фільтрів, сортування
│   │   │   │
│   │   │   ├── configurator/              # Конфігуратор компоненти
│   │   │   │   ├── MicroscopePreview.tsx  # Фото превью (Phase 5) → 3D viewer (Phase 9)
│   │   │   │   └── ConfigPanel.tsx        # Опції: колір, кріплення, освітлення, об'єктив, камера
│   │   │   │
│   │   │   ├── checkout/                  # Checkout компоненти
│   │   │   │   ├── CartItemRow.tsx        # Рядок товару в кошику (+/-, swipe delete)
│   │   │   │   ├── DeliveryForm.tsx       # Нова Пошта / Самовивіз
│   │   │   │   └── PaymentSheet.tsx       # LiqPay / WayForPay вибір
│   │   │   │
│   │   │   ├── bot/                       # EDMik бот компоненти
│   │   │   │   ├── EDMikChat.tsx          # Чат інтерфейс (bottom-sheet)
│   │   │   │   ├── ChatBubble.tsx         # Бабл повідомлення (бот / юзер)
│   │   │   │   ├── QuickActions.tsx       # Chips: "Повторити замовлення", etc.
│   │   │   │   └── FABButton.tsx          # Floating Action Button (56px, #b8309e)
│   │   │   │
│   │   │   └── common/                    # Спільні компоненти
│   │   │       ├── Header.tsx             # Заголовок з навігацією
│   │   │       ├── TabBar.tsx             # Кастомний таб-бар (#b8309e індикатор)
│   │   │       ├── EmptyState.tsx         # Порожній стан (ілюстрація + текст)
│   │   │       └── LanguageSwitcher.tsx   # Перемикач uk/en
│   │   │
│   │   ├── lib/                           # Утиліти та конфігурація
│   │   │   ├── api.ts                     # Axios instance (baseURL, interceptors, auth header)
│   │   │   ├── queryClient.ts            # TanStack Query config (staleTime 5min, gcTime 30min)
│   │   │   └── i18n.ts                    # i18next config (uk, en, auto-detect)
│   │   │
│   │   ├── stores/                        # Zustand stores (^5.0)
│   │   │   ├── cart.ts                    # items, addItem, removeItem, updateQty, persist
│   │   │   ├── auth.ts                    # user, token, isAuthenticated, SecureStore
│   │   │   ├── favorites.ts              # productIds, toggle, persist
│   │   │   ├── configurator.ts            # config options, totalPrice
│   │   │   └── orderHistory.ts            # orders, reorder support
│   │   │
│   │   ├── hooks/                         # TanStack Query hooks
│   │   │   ├── useProducts.ts             # useProducts(), useProduct(id), useCategories()
│   │   │   ├── useOrders.ts               # useMyOrders(), useOrder(id)
│   │   │   └── useDelivery.ts             # useCities(q), useWarehouses(cityRef)
│   │   │
│   │   ├── constants/
│   │   │   ├── theme.ts                   # Re-export з @edmi/shared (colors, fonts, spacing)
│   │   │   └── config.ts                  # API_URL, APP_ENV
│   │   │
│   │   ├── assets/
│   │   │   ├── fonts/                     # Unbounded-*.ttf, Inter-*.ttf
│   │   │   ├── images/                    # Logo, placeholders, illustrations
│   │   │   └── models/                    # .glb 3D моделі (Phase 9)
│   │   │
│   │   ├── app.json                       # Expo config: scheme "edmi", plugins
│   │   ├── package.json                   # Dependencies
│   │   ├── tsconfig.json                  # Extends tsconfig.base.json
│   │   └── babel.config.js                # Reanimated plugin
│   │
│   └── admin/                             # Адмін-панель (Phase 8)
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Dashboard.tsx           # Статистика, графіки, останні замовлення
│       │   │   ├── AIAssistant.tsx         # Чат з Claude для Б/В мікроскопів
│       │   │   ├── Products.tsx            # Таблиця товарів, фільтри, наявність
│       │   │   └── Orders.tsx              # Замовлення, статуси, ТТН
│       │   ├── components/
│       │   │   ├── Layout.tsx              # Sidebar layout
│       │   │   ├── AIChat.tsx              # Chat interface
│       │   │   ├── ProductForm.tsx         # Форма товару (auto-fill від AI)
│       │   │   └── StockTable.tsx          # Таблиця наявності
│       │   └── lib/
│       │       └── api.ts                 # Admin API client
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── tailwind.config.js
│       └── vite.config.ts
│
├── packages/
│   ├── shared/                            # Спільний пакет (types, constants, mocks, i18n)
│   │   ├── src/
│   │   │   ├── types/                     # TypeScript типи
│   │   │   │   ├── product.ts             # Product, WCProduct, ProductImage, Category
│   │   │   │   ├── order.ts               # Order, OrderItem, ShippingInfo, OrderStatus
│   │   │   │   ├── auth.ts                # LoginRequest, RegisterRequest, AuthResponse, UserProfile
│   │   │   │   ├── delivery.ts            # NovaPoshtaCity, NovaPoshtaWarehouse
│   │   │   │   ├── ai.ts                  # AIChatMessage, AIProductSuggestion
│   │   │   │   ├── bot.ts                 # BotMessage, BotAction, ReorderSuggestion
│   │   │   │   ├── api.ts                 # ApiResponse<T>, ApiError, PaginatedResponse
│   │   │   │   └── index.ts               # Re-exports
│   │   │   │
│   │   │   ├── constants/                 # Константи
│   │   │   │   ├── theme.ts               # Colors, fonts, spacing, radius
│   │   │   │   └── api.ts                 # API routes, endpoints
│   │   │   │
│   │   │   ├── validators/                # Zod schemas (shared mobile <-> server)
│   │   │   │   ├── product.ts             # productSchema, productFilterSchema
│   │   │   │   ├── order.ts               # createOrderSchema, orderItemSchema
│   │   │   │   ├── auth.ts                # loginSchema, registerSchema
│   │   │   │   └── delivery.ts            # citySearchSchema, warehouseSearchSchema
│   │   │   │
│   │   │   ├── mocks/                     # Мок-дані (структура = WC API)
│   │   │   │   ├── products.ts            # 15-20 товарів (price як string!)
│   │   │   │   ├── categories.ts          # Категорії з сайту
│   │   │   │   ├── orders.ts              # Замовлення з різними статусами
│   │   │   │   └── bot-responses.ts       # Шаблони відповідей EDMik
│   │   │   │
│   │   │   └── locales/                   # Переклади i18n
│   │   │       ├── uk/                    # Українська
│   │   │       │   ├── common.json        # Загальне: кнопки, навігація, помилки
│   │   │       │   ├── products.json      # Каталог, фільтри, товари
│   │   │       │   ├── checkout.json      # Кошик, checkout, замовлення
│   │   │       │   ├── bot.json           # EDMik бот
│   │   │       │   └── configurator.json  # Конфігуратор
│   │   │       └── en/                    # English
│   │   │           ├── common.json
│   │   │           ├── products.json
│   │   │           ├── checkout.json
│   │   │           ├── bot.json
│   │   │           └── configurator.json
│   │   │
│   │   ├── package.json                   # name: "@edmi/shared"
│   │   └── tsconfig.json
│   │
│   └── server/                            # Backend middleware (Express)
│       ├── src/
│       │   ├── index.ts                   # Express app entry point
│       │   │
│       │   ├── routes/                    # API endpoints
│       │   │   ├── products.ts            # GET /api/products, /api/products/:id, /categories
│       │   │   ├── orders.ts              # POST /api/orders, GET /my, /:id
│       │   │   ├── auth.ts                # POST /api/auth/login, /register, /refresh
│       │   │   ├── payments.ts            # POST /api/payments/liqpay/*, /wayforpay/*
│       │   │   ├── delivery.ts            # GET /api/delivery/cities, /warehouses
│       │   │   ├── webhooks.ts            # POST /api/webhooks/wc (from WooCommerce)
│       │   │   ├── bot.ts                 # POST /api/bot/chat, /api/bot/voice
│       │   │   └── admin.ts               # POST /api/admin/ai/chat, /products, GET /stats
│       │   │
│       │   ├── services/                  # Бізнес-логіка
│       │   │   ├── woocommerce.ts         # WC API client + Redis cache
│       │   │   ├── product-mapper.ts      # WCProduct -> Product mapping
│       │   │   ├── sync.ts                # Reconciliation кожні 5 хв
│       │   │   ├── liqpay.ts              # Official LiqPay SDK / HMAC-SHA1
│       │   │   ├── wayforpay.ts           # Manual HMAC-MD5
│       │   │   ├── novaposhta.ts          # Nova Poshta API 2.0
│       │   │   ├── ai-assistant.ts        # Claude API + Structured Outputs
│       │   │   └── push.ts                # Firebase FCM v1
│       │   │
│       │   ├── middleware/                # Express middleware
│       │   │   ├── auth.ts                # JWT verification
│       │   │   ├── validate.ts            # Zod validation (from @edmi/shared)
│       │   │   └── rateLimit.ts           # 100/min API, 5/min auth, 3/min payments
│       │   │
│       │   ├── lib/                       # Утиліти
│       │   │   └── redis.ts               # ioredis: cacheGet/cacheSet (TTL 5 min)
│       │   │
│       │   └── prisma/
│       │       └── schema.prisma          # User, CachedProduct, Order, WebhookLog, SyncState, ReorderSchedule
│       │
│       ├── package.json                   # name: "@edmi/server"
│       ├── tsconfig.json
│       └── Dockerfile                     # Production Docker image
```

## Залежності між пакетами

```
@edmi/shared ─────► apps/mobile     (types, constants, validators, mocks, locales)
       │
       ├──────────► packages/server  (types, constants, validators)
       │
       └──────────► apps/admin       (types, constants)
```

- `@edmi/shared` не залежить від жодного іншого пакету
- `apps/mobile` залежить від `@edmi/shared`
- `packages/server` залежить від `@edmi/shared`
- `apps/admin` залежить від `@edmi/shared`

## Конвенції іменування

| Тип | Конвенція | Приклад |
|-----|-----------|---------|
| Компоненти | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase з `use` prefix | `useProducts.ts` |
| Stores | camelCase | `cart.ts` |
| Types | PascalCase | `Product`, `OrderItem` |
| Routes (server) | kebab-case | `products.ts`, `bot.ts` |
| Services | kebab-case | `ai-assistant.ts` |
| Locales | kebab-case | `common.json` |
| Constants | camelCase | `theme.ts`, `api.ts` |
