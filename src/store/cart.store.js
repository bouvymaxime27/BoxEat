import { create } from 'zustand';

export const useCart = create((set, get) => ({
  items: [],
  add: (item) => set(s => ({ items: [...s.items, item] })),
  remove: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((t, i) => t + i.price, 0)
}));
