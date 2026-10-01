import { site } from '../config/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

// /returns/return-exchange-policy. Text page: 1000px column, centered H1,
// grey content card (padding 40 / 16 on phone) with a rich-text rhythm:
// H2 42/38/32 bold, 40px above; lists 24px above, 20px bullets; paragraphs 20px above.
// The return window comes from site.returnWindowDays.
const h2 = 'font-heading-alt mt-10 text-[32px] leading-[1.1] font-bold text-black md:text-[38px] lg:text-[42px]'
const ul = 'mt-6 list-disc pl-5 marker:text-slate'
const p = 'mt-5'

export default function ReturnPolicy() {
  const days = `${site.returnWindowDays} days`

  useDocumentTitle('Return & Exchange Policy')

  return (
    <section className="mx-auto flex max-w-[1000px] flex-col gap-12 px-4 pt-[140px] pb-16 md:gap-16 md:px-8 md:pb-20 lg:px-10 lg:pb-[100px]">
      <h1 className="heading-1 text-center">Return Policy</h1>
      <div className="bg-surface p-4 text-body text-slate md:p-10">
        <p>We want you to love your order. If something isn’t quite right, we’re here to help.</p>

        <h2 className={h2}>Returns</h2>
        <ul className={ul}>
          <li>You can return any unworn, unwashed item within {days} of delivery.</li>
          <li>Items must be in their original condition with tags attached.</li>
          <li>
            Once we receive and inspect your return, your refund will be processed back to your
            original payment method within 3–5 business days.
          </li>
        </ul>

        <h2 className={h2}>Exchanges</h2>
        <ul className={ul}>
          <li>Need a different size or color? We offer free exchanges within {days}.</li>
          <li>As soon as we receive the original item, your replacement will be shipped out.</li>
        </ul>

        <h2 className={h2}>Non-Returnable Items</h2>
        <ul className={ul}>
          <li>Final sale items</li>
          <li>Items showing signs of wear, washing, or damage</li>
          <li>Items without original tags or packaging</li>
        </ul>

        <h2 className={h2}>Return Shipping</h2>
        <ul className={ul}>
          <li>
            Return shipping costs are the customer’s responsibility unless the item arrived damaged
            or incorrect.
          </li>
          <li>If we made an error, we’ll cover all return shipping fees.</li>
        </ul>

        <h2 className={h2}>Damaged or Wrong Items</h2>
        <p className={p}>
          If your item arrives damaged, defective, or incorrect, contact us within 48 hours and
          we’ll make it right immediately.
        </p>

        <h2 className={h2}>How to Start a Return</h2>
        <p className={p}>
          Email us at{' '}
          <a href={`mailto:${site.contactEmail}`} className="text-black underline">
            {site.contactEmail}
          </a>{' '}
          with:
        </p>
        <ul className={ul}>
          <li>Your order number</li>
          <li>The item you want to return or exchange</li>
          <li>A short explanation (size issue, wrong item, etc.)</li>
        </ul>
        <p className={p}>We’ll respond with next steps and a return address.</p>
      </div>
    </section>
  )
}
