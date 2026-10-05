import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import api from '../services/api';

export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  state?: string;
  role: 'user' | 'admin' | 'mentor';
  avatar?: string;
  isEmailVerified: boolean;
  subscription?: {
    planId: string;
    planType: 'low' | 'medium' | 'high';
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'cancelled';
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  /** Clears local auth state only (no network call). */
  clearSession: () => void;
  fetchMe: () => Promise<void>;
  setToken: (token: string) => void;
  updateUser: (user: Partial<User>) => void;
}

const EMPTY_SESSION = { user: null, accessToken: null, isAuthenticated: false } as const;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...EMPTY_SESSION,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          set({
            user: data.data.user,
            accessToken: data.data.accessToken,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      register: async (payload) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/register', payload);
          set({
            user: data.data.user,
            accessToken: data.data.accessToken,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      logout: () => {
        // Fire the request while the token is still attached, then clear immediately.
        // `skipAuthRefresh` prevents the old logout -> 401 -> refresh -> logout loop.
        api.post('/auth/logout', null, { skipAuthRefresh: true }).catch(() => {});
        set({ ...EMPTY_SESSION });
      },

      clearSession: () => set({ ...EMPTY_SESSION }),

      fetchMe: async () => {
        try {
          const { data } = await api.get('/auth/me');
          set({ user: data.data, isAuthenticated: true });
        } catch (err) {
          // Only drop the session when the server says it is invalid —
          // a network blip or a 500 must not log the user out.
          if (axios.isAxiosError(err) && [401, 403].includes(err.response?.status ?? 0)) {
            set({ ...EMPTY_SESSION });
          }
        }
      },

      setToken: (token) => set({ accessToken: token }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
    }),
    {
      name: 'drlifeboat-auth',
      version: 1,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
