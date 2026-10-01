// <img> for a photo() object: srcset + sizes, intrinsic size, async decoding and the SVG
// placeholder as a fallback if the WebP file fails to load. Extra props (className, loading,
// fetchPriority, alt…) are passed through; `alt` overrides the photo's own alt text.
export default function Img({ image, sizes, alt, ...props }) {
  const onError = (e) => {
    const el = e.currentTarget
    if (!image.fallback || el.dataset.fallback) return
    el.dataset.fallback = 'true'
    el.removeAttribute('srcset')
    el.src = image.fallback
  }
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width ?? 800}
      height={image.height ?? 1000}
      alt={alt ?? image.alt}
      decoding="async"
      onError={onError}
      {...props}
    />
  )
}
