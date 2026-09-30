import Container from '../ui/Container'

// Temporary page body used until each page is built in its phase.
// pt clears the fixed navbar (72px phone / 64px tablet+desktop) like the template's 100px offset.
export default function PagePlaceholder({ title, subtitle, children }) {
  return (
    <section className="pt-[100px] pb-16 md:pb-20 lg:pb-[100px]">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h1 className="heading-2">{title}</h1>
        {subtitle && <p className="max-w-[320px] text-muted">{subtitle}</p>}
        {children}
      </Container>
    </section>
  )
}
