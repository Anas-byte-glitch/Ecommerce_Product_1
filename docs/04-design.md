# 04 — Design: colours, fonts, sizes, spacing

The look of the store is controlled by **design tokens** — named values defined once and used
everywhere. They live at the top of **`src/index.css`**, inside the `@theme { … }` block. Change a
value there, save, and every place that uses it follows.

The pages are styled with [Tailwind CSS](https://tailwindcss.com) class names written directly
in the components (for example `text-muted`, `rounded-sm`, `px-4`). Each token below becomes a
family of class names.

> Tip: run `npm run dev` while you edit — the browser updates on every save.

## Colours

```css
--color-ink: #09090b;        /* main text colour, logo */
--color-black: #000000;      /* headings, buttons, footer background */
--color-white: #ffffff;
--color-muted: #6d6d6d;      /* secondary text (prices, captions) */
--color-slate: #33383c;      /* body text on About / policy pages */
--color-surface: #f7f7f7;    /* light grey cards (return policy) */
--color-surface-2: #f0f0f0;  /* image backgrounds, FAQ cards */
--color-line: #e6e6e6;       /* thin borders */
--color-field: #3b3c3d;      /* newsletter field in the footer */
--color-danger: #c62828;     /* form error messages */
```

Used as `text-<name>`, `bg-<name>`, `border-<name>` (e.g. `text-muted`, `bg-surface-2`).

To change the accent of the whole store, edit these hex codes. Keep enough contrast for
readability: `muted` (#6d6d6d) is the lightest grey that is still readable on white (4.5:1).
You can check a pair of colours at <https://webaim.org/resources/contrastchecker/>.

## Fonts

```css
--font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;   /* all text by default */
--font-jost: 'Jost', ui-sans-serif, system-ui, sans-serif;    /* hero subtitles, some buttons */
--font-logo: 'Abril Fatface', ui-serif, Georgia, serif;      /* the logo (wordmark) */
```

The font files are included in the project (no Google Fonts request):

- Inter: `src/styles/fonts.css` (files from the `inter-ui` package)
- Jost and Abril Fatface: imported at the top of `src/main.jsx` (from `@fontsource` packages)

To use another font for the logo, for example "Playfair Display":

1. Install it: `npm install @fontsource/playfair-display`
2. In `src/main.jsx` replace `import '@fontsource/abril-fatface/latin-400.css'` with
   `import '@fontsource/playfair-display/latin-400.css'`
3. In `src/index.css` change `--font-logo` to `'Playfair Display', ui-serif, Georgia, serif;`
4. In `vite.config.js`, `CRITICAL_FONTS` lists fonts preloaded for speed; replace
   `abril-fatface-latin-400-normal` with `playfair-display-latin-400-normal`.

The same steps work for `--font-sans` / `--font-jost` with any font available on
<https://fontsource.org>.

The logo size is set in `src/components/layout/Logo.jsx` (`text-[16px]` on phones,
`md:text-[20px]` from tablets up).

## Text sizes

Small sizes are tokens in `@theme`:

| Token | Size / line height | Class |
| --- | --- | --- |
| `--text-badge` | 10px / 1 | `text-badge` |
| `--text-nav` | 14px / 1.3 | `text-nav` |
| `--text-small` | 14px / 1.4 | `text-small` |
| `--text-body` | 16px / 1.5 | `text-body` |
| `--text-body-lg` | 18px / 1.4 | `text-body-lg` |

Headings are defined a little further down in `src/index.css`, as `@utility` blocks with one
size per screen width (phone / tablet `md:` / desktop `lg:`):

| Utility | Phone / tablet / desktop | Used for |
| --- | --- | --- |
| `heading-1` | 36 / 48 / 56 px | Page titles, hero titles |
| `heading-2` | 32 / 38 / 42 px | Section titles |
| `heading-tile` | 24 / 30 / 32 px | Collection tiles, brand-story banner |
| `lead` | 16 / 18 / 20 px (Jost) | Hero subtitles, About text |

All text uses a slightly tight letter spacing (`--tracking-tight: -0.03em`).

## Corners, widths and screen sizes

```css
--radius-sm: 4px;    /* rounded-sm: product photos, buttons, badges */
--radius-md: 8px;    /* rounded-md: FAQ cards, editorial image */
--radius-lg: 12px;   /* rounded-lg: team photos, contact card */

--container-site: 1600px;    /* max-w-site: maximum content width */

--breakpoint-md: 810px;      /* "md:" = tablet and up */
--breakpoint-lg: 1200px;     /* "lg:" = desktop and up */
```

## Spacing

Spacing uses Tailwind's standard scale, where **1 unit = 4px**: `p-4` = 16px padding,
`gap-6` = 24px gap, `mt-10` = 40px top margin. Exact values are written in square brackets:
`pt-[100px]`. Main rhythms:

| Where | Phone / tablet / desktop | File |
| --- | --- | --- |
| Page side margins | 16 / 32 / 40 px | `src/components/ui/Container.jsx` |
| Home sections, top and bottom | 64 / 80 / 120 px | `src/components/home/HomeSection.jsx` |
| Footer padding | 64 / 80 / 100 px | `src/components/layout/Footer.jsx` |
| Product grid gaps | 16 px rows / 8 px columns (24 px on /shop/hoodies and /shop/shirts) | `src/components/product/ProductGrid.jsx` |

## Buttons

Buttons have named variants (`outline-light`, `light`, `primary`, `dark`, `subscribe`,
`secondary`, `plain`) defined in `src/components/ui/Button.jsx`. Change a variant there to
change every button that uses it.

## Animations

- Hero images zoom in once when the page loads; titles fade up (`src/components/ui/HeroImage.jsx`,
  `src/components/ui/Reveal.jsx`).
- Collection tiles and some images zoom while scrolling (CSS at the bottom of `src/index.css`:
  `zoom-on-scroll`, `tilt-on-scroll`).
- The Instagram strip scrolls continuously (`--animate-marquee`, 22.56s per loop).

All animations are switched off automatically for visitors who ask their device to reduce
motion.
