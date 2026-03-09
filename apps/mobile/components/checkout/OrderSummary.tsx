import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import type { CartItem } from '@/stores/cart';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

interface OrderSummaryProps {
  items: CartItem[];
  contacts: { firstName: string; lastName: string; phone: string; email: string };
  delivery: { method: string; city: string; warehouse: string };
  payment: { method: string };
  comment: string;
  onCommentChange: (text: string) => void;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  contacts,
  delivery,
  payment,
  comment,
  onCommentChange,
  total,
}) => {
  const { t } = useTranslation('checkout');

  return (
    <View style={styles.container}>
      {/* Items */}
      <Text style={styles.sectionTitle}>{t('order.items')}</Text>
      {items.map((item) => (
        <View key={item.product.id} style={styles.itemRow}>
          <View style={styles.itemImage}>
            {item.product.images[0] ? (
              <Image source={{ uri: item.product.images[0].src }} style={styles.itemImageInner} contentFit="cover" />
            ) : (
              <Ionicons name="image-outline" size={16} color={colors.textSecondaryLight} />
            )}
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
            <Text style={styles.itemQty}>x{item.quantity}</Text>
          </View>
          <Text style={styles.itemPrice}>{formatPrice(item.product.price * item.quantity)} ₴</Text>
        </View>
      ))}

      {/* Contacts */}
      <Text style={styles.sectionTitle}>{t('checkout.contacts')}</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoText}>{contacts.firstName} {contacts.lastName}</Text>
        <Text style={styles.infoText}>{contacts.phone}</Text>
        {contacts.email ? <Text style={styles.infoText}>{contacts.email}</Text> : null}
      </View>

      {/* Delivery */}
      <Text style={styles.sectionTitle}>{t('order.deliveryInfo')}</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoText}>
          {delivery.method === 'nova_poshta' ? t('delivery.novaPoshta') : t('delivery.pickup')}
        </Text>
        {delivery.city ? <Text style={styles.infoText}>{delivery.city}</Text> : null}
        {delivery.warehouse ? <Text style={styles.infoText}>{delivery.warehouse}</Text> : null}
        {delivery.method === 'pickup' ? <Text style={styles.infoText}>{t('delivery.pickupAddress')}</Text> : null}
      </View>

      {/* Payment */}
      <Text style={styles.sectionTitle}>{t('order.paymentInfo')}</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoText}>
          {payment.method === 'liqpay' ? t('payment.liqpay') : t('payment.wayforpay')}
        </Text>
      </View>

      {/* Comment */}
      <Text style={styles.sectionTitle}>{t('checkout.comment')}</Text>
      <TextInput
        style={styles.commentInput}
        value={comment}
        onChangeText={onCommentChange}
        placeholder={t('checkout.commentPlaceholder')}
        placeholderTextColor={colors.textSecondaryLight}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{t('checkout.orderTotal')}</Text>
        <Text style={styles.totalValue}>{formatPrice(total)} ₴</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    marginTop: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    padding: spacing.sm,
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
  commentInput: {
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    minHeight: 80,
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
});
