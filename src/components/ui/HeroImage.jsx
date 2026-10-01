import { motion, useReducedMotion } from 'motion/react'

// Full-bleed hero background with the reference's appear effect: opacity 0 → 1 and scale 1.2 → 1,
// spring (bounce 0, 0.8s) after a 1s delay (Home, About, 404 heroes — DESIGN_NOTES §15.1).
export default function HeroImage({ src }) {
  const reduce = useReducedMotion()
  return (
    <motion.img
      src={src}
      alt=""
      width={1536}
      height={1024}
      decoding="async"
      fetchPriority="high"
      className="absolute inset-0 size-full object-cover"
      initial={reduce ? false : { opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.8, delay: 1 }}
    />
  )
}
