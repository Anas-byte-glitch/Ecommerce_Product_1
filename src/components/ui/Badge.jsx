import { cn } from '../../utils/cn'

// "Sale" / "New in" label: black block, 10px/600 white text.
export default function Badge({ children, className }) {
  if (!children) return null
  return (
    <span
      className={cn(
        'font-badge-alt inline-flex h-6 items-center bg-black px-3 text-badge font-semibold text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
