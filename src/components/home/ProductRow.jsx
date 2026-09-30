import { getProductsBySlugs } from '../../data/products'
import ProductGrid from '../product/ProductGrid'
import HomeSection from './HomeSection'

// Titled product grid ("Now Trending", "New this season"): 1 / 2 / 4 columns.
// The reference renders it as a static grid (no slider, arrows or drag) at every breakpoint.
export default function ProductRow({ title, subtitle, slugs, showBadges = true }) {
  return (
    <HomeSection title={title} subtitle={subtitle}>
      <ProductGrid
        products={getProductsBySlugs(slugs)}
        showBadges={showBadges}
        className="md:grid-cols-2 lg:grid-cols-4"
      />
    </HomeSection>
  )
}
