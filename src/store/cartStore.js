import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Minimal cart store. Full cart behaviour (drawer, quantities, totals UI) is wired in Phase 5.
// item: { slug, size, color, quantity }
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const match = (i) => i.slug === item.slug && i.size === item.size && i.color === item.color
          const existing = state.items.find(match)
          if (existing) {
            return {
              items: state.items.map((i) =>
                match(i) ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: item.quantity ?? 1 }] }
        }),
      removeItem: (slug, size, color) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.slug === slug && i.size === size && i.color === color)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'atlas-cart' },
  ),
)

export const selectCartCount = (state) => state.items.reduce((sum, i) => sum + i.quantity, 0)
