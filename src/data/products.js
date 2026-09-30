// Product catalogue. Slugs and names match the Atlas template URLs (/atlas/:slug).
// Array order = "Relevance" order = the reference's /shop/all order.
// salesRank: lower = better seller (drives "Best Selling").
// Prices are placeholders: the reference template does not render prices.
// Images are local neutral placeholders (4:5, 800×1000) in public/images/products; `images` is
// also the product-page gallery (the reference shows exactly 2 per product).
// Descriptions are the reference's product copy.

const img = (slug) => [`/images/products/${slug}-1.svg`, `/images/products/${slug}-2.svg`]

// The reference offers S, M and L for every product (it lists them L, S, M — Shopify variant order).
const SIZES = ['S', 'M', 'L']

export const products = [
  // ── Hoodies ────────────────────────────────────────────────
  {
    slug: 'premium-ream-choodie',
    name: 'Classic comfort hoodie',
    category: 'hoodies',
    price: 79,
    compareAtPrice: null,
    badge: null,
    images: img('premium-ream-choodie'),
    sizes: SIZES,
    colors: ['Sand'],
    description:
      'Some hoodies try too hard. This one doesn’t have to. Soft, clean, and timeless, it’s the kind of piece you reach for without thinking—because it never lets you down. Made from a mid-weight ultra-soft fleece blend, it features a relaxed everyday fit with a full front zipper for quick on-and-off wear. The soft brushed interior ensures maximum comfort, making it perfect for casual days, layering, and slow weekends. Ribbed cuffs and hem provide a snug, finished look.',
    featured: true,
    isNew: false,
    bestSeller: false,
    salesRank: 6,
    createdAt: '2025-01-10',
  },
  {
    slug: 'zipper-hoodie',
    name: 'Zipper hoodie',
    category: 'hoodies',
    price: 69,
    compareAtPrice: 89,
    badge: 'Sale',
    images: img('zipper-hoodie'),
    sizes: SIZES,
    colors: ['Heather grey'],
    description:
      'Not every day calls for a full “fit,” but this hoodie makes even the lazy days look intentional. Smooth, simple, and effortlessly sharp—zip it up, head out, and let the comfort do the talking. Made from a mid-weight fleece blend, it features a regular, easygoing fit with a full front zipper for quick on-and-off wear. The soft brushed interior ensures maximum comfort, while side pockets hold essentials—or warm your hands. Ribbed cuffs and hem provide a snug, finished look.',
    featured: true,
    isNew: false,
    bestSeller: true,
    salesRank: 1,
    createdAt: '2025-01-18',
  },
  {
    slug: 'black-hoodie',
    name: 'Fleece hoodie black',
    category: 'hoodies',
    price: 75,
    compareAtPrice: null,
    badge: 'New in',
    images: img('black-hoodie'),
    sizes: SIZES,
    colors: ['Black'],
    description:
      'You don’t have to be headed to a mountain cabin to wear this, but it definitely feels like you should be. Warm, clean, and designed for the soft-life days when comfort and style work together effortlessly. Crafted from a mid-weight fleece blend, it features a relaxed, cozy fit with an adjustable drawstring hood and soft brushed interior for maximum comfort. The kangaroo pocket keeps hands warm—or hides snacks, no judgment—while ribbed cuffs and hem provide a snug, finished look.',
    featured: false,
    isNew: true,
    bestSeller: false,
    salesRank: 7,
    createdAt: '2025-03-02',
  },

  // ── Shirts ─────────────────────────────────────────────────
  {
    slug: 'chill-vibes-tee',
    name: 'Chill vibes tee',
    category: 'shirts',
    price: 35,
    compareAtPrice: 45,
    badge: 'Sale',
    images: img('chill-vibes-tee'),
    sizes: SIZES,
    colors: ['Cobalt'],
    description:
      'Maybe you’re not on a beach right now, but this tee does a pretty good job pretending you are. Easygoing, clean, and effortlessly cool—because sometimes the simplest pieces say the most. Made from a softweight cotton blend, it features a classic relaxed fit and short sleeve crew neck for comfortable, everyday wear. The right-chest white logo adds a clean, minimal touch, while the reinforced neckline keeps its shape and the smooth, breathable fabric ensures all-day comfort.',
    featured: false,
    isNew: false,
    bestSeller: true,
    salesRank: 2,
    createdAt: '2025-01-22',
  },
  {
    slug: 'black-atlas-tee',
    name: 'Black atlas tee',
    category: 'shirts',
    price: 39,
    compareAtPrice: 49,
    badge: 'Sale',
    images: img('black-atlas-tee'),
    sizes: SIZES,
    colors: ['Black'],
    description:
      'The simplest pieces always hit the hardest. This tee keeps things sharp, minimal, and effortlessly cool—no logos needed, just pure everyday confidence. Made from a softweight cotton blend, it offers a classic fit and short sleeve crew neck for comfortable, versatile wear. Its clean, minimalist design pairs with literally anything, while the reinforced neckline keeps its shape and the durable fabric and print are built to last wash after wash.',
    featured: false,
    isNew: false,
    bestSeller: true,
    salesRank: 3,
    createdAt: '2025-02-01',
  },
  {
    slug: 'white-atlas-tee',
    name: 'White atlas graphic tee',
    category: 'shirts',
    price: 39,
    compareAtPrice: 49,
    badge: 'Sale',
    images: img('white-atlas-tee'),
    sizes: SIZES,
    colors: ['White'],
    description:
      'If wanderlust had a uniform, this tee would be it. Clean, crisp, and effortlessly cool, it brings that “always exploring” vibe without trying too hard. Made from a softweight cotton blend, it features a white base with a detailed atlas-inspired graphic for a modern, adventurous touch. The classic relaxed fit and short sleeve crew neck make it perfect for everyday wear, while the soft, breathable fabric ensures all-day comfort. Reinforced neckline keeps its shape, and the durable print stays sharp through countless washes.',
    featured: false,
    isNew: false,
    bestSeller: true,
    salesRank: 4,
    createdAt: '2025-02-08',
  },
  {
    slug: 'cream-graphic-tee',
    name: 'Cream atlas graphic tee',
    category: 'shirts',
    price: 39,
    compareAtPrice: 49,
    badge: 'Sale',
    images: img('cream-graphic-tee'),
    sizes: SIZES,
    colors: ['Cream'],
    description:
      'You don’t have to travel the world to look like you’ve been everywhere—this tee gives off seasoned-explorer energy all on its own. Clean, classic, and made from a softweight cotton blend, it features a cream color with an atlas-inspired graphic. Designed with a classic fit and short sleeve crew neck, it pairs effortlessly with literally anything. The reinforced neckline keeps its shape, while the durable print is built to last wash after wash.',
    featured: false,
    isNew: true,
    bestSeller: true,
    salesRank: 5,
    createdAt: '2025-02-20',
  },
  {
    slug: 'redatlas-tee',
    name: 'Red atlas tee',
    category: 'shirts',
    price: 42,
    compareAtPrice: null,
    badge: 'New in',
    images: img('redatlas-tee'),
    sizes: SIZES,
    colors: ['Red'],
    description:
      'You don’t need ink to look like you’ve got attitude—this tee does the talking for you. With bold color, a clean fit, and a tattoo-inspired graphic, it adds just the right amount of edge. Made from a softweight cotton blend, it features a classic fit for everyday wear, a short sleeve crew neck, and a reinforced neckline to maintain its shape. The durable print is designed to last wash after wash, keeping your statement style strong.',
    featured: true,
    isNew: true,
    bestSeller: false,
    salesRank: 8,
    createdAt: '2025-03-10',
  },

  // ── Hoodie listed last on the reference's /shop/all ─────────
  {
    slug: 'fleece-hoodie-white',
    name: 'Fleece hoodie white',
    category: 'hoodies',
    price: 75,
    compareAtPrice: null,
    badge: 'New in',
    images: img('fleece-hoodie-white'),
    sizes: SIZES,
    colors: ['White'],
    description:
      'You don’t have to be headed to a mountain cabin to wear this, but it definitely feels like you should be. Warm, clean, and built for the soft-life days when comfort and style decide to work together. Crafted from a mid-weight fleece blend, it offers a relaxed, cozy fit with an adjustable drawstring hood and soft brushed interior for maximum comfort. The kangaroo pocket keeps hands warm—or hides snacks, no judgment—while ribbed cuffs and hem provide a snug, finished look.',
    featured: true,
    isNew: true,
    bestSeller: false,
    salesRank: 9,
    createdAt: '2025-03-05',
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) ?? null

// Keeps the order of `slugs`; unknown slugs are skipped.
export const getProductsBySlugs = (slugs) => slugs.map(getProductBySlug).filter(Boolean)

export const getProductsByCategory = (category) =>
  !category || category === 'all' ? products : products.filter((p) => p.category === category)

// Home sections, in the order the template shows them.
export const getBestSellers = () => products.filter((p) => p.bestSeller)
export const getNewArrivals = () => products.filter((p) => p.isNew)
export const getFeatured = () => products.filter((p) => p.featured)

// Shop sort options. Values are the reference's `?sort=` query values.
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'title_asc', label: 'A-Z' },
  { value: 'title_desc', label: 'Z-A' },
  { value: 'price_asc', label: 'Price (lowest first)' },
  { value: 'price_desc', label: 'Price (highest first)' },
  { value: 'newest', label: 'Newest' },
  { value: 'best_selling', label: 'Best Selling' },
]

const byName = (a, b) => a.name.localeCompare(b.name)
const comparators = {
  title_asc: byName,
  title_desc: (a, b) => byName(b, a),
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  best_selling: (a, b) => a.salesRank - b.salesRank,
}

// Returns a new array; unknown sort / "relevance" keeps catalogue order (the sort is stable).
export const sortProducts = (list, sort) => {
  const compare = comparators[sort]
  return compare ? [...list].sort(compare) : [...list]
}

// "You may also like": other products from the same category, topped up from the rest of the
// catalogue when the category has fewer than `limit` others. Catalogue order.
export const getRelatedProducts = (slug, limit = 4) => {
  const product = getProductBySlug(slug)
  if (!product) return []
  const others = products.filter((p) => p.slug !== slug)
  const same = others.filter((p) => p.category === product.category)
  const rest = others.filter((p) => p.category !== product.category)
  return [...same, ...rest].slice(0, limit)
}
