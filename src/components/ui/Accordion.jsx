import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../../utils/cn'

// FAQ accordion (DESIGN_NOTES §17.3): grey cards (radius 8, padding 16), 10px apart. Any number of
// items may be open; all start closed. The chevron swaps down ↔ up; the answer grows in with a
// quick spring (~200ms); the rule under the question shows only while open. items: [{ question, answer }]
export default function Accordion({ items, className }) {
  const [open, setOpen] = useState(() => new Set())
  const reduce = useReducedMotion()
  const id = useId()

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div className={className}>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => {
          const isOpen = open.has(i)
          const Icon = isOpen ? ChevronUp : ChevronDown
          const panelId = `${id}-panel-${i}`
          return (
            <li key={item.question} className="rounded-md bg-surface">
              <h3 className="text-body-lg font-normal text-black">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-4 pt-4 text-left"
                >
                  <span className="flex-1">{item.question}</span>
                  <Icon aria-hidden="true" strokeWidth={2} className="size-4 shrink-0 text-black" />
                </button>
              </h3>
              <div className="px-4 pb-4">
                {/* The rule keeps its space but is only visible while open (as on the reference). */}
                <div
                  aria-hidden="true"
                  className={cn('mt-4 h-px bg-black/8 transition-opacity duration-200', !isOpen && 'opacity-0')}
                />
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={reduce ? { duration: 0 } : { type: 'spring', bounce: 0.15, duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-slate">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
