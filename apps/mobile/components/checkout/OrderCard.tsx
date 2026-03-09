import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Order, OrderStatus } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: colors.warning,
  processing: colors.accent,
  'on-hold': colors.warning,
  completed: colors.success,
  cancelled: colors.error,
  refunded: colors.textSecondaryLight,
  failed: colors.error,
};

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const { t } = useTranslation('checkout');

  const statusKey = `order.status${order.status.charAt(0).toUpperCase()}${order.status.slice(1).replace('-', '')}` as string;
  const statusColor = STATUS_COLORS[order.status] ?? colors.textSecondaryLight;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>{t('order.number', { id: order.id })}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '1A' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {t(statusKey)}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.dateText}>{formatDate(order.createdAt)}</Text>
        <Text style={styles.itemCount}>{order.items.length} {t('order.items').toLowerCase()}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>{t('checkout.orderTotal')}</Text>
        <Text style={styles.totalValue}>{formatPrice(order.total)} ₴</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  orderNumber: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  statusText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
  },
  details: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  dateText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  itemCount: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  totalLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  totalValue: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
});
