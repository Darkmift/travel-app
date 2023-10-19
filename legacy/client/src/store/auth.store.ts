// src/stores/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { httpService } from '../http';
import LocalStorageService from '../services/localstorage-handler.service';
import { TOKEN_LS_KEY } from '../constants';

export interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  isRoleAdmin: () => boolean;
}

const API_ENDPOINT = '/auth';

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      login: async (email, password) => {
        const user: User = await httpService.post(`${API_ENDPOINT}/login`, { email, password });
        if (!user.first_name) throw new Error('Invalid user');
        set({ user });
      },
      register: async (email, password, firstName, lastName) => {
        try {
          const user = await httpService.post(`${API_ENDPOINT}/register`, {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
          });
          set({ user });
        } catch (error) {
          console.error('Registration failed:', error);
        }
      },
      logout: () => {
        // Perform logout action, like clearing the token
        // httpService.post('/auth/logout');
        LocalStorageService.delete(TOKEN_LS_KEY);
        set({ user: null });
      },
      isRoleAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      skipHydration: false, // manually rehydrate state from storage (see useEffect in MainAppRouter)
    }
  )
);
