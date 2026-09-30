import { site } from '../config/site'

const formatter = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  minimumFractionDigits: 2,
})

// formatPrice(55) -> "$55.00"
export function formatPrice(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return ''
  return formatter.format(amount)
}
