# EDMI — Memory

## API Gotchas
- WooCommerce REST API v3: `price` returns as **string** (e.g., `"15000.00"`), always parse with `parseFloat()`
- WC Store API (public, no auth): `https://edmi.com.ua/wp-json/wc/store/v1/` — used for direct mobile access
- WC default pagination: 10 items. Use `per_page=100` for bulk fetch
- Nova Poshta API: POST-only (`https://api.novaposhta.ua/v2.0/json/`), no GET endpoints

## Рабочие паттерны
- Expo Go + Tunnel: remove `expo-dev-client` and `@reactvision/react-viro` from app.json plugins (they cause binary mismatch)
- Tunnel mode on Windows: requires `$env:NODE_OPTIONS="--dns-result-order=ipv4first"` and `$env:EXPO_DOCTOR_SKIP_DEPENDENCY_VERSION_CHECK="1"`
- Direct WC access from mobile (`lib/wc-direct.ts`) bypasses middleware — needed when middleware server unreachable via tunnel
- react-native-reanimated ~3.16.7 — PINNED version, do not upgrade without testing
- pnpm monorepo: `apps/*`, `packages/*` workspaces
- npm registry issues on Windows: use `--registry https://registry.npmmirror.com` as fallback

## Landing Page
- Stack: Vite 6 + TailwindCSS 4 + vanilla JS (no framework — max performance)
- Location: `apps/landing/` in monorepo
- Design tokens synced with mobile app (same colors, fonts)
- CEO wants to see multiple design variants in browser before choosing
- Fonts: Unbounded (headings) + Inter (body) — Google Fonts

## Предпочтения CEO
- Язык общения: русский
- Решения должны быть evidence-based, подтверждены документацией — запрещены гипотезы и предположения
- При ошибках: запускать агентов-исследователей для поиска root cause в исходном коде и GitHub issues
- UI текст: украинский + английский (i18next)
- Код/комментарии: английский
