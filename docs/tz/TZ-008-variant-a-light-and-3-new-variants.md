# TZ-008: Новый светлый вариант A + 3 новых варианта на основе трендовых лендингов

**Дата:** 2026-03-09
**Заказчик:** CEO
**Контроль:** #8 Sven Lindqvist (ПРАВАЯ РУКА CEO, Acting Lead)
**Протокол:** #8 Sven Lindqvist (DEVLOG)

## Распределение ответственных

| Этап | Ответственный | Роль | Что делает |
|------|---------------|------|------------|
| Задача 1: A-Light дизайн | #2 Elif Aydin | Principal UX/UI | Адаптация Glass Prism в светлую тему, цветовые решения |
| Задача 1: A-Light вёрстка | #3 Tomasz Kowalski | Senior Staff Frontend | HTML + CSS, responsive, анимации |
| Задача 2 Этап 1: Исследование | #2 Elif Aydin | Principal UX/UI | Поиск 10 трендовых лендингов, анализ стилей |
| Задача 2 Этап 1: Аудит | #14 Hans Landa | Critical Reviewer | LANDA REPORT по 10 лендингам |
| Задача 2 Этап 1: Выбор 3 | #2 Elif Aydin | Principal UX/UI | Выбор 3 лучших с обоснованием |
| Задача 2 Этап 2: Дизайн D/E/F | #2 Elif Aydin | Principal UX/UI | Дизайн-концепции 3 вариантов на основе трендов |
| Задача 2 Этап 2: Вёрстка D/E/F | #3 Tomasz Kowalski | Senior Staff Frontend | HTML + CSS + JS, responsive |
| Задача 2 Этап 2: Валидация | #14 Hans Landa | Critical Reviewer | LANDA REPORT по каждому варианту D/E/F |
| Задача 2 Этап 3: Деплой | #6 Arjun Mehta | Staff SRE | Обновление роутера, vite.config.js, GitHub Pages |
| Продуктовая стратегия | #1 Viktor Schulz | Product Architect | CTA placement, conversion strategy для новых вариантов |
| QA / Lighthouse | #7 Katarina Novak | Principal QA | Responsive тест, Lighthouse аудит, cross-browser |
| Общий контроль | #8 Sven Lindqvist | Acting Lead + CoS | Контроль протокола, DEVLOG, координация |

## Задача 1: Новый светлый вариант на основе Variant A

CEO выбрал Variant A (Glass Prism) как лучший по структуре/стилю. СОЗДАТЬ НОВЫЙ СВЕТЛЫЙ ВАРИАНТ на основе A.

**ВАЖНО: Variant A (тёмный Glass Prism) НЕ ТРОГАТЬ! Он остаётся как есть. Добавляется НОВЫЙ вариант.**

**Файлы:**
- `apps/landing/variant-a-light.html` — новый HTML (копия структуры variant-a.html)
- `apps/landing/src/variant-a-light.css` — новый CSS (светлая тема)

**Требования:**
- Сохранить структуру, секции, анимации Variant A
- Светлый фон (#FFFFFF / #F5F5F7) вместо тёмного (#0A0A0F)
- Адаптировать glass-эффекты под светлую тему (light glassmorphism)
- Тёмный текст (#1A202C) вместо светлого (#E2E8F0)
- Градиент бренда сохраняется: #90267C → #7938A9 → #11387F
- Строго по брендбуку (Unbounded + Montserrat)

## Задача 2: Исследование + 3 новых варианта

### Этап 1: Исследование (#2 Elif Aydin + #14 Hans Landa)

1. #2 Elif Aydin находит 10 самых трендовых лендингов за январь-март 2026
2. Документирует каждый: название, URL, стиль, ключевые особенности
3. #14 Hans Landa получает список → выдаёт LANDA REPORT (критический аудит применимости для EDMI)
4. #2 Elif Aydin выбирает 3 лучших с обоснованием (почему подходят для EDMI)

### Этап 2: Генерация (#2 дизайн, #3 вёрстка, #1 стратегия, #14 валидация)

1. На основе 3 лучших создать 3 НОВЫХ СВЕТЛЫХ варианта:
   - Variant D — по мотивам тренда #1
   - Variant E — по мотивам тренда #2
   - Variant F — по мотивам тренда #3
2. Взять за основу стиль, наполнение, кастомизацию трендовых лендингов
3. Дизайн СТРОГО по брендбуку EDMI (Unbounded + Montserrat, gradient #90267C → #7938A9 → #11387F)
4. ВСЕ варианты СВЕТЛЫЕ (CEO: "темных больше не нужно")
5. #14 Hans Landa валидирует каждый вариант (LANDA REPORT)

### Этап 3: Деплой (#6 Arjun Mehta)

1. Добавить variant-a-light, D, E, F в `vite.config.js` → rollupOptions.input
2. Обновить роутер `index.html` — добавить карточки для новых вариантов
3. Сбилдить, задеплоить на GitHub Pages (ветка gh-pages)
4. Верифицировать все страницы по публичной ссылке

## ВАЖНО от CEO

- **ВСЕ** новые варианты — СВЕТЛЫЕ (темных больше не нужно)
- Придерживаться брендбука
- Hans Landa (#14) обязательно валидирует
- Работать по протоколу: ТЗ → ответственные → скиллы → исполнение → DEVLOG

## Чек-лист приёмки

- [ ] Variant A (тёмный Glass Prism) остаётся без изменений
- [ ] Variant A-Light создан (светлый, на основе структуры A) — `variant-a-light.html` + `variant-a-light.css`
- [ ] 10 трендовых лендингов найдены и задокументированы (#2 Elif Aydin)
- [ ] Hans Landa (#14) отсмотрел 10 лендингов (LANDA REPORT)
- [ ] Elif Aydin (#2) выбрала 3 лучших с обоснованием
- [ ] Variant D создан (светлый, по мотивам тренда #1) — `variant-d.html` + `variant-d.css`
- [ ] Variant E создан (светлый, по мотивам тренда #2) — `variant-e.html` + `variant-e.css`
- [ ] Variant F создан (светлый, по мотивам тренда #3) — `variant-f.html` + `variant-f.css`
- [ ] Hans Landa (#14) валидировал A-Light, D, E, F (LANDA REPORT)
- [ ] Все варианты по брендбуку (Unbounded + Montserrat, градиент #90267C → #7938A9 → #11387F)
- [ ] Все варианты responsive (320px - 2560px)
- [ ] Роутер (index.html) обновлён — видны все варианты (A, A-Light, B, C, D, E, F)
- [ ] vite.config.js обновлён (все новые HTML в rollupOptions.input)
- [ ] Задеплоено на GitHub Pages, все страницы доступны
- [ ] QA: Lighthouse Performance 90+, Accessibility 95+, SEO 95+ (#7 Katarina Novak)
- [ ] DEVLOG S009 записан (выполнение TZ-008)
