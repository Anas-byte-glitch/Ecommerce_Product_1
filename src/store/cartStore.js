import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Cart lines: { slug, size, quantity }. A line is identified by slug + size.
// Lines are persisted to localStorage ("atlas-cart"); `isOpen` (cart drawer visibility) is not.
// The drawer UI (Phase 5) reads `isOpen` and calls `closeCart`.
const sameLine = (slug, size) => (i) => i.slug === slug && i.size === size

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
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
    {
      name: 'atlas-cart',
      version: 1,
      migrate: () => ({ items: [] }),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export const selectCartCount = (state) => state.items.reduce((sum, i) => sum + i.quantity, 0)
