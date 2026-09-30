import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/layout/PagePlaceholder'
import { getProductBySlug } from '../data/products'
import { formatPrice } from '../utils/formatPrice'
import NotFound from './NotFound'

// Placeholder — the product page is built in Phase 4.
export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFound />

  return (
    <PagePlaceholder title={product.name} subtitle={formatPrice(product.price)}>
      <img
        src={product.images[0]}
        alt={product.name}
        className="mt-6 aspect-[4/5] w-full max-w-[334px] object-cover"
      />
    </PagePlaceholder>
  )
}
