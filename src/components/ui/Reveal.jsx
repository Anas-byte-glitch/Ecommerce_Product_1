import { motion, useReducedMotion } from 'motion/react'

// Fade + slide-up on first scroll into view (approximation of Framer "appear" effects).
export default function Reveal({ as = 'div', delay = 0, y = 24, className, children }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
