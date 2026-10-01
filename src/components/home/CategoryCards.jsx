import { images } from '../../data/images'
import CategoryCard from './CategoryCard'

// Full-bleed pair of collection tiles, 8px apart: side by side on tablet/desktop, stacked on phone.
export default function CategoryCards() {
  return (
    <section aria-label="Collections" className="mx-auto flex w-full max-w-site flex-col gap-2 md:flex-row">
      <CategoryCard title="Shirts" to="/shop/shirts" image={images.categoryShirts} />
      <CategoryCard title="Hoodies" to="/shop/hoodies" image={images.categoryHoodies} />
    </section>
  )
}
