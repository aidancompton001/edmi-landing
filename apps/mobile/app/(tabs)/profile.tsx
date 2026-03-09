import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher, MenuItem } from '@/components/common';
import { useFavoritesStore } from '@/stores/favorites';
import { useAuthStore } from '@/stores/auth';
import { colors, fonts, fontSizes, spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const { t } = useTranslation('common');
  const favCount = useFavoritesStore((s) => s.ids.length);
  const [showLanguage, setShowLanguage] = useState(false);

  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);

  return (
    <ScreenWrapper scrollable>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('navigation.profile')}</Text>
      </View>

      {/* Avatar & User Info */}
      <View style={styles.avatarSection}>
        <Ionicons
          name={isLoggedIn ? 'person-circle' : 'person-circle-outline'}
          size={80}
          color={isLoggedIn ? colors.primary : colors.textSecondaryLight}
        />
        {isLoggedIn && user ? (
          <>
            <Text style={styles.userName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.loginButton}>
              <Button
                title={t('auth.logout')}
                variant="outline"
                size="sm"
                onPress={logout}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.guestName}>{t('profile.guest')}</Text>
            <View style={styles.loginButton}>
              <Button
                title={t('auth.login')}
                variant="primary"
                size="sm"
                onPress={() => router.push('/auth/login' as any)}
              />
            </View>
          </>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <MenuItem
          icon="bag-outline"
          label={t('profile.orders')}
          onPress={() => router.push('/orders' as any)}
        />
        <MenuItem
          icon="heart-outline"
          label={t('profile.wishlist')}
          badge={favCount > 0 ? favCount : undefined}
          onPress={() => router.push('/favorites' as any)}
        />
        <MenuItem
          icon="language-outline"
          label={t('language.title')}
          onPress={() => setShowLanguage((prev) => !prev)}
        />
        {showLanguage && (
          <View style={styles.languageInline}>
            <LanguageSwitcher />
          </View>
        )}
        <MenuItem
          icon="call-outline"
          label={t('profile.contactManager')}
          onPress={() => Linking.openURL('tel:+380441234567')}
        />
        <MenuItem
          icon="information-circle-outline"
          label={t('profile.about')}
          onPress={() => Alert.alert('EDMI', 'v0.1.0\nedmi.com.ua')}
        />
      </View>

      {/* Version */}
      <Text style={styles.version}>EDMI v0.1.0</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.h2,
    color: colors.textPrimaryLight,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  guestName: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    color: colors.textPrimaryLight,
    marginTop: spacing.sm,
  },
  userName: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.h3,
    color: colors.textPrimaryLight,
    marginTop: spacing.sm,
  },
  userEmail: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
    marginTop: spacing.xs,
  },
  loginButton: {
    marginTop: spacing.md,
    width: 140,
  },
  menuSection: {
    marginTop: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  languageInline: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  version: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
});
