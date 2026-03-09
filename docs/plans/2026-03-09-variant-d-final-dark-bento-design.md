# Variant D Final — Dark Bento с реальным контентом EDMI

**Дата:** 2026-03-09
**Утверждено CEO:** да
**Контроль:** #8 Sven Lindqvist

## Цель

Переработать Variant D (Bento Grid) в финальный лендинг EDMI: тёмная цветовая схема по брендбуку (80% чёрного, subtle фиолетовый ambient glow), реальные товары (7 микроскопов + 11 аксессуаров к микроскопам), реальные контакты, фото с edmi.com.ua.

## Цветовая схема

```css
--vd-bg: #0A0A0F;                           /* Основной фон — глубокий чёрный */
--vd-bg-alt: #111116;                       /* Альтернативный фон секций */
--vd-card-bg: rgba(255, 255, 255, 0.03);    /* Карточки — едва заметный */
--vd-card-border: rgba(255, 255, 255, 0.06);/* Рамки карточек */
--vd-text: #FFFFFF;                          /* Основной текст — белый */
--vd-text-secondary: #94A3B8;               /* Вторичный текст */
--vd-primary: #90267C;                       /* Фиолетовый — только акценты */
--vd-gradient: linear-gradient(135deg, #90267C, #7938A9); /* Кнопки, бейджи */
```

**Ambient glow:** radial-gradient от #90267C opacity 0.15-0.20, blur 150-200px. Расположение — правый верхний угол Hero (как на скриншоте из брендбука). Занимает ~20% площади.

## Секции лендинга (порядок)

### 1. Header
- Чёрный фон, белый логотип EDMI
- Навигация: Мікроскопи, Аксесуари, Сервіс, Trade-in, Контакти, edmi.com.ua
- Языковой переключатель UA/EN

### 2. Hero (Bento Grid)
- Главная карточка: фото Zeiss EXTARO 300, "Тільки якісна оптика — Zeiss, CJ-Optik"
- Фиолетовый ambient glow справа (как на скриншоте брендбука)
- CTA: "Переглянути каталог" + "Отримати консультацію"
- Стат-карточки: 4+ років, 3500+ клієнтів, 15 партнерів

### 3. Про EDMI
- Реальные данные: Івано-Франківськ, з 2020 року (концепція з 2017)
- Місія: "Оновлення стоматологічної оптики простим, вигідним і передбачуваним"
- Бренди: Zeiss, CJ-Optik, Optergo

### 4. Мікроскопи (7 товарів)
| # | Назва | Ціна EUR | Фото URL |
|---|-------|----------|----------|
| 1 | Zeiss EXTARO 300 Premium Package | 47,564 | extaro-300-dent-right-side-picture.png |
| 2 | Zeiss EXTARO 300 Classic+ Package | 39,643 | extaro-300-dent-right-side-picture.png |
| 3 | Zeiss EXTARO 300 Essential Package | 31,737 | extaro-300-dent-head-cropped-image.png |
| 4 | CJ-Optik Flexion TWIN | 25,000 | znimok-ekrana-2024-05-17-145714-510x702.jpg |
| 5 | CJ-Optik Flexion TWIN lite | 21,900 | cj-twin-lite.jpg |
| 6 | CJ-Optik Flexion Advanced SensorUnit | 20,100 | cj-optik-flexion-advanced-sensorunit-3.jpg |
| 7 | CJ-Optik Flexion Advanced | 19,200 | cj-optik-flexion-advanced-2-510x680.jpg |

Каждая карточка: фото, бренд, название, 3-4 ключевых характеристики, цена EUR, кнопка "Детальніше" → ссылка на edmi.com.ua/product/...

### 5. Аксесуари до мікроскопа (11 товарів)
| # | Назва | Ціна EUR |
|---|-------|----------|
| 1 | Адаптер 4K-Imaging-Port | 1,760 |
| 2 | Адаптер HD-Imaging-Port | 1,667 |
| 3 | Адаптер Phone-Imaging-Port | 2,223 |
| 4 | Beam Splitter CJ 50:50 | 1,185 |
| 5 | Варіофокус 200-350mm | 2,500 |
| 6 | Джерело LED CJ Retrofit CZ OPMI Pico | 2,050 |
| 7 | Кутовий дільник 30deg ergo tube double sided 50:50 | 1,815 |
| 8 | Кутовий дільник 30deg ergo tube left sided 50:50 | 1,686 |
| 9 | Кутовий дільник 30deg ergo tube right splitter 50:50 | 1,686 |
| 10 | Лампа галогенна Osram 100W 12V | 15 |
| 11 | Лампи Dr.Fischer 12V 50W Wild | 54 |

### 6. Trade-in / Вживані
- Програма trade-in: здай старий — отримай знижку
- 47-точковий контроль якості
- Гарантія від 6 місяців

### 7. Сервіс
- Діагностика та калібрування
- Ремонт та відновлення
- Технічне обслуговування
- Консультація з вибору

### 8. Контакти
- Тел: +38 (067) 000-24-67
- Email: office@edmi.dental
- Адреса: м. Івано-Франківськ, вул. Євгена Коновальця 229, Індустріальний парк Аркан
- Графік: Пн-Пт 9:00-17:00, Сб 10:00-13:00, Нд — вихідний
- Facebook: facebook.com/edmidental/
- Instagram: instagram.com/edmi.dental/
- Форма зворотного зв'язку (ім'я, телефон, повідомлення)

### 9. Footer
- Логотип, контакти, навигация, соцсети, copyright

## Технические решения

1. Фото — прямые URL с edmi.com.ua/wp-content/uploads/
2. Цены в EUR — жёстко зашиты (не API)
3. Bento Grid layout сохраняется
4. CSS переменные --vd-* полностью переписываются
5. Ambient glow — CSS radial-gradient + backdrop-blur
6. i18n (uk/en) сохраняется через data-i18n
7. Responsive 320px-2560px

## План реализации

### Фаза 1: CSS Dark Theme (variant-d.css)
- Переписать все --vd-* переменные на тёмную палитру
- Добавить ambient glow (radial-gradient #90267C)
- Адаптировать все компоненты: header, cards, footer
- Проверить hover/focus состояния на тёмном фоне

### Фаза 2: HTML контент (variant-d.html)
- Заменить Hero: реальное фото + текст
- Заменить About: реальные данные компании
- Заменить Мікроскопи: 7 реальных карточек с фото, ценами, характеристиками
- Добавить/заменить Аксесуари: 11 реальных товаров
- Заменить Контакти: реальные данные
- Обновить Footer

### Фаза 3: Верификация данных
- Скрипт проверки: все цены, все URL фото, все названия — сверка с edmi.com.ua

### Фаза 4: Hans Landa Review
- Полный аудит результата

### Фаза 5: Build + Deploy
- Vite build
- gh-pages push
- Верификация всех страниц
