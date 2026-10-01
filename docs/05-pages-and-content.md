# 05 — Pages and content

Where every piece of text and every link lives. After editing, save — `npm run dev` shows the
change immediately; `npm run build` makes it permanent in `dist/`.

> Text in `.js` files is written between quotes: `'…'` or `` `…` ``. If your text contains an
> apostrophe, use the typographic one (’) or write the text between backticks `` ` ` `` — a plain
> `'` inside `'…'` ends the text early and breaks the page.
>
> Text in `.jsx` files is written between tags, e.g. `<p>Your text</p>`; you can type it
> directly.

## Navigation (top bar and phone menu)

`src/config/site.js`:

```js
nav: [
  { label: 'Hoodies', to: '/shop/hoodies' },
  { label: 'Shirts', to: '/shop/shirts' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
],
mobileNav: [ … same format, used in the phone menu … ],
```

`label` is the text, `to` is a page of the store. Available pages: `/`, `/shop/all`,
`/shop/hoodies`, `/shop/shirts`, `/product/<slug>`, `/about`, `/contact`,
`/returns/return-exchange-policy`, `/cart`. Keep it to 4–5 links so the bar does not wrap.

## Footer

`src/config/site.js` → `footer`:

```js
footer: {
  newsletter: 'Sign up to receive 10% off your first order',
  columns: [
    { title: 'Quick links', links: [ { label: 'Home', to: '/' }, … ] },
    { title: 'Pages', links: [ … ] },
    { title: 'Social', links: [ { label: 'Instagram', href: 'https://www.instagram.com/yourshop' }, … ] },
  ],
},
```

- Use `to` for pages of the store and `href` for other websites (they open in a new tab).
- The copyright line uses `year` and `brandName`.
- The "Follow us on Instagram" button on Home uses `instagram`.

## Home page

| Section | File |
| --- | --- |
| Hero title and subtitle | `tagline` and `description` in `src/config/site.js`; button: `src/components/home/Hero.jsx` |
| "Now Trending", "New this season" titles and products | `src/components/home/NowTrending.jsx`, `NewThisSeason.jsx` |
| "Shirts" / "Hoodies" tiles | `src/components/home/CategoryCards.jsx` |
| Brand story banner text | `src/components/home/BrandStory.jsx` |
| "Everyday Essentials" | `src/components/home/EverydayEssentials.jsx` |
| "Why Customers Love Us" perks | `src/data/perks.js` (`perks`); section title in `src/components/home/WhyCustomersLoveUs.jsx` |
| Instagram strip photos | see [IMAGES.md](IMAGES.md) |

## About page

- Hero title "The Story of {brand}" and subtitle: `src/pages/About.jsx`.
- The three "About us" paragraphs and the two "Mission" blocks: `src/data/about.js`
  (`aboutParagraphs`, `missionBlocks`). `${site.brandName}` inside a paragraph inserts your
  brand name.
- Team: `src/data/team.js`. Each member is `{ name, role, image }`; the photo is set with
  `photo('about/team-1', team1)` (see [IMAGES.md](IMAGES.md)). The demo team members are
  fictional people — replace them with your own team or remove the block. To remove the whole
  "The team" section, delete the `<AboutSection title="The team">…</AboutSection>` block in
  `src/pages/About.jsx`.

## Contact page

- Title "24/7 Available" and the short text: `src/pages/Contact.jsx`.
- Form fields and messages: `src/components/contact/ContactForm.jsx` (field checks in
  `validateContact.js`). **The form sends nothing** — see [07 — Next steps](07-next-steps.md)
  to connect a form service.
- The FAQ under the form is the same as on product pages (`src/data/faqs.js`).

## Return policy

`src/pages/ReturnPolicy.jsx` contains the whole text as headings (`<h2 className={h2}>`), lists
(`<ul className={ul}>` with `<li>` items) and paragraphs (`<p className={p}>`).

- The number of days comes from `returnWindowDays` and the email from `contactEmail` in
  `src/config/site.js` — they update automatically.
- Everything else (48-hour damage claims, 3–5 business days refunds, who pays return shipping,
  non-returnable items) is example text: **adapt it to your real policy and local law.**
- The FAQ answers mention returns too — keep them consistent.

## FAQ (product pages and Contact page)

`src/data/faqs.js` — a list of `{ question, answer }`. Add, remove or reorder entries freely.

## Product page sections shared by all products

| Content | File |
| --- | --- |
| Size guide table and intro | `src/data/sizeGuide.js` |
| "Happy Customers" reviews (name, rating 1–5, text, avatar) | `src/data/reviews.js` — the demo reviewers are fictional; replace them with real reviews only |
| Trust badges (Secure checkout, Easy returns, …) | `productPerks` in `src/data/perks.js` |
| Section titles | `src/components/product/HappyCustomers.jsx`, `ProductFaq.jsx`, `RelatedProducts.jsx` |

## 404 page

`src/pages/NotFound.jsx` — title, subtitle and button. Its photo: see [IMAGES.md](IMAGES.md).

## Browser tab titles

Each page sets its title with `useDocumentTitle('About')` at the top of its file in
`src/pages/`; the brand name is added automatically ("About — Halvo").

## Keep the layout tidy

The layout was designed around texts of the current length. Much longer titles or names wrap to
more lines, which is fine but changes the rhythm of the page — check phone, tablet and desktop
widths (in the browser: right-click → Inspect → device toolbar).
