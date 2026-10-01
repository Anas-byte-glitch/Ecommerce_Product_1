import { useRef, useState } from 'react'
import { CircleCheck } from 'lucide-react'
import { site } from '../../config/site'
import { cn } from '../../utils/cn'
import validateContact, { CONTACT_FIELDS } from './validateContact'

const EMPTY = { name: '', email: '', message: '' }

// Field look: 48px, radius 4, 1px rgba(136,136,136,.1) border (black on
// focus), padding 12, 14px/1.2 Inter, muted placeholder; label 16/24 slate, 10px above.
const control =
  'w-full rounded-sm border bg-white p-3 text-[14px] leading-[1.2] tracking-normal text-black placeholder:text-muted transition-colors focus:border-black focus:outline-none'

// Contact form. There is no backend: a valid submit only shows a confirmation
// and resets the form — no message is sent anywhere.
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sentName, setSentName] = useState(null)
  const formRef = useRef(null)

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    setSentName(null)
    if (submitted) setErrors(validateContact(next))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    setSubmitted(true)
    const first = CONTACT_FIELDS.find((k) => found[k])
    if (first) {
      formRef.current.elements.namedItem(first).focus()
      return
    }
    // Demo only: nothing is sent.
    setSentName(values.name.trim())
    setValues(EMPTY)
    setSubmitted(false)
  }

  const field = (name, label, render) => {
    const error = errors[name]
    return (
      <div className="flex flex-col gap-2.5">
        <label htmlFor={`contact-${name}`} className="text-body text-slate">
          {label}
        </label>
        {render({
          id: `contact-${name}`,
          name,
          value: values[name],
          onChange,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? `contact-${name}-error` : undefined,
          className: cn(control, error ? 'border-danger' : 'border-[rgba(136,136,136,0.1)]'),
        })}
        {error && (
          <p id={`contact-${name}-error`} className="text-small tracking-normal text-danger">
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="flex w-full flex-col gap-5 md:max-w-[550px]">
      {field('name', 'Name', (p) => <input {...p} autoComplete="name" placeholder="Name*" className={cn(p.className, 'h-12')} />)}
      {field('email', 'Email', (p) => (
        <input {...p} type="email" autoComplete="email" placeholder="Email*" className={cn(p.className, 'h-12')} />
      ))}
      {field('message', 'Message', (p) => (
        <textarea {...p} placeholder="Your message*" rows={4} className={cn(p.className, 'min-h-[100px] resize-y')} />
      ))}
      <button
        type="submit"
        className="h-14 cursor-pointer rounded-sm bg-black text-[14px] leading-[1.2] font-semibold tracking-normal text-white transition-colors duration-200 hover:bg-slate"
      >
        Submit
      </button>
      <p role="status" className={cn('flex items-start gap-3 rounded-sm bg-surface p-3 text-small tracking-normal text-slate', !sentName && 'sr-only')}>
        {sentName && (
          <>
            <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-black" />
            <span>
              Thanks, {sentName}! Your message is noted — this is a demo store, so nothing was actually
              sent. For real help, email{' '}
              <a href={`mailto:${site.contactEmail}`} className="text-black underline underline-offset-2">
                {site.contactEmail}
              </a>
              .
            </span>
          </>
        )}
      </p>
    </form>
  )
}
