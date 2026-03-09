import { View, Text, StyleSheet, FlatList, Dimensions, Alert, ActivityIndicator, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import type { Product } from '@edmi/shared';
import { ScreenWrapper } from '@/components/ui';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SearchBar } from '@/components/common';
import { QuickActionButton } from '@/components/home';
import { useProducts } from '@/hooks/useProducts';
import { colors, fonts, fontSizes, spacing, gradient, radius } from '@/constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.42;

export default function HomeScreen() {
  const { t } = useTranslation('common');

  const { data: latestData, isLoading } = useProducts({ perPage: 10, sort: 'date_desc' });
  const latestProducts = latestData?.data ?? [];

  const onSaleProducts = latestProducts.filter((p) => p.onSale);
  const bestOffers = onSaleProducts.length > 0 ? onSaleProducts : latestProducts.slice(0, 6);

  const renderBestOffer = ({ item }: { item: Product }) => (
    <View style={styles.offerItem}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={bestOffers}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderBestOffer}
        numColumns={2}
        columnWrapperStyle={styles.offerRow}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Hero */}
            <LinearGradient
              colors={[...gradient.primary.colors]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              <Text style={styles.heroTitle}>EDMI</Text>
              <Text style={styles.heroSubtitle}>
                {t('app.tagline')}
              </Text>
            </LinearGradient>

            {/* Search — tappable, navigates to catalog */}
            <Pressable
              style={styles.searchSection}
              onPress={() => router.push('/catalog' as any)}
            >
              <View pointerEvents="none">
                <SearchBar
                  value=""
                  onChangeText={() => {}}
                  placeholder={t('home.quickActions.catalog') + '...'}
                />
              </View>
            </Pressable>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <QuickActionButton
                icon="grid-outline"
                label={t('home.quickActions.catalog')}
                color={colors.primary}
                onPress={() => router.push('/catalog' as any)}
              />
              <QuickActionButton
                icon="pricetag-outline"
                label={t('home.quickActions.discounts')}
                color={colors.accent}
                onPress={() => Alert.alert(t('comingSoon'))}
              />
              <QuickActionButton
                icon="notifications-outline"
                label={t('home.quickActions.notifications')}
                color={colors.warning}
                onPress={() => Alert.alert(t('comingSoon'))}
              />
              <QuickActionButton
                icon="bag-outline"
                label={t('home.quickActions.orders')}
                color={colors.success}
                onPress={() => router.push('/orders' as any)}
              />
            </View>

            {/* Recommendations */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.recommendations')}</Text>
              <Pressable onPress={() => router.push('/catalog' as any)}>
                <Text style={styles.viewAll}>{t('home.viewAll')}</Text>
              </Pressable>
            </View>

            {isLoading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            ) : (
              <FlatList
                data={latestProducts}
                keyExtractor={(item) => `rec-${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                renderItem={({ item }) => (
                  <View style={{ width: CARD_WIDTH }}>
                    <ProductCard product={item} />
                  </View>
                )}
              />
            )}

            {/* Best Offers Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.bestOffers')}</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : null
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    minHeight: 120,
    justifyContent: 'center',
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 32,
    color: colors.white,
    letterSpacing: 2,
  },
  heroSubtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
  },
  searchSection: {
    marginTop: spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    color: colors.textPrimaryLight,
  },
  viewAll: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.primary,
  },
  horizontalList: {
    gap: spacing.sm,
  },
  loadingRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  offerRow: {
    justifyContent: 'space-between',
  },
  offerItem: {
    width: '48%',
  },
});
