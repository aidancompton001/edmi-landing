import { z } from 'zod';

export const productFilterSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  perPage: z.coerce.number().int().min(1).max(100).optional().default(20),
  category: z.coerce.number().int().positive().optional(),
  search: z.string().max(200).optional(),
  sort: z.enum(['date_desc', 'date_asc', 'price_asc', 'price_desc', 'title_asc', 'title_desc', 'popularity']).optional().default('date_desc'),
  stockStatus: z.enum(['in_stock', 'out_of_stock', 'on_backorder']).optional(),
  condition: z.enum(['new', 'used']).optional(),
});

export type ProductFilterInput = z.infer<typeof productFilterSchema>;
