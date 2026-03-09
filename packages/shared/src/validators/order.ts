import { z } from 'zod';

const phoneRegex = /^\+380\d{9}$/;

const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

const shippingSchema = z.object({
  method: z.enum(['nova_poshta', 'pickup']),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().regex(phoneRegex, 'Phone must be in format +380XXXXXXXXX'),
  city: z.string().max(200).optional(),
  cityRef: z.string().max(100).optional(),
  warehouse: z.string().max(300).optional(),
  warehouseRef: z.string().max(100).optional(),
}).refine(
  (data) => {
    if (data.method === 'nova_poshta') {
      return !!data.cityRef && !!data.warehouseRef;
    }
    return true;
  },
  { message: 'Nova Poshta delivery requires city and warehouse' }
);

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1).max(50),
  shipping: shippingSchema,
  payment: z.object({
    method: z.enum(['liqpay', 'wayforpay']),
  }),
  comment: z.string().max(1000).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
