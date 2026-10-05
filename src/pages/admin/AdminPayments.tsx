import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Receipt } from 'lucide-react';
import SEO from '../../components/common/SEO';
import EmptyState from '../../components/common/EmptyState';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable, { type Column } from '../../components/admin/DataTable';
import Pagination from '../../components/admin/Pagination';
import QueryError from '../../components/admin/QueryState';
import StatusBadge from '../../components/admin/StatusBadge';
import { adminService, type AdminPayment } from '../../services/admin.service';
import { formatDateTime, formatPrice } from '../../utils/format';

const LIMIT = 20;

const AdminPayments = () => {
  const [page, setPage] = useState(1);
  const list = useQuery({ queryKey: ['admin', 'payments', page], queryFn: () => adminService.payments({ page, limit: LIMIT }), placeholderData: keepPreviousData });

  const columns: Column<AdminPayment>[] = [
    {
      key: 'user',
      header: 'Student',
      cell: (p) => (
        <div className="min-w-0">
          <span className="block max-w-[16rem] truncate font-semibold text-fg">{p.userName}</span>
          <span className="block max-w-[16rem] truncate text-xs font-normal text-muted">{p.userEmail}</span>
        </div>
      )
    },
    { key: 'plan', header: 'Plan', cell: (p) => p.planName },
    { key: 'amount', header: 'Amount', cell: (p) => <span className="font-semibold text-fg">{formatPrice(p.amount, p.currency)}</span> },
    { key: 'status', header: 'Status', cell: (p) => <StatusBadge tone={p.status === 'paid' ? 'success' : p.status === 'failed' ? 'danger' : 'warning'}>{p.status === 'created' ? 'Not completed' : p.status}</StatusBadge> },
    { key: 'date', header: 'Date', cell: (p) => <span className="whitespace-nowrap">{formatDateTime(p.paidAt ?? p.createdAt)}</span> },
    { key: 'order', header: 'Order ID', cell: (p) => <code className="break-all text-xs text-muted">{p.orderId}</code> }
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <SEO title="Payments – Admin" />
      <AdminHeader title="Payments" description="Every checkout attempt. “Not completed” means the student opened checkout but did not pay." />
      {list.isError ? (
        <QueryError onRetry={() => list.refetch()} loading={list.isFetching} />
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={list.data?.data ?? []}
            rowKey={(p) => p.id}
            loading={list.isLoading}
            empty={<EmptyState icon={Receipt} title="No payments yet" description="Payments appear here after students check out." />}
          />
          {list.data && <Pagination page={page} limit={LIMIT} total={list.data.meta.total} onChange={setPage} />}
        </>
      )}
    </div>
  );
};

export default AdminPayments;
