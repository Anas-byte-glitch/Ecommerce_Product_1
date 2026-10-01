# Design Notes (extracted from the reference "Atlas" template) — INTERNAL, not shipped

Reference: https://atlas-template.framer.website/ (Framer template "Atlas").

> Phase 9: our store is now branded **Halvo** (wordmark "halvo", 63.6px wide at 20px vs 60.1px for
> "atlas"; 50.9 vs 48.1 at 16px), product pages moved to `/product/:slug` (sections below still
> say `/atlas/:slug`, the reference URL), products renamed: Black basic tee, White everyday crew
> tee, Cream relaxed crew tee, Red studio tee. Photos come from Pexels (images.json), cropped to
> the slot ratios below, so page heights are unchanged (internal/heights-before/after.json).

**How these values were obtained (Phase 1, 2026-09-30):** the live site was rendered in headless
Chromium at 1440px (desktop), 1000px (tablet) and 390px (phone). Values below are
`getComputedStyle()` / `getBoundingClientRect()` readings from the rendered DOM plus the Framer
CSS tokens in the page source, and were cross-checked against screenshots. Anything that could not
be measured is marked **(unverified)**.

> Always read this file before styling anything.
>
> The reference template relies on Shopify for cart and checkout; this project intentionally does not
> (standalone frontend store with a local, persisted cart). Copy the reference's look, never its
> commerce plumbing. Tokens live in `src/index.css` (`@theme`).

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
| UI / headings / body       | **Inter**      | `inter-ui` (npm, self-hosted) | weights 400, 500, 600, 700 (700 for policy headings) |
| Secondary body / lead text | **Jost**       | `@fontsource/jost` | weights 400, 500, 600 — hero subtitle, shop category tabs, "shop now" pill, qty number |
| Wordmark logo              | **Abril Fatface** | `@fontsource/abril-fatface` | 400, uppercase |

All three are the exact families used by the template — no substitutes. Since Phase 7 they are
**self-hosted** (`src/styles/fonts.css` + imports in `main.jsx`, `font-display: swap`, critical files
preloaded by the Vite plugin). Inter is the full rsms build, which keeps the OpenType alternates the
reference uses (see §19) — the Google-hosted Inter used before did not.

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
| 0       | —              | Badges, "Add to Cart" button, nav |
| 4px     | `rounded-sm`   | Product card images, collection tiles, Instagram tiles, inputs, subscribe button, size options, PDP perk cards, "Follow us on Instagram" |
| 8px     | `rounded-md`   | Large editorial images (Everyday Essentials) |
| 12px    | `rounded-lg`   | Nav inner wrapper (tablet/phone) |
| 999px   | `rounded-full` | Pill buttons (shop all / shop now / our story), PDP thumbnails (60px circles) |

## 6. Layout, container & spacing

- **Container:** centered, horizontal padding **40px desktop / 32px tablet / 16px phone**
  (`px-4 md:px-8 lg:px-10`) → `Container` component. Above 1600px see §20: content max **1600px**
  (box 1680, `max-w-site-wide`) for home/shop/product sections; `narrow` = box max 1600 (About).
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
| `primary` ("Add to Cart") | h 56px, px 24px, radius 0, bg black, label 16/400 white; hover bg `#424242` |
| `dark` small ("Follow us on Instagram") | px 12px, py 4px, radius 4px, bg black, 16px white; hover bg `#33383c` |
| Subscribe | see footer |
| Size option | h 40px, px 20px, radius 4px; selected = black bg/white text, else white bg/black text |
| **Badge** ("Sale", "New in") | h 24px, px 12px, radius 0, bg black, text 10px/600 white, tracking -0.03em; sits at the image's bottom-left corner, ≈10px inset from left and bottom |

## 10. Hover / motion

- Nav link underline: see §7.
- Product card: hover crossfades to the second image (first image opacity 1 → 0) and the second image
  **scales ~1.05** (334→351px). See §15.2.
- Pill buttons: arrow rotate 45°.
- Framer "appear" animations: on the home page **only the hero** has them (values read from
  `__framer__appearAnimationsContent`, see §15.1). Other sections have scroll-*linked* effects instead (§15).
  `Reveal` default (opacity 0 → 1, y 24 → 0, 0.6s) remains for pages where we choose to add one.
- Mobile menu open/close timing **(unverified)**; we use ~300ms height/opacity transition.

## 11. Images (aspect ratios observed)

| Where | Size @1440 | Ratio |
| ----- | ---------- | ----- |
| Product card (home) | 334×418 | 4:5 |
| Product card (shop) | 448×560 | 4:5 |
| PDP main images     | 536×670 | 4:5 |
| Related items       | 322×403 | 4:5 |
| PDP thumbnails      | 60×60, radius 999px | 1:1 |
| Hero                | 1440×900 (100vh; source 3:2, cover) | — |
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
- Home product grids: verified (§15.2). Shop grids: verified (§16.4).

## 14. Deliberate deviations (Phase 2)

- **Prices on product cards.** The template shows no prices. `ProductCard` renders a 14px `muted` price
  (plus struck-through compare-at price when on sale) 4px under the name, controlled by
  `site.showPrices` in `src/config/site.js` (default `true`). With `showPrices: false` the home page
  matches the reference height exactly; with prices on, each card row is 19.6px taller.
- **"shop all" (hero)** links to `/shop/all`; the reference links to `/`.
- **Whole card is one link.** On the reference only the image is a link (the name is plain text), so hover
  triggers only over the image. We wrap image + name in one `<Link>` (one tab stop, bigger target); hover
  therefore also triggers over the name.
- Images are local neutral SVG placeholders (`src/assets/placeholders/`, `public/images/products/`).

## 15. Home page (measured Phase 2 at 1440 / 1000 / 390, viewport height 900)

Section order: Hero → Now Trending → Collections → New this season → Brand story → Everyday Essentials →
Why Customers Love Us → Instagram strip → (sticky footer). Total `<main>` height with prices off:
**6705 / 7720 / 11446px** — identical in our build.

### 15.1 Hero
- Height: desktop **100vh**, tablet **aspect-ratio 1.29667** (1000 → 771px), phone **88vh**; always
  **min-height 700px**. Sits under the fixed navbar (starts at y=0). Image `object-fit: cover`.
- Overlay gradient: desktop `linear-gradient(transparent 0%, rgba(0,0,0,.4) 38.21%, rgba(0,0,0,.6) 100%)`;
  tablet/phone `linear-gradient(rgba(0,0,0,.4) 0%, rgba(0,0,0,.36) 72.44%, rgba(0,0,0,.6) 100%)`.
- Copy is bottom-aligned. Padding: desktop 80 top/bottom, 40 left (content max 600px); tablet 70/60,
  left 40 + inner 32 → text at x=72; phone 80/80, left 16 + inner 16 + content 40px each side, text
  **centered** (the block is therefore 8px right of true center, as on the reference).
- Stack: H1 → 16px → lead (max-width 360px) → 24px → `outline-light` "shop all" (119×40).
- Appear effects (Framer data): image opacity 0 → 1 + **scale 1.2 → 1**, spring (bounce 0, 0.8s),
  **delay 1s**. H1 / lead / button: opacity 0 → 1 + **y 20 → 0**, tween 1s,
  ease `cubic-bezier(.12,.23,.5,1)`, delays **2.0 / 2.1 / 2.2s**.

### 15.2 Product sections (Now Trending, New this season) & ProductCard
- Section padding **120 / 80 / 64px** vertical, container gutters 40 / 32 / 16. Header → grid gap **64px**.
- Header: H2 (42/38/32, lh 1.1) → 16px → subtitle 16/24 `muted`, max-width 320px, centered.
- **Static grid** at every breakpoint (no slider, arrows, drag or auto-scroll): **4 / 2 / 1 columns**,
  gap **16px row / 8px column**. Card widths 334 / 464 / 358px. Now Trending's 5th card wraps to row 2.
- Card: image **4:5, radius 4px**, bg `surface-2` → 16px → text block (min 28px: name 16/24 w500 black;
  the reference reserves a 4px gap + empty slot under it) .
- Badge: bottom-left, 10px inset (§9). Now Trending shows "Sale" on all 5; **New this season and
  Everyday Essentials show no badges.**
- Hover (measured over time): top image opacity 1 → 0 in ~200ms; the underlying alternate image grows
  334×418 → **351×438 (×1.05)** in ~200–300ms (spring, tiny overshoot). We use 200ms opacity +
  300ms `ease-out-soft` scale.

### 15.3 Collections (Shirts / Hoodies)
- Full-bleed (no gutters), **8px gap**; side by side on tablet/desktop, stacked on phone.
- Tile aspect **1.1429 (≈8:7)**: 716×626 / 496×434 / 390×341. Radius 4px, overflow clipped.
- Overlay `linear-gradient(#000 0%, rgba(0,0,0,.2) 32.69%)` (black at the top fading to 20%).
- Text: desktop/tablet title top-left and `light` "shop now" bottom-left (`space-between`), inset
  top/bottom **20 / 16px**, left **40 / 32px**. Phone: title and button stacked at the bottom, **gap 24px**,
  inset 16px. Title 32/30/24px, lh 1.3, w500, white (`heading-tile`).
- **No hover effect** on the tile (checked image, overlay filter, button — nothing changes except the
  pill arrow rotation).
- **Scroll-linked zoom:** image scale **1.2 → 1** linearly while the tile goes from "top enters viewport
  bottom" to "bottom enters viewport bottom" (motion offset `["start end","end end"]`). Image box is
  101% of the tile. Implemented with CSS scroll-driven animation (`zoom-timeline` / `zoom-on-scroll`,
  `animation-range: entry`).

### 15.4 Brand story banner
- Image band (no plain-colour band), height **70vh** at all breakpoints (630px @900).
- Image layer is **110%** of the band (inset −5%) with a scroll-linked effect over the band's whole pass
  through the viewport (`["start end","end start"]` = `cover`): `perspective(2000px) scale(1.2)
  rotateX(10deg)`, opacity **0.8** → flat, scale 1, opacity 1. Progress is non-linear (fast start);
  keyframes fitted from readings: 10% → .85, 30% → .55, 50% → .24, 70% → .10, 90% → .04 of the start
  offset (`tilt-settle` in `index.css`). Our readings match the reference within ~3px at every sampled scroll.
- No overlay. Copy: H2 32/30/24 lh 1.3 white, max-width 600px. Bottom padding **20px**, gutters 40
  (desktop **and tablet**) / 16 + 16 inner padding (phone).
- Desktop: heading left, `outline-light` "our story" right, bottom-aligned. Tablet: button under the
  heading, **gap 16px**; phone **gap 10px**.

### 15.5 Everyday Essentials
- Same section/header spacing as 15.2 (120/80/64). Below the header: **image | 2×2 grid, gap 40px**,
  two equal halves (660 + 660 @1440; 448 + 448 @1000). The image stretches to the grid height
  (919 / 654px), radius **8px**, same scroll-linked 1.2 → 1 zoom as 15.3.
- Grid: 2 columns (cards 326 / 220px), gap 16 / 8. Phone: image full width with
  **aspect-ratio 0.650909** (358×550), 40px, then a 1-column list.

### 15.6 Why Customers Love Us
- Section padding **100 / 80 / 64px**; header as 15.2, then 64px.
- Desktop: one row of 4 equal columns, **gap 24px**, 1px `black/8` **vertical** rules between them
  (full row height). Tablet: 2×2 grid, gap 24px, equal row heights, **no rules**. Phone: stacked, gap 24px,
  1px **horizontal** rules between items.
- Item: icon 24px → 24px → title (22/20/18px, lh 1.2, w500 black) → 10px → text 16/24 `muted`.
- Icons on the reference are **Phosphor (regular)**: Truck, Headset, ClockCounterClockwise,
  ShieldCheck; stroke 1.5, colour `rgba(0,0,0,.8)`. We use lucide `Truck`, `Headset`, `RotateCcw`,
  `ShieldCheck` at 24px / stroke 1.5 / `text-black/80`.

### 15.7 Instagram strip
- Container padding-top **100 / 80 / 64px**, no bottom padding (footer follows).
- **Auto-scrolling marquee**, right → left at **100px/s**, linear, **no pause on hover**, no arrows.
  Tiles **360×380** (same at every breakpoint), radius 4px, 16px apart (376px pitch). Loop of 6 images
  (2256px). Edges faded with `mask-image: linear-gradient(to right, transparent 0%, #000 12.5%,
  #000 87.5%, transparent 100%)`.
- "Follow us on Instagram" (`dark` button, 188×32) is absolutely centered on the whole block
  (padding included): top 50% / left 50% / translate −50%.

## 16. Shop pages `/shop/all`, `/shop/hoodies`, `/shop/shirts` (measured Phase 3)

All three exist on the reference (HTTP 200) and share one layout. `<title>` is the same
site-wide template title on every page, so we set no per-page title.
No appear animations, no re-animation on tab/sort change, **no pagination / "load more"** (all
products render). No badges on shop cards.

### 16.1 Layout
- Section padding: top **100px** at every breakpoint (under the fixed navbar); bottom **100 / 80 / 64px**;
  gutters 40 / 32 / 16 (`Container`).
- Header (same as home section headers): H2-style title 42/38/32 → 16px → subtitle max 320px, centered.
  We render it as an `<h1>`.
- Header → toolbar **64px**; toolbar → grid **32px**.
- Toolbar: desktop/tablet one row, `space-between` (tabs left, sort right, vertically centered);
  phone stacked, **gap 16px**, left-aligned (tabs row 26px, then sort 24px).

### 16.2 Category tabs
- Plain text links (no pill/background/border): **Jost 20 / 18 / 16px, lh 1.6** (`lead`), **gap 16px**,
  weight 400. Active `#000`, inactive `muted #6d6d6d`, hover → `#000`. Row has `overflow: auto`
  (never overflows at 390px: 136px wide). Links go to `/shop/<cat>` without the query string.
- **Reference bug not copied:** its tablet/phone variants hard-code "Shirts" as active (e.g. on /shop/all
  at 1000px "All" is grey and "Shirts" black; on /shop/hoodies both "Hoodies" and "Shirts" are black).
  We always highlight the current category.

### 16.3 Sort control
- **Native `<select>`** (appearance auto, font 12px) with **opacity 0**, absolutely stretched over a
  styled label, `cursor: pointer`. The open list is therefore the browser/OS menu — no custom panel,
  no open/close animation. Hovering changes nothing.
- Label: "Sort by" 16/24 `rgba(0,0,0,.32)` → **6px** → current option 16/24 `slate #33383c` → **8px** →
  a 20×20 icon slot. The slot renders **empty** on the reference (broken icon component); we show a
  lucide `ChevronDown` 20px stroke 1.5 there (deliberate deviation). Whole control 24px high,
  right-aligned (its width follows the label: 159px for "Relevance").
- Options / values: Relevance `relevance`, A-Z `title_asc`, Z-A `title_desc`, Price (lowest first)
  `price_asc`, Price (highest first) `price_desc`, Newest `newest`, Best Selling `best_selling`.
- Choice is kept in the URL: `?sort=<value>` (Relevance → no param). The reference updates the URL but
  **does not actually reorder** its products (sorting isn't wired up in the template demo); ours sorts.
- Focus: keyboard focus on the invisible select draws a 2px black outline around the label.

### 16.4 Product grid
- `/shop/hoodies`, `/shop/shirts`: **4 / 2 / 1 columns, gap 24px** (both axes). Cards 322 / 456 / 358px
  wide (image 4:5, e.g. 322×403).
- `/shop/all`: **3 / 2 / 1 columns, gap 16px row / 8px column** (like home). Cards 448 / 464 / 358px.
- Card as §15.2 (hover swap + zoom), no badges.
- Product counts: all 9, hoodies 4, shirts 5. Relevance order = reference /shop/all order:
  Classic comfort hoodie, Zipper hoodie, Fleece hoodie black, Chill vibes tee, Black atlas tee,
  White atlas graphic tee, Cream atlas graphic tee, Red atlas tee, Fleece hoodie white.
- Page heights with prices off match the reference exactly (e.g. 1355 / 2301 / 2978 for shirts).
  (Phase 6 removed `<main>`'s `min-h-screen`, which had made /shop/hoodies 900 instead of 885 at 1440×900.)

## 17. Product page `/atlas/:slug` (measured Phase 4)

`<title>` on the reference: "<product name> - My Framer Site" → we set "<name> - <site.name>".
All 9 products share one structure: 2 gallery images, sizes S, M, L (first one preselected), no badge,
no price. Descriptions are the reference copy (in `products.js`). `<main>` stacks the sections with a
**10px gap**. Page heights with prices off match exactly: **3949 / 6485 / 6694px**.

### 17.1 Layout & gallery
- Top section padding: **120 40 100** desktop / **80 32 80** tablet / **80 16 64** phone.
- Desktop: row, max-width **1120px** centered, **gap 48px**, two equal columns (536px). Left: the 2 images
  **stacked, 8px apart**, each a **4:5 frame** (536×670), `object-fit: cover`, no radius. No slider, dots,
  thumbnails, zoom or lightbox; images are not clickable.
- Right column is **sticky, top 100px**, contents 500px wide centered in the 536px column.
- Tablet: single column — images full width (936×1170), gap 48, then the info block **700px, centered**.
  Phone: same, full width (images 358×448).

### 17.2 Info column (blocks 24px apart)
- Title H1 **36 / 28 / 24px**, lh 1.1, w500 black → 12px → (price slot — empty on the reference; our
  price line lives here, 18px slate, behind `site.showPrices`) → **32px** → description 16/24 `muted` →
  **32px** → 1px `black/8` rule.
- **Size**: label 14/14 `muted` (normal tracking) → 8px → option tiles 8px apart: h 40, px 20, radius 4,
  1px `black/8` border, white, text 12px black (reference renders the browser default sans-serif; we use
  Inter). Selected: black bg, black border, white text. Hover: bg `rgba(0,0,0,.03)`, border black.
  Ours are native radios (arrow keys).
- **Size Guide**: 18/25.2 black text with a 1px black underline (86×26). Opens a drawer (§17.4).
- **Quantity + Add to Cart** row, gap 16: stepper **150×56**, bg `surface`, radius 4, 1px border
  `rgba(231,236,229,.64)`, padding 0 6px, two **40×40 white** buttons, count Jost 16/16 w600.
  Minus / plus show 16px icons; quantity min 1, max 99. Add to Cart: `primary` button filling the rest (334 / 534 /
  192px wide).
- **Add to Cart** adds `{slug, size, quantity}` to the persisted cart (same slug + size merges the
  quantity), updates the navbar badge and opens the cart drawer — the drawer is the confirmation
  (deliberate deviation; the temporary "Added" label is gone).
- 1px rule → **trust tiles**: grid 2 columns (1 on phone), gap 16; tile bg `surface`, radius 4,
  padding 12, gap 16; icon 24px black stroke 1.5; title 16/24 `slate`; line 14/19.6 w500 `muted`
  (normal tracking). Icons: reference Phosphor-style bag, repeat, truck, medal → lucide `Lock`, `Repeat`,
  `Truck`, `Award`.

### 17.3 FAQ
- Section padding 100/80/64, gutters as Container. Title H2 (42/38/32) centered, **max-width 420px**
  (wraps to 2 lines) — reference text "Frequenly Asked Questions" (typo; we spell it correctly) → 64px →
  list **700px** wide (full width on phone), items **10px** apart.
- Item: bg `surface`, **radius 8**, padding 16. Question 18/25.2 w400 black + 16px chevron (gap 10) →
  16px → 1px rule (`black/8`, **invisible while closed**) → 16px → answer 16/24 `slate`.
  Closed 74px; open e.g. 138px.
- Behaviour: **all closed initially; several can be open at once**; the chevron **swaps** (down ↔ up,
  filled Material-style glyph; we use lucide chevrons), no rotation. Height grows with a quick spring
  (74→92→116→134→139→138 px at ~50ms steps, i.e. ~200ms with a 1px overshoot).
- Answers are in `src/data/faqs.js` (reused by Contact in Phase 6).

### 17.4 Size Guide drawer
- Fixed full-height panel on the **right, 400px** wide (full width on phone), white, over a
  **rgba(0,0,0,.8)** backdrop. **No open/close animation** (instant).
- Header: padding 24 16 16, title "Size Guide" **26 / 22 / 20px** lh 1.2 w500 `slate`; 24px close (X)
  at the right; 1px `black/8` rule under the header.
- Body: padding 16, gap 32: intro 16/24 `muted` → table: 4 equal columns (gap 24), rows 12px apart with
  1px `black/8` rules under the header and every row; header cells and size column 14/19.6 **w600
  slate**, values 14/19.6 **w500 muted**, normal tracking. Values in `src/data/sizeGuide.js`
  (XS 32-34"/26"/7.5" … XXL 50-52"/31"/10").
- Closing: X button or backdrop click. The reference **ignores Escape**; ours (native `<dialog>`) also
  closes on Escape and traps/restores focus.

### 17.5 Happy Customers
- Section padding 100/80/64; header like home sections (title + 320px subtitle) → 64px.
- **Static grid** 4 / 2 / 1 columns, gap 16px row / 8px column (cards 334 / 464 / 358 wide). No slider.
- Card: **no background, no border**, radius 4, **height 300**, padding 24, gap 16: [avatar **60px
  circle** + (name 16/24 w500 → 12px → five **16px filled black stars**, 4px apart), gap 12] → 1px rule →
  text 16/24 `muted`.

### 17.6 You may also Like
- Padding top 100/80/64; bottom **100 desktop, 0 tablet/phone**. Title H2 centered → **48px** → grid
  **4 / 2 / 1 columns, gap 24px** (cards 322 / 456 / 358), every card badged **"New in"**.
- The reference lists the **whole category including the current product** (4 hoodies, or all 5 tees
  wrapping to a second row). We show 4 **other** products, same category first, topped up from the
  other category (`getRelatedProducts`) — deliberate deviation.

## 18. Cart, checkout (Phase 5)

What the reference shows: clicking the navbar cart icon (home and product page) opens a **cart drawer**
— same pattern as the Size Guide: 400px panel from the right (full width on phone), `rgba(0,0,0,.8)`
backdrop, **no animation**, closes on the X, backdrop click and **Escape**. Only its **empty state** is
observable (its cart has no real content in the template). Everything else below has **no reference** and is
built from the tokens in this file.

### 18.1 Cart drawer (`CartDrawer`, on the shared `ui/Drawer`)
- Measured (reference, empty state): header **64px**, padding 16, title 16/24 `slate` ("Your Cart is
  empty"), **32×32 close** with a 14px X of 2px strokes, header rule **1px `rgba(33,26,26,.06)`**.
  Body: centered text 16/24 `slate` → 8px → "shop now": white, **no border, radius 4**, h 40, px 20,
  Jost 16/500 `slate`, 18px ↗ arrow (our `plain` button variant). The reference links it to `/`; ours says
  "continue shopping" and goes to `/shop/all`.
- Ours, filled (no reference): title "Cart (n)"; lines separated by `black/8` rules, 16px padding:
  80px 4:5 thumbnail (radius 4, `surface-2`) · name 16/500 (links to the product, closes the drawer) ·
  "Size M" 14px `muted` · line total 16 `slate` · small stepper (112×40, 32px buttons, max 10) ·
  "Remove" 14px underlined link. Footer (1px rule, padding 16, gap 16): Subtotal row, free-shipping line,
  2-column buttons **View cart** (`secondary`: 56px, white, 1px black border) + **Checkout** (`primary`).
- Opens from the navbar icon and after Add to Cart. Any route change closes it. Focus is trapped
  (native modal dialog), returns to the trigger; **body scroll is locked** while any drawer is open.
- The Size Guide now uses the same `ui/Drawer` and still measures exactly as §17.4.

### 18.2 Cart page `/cart` (no reference)
- Padding top 100, bottom 64/80/100, Container gutters. Header row: H1 (`heading-2`) "Your Cart" + item
  count (muted), 1px rule, 24px below it. Desktop: lines (flex 1) | **400px** summary, gap 48, summary
  sticky at 100px; tablet/phone stacked (gap 40).
- Lines as the drawer but 120px thumbnails (96 on phone) and "$X each" after the size.
- Summary card: `surface`, radius 8, padding 24, gap 16 — title 22/20/18 · Subtotal · Shipping (Free / $8)
  · rule · Total 18/500 black · free-shipping line · Checkout (`primary`, full width); "Continue shopping"
  underlined link below. Empty state: "Your Cart is empty" + `light` "continue shopping" → /shop/all.

### 18.3 Checkout `/checkout` (demo, no reference)
- Same page frame; form | 400px sticky summary (lines with 56px thumbnails, qty, totals).
- Sections (legend 22/20/18 w500): Contact (email) · Delivery (full name, phone, country `<select>`,
  address, city, postal code; 2 columns from 810px) · Shipping method (single "Standard delivery" tile
  with the current cost) · Payment: tiles **"Card (demo)"** / **"Cash on delivery"** — **no card number
  fields, ever** — plus a grey note that it is a demo checkout.
- Inputs: 50px, radius 4, 1px `black/8` border (black on focus), 14px text, normal tracking; labels 14/14
  `muted`. Errors: 14px `danger` (#c62828, new token) under the field, red border, `aria-invalid` +
  `aria-describedby`; a `role="alert"` line counts the errors; focus goes to the first invalid field.
  After the first submit, fields re-validate as you type.
- Rules: all fields required; email `x@y.zz`; phone 7–15 digits (spaces, `()`, `-`, `.`, leading `+`
  allowed); postal code 2–10 letters/digits/space/dash.
- Submit → order `{ id: "ATL-XXXXXX", createdAt, items, totals, customer, payment, shippingMethod }` in
  memory (`orderStore`, not persisted) → cart cleared → `/checkout/success`. Empty cart → redirect `/cart`.
- The footer (with its newsletter block) stays on checkout — it sits below the form and doesn't clash.

### 18.4 Success `/checkout/success`
- 40px check icon, "Thank you for your order!" (`heading-2`), order number, summary card (totals, lines,
  delivery address, shipping, payment), "Continue shopping" (`primary`). No order in memory (e.g. after a
  refresh) → redirect to `/`.

### 18.5 Pricing rules (`site.js` + `cartStore.js`)
- `freeShippingThreshold` **100**, `flatShipping` **8** (placeholder). No taxes, no discount codes.
  Shipping = 0 for an empty cart, 0 when subtotal ≥ 100, else 8.
- Verified cases: $0 → ship $0 · $35 → $8, total $43, "Add $65.00 more" · $70 → $8, total $78 ·
  $99.99 → $8 · $100 → Free · $104 → Free, total $104 · $242 → Free. Unknown product lines are skipped.
- Cart, drawer, checkout and success **always show prices**, regardless of `site.showPrices` (that flag
  only affects product cards / the product page).

## 19. About, Contact, Return policy, 404, newsletter (measured Phase 6)

General: `<main>` has **no minimum height** (as on the reference — on short pages the footer follows the
content). `<title>`: only the returns page has its own ("Return & Exchange Policy - <site>"); About,
Contact and 404 use the site title.

**Inter stylistic alternates.** The reference renders section H2s (`heading-2`), the product title and the
policy headings with `font-feature-settings: "cv01","cv05","cv09","cv11","ss03"`, and badges with
`"ss01".."ss04"`. We set the same (`heading-2`, `font-heading-alt`, `font-badge-alt`). Since Phase 7 the
self-hosted full Inter honours them and heading widths match the reference exactly (e.g. "Non-Returnable
Items" 430px at 42px, "Everyday Essentials" 383px, "24/7 Available" 272px).

### 19.1 About `/about`
- **Hero**: full-bleed image band, **594px at every width**; overlay
  `linear-gradient(transparent 0%, rgba(0,0,0,.36) 72.44%, rgba(0,0,0,.6) 100%)`; title "The Story of
  <site>" (`heading-1`) → 16px → subtitle (`lead`), white, **centered** both ways; padding 32 (24 on phone).
  Appear: same as the Home hero (image 1.2 → 1 spring at 1s; title and subtitle fade-up 20px at 2s).
- Sections "About us", "The team", "Mission": padding **100/80/64**; tablet/desktop a **6-column grid,
  gap 24**: H2 (`heading-2`) in columns 1–2, content in 3–6 (899 / 616px); phone stacked, gap 32.
- About us: three paragraphs, `lead` (Jost 20/18/16, lh 1.6) `slate`, **20px** apart.
- Team: grid **2 columns** (tablet/desktop) / 1 (phone), gap 16. Portrait **1:1**, radius **12**, `surface-2`;
  16px → name 18/25.2 w400 `slate` → 8px → role 14/19.6 w500 `muted` (normal tracking). No hover.
- Mission: cards stacked, gap 24, **equal row heights** (shorter card gets empty space); card radius 4:
  image frame **aspect 1.059** with the **scroll zoom 1.2 → 1** (same range as §15.3, measured on the card)
  → 16px → title 26/22/20 lh 1.2 w500 `slate` → 8px → text 16/24 `slate`, max-width 550.
  On the reference the zooming image isn't clipped to its frame (it slides under the text while scaled);
  ours is clipped to the frame.
- Heights match: 4501 / 3587 / 4372 (±1px).

### 19.2 Contact `/contact`
- Tablet/desktop: **100vh** image hero (same overlay as About), padding-top 70 / 60, with a centered white
  card **700px, radius 12, padding 32, gap 24**. Phone: **no image**; content on white, padding 120 top /
  64 bottom, 16px sides.
- Card title block: H1 styled `heading-2` → 16px → text 16/24 `muted` (max 360px tablet, 420 desktop —
  left-aligned on desktop, centered elsewhere); block padding 0 desktop / **24 tablet / 16 phone**.
- Form: **550px** (full width on phone), fields **20px** apart. Label 16/24 `slate` → 10px → field:
  **48px** (textarea min 100, vertical resize), radius 4, **1px `rgba(136,136,136,.1)`** border → **black on
  focus**, padding 12, Inter 14/1.2 black (normal tracking), placeholders "Name*", "Email*",
  "Your message*" in `muted`. Submit: **56px**, black, radius 4, 14/1.2 **w600** white; hover `slate`.
- Behaviour: the reference uses native `required` validation and POSTs to a form service with no visible
  result. Ours: inline errors (`danger`), `aria-invalid`/`aria-describedby`, focus on the first invalid
  field, live re-validation after the first submit; a valid submit shows a grey confirmation box and resets
  the form. **No message is actually sent** (demo).
- Then the FAQ section exactly as on the product page (§17.3). Heights match: 1836 / 1787 / 1695 (±1).

### 19.3 Return policy `/returns/return-exchange-policy`
- Column **max 1000px**, padding **140 top**, 40/32/16 sides, bottom 100/80/64; H1 `heading-1` centered →
  **64px (48 phone)** → grey `surface` card, padding **40 (16 phone)**, no radius.
- Rich text: body 16/24 `slate`; H2 **42/38/32 bold black**, lh 1.1, **40px** above; lists **24px** above,
  disc bullets (`slate`) with 20px indent, no gap between items; paragraphs after a heading/list **20px**
  above. Inline emphasised phrases are *not* bold on the reference (plain text in ours). The email link
  (`site.contactEmail`) is black and underlined.
- **Deliberate fix:** the reference says **14 days** here but 30 days on Home and the product page. We use
  `site.returnWindowDays` (**30**) on this page, the Home perk and the product trust tile.
- Heights match at all widths (1575 / 1520 / 1817) since the Phase 7 font change.

### 19.4 404
- `/404` and any unknown URL (HTTP 404 on the reference) render the **Home hero layout** with "404" /
  "Page Not Found" / outline pill "Go home" → `/`, same heights (100vh / 1.29667 aspect / 88vh,
  min 700), gradients and appear timings; on tablet the copy sits at x = 40 (no extra 32px inset).
  Matches exactly at all three widths (900 / 771 / 792).

### 19.5 Footer newsletter
- The reference uses native `type=email` validation and POSTs to a newsletter service with no visible
  feedback. Ours: `noValidate` + inline error under the form (14px, `#ff8a80` on black, input outlined in the
  same colour), focus stays in the input; a valid address replaces the form with a 50px "Thanks for
  subscribing!" row, so the footer keeps its exact height (468px at 1440). **Nothing is stored or sent.**

## 20. Phase 7 — wide screens, accessibility, motion

### 20.1 Above 1600px (measured on the reference at 1920)
| Element | Reference | Ours |
| --- | --- | --- |
| Navbar | full width (links at x = 40) | full width (no max-width) |
| Hero / 404 / About / Contact heroes, brand-story banner, Instagram marquee | full-bleed | full-bleed |
| Home, shop, product, reviews, related sections | **content** capped at 1600 (x 160–1760) | `Container` box max 1680 (`max-w-site-wide`) |
| Collection tiles | capped at 1600, centred | `max-w-site` on the tile row |
| About sections | **box** capped at 1600 (content at x = 200) | `<Container narrow>` |
| Footer | content at x = 200 | inner max-width 1520 |
At ≤ 1600px nothing changed (all pages re-measured: identical).

### 20.2 Tablet hero
The Home/404 hero uses `aspect-ratio: 1.29667` with `min-height: 700px`; without an explicit width the
min-height was transferred through the ratio and the hero became 908px wide at 810px (98px horizontal
scroll). It now has `width: 100%` → 810×700 / 900×700, exactly like the reference.

### 20.3 Accessibility (axe-core: no violations on any route or open state)
- Skip-to-content link (first focusable element, visible on focus) → `<main id="main">`.
- Contrast: the reference's "Sort by" label is 32% black (2.2:1 on white) → we use `muted` #6d6d6d
  (5.3:1). Our struck-through compare-at prices use `muted` too. `#6d6d6d` body text passes (5.3:1).
- Shop pages have a visually hidden H2 between the H1 and the product-card H3s.
- The cart count is announced through a polite live region; form confirmations use `role="status"`.

### 20.4 Reduced motion
`<MotionConfig reducedMotion="user">` (hero appear, accordion, mobile menu) plus a base rule that makes
CSS transitions/animations instant under `prefers-reduced-motion: reduce`; the marquee stops
(`motion-reduce:animate-none`) and the scroll-linked zoom/tilt effects only run under `no-preference`.

## 21. All deliberate deviations from the reference

| # | Where | Reference | This project | Why |
| --- | --- | --- | --- | --- |
| 1 | Product cards, product page | no prices | small price (+ struck compare-at) when `site.showPrices` | a store needs prices; toggleable |
| 2 | Product card | only the image is a link | whole card (image + name) is one link | one tab stop, larger target |
| 3 | Home hero "shop all" | links to `/` | links to `/shop/all` | requested |
| 4 | Navbar | no active state | active link keeps its underline | orientation |
| 5 | Shop tabs (tablet/phone) | "Shirts" always shown active (bug) | current category active | bug not copied |
| 6 | Sort control | empty 20px icon slot; sorting not wired | chevron icon; real sorting | usability |
| 7 | "Sort by" label | 32% black (2.2:1) | `muted` #6d6d6d (5.3:1) | WCAG contrast |
| 8 | Size options | L, S, M; browser-default font; `?variant=` URL | S, M, L; Inter; no URL change | standalone store, no Shopify |
| 9 | Quantity stepper | disabled, blank buttons | working (1–10/99) with −/+ icons | standalone store |
| 10 | Add to Cart | no feedback | adds to the local cart and opens the cart drawer | standalone store |
| 11 | Size Guide drawer | Escape does nothing | Escape closes; focus trapped/restored | accessibility |
| 12 | FAQ heading | "Frequenly Asked Questions" | "Frequently Asked Questions" | typo |
| 13 | Related products | whole category incl. current product | 4 other products (same category first) | relevance |
| 14 | Cart drawer empty state | "shop now" → `/` | "continue shopping" → `/shop/all` | requested |
| 15 | Cart page, checkout, success | none (Shopify) | own pages in the project's style | standalone store |
| 16 | Return window | 14 days on returns page, 30 elsewhere | 30 everywhere (`site.returnWindowDays`) | consistency |
| 17 | Contact / newsletter forms | native validation, POST to a form service, no feedback | inline validation + confirmation; nothing is sent | no backend |
| 18 | Mission images (About) | zooming image overlaps the text | clipped to its frame | visual glitch not copied |
| 19 | Icons | Phosphor / Material glyphs | closest Lucide icons | one icon set |
| 20 | Template badges ("Use Template", "Made in Framer") | present | not replicated | Framer marketing |
