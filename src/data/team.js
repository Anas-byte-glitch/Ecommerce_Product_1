import team1 from '../assets/placeholders/team-1.svg'
import team2 from '../assets/placeholders/team-2.svg'
import team3 from '../assets/placeholders/team-3.svg'
import team4 from '../assets/placeholders/team-4.svg'
import { photo } from './photo'

// About page "The team". Fictional demo people (stock portraits, see CREDITS.md) — replace them
// with your own team. The alt text is built from name + role in About.jsx.
export const team = [
  { name: 'Liam Harcourt', role: 'Brand & Marketing Director', image: photo('about/team-1', team1) },
  { name: 'Jonas Delmar', role: 'Creative Director', image: photo('about/team-2', team2) },
  { name: 'Maya Rossetti', role: 'Head of Design', image: photo('about/team-3', team3) },
  { name: 'Lena Okoro', role: 'Production & Sourcing Manager', image: photo('about/team-4', team4) },
]
