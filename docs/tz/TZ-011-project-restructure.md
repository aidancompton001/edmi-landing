# ТЗ-011: Полная реорганизация структуры проекта

**Дата:** 2026-03-26
**Формализовал:** #1 Marco Richter — Product Architect
**Исполнитель:** #1 Marco Richter
**Ревью:** #14 Hans Landa — CONDITIONAL PASS (условие: обновить все пути в CLAUDE.md)
**Сложность:** M

## Цель

Навести порядок в папке проекта: организовать docs/ по типу документа, переименовать фотки, удалить дубликаты, убрать лишнее из корня.

## Что сделано

### Новая структура docs/

- `docs/specs/` — технические спецификации (API_CONTRACTS, ARCHITECTURE, TECH_STACK, DESIGN_SYSTEM)
- `docs/tz/` — технические задания (без изменений)
- `docs/plans/` — планы дизайна (без изменений)
- `docs/adr/` — Architecture Decision Records (без изменений)
- `docs/assets/ref/` — 16 UX-референсов (переименованы из photo_* в ref-NN-описание.jpg)
- `docs/assets/brandbook/` — брендбук EDMI (из docs/brandbook/)
- `docs/assets/presentation/` — презентации 4 языка (из docs/presentation/)

### Перемещения из корня

- `CEO_PROMPTS.md` → `docs/CEO_PROMPTS.md`
- `METRICS.md` → `docs/METRICS.md`

### Удалено

- `docs/FOLDER_STRUCTURE.md` — дублировал структуру из CLAUDE.md, устарел
- `docs/PROGRESS.md` — дублировал PHASES.md + DEVLOG.md, не обновлялся с 2026-02-11

### Обновлено

- CLAUDE.md — таблица документации, секция Project Structure, путь к METRICS.md
- `packages/shared/src/constants/theme.ts` — комментарий с путём к DESIGN_SYSTEM.md

## Критерии приёмки

- [x] docs/ организован по типу (specs/tz/plans/adr/assets)
- [x] Все 16 фоток переименованы с осмысленными именами
- [x] Дубликаты (FOLDER_STRUCTURE, PROGRESS) удалены
- [x] CEO_PROMPTS и METRICS убраны из корня
- [x] CLAUDE.md обновлён — все пути корректны
- [x] Нет сломанных ссылок в коде
- [x] DEVLOG S013 записан
- [x] STATUS.md обновлён
