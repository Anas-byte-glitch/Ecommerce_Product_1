import { motion, useReducedMotion } from 'motion/react'

// Fade (+ optional slide-up / zoom-out) on first scroll into view — Framer "appear" effects.
// Defaults: subtle fade-up. Pass `transition` to override timing entirely (e.g. a spring).
export default function Reveal({
  as = 'div',
  delay = 0,
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1],
  y = 24,
  scale = 1,
  transition,
  className,
  children,
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition ?? { duration, delay, ease }}
    >
      {children}
    </Tag>
  )
}
