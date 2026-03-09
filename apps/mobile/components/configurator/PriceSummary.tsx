import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface PriceSummaryProps {
  totalPrice: number;
  isComplete: boolean;
  onAddToCart: () => void;
  onAskEdmik: () => void;
  onViewInRoom: () => void;
}

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  totalPrice,
  isComplete,
  onAddToCart,
  onAskEdmik,
  onViewInRoom,
}) => {
  const { t } = useTranslation('configurator');

  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <View style={styles.priceBlock}>
          <Text style={styles.priceLabel}>{t('configurator.totalPrice')}</Text>
          <Text style={styles.priceValue}>{formatPrice(totalPrice)} €</Text>
        </View>
        <Pressable onPress={onAddToCart} disabled={!isComplete}>
          <LinearGradient
            colors={isComplete
              ? [colors.gradientStart, colors.gradientEnd]
              : ['#ccc', '#aaa']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addButton}
          >
            <Ionicons name="cart-outline" size={18} color={colors.white} />
            <Text style={styles.addButtonText}>{t('configurator.addToCart')}</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <View style={styles.actionsRow}>
        <Pressable style={styles.secondaryAction} onPress={onAskEdmik}>
          <Ionicons name="chatbubble-ellipses-outline" size={16} color={colors.primary} />
          <Text style={styles.secondaryText}>{t('configurator.askEdmik')}</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction} onPress={onViewInRoom}>
          <Ionicons name="cube-outline" size={16} color={colors.accent} />
          <Text style={[styles.secondaryText, { color: colors.accent }]}>{t('configurator.viewInRoom')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceBlock: {
    gap: 2,
  },
  priceLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
  priceValue: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.price,
    color: colors.textPrimaryLight,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 4,
    borderRadius: radius.md,
  },
  addButtonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
    color: colors.white,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  secondaryText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.primary,
  },
});
