import { useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Inbox, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '../../components/common/SEO';
import Modal from '../../components/common/Modal';
import { buttonVariants } from '../../components/common/buttonVariants';
import { Button } from '../../components/common/Button';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable, { type Column } from '../../components/admin/DataTable';
import Pagination from '../../components/admin/Pagination';
import QueryError from '../../components/admin/QueryState';
import StatusBadge from '../../components/admin/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { adminService, type Enquiry, type EnquiryStatus } from '../../services/admin.service';
import { apiMessage, formatDateTime } from '../../utils/format';
import { cn } from '../../utils/cn';

const LIMIT = 15;
const FILTERS: { value: EnquiryStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' }
];
const tone = (s: EnquiryStatus) => (s === 'new' ? 'warning' : s === 'contacted' ? 'info' : 'neutral');

const StatusSelect = ({ enquiry, onChange, disabled }: { enquiry: Enquiry; onChange: (s: EnquiryStatus) => void; disabled?: boolean }) => (
  <select
    aria-label={`Status for ${enquiry.name}`}
    value={enquiry.status}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value as EnquiryStatus)}
    className="min-h-9 rounded-lg border border-fg/25 bg-surface px-2.5 text-sm text-fg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
  >
    <option value="new">New</option>
    <option value="contacted">Contacted</option>
    <option value="closed">Closed</option>
  </select>
);

const AdminEnquiries = () => {
  const qc = useQueryClient();
  const [status, setStatus] = useState<EnquiryStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const list = useQuery({
    queryKey: ['admin', 'enquiries', status, page],
    queryFn: () => adminService.enquiries({ status: status === 'all' ? undefined : status, page, limit: LIMIT }),
    placeholderData: keepPreviousData
  });

  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: EnquiryStatus }) => adminService.updateEnquiry(id, status),
    onSuccess: (_d, v) => {
      toast.success(`Marked as ${v.status}`);
      setSelected((s) => (s && s.id === v.id ? { ...s, status: v.status } : s));
      qc.invalidateQueries({ queryKey: ['admin'] });
    },
    onError: (e) => toast.error(apiMessage(e, 'Could not update the enquiry'))
  });

  const columns: Column<Enquiry>[] = [
    {
      key: 'name',
      header: 'Name',
      cell: (e) => (
        <div className="min-w-0">
          <button type="button" onClick={() => setSelected(e)} className="block max-w-[16rem] truncate text-left font-semibold text-fg hover:text-accent hover:underline">
            {e.name}
          </button>
          <span className="block max-w-[16rem] truncate text-xs font-normal text-muted">{e.email}</span>
        </div>
      )
    },
    { key: 'phone', header: 'Phone', cell: (e) => <a href={`tel:${e.phone.replace(/\s/g, '')}`} className="hover:text-accent hover:underline">{e.phone}</a> },
    { key: 'country', header: 'Country', cell: (e) => e.country },
    { key: 'courses', header: 'Interested in', cell: (e) => e.courses || <span className="text-subtle">—</span> },
    { key: 'date', header: 'Received', cell: (e) => <span className="whitespace-nowrap">{formatDateTime(e.createdAt)}</span> },
    {
      key: 'status',
      header: 'Status',
      cell: (e) => (
        <div className="flex items-center justify-end gap-2 md:justify-start">
          <StatusBadge tone={tone(e.status)}>{e.status}</StatusBadge>
          <StatusSelect enquiry={e} disabled={update.isPending} onChange={(s) => update.mutate({ id: e.id, status: s })} />
        </div>
      )
    }
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <SEO title="Enquiries – Admin" />
      <AdminHeader title="Enquiries" description="Messages sent through the website Contact form." />

      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={status === f.value}
            onClick={() => { setStatus(f.value); setPage(1); }}
            className={cn(
              'min-h-9 rounded-full border px-4 text-sm font-medium transition-colors',
              status === f.value ? 'border-primary bg-primary text-ink-950' : 'border-line bg-surface text-fg-soft hover:border-fg/30'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.isError ? (
        <QueryError onRetry={() => list.refetch()} loading={list.isFetching} />
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={list.data?.data ?? []}
            rowKey={(e) => e.id}
            loading={list.isLoading}
            empty={<EmptyState icon={Inbox} title="No enquiries here" description={status === 'all' ? 'New messages from the Contact form will appear here.' : 'Nothing with this status. Try another filter.'} />}
          />
          {list.data && <Pagination page={page} limit={LIMIT} total={list.data.meta.total} onChange={setPage} />}
        </>
      )}

      <Modal open={!!selected} onOpenChange={(o) => !o && setSelected(null)} title={selected?.name ?? ''} description={selected ? `Received ${formatDateTime(selected.createdAt)}` : undefined}>
        {selected && (
          <div className="space-y-4 text-sm">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Country', [selected.country, selected.state].filter(Boolean).join(', ')],
                ['Qualification', selected.qualification],
                ['Interested in', selected.courses || '—']
              ].map(([k, v]) => (
                <div key={k} className={k === 'Qualification' || k === 'Interested in' ? 'sm:col-span-2' : ''}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="mt-0.5 text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Message</p>
              <p className="mt-1 whitespace-pre-wrap rounded-xl bg-surface-2 p-3 text-fg-soft">{selected.message || 'No message.'}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
              <a href={`mailto:${selected.email}`} className={buttonVariants({ size: 'sm' })}><Mail className="h-4 w-4" aria-hidden /> Reply</a>
              <a href={`tel:${selected.phone.replace(/\s/g, '')}`} className={buttonVariants({ variant: 'secondary', size: 'sm' })}><Phone className="h-4 w-4" aria-hidden /> Call</a>
              <span className="ml-auto flex items-center gap-2">
                <StatusSelect enquiry={selected} disabled={update.isPending} onChange={(s) => update.mutate({ id: selected.id, status: s })} />
              </span>
            </div>
            <Button variant="ghost" size="sm" fullWidth onClick={() => setSelected(null)}>Close</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminEnquiries;
