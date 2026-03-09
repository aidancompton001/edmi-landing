import type { Product } from '../types';

/**
 * Mock products based on real dental microscope brands.
 * Prices in EUR. Mix of new and used equipment.
 */
export const mockProducts: Product[] = [
  // --- Zeiss OPMI models ---
  {
    id: 101,
    name: 'Zeiss OPMI Pico Mora',
    slug: 'zeiss-opmi-pico-mora',
    brand: 'Carl Zeiss',
    description:
      'Компактний стоматологічний мікроскоп Zeiss OPMI Pico Mora з LED-освітленням та варіоскопом. Ідеальний для ендодонтії, забезпечує чітке зображення з високою роздільною здатністю. Вбудований інтерфейс для фото/відеодокументації. Стелова або настінна фіксація за вибором.',
    shortDescription: 'Компактний мікроскоп для ендодонтії з LED-освітленням',
    sku: 'ZS-PICO-MORA-001',
    price: 18500,
    regularPrice: 18500,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 2,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1001, src: 'https://placehold.co/600x400?text=Zeiss+OPMI+Pico', alt: 'Zeiss OPMI Pico Mora' },
      { id: 1002, src: 'https://placehold.co/600x400?text=Pico+Side+View', alt: 'Zeiss OPMI Pico Mora бічний вигляд' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['3.4x', '5.1x', '8.0x', '12.8x', '21.3x'] },
      { id: 2, name: 'Освітлення', options: ['LED'] },
      { id: 3, name: 'Кріплення', options: ['Стельове', 'Настінне'] },
    ],
    createdAt: '2025-08-12T10:00:00Z',
    updatedAt: '2025-12-01T14:30:00Z',
  },
  {
    id: 102,
    name: 'Zeiss OPMI Sensera',
    slug: 'zeiss-opmi-sensera',
    brand: 'Carl Zeiss',
    description:
      'Стоматологічний мікроскоп середнього класу Zeiss OPMI Sensera з інтегрованою HD-камерою. Оптична система ZEISS Apochromat забезпечує максимальну чіткість та вірну кольоропередачу. Ергономічний дизайн дозволяє працювати без втоми протягом тривалих процедур.',
    shortDescription: 'Мікроскоп з HD-камерою та апохроматичною оптикою',
    sku: 'ZS-SENSERA-002',
    price: 14200,
    regularPrice: 16800,
    salePrice: 14200,
    onSale: true,
    currency: 'EUR',
    stockQuantity: 1,
    stockStatus: 'in_stock',
    condition: 'used',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1003, src: 'https://placehold.co/600x400?text=Zeiss+Sensera', alt: 'Zeiss OPMI Sensera' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['3.2x', '5.0x', '8.0x', '12.5x', '20.0x'] },
      { id: 2, name: 'Освітлення', options: ['Xenon'] },
      { id: 4, name: 'Стан', options: ['Б/В — відмінний'] },
    ],
    createdAt: '2025-06-20T08:15:00Z',
    updatedAt: '2025-11-15T09:00:00Z',
  },
  {
    id: 103,
    name: 'Zeiss OPMI PROergo',
    slug: 'zeiss-opmi-proergo',
    brand: 'Carl Zeiss',
    description:
      'Флагманський операційний мікроскоп Zeiss OPMI PROergo з моторизованим зумом та автофокусом. Магнітна муфта Varioskop забезпечує плавне переключення між полями зору. Ідеальний для мікрохірургії та складних ендодонтичних процедур. Повна комплектація з двома бінокулярами для асистента.',
    shortDescription: 'Флагманський мікроскоп з моторизованим зумом та автофокусом',
    sku: 'ZS-PROERGO-003',
    price: 24500,
    regularPrice: 24500,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 1,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1004, src: 'https://placehold.co/600x400?text=Zeiss+PROergo', alt: 'Zeiss OPMI PROergo' },
      { id: 1005, src: 'https://placehold.co/600x400?text=PROergo+Detail', alt: 'Zeiss OPMI PROergo деталі' },
      { id: 1006, src: 'https://placehold.co/600x400?text=PROergo+Binoculars', alt: 'Zeiss OPMI PROergo бінокуляри' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['4x', '6x', '10x', '16x', '25x'] },
      { id: 2, name: 'Освітлення', options: ['LED + Xenon'] },
      { id: 5, name: 'Зум', options: ['Моторизований'] },
      { id: 6, name: 'Фокусування', options: ['Автофокус'] },
    ],
    createdAt: '2025-09-01T12:00:00Z',
    updatedAt: '2026-01-10T16:45:00Z',
  },

  // --- Leica models ---
  {
    id: 104,
    name: 'Leica M320 F12',
    slug: 'leica-m320-f12',
    brand: 'Leica Microsystems',
    description:
      'Стоматологічний мікроскоп Leica M320 з інтегрованою Full HD камерою та LED-освітленням. Компактна конструкція з фокусною відстанню 200 мм ідеальна для стоматологічних кабінетів. Вбудований запис відео на SD-карту без додаткового обладнання.',
    shortDescription: 'Компактний мікроскоп з вбудованою Full HD камерою',
    sku: 'LC-M320-F12-004',
    price: 15900,
    regularPrice: 15900,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 3,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1007, src: 'https://placehold.co/600x400?text=Leica+M320', alt: 'Leica M320 F12' },
      { id: 1008, src: 'https://placehold.co/600x400?text=M320+Mounted', alt: 'Leica M320 F12 встановлений' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['2.5x', '4.0x', '6.4x', '10.0x', '16.0x'] },
      { id: 2, name: 'Освітлення', options: ['LED'] },
      { id: 7, name: 'Камера', options: ['Full HD вбудована'] },
      { id: 8, name: 'Фокусна відстань', options: ['200 мм'] },
    ],
    createdAt: '2025-07-15T09:30:00Z',
    updatedAt: '2025-12-20T11:00:00Z',
  },
  {
    id: 105,
    name: 'Leica M525 F20',
    slug: 'leica-m525-f20',
    brand: 'Leica Microsystems',
    description:
      'Хірургічний мікроскоп Leica M525 F20 з апохроматичною оптикою FusionOptics. Широке поле зору та велика глибина різкості. Б/В у відмінному стані, повністю перевірений та сервісований. Комплектується стійкою на коліщатах.',
    shortDescription: 'Хірургічний мікроскоп б/в з FusionOptics',
    sku: 'LC-M525-F20-005',
    price: 11800,
    regularPrice: 19500,
    salePrice: 11800,
    onSale: true,
    currency: 'EUR',
    stockQuantity: 1,
    stockStatus: 'in_stock',
    condition: 'used',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1009, src: 'https://placehold.co/600x400?text=Leica+M525', alt: 'Leica M525 F20' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['4x', '6x', '10x', '16x', '25x', '40x'] },
      { id: 2, name: 'Освітлення', options: ['Xenon 180W'] },
      { id: 4, name: 'Стан', options: ['Б/В — відмінний, сервісований'] },
      { id: 9, name: 'Оптика', options: ['FusionOptics'] },
    ],
    createdAt: '2025-05-10T07:00:00Z',
    updatedAt: '2025-10-28T13:20:00Z',
  },

  // --- CJ-Optik ---
  {
    id: 106,
    name: 'CJ-Optik Flexion Advanced',
    slug: 'cj-optik-flexion-advanced',
    brand: 'CJ-Optik',
    description:
      'Стоматологічний мікроскоп CJ-Optik Flexion Advanced з гнучким шарнірним кріпленням. Система з 5-ступінчастим збільшенням та LED-освітленням 50 000 люкс. Ергономічний дизайн зменшує навантаження на шию та спину лікаря. Виробництво Німеччина.',
    shortDescription: 'Німецький мікроскоп з гнучким шарнірним кріпленням',
    sku: 'CJ-FLEX-ADV-006',
    price: 12900,
    regularPrice: 12900,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 2,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1010, src: 'https://placehold.co/600x400?text=CJ-Optik+Flexion', alt: 'CJ-Optik Flexion Advanced' },
      { id: 1011, src: 'https://placehold.co/600x400?text=Flexion+Arm', alt: 'CJ-Optik Flexion шарнірне кріплення' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['3.5x', '5.5x', '8.5x', '14x', '21x'] },
      { id: 2, name: 'Освітлення', options: ['LED 50 000 люкс'] },
      { id: 10, name: 'Країна виробництва', options: ['Німеччина'] },
    ],
    createdAt: '2025-10-05T11:00:00Z',
    updatedAt: '2026-01-05T08:30:00Z',
  },

  // --- Karl Kaps models ---
  {
    id: 107,
    name: 'Karl Kaps SOM 62',
    slug: 'karl-kaps-som-62',
    brand: 'Karl Kaps',
    description:
      'Стоматологічний мікроскоп Karl Kaps SOM 62 з оптикою преміум-класу. Плавний зум 6:1 з ножним управлінням. Інтегрований інтерфейс для цифрових камер. Надійна конструкція з балансирним кріпленням для легкого позиціонування.',
    shortDescription: 'Преміум мікроскоп з плавним зумом 6:1',
    sku: 'KK-SOM62-007',
    price: 16800,
    regularPrice: 16800,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 1,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1012, src: 'https://placehold.co/600x400?text=Karl+Kaps+SOM62', alt: 'Karl Kaps SOM 62' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['3.5x - 21x (плавний зум)'] },
      { id: 2, name: 'Освітлення', options: ['LED'] },
      { id: 11, name: 'Зум', options: ['6:1 з ножним управлінням'] },
      { id: 10, name: 'Країна виробництва', options: ['Німеччина'] },
    ],
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2026-01-15T12:00:00Z',
  },
  {
    id: 108,
    name: 'Karl Kaps SOM 22',
    slug: 'karl-kaps-som-22',
    brand: 'Karl Kaps',
    description:
      'Бюджетний стоматологічний мікроскоп Karl Kaps SOM 22 для стоматологічних клінік початкового рівня. 3-ступінчасте збільшення, LED-освітлення, простий у використанні. Б/В з мінімальним зносом, повністю робочий.',
    shortDescription: 'Бюджетний мікроскоп для клінік початкового рівня (б/в)',
    sku: 'KK-SOM22-008',
    price: 5800,
    regularPrice: 9200,
    salePrice: 5800,
    onSale: true,
    currency: 'EUR',
    stockQuantity: 1,
    stockStatus: 'in_stock',
    condition: 'used',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1013, src: 'https://placehold.co/600x400?text=Karl+Kaps+SOM22', alt: 'Karl Kaps SOM 22' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['4x', '6.4x', '10x'] },
      { id: 2, name: 'Освітлення', options: ['LED'] },
      { id: 4, name: 'Стан', options: ['Б/В — мінімальний знос'] },
    ],
    createdAt: '2025-04-18T14:00:00Z',
    updatedAt: '2025-09-10T10:15:00Z',
  },

  // --- Global Surgical ---
  {
    id: 109,
    name: 'Global Surgical A-Series A6',
    slug: 'global-surgical-a-series-a6',
    brand: 'Global Surgical',
    description:
      'Стоматологічний мікроскоп Global Surgical серії A з 6-ступінчастим збільшенням. Оптика з покриттям SMC для максимальної прозорості. Легка конструкція (12 кг головна частина) полегшує позиціонування. Виробництво США.',
    shortDescription: 'Американський мікроскоп з оптикою SMC',
    sku: 'GS-A6-009',
    price: 9800,
    regularPrice: 9800,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 4,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1014, src: 'https://placehold.co/600x400?text=Global+A6', alt: 'Global Surgical A-Series A6' },
      { id: 1015, src: 'https://placehold.co/600x400?text=A6+In+Use', alt: 'Global Surgical A6 у роботі' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['2.5x', '4.0x', '6.0x', '10.0x', '15.0x', '25.0x'] },
      { id: 2, name: 'Освітлення', options: ['LED TrueColor'] },
      { id: 10, name: 'Країна виробництва', options: ['США'] },
      { id: 12, name: 'Вага головної частини', options: ['12 кг'] },
    ],
    createdAt: '2025-08-25T13:00:00Z',
    updatedAt: '2025-12-30T15:45:00Z',
  },
  {
    id: 110,
    name: 'Global Surgical A-Series A3',
    slug: 'global-surgical-a-series-a3',
    brand: 'Global Surgical',
    description:
      'Компактний мікроскоп Global Surgical A3 з 3-ступінчастим збільшенням. Ідеальне рішення для невеликих клінік, що починають використовувати мікроскоп у практиці. Б/В з повним сервісом, замінені окуляри.',
    shortDescription: 'Компактний мікроскоп для невеликих клінік (б/в)',
    sku: 'GS-A3-010',
    price: 4200,
    regularPrice: 7500,
    salePrice: 4200,
    onSale: true,
    currency: 'EUR',
    stockQuantity: 1,
    stockStatus: 'in_stock',
    condition: 'used',
    categories: [{ id: 1, name: 'Мікроскопи', slug: 'microscopes', parentId: null, count: 10, image: null }],
    images: [
      { id: 1016, src: 'https://placehold.co/600x400?text=Global+A3', alt: 'Global Surgical A-Series A3' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['4.0x', '6.4x', '10.0x'] },
      { id: 2, name: 'Освітлення', options: ['LED'] },
      { id: 4, name: 'Стан', options: ['Б/В — сервісований, нові окуляри'] },
    ],
    createdAt: '2025-03-10T08:00:00Z',
    updatedAt: '2025-08-22T16:30:00Z',
  },

  // --- Accessories: LED illumination ---
  {
    id: 201,
    name: 'Xenon Nova LED Illumination Module',
    slug: 'xenon-nova-led-module',
    brand: 'Karl Storz',
    description:
      'Світлодіодний модуль освітлення Xenon Nova для заміни ксенонових ламп у стоматологічних мікроскопах. Сумісний з моделями Zeiss, Leica та Karl Kaps. Строк служби LED > 50 000 годин. Колірна температура 5700K — ідеальна для стоматології.',
    shortDescription: 'LED модуль для заміни ксенону (сумісний з Zeiss/Leica/Kaps)',
    sku: 'KS-LED-NOV-011',
    price: 1250,
    regularPrice: 1250,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 8,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 2, name: 'Освітлення', slug: 'illumination', parentId: null, count: 3, image: null }],
    images: [
      { id: 1017, src: 'https://placehold.co/600x400?text=LED+Module', alt: 'Xenon Nova LED Module' },
    ],
    attributes: [
      { id: 13, name: 'Колірна температура', options: ['5700K'] },
      { id: 14, name: 'Строк служби', options: ['50 000+ годин'] },
      { id: 15, name: 'Сумісність', options: ['Zeiss OPMI', 'Leica M-серія', 'Karl Kaps SOM'] },
    ],
    createdAt: '2025-07-01T09:00:00Z',
    updatedAt: '2025-11-20T14:00:00Z',
  },

  // --- Accessories: Camera adapter ---
  {
    id: 202,
    name: 'Zeiss C-Mount Camera Adapter f=60mm',
    slug: 'zeiss-c-mount-adapter-60mm',
    brand: 'Carl Zeiss',
    description:
      'Оригінальний адаптер Carl Zeiss C-Mount з фокусною відстанню 60 мм для підключення цифрових камер до мікроскопів серії OPMI. Різьба C-Mount дозволяє використовувати більшість промислових та медичних камер. Високоякісне антирефлексне покриття.',
    shortDescription: 'C-Mount адаптер f=60 мм для камер на Zeiss OPMI',
    sku: 'ZS-CMOUNT-60-012',
    price: 680,
    regularPrice: 680,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 5,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 4, name: 'Камери та адаптери', slug: 'cameras-adapters', parentId: null, count: 2, image: null }],
    images: [
      { id: 1018, src: 'https://placehold.co/600x400?text=C-Mount+Adapter', alt: 'Zeiss C-Mount Adapter' },
    ],
    attributes: [
      { id: 8, name: 'Фокусна відстань', options: ['60 мм'] },
      { id: 16, name: 'Різьба', options: ['C-Mount (1 дюйм)'] },
      { id: 15, name: 'Сумісність', options: ['Zeiss OPMI Pico', 'Zeiss OPMI Sensera', 'Zeiss OPMI PROergo'] },
    ],
    createdAt: '2025-09-15T10:30:00Z',
    updatedAt: '2025-12-05T09:00:00Z',
  },

  // --- Accessories: Objective lens ---
  {
    id: 203,
    name: 'Об\'єктив Zeiss f=250mm для OPMI',
    slug: 'zeiss-objective-f250-opmi',
    brand: 'Carl Zeiss',
    description:
      'Оригінальний об\'єктив Carl Zeiss з фокусною відстанню 250 мм для мікроскопів серії OPMI. Апохроматична конструкція забезпечує мінімальні хроматичні аберації. Робоча відстань 250 мм — оптимальна для більшості стоматологічних процедур.',
    shortDescription: 'Апохроматичний об\'єктив f=250 мм для Zeiss OPMI',
    sku: 'ZS-OBJ-250-013',
    price: 890,
    regularPrice: 890,
    salePrice: null,
    onSale: false,
    currency: 'EUR',
    stockQuantity: 3,
    stockStatus: 'in_stock',
    condition: 'new',
    categories: [{ id: 3, name: 'Об\'єктиви', slug: 'objectives', parentId: null, count: 2, image: null }],
    images: [
      { id: 1019, src: 'https://placehold.co/600x400?text=Objective+f250', alt: 'Zeiss Objective f=250mm' },
    ],
    attributes: [
      { id: 8, name: 'Фокусна відстань', options: ['250 мм'] },
      { id: 9, name: 'Оптика', options: ['Апохромат'] },
      { id: 15, name: 'Сумісність', options: ['Zeiss OPMI серія'] },
    ],
    createdAt: '2025-10-10T08:00:00Z',
    updatedAt: '2025-12-12T10:45:00Z',
  },

  // --- Accessories: Binoculars ---
  {
    id: 204,
    name: 'Бінокулярна насадка Leica 10x/22 Wide',
    slug: 'leica-binocular-10x22-wide',
    brand: 'Leica Microsystems',
    description:
      'Широкопольна бінокулярна насадка Leica з окулярами 10x/22. Поле зору 22 мм забезпечує комфортний огляд при тривалій роботі. Регулювання міжзрачкової відстані 55-75 мм. Діоптрійна корекція на обох окулярах.',
    shortDescription: 'Широкопольні бінокуляри 10x/22 для Leica мікроскопів',
    sku: 'LC-BIN-10X22-014',
    price: 1450,
    regularPrice: 1800,
    salePrice: 1450,
    onSale: true,
    currency: 'EUR',
    stockQuantity: 2,
    stockStatus: 'in_stock',
    condition: 'used',
    categories: [{ id: 6, name: 'Аксесуари', slug: 'accessories', parentId: null, count: 1, image: null }],
    images: [
      { id: 1020, src: 'https://placehold.co/600x400?text=Leica+Binoculars', alt: 'Leica Binocular 10x/22 Wide' },
    ],
    attributes: [
      { id: 1, name: 'Збільшення', options: ['10x'] },
      { id: 17, name: 'Поле зору', options: ['22 мм'] },
      { id: 18, name: 'Міжзрачкова відстань', options: ['55-75 мм'] },
      { id: 4, name: 'Стан', options: ['Б/В — без подряпин'] },
    ],
    createdAt: '2025-06-05T15:00:00Z',
    updatedAt: '2025-11-25T11:30:00Z',
  },
];

/** Helper: get a product by ID */
export const getProductById = (id: number): Product | undefined =>
  mockProducts.find((p) => p.id === id);

/** Helper: get products by category slug */
export const getProductsByCategory = (slug: string): Product[] =>
  mockProducts.filter((p) => p.categories.some((c) => c.slug === slug));

/** Helper: get products by brand */
export const getProductsByBrand = (brand: string): Product[] =>
  mockProducts.filter((p) => p.brand === brand);

/** Helper: get products on sale */
export const getProductsOnSale = (): Product[] =>
  mockProducts.filter((p) => p.onSale);

/** Helper: search products by name or description */
export const searchProducts = (query: string): Product[] => {
  const lower = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower),
  );
};
