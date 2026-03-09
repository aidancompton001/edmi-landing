import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {icon ? (
        <Ionicons
          name={icon}
          size={64}
          color={colors.textSecondaryDark}
        />
      ) : null}

      <Text style={styles.title}>{title}</Text>

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      {actionLabel && onAction ? (
        <View style={styles.actionWrapper}>
          <Button variant="primary" onPress={onAction} title={actionLabel} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    fontWeight: '600',
    color: colors.textPrimaryLight,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
    textAlign: 'center',
    maxWidth: 280,
    marginTop: spacing.sm,
  },
  actionWrapper: {
    marginTop: spacing.lg,
  },
});
