import { cn } from '../../utils/cn'

// Input look: 50px, radius 4, 1px border, 14px text — the footer email input, on white.
export const inputClass =
  'h-[50px] w-full rounded-sm border bg-white px-4 text-small leading-[1.3] tracking-normal text-black placeholder:text-black/32 transition-colors focus:border-black focus:outline-none'

// Labelled form control with inline error (aria-invalid + aria-describedby). `children` is a
// render function receiving the props for the control.
export default function Field({ name, label, error, hint, className, children }) {
  const errorId = `${name}-error`
  const hintId = hint ? `${name}-hint` : undefined
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={name} className="text-[14px] leading-none tracking-normal text-muted">
        {label}
      </label>
      {children({
        id: name,
        name,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': [error ? errorId : null, hintId].filter(Boolean).join(' ') || undefined,
        className: cn(inputClass, error ? 'border-danger' : 'border-black/8'),
      })}
      {hint && !error && (
        <p id={hintId} className="text-small tracking-normal text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-small tracking-normal text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
