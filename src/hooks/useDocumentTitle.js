import { useEffect } from 'react'
import { site } from '../config/site'

// Sets document.title to "<title> — <brand>" (or "<brand> — <tagline>" without a title) and
// restores the previous title on unmount.
export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} — ${site.brandName}` : `${site.brandName} — ${site.tagline}`
    return () => {
      document.title = previous
    }
  }, [title])
}
