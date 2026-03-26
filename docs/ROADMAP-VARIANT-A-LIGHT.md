# ROADMAP: Variant A-Light (Prism Lite) — Фіксы по фідбеку клієнта

**Дата:** 2026-03-26
**ТЗ:** [TZ-012](tz/TZ-012-variant-a-light-roadmap.md)
**Відповідальні:** #2 Elif Aydin (UX/UI), #3 Tomasz Kowalski (Frontend)
**Координатор:** #8 Daniel Hartmann
**Ревью:** #14 Hans Landa — CONDITIONAL PASS
**Складність:** L | **Бюджет:** 25 ітерацій

---

## Обзор фаз

```
ФАЗА 0 ──→ ФАЗА 1 ──→ ФАЗА 2 ──→ ФАЗА 3 ──→ ФАЗА 4 ──→ ФАЗА 5 ──→ ФАЗА 6
Дані+конфіг  Лого+FAB    Фото       Lightbox    Аксесуари   Відео       Фільтри
   S (3)      S (3)      M (5)       M (5)       M (5)      S (2)      S (2)
                                                                      ────────
                                                               Σ = 25 ітерацій
```

| Фаза | Назва | Розмір | Ітерації | Статус |
|------|-------|--------|----------|--------|
| 0 | Реальні дані + конфіг | S | 3 | ✅ DONE |
| 1 | Лого EDMI + FAB кнопка | S | 3 | ✅ DONE |
| 2 | Фото товарів в карточках | M | 5 | ✅ DONE |
| 3 | Lightbox товару | M | 5 | ✅ DONE |
| 4 | Аксесуари — фото замість іконок | M | 5 | ✅ DONE |
| 5 | Сервіс — відео (плейсхолдер) | S | 2 | ✅ DONE |
| 6 | Фільтри мікроскопів | S | 2 | ✅ DONE |

---

## Верифіковані дані

### Контакти (підтверджено CEO — i18n дані)

| Поле | Значення |
|------|---------|
| Телефон | **+38 (067) 000-24-67** |
| Email | **office@edmi.dental** |
| Адреса | **м. Івано-Франківськ, вул. Євгена Коновальця 229, Індустріальний парк Аркан** |
| Графік | Пн-Пт 9:00-17:00, Сб 10:00-13:00 |
| Facebook | facebook.com/edmidental/ |
| Instagram | instagram.com/edmi.dental/ |

### Маппінг продуктів (підтверджено CEO)

| Карточка | Модель | Фото | Ціна |
|----------|--------|------|------|
| 1. Zeiss EXTARO 300 | EXTARO 300 (лінійка) | extaro-300-premium.png | від €31,737 |
| 2. CJ-Optik Flexion | Flexion TWIN | cj-optik-flexion-twin.jpg | від €25,000 |
| 3. Zeiss OPMI PROergo | EXTARO 300 MORA interface | extaro-300-mora.png | від €39,643 |
| 4. CJ-Optik Advanced | Flexion Advanced | cj-optik-flexion-advanced.jpg | від €19,200 |

### Повний прайс (edmi.com.ua)

| Продукт | UAH | EUR |
|---------|-----|-----|
| Zeiss EXTARO 300 Premium Package | 2,420,775 ₴ | €47,564 |
| Zeiss EXTARO 300 Classic+ Package | 2,017,634 ₴ | €39,643 |
| Zeiss EXTARO 300 Essential Package | 1,615,258 ₴ | €31,737 |
| CJ-Optik Flexion TWIN | 1,272,378 ₴ | €25,000 |
| CJ-Optik Flexion TWIN lite | 1,114,603 ₴ | €21,900 |
| CJ-Optik Flexion Advanced | ~976,320 ₴ | €19,200 |
| CJ-Optik Flexion Advanced SensorUnit | ~1,023,390 ₴ | €20,100 |

---

## ФАЗА 0: Реальні дані + конфіг

**Розмір:** S (3 ітерації) | **Статус:** ⬜ TODO
**Відповідальний:** #3 Tomasz Kowalski

### Що зробити

| # | Задача | Деталі |
|---|--------|--------|
| 0.1 | Контакти в HTML | Замінити фейковий телефон `+38 (050) 123-45-67` → `+38 (067) 000-24-67` (рядки 392, 472) |
| 0.2 | Email в HTML | Замінити `info@edmi.com.ua` → `office@edmi.dental` (рядки 396, 473) |
| 0.3 | Адреса в HTML | Замінити `м. Київ, вул. Хрещатик, 1` → `м. Івано-Франківськ, вул. Євгена Коновальця 229, Індустріальний парк Аркан` (рядки 400, 471) |
| 0.4 | href-атрибути | `tel:+380501234567` → `tel:+380670002467`, `mailto:info@edmi.com.ua` → `mailto:office@edmi.dental` |
| 0.5 | Соцмережі | Instagram `href="#"` → `https://instagram.com/edmi.dental/`, Facebook `href="#"` → `https://facebook.com/edmidental/` |
| 0.6 | Ціни | `від $45,000` → `від €31,737`; `від $28,000` → `від €25,000`; `від $38,000` → `від €39,643`; `від $22,000` → `від €19,200` |
| 0.7 | Графік роботи | Додати в контакти: `Пн-Пт 9:00-17:00, Сб 10:00-13:00` |
| 0.8 | i18n sync | uk.json вже має правильні контакти — перевірити відповідність HTML |

### Файли

- `apps/landing/variant-a-light.html`
- `apps/landing/src/i18n/uk.json` (верифікація)
- `apps/landing/src/i18n/en.json` (верифікація)

### Критерії приймання

- [ ] Жодного фейкового значення в HTML (050-123-45-67, info@edmi.com.ua, Хрещатик)
- [ ] Всі `href` атрибути ведуть на правильні адреси
- [ ] Соцмережі — реальні посилання (не `#`)
- [ ] Ціни в EUR, реальні
- [ ] `pnpm build` проходить

---

## ФАЗА 1: Лого EDMI + FAB кнопка

**Розмір:** S (3 ітерації) | **Статус:** ⬜ TODO
**Відповідальні:** #2 Elif Aydin (дизайн), #3 Tomasz Kowalski (код)

### Що зробити

| # | Задача | Деталі |
|---|--------|--------|
| 1.1 | Отримати лого | Скачати з edmi.com.ua або витягти з PDF брендбука (`docs/assets/brandbook/`) |
| 1.2 | Header лого | `<span class="header__logo-text">EDMI</span>` → `<img src="/images/edmi-logo.svg" alt="EDMI™">` |
| 1.3 | Footer лого | `<span class="footer__logo">EDMI</span>` → аналогічно |
| 1.4 | Fallback лого | Якщо SVG/PNG не знайдеться — стилізований `EDMI™` чорний текст (Unbounded Bold, color: #000) |
| 1.5 | FAB кнопка HTML | `<a href="tel:+380670002467" class="fab-callback">` з SVG іконкою телефону |
| 1.6 | FAB кнопка CSS | `position: fixed; bottom: 24px; right: 24px; width: 56px; height: 56px; background: #90267C; border-radius: 50%; z-index: 1000;` |
| 1.7 | FAB mobile | Показувати завжди, z-index вище footer та tab bar |

### Файли

- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/public/images/edmi-logo.svg` (новий файл)

### Критерії приймання

- [ ] Лого чорне, з ™ (не градієнтний текст)
- [ ] FAB видна desktop (1920px) + mobile (375px)
- [ ] FAB клікабельна → `tel:+380670002467`
- [ ] Градієнти на сторінці НЕ зачеплені

---

## ФАЗА 2: Фото товарів в карточках

**Розмір:** M (5 ітерацій) | **Статус:** ⬜ TODO
**Відповідальний:** #3 Tomasz Kowalski

### Що зробити

| # | Задача | Деталі |
|---|--------|--------|
| 2.1 | Замінити placeholder | `<div class="product-card__image-placeholder"><span>...</span></div>` → `<img src="/images/products/..." alt="...">` |
| 2.2 | CSS: object-fit | `.product-card__image img { width: 100%; height: 100%; object-fit: contain; }` |
| 2.3 | CSS: білий фон | `.product-card__image { background: #FFFFFF; }` — щоб contain-фото не мало прозорий фон |
| 2.4 | Маппінг | EXTARO 300 → `extaro-300-premium.png`, Flexion → `cj-optik-flexion-twin.jpg`, PROergo → `extaro-300-mora.png`, Advanced → `cj-optik-flexion-advanced.jpg` |
| 2.5 | Responsive | Desktop: 4 колонки, висота однакова. Tablet: 2 колонки. Mobile: 1 колонка |

### Верифікація зображень

| Зображення | Розмір | AR | Поведінка при contain |
|-----------|--------|-----|---------------------|
| extaro-300-premium.png | 1949x1222 | 1.60 | Горизонтальні поля зверху/знизу |
| extaro-300-mora.png | 1881x1229 | 1.53 | Горизонтальні поля зверху/знизу |
| cj-optik-flexion-twin.jpg | 510x702 | 0.73 | Вертикальні поля зліва/справа |
| cj-optik-flexion-advanced.jpg | 510x680 | 0.75 | Вертикальні поля зліва/справа |

**Рішення:** `object-fit: contain` + `background: #FFFFFF` — мікроскоп ЦІЛКОМ, з полями, але НЕ обрізаний. Для premium-обладнання — обрізаний мікроскоп неприйнятний.

### Файли

- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`

### Критерії приймання

- [ ] 4 карточки з реальними фото
- [ ] Жодне фото НЕ обрізане
- [ ] Grid стабільний — немає каскадного зміщення
- [ ] Desktop (4 col) + Tablet (2 col) + Mobile (1 col) — OK

---

## ФАЗА 3: Lightbox товару

**Розмір:** M (5 ітерацій) | **Статус:** ⬜ TODO
**Відповідальні:** #3 Tomasz Kowalski (JS/CSS), #2 Elif Aydin (дизайн)

### Що зробити

| # | Задача | Деталі |
|---|--------|--------|
| 3.1 | Замінити "Детальніше" | Кнопка → відкриває lightbox, а НЕ redirect на edmi.com.ua |
| 3.2 | Lightbox overlay | `position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000;` |
| 3.3 | Lightbox контент | Збільшене фото + назва + бренд + ціна + опис (4-5 речень) + характеристики (список) |
| 3.4 | CTA | "Отримати консультацію" → scroll до `#contact` + "Дивитись на edmi.com.ua" → зовнішнє посилання |
| 3.5 | Закриття | Click overlay / Esc / кнопка ✕ |
| 3.6 | Mobile | Fullscreen modal, scroll, фіксована ✕ |
| 3.7 | Дані продуктів | JS-об'єкт в main.js з описами, характеристиками, URL |
| 3.8 | Accessibility | `aria-modal="true"`, `role="dialog"`, focus trap |

### НЕ ВХОДИТЬ

- Галерея з кількома фото (це PDP)
- Кошик / "Купити"
- Порівняння товарів

### Файли

- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/src/main.js`

### Критерії приймання

- [ ] Lightbox відкривається при кліку "Детальніше"
- [ ] Закривається: overlay / Esc / ✕
- [ ] Контент = реальні дані edmi.com.ua
- [ ] Desktop: modal по центру, max-width 800px
- [ ] Mobile: fullscreen, scroll працює

---

## ФАЗА 4: Аксесуари — фото замість іконок

**Розмір:** M (5 ітерацій) | **Статус:** ⬜ TODO
**Відповідальні:** #2 Elif Aydin (підбір фото), #3 Tomasz Kowalski (код)

### Що зробити

| # | Задача | Деталі |
|---|--------|--------|
| 4.1 | Скачати фото | 6 фото категорій з edmi.com.ua |
| 4.2 | Замінити SVG | `<svg>` → `<img src="/images/accessories/..." alt="...">` |
| 4.3 | CSS | `width: 80px; height: 80px; object-fit: contain; border-radius: 16px;` |
| 4.4 | Категорії | Оптика, Освітлення, Камери (Futudent), Кріплення, Чохли, Інше |
| 4.5 | Responsive | Desktop: 6 в ряд. Tablet: 3x2. Mobile: 2x3 |

### Джерела фото (edmi.com.ua)

| Категорія | Приклад продукту |
|-----------|-----------------|
| Оптика | 4K-Imaging-Port, HD-Imaging-Port |
| Освітлення | LED CJ Retrofit, лампи Dr.Fischer |
| Камери | Futudent proCam 4K, scopeCam |
| Кріплення | Стельові/настінні кріплення |
| Чохли | Захисні чохли для мікроскопів |
| Інше | Вакуумні подушки, дзеркала |

### Файли

- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/public/images/accessories/` (6 нових файлів)

### Критерії приймання

- [ ] 6 категорій з реальними фото (не SVG)
- [ ] Фото не обрізані, по центру
- [ ] Desktop grid + Mobile — layout стабільний
- [ ] Клік → edmi.com.ua/product-category/...

---

## ФАЗА 5: Сервіс — відео (плейсхолдер)

**Розмір:** S (2 ітерації) | **Статус:** ⬜ TODO
**Відповідальний:** #3 Tomasz Kowalski

### Що зробити

| # | Задача | Деталі |
|---|--------|--------|
| 5.1 | Блок відео | Секція під сервісними картками |
| 5.2 | Плейсхолдер | Стилізований блок із текстом "Відео сервісного процесу" + іконка play. Фон: `#F5F5F7`, border-radius: 16px |
| 5.3 | Responsive | `max-width: 720px; margin: 0 auto; aspect-ratio: 16/9;` |
| 5.4 | Готовність до заміни | Коментар в HTML: `<!-- TODO: Замінити на YouTube embed коли CEO надасть URL -->` |

**Примітка CEO:** Відео поки немає. Зробити плейсхолдер, позначити що тут буде відео.

### Файли

- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`

### Критерії приймання

- [ ] Плейсхолдер видно на сторінці
- [ ] Зрозуміло що тут буде відео (іконка play + текст)
- [ ] Не ломає layout desktop + mobile
- [ ] Легко замінити на реальний embed

---

## ФАЗА 6: Фільтри мікроскопів (nice-to-have)

**Розмір:** S (2 ітерації) | **Статус:** ⬜ nice-to-have
**Відповідальний:** #3 Tomasz Kowalski

### Що зробити

| # | Задача | Деталі |
|---|--------|--------|
| 6.1 | Чіпи | "Всі" / "Zeiss" / "CJ-Optik" — горизонтальний row над карточками |
| 6.2 | data-атрибути | `data-brand="zeiss"` / `data-brand="cj-optik"` на кожній `<article>` |
| 6.3 | JS | `classList.toggle` для show/hide карточок |
| 6.4 | Анімація | `transition: opacity 0.3s, transform 0.3s;` |
| 6.5 | Активний чіп | Gradient background (#90267C → #11387F), білий текст |

**Примітка:** При 4 карточках — формальний. Стане корисним при 7+ товарах.

### Файли

- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/src/main.js`

### Критерії приймання

- [ ] Фільтрація без JS-помилок
- [ ] Layout не ламається
- [ ] Активний чіп візуально виділений

---

## Definition of Done (загальне)

- [ ] Всі контакти = реальні дані (верифіковано CEO)
- [ ] Всі ціни = реальні ціни в EUR
- [ ] Лого EDMI — чорне, з ™
- [ ] Градієнти збережені (#90267C → #7938A9 → #11387F) — НЕ видаляти!
- [ ] 4 карточки з реальними фото (object-fit: contain, не обрізані)
- [ ] Lightbox з описом + CTA
- [ ] Аксесуари — фото замість SVG
- [ ] FAB кнопка зворотного зв'язку
- [ ] Відео плейсхолдер в секції сервісу
- [ ] Desktop (1920px) + Tablet (768px) + Mobile (375px) — верифікація кожної фази
- [ ] `pnpm build` проходить без помилок
- [ ] DEVLOG записаний
- [ ] STATUS.md оновлений

---

## Validation (автоматичні перевірки)

```bash
# Build
cd apps/landing && npx vite build && echo "ok Build" || echo "FAIL Build"

# variant-a-light в output
ls dist/variant-a-light.html && echo "ok HTML in dist" || echo "FAIL no HTML"

# Фейкові контакти ВІДСУТНІ
! grep -q "050.*123-45-67\|info@edmi.com.ua\|Хрещатик" variant-a-light.html && echo "ok No fake data" || echo "FAIL fake data found"

# Реальні контакти ПРИСУТНІ
grep -q "067.*000-24-67" variant-a-light.html && echo "ok Real phone" || echo "FAIL phone"
grep -q "office@edmi.dental" variant-a-light.html && echo "ok Real email" || echo "FAIL email"

# Placeholder ВІДСУТНІ (після Фази 2)
! grep -q "product-card__image-placeholder" variant-a-light.html && echo "ok No placeholders" || echo "FAIL placeholders"
```
