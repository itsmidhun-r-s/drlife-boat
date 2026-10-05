import { useQuery } from '@tanstack/react-query';
import { paymentService } from '../services/payment.service';
import { useAuthStore } from '../store/authStore';

type SubscriptionResponse = {
  isActive?: boolean;
  daysRemaining?: number | string;
  subscription?: Record<string, unknown> | null;
};

export const useSubscription = () => {
  const { user } = useAuthStore();

  const { data, isLoading, refetch } = useQuery<SubscriptionResponse>({
    queryKey: ['my-subscription', user?._id ?? 'anonymous'],
    queryFn: () => paymentService.getMySubscription(),
    enabled: !!user,
    staleTime: 60 * 1000,
    retry: false
  });

  const isActive = Boolean(data?.isActive);
  const daysRemaining = Number(data?.daysRemaining ?? 0);
  const isExpiringSoon = isActive && daysRemaining > 0 && daysRemaining <= 7;

  return {
    subscription: data?.subscription ?? null,
    daysRemaining,
    isActive,
    isExpiringSoon,
    isLoading,
    refetch
  };
};
