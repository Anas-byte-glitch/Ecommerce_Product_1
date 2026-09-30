import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../utils/cn'

// Variants measured on the reference — see docs/DESIGN_NOTES.md §9.
const base =
  'group inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  // Hero "shop all" / "our story": transparent pill, white border.
  'outline-light':
    'h-10 gap-2 rounded-full border border-white px-[19px] text-body font-medium text-white',
  // Collection tile "shop now": white pill, grey border, Jost label.
  light:
    'h-10 gap-2 rounded-full border border-muted bg-white px-[19px] font-jost text-body leading-[1.1] font-medium text-slate',
  // "Add to Cart": solid black block.
  primary: 'h-14 gap-2 bg-black px-6 text-body font-normal text-white hover:bg-slate',
  // "Follow us on Instagram": small dark tag-like button.
  dark: 'gap-2 rounded-sm bg-black px-3 py-1 text-body text-white hover:bg-slate',
  // Footer "Subscribe".
  subscribe:
    'rounded-sm bg-white p-4 text-small leading-[1.2] font-normal tracking-normal text-ink shadow-[0_2px_4px_rgba(0,0,0,0.25)]',
}

// Pills carry the ↗ icon that rotates 45° (to →) on hover.
const pillIcon = {
  'outline-light': 'size-4 text-white',
  light: 'size-[18px] text-black',
}

export default function Button({
  variant = 'primary',
  to,
  href,
  icon,
  className,
  children,
  type = 'button',
  ...props
}) {
  const showIcon = icon ?? variant in pillIcon
  const classes = cn(base, variants[variant], className)
  const content = (
    <>
      <span>{children}</span>
      {showIcon && (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            'transition-transform duration-300 ease-out-soft group-hover:rotate-45',
            pillIcon[variant] ?? 'size-4',
          )}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  )
}
