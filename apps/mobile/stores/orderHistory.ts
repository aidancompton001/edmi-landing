import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Order } from '@edmi/shared';

interface OrderHistoryStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: number) => Order | undefined;
  clearHistory: () => void;
  nextOrderId: () => number;
}

export const useOrderHistoryStore = create<OrderHistoryStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      getOrder: (id) => get().orders.find((o) => o.id === id),

      clearHistory: () => set({ orders: [] }),

      nextOrderId: () => 6001 + get().orders.length,
    }),
    {
      name: 'edmi-order-history',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
