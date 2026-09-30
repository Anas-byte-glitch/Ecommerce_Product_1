import { CircleCheck } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import OrderLines from '../components/cart/OrderLines'
import OrderSummary from '../components/cart/OrderSummary'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { useOrderStore } from '../store/orderStore'

// /checkout/success (DESIGN_NOTES §18.4). The order lives in memory only: after a refresh there is
// nothing to show, so we go home.
export default function CheckoutSuccess() {
  const order = useOrderStore((s) => s.lastOrder)
  if (!order) return <Navigate to="/" replace />

  return (
    <section className="pt-[100px] pb-16 md:pb-20 lg:pb-[100px]">
      <Container className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-10 text-black" />
          <h1 className="heading-2">Thank you for your order!</h1>
          <p className="max-w-[420px] text-muted">
            Order <strong className="font-medium text-black">{order.id}</strong> is confirmed. A
            confirmation would be sent to {order.customer.email} — this is a demo, so nothing is
            actually shipped or charged.
          </p>
        </div>

        <div className="flex w-full max-w-[560px] flex-col gap-6">
          <OrderSummary totals={order.totals} title={`Order ${order.id}`}>
            <div aria-hidden="true" className="h-px bg-black/8" />
            <OrderLines lines={order.items} />
            <div aria-hidden="true" className="h-px bg-black/8" />
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-small tracking-normal">
              <dt className="text-muted">Deliver to</dt>
              <dd className="text-slate">
                {order.customer.fullName}, {order.customer.address}, {order.customer.postalCode}{' '}
                {order.customer.city}, {order.customer.country}
              </dd>
              <dt className="text-muted">Shipping</dt>
              <dd className="text-slate">{order.shippingMethod}</dd>
              <dt className="text-muted">Payment</dt>
              <dd className="text-slate">{order.payment}</dd>
            </dl>
          </OrderSummary>
          <Button variant="primary" to="/shop/all" className="w-full">
            Continue shopping
          </Button>
        </div>
      </Container>
    </section>
  )
}
