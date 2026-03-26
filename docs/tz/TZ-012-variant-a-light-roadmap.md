# TZ-012: Variant A-Light (Prism Lite) — Роадмап фіксів по фідбеку клієнта

**Дата:** 2026-03-26
**Формалізував:** #8 Daniel Hartmann — Acting Lead + CoS
**Відповідальні:** #2 Elif Aydin (UX/UI), #3 Tomasz Kowalski (Frontend)
**Ревью:** #14 Hans Landa — CONDITIONAL PASS (ТС1 → ТС2 → ТС3)
**Складність:** L (7 фаз, ~25 ітерацій)
**Скілл:** `ui-ux-pro-max`

---

## Контекст

Клієнт переглянув всі варіанти лендинга. Обрав **Variant A — Prism Lite** (variant-a-light.html).
Variant D раніше працював на телефоні, але на комп'ютері — не дуже.
Variant A найкраще відображається на обох платформах.

### Побажання клієнта (дослівно)

1. Градієнти прибирати НЕ потрібно
2. Поправити лого EDMI — зараз шрифт, має бути як у бренді (чорне з ™)
3. Лого EDMI — тільки чорним зі знаком торгової марки
4. Не вдалося подивитись картку товару — потрібно побачити, як вона виглядає
5. В блоці аксесуарів замість значків — фото реальних продуктів (зменшені)
6. Блок сервісу — ОК; бажано додати відео процесу сервісу
7. В картці товару: опис, набір фото, відеоогляди (якщо можливо)
8. Додати плаваючу кнопку зворотного зв'язку (правий нижній кут)
9. Фільтри по брендах і ціні — бажано, не критично

---

## Верифіковані помилки в поточному коді

| # | Проблема | Файл:рядок | Реальне значення (edmi.com.ua) |
|---|----------|-----------|-------------------------------|
| 1 | Телефон `+38 (050) 123-45-67` — **ФЕЙК** | variant-a-light.html:392,472 | **+38 (067) 000-24-69** |
| 2 | Email `info@edmi.com.ua` — **НЕВІРНИЙ** | variant-a-light.html:396,473 | **motrenko@edmi.dental** |
| 3 | Адреса `м. Київ, вул. Хрещатик, 1` — **ФЕЙК** | variant-a-light.html:400,471 | **вул. Івано-Франківська 23, Маріїки Підгіряни** |
| 4 | Лого — текст `EDMI` замість реального лого з ™ | variant-a-light.html:33 | SVG/PNG з edmi.com.ua |
| 5 | Карточки товарів — placeholder, немає фото | variant-a-light.html:146-148 | Фото є локально в public/images/products/ |
| 6 | Ціни невірні: `від $45,000` / `від $28,000` | variant-a-light.html:161,184 | EXTARO 300 від €31,737; CJ-Optik від €19,200 |
| 7 | Аксесуари — SVG іконки замість фото | variant-a-light.html:281-321 | Клієнт хоче фото реальних продуктів |
| 8 | Немає floating кнопки зворотного зв'язку | — | Клієнт просив FAB |
| 9 | vite.config.js — variant-a-light не в build input | vite.config.js | Не збілдиться для деплою |

---

## Верифіковані дані з edmi.com.ua

### Контакти

| Поле | Значення |
|------|---------|
| Телефон | +38 (067) 000-24-67 |
| Email | office@edmi.dental |
| Адреса | м. Івано-Франківськ, вул. Євгена Коновальця 229, Індустріальний парк Аркан |
| Графік | Пн-Пт 9:00-17:00, Сб 10:00-13:00 |
| Facebook | facebook.com/edmidental/ |
| Instagram | instagram.com/edmi.dental/ |

### Реальні ціни мікроскопів

| Продукт | Ціна UAH | Ціна EUR |
|---------|---------|---------|
| Zeiss EXTARO 300 Premium Package | 2,420,775 ₴ | €47,564 |
| Zeiss EXTARO 300 Classic+ Package | 2,017,634 ₴ | €39,643 |
| Zeiss EXTARO 300 Essential Package | 1,615,258 ₴ | €31,737 |
| CJ-Optik Flexion TWIN | 1,272,378 ₴ | €25,000 |
| CJ-Optik Flexion TWIN lite | 1,114,603 ₴ | €21,900 |
| CJ-Optik Flexion Advanced | ~976,320 ₴ | €19,200 |
| CJ-Optik Flexion Advanced SensorUnit | ~1,023,390 ₴ | €20,100 |

---

## Верифікація зображень (aspect ratio vs card layout)

Поточний CSS: `.product-card__image { aspect-ratio: 4/3; overflow: hidden }` — але **немає `object-fit`** на `<img>`.

| Зображення | Розмір px | AR | Проблема при 4/3 |
|-----------|----------|-----|-----------------|
| extaro-300-premium.png | 1949x1222 | 1.60 | Пробіл знизу (не заповнює висоту) |
| extaro-300-mora.png | 1881x1229 | 1.53 | Пробіл знизу |
| extaro-300-essential.png | 1847x1232 | 1.50 | Пробіл знизу + **1339 KB — занадто важкий** |
| cj-optik-flexion-twin.jpg | 510x702 | 0.73 | **Обрізається ~180px знизу** |
| cj-optik-flexion-twin-lite.jpg | 815x781 | 1.04 | Обрізається ~60px знизу |
| cj-optik-flexion-advanced.jpg | 510x680 | 0.75 | **Обрізається ~166px знизу** |
| cj-optik-flexion-advanced-sensorunit.jpg | 800x1067 | 0.75 | **Обрізається ~166px знизу** |

**Рішення:** `object-fit: contain` + `background: #FFFFFF` — показати мікроскоп ЦІЛКОМ без обрізки. Landscape і portrait будуть з полями, але не обрізані. Для premium-обладнання обрізаний мікроскоп — неприйнятний.

---

## РОАДМАП — 7 ФАЗ

---

### ФАЗА 0: Підготовка — реальні дані + конфіг

**Розмір:** S (3 ітерації)
**Відповідальний:** #3 Tomasz Kowalski

**Скоуп:**

| # | Що зробити | Деталі |
|---|-----------|--------|
| 0.1 | Контакти в HTML | Замінити фейкові телефон, email, адресу на реальні в variant-a-light.html |
| 0.2 | Контакти в i18n | Оновити uk.json та en.json з реальними контактами |
| 0.3 | Соцмережі | Facebook → facebook.com/edmidental/, Instagram → instagram.com/edmi.dental/ |
| 0.4 | vite.config.js | Додати variant-a-light в rollupOptions input |
| 0.5 | Ціни | Замінити `від $45,000` → `від €31,737` і т.д. на реальні ціни в EUR |
| 0.6 | Графік роботи | Додати в секцію контактів: Пн-Пт 9:00-18:00, Сб 10:00-17:00 |

**Файли:**
- `apps/landing/variant-a-light.html`
- `apps/landing/src/i18n/uk.json`
- `apps/landing/src/i18n/en.json`
- `apps/landing/vite.config.js`

**Критерії приймання:**
- [ ] Всі 9 фейкових значень замінені на реальні (верифіковано з edmi.com.ua)
- [ ] `pnpm build` проходить без помилок
- [ ] variant-a-light.html є в build output

---

### ФАЗА 1: Лого EDMI + FAB кнопка зворотного зв'язку

**Розмір:** S (3 ітерації)
**Відповідальний:** #2 Elif Aydin (дизайн), #3 Tomasz Kowalski (реалізація)

**Скоуп:**

| # | Що зробити | Деталі |
|---|-----------|--------|
| 1.1 | Отримати лого | Скачати SVG/PNG з edmi.com.ua або витягти з PDF брендбука (docs/assets/brandbook/) |
| 1.2 | Header лого | Замінити `<span class="header__logo-text">EDMI</span>` на `<img src="/images/edmi-logo.svg" alt="EDMI™">` |
| 1.3 | Footer лого | Замінити `<span class="footer__logo">EDMI</span>` на `<img>` або стилізований чорний текст "EDMI™" |
| 1.4 | FAB кнопка | Floating button 56px, `position: fixed`, bottom-right. Іконка телефону |
| 1.5 | FAB дія | Клік → `tel:+380670002469`. На desktop альтернативно — scroll до #contact |
| 1.6 | FAB mobile | Показувати завжди, z-index вище footer |

**Fallback лого:** Якщо SVG/PNG не вдасться отримати — стилізований текст "EDMI™" чорним кольором (font-weight: 700, color: #000, без градієнту).

**Файли:**
- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/public/images/edmi-logo.svg` (або .png)

**Критерії приймання:**
- [ ] Лого — чорне, з ™ (не градієнтний текст)
- [ ] FAB видна на desktop (1920px) і mobile (375px)
- [ ] FAB клікабельна, веде на дзвінок або #contact
- [ ] Градієнти на сторінці не зачеплені

---

### ФАЗА 2: Реальні фото в карточках товарів

**Розмір:** M (7 ітерацій)
**Відповідальний:** #3 Tomasz Kowalski

**Скоуп:**

| # | Що зробити | Деталі |
|---|-----------|--------|
| 2.1 | Замінити placeholder | `<div class="product-card__image-placeholder">` → `<img src="..." alt="...">` |
| 2.2 | CSS: object-fit | `.product-card__image img { width: 100%; height: 100%; object-fit: contain; }` |
| 2.3 | CSS: фон | `.product-card__image { background: #FFFFFF; }` — білий фон для contain-фото |
| 2.4 | Маппінг фото → продукт | Zeiss EXTARO 300 → extaro-300-premium.png |
|     |                        | CJ-Optik Flexion → cj-optik-flexion-twin.jpg |
|     |                        | Zeiss OPMI PROergo → extaro-300-mora.png |
|     |                        | CJ-Optik Advanced → cj-optik-flexion-advanced.jpg |
| 2.5 | Оптимізація | extaro-300-essential.png (1339KB) — не використовувати або конвертувати в WebP |
| 2.6 | Responsive тест | Desktop: 4 колонки grid — висота рівна. Mobile: 1 колонка — фото не обрізане |

**Файли:**
- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`

**Критерії приймання:**
- [ ] 4 карточки з реальними фото мікроскопів
- [ ] Жодне фото НЕ обрізане (object-fit: contain)
- [ ] Немає каскадного зміщення — grid стабільний
- [ ] Desktop (4 col) + Tablet (2 col) + Mobile (1 col) — layout OK
- [ ] Немає зображень > 500KB

---

### ФАЗА 3: Lightbox карточки товару

**Розмір:** M (7 ітерацій)
**Відповідальний:** #3 Tomasz Kowalski (JS/CSS), #2 Elif Aydin (дизайн)

**Скоуп:**

| # | Що зробити | Деталі |
|---|-----------|--------|
| 3.1 | Замінити зовнішні посилання | Кнопка "Детальніше" → відкриває lightbox, а НЕ edmi.com.ua |
| 3.2 | Lightbox HTML | Overlay modal з backdrop, контент по центру |
| 3.3 | Контент lightbox | Збільшене фото + назва + бренд + ціна + опис (4-5 речень) + характеристики (список) |
| 3.4 | CTA в lightbox | "Отримати консультацію" (scroll до #contact) + "Дивитись на edmi.com.ua" (зовнішнє посилання) |
| 3.5 | Відео в lightbox | YouTube embed iframe (responsive 16:9) — тільки якщо є відео для продукту. Якщо немає — не показувати |
| 3.6 | Закриття lightbox | Click на overlay / клавіша Esc / кнопка ✕ |
| 3.7 | Mobile lightbox | Fullscreen modal, scroll всередині, фіксована кнопка ✕ |
| 3.8 | Дані продуктів | Inline через `data-*` атрибути або JS-об'єкт в main.js |
| 3.9 | Accessibility | `aria-modal="true"`, focus trap, `role="dialog"` |

**НЕ ВХОДИТЬ:**
- Галерея з кількома фото (це PDP, не лендинг)
- Кошик / "Купити"
- Порівняння товарів

**Файли:**
- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/src/main.js`

**Критерії приймання:**
- [ ] Lightbox відкривається при кліку "Детальніше"
- [ ] Lightbox закривається: overlay / Esc / ✕
- [ ] Контент відповідає реальним даним з edmi.com.ua
- [ ] Desktop: modal по центру, max-width 800px
- [ ] Mobile: fullscreen, scroll працює
- [ ] Градієнти на основній сторінці не зачеплені

---

### ФАЗА 4: Аксесуари — фото замість іконок

**Розмір:** M (7 ітерацій)
**Відповідальний:** #2 Elif Aydin (підбір фото), #3 Tomasz Kowalski (реалізація)

**Скоуп:**

| # | Що зробити | Деталі |
|---|-----------|--------|
| 4.1 | Скачати фото | 6 фото категорій аксесуарів з edmi.com.ua (WC product images) |
| 4.2 | Категорії | Оптика, Освітлення, Камери (Futudent), Кріплення, Дзеркала, Інше |
| 4.3 | Замінити SVG | `<svg>` → `<img src="/images/accessories/..." alt="...">` |
| 4.4 | CSS стиль | Фото в квадраті з border-radius: 16px, 80x80px, object-fit: contain |
| 4.5 | Responsive | Desktop: 6 в ряд. Tablet: 3x2. Mobile: 2x3 або горизонтальний scroll |

**Джерела фото з edmi.com.ua (верифіковано):**
- Оптика: адаптери (4K-Imaging-Port, HD-Imaging-Port)
- Освітлення: LED CJ Retrofit, лампи Dr.Fischer
- Камери: Futudent proCam 4K, scopeCam
- Кріплення: стельові/настінні
- Дзеркала: Hahnenkratt RelaxFS, TOPvision
- Інше: чохли, вакуумні подушки

**Файли:**
- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/public/images/accessories/` (6 нових файлів)

**Критерії приймання:**
- [ ] 6 категорій з реальними фото (не SVG іконки)
- [ ] Фото не обрізані, по центру
- [ ] Desktop grid + Mobile — layout стабільний
- [ ] Клік по категорії веде на edmi.com.ua/product-category/...

---

### ФАЗА 5: Сервіс — відео

**Розмір:** S (3 ітерації)
**Відповідальний:** #3 Tomasz Kowalski

**Скоуп:**

| # | Що зробити | Деталі |
|---|-----------|--------|
| 5.1 | Блок відео | Додати секцію під сервісними картками |
| 5.2 | Реалізація | YouTube embed (responsive, 16:9 aspect-ratio) або HTML5 `<video>` |
| 5.3 | Стиль | max-width: 720px, centred, border-radius: 16px, box-shadow |
| 5.4 | Плейсхолдер | CEO підтвердив: відео поки немає — зробити стилізований плейсхолдер з іконкою play та текстом "Відео сервісного процесу". Замінити на embed коли CEO надасть URL |

**Файли:**
- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`

**Критерії приймання:**
- [ ] Відео не ломає layout на desktop і mobile
- [ ] Responsive: 16:9 на всіх breakpoints
- [ ] Плейсхолдер відображається з іконкою play та текстом

---

### ФАЗА 6: Фільтри мікроскопів (nice-to-have)

**Розмір:** S (3 ітерації)
**Відповідальний:** #3 Tomasz Kowalski

**Скоуп:**

| # | Що зробити | Деталі |
|---|-----------|--------|
| 6.1 | Чіпи фільтрів | "Всі" / "Zeiss" / "CJ-Optik" — горизонтальний row над карточками |
| 6.2 | HTML | `data-brand="zeiss"` / `data-brand="cj-optik"` на кожній карточці |
| 6.3 | JS | При кліку чіпа — show/hide карточок через classList.toggle |
| 6.4 | Анімація | CSS transition: opacity 0.3s, transform 0.3s |
| 6.5 | Mobile | Горизонтальний scroll чіпів, якщо не вміщуються |

**Примітка:** При 4 карточках фільтр формальний. Стає корисним при 7+ товарах.

**Файли:**
- `apps/landing/variant-a-light.html`
- `apps/landing/src/variant-a-light.css`
- `apps/landing/src/main.js`

**Критерії приймання:**
- [ ] Фільтрація працює без JS-помилок
- [ ] Layout не ламається при фільтрації
- [ ] Активний чіп візуально виділений (gradient border або background)

---

## Загальні критерії приймання (Definition of Done)

- [ ] Всі контакти = реальні дані edmi.com.ua (верифіковано)
- [ ] Всі ціни = реальні ціни edmi.com.ua в EUR
- [ ] Лого EDMI — чорне, з ™ (не текст шрифтом)
- [ ] Градієнти збережені (НЕ видаляти!)
- [ ] 4 карточки мікроскопів з реальними фото (не обрізані)
- [ ] `object-fit: contain` + білий фон — без каскадних зміщень
- [ ] Lightbox з описом + CTA (не redirect на edmi.com.ua)
- [ ] Аксесуари — фото замість SVG
- [ ] FAB кнопка зворотного зв'язку
- [ ] vite.config.js — всі варіанти в build input
- [ ] Desktop (1920px) + Tablet (768px) + Mobile (375px) верифікація кожної фази
- [ ] `pnpm build` проходить без помилок
- [ ] DEVLOG S014 записаний
- [ ] STATUS.md оновлений

---

## Validation

```bash
# Build
cd apps/landing && GITHUB_PAGES=true pnpm build && echo "ok Build"

# variant-a-light в output
ls dist/variant-a-light.html && echo "ok HTML"

# Фейкові контакти відсутні
! grep -q "050.*123-45-67\|info@edmi.com.ua\|Хрещатик" dist/variant-a-light.html && echo "ok No fake contacts"

# Реальні контакти присутні
grep -q "067.*000-24-69" dist/variant-a-light.html && echo "ok Real phone"
grep -q "motrenko@edmi.dental" dist/variant-a-light.html && echo "ok Real email"

# Placeholder відсутні
! grep -q "product-card__image-placeholder" dist/variant-a-light.html && echo "ok No placeholders"
```

---

## Порядок виконання

```
Фаза 0 (S) ──→ Фаза 1 (S) ──→ Фаза 2 (M) ──→ Фаза 3 (M) ──→ Фаза 4 (M) ──→ Фаза 5 (S) ──→ Фаза 6 (S)
  3 іт.           3 іт.          7 іт.           7 іт.           7 іт.          3 іт.          3 іт.
                                                                                           ───────────
                                                                                           Σ = 33 іт.
```

**Бюджет:** L = 25 ітерацій. З 7 фазами = 33 ітерації → **перевищення на 8 ітерацій**.
**Рішення:** Фаза 5 та 6 — nice-to-have, виконуються тільки якщо бюджет дозволяє. Без них = 27 ітерацій (близько до бюджету).
