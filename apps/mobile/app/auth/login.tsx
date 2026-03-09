import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

export default function LoginScreen() {
  const { t } = useTranslation('common');
  const login = useAuthStore((s) => s.login);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!phone.trim() || !/^\+?380\d{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors['phone'] = '+380XXXXXXXXX';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors['email'] = t('status.error');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    login({
      firstName: '',
      lastName: '',
      phone: phone.trim(),
      email: email.trim(),
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('auth.login')}
        showBack
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.form}>
          <Text style={styles.subtitle}>{t('profile.loginPrompt')}</Text>

          <View style={styles.field}>
            <Input
              label={t('auth.phone')}
              placeholder="+380XXXXXXXXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              error={errors['phone']}
            />
          </View>

          <View style={styles.field}>
            <Input
              label={t('auth.email')}
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors['email']}
            />
          </View>

          <View style={styles.buttonSection}>
            <Button
              title={t('auth.login')}
              variant="gradient"
              fullWidth
              onPress={handleLogin}
            />
          </View>

          <View style={styles.linkSection}>
            <Text style={styles.linkText}>{t('auth.noAccount')} </Text>
            <Text
              style={styles.linkAction}
              onPress={() => router.replace('/auth/register' as any)}
            >
              {t('auth.register')}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  },
  form: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textSecondaryLight,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  field: {
    marginBottom: spacing.md,
  },
  buttonSection: {
    marginTop: spacing.lg,
  },
  linkSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  linkText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  linkAction: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.primary,
  },
});
