import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { cn } from '../../utils/cn'
import { formatPrice } from '../../utils/formatPrice'
import Badge from '../ui/Badge'

// Product tile (DESIGN_NOTES §15.2): 4:5 image (radius 4) → 16px → name (16/500).
// Hover: the main image fades out (200ms) over the alternate image, which zooms to 1.05.
export default function ProductCard({ product, showBadge = true, className }) {
  const [main, alt] = product.images
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price

  return (
    <Link to={`/atlas/${product.slug}`} className={cn('group flex flex-col gap-4', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-2">
        {alt && (
          <img
            src={alt}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out-soft group-hover:scale-105"
          />
        )}
        <img
          src={main}
          alt={product.name}
          loading="lazy"
          className={cn(
            'absolute inset-0 size-full object-cover',
            alt && 'transition-opacity duration-200 ease-out group-hover:opacity-0',
          )}
        />
        {showBadge && product.badge && (
          <Badge className="absolute bottom-2.5 left-2.5">{product.badge}</Badge>
        )}
      </div>

      {/* min 28px: the reference reserves 4px under the name even without a price. */}
      <div className="flex min-h-7 flex-col gap-1">
        <h3 className="text-body">{product.name}</h3>
        {site.showPrices && (
          <p className="flex gap-2 text-small text-muted">
            <span>{formatPrice(product.price)}</span>
            {onSale && (
              <s className="text-black/32">
                <span className="sr-only">was </span>
                {formatPrice(product.compareAtPrice)}
              </s>
            )}
          </p>
        )}
      </div>
    </Link>
  )
}
