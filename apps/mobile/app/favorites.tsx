import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import type { Product } from '@edmi/shared';
import { ScreenWrapper } from '@/components/ui';
import { Header, EmptyState } from '@/components/common';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useFavoriteProducts } from '@/hooks/useFavorites';
import { colors, spacing } from '@/constants/theme';

export default function FavoritesScreen() {
  const { t } = useTranslation(['checkout', 'common']);
  const { products, isLoading } = useFavoriteProducts();

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <ScreenWrapper>
      <Header
        title={t('checkout:favorites.title')}
        showBack
        onBack={() => router.back()}
      />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : products.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title={t('checkout:favorites.empty')}
          description={t('checkout:favorites.emptyDescription')}
          actionLabel={t('checkout:cart.continueShopping')}
          onAction={() => router.push('/(tabs)' as any)}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  productItem: {
    width: '48%',
  },
});
