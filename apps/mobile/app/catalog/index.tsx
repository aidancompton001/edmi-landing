import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Category } from '@edmi/shared';
import { ScreenWrapper } from '@/components/ui';
import { Header, EmptyState } from '@/components/common';
import { useCategories } from '@/hooks/useProducts';
import { colors, fonts, fontSizes, spacing, radius } from '@/constants/theme';

function CategoryCard({ category, onPress }: { category: Category; onPress: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardImageWrap}>
        {category.image ? (
          <Image
            source={{ uri: category.image }}
            style={styles.cardImage}
            contentFit="cover"
          />
        ) : (
          <Ionicons name="grid-outline" size={32} color={colors.textSecondaryLight} />
        )}
      </View>
      <Text style={styles.cardName} numberOfLines={2}>{category.name}</Text>
      <Text style={styles.cardCount}>{category.count} товарів</Text>
    </Pressable>
  );
}

export default function CatalogCategoriesScreen() {
  const { t } = useTranslation(['common', 'products']);
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <ScreenWrapper>
      <Header
        title={t('products:catalog.title')}
        showBack
        onBack={() => router.back()}
      />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : isError || !categories || categories.length === 0 ? (
        <EmptyState
          icon="grid-outline"
          title={t('products:catalog.noResults')}
        />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => router.push(`/catalog/${item.id}` as any)}
            />
          )}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImageWrap: {
    width: '100%',
    height: 80,
    borderRadius: radius.sm,
    backgroundColor: colors.bgLightAlt,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardName: {
    fontFamily: fonts.headingSemiBold,
    fontSize: fontSizes.bodySmall,
    color: colors.textPrimaryLight,
    marginBottom: spacing.xs,
  },
  cardCount: {
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    color: colors.textSecondaryLight,
  },
});
