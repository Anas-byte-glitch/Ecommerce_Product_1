// Product catalogue. Slugs and names match the Atlas template URLs (/atlas/:slug).
// Prices are placeholders: the reference template does not render prices.
// Images are local neutral placeholders (4:5, 800×1000) in public/images/products.

const img = (slug) => [`/images/products/${slug}-1.svg`, `/images/products/${slug}-2.svg`]

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
      'A heavyweight everyday hoodie with a relaxed fit, brushed-back fleece and a roomy hood. Built to be your default layer.',
    featured: true,
    isNew: false,
    bestSeller: false,
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
      'Not every day calls for a full “fit,” but this hoodie makes the effortless days look intentional. Half-zip collar, soft fleece, clean lines.',
    featured: true,
    isNew: false,
    bestSeller: true,
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
      'Our signature fleece hoodie in deep black. Dense, warm and structured without the bulk.',
    featured: false,
    isNew: true,
    bestSeller: false,
    createdAt: '2025-03-02',
  },
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
      'The fleece hoodie in crisp off-white. Soft hand-feel, ribbed cuffs and a hood that holds its shape.',
    featured: true,
    isNew: true,
    bestSeller: false,
    createdAt: '2025-03-05',
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
      'A boxy cotton tee in bold cobalt with a small chest print. Easy to wear, hard to take off.',
    featured: false,
    isNew: false,
    bestSeller: true,
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
      'A heavyweight black tee with a dropped shoulder and a clean, structured drape.',
    featured: false,
    isNew: false,
    bestSeller: true,
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
      'Crisp white cotton with a bold front graphic. The statement piece of the everyday rotation.',
    featured: false,
    isNew: false,
    bestSeller: true,
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
      'A warm cream tee with an oversized graphic print and a relaxed, boxy fit.',
    featured: false,
    isNew: true,
    bestSeller: true,
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
      'Saturated red cotton with a tonal front graphic. Made to stand out, cut to stay comfortable.',
    featured: true,
    isNew: true,
    bestSeller: false,
    createdAt: '2025-03-10',
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug) ?? null

export const getProductsByCategory = (category) =>
  !category || category === 'all' ? products : products.filter((p) => p.category === category)

// Home sections, in the order the template shows them.
export const getBestSellers = () => products.filter((p) => p.bestSeller)
export const getNewArrivals = () => products.filter((p) => p.isNew)
export const getFeatured = () => products.filter((p) => p.featured)

export const getRelatedProducts = (slug, limit = 4) => {
  const product = getProductBySlug(slug)
  if (!product) return []
  return products.filter((p) => p.slug !== slug && p.category === product.category).slice(0, limit)
}
