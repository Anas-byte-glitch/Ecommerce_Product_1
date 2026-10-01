import manifest from './imageManifest.json' with { type: 'json' }

// Turns an image slot (a "file" from images.json, e.g. 'home/hero') into the props an <img>
// needs: WebP src + srcset at every built width, intrinsic width/height (aspect ratio) and alt.
// When the slot has no WebP yet (not in imageManifest.json), the SVG placeholder is used instead;
// `fallback` is also what <Img> switches to if a WebP file fails to load.
export function photo(file, fallback, alt = '') {
  const entry = manifest[file]
  if (!entry) return { src: fallback, fallback, alt }
  const [aw, ah] = entry.aspect
  const { widths } = entry
  const largest = widths[widths.length - 1]
  return {
    src: `/images/${file}-${widths[Math.min(1, widths.length - 1)]}.webp`,
    srcSet: widths.map((w) => `/images/${file}-${w}.webp ${w}w`).join(', '),
    width: largest,
    height: Math.round((largest * ah) / aw),
    fallback,
    alt,
  }
}
