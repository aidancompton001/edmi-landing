# STATUS.md — EDMI

**Обновлен:** 2026-03-26
**Сессия:** S014 (TZ-012 — ROADMAP Variant A-Light)

## Текущий этап

Клиент выбрал **Variant A-Light (Prism Lite)** как финальный лендинг. Создан ROADMAP с 7 фазами внедрения фиксов по фидбеку клиента. Контакты верифицированы CEO (i18n данные). Маппинг продуктов подтверждён. Следующий шаг — выполнение Фазы 0 (замена фейковых данных на реальные).

## Команда

| # | Имя | Роль | Статус |
|---|-----|------|--------|
| #1 | Viktor Schulz | Product Architect | Active |
| #2 | Elif Aydin | UX/UI Engineer | Active |
| #3 | Tomasz Kowalski | Frontend Engineer | Active |
| #4 | Luca Moretti | Mobile Engineer | Standby |
| #5 | Stefan Berger | Backend Engineer | Standby |
| #7 | Katarina Novak | QA Engineer | Active |
| #8 | Daniel Hartmann | Acting Lead + CoS | Active |
| #14 | Hans Landa | Critical Reviewer | Active |

## Выполненные задачи

- [x] S006: 3 прототипа лендинга (A, B, C)
- [x] S007: Деплой на GitHub Pages
- [x] S008: Реорганизация команды, TZ-008 формализован
- [x] S009: TZ-008 выполнен — A-Light, D, E, F созданы и задеплоены
- [x] S010: Variant D Final — Dark Bento + реальный контент + деплой + i18n fix
- [x] S011: TZ-009 — Variant D откат на светлую тему + акцентный градиент + деплой
- [x] S012: Фикс карточек с фото (белый фон) + увольнение #8 Sven Lindqvist
- [x] S013: TZ-011 — Полная реорганизация структуры проекта
- [x] S014: TZ-012 — ROADMAP Variant A-Light (7 фаз)

## ROADMAP Variant A-Light — Прогресс

| Фаза | Назва | Розмір | Статус |
|------|-------|--------|--------|
| 0 | Реальні дані + конфіг | S | ✅ DONE |
| 1 | Лого EDMI + FAB кнопка | S | ✅ DONE |
| 2 | Фото товарів в карточках | M | ✅ DONE |
| 3 | Lightbox товару | M | ✅ DONE |
| 4 | Аксесуари — фото замість іконок | M | ✅ DONE |
| 5 | Сервіс — відео (плейсхолдер) | S | ✅ DONE |
| 6 | Фільтри мікроскопів | S | ✅ DONE |

## Верифицированные контакты (CEO OK)

- Телефон: +38 (067) 000-24-67
- Email: office@edmi.dental
- Адрес: м. Івано-Франківськ, вул. Євгена Коновальця 229, Індустріальний парк Аркан

## Рабочие файлы

- `apps/landing/variant-a-light.html` — **ФИНАЛЬНЫЙ** лендинг (выбран клиентом)
- `apps/landing/src/variant-a-light.css` — CSS светлая тема + градиенты
- `apps/landing/public/images/products/` — 7 локальных фото продуктов
- `docs/ROADMAP-VARIANT-A-LIGHT.md` — ROADMAP (7 фаз)
- `docs/tz/TZ-012-variant-a-light-roadmap.md` — Техническое задание

## Блокеры

- Telegram Bot Token / Chat ID для формы — CEO предоставит
- Видео для секции сервиса — CEO предоставит URL (пока плейсхолдер)
- Лого EDMI SVG/PNG — нужно скачать с edmi.com.ua или извлечь из брендбука
