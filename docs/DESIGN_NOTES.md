# Atlas — Design Notes (extracted from the reference)

Reference: https://atlas-template.framer.website/ (Framer template "Atlas").

**How these values were obtained (Phase 1, 2026-09-30):** the live site was rendered in headless
Chromium at 1440px (desktop), 1000px (tablet) and 390px (phone). Values below are
`getComputedStyle()` / `getBoundingClientRect()` readings from the rendered DOM plus the Framer
CSS tokens in the page source, and were cross-checked against screenshots. Anything that could not
be measured is marked **(unverified)**.

> Always read this file before styling anything. Tokens live in `src/index.css` (`@theme`).

---

## 1. Breakpoints (verified from the CSS `@media` rules)

| Name    | Range            | Tailwind prefix |
| ------- | ---------------- | --------------- |
| Phone   | 0 – 809px        | _(none, base)_  |
| Tablet  | 810 – 1199px     | `md:`           |
| Desktop | ≥ 1200px         | `lg:`           |

Tailwind's default breakpoints are **removed** in `src/index.css`; only `md` (810px) and `lg` (1200px)
exist. Write mobile-first: base = phone, `md:` = tablet, `lg:` = desktop.

## 2. Fonts

| Role                       | Family         | Source       | Notes |
| -------------------------- | -------------- | ------------ | ----- |
| UI / headings / body       | **Inter**      | Google Fonts | weights 400, 500, 600 (700 used for `<strong>` in policy headings) |
| Secondary body / lead text | **Jost**       | Google Fonts | weights 400, 500, 600 — hero subtitle, shop category tabs, "shop now" pill, qty number |
| Wordmark logo              | **Abril Fatface** | Google Fonts | 400, uppercase |

All three are the exact families used by the template (the woff2 files are served from
fonts.gstatic.com in the source) — no substitutes needed. Loaded in `index.html` via Google Fonts.

**Letter spacing is -0.03em on almost all text** (e.g. 16px → -0.48px, 42px → -1.26px).
Exceptions with `normal` tracking: footer column headings/copyright (14px/500), form inputs,
the "1" quantity label.

## 3. Type scale (font-size / line-height / weight), per breakpoint

| Token / usage                              | Desktop ≥1200     | Tablet 810–1199   | Phone ≤809        | Weight | Family | Color |
| ------------------------------------------ | ----------------- | ----------------- | ----------------- | ------ | ------ | ----- |
| H1 (hero, "The Story of Atlas", "Return Policy") | 56 / 1.1       | 48 / 1.1          | 36 / 1.1          | 600    | Inter  | white on image / `#000` |
| H2 section title ("Now Trending", …)       | 42 / 1.1          | 38 / 1.1          | 32 / 1.1          | 500    | Inter  | `#000` |
| H2 product title (PDP)                     | 36 / 1.1          | 28 / 1.1          | 24 / 1.1          | 500    | Inter  | `#000` |
| H2 collection tile ("Shirts"/"Hoodies")    | 32 / 1.3          | 30 / 1.3          | 24 / 1.3          | 500    | Inter  | white |
| H3 about values                            | 26 / 1.2          | 22 / 1.2          | 20 / 1.2          | 500    | Inter  | `#33383c` |
| H3 perks ("Free & Fast Shipping")          | 22 / 1.2          | 20 / 1.2          | 18 / 1.2          | 500    | Inter  | `#000` |
| Lead (hero subtitle, about paragraphs)     | 20 / 1.6          | 18 / 1.6          | 16 / 1.6          | 400    | Jost   | white / `#33383c` |
| Shop category tabs (All / Hoodies / Shirts)| 20 / 1.6          | 18 / 1.6          | 16 / 1.6          | 400    | Jost   | active `#000`, inactive `#6d6d6d` |
| Large body (FAQ question, "Size Guide")    | 18 / 1.4          | 18 / 1.4          | 18 / 1.4          | 400    | Inter  | `#000` |
| Body                                       | 16 / 1.5 (24px)   | same              | same              | 400    | Inter  | `#6d6d6d` (muted) / `#33383c` |
| Product card name                          | 16 / 1.5          | same              | same              | 500    | Inter  | `#000` |
| Button label (pill)                        | 16 / 1.5          | same              | same              | 500    | Inter  | — |
| Nav link                                   | 14 / 1.3 (18.2px) | same              | same (in menu)    | 500    | Inter  | `#09090b` |
| Small / label (footer heading, perk sub)   | 14 / 1.4 (19.6px) | same              | same              | 500    | Inter  | `rgba(255,255,255,.8)` / `#6d6d6d` |
| Form input / subscribe                     | 14 / 1.3          | same              | same              | 400    | Inter  | — |
| Badge ("Sale", "New in")                   | 10 / 1 (10px)     | same              | same              | 600    | Inter  | white on `#000` |
| Logo wordmark                              | 20 / 1            | 20 / 1            | 16 / 1            | 400    | Abril Fatface, uppercase | `#09090b` |

## 4. Color palette (Framer tokens → our Tailwind names)

| Hex / value            | Tailwind token      | Used for |
| ---------------------- | ------------------- | -------- |
| `#09090b`              | `ink`               | Nav text, logo, cart icon, subscribe text |
| `#000000`              | `black`             | Headings, badges bg, footer bg, primary button bg, hover underline |
| `#ffffff`              | `white`             | Page bg, nav bg |
| `#6d6d6d`              | `muted`             | Secondary body text, inactive tabs, "shop now" border |
| `#33383c`              | `slate`             | Body on about/PDP, "shop now" label, dark hover bg (Instagram btn) |
| `#f7f7f7`              | `surface`           | Hamburger button bg, PDP perk cards, qty stepper |
| `#f0f0f0`              | `surface-2`         | Placeholder image bg (card image area) |
| `#e6e6e6`              | `line`              | Nav bottom border (desktop/tablet) |
| `#3b3c3d`              | `field`             | Footer email input bg |
| `rgba(0,0,0,0.08)`     | `black/8`           | Hairline dividers on light bg |
| `rgba(0,0,0,0.32)`     | `black/32`          | "Sort by" label |
| `rgba(255,255,255,0.8)`| `white/80`          | Footer headings, copyright, footer-link hover |
| `rgba(255,255,255,0.1)`| `white/10`          | Footer dividers |

## 5. Radius

| Value   | Token          | Used for |
| ------- | -------------- | -------- |
| 0       | —              | Product images, badges, "Add to Cart" button, nav |
| 4px     | `rounded-sm`   | Inputs, subscribe button, size options, PDP perk cards, "Follow us on Instagram" |
| 8px     | `rounded-md`   | Large editorial images (Everyday Essentials) |
| 12px    | `rounded-lg`   | Nav inner wrapper (tablet/phone) |
| 999px   | `rounded-full` | Pill buttons (shop all / shop now / our story), PDP thumbnails (60px circles) |

## 6. Layout, container & spacing

- **Container:** `max-width: 1600px`, centered. Horizontal padding: **40px desktop / 32px tablet / 16px phone**
  (`px-4 md:px-8 lg:px-10`) → `Container` component.
- **Section vertical padding:** desktop **120px** (home product sections) or **100px** (most others),
  tablet **80px**, phone **64px**. Section inner stack: header block → content gap **64px**
  (48px for "Related items"). Header block: title → subtitle gap **16px**; subtitle max-width 320px, centered.
- **Product grid (home):** 4 columns desktop, gap **16px row / 8px column** (`gap-y-4 gap-x-2`). Card image
  aspect **4:5** (334×418 @1440). Shop page cards 448×560 (also 4:5), 3 columns.
- **Page top offset:** nav is `position: fixed`; hero sections sit *under* it (full-bleed image, 900px tall
  on desktop). Non-hero pages start with **100px** top padding (shop), 120px (PDP desktop), 140px (returns).
- Returns page content max-width **1000px**.

## 7. Navbar (verified)

- **Position:** `fixed`, top 0, full width, `z-index: 8`. Background **solid white** at all times —
  it is *not* transparent over the hero and there is **no** scroll-dependent change (verified at scroll 0 and 1200).
  No blur.
- **Desktop/tablet:** height **64px**, padding **20px 40px** (desktop) / **20px 32px** (tablet),
  bottom border **1px solid #e6e6e6**. Inner row 24px high, `justify-between`, items centered.
  - Left: links **Hoodies · Shirts · About Us · Contact**, gap **20px**, 14px/500 Inter, `#09090b`.
  - Center: wordmark "atlas" (rendered uppercase **ATLAS**), Abril Fatface 20px, absolutely centered.
  - Right: cart icon **24×24**, stroke 1.5, `#09090b`, with a 16×16 count-badge slot at its top-right
    (empty when cart is 0).
- **Link hover:** a **1px black underline** under the text grows from **left to right**
  (`scaleX 0 → 1`, origin left, ~300ms ease-out; measured 86% width after 100ms). Colour does not change.
- **Active link:** the template shows **no** distinct active style (the current-page link's underline stays at
  width 0). We keep the underline visible on the active route for usability (documented deviation).
- **Phone (≤809px):** height **72px**, padding **20px 16px**, no border but `box-shadow: 0 1px 2px rgba(0,0,0,.25)`.
  Row 32px high: logo left (16px), right group (gap 8px) = cart icon 24px + **hamburger 32×32**
  (bg `#f7f7f7`, radius 0) with two **20×2px black bars** at y=11 and y=19.
- **Mobile menu (open):** the nav panel itself expands downward (total height ≈ **225px**, white,
  same shadow). Bars animate into an **X** (both bars centered, ±45°, 16px). Links stacked below the row,
  top gap 20px, **gap 20px**, bottom padding 20px, 14px/500 Inter `#09090b`:
  **Hoodies · Shirts · Our Story · Contact Us** (note the different labels vs desktop).
  Clicking a link closes the menu.

## 8. Footer (verified)

- Black background (`#000`), text white. Inner container max-width 1600px.
- Padding: **100px 40px** desktop, **80px 32px** tablet, **64px 16px** phone.
- On desktop & tablet the footer wrapper is `position: sticky; bottom: 0; z-index: 1` (on phone: `relative`).
- **Newsletter block:** "Sign up to receive 10% off your first order" (16/24, white) → gap **24px** → form.
  Form: flex row, **gap 8px**, max width **400px** (full width on phone).
  - Email input: bg **#3b3c3d**, no border, radius **4px**, padding **16px**, 14px/1.3 Inter white,
    placeholder `name@email.com`, height 50px.
  - Submit "Subscribe": bg white, text `#09090b`, 14px/400, padding 16px, radius 4px,
    `box-shadow: 0 2px 4px rgba(0,0,0,.25)`, ~99px wide.
- **Link columns:** heading 14px/500 `white/80` (normal tracking) → gap **16px** → links 16/24 white,
  **gap 12px**. Link hover: colour → `white/80`.
  - Quick links: Home `/`, About Us `/about`, Shop Hoodies `/shop/hoodies`, Shop Shirts `/shop/shirts`
  - Pages: Contact Us `/contact`, Return Policy `/returns/return-exchange-policy`, 404 `/404`
  - Social: Twitter, Instagram, TikTok (external)
- **Divider:** 1px `rgba(255,255,255,.1)`.
- **Bottom:** "Copyright © 2025 - Atlas. All rights reserved." 14px/500 `white/80`.
- **Desktop layout:** row `justify-between`: newsletter (left, ~680px) | 3 columns (right, gap **48px**).
  Then gap 40 → divider → gap 40 → copyright.
- **Tablet layout:** stacked, gap **60px**: newsletter → divider → 3 equal columns (grid-cols-3);
  then gap 40 → divider → gap 40 → copyright.
- **Phone layout:** stacked, gap **40px**: newsletter → divider → 2-column grid (Quick links | Pages),
  Social wraps to the second row → divider → copyright.
- The template's "Use Template" / "Made in Framer" badges are Framer marketing — **not** replicated.

## 9. Buttons & badges

| Variant (our name) | Spec |
| ------------------ | ---- |
| `outline-light` pill (hero "shop all", "our story") | h 40px, px 20px, radius 999px, 1px **white** border, transparent bg, label 16/500 Inter white, gap 8px, 16px arrow-up-right icon |
| `light` pill ("shop now" on collection tiles) | h 40px, px 20px, radius 999px, white bg, 1px **#6d6d6d** border, label **Jost** 16/500 `#33383c`, 18px black arrow icon |
| Pill hover | the ↗ arrow icon **rotates 45°** to → (no colour change) |
| `primary` ("Add to Cart") | h 56px, px 24px, radius 0, bg black, label 16/400 white |
| `dark` small ("Follow us on Instagram") | px 12px, py 4px, radius 4px, bg black, 16px white; hover bg `#33383c` |
| Subscribe | see footer |
| Size option | h 40px, px 20px, radius 4px; selected = black bg/white text, else white bg/black text |
| **Badge** ("Sale", "New in") | h 24px, px 12px, radius 0, bg black, text 10px/600 white, tracking -0.03em; sits at the image's bottom-left corner, ≈10px inset from left and bottom |

## 10. Hover / motion

- Nav link underline: see §7.
- Product card: hover crossfades to the second image (first image opacity 1 → 0) and the second image
  **scales ~1.05** (334→351px). (Implementation in Phase 3.)
- Pill buttons: arrow rotate 45°.
- Framer "appear" animations on scroll exist (sections fade/slide in) — exact curves **(unverified)**;
  use `Reveal` (motion: opacity 0 → 1, y 24 → 0, ~0.6s ease-out, once).
- Mobile menu open/close timing **(unverified)**; we use ~300ms height/opacity transition.

## 11. Images (aspect ratios observed)

| Where | Size @1440 | Ratio |
| ----- | ---------- | ----- |
| Product card (home) | 334×418 | 4:5 |
| Product card (shop) | 448×560 | 4:5 |
| PDP main images     | 536×670 | 4:5 |
| Related items       | 322×403 | 4:5 |
| PDP thumbnails      | 60×60, radius 999px | 1:1 |
| Hero                | 1440×900 (full viewport) | 16:10 |
| Everyday Essentials editorial | 868×759, radius 8px | ~8:7 |

Placeholder images live in `public/images/products/*.svg` (neutral solid blocks, 4:5).

## 12. Content notes

- Product prices are **not rendered** in the public template (commerce component shows no prices),
  so prices in `src/data/products.js` are placeholders.
- "Free shipping on orders over $100" appears on the PDP.
- Brand name, year, and social URLs come from `src/config/site.js`.

## 13. Could not verify

- Exact easing/duration of Framer appear animations and the mobile-menu open animation.
- Cart count badge styling (the slot exists but is empty on the template with an empty cart) —
  we use a 16px black circle with 10px/600 white number.
- Tablet/phone product-grid column counts and spacing are to be re-measured in Phase 3.
