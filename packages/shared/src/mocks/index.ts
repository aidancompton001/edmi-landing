// Products
export {
  mockProducts,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  getProductsOnSale,
  searchProducts,
} from './products';

// Categories
export {
  mockCategories,
  getCategoryById,
  getCategoryBySlug,
} from './categories';

// Orders
export {
  mockOrders,
  getOrderById,
  getOrdersByStatus,
} from './orders';

// Bot responses
export {
  botGreetingMessage,
  keywordIntentMap,
  botResponseTemplates,
  detectIntent,
  getMockBotResponse,
} from './bot-responses';
export type { BotIntent } from './bot-responses';

// Configurator
export {
  configurableProducts,
  getConfigurableProduct,
} from './configurator';
