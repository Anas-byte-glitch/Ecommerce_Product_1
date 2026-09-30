import { cn } from '../../utils/cn'
import Container from '../ui/Container'
import SectionHeader from './SectionHeader'

// Standard home section: vertical padding + gutters, header → 64px → content.
// Product sections use 64/80/120px padding; "Why Customers Love Us" uses 64/80/100px.
export default function HomeSection({ title, subtitle, compact = false, className, children }) {
  return (
    <section className={cn('py-16 md:py-20', compact ? 'lg:py-[100px]' : 'lg:py-[120px]', className)}>
      <Container className="flex flex-col gap-16">
        <SectionHeader title={title} subtitle={subtitle} />
        {children}
      </Container>
    </section>
  )
}
