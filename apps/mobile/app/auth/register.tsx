import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

export default function RegisterScreen() {
  const { t } = useTranslation('common');
  const login = useAuthStore((s) => s.login);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors['firstName'] = t('status.error');
    if (!lastName.trim()) newErrors['lastName'] = t('status.error');
    if (!phone.trim() || !/^\+?380\d{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors['phone'] = '+380XXXXXXXXX';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors['email'] = t('status.error');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;

    login({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={t('auth.register')}
        showBack
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.field}>
            <Input
              label={t('auth.firstName')}
              placeholder={t('auth.firstName')}
              value={firstName}
              onChangeText={setFirstName}
              error={errors['firstName']}
            />
          </View>

          <View style={styles.field}>
            <Input
              label={t('auth.lastName')}
              placeholder={t('auth.lastName')}
              value={lastName}
              onChangeText={setLastName}
              error={errors['lastName']}
            />
          </View>

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
              title={t('auth.register')}
              variant="gradient"
              fullWidth
              onPress={handleRegister}
            />
          </View>

          <View style={styles.linkSection}>
            <Text style={styles.linkText}>{t('auth.hasAccount')} </Text>
            <Text
              style={styles.linkAction}
              onPress={() => router.replace('/auth/login' as any)}
            >
              {t('auth.login')}
            </Text>
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
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
