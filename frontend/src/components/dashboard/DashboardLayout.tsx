import { Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CreditCard,
  Globe,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';
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
}

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items: Item[] = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/pricing', label: 'Plans', icon: CreditCard },
    ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin', icon: ShieldCheck }] : [])
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
      isActive ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'
    );

  return (
    <div className="min-h-screen lg:flex">
      <ScrollToTop />

      <aside className="border-b border-white/10 bg-ink-900/60 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col gap-4 p-4 lg:gap-6 lg:p-5">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={logout}
              aria-label="Logout"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-red-400 lg:hidden"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <nav
            aria-label="Dashboard"
            className="-mx-1 flex gap-1 overflow-x-auto px-1 lg:flex-1 lg:flex-col lg:overflow-visible"
          >
            {items.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden space-y-1 border-t border-white/10 pt-4 lg:block">
            <p className="truncate px-3.5 text-sm font-medium text-white">{user?.name}</p>
            <p className="truncate px-3.5 pb-2 text-xs text-slate-500">{user?.email}</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <Globe className="h-4 w-4" />
              Back to website
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400"
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
