import aboutHero from '../assets/placeholders/about-hero.svg'
import shirtsPlaceholder from '../assets/placeholders/category-shirts.svg'
import hoodiesPlaceholder from '../assets/placeholders/category-hoodies.svg'
import contactPlaceholder from '../assets/placeholders/contact.svg'
import essentialsPlaceholder from '../assets/placeholders/essentials.svg'
import heroPlaceholder from '../assets/placeholders/hero.svg'
import ig1 from '../assets/placeholders/instagram-1.svg'
import ig2 from '../assets/placeholders/instagram-2.svg'
import ig3 from '../assets/placeholders/instagram-3.svg'
import ig4 from '../assets/placeholders/instagram-4.svg'
import ig5 from '../assets/placeholders/instagram-5.svg'
import ig6 from '../assets/placeholders/instagram-6.svg'
import notFoundPlaceholder from '../assets/placeholders/notfound.svg'
import storyPlaceholder from '../assets/placeholders/story.svg'
import { photo } from './photo'

// Page photos (see docs/IMAGES.md). Each entry: photo(slot file, SVG placeholder, alt text).
// Product, team, mission and review photos live with their data (products.js, team.js, …).
export const images = {
  homeHero: photo('home/hero', heroPlaceholder, 'Five friends in black and cream hoodies and sweatpants on an empty city bridge'),
  categoryShirts: photo('home/category-shirts', shirtsPlaceholder, 'A stack of folded tees in warm colours'),
  categoryHoodies: photo('home/category-hoodies', hoodiesPlaceholder, 'Two people in black and beige hoodies against a tiled wall'),
  story: photo('home/story', storyPlaceholder, 'Two people in matching grey hoodies leaning on a concrete wall'),
  essentials: photo('home/essentials', essentialsPlaceholder, 'Man in a beige zip hoodie and trousers sitting on stone steps'),
  instagram: [
    photo('home/instagram-1', ig1, 'Two people in black and beige hoodies covering each other’s eyes'),
    photo('home/instagram-2', ig2, 'Back view of a beige oversized hoodie'),
    photo('home/instagram-3', ig3, 'Man in a beige hoodie and light jeans outdoors'),
    photo('home/instagram-4', ig4, 'Man in a white hoodie under a bridge'),
    photo('home/instagram-5', ig5, 'White tee worn with straight blue jeans'),
    photo('home/instagram-6', ig6, 'Pink tee hanging on a white clothing rack'),
  ],
  aboutHero: photo('about/hero', aboutHero, 'Neutral-toned shirts hanging on wooden hangers in a clothing store'),
  contact: photo('contact/hero', contactPlaceholder, 'Hand straightening beige garments on a clothing rack'),
  notFound: photo('notfound/hero', notFoundPlaceholder, 'Folded tees laid out on a blue blanket'),
}
