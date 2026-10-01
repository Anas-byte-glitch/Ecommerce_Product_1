import { useParams, useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import CategoryTabs from '../components/shop/CategoryTabs'
import SortSelect from '../components/shop/SortSelect'
import Container from '../components/ui/Container'
import SectionHeader from '../components/ui/SectionHeader'
import { categories } from '../config/site'
import { getProductsByCategory, SORT_OPTIONS, sortProducts } from '../data/products'
import NotFound from './NotFound'
import useDocumentTitle from '../hooks/useDocumentTitle'

// /shop/:category (DESIGN_NOTES §16). Sort lives in the URL as ?sort=<value> (like the reference);
// "relevance" removes the param.
export default function Shop() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const current = categories.find((c) => c.slug === category)
  useDocumentTitle(current ? (current.slug === 'all' ? 'Shop' : `Shop ${current.label}`) : 'Page not found')
  if (!current) return <NotFound />

  const requested = searchParams.get('sort')
  const sort = SORT_OPTIONS.some((o) => o.value === requested) ? requested : 'relevance'
  const products = sortProducts(getProductsByCategory(category), sort)
  const isAll = category === 'all'

  const setSort = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'relevance') next.delete('sort')
    else next.set('sort', value)
    setSearchParams(next, { replace: true })
  }

  return (
    <section className="pt-[100px] pb-16 md:pb-20 lg:pb-[100px]">
      <Container className="flex flex-col gap-16">
        <SectionHeader
          as="h1"
          title="Find Your Perfect Fit"
          subtitle="Essential pieces refined for quality, durability, and effortless style."
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <CategoryTabs active={category} />
            <SortSelect value={sort} onChange={setSort} />
          </div>

          {products.length > 0 ? (
            <ProductGrid
              products={products}
              showBadges={false}
              gap={isAll ? undefined : 'gap-6'}
              className={isAll ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}
            />
          ) : (
            <p className="py-16 text-center text-muted">
              No {current.label.toLowerCase()} available right now — check back soon.
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
