import { cn } from '../../utils/cn'
import ProductCard from './ProductCard'

// Grid of ProductCards: 16px row gap / 8px column gap. One column on phone; callers add
// breakpoint columns via className (e.g. "md:grid-cols-2 lg:grid-cols-4").
export default function ProductGrid({ products, showBadges = true, className }) {
  return (
    <ul className={cn('grid grid-cols-1 gap-x-2 gap-y-4', className)}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} showBadge={showBadges} />
        </li>
      ))}
    </ul>
  )
}
