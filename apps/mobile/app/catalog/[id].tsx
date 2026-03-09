import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, router } from 'expo-router';
import type { Product, ProductSort } from '@edmi/shared';
import { ScreenWrapper } from '@/components/ui';
import { Header } from '@/components/common';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

const SORT_OPTIONS: { key: ProductSort; labelKey: string }[] = [
  { key: 'date_desc', labelKey: 'products:sort.newest' },
  { key: 'price_asc', labelKey: 'products:sort.priceAsc' },
  { key: 'price_desc', labelKey: 'products:sort.priceDesc' },
  { key: 'title_asc', labelKey: 'products:sort.nameAsc' },
];

export default function CategoryProductsScreen() {
  const { t } = useTranslation(['common', 'products']);
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = parseInt(id ?? '0', 10);

  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<ProductSort | undefined>(undefined);

  const { data: categoriesData } = useCategories();
  const category = categoriesData?.find((c) => c.id === categoryId);

  const { data: productsData, isLoading, isError, refetch } = useProducts({
    perPage: 50,
    category: categoryId,
    sort: selectedSort,
  });

  const products = productsData?.data ?? [];

  const brands = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.brand).filter(Boolean))];
    return unique.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedBrand) return products;
    return products.filter((p) => p.brand === selectedBrand);
  }, [products, selectedBrand]);

  const handleBrandPress = (brand: string | undefined) => {
    setSelectedBrand(selectedBrand === brand ? undefined : brand);
  };

  const handleSortPress = (sort: ProductSort) => {
    setSelectedSort(selectedSort === sort ? undefined : sort);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <ScreenWrapper>
      <Header
        title={category?.name ?? t('products:catalog.title')}
        showBack
        onBack={() => router.back()}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={refetch}
        ListHeaderComponent={
          <>
            {/* Brand Chips */}
            {brands.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipList}
                style={styles.chipSection}
              >
                <Pressable
                  onPress={() => handleBrandPress(undefined)}
                  style={[
                    styles.chip,
                    !selectedBrand && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      !selectedBrand && styles.chipTextActive,
                    ]}
                  >
                    {t('products:catalog.allBrands')}
                  </Text>
                </Pressable>
                {brands.map((brand) => (
                  <Pressable
                    key={brand}
                    onPress={() => handleBrandPress(brand)}
                    style={[
                      styles.chip,
                      selectedBrand === brand && styles.chipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedBrand === brand && styles.chipTextActive,
                      ]}
                    >
                      {brand}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}

            {/* Sort Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipList}
              style={styles.sortSection}
            >
              {SORT_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.key}
                  onPress={() => handleSortPress(opt.key)}
                  style={[
                    styles.sortChip,
                    selectedSort === opt.key && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.sortChipText,
                      selectedSort === opt.key && styles.chipTextActive,
                    ]}
                  >
                    {t(opt.labelKey)}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Results Count */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsText}>
                {t('products:catalog.results', { count: filteredProducts.length })}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : isError ? (
              <>
                <Text style={styles.emptyText}>{t('status.error')}</Text>
                <Pressable onPress={() => refetch()} style={styles.retryButton}>
                  <Text style={styles.retryText}>{t('actions.retry')}</Text>
                </Pressable>
              </>
            ) : (
              <Text style={styles.emptyText}>{t('products:catalog.noResults')}</Text>
            )}
          </View>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  chipSection: {
    marginTop: spacing.sm,
  },
  sortSection: {
    marginTop: spacing.sm,
  },
  chipList: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.bgLightAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.caption,
    color: colors.textPrimaryLight,
  },
  chipTextActive: {
    color: colors.white,
  },
  sortChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  sortChipText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
  resultsHeader: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  resultsText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  productItem: {
    width: '48%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
  },
  retryButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  retryText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.white,
  },
});
