import api from './api';

export interface Plan {
  _id: string;
  name: string;
  planType?: 'low' | 'medium' | 'high';
  price: number;
  currency?: string;
  durationDays?: number;
  description?: string;
  features?: string[];
}

const toPlans = (payload: unknown): Plan[] => {
  if (Array.isArray(payload)) return payload as Plan[];
  const nested = (payload as { plans?: unknown } | null)?.plans;
  return Array.isArray(nested) ? (nested as Plan[]) : [];
};

export const paymentService = {
  getPlans: async (): Promise<Plan[]> => {
    const { data } = await api.get('/subscriptions/plans');
    return toPlans(data.data);
  },

  getMySubscription: async () => {
    const { data } = await api.get('/subscriptions/me');
    return data.data;
  },

  createOrder: async (planId: string, currency = 'INR') => {
    const { data } = await api.post('/subscriptions/create-order', { planId, currency });
    return data.data;
  },

  verifyPayment: async (payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const { data } = await api.post('/subscriptions/verify', payload);
    return data.data;
  },

  renewSubscription: async (planId: string) => {
    const { data } = await api.post('/subscriptions/renew', { planId });
    return data.data;
  }
};
