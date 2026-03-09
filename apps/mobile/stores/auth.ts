import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MockUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface AuthStore {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: (user: MockUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'edmi-auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
