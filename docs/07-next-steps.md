# 07 — Next steps: forms, payments and orders

The template is a complete storefront **without a backend**. This page lists the usual ways to
add the missing pieces. It describes options only — none of them is included in the project, and
each requires an account with the provider (and usually some development work). Prices and
features of the services change; check their websites.

## 1. Contact form and newsletter

Today `src/components/contact/ContactForm.jsx` and `src/components/layout/NewsletterForm.jsx`
check the input and show a thank-you message; nothing is sent.

**Contact form — options**

| Option | How it works |
| --- | --- |
| Form services: Formspree, Getform, Basin, Web3Forms… | You create a form on their site and get an address (endpoint). The form's submit sends the name, email and message there; they email it to you. No server needed |
| Netlify Forms | If you host on Netlify, it can collect form submissions (requires adding Netlify's form attributes and a hidden HTML form) |
| `mailto:` link | Simplest: replace the form with a link that opens the visitor's email program. No spam protection, less convenient |
| Your own serverless function | Vercel / Netlify / Cloudflare functions that send an email through an email API (Resend, Postmark, SendGrid…) |

Where to connect it: the `onSubmit` function in `ContactForm.jsx`. When the fields are valid it
currently only shows the confirmation; that is where the request to the service would go. Add
spam protection (the service's honeypot field or captcha).

**Newsletter — options**

Mailing-list providers (Mailchimp, Brevo, MailerLite, ConvertKit/Kit, Buttondown…) give you a
signup endpoint or embed code. Connect it in the `onSubmit` function of `NewsletterForm.jsx`.
Collecting emails for marketing usually requires consent and a privacy policy (GDPR in the EU,
similar laws elsewhere).

## 2. Payments

Today `src/pages/Checkout.jsx` validates the form, creates an order number in memory and shows
the success page. **No payment is taken. Do not add card fields to this form** — collecting card
numbers yourself requires PCI compliance. Use a provider's hosted payment page instead.

| Option | How it works |
| --- | --- |
| Hosted checkout: Stripe Checkout, PayPal Checkout, Lemon Squeezy, Paddle | Your site sends the cart to the provider (through a small serverless function holding your secret key); the visitor pays on the provider's page and comes back to your success page |
| Payment links / buy buttons | Stripe Payment Links, PayPal buttons, Gumroad: one link per product. No cart total, but no code on a server |
| Local payment providers | e.g. in Algeria: CIB / Edahabia cards through a local payment gateway (for example Chargily Pay). Same principle: redirect to the provider, receive a confirmation |
| Cash on delivery | Common for local stores: keep the checkout form, but send the order to you (see 3) instead of charging online |

The cart contents and totals are already computed in `src/store/cartStore.js`
(`getCartLines`, `getTotals`) — that is the data to send to the payment provider. **Always
recalculate prices on the server side**: anything coming from the browser can be modified by a
visitor.

## 3. Saving orders

Today the order exists only in the visitor's browser memory (`src/store/orderStore.js`) and
disappears on reload. To actually receive orders:

| Option | How it works |
| --- | --- |
| Payment provider dashboard | With a hosted checkout (Stripe, PayPal…), every paid order appears in their dashboard, with emails to you and the customer. Often enough for a small shop |
| Email notification | A form service or serverless function emails you each order (good for cash on delivery) |
| Spreadsheet | A serverless function or an automation tool (Zapier, Make, n8n) adds a row to Google Sheets / Airtable per order |
| Database | Supabase, Firebase, PlanetScale, Neon… plus serverless functions; needed if you want an admin panel, order status, stock |
| Headless commerce platform | Shopify Storefront API, Medusa, Saleor, Commerce Layer, Snipcart: they handle products, stock, checkout, taxes and orders; the template becomes their front end |

## 4. Before taking real orders

- Real contact details, return policy, terms of sale, privacy policy and legal notice required
  in your country.
- Taxes (VAT/sales tax) and shipping zones — the template has a single flat rate.
- Stock and size availability — the template shows every size as available.
- Replace the demo photos with your own (see [CREDITS.md](../CREDITS.md)).
- Analytics and cookie consent if you add tracking.
