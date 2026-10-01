import { useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import OrderLines from '../components/cart/OrderLines'
import OrderSummary from '../components/cart/OrderSummary'
import Field from '../components/checkout/Field'
import validateCheckout, { FIELD_ORDER } from '../components/checkout/validateCheckout'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { getCartLines, getTotals, useCartStore } from '../store/cartStore'
import { createOrderId, useOrderStore } from '../store/orderStore'
import { cn } from '../utils/cn'
import { formatPrice } from '../utils/formatPrice'
import useDocumentTitle from '../hooks/useDocumentTitle'

// /checkout — demo checkout, UI only. No payment is taken and no card
// details are ever collected. Submitting creates an in-memory order, clears the cart and shows
// /checkout/success.
const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Ireland',
  'France',
  'Germany',
  'Netherlands',
  'Spain',
  'Italy',
  'Australia',
]
const PAYMENTS = [
  { value: 'card-demo', label: 'Card (demo)', note: 'Simulated — nothing is charged.' },
  { value: 'cod', label: 'Cash on delivery', note: 'Pay the courier when your order arrives.' },
]
const EMPTY = {
  email: '',
  fullName: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  payment: '',
}

const tile =
  'flex cursor-pointer items-center gap-3 rounded-sm border border-black/8 bg-white p-4 transition-colors hover:border-black has-checked:border-black has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-black'
const legend = 'mb-4 text-[18px] leading-[1.2] font-medium text-black md:text-[20px] lg:text-[22px]'

export default function Checkout() {
  useDocumentTitle('Checkout')
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const setLastOrder = useOrderStore((s) => s.setLastOrder)
  const navigate = useNavigate()
  const lines = useMemo(() => getCartLines(items), [items])
  const totals = useMemo(() => getTotals(items), [items])
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)
  // Set together with navigate + clearCart so the empty-cart redirect can't win the race.
  const [placed, setPlaced] = useState(false)

  if (placed) return null
  if (lines.length === 0) return <Navigate to="/cart" replace />

  const summaryLines = lines.map((l) => ({
    slug: l.slug,
    size: l.size,
    quantity: l.quantity,
    lineTotal: l.lineTotal,
    name: l.product.name,
    image: l.product.images[0],
  }))

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (submitted) setErrors(validateCheckout(next)) // live re-validation after the first submit
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateCheckout(values)
    setErrors(found)
    setSubmitted(true)
    const first = FIELD_ORDER.find((k) => found[k])
    if (first) {
      const el = formRef.current.elements.namedItem(first)
      ;(el instanceof RadioNodeList ? el[0] : el)?.focus()
      return
    }
    const { payment, ...customer } = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v.trim()]),
    )
    setPlaced(true)
    setLastOrder({
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      items: summaryLines,
      totals,
      customer,
      payment: PAYMENTS.find((p) => p.value === payment)?.label,
      shippingMethod: 'Standard delivery',
    })
    navigate('/checkout/success')
    clearCart()
  }

  const errorCount = Object.keys(errors).length
  const field = (name) => ({ value: values[name], onChange, error: errors[name] })

  return (
    <section className="pt-[100px] pb-16 md:pb-20 lg:pb-[100px]">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <h1 className="heading-2 border-b border-black/8 pb-6">Checkout</h1>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-1 flex-col gap-10">
            <p role="alert" className={cn('text-small tracking-normal text-danger', !errorCount && 'sr-only')}>
              {errorCount > 0 &&
                `Please fix ${errorCount} field${errorCount === 1 ? '' : 's'} highlighted below.`}
            </p>

            <fieldset>
              <legend className={legend}>Contact</legend>
              <Field name="email" label="Email" {...field('email')}>
                {(p) => (
                  <input {...p} type="email" autoComplete="email" placeholder="name@email.com" value={values.email} onChange={onChange} />
                )}
              </Field>
            </fieldset>

            <fieldset>
              <legend className={legend}>Delivery</legend>
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="fullName" label="Full name" className="md:col-span-2" {...field('fullName')}>
                  {(p) => <input {...p} autoComplete="name" value={values.fullName} onChange={onChange} />}
                </Field>
                <Field name="phone" label="Phone" {...field('phone')}>
                  {(p) => (
                    <input {...p} type="tel" autoComplete="tel" placeholder="+1 555 123 4567" value={values.phone} onChange={onChange} />
                  )}
                </Field>
                <Field name="country" label="Country" {...field('country')}>
                  {(p) => (
                    <select {...p} autoComplete="country-name" value={values.country} onChange={onChange} className={cn(p.className, 'cursor-pointer')}>
                      <option value="">Select a country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  )}
                </Field>
                <Field name="address" label="Address" className="md:col-span-2" {...field('address')}>
                  {(p) => <input {...p} autoComplete="street-address" value={values.address} onChange={onChange} />}
                </Field>
                <Field name="city" label="City" {...field('city')}>
                  {(p) => <input {...p} autoComplete="address-level2" value={values.city} onChange={onChange} />}
                </Field>
                <Field name="postalCode" label="Postal code" {...field('postalCode')}>
                  {(p) => <input {...p} autoComplete="postal-code" value={values.postalCode} onChange={onChange} />}
                </Field>
              </div>
            </fieldset>

            <fieldset>
              <legend className={legend}>Shipping method</legend>
              <label className={tile}>
                <input type="radio" name="shipping" value="standard" checked readOnly className="accent-black" />
                <span className="flex-1">
                  <span className="block text-body text-black">Standard delivery</span>
                  <span className="block text-small tracking-normal text-muted">3–5 business days</span>
                </span>
                <span className="text-body text-slate">
                  {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                </span>
              </label>
            </fieldset>

            <fieldset aria-describedby={errors.payment ? 'payment-error' : 'payment-note'}>
              <legend className={legend}>Payment</legend>
              <div className="grid gap-3 md:grid-cols-2">
                {PAYMENTS.map((pm) => (
                  <label key={pm.value} className={cn(tile, errors.payment && 'border-danger')}>
                    <input
                      type="radio"
                      name="payment"
                      value={pm.value}
                      checked={values.payment === pm.value}
                      onChange={onChange}
                      aria-invalid={errors.payment ? true : undefined}
                      className="accent-black"
                    />
                    <span>
                      <span className="block text-body text-black">{pm.label}</span>
                      <span className="block text-small tracking-normal text-muted">{pm.note}</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.payment && (
                <p id="payment-error" className="mt-2 text-small tracking-normal text-danger">
                  {errors.payment}
                </p>
              )}
              <p id="payment-note" className="mt-4 rounded-sm bg-surface p-3 text-small tracking-normal text-muted">
                This is a demo checkout: no payment is taken and no card details are ever collected.
              </p>
            </fieldset>

            <Button type="submit" variant="primary" className="w-full">
              Place order · {formatPrice(totals.total)}
            </Button>
          </form>

          <aside className="w-full lg:sticky lg:top-[100px] lg:w-[400px]">
            <OrderSummary totals={totals}>
              <div aria-hidden="true" className="h-px bg-black/8" />
              <OrderLines lines={summaryLines} />
            </OrderSummary>
          </aside>
        </div>
      </Container>
    </section>
  )
}
