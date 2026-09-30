import ProductRow from './ProductRow'

const slugs = ['zipper-hoodie', 'chill-vibes-tee', 'black-atlas-tee', 'white-atlas-tee', 'cream-graphic-tee']

export default function NowTrending() {
  return (
    <ProductRow
      title="Now Trending"
      subtitle="Our most-wanted pieces — bestsellers you’ll live in"
      slugs={slugs}
    />
  )
}
