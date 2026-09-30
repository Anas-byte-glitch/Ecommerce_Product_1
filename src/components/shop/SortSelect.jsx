import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { SORT_OPTIONS } from '../../data/products'

// Same technique as the reference: a styled "Sort by  <value>" label with a transparent native
// <select> stretched over it. The open list is the browser's own menu, so arrow keys, Enter,
// Escape, type-ahead and outside-click all behave natively.
export default function SortSelect({ value, onChange }) {
  const id = useId()
  const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0]

  return (
    <div className="relative flex h-6 shrink-0 items-center gap-2 rounded-md has-[select:focus-visible]:outline-2 has-[select:focus-visible]:outline-offset-2 has-[select:focus-visible]:outline-black">
      <span className="flex items-center gap-1.5 text-body" aria-hidden="true">
        <span className="text-black/32">Sort by</span>
        <span className="text-slate">{current.label}</span>
      </span>
      <ChevronDown aria-hidden="true" strokeWidth={1.5} className="size-5 text-slate" />
      <label htmlFor={id} className="sr-only">
        Sort by
      </label>
      <select
        id={id}
        value={current.value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
