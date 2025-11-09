
import { create } from 'zustand';
import { User } from '../types';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateLocale: (locale: 'fr' | 'nl' | 'en') => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  
  setUser: (user) => set({ user }),
  
  updateLocale: (locale) => set((state) => ({
    user: state.user ? { ...state.user, locale } : null,
  })),
}));
