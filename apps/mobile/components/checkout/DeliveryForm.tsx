import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import type { ShippingMethod, NovaPoshtaCity, NovaPoshtaWarehouse } from '@edmi/shared';
import { Input } from '@/components/ui/Input';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface DeliveryData {
  method: ShippingMethod;
  city: string;
  cityRef: string;
  warehouse: string;
  warehouseRef: string;
}

interface DeliveryFormProps {
  delivery: DeliveryData;
  onUpdate: (delivery: DeliveryData) => void;
  errors?: Partial<Record<string, string>>;
}

const MOCK_CITIES: NovaPoshtaCity[] = [
  { ref: 'db5c88e0-391c-11dd-90d9-001a92567626', name: 'Київ', area: 'Київська' },
  { ref: '8d5a980d-391c-11dd-90d9-001a92567626', name: 'Львів', area: 'Львівська' },
  { ref: 'db5c890d-391c-11dd-90d9-001a92567626', name: 'Одеса', area: 'Одеська' },
  { ref: 'db5c88c6-391c-11dd-90d9-001a92567626', name: 'Харків', area: 'Харківська' },
  { ref: 'db5c88de-391c-11dd-90d9-001a92567626', name: 'Дніпро', area: 'Дніпропетровська' },
];

const MOCK_WAREHOUSES: NovaPoshtaWarehouse[] = [
  { ref: '1ec09d88-e1c2-11e3-8c4a-0050568002cf', number: '25', name: 'Відділення №25', address: 'вул. Хрещатик, 22', cityRef: 'db5c88e0-391c-11dd-90d9-001a92567626' },
  { ref: '2ac09d88-e1c2-11e3-8c4a-0050568002cf', number: '1', name: 'Відділення №1', address: 'вул. Велика Васильківська, 100', cityRef: 'db5c88e0-391c-11dd-90d9-001a92567626' },
  { ref: '3a3ccb56-e1c2-11e3-8c4a-0050568002cf', number: '12', name: 'Відділення №12', address: 'вул. Городоцька, 45', cityRef: '8d5a980d-391c-11dd-90d9-001a92567626' },
  { ref: '3b3ccb56-e1c2-11e3-8c4a-0050568002cf', number: '5', name: 'Відділення №5', address: 'вул. Шевченка, 10', cityRef: '8d5a980d-391c-11dd-90d9-001a92567626' },
  { ref: '5a5ddcf6-e1c2-11e3-8c4a-0050568002cf', number: '8', name: 'Відділення №8', address: 'вул. Дерибасівська, 10', cityRef: 'db5c890d-391c-11dd-90d9-001a92567626' },
  { ref: '5b5ddcf6-e1c2-11e3-8c4a-0050568002cf', number: '3', name: 'Відділення №3', address: 'вул. Канатна, 33', cityRef: 'db5c890d-391c-11dd-90d9-001a92567626' },
  { ref: '7b7eef18-e1c2-11e3-8c4a-0050568002cf', number: '3', name: 'Відділення №3', address: 'вул. Сумська, 78', cityRef: 'db5c88c6-391c-11dd-90d9-001a92567626' },
  { ref: '7c7eef18-e1c2-11e3-8c4a-0050568002cf', number: '10', name: 'Відділення №10', address: 'пр. Науки, 14', cityRef: 'db5c88c6-391c-11dd-90d9-001a92567626' },
  { ref: '9a9fff28-e1c2-11e3-8c4a-0050568002cf', number: '7', name: 'Відділення №7', address: 'пр. Д. Яворницького, 50', cityRef: 'db5c88de-391c-11dd-90d9-001a92567626' },
  { ref: '9b9fff28-e1c2-11e3-8c4a-0050568002cf', number: '15', name: 'Відділення №15', address: 'вул. Набережна Перемоги, 12', cityRef: 'db5c88de-391c-11dd-90d9-001a92567626' },
];

export const DeliveryForm: React.FC<DeliveryFormProps> = ({
  delivery,
  onUpdate,
  errors,
}) => {
  const { t } = useTranslation('checkout');
  const [citySearch, setCitySearch] = useState(delivery.city);
  const [showCities, setShowCities] = useState(false);
  const [showWarehouses, setShowWarehouses] = useState(false);

  const filteredCities = useMemo(() => {
    if (!citySearch) return MOCK_CITIES;
    return MOCK_CITIES.filter((c) =>
      c.name.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [citySearch]);

  const filteredWarehouses = useMemo(() => {
    if (!delivery.cityRef) return [];
    return MOCK_WAREHOUSES.filter((w) => w.cityRef === delivery.cityRef);
  }, [delivery.cityRef]);

  const selectCity = (city: NovaPoshtaCity) => {
    setCitySearch(city.name);
    onUpdate({
      ...delivery,
      city: city.name,
      cityRef: city.ref,
      warehouse: '',
      warehouseRef: '',
    });
    setShowCities(false);
  };

  const selectWarehouse = (wh: NovaPoshtaWarehouse) => {
    onUpdate({
      ...delivery,
      warehouse: `${wh.name}: ${wh.address}`,
      warehouseRef: wh.ref,
    });
    setShowWarehouses(false);
  };

  return (
    <View style={styles.container}>
      {/* Method Toggle */}
      <Text style={styles.sectionTitle}>{t('delivery.title')}</Text>
      <View style={styles.methodRow}>
        <Pressable
          style={[styles.methodCard, delivery.method === 'nova_poshta' && styles.methodCardActive]}
          onPress={() => onUpdate({ ...delivery, method: 'nova_poshta' })}
        >
          <Ionicons name="cube-outline" size={24} color={delivery.method === 'nova_poshta' ? colors.primary : colors.textSecondaryLight} />
          <Text style={[styles.methodText, delivery.method === 'nova_poshta' && styles.methodTextActive]}>
            {t('delivery.novaPoshta')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.methodCard, delivery.method === 'pickup' && styles.methodCardActive]}
          onPress={() => onUpdate({ ...delivery, method: 'pickup' })}
        >
          <Ionicons name="storefront-outline" size={24} color={delivery.method === 'pickup' ? colors.primary : colors.textSecondaryLight} />
          <Text style={[styles.methodText, delivery.method === 'pickup' && styles.methodTextActive]}>
            {t('delivery.pickup')}
          </Text>
        </Pressable>
      </View>

      {delivery.method === 'nova_poshta' ? (
        <>
          {/* City */}
          <View>
            <Input
              label={t('delivery.city')}
              placeholder={t('delivery.searchCity')}
              value={citySearch}
              onChangeText={(v) => {
                setCitySearch(v);
                setShowCities(true);
                if (!v) onUpdate({ ...delivery, city: '', cityRef: '', warehouse: '', warehouseRef: '' });
              }}
              error={errors?.['city']}
            />
            {showCities && filteredCities.length > 0 && (
              <View style={styles.dropdown}>
                {filteredCities.map((city) => (
                  <Pressable key={city.ref} style={styles.dropdownItem} onPress={() => selectCity(city)}>
                    <Text style={styles.dropdownText}>{city.name}</Text>
                    <Text style={styles.dropdownSubtext}>{city.area}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Warehouse */}
          {delivery.cityRef ? (
            <View>
              <Pressable onPress={() => setShowWarehouses(!showWarehouses)}>
                <Input
                  label={t('delivery.warehouse')}
                  placeholder={t('delivery.searchWarehouse')}
                  value={delivery.warehouse}
                  onChangeText={() => {}}
                  error={errors?.['warehouse']}
                />
              </Pressable>
              {showWarehouses && (
                <View style={styles.dropdown}>
                  {filteredWarehouses.map((wh) => (
                    <Pressable key={wh.ref} style={styles.dropdownItem} onPress={() => selectWarehouse(wh)}>
                      <Text style={styles.dropdownText}>{wh.name}</Text>
                      <Text style={styles.dropdownSubtext}>{wh.address}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : null}
        </>
      ) : (
        <View style={styles.pickupInfo}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.pickupText}>{t('delivery.pickupAddress')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  methodRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  methodCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    gap: spacing.sm,
  },
  methodCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '0D',
  },
  methodText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.textSecondaryLight,
  },
  methodTextActive: {
    color: colors.primary,
    fontFamily: fonts.bodySemiBold,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginTop: -spacing.sm,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  dropdownText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  dropdownSubtext: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
    marginTop: 2,
  },
  pickupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.bgLightAlt,
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  pickupText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
    flex: 1,
  },
});
