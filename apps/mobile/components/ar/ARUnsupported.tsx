import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface ARUnsupportedProps {
  onClose: () => void;
}

export default function ARUnsupported({ onClose }: ARUnsupportedProps) {
  const { t } = useTranslation('configurator');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="cube-outline" size={48} color={colors.textSecondaryLight} />
        </View>
        <Text style={styles.title}>{t('configurator.ar.unsupported')}</Text>
        <Text style={styles.message}>{t('configurator.ar.unsupportedMessage')}</Text>
        <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.7}>
          <Text style={styles.buttonText}>{t('configurator.ar.close')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  content: {
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    backgroundColor: colors.bgLightAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
    textAlign: 'center',
  },
  message: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 4,
    borderRadius: radius.md,
  },
  buttonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
    color: colors.white,
  },
});
