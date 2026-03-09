import { useQuery } from '@tanstack/react-query';
import type { Product, Category } from '@edmi/shared';
import {
  fetchProductsDirect,
  fetchProductByIdDirect,
  fetchCategoriesDirect,
} from '@/lib/wc-direct';

export function useProducts(params?: {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
  sort?: string;
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () =>
      fetchProductsDirect({
        page: params?.page,
        perPage: params?.perPage,
        category: params?.category,
        search: params?.search,
        sort: params?.sort,
      }),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductByIdDirect(id),
    enabled: id > 0,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoriesDirect(),
  });
}
