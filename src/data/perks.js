import { Headset, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

// "Why Customers Love Us". The reference uses Phosphor (regular) Truck, Headset,
// ClockCounterClockwise and ShieldCheck; these are the closest lucide icons.
export const perks = [
  { icon: Truck, title: 'Free & Fast Shipping', text: 'Enjoy quick delivery right to your doorstep.' },
  { icon: Headset, title: '24/7 Customer Support', text: 'Friendly help whenever you need it.' },
  { icon: RotateCcw, title: 'Hassle-Free Returns', text: 'Shop with confidence; easy 30-day returns.' },
  {
    icon: ShieldCheck,
    title: 'Secure, Effortless Checkout',
    text: 'Enjoy peace of mind with encrypted payments and fast checkout.',
  },
]
