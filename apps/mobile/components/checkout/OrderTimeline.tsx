import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { OrderStatus } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

const TIMELINE_STEPS: { status: OrderStatus; icon: 'time-outline' | 'cog-outline' | 'checkmark-circle-outline' }[] = [
  { status: 'pending', icon: 'time-outline' },
  { status: 'processing', icon: 'cog-outline' },
  { status: 'completed', icon: 'checkmark-circle-outline' },
];

const STATUS_ORDER: Record<OrderStatus, number> = {
  pending: 0,
  processing: 1,
  'on-hold': 1,
  completed: 2,
  cancelled: -1,
  refunded: -1,
  failed: -1,
};

interface OrderTimelineProps {
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  status,
  createdAt,
  updatedAt,
}) => {
  const { t } = useTranslation('checkout');
  const currentIndex = STATUS_ORDER[status] ?? -1;
  const isCancelled = status === 'cancelled' || status === 'failed' || status === 'refunded';

  if (isCancelled) {
    const statusKey = `order.status${status.charAt(0).toUpperCase()}${status.slice(1)}`;
    return (
      <View style={styles.cancelledContainer}>
        <Ionicons name="close-circle" size={32} color={colors.error} />
        <Text style={styles.cancelledText}>{t(statusKey)}</Text>
        <Text style={styles.dateText}>
          {new Date(updatedAt).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {TIMELINE_STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const statusKey = `order.status${step.status.charAt(0).toUpperCase()}${step.status.slice(1)}`;

        return (
          <View key={step.status} style={styles.stepRow}>
            <View style={styles.iconColumn}>
              <View style={[styles.circle, isCompleted && styles.circleActive, isCurrent && styles.circleCurrent]}>
                <Ionicons
                  name={isCompleted ? 'checkmark' : step.icon}
                  size={16}
                  color={isCompleted ? colors.white : colors.textSecondaryLight}
                />
              </View>
              {index < TIMELINE_STEPS.length - 1 && (
                <View style={[styles.verticalLine, isCompleted && styles.verticalLineActive]} />
              )}
            </View>
            <View style={styles.labelColumn}>
              <Text style={[styles.stepLabel, isCompleted && styles.stepLabelActive]}>
                {t(statusKey)}
              </Text>
              {isCurrent && (
                <Text style={styles.dateText}>
                  {new Date(index === 0 ? createdAt : updatedAt).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  cancelledContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  cancelledText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.error,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconColumn: {
    alignItems: 'center',
    width: 32,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bgLightAlt,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  circleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  circleCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  verticalLine: {
    width: 2,
    height: 24,
    backgroundColor: colors.borderLight,
  },
  verticalLineActive: {
    backgroundColor: colors.primary,
  },
  labelColumn: {
    flex: 1,
    marginLeft: spacing.md,
    paddingBottom: spacing.md,
  },
  stepLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
  },
  stepLabelActive: {
    color: colors.textPrimaryLight,
    fontFamily: fonts.bodySemiBold,
  },
  dateText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    marginTop: 2,
  },
});
