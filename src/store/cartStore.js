import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { site } from '../config/site'
import { getProductBySlug } from '../data/products'

// Cart (DESIGN_NOTES §18). Lines: { slug, size, quantity }; a line is identified by slug + size.
// Only `items` is persisted (localStorage "atlas-cart"); drawer visibility is not.
export const MIN_QTY = 1
export const MAX_QTY = 10

const clampQty = (q) => Math.min(MAX_QTY, Math.max(MIN_QTY, Math.round(Number(q) || MIN_QTY)))
const sameLine = (slug, size) => (i) => i.slug === slug && i.size === size

// A stored line is valid only if its product (and size) still exists in the catalogue.
const isValidLine = (i) => {
  const product = getProductBySlug(i?.slug)
  return Boolean(product && product.sizes.includes(i.size))
}

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      // Adds a line, or merges into the existing slug + size line (quantity capped at MAX_QTY).
      addItem: (slug, size, quantity = 1) =>
        set((state) => {
          if (!isValidLine({ slug, size })) return state
          const match = sameLine(slug, size)
          if (state.items.some(match)) {
            return {
              items: state.items.map((i) =>
                match(i) ? { ...i, quantity: clampQty(i.quantity + quantity) } : i,
              ),
            }
          }
          return { items: [...state.items, { slug, size, quantity: clampQty(quantity) }] }
        }),

      updateQuantity: (slug, size, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            sameLine(slug, size)(i) ? { ...i, quantity: clampQty(quantity) } : i,
          ),
        })),

      removeItem: (slug, size) =>
        set((state) => ({ items: state.items.filter((i) => !sameLine(slug, size)(i)) })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'atlas-cart',
      version: 1,
      migrate: () => ({ items: [] }),
      partialize: (state) => ({ items: state.items }),
      // Drop lines whose product no longer exists and repair bad quantities on load.
      merge: (persisted, current) => ({
        ...current,
        items: (Array.isArray(persisted?.items) ? persisted.items : [])
          .filter(isValidLine)
          .map((i) => ({ slug: i.slug, size: i.size, quantity: clampQty(i.quantity) })),
      }),
    },
  ),
)

// ── Pure helpers (work on `items`, skip unknown products) ─────────────────────
// Lines enriched with their product and line total. Use with useMemo on `items`.
export const getCartLines = (items) =>
  items.flatMap((i) => {
    const product = getProductBySlug(i.slug)
    return product ? [{ ...i, product, lineTotal: lineTotal(product, i.quantity) }] : []
  })

export const lineTotal = (product, quantity) => Math.round(product.price * quantity * 100) / 100

export const getSubtotal = (items) =>
  Math.round(getCartLines(items).reduce((sum, l) => sum + l.lineTotal, 0) * 100) / 100

// Free at or above the threshold; flat rate below it; nothing for an empty cart.
export const getShipping = (subtotal) =>
  subtotal <= 0 || subtotal >= site.shipping.freeThreshold ? 0 : site.shipping.flat

export const getTotals = (items) => {
  const subtotal = getSubtotal(items)
  const shipping = getShipping(subtotal)
  return { subtotal, shipping, total: Math.round((subtotal + shipping) * 100) / 100 }
}

// Amount still needed for free shipping (0 when unlocked).
export const getFreeShippingRemaining = (subtotal) =>
  Math.max(0, Math.round((site.shipping.freeThreshold - subtotal) * 100) / 100)

// ── Store selectors (return primitives, safe for useCartStore) ─────────────────
export const selectCount = (state) =>
  getCartLines(state.items).reduce((sum, l) => sum + l.quantity, 0)
export const selectSubtotal = (state) => getSubtotal(state.items)
export const selectShipping = (state) => getShipping(getSubtotal(state.items))
export const selectTotal = (state) => getTotals(state.items).total
