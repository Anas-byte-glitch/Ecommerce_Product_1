import { site } from '../../config/site'
import { images as pageImages } from '../../data/images'
import Button from '../ui/Button'
import Img from '../ui/Img'

const images = pageImages.instagram
// Three copies so the loop (translate −1/3) never shows a gap, even on very wide screens.
const loop = [...images, ...images, ...images]

// Auto-scrolling marquee: 360×380 tiles (radius 4) every 376px, right → left at 100px/s,
// no pause on hover, edges faded with a 12.5% mask. The button floats at the block's center.
export default function InstagramStrip() {
  return (
    <section className="relative pt-16 md:pt-20 lg:pt-[100px]">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_12.5%,#000_87.5%,transparent_100%)]">
        <ul className="flex w-max animate-marquee motion-reduce:animate-none">
          {loop.map((image, i) => (
            <li key={i} aria-hidden={i >= images.length} className="h-[380px] w-[376px] shrink-0 pr-4">
              <Img image={image} sizes="360px" alt={i >= images.length ? '' : undefined} className="size-full rounded-sm object-cover" />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
        <Button variant="dark" href={site.instagram} icon={false}>
          Follow us on Instagram
        </Button>
      </div>
    </section>
  )
}
