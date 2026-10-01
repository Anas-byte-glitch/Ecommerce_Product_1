# CLAUDE.md — Atlas Store

Project memory for every session. Read this file first, then `docs/DESIGN_NOTES.md`.

## Goal

A **frontend-only** e-commerce site (no backend) that replicates the layout, typography, spacing,
colours and interactions of the **"Atlas" Framer template**, using placeholder images and a
configurable brand name. Do **not** copy the template's images or copywriting assets — structural
labels (nav/footer link names, section titles) are fine; product photos are replaced by local
placeholders.

The build is split into 7 phases. Phase 1 (this foundation) is done:
research → `docs/DESIGN_NOTES.md`, project setup, design tokens, routing, Navbar, MobileMenu,
Footer, product data. Phases 2 (Home), 3 (Shop), 4 (Product page), 5 (cart drawer, /cart, demo checkout) and 6 (About,
Contact, Return policy, 404, newsletter) are done. Later phase: 7 polish & QA.

## No Shopify behaviour

The reference template is a Shopify-backed Framer site. This project is a standalone frontend store:
never mimic Shopify plumbing (variant IDs, `?variant=` URLs, disabled cart controls, Shopify wording).
Cart = local zustand store; Add to Cart adds the line, opens the drawer and updates the badge.
Checkout is UI only (in-memory order, no payment).

## Golden rule

**Always read `docs/DESIGN_NOTES.md` before styling anything.** Every size, colour, spacing and
breakpoint there was measured from the live site. If you need a value that isn't there, measure it
from the reference (see "Measuring the reference" below) and add it to the notes — never guess.

## Stack

- Vite 8 + React 19 (JavaScript / JSX, no TypeScript)
- Tailwind CSS v4 via `@tailwindcss/vite` — tokens in `src/index.css` `@theme` (no `tailwind.config.js`)
- react-router-dom v7 (`BrowserRouter`), motion (`motion/react`), zustand (+ `persist`), lucide-react

```bash
npm install
npm run dev       # dev server (http://localhost:5173)
npm run build     # must pass with no errors before every commit
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Folder structure

```
src/
  config/site.js          brand name, year, nav + footer links, categories, contactEmail,
                          returnWindowDays (30 — use it wherever a return window appears)
  data/                   products.js (+ query helpers incl. getProductsBySlugs, SORT_OPTIONS, sortProducts;
                          array order = Relevance; salesRank = Best Selling), perks.js, faqs.js,
                          reviews.js (+ avatar placeholders), sizeGuide.js, team.js (+ portraits),
                          about.js (About paragraphs + mission blocks);
                          perks.js also exports productPerks (PDP trust tiles)
  components/layout/      Layout, Navbar, NavItem, MobileMenu, CartButton, Logo, Footer,
                          NewsletterForm, ScrollToTop, PagePlaceholder
  components/ui/          Container, Button, Badge, Accordion, Reveal, SectionHeader (centered title+subtitle),
                          HeroImage (full-bleed hero image with the reference appear effect),
                          Drawer (right panel on native <dialog>: focus trap, Esc, backdrop click, scroll lock)
  components/product/     ProductCard (4:5 image, hover swap/zoom, badge, optional price),
                          ProductGrid (1-col grid, add md:/lg: columns via className; `gap` prop)
  components/product/     (PDP) ProductGallery, ProductInfo, SizeSelector (native radios),
                          QuantityStepper, SizeGuideDrawer (native <dialog>), TrustBadges, ProductFaq,
                          HappyCustomers + ReviewCard, RelatedProducts
  components/shop/        CategoryTabs (text-link tabs), SortSelect (native select under a styled label)
  components/home/        Hero, NowTrending, CategoryCards(+CategoryCard), NewThisSeason, BrandStory,
                          EverydayEssentials, WhyCustomersLoveUs, InstagramStrip; shared pieces:
                          HomeSection (padding + header), ProductRow (titled grid)
  assets/placeholders/    hero, category-*, story, essentials, instagram-1..6 (neutral SVGs, imported)
  pages/                  Home, Shop, ProductDetail, Cart, Checkout, CheckoutSuccess, About, Contact,
                          ReturnPolicy, NotFound
  store/cartStore.js      zustand cart, persisted ("atlas-cart", items only; unknown slugs dropped on load):
                          items [{slug,size,quantity}], addItem(slug,size,qty) merges slug+size,
                          updateQuantity(slug,size,qty) (1–10), removeItem(slug,size), clearCart,
                          isDrawerOpen / openDrawer / closeDrawer (not persisted);
                          selectors selectCount/selectSubtotal/selectShipping/selectTotal;
                          helpers getCartLines(items), getTotals(items), getShipping, lineTotal,
                          getFreeShippingRemaining
  store/orderStore.js     lastOrder (memory only) + createOrderId() → "ATL-XXXXXX"
  components/cart/        CartDrawer, CartLine, OrderSummary, OrderLines, FreeShippingNote, EmptyCart
  components/checkout/    Field (label + input + inline error), validateCheckout
  components/about/       AboutSection (6-col grid: label 2 cols, content 4)
  components/contact/     ContactForm, validateContact (+ isValidEmail, also used by the newsletter)
  utils/                  formatPrice.js, cn.js, motion.js (appearEase)
  index.css               Tailwind import + @theme tokens + base styles
public/images/products/   placeholder SVGs: <slug>-1.svg (main), <slug>-2.svg (hover/alt), 4:5
docs/DESIGN_NOTES.md      extracted design system (read before styling)
reference/                screenshots of the reference when needed
```

## Routes (identical to the template)

| Path | Page |
| ---- | ---- |
| `/` | Home |
| `/shop/all`, `/shop/hoodies`, `/shop/shirts` | Shop (`:category` param; unknown category → 404) |
| `/atlas/:slug` | ProductDetail (unknown slug → 404) |
| `/about`, `/contact` | About, Contact |
| `/returns/return-exchange-policy` | ReturnPolicy |
| `/cart`, `/checkout`, `/checkout/success` | Cart, Checkout (empty cart → /cart), CheckoutSuccess (no order → /) — ours, not in the template |
| `*` (incl. `/404`) | NotFound |

All routes render inside `Layout` (Navbar + `<main>` + Footer). `ScrollToTop` resets scroll on
pathname change.

## Code conventions

- Function components only, one component per file, default export, PascalCase filenames.
- **Tailwind utilities only — no inline `style` props, no CSS modules.** Put new design tokens
  in `@theme` in `src/index.css`; custom one-off values use arbitrary values (`text-[42px]`).
- **Mobile-first.** Base classes = phone (≤809px), `md:` = tablet (≥810px), `lg:` = desktop (≥1200px).
  Tailwind's default breakpoints (`sm`, `xl`, `2xl`) are **disabled** — don't use them.
- Use the tokens: colours `ink black white muted slate surface surface-2 line field`,
  fonts `font-sans` (Inter) / `font-jost` / `font-logo` (Abril Fatface),
  text `text-badge text-nav text-small text-body text-body-lg`, utilities `heading-1 heading-2 lead`,
  `max-w-site` (1600px), radii `rounded-sm` (4) / `rounded-md` (8) / `rounded-lg` (12) / `rounded-full`,
  easing `ease-out-soft`.
- Letter-spacing −0.03em is applied globally to every element; use `tracking-normal` where the
  reference uses normal tracking (footer headings, inputs).
- Page width/gutters: wrap content in `<Container>` (max 1600px, px 16/32/40).
- The navbar is **fixed** (72px phone / 64px tablet+desktop) and overlays content: heroes sit under
  it; other pages add their own top padding (template uses ~100px).
- Brand name/year/links come from `src/config/site.js` — never hard-code "Atlas".
- Prices: always render through `formatPrice()`.
- Buttons: use `<Button variant=…>` (`outline-light`, `light`, `primary`, `dark`, `subscribe`);
  pass `to` for internal links, `href` for external. Badges: `<Badge>Sale</Badge>`.
- Scroll-in animation: wrap in `<Reveal>` (props: `y`, `scale`, `delay`, `duration`, `ease`,
  `transition`). Respect reduced motion. Only add one where the reference has an appear effect.
- Scroll-linked image effects use CSS scroll-driven animations, not JS: put `zoom-timeline` on the
  clipping frame and `zoom-on-scroll` on the image layer inside it (scale 1.2 → 1); `tilt-timeline` /
  `tilt-on-scroll` for the brand-story banner. They no-op without browser support or with reduced motion.
- Marquee: `animate-marquee` on a `w-max` list containing 3 copies of the items (translates −1/3).
- `site.showPrices` toggles card prices (the template has none — documented deviation).
- Shop sort state lives in the URL (`?sort=title_asc` …, reference values); tabs reset it.
- Accordion: multi-open grey cards (reference behaviour); pass `items=[{question, answer}]`.
- Drawers: use `ui/Drawer` (header styling via props). Cart drawer opens via `openDrawer()`.
- Buttons also have `secondary` (outlined 56px) and `plain` (white, borderless, Jost) variants.
- Pricing: `site.freeShippingThreshold` / `site.flatShipping`; always compute totals with the
  cartStore helpers. Cart/checkout always show prices, whatever `site.showPrices` says.
- Checkout is a demo: never add card-number fields.
- ProductGrid/ProductCard accept `badge` to force a badge label (related items: "New in").
- `Hero` (home) takes `image/title/subtitle/cta` and is reused by the 404 page.
- `<main>` has no min height (matches the reference); short pages show the footer right after.
- Section H2s use Inter alternates (`heading-2` includes them; `font-heading-alt` / `font-badge-alt`
  elsewhere) — no-ops with the Google-hosted Inter, see DESIGN_NOTES §19.
- Forms are demos: Contact and the newsletter validate and confirm but never send anything.
- Home section vertical padding: `HomeSection` (64/80/120, or `compact` for 64/80/100).
- Accessibility: real `<button>`/`<a>`, labels for inputs (`sr-only` if hidden), `aria-*` on toggles.
- Small, meaningful commits; `npm run build` must pass before each commit.

## Reference URLs

- Home: https://atlas-template.framer.website/
- Shop: https://atlas-template.framer.website/shop/hoodies (also `/shop/all`, `/shop/shirts`)
- Product: https://atlas-template.framer.website/atlas/zipper-hoodie
- About: https://atlas-template.framer.website/about
- Contact: https://atlas-template.framer.website/contact
- Returns: https://atlas-template.framer.website/returns/return-exchange-policy

Framer renders separate Desktop / Tablet / Phone variants of each section, so text appearing 2–3×
in the raw HTML is not real duplication.

## Measuring the reference

The site is reachable from the cloud container. Raw HTML: `curl -sS <url>`. For computed styles,
render it with the pre-installed Playwright Chromium (global module at
`/opt/node22/lib/node_modules/playwright`). The HTTPS proxy re-signs TLS, so trust its CA
explicitly (never disable TLS checks):

```js
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'
// SPKI hash of /root/.ccr/agent-proxy-ca.crt:
//   openssl x509 -in /root/.ccr/agent-proxy-ca.crt -pubkey -noout | openssl pkey -pubin -outform der \
//     | openssl dgst -sha256 -binary | base64
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  proxy: { server: process.env.HTTPS_PROXY },
  args: [`--ignore-certificate-errors-spki-list=${SPKI_HASH}`],
})
```

Measure at 1440 / 1000 / 390px widths with `getComputedStyle` + `getBoundingClientRect`.
For `localhost` use the same launch but add `bypass: 'localhost,127.0.0.1'` to `proxy` and
`--proxy-bypass-list=<-loopback>;localhost;127.0.0.1` to `args`: the local page must still reach Google
Fonts through the proxy, otherwise fallback fonts make every text width wrong.
Tips: the reference names its layers (`data-framer-name`) — query by those; its appear effects are in
the `__framer__appearAnimationsContent` JSON in the page source; compare by text content (same string →
same box) and with `showPrices: false` for exact heights.
