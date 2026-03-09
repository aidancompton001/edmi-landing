import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Product } from '@edmi/shared';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useFavoritesStore } from '@/stores/favorites';
import { useCartStore } from '@/stores/cart';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.images[0];
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id));

  const discount =
    product.onSale && product.regularPrice > product.price
      ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
      : 0;

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    useCartStore.getState().addItem(product);
  };

  return (
    <Card onPress={handlePress} style={styles.card}>
      {/* Image */}
      <View style={styles.imageContainer}>
        {mainImage ? (
          <Image
            source={{ uri: mainImage.src }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={32} color={colors.textSecondaryLight} />
          </View>
        )}

        {/* Badges */}
        <View style={styles.badges}>
          {product.stockStatus === 'in_stock' && <Badge type="in_stock" />}
          {product.stockStatus === 'out_of_stock' && <Badge type="out_of_stock" />}
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{'\u2212'}{discount}%</Text>
            </View>
          )}
        </View>

        {/* Favorite */}
        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(product.id)}
          hitSlop={8}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? colors.error : colors.textSecondaryLight}
          />
        </Pressable>
      </View>

      {/* Info */}
      <View style={styles.info}>
        {product.brand ? (
          <Text style={styles.brand} numberOfLines={1}>{product.brand}</Text>
        ) : null}

        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        {/* Price Row + Cart Button */}
        <View style={styles.bottomRow}>
          <View style={styles.priceColumn}>
            <Text style={[styles.price, discount > 0 && styles.priceOnSale]}>
              {formatPrice(product.price)} ₴
            </Text>
            {discount > 0 && (
              <Text style={styles.oldPrice}>{formatPrice(product.regularPrice)} ₴</Text>
            )}
          </View>

          <Pressable style={styles.cartButton} onPress={handleAddToCart} hitSlop={6}>
            <Ionicons name="cart-outline" size={20} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: colors.bgLightAlt,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badges: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    gap: spacing.xs,
  },
  discountBadge: {
    backgroundColor: colors.error,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: colors.white,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: spacing.md,
  },
  brand: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  name: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceColumn: {
    flex: 1,
  },
  price: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.priceSmall,
    color: colors.textPrimaryLight,
  },
  priceOnSale: {
    color: colors.primary,
  },
  oldPrice: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    textDecorationLine: 'line-through',
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
