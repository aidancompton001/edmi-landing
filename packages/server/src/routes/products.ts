import { Router } from 'express';
import { CACHE_TTL } from '@edmi/shared';
import { cache } from '../lib/cache';
import { fetchProducts, fetchProductById, fetchCategories } from '../services/wc-store-api';

const router = Router();

// GET /api/products?page=1&per_page=20&search=&category=&sort=price_asc
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const perPage = Math.min(parseInt(req.query['per_page'] as string) || 20, 100);
    const search = (req.query['search'] as string) || undefined;
    const category = req.query['category'] ? parseInt(req.query['category'] as string) : undefined;
    const sort = (req.query['sort'] as string) || undefined;

    // Build sort params
    let orderby: string | undefined;
    let order: 'asc' | 'desc' | undefined;

    if (sort) {
      const sortMap: Record<string, { orderby: string; order: 'asc' | 'desc' }> = {
        price_asc: { orderby: 'price', order: 'asc' },
        price_desc: { orderby: 'price', order: 'desc' },
        title_asc: { orderby: 'title', order: 'asc' },
        title_desc: { orderby: 'title', order: 'desc' },
        date_desc: { orderby: 'date', order: 'desc' },
        date_asc: { orderby: 'date', order: 'asc' },
        popularity: { orderby: 'popularity', order: 'desc' },
      };
      const s = sortMap[sort];
      if (s) {
        orderby = s.orderby;
        order = s.order;
      }
    }

    // Cache key
    const cacheKey = `products:${page}:${perPage}:${search ?? ''}:${category ?? ''}:${sort ?? ''}`;
    const cached = await cache.get<Awaited<ReturnType<typeof fetchProducts>>>(cacheKey);

    if (cached) {
      res.json(cached);
      return;
    }

    const result = await fetchProducts({ page, perPage, search, category, orderby, order });
    await cache.set(cacheKey, result, CACHE_TTL.products);

    res.json(result);
  } catch (err) {
    console.error('[products] GET / error:', err);
    res.status(502).json({ error: 'Failed to fetch products from upstream' });
  }
});

// GET /api/products/categories
router.get('/categories', async (_req, res) => {
  try {
    const cacheKey = 'categories:all';
    const cached = await cache.get<Awaited<ReturnType<typeof fetchCategories>>>(cacheKey);

    if (cached) {
      res.json({ data: cached });
      return;
    }

    const categories = await fetchCategories();
    await cache.set(cacheKey, categories, CACHE_TTL.categories);

    res.json({ data: categories });
  } catch (err) {
    console.error('[products] GET /categories error:', err);
    res.status(502).json({ error: 'Failed to fetch categories from upstream' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params['id'] as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid product ID' });
      return;
    }

    const cacheKey = `product:${id}`;
    const cached = await cache.get<Awaited<ReturnType<typeof fetchProductById>>>(cacheKey);

    if (cached) {
      res.json({ data: cached });
      return;
    }

    const product = await fetchProductById(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    await cache.set(cacheKey, product, CACHE_TTL.products);
    res.json({ data: product });
  } catch (err) {
    console.error(`[products] GET /${req.params['id']} error:`, err);
    res.status(502).json({ error: 'Failed to fetch product from upstream' });
  }
});

export default router;
