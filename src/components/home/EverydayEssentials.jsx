import essentialsImage from '../../assets/placeholders/essentials.svg'
import { getProductsBySlugs } from '../../data/products'
import ProductGrid from '../product/ProductGrid'
import HomeSection from './HomeSection'

const slugs = ['premium-ream-choodie', 'zipper-hoodie', 'redatlas-tee', 'fleece-hoodie-white']

// Editorial image | 2×2 product grid, 40px apart, equal halves (image stretches to the grid's
// height). Phone: image (aspect 0.6509) stacked above a single-column list.
export default function EverydayEssentials() {
  return (
    <HomeSection
      title="Everyday Essentials"
      subtitle="Timeless tees and hoodies that keep your look effortless, always."
    >
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="zoom-timeline relative aspect-[0.650909] overflow-clip rounded-md md:aspect-auto md:flex-1">
          <div className="zoom-on-scroll absolute -inset-[0.5%]">
            <img src={essentialsImage} alt="" width={900} height={1200} loading="lazy" decoding="async" className="size-full object-cover" />
          </div>
        </div>
        <ProductGrid
          products={getProductsBySlugs(slugs)}
          showBadges={false}
          className="content-start md:flex-1 md:grid-cols-2"
        />
      </div>
    </HomeSection>
  )
}
