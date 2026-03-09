// WooCommerce product (raw API response)
export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  type: 'simple' | 'variable';
  status: 'publish' | 'draft' | 'pending' | 'private';
  description: string;
  short_description: string;
  sku: string;
  price: string; // WC returns price as STRING (e.g., "15000.00")
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  categories: WCCategory[];
  images: WCImage[];
  attributes: WCAttribute[];
  meta_data: WCMetaData[];
  date_created: string;
  date_modified: string;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WCImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WCAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface WCMetaData {
  id: number;
  key: string;
  value: unknown;
}

// Our mapped product type (used in the app)
export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  description: string;
  shortDescription: string;
  sku: string;
  price: number; // Mapped from string to number
  regularPrice: number;
  salePrice: number | null;
  onSale: boolean;
  currency: 'UAH' | 'EUR';
  stockQuantity: number;
  stockStatus: ProductStockStatus;
  condition: ProductCondition;
  categories: Category[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  createdAt: string;
  updatedAt: string;
}

export type ProductStockStatus = 'in_stock' | 'out_of_stock' | 'on_backorder';
export type ProductCondition = 'new' | 'used';

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  count: number;
  image: string | null;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface ProductFilters {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
  sort?: ProductSort;
  stockStatus?: ProductStockStatus;
  condition?: ProductCondition;
}

export type ProductSort =
  | 'date_desc'
  | 'date_asc'
  | 'price_asc'
  | 'price_desc'
  | 'title_asc'
  | 'title_desc'
  | 'popularity';
