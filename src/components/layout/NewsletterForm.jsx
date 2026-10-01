import { useState } from 'react'
import { Check } from 'lucide-react'
import { isValidEmail } from '../contact/validateContact'
import Button from '../ui/Button'

// Footer newsletter signup. UI only: nothing is stored or sent. A valid email
// swaps the form for a 50px "thanks" row (same height, so the footer doesn't jump); an invalid one
// shows an inline error under the form. Layout is unchanged while no message is shown.
export default function NewsletterForm() {
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const input = e.currentTarget.elements.email
    if (!isValidEmail(input.value)) {
      setError(input.value.trim() ? 'Enter a valid email address, like name@email.com.' : 'Enter your email address.')
      input.focus()
      return
    }
    setError('')
    setDone(true) // demo: the address is not saved or sent anywhere
  }

  if (done) {
    return (
      <p role="status" className="flex h-[50px] items-center gap-2 text-body text-white">
        <Check aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0" />
        Thanks for subscribing! (Demo store — no email was sent.)
      </p>
    )
  }

  return (
    <div className="flex w-full flex-col gap-2 md:max-w-[400px]">
      <form onSubmit={onSubmit} noValidate className="flex w-full gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@email.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'newsletter-error' : undefined}
          onChange={() => error && setError('')}
          className="h-[50px] min-w-0 flex-1 rounded-sm bg-field px-4 text-small leading-[1.3] tracking-normal text-white placeholder:text-white/80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white aria-invalid:outline-2 aria-invalid:outline-[#ff8a80]"
        />
        <Button type="submit" variant="subscribe" className="h-[50px]">
          Subscribe
        </Button>
      </form>
      {error && (
        <p id="newsletter-error" role="alert" className="text-small tracking-normal text-[#ff8a80]">
          {error}
        </p>
      )}
    </div>
  )
}
