# EDMI — Прогресс разработки

## Текущий статус: Phase 9 ЗАВЕРШЕНА → Следующий: Phase 6 (AI EDMik)

**Дата последнего обновления:** 2026-02-11

---

## Что готово

### Phase 0 — Фундамент (ЗАВЕРШЕНА)
- [x] Монорепо (pnpm workspaces): `apps/mobile`, `apps/admin`, `packages/server`, `packages/shared`
- [x] `packages/shared` — типы (Product, Order, Auth, Delivery, AI, Bot, API)
- [x] Дизайн-токены (`constants/theme.ts`): цвета, шрифты, spacing, radius, shadows
- [x] Zod-валидаторы (`validators/`)
- [x] Мок-данные (`mocks/`): products, categories, orders, bot-responses
- [x] i18n переводы (`locales/uk/`, `locales/en/`): common, products, checkout, bot, configurator
- [x] `packages/server` — shell (Express + ioredis + cors)
- [x] `apps/admin` — shell (Vite + React)
- [x] Typecheck проходит во всех 4 пакетах
- [x] Документация: `docs/` (6 документов)

### Phase 1 — Mobile UI (ЗАВЕРШЕНА)
- [x] Expo SDK 54 инициализирован
- [x] expo-router v6 с файловой навигацией
- [x] 5 табов: Каталог, Конфігуратор, Наявність, Кошик, Профіль
- [x] EDMik FAB кнопка (плавающая, фиолетовая)
- [x] i18n (uk/en) через i18next + react-i18next
- [x] Шрифты: Unbounded (заголовки) + Inter (текст) через @expo-google-fonts
- [x] UI-компоненты: Button, Card, Input, Badge, ScreenWrapper, GradientBackground
- [x] Common-компоненты: Header, EmptyState, LanguageSwitcher
- [x] Root layout: QueryClient, i18n, fonts, GestureHandler
- [x] Tab layout с кастомными иконками
- [x] 5 экранов-заглушек с правильными стилями
- [x] **ТЕСТ НА iPHONE** — работает! (2026-02-10)

### Phase 1.5 — Сервер + WooCommerce API (ЗАВЕРШЕНА)
- [x] Express сервер с CORS и JSON middleware
- [x] WooCommerce **Store API** (публичный, без ключей!) — не нужен Consumer Key/Secret
- [x] `GET /api/products` — список товаров с пагинацией, поиском, фильтром по категории, сортировкой
- [x] `GET /api/products/:id` — один товар
- [x] `GET /api/products/categories` — 23 категории
- [x] In-memory кеш с TTL (5 мин товары, 10 мин категории) — замена Redis для старта
- [x] Маппер WC Store API → Product type (цены из копеек в гривны, бренд из атрибутов)
- [x] Typecheck проходит ✓
- [x] **Протестировано** — реальные товары с edmi.com.ua отдаются через `localhost:3000`

**Ключевое решение:** Используем WC Store API (`/wp-json/wc/store/v1/`) вместо WC REST API v3.
Это **публичный** API — не нужны ключи, идеально для демо-версии "сюрприза".

### Phase 2 — Каталог и товары (ЗАВЕРШЕНА)
- [x] `ProductCard` — карточка товара с фото, бренд, название, цена, "В кошик", "В обране"
- [x] Страница товара (PDP) — галерея с пагинацией (dots), кнопки back/share/favorite/category
- [x] PDP: бейджи (new/used/sale), бренд, статус наличия, цена/старая цена, SKU
- [x] PDP: аккордеоны (характеристики, описание, доставка, оплата)
- [x] PDP: B2B "Запросити рахунок-фактуру" с вызовом телефона
- [x] PDP: связанные товары (горизонтальный scroll)
- [x] PDP: bottom bar (сравнение, корзина, избранное, "Купити" gradient кнопка)
- [x] Корзина: `CartItemRow` с +/-, удаление, очистка, итого, кнопка checkout (заглушка)
- [x] Наличие (stock): экран со списком товаров и статус-точками
- [x] Профиль: гость, аватар, меню (замовлення, обране, мова, контакт, про додаток)
- [x] Zustand stores: `useCartStore` (add/remove/update/clear/getTotal/getItemCount)
- [x] Zustand stores: `useFavoritesStore` (ids array, toggle, isFavorite)
- [x] TanStack Query hooks: `useProducts(params)`, `useProduct(id)`, `useCategories()`
- [x] `Accordion` компонент (анимация open/close)
- [x] `MenuItem` компонент (icon, label, badge, onPress)
- [x] `LanguageSwitcher` — инлайн переключение uk/en

### Phase 2.5 — Навигация Rozetka-стиль (ЗАВЕРШЕНА)
- [x] Первый таб "Головна" (home-outline) вместо "Каталог"
- [x] Home screen: hero gradient + tappable search + 4 quick actions + recommendations (horizontal) + best offers (grid)
- [x] `QuickActionButton` компонент (56x56 circle + icon + label)
- [x] Каталог → отдельный stack-экран `app/catalog/index.tsx` (grid 2 колонки, категории с картинками)
- [x] Категория товаров → `app/catalog/[id].tsx` (brand filter chips + sort chips + product grid)
- [x] Server: enrichment категорий без изображений (подбирает картинку из продукта категории)
- [x] PDP: кнопка категории (grid-outline) рядом с back button → переход в категорію товару
- [x] i18n: ключі `navigation.home`, `home.*`, `catalog.allBrands` (uk + en)
- [x] Typecheck ✓, протестировано на iPhone

### Phase 3 — Checkout + Замовлення + Профіль (ЗАВЕРШЕНА)
- [x] `useCheckoutStore` — Zustand store (4 кроки: contact → delivery → payment → confirm)
- [x] `useOrderHistoryStore` — Zustand store (persist AsyncStorage, мок-замовлення)
- [x] `useAuthStore` — Zustand store (persist SecureStore, мок-авторизація)
- [x] `useOrders` hook — TanStack Query (useMyOrders, useOrder)
- [x] Checkout-компоненти: `StepIndicator`, `ContactForm`, `DeliveryForm`, `PaymentSelector`, `OrderSummary`
- [x] Екран `app/checkout.tsx` — 4-кроковий flow з навігацією та валідацією
- [x] Екран `app/orders/index.tsx` — список замовлень з фільтрами по статусу
- [x] Екран `app/order/[id].tsx` — деталі замовлення (timeline, items, total)
- [x] Екран `app/favorites.tsx` — список обраного з toggle та переходом на PDP
- [x] Екран `app/auth/login.tsx` — мок-авторизація (телефон + email)
- [x] Екран `app/auth/register.tsx` — мок-реєстрація (4 поля)
- [x] Модифіковано `cart.tsx` — кнопка checkout + i18n
- [x] Модифіковано `profile.tsx` — стан авторизації + маршрути
- [x] Модифіковано `index.tsx` — quick action "Замовлення" → перехід
- [x] Typecheck ✓ (0 помилок)

### Phase 4 — EDMik текстовий бот (ЗАВЕРШЕНА)
- [x] `QuickActions` — горизонтальний scroll з 4 chip-кнопками (повторити, статус, менеджер, каталог)
- [x] `BotProductCard` — міні-картка товару в чаті (image 60x60 + name + price)
- [x] `ActionButtons` — вертикальний стек кнопок-дій з іконками per action type
- [x] `ChatBubble` — повідомлення бота (ліворуч з аватаром) та юзера (праворуч)
- [x] `EDMikChat` — головний контейнер чату (Modal + Animated slide-up, 85% height)
- [x] Привітання при першому відкритті, збереження повідомлень між close/reopen
- [x] Мок-відповіді з `getMockBotResponse()` (73 ключових слова, 8 інтентів)
- [x] Обробка дій: reorder (→ cart), navigate (→ router), contact_manager (→ tel:), show_product (→ PDP)
- [x] Product cards у відповідях бота з переходом на PDP
- [x] Quick actions → відправка predefined тексту → intent matching
- [x] Thinking indicator з ActivityIndicator
- [x] Input bar: TextInput + mic placeholder (Alert "скоро!") + send button
- [x] KeyboardAvoidingView (iOS padding)
- [x] FAB кнопка → `setChatVisible(true)` в TabLayout
- [x] Barrel export `components/bot/index.ts`
- [x] Typecheck ✓

### Phase 5 — Конфігуратор мікроскопа (ЗАВЕРШЕНА)
- [x] `ConfiguratorOption`, `ConfiguratorOptionGroup`, `ConfigurableProduct` — типи в shared
- [x] Мок-дані: 4 конфігуровані моделі (Zeiss Pico Mora, Zeiss PROergo, Leica M320, CJ-Optik Flexion)
- [x] 5 груп опцій з реальними цінами-дельтами (колір, кріплення, освітлення, об'єктив, камера)
- [x] `useConfiguratorStore` — Zustand store (persist AsyncStorage, авто-вибір дефолтних опцій)
- [x] `useEdmikStore` — мікро-store для visibility EDMik чату (замінив useState в _layout)
- [x] `ProductSelector` — горизонтальний scroll міні-карток моделей
- [x] `MicroscopePreview` — карусель фото з pagingEnabled + dots
- [x] `ConfigPanel` + `OptionGroup` + `OptionChip` + `ColorSwatch` — панель конфігурації
- [x] `PriceSummary` — sticky bottom bar (ціна + gradient "Додати в кошик" + "Запитати EDMik" + "AR")
- [x] Real-time розрахунок ціни (basePrice + sum of deltas)
- [x] "Додати в кошик" → Product-об'єкт з назвою "Model (опції...)" → cart store
- [x] "Запитати EDMik" → відкриває чат (через useEdmikStore)
- [x] "Переглянути в кабінеті" → Alert "AR — скоро!" (placeholder Phase 9)
- [x] i18n: objectives, camera, UI labels (uk + en)
- [x] Typecheck ✓

### Phase 9 — AR "Переглянути в кабінеті" (ЗАВЕРШЕНА)
- [x] `expo-dev-client` + `@reactvision/react-viro` встановлено
- [x] `app.json` — ViroReact plugin, iOS camera permissions (NSCameraUsageDescription)
- [x] `metro.config.js` — `.glb` / `.gltf` додані до assetExts
- [x] `eas.json` — build profiles (development APK, dev-simulator, preview, production)
- [x] i18n AR ключі (uk + en): scanning, tapToPlace, placed, unsupported, loading тощо
- [x] `MicroscopeARScene` — ViroARScene: plane detection → model placement → drag/rotate/pinch
- [x] `ARViewerScreen` — ViroARSceneNavigator + overlay UI (close, status, reset)
- [x] `ARUnsupported` — fallback екран для пристроїв без AR
- [x] `app/ar-viewer.tsx` — маршрут з перевіркою `isARSupportedOnDevice()`
- [x] `_layout.tsx` — `ar-viewer` як `fullScreenModal` з fade-анімацією
- [x] Кнопка "Переглянути в кабінеті" → `router.push('/ar-viewer')` (замість Alert)
- [x] `Microscope.glb` (30 МБ) — 3D модель мікроскопа в `assets/models/`
- [x] Typecheck ✓

**Важливо:** Phase 9 потребує EAS Dev Build (не Expo Go). Для запуску:
```
cd apps/mobile
npx expo prebuild --clean
eas build --profile development --platform android
npx expo start --dev-client
```

---

## Баги и фиксы (хронология)

### Баг 1: IPv6 ECONNRESET
**Симптом:** `pnpm install` и `npx expo start` падают с `ECONNRESET`
**Причина:** Windows по умолчанию пытается IPv6, npm registry не отвечает по IPv6
**Фикс:**
- `.npmrc`: добавлено `node-options=--dns-result-order=ipv4first`
- PowerShell: `$env:NODE_OPTIONS="--dns-result-order=ipv4first"` перед каждым запуском
**Статус:** РЕШЕНО (повторяется при забывании `$env:NODE_OPTIONS`)

### Баг 2: Неправильные версии пакетов
**Симптом:** `PlatformConstants is null` при запуске на iPhone
**Причина:** Изначально указаны версии для SDK 52 (React 18, RN 0.76), а нужны для SDK 54
**Фикс:** Обновлены все зависимости:
- `react`: 18.3.1 → **19.1.0**
- `react-native`: 0.76.9 → **0.81.5**
- `expo-router`: 4.0.22 → **~6.0.23**
- `react-native-gesture-handler`: 2.20.2 → **~2.28.0**
- `react-native-screens`: 4.4.0 → **~4.16.0**
- `react-native-safe-area-context`: 4.14.1 → **~5.6.0**
- И все остальные expo-пакеты
**Статус:** РЕШЕНО

### Баг 3: Reanimated v4 — createAnimatedComponent
**Симптом:** Type error: `Animated.createAnimatedComponent(Pressable)` не работает
**Причина:** API изменилось в reanimated v4
**Фикс:** Button.tsx и Card.tsx переписаны на стандартный RN `Animated` API (не зависят от reanimated)
**Статус:** РЕШЕНО

### Баг 4: Worklets version mismatch (ГЛАВНЫЙ БАГ)
**Симптом:** `[WorkletsError: Mismatch between JavaScript part and native part of Worklets (0.7.3 vs 0.5.1)]`
**Причина (цепочка):**
1. Expo Go SDK 54 включает `react-native-reanimated` и `react-native-worklets@0.5.1` в свой нативный бинарник
2. `react-native-screens` и `react-native-gesture-handler` **напрямую импортируют** reanimated (47 файлов)
3. `react-native-reanimated@4.1.6` подтягивает `react-native-worklets@0.7.3` (JS)
4. JS-часть (0.7.3) не совпадает с нативной (0.5.1) → краш

**Фикс:**
- `react-native-reanimated@~4.1.1` — добавлен как прямая зависимость
- `react-native-worklets@0.5.1` — добавлен как прямая зависимость (совпадает с Expo Go)
- `pnpm.overrides` в корневом `package.json`: `"react-native-worklets": "0.5.1"`
- `babel-preset-expo` автоматически включает babel-плагин reanimated (ничего добавлять в babel.config.js не нужно)
- `dev` скрипт: `expo start --clear` — чистит кеш Metro при запуске

**Верификация:**
- `node_modules/react-native-worklets/package.json` → version: "0.5.1" ✓
- Typecheck проходит ✓

**Статус:** РЕШЕНО ✓ (протестировано на iPhone)

### Баг 5: Missing asset icon.png
**Симптом:** `Unable to resolve asset "./assets/images/icon.png"`
**Причина:** `app.json` ссылался на несуществующие файлы
**Фикс:** Убраны ссылки на `icon`, `splash`, `adaptive-icon` из `app.json`
**Статус:** РЕШЕНО

### Баг 6: i18n ключи не совпадают
**Симптом:** Текст не отображается, показываются ключи
**Причина:** Экраны использовали ключи `tabs.*`, а в json были `navigation.*`
**Фикс:** Исправлены все ключи в экранах и добавлены недостающие переводы
**Статус:** РЕШЕНО

### Баг 7: Theme property access errors
**Симптом:** TypeScript ошибки: `colors.border.light`, `gradient.start`
**Причина:** Тема использует плоские ключи: `colors.borderLight`, `gradient.primary.colors`
**Фикс:** Исправлены все обращения к свойствам темы
**Статус:** РЕШЕНО

### Баг 8: Категории без картинок (Phase 2.5)
**Симптом:** В каталоге категорий все карточки показывали placeholder иконки вместо изображений
**Причина:** WooCommerce категории на edmi.com.ua не имеют назначенных изображений
**Фикс:** Server-side enrichment — `fetchCategories()` для категорий без image находит первый товар категории и берет его картинку
**Файл:** `packages/server/src/services/wc-store-api.ts`
**Статус:** РЕШЕНО

### Баг 9: ViroReact crash в Expo Go (Phase 9)
**Симптом:** `Cannot read property 'setJSMaterials' of null` при запуске додатку
**Причина:** expo-router при старті сканує `app/ar-viewer.tsx` → імпорт `@reactvision/react-viro` → barrel index.js завантажує ViroARPlaneSelector.js → module-level код викликає `NativeModules.VRTMaterialManager.setJSMaterials()` → null в Expo Go (нативні модулі відсутні)
**Фікс:** `React.lazy()` + динамічний імпорт: `ar-viewer.tsx` не імпортує ViroReact напряму, а лише через `lazy(() => import('@/screens/ar/ARViewerLazy'))`. ViroReact вантажиться тільки при навігації на AR-екран.
**Файли:** `apps/mobile/app/ar-viewer.tsx`, `apps/mobile/screens/ar/ARViewerLazy.tsx` (new)
**Статус:** РЕШЕНО

### Баг 10: Unmatched Route (Phase 9)
**Симптом:** `Unmatched Route — Page could not be found` на весь додаток
**Причина:** Каскадний ефект від Баг 9 — crash ViroReact відбувається ДО ініціалізації навігатора, route tree не будується. Також explicit `<Stack.Screen name="(tabs)" />` в `_layout.tsx` міг заважати auto-discovery
**Фікс:** (1) lazy import для ar-viewer (Баг 9), (2) прибрано explicit `<Stack.Screen name="(tabs)" />` з `_layout.tsx`
**Файл:** `apps/mobile/app/_layout.tsx`
**Статус:** РЕШЕНО

### Баг 11: Відсутні зображення конфігуратора (Phase 5)
**Симптом:** В конфігураторі мікроскопи без картинок
**Причина:** Mock-дані використовували `placehold.co` URL — зовнішній сервіс ненадійний на мобільних пристроях
**Фікс:** Замінено на реальні URL з edmi.com.ua (Zeiss EXTARO 300, CJ-Optik Flexion Advanced)
**Файл:** `packages/shared/src/mocks/configurator.ts`
**Статус:** РЕШЕНО

---

## Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `apps/mobile/package.json` | Зависимости мобильного приложения |
| `apps/mobile/app.json` | Конфиг Expo |
| `apps/mobile/babel.config.js` | Babel (только babel-preset-expo) |
| `apps/mobile/metro.config.js` | Metro (монорепо, watchFolders) |
| `apps/mobile/app/_layout.tsx` | Root layout (fonts, i18n, QueryClient) |
| `apps/mobile/app/(tabs)/_layout.tsx` | Tab layout (5 табов + FAB) |
| `apps/mobile/app/(tabs)/index.tsx` | Home screen (Rozetka-стиль) |
| `apps/mobile/app/catalog/index.tsx` | Каталог — сетка категорий |
| `apps/mobile/app/catalog/[id].tsx` | Товары категории + brand/sort фильтры |
| `apps/mobile/app/product/[id].tsx` | PDP (галерея, аккордеоны, bottom bar) |
| `apps/mobile/components/ui/` | UI компоненты (Button, Card, Input...) |
| `apps/mobile/components/common/` | Общие компоненты (Header, EmptyState...) |
| `apps/mobile/components/home/` | QuickActionButton |
| `apps/mobile/components/catalog/` | ProductCard |
| `apps/mobile/stores/cart.ts` | Zustand store корзины |
| `apps/mobile/stores/favorites.ts` | Zustand store избранного |
| `apps/mobile/hooks/useProducts.ts` | TanStack Query hooks (products, categories) |
| `apps/mobile/constants/theme.ts` | Re-export дизайн-токенов из shared |
| `apps/mobile/lib/i18n.ts` | Настройка i18next |
| `packages/shared/src/constants/theme.ts` | Дизайн-токены (источник) |
| `packages/shared/src/locales/` | Переводы uk/en |
| `package.json` (root) | Монорепо скрипты, pnpm overrides |
| `.npmrc` | IPv4 forcing |
| `packages/server/src/index.ts` | Express entry point, роуты |
| `apps/mobile/app/checkout.tsx` | 4-кроковий checkout flow |
| `apps/mobile/app/orders/index.tsx` | Список замовлень |
| `apps/mobile/app/order/[id].tsx` | Деталі замовлення |
| `apps/mobile/app/favorites.tsx` | Обране |
| `apps/mobile/app/auth/login.tsx` | Мок-авторизація |
| `apps/mobile/app/auth/register.tsx` | Мок-реєстрація |
| `apps/mobile/stores/checkout.ts` | Zustand store checkout |
| `apps/mobile/stores/orderHistory.ts` | Zustand store замовлень |
| `apps/mobile/stores/auth.ts` | Zustand store авторизації |
| `apps/mobile/components/bot/EDMikChat.tsx` | Головний контейнер чату EDMik |
| `apps/mobile/components/bot/ChatBubble.tsx` | Повідомлення в чаті |
| `apps/mobile/components/bot/QuickActions.tsx` | Quick action chips |
| `apps/mobile/components/bot/BotProductCard.tsx` | Картка товару в чаті |
| `apps/mobile/components/bot/ActionButtons.tsx` | Кнопки дій в чаті |
| `packages/server/src/routes/products.ts` | GET /products, /categories, /:id |
| `packages/server/src/services/wc-store-api.ts` | WC Store API клиент + маппер + enrichment |
| `packages/server/src/lib/cache.ts` | In-memory кеш с TTL |
| `apps/mobile/app/(tabs)/configurator.tsx` | Екран конфігуратора мікроскопа |
| `apps/mobile/stores/configurator.ts` | Zustand store конфігуратора (persist) |
| `apps/mobile/stores/edmik.ts` | Zustand store visibility EDMik чату |
| `apps/mobile/components/configurator/` | ProductSelector, MicroscopePreview, ConfigPanel, OptionGroup, OptionChip, ColorSwatch, PriceSummary |
| `packages/shared/src/types/configurator.ts` | Типи конфігуратора |
| `packages/shared/src/mocks/configurator.ts` | Мок-дані 4 конфігуровані моделі |
| `apps/mobile/app/ar-viewer.tsx` | AR маршрут (lazy wrapper, без ViroReact імпортів) |
| `apps/mobile/screens/ar/ARViewerLazy.tsx` | AR логіка з ViroReact (lazy loaded) |
| `apps/mobile/components/ar/MicroscopeARScene.tsx` | ViroARScene: plane detection → placement → gestures |
| `apps/mobile/components/ar/ARViewerScreen.tsx` | AR обгортка: ViroARSceneNavigator + overlay UI |
| `apps/mobile/components/ar/ARUnsupported.tsx` | Fallback для пристроїв без AR |
| `apps/mobile/eas.json` | EAS Build profiles |
| `apps/mobile/assets/models/Microscope.glb` | 3D модель мікроскопа для AR (30 МБ) |

## Важные заметки

- **Всегда ставить `$env:NODE_OPTIONS="--dns-result-order=ipv4first"`** перед запуском из PowerShell
- **Button.tsx и Card.tsx** используют стандартный RN `Animated` (не reanimated) — это ОК, анимации работают
- **`react-native-worklets` прибит к 0.5.1** через pnpm.overrides — не менять, иначе Expo Go крашится
- **`babel-preset-expo`** в SDK 54 сам включает reanimated babel-плагин — НЕ добавлять вручную
- **`expo start --clear`** стоит в dev скрипте — чистит кеш Metro при каждом запуске
- **WC Store API** — публичный, без аутентификации, идеально для "сюрприза"
- **Category image enrichment** — сервер подбирает изображения категориям из товаров
