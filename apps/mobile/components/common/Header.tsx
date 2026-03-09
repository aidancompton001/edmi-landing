import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, sizes, spacing } from '@/constants/theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const BACK_BUTTON_WIDTH = sizes.iconDefault + spacing.sm;

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable
          onPress={onBack}
          style={styles.backButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons
            name="chevron-back"
            size={sizes.iconDefault}
            color={colors.textPrimaryLight}
          />
        </Pressable>
      ) : null}

      <Text
        style={[
          styles.title,
          showBack && styles.titleWithBack,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {rightAction ? (
        <View style={styles.rightAction}>{rightAction}</View>
      ) : showBack ? (
        <View style={{ width: BACK_BUTTON_WIDTH }} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: sizes.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  backButton: {
    width: BACK_BUTTON_WIDTH,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimaryLight,
    textAlign: 'center',
  },
  titleWithBack: {
    marginRight: 0,
  },
  rightAction: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
