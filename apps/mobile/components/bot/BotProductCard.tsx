import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import type { BotProductCard as BotProductCardData } from '@edmi/shared';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

interface BotProductCardProps {
  product: BotProductCardData;
  onPress: (productId: number) => void;
}

function formatPrice(price: number): string {
  return price.toLocaleString('uk-UA', { maximumFractionDigits: 0 });
}

export const BotProductCard: React.FC<BotProductCardProps> = ({ product, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={() => onPress(product.id)}>
      <View style={styles.imageWrapper}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
        ) : (
          <Ionicons name="image-outline" size={20} color={colors.textSecondaryLight} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)} EUR</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textSecondaryLight} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: radius.sm,
    backgroundColor: colors.bgLightAlt,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  name: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
  },
  price: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.body,
    color: colors.primary,
    marginTop: 2,
  },
});
