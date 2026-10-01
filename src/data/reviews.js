import avatar1 from '../assets/placeholders/avatar-1.svg'
import avatar2 from '../assets/placeholders/avatar-2.svg'
import avatar3 from '../assets/placeholders/avatar-3.svg'
import avatar4 from '../assets/placeholders/avatar-4.svg'
import { photo } from './photo'

// "Happy Customers" (product page). Fictional demo reviewers (stock portraits, see CREDITS.md).
export const reviews = [
  {
    name: 'Nadia K',
    rating: 5,
    avatar: photo('reviews/avatar-1', avatar1),
    text: 'A perfect hoodie—super warm without feeling bulky. The fabric is insanely soft and the fit is spot-on. I reach for it every single morning.',
  },
  {
    name: 'Marcus L.',
    rating: 5,
    avatar: photo('reviews/avatar-2', avatar2),
    text: 'Honestly surprised by the quality! It keeps me warm but never overheats, and the color looks even better in person. Definitely buying more soon',
  },
  {
    name: 'Clara M.',
    rating: 5,
    avatar: photo('reviews/avatar-3', avatar3),
    text: 'This hoodie feels premium the moment you put it on. Perfect for layering and doesn’t lose shape after washing. Highly recommend!',
  },
  {
    name: 'Theo R.',
    rating: 5,
    avatar: photo('reviews/avatar-4', avatar4),
    text: 'The quality shocked me in the best way—smooth, breathable, and fits perfectly. Great for everyday wear, and the color doesn’t fade. Super happy!',
  },
]
