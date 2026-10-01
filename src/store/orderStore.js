import { create } from 'zustand'
import { site } from '../config/site'

// Last placed order, kept in memory only (a refresh clears it — the success page then redirects).
export const useOrderStore = create((set) => ({
  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),
}))

// Order number: first 3 letters of the brand + "-" + 6 random characters, e.g. "HAL-7AN5LK".
export const createOrderId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const values = crypto.getRandomValues(new Uint32Array(6))
  const prefix = (site.brandName.replace(/[^a-z]/gi, '').slice(0, 3) || 'ORD').toUpperCase()
  return `${prefix}-` + Array.from(values, (v) => chars[v % chars.length]).join('')
}
