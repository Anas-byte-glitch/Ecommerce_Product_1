import { cn } from '../../utils/cn'

// Max-width 1600px wrapper with the template's gutters: 16px phone / 32px tablet / 40px desktop.
export default function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-site px-4 md:px-8 lg:px-10', className)} {...props}>
      {children}
    </Tag>
  )
}
