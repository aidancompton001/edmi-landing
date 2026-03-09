/** Configurator option categories */
export type ConfiguratorGroupId = 'color' | 'mount' | 'illumination' | 'objective' | 'camera';

/** A single selectable option within a configurator category */
export interface ConfiguratorOption {
  id: string;
  labelKey: string;
  priceDelta: number;
  available: boolean;
  icon?: string;
  colorHex?: string;
}

/** A group of options (e.g., "Mount Type") */
export interface ConfiguratorOptionGroup {
  id: ConfiguratorGroupId;
  labelKey: string;
  type: 'radio' | 'toggle';
  options: ConfiguratorOption[];
  required: boolean;
}

/** A microscope base model that can be configured */
export interface ConfigurableProduct {
  productId: number;
  name: string;
  brand: string;
  basePrice: number;
  currency: 'EUR';
  images: { src: string; alt: string }[];
  optionGroups: ConfiguratorOptionGroup[];
}
