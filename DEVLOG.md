# DEVLOG.md — EDMI

## Журнал разработки

Записи от новых к старым. Нумерация: S001, S002, ... SNNN.
Владелец процесса: #8 Chief of Staff Engineering.

---

### [S012] — 2026-03-09 — Увольнение #8 Sven Lindqvist + фикс карточек с фото

**Роли:** #1 Viktor Schulz (координация после увольнения #8), #2 Elif Aydin (UX), #3 Tomasz Kowalski (вёрстка), #14 Hans Landa (аудит)
**Статус:** в процессе

**УВОЛЬНЕНИЕ:**
- #8 Sven Lindqvist получил страйк 2/2 → УВОЛЕН без выплаты зарплаты
- Причина: дважды задеплоил устаревший CSS на GitHub Pages (stash-процесс терял untracked файлы, деплоился старый код), не составил ТС на правки по фидбеку CEO, не подключил специалистов и Hans Landa
- Замена: #8 Daniel Hartmann (бывший VP Engineering Delivery Hero, специализация — deploy excellence)

**Фидбек CEO по карточкам:**
- Проблема: карточки с фото микроскопов имели серый фон (#F5F5F7), а фото — на белом фоне. Видна граница, выглядит дёшево.
- Эталон: карточка EXTARO 300 Premium — белый фон, фото сливается.
- Hero карточка: микроскоп маленький, сбоку — выглядит плохо. Нужен grid-layout с нормальным размером.

**Что исправлено (CSS):**
- `.bento-card--hero-main`: `background: var(--vd-bg-alt)` → `background: #FFFFFF`, layout → grid 1.2fr+1fr
- `.bento-card--about-image`: `background: transparent` → `background: #FFFFFF`
- `.hero-product-img`: max-height 280px → 360px
- Первый деплой: ПРОВАЛИЛСЯ (stash потерял файлы, деплоился старый CSS)
- Второй деплой: ПРОВАЛИЛСЯ (та же причина — stash)
- Третий деплой: УСПЕШЕН (копия dist в /tmp, верификация CSS в gh-pages перед пушем)

**Артефакты:**
- `apps/landing/src/variant-d.css` — hero-main и about-image фон белый
- `TEAM.md` — увольнение #8 Sven, найм #8 Daniel Hartmann

**Ожидает:**
- Верификация CEO что изменения видны на проде
- ТС на остальные правки карточек (hero layout, about image)

> DEVLOG updated: S012

---

### [S011] — 2026-03-09 — TZ-009: Variant D — Светлая тема + акцентный градиент

**Роли:** #2 Elif Aydin (дизайн), #3 Tomasz Kowalski (вёрстка), #8 Sven Lindqvist (DEVLOG, протокол), #14 Hans Landa (аудит)
**Статус:** завершено

**Контекст:**
CEO уточнил дизайн-направление — "80% чёрного + немного фиолетового" относилось к СТИЛЮ ГРАДИЕНТОВ (как в брендбуке), а НЕ к цвету фона страницы. Страница должна быть светлой. Фиолетовый — только в акцентах.

**Нарушение протокола:**
- #8 Sven Lindqvist начал правки CSS без ТЗ и без Hans Landa — получил страйк 1/2
- CEO: "Работа по протоколу! ТЗ → ответственные → скиллы → Hans Landa!"

**Что сделано:**
- Формализован TZ-009: откат CSS на светлую тему, градиент только в акцентах
- Выбран Вариант A: полный откат hardcoded rgba + сохранение новых CSS-блоков
- Исправлены все hardcoded dark rgba: header, borders, forms, scrollbar, mobile menu
- Удалён hero-glow (не нужен на светлом фоне)
- theme-color meta: #0A0A0F → #FFFFFF
- Footer оставлен тёмным (#050508) для контраста
- Акценты сохранены: gradient-text цены, gradient кнопки, hover-окантовки карточек
- Build: OK (Vite, 23.2 KB variant-d CSS)
- Верификация: 73/73 PASSED
- Hans Landa (#14): PASS (0 критичных, 0 серьёзных)
- Deploy: gh-pages pushed

**Артефакты:**
- `docs/tz/TZ-009-variant-d-light-theme-accent-gradient.md` — ТЗ
- `apps/landing/src/variant-d.css` — CSS (светлая тема)
- `apps/landing/variant-d.html` — theme-color, hero-glow removed

> DEVLOG updated: S011

---

### [S010] — 2026-03-09 — Variant D Final: Dark Bento + реальный контент EDMI

**Роли:** #2 Elif Aydin (дизайн), #3 Tomasz Kowalski (вёрстка), #14 Hans Landa (аудит), #8 Sven Lindqvist (контроль, DEVLOG)
**Статус:** завершено
**Дизайн-документ:** `docs/plans/2026-03-09-variant-d-final-dark-bento-design.md`

**Что сделано:**
- CEO выбрал Variant D (Bento Grid) как финальный дизайн лендинга
- Полная переработка CSS в тёмную тему: #0A0A0F фон, фиолетовый ambient glow, белый текст
- 13 hardcoded rgba-значений заменены с light → dark
- Добавлены: hero-glow, hero-product-img, accessory-product карточки
- HTML переписан с реальным контентом: 7 микроскопов (Zeiss, CJ-Optik) + 11 аксессуаров
- 7 фото продуктов скачаны локально (не hotlink)
- Реальные контакты: office@edmi.dental, +38 (067) 000-24-67, Івано-Франківськ
- ЖЕЛЕЗНОЕ ПРАВИЛО: верификация через скрипт (73/73 проверок passed)
- Cross-sum: микроскопы €205 144, аксессуары €16 641, итого €221 785
- Hans Landa LANDA REPORT: 3 критичных (inline styles для responsive) + 9 серьёзных
- Все критичные фиксы применены: inline styles → CSS, image duplication fix, i18n footer
- Vite build успешный: 8 HTML + 8 CSS + 1 JS
- Задеплоено на GitHub Pages (gh-pages branch push)

**Публичная ссылка:** https://aidancompton001.github.io/edmi-landing/variant-d.html

**Артефакты:** `variant-d.html`, `src/variant-d.css`, `public/images/products/` (7 файлов), `docs/plans/2026-03-09-variant-d-final-dark-bento-design.md`, `scripts/verify-variant-d-data.js`

> DEVLOG updated: S010

---

### [S009] — 2026-03-09 — TZ-008: 4 новых светлых варианта лендинга + деплой

**Роли:** #2 Elif Aydin (дизайн), #3 Tomasz Kowalski (вёрстка), #6 Arjun Mehta (деплой), #8 Sven Lindqvist (контроль, DEVLOG)
**Статус:** завершено
**ТЗ:** `docs/tz/TZ-008-variant-a-light-and-3-new-variants.md`

**Что сделано:**
- Variant A-Light (Glass Prism Light) — светлая адаптация Variant A: белый фон, light glassmorphism, тёмный текст, сохранена структура оригинала (514 строк HTML + 1377 строк CSS)
- Variant D "Bento Grid" — Apple/Notion-стиль модульный лейаут с бенто-сіткою (696 строк HTML + 1644 строк CSS)
- Variant E "Scroll Story" — scroll-driven сторітелінг с паралакс-ефектами, кінематичний досвід (612 строк HTML + 1658 строк CSS)
- Variant F "Light Glass" — просунутий glassmorphism на світлому фоні, mesh-градієнти, frost-ефекти (545 строк HTML + 1842 строк CSS)
- Роутер index.html оновлено: 7 варіантів у 2 секціях (оригінали + trend-based 2026)
- vite.config.js оновлено: всі 7 варіантів у rollupOptions.input
- Vite build успішний: 8 HTML + 9 CSS + 1 JS
- Задеплоєно на GitHub Pages (gh-pages branch push)
- Variant A (тёмный Glass Prism) — НЕ ЗМІНЕНИЙ

**Дизайн-рішення (#2 Elif Aydin):**
- Всі нові варіанти — СВІТЛІ (вказівка CEO)
- Тренди 2026: Bento Grid (Apple/Notion), Scroll Storytelling (parallax), Light Glassmorphism (frosted)
- Брендбук дотримано: Unbounded + Montserrat, градієнт #90267C → #7938A9 → #11387F
- Кожен варіант має унікальний CSS namespace (--vd-*, --ve-*, --vf-*) для ізоляції стилів

**Публічні посилання:**
- Роутер: https://aidancompton001.github.io/edmi-landing/
- A-Light: https://aidancompton001.github.io/edmi-landing/variant-a-light.html
- D: https://aidancompton001.github.io/edmi-landing/variant-d.html
- E: https://aidancompton001.github.io/edmi-landing/variant-e.html
- F: https://aidancompton001.github.io/edmi-landing/variant-f.html

**Артефакты:** `variant-a-light.html`, `variant-d.html`, `variant-e.html`, `variant-f.html`, `src/variant-a-light.css`, `src/variant-d.css`, `src/variant-e.css`, `src/variant-f.css`, оновлені `index.html`, `vite.config.js`

> DEVLOG updated: S009

---

### [S008] — 2026-03-09 — Страйк 2/2 Marco Richter → увольнение → реорганизация команды

**Роли:** #8 Sven Lindqvist (DEVLOG, принимает командование), CEO (решение)
**Статус:** завершено

**Что произошло:**
- CEO поставил задачу TZ-008: создать светлый вариант A + исследовать тренды + 3 новых варианта (D, E, F)
- Marco Richter (#1) начал выполнение без формального назначения ответственных, без оформления ТЗ по протоколу
- CEO обнаружил нарушение: "Не определены ответственные, нет ТЗ сформированного"
- Marco Richter получил страйк 2/2 → УВОЛЕН без выплаты зарплаты

**Кадровые изменения:**
- Marco Richter (#1) — уволен (страйк 2/2, повторное нарушение протокола)
- Sven Lindqvist (#8) — повышен до ПРАВОЙ РУКИ CEO / Acting Lead + Chief of Staff
- Viktor Schulz (#1 NEW) — нанят на позицию Product Architect, подчиняется #8

**Действия по протоколу:**
- TEAM.md обновлён до v3.0: увольнение записано, новый состав, новые роли
- TZ-008 будет переформализован с чётким назначением ответственных
- Все дальнейшие задачи — строго по протоколу под контролем #8 Sven Lindqvist

**Указание CEO:** "Текущее задание сформировать правильно, согласно протоколу, подключить брейнштормы, скиллы, все правильно расписать, кто где ответственный"

**Артефакты:** TEAM.md v3.0, реестр увольнений (#12), реестр страйков (#2)

---

### [S007] — 2026-03-09 — Деплой лендинга на GitHub Pages

**Роли:** #6 Arjun Mehta (исполнитель), #1 Marco Richter (контроль), #8 Sven Lindqvist (DEVLOG)
**Статус:** завершено
**ТЗ:** `docs/tz/TZ-007-deploy-netlify.md`

**Что сделано:**
- Создан GitHub-репозиторий: `aidancompton001/edmi-landing`
- Весь проект закоммичен и запушен на GitHub (202 файла)
- Сбилжен `apps/landing/` в production (Vite build, 9 файлов)
- Настроен `base` path в vite.config.js для GitHub Pages
- Создана ветка `gh-pages` с built-файлами
- GitHub Pages включён, статус: built

**Публичная ссылка:** https://aidancompton001.github.io/edmi-landing/

**Страницы:**
- Роутер: https://aidancompton001.github.io/edmi-landing/
- Variant A (Glass Prism): https://aidancompton001.github.io/edmi-landing/variant-a.html
- Variant B (Clean Surgical): https://aidancompton001.github.io/edmi-landing/variant-b.html
- Variant C (Neon Depth): https://aidancompton001.github.io/edmi-landing/variant-c.html

**Артефакты:** GitHub repo, gh-pages branch, `docs/tz/TZ-007-deploy-netlify.md`

---

### [S006] — 2026-03-09 — Brainstorming лендинга + Landa Review + Plan

**Роли:** #2 Elif Aydin (дизайн), #1 Marco Richter (стратегия), #14 Hans Landa (аудит), #8 Sven Lindqvist (DEVLOG)
**Статус:** завершено

**Что сделано:**
- Изучен брендбук EDMI (60 стр.): Unbounded + Montserrat, градиент #90267C→#7938A9→#11387F
- Изучен сайт edmi.com.ua: каталог, категории, партнёры, структура
- Получены требования CEO: категории, EdmiTools, аксесуари, без корзини, форми, сервіс, uk+en
- Brainstorming: 3 варианта дизайна (Glass Prism, Clean Surgical, Neon Depth)
- Elif Aydin (#2): анализ рисков каждого варианта + решения
- Hans Landa (#14) переведён из BauPreis, провёл первичный аудит плана (CONDITIONAL PASS)
- Landa Report: обнаружены расхождения CSS-токенов с брендбуком → исправлены
- Создан implementation plan (7 фаз, 29 шагов)
- Формализовано ТЗ-006 с чек-листом приёмки (17 пунктов)
- Исправлены CSS-токены: Inter→Montserrat, 2-цветный→3-цветный градиент, primary #b8309e→#90267C
- Создан common JS: language switcher uk/en, scroll animations, counter animation, form handler (Telegram), smooth scroll
- Создан Вариант A "Glass Prism" (тёмный + glassmorphism) — 512 строк HTML + 28KB CSS
- Создан Вариант B "Clean Surgical" (светлый + минимализм) — 408 строк HTML + 24KB CSS
- Создан Вариант C "Neon Depth" (тёмный + neon glow) — 431 строк HTML + 27KB CSS
- Создана роутер-страница для выбора варианта (index.html)
- i18n файлы: uk.json + en.json (полный набор текстов)
- products.json с данными 4 микроскопов + 6 категорий аксессуаров
- Vite dev server: все 4 страницы возвращают HTTP 200

**Нарушение протокола (до начала работ):**
- Marco Richter (#1) получил страйк 1/2: работа выполнена без DEVLOG, без формального ТЗ, Landa не добавлен в TEAM.md
- CEO потребовал: протокол → ТЗ с чек-листом → повторный Landa Review
- ВСЕ исправлено до начала реализации

**Артефакты:** `apps/landing/variant-a.html`, `apps/landing/variant-b.html`, `apps/landing/variant-c.html`, `apps/landing/index.html`, `apps/landing/src/styles.css`, `apps/landing/src/main.js`, `apps/landing/src/i18n/`, `apps/landing/src/data/products.json`, TEAM.md v2.1, `docs/tz/TZ-006-landing-prototypes.md`

---

### [S005] — 2026-03-09 — Полная замена команды: MONO → EDMI

**Роли:** #1 Marco Richter (контроль), #8 Sven Lindqvist (DEVLOG)
**Статус:** завершено

**Что сделано:**
- Уволена вся предыдущая команда EDMI (8 человек) по прямому решению CEO
- Переведена боевая команда из проекта MONO Men Only (8 человек)
- Адаптированы зоны ответственности под EDMI: лендинг, WooCommerce, мобильное приложение
- Проведён брифинг команды: проект, текущий этап, задачи, правила
- TEAM.md v2.0: реестр увольнений (11 записей), новый состав, чистый реестр страйков

**Причина замены:**
- CEO недоволен однородным составом прежней команды
- Команда MONO — проверенная, работает по протоколу MainCore V4.4
- Ранее в MONO успешно разрабатывали мультиплатформенный booking-сервис

**Распределение по лендингу:** #1 стратегия, #2 дизайн, #3 вёрстка, #5 API, #6 infra, #7 QA, #8 протокол. #4 — standby (мобильное приложение)

**Артефакты:** `TEAM.md` v2.0

---

### [S004] — 2026-03-09 — Уборка проекта + папка брендбука + страйк #1

**Роли:** #6 Олена Савченко (исполнитель), #8 Вікторія Ткаченко (проверка), #1 Олексій Петренко (контроль)
**Статус:** завершено

**Что сделано:**
- Удалён артефакт `nul` (0 байт, Windows) из корня проекта
- Перемещены 16 фото-референсов: `ref/` → `docs/ref/`
- Создана папка `docs/brandbook/` с README для CEO
- Верификация: корень проекта чистый, структура организована

**Нарушение протокола (страйк):**
- #1 Олексій Петренко получил страйк 1/2 от CEO
- Причина: задача выполнена без ТЗ, без назначения ответственного, без записи в DEVLOG
- Урок: КАЖДАЯ задача CEO — сначала ТЗ → ответственный → исполнение → DEVLOG

**Артефакты:** `docs/brandbook/`, `docs/ref/`

---

### [S003] — 2026-03-09 — Реструктуризация команды + подготовка лендинга

**Роли:** #1 Product Architect, #8 Chief of Staff Engineering
**Статус:** в процессе

**Что сделано:**
- Уволены 3 специалиста за нулевой вклад (#3, #6, #7)
- Наняты замены: Роман Ковальчук (#3), Олена Савченко (#6), Максим Волошин (#7)
- Усилены зоны ответственности: landing page, CI/CD, тестирование
- Подготовлена инфраструктура `apps/landing/` (Vite + TailwindCSS)

**Ключевые решения:**
- Landing page как отдельное приложение в монорепо (`apps/landing/`)
- Vite + TailwindCSS 4 + vanilla JS (без фреймворка — максимальная скорость)
- Несколько вариантов дизайна для согласования CEO в браузере

**Артефакты:** `TEAM.md`, `apps/landing/`

---

### [S002] — 2026-03-09 — Аудит слабых сторон команды

**Роли:** #1 Product Architect
**Статус:** завершено

**Что сделано:**
- Полный аудит кодовой базы vs зоны ответственности каждого специалиста
- Выявлены 3 критические слабости: #3 (0 кода), #6 (0 инфраструктуры), #7 (0 тестов)
- Оценка #4 Mobile — основной двигатель (90%+ кода)
- Оценка #5 Backend — минимальный middleware (4 файла)
- Рекомендации CEO по замене и усилению

**Ключевые решения:**
- CEO одобрил замену 3 специалистов и усиление слабых сторон

**Артефакты:** аудит в чате (устный отчёт CEO)

---

### [S001] — 2026-03-09 — Обновление методологии до MainCore V4.4

**Роли:** #8 Chief of Staff Engineering
**Статус:** завершено

**Что сделано:**

- Создан `TEAM.md` (8 специалистов, адаптировано под EDMI)
- Создан `DEVLOG.md` (журнал разработки)
- Создан `STATUS.md` (текущее состояние проекта)
- Создан `METRICS.md` (метрики агента)
- Создан `memory/MEMORY.md` (Auto-Memory Protocol)
- Создан `docs/adr/ADR-001-woocommerce-source-of-truth.md`
- Обновлён `CLAUDE.md`: добавлены все секции V4.3 + V4.4

**Ключевые решения:**

- Полное обновление с нуля (проект не имел ни одной секции MainCore)
- Сохранён весь существующий контент проекта (Tech Stack, API Contracts, Design System и т.д.)
- ADR-001 создан ретроспективно (WooCommerce = source of truth)

**Артефакты:** `CLAUDE.md`, `TEAM.md`, `DEVLOG.md`, `STATUS.md`, `METRICS.md`, `memory/MEMORY.md`, `docs/adr/ADR-001-woocommerce-source-of-truth.md`
