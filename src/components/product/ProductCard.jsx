import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { cn } from '../../utils/cn'
import { formatPrice } from '../../utils/formatPrice'
import Badge from '../ui/Badge'
import Img from '../ui/Img'

// Product tile: 4:5 image (radius 4) → 16px → name (16/500).
// Hover: the main image fades out (200ms) over the alternate image, which zooms to 1.05.
// `badge` overrides the product's own badge label (e.g. "New in" on every related item).
// Cards are 1 column on phone, 2–3 on tablet, up to 4 on desktop.
const SIZES = '(min-width: 1200px) 25vw, (min-width: 810px) 34vw, 100vw'

export default function ProductCard({ product, showBadge = true, badge, className }) {
  const [main, alt] = product.images
  const badgeLabel = badge ?? product.badge
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price

  return (
    <Link to={`/product/${product.slug}`} className={cn('group flex flex-col gap-4', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-2">
        {alt && (
          <Img
            image={alt}
            sizes={SIZES}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out-soft group-hover:scale-105"
          />
        )}
        <Img
          image={main}
          sizes={SIZES}
          alt={product.name}
          loading="lazy"
          className={cn(
            'absolute inset-0 size-full object-cover',
            alt && 'transition-opacity duration-200 ease-out group-hover:opacity-0',
          )}
        />
        {showBadge && badgeLabel && (
          <Badge className="absolute bottom-2.5 left-2.5">{badgeLabel}</Badge>
        )}
      </div>

      {/* min 28px: 4px stay reserved under the name even without a price. */}
      <div className="flex min-h-7 flex-col gap-1">
        <h3 className="text-body">{product.name}</h3>
        {site.showPrices && (
          <p className="flex gap-2 text-small text-muted">
            <span>{formatPrice(product.price)}</span>
            {onSale && (
              <s className="text-muted">
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
