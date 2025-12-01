import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const data = await authAPI.login(username, password);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });
          return { success: true };
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          set({ loading: false, error: errorMessage, isAuthenticated: false });
          return { success: false, error: errorMessage };
        }
      },

      register: async (username, password, email) => {
        set({ loading: true, error: null });
        try {
          const data = await authAPI.register(username, password, email);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });
          return { success: true };
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          set({ loading: false, error: errorMessage, isAuthenticated: false });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        try {
          const user = await authAPI.getMe();
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          set({ isAuthenticated: false, user: null, token: null });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

