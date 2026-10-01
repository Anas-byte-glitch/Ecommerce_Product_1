// Store settings — the single source of truth. Change the brand, currency, shipping and contact
// details here; components never hard-code them (see README "Store settings").
export const site = {
  brandName: 'Atlas', // shown in the wordmark (uppercase, Abril Fatface), titles, footer, copy
  tagline: 'Wear it. Live it. Own it.',
  description: 'Built for movement, made for style—comfort and confidence in motion.',
  year: 2025,
  // Placeholder production URL (used for the sitemap, robots.txt and Open Graph tags).
  siteUrl: 'https://www.example.com',
  contactEmail: 'support@atlas.com',

  // Prices are stored as plain numbers in this currency. `position`: symbol 'before' ($69.00) or
  // 'after' (69 DA); `decimals`: digits after the separator; `locale`: digit grouping/separator.
  currency: { code: 'USD', symbol: '$', position: 'before', decimals: 2, locale: 'en-US' },

  // Cart shipping: free from `freeThreshold` up, otherwise a `flat` rate. No taxes, no discounts.
  shipping: { flat: 8, freeThreshold: 100 },

  // One return window for the whole site (returns page, perks, product trust tile). The template
  // says 14 days on the returns page but 30 elsewhere; we use 30 everywhere (DESIGN_NOTES §19.3).
  returnWindowDays: 30,

  // The template renders no prices on product cards. We show a small muted price under the
  // name (deliberate deviation, see DESIGN_NOTES §14). Set to false for the template look.
  showPrices: true,

  instagram: 'https://www.instagram.com/',

  nav: [
    { label: 'Hoodies', to: '/shop/hoodies' },
    { label: 'Shirts', to: '/shop/shirts' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  // The template uses different labels in the phone menu.
  mobileNav: [
    { label: 'Hoodies', to: '/shop/hoodies' },
    { label: 'Shirts', to: '/shop/shirts' },
    { label: 'Our Story', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ],

  footer: {
    newsletter: 'Sign up to receive 10% off your first order',
    columns: [
      {
        title: 'Quick links',
        links: [
          { label: 'Home', to: '/' },
          { label: 'About Us', to: '/about' },
          { label: 'Shop Hoodies', to: '/shop/hoodies' },
          { label: 'Shop Shirts', to: '/shop/shirts' },
        ],
      },
      {
        title: 'Pages',
        links: [
          { label: 'Contact Us', to: '/contact' },
          { label: 'Return Policy', to: '/returns/return-exchange-policy' },
          { label: '404', to: '/404' },
        ],
      },
      {
        title: 'Social',
        links: [
          { label: 'Twitter', href: 'https://twitter.com/' },
          { label: 'Instagram', href: 'https://www.instagram.com/' },
          { label: 'TikTok', href: 'https://www.tiktok.com/' },
        ],
      },
    ],
  },
}

export const categories = [
  { slug: 'all', label: 'All' },
  { slug: 'hoodies', label: 'Hoodies' },
  { slug: 'shirts', label: 'Shirts' },
]
