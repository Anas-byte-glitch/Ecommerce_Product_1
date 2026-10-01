import ProductRow from './ProductRow'

const slugs = ['fleece-hoodie-white', 'red-studio-tee', 'black-hoodie', 'cream-crew-tee']

// No badges in this section.
export default function NewThisSeason() {
  return (
    <ProductRow
      title="New this season"
      subtitle="Fresh drops you don’t want to miss — new styles, new energy."
      slugs={slugs}
      showBadges={false}
    />
  )
}
