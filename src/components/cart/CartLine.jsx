import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { cn } from '../../utils/cn'
import { formatPrice } from '../../utils/formatPrice'
import QuantityStepper from '../product/QuantityStepper'

// One cart line: 4:5 thumbnail, name (links to the product), size, price, stepper, remove.
// `size="lg"` = cart page (120px image, unit price + line total); default = drawer (80px image).
export default function CartLine({ line, size = 'sm', onNavigate }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const { product, quantity, lineTotal } = line
  const large = size === 'lg'
  const href = `/atlas/${product.slug}`

  return (
    <li className="flex gap-4 py-4 md:gap-6">
      <Link
        to={href}
        onClick={onNavigate}
        tabIndex={-1}
        aria-hidden="true"
        className={cn('shrink-0 self-start overflow-hidden rounded-sm bg-surface-2', large ? 'w-24 md:w-[120px]' : 'w-20')}
      >
        <img src={product.images[0]} alt="" width={800} height={1000} decoding="async" className="aspect-[4/5] w-full object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <Link to={href} onClick={onNavigate} className="text-body font-medium text-black hover:underline">
              {product.name}
            </Link>
            <p className="text-small tracking-normal text-muted">
              Size {line.size}
              {large && <> · {formatPrice(product.price)} each</>}
            </p>
          </div>
          <p className="shrink-0 text-body text-slate">{formatPrice(lineTotal)}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <QuantityStepper
            size="sm"
            label={`Quantity for ${product.name}, size ${line.size}`}
            value={quantity}
            onChange={(q) => updateQuantity(product.slug, line.size, q)}
          />
          <button
            type="button"
            onClick={() => removeItem(product.slug, line.size)}
            aria-label={`Remove ${product.name}, size ${line.size}`}
            className="cursor-pointer border-b border-muted text-small tracking-normal text-muted transition-colors hover:border-black hover:text-black"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}
