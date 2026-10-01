import contactImage from '../assets/placeholders/contact.svg'
import ContactForm from '../components/contact/ContactForm'
import ProductFaq from '../components/product/ProductFaq'
import useDocumentTitle from '../hooks/useDocumentTitle'

// /contact (DESIGN_NOTES §19.2). Tablet/desktop: 100vh image hero with a centered white 700px card
// (radius 12, padding 32). Phone: no image — the card content sits on white (padding 120/64).
export default function Contact() {
  useDocumentTitle('Contact')
  return (
    <>
      <section className="relative flex flex-col items-center justify-center overflow-clip pt-[120px] pb-16 md:h-screen md:pt-[70px] md:pb-0 lg:pt-[60px]">
        <div aria-hidden="true" className="absolute inset-0 hidden md:block">
          <img src={contactImage} alt="" width={1440} height={1800} decoding="async" fetchPriority="high" className="size-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.36)_72.44%,rgba(0,0,0,0.6)_100%)]" />
        </div>
        <div className="relative flex w-full flex-col items-center gap-6 bg-white px-4 md:w-[700px] md:rounded-lg md:p-8">
          <div className="flex flex-col items-center gap-4 p-4 text-center md:p-6 lg:p-0">
            <h1 className="heading-2">24/7 Available</h1>
            <p className="max-w-[360px] text-muted lg:max-w-[420px] lg:text-left">
              Our support team is always ready to assist. Contact us by email, phone, or the form,
              and we’ll reply promptly.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <ProductFaq />
    </>
  )
}
