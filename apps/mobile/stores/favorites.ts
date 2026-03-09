import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesStore {
  ids: number[];
  toggle: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((fid) => fid !== id)
            : [...state.ids, id],
        })),

      isFavorite: (id) => get().ids.includes(id),
    }),
    {
      name: 'edmi-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
