# TZ-006: Landing Page — 3 прототипа для CEO Review

**Дата:** 2026-03-09
**Заказчик:** CEO
**Ответственный:** #1 Marco Richter (стратегия), #2 Elif Aydin (дизайн), #3 Tomasz Kowalski (верстка)
**Верификация:** #14 Hans Landa (аудит), #7 Katarina Novak (QA)
**Протокол:** #8 Sven Lindqvist (DEVLOG)
**Инфраструктура:** #6 Arjun Mehta (dev server, deploy)

## Требования CEO (дословно)

1. Категории: нови та вживани микроскопи
2. Посилання на сайт EdmiTools (отдельный сайт, placeholder URL)
3. Окремий блок — аксесуари до микроскопив
4. БЕЗ корзини, БЕЗ платижной форми
5. Форми зворотного зв'язку (рабочие с первого дня — Telegram webhook)
6. Блок сервисного обслуговування
7. Мова: uk + en (переключатель)
8. 3 прототипа, все 3 видимые в браузере
9. Строго по брендбуку (Unbounded, Montserrat, gradient #90267C -> #7938A9 -> #11387F)
10. Стильно, 2026, glass-эффекты, анимации, mobile responsive
11. Все кнопки рабочие (навигация, ссылки на edmi.com.ua, формы)

## 3 варианта дизайна

| Вариант | Название | Стиль | Фон |
|---------|----------|-------|-----|
| A | Glass Prism | Темный + glassmorphism | #0A0A0F + gradient glows |
| B | Clean Surgical | Светлый + минимализм | #FFFFFF / #F5F5F7 |
| C | Neon Depth | Темный + neon glow | #09090B + CSS grid |

## Секции лендинга (все 3 варианта)

1. Header — лого + навигация + EdmiTools + uk/en
2. Hero — полноэкранный, CTA "Отримати консультацию"
3. Про EDMI — 4+ років, 3500+ клієнтів, 15 партнерів (animated counters)
4. Нові мікроскопи — Zeiss EXTARO, CJ-Optik -> кнопка edmi.com.ua
5. Вживані мікроскопи — trade-in програма + CTA -> форма
6. Аксесуари — категорії -> кнопки на edmi.com.ua
7. Сервісне обслуговування — інфо-блок
8. Форма зворотного зв'язку — ім'я, телефон, повідомлення -> Telegram
9. Footer — контакти, соцмережі, EdmiTools, edmi.com.ua

**Вариант B** — альтернативный порядок: Header, Hero, Про EDMI, Сервіс, Нові, Вживані, Аксесуари, Форма, Footer

## Технический стек

- Vite 6 + TailwindCSS 4 + vanilla JS
- Расположение: `apps/landing/`
- Отдельные HTML-файлы: variant-a.html, variant-b.html, variant-c.html
- index.html — страница выбора варианта (роутер)
- Общий JS: main.js (language switcher, scroll animations, form handler, counter animation)
- i18n: uk.json + en.json
- Данные товаров: products.json (build-time fetch с WC Store API)

## Чек-лист приёмки

- [ ] 3 варианта открываются в браузере (localhost:5173)
- [ ] Вариант A: Glass Prism (темный + glass) — все 9 секций
- [ ] Вариант B: Clean Surgical (светлый + минимализм) — все 9 секций
- [ ] Вариант C: Neon Depth (темный + neon) — все 9 секций
- [ ] Шрифты: Unbounded (заголовки) + Montserrat Medium (текст)
- [ ] Градиент: 3 цвета #90267C -> #7938A9 -> #11387F
- [ ] Логотип EDMI по брендбуку (охоронне поле)
- [ ] Навигация: smooth scroll ко всем секциям
- [ ] Ссылки на edmi.com.ua: товары, категории
- [ ] EdmiTools: кнопка в header + ссылка в footer
- [ ] Форма: имя + телефон + сообщение -> Telegram webhook -> toast
- [ ] Переключатель uk/en: все тексты меняются
- [ ] Mobile responsive: 320px — 2560px
- [ ] Все кнопки кликабельны и ведут куда нужно
- [ ] prefers-reduced-motion: анимации отключаются
- [ ] Lighthouse: Performance 95+, Accessibility 100, SEO 100
- [ ] Hans Landa (#14) PASS на финальный план
