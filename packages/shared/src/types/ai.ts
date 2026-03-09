export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIProductSuggestion {
  brand: string;
  model: string;
  year: number | null;
  condition: 'new' | 'used';
  specs: Record<string, string>;
  suggestedPrice: number;
  description: string;
  category: string;
  tags: string[];
  confidence: number;
}

export interface AIAdminChatRequest {
  message: string;
  images?: string[];
}

export interface AIAdminChatResponse {
  text: string;
  product?: AIProductSuggestion;
}
