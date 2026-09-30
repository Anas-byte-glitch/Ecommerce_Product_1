import { Fragment } from 'react'
import { perks } from '../../data/perks'
import HomeSection from './HomeSection'

// Perks: phone = stacked with 1px horizontal rules; tablet = 2×2 grid (equal rows, no rules);
// desktop = one row of equal columns separated by 1px vertical rules. 24px gaps throughout.
export default function WhyCustomersLoveUs() {
  return (
    <HomeSection
      title="Why Customers Love Us"
      subtitle="Experience premium perks crafted to make every purchase effortless."
      compact
    >
      <ul className="flex flex-col gap-6 md:grid md:auto-rows-fr md:grid-cols-2 lg:flex lg:flex-row">
        {perks.map(({ icon: Icon, title, text }, i) => (
          <Fragment key={title}>
            {i > 0 && (
              <li
                aria-hidden="true"
                className="h-px bg-black/8 md:hidden lg:block lg:h-auto lg:w-px lg:self-stretch"
              />
            )}
            <li className="flex flex-col gap-6 lg:flex-1">
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 text-black/80" />
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[18px] leading-[1.2] md:text-[20px] lg:text-[22px]">{title}</h3>
                <p className="text-muted">{text}</p>
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
    </HomeSection>
  )
}
