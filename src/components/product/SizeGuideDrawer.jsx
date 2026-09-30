import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import { sizeGuide } from '../../data/sizeGuide'

// Right-hand drawer (400px; full width on phone) over an 80% black backdrop. Native <dialog>:
// focus is trapped and restored, Escape closes (the reference ignores Escape — we don't),
// clicking the backdrop closes. Opens/closes instantly, like the reference.
export default function SizeGuideDrawer({ open, onClose }) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-ink backdrop:bg-black/80 md:w-[400px]"
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b border-black/8 px-4 pt-6 pb-4">
          <h3 id={titleId} className="text-[20px] leading-[1.2] text-slate md:text-[22px] lg:text-[26px]">
            Size Guide
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="flex size-6 cursor-pointer items-center justify-center text-black"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
          </button>
        </div>

        <div className="flex flex-col gap-8 p-4">
          <p className="text-muted">{sizeGuide.intro}</p>
          <table className="flex flex-col gap-3 text-small tracking-normal">
            <thead>
              <tr className="grid grid-cols-4 gap-x-6 border-b border-black/8 pb-3 text-left">
                {sizeGuide.columns.map((c) => (
                  <th key={c} scope="col" className="font-semibold text-slate">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="flex flex-col gap-3">
              {sizeGuide.rows.map(([size, ...values]) => (
                <tr key={size} className="grid grid-cols-4 gap-x-6 border-b border-black/8 pb-3">
                  <th scope="row" className="text-left font-semibold text-slate">
                    {size}
                  </th>
                  {values.map((v, i) => (
                    <td key={i} className="font-medium text-muted">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  )
}
