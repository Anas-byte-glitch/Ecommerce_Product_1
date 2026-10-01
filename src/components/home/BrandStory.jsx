import storyImage from '../../assets/placeholders/story.svg'
import Button from '../ui/Button'

// 70vh image banner; the image (110% of the frame) tilts/zooms into place while scrolling.
// Copy bottom-left; the "our story" pill sits under it (phone/tablet) or bottom-right (desktop).
export default function BrandStory() {
  return (
    <section className="tilt-timeline relative flex h-[70vh] items-end overflow-clip">
      <div className="absolute inset-0 overflow-clip">
        <div className="tilt-on-scroll absolute -inset-[5%]">
          <img src={storyImage} alt="" width={1000} height={1200} loading="lazy" decoding="async" className="size-full object-cover" />
        </div>
      </div>

      <div className="relative w-full px-4 pb-5 md:px-10">
        <div className="mx-auto flex max-w-site flex-col items-start gap-2.5 p-4 md:gap-4 md:p-0 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="heading-tile max-w-[600px] text-white">
            Learn what defines our pursuit of modern luxury — intentional design and lasting
            quality.
          </h2>
          <Button variant="outline-light" to="/about">
            our story
          </Button>
        </div>
      </div>
    </section>
  )
}
