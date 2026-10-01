import ProductRow from './ProductRow'

const slugs = ['zipper-hoodie', 'chill-vibes-tee', 'black-basic-tee', 'white-crew-tee', 'cream-crew-tee']

export default function NowTrending() {
  return (
    <ProductRow
      title="Now Trending"
      subtitle="Our most-wanted pieces — bestsellers you’ll live in"
      slugs={slugs}
    />
  )
}
