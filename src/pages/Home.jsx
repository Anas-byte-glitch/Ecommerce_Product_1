import BrandStory from '../components/home/BrandStory'
import CategoryCards from '../components/home/CategoryCards'
import EverydayEssentials from '../components/home/EverydayEssentials'
import Hero from '../components/home/Hero'
import InstagramStrip from '../components/home/InstagramStrip'
import NewThisSeason from '../components/home/NewThisSeason'
import NowTrending from '../components/home/NowTrending'
import WhyCustomersLoveUs from '../components/home/WhyCustomersLoveUs'

// Section order matches the reference home page.
export default function Home() {
  return (
    <>
      <Hero />
      <NowTrending />
      <CategoryCards />
      <NewThisSeason />
      <BrandStory />
      <EverydayEssentials />
      <WhyCustomersLoveUs />
      <InstagramStrip />
    </>
  )
}
