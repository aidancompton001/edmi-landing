import React from 'react';
import { View, Text, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface LanguageSwitcherProps {
  style?: ViewStyle;
}

const LANGUAGES = [
  { code: 'uk', label: 'UA' },
  { code: 'en', label: 'EN' },
] as const;

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (languageCode: string): void => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <View style={[styles.container, style]}>
      {LANGUAGES.map((lang) => {
        const isActive = currentLanguage === lang.code;

        return (
          <Pressable
            key={lang.code}
            style={[
              styles.button,
              isActive && styles.buttonActive,
            ]}
            onPress={() => handleLanguageChange(lang.code)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Switch language to ${lang.label}`}
          >
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
            >
              {lang.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.sm,
    backgroundColor: colors.transparent,
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    fontWeight: '600',
    color: colors.textSecondaryLight,
  },
  labelActive: {
    color: colors.white,
  },
});
