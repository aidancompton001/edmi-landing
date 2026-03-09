import { create } from 'zustand';
import type { ShippingMethod, PaymentMethod } from '@edmi/shared';

interface ContactsData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface DeliveryData {
  method: ShippingMethod;
  city: string;
  cityRef: string;
  warehouse: string;
  warehouseRef: string;
}

interface PaymentData {
  method: PaymentMethod;
}

interface CheckoutStore {
  currentStep: number;
  contacts: ContactsData;
  delivery: DeliveryData;
  payment: PaymentData;
  comment: string;

  setContacts: (contacts: ContactsData) => void;
  setDelivery: (delivery: DeliveryData) => void;
  setPayment: (payment: PaymentData) => void;
  setComment: (comment: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  contacts: { firstName: '', lastName: '', phone: '', email: '' },
  delivery: { method: 'nova_poshta' as ShippingMethod, city: '', cityRef: '', warehouse: '', warehouseRef: '' },
  payment: { method: 'liqpay' as PaymentMethod },
  comment: '',
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  ...initialState,

  setContacts: (contacts) => set({ contacts }),
  setDelivery: (delivery) => set({ delivery }),
  setPayment: (payment) => set({ payment }),
  setComment: (comment) => set({ comment }),
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 3) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),
  reset: () => set(initialState),
}));
