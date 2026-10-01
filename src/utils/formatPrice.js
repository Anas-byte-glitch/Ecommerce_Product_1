import { site } from '../config/site'

const { symbol, position, decimals, locale } = site.currency
const number = new Intl.NumberFormat(locale, {
  minimumFractionDigits: decimals,
  maximumFractionDigits: decimals,
})
const whole = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 })

// Formats an amount with the currency from site.js: formatPrice(55) -> "$55.00" (USD) or
// "55 DA" (symbol after, 0 decimals). `trim: true` drops zero decimals for round amounts
// ("$100" in "On orders over $100").
export function formatPrice(amount, { trim = false } = {}) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return ''
  const value = trim && Number.isInteger(amount) ? whole.format(amount) : number.format(amount)
  return position === 'after' ? `${value}\u00a0${symbol}` : `${symbol}${value}`
}
