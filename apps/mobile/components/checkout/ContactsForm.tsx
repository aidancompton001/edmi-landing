import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/Input';
import { spacing } from '@/constants/theme';

interface ContactsData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface ContactsFormProps {
  contacts: ContactsData;
  onUpdate: (contacts: ContactsData) => void;
  errors?: Partial<Record<keyof ContactsData, string>>;
}

export const ContactsForm: React.FC<ContactsFormProps> = ({
  contacts,
  onUpdate,
  errors,
}) => {
  const { t } = useTranslation('checkout');

  const update = (field: keyof ContactsData, value: string) => {
    onUpdate({ ...contacts, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Input
        label={t('contacts.firstName')}
        placeholder={t('contacts.firstName')}
        value={contacts.firstName}
        onChangeText={(v) => update('firstName', v)}
        error={errors?.firstName}
        autoCapitalize="words"
      />
      <Input
        label={t('contacts.lastName')}
        placeholder={t('contacts.lastName')}
        value={contacts.lastName}
        onChangeText={(v) => update('lastName', v)}
        error={errors?.lastName}
        autoCapitalize="words"
      />
      <Input
        label={t('contacts.phone')}
        placeholder={t('contacts.phonePlaceholder')}
        value={contacts.phone}
        onChangeText={(v) => update('phone', v)}
        error={errors?.phone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <Input
        label={t('contacts.email')}
        placeholder={t('contacts.emailPlaceholder')}
        value={contacts.email}
        onChangeText={(v) => update('email', v)}
        error={errors?.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
});
