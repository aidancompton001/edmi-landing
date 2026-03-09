import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/constants/theme';

export type BadgeType = 'new' | 'used' | 'in_stock' | 'out_of_stock';

export interface BadgeProps {
  type: BadgeType;
  label?: string;
}

const BADGE_CONFIG: Record<BadgeType, { backgroundColor: string; defaultLabel: string }> = {
  new: { backgroundColor: colors.primary, defaultLabel: 'Новий' },
  used: { backgroundColor: colors.warning, defaultLabel: 'Б/В' },
  in_stock: { backgroundColor: colors.success, defaultLabel: 'В наявності' },
  out_of_stock: { backgroundColor: colors.error, defaultLabel: 'Немає' },
};

export const Badge: React.FC<BadgeProps> = ({ type, label }) => {
  const config = BADGE_CONFIG[type];
  const displayLabel = label ?? config.defaultLabel;

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
      <Text style={styles.text}>{displayLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.sm,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
});
