import { cn } from '../../utils/cn'
import ProductCard from './ProductCard'

// Grid of ProductCards. One column on phone; callers add breakpoint columns via className
// (e.g. "md:grid-cols-2 lg:grid-cols-4"). Default gap 16px row / 8px column (home, /shop/all);
// pass `gap` to replace it (/shop/hoodies and /shop/shirts use 24px).
export default function ProductGrid({
  products,
  showBadges = true,
  gap = 'gap-x-2 gap-y-4',
  className,
}) {
  return (
    <ul className={cn('grid grid-cols-1', gap, className)}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} showBadge={showBadges} />
        </li>
      ))}
    </ul>
  )
}
