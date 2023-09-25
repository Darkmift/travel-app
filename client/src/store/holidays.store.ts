// src/stores/holidayStore.ts

import { create } from 'zustand';
import { Holiday } from '../types/holiday';
import { httpService } from '../http';

export interface HolidayState {
  holidays: Holiday[];
  setHolidays: (holidays: Holiday[]) => void;
  getAll: (userId?: number) => Promise<void>;
  getById: (id: number, userId?: number) => Promise<void>;
  add: (holiday: Holiday, userId?: number) => Promise<void>;
  update: (id: number, holiday: Holiday, userId?: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const useHolidayStore = create<HolidayState>((set) => ({
  holidays: [],
  setHolidays: (holidays) => set({ holidays }),
  getAll: async (userId) => {
    try {
      const holidays = await httpService.get('/holidays', undefined, { userId });
      set({ holidays });
    } catch (error) {
      console.error('Failed to fetch all holidays:', error);
    }
  },
  getById: async (id, userId) => {
    try {
      const holiday = await httpService.get(`/holidays/${id}`, undefined, { userId });
      set((state) => ({ holidays: [...state.holidays, holiday] }));
    } catch (error) {
      console.error(`Failed to fetch holiday with id ${id}:`, error);
    }
  },
  add: async (holiday, userId) => {
    try {
      const newHoliday = await httpService.post('/holidays', { ...holiday }, { userId });
      set((state) => ({ holidays: [...state.holidays, newHoliday] }));
    } catch (error) {
      console.error('Failed to add new holiday:', error);
    }
  },
  update: async (id, holiday, userId) => {
    try {
      const updatedHoliday = await httpService.put(`/holidays/${id}`, { ...holiday }, { userId });
      set((state) => ({
        holidays: state.holidays.map((h) => (h.id === id ? updatedHoliday : h)),
      }));
    } catch (error) {
      console.error(`Failed to update holiday with id ${id}:`, error);
    }
  },
  remove: async (id) => {
    try {
      await httpService.delete(`/holidays/${id}`);
      set((state) => ({
        holidays: state.holidays.filter((h) => h.id !== id),
      }));
    } catch (error) {
      console.error(`Failed to remove holiday with id ${id}:`, error);
    }
  },
}));
