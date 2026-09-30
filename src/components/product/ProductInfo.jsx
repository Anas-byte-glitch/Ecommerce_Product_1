import { useEffect, useState } from 'react'
import { site } from '../../config/site'
import { useCartStore } from '../../store/cartStore'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../ui/Button'
import QuantityStepper from './QuantityStepper'
import SizeGuideDrawer from './SizeGuideDrawer'
import SizeSelector from './SizeSelector'
import TrustBadges from './TrustBadges'

const rule = <div aria-hidden="true" className="h-px w-full bg-black/8" />

// Product info column (DESIGN_NOTES §17.2). Blocks 24px apart.
export default function ProductInfo({ product }) {
  const [size, setSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [guideOpen, setGuideOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price

  // Brief "Added" confirmation on the button (interim until the Phase 5 drawer is visible).
  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1500)
    return () => clearTimeout(t)
  }, [added])

  const addToCart = () => {
    addItem(product.slug, size, quantity)
    openCart()
    setAdded(true)
  }

  return (
    <div className="flex w-full flex-col items-start gap-6">
      <div className="flex w-full flex-col gap-8">
        {/* Title + price: the reference reserves a 12px gap + empty price slot under the title. */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[24px] leading-[1.1] md:text-[28px] lg:text-[36px]">{product.name}</h1>
          <p className="flex gap-2 text-body-lg text-slate">
            {site.showPrices && (
              <>
                <span>{formatPrice(product.price)}</span>
                {onSale && (
                  <s className="text-black/32">
                    <span className="sr-only">was </span>
                    {formatPrice(product.compareAtPrice)}
                  </s>
                )}
              </>
            )}
          </p>
        </div>
        <p className="text-muted">{product.description}</p>
        {rule}
      </div>

      <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />

      <button
        type="button"
        onClick={() => setGuideOpen(true)}
        aria-haspopup="dialog"
        className="cursor-pointer border-b border-black text-body-lg text-black"
      >
        Size Guide
      </button>

      <div className="flex w-full gap-4">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <Button variant="primary" onClick={addToCart} className="flex-1">
          <span aria-live="polite">{added ? 'Added' : 'Add to Cart'}</span>
        </Button>
      </div>

      {rule}
      <TrustBadges />

      <SizeGuideDrawer open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  )
}
