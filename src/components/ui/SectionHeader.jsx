// Centered section title (H2 42/38/32) + muted subtitle (16/24, max 320px), 16px apart.
// `as="h1"` for page-level headers (shop) — same look.
export default function SectionHeader({ as: Heading = 'h2', title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Heading className="heading-2">{title}</Heading>
      {subtitle && <p className="max-w-[320px] text-muted">{subtitle}</p>}
    </div>
  )
}
