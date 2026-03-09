import { create } from 'zustand';

interface EdmikStore {
  isVisible: boolean;
  open: () => void;
  close: () => void;
}

export const useEdmikStore = create<EdmikStore>()((set) => ({
  isVisible: false,
  open: () => set({ isVisible: true }),
  close: () => set({ isVisible: false }),
}));
