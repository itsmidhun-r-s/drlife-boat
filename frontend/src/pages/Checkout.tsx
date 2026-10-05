import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Check, ShieldCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import PageLoader from '../components/common/PageLoader';
import { Button } from '../components/common/Button';
import { buttonVariants } from '../components/common/buttonVariants';
import { paymentService } from '../services/payment.service';
import { useAuthStore } from '../store/authStore';
import { formatDuration, formatPrice } from '../utils/format';
import { SITE } from '../utils/site';

/* Minimal typing for the Razorpay checkout script */
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
interface RazorpayInstance {
  open: () => void;
  on: (event: string, cb: (res: any) => void) => void;
}
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Checkout = () => {
  const [params] = useSearchParams();
  const planId = params.get('plan');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, fetchMe } = useAuthStore();
  const [paying, setPaying] = useState(false);

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: paymentService.getPlans
  });
  const plan = plans.find((p) => p._id === planId);

  const pay = async () => {
    if (!plan) return;
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key || key === 'your_razorpay_key_id') {
      toast.error('Payments are not configured yet (missing VITE_RAZORPAY_KEY_ID).');
      return;
    }

    setPaying(true);
    try {
      if (!(await loadRazorpay()) || !window.Razorpay) {
        throw new Error('Could not load the payment window. Check your connection.');
      }

      // NOTE: field names below follow the common Razorpay order shape.
      // Adjust if your backend returns something different.
      const order = await paymentService.createOrder(plan._id, plan.currency ?? 'INR');
      const rzp = new window.Razorpay({
        key: order.keyId ?? key,
        order_id: order.orderId ?? order.id,
        amount: order.amount,
        currency: order.currency ?? plan.currency ?? 'INR',
        name: SITE.name,
        description: plan.name,
        prefill: { name: user?.name, email: user?.email, contact: user?.phone },
        theme: { color: '#ff9400' },
        modal: { ondismiss: () => setPaying(false) },
        handler: async (res: RazorpayResponse) => {
          try {
            await paymentService.verifyPayment(res);
            toast.success('Payment successful! Your plan is now active.');
            await fetchMe();
            queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
            navigate('/dashboard', { replace: true });
          } catch {
            toast.error('Payment received but verification failed. Please contact support.');
          } finally {
            setPaying(false);
          }
        }
      });
      rzp.on('payment.failed', (res: any) => {
        toast.error(res?.error?.description || 'Payment failed. Please try again.');
        setPaying(false);
      });
      rzp.open();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Could not start the payment.');
      setPaying(false);
    }
  };

  if (isLoading) return <PageLoader />;

  if (!plan) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="Choose a plan first"
        description="We couldn't find the plan you selected."
        action={
          <Link to="/pricing" className={buttonVariants()}>
            View plans
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <SEO title="Checkout" />
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="surface mt-8 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            {plan.durationDays ? (
              <p className="mt-1 text-sm text-slate-400">{formatDuration(plan.durationDays)} access</p>
            ) : null}
          </div>
          <p className="font-display text-2xl font-extrabold text-white">
            {formatPrice(plan.price, plan.currency)}
          </p>
        </div>

        {plan.features && plan.features.length > 0 && (
          <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <Button className="mt-8" size="lg" fullWidth onClick={pay} isLoading={paying}>
          Pay {formatPrice(plan.price, plan.currency)}
        </Button>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4" />
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
};

export default Checkout;
