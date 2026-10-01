import { Outlet } from 'react-router-dom'
import CartDrawer from '../cart/CartDrawer'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

// Shared shell. The navbar is fixed and overlays the page (heroes sit under it), so pages
// add their own top padding. <main> sits above the sticky footer (z-2 over z-1) and, like the
// design, has no minimum height: on short pages the footer simply follows the content.
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      {/* First focusable element on every page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-black focus:px-4 focus:py-3 focus:text-small focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative z-[2] bg-white focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
