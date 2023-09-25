// src/stores/authStore.ts

import { create } from 'zustand';
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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  login: async (email, password) => {
    try {
      const user = await httpService.post('/auth/login', { email, password });
      set({ user });
    } catch (error) {
      console.error('Login failed:', error);
    }
  },
  register: async (email, password, firstName, lastName) => {
    try {
      const user = await httpService.post('/auth/register', {
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
}));


