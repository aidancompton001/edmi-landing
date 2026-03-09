import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { ConfiguratorOptionGroup } from '@edmi/shared';
import { ColorSwatch } from './ColorSwatch';
import { OptionChip } from './OptionChip';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

interface OptionGroupProps {
  group: ConfiguratorOptionGroup;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({ group, selectedOptionId, onSelect }) => {
  const { t } = useTranslation('configurator');
  const isColor = group.id === 'color';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {t(group.labelKey.replace('configurator:', ''))}
      </Text>
      <View style={isColor ? styles.colorRow : styles.chipRow}>
        {group.options.map((option) => (
          isColor ? (
            <ColorSwatch
              key={option.id}
              option={option}
              selected={selectedOptionId === option.id}
              onPress={() => onSelect(option.id)}
            />
          ) : (
            <OptionChip
              key={option.id}
              option={option}
              selected={selectedOptionId === option.id}
              onPress={() => onSelect(option.id)}
            />
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
