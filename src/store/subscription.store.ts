
import { create } from 'zustand';
import { Subscription } from '../types';

interface SubscriptionStore {
  subscription: Subscription | null;
  setSubscription: (sub: Subscription | null) => void;
  decreaseBalance: (amount: number) => void;
}

export const useSubscription = create<SubscriptionStore>((set) => ({
  subscription: null,
  
  setSubscription: (sub) => set({ subscription: sub }),
  
  decreaseBalance: (amount) => set((state) => ({
    subscription: state.subscription
      ? { ...state.subscription, balance: state.subscription.balance - amount }
      : null,
  })),
}));
