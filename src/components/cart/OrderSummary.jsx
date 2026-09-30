import { formatPrice } from '../../utils/formatPrice'

// Totals block: Subtotal / Shipping (Free or flat) / rule / Total. Children render below
// (buttons, notes). Grey card (radius 8, padding 24) unless `bare`.
export default function OrderSummary({ totals, title = 'Order summary', bare = false, children }) {
  const { subtotal, shipping, total } = totals
  return (
    <section
      aria-label={title}
      className={bare ? 'flex flex-col gap-4' : 'flex flex-col gap-4 rounded-md bg-surface p-6'}
    >
      {title && <h2 className="text-[18px] leading-[1.2] md:text-[20px] lg:text-[22px]">{title}</h2>}
      <dl className="flex flex-col gap-3 text-body">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Subtotal</dt>
          <dd className="text-slate">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Shipping</dt>
          <dd className="text-slate">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div aria-hidden="true" className="h-px bg-black/8" />
        <div className="flex justify-between gap-4 text-body-lg font-medium text-black">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {children}
    </section>
  )
}
