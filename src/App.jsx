import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// Every page except Home is its own chunk, loaded on first visit.
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// While a page chunk loads: an empty, viewport-tall block so the footer doesn't jump up.
const fallback = <div aria-hidden="true" className="min-h-screen" />
const page = (Page) => (
  <Suspense fallback={fallback}>
    <Page />
  </Suspense>
)

// URL paths mirror the Atlas template; /cart and /checkout/* are ours (not in the template).
export default function App() {
  // reducedMotion="user": every motion animation honours prefers-reduced-motion (no movement).
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop/:category" element={page(Shop)} />
            <Route path="atlas/:slug" element={page(ProductDetail)} />
            <Route path="about" element={page(About)} />
            <Route path="contact" element={page(Contact)} />
            <Route path="returns/return-exchange-policy" element={page(ReturnPolicy)} />
            <Route path="cart" element={page(Cart)} />
            <Route path="checkout" element={page(Checkout)} />
            <Route path="checkout/success" element={page(CheckoutSuccess)} />
            <Route path="*" element={page(NotFound)} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
