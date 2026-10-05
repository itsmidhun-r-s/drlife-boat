import { Suspense } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  CreditCard,
  Globe,
  Inbox,
  LayoutDashboard,
  LogOut,
  Receipt,
  ShieldCheck,
  Users,
  type LucideIcon
} from 'lucide-react';
import { adminService } from '../../services/admin.service';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import Logo from '../common/Logo';
import PageLoader from '../common/PageLoader';
import ScrollToTop from '../common/ScrollToTop';

interface Item {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  badge?: number;
}

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAdmin = user?.role === 'admin';
  const inAdmin = isAdmin && pathname.startsWith('/admin');

  // number of unanswered enquiries, shown as a badge in the admin menu
  const overview = useQuery({ queryKey: ['admin', 'overview'], queryFn: adminService.overview, enabled: inAdmin, staleTime: 30_000 });

  const studentItems: Item[] = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/pricing', label: 'Plans', icon: CreditCard },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin panel', icon: ShieldCheck }] : [])
  ];
  const adminItems: Item[] = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox, badge: overview.data?.newEnquiries },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/plans', label: 'Plans', icon: CreditCard },
    { to: '/admin/payments', label: 'Payments', icon: Receipt }
  ];
  const items = inAdmin ? adminItems : studentItems;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
      isActive ? 'bg-primary/10 text-accent' : 'text-muted hover:bg-fg/5 hover:text-fg'
    );

  return (
    <div className="min-h-screen lg:flex">
      <ScrollToTop />

      <aside className="border-b border-line bg-surface lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col gap-4 p-4 lg:gap-6 lg:p-5">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <Logo />
              {inAdmin && <span className="rounded-md bg-fg px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg">Admin</span>}
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="Logout"
              className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-fg/5 hover:text-danger lg:hidden"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <nav
            aria-label="Dashboard"
            className="-mx-1 flex gap-1 overflow-x-auto px-1 lg:flex-1 lg:flex-col lg:overflow-visible"
          >
            {items.map(({ to, label, icon: Icon, end, badge }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
                {!!badge && (
                  <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold leading-none text-ink-950" aria-label={`${badge} new`}>
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden space-y-1 border-t border-line pt-4 lg:block">
            <p className="truncate px-3.5 text-sm font-medium text-fg">{user?.name}</p>
            <p className="truncate px-3.5 pb-2 text-xs text-subtle">{user?.email}</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-muted hover:bg-fg/5 hover:text-fg"
            >
              <Globe className="h-4 w-4" />
              Back to website
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-muted hover:bg-danger/10 hover:text-danger"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-8">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardLayout;
