import { Link } from 'react-router-dom'
import { categories } from '../../config/site'
import { cn } from '../../utils/cn'

// "All · Hoodies · Shirts": plain Jost text links (20/18/16px, lh 1.6), 16px apart.
// Active = black, others muted → black on hover. Links drop the ?sort param.
export default function CategoryTabs({ active }) {
  return (
    <nav aria-label="Categories" className="max-w-full overflow-x-auto">
      <ul className="flex items-center gap-4">
        {categories.map((c) => {
          const isActive = c.slug === active
          return (
            <li key={c.slug}>
              <Link
                to={`/shop/${c.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'lead block whitespace-nowrap transition-colors duration-200',
                  isActive ? 'text-black' : 'text-muted hover:text-black',
                )}
              >
                {c.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
