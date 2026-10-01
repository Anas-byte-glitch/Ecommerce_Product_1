import { Outlet } from 'react-router-dom'
import CartDrawer from '../cart/CartDrawer'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

// Shared shell. The navbar is fixed and overlays the page (heroes sit under it), so pages
// add their own top padding. <main> sits above the sticky footer (z-2 over z-1) and, like the
// reference, has no minimum height: on short pages the footer simply follows the content.
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="relative z-[2] bg-white">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
