import { ShoppingCart } from 'lucide-react'
import { selectCount, useCartStore } from '../../store/cartStore'

// 24px cart icon with a 16px count badge at its top-right (hidden while empty). Opens the drawer.
export default function CartButton() {
  const count = useCartStore(selectCount)
  const openDrawer = useCartStore((s) => s.openDrawer)
  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-haspopup="dialog"
      aria-label={count ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart'}
      className="relative flex size-6 cursor-pointer items-center justify-center text-ink"
    >
      <ShoppingCart aria-hidden="true" strokeWidth={1.5} className="size-6" />
      {count > 0 && (
        <span className="absolute -top-2.5 left-[11px] flex size-4 items-center justify-center rounded-full bg-black text-badge font-semibold tracking-normal text-white">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
