import notFoundImage from '../assets/placeholders/notfound.svg'
import Hero from '../components/home/Hero'

// 404 (DESIGN_NOTES §19.4): on the reference /404 and any unknown URL render the Home hero layout
// with "404" / "Page Not Found" / "Go home" → /. Same heights, gradients and appear timings.
export default function NotFound() {
  return (
    <Hero
      image={notFoundImage}
      title="404"
      subtitle="Page Not Found"
      cta={{ label: 'Go home', to: '/' }}
      flushTablet
    />
  )
}
