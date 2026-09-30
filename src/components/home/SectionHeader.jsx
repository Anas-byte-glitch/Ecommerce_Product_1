// Centered section title (H2 42/38/32) + muted subtitle (16/24, max 320px), 16px apart.
export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="heading-2">{title}</h2>
      {subtitle && <p className="max-w-[320px] text-muted">{subtitle}</p>}
    </div>
  )
}
