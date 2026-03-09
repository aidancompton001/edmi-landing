import { FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui';
import { Header, EmptyState } from '@/components/common';
import { OrderCard } from '@/components/checkout';
import { useOrderHistoryStore } from '@/stores/orderHistory';
import { spacing } from '@/constants/theme';

export default function OrdersScreen() {
  const { t } = useTranslation(['checkout', 'common']);
  const orders = useOrderHistoryStore((s) => s.orders);

  return (
    <ScreenWrapper>
      <Header
        title={t('checkout:order.history')}
        showBack
        onBack={() => router.back()}
      />

      {orders.length === 0 ? (
        <EmptyState
          icon="bag-outline"
          title={t('checkout:order.noOrders')}
          actionLabel={t('checkout:cart.continueShopping')}
          onAction={() => router.push('/(tabs)' as any)}
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() => router.push(`/order/${item.id}` as any)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.lg,
  },
});
