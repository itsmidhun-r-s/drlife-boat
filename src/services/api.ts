import axios from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Internal: set once a request has been retried after a token refresh. */
    _retry?: boolean;
    /** Skip the 401 -> refresh -> retry logic for this request. */
    skipAuthRefresh?: boolean;
  }
}

// "/api" works with the Vite dev proxy (no CORS). Set VITE_API_URL for production.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'];

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// One refresh at a time: parallel 401s share the same refresh request.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
      .then(({ data }) => {
        const token: string | undefined = data?.data?.accessToken;
        if (!token) throw new Error('No access token returned from refresh endpoint');
        useAuthStore.getState().setToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isAuthCall = AUTH_ENDPOINTS.some((p) => original?.url?.startsWith(p));
    const hadSession = !!useAuthStore.getState().accessToken;

    // Only try to refresh for a *logged-in* user on a *non-auth* endpoint.
    // (Previously a wrong password on /auth/login triggered a refresh + full page reload.)
    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      original.skipAuthRefresh ||
      isAuthCall ||
      !hadSession
    ) {
      return Promise.reject(error);
    }

    original._retry = true;
    try {
      const token = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    } catch (refreshError) {
      // Clear local session. ProtectedRoute reacts to the store and redirects to /login.
      useAuthStore.getState().clearSession();
      toast.error('Your session has expired. Please log in again.');
      return Promise.reject(refreshError);
    }
  }
);

export default api;
