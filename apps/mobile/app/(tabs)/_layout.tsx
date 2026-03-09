import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useCartStore } from '@/stores/cart';
import { useEdmikStore } from '@/stores/edmik';
import { EDMikChat } from '@/components/bot';
import { colors, fonts } from '@/constants/theme';

export default function TabLayout() {
  const { t } = useTranslation('common');
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const chatVisible = useEdmikStore((s) => s.isVisible);
  const openChat = useEdmikStore((s) => s.open);
  const closeChat = useEdmikStore((s) => s.close);

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondaryLight,
          tabBarLabelStyle: {
            fontFamily: fonts.bodySemiBold,
            fontSize: 11,
          },
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.borderLight,
            borderTopWidth: 1,
            height: 85,
            paddingBottom: 28,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('navigation.home'),
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="configurator"
          options={{
            title: t('navigation.configurator'),
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="build-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stock"
          options={{
            title: t('navigation.stock'),
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="cube-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: t('navigation.cart'),
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <View>
                <Ionicons name="cart-outline" size={size} color={color} />
                {cartItemCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('navigation.profile'),
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* EDMik FAB */}
      <Pressable
        style={styles.fab}
        onPress={openChat}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color={colors.white} />
      </Pressable>

      {/* EDMik Chat */}
      <EDMikChat visible={chatVisible} onClose={closeChat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 10,
    color: colors.white,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
