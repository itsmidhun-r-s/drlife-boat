import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreditCard, Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '../../components/common/SEO';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable, { type Column } from '../../components/admin/DataTable';
import QueryError from '../../components/admin/QueryState';
import StatusBadge from '../../components/admin/StatusBadge';
import { adminService, type AdminPlan, type PlanInput } from '../../services/admin.service';
import { apiMessage, formatDuration, formatPrice } from '../../utils/format';

const LEVELS = { low: 'Basic access', medium: 'Standard access', high: 'Full access' } as const;

const schema = z.object({
  name: z.string().trim().min(1, 'Enter a plan name').max(100),
  planType: z.enum(['low', 'medium', 'high']),
  price: z.number({ invalid_type_error: 'Enter a price' }).positive('Price must be more than 0').max(1000000),
  currency: z.string().trim().toUpperCase().regex(/^[A-Z]{3}$/, 'Use a 3-letter code, e.g. INR'),
  durationDays: z.number({ invalid_type_error: 'Enter the number of days' }).int('Whole days only').min(1, 'At least 1 day').max(3650),
  description: z.string().trim().max(500).optional(),
  features: z.string().optional(), // one per line
  sortOrder: z.number({ invalid_type_error: 'Enter a number' }).int().min(0).max(9999),
  isActive: z.boolean()
});
type FormValues = z.infer<typeof schema>;

const toForm = (p?: AdminPlan): FormValues => ({
  name: p?.name ?? '',
  planType: p?.planType ?? 'low',
  price: p?.price ?? (undefined as unknown as number),
  currency: p?.currency ?? 'INR',
  durationDays: p?.durationDays ?? (undefined as unknown as number),
  description: p?.description ?? '',
  features: (p?.features ?? []).join('\n'),
  sortOrder: p?.sortOrder ?? 0,
  isActive: p?.isActive ?? true
});

const selectClass =
  'min-h-11 w-full rounded-xl border border-fg/25 bg-surface px-4 text-sm text-fg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

function PlanForm({ plan, onDone }: { plan?: AdminPlan; onDone: () => void }) {
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: toForm(plan) });

  const save = useMutation({
    mutationFn: (v: FormValues) => {
      const body: PlanInput = {
        name: v.name,
        planType: v.planType,
        price: v.price,
        currency: v.currency,
        durationDays: v.durationDays,
        description: v.description ?? '',
        features: (v.features ?? '').split('\n').map((f) => f.trim()).filter(Boolean),
        isActive: v.isActive,
        sortOrder: v.sortOrder
      };
      return plan ? adminService.updatePlan(plan._id, body) : adminService.createPlan(body);
    },
    onSuccess: () => {
      toast.success(plan ? 'Plan updated' : 'Plan created');
      qc.invalidateQueries({ queryKey: ['admin', 'plans'] });
      qc.invalidateQueries({ queryKey: ['plans'] });
      onDone();
    },
    onError: (e: any) => {
      const fields = e?.response?.data?.errors as Record<string, string> | undefined;
      if (fields) Object.entries(fields).forEach(([k, m]) => setError(k as keyof FormValues, { message: m }));
      toast.error(apiMessage(e, 'Could not save the plan'));
    }
  });

  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate className="space-y-4">
      <Input label="Plan name" placeholder="e.g. Standard" error={errors.name?.message} {...register('name')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="planType" className="mb-1.5 block text-sm font-medium text-fg-soft">Lesson access</label>
          <select id="planType" className={selectClass} {...register('planType')}>
            {Object.entries(LEVELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <p className="mt-1.5 text-xs text-subtle">Higher plans can watch every lesson of the lower ones.</p>
        </div>
        <Input label="Duration (days)" type="number" inputMode="numeric" placeholder="180" error={errors.durationDays?.message} {...register('durationDays', { valueAsNumber: true })} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Price" type="number" inputMode="decimal" step="0.01" placeholder="9999" error={errors.price?.message} {...register('price', { valueAsNumber: true })} />
        <Input label="Currency" maxLength={3} placeholder="INR" error={errors.currency?.message} {...register('currency')} />
      </div>

      <Input label="Short description" placeholder="Most popular" error={errors.description?.message} {...register('description')} />
      <Textarea label="What's included" placeholder={'One item per line\nRecorded lectures\n4 live classes / week'} className="min-h-[110px]" helperText="Shown as a checklist on the Pricing page." error={errors.features?.message} {...register('features')} />

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
        <Input label="Display order" type="number" inputMode="numeric" helperText="Smaller numbers appear first." error={errors.sortOrder?.message} {...register('sortOrder', { valueAsNumber: true })} />
        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-fg/25 px-4 text-sm text-fg">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register('isActive')} />
          Show on the Pricing page
        </label>
      </div>

      <div className="flex flex-wrap justify-end gap-2 border-t border-line pt-4">
        <Button variant="secondary" onClick={onDone}>Cancel</Button>
        <Button type="submit" isLoading={save.isPending}>{plan ? 'Save changes' : 'Create plan'}</Button>
      </div>
    </form>
  );
}

const AdminPlans = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<AdminPlan | 'new' | null>(null);
  const list = useQuery({ queryKey: ['admin', 'plans'], queryFn: adminService.plans });

  const toggle = useMutation({
    mutationFn: (p: AdminPlan) => adminService.updatePlan(p._id, { isActive: !p.isActive }),
    onSuccess: (p) => {
      toast.success(p.isActive ? `${p.name} is now visible` : `${p.name} is hidden`);
      qc.invalidateQueries({ queryKey: ['admin', 'plans'] });
      qc.invalidateQueries({ queryKey: ['plans'] });
    },
    onError: (e) => toast.error(apiMessage(e, 'Could not update the plan'))
  });

  const columns: Column<AdminPlan>[] = [
    {
      key: 'name',
      header: 'Plan',
      cell: (p) => (
        <div className="min-w-0">
          <span className="block truncate font-semibold text-fg">{p.name}</span>
          <span className="block text-xs font-normal text-muted">{LEVELS[p.planType]}</span>
        </div>
      )
    },
    { key: 'price', header: 'Price', cell: (p) => <span className="font-semibold text-fg">{formatPrice(p.price, p.currency)}</span> },
    { key: 'duration', header: 'Duration', cell: (p) => formatDuration(p.durationDays) || `${p.durationDays} days` },
    { key: 'features', header: 'Features', cell: (p) => `${p.features.length} listed` },
    { key: 'status', header: 'Visibility', cell: (p) => <StatusBadge tone={p.isActive ? 'success' : 'neutral'}>{p.isActive ? 'Visible' : 'Hidden'}</StatusBadge> },
    {
      key: 'actions',
      header: 'Actions',
      cell: (p) => (
        <div className="flex flex-wrap justify-end gap-2 md:justify-start">
          <Button variant="secondary" size="sm" onClick={() => setEditing(p)}><Pencil className="h-3.5 w-3.5" aria-hidden /> Edit</Button>
          <Button variant="ghost" size="sm" disabled={toggle.isPending} onClick={() => toggle.mutate(p)}>{p.isActive ? 'Hide' : 'Show'}</Button>
        </div>
      )
    }
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <SEO title="Plans – Admin" />
      <AdminHeader
        title="Plans"
        description="The subscription plans students can buy. Plans are hidden, never deleted, so past payments stay accurate."
        actions={<Button onClick={() => setEditing('new')}><Plus className="h-4 w-4" aria-hidden /> New plan</Button>}
      />

      {list.isError ? (
        <QueryError onRetry={() => list.refetch()} loading={list.isFetching} />
      ) : (
        <DataTable
          columns={columns}
          rows={list.data ?? []}
          rowKey={(p) => p._id}
          loading={list.isLoading}
          empty={
            <EmptyState
              icon={CreditCard}
              title="No plans yet"
              description="Create your first plan and it will appear on the Pricing page."
              action={<Button onClick={() => setEditing('new')}><Plus className="h-4 w-4" aria-hidden /> Create a plan</Button>}
            />
          }
        />
      )}

      <Modal
        open={editing !== null}
        onOpenChange={(o) => !o && setEditing(null)}
        title={editing === 'new' ? 'New plan' : 'Edit plan'}
        description={editing === 'new' ? 'Set the price, length and what is included.' : 'Changes apply to new purchases straight away.'}
      >
        {editing !== null && <PlanForm key={editing === 'new' ? 'new' : editing._id} plan={editing === 'new' ? undefined : editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
};

export default AdminPlans;
