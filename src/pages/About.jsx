import aboutHero from '../assets/placeholders/about-hero.svg'
import AboutSection from '../components/about/AboutSection'
import HeroImage from '../components/ui/HeroImage'
import Reveal from '../components/ui/Reveal'
import { site } from '../config/site'
import { aboutParagraphs, missionBlocks } from '../data/about'
import { team } from '../data/team'
import { appearEase } from '../utils/motion'
import useDocumentTitle from '../hooks/useDocumentTitle'

// /about (DESIGN_NOTES §19.1).
export default function About() {
  useDocumentTitle('About')
  return (
    <>
      {/* Hero: 594px band at every width, centered copy, bottom-heavy gradient, Home-hero appear. */}
      <section className="relative flex h-[594px] flex-col items-center justify-center overflow-clip p-6 md:p-8">
        <HeroImage src={aboutHero} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.36)_72.44%,rgba(0,0,0,0.6)_100%)]"
        />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <Reveal as="h1" y={20} delay={2} duration={1} ease={appearEase} className="heading-1 text-white">
            The Story of {site.brandName}
          </Reveal>
          <Reveal as="p" y={20} delay={2} duration={1} ease={appearEase} className="lead text-white">
            An ongoing journey of design, purpose, and style.
          </Reveal>
        </div>
      </section>

      <AboutSection title="About us">
        <div className="flex flex-col gap-5">
          {aboutParagraphs.map((text) => (
            <p key={text.slice(0, 20)} className="lead text-slate">
              {text}
            </p>
          ))}
        </div>
      </AboutSection>

      <AboutSection title="The team">
        <ul className="grid gap-4 md:grid-cols-2">
          {team.map((m) => (
            <li key={m.name} className="flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-2">
                <img src={m.image} alt={`${m.name}, ${m.role}`} width={600} height={800} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-body-lg font-normal text-slate">{m.name}</h3>
                <p className="text-small font-medium tracking-normal text-muted">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </AboutSection>

      <AboutSection title="Mission">
        <ul className="grid auto-rows-fr gap-6">
          {missionBlocks.map((b) => (
            <li key={b.title} className="zoom-timeline flex flex-col gap-4 overflow-hidden rounded-sm">
              {/* Image zooms 1.2 → 1 as the card scrolls in (same effect as the home tiles). */}
              <div className="relative aspect-[1.059] overflow-clip bg-surface-2">
                <div className="zoom-on-scroll absolute inset-0">
                  <img src={b.image} alt="" width={900} height={1080} loading="lazy" decoding="async" className="size-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] leading-[1.2] text-slate md:text-[22px] lg:text-[26px]">{b.title}</h3>
                <p className="max-w-[550px] text-slate">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </AboutSection>
    </>
  )
}
