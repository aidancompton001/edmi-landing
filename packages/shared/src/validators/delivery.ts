import { z } from 'zod';

export const citySearchSchema = z.object({
  q: z.string().min(1).max(200),
});

export const warehouseSearchSchema = z.object({
  cityRef: z.string().min(1).max(100),
});

export const deliveryCalculateSchema = z.object({
  citySender: z.string().min(1),
  cityRecipient: z.string().min(1),
  weight: z.number().positive().max(1000),
  cost: z.number().positive(),
});

export type CitySearchInput = z.infer<typeof citySearchSchema>;
export type WarehouseSearchInput = z.infer<typeof warehouseSearchSchema>;
export type DeliveryCalculateInput = z.infer<typeof deliveryCalculateSchema>;
