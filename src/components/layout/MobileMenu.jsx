import { AnimatePresence, motion } from 'motion/react'
import { site } from '../../config/site'
import NavItem from './NavItem'

// Phone menu: the nav panel expands downward with the stacked links (DESIGN_NOTES §7).
export default function MobileMenu({ open, onNavigate }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id="mobile-menu"
          key="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden md:hidden"
        >
          <ul className="flex flex-col items-start gap-5 pt-5">
            {site.mobileNav.map((link) => (
              <li key={link.to}>
                <NavItem to={link.to} onClick={onNavigate}>
                  {link.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
