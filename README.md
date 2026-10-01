# Halvo — clothing store template

**Start here.** Halvo is a ready-made online-store website for a clothing brand (hoodies and
tees). It is built with React, Vite and Tailwind CSS and runs entirely in the visitor's browser:
you change the brand name, prices, products and photos, build it, and upload the result to any
web host.

## What is included

- A complete storefront: **Home**, **Shop** (all / hoodies / shirts, with sorting), **product
  pages** (gallery, sizes, size guide, quantity, reviews, FAQ), a **cart drawer** and **cart
  page**, a **demo checkout** with confirmation page, **About**, **Contact**, **Return policy**
  and a **404** page.
- Responsive design for phones, tablets and desktops, scroll animations, keyboard and
  screen-reader support (checked with axe-core).
- One settings file for the brand name, currency, shipping, contact email and links:
  `src/config/site.js`.
- 9 demo products, demo photos (see [CREDITS.md](CREDITS.md)), favicon, social-sharing image,
  `sitemap.xml` and `robots.txt` generated from your settings.
- Hosting files for Vercel (`vercel.json`), Netlify (`public/_redirects`) and Apache / cPanel
  (`public/.htaccess`).
- Step-by-step guides in [`docs/`](docs/).

## What is NOT included — please read

- **No backend.** There is no server, database, admin panel or API. Products are edited in a
  code file (`src/data/products.js`).
- **No real payments.** The checkout is a demonstration: it checks the form and shows an order
  confirmation, but no money is taken and no card details are asked for.
- **Orders are not saved or sent anywhere.** The confirmation exists only in the visitor's
  browser until the page is reloaded. You will not receive an email about orders.
- **The contact form and the newsletter signup send nothing.** They check the input and show a
  thank-you message only.
- **The cart is stored in the visitor's browser** (`localStorage`). It is not shared between
  devices and you cannot see it.
- No user accounts, stock management, taxes or discount codes.
- **The demo photos are for preview only.** Replace them with your own, or check each photo's
  license yourself before you sell or publish your store (see [CREDITS.md](CREDITS.md)).

To turn the template into a store that takes real orders, see
[docs/07-next-steps.md](docs/07-next-steps.md).

## Quick start

You need [Node.js](https://nodejs.org) 20.19 or newer (22 LTS recommended). In a terminal, inside
this folder:

```bash
npm install       # once: downloads the libraries the project uses
npm run dev       # opens a live preview at http://localhost:5173
npm run build     # makes the finished website in the dist/ folder
npm run preview   # shows the finished website at http://localhost:4173
```

The full walk-through, for people who have never used a terminal, is in
[docs/01-quick-start.md](docs/01-quick-start.md).

## Guides

| Guide | What it covers |
| --- | --- |
| [01 — Quick start](docs/01-quick-start.md) | Install Node.js, run the store on your computer, build it |
| [02 — Store settings](docs/02-store-settings.md) | Brand name, currency (with a DZD example), shipping, email, links |
| [03 — Products](docs/03-products.md) | Product fields, adding / removing products, product photos |
| [04 — Design](docs/04-design.md) | Colours, fonts, sizes and spacing: where to change them |
| [05 — Pages and content](docs/05-pages-and-content.md) | About, Contact, Return policy, FAQ, team, navigation and footer |
| [06 — Deploy](docs/06-deploy.md) | Vercel, Netlify, cPanel / shared hosting, Nginx |
| [07 — Next steps](docs/07-next-steps.md) | Options for real forms, payments and order storage |
| [08 — Troubleshooting](docs/08-troubleshooting.md) | Blank page, 404 on refresh, missing images, build errors |
| [Images](docs/IMAGES.md) | Every image slot, its size and how to replace it |

## All commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs the libraries (run once, and again after updating the project) |
| `npm run dev` | Live preview while you edit, at http://localhost:5173 |
| `npm run build` | Builds the website into `dist/` (also regenerates favicon, sitemap, robots.txt) |
| `npm run preview` | Serves the built `dist/` folder at http://localhost:4173 |
| `npm run images` | Downloads / rebuilds the photos listed in `images.json` (see docs/IMAGES.md) |
| `npm run credits` | Rewrites `CREDITS.md` from `images.json` |
| `npm run seo` | Regenerates favicon, social image, `robots.txt` and `sitemap.xml` |
| `npm run lint` | Checks the code for common mistakes |
| `npm run a11y` | Accessibility check of every page (optional, needs Playwright — see docs/08) |

## Files at a glance

```
src/config/site.js     store settings (brand, currency, shipping, email, links)
src/data/              products, FAQ, reviews, team, About text, size guide, perks, page photos
src/pages/             one file per page
src/components/        building blocks of the pages
src/index.css          colours, fonts and sizes (design tokens)
public/                files copied as-is to the website (photos, favicon, hosting files)
public/images/         optimized photos (WebP) and SVG placeholders
images.json            list of every photo: slot, source, author, license
scripts/               helper scripts behind the npm commands
docs/                  the guides
```

## License and credits

See [LICENSE.txt](LICENSE.txt) for what you may do with this template, [CREDITS.md](CREDITS.md)
for the demo photos and [CHANGELOG.md](CHANGELOG.md) for the version history. Fonts (Inter, Jost,
Abril Fatface) are under the SIL Open Font License; icons are from Lucide (ISC license).
