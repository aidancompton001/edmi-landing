# Технологічний стек EDMI

## Верифікований стек (Audited & Verified)

Усі бібліотеки пройшли аудит трьох senior-інженерів. Версії актуальні станом на лютий 2026.

---

## Mobile App

### Core

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| Expo SDK | **54+** | Фреймворк, New Architecture (default) | [expo.dev/changelog/sdk-54](https://expo.dev/changelog/sdk-54) |
| React Native | ~0.77 | UI фреймворк (включено в Expo SDK 54) | Expo SDK 54 |
| TypeScript | ^5.3 | Типізація, strict mode | — |
| expo-router | latest | File-based routing | [docs.expo.dev/router](https://docs.expo.dev/router/) |

### State Management

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| zustand | **^5.0.0** | Global state (cart, auth, favorites, configurator) | [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand/releases) |
| @tanstack/react-query | v5 | Server state, caching, sync | [tanstack.com/query](https://tanstack.com/query/) |

### UI & Animation

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| react-native-reanimated | **~3.16.7** (PINNED!) | Анімації, gesture-driven UI | [reanimated compatibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/) |
| react-native-gesture-handler | latest | Touch gestures | Expo SDK 54 |
| react-native-safe-area-context | latest | Safe area insets | Expo SDK 54 |
| react-native-screens | latest | Native navigation screens | Expo SDK 54 |
| expo-image | latest | Оптимізоване завантаження зображень | [docs.expo.dev/sdk/image](https://docs.expo.dev/versions/latest/sdk/image/) |
| expo-linear-gradient | latest | Градієнти (#8b3dc5→#0057b8) | [docs.expo.dev/sdk/linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) |
| @expo/vector-icons | latest | Ionicons + MaterialCommunityIcons | Expo SDK 54 |
| expo-font | latest | Завантаження Unbounded + Inter | Expo SDK 54 |
| @gorhom/bottom-sheet | latest | Bottom sheet для EDMik | [github.com/gorhom/react-native-bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet) |

> **@gorhom/bottom-sheet**: Відомі баги з SDK 52+ (issues #2035, #2046). Потрібен інтеграційний тест у Phase 1.6. Fallback: `react-native-modal`.

### i18n (Інтернаціоналізація)

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| i18next | ^23.7 | Core i18n engine | [npmjs.com/package/i18next](https://www.npmjs.com/package/i18next) |
| react-i18next | ^15.1 | React bindings | [npmjs.com/package/react-i18next](https://www.npmjs.com/package/react-i18next) |
| expo-localization | ^14.8.0 | Визначення мови пристрою | [docs.expo.dev/sdk/localization](https://docs.expo.dev/versions/latest/sdk/localization/) |

### Storage & Security

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| expo-secure-store | latest | Encrypted storage для JWT tokens | Expo SDK 54 |
| @react-native-async-storage/async-storage | latest | Persist для Zustand stores | Expo SDK 54 |

### 3D & AR (Phase 9, коли моделі готові)

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| react-native-filament | latest | 3D viewer (.glb моделі) | [github.com/margelo/react-native-filament](https://github.com/margelo/react-native-filament) |
| @reactvision/react-viro | ^2.43.0 | AR (plane detection, розміщення) | [github.com/ReactVision/viro](https://github.com/ReactVision/viro) |

> ViroReact потребує `npx expo prebuild` — не працює в Expo Go.

### Voice (Phase 7)

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| expo-audio-stream | latest | Запис аудіо 16kHz mono | [npmjs.com/package/@irvingouj/expo-audio-stream](https://www.npmjs.com/package/@irvingouj/expo-audio-stream) |

### Notifications (Phase 7)

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| expo-notifications | latest | Push + local notifications | [docs.expo.dev/sdk/notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) |
| expo-background-task | latest | Background tasks | [docs.expo.dev/sdk/background-task](https://docs.expo.dev/versions/latest/sdk/background-task/) |

> **expo-notifications**: Баг SDK 52/53 — scheduled notifications можуть спрацьовувати миттєво. Тестувати на реальних пристроях. [Issue #33120](https://github.com/expo/expo/issues/33120)

---

## Backend / Middleware Server

### Core

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| Node.js | 20+ | Runtime | — |
| Express | ^4.18 | HTTP framework | — |

### Database & Cache

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| @prisma/client | latest | ORM для PostgreSQL | [prisma.io/docs](https://www.prisma.io/docs/) |
| ioredis | latest | Redis client (cache) | [github.com/redis/ioredis](https://github.com/redis/ioredis) |
| PostgreSQL | 16 | Основна БД | docker-compose.yml |
| Redis | 7 | Кеш (TTL 5 хв) | docker-compose.yml |

### WooCommerce

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| @woocommerce/woocommerce-rest-api | latest | WC API client | [npmjs.com/package/@woocommerce/woocommerce-rest-api](https://www.npmjs.com/package/@woocommerce/woocommerce-rest-api) |

### Payments

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| Official LiqPay SDK | latest | Платежі (HMAC-SHA1) | [github.com/liqpay/sdk-nodejs](https://github.com/liqpay/sdk-nodejs) |
| WayForPay | — | Ручна реалізація HMAC-MD5 | Немає надійного npm пакету |

### AI

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| @anthropic-ai/sdk | latest | Claude API + Structured Outputs | [docs.anthropic.com](https://docs.anthropic.com/) |
| openai | latest | Whisper API (транскрипція, Phase 7) | [platform.openai.com](https://platform.openai.com/docs/api-reference/audio/createTranscription) |

### Push Notifications

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| firebase-admin | ^12.0 | FCM HTTP v1 API | [firebase.google.com/docs](https://firebase.google.com/docs/cloud-messaging/admin/start) |

### Validation

| Бібліотека | Версія | Призначення | Джерело |
|-----------|--------|------------|---------|
| zod | latest | Валідація запитів (shared з mobile) | [zod.dev](https://zod.dev/) |

---

## Admin Panel

| Бібліотека | Версія | Призначення |
|-----------|--------|------------|
| Vite | latest | Build tool |
| React | ^18 | UI |
| Tailwind CSS | ^3 | Стилі |
| react-router-dom | ^6 | Routing |
| @tanstack/react-query | v5 | Server state |
| recharts | latest | Графіки dashboard |
| lucide-react | latest | Іконки |

---

## Виправлені бібліотеки (Audit Corrections)

Наступні бібліотеки були замінені за результатами аудиту:

| Було (помилка) | Стало (виправлення) | Причина |
|----------------|---------------------|---------|
| Expo SDK 52 | **Expo SDK 54+** | SDK 52 застарів, 54 — актуальний stable |
| `liqpay-sdk-nodejs` (npm) | **Official LiqPay SDK** (github.com/liqpay/sdk-nodejs) | npm пакет закинутий 6 років, 25 завантажень/тиж |
| `wayforpay-ts-integration` | **Ручна реалізація HMAC-MD5** | 15 завантажень/тиж, ненадійний |
| `expo-task-manager` | **`expo-background-task`** | expo-task-manager deprecated з SDK 53 |
| `expo-av` (для голосу) | **`expo-audio-stream`** | expo-av не гарантує 16kHz для Whisper |
| `expo-speech` (TTS) | **Нативний TTS + OpenAI TTS API** | Підтримка uk-UA в expo-speech не підтверджена |
| react-native-reanimated latest | **~3.16.7 (pinned)** | Різні SDK потребують різних версій |
| Claude API (простий виклик) | **Claude Structured Outputs** | Гарантує JSON-схему без retry |
| three.js + expo-three + expo-gl | **react-native-filament** | Production-ready, краща продуктивність |

---

## Видалені галюцинації (Removed Hallucinations)

| Твердження | Реальність |
|-----------|-----------|
| "expo-speech підтримує uk-UA" | Не підтверджено документацією |
| "liqpay-sdk-nodejs — робочий пакет" | Закинутий 6 років |
| "expo-task-manager для background" | Deprecated, замінений на expo-background-task |
| "Expo SDK 52+ актуальний" | Застарів, актуальний — SDK 54 |
| "@gorhom/bottom-sheet працює ідеально" | Баги з SDK 52+ (issues #2035, #2046) |

---

## EAS / Dev Build Requirements

| Фаза | Середовище | Що потрібно |
|------|-----------|------------|
| Phase 0-5 | **Expo Go** | Усі компоненти працюють |
| Phase 7+ | **EAS Development Build** | expo-audio-stream, notifications потребують native |
| Phase 9 | **npx expo prebuild** | ViroReact (AR) потребує нативного коду |



Terminal 1 (Server):


cd C:\Projects\EDMI
$env:NODE_OPTIONS="--dns-result-order=ipv4first"
pnpm dev:server


Terminal 2 (Mobile):


cd C:\Projects\EDMI
$env:NODE_OPTIONS="--dns-result-order=ipv4first"
pnpm dev:mobile