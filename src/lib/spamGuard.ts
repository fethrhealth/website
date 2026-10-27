/**
 * Bot filter for the public lead forms (demo, talk-to-sales, referral, startup).
 *
 * Every form sends two extra fields from useSpamTrap():
 *   website   — a hidden honeypot input; people never see it, bots fill it.
 *   startedAt — epoch ms when the form appeared; bots post instantly or skip the page.
 *
 * On top of that the submitted values are checked for the patterns the bots use:
 * gmail addresses with dots sprinkled through the local part (gmail ignores dots,
 * so v.et.a.h.o.x.822@gmail.com is one inbox under many spellings), random
 * mixed-case strings (VSXCyBvOtpkGGfiXOi) and vowel-less name words (Qrlf).
 *
 * Routes answer a spam hit with the normal success response and save nothing,
 * so the bot has no signal to adapt to.
 */

/** Faster than this from form shown to submit is not a person typing. */
export const MIN_FILL_MS = 2_000

const GMAIL_DOMAINS = new Set(['gmail.com', 'googlemail.com'])

/** Real gmail users have 0–2 dots; the dot-trick bots use 3+. */
const MAX_GMAIL_DOTS = 2

export type SpamFields = {
  /** Email addresses submitted on the form. */
  emails?: string[]
  /** Person names (first, last). Also checked for vowel-less words. */
  names?: string[]
  /** Any other free-text values (company, use case, message...). */
  text?: string[]
}

/** Why a submission looks like a bot, or null when it looks human. */
export function spamReason(
  body: Record<string, unknown>,
  fields: SpamFields,
  now: number = Date.now(),
): string | null {
  if (typeof body.website === 'string' && body.website.trim() !== '') return 'honeypot'

  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : NaN
  if (!Number.isFinite(startedAt)) return 'no-start-time'
  if (now - startedAt < MIN_FILL_MS) return 'too-fast'

  for (const email of fields.emails ?? []) {
    if (isGmailDotTrick(email)) return 'gmail-dots'
  }
  for (const name of fields.names ?? []) {
    if (isGibberish(name) || hasVowellessWord(name)) return 'gibberish-name'
  }
  for (const value of fields.text ?? []) {
    if (isGibberish(value)) return 'gibberish-text'
  }
  return null
}

export function isGmailDotTrick(email: string): boolean {
  const [local, domain] = email.trim().toLowerCase().split('@')
  if (!local || !domain || !GMAIL_DOMAINS.has(domain)) return false
  return (local.match(/\./g) ?? []).length > MAX_GMAIL_DOTS
}

/**
 * A single letters-only token of 8+ chars that flips lower→upper case 3+ times,
 * e.g. VSXCyBvOtpkGGfiXOi. Names like McDonald or DeShawn flip once.
 */
export function isGibberish(value: string): boolean {
  const v = value.trim()
  if (v.length < 8 || !/^[A-Za-z]+$/.test(v)) return false
  const flips = v.match(/[a-z][A-Z]/g) ?? []
  return flips.length >= 3
}

/** A 4+ letter word with no vowel (y counts), e.g. Qrlf. */
export function hasVowellessWord(value: string): boolean {
  return value
    .trim()
    .split(/[\s-]+/)
    .some((word) => /^[A-Za-z]{4,}$/.test(word) && !/[aeiouy]/i.test(word))
}

/** Logs the rejected submission (no field values) so blocked leads can be audited. */
export function logSpam(form: string, reason: string, email: string | undefined): void {
  const domain = email?.split('@')[1] ?? '?'
  console.warn(`[spam] ${form} dropped: ${reason} (domain ${domain})`)
}
