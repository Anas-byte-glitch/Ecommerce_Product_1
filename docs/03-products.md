# 03 — Products

All products are in **`src/data/products.js`**, in the list called `products`. There is no admin
panel: you edit this file, save, and rebuild (`npm run build`).

## Product fields

```js
{
  slug: 'zipper-hoodie',
  name: 'Zipper hoodie',
  category: 'hoodies',
  price: 69,
  compareAtPrice: 89,
  badge: 'Sale',
  images: img('zipper-hoodie'),
  sizes: SIZES,
  description: 'Not every day calls for a full “fit,” but this hoodie…',
  salesRank: 1,
  createdAt: '2025-01-18',
},
```

| Field | Required | Meaning |
| --- | --- | --- |
| `slug` | yes | The product's address: `/product/zipper-hoodie`. Lowercase letters, numbers and dashes only, unique for each product. Also the name of its photo files |
| `name` | yes | Product name on cards, the product page, the cart and the checkout. Keep it short (about 25 characters) so it fits on one line |
| `category` | yes | `'hoodies'` or `'shirts'` — one of the `categories` in `src/config/site.js`. Decides which shop tab shows it |
| `price` | yes | Price as a plain number in your currency (see [02 — Store settings](02-store-settings.md)): `69`, `69.5`, `6900` |
| `compareAtPrice` | no | Old price, shown struck through when it is higher than `price`. Use `null` for none |
| `badge` | no | Small label on the photo: `'Sale'`, `'New in'` or `null` |
| `images` | yes | Always `img('<slug>')`: the two photos of the product (see [Photos](#product-photos)) |
| `sizes` | yes | Sizes offered. `SIZES` = `['S', 'M', 'L']`; you can write your own list, e.g. `['XS', 'S', 'M', 'L', 'XL']` |
| `description` | yes | Text on the product page (one paragraph) |
| `salesRank` | yes | Used by the "Best Selling" sort: `1` = best seller |
| `createdAt` | yes | Date `'YYYY-MM-DD'`, used by the "Newest" sort |

The order of the list is the default ("Relevance") order on the shop pages.

## Change a product

Edit its values and save. If you change a `slug`, also rename its photo files (see below) and
update the Home page lists that mention it (see [Home page selections](#home-page-selections)).

## Add a product

1. Copy an existing product block — from its `{` to its `},` — and paste it where you want the
   product to appear in the list.
2. Change `slug`, `name`, `category`, prices, `badge`, `description`, `salesRank`, `createdAt`,
   and write the new slug inside `img('…')`.
3. Add its two photos (next section).
4. Save, then run `npm run build` (this also adds the product to `sitemap.xml`).

## Remove a product

1. Delete its block (from `{` to `},`) in `src/data/products.js`.
2. Remove its slug from the Home page lists if it appears there (next section).
3. Optional: delete its photos in `public/images/products/` and its entries in `images.json`.

Carts saved in visitors' browsers simply drop products that no longer exist.

## Home page selections

The Home page shows hand-picked products. Each list is at the top of its file:

| Section | File | Line to edit |
| --- | --- | --- |
| Now Trending | `src/components/home/NowTrending.jsx` | `const slugs = [...]` |
| New this season | `src/components/home/NewThisSeason.jsx` | `const slugs = [...]` |
| Everyday Essentials | `src/components/home/EverydayEssentials.jsx` | `const slugs = [...]` |

Write the products' slugs in the order you want. "Everyday Essentials" is designed for exactly 4.
A slug that does not exist is skipped.

The product page's "You may also like" picks 4 other products automatically (same category
first).

## Product photos

Each product has two photos, **portrait 4:5** (e.g. 1200 × 1500 px): photo 1 is shown on the
shop cards, the product page and the cart; photo 2 appears when the mouse is over the card and
as the second image on the product page.

### Recommended way (optimized WebP, 3 sizes)

1. Save your photos as JPG (or PNG/WebP renamed `.jpg` is fine) at least 1200 px wide:
   `public/images-source/products/<slug>-1.jpg` and `public/images-source/products/<slug>-2.jpg`.
   Create the folders if they do not exist.
2. Open `images.json` and add (or edit) one entry per photo — copy an existing product entry
   and change `slot`, `file`, `where`, `author`, `page`, `license`; remove the `url` line for
   your own photos:

   ```json
   {
     "slot": "product:linen-shirt:1",
     "file": "products/linen-shirt-1",
     "aspect": [4, 5],
     "widths": [480, 800, 1200],
     "where": "Linen shirt: main photo",
     "source": "Own photo",
     "page": "",
     "author": "Your studio",
     "license": "Owned",
     "licenseUrl": ""
   }
   ```

3. Run:

   ```bash
   npm run images
   ```

   This crops the photos to 4:5, writes `public/images/products/<slug>-1-480.webp`, `-800.webp`,
   `-1200.webp` (and the same for `-2`), updates `src/data/imageManifest.json` and `CREDITS.md`.
   If the subject is cut off, add `"focus": [0.5, 0.3]` (horizontal, vertical position to keep,
   from 0 to 1) to the entry and run `npm run images` again. More options in
   [IMAGES.md](IMAGES.md).

### If a product has no photo yet

The site then looks for an SVG placeholder named `public/images/products/<slug>-1.svg` and
`<slug>-2.svg`. For a new product, copy two existing SVG files (for example
`black-hoodie-1.svg` and `black-hoodie-2.svg`) and rename them with the new slug, otherwise the
image area stays empty.

## Size guide, reviews and FAQ

These are shared by all products:

- Size guide table: `src/data/sizeGuide.js` (inches).
- "Happy Customers" reviews: `src/data/reviews.js`.
- FAQ: `src/data/faqs.js` (also used on the Contact page).

See [05 — Pages and content](05-pages-and-content.md).
