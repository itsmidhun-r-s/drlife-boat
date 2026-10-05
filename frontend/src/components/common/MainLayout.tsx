import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageLoader from './PageLoader';
import ScrollToTop from './ScrollToTop';

const MainLayout = () => (
  <div className="flex min-h-screen flex-col">
    <ScrollToTop />
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" className="flex-1">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default MainLayout;
