import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { PaymentMethod } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const METHODS: { key: PaymentMethod; icon: 'card-outline' | 'wallet-outline'; labelKey: string }[] = [
  { key: 'liqpay', icon: 'card-outline', labelKey: 'payment.liqpay' },
  { key: 'wayforpay', icon: 'wallet-outline', labelKey: 'payment.wayforpay' },
];

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const { t } = useTranslation('checkout');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('payment.title')}</Text>

      <View style={styles.methods}>
        {METHODS.map((m) => (
          <Pressable
            key={m.key}
            style={[styles.card, selectedMethod === m.key && styles.cardActive]}
            onPress={() => onSelect(m.key)}
          >
            <View style={styles.cardContent}>
              <Ionicons
                name={m.icon}
                size={28}
                color={selectedMethod === m.key ? colors.primary : colors.textSecondaryLight}
              />
              <Text style={[styles.cardText, selectedMethod === m.key && styles.cardTextActive]}>
                {t(m.labelKey)}
              </Text>
            </View>
            <View style={[styles.radio, selectedMethod === m.key && styles.radioActive]}>
              {selectedMethod === m.key && <View style={styles.radioInner} />}
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.demoNote}>
        <Ionicons name="information-circle-outline" size={16} color={colors.textSecondaryLight} />
        <Text style={styles.demoText}>{t('checkout.demoNote')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  methods: {
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '0D',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cardText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  cardTextActive: {
    fontFamily: fonts.bodySemiBold,
    color: colors.primary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  demoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  demoText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    flex: 1,
  },
});
