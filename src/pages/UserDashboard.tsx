import { Link } from 'react-router-dom';
import { AlertTriangle, BookOpen, CalendarClock, CreditCard } from 'lucide-react';
import SEO from '../components/common/SEO';
import { buttonVariants } from '../components/common/buttonVariants';
import { useAuthStore } from '../store/authStore';
import { useSubscription } from '../hooks/useSubscription';

const PLAN_LABEL = { low: 'Basic', medium: 'Standard', high: 'Premium' } as const;

const UserDashboard = () => {
  const user = useAuthStore((s) => s.user);
  const { isActive, isExpiringSoon, daysRemaining, isLoading } = useSubscription();
  const planType = user?.subscription?.planType;

  return (
    <div className="mx-auto max-w-5xl">
      <SEO title="Dashboard" />
      <p className="eyebrow">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold">Hi {user?.name?.split(' ')[0] ?? 'there'} 👋</h1>
      <p className="mt-2 text-muted">Pick up where you left off.</p>

      {isExpiringSoon && (
        <div
          role="status"
          className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-4 text-sm text-accent"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-accent" />
          <span className="flex-1">
            Your plan expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}. Renew to keep
            your access.
          </span>
          <Link to="/pricing" className={buttonVariants({ size: 'sm' })}>
            Renew
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2 grid-cols-1">
        <div className="surface p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-accent">
              <CreditCard className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">Your plan</h2>
          </div>
          {isLoading ? (
            <div className="skeleton mt-5 h-16" />
          ) : isActive ? (
            <div className="mt-5 space-y-1">
              <p className="font-display text-2xl font-bold text-fg">
                {planType ? PLAN_LABEL[planType] : 'Active plan'}
              </p>
              <p className="flex items-center gap-2 text-sm text-muted">
                <CalendarClock className="h-4 w-4" />
                {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Active'}
              </p>
            </div>
          ) : (
            <>
              <p className="mt-5 text-sm text-muted">
                You don&apos;t have an active plan yet. Choose one to unlock all lectures and tests.
              </p>
              <Link to="/pricing" className={buttonVariants({ className: 'mt-5' })}>
                View plans
              </Link>
            </>
          )}
        </div>

        <div className="surface p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-accent">
              <BookOpen className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">Keep learning</h2>
          </div>
          <p className="mt-5 text-sm text-muted">
            Browse the course catalogue and jump into your next lesson.
          </p>
          <Link to="/courses" className={buttonVariants({ variant: 'secondary', className: 'mt-5' })}>
            Browse courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
