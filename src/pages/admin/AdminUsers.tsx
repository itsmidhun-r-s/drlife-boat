import { useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search, UserX } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '../../components/common/SEO';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable, { type Column } from '../../components/admin/DataTable';
import Pagination from '../../components/admin/Pagination';
import QueryError from '../../components/admin/QueryState';
import StatusBadge from '../../components/admin/StatusBadge';
import { useAuthStore } from '../../store/authStore';
import { useDebounce } from '../../hooks/useDebounce';
import { adminService, type AdminUser, type Role } from '../../services/admin.service';
import { apiMessage, formatDate, formatDateTime } from '../../utils/format';

const LIMIT = 20;

const AdminUsers = () => {
  const qc = useQueryClient();
  const me = useAuthStore((s) => s.user);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState<AdminUser | null>(null);
  const debounced = useDebounce(search);

  const list = useQuery({
    queryKey: ['admin', 'users', debounced, page],
    queryFn: () => adminService.users({ search: debounced || undefined, page, limit: LIMIT }),
    placeholderData: keepPreviousData
  });

  const update = useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: { isActive?: boolean; role?: Role } }) => adminService.updateUser(id, patch),
    onSuccess: (u, v) => {
      toast.success(v.patch.role ? `${u.name} is now ${u.role}` : u.isActive ? `${u.name} was enabled` : `${u.name} was disabled`);
      setConfirm(null);
      qc.invalidateQueries({ queryKey: ['admin'] });
    },
    onError: (e) => toast.error(apiMessage(e, 'Could not update the user'))
  });

  const isMe = (u: AdminUser) => String(u.id) === String(me?._id);

  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'User',
      cell: (u) => (
        <div className="min-w-0">
          <span className="block max-w-[16rem] truncate font-semibold text-fg">{u.name} {isMe(u) && <span className="font-normal text-subtle">(you)</span>}</span>
          <span className="block max-w-[16rem] truncate text-xs font-normal text-muted">{u.email}</span>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      cell: (u) => (
        <select
          aria-label={`Role for ${u.name}`}
          value={u.role}
          disabled={isMe(u) || update.isPending}
          onChange={(e) => update.mutate({ id: u.id, patch: { role: e.target.value as Role } })}
          className="min-h-9 rounded-lg border border-fg/25 bg-surface px-2.5 text-sm text-fg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
        >
          <option value="user">Student</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
        </select>
      )
    },
    { key: 'status', header: 'Status', cell: (u) => <StatusBadge tone={u.isActive ? 'success' : 'danger'}>{u.isActive ? 'Active' : 'Disabled'}</StatusBadge> },
    { key: 'joined', header: 'Joined', cell: (u) => <span className="whitespace-nowrap">{formatDate(u.createdAt)}</span> },
    { key: 'last', header: 'Last login', cell: (u) => <span className="whitespace-nowrap">{u.lastLoginAt ? formatDateTime(u.lastLoginAt) : 'Never'}</span> },
    {
      key: 'actions',
      header: 'Actions',
      cell: (u) =>
        u.isActive ? (
          <Button variant="secondary" size="sm" disabled={isMe(u) || update.isPending} onClick={() => setConfirm(u)}>Disable</Button>
        ) : (
          <Button variant="secondary" size="sm" disabled={update.isPending} onClick={() => update.mutate({ id: u.id, patch: { isActive: true } })}>Enable</Button>
        )
    }
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <SEO title="Users – Admin" />
      <AdminHeader title="Users" description="Everyone who has created an account. Disabling a user signs them out immediately." />

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name or email…"
          aria-label="Search users"
          className="min-h-11 w-full rounded-xl border border-fg/25 bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {list.isError ? (
        <QueryError onRetry={() => list.refetch()} loading={list.isFetching} />
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={list.data?.data ?? []}
            rowKey={(u) => u.id}
            loading={list.isLoading}
            empty={<EmptyState icon={UserX} title="No users found" description={debounced ? 'No one matches this search.' : 'Users appear here after they register.'} />}
          />
          {list.data && <Pagination page={page} limit={LIMIT} total={list.data.meta.total} onChange={setPage} />}
        </>
      )}

      <Modal open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)} title="Disable this user?" description={confirm ? `${confirm.name} (${confirm.email}) will be signed out everywhere and will not be able to log in until you enable them again.` : undefined}>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirm(null)}>Cancel</Button>
          <Button variant="danger" isLoading={update.isPending} onClick={() => confirm && update.mutate({ id: confirm.id, patch: { isActive: false } })}>Disable user</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
