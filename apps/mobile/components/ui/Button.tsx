import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radius, animation } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'gradient' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const SIZE_STYLES: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 13 },
  md: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 15 },
  lg: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 17 },
};

const VARIANT_BG: Record<Exclude<ButtonVariant, 'gradient'>, string> = {
  primary: colors.primary,
  secondary: colors.accent,
  outline: colors.transparent,
};

const VARIANT_TEXT: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: colors.white,
  gradient: colors.white,
  outline: colors.primary,
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  size = 'md',
  fullWidth = false,
  icon,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: animation.pressScale,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const sizeStyle = SIZE_STYLES[size];
  const textColor = VARIANT_TEXT[variant];

  const containerStyle: ViewStyle = {
    paddingVertical: sizeStyle.paddingVertical,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...(fullWidth ? { width: '100%' } : {}),
    ...(variant === 'outline'
      ? { borderWidth: 1.5, borderColor: colors.primary, backgroundColor: colors.transparent }
      : variant !== 'gradient'
        ? { backgroundColor: VARIANT_BG[variant] }
        : {}),
    ...(disabled ? { opacity: 0.5 } : {}),
  };

  const textStyle: TextStyle = {
    fontFamily: fonts.heading,
    fontWeight: '600',
    fontSize: sizeStyle.fontSize,
    color: textColor,
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon && <Animated.View style={styles.iconWrapper}>{icon}</Animated.View>}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </>
  );

  if (variant === 'gradient') {
    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth ? styles.fullWidth : undefined, disabled ? styles.disabled : undefined]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
        >
          <LinearGradient
            colors={['#8b3dc5', '#0057b8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.gradientInner,
              {
                paddingVertical: sizeStyle.paddingVertical,
                paddingHorizontal: sizeStyle.paddingHorizontal,
              },
            ]}
          >
            {renderContent()}
          </LinearGradient>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={containerStyle}
      >
        {renderContent()}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    marginRight: 8,
  },
  gradientInner: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
