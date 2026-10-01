# 02 — Store settings

Everything that is specific to your store lives in **one file: `src/config/site.js`**. The pages
never contain the brand name, currency, shipping prices, email address or links themselves —
they read them from this file. Change a value, save, and the whole site follows.

> Edit only the values between the quotes / after the colons. Keep the commas, quotes and
> brackets exactly as they are. If the site goes blank after an edit, a comma or quote is
> probably missing — see [08 — Troubleshooting](08-troubleshooting.md).

## Settings

| Setting | Example | What it changes |
| --- | --- | --- |
| `brandName` | `'Halvo'` | Logo text (shown in capitals, Abril Fatface font), browser tab titles, footer copyright, About page ("The Story of Halvo" and the text), social-sharing tags, favicon letter, the first 3 letters of order numbers (`HAL-7AN5LK`) |
| `tagline` | `'Wear it. Live it. Own it.'` | Big title on the Home hero and the Home page tab title |
| `description` | `'Built for movement, made for style…'` | Text under the Home hero title and the description shown by search engines |
| `year` | `2025` | Year in the footer copyright |
| `siteUrl` | `'https://example.com'` | Your real web address, **without a slash at the end**. Used in `sitemap.xml`, `robots.txt` and the social-sharing tags. Change it before going live |
| `contactEmail` | `'hello@example.com'` | Email shown on the Return policy page and in the Contact form's confirmation message. Change it to your real address |
| `currency` | see below | How every price is written |
| `shipping` | `{ flat: 8, freeThreshold: 100 }` | `flat`: shipping price under the threshold. `freeThreshold`: order total from which shipping is free (also shown as "Free Shipping — On orders over $100" on product pages and "Add $X more for free shipping" in the cart) |
| `returnWindowDays` | `30` | Number of days in the return policy, the Home "Hassle-Free Returns" perk and the product "Easy Returns" badge |
| `showPrices` | `true` | `false` hides prices on product cards and the product page (the cart and checkout always show them) |
| `instagram` | `'https://www.instagram.com/'` | Link of the "Follow us on Instagram" button on Home |
| `nav` | list of `{ label, to }` | Links in the top bar on tablet and desktop |
| `mobileNav` | list of `{ label, to }` | Links in the phone menu |
| `footer.newsletter` | `'Sign up to receive 10% off…'` | Text above the newsletter field in the footer |
| `footer.columns` | list of columns | Footer link columns (see [05 — Pages and content](05-pages-and-content.md)) |

`categories` (at the bottom of the file) lists the shop tabs. Each product's `category` must be
one of these slugs (`hoodies` or `shirts`); `all` shows everything.

## Currency

```js
currency: { code: 'USD', symbol: '$', position: 'before', decimals: 2, locale: 'en-US' },
```

| Field | Meaning |
| --- | --- |
| `code` | International code of the currency (`USD`, `EUR`, `GBP`, `DZD`, …) |
| `symbol` | What is printed next to the amount (`$`, `€`, `£`, `DA`, …) |
| `position` | `'before'` → `$69.00`, `'after'` → `69,00 €` (a non-breaking space is added) |
| `decimals` | Digits after the decimal separator (`2` → `69.00`, `0` → `69`) |
| `locale` | Language/country code that decides the thousands and decimal separators |

Prices in `src/data/products.js` are plain numbers in **this** currency. Changing the currency
does not convert them — update the prices too.

### Examples

```js
// US dollars → $1,069.00
currency: { code: 'USD', symbol: '$', position: 'before', decimals: 2, locale: 'en-US' },

// Algerian dinar → 6 900 DA
currency: { code: 'DZD', symbol: 'DA', position: 'after', decimals: 0, locale: 'fr-DZ' },

// Euro (France/Germany style) → 69,00 €
currency: { code: 'EUR', symbol: '€', position: 'after', decimals: 2, locale: 'de-DE' },

// British pound → £1,069.00
currency: { code: 'GBP', symbol: '£', position: 'before', decimals: 2, locale: 'en-GB' },
```

### Full DZD example

To sell in Algerian dinars with free shipping from 15 000 DA and 600 DA shipping below that:

```js
currency: { code: 'DZD', symbol: 'DA', position: 'after', decimals: 0, locale: 'fr-DZ' },
shipping: { flat: 600, freeThreshold: 15000 },
```

…and give the products dinar prices in `src/data/products.js`, e.g. `price: 6900,
compareAtPrice: 8900`. The site then shows `6 900 DA`, "On orders over 15 000 DA" and so on.

## After changing the brand name or the web address

The favicon, social-sharing image, `robots.txt` and `sitemap.xml` are generated from these
settings. They are refreshed automatically by `npm run build`; to refresh them without building:

```bash
npm run seo
```

The browser-tab text and social tags in `index.html` (`%BRAND%`, `%TAGLINE%`, …) are also filled
in automatically from `site.js` — do not replace those placeholders by hand.

## Where these settings appear — a checklist before launch

- [ ] `brandName`, `tagline`, `description`
- [ ] `siteUrl` = your domain, e.g. `'https://www.mystore.com'`
- [ ] `contactEmail` = an inbox you read
- [ ] `currency`, `shipping` and the product prices
- [ ] `returnWindowDays` matches your real policy (and the Return policy text, see guide 05)
- [ ] `instagram` and the Social column in `footer.columns` point to your accounts
