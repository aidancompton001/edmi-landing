import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { BotAction, BotActionType } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface ActionButtonsProps {
  actions: BotAction[];
  onActionPress: (action: BotAction) => void;
}

const ACTION_ICONS: Record<BotActionType, keyof typeof Ionicons.glyphMap> = {
  reorder: 'repeat-outline',
  navigate: 'arrow-forward-outline',
  contact_manager: 'call-outline',
  show_product: 'eye-outline',
  add_to_cart: 'cart-outline',
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ actions, onActionPress }) => {
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <Pressable
          key={`${action.type}-${index}`}
          style={styles.button}
          onPress={() => onActionPress(action)}
        >
          <Ionicons
            name={ACTION_ICONS[action.type] ?? 'arrow-forward-outline'}
            size={16}
            color={colors.primary}
          />
          <Text style={styles.buttonText} numberOfLines={1}>{action.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  buttonText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.primary,
  },
});
