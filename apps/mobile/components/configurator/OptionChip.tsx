import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { ConfiguratorOption } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface OptionChipProps {
  option: ConfiguratorOption;
  selected: boolean;
  onPress: () => void;
}

export const OptionChip: React.FC<OptionChipProps> = ({ option, selected, onPress }) => {
  const { t } = useTranslation('configurator');

  const priceSuffix = option.priceDelta === 0
    ? ''
    : ` ${option.priceDelta > 0 ? '+' : ''}${option.priceDelta} €`;

  return (
    <Pressable
      style={[
        styles.chip,
        selected && styles.chipSelected,
        !option.available && styles.chipDisabled,
      ]}
      onPress={onPress}
      disabled={!option.available}
    >
      {option.icon && (
        <Ionicons
          name={option.icon as keyof typeof Ionicons.glyphMap}
          size={16}
          color={selected ? colors.white : option.available ? colors.primary : colors.textSecondaryLight}
        />
      )}
      <Text
        style={[
          styles.chipText,
          selected && styles.chipTextSelected,
          !option.available && styles.chipTextDisabled,
        ]}
      >
        {t(option.labelKey.replace('configurator:', ''))}
      </Text>
      {priceSuffix !== '' && option.available && (
        <Text
          style={[
            styles.priceText,
            selected && styles.priceTextSelected,
          ]}
        >
          {priceSuffix}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipDisabled: {
    borderColor: colors.borderLight,
    opacity: 0.4,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.primary,
  },
  chipTextSelected: {
    color: colors.white,
  },
  chipTextDisabled: {
    color: colors.textSecondaryLight,
  },
  priceText: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
  priceTextSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
});
