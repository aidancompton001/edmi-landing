export interface BotMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  actions?: BotAction[];
  products?: BotProductCard[];
  timestamp: string;
}

export interface BotAction {
  type: BotActionType;
  label: string;
  orderId?: number;
  screen?: string;
  productId?: number;
}

export type BotActionType =
  | 'reorder'
  | 'navigate'
  | 'contact_manager'
  | 'show_product'
  | 'add_to_cart';

export interface BotProductCard {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface BotChatRequest {
  message: string;
  context?: BotContext;
}

export interface BotContext {
  currentScreen?: string;
  configuratorState?: Record<string, unknown>;
}

export interface BotChatResponse {
  text: string;
  actions?: BotAction[];
  products?: BotProductCard[];
}

export interface BotVoiceResponse {
  transcription: string;
  response: BotChatResponse;
  audioUrl?: string;
}

export interface ReorderSuggestion {
  orderId: number;
  items: Array<{
    productId: number;
    name: string;
    quantity: number;
  }>;
  daysSinceOrder: number;
}
