import hoodiesImage from '../../assets/placeholders/category-hoodies.svg'
import shirtsImage from '../../assets/placeholders/category-shirts.svg'
import CategoryCard from './CategoryCard'

// Full-bleed pair of collection tiles, 8px apart: side by side on tablet/desktop, stacked on phone.
export default function CategoryCards() {
  return (
    <section aria-label="Collections" className="flex flex-col gap-2 md:flex-row">
      <CategoryCard title="Shirts" to="/shop/shirts" image={shirtsImage} />
      <CategoryCard title="Hoodies" to="/shop/hoodies" image={hoodiesImage} />
    </section>
  )
}
