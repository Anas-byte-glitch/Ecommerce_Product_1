import { motion, useReducedMotion } from 'motion/react'

// Full-bleed hero background with an appear effect: opacity 0 → 1 and scale 1.2 → 1,
// spring (bounce 0, 0.8s) after a 1s delay (Home, About, 404 heroes).
// `image` is a photo() object; `sizes` covers the phone crop (the frame is taller than the photo).
export default function HeroImage({ image, sizes = '(max-width: 809px) 290vw, 100vw' }) {
  const reduce = useReducedMotion()
  const onError = (e) => {
    const el = e.currentTarget
    if (!image.fallback || el.dataset.fallback) return
    el.dataset.fallback = 'true'
    el.removeAttribute('srcset')
    el.src = image.fallback
  }
  return (
    <motion.img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      width={image.width ?? 1536}
      height={image.height ?? 1024}
      decoding="async"
      fetchPriority="high"
      onError={onError}
      className="absolute inset-0 size-full object-cover"
      initial={reduce ? false : { opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.8, delay: 1 }}
    />
  )
}
