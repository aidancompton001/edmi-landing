import { useQueries } from '@tanstack/react-query';
import type { Product } from '@edmi/shared';
import { fetchProductByIdDirect } from '@/lib/wc-direct';
import { useFavoritesStore } from '@/stores/favorites';

export function useFavoriteProducts() {
  const ids = useFavoritesStore((s) => s.ids);

  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['product', id],
      queryFn: () => fetchProductByIdDirect(id),
      enabled: id > 0,
    })),
  });

  const products = queries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => q.data!);
  const isLoading = queries.some((q) => q.isLoading);

  return { products, isLoading };
}
