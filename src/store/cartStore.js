import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Cart lines: { slug, size, quantity }. A line is identified by slug + size.
// Persisted to localStorage ("atlas-cart"). Drawer / cart UI comes in Phase 5.
const sameLine = (slug, size) => (i) => i.slug === slug && i.size === size

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (slug, size, quantity = 1) =>
        set((state) => {
          const match = sameLine(slug, size)
          if (state.items.some(match)) {
            return {
              items: state.items.map((i) =>
                match(i) ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            }
          }
          return { items: [...state.items, { slug, size, quantity }] }
        }),
      removeItem: (slug, size) =>
        set((state) => ({ items: state.items.filter((i) => !sameLine(slug, size)(i)) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'atlas-cart', version: 1, migrate: () => ({ items: [] }) },
  ),
)

export const selectCartCount = (state) => state.items.reduce((sum, i) => sum + i.quantity, 0)
