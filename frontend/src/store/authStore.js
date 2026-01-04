import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      userType: null, // 'user' or 'foodpartner'

      // User Login
      loginUser: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE_URL}/user/login`,
            { email, password },
            { withCredentials: true }
          );
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            userType: 'user',
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Food Partner Login
      loginFoodPartner: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE_URL}/foodpartner/login`,
            { email, password },
            { withCredentials: true }
          );
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            userType: 'foodpartner',
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // User Register
      registerUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE_URL}/user/register`,
            userData,
            { withCredentials: true }
          );
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            userType: 'user',
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Food Partner Register
      registerFoodPartner: async (partnerData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE_URL}/foodpartner/register`,
            partnerData,
            { withCredentials: true }
          );
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            userType: 'foodpartner',
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            userType: null,
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Logout failed';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Check Authentication Status
      checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
            userType: response.data.user?.userType || response.data.user?.type,
          });
          return { success: true };
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            userType: null,
          });
          return { success: false };
        }
      },

      // Clear Error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
