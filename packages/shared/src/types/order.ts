export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed';

export interface Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  currency: 'EUR';
  shipping: ShippingInfo;
  payment: PaymentInfo;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ShippingInfo {
  method: ShippingMethod;
  firstName: string;
  lastName: string;
  phone: string;
  city?: string;
  cityRef?: string;
  warehouse?: string;
  warehouseRef?: string;
}

export type ShippingMethod = 'nova_poshta' | 'pickup';

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
}

export type PaymentMethod = 'liqpay' | 'wayforpay';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface CreateOrderRequest {
  items: CreateOrderItem[];
  shipping: ShippingInfo;
  payment: {
    method: PaymentMethod;
  };
  comment?: string;
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrderResponse {
  orderId: number;
  status: OrderStatus;
  total: number;
}
