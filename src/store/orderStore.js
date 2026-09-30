import { create } from 'zustand'

// Last placed order, kept in memory only (a refresh clears it — the success page then redirects).
export const useOrderStore = create((set) => ({
  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),
}))

// "ATL-" + 6 random uppercase letters/digits.
export const createOrderId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const values = crypto.getRandomValues(new Uint32Array(6))
  return 'ATL-' + Array.from(values, (v) => chars[v % chars.length]).join('')
}
