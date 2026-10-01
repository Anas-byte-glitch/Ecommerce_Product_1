# Images — every photo slot and how to replace it

The store uses **42 photos**. Each one has a *slot*: a place on the site, a file name and a fixed
shape (aspect ratio). All slots are listed in **`images.json`** at the project root, which also
records where each demo photo comes from, its author and its license.

> **The demo photos are for preview only.** Replace them with your own (or check each license
> yourself) before selling or publishing your store — see [CREDITS.md](../CREDITS.md). The
> product photos show other people's garments, not the products in the catalogue.

## How it works

```
images.json                      list of slots (shape, sizes, source, credits)
public/images-source/<file>.jpg  original photo for each slot (downloaded once / your own)
        │  npm run images
        ▼
public/images/<file>-<width>.webp   cropped, optimized photos at 2–3 widths
src/data/imageManifest.json         list of the WebP files that exist (read by the site)
CREDITS.md                          regenerated credits page
```

- The browser picks the best width for the screen (`srcset`), so phones download small files.
- Every photo is cropped to its slot's exact shape, so a replacement can never change the page
  layout.
- If a slot has no WebP (not built yet, or deleted), the site shows its **SVG placeholder**
  instead — product placeholders are in `public/images/products/*.svg`, the others in
  `src/assets/placeholders/`.

## Replace a photo (step by step)

1. Find the slot in the table below, e.g. `home/hero`.
2. Prepare your photo: JPG, at least as wide as the largest width in the table (bigger is fine).
   Roughly the right shape is best; it will be cropped to the exact ratio.
3. Save it as `public/images-source/<file>.jpg` — for `home/hero` that is
   `public/images-source/home/hero.jpg` — replacing the existing file. (The `images-source`
   folder is created the first time `npm run images` runs; create it yourself if needed.)
4. In `images.json`, update that slot's credits — `author`, `source`, `page`, `license`,
   `licenseUrl` — and **delete its `"url"` line** (otherwise nothing changes, but it documents
   a photo you no longer use).
5. Run:

   ```bash
   npm run images
   ```

   To rebuild only some slots, name them: `npm run images -- home/hero about/team-1`.
6. Check the result with `npm run dev`, then `npm run build` before uploading.

### Adjust the crop

Add these optional fields to the slot in `images.json`, then run `npm run images` again:

- `"focus": [0.5, 0.3]` — the point of the photo to keep in the centre of the crop, as
  horizontal and vertical fractions (0 = left/top, 1 = right/bottom). Default `[0.5, 0.5]`.
- `"zoom": 1.4` — crop tighter around the focus point (1 = widest possible crop).

Example: `"focus": [0.5, 0.35], "zoom": 1.3` keeps a face that is in the upper third.

### Use a photo from a web address instead

Put the direct image address in `"url"` and delete the old file in `public/images-source/`
(the script only downloads when the file is missing), then run `npm run images`. Only use photos
whose license allows commercial use, and fill in the credit fields.

### Go back to the placeholder

Delete the slot's WebP files in `public/images/` (`<file>-*.webp`) and its source file, then run
`npm run images`. The slot disappears from the manifest and the SVG placeholder is shown.

## Text descriptions (alt text)

Screen readers and search engines read a short description of each photo. Update it when you
change a photo:

| Photos | Where the text is |
| --- | --- |
| Home, About hero, Contact, 404 | `src/data/images.js` (third argument of `photo(…)`) |
| Products | the product `name` in `src/data/products.js` (automatic) |
| Team | built from `name` and `role` in `src/data/team.js` (automatic) |
| Mission | `src/data/about.js` |
| Review avatars | decorative (the reviewer's name is written next to it) |

## All slots

| Where it appears | File (`public/images/…`) | Aspect ratio (w:h) | Widths built (px) | Largest file |
| --- | --- | --- | --- | --- |
| Classic comfort hoodie: main photo (shop cards, product page, cart) | `products/premium-ream-choodie-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Classic comfort hoodie: second photo (card hover, product page) | `products/premium-ream-choodie-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Zipper hoodie: main photo (shop cards, product page, cart) | `products/zipper-hoodie-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Zipper hoodie: second photo (card hover, product page) | `products/zipper-hoodie-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Fleece hoodie black: main photo (shop cards, product page, cart) | `products/black-hoodie-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Fleece hoodie black: second photo (card hover, product page) | `products/black-hoodie-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Chill vibes tee: main photo (shop cards, product page, cart) | `products/chill-vibes-tee-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Chill vibes tee: second photo (card hover, product page) | `products/chill-vibes-tee-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Black basic tee: main photo (shop cards, product page, cart) | `products/black-basic-tee-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Black basic tee: second photo (card hover, product page) | `products/black-basic-tee-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| White everyday crew tee: main photo (shop cards, product page, cart) | `products/white-crew-tee-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| White everyday crew tee: second photo (card hover, product page) | `products/white-crew-tee-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Cream relaxed crew tee: main photo (shop cards, product page, cart) | `products/cream-crew-tee-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Cream relaxed crew tee: second photo (card hover, product page) | `products/cream-crew-tee-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Red studio tee: main photo (shop cards, product page, cart) | `products/red-studio-tee-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Red studio tee: second photo (card hover, product page) | `products/red-studio-tee-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Fleece hoodie white: main photo (shop cards, product page, cart) | `products/fleece-hoodie-white-1` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Fleece hoodie white: second photo (card hover, product page) | `products/fleece-hoodie-white-2` | 4:5 (0.800) | 480, 800, 1200 | 1200 × 1500 px |
| Home: full-screen hero at the top | `home/hero` | 3:2 (1.500) | 960, 1440, 1920 | 1920 × 1280 px |
| Home: "Shirts" collection tile | `home/category-shirts` | 8:7 (1.143) | 600, 900, 1200 | 1200 × 1050 px |
| Home: "Hoodies" collection tile | `home/category-hoodies` | 8:7 (1.143) | 600, 900, 1200 | 1200 × 1050 px |
| Home: brand story banner ("our story") | `home/story` | 21:9 (2.333) | 960, 1440, 1920 | 1920 × 823 px |
| Home: "Everyday Essentials" editorial photo | `home/essentials` | 2:3 (0.667) | 480, 800, 1200 | 1200 × 1800 px |
| Home: Instagram strip, tile 1 | `home/instagram-1` | 18:19 (0.947) | 360, 720 | 720 × 760 px |
| Home: Instagram strip, tile 2 | `home/instagram-2` | 18:19 (0.947) | 360, 720 | 720 × 760 px |
| Home: Instagram strip, tile 3 | `home/instagram-3` | 18:19 (0.947) | 360, 720 | 720 × 760 px |
| Home: Instagram strip, tile 4 | `home/instagram-4` | 18:19 (0.947) | 360, 720 | 720 × 760 px |
| Home: Instagram strip, tile 5 | `home/instagram-5` | 18:19 (0.947) | 360, 720 | 720 × 760 px |
| Home: Instagram strip, tile 6 | `home/instagram-6` | 18:19 (0.947) | 360, 720 | 720 × 760 px |
| About: hero band at the top | `about/hero` | 16:9 (1.778) | 960, 1440, 1920 | 1920 × 1080 px |
| About: "The team", portrait 1 | `about/team-1` | 1:1 (1.000) | 400, 800 | 800 × 800 px |
| About: "The team", portrait 2 | `about/team-2` | 1:1 (1.000) | 400, 800 | 800 × 800 px |
| About: "The team", portrait 3 | `about/team-3` | 1:1 (1.000) | 400, 800 | 800 × 800 px |
| About: "The team", portrait 4 | `about/team-4` | 1:1 (1.000) | 400, 800 | 800 × 800 px |
| About: "Mission", first image | `about/mission-1` | 18:17 (1.059) | 600, 900, 1200 | 1200 × 1133 px |
| About: "Mission", second image | `about/mission-2` | 18:17 (1.059) | 600, 900, 1200 | 1200 × 1133 px |
| Contact: full-screen background (tablet and desktop) | `contact/hero` | 16:9 (1.778) | 960, 1440, 1920 | 1920 × 1080 px |
| Product page: "Happy Customers", avatar 1 | `reviews/avatar-1` | 1:1 (1.000) | 120, 240 | 240 × 240 px |
| Product page: "Happy Customers", avatar 2 | `reviews/avatar-2` | 1:1 (1.000) | 120, 240 | 240 × 240 px |
| Product page: "Happy Customers", avatar 3 | `reviews/avatar-3` | 1:1 (1.000) | 120, 240 | 240 × 240 px |
| Product page: "Happy Customers", avatar 4 | `reviews/avatar-4` | 1:1 (1.000) | 120, 240 | 240 × 240 px |
| 404 page: full-screen hero | `notfound/hero` | 3:2 (1.500) | 960, 1440, 1920 | 1920 × 1280 px |

Notes:

- **Products:** `products/<slug>-1` is the main photo, `-2` the hover / second gallery photo.
  New products need two new slots (see [03 — Products](03-products.md)).
- **Home hero, brand story, About hero:** these fill the full width of the screen and are
  cropped further by the browser (wider on desktop, narrower on phones), so keep the subject
  near the centre and leave some space above heads.
- **Contact:** only shown on tablet and desktop, behind the contact card.
- **Instagram strip:** 6 tiles of 360 × 380 px that scroll continuously.
