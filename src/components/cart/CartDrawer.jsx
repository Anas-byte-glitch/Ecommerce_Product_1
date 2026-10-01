import { useEffect, useMemo } from 'react'
import { X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { getCartLines, getSubtotal, useCartStore } from '../../store/cartStore'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../ui/Button'
import Drawer from '../ui/Drawer'
import CartLine from './CartLine'
import FreeShippingNote from './FreeShippingNote'

// Cart drawer. Header (64px, 16px padding, 16/24 slate
// title, 32px close with a 14px 2px-stroke X, 1px rgba(33,26,26,.06) rule); the empty state copies
// centered text + "shop now"-style link.
export default function CartDrawer() {
  const items = useCartStore((s) => s.items)
  const open = useCartStore((s) => s.isDrawerOpen)
  const closeDrawer = useCartStore((s) => s.closeDrawer)
  const lines = useMemo(() => getCartLines(items), [items])
  const subtotal = useMemo(() => getSubtotal(items), [items])
  const count = lines.reduce((sum, l) => sum + l.quantity, 0)
  const { pathname } = useLocation()

  // Any navigation (product link, View cart, Checkout, browser back) closes the drawer.
  useEffect(() => {
    closeDrawer()
  }, [pathname, closeDrawer])

  const empty = lines.length === 0

  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      title={empty ? 'Your Cart is empty' : `Cart (${count})`}
      headerClassName="h-16 border-[rgba(33,26,26,0.06)] p-4"
      titleClassName="text-body font-normal text-slate"
      closeLabel="Close cart"
      closeButtonClassName="size-8"
      closeIcon={<X aria-hidden="true" strokeWidth={2} absoluteStrokeWidth className="size-[18px]" />}
      footer={
        !empty && (
          <div className="flex flex-col gap-4 border-t border-black/8 p-4">
            <div className="flex items-center justify-between text-body">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium text-black">{formatPrice(subtotal)}</span>
            </div>
            <FreeShippingNote subtotal={subtotal} />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" to="/cart" onClick={closeDrawer}>
                View cart
              </Button>
              <Button variant="primary" to="/checkout" onClick={closeDrawer}>
                Checkout
              </Button>
            </div>
          </div>
        )
      }
    >
      {empty ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-4 pt-4 text-center">
          <p className="text-slate">Your Cart is empty</p>
          <Button variant="plain" to="/shop/all" onClick={closeDrawer}>
            continue shopping
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-black/8 px-4">
          {lines.map((line) => (
            <CartLine key={`${line.slug}-${line.size}`} line={line} onNavigate={closeDrawer} />
          ))}
        </ul>
      )}
    </Drawer>
  )
}
