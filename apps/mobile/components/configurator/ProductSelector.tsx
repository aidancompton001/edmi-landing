import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import type { ConfigurableProduct } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface ProductSelectorProps {
  products: ConfigurableProduct[];
  selectedId: number;
  onSelect: (productId: number) => void;
}

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ products, selectedId, onSelect }) => {
  const { t } = useTranslation('configurator');

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>{t('configurator.selectModel')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {products.map((product) => {
          const isSelected = product.productId === selectedId;
          return (
            <Pressable
              key={product.productId}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onSelect(product.productId)}
            >
              <Image
                source={{ uri: product.images[0]?.src }}
                style={styles.thumbnail}
                contentFit="contain"
                transition={200}
              />
              <Text style={styles.brand} numberOfLines={1}>{product.brand}</Text>
              <Text style={[styles.name, isSelected && styles.nameSelected]} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.price}>
                {t('configurator.basePrice')}: {formatPrice(product.basePrice)} €
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.textPrimaryLight,
  },
  container: {
    gap: spacing.sm,
  },
  card: {
    width: 140,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.borderLight,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(184, 48, 158, 0.04)',
  },
  thumbnail: {
    width: '100%',
    height: 80,
    borderRadius: radius.sm,
    backgroundColor: colors.bgLightAlt,
  },
  brand: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
  name: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
  },
  nameSelected: {
    color: colors.primary,
  },
  price: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
});
