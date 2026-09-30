import { reviews } from '../../data/reviews'
import HomeSection from '../home/HomeSection'
import ReviewCard from './ReviewCard'

// Static grid (no slider): 4 / 2 / 1 columns, gap 16px row / 8px column. Padding 64 / 80 / 100.
export default function HappyCustomers() {
  return (
    <HomeSection
      compact
      title="Happy Customers"
      subtitle="Real voices, real experiences — honest reviews from people who wear our pieces."
    >
      <ul className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review) => (
          <li key={review.name}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </HomeSection>
  )
}
