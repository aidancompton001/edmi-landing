import type { BotChatResponse, BotAction } from '../types';

/**
 * Intent types recognized by the bot keyword matching.
 */
export type BotIntent =
  | 'reorder'
  | 'order_status'
  | 'contact_manager'
  | 'price_inquiry'
  | 'catalog_browse'
  | 'delivery_info'
  | 'greeting'
  | 'general_help';

/**
 * Keyword-to-intent mapping for Ukrainian user messages.
 * Keys are lowercase Ukrainian keywords/phrases; values are recognized intents.
 */
export const keywordIntentMap: Record<string, BotIntent> = {
  // Reorder
  'повтори': 'reorder',
  'замов знову': 'reorder',
  'повторне замовлення': 'reorder',
  'ще раз': 'reorder',
  'такий самий': 'reorder',

  // Order status
  'статус': 'order_status',
  'де замовлення': 'order_status',
  'відстежити': 'order_status',
  'трекінг': 'order_status',
  'моє замовлення': 'order_status',
  'номер замовлення': 'order_status',

  // Contact manager
  'менеджер': 'contact_manager',
  "зв'язок": 'contact_manager',
  'зателефонувати': 'contact_manager',
  'оператор': 'contact_manager',
  'людина': 'contact_manager',
  'живий менеджер': 'contact_manager',
  'консультація': 'contact_manager',

  // Price inquiry
  'ціна': 'price_inquiry',
  'скільки': 'price_inquiry',
  'вартість': 'price_inquiry',
  'скільки коштує': 'price_inquiry',
  'прайс': 'price_inquiry',

  // Catalog browse
  'каталог': 'catalog_browse',
  'мікроскоп': 'catalog_browse',
  'товари': 'catalog_browse',
  'що є': 'catalog_browse',
  'асортимент': 'catalog_browse',

  // Delivery info
  'доставка': 'delivery_info',
  'нова пошта': 'delivery_info',
  'відправка': 'delivery_info',
  'самовивіз': 'delivery_info',

  // Greeting
  'привіт': 'greeting',
  'вітаю': 'greeting',
  'добрий день': 'greeting',
  'доброго ранку': 'greeting',
  'добрий вечір': 'greeting',
  'хай': 'greeting',
  'здоровенькі': 'greeting',
};

/**
 * Greeting message shown when the bot starts a conversation.
 */
export const botGreetingMessage = "Привіт! Я EDMik — ваш персональний помічник. Чим можу допомогти?";

/**
 * Mock bot response templates for each recognized intent.
 */
export const botResponseTemplates: Record<BotIntent, BotChatResponse> = {
  greeting: {
    text: botGreetingMessage,
    actions: [
      { type: 'navigate', label: 'Переглянути каталог', screen: 'catalog' },
      { type: 'contact_manager', label: "Зв'язатися з менеджером" },
    ],
  },

  reorder: {
    text: 'Знайшов ваші попередні замовлення. Оберіть, яке хочете повторити:',
    actions: [
      {
        type: 'reorder',
        label: 'Замовлення #5001 — Zeiss OPMI Pico Mora',
        orderId: 5001,
      },
      {
        type: 'reorder',
        label: 'Замовлення #5002 — Leica M320 F12',
        orderId: 5002,
      },
    ],
  },

  order_status: {
    text: 'Ось статус вашого останнього замовлення:',
    actions: [
      {
        type: 'navigate',
        label: 'Замовлення #5002 — В обробці',
        screen: 'order/5002',
        orderId: 5002,
      },
    ],
  },

  contact_manager: {
    text: "Зараз з'єднаю вас з менеджером EDMI. Середній час відповіді — 5 хвилин у робочий час (Пн-Пт, 9:00-18:00).",
    actions: [
      { type: 'contact_manager', label: 'Написати менеджеру' },
      { type: 'navigate', label: 'Зателефонувати: +380 44 123 45 67', screen: 'tel:+380441234567' },
    ],
  },

  price_inquiry: {
    text: 'Ось популярні мікроскопи з нашого каталогу. Натисніть для детальної інформації:',
    products: [
      {
        id: 101,
        name: 'Zeiss OPMI Pico Mora',
        price: 18500,
        image: 'https://placehold.co/600x400?text=Zeiss+OPMI+Pico',
      },
      {
        id: 104,
        name: 'Leica M320 F12',
        price: 15900,
        image: 'https://placehold.co/600x400?text=Leica+M320',
      },
      {
        id: 109,
        name: 'Global Surgical A-Series A6',
        price: 9800,
        image: 'https://placehold.co/600x400?text=Global+A6',
      },
    ],
    actions: [
      { type: 'navigate', label: 'Переглянути всі ціни', screen: 'catalog' },
    ],
  },

  catalog_browse: {
    text: 'У нашому каталозі є мікроскопи провідних світових виробників: Zeiss, Leica, CJ-Optik, Karl Kaps та Global Surgical. Також є об\'єктиви, освітлення та аксесуари.',
    actions: [
      { type: 'navigate', label: 'Мікроскопи', screen: 'catalog?category=microscopes' },
      { type: 'navigate', label: 'Аксесуари', screen: 'catalog?category=accessories' },
      { type: 'navigate', label: 'Б/В мікроскопи', screen: 'catalog?condition=used' },
    ],
  },

  delivery_info: {
    text: 'Доставка здійснюється через Нову Пошту по всій Україні. Також можливий самовивіз з нашого офісу в Києві. Для великогабаритного обладнання ми організовуємо спеціальну доставку з додатковим пакуванням.',
    actions: [
      { type: 'navigate', label: 'Розрахувати доставку', screen: 'delivery-calculator' },
      { type: 'contact_manager', label: 'Уточнити умови доставки' },
    ],
  },

  general_help: {
    text: 'Я можу допомогти з наступним:\n- Переглянути каталог мікроскопів\n- Дізнатися ціни\n- Перевірити статус замовлення\n- Повторити попереднє замовлення\n- З\'єднати з менеджером\n\nПросто напишіть, що вас цікавить!',
    actions: [
      { type: 'navigate', label: 'Каталог', screen: 'catalog' },
      { type: 'contact_manager', label: "Зв'язатися з менеджером" },
    ],
  },
};

/**
 * Detect intent from a Ukrainian user message by matching keywords.
 * Returns the first matched intent or 'general_help' as default.
 */
export const detectIntent = (message: string): BotIntent => {
  const lower = message.toLowerCase().trim();

  for (const [keyword, intent] of Object.entries(keywordIntentMap)) {
    if (lower.includes(keyword)) {
      return intent;
    }
  }

  return 'general_help';
};

/**
 * Get a mock bot response for a given user message.
 */
export const getMockBotResponse = (message: string): BotChatResponse => {
  const intent = detectIntent(message);
  return botResponseTemplates[intent];
};
