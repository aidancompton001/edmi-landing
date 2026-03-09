import type { Category } from '../types';

/**
 * Mock product categories for the EDMI dental microscope store.
 * Names in Ukrainian, slugs in English.
 */
export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Мікроскопи',
    slug: 'microscopes',
    parentId: null,
    count: 10,
    image: 'https://placehold.co/400x300?text=Microscopes',
  },
  {
    id: 2,
    name: 'Освітлення',
    slug: 'illumination',
    parentId: null,
    count: 1,
    image: 'https://placehold.co/400x300?text=Illumination',
  },
  {
    id: 3,
    name: "Об'єктиви",
    slug: 'objectives',
    parentId: null,
    count: 1,
    image: 'https://placehold.co/400x300?text=Objectives',
  },
  {
    id: 4,
    name: 'Камери та адаптери',
    slug: 'cameras-adapters',
    parentId: null,
    count: 1,
    image: 'https://placehold.co/400x300?text=Cameras+Adapters',
  },
  {
    id: 5,
    name: 'Кріплення',
    slug: 'mounts',
    parentId: null,
    count: 0,
    image: 'https://placehold.co/400x300?text=Mounts',
  },
  {
    id: 6,
    name: 'Аксесуари',
    slug: 'accessories',
    parentId: null,
    count: 1,
    image: 'https://placehold.co/400x300?text=Accessories',
  },
];

/** Helper: get a category by ID */
export const getCategoryById = (id: number): Category | undefined =>
  mockCategories.find((c) => c.id === id);

/** Helper: get a category by slug */
export const getCategoryBySlug = (slug: string): Category | undefined =>
  mockCategories.find((c) => c.slug === slug);
