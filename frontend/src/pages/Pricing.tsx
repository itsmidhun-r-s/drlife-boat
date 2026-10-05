import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Check, CreditCard } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { buttonVariants } from '../components/common/buttonVariants';
import { paymentService, type Plan } from '../services/payment.service';
import { formatDuration, formatPrice } from '../utils/format';
import { cn } from '../utils/cn';

const Pricing = () => {
  const navigate = useNavigate();
  const {
    data: plans = [],
    isLoading,
    isError,
    refetch,
    isFetching
  } = useQuery({ queryKey: ['plans'], queryFn: paymentService.getPlans });

  // Highlight the middle plan (or the "medium" tier when the API provides it)
  const popularId = (plans.find((p) => p.planType === 'medium') ?? plans[Math.floor(plans.length / 2)])?._id;

  const choose = (plan: Plan) => navigate(`/checkout?plan=${plan._id}`);

  return (
    <>
      <SEO title="Pricing" description="Simple plans for AMC, PLAB and FMGE preparation with DrLifeBoat." />
      <PageHeader
        eyebrow="Pricing"
        title="Simple plans. Serious results."
        description="Choose the plan that fits your preparation. Upgrade or renew any time."
      />

      <section className="py-14">
        <div className="container-custom">
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-96" />
              ))}
            </div>
          )}

          {!isLoading && plans.length > 0 && (
            <div
              className={cn(
                'mx-auto grid gap-6',
                plans.length === 1 && 'max-w-md',
                plans.length === 2 && 'max-w-3xl md:grid-cols-2',
                plans.length >= 3 && 'md:grid-cols-3'
              )}
            >
              {plans.map((plan) => {
                const popular = plan._id === popularId && plans.length > 1;
                return (
                  <div
                    key={plan._id}
                    className={cn(
                      'surface relative flex flex-col p-7',
                      popular && 'border-primary/60 shadow-glow md:-translate-y-2'
                    )}
                  >
                    {popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">
                        Most popular
                      </span>
                    )}
                    <h2 className="text-xl font-semibold">{plan.name}</h2>
                    {plan.description && (
                      <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                    )}
                    <p className="mt-6 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold text-white">
                        {formatPrice(plan.price, plan.currency)}
                      </span>
                      {plan.durationDays ? (
                        <span className="text-sm text-slate-500">/ {formatDuration(plan.durationDays)}</span>
                      ) : null}
                    </p>

                    {plan.features && plan.features.length > 0 && (
                      <ul className="mt-6 flex-1 space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Button
                      className="mt-8"
                      fullWidth
                      variant={popular ? 'primary' : 'secondary'}
                      onClick={() => choose(plan)}
                    >
                      Choose {plan.name}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && plans.length === 0 && (
            <EmptyState
              icon={isError ? AlertCircle : CreditCard}
              title={isError ? "We couldn't load the plans" : 'Plans are being updated'}
              description="Please try again shortly, or contact us and we will help you enroll."
              action={
                <>
                  {isError && (
                    <Button variant="secondary" onClick={() => refetch()} isLoading={isFetching}>
                      Try again
                    </Button>
                  )}
                  <Link to="/contact" className={buttonVariants()}>
                    Contact us
                  </Link>
                </>
              }
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Pricing;
