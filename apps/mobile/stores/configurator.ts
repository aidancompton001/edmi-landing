import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ConfiguratorGroupId, ConfigurableProduct } from '@edmi/shared';
import { configurableProducts } from '@edmi/shared';

interface ConfiguratorStore {
  selectedProductId: number;
  selections: Record<ConfiguratorGroupId, string | null>;

  selectProduct: (productId: number) => void;
  selectOption: (groupId: ConfiguratorGroupId, optionId: string | null) => void;
  resetSelections: () => void;

  getSelectedProduct: () => ConfigurableProduct | undefined;
  getTotalPrice: () => number;
  getSelectionComplete: () => boolean;
}

const DEFAULT_SELECTIONS: Record<ConfiguratorGroupId, string | null> = {
  color: null,
  mount: null,
  illumination: null,
  objective: null,
  camera: null,
};

function getDefaultSelectionsForProduct(
  product: ConfigurableProduct,
): Record<ConfiguratorGroupId, string | null> {
  const selections = { ...DEFAULT_SELECTIONS };
  for (const group of product.optionGroups) {
    const firstAvailable = group.options.find((o) => o.available);
    if (firstAvailable) {
      selections[group.id] = firstAvailable.id;
    }
  }
  return selections;
}

export const useConfiguratorStore = create<ConfiguratorStore>()(
  persist(
    (set, get) => ({
      selectedProductId: configurableProducts[0]?.productId ?? 0,
      selections: configurableProducts[0]
        ? getDefaultSelectionsForProduct(configurableProducts[0])
        : { ...DEFAULT_SELECTIONS },

      selectProduct: (productId) => {
        const product = configurableProducts.find((p) => p.productId === productId);
        if (product) {
          set({
            selectedProductId: productId,
            selections: getDefaultSelectionsForProduct(product),
          });
        }
      },

      selectOption: (groupId, optionId) =>
        set((state) => ({
          selections: { ...state.selections, [groupId]: optionId },
        })),

      resetSelections: () => {
        const product = get().getSelectedProduct();
        if (product) {
          set({ selections: getDefaultSelectionsForProduct(product) });
        } else {
          set({ selections: { ...DEFAULT_SELECTIONS } });
        }
      },

      getSelectedProduct: () =>
        configurableProducts.find((p) => p.productId === get().selectedProductId),

      getTotalPrice: () => {
        const product = get().getSelectedProduct();
        if (!product) return 0;
        let total = product.basePrice;
        const { selections } = get();
        for (const group of product.optionGroups) {
          const selectedOptionId = selections[group.id];
          if (selectedOptionId) {
            const option = group.options.find((o) => o.id === selectedOptionId);
            if (option) total += option.priceDelta;
          }
        }
        return total;
      },

      getSelectionComplete: () => {
        const product = get().getSelectedProduct();
        if (!product) return false;
        const { selections } = get();
        return product.optionGroups
          .filter((g) => g.required)
          .every((g) => selections[g.id] !== null);
      },
    }),
    {
      name: 'edmi-configurator',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
