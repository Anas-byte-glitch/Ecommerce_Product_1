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
Footer, product data. Later phases: 2 Home, 3 Shop + ProductCard/Grid, 4 Product page,
5 Cart (drawer, wiring the navbar badge), 6 About / Contact / Return policy, 7 polish & QA.

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
  config/site.js          brand name, year, nav + footer links, categories  (single source of truth)
  data/                   products.js (+ query helpers), faqs.js, reviews.js, team.js
  components/layout/      Layout, Navbar, NavItem, MobileMenu, CartButton, Logo, Footer,
                          NewsletterForm, ScrollToTop, PagePlaceholder
  components/ui/          Container, Button, Badge, Accordion, Reveal
  components/product/     ProductCard, ProductGrid, ... (Phase 3+)
  components/home/        Home page sections (Phase 2)
  pages/                  Home, Shop, ProductDetail, About, Contact, ReturnPolicy, NotFound
  store/cartStore.js      zustand cart (persisted to localStorage as "atlas-cart")
  utils/                  formatPrice.js, cn.js
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
- Scroll-in animation: wrap in `<Reveal>`. Respect reduced motion.
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
The local dev server can't go through that proxy — use a second browser without the proxy for
`localhost`.
