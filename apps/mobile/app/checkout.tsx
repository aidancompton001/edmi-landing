import { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common';
import {
  CheckoutStepIndicator,
  ContactsForm,
  DeliveryForm,
  PaymentMethodSelector,
  OrderSummary,
  CheckoutBottomBar,
} from '@/components/checkout';
import { useCheckoutStore } from '@/stores/checkout';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import { useOrderHistoryStore } from '@/stores/orderHistory';
import type { PaymentMethod } from '@edmi/shared';
import { colors } from '@/constants/theme';

export default function CheckoutScreen() {
  const { t } = useTranslation(['checkout', 'common']);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const checkout = useCheckoutStore();
  const cartItems = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const authUser = useAuthStore((s) => s.user);
  const addOrder = useOrderHistoryStore((s) => s.addOrder);
  const nextOrderId = useOrderHistoryStore((s) => s.nextOrderId);

  // Auto-fill from auth on mount
  if (checkout.currentStep === 0 && authUser && !checkout.contacts.firstName) {
    checkout.setContacts({
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      phone: authUser.phone,
      email: authUser.email,
    });
  }

  const STEP_LABELS = [
    t('checkout:checkout.contacts'),
    t('checkout:checkout.delivery'),
    t('checkout:checkout.payment'),
    t('checkout:checkout.confirmation'),
  ];

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (checkout.currentStep === 0) {
      if (!checkout.contacts.firstName.trim()) newErrors['firstName'] = t('common:status.error');
      if (!checkout.contacts.lastName.trim()) newErrors['lastName'] = t('common:status.error');
      if (!checkout.contacts.phone.trim() || !/^\+?380\d{9}$/.test(checkout.contacts.phone.replace(/\s/g, ''))) {
        newErrors['phone'] = '+380XXXXXXXXX';
      }
    }

    if (checkout.currentStep === 1 && checkout.delivery.method === 'nova_poshta') {
      if (!checkout.delivery.cityRef) newErrors['city'] = t('common:status.error');
      if (!checkout.delivery.warehouseRef) newErrors['warehouse'] = t('common:status.error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (checkout.currentStep < 3) {
      checkout.nextStep();
      setErrors({});
    } else {
      handlePlaceOrder();
    }
  };

  const handleBack = () => {
    if (checkout.currentStep > 0) {
      checkout.prevStep();
      setErrors({});
    } else {
      router.back();
    }
  };

  const handlePlaceOrder = () => {
    setLoading(true);

    // Simulate order creation
    setTimeout(() => {
      const orderId = nextOrderId();

      addOrder({
        id: orderId,
        status: 'pending',
        items: cartItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          image: item.product.images[0]?.src ?? '',
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity,
        })),
        total: cartTotal,
        currency: 'EUR',
        shipping: {
          method: checkout.delivery.method,
          firstName: checkout.contacts.firstName,
          lastName: checkout.contacts.lastName,
          phone: checkout.contacts.phone,
          city: checkout.delivery.city || undefined,
          cityRef: checkout.delivery.cityRef || undefined,
          warehouse: checkout.delivery.warehouse || undefined,
          warehouseRef: checkout.delivery.warehouseRef || undefined,
        },
        payment: {
          method: checkout.payment.method,
          status: 'pending',
        },
        comment: checkout.comment || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      clearCart();
      checkout.reset();
      setLoading(false);
      router.replace(`/order-success?orderId=${orderId}` as any);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={STEP_LABELS[checkout.currentStep] ?? ''}
        showBack
        onBack={handleBack}
      />

      <CheckoutStepIndicator
        currentStep={checkout.currentStep}
        steps={STEP_LABELS}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {checkout.currentStep === 0 && (
          <ContactsForm
            contacts={checkout.contacts}
            onUpdate={checkout.setContacts}
            errors={errors}
          />
        )}
        {checkout.currentStep === 1 && (
          <DeliveryForm
            delivery={checkout.delivery}
            onUpdate={checkout.setDelivery}
            errors={errors}
          />
        )}
        {checkout.currentStep === 2 && (
          <PaymentMethodSelector
            selectedMethod={checkout.payment.method}
            onSelect={(method: PaymentMethod) => checkout.setPayment({ method })}
          />
        )}
        {checkout.currentStep === 3 && (
          <OrderSummary
            items={cartItems}
            contacts={checkout.contacts}
            delivery={checkout.delivery}
            payment={checkout.payment}
            comment={checkout.comment}
            onCommentChange={checkout.setComment}
            total={cartTotal}
          />
        )}
      </ScrollView>

      <CheckoutBottomBar
        step={checkout.currentStep}
        onNext={handleNext}
        onBack={handleBack}
        loading={loading}
        nextLabel={checkout.currentStep === 3 ? t('checkout:checkout.placeOrder') : t('checkout:checkout.next')}
        backLabel={t('checkout:checkout.back')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  content: {
    flex: 1,
  },
});
