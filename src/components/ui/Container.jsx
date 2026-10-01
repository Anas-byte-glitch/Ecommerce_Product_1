import { cn } from '../../utils/cn'

// Page wrapper with the site gutters: 16px phone / 32px tablet / 40px desktop.
// Above 1600px: content is capped at 1600px (box 1680 incl. gutters), for
// home/shop/product sections; `narrow` caps the box itself at 1600 (About).
export default function Container({ as: Tag = 'div', narrow = false, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 md:px-8 lg:px-10',
        narrow ? 'max-w-site' : 'max-w-site-wide',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
