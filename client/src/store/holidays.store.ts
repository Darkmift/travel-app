// src/stores/holidayStore.ts

import { create } from 'zustand';
import { Holiday } from '../types/holiday';
import { httpService } from '../http';
import { persist } from 'zustand/middleware';

export interface HolidayState {
  holidays: Holiday[];
  setHolidays: (holidays: Holiday[]) => void;
  getAll: (userId?: number) => Promise<void>;
  getById: (id: number, userId?: number) => Promise<void>;
  add: (holiday: Holiday, userId?: number) => Promise<void>;
  update: (id: number, holiday: Holiday, userId?: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

const API_ENDPOINT = '/holiday';

export const useHolidayStore = create(
  persist<HolidayState>(
    (set) => ({
      holidays: [],
      setHolidays: (holidays) => set({ holidays }),
      getAll: async (userId) => {
        try {
          const holidays = await httpService.get(API_ENDPOINT, undefined, { userId });
          set({ holidays });
        } catch (error) {
          console.error('Failed to fetch all holidays:', error);
        }
      },
      getById: async (id, userId) => {
        try {
          const holiday = await httpService.get(`${API_ENDPOINT}/${id}`, undefined, { userId });
          set((state) => ({ holidays: [...state.holidays, holiday] }));
        } catch (error) {
          console.error(`Failed to fetch holiday with id ${id}:`, error);
        }
      },
      add: async (holiday, userId) => {
        try {
          const newHoliday = await httpService.post(API_ENDPOINT, { ...holiday }, { userId });
          set((state) => ({ holidays: [...state.holidays, newHoliday] }));
        } catch (error) {
          console.error('Failed to add new holiday:', error);
        }
      },
      update: async (id, holiday, userId) => {
        try {
          const updatedHoliday = await httpService.put(
            `${API_ENDPOINT}/${id}`,
            { ...holiday },
            { userId }
          );
          set((state) => ({
            holidays: state.holidays.map((h) => (h.id === id ? updatedHoliday : h)),
          }));
        } catch (error) {
          console.error(`Failed to update holiday with id ${id}:`, error);
        }
      },
      remove: async (id) => {
        try {
          await httpService.delete(`${API_ENDPOINT}/${id}`);
          set((state) => ({
            holidays: state.holidays.filter((h) => h.id !== id),
          }));
        } catch (error) {
          console.error(`Failed to remove holiday with id ${id}:`, error);
        }
      },
    }),
    {
      name: 'holiday-storage', // name of the item in the storage (must be unique)
      skipHydration: false, // manually rehydrate state from storage (see useEffect in MainAppRouter)
    }
  )
);
