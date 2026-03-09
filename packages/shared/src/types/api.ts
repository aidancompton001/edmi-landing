// Standard API response format
export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

// Standard API error format
export interface ApiErrorResponse {
  error: ApiError;
}

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'RATE_LIMIT'
  | 'INTERNAL_ERROR'
  | 'WC_ERROR'
  | 'PAYMENT_ERROR'
  | 'DELIVERY_ERROR';
