import Container from '../ui/Container'

// About page section: padding 64 / 80 / 100. Tablet/desktop: 6-column grid (gap 24) with the H2
// label in columns 1–2 and the content in columns 3–6. Phone: stacked, gap 32.
export default function AboutSection({ title, children }) {
  return (
    <section className="py-16 md:py-20 lg:py-[100px]">
      <Container className="flex flex-col gap-8 md:grid md:grid-cols-6 md:gap-6">
        <h2 className="heading-2 md:col-span-2">{title}</h2>
        <div className="md:col-span-4">{children}</div>
      </Container>
    </section>
  )
}
