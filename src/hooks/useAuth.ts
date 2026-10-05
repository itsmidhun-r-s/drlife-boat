import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore, type RegisterPayload } from '../store/authStore';

const getErrorMessage = (err: any, fallback: string) => {
  const status = err?.response?.status;
  // 502/503/504 come from the Vite proxy when the backend is not running
  if (err?.code === 'ERR_NETWORK' || [502, 503, 504].includes(status)) {
    return 'Cannot reach the server. Please make sure the backend is running.';
  }
  return err?.response?.data?.message || fallback;
};

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, register, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  /** Where to go after login: the page the user was sent away from, else their dashboard. */
  const getRedirect = () => {
    const from = (location.state as { from?: { pathname: string; search?: string } } | null)
      ?.from;
    if (from?.pathname) return `${from.pathname}${from.search ?? ''}`;
    return useAuthStore.getState().user?.role === 'admin' ? '/admin' : '/dashboard';
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate(getRedirect(), { replace: true });
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Login failed'));
      throw err;
    }
  };

  const handleRegister = async (payload: RegisterPayload) => {
    try {
      await register(payload);
      toast.success('Account created! Welcome to DrLifeBoat.');
      navigate(getRedirect(), { replace: true });
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Registration failed'));
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };
};
