import type { Order } from '../types';

/**
 * Mock orders for the EDMI dental microscope store.
 * 5 orders with different statuses, referencing products from products.ts.
 * Shipping via Nova Poshta (Ukrainian postal service) with realistic Ukrainian city data.
 */
export const mockOrders: Order[] = [
  {
    id: 5001,
    status: 'completed',
    items: [
      {
        productId: 101,
        name: 'Zeiss OPMI Pico Mora',
        image: 'https://placehold.co/600x400?text=Zeiss+OPMI+Pico',
        quantity: 1,
        price: 18500,
        total: 18500,
      },
      {
        productId: 202,
        name: 'Zeiss C-Mount Camera Adapter f=60mm',
        image: 'https://placehold.co/600x400?text=C-Mount+Adapter',
        quantity: 1,
        price: 680,
        total: 680,
      },
    ],
    total: 19180,
    currency: 'EUR',
    shipping: {
      method: 'nova_poshta',
      firstName: 'Олександр',
      lastName: 'Коваленко',
      phone: '+380671234567',
      city: 'Київ',
      cityRef: 'db5c88e0-391c-11dd-90d9-001a92567626',
      warehouse: 'Відділення No 25: вул. Хрещатик, 22',
      warehouseRef: '1ec09d88-e1c2-11e3-8c4a-0050568002cf',
    },
    payment: {
      method: 'liqpay',
      status: 'paid',
    },
    comment: 'Прошу запакувати додатково, крихкий товар.',
    createdAt: '2025-09-15T14:30:00Z',
    updatedAt: '2025-09-22T10:00:00Z',
  },
  {
    id: 5002,
    status: 'processing',
    items: [
      {
        productId: 104,
        name: 'Leica M320 F12',
        image: 'https://placehold.co/600x400?text=Leica+M320',
        quantity: 1,
        price: 15900,
        total: 15900,
      },
    ],
    total: 15900,
    currency: 'EUR',
    shipping: {
      method: 'nova_poshta',
      firstName: 'Ірина',
      lastName: 'Петренко',
      phone: '+380509876543',
      city: 'Львів',
      cityRef: '8d5a980d-391c-11dd-90d9-001a92567626',
      warehouse: 'Відділення No 12: вул. Городоцька, 45',
      warehouseRef: '3a3ccb56-e1c2-11e3-8c4a-0050568002cf',
    },
    payment: {
      method: 'liqpay',
      status: 'paid',
    },
    createdAt: '2026-01-20T09:15:00Z',
    updatedAt: '2026-01-21T11:30:00Z',
  },
  {
    id: 5003,
    status: 'pending',
    items: [
      {
        productId: 106,
        name: 'CJ-Optik Flexion Advanced',
        image: 'https://placehold.co/600x400?text=CJ-Optik+Flexion',
        quantity: 1,
        price: 12900,
        total: 12900,
      },
      {
        productId: 201,
        name: 'Xenon Nova LED Illumination Module',
        image: 'https://placehold.co/600x400?text=LED+Module',
        quantity: 2,
        price: 1250,
        total: 2500,
      },
    ],
    total: 15400,
    currency: 'EUR',
    shipping: {
      method: 'nova_poshta',
      firstName: 'Дмитро',
      lastName: 'Шевченко',
      phone: '+380631112233',
      city: 'Одеса',
      cityRef: 'db5c890d-391c-11dd-90d9-001a92567626',
      warehouse: 'Відділення No 8: вул. Дерибасівська, 10',
      warehouseRef: '5a5ddcf6-e1c2-11e3-8c4a-0050568002cf',
    },
    payment: {
      method: 'wayforpay',
      status: 'pending',
    },
    comment: 'Потрібна консультація менеджера перед оплатою.',
    createdAt: '2026-02-05T16:45:00Z',
    updatedAt: '2026-02-05T16:45:00Z',
  },
  {
    id: 5004,
    status: 'cancelled',
    items: [
      {
        productId: 105,
        name: 'Leica M525 F20',
        image: 'https://placehold.co/600x400?text=Leica+M525',
        quantity: 1,
        price: 11800,
        total: 11800,
      },
    ],
    total: 11800,
    currency: 'EUR',
    shipping: {
      method: 'nova_poshta',
      firstName: 'Марія',
      lastName: 'Бондаренко',
      phone: '+380977654321',
      city: 'Харків',
      cityRef: 'db5c88c6-391c-11dd-90d9-001a92567626',
      warehouse: 'Відділення No 3: вул. Сумська, 78',
      warehouseRef: '7b7eef18-e1c2-11e3-8c4a-0050568002cf',
    },
    payment: {
      method: 'liqpay',
      status: 'failed',
    },
    comment: 'Клієнт скасував замовлення — обрав інший мікроскоп.',
    createdAt: '2025-12-10T11:00:00Z',
    updatedAt: '2025-12-12T08:30:00Z',
  },
  {
    id: 5005,
    status: 'on-hold',
    items: [
      {
        productId: 103,
        name: 'Zeiss OPMI PROergo',
        image: 'https://placehold.co/600x400?text=Zeiss+PROergo',
        quantity: 1,
        price: 24500,
        total: 24500,
      },
      {
        productId: 203,
        name: "Об'єктив Zeiss f=250mm для OPMI",
        image: 'https://placehold.co/600x400?text=Objective+f250',
        quantity: 1,
        price: 890,
        total: 890,
      },
      {
        productId: 204,
        name: 'Бінокулярна насадка Leica 10x/22 Wide',
        image: 'https://placehold.co/600x400?text=Leica+Binoculars',
        quantity: 1,
        price: 1450,
        total: 1450,
      },
    ],
    total: 26840,
    currency: 'EUR',
    shipping: {
      method: 'pickup',
      firstName: 'Андрій',
      lastName: 'Мельник',
      phone: '+380441234567',
    },
    payment: {
      method: 'wayforpay',
      status: 'pending',
    },
    comment: 'Очікуємо підтвердження наявності всіх комплектуючих на складі.',
    createdAt: '2026-02-01T13:00:00Z',
    updatedAt: '2026-02-08T09:15:00Z',
  },
];

/** Helper: get an order by ID */
export const getOrderById = (id: number): Order | undefined =>
  mockOrders.find((o) => o.id === id);

/** Helper: get orders by status */
export const getOrdersByStatus = (status: Order['status']): Order[] =>
  mockOrders.filter((o) => o.status === status);
