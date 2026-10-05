import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layouts + route guards (small, always needed)
import MainLayout from './components/common/MainLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import GuestRoute from './components/auth/GuestRoute';

// Pages are code-split so the first visit only downloads what it needs
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Checkout = lazy(() => import('./pages/Checkout'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminPlans = lazy(() => import('./pages/admin/AdminPlans'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'));
const WatchVideo = lazy(() => import('./pages/WatchVideo'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  // Validate the persisted session once on startup.
  // (Depending on accessToken here re-fetched /auth/me after every login and token refresh.)
  useEffect(() => {
    if (useAuthStore.getState().accessToken) {
      fetchMe();
    }
  }, [fetchMe]);

  return (
    <Routes>
      {/* Public site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* Unknown URLs render the 404 in place (keeps the URL and the site chrome) */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth (logged-out visitors only) */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Logged-in users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/watch/:videoId" element={<WatchVideo />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>

      {/* Admins */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/plans" element={<AdminPlans />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
