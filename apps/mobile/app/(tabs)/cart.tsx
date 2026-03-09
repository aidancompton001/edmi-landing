import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScreenWrapper, Button } from '@/components/ui';
import { EmptyState } from '@/components/common';
import { useCartStore, type CartItem } from '@/stores/cart';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const mainImage = item.product.images[0];

  return (
    <View style={styles.cartItem}>
      <Pressable
        style={styles.itemImage}
        onPress={() => router.push(`/product/${item.product.id}`)}
      >
        {mainImage ? (
          <Image source={{ uri: mainImage.src }} style={styles.itemImageInner} contentFit="cover" />
        ) : (
          <Ionicons name="image-outline" size={24} color={colors.textSecondaryLight} />
        )}
      </Pressable>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.product.price)} ₴</Text>

        <View style={styles.quantityRow}>
          <Pressable
            style={styles.qtyButton}
            onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={18} color={colors.textPrimaryLight} />
          </Pressable>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <Pressable
            style={styles.qtyButton}
            onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={18} color={colors.textPrimaryLight} />
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.removeButton} onPress={() => removeItem(item.product.id)}>
        <Ionicons name="trash-outline" size={20} color={colors.error} />
      </Pressable>
    </View>
  );
}

export default function CartScreen() {
  const { t } = useTranslation(['common', 'checkout']);
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const clearCart = useCartStore((s) => s.clearCart);

  if (items.length === 0) {
    return (
      <ScreenWrapper>
        <View style={styles.header}>
          <Text style={styles.title}>{t('checkout:cart.title')}</Text>
        </View>
        <EmptyState
          icon="cart-outline"
          title={t('checkout:cart.empty')}
          description={t('checkout:cart.emptyDescription')}
          actionLabel={t('checkout:cart.continueShopping')}
          onAction={() => router.push('/(tabs)')}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>{t('checkout:cart.title')}</Text>
        <Pressable onPress={clearCart}>
          <Text style={styles.clearText}>{t('common:actions.clear')}</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        renderItem={({ item }) => <CartItemRow item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{t('checkout:cart.itemCount', { count: getItemCount() })}</Text>
          <Text style={styles.summaryTotal}>{formatPrice(getTotal())} ₴</Text>
        </View>
        <Button
          title={t('checkout:cart.checkout')}
          variant="gradient"
          fullWidth
          onPress={() => router.push('/checkout' as any)}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
  },
  clearText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.error,
  },
  list: {
    paddingBottom: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
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
    marginBottom: spacing.sm,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bgLightAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: spacing.sm,
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
  },
  summaryTotal: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
  },
});
