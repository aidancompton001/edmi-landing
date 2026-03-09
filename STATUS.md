# STATUS.md — EDMI

**Обновлен:** 2026-03-09
**Сессия:** S011 (TZ-009 — Variant D Light Theme + Accent Gradients)

## Текущий этап

CEO уточнил дизайн-направление: Variant D должен быть СВЕТЛЫМ (белый фон, белые карточки). Фиолетовый градиент из брендбука — только в акцентах: цены, кнопки, hover-окантовки, бейджи. Тёмный градиент — только в hero-карточке и footer. Выполнен откат CSS с тёмной темы на светлую (TZ-009). Hans Landa (#14) PASS. Задеплоено на GitHub Pages.

## Команда (v3.0 — Sven Lindqvist Acting Lead)

| # | Имя | Роль | Статус |
|---|-----|------|--------|
| #1 | Viktor Schulz (NEW) | Product Architect | Active |
| #2 | Elif Aydin | UX/UI Engineer | Active |
| #3 | Tomasz Kowalski | Frontend Engineer | Active |
| #4 | Luca Moretti | Mobile Engineer | Standby |
| #5 | Stefan Berger | Backend Engineer | Standby |
| #6 | Arjun Mehta | SRE | Active |
| #7 | Katarina Novak | QA Engineer | Active |
| #8 | Sven Lindqvist | **ПРАВАЯ РУКА CEO** / Acting Lead + CoS | Active |
| #14 | Hans Landa | Critical Reviewer | Active |

## Выполненные задачи

- [x] S006: 3 прототипа лендинга (A, B, C)
- [x] S007: Деплой на GitHub Pages
- [x] S008: Реорганизация команды, TZ-008 формализован
- [x] S009: TZ-008 выполнен — A-Light, D, E, F созданы и задеплоены
- [x] S010: Variant D Final — Dark Bento + реальный контент + деплой + i18n fix
- [x] S011: TZ-009 — Variant D откат на светлую тему + акцентный градиент + деплой

## Финальный лендинг

**Variant D (Light Bento Grid):** <https://aidancompton001.github.io/edmi-landing/variant-d.html>

### Все варианты:

- **A** — Glass Prism (dark): <https://aidancompton001.github.io/edmi-landing/variant-a.html>
- **A-Light** — Glass Prism Light: <https://aidancompton001.github.io/edmi-landing/variant-a-light.html>
- **B** — Clean Surgical (light): <https://aidancompton001.github.io/edmi-landing/variant-b.html>
- **C** — Neon Depth (dark): <https://aidancompton001.github.io/edmi-landing/variant-c.html>
- **D** — **ФИНАЛЬНЫЙ** Light Bento Grid: <https://aidancompton001.github.io/edmi-landing/variant-d.html>
- **E** — Scroll Story (light): <https://aidancompton001.github.io/edmi-landing/variant-e.html>
- **F** — Light Glass (light): <https://aidancompton001.github.io/edmi-landing/variant-f.html>

## Блокеры / Проблемы

- Telegram Bot Token / Chat ID для формы — CEO предоставит
- EdmiTools URL — placeholder `https://edmitools.com`
- Гарантия trade-in: в HTML "до 12 місяців", в дизайн-доке "від 6 місяців" — уточнить у CEO

## Ключевые решения

- Landing как отдельное приложение в монорепо (`apps/landing/`)
- Vite 6 + TailwindCSS 4 + vanilla JS (без фреймворка)
- **Variant D выбран CEO как финальный** — СВЕТЛАЯ тема, Bento Grid
- Цветовая схема: #FFFFFF (фон), #1D1D1F (текст), #90267C (акценты), gradient в ценах/кнопках/hover
- Footer: тёмный (#050508) для контраста
- 7 фото продуктов скачаны локально (не hotlink с edmi.com.ua)
- Брендбук: Unbounded + Montserrat, градиент #90267C → #7938A9 → #11387F
- Hans Landa (#14) — обязательный аудит перед демонстрацией CEO
- ЖЕЛЕЗНОЕ ПРАВИЛО соблюдено: все числа верифицированы скриптом (73/73)

## Рабочие файлы

- `apps/landing/variant-d.html` — **ФИНАЛЬНЫЙ** Light Bento Grid (~730 строк)
- `apps/landing/src/variant-d.css` — CSS светлая тема + акцентный градиент (~1742 строк)
- `apps/landing/public/images/products/` — 7 локальных фото продуктов
- `docs/tz/TZ-009-variant-d-light-theme-accent-gradient.md` — ТЗ на светлую тему
- `scripts/verify-variant-d-data.js` — Скрипт верификации данных
- `apps/landing/index.html` — Router (7 вариантов)
- `apps/landing/vite.config.js` — Все варианты в rollupOptions
