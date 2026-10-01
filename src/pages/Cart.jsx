import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import CartLine from '../components/cart/CartLine'
import EmptyCart from '../components/cart/EmptyCart'
import FreeShippingNote from '../components/cart/FreeShippingNote'
import OrderSummary from '../components/cart/OrderSummary'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { getCartLines, getTotals, useCartStore } from '../store/cartStore'
import useDocumentTitle from '../hooks/useDocumentTitle'

// /cart (DESIGN_NOTES §18.2) — no reference; built from the project's tokens.
// Desktop: lines | 400px summary card. Tablet/phone: stacked.
export default function Cart() {
  useDocumentTitle('Cart')
  const items = useCartStore((s) => s.items)
  const lines = useMemo(() => getCartLines(items), [items])
  const totals = useMemo(() => getTotals(items), [items])
  const count = lines.reduce((sum, l) => sum + l.quantity, 0)

  return (
    <section className="pt-[100px] pb-16 md:pb-20 lg:pb-[100px]">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-black/8 pb-6">
          <h1 className="heading-2">Your Cart</h1>
          {count > 0 && (
            <p className="text-muted">
              {count} item{count === 1 ? '' : 's'}
            </p>
          )}
        </div>

        {lines.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <ul className="-mt-4 flex-1 divide-y divide-black/8">
              {lines.map((line) => (
                <CartLine key={`${line.slug}-${line.size}`} line={line} size="lg" />
              ))}
            </ul>

            <div className="flex w-full flex-col gap-4 lg:sticky lg:top-[100px] lg:w-[400px]">
              <OrderSummary totals={totals}>
                <FreeShippingNote subtotal={totals.subtotal} />
                <Button variant="primary" to="/checkout" className="w-full">
                  Checkout
                </Button>
              </OrderSummary>
              <Link
                to="/shop/all"
                className="self-center border-b border-black text-body text-black"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
