import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ChevronLeft, ChevronRight, CreditCard, RefreshCw } from 'lucide-react';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { adminService } from '../services/admin.service';
import { formatPrice } from '../utils/format';

const PAGE_SIZE = 25;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['admin', 'payments', page],
    queryFn: () => adminService.getPayments(page, PAGE_SIZE)
  });
  const payments = data?.data ?? [];
  const totalPages = Math.max(1, Math.ceil((data?.meta.total ?? 0) / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-7xl">
      <SEO title="Admin payments" />
      <p className="eyebrow">Admin</p>
      <h1 className="mt-2 text-3xl font-bold">Payments</h1>
      <p className="mt-2 text-sm text-muted">Customer information and Razorpay payment records.</p>

      <section className="surface mt-8 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-5">
          <div>
            <h2 className="font-semibold">Payment activity</h2>
            <p className="mt-1 text-sm text-muted">{data?.meta.total ?? 0} payment records</p>
          </div>
          <Button variant="secondary" onClick={() => refetch()} isLoading={isFetching}>
            <RefreshCw className="h-4 w-4" aria-hidden /> Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3 p-5" aria-label="Loading payments">
            {[0, 1, 2, 3].map((item) => <div key={item} className="skeleton h-12" />)}
          </div>
        ) : isError ? (
          <div className="p-8">
            <EmptyState
              icon={AlertCircle}
              title="Payments couldn't be loaded"
              description="Please try again. If the issue continues, check the backend connection."
              action={<Button onClick={() => refetch()} isLoading={isFetching}>Try again</Button>}
            />
          </div>
        ) : payments.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={CreditCard}
              title="No payments yet"
              description="Completed and pending Razorpay orders will appear here."
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Course / plan</th>
                    <th className="px-5 py-3 font-semibold">Amount</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Razorpay IDs</th>
                    <th className="px-5 py-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="align-top">
                      <td className="px-5 py-4">
                        <p className="font-semibold">{payment.userName}</p>
                        <a className="mt-1 block text-muted hover:text-accent" href={`mailto:${payment.userEmail}`}>
                          {payment.userEmail}
                        </a>
                        {payment.userPhone && (
                          <a className="mt-1 block text-muted hover:text-accent" href={`tel:${payment.userPhone}`}>
                            {payment.userPhone}
                          </a>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium">{payment.courseName || 'Subscription plan'}</p>
                        <p className="mt-1 text-muted">{payment.planName}</p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold">
                        {formatPrice(payment.amount / 100, payment.currency)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          payment.status === 'paid'
                            ? 'bg-success/10 text-success'
                            : payment.status === 'failed'
                              ? 'bg-danger/10 text-danger'
                              : 'bg-primary/15 text-accent'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="max-w-56 px-5 py-4 text-xs text-muted">
                        <p className="break-all">Order: {payment.orderId}</p>
                        <p className="mt-1 break-all">Payment: {payment.paymentId || '—'}</p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-muted">
                        {formatDate(payment.paidAt ?? payment.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-line p-4">
              <p className="text-sm text-muted">Page {page} of {totalPages}</p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  aria-label="Next page"
                >
                  Next <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
