import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Dimensions, Share, Alert, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cart';
import { useFavoritesStore } from '@/stores/favorites';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/common';
import { ProductCard } from '@/components/catalog/ProductCard';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RELATED_CARD_WIDTH = SCREEN_WIDTH * 0.42;

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function ProductDetailScreen() {
  const { t } = useTranslation(['common', 'products']);
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = parseInt(id ?? '0', 10);
  const { data: product, isLoading, isError } = useProduct(productId);
  const addItem = useCartStore((s) => s.addItem);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(productId));
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Related products from same category
  const categoryId = product?.categories[0]?.id;
  const { data: relatedData } = useProducts({
    perPage: 4,
    category: categoryId,
  });
  const relatedProducts = (relatedData?.data ?? []).filter((p) => p.id !== productId).slice(0, 3);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
  };

  const handleShare = async () => {
    if (!product) return;
    await Share.share({
      message: `${product.name}\nhttps://edmi.com.ua/product/${product.slug}`,
    });
  };

  const handleRequestInvoice = () => {
    Alert.alert(
      t('products:product.requestInvoice'),
      "Зв'яжіться з нашим менеджером",
      [
        { text: 'Зателефонувати', onPress: () => Linking.openURL('tel:+380441234567') },
        { text: 'Закрити', style: 'cancel' },
      ]
    );
  };

  const handleCompare = () => {
    Alert.alert(t('common:comingSoon'));
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveImageIndex(index);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Товар не знайдено</Text>
        <Button title={t('common:actions.back')} variant="outline" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const description = stripHtml(product.description || product.shortDescription || '');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.gallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {product.images.length > 0 ? (
              product.images.map((img) => (
                <Image
                  key={img.id}
                  source={{ uri: img.src }}
                  style={styles.galleryImage}
                  contentFit="contain"
                  transition={200}
                />
              ))
            ) : (
              <View style={[styles.galleryImage, styles.imagePlaceholder]}>
                <Ionicons name="image-outline" size={64} color={colors.textSecondaryLight} />
              </View>
            )}
          </ScrollView>

          {/* Image dots */}
          {product.images.length > 1 && (
            <View style={styles.dots}>
              {product.images.map((img, i) => (
                <View
                  key={img.id}
                  style={[styles.dot, i === activeImageIndex && styles.dotActive]}
                />
              ))}
            </View>
          )}

          {/* Back button */}
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={colors.textPrimaryLight} />
          </Pressable>

          {/* Category button — navigate to product's category */}
          {categoryId ? (
            <Pressable
              style={styles.categoryButton}
              onPress={() => router.push(`/catalog/${categoryId}` as any)}
            >
              <Ionicons name="grid-outline" size={22} color={colors.textPrimaryLight} />
            </Pressable>
          ) : null}

          {/* Share button */}
          <Pressable style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={22} color={colors.textPrimaryLight} />
          </Pressable>

          {/* Favorite button */}
          <Pressable style={styles.favoriteButton} onPress={() => toggleFavorite(productId)}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.error : colors.textPrimaryLight}
            />
          </Pressable>
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          {/* Badges */}
          <View style={styles.badgeRow}>
            {product.condition === 'used' && <Badge type="used" />}
            {product.onSale && <Badge type="new" label="Акція" />}
          </View>

          {/* Brand */}
          {product.brand ? (
            <Text style={styles.brand}>{product.brand}</Text>
          ) : null}

          {/* Stock Status */}
          <Text style={[
            styles.stockStatus,
            product.stockStatus === 'in_stock' ? styles.stockInStock : styles.stockOutOfStock,
          ]}>
            {product.stockStatus === 'in_stock'
              ? t('products:product.inStock')
              : t('products:product.outOfStock')}
          </Text>

          {/* Name */}
          <Text style={styles.name}>{product.name}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)} ₴</Text>
            {product.onSale && product.regularPrice > product.price && (
              <Text style={styles.oldPrice}>{formatPrice(product.regularPrice)} ₴</Text>
            )}
          </View>

          {/* SKU */}
          {product.sku ? (
            <Text style={styles.sku}>{t('products:product.sku')}: {product.sku}</Text>
          ) : null}

          {/* Accordion Sections */}
          {product.attributes.length > 0 && (
            <Accordion title={t('products:product.specifications')} defaultOpen>
              {product.attributes.map((attr) => {
                const value = attr.options.join(', ');
                const isLong = value.length > 80 || value.includes('\n');

                if (isLong) {
                  const lines = value.split('\n').filter((l) => l.trim());
                  return (
                    <View key={attr.id} style={styles.attrBlock}>
                      <Text style={styles.attrBlockName}>{attr.name}</Text>
                      {lines.map((line, i) => {
                        const trimmed = line.trim();
                        const isHeader = /^[^-].*:$/.test(trimmed) && trimmed.length < 60;
                        const isBullet = trimmed.startsWith('- ');
                        return (
                          <Text
                            key={i}
                            style={[
                              isHeader ? styles.attrSectionHeader : styles.attrBlockValue,
                              isBullet && styles.attrBullet,
                            ]}
                          >
                            {isBullet ? `\u2022 ${trimmed.slice(2)}` : trimmed}
                          </Text>
                        );
                      })}
                    </View>
                  );
                }

                return (
                  <View key={attr.id} style={styles.attrRow}>
                    <Text style={styles.attrName}>{attr.name}</Text>
                    <Text style={styles.attrValue}>{value}</Text>
                  </View>
                );
              })}
            </Accordion>
          )}

          {description ? (
            <Accordion title={t('products:product.description')}>
              <Text style={styles.description}>{description}</Text>
            </Accordion>
          ) : null}

          <Accordion title={t('products:product.delivery')}>
            <View style={styles.deliveryRow}>
              <Ionicons name="cube-outline" size={20} color={colors.primary} />
              <Text style={styles.deliveryText}>Нова Пошта — доставка по всій Україні</Text>
            </View>
            <View style={styles.deliveryRow}>
              <Ionicons name="storefront-outline" size={20} color={colors.primary} />
              <Text style={styles.deliveryText}>Самовивіз — м. Київ</Text>
            </View>
            <Text style={styles.deliveryNote}>Точну вартість доставки уточнюйте у менеджера</Text>
          </Accordion>

          <Accordion title={t('products:product.payment')}>
            <View style={styles.deliveryRow}>
              <Ionicons name="card-outline" size={20} color={colors.primary} />
              <Text style={styles.deliveryText}>Безготівковий розрахунок</Text>
            </View>
            <View style={styles.deliveryRow}>
              <Ionicons name="cash-outline" size={20} color={colors.primary} />
              <Text style={styles.deliveryText}>Оплата при отриманні</Text>
            </View>
            <View style={styles.deliveryRow}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
              <Text style={styles.deliveryText}>Гарантія від виробника</Text>
            </View>
          </Accordion>

          {/* B2B: Request Invoice */}
          <View style={styles.invoiceSection}>
            <Button
              title={t('products:product.requestInvoice')}
              variant="outline"
              onPress={handleRequestInvoice}
              fullWidth
            />
          </View>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>{t('products:product.relatedProducts')}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedScroll}
              >
                {relatedProducts.map((rp) => (
                  <View key={rp.id} style={styles.relatedCard}>
                    <ProductCard product={rp} />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.bottomIcon} onPress={handleCompare}>
          <Ionicons name="git-compare-outline" size={24} color={colors.textPrimaryLight} />
        </Pressable>
        <Pressable style={styles.bottomIcon} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={24} color={colors.textPrimaryLight} />
        </Pressable>
        <Pressable style={styles.bottomIcon} onPress={() => toggleFavorite(productId)}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? colors.error : colors.textPrimaryLight}
          />
        </Pressable>
        <View style={styles.bottomCta}>
          <Button
            title={t('common:actions.buy')}
            variant="gradient"
            onPress={handleAddToCart}
            fullWidth
            disabled={product.stockStatus === 'out_of_stock'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
  },
  gallery: {
    position: 'relative',
    backgroundColor: colors.bgLightAlt,
  },
  galleryImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 20,
  },
  backButton: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButton: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.md + 48,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: spacing.sm,
    right: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  brand: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  stockStatus: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    marginBottom: spacing.sm,
  },
  stockInStock: {
    color: colors.success,
  },
  stockOutOfStock: {
    color: colors.error,
  },
  name: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    color: colors.textPrimaryLight,
    lineHeight: 28,
    marginBottom: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  price: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.price,
    color: colors.textPrimaryLight,
  },
  oldPrice: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
    textDecorationLine: 'line-through',
  },
  sku: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    marginBottom: spacing.lg,
  },
  attrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  attrName: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
    flex: 1,
  },
  attrValue: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    flex: 1,
    textAlign: 'right',
  },
  attrBlock: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  attrBlockName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
    marginBottom: spacing.xs,
  },
  attrSectionHeader: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  attrBlockValue: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    lineHeight: 20,
  },
  attrBullet: {
    paddingLeft: spacing.sm,
    marginBottom: 2,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    lineHeight: 22,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  deliveryText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    flex: 1,
  },
  deliveryNote: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    marginTop: spacing.xs,
  },
  invoiceSection: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  relatedSection: {
    marginBottom: spacing.lg,
  },
  relatedTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    marginBottom: spacing.md,
  },
  relatedScroll: {
    gap: spacing.sm,
  },
  relatedCard: {
    width: RELATED_CARD_WIDTH,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.bgLight,
    gap: spacing.sm,
  },
  bottomIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.bgLightAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCta: {
    flex: 1,
  },
});
