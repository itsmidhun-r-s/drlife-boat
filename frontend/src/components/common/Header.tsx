import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, Phone, User, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { SITE } from '../../utils/site';
import { cn } from '../../utils/cn';
import Logo from './Logo';
import { buttonVariants } from './buttonVariants';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Courses', path: '/courses' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setIsMenuOpen(false), [pathname]);

  // Escape closes the menu; lock page scroll while it is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        isScrolled || isMenuOpen
          ? 'border-white/10 bg-ink-950/85 backdrop-blur-xl'
          : 'border-transparent bg-ink-950/40 backdrop-blur-md'
      )}
    >
      <div className="container-custom flex h-[68px] items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={SITE.phoneHref}
            className="mr-1 hidden items-center gap-2 text-sm text-slate-400 transition hover:text-white xl:flex"
          >
            <Phone className="h-4 w-4 text-primary" />
            {SITE.phone}
          </a>

          {isAuthenticated ? (
            <>
              <Link to={dashboardPath} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
              <User className="h-4 w-4" />
              Login
            </Link>
          )}
          <Link to="/pricing" className={buttonVariants({ size: 'sm' })}>
            Enroll Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-68px)] animate-fade-in overflow-y-auto border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile" className="container-custom flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3 text-base font-medium',
                    isActive ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-white/5'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-3 grid gap-2 border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <>
                  <Link to={dashboardPath} className={buttonVariants({ variant: 'secondary' })}>
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className={buttonVariants({ variant: 'ghost' })}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className={buttonVariants({ variant: 'secondary' })}>
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}
              <Link to="/pricing" className={buttonVariants()}>
                Enroll Now
              </Link>
              <a href={SITE.phoneHref} className={buttonVariants({ variant: 'ghost' })}>
                <Phone className="h-4 w-4 text-primary" />
                {SITE.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
