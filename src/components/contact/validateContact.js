// Contact form validation. Returns { field: message } for invalid fields.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const CONTACT_FIELDS = ['name', 'email', 'message']

export default function validateContact(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL.test(values.email.trim())) errors.email = 'Enter a valid email address, like name@email.com.'
  if (!values.message.trim()) errors.message = 'Write a message.'
  return errors
}

export const isValidEmail = (value) => EMAIL.test(String(value).trim())
