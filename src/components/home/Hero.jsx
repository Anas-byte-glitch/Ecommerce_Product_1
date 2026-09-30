import { motion, useReducedMotion } from 'motion/react'
import heroImage from '../../assets/placeholders/hero.svg'
import { site } from '../../config/site'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'

// Timings copied from the reference's Framer appear effects (DESIGN_NOTES §15.1).
const textEase = [0.12, 0.23, 0.5, 1]

// Full-bleed hero under the fixed navbar. Height: 88vh phone, 1.29667 aspect tablet, 100vh
// desktop, never under 700px. Copy sits bottom-left (centered on phone).
export default function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="relative flex min-h-[700px] h-[88vh] flex-col items-center justify-end overflow-clip py-20 pl-4 md:aspect-[1.29667] md:h-auto md:items-start md:pt-[70px] md:pb-[60px] md:pl-10 lg:aspect-auto lg:h-screen lg:py-20">
      <motion.img
        src={heroImage}
        alt=""
        className="absolute inset-0 size-full object-cover"
        initial={reduce ? false : { opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.8, delay: 1 }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.36)_72.44%,rgba(0,0,0,0.6)_100%)] lg:bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_38.21%,rgba(0,0,0,0.6)_100%)]"
      />

      <div className="relative w-full px-4 md:px-8 lg:pr-10 lg:pl-0">
        <div className="flex flex-col items-center gap-6 px-10 text-center md:items-start md:px-0 md:text-left lg:max-w-[600px]">
          <div className="flex flex-col gap-4">
            <Reveal as="h1" y={20} delay={2} duration={1} ease={textEase} className="heading-1 text-white">
              {site.tagline}
            </Reveal>
            <Reveal as="p" y={20} delay={2.1} duration={1} ease={textEase} className="lead max-w-[360px] text-white">
              {site.description}
            </Reveal>
          </div>
          <Reveal y={20} delay={2.2} duration={1} ease={textEase}>
            <Button variant="outline-light" to="/shop/all">
              shop all
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
