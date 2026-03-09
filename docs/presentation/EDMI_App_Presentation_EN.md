# EDMI — Mobile App for Dental Microscopes

## Product Presentation

---

## About the Project

**EDMI** is a full-featured mobile application for EDMI (edmi.com.ua), a leading supplier of dental microscopes and optical equipment in Ukraine and Europe.

The app provides dentists with direct access to the equipment catalog, an interactive microscope configurator, an AI assistant, and AR visualization — right from their smartphone.

---

## App Features

### 1. Product Catalog

A complete catalog of dental microscopes with **real-time synchronization** with the main edmi.com.ua website via WooCommerce API.

- Marketplace-style home screen (Rozetka-style layout)
- Hero section with gradient background and search
- Quick Action buttons for instant access to key features
- Recommendations and best deals
- Category grid with real product images
- Brand filtering and sorting
- Product cards with prices, discounts, and availability status

### 2. Product Detail Page (PDP)

Detailed presentation of each microscope:

- Photo gallery with pagination and swipe navigation
- Badges: new / used / discount
- Specifications in expandable accordions
- Delivery and payment information
- B2B button: "Request an invoice"
- Related products
- Bottom bar: compare, cart, favorites, "Buy"

### 3. Microscope Configurator

A unique feature — **interactive microscope assembly** tailored to client needs:

- Choose from 4 models: Zeiss Pico Mora, Zeiss PROergo, Leica M320, CJ-Optik Flexion
- 5 option groups: color, mount, illumination, objective, camera
- Real price deltas in EUR for each option
- Real-time cost calculation
- Photo carousel of the selected model
- Add configuration to cart with a single tap

### 4. EDMik — AI Assistant

Built-in chatbot **EDMik** available on every screen:

- Floating Action Button (EDMI's signature purple color)
- Intent recognition across 73 keywords
- 8 response types: recommendations, navigation, product cards
- Quick Actions: "Reorder", "Order Status", "Contact Manager"
- Product cards directly in chat with PDP navigation
- Prepared for Claude AI and voice input integration

### 5. AR Visualization — "View in Your Office"

Augmented reality technology to preview the microscope in your space:

- Full-screen AR mode using the device camera
- Automatic horizontal surface detection
- Place a 3D microscope model with a single tap
- Gestures: drag, two-finger rotate, pinch-to-zoom
- Reset position and re-place
- Fallback screen for devices without AR support

### 6. Cart & Checkout

A complete purchasing flow:

- Cart with quantity management (+/-), removal, and clearing
- 4-step checkout: Contact Info → Delivery → Payment → Confirmation
- LiqPay and WayForPay support (integration prepared)
- Nova Poshta delivery integration
- Order summary with itemized breakdown

### 7. Profile & Orders

- Authentication (phone / email)
- Order history with status filtering
- Order details with timeline tracking
- Favorites / Wishlist
- Language switching (UK / EN)

---

## Technical Architecture

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Mobile** | React Native + Expo SDK 54 (New Architecture) |
| **Navigation** | expo-router v6 (file-based routing) |
| **State** | Zustand v5 (7 stores) + TanStack Query v5 |
| **UI** | Custom design system (37 components) |
| **3D / AR** | @reactvision/react-viro (ViroReact) |
| **i18n** | i18next + react-i18next (Ukrainian, English) |
| **Backend** | Node.js + Express + PostgreSQL + Redis |
| **API** | WooCommerce Store API (public, real data) |
| **AI** | Anthropic Claude API (prepared) |
| **Typing** | TypeScript (strict mode) |

### Project Architecture

```
edmi/
├── apps/
│   ├── mobile/          ← React Native (Expo)
│   │   ├── app/         ← 18 routes (file-based routing)
│   │   ├── components/  ← 37 React components
│   │   ├── stores/      ← 7 Zustand stores
│   │   ├── hooks/       ← TanStack Query hooks
│   │   └── screens/     ← Lazy-loaded screens (AR)
│   └── admin/           ← Admin panel (Vite + React)
├── packages/
│   ├── shared/          ← 24 modules (types, validators, mocks, i18n)
│   └── server/          ← Express middleware server
└── docs/                ← Documentation (6 files)
```

### Key Architectural Decisions

1. **Monorepo (pnpm workspaces)** — single codebase for mobile, server, admin, and shared package
2. **WooCommerce as source of truth** — real data from the website, no duplicates
3. **Shared package** — types, validators, and translations used on both client and server
4. **Offline-capable** — TanStack Query + AsyncStorage for catalog caching
5. **Lazy loading for AR** — ViroReact loads only when navigating to the AR screen
6. **Server-side signatures** — all cryptographic operations handled exclusively on the server

---

## Project in Numbers

| Metric | Value |
|--------|-------|
| Screens / routes | 18 |
| React components | 37 |
| Zustand stores | 7 |
| Shared modules | 24 |
| Interface languages | 2 (UK, EN) |
| Project documents | 6 |
| Bugs resolved | 11 |
| 3D models | 1 (Microscope.glb, 30 MB) |
| Development phases | 8 completed |

---

## Development Cost Estimate

### If Built by an Outsourcing Agency

Developing an app of this caliber at an agency would require:

| Role | Hours | Rate ($/hr) | Cost |
|------|-------|-------------|------|
| UI/UX Designer | 120-160 | $50-80 | $6,000-12,800 |
| Mobile Developer (React Native) | 500-700 | $60-100 | $30,000-70,000 |
| Backend Developer | 200-300 | $60-100 | $12,000-30,000 |
| QA Engineer | 100-150 | $40-60 | $4,000-9,000 |
| Project Manager | 80-120 | $50-70 | $4,000-8,400 |
| DevOps / Infrastructure Setup | 40-60 | $60-80 | $2,400-4,800 |
| **TOTAL** | **1,040-1,490 hrs** | | **$58,400-135,000** |

**Average market cost: $80,000 — $120,000**

**Agency timeline: 3-5 months** with a team of 4-5 people.

### How It Was Actually Built

| Parameter | Value |
|-----------|-------|
| **Development time** | ~4 days |
| **Budget** | $0 |
| **Team** | 1 person + Claude AI |
| **Method** | AI-driven development (Claude Code) |

Savings: **$80,000-120,000** and **3-5 months** of development time.

---

## Development Methodology

### AI-Driven Architecture

The project was built using **AI-augmented development** — where the architect (human) defines the vision, and the AI assistant (Claude) handles the implementation.

**How it worked:**

1. **Strategic planning** — the developer defined phases, priorities, and architectural decisions
2. **Research & analysis** — AI agents simultaneously explored the codebase, API documentation, and dependencies
3. **Structural design** — each phase plan was approved before implementation began
4. **Iterative implementation** — phase-by-phase creation with real-device testing after each stage
5. **Instant debugging** — bugs were analyzed by agents with evidence from the source code

**Why it works:**

- The architect focuses on **what** and **why**, AI handles the **how**
- Every decision is documented and justified
- Parallel exploration: 3 AI agents simultaneously analyze different aspects of a task
- Zero technical debt — strict TypeScript, validation at every step
- Complete project documentation created during the development process

---

## Unique Advantages

### For EDMI's Business

- **Direct sales channel** — bypassing marketplaces
- **AR demonstration** — clients see the microscope in their office before purchasing
- **Configurator** — increases average order value through up-sell options
- **AI assistant** — reduces workload on sales managers
- **Offline catalog** — works even without internet

### For Dentists

- **Professional tool** — not just a store, but an equipment selection assistant
- **AR preview** — objective assessment of microscope dimensions in real space
- **B2B features** — invoice requests, order history
- **Multilingual** — Ukrainian and English interface

---

## Status & Roadmap

### What's Ready (v0.1.0)

- [x] Full catalog with real WooCommerce data
- [x] Detailed product pages
- [x] Cart and 4-step checkout
- [x] Orders and tracking
- [x] Microscope configurator
- [x] EDMik AI chatbot
- [x] AR visualization
- [x] Authentication and profile
- [x] Multilingual interface

### Next Steps

- [ ] Claude AI integration for a full-featured AI assistant
- [ ] Voice input (Whisper API)
- [ ] Live payment integration (LiqPay, WayForPay)
- [ ] Push notifications (Firebase)
- [ ] Admin panel with AI assistant for used equipment appraisal
- [ ] App Store and Google Play publication

---

**EDMI Mobile App v0.1.0**
Built in 4 days | $0 budget | Powered by Claude AI

*edmi.com.ua*
