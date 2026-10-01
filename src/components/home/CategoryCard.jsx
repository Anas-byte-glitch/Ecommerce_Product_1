import Button from '../ui/Button'

// Collection tile (≈8:7, 1.1429): image zooms 1.2 → 1 as it scrolls in, black→20% top gradient,
// title top-left + "shop now" bottom-left (phone: both stacked at the bottom).
export default function CategoryCard({ title, to, image }) {
  return (
    <div className="zoom-timeline relative aspect-[1.1429] overflow-clip rounded-sm md:flex-1">
      <div className="zoom-on-scroll absolute -inset-[0.5%]">
        <img src={image} alt="" width={1200} height={1200} loading="lazy" decoding="async" className="size-full object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -inset-[0.5%] bg-[linear-gradient(rgb(0,0,0)_0%,rgba(0,0,0,0.2)_32.69%)]"
      />
      <div className="absolute inset-x-4 bottom-4 flex flex-col items-start gap-6 md:inset-x-8 md:top-4 md:justify-between md:gap-0 lg:inset-x-10 lg:top-5 lg:bottom-5">
        <h2 className="heading-tile text-white">{title}</h2>
        <Button variant="light" to={to}>
          shop now
        </Button>
      </div>
    </div>
  )
}
