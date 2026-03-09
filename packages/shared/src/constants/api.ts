// API route constants

export const API_ROUTES = {
  // Products (PUBLIC)
  products: '/api/products',
  productById: (id: number) => `/api/products/${id}`,
  categories: '/api/products/categories',

  // Auth (PUBLIC)
  login: '/api/auth/login',
  register: '/api/auth/register',
  refresh: '/api/auth/refresh',

  // Orders (AUTH)
  orders: '/api/orders',
  orderById: (id: number) => `/api/orders/${id}`,
  myOrders: '/api/orders/my',

  // Payments (AUTH)
  liqpayInit: '/api/payments/liqpay/init',
  liqpayCallback: '/api/payments/liqpay/callback',
  wayforpayInit: '/api/payments/wayforpay/init',
  wayforpayCallback: '/api/payments/wayforpay/callback',

  // Delivery (PUBLIC)
  deliveryCities: '/api/delivery/cities',
  deliveryWarehouses: '/api/delivery/warehouses',
  deliveryCalculate: '/api/delivery/calculate',

  // Bot (AUTH)
  botChat: '/api/bot/chat',
  botVoice: '/api/bot/voice',

  // Webhooks (SERVER-TO-SERVER)
  webhooksWc: '/api/webhooks/wc',

  // Admin (AUTH + admin role)
  adminAiChat: '/api/admin/ai/chat',
  adminProducts: '/api/admin/products',
  adminStats: '/api/admin/stats',

  // Health
  health: '/health',
} as const;

export const WC_API = {
  base: '/wp-json/wc/v3',
  products: '/wp-json/wc/v3/products',
  productById: (id: number) => `/wp-json/wc/v3/products/${id}`,
  categories: '/wp-json/wc/v3/products/categories',
  orders: '/wp-json/wc/v3/orders',
  orderById: (id: number) => `/wp-json/wc/v3/orders/${id}`,
  customers: '/wp-json/wc/v3/customers',
} as const;

export const NOVA_POSHTA_API = {
  baseUrl: 'https://api.novaposhta.ua/v2.0/json/',
} as const;

export const CACHE_TTL = {
  products: 5 * 60, // 5 minutes in seconds
  categories: 10 * 60, // 10 minutes
  cities: 24 * 60 * 60, // 24 hours
  warehouses: 60 * 60, // 1 hour
} as const;

export const RATE_LIMITS = {
  general: { max: 100, windowMs: 60 * 1000 },
  auth: { max: 5, windowMs: 60 * 1000 },
  payment: { max: 3, windowMs: 60 * 1000 },
  bot: { max: 10, windowMs: 60 * 1000 },
} as const;

export const PAGINATION = {
  defaultPage: 1,
  defaultPerPage: 20,
  maxPerPage: 100,
  wcDefaultPerPage: 100,
} as const;
