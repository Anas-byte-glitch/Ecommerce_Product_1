import { Link, useParams } from 'react-router-dom'
import PagePlaceholder from '../components/layout/PagePlaceholder'
import { categories } from '../config/site'
import { getProductsByCategory } from '../data/products'
import { cn } from '../utils/cn'
import NotFound from './NotFound'

// Placeholder — the collection page is built in Phase 3.
export default function Shop() {
  const { category } = useParams()
  const current = categories.find((c) => c.slug === category)
  if (!current) return <NotFound />

  const products = getProductsByCategory(category)

  return (
    <PagePlaceholder
      title="Find Your Perfect Fit"
      subtitle={`${current.label} — ${products.length} products`}
    >
      <nav aria-label="Categories" className="mt-4 flex gap-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/shop/${c.slug}`}
            className={cn('lead', c.slug === category ? 'text-black' : 'text-muted')}
          >
            {c.label}
          </Link>
        ))}
      </nav>
      <ul className="mt-6 flex flex-col gap-2 text-muted">
        {products.map((p) => (
          <li key={p.slug}>
            <Link to={`/atlas/${p.slug}`} className="underline-offset-4 hover:underline">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  )
}
