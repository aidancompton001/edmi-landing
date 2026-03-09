import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/common';
import { Button } from '@/components/ui/Button';
import { OrderTimeline } from '@/components/checkout';
import { useOrderHistoryStore } from '@/stores/orderHistory';
import { useCartStore } from '@/stores/cart';
import { useProduct } from '@/hooks/useProducts';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function OrderDetailScreen() {
  const { t } = useTranslation(['checkout', 'common']);
  const { id } = useLocalSearchParams<{ id: string }>();
  const orderId = parseInt(id ?? '0', 10);
  const order = useOrderHistoryStore((s) => s.getOrder(orderId));
  const addItem = useCartStore((s) => s.addItem);

  if (!order) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{t('common:status.error')}</Text>
        <Button title={t('common:actions.back')} variant="outline" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const handleReorder = () => {
    // We'd need to fetch products to add to cart properly
    // For now, show confirmation
    Alert.alert(
      t('checkout:order.reorder'),
      t('common:actions.confirm') + '?',
      [
        { text: t('common:actions.cancel'), style: 'cancel' },
        {
          text: t('common:actions.confirm'),
          onPress: () => {
            router.push('/(tabs)/cart' as any);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('checkout:order.number', { id: order.id })}
        showBack
        onBack={() => router.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Timeline */}
        <View style={styles.section}>
          <OrderTimeline
            status={order.status}
            createdAt={order.createdAt}
            updatedAt={order.updatedAt}
          />
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('checkout:order.items')}</Text>
          {order.items.map((item) => (
            <View key={item.productId} style={styles.itemRow}>
              <View style={styles.itemImage}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.itemImageInner} contentFit="cover" />
                ) : (
                  <Ionicons name="image-outline" size={16} color={colors.textSecondaryLight} />
                )}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemQty}>x{item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{formatPrice(item.total)} ₴</Text>
            </View>
          ))}
        </View>

        {/* Delivery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('checkout:order.deliveryInfo')}</Text>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>
              {order.shipping.method === 'nova_poshta' ? t('checkout:delivery.novaPoshta') : t('checkout:delivery.pickup')}
            </Text>
            <Text style={styles.infoText}>{order.shipping.firstName} {order.shipping.lastName}</Text>
            <Text style={styles.infoText}>{order.shipping.phone}</Text>
            {order.shipping.city && <Text style={styles.infoText}>{order.shipping.city}</Text>}
            {order.shipping.warehouse && <Text style={styles.infoText}>{order.shipping.warehouse}</Text>}
          </View>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('checkout:order.paymentInfo')}</Text>
          <View style={styles.infoBlock}>
            <Text style={styles.infoText}>
              {order.payment.method === 'liqpay' ? t('checkout:payment.liqpay') : t('checkout:payment.wayforpay')}
            </Text>
          </View>
        </View>

        {/* Comment */}
        {order.comment && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('checkout:checkout.comment')}</Text>
            <View style={styles.infoBlock}>
              <Text style={styles.infoText}>{order.comment}</Text>
            </View>
          </View>
        )}

        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('checkout:order.date')}</Text>
          <Text style={styles.dateText}>{formatDate(order.createdAt)}</Text>
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t('checkout:checkout.orderTotal')}</Text>
          <Text style={styles.totalValue}>{formatPrice(order.total)} ₴</Text>
        </View>

        {/* Reorder */}
        <View style={styles.reorderSection}>
          <Button
            title={t('checkout:order.reorder')}
            variant="primary"
            fullWidth
            onPress={handleReorder}
          />
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    marginBottom: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  itemImage: {
    width: 48,
    height: 48,
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
    marginLeft: spacing.sm,
  },
  itemName: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
  },
  itemQty: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
  itemPrice: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
  },
  infoBlock: {
    backgroundColor: colors.bgLightAlt,
    borderRadius: radius.sm,
    padding: spacing.md,
    gap: spacing.xs,
  },
  infoText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
  },
  dateText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  totalLabel: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    color: colors.textPrimaryLight,
  },
  totalValue: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
  },
  reorderSection: {
    paddingBottom: spacing.xl,
  },
});
