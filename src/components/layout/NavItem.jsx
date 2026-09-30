import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'

// Nav link with the reference's hover effect: a 1px black underline that grows left → right.
export default function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn('group relative block text-nav font-medium text-ink', isActive && 'is-active')
      }
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black transition-transform duration-300 ease-out-soft group-hover:scale-x-100 group-[.is-active]:scale-x-100"
      />
    </NavLink>
  )
}
