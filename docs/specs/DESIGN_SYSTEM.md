# EDMI Design System

Комплексна документація дизайн-системи мобільного додатку EDMI — електронна комерція стоматологічних мікроскопів.

---

## 1. Палітра кольорів (Color Palette)

### Brand Colors

| Token | Значення | Опис |
|-------|----------|------|
| `primary` | `#b8309e` | Фіолетовий / пурпурний — основний колір бренду, кнопки, акценти |
| `accent` | `#0057b8` | Синій — вторинний колір, посилання, secondary buttons |
| `gradient` | `linear-gradient(#8b3dc5, #0057b8)` | Лінійний градієнт — hero секції, gradient buttons |

```typescript
const brandColors = {
  primary: '#b8309e',
  accent: '#0057b8',
  gradientStart: '#8b3dc5',
  gradientEnd: '#0057b8',
};
```

### Background Colors

| Token | Значення | Опис |
|-------|----------|------|
| `bgDark` | `#171717` | Основний фон (dark mode) |
| `bgLight` | `#ffffff` | Основний фон (light mode) |
| `bgLightAlt` | `#f2f1ef` | Альтернативний світлий фон (секції, картки) |
| `surfaceDark` | `rgba(255,255,255,0.03)` | Поверхні в dark mode |
| `surfaceLight` | `rgba(0,0,0,0.02)` | Поверхні в light mode |

```typescript
const backgroundColors = {
  bgDark: '#171717',
  bgLight: '#ffffff',
  bgLightAlt: '#f2f1ef',
  surfaceDark: 'rgba(255,255,255,0.03)',
  surfaceLight: 'rgba(0,0,0,0.02)',
};
```

### Semantic Colors

| Token | Значення | Опис |
|-------|----------|------|
| `success` | `#48BB78` | Успішна дія, "В наявності", підтвердження |
| `warning` | `#F59E0B` | Попередження, обмежена кількість |
| `error` | `#EF4444` | Помилки, "Немає в наявності", валідація |
| `info` | `#0057b8` | Інформаційні повідомлення, підказки |

```typescript
const semanticColors = {
  success: '#48BB78',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#0057b8',
};
```

### Text Colors

| Token | Значення | Опис |
|-------|----------|------|
| `textPrimaryDark` | `#E2E8F0` | Основний текст в dark mode |
| `textSecondaryDark` | `#94A3B8` | Другорядний текст в dark mode |
| `textPrimaryLight` | `#1A202C` | Основний текст в light mode |
| `textSecondaryLight` | `#64748B` | Другорядний текст в light mode |

```typescript
const textColors = {
  dark: {
    primary: '#E2E8F0',
    secondary: '#94A3B8',
  },
  light: {
    primary: '#1A202C',
    secondary: '#64748B',
  },
};
```

### Border Colors

| Token | Значення | Опис |
|-------|----------|------|
| `borderDark` | `rgba(255,255,255,0.06)` | Межі та розділювачі в dark mode |
| `borderLight` | `rgba(0,0,0,0.08)` | Межі та розділювачі в light mode |

```typescript
const borderColors = {
  dark: 'rgba(255,255,255,0.06)',
  light: 'rgba(0,0,0,0.08)',
};
```

---

## 2. Типографіка (Typography)

### Шрифти

| Шрифт | Джерело | Призначення | Ваги |
|-------|---------|-------------|------|
| **Unbounded** | Google Fonts | Заголовки, назви товарів, ціни | Bold (700), SemiBold (600) |
| **Inter** | Google Fonts | Основний текст, описи, кнопки | Regular (400), Medium (500), SemiBold (600), Bold (700) |

Завантаження шрифтів через `expo-font`:

```typescript
import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
  'Unbounded-Bold': require('./assets/fonts/Unbounded-Bold.ttf'),
  'Unbounded-SemiBold': require('./assets/fonts/Unbounded-SemiBold.ttf'),
  'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
  'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
});
```

### Розміри тексту (Font Scale)

| Token | Size | Line Height | Font | Використання |
|-------|------|-------------|------|--------------|
| `h1` | 32px | 40px | Unbounded Bold | Головні заголовки екранів |
| `h2` | 24px | 32px | Unbounded SemiBold | Секційні заголовки |
| `h3` | 20px | 28px | Unbounded SemiBold | Підзаголовки, назви товарів |
| `body` | 16px | 24px | Inter Regular | Основний текст |
| `bodyMedium` | 16px | 24px | Inter Medium | Акцентований текст |
| `bodySemiBold` | 16px | 24px | Inter SemiBold | Кнопки, мітки |
| `caption` | 12px | 16px | Inter Regular | Додатковий текст, мітки |
| `captionMedium` | 12px | 16px | Inter Medium | Badge текст |
| `price` | 24px | 32px | Inter Bold | Ціна товару |
| `priceSmall` | 18px | 24px | Inter Bold | Ціна в картці |

```typescript
const typography = {
  h1: {
    fontFamily: 'Unbounded-Bold',
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: 'Unbounded-SemiBold',
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontFamily: 'Unbounded-SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySemiBold: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  captionMedium: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  priceSmall: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 24,
  },
};
```

---

## 3. Відступи та розміри (Spacing & Sizing)

### Система відступів (4px base)

| Token | Value | Використання |
|-------|-------|--------------|
| `xs` | 4px | Мінімальний відступ, gap між іконками |
| `sm` | 8px | Відступ між елементами в рядку |
| `md` | 16px | Стандартний padding компонентів |
| `lg` | 24px | Відступ між секціями |
| `xl` | 32px | Великий відступ, padding екрану |
| `2xl` | 48px | Відступ між великими секціями |

```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};
```

### Screen padding

| Параметр | Значення | Опис |
|----------|----------|------|
| Horizontal padding | 16px (`md`) | Горизонтальний відступ від країв екрану |
| Vertical padding | 16px (`md`) | Вертикальний відступ від країв екрану |
| Tab bar height | 60px | Висота нижньої навігаційної панелі |
| Header height | 56px | Висота верхнього заголовку |
| FAB size | 56px | Розмір Floating Action Button |
| FAB bottom offset | 80px | Відступ FAB від низу (над tab bar) |

```typescript
const layout = {
  screenPaddingHorizontal: spacing.md,  // 16px
  screenPaddingVertical: spacing.md,    // 16px
  tabBarHeight: 60,
  headerHeight: 56,
  fabSize: 56,
  fabBottomOffset: 80,
};
```

---

## 4. Радіуси (Border Radius)

| Token | Value | Використання |
|-------|-------|--------------|
| `sm` | 8px | Inputs, badges, chips |
| `md` | 15px | Buttons |
| `lg` | 20px | Cards, modals |
| `xl` | 30px | Bottom sheet, large containers |
| `full` | 9999px | Circles, pills, FAB |

```typescript
const borderRadius = {
  sm: 8,
  md: 15,
  lg: 20,
  xl: 30,
  full: 9999,
};
```

---

## 5. Тіні (Shadows)

### Light Mode

| Token | Опис | Значення |
|-------|------|----------|
| `shadowSmall` | Легка тінь для невеликих елементів | `offset: {0, 2}, opacity: 0.08, radius: 8` |
| `shadowMedium` | Середня тінь для карток та контейнерів | `offset: {0, 4}, opacity: 0.12, radius: 16` |
| `shadowLarge` | Велика тінь для модальних вікон та FAB | `offset: {0, 8}, opacity: 0.16, radius: 24` |

```typescript
const shadowsLight = {
  shadowSmall: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowColor: '#000',
  },
  shadowMedium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowColor: '#000',
  },
  shadowLarge: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowColor: '#000',
  },
};
```

### Dark Mode

| Token | Опис | Значення |
|-------|------|----------|
| `shadowSmall` | Легка тінь для невеликих елементів | `offset: {0, 2}, opacity: 0.3, radius: 8` |
| `shadowMedium` | Середня тінь для карток та контейнерів | `offset: {0, 4}, opacity: 0.4, radius: 16` |
| `shadowLarge` | Велика тінь для модальних вікон та FAB | `offset: {0, 8}, opacity: 0.5, radius: 24` |

```typescript
const shadowsDark = {
  shadowSmall: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowColor: '#000',
  },
  shadowMedium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowColor: '#000',
  },
  shadowLarge: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowColor: '#000',
  },
};
```

---

## 6. Компоненти (Components)

### Button

4 варіанти кнопок використовуються в додатку:

#### Primary Button
- **Фон:** `#b8309e`
- **Текст:** білий (`#ffffff`)
- **Border radius:** 15px (`md`)

#### Secondary Button
- **Фон:** `#0057b8`
- **Текст:** білий (`#ffffff`)
- **Border radius:** 15px (`md`)

#### Gradient Button
- **Фон:** `LinearGradient` від `#8b3dc5` до `#0057b8`
- **Текст:** білий (`#ffffff`)
- **Border radius:** 15px (`md`)

#### Outline Button
- **Border:** 1.5px `#b8309e`
- **Текст:** `#b8309e`
- **Фон:** transparent
- **Border radius:** 15px (`md`)

#### Стани кнопок

| Стан | Трансформація |
|------|---------------|
| Default | Звичайний стан |
| Pressed | `scale(0.97)`, `opacity: 0.9` |
| Disabled | `opacity: 0.5` |

#### Розміри кнопок

| Розмір | Height | Padding (vertical-horizontal) |
|--------|--------|-------------------------------|
| `small` | 36px | 8px 16px |
| `medium` | 48px | 12px 24px |
| `large` | 56px | 16px 32px |

```tsx
// Приклад використання
<Button variant="primary" size="medium" onPress={handlePress}>
  Додати в кошик
</Button>

<Button variant="gradient" size="large" onPress={handleCheckout}>
  Оформити замовлення
</Button>

<Button variant="outline" size="small" onPress={handleCancel}>
  Скасувати
</Button>
```

```typescript
const buttonStyles = {
  variants: {
    primary: {
      backgroundColor: '#b8309e',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#0057b8',
      color: '#ffffff',
    },
    gradient: {
      gradientColors: ['#8b3dc5', '#0057b8'],
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: '#b8309e',
      color: '#b8309e',
    },
  },
  sizes: {
    small: { height: 36, paddingVertical: 8, paddingHorizontal: 16 },
    medium: { height: 48, paddingVertical: 12, paddingHorizontal: 24 },
    large: { height: 56, paddingVertical: 16, paddingHorizontal: 32 },
  },
  borderRadius: 15,
};
```

---

### Card

Картка є основним контейнером для відображення товарів та іншого контенту.

| Властивість | Light Mode | Dark Mode |
|-------------|------------|-----------|
| Background | `#ffffff` | `rgba(255,255,255,0.03)` |
| Border radius | 20px | 20px |
| Shadow | `shadowMedium` | `shadowMedium` |
| Padding | 16px | 16px |
| Press animation | `scale(0.98)` | `scale(0.98)` |

```typescript
const cardStyles = {
  light: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    ...shadowsLight.shadowMedium,
  },
  dark: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 16,
    ...shadowsDark.shadowMedium,
  },
};
```

```tsx
// Приклад використання
<Card onPress={() => navigateToProduct(product.id)}>
  <ProductImage source={product.image} />
  <Text style={typography.h3}>{product.name}</Text>
  <Text style={typography.priceSmall}>{product.price} грн</Text>
</Card>
```

---

### Input

Поле введення для форм (пошук, авторизація, оформлення замовлення).

| Властивість | Значення |
|-------------|----------|
| Height | 48px |
| Border | 1.5px |
| Border color (default) | `rgba(0,0,0,0.08)` |
| Border color (focus) | `#b8309e` |
| Border color (error) | `#EF4444` |
| Border radius | 8px (`sm`) |
| Padding horizontal | 16px |
| Label | Стиль `caption`, розташований над полем |
| Error message | Стиль `caption`, колір `#EF4444`, під полем |

```typescript
const inputStyles = {
  container: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  states: {
    default: { borderColor: 'rgba(0,0,0,0.08)' },
    focused: { borderColor: '#b8309e' },
    error: { borderColor: '#EF4444' },
  },
  label: {
    ...typography.caption,
    marginBottom: 4,
  },
  errorMessage: {
    ...typography.caption,
    color: '#EF4444',
    marginTop: 4,
  },
};
```

```tsx
// Приклад використання
<Input
  label="Email"
  placeholder="example@email.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>
```

---

### Badge

4 типи бейджів для позначення статусу товару:

| Тип | Фон | Текст | Label |
|-----|-----|-------|-------|
| **New** | `#b8309e` | `#ffffff` | "Нове" |
| **Used** | `#94A3B8` | `#ffffff` | "Б/В" |
| **In Stock** | `#48BB78` | `#ffffff` | "В наявності" |
| **Out of Stock** | `#EF4444` | `#ffffff` | "Немає" |

Загальні параметри:
- **Border radius:** 8px (`sm`)
- **Padding:** 4px 8px
- **Font:** `captionMedium` (Inter Medium, 12px)

```typescript
const badgeStyles = {
  base: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    ...typography.captionMedium,
    color: '#ffffff',
  },
  variants: {
    new: { backgroundColor: '#b8309e' },
    used: { backgroundColor: '#94A3B8' },
    inStock: { backgroundColor: '#48BB78' },
    outOfStock: { backgroundColor: '#EF4444' },
  },
  labels: {
    new: 'Нове',
    used: 'Б/В',
    inStock: 'В наявності',
    outOfStock: 'Немає',
  },
};
```

```tsx
// Приклад використання
<Badge variant="new" />
<Badge variant="inStock" />
```

---

### FAB (EDMik)

Floating Action Button для доступу до AI-чат асистента "EDMik".

| Властивість | Значення |
|-------------|----------|
| Size | 56x56px |
| Background | `#b8309e` |
| Icon | Chat bubble, 24px, `#ffffff` |
| Shadow | `shadowLarge` |
| Position | `absolute`, `right: 16px`, `bottom: 80px` (над tab bar) |
| Press animation | `scale(0.95)`, 150ms |
| Border radius | `full` (28px) |

```typescript
const fabStyles = {
  container: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#b8309e',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadowsLight.shadowLarge,
  },
  icon: {
    size: 24,
    color: '#ffffff',
    name: 'chatbubble-ellipses',  // Ionicons
  },
};
```

```tsx
// Приклад використання
<FAB
  icon="chatbubble-ellipses"
  onPress={openAIChat}
/>
```

---

### TabBar

Нижня навігаційна панель з 5 вкладками.

| Властивість | Light Mode | Dark Mode |
|-------------|------------|-----------|
| Background | `#ffffff` | `#171717` |
| Height | 60px | 60px |
| Active indicator | `#b8309e` | `#b8309e` |
| Active icon color | `#b8309e` | `#b8309e` |
| Inactive icon color | `#94A3B8` | `#94A3B8` |

#### Вкладки

| Tab | Label | Icon (Ionicons) |
|-----|-------|-----------------|
| 1 | Каталог | `home-outline` |
| 2 | Конфігуратор | `build-outline` |
| 3 | Наявність | `layers-outline` |
| 4 | Кошик | `cart-outline` |
| 5 | Профіль | `person-outline` |

```typescript
const tabBarStyles = {
  container: {
    height: 60,
    light: { backgroundColor: '#ffffff' },
    dark: { backgroundColor: '#171717' },
  },
  activeColor: '#b8309e',
  inactiveColor: '#94A3B8',
  tabs: [
    { label: 'Каталог', icon: 'home-outline' },
    { label: 'Конфігуратор', icon: 'build-outline' },
    { label: 'Наявність', icon: 'layers-outline' },
    { label: 'Кошик', icon: 'cart-outline' },
    { label: 'Профіль', icon: 'person-outline' },
  ],
  iconSize: 24,
};
```

---

### ScreenWrapper

Обгортка для кожного екрану додатку.

| Властивість | Значення |
|-------------|----------|
| SafeAreaView | Так (враховує notch та системні елементи) |
| Padding horizontal | 16px |
| Pull-to-refresh | Підтримується |
| Background (light) | `bgLight` (`#ffffff`) |
| Background (dark) | `bgDark` (`#171717`) |

```tsx
// Приклад використання
<ScreenWrapper refreshing={isRefreshing} onRefresh={handleRefresh}>
  <Text style={typography.h1}>Каталог</Text>
  <ProductList products={products} />
</ScreenWrapper>
```

---

### GradientBackground

Градієнтний фон для hero-секцій та спеціальних блоків.

| Властивість | Значення |
|-------------|----------|
| Colors | `['#8b3dc5', '#0057b8']` |
| Start | `{ x: 0, y: 0 }` |
| End | `{ x: 1, y: 1 }` |

```tsx
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#8b3dc5', '#0057b8']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.gradientContainer}
>
  {children}
</LinearGradient>
```

---

## 7. Іконки (Icons)

### Бібліотеки іконок

| Бібліотека | Пакет | Призначення |
|-----------|-------|-------------|
| **Ionicons** | `@expo/vector-icons` | Основна бібліотека: навігація, дії, статуси |
| **MaterialCommunityIcons** | `@expo/vector-icons` | Спеціалізовані іконки: мікроскоп, медичне обладнання |

### Розміри іконок

| Token | Size | Використання |
|-------|------|--------------|
| `small` | 20px | Іконки в badge, допоміжні елементи |
| `default` | 24px | Стандартний розмір, іконки в tab bar |
| `large` | 28px | Великі іконки, header actions |

```typescript
const iconSizes = {
  small: 20,
  default: 24,
  large: 28,
};
```

```tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Навігаційні іконки
<Ionicons name="home-outline" size={24} color={colors.primary} />
<Ionicons name="cart-outline" size={24} color={colors.textSecondary} />

// Спеціалізовані іконки
<MaterialCommunityIcons name="microscope" size={24} color={colors.primary} />
```

---

## 8. Анімації (Animations)

Бібліотека: `react-native-reanimated` ~3.16.7

### Параметри анімацій

| Анімація | Тип | Параметри |
|----------|-----|-----------|
| Press scale (Button) | `withSpring` | `scale: 0.97`, `damping: 15`, `stiffness: 150` |
| Press opacity (Button) | `withTiming` | `opacity: 0.9`, `duration: 100ms` |
| Card hover | `withSpring` | `scale: 0.98`, `damping: 15`, `stiffness: 150` |
| FAB press | `withSpring` | `scale: 0.95`, `damping: 12`, `stiffness: 200` |
| Page transition | expo-router default | Slide from right |
| Modal | Custom | Slide up, 300ms |
| Bottom sheet | Gesture-driven | Reanimated + Gesture Handler |
| Skeleton loading | Shimmer | Loop, 1.5s duration |
| Pull-to-refresh | Native | Системна анімація платформи |

```typescript
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Press animation for buttons
const animationConfigs = {
  pressScale: {
    toValue: 0.97,
    config: { damping: 15, stiffness: 150 },
  },
  pressOpacity: {
    toValue: 0.9,
    config: { duration: 100 },
  },
  cardHover: {
    toValue: 0.98,
    config: { damping: 15, stiffness: 150 },
  },
  fabPress: {
    toValue: 0.95,
    config: { damping: 12, stiffness: 200 },
  },
};
```

#### Приклад: анімація натискання кнопки

```tsx
const scale = useSharedValue(1);
const opacity = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
  opacity: opacity.value,
}));

const handlePressIn = () => {
  scale.value = withSpring(0.97, { damping: 15, stiffness: 150 });
  opacity.value = withTiming(0.9, { duration: 100 });
};

const handlePressOut = () => {
  scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  opacity.value = withTiming(1, { duration: 100 });
};
```

#### Приклад: анімація FAB

```tsx
const fabScale = useSharedValue(1);

const fabAnimatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: fabScale.value }],
}));

const handleFABPressIn = () => {
  fabScale.value = withSpring(0.95, { damping: 12, stiffness: 200 });
};

const handleFABPressOut = () => {
  fabScale.value = withSpring(1, { damping: 12, stiffness: 200 });
};
```

#### Приклад: skeleton shimmer

```tsx
const shimmerTranslate = useSharedValue(-1);

useEffect(() => {
  shimmerTranslate.value = withRepeat(
    withTiming(1, { duration: 1500 }),
    -1,  // infinite loop
    false
  );
}, []);
```

#### Приклад: modal slide up

```tsx
const translateY = useSharedValue(screenHeight);

const openModal = () => {
  translateY.value = withTiming(0, { duration: 300 });
};

const closeModal = () => {
  translateY.value = withTiming(screenHeight, { duration: 300 });
};
```
