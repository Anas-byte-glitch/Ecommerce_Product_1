import { useId } from 'react'

// "Size" + 40px option tiles (radius 4, 1px border). Native radios (visually hidden) give
// arrow-key navigation. Selected = black; hover = 3% black tint + black border.
export default function SizeSelector({ sizes, value, onChange }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <p id={id} className="text-[14px] leading-none tracking-normal text-muted">
        Size
      </p>
      <div role="radiogroup" aria-labelledby={id} className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <label
            key={size}
            className="flex h-10 cursor-pointer items-center rounded-sm border border-black/8 bg-white px-5 text-[12px] tracking-normal text-black transition-colors duration-200 hover:border-black hover:bg-black/3 has-checked:border-black has-checked:bg-black has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-black"
          >
            <input
              type="radio"
              name={id}
              value={size}
              checked={value === size}
              onChange={() => onChange(size)}
              className="sr-only"
            />
            {size}
          </label>
        ))}
      </div>
    </div>
  )
}
