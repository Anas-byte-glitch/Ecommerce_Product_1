import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../../config/site'
import { cn } from '../../utils/cn'
import CartButton from './CartButton'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import NavItem from './NavItem'

// Fixed, solid-white navbar (DESIGN_NOTES §7).
// Phone: 72px, shadow, logo left + cart + hamburger. Tablet/desktop: 64px, bottom border,
// links left / logo centred / cart right.
export default function Navbar() {
  const { pathname } = useLocation()
  // The menu remembers the path it was opened on, so it closes itself on any navigation.
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname
  const setOpen = (value) => setOpenOn(value ? pathname : null)

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpenOn(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main"
        className="bg-white px-4 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.25)] md:px-8 md:shadow-[inset_0_-1px_0_var(--color-line)] lg:px-10"
      >
        <div className="flex h-8 items-center justify-between md:grid md:h-6 md:grid-cols-[1fr_auto_1fr]">
          <ul className="hidden items-center gap-5 md:flex">
            {site.nav.map((link) => (
              <li key={link.to}>
                <NavItem to={link.to}>{link.label}</NavItem>
              </li>
            ))}
          </ul>

          <Logo />

          <div className="flex items-center gap-2 md:justify-self-end">
            <CartButton />
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
              className="relative size-8 bg-surface md:hidden"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-1.5 h-0.5 w-5 bg-black transition-all duration-300 ease-out-soft',
                  open ? 'top-[15px] rotate-45' : 'top-[11px]',
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-1.5 h-0.5 w-5 bg-black transition-all duration-300 ease-out-soft',
                  open ? 'top-[15px] -rotate-45' : 'top-[19px]',
                )}
              />
            </button>
          </div>
        </div>

        <MobileMenu open={open} onNavigate={() => setOpen(false)} />
      </nav>
    </header>
  )
}
