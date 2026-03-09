import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

export default function OrderSuccessScreen() {
  const { t } = useTranslation('checkout');
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={80} color={colors.success} />
        </View>
        <Text style={styles.title}>{t('success.title')}</Text>
        <Text style={styles.description}>
          {t('success.description', { id: orderId })}
        </Text>

        <View style={styles.actions}>
          <Button
            title={t('success.trackOrder')}
            variant="gradient"
            fullWidth
            onPress={() => router.replace(`/order/${orderId}` as any)}
          />
          <Button
            title={t('success.continueShopping')}
            variant="outline"
            fullWidth
            onPress={() => router.replace('/(tabs)' as any)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconCircle: {
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
  },
});
