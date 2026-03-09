import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Product } from '@edmi/shared';
import { ScreenWrapper } from '@/components/ui';
import { EmptyState } from '@/components/common';
import { useProducts } from '@/hooks/useProducts';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

function StockItem({ product }: { product: Product }) {
  return (
    <Pressable
      style={styles.stockItem}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={styles.itemImage}>
        {product.images[0] ? (
          <Image
            source={{ uri: product.images[0].src }}
            style={styles.itemImageInner}
            contentFit="cover"
          />
        ) : (
          <Ionicons name="image-outline" size={24} color={colors.textSecondaryLight} />
        )}
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(product.price)} ₴</Text>
      </View>
      <View style={styles.itemStatus}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>{product.stockStatus === 'in_stock' ? 'В наявності' : 'Немає'}</Text>
      </View>
    </Pressable>
  );
}

export default function StockScreen() {
  const { t } = useTranslation(['common', 'products']);
  const { data: productsData, isLoading, isError, refetch } = useProducts({
    perPage: 50,
  });

  const allProducts = productsData?.data ?? [];
  const inStockCount = allProducts.filter((p) => p.stockStatus === 'in_stock').length;

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View style={styles.header}>
          <Text style={styles.title}>{t('products:stock.title')}</Text>
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (isError || allProducts.length === 0) {
    return (
      <ScreenWrapper>
        <View style={styles.header}>
          <Text style={styles.title}>{t('products:stock.title')}</Text>
        </View>
        <EmptyState
          icon="cube-outline"
          title={t('products:stock.emptyTitle')}
          description={t('products:stock.emptyDescription')}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <FlatList
        data={allProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <StockItem product={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={refetch}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>{t('products:stock.title')}</Text>
            <Text style={styles.subtitle}>
              {t('products:stock.available')}: {inStockCount} / {allProducts.length}
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
    marginTop: spacing.xs,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: radius.sm,
    backgroundColor: colors.bgLightAlt,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImageInner: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemName: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    marginBottom: spacing.xs,
  },
  itemPrice: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  itemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
    color: colors.success,
  },
});
