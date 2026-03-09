# ТЗ-010: Коммит всех файлов Variant D + деплой на GitHub Pages

**Дата:** 2026-03-09
**Формализовал:** #1 Viktor Schulz — Product Architect
**Исполнитель(и):** #3 Tomasz Kowalski (Frontend), #6 Arjun Mehta (SRE/Deploy)
**Верификация:** #14 Hans Landa (аудит), #7 Katarina Novak (QA)
**Протокол:** #8 Daniel Hartmann (DEVLOG)
**Сложность:** M

## Цель

Задеплоить финальный Variant D (Light Bento Grid) на GitHub Pages. Все файлы variant-d существуют локально и корректны, но **НИКОГДА НЕ БЫЛИ ЗАКОММИЧЕНЫ** в master. Это root cause всех проблем с деплоем — gh-pages получал стейл/пустые файлы.

## Диагностика root cause

```
git status -s показывает:
?? apps/landing/src/variant-d.css      ← UNTRACKED (не в git!)
?? apps/landing/variant-d.html         ← UNTRACKED (не в git!)
?? apps/landing/public/                ← UNTRACKED (изображения продуктов)
?? apps/landing/src/variant-e.css      ← UNTRACKED
?? apps/landing/variant-e.html         ← UNTRACKED
?? apps/landing/src/variant-f.css      ← UNTRACKED
?? apps/landing/variant-f.html         ← UNTRACKED
?? apps/landing/src/variant-a-light.css ← UNTRACKED
?? apps/landing/variant-a-light.html   ← UNTRACKED
 M apps/landing/vite.config.js         ← Modified but not staged
 M apps/landing/src/i18n/en.json       ← Modified but not staged
 M apps/landing/src/i18n/uk.json       ← Modified but not staged
```

**Последний коммит:** dd821da (S007 — только варианты A, B, C).
**Все файлы S008-S011 не закоммичены.** Деплой на gh-pages строился из закоммиченных файлов → variant-d.css отсутствовал или был пустым.

## Скоуп

**Включено:**
- Коммит ВСЕХ незакоммиченных файлов (variants D, E, F, A-Light, images, i18n, configs)
- Билд через `GITHUB_PAGES=true pnpm build`
- Деплой dist/ в gh-pages ветку
- Верификация на live site: все карточки с фото — белый фон (#FFFFFF)

**НЕ включено:**
- Изменения CSS/HTML — всё уже корректно локально
- Новые фичи

## Технические требования

1. `git add` всех untracked и modified файлов
2. `git commit` с описанием всех изменений S008-S011
3. `cd apps/landing && GITHUB_PAGES=true pnpm build` — получить dist/
4. Скопировать dist/ во временную папку
5. `git checkout gh-pages`
6. Очистить старые файлы, скопировать из dist/
7. `git add -A && git commit && git push`
8. `git checkout master`
9. Верификация: fetch CSS с CDN, проверить `background:#fff` для `.bento-card--about-image`

## Критерии приёмки

- [ ] Все файлы variant-d закоммичены в master
- [ ] `pnpm build` проходит без ошибок
- [ ] gh-pages содержит свежий билд
- [ ] Live site: `.bento-card--about-image` имеет `background: #FFFFFF`
- [ ] Live site: `.bento-card` (base) имеет `background: #FFFFFF`
- [ ] Live site: Hero карточка — белый фон
- [ ] Live site: Все product карточки — белый фон
- [ ] Verification script (73 data points) — PASS

## Validation

```bash
# 1. Build succeeds
cd apps/landing && GITHUB_PAGES=true pnpm build && echo "ok Build"

# 2. CSS contains white backgrounds
grep -c "background:#fff" dist/assets/*.css && echo "ok CSS"

# 3. Verification script
node ../../scripts/verify-variant-d-data.js && echo "ok Data"
```

## Артефакты

- `apps/landing/variant-d.html` — финальный HTML
- `apps/landing/src/variant-d.css` — финальный CSS (light theme)
- `apps/landing/public/images/products/` — 7 фото продуктов
- `apps/landing/src/i18n/uk.json`, `en.json` — обновлённые переводы
- `apps/landing/vite.config.js` — все 7 вариантов в rollupOptions
