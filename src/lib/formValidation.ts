/** Client-side checks shared by the public lead forms (the API routes check again). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

/**
 * The warning shown when a form is submitted incomplete, or null when it is complete.
 * `missing` are the labels of empty required fields; `badEmail` flags a filled but invalid email.
 */
export function requiredFieldsMessage(missing: string[], badEmail = false): string | null {
  if (missing.length > 0) return `Please fill in the required fields: ${missing.join(', ')}.`
  if (badEmail) return 'Please enter a valid email address.'
  return null
}
