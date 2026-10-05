import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, CreditCard, IndianRupee, Inbox, Plus, Users } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { buttonVariants } from '../../components/common/buttonVariants';
import AdminHeader from '../../components/admin/AdminHeader';
import QueryError from '../../components/admin/QueryState';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/admin/StatusBadge';
import { adminService } from '../../services/admin.service';
import { formatDateTime, formatPrice } from '../../utils/format';

const AdminOverview = () => {
  const overview = useQuery({ queryKey: ['admin', 'overview'], queryFn: adminService.overview });
  const recent = useQuery({ queryKey: ['admin', 'enquiries', 'recent'], queryFn: () => adminService.enquiries({ page: 1, limit: 5 }) });

  const o = overview.data;
  const revenue = o ? (o.revenue.length ? o.revenue.map((r) => formatPrice(r.total, r.currency)).join(' · ') : formatPrice(0)) : '';

  return (
    <div className="mx-auto max-w-6xl">
      <SEO title="Admin" />
      <AdminHeader
        title="Overview"
        description="How the website is doing at a glance."
        actions={
          <Link to="/admin/plans" className={buttonVariants({ size: 'sm' })}>
            <Plus className="h-4 w-4" aria-hidden /> New plan
          </Link>
        }
      />

      {overview.isError ? (
        <QueryError onRetry={() => overview.refetch()} loading={overview.isFetching} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overview.isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32" />)
          ) : (
            <>
              <StatCard icon={Users} label="Registered users" value={o!.users} />
              <StatCard icon={CreditCard} label="Active subscriptions" value={o!.activeSubscriptions} />
              <StatCard icon={Inbox} label="New enquiries" value={o!.newEnquiries} hint="Waiting for a reply" />
              <StatCard icon={IndianRupee} label="Revenue (paid)" value={<span className="text-2xl">{revenue}</span>} />
            </>
          )}
        </div>
      )}

      <section className="mt-10" aria-labelledby="recent-enquiries">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="recent-enquiries" className="text-lg font-bold">Latest enquiries</h2>
          <Link to="/admin/enquiries" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
            View all <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {recent.isError ? (
          <QueryError onRetry={() => recent.refetch()} loading={recent.isFetching} />
        ) : recent.isLoading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-16" />)}</div>
        ) : recent.data!.data.length === 0 ? (
          <div className="surface px-6 py-10 text-center text-sm text-muted">No enquiries yet. They appear here when someone fills in the Contact form.</div>
        ) : (
          <ul className="surface divide-y divide-line">
            {recent.data!.data.map((e) => (
              <li key={e.id}>
                <Link to="/admin/enquiries" className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3.5 hover:bg-fg/[0.03]">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-fg">{e.name}</span>
                    <span className="block truncate text-sm text-muted">{e.courses || 'General enquiry'} · {e.country}</span>
                  </span>
                  <span className="flex items-center gap-3 text-xs text-subtle">
                    {formatDateTime(e.createdAt)}
                    <StatusBadge tone={e.status === 'new' ? 'warning' : e.status === 'contacted' ? 'info' : 'neutral'}>{e.status}</StatusBadge>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminOverview;
