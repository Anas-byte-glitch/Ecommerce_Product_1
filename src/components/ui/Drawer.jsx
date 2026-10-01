import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

// Right-hand drawer: 400px panel (full width on phone) over an 80% black
// backdrop, instant open/close. Native <dialog> + showModal() gives the focus
// trap, focus return and Escape; we add backdrop-click close and a body scroll lock.
// Header styling is configurable so each drawer keeps its measured look.
export default function Drawer({
  open,
  onClose,
  title,
  headerClassName,
  titleClassName,
  closeLabel = 'Close',
  closeButtonClassName,
  closeIcon,
  footer,
  children,
}) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Body scroll lock while open.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.classList.add('overflow-hidden')
    return () => root.classList.remove('overflow-hidden')
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-ink backdrop:bg-black/80 md:w-[400px]"
    >
      <div className="flex h-full flex-col">
        <div className={cn('flex shrink-0 items-center justify-between gap-4 border-b', headerClassName)}>
          <h2 id={titleId} className={titleClassName}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className={cn('flex shrink-0 cursor-pointer items-center justify-center text-black', closeButtonClassName)}
          >
            {closeIcon ?? <X aria-hidden="true" strokeWidth={1.5} className="size-6" />}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="shrink-0">{footer}</div>}
      </div>
    </dialog>
  )
}
