/**
 * Direct WooCommerce Store API client for the mobile app.
 *
 * Calls the PUBLIC Store API (no auth required):
 *   https://edmi.com.ua/wp-json/wc/store/v1/
 *
 * Used when the middleware server is unavailable (e.g. tunnel mode).
 */

import type {
  Product,
  Category,
  ProductImage,
  ProductAttribute,
  ProductStockStatus,
} from '@edmi/shared';

const WC_STORE_BASE = 'https://edmi.com.ua/wp-json/wc/store/v1';

// ─── WC Store API response types ──────────────────────────────────────────────

interface WCStorePrices {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_minor_unit: number;
}

interface WCStoreImage {
  id: number;
  src: string;
  thumbnail: string;
  name: string;
  alt: string;
}

interface WCStoreCategory {
  id: number;
  name: string;
  slug: string;
}

interface WCStoreAttributeTerm {
  id: number;
  name: string;
  slug: string;
}

interface WCStoreAttribute {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: WCStoreAttributeTerm[];
}

interface WCStoreProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku: string;
  description: string;
  short_description: string;
  prices: WCStorePrices;
  images: WCStoreImage[];
  categories: WCStoreCategory[];
  attributes: WCStoreAttribute[];
  is_in_stock: boolean;
  is_on_backorder: boolean;
  average_rating: string;
  review_count: number;
  type: string;
}

interface WCStoreCategoryFull {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  image: { id: number; src: string; thumbnail: string; name: string; alt: string } | null;
}

// ─── Price helpers ────────────────────────────────────────────────────────────

function parsePrice(raw: string, minorUnit: number): number {
  const cents = parseInt(raw, 10);
  if (isNaN(cents)) return 0;
  return cents / Math.pow(10, minorUnit);
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapStockStatus(inStock: boolean, onBackorder: boolean): ProductStockStatus {
  if (inStock) return 'in_stock';
  if (onBackorder) return 'on_backorder';
  return 'out_of_stock';
}

function extractBrand(attrs: WCStoreAttribute[]): string {
  const brandAttr = attrs.find(
    (a) =>
      a.name.toLowerCase() === 'brand' ||
      a.name.toLowerCase() === 'бренд' ||
      a.name.toLowerCase() === 'виробник',
  );
  return brandAttr?.terms[0]?.name ?? '';
}

function mapProduct(wc: WCStoreProduct): Product {
  const minor = wc.prices.currency_minor_unit;
  const price = parsePrice(wc.prices.price, minor);
  const regularPrice = parsePrice(wc.prices.regular_price, minor);
  const saleRaw = parsePrice(wc.prices.sale_price, minor);
  const onSale = saleRaw > 0 && saleRaw < regularPrice;

  return {
    id: wc.id,
    name: wc.name,
    slug: wc.slug,
    brand: extractBrand(wc.attributes),
    description: wc.description,
    shortDescription: wc.short_description,
    sku: wc.sku,
    price,
    regularPrice,
    salePrice: onSale ? saleRaw : null,
    onSale,
    currency: 'UAH',
    stockQuantity: wc.is_in_stock ? 1 : 0,
    stockStatus: mapStockStatus(wc.is_in_stock, wc.is_on_backorder),
    condition: 'new',
    categories: wc.categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      parentId: null,
      count: 0,
      image: null,
    })),
    images: wc.images.map(
      (img): ProductImage => ({
        id: img.id,
        src: img.src,
        alt: img.alt || wc.name,
      }),
    ),
    attributes: wc.attributes.map(
      (a): ProductAttribute => ({
        id: a.id,
        name: a.name,
        options: a.terms.map((t) => t.name),
      }),
    ),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function mapCategory(wc: WCStoreCategoryFull): Category {
  return {
    id: wc.id,
    name: wc.name,
    slug: wc.slug,
    parentId: wc.parent || null,
    count: wc.count,
    image: wc.image?.src ?? null,
  };
}

// ─── Sort mapping ─────────────────────────────────────────────────────────────

const SORT_MAP: Record<string, { orderby: string; order: 'asc' | 'desc' }> = {
  price_asc: { orderby: 'price', order: 'asc' },
  price_desc: { orderby: 'price', order: 'desc' },
  title_asc: { orderby: 'title', order: 'asc' },
  title_desc: { orderby: 'title', order: 'desc' },
  date_desc: { orderby: 'date', order: 'desc' },
  date_asc: { orderby: 'date', order: 'asc' },
  popularity: { orderby: 'popularity', order: 'desc' },
};

// ─── Public API ───────────────────────────────────────────────────────────────

export interface ProductsResult {
  data: Product[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export async function fetchProductsDirect(params?: {
  page?: number;
  perPage?: number;
  category?: number;
  search?: string;
  sort?: string;
}): Promise<ProductsResult> {
  const url = new URL(`${WC_STORE_BASE}/products`);
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 20;

  url.searchParams.set('page', String(page));
  url.searchParams.set('per_page', String(perPage));
  if (params?.search) url.searchParams.set('search', params.search);
  if (params?.category) url.searchParams.set('category', String(params.category));

  if (params?.sort) {
    const s = SORT_MAP[params.sort];
    if (s) {
      url.searchParams.set('orderby', s.orderby);
      url.searchParams.set('order', s.order);
    }
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`WC Store API: ${res.status}`);

  const raw = (await res.json()) as WCStoreProduct[];
  const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10);
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);

  return {
    data: raw.map(mapProduct),
    pagination: { page, perPage, total, totalPages },
  };
}

export async function fetchProductByIdDirect(id: number): Promise<Product | null> {
  const res = await fetch(`${WC_STORE_BASE}/products/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`WC Store API: ${res.status}`);

  const raw = (await res.json()) as WCStoreProduct;
  return mapProduct(raw);
}

export async function fetchCategoriesDirect(): Promise<Category[]> {
  const res = await fetch(`${WC_STORE_BASE}/products/categories?per_page=100`);
  if (!res.ok) throw new Error(`WC Store API: ${res.status}`);

  const raw = (await res.json()) as WCStoreCategoryFull[];
  return raw.map(mapCategory);
}
