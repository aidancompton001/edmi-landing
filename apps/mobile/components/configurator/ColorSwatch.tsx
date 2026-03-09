import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { ConfiguratorOption } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

interface ColorSwatchProps {
  option: ConfiguratorOption;
  selected: boolean;
  onPress: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ option, selected, onPress }) => {
  const { t } = useTranslation('configurator');

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={!option.available}
    >
      <View
        style={[
          styles.swatch,
          { backgroundColor: option.colorHex ?? colors.bgLightAlt },
          selected && styles.swatchSelected,
          !option.available && styles.swatchDisabled,
        ]}
      >
        {selected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </View>
      <Text style={[styles.label, !option.available && styles.labelDisabled]}>
        {t(option.labelKey.replace('configurator:', ''))}
      </Text>
      {option.priceDelta !== 0 && option.available && (
        <Text style={styles.price}>
          {option.priceDelta > 0 ? '+' : ''}{option.priceDelta} €
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatchSelected: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
  swatchDisabled: {
    opacity: 0.3,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.bodySemiBold,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.caption,
    color: colors.textPrimaryLight,
  },
  labelDisabled: {
    opacity: 0.4,
  },
  price: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
});
