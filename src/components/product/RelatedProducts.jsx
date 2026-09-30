import { getRelatedProducts } from '../../data/products'
import Container from '../ui/Container'
import ProductGrid from './ProductGrid'

// "You may also Like": 4 other products (same category first), every card badged "New in" like
// the reference. Grid as the shop category pages: 4 / 2 / 1 columns, 24px gaps.
// Padding: 64 / 80 top; bottom 0 on phone/tablet, 100 on desktop.
export default function RelatedProducts({ slug }) {
  const products = getRelatedProducts(slug, 4)
  if (!products.length) return null
  return (
    <section className="pt-16 md:pt-20 lg:py-[100px]">
      <Container className="flex flex-col gap-12">
        <h2 className="heading-2 text-center">You may also Like</h2>
        <ProductGrid products={products} badge="New in" gap="gap-6" className="md:grid-cols-2 lg:grid-cols-4" />
      </Container>
    </section>
  )
}
