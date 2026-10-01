import { Award, Headset, Lock, Repeat, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { site } from '../config/site'

// "Why Customers Love Us". The reference uses Phosphor (regular) Truck, Headset,
// ClockCounterClockwise and ShieldCheck; these are the closest lucide icons.
export const perks = [
  { icon: Truck, title: 'Free & Fast Shipping', text: 'Enjoy quick delivery right to your doorstep.' },
  { icon: Headset, title: '24/7 Customer Support', text: 'Friendly help whenever you need it.' },
  { icon: RotateCcw, title: 'Hassle-Free Returns', text: `Shop with confidence; easy ${site.returnWindowDays}-day returns.` },
  {
    icon: ShieldCheck,
    title: 'Secure, Effortless Checkout',
    text: 'Enjoy peace of mind with encrypted payments and fast checkout.',
  },
]

// Product-page trust badges. The reference uses Phosphor-style icons (bag/lock, repeat arrows,
// truck, medal) at 24px, stroke 1.5, black; these are the closest lucide icons.
export const productPerks = [
  { icon: Lock, title: 'Secure Checkout', text: 'Shop safely, always' },
  { icon: Repeat, title: 'Easy Returns', text: `${site.returnWindowDays}-day return policy` },
  { icon: Truck, title: 'Free Shipping', text: `On orders over $${site.freeShippingThreshold}` },
  { icon: Award, title: 'Premium Quality', text: 'Crafted to last' },
]
