import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HappyCustomers from '../components/product/HappyCustomers'
import ProductFaq from '../components/product/ProductFaq'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import RelatedProducts from '../components/product/RelatedProducts'
import { site } from '../config/site'
import { getProductBySlug } from '../data/products'
import NotFound from './NotFound'

// /atlas/:slug (DESIGN_NOTES §17). Sections are 10px apart, as on the reference.
export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  // The reference titles product pages "<name> - <site>".
  useEffect(() => {
    if (!product) return
    const previous = document.title
    document.title = `${product.name} - ${site.name}`
    return () => {
      document.title = previous
    }
  }, [product])

  if (!product) return <NotFound />

  return (
    <div className="flex flex-col gap-2.5">
      <section className="px-4 pt-20 pb-16 md:px-8 md:pb-20 lg:px-10 lg:pt-[120px] lg:pb-[100px]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-12 lg:flex-row lg:items-start">
          <div className="lg:flex-1">
            <ProductGallery images={product.images} name={product.name} />
          </div>
          <div className="flex justify-center lg:sticky lg:top-[100px] lg:flex-1">
            <div className="w-full md:max-w-[700px] lg:max-w-[500px]">
              {/* key: reset size / quantity when navigating to another product */}
              <ProductInfo key={product.slug} product={product} />
            </div>
          </div>
        </div>
      </section>
      <ProductFaq />
      <HappyCustomers />
      <RelatedProducts slug={product.slug} />
    </div>
  )
}
