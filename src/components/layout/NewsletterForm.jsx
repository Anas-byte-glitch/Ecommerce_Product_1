import { useState } from 'react'
import Button from '../ui/Button'

// UI-only newsletter signup (no backend). Shows a local confirmation after submit.
export default function NewsletterForm() {
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setDone(true)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2 md:max-w-[400px]">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="name@email.com"
        onChange={() => done && setDone(false)}
        className="h-[50px] min-w-0 flex-1 rounded-sm bg-field px-4 text-small leading-[1.3] tracking-normal text-white placeholder:text-white/80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />
      <Button type="submit" variant="subscribe" className="h-[50px]">
        {done ? 'Thanks!' : 'Subscribe'}
      </Button>
    </form>
  )
}
