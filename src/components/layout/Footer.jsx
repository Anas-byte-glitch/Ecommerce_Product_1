import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import NewsletterForm from './NewsletterForm'

const linkClass = 'block text-body text-white transition-colors duration-200 hover:text-white/80'

function FooterLink({ link }) {
  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
        {link.label}
      </a>
    )
  }
  return (
    <Link to={link.to} className={linkClass}>
      {link.label}
    </Link>
  )
}

function Divider() {
  return <hr className="w-full border-0 border-t border-white/10" />
}

// Footer (DESIGN_NOTES §8).
// Phone: stacked, gap 40, 2-col links. Tablet: stacked, gap 60, 3-col links (gap 64).
// Desktop: newsletter left / columns right, then divider + copyright.
export default function Footer() {
  const { footer } = site

  return (
    <div className="relative z-[1] md:sticky md:bottom-0">
      <footer className="bg-black px-4 py-16 text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
        <div className="mx-auto flex max-w-site flex-col gap-10">
          <div className="flex flex-col gap-10 md:gap-[60px] lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <p className="text-body text-white">{footer.newsletter}</p>
              <NewsletterForm />
            </div>

            <div className="lg:hidden">
              <Divider />
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-3 md:gap-x-16 lg:flex lg:gap-12">
              {footer.columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-4 md:gap-6 lg:gap-4">
                  <h2 className="text-small font-medium tracking-normal text-white/80">{col.title}</h2>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <FooterLink link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          <p className="text-small font-medium tracking-normal text-white/80">
            Copyright © {site.year} - {site.brandName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
