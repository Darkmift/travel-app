// src/stores/holidayStore.ts

import { create } from 'zustand';
import { Holiday } from '../types/holiday';
import { httpService } from '../http';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './auth.store';

export interface HolidayState {
  holidays: Holiday[];
  setHolidays: (holidays: Holiday[]) => void;
  getAll: (userId?: number) => Promise<void>;
  getById: (id: number, userId?: number) => Promise<void>;
  add: (holiday: Holiday, userId?: number) => Promise<void>;
  update: (id: number, holiday: Holiday, userId?: number) => Promise<void>;
  toggleFollow: (id: number) => Promise<boolean>;
  remove: (id: number) => Promise<void>;
}

const API_ENDPOINT = '/holiday';

const getUserId = () => useAuthStore.getState().user?.id;

export const useHolidayStore = create(
  persist<HolidayState>(
    (set) => ({
      holidays: [],
      setHolidays: (holidays) => set({ holidays }),
      getAll: async () => {
        try {
          const userId = getUserId();
          const holidays = await httpService.get(API_ENDPOINT, undefined, { userId });
          set({ holidays });
        } catch (error) {
          console.error('Failed to fetch all holidays:', error);
        }
      },
      getById: async (id) => {
        try {
          const userId = getUserId();
          const holiday = await httpService.get(`${API_ENDPOINT}/${id}`, undefined, { userId });
          set((state) => ({ holidays: [...state.holidays, holiday] }));
        } catch (error) {
          console.error(`Failed to fetch holiday with id ${id}:`, error);
        }
      },
      add: async (holiday) => {
        try {
          const userId = getUserId();
          const newHoliday = await httpService.post(API_ENDPOINT, { ...holiday }, { userId });
          set((state) => ({ holidays: [...state.holidays, newHoliday] }));
        } catch (error) {
          console.error('Failed to add new holiday:', error);
        }
      },
      update: async (id, holiday) => {
        try {
          const userId = getUserId();
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
      toggleFollow: async (id: number) => {
        let isFollowing = false;
        try {
          const userId = getUserId();
          isFollowing = await httpService.put(
            `${API_ENDPOINT}/${id}/toggle-follow?userId=${userId}`,
            undefined
          );
          set((state) => ({
            holidays: state.holidays.map((h) => {
              if (h.id === id) {
                h.followerCount = isFollowing ? h.followerCount + 1 : h.followerCount - 1;
                h.isFollowing = isFollowing;
              }
              return h;
            }),
          }));
        } catch (error) {
          console.error(`Failed to toggle follow for holiday with id ${id}:`, error);
        }
        return isFollowing;
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
