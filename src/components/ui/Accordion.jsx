import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

// Single-open accordion used for FAQs (styled fully in Phase 4).
// items: [{ question, answer }]
export default function Accordion({ items, className }) {
  const [open, setOpen] = useState(null)
  const id = useId()

  return (
    <div className={cn('divide-y divide-black/8 border-y border-black/8', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${id}-panel-${i}`
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left text-body-lg text-black"
            >
              <span>{item.question}</span>
              <Plus
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn('size-5 shrink-0 transition-transform duration-300', isOpen && 'rotate-45')}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
