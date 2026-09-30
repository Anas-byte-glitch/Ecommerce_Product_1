// Client-side checkout validation. Returns { field: message } for invalid fields.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARS = /^\+?[\d\s().-]+$/
const POSTAL = /^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/

// Form order — the first invalid field in this order receives focus on submit.
export const FIELD_ORDER = ['email', 'fullName', 'phone', 'address', 'city', 'postalCode', 'country', 'payment']

export default function validateCheckout(values) {
  const errors = {}
  const value = (key) => String(values[key] ?? '').trim()
  const required = (key, message) => {
    if (!value(key)) errors[key] = message
  }

  required('email', 'Enter your email address.')
  if (!errors.email && !EMAIL.test(value('email')))
    errors.email = 'Enter a valid email address, like name@email.com.'
  required('fullName', 'Enter your full name.')
  required('phone', 'Enter your phone number.')
  if (!errors.phone) {
    const digits = value('phone').replace(/\D/g, '')
    if (!PHONE_CHARS.test(value('phone')) || digits.length < 7 || digits.length > 15)
      errors.phone = 'Enter a valid phone number (7–15 digits, may start with +).'
  }
  required('address', 'Enter your street address.')
  required('city', 'Enter your city.')
  required('postalCode', 'Enter your postal code.')
  if (!errors.postalCode && !POSTAL.test(value('postalCode')))
    errors.postalCode = 'Enter a valid postal code.'
  required('country', 'Choose your country.')
  required('payment', 'Choose a payment method.')
  return errors
}
