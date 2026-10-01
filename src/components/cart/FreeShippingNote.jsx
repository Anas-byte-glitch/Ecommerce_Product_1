import { site } from '../../config/site'
import { getFreeShippingRemaining } from '../../store/cartStore'
import { formatPrice } from '../../utils/formatPrice'

// One-line free-shipping progress message (14px, muted).
export default function FreeShippingNote({ subtotal, className }) {
  const remaining = getFreeShippingRemaining(subtotal)
  return (
    <p className={className ?? 'text-small tracking-normal text-muted'} aria-live="polite">
      {remaining > 0
        ? `Add ${formatPrice(remaining)} more for free shipping (orders over ${formatPrice(site.shipping.freeThreshold, { trim: true })}).`
        : 'You’ve unlocked free shipping.'}
    </p>
  )
}
