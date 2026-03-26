/**
 * EDMI Presentation PDF Generator
 * Generates beautiful slide-deck PDFs in 4 languages
 *
 * Usage: node docs/presentation/generate-pdfs.mjs
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

// ─── Load screenshots as base64 ───────────────────────────────────────────────
function loadScreenshotBase64(filename) {
  const filepath = path.join(projectRoot, 'ref', filename);
  if (!fs.existsSync(filepath)) return '';
  const data = fs.readFileSync(filepath);
  return `data:image/jpeg;base64,${data.toString('base64')}`;
}

const screenshots = {
  catalog: loadScreenshotBase64('photo_2026-02-11_15-09-18.jpg'),
  pdp1: loadScreenshotBase64('photo_2026-02-11_15-09-19 (2).jpg'),
  pdp2: loadScreenshotBase64('photo_2026-02-11_15-09-19.jpg'),
};

// ─── Product images from edmi.com.ua ──────────────────────────────────────────
const productImages = {
  zeiss: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-right-side-picture.png',
  zeissSide: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-mora-foldable-tube-left-side-picture.png',
  zeissHead: 'https://edmi.com.ua/wp-content/uploads/2025/07/extaro-300-dent-head-cropped-image.png',
  cjOptik: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-2.jpg',
  cjOptikArm: 'https://edmi.com.ua/wp-content/uploads/2023/03/cj-optik-flexion-advanced-1.jpg',
};

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  ru: {
    lang: 'ru',
    coverTitle: 'EDMI',
    coverSubtitle: 'Мобильное приложение\nдля стоматологических микроскопов',
    coverTagline: 'Каталог · Конфигуратор · AI-ассистент · AR-визуализация',
    coverVersion: 'v0.1.0 · 2026',

    aboutTitle: 'О проекте',
    aboutText: 'Полнофункциональное мобильное приложение для компании EDMI — ведущего поставщика стоматологических микроскопов и оптического оборудования в Украине и Европе.',
    aboutCards: [
      { icon: '🔬', title: 'Каталог', desc: 'Синхронизация с WooCommerce в реальном времени' },
      { icon: '⚙️', title: 'Конфигуратор', desc: 'Интерактивная сборка микроскопа' },
      { icon: '🤖', title: 'AI-ассистент', desc: 'Чат-бот EDMik на каждом экране' },
      { icon: '📱', title: 'AR-визуализация', desc: 'Примерка микроскопа в кабинете' },
    ],

    catalogTitle: 'Каталог продукции',
    catalogFeatures: [
      'Главный экран в стиле маркетплейсов',
      'Hero-секция с градиентом и поиском',
      'Quick Action кнопки',
      'Сетка категорий с изображениями',
      'Фильтрация по бренду',
      'Карточки с ценами и скидками',
    ],
    pdpTitle: 'Страница товара',
    pdpFeatures: [
      'Галерея с пагинацией и свайпом',
      'Бейджи: новый / б/у / скидка',
      'Характеристики в аккордеонах',
      'B2B «Запросить счет-фактуру»',
      'Связанные товары',
    ],

    configTitle: 'Конфигуратор микроскопа',
    configDesc: 'Уникальная функция — интерактивная сборка микроскопа под нужды клиента',
    configFeatures: [
      '4 модели: Zeiss, Leica, CJ-Optik',
      '5 групп опций: цвет, крепление, освещение, объектив, камера',
      'Реальные цены-дельты в EUR',
      'Калькуляция в реальном времени',
      'Добавление в корзину одним нажатием',
    ],
    aiTitle: 'EDMik — AI-ассистент',
    aiDesc: 'Встроенный чат-бот на каждом экране',
    aiFeatures: [
      'Floating Action Button',
      '73 ключевых слова → намерения',
      '8 типов ответов',
      'Quick Actions в чате',
      'Подготовлен для Claude AI',
    ],

    arTitle: 'AR «Посмотреть в кабинете»',
    arFeatures: [
      'Полноэкранный AR-режим',
      'Обнаружение поверхностей',
      '3D-модель одним касанием',
      'Жесты: перемещение, вращение, масштаб',
      'Fallback для устройств без AR',
    ],
    checkoutTitle: 'Корзина и Checkout',
    checkoutSteps: ['Контакты', 'Доставка', 'Оплата', 'Подтверждение'],
    checkoutFeatures: [
      'LiqPay + WayForPay',
      'Новая Почта',
      'Профиль и история заказов',
      'Переключение языка UK/EN',
    ],

    techTitle: 'Техническая архитектура',
    techStack: [
      ['Mobile', 'React Native + Expo SDK 54'],
      ['Навигация', 'expo-router v6'],
      ['Состояние', 'Zustand v5 + TanStack Query v5'],
      ['UI', 'Кастомная дизайн-система (37 компонентов)'],
      ['3D / AR', 'ViroReact'],
      ['Backend', 'Node.js + Express + PostgreSQL + Redis'],
      ['API', 'WooCommerce Store API'],
      ['AI', 'Anthropic Claude API'],
      ['Типизация', 'TypeScript (strict mode)'],
    ],
    archDecisions: [
      'Монорепо (pnpm workspaces)',
      'WooCommerce — источник истины',
      'Shared-пакет: типы + валидаторы + i18n',
      'Offline-capable каталог',
      'Lazy loading для AR',
    ],

    numbersTitle: 'Проект в цифрах',
    numbers: [
      { value: '18', label: 'Экранов' },
      { value: '37', label: 'Компонентов' },
      { value: '7', label: 'Stores' },
      { value: '24', label: 'Shared-модулей' },
      { value: '2', label: 'Языка UI' },
      { value: '11', label: 'Исправлено багов' },
      { value: '8', label: 'Фаз разработки' },
      { value: '6', label: 'Документов' },
      { value: '30MB', label: '3D-модель' },
    ],

    costTitle: 'Оценка стоимости',
    costAgencyTitle: 'Аутсорс-компания',
    costAgencyPrice: '$80,000 — $120,000',
    costAgencyTime: '3-5 месяцев',
    costAgencyTeam: '4-5 человек',
    costAgencyHours: '1,040 — 1,490 часов',
    costRealTitle: 'Как было на самом деле',
    costRealPrice: '$0',
    costRealTime: '~4 дня',
    costRealTeam: '1 человек + Claude AI',
    costSavings: 'Экономия: $80,000 — $120,000',

    methodTitle: 'AI-driven разработка',
    methodDesc: 'Архитектор определяет видение, AI выполняет реализацию',
    methodSteps: [
      { num: '01', title: 'Планирование', desc: 'Фазы, приоритеты, архитектура' },
      { num: '02', title: 'Исследование', desc: 'AI-агенты анализируют кодовую базу' },
      { num: '03', title: 'Проектирование', desc: 'План утверждается до реализации' },
      { num: '04', title: 'Реализация', desc: 'Пофазное создание с тестированием' },
      { num: '05', title: 'Отладка', desc: 'Агенты с доказательной базой' },
    ],
    methodWhy: [
      'Архитектор: что + зачем. AI: как',
      'Параллельное исследование 3 агентами',
      'Strict TypeScript, нулевой тех. долг',
      'Документация в процессе разработки',
    ],

    closingReady: 'Что готово',
    closingItems: [
      'Каталог с данными WooCommerce',
      'Детальные страницы товаров',
      'Корзина и 4-шаговый checkout',
      'Конфигуратор микроскопов',
      'AI-чатбот EDMik',
      'AR-визуализация',
      'Профиль, заказы, мультиязычность',
    ],
    closingNext: 'Далее',
    closingNextItems: [
      'Claude AI интеграция',
      'Голосовой ввод (Whisper)',
      'Платежи LiqPay / WayForPay',
      'Push-уведомления',
      'App Store + Google Play',
    ],
    closingFooter: 'Разработано за 4 дня · $0 бюджет · Powered by Claude AI',
  },

  uk: {
    lang: 'uk',
    coverTitle: 'EDMI',
    coverSubtitle: 'Мобільний додаток\nдля стоматологічних мікроскопів',
    coverTagline: 'Каталог · Конфігуратор · AI-асистент · AR-візуалізація',
    coverVersion: 'v0.1.0 · 2026',

    aboutTitle: 'Про проєкт',
    aboutText: 'Повнофункціональний мобільний додаток для компанії EDMI — провідного постачальника стоматологічних мікроскопів та оптичного обладнання в Україні та Європі.',
    aboutCards: [
      { icon: '🔬', title: 'Каталог', desc: 'Синхронізація з WooCommerce в реальному часі' },
      { icon: '⚙️', title: 'Конфігуратор', desc: 'Інтерактивне складання мікроскопа' },
      { icon: '🤖', title: 'AI-асистент', desc: 'Чат-бот EDMik на кожному екрані' },
      { icon: '📱', title: 'AR-візуалізація', desc: 'Примірка мікроскопа в кабінеті' },
    ],

    catalogTitle: 'Каталог продукції',
    catalogFeatures: [
      'Головний екран у стилі маркетплейсів',
      'Hero-секція з градієнтом та пошуком',
      'Quick Action кнопки',
      'Сітка категорій із зображеннями',
      'Фільтрація за брендом',
      'Картки з цінами та знижками',
    ],
    pdpTitle: 'Сторінка товару',
    pdpFeatures: [
      'Галерея з пагінацією та свайпом',
      'Бейджі: новий / б/в / знижка',
      'Характеристики в акордеонах',
      'B2B «Запросити рахунок-фактуру»',
      'Пов\'язані товари',
    ],

    configTitle: 'Конфігуратор мікроскопа',
    configDesc: 'Унікальна функція — інтерактивне складання мікроскопа під потреби клієнта',
    configFeatures: [
      '4 моделі: Zeiss, Leica, CJ-Optik',
      '5 груп опцій: колір, кріплення, освітлення, об\'єктив, камера',
      'Реальні ціни-дельти в EUR',
      'Калькуляція в реальному часі',
      'Додавання в кошик одним натисканням',
    ],
    aiTitle: 'EDMik — AI-асистент',
    aiDesc: 'Вбудований чат-бот на кожному екрані',
    aiFeatures: [
      'Floating Action Button',
      '73 ключових слова → наміри',
      '8 типів відповідей',
      'Quick Actions у чаті',
      'Підготовлений для Claude AI',
    ],

    arTitle: 'AR «Переглянути в кабінеті»',
    arFeatures: [
      'Повноекранний AR-режим',
      'Виявлення поверхонь',
      '3D-модель одним дотиком',
      'Жести: переміщення, обертання, масштаб',
      'Fallback для пристроїв без AR',
    ],
    checkoutTitle: 'Кошик та Checkout',
    checkoutSteps: ['Контакти', 'Доставка', 'Оплата', 'Підтвердження'],
    checkoutFeatures: [
      'LiqPay + WayForPay',
      'Нова Пошта',
      'Профіль та історія замовлень',
      'Перемикання мови UK/EN',
    ],

    techTitle: 'Технічна архітектура',
    techStack: [
      ['Mobile', 'React Native + Expo SDK 54'],
      ['Навігація', 'expo-router v6'],
      ['Стан', 'Zustand v5 + TanStack Query v5'],
      ['UI', 'Кастомна дизайн-система (37 компонентів)'],
      ['3D / AR', 'ViroReact'],
      ['Backend', 'Node.js + Express + PostgreSQL + Redis'],
      ['API', 'WooCommerce Store API'],
      ['AI', 'Anthropic Claude API'],
      ['Типізація', 'TypeScript (strict mode)'],
    ],
    archDecisions: [
      'Монорепо (pnpm workspaces)',
      'WooCommerce — джерело істини',
      'Shared-пакет: типи + валідатори + i18n',
      'Offline-capable каталог',
      'Lazy loading для AR',
    ],

    numbersTitle: 'Проєкт у цифрах',
    numbers: [
      { value: '18', label: 'Екранів' },
      { value: '37', label: 'Компонентів' },
      { value: '7', label: 'Stores' },
      { value: '24', label: 'Shared-модулів' },
      { value: '2', label: 'Мови UI' },
      { value: '11', label: 'Виправлено багів' },
      { value: '8', label: 'Фаз розробки' },
      { value: '6', label: 'Документів' },
      { value: '30MB', label: '3D-модель' },
    ],

    costTitle: 'Оцінка вартості',
    costAgencyTitle: 'Аутсорс-компанія',
    costAgencyPrice: '$80,000 — $120,000',
    costAgencyTime: '3-5 місяців',
    costAgencyTeam: '4-5 людей',
    costAgencyHours: '1,040 — 1,490 годин',
    costRealTitle: 'Як було насправді',
    costRealPrice: '$0',
    costRealTime: '~4 дні',
    costRealTeam: '1 людина + Claude AI',
    costSavings: 'Економія: $80,000 — $120,000',

    methodTitle: 'AI-driven розробка',
    methodDesc: 'Архітектор визначає бачення, AI виконує реалізацію',
    methodSteps: [
      { num: '01', title: 'Планування', desc: 'Фази, пріоритети, архітектура' },
      { num: '02', title: 'Дослідження', desc: 'AI-агенти аналізують кодову базу' },
      { num: '03', title: 'Проєктування', desc: 'План затверджується до реалізації' },
      { num: '04', title: 'Реалізація', desc: 'Пофазне створення з тестуванням' },
      { num: '05', title: 'Налагодження', desc: 'Агенти з доказовою базою' },
    ],
    methodWhy: [
      'Архітектор: що + навіщо. AI: як',
      'Паралельне дослідження 3 агентами',
      'Strict TypeScript, нульовий тех. борг',
      'Документація в процесі розробки',
    ],

    closingReady: 'Що готово',
    closingItems: [
      'Каталог з даними WooCommerce',
      'Детальні сторінки товарів',
      'Кошик та 4-кроковий checkout',
      'Конфігуратор мікроскопів',
      'AI-чатбот EDMik',
      'AR-візуалізація',
      'Профіль, замовлення, мультимовність',
    ],
    closingNext: 'Далі',
    closingNextItems: [
      'Claude AI інтеграція',
      'Голосове введення (Whisper)',
      'Платежі LiqPay / WayForPay',
      'Push-сповіщення',
      'App Store + Google Play',
    ],
    closingFooter: 'Розроблено за 4 дні · $0 бюджет · Powered by Claude AI',
  },

  en: {
    lang: 'en',
    coverTitle: 'EDMI',
    coverSubtitle: 'Mobile App\nfor Dental Microscopes',
    coverTagline: 'Catalog · Configurator · AI Assistant · AR Visualization',
    coverVersion: 'v0.1.0 · 2026',

    aboutTitle: 'About the Project',
    aboutText: 'A full-featured mobile application for EDMI — a leading supplier of dental microscopes and optical equipment in Ukraine and Europe.',
    aboutCards: [
      { icon: '🔬', title: 'Catalog', desc: 'Real-time WooCommerce synchronization' },
      { icon: '⚙️', title: 'Configurator', desc: 'Interactive microscope assembly' },
      { icon: '🤖', title: 'AI Assistant', desc: 'EDMik chatbot on every screen' },
      { icon: '📱', title: 'AR Preview', desc: 'Preview microscope in your office' },
    ],

    catalogTitle: 'Product Catalog',
    catalogFeatures: [
      'Marketplace-style home screen',
      'Hero section with gradient & search',
      'Quick Action buttons',
      'Category grid with real images',
      'Brand filtering & sorting',
      'Product cards with prices & discounts',
    ],
    pdpTitle: 'Product Detail Page',
    pdpFeatures: [
      'Photo gallery with swipe',
      'Badges: new / used / discount',
      'Specs in expandable accordions',
      'B2B "Request Invoice"',
      'Related products',
    ],

    configTitle: 'Microscope Configurator',
    configDesc: 'A unique feature — interactive microscope assembly tailored to client needs',
    configFeatures: [
      '4 models: Zeiss, Leica, CJ-Optik',
      '5 option groups: color, mount, lighting, objective, camera',
      'Real price deltas in EUR',
      'Real-time cost calculation',
      'Add to cart with one tap',
    ],
    aiTitle: 'EDMik — AI Assistant',
    aiDesc: 'Built-in chatbot on every screen',
    aiFeatures: [
      'Floating Action Button',
      '73 keywords → intent recognition',
      '8 response types',
      'Quick Actions in chat',
      'Prepared for Claude AI',
    ],

    arTitle: 'AR "View in Your Office"',
    arFeatures: [
      'Full-screen AR mode',
      'Surface detection',
      '3D model with one tap',
      'Gestures: drag, rotate, scale',
      'Fallback for non-AR devices',
    ],
    checkoutTitle: 'Cart & Checkout',
    checkoutSteps: ['Contact', 'Delivery', 'Payment', 'Confirm'],
    checkoutFeatures: [
      'LiqPay + WayForPay',
      'Nova Poshta delivery',
      'Profile & order history',
      'Language switch UK/EN',
    ],

    techTitle: 'Technical Architecture',
    techStack: [
      ['Mobile', 'React Native + Expo SDK 54'],
      ['Navigation', 'expo-router v6'],
      ['State', 'Zustand v5 + TanStack Query v5'],
      ['UI', 'Custom design system (37 components)'],
      ['3D / AR', 'ViroReact'],
      ['Backend', 'Node.js + Express + PostgreSQL + Redis'],
      ['API', 'WooCommerce Store API'],
      ['AI', 'Anthropic Claude API'],
      ['Typing', 'TypeScript (strict mode)'],
    ],
    archDecisions: [
      'Monorepo (pnpm workspaces)',
      'WooCommerce as source of truth',
      'Shared package: types + validators + i18n',
      'Offline-capable catalog',
      'Lazy loading for AR',
    ],

    numbersTitle: 'Project in Numbers',
    numbers: [
      { value: '18', label: 'Screens' },
      { value: '37', label: 'Components' },
      { value: '7', label: 'Stores' },
      { value: '24', label: 'Shared modules' },
      { value: '2', label: 'UI Languages' },
      { value: '11', label: 'Bugs fixed' },
      { value: '8', label: 'Dev phases' },
      { value: '6', label: 'Documents' },
      { value: '30MB', label: '3D model' },
    ],

    costTitle: 'Development Cost',
    costAgencyTitle: 'Outsourcing Agency',
    costAgencyPrice: '$80,000 — $120,000',
    costAgencyTime: '3-5 months',
    costAgencyTeam: '4-5 people',
    costAgencyHours: '1,040 — 1,490 hours',
    costRealTitle: 'How It Was Actually Built',
    costRealPrice: '$0',
    costRealTime: '~4 days',
    costRealTeam: '1 person + Claude AI',
    costSavings: 'Savings: $80,000 — $120,000',

    methodTitle: 'AI-Driven Development',
    methodDesc: 'The architect defines the vision, AI handles the implementation',
    methodSteps: [
      { num: '01', title: 'Planning', desc: 'Phases, priorities, architecture' },
      { num: '02', title: 'Research', desc: 'AI agents analyze the codebase' },
      { num: '03', title: 'Design', desc: 'Plan approved before coding' },
      { num: '04', title: 'Implementation', desc: 'Phase-by-phase with testing' },
      { num: '05', title: 'Debugging', desc: 'Agents with evidence base' },
    ],
    methodWhy: [
      'Architect: what + why. AI: how',
      'Parallel research by 3 agents',
      'Strict TypeScript, zero tech debt',
      'Documentation during development',
    ],

    closingReady: 'What\'s Ready',
    closingItems: [
      'Catalog with WooCommerce data',
      'Detailed product pages',
      'Cart & 4-step checkout',
      'Microscope configurator',
      'EDMik AI chatbot',
      'AR visualization',
      'Profile, orders, multilingual',
    ],
    closingNext: 'Next Steps',
    closingNextItems: [
      'Claude AI integration',
      'Voice input (Whisper)',
      'LiqPay / WayForPay payments',
      'Push notifications',
      'App Store + Google Play',
    ],
    closingFooter: 'Built in 4 days · $0 budget · Powered by Claude AI',
  },

  de: {
    lang: 'de',
    coverTitle: 'EDMI',
    coverSubtitle: 'Mobile App\nfür zahnmedizinische Mikroskope',
    coverTagline: 'Katalog · Konfigurator · KI-Assistent · AR-Visualisierung',
    coverVersion: 'v0.1.0 · 2026',

    aboutTitle: 'Über das Projekt',
    aboutText: 'Eine voll funktionsfähige mobile Anwendung für EDMI — einen führenden Anbieter von zahnmedizinischen Mikroskopen und optischer Ausrüstung in der Ukraine und Europa.',
    aboutCards: [
      { icon: '🔬', title: 'Katalog', desc: 'Echtzeit-Synchronisierung mit WooCommerce' },
      { icon: '⚙️', title: 'Konfigurator', desc: 'Interaktive Mikroskop-Zusammenstellung' },
      { icon: '🤖', title: 'KI-Assistent', desc: 'EDMik-Chatbot auf jedem Bildschirm' },
      { icon: '📱', title: 'AR-Vorschau', desc: 'Mikroskop in Ihrer Praxis ansehen' },
    ],

    catalogTitle: 'Produktkatalog',
    catalogFeatures: [
      'Marktplatz-Style Startseite',
      'Hero-Bereich mit Gradient & Suche',
      'Quick-Action-Buttons',
      'Kategorienraster mit echten Bildern',
      'Markenfilter & Sortierung',
      'Produktkarten mit Preisen & Rabatten',
    ],
    pdpTitle: 'Produktdetailseite',
    pdpFeatures: [
      'Fotogalerie mit Wisch-Navigation',
      'Badges: Neu / Gebraucht / Rabatt',
      'Daten in aufklappbaren Akkordeons',
      'B2B «Angebot anfordern»',
      'Verwandte Produkte',
    ],

    configTitle: 'Mikroskop-Konfigurator',
    configDesc: 'Einzigartige Funktion — interaktive Mikroskop-Zusammenstellung nach Kundenbedürfnissen',
    configFeatures: [
      '4 Modelle: Zeiss, Leica, CJ-Optik',
      '5 Optionsgruppen: Farbe, Halterung, Beleuchtung, Objektiv, Kamera',
      'Reale Preisdifferenzen in EUR',
      'Kostenberechnung in Echtzeit',
      'Zum Warenkorb mit einem Tipp',
    ],
    aiTitle: 'EDMik — KI-Assistent',
    aiDesc: 'Integrierter Chatbot auf jedem Bildschirm',
    aiFeatures: [
      'Floating Action Button',
      '73 Schlüsselwörter → Absichtserkennung',
      '8 Antworttypen',
      'Quick Actions im Chat',
      'Vorbereitet für Claude KI',
    ],

    arTitle: 'AR «In Ihrer Praxis ansehen»',
    arFeatures: [
      'Vollbild-AR-Modus',
      'Oberflächenerkennung',
      '3D-Modell mit einem Tipp',
      'Gesten: Verschieben, Drehen, Skalieren',
      'Fallback für Geräte ohne AR',
    ],
    checkoutTitle: 'Warenkorb & Checkout',
    checkoutSteps: ['Kontakt', 'Lieferung', 'Zahlung', 'Bestätigung'],
    checkoutFeatures: [
      'LiqPay + WayForPay',
      'Nova Poshta Versand',
      'Profil & Bestellverlauf',
      'Sprachumschaltung UK/EN',
    ],

    techTitle: 'Technische Architektur',
    techStack: [
      ['Mobile', 'React Native + Expo SDK 54'],
      ['Navigation', 'expo-router v6'],
      ['State', 'Zustand v5 + TanStack Query v5'],
      ['UI', 'Eigenes Design-System (37 Komponenten)'],
      ['3D / AR', 'ViroReact'],
      ['Backend', 'Node.js + Express + PostgreSQL + Redis'],
      ['API', 'WooCommerce Store API'],
      ['KI', 'Anthropic Claude API'],
      ['Typisierung', 'TypeScript (Strict Mode)'],
    ],
    archDecisions: [
      'Monorepo (pnpm Workspaces)',
      'WooCommerce als Single Source of Truth',
      'Shared-Paket: Typen + Validatoren + i18n',
      'Offline-fähiger Katalog',
      'Lazy Loading für AR',
    ],

    numbersTitle: 'Projekt in Zahlen',
    numbers: [
      { value: '18', label: 'Bildschirme' },
      { value: '37', label: 'Komponenten' },
      { value: '7', label: 'Stores' },
      { value: '24', label: 'Shared-Module' },
      { value: '2', label: 'UI-Sprachen' },
      { value: '11', label: 'Fehler behoben' },
      { value: '8', label: 'Entw.-Phasen' },
      { value: '6', label: 'Dokumente' },
      { value: '30MB', label: '3D-Modell' },
    ],

    costTitle: 'Entwicklungskosten',
    costAgencyTitle: 'Outsourcing-Agentur',
    costAgencyPrice: '$80.000 — $120.000',
    costAgencyTime: '3-5 Monate',
    costAgencyTeam: '4-5 Personen',
    costAgencyHours: '1.040 — 1.490 Stunden',
    costRealTitle: 'Wie es tatsächlich gebaut wurde',
    costRealPrice: '$0',
    costRealTime: '~4 Tage',
    costRealTeam: '1 Person + Claude KI',
    costSavings: 'Einsparung: $80.000 — $120.000',

    methodTitle: 'KI-gesteuerte Entwicklung',
    methodDesc: 'Der Architekt definiert die Vision, KI übernimmt die Implementierung',
    methodSteps: [
      { num: '01', title: 'Planung', desc: 'Phasen, Prioritäten, Architektur' },
      { num: '02', title: 'Recherche', desc: 'KI-Agenten analysieren die Codebasis' },
      { num: '03', title: 'Design', desc: 'Plan vor Implementierung genehmigt' },
      { num: '04', title: 'Umsetzung', desc: 'Phasenweise mit Tests' },
      { num: '05', title: 'Debugging', desc: 'Agenten mit Nachweisbasis' },
    ],
    methodWhy: [
      'Architekt: Was + Warum. KI: Wie',
      'Parallele Recherche durch 3 Agenten',
      'Striktes TypeScript, null Schulden',
      'Dokumentation während der Entwicklung',
    ],

    closingReady: 'Was fertig ist',
    closingItems: [
      'Katalog mit WooCommerce-Daten',
      'Detaillierte Produktseiten',
      'Warenkorb & 4-Schritte-Checkout',
      'Mikroskop-Konfigurator',
      'EDMik-KI-Chatbot',
      'AR-Visualisierung',
      'Profil, Bestellungen, mehrsprachig',
    ],
    closingNext: 'Nächste Schritte',
    closingNextItems: [
      'Claude-KI-Integration',
      'Spracheingabe (Whisper)',
      'LiqPay / WayForPay Zahlungen',
      'Push-Benachrichtigungen',
      'App Store + Google Play',
    ],
    closingFooter: 'Entwickelt in 4 Tagen · $0 Budget · Powered by Claude KI',
  },
};

// ─── CSS Styles ───────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

@page {
  size: A4 landscape;
  margin: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1a1a2e;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.slide {
  width: 297mm;
  height: 210mm;
  page-break-after: always;
  page-break-inside: avoid;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.slide:last-child {
  page-break-after: auto;
}

/* ── Cover Slide ── */
.slide-cover {
  background: linear-gradient(135deg, #8b3dc5 0%, #5b21b6 30%, #0057b8 70%, #0284c7 100%);
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40mm;
}
.slide-cover::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: rgba(255,255,255,0.03);
}
.slide-cover::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
}
.cover-logo {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 72px;
  letter-spacing: 8px;
  margin-bottom: 16px;
  text-shadow: 0 4px 30px rgba(0,0,0,0.3);
  position: relative;
  z-index: 1;
}
.cover-subtitle {
  font-size: 28px;
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 32px;
  opacity: 0.95;
  white-space: pre-line;
  position: relative;
  z-index: 1;
}
.cover-tagline {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 2px;
  opacity: 0.7;
  text-transform: uppercase;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}
.cover-version {
  font-size: 13px;
  opacity: 0.5;
  position: relative;
  z-index: 1;
}
.cover-divider {
  width: 60px;
  height: 3px;
  background: rgba(255,255,255,0.4);
  margin: 0 auto 24px;
  border-radius: 2px;
  position: relative;
  z-index: 1;
}

/* ── Content Slides ── */
.slide-content {
  background: #ffffff;
  padding: 22mm 28mm;
}
.slide-alt {
  background: linear-gradient(180deg, #f8f7ff 0%, #f0f4ff 100%);
  padding: 22mm 28mm;
}
.slide-dark {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d1b3e 100%);
  color: white;
  padding: 22mm 28mm;
}

.section-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a2e;
}
.section-title-light {
  color: white;
}
.title-accent {
  display: inline-block;
  width: 40px;
  height: 4px;
  background: linear-gradient(90deg, #b8309e, #0057b8);
  border-radius: 2px;
  margin-bottom: 12px;
}

/* ── About Cards ── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 24px;
}
.about-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.04);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.about-card-icon {
  font-size: 32px;
  flex-shrink: 0;
}
.about-card-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px;
}
.about-card-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
}
.about-text {
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  max-width: 720px;
}

/* ── Phone Frame ── */
.phone-frame {
  width: 160px;
  height: 340px;
  border-radius: 24px;
  border: 6px solid #1a1a2e;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset;
  flex-shrink: 0;
  background: #000;
}
.phone-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.phone-frame-sm {
  width: 130px;
  height: 280px;
  border-radius: 20px;
  border: 5px solid #1a1a2e;
}

/* ── Split Layout ── */
.split {
  display: flex;
  gap: 32px;
  flex: 1;
  align-items: center;
}
.split-left, .split-right {
  flex: 1;
}

/* ── Feature List ── */
.feature-list {
  list-style: none;
  padding: 0;
}
.feature-list li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  font-size: 14px;
  line-height: 1.5;
  color: #334155;
}
.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 14px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b8309e, #0057b8);
}

/* ── Tech Table ── */
.tech-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.tech-table tr {
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.tech-table td {
  padding: 10px 16px;
}
.tech-table td:first-child {
  font-weight: 700;
  color: #7c3aed;
  width: 140px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.tech-table-dark tr {
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.tech-table-dark td {
  color: #e2e8f0;
}
.tech-table-dark td:first-child {
  color: #a78bfa;
}

/* ── Numbers Grid ── */
.numbers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;
}
.number-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}
.number-value {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #c084fc, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.number-label {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 4px;
}

/* ── Cost Comparison ── */
.cost-compare {
  display: flex;
  gap: 32px;
  flex: 1;
  align-items: stretch;
  margin-top: 24px;
}
.cost-box {
  flex: 1;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cost-agency {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border: 2px solid #fecaca;
}
.cost-real {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border: 2px solid #bbf7d0;
}
.cost-price {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 36px;
  font-weight: 800;
  margin: 12px 0;
}
.cost-agency .cost-price { color: #dc2626; }
.cost-real .cost-price { color: #16a34a; }
.cost-label {
  font-size: 13px;
  color: #64748b;
}
.cost-detail {
  font-size: 15px;
  margin: 4px 0;
  color: #334155;
}
.cost-box-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 8px;
}
.cost-savings {
  text-align: center;
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(90deg, #b8309e, #0057b8);
  border-radius: 12px;
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
}
.cost-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: #94a3b8;
  flex-shrink: 0;
  width: 60px;
}

/* ── Method Steps ── */
.method-steps {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
.method-step {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  text-align: center;
}
.method-step-num {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #b8309e, #0057b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.method-step-title {
  font-weight: 700;
  font-size: 14px;
  margin: 8px 0 4px;
}
.method-step-desc {
  font-size: 11px;
  color: #64748b;
  line-height: 1.4;
}
.method-why {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
}
.method-why-item {
  background: rgba(184,48,158,0.06);
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13px;
  color: #475569;
  border-left: 3px solid #b8309e;
}

/* ── Checkout Steps ── */
.checkout-flow {
  display: flex;
  gap: 0;
  align-items: center;
  margin: 16px 0;
}
.checkout-step {
  background: linear-gradient(135deg, #ede9fe, #e0e7ff);
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #5b21b6;
  text-align: center;
}
.checkout-arrow {
  font-size: 18px;
  color: #a78bfa;
  margin: 0 4px;
}

/* ── Arch Decisions ── */
.arch-list {
  list-style: none;
  padding: 0;
}
.arch-list li {
  padding: 6px 0 6px 20px;
  position: relative;
  font-size: 13px;
  color: #e2e8f0;
}
.arch-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #a78bfa;
  font-weight: bold;
}

/* ── Closing Slide ── */
.slide-closing {
  background: linear-gradient(135deg, #8b3dc5 0%, #5b21b6 30%, #0057b8 70%, #0284c7 100%);
  color: white;
  padding: 22mm 28mm;
}
.closing-grid {
  display: flex;
  gap: 40px;
  flex: 1;
}
.closing-col {
  flex: 1;
}
.closing-col-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
  opacity: 0.9;
}
.closing-list {
  list-style: none;
  padding: 0;
}
.closing-list li {
  padding: 5px 0 5px 20px;
  position: relative;
  font-size: 13px;
  opacity: 0.85;
  line-height: 1.4;
}
.closing-list.ready li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4ade80;
  font-weight: bold;
}
.closing-list.next li::before {
  content: '○';
  position: absolute;
  left: 0;
  opacity: 0.5;
}
.closing-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.15);
  margin-top: 20px;
}
.closing-footer-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  opacity: 0.9;
}
.closing-footer-url {
  font-size: 14px;
  opacity: 0.5;
  margin-top: 8px;
}

/* ── Product Image ── */
.product-img {
  max-height: 280px;
  object-fit: contain;
  border-radius: 12px;
}
.product-img-sm {
  max-height: 200px;
  object-fit: contain;
}

/* ── Mini label ── */
.mini-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #b8309e;
  margin-bottom: 6px;
}
.mini-label-light {
  color: #c084fc;
}

/* ── Slide footer ── */
.slide-footer {
  position: absolute;
  bottom: 10mm;
  left: 28mm;
  right: 28mm;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #94a3b8;
}
.slide-footer-dark {
  color: rgba(255,255,255,0.3);
}
`;

// ─── HTML Generator ───────────────────────────────────────────────────────────
function generateHTML(lang) {
  const t = T[lang];

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=297mm">
<title>EDMI — Presentation (${lang.toUpperCase()})</title>
<style>${CSS}</style>
</head>
<body>

<!-- ═══ SLIDE 1: COVER ═══ -->
<div class="slide slide-cover">
  <div class="cover-logo">${t.coverTitle}</div>
  <div class="cover-subtitle">${t.coverSubtitle}</div>
  <div class="cover-divider"></div>
  <div class="cover-tagline">${t.coverTagline}</div>
  <div class="cover-version">${t.coverVersion}</div>
</div>

<!-- ═══ SLIDE 2: ABOUT ═══ -->
<div class="slide slide-alt">
  <div class="title-accent"></div>
  <div class="section-title">${t.aboutTitle}</div>
  <p class="about-text">${t.aboutText}</p>
  <div class="about-grid">
    ${t.aboutCards.map(c => `
    <div class="about-card">
      <div class="about-card-icon">${c.icon}</div>
      <div>
        <div class="about-card-title">${c.title}</div>
        <div class="about-card-desc">${c.desc}</div>
      </div>
    </div>`).join('')}
  </div>
  <div class="slide-footer">
    <span>EDMI Mobile App</span>
    <span>2 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 3: CATALOG + PDP ═══ -->
<div class="slide slide-content">
  <div class="split">
    <div class="split-left" style="display:flex;gap:20px;align-items:center;">
      <div class="phone-frame">
        <img src="${screenshots.catalog}" alt="Catalog">
      </div>
      <div class="phone-frame phone-frame-sm">
        <img src="${screenshots.pdp1}" alt="PDP">
      </div>
    </div>
    <div class="split-right">
      <div class="title-accent"></div>
      <div class="section-title">${t.catalogTitle}</div>
      <ul class="feature-list">
        ${t.catalogFeatures.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div style="margin-top:20px;">
        <div class="mini-label">${t.pdpTitle}</div>
        <ul class="feature-list">
          ${t.pdpFeatures.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>EDMI Mobile App</span>
    <span>3 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 4: CONFIGURATOR + AI ═══ -->
<div class="slide slide-alt">
  <div class="split">
    <div class="split-left">
      <div class="title-accent"></div>
      <div class="section-title" style="font-size:24px;">${t.configTitle}</div>
      <p style="font-size:13px;color:#64748b;margin-bottom:12px;">${t.configDesc}</p>
      <ul class="feature-list">
        ${t.configFeatures.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;flex:0.6;">
      <img src="${productImages.zeiss}" class="product-img" alt="Zeiss Microscope" crossorigin="anonymous">
    </div>
    <div class="split-right">
      <div class="title-accent"></div>
      <div class="section-title" style="font-size:24px;">${t.aiTitle}</div>
      <p style="font-size:13px;color:#64748b;margin-bottom:12px;">${t.aiDesc}</p>
      <ul class="feature-list">
        ${t.aiFeatures.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="slide-footer">
    <span>EDMI Mobile App</span>
    <span>4 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 5: AR + CHECKOUT ═══ -->
<div class="slide slide-content">
  <div class="split">
    <div class="split-left">
      <div class="title-accent"></div>
      <div class="section-title" style="font-size:24px;">${t.arTitle}</div>
      <ul class="feature-list">
        ${t.arFeatures.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div style="margin-top:20px;text-align:center;">
        <img src="${productImages.cjOptik}" class="product-img-sm" alt="CJ-Optik" crossorigin="anonymous" style="border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.12);">
      </div>
    </div>
    <div class="split-right">
      <div class="title-accent"></div>
      <div class="section-title" style="font-size:24px;">${t.checkoutTitle}</div>
      <div class="checkout-flow">
        ${t.checkoutSteps.map((s, i) =>
          (i > 0 ? '<span class="checkout-arrow">→</span>' : '') +
          `<div class="checkout-step">${s}</div>`
        ).join('')}
      </div>
      <ul class="feature-list" style="margin-top:16px;">
        ${t.checkoutFeatures.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="slide-footer">
    <span>EDMI Mobile App</span>
    <span>5 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 6: TECH STACK ═══ -->
<div class="slide slide-dark">
  <div class="split">
    <div class="split-left">
      <div class="title-accent"></div>
      <div class="section-title section-title-light">${t.techTitle}</div>
      <table class="tech-table tech-table-dark">
        ${t.techStack.map(([layer, tech]) => `
        <tr><td>${layer}</td><td>${tech}</td></tr>`).join('')}
      </table>
    </div>
    <div class="split-right">
      <div class="mini-label mini-label-light" style="margin-top:40px;">Architecture</div>
      <pre style="font-size:11px;color:#a5b4fc;line-height:1.6;font-family:'Courier New',monospace;">edmi/
├── apps/
│   ├── mobile/     ← Expo SDK 54
│   │   ├── app/    ← 18 routes
│   │   ├── components/
│   │   ├── stores/ ← 7 Zustand
│   │   └── screens/← Lazy AR
│   └── admin/      ← Vite + React
├── packages/
│   ├── shared/     ← 24 modules
│   └── server/     ← Express
└── docs/</pre>
      <ul class="arch-list" style="margin-top:16px;">
        ${t.archDecisions.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="slide-footer slide-footer-dark">
    <span>EDMI Mobile App</span>
    <span>6 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 7: NUMBERS ═══ -->
<div class="slide slide-dark">
  <div class="title-accent"></div>
  <div class="section-title section-title-light">${t.numbersTitle}</div>
  <div class="numbers-grid">
    ${t.numbers.map(n => `
    <div class="number-card">
      <div class="number-value">${n.value}</div>
      <div class="number-label">${n.label}</div>
    </div>`).join('')}
  </div>
  <div class="slide-footer slide-footer-dark">
    <span>EDMI Mobile App</span>
    <span>7 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 8: COST COMPARISON ═══ -->
<div class="slide slide-content">
  <div class="title-accent"></div>
  <div class="section-title">${t.costTitle}</div>
  <div class="cost-compare">
    <div class="cost-box cost-agency">
      <div class="cost-box-title">${t.costAgencyTitle}</div>
      <div class="cost-price">${t.costAgencyPrice}</div>
      <div class="cost-detail">⏱ ${t.costAgencyTime}</div>
      <div class="cost-detail">👥 ${t.costAgencyTeam}</div>
      <div class="cost-detail">📊 ${t.costAgencyHours}</div>
    </div>
    <div class="cost-vs">VS</div>
    <div class="cost-box cost-real">
      <div class="cost-box-title">${t.costRealTitle}</div>
      <div class="cost-price">${t.costRealPrice}</div>
      <div class="cost-detail">⏱ ${t.costRealTime}</div>
      <div class="cost-detail">👤 ${t.costRealTeam}</div>
      <div class="cost-detail">🚀 AI-driven development</div>
    </div>
  </div>
  <div class="cost-savings">${t.costSavings}</div>
  <div class="slide-footer">
    <span>EDMI Mobile App</span>
    <span>8 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 9: METHODOLOGY ═══ -->
<div class="slide slide-alt">
  <div class="title-accent"></div>
  <div class="section-title">${t.methodTitle}</div>
  <p style="font-size:15px;color:#64748b;margin-bottom:4px;">${t.methodDesc}</p>
  <div class="method-steps">
    ${t.methodSteps.map(s => `
    <div class="method-step">
      <div class="method-step-num">${s.num}</div>
      <div class="method-step-title">${s.title}</div>
      <div class="method-step-desc">${s.desc}</div>
    </div>`).join('')}
  </div>
  <div class="method-why">
    ${t.methodWhy.map(w => `<div class="method-why-item">${w}</div>`).join('')}
  </div>
  <div class="slide-footer">
    <span>EDMI Mobile App</span>
    <span>9 / 10</span>
  </div>
</div>

<!-- ═══ SLIDE 10: CLOSING ═══ -->
<div class="slide slide-closing">
  <div class="title-accent" style="background:rgba(255,255,255,0.4);"></div>
  <div class="section-title section-title-light" style="margin-bottom:20px;">EDMI Mobile App</div>
  <div class="closing-grid">
    <div class="closing-col">
      <div class="closing-col-title">${t.closingReady} ✓</div>
      <ul class="closing-list ready">
        ${t.closingItems.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
    <div class="closing-col">
      <div class="closing-col-title">${t.closingNext} →</div>
      <ul class="closing-list next">
        ${t.closingNextItems.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="closing-footer">
    <div class="closing-footer-text">${t.closingFooter}</div>
    <div class="closing-footer-url">edmi.com.ua</div>
  </div>
</div>

</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const outputDir = __dirname;
  const languages = ['ru', 'uk', 'en', 'de'];

  console.log('🔨 Generating HTML files...');

  // Generate HTML files
  for (const lang of languages) {
    const html = generateHTML(lang);
    const htmlPath = path.join(outputDir, `EDMI_Presentation_${lang.toUpperCase()}.html`);
    fs.writeFileSync(htmlPath, html, 'utf-8');
    console.log(`  ✓ ${htmlPath}`);
  }

  console.log('\n🚀 Launching Puppeteer...');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
    });

    for (const lang of languages) {
      const htmlPath = path.join(outputDir, `EDMI_Presentation_${lang.toUpperCase()}.html`);
      const pdfPath = path.join(outputDir, `EDMI_Presentation_${lang.toUpperCase()}.pdf`);

      console.log(`  📄 Generating ${lang.toUpperCase()} PDF...`);

      const page = await browser.newPage();

      // Load HTML file
      const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for fonts to load
      await page.evaluateHandle('document.fonts.ready');

      // Generate PDF
      await page.pdf({
        path: pdfPath,
        width: '297mm',
        height: '210mm',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: true,
      });

      await page.close();
      console.log(`  ✓ ${pdfPath}`);
    }
  } catch (error) {
    console.error('❌ Puppeteer error:', error.message);
    console.log('\n💡 HTML files were generated successfully. You can:');
    console.log('   1. Open them in a browser');
    console.log('   2. Print to PDF from the browser (Ctrl+P → Save as PDF)');
    console.log('   3. Set page size to A4 Landscape with no margins');
  } finally {
    if (browser) await browser.close();
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
