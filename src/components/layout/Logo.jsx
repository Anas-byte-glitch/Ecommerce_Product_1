import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { cn } from '../../utils/cn'

// Wordmark: Abril Fatface, uppercase, 16px phone / 20px tablet+desktop.
export default function Logo({ className }) {
  return (
    <Link
      to="/"
      aria-label={`${site.brandName} — home`}
      className={cn('font-logo text-[16px] leading-none uppercase text-ink md:text-[20px]', className)}
    >
      {site.brandName.toLowerCase()}
    </Link>
  )
}
