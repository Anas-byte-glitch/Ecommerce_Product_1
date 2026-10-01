# Atlas Store

A **frontend-only e-commerce store** built with React, Vite and Tailwind CSS. Its layout,
typography, spacing and interactions replicate a reference design (the "Atlas" Framer template),
measured element by element at 1440 / 1000 / 390px. Product photos are neutral placeholders and
the brand, currency, prices and shipping rules are configurable.

It is a complete storefront UI — home, shop with sorting, product pages, cart drawer, cart page,
a demo checkout, about / contact / returns / 404 — but **there is no backend** (see
[What is not included](#what-is-not-included)).

## Stack

- [Vite 8](https://vite.dev) + [React 19](https://react.dev) (JavaScript/JSX)
- [Tailwind CSS v4](https://tailwindcss.com) (design tokens in `src/index.css`)
- [React Router 7](https://reactrouter.com) · [Motion](https://motion.dev) (hero/accordion
  animations) · [Zustand](https://zustand.docs.pmnd.rs) (cart, persisted to `localStorage`) ·
  [Lucide](https://lucide.dev) icons
- Self-hosted fonts: Inter ([`inter-ui`](https://www.npmjs.com/package/inter-ui)), Jost and
  Abril Fatface ([Fontsource](https://fontsource.org))
- [oxlint](https://oxc.rs) for linting, [axe-core](https://github.com/dequelabs/axe-core) for the
  accessibility check

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev       # development server → http://localhost:5173
npm run build     # production build in dist/ (also regenerates SEO files, see below)
npm run preview   # serve the production build → http://localhost:4173
npm run lint      # oxlint
npm run seo       # regenerate public/favicon.svg, og-image.svg, robots.txt, sitemap.xml
npm run a11y      # axe-core check of every route (run `npm run preview` first; needs Playwright)
```

## Folder structure

```
src/
  config/site.js        store settings — the single source of truth (see below)
  data/                 products, FAQs, reviews, team, perks, size guide, About copy
  pages/                one component per route (all lazy-loaded except Home)
  components/
    layout/             Layout (skip link, navbar, main, footer, cart drawer), Navbar, Footer, …
    ui/                 Button, Badge, Container, Drawer, Accordion, Reveal, HeroImage, …
    home/ shop/ product/ cart/ checkout/ about/ contact/   page sections
  store/                cartStore.js (persisted cart), orderStore.js (last order, memory only)
  hooks/                useDocumentTitle
  utils/                formatPrice, cn, motion constants
  styles/fonts.css      self-hosted @font-face rules
  assets/placeholders/  neutral SVG placeholders (hero, collections, team, …)
public/
  images/products/      product placeholders: <slug>-1.svg (main) and <slug>-2.svg (hover)
  _redirects            Netlify SPA rewrite
scripts/                generate-seo.mjs, a11y-check.mjs
docs/DESIGN_NOTES.md    measured design system + list of deliberate deviations
CLAUDE.md               conventions for AI-assisted sessions on this repo
vercel.json             Vercel SPA rewrite
```

## Store settings

Everything store-specific lives in **`src/config/site.js`**:

| Setting | Example | Used for |
| --- | --- | --- |
| `brandName` | `'Atlas'` | wordmark (uppercase, Abril Fatface), page titles, footer, About copy, order numbers, meta tags, favicon |
| `tagline`, `description` | | Home hero, page title of Home, meta description |
| `contactEmail` | `'support@atlas.com'` | returns page, contact confirmation |
| `siteUrl` | `'https://www.example.com'` | sitemap, robots.txt, canonical and Open Graph URLs |
| `currency` | `{ code: 'USD', symbol: '$', position: 'before', decimals: 2, locale: 'en-US' }` | every price via `formatPrice()` — e.g. `{ code: 'DZD', symbol: 'DA', position: 'after', decimals: 0, locale: 'fr-DZ' }` gives `6 900 DA` |
| `shipping` | `{ flat: 8, freeThreshold: 100 }` | cart/checkout totals and the "Add X more for free shipping" message |
| `returnWindowDays` | `30` | returns page, Home perk, product trust tile |
| `showPrices` | `true` | prices on product cards / product page (cart and checkout always show prices) |
| `nav`, `mobileNav`, `footer`, `instagram`, `year` | | navigation, footer links, copyright |

After changing the brand name or `siteUrl`, run `npm run seo` (or just `npm run build`) to
regenerate the favicon, OG image, robots.txt and sitemap.

## Adding a product

1. Add two images to `public/images/products/`: `<slug>-1.svg` (main) and `<slug>-2.svg` (shown on
   hover), portrait **4:5** (e.g. 800×1000). Any format works if you change the paths.
2. Add an entry to `products` in `src/data/products.js`:

   ```js
   {
     slug: 'linen-shirt',            // URL: /atlas/linen-shirt
     name: 'Linen shirt',
     category: 'shirts',             // 'hoodies' | 'shirts' (see `categories` in site.js)
     price: 59,                      // in site.currency
     compareAtPrice: 75,             // or null — shown struck through when higher than price
     badge: 'Sale',                  // 'Sale' | 'New in' | null
     images: img('linen-shirt'),     // → ['/images/products/linen-shirt-1.svg', '…-2.svg']
     sizes: SIZES,                   // ['S', 'M', 'L']
     description: 'Two or three sentences shown on the product page.',
     salesRank: 10,                  // lower = better seller ("Best Selling" sort)
     createdAt: '2025-04-01',        // "Newest" sort
   },
   ```

   Array order is the "Relevance" order on the shop pages. To feature it on Home, add its slug to
   the lists in `src/components/home/NowTrending.jsx`, `NewThisSeason.jsx` or
   `EverydayEssentials.jsx`.
3. Run `npm run seo` to add it to the sitemap.

## Deploying

The build is a static site (`dist/`) with client-side routing, so every path must fall back to
`index.html`. Both configurations are included:

- **Vercel** — import the repository; framework preset "Vite" (build `npm run build`, output
  `dist`). `vercel.json` rewrites all paths to `/index.html`.
- **Netlify** — build command `npm run build`, publish directory `dist`. `public/_redirects`
  (`/* /index.html 200`) is copied into the build.

Set `siteUrl` in `site.js` to the real domain before deploying.

## What is not included

- **No backend** — there is no server, database or API.
- **No real payments** — the checkout is a demo: it validates the form and shows a confirmation,
  but takes no payment and never asks for card details.
- **Orders are not saved** — the confirmed order exists only in memory until the page is reloaded.
- **The cart lives only in the browser** (`localStorage`); it is not shared between devices.
- **The contact form and the newsletter signup do not send anything** — they validate and show a
  success message only.
- No user accounts, inventory, taxes or discount codes. Product images are placeholders.

## Next steps to make it a real store

1. **Payments and orders** — connect a payment provider (e.g. Stripe Checkout) and an order store
   (a small backend, serverless functions or a hosted commerce API), then replace the demo submit
   in `src/pages/Checkout.jsx`.
2. **Forms** — send the contact form and newsletter to a form or email service (e.g. Formspree,
   a mailing-list provider) in `ContactForm.jsx` and `NewsletterForm.jsx`.
3. **Catalogue** — real product photography and data (or load products from a CMS/commerce API
   instead of `src/data/products.js`), real stock and size availability.
4. **Legal and ops** — real contact details, returns policy, privacy policy, analytics/consent.

## Documentation

- `docs/DESIGN_NOTES.md` — every measured value from the reference, per page, plus a table of all
  deliberate deviations.
- `CLAUDE.md` — coding conventions and project memory.
