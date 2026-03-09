import { APP_CONFIG } from '@/constants/config';

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

interface ApiError {
  error: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<ApiResponse<T>> {
    const url = new URL(path, this.baseUrl);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const res = await fetch(url.toString());

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as ApiError | null;
      throw new Error(body?.error || `HTTP ${res.status}`);
    }

    return (await res.json()) as ApiResponse<T>;
  }
}

export const api = new ApiClient(APP_CONFIG.API_URL);
