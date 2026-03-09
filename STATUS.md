# STATUS.md — EDMI

**Обновлен:** 2026-03-09
**Сессия:** S006 (3 прототипа лендинга — ГОТОВО)

## Текущий этап

3 прототипа лендинга EDMI построены и работают на localhost:5173. Готовы к CEO review. Все протокольные задачи выполнены (страйк записан, Landa добавлен, DEVLOG, ТЗ-006).

## Команда (v2.1 — из MONO + Hans Landa)

| # | Имя | Роль | Задача на лендинге |
|---|-----|------|--------------------|
| #1 | Marco Richter | Product Architect | Стратегия, контроль (СТРАЙК 1/2) |
| #2 | Elif Aydin | UX/UI Engineer | Дизайн, 3 варианта |
| #3 | Tomasz Kowalski | Frontend Engineer | Верстка, анимации |
| #4 | Luca Moretti | Mobile Engineer | Standby (мобилка) |
| #5 | Stefan Berger | Backend Engineer | API форм |
| #6 | Arjun Mehta | SRE | Dev server, deploy |
| #7 | Katarina Novak | QA Engineer | Тесты, Lighthouse |
| #8 | Sven Lindqvist | Chief of Staff | Протокол, DEVLOG |
| #14 | Hans Landa | Critical Reviewer | Аудит решений, LANDA REPORT |

## Последние выполненные задачи

- [x] Phase 0: Протокол — страйк Marco (#1), Hans Landa в TEAM.md, DEVLOG S006, TZ-006
- [x] Phase 1: CSS-токены исправлены (Montserrat, 3-цветный градиент, primary #90267C)
- [x] Phase 1: i18n (uk.json + en.json), products.json (4 микроскопа + 6 аксесуарных категорий)
- [x] Phase 2: Common JS (language switcher, scroll animations, counters, form handler, smooth scroll)
- [x] Phase 3: Variant A "Glass Prism" — 512 строк HTML + 28KB CSS (dark + glassmorphism)
- [x] Phase 4: Variant B "Clean Surgical" — 408 строк HTML + 24KB CSS (light + minimal)
- [x] Phase 5: Variant C "Neon Depth" — 431 строк HTML + 27KB CSS (dark + neon)
- [x] Phase 6: Router page + dev server verification (HTTP 200 all pages)
- [x] Phase 7: DEVLOG S006 updated, STATUS.md updated

## Как посмотреть прототипы

```bash
cd apps/landing && pnpm dev
# Открыть http://localhost:5173
# Выбрать вариант A, B или C
```

## Следующие задачи (приоритет)

1. [ ] CEO review: выбор варианта или комбинация
2. [ ] Telegram Bot Token + Chat ID от CEO для формы
3. [ ] EdmiTools URL от CEO
4. [ ] Реальные фото микроскопов (сейчас placeholders)
5. [ ] Favicon из брендбука
6. [ ] Lighthouse аудит и оптимизация
7. [ ] Cross-browser тестирование

## Блокеры / Проблемы

- Telegram Bot Token / Chat ID для формы — CEO предоставит
- EdmiTools URL — placeholder `https://edmitools.com`
- Фото микроскопов — нужны реальные изображения

## Ключевые решения (текущие)

- Landing как отдельное приложение в монорепо (`apps/landing/`)
- Vite 6 + TailwindCSS 4 + vanilla JS (без фреймворка)
- 3 варианта: Glass Prism (A), Clean Surgical (B), Neon Depth (C)
- Брендбук: Unbounded + Montserrat, градиент #90267C -> #7938A9 -> #11387F
- Hans Landa (#14) — обязательный аудит перед демонстрацией CEO

## Рабочие файлы (последние измененные)

- `apps/landing/variant-a.html` — Glass Prism (33KB)
- `apps/landing/variant-b.html` — Clean Surgical (29KB)
- `apps/landing/variant-c.html` — Neon Depth (24KB)
- `apps/landing/index.html` — Router page (5KB)
- `apps/landing/src/styles.css` — Общие токены (исправлено по брендбуку)
- `apps/landing/src/main.js` — Common JS (200+ строк)
- `apps/landing/src/i18n/` — uk.json + en.json
- `apps/landing/src/data/products.json` — Данные товаров
- `TEAM.md` v2.1 — Hans Landa, страйк Marco
- `DEVLOG.md` — S001-S006
- `docs/tz/TZ-006-landing-prototypes.md` — ТЗ с чек-листом
