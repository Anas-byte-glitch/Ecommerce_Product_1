import { Minus, Plus } from 'lucide-react'

// 150×56 grey stepper (radius 4, faint border) with two 40px white buttons around the count
// (Jost 16/600). Minimum 1.
export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  const btn =
    'flex size-10 cursor-pointer items-center justify-center bg-white text-black transition-colors hover:bg-black/3 disabled:cursor-not-allowed disabled:text-black/32 disabled:hover:bg-white'
  return (
    <div
      role="group"
      aria-label="Quantity"
      className="flex h-14 w-[150px] shrink-0 items-center justify-between rounded-sm bg-surface px-1.5 ring-1 ring-[rgba(231,236,229,0.64)] ring-inset"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={btn}
      >
        <Minus aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
      <span aria-live="polite" className="font-jost text-body leading-none font-semibold tracking-normal text-black">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={btn}
      >
        <Plus aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  )
}
