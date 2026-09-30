// Brand configuration — change the brand here, never hard-code it in components.
export const site = {
  name: 'Atlas',
  logo: 'atlas', // rendered uppercase in the wordmark font
  tagline: 'Wear it. Live it. Own it.',
  description: 'Built for movement, made for style—comfort and confidence in motion.',
  year: 2025,
  currency: 'USD',
  locale: 'en-US',
  // Cart shipping: free from this subtotal up, otherwise a flat rate (placeholder amount).
  // No taxes, no discount codes.
  freeShippingThreshold: 100,
  flatShipping: 8,
  email: 'support@atlas.com',

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
