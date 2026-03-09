import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface QuickActionsProps {
  onActionPress: (text: string) => void;
}

const ACTIONS = [
  { key: 'reorder', icon: 'repeat-outline' as const, triggerText: 'Повторити замовлення' },
  { key: 'orderStatus', icon: 'time-outline' as const, triggerText: 'Статус замовлення' },
  { key: 'contactManager', icon: 'call-outline' as const, triggerText: 'Менеджер' },
  { key: 'catalog', icon: 'grid-outline' as const, triggerText: 'Каталог' },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionPress }) => {
  const { t } = useTranslation('bot');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {ACTIONS.map((action) => (
        <Pressable
          key={action.key}
          style={styles.chip}
          onPress={() => onActionPress(action.triggerText)}
        >
          <Ionicons name={action.icon} size={16} color={colors.primary} />
          <Text style={styles.chipText}>
            {t(`quickActions.${action.key}`)}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexShrink: 0,
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.primary,
  },
});
