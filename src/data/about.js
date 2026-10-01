import mission1 from '../assets/placeholders/mission-1.svg'
import mission2 from '../assets/placeholders/mission-2.svg'
import { site } from '../config/site'

// About page copy (reference text; the brand name comes from site.js).
export const aboutParagraphs = [
  `${site.name} was born from a vision to redefine what luxury means in a fast-changing world. We strip away the excess, focusing on precision, quality, and form — creating pieces that feel both timeless and unapologetically current.`,
  'Our mission is to craft clothing that embodies quiet confidence and individuality — for those who value presence over labels and expression over convention. Every garment is thoughtfully designed and meticulously made, blending minimalist silhouettes with modern detailing to deliver effortless sophistication.',
  `As you explore our collections, you’ll discover a balance between edge and elegance — pieces that move with you and evolve with your story. At ${site.name}, luxury isn’t about status; it’s about how you move, how you think, and how you express yourself.`,
]

export const missionBlocks = [
  {
    title: 'Quality over Quantity',
    text: 'We believe true luxury lies in craftsmanship, not excess. Each garment is made to last, using premium materials and timeless construction.',
    image: mission1,
  },
  {
    title: 'Intentional Design',
    text: 'Every piece begins with purpose — crafted with precision, balance, and thoughtful detail to create effortless sophistication that endures beyond seasons.',
    image: mission2,
  },
]
