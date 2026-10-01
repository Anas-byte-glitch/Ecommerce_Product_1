import { faqs } from '../../data/faqs'
import Accordion from '../ui/Accordion'
import Container from '../ui/Container'

// "Frequently Asked Questions". Title max 420px (2 lines),
// 64px to a 700px-wide accordion. Padding 64 / 80 / 100.
export default function ProductFaq() {
  return (
    <section className="py-16 md:py-20 lg:py-[100px]">
      <Container className="flex flex-col items-center gap-16">
        <h2 className="heading-2 max-w-[420px] text-center">Frequently Asked Questions</h2>
        <Accordion items={faqs} className="w-full max-w-[700px]" />
      </Container>
    </section>
  )
}
