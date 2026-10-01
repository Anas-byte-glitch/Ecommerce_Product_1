import Hero from '../components/home/Hero'
import { images } from '../data/images'
import useDocumentTitle from '../hooks/useDocumentTitle'

// 404: /404 and any unknown URL render the Home hero layout
// with "404" / "Page Not Found" / "Go home" → /. Same heights, gradients and appear timings.
export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <Hero
      image={images.notFound}
      title="404"
      subtitle="Page Not Found"
      cta={{ label: 'Go home', to: '/' }}
      flushTablet
    />
  )
}
