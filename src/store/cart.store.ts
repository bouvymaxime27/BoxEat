
import { create } from 'zustand';
import { Meal } from '../types';

interface CartItem {
  meal: Meal;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  machineId: string | null;
  slotDate: string | null;
  add: (meal: Meal, qty?: number) => void;
  remove: (mealId: string) => void;
  updateQty: (mealId: string, qty: number) => void;
  clear: () => void;
  setMachine: (machineId: string) => void;
  setSlot: (date: string) => void;
  totalCents: () => number;
  totalItems: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  machineId: null,
  slotDate: null,
  
  add: (meal, qty = 1) => set((state) => {
    const existing = state.items.find(item => item.meal.id === meal.id);
    if (existing) {
      return {
        items: state.items.map(item =>
          item.meal.id === meal.id
            ? { ...item, qty: item.qty + qty }
            : item
        ),
      };
    }
    return { items: [...state.items, { meal, qty }] };
  }),
  
  remove: (mealId) => set((state) => ({
    items: state.items.filter(item => item.meal.id !== mealId),
  })),
  
  updateQty: (mealId, qty) => set((state) => ({
    items: state.items.map(item =>
      item.meal.id === mealId ? { ...item, qty } : item
    ),
  })),
  
  clear: () => set({ items: [], machineId: null, slotDate: null }),
  
  setMachine: (machineId) => set({ machineId }),
  
  setSlot: (date) => set({ slotDate: date }),
  
  totalCents: () => {
    return get().items.reduce((total, item) => 
      total + (item.meal.priceCents * item.qty), 0
    );
  },
  
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.qty, 0);
  },
}));
