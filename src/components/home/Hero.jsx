import heroImage from '../../assets/placeholders/hero.svg'
import { site } from '../../config/site'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import HeroImage from '../ui/HeroImage'
import Reveal from '../ui/Reveal'
import { appearEase } from '../../utils/motion'


// Full-bleed hero under the fixed navbar. Height: 88vh phone, 1.29667 aspect tablet, 100vh
// desktop, never under 700px. Copy sits bottom-left (centered on phone).
// Also used by the 404 page (same layout on the reference) with its own copy / image.
export default function Hero({
  image = heroImage,
  title = site.tagline,
  subtitle = site.description,
  cta = { label: 'shop all', to: '/shop/all' },
  flushTablet = false, // 404: copy aligns with the 40px section padding on tablet (no extra 32px)
}) {
  return (
    <section className="relative flex min-h-[700px] h-[88vh] flex-col items-center justify-end overflow-clip py-20 pl-4 md:aspect-[1.29667] md:h-auto md:items-start md:pt-[70px] md:pb-[60px] md:pl-10 lg:aspect-auto lg:h-screen lg:py-20">
      <HeroImage src={image} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.36)_72.44%,rgba(0,0,0,0.6)_100%)] lg:bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_38.21%,rgba(0,0,0,0.6)_100%)]"
      />

      <div className={cn('relative w-full px-4 md:px-8 lg:pr-10 lg:pl-0', flushTablet && 'md:pl-0')}>
        <div className="flex flex-col items-center gap-6 px-10 text-center md:items-start md:px-0 md:text-left lg:max-w-[600px]">
          <div className="flex flex-col gap-4">
            <Reveal as="h1" y={20} delay={2} duration={1} ease={appearEase} className="heading-1 text-white">
              {title}
            </Reveal>
            <Reveal as="p" y={20} delay={2.1} duration={1} ease={appearEase} className="lead max-w-[360px] text-white">
              {subtitle}
            </Reveal>
          </div>
          <Reveal y={20} delay={2.2} duration={1} ease={appearEase}>
            <Button variant="outline-light" to={cta.to}>
              {cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
