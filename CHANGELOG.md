# Changelog

All notable changes to this template are listed here. Versions follow
[semantic versioning](https://semver.org): 1.x updates stay compatible with your edits to
`src/config/site.js` and `src/data/`.

## [1.0.0] — 2026-10-01

First release.

### Pages
- Home: full-screen hero, "Now Trending", collection tiles, "New this season", brand story,
  "Everyday Essentials", perks, auto-scrolling Instagram strip.
- Shop: all / hoodies / shirts tabs, sorting (relevance, A–Z, Z–A, price, newest, best selling)
  kept in the URL.
- Product pages (`/product/<slug>`): two-photo gallery, size selector, size guide drawer,
  quantity, add to cart, trust badges, reviews, FAQ, related products.
- Cart drawer, cart page with free-shipping progress, demo checkout with validation and an order
  confirmation page (no payment, nothing stored).
- About, Contact (demo form), Return policy, 404.

### Features
- One settings file (`src/config/site.js`): brand name, currency format, flat / free shipping,
  return window, contact email, navigation and footer links, price display.
- Cart saved in the browser (`localStorage`).
- Responsive layout (phone / tablet / desktop), scroll animations that respect "reduce motion",
  keyboard and screen-reader support (axe-core check with zero violations).
- Self-hosted fonts (Inter, Jost, Abril Fatface), lazy-loaded pages and images.
- 42 demo photos as optimized WebP at 2–3 widths with `srcset`, built from `images.json` by
  `npm run images`; SVG placeholders as fallback. Credits in `CREDITS.md`.
- Generated favicon, social-sharing image, `robots.txt` and `sitemap.xml`.
- Hosting configuration for Vercel, Netlify and Apache / cPanel (`.htaccess` with SPA fallback,
  compression and caching); Nginx example in the docs.
- Step-by-step guides in `docs/`.
