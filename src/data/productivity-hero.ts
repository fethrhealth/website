// ─── Productivity page hero — /platform/productivity ──────────────────────────

// ── PageHero text ──────────────────────────────────────────────────────────────

export const PRODUCTIVITY_HERO_BADGE      = 'Productivity'
export const PRODUCTIVITY_HERO_HEADING    = 'Your collaboration station.'
export const PRODUCTIVITY_HERO_SUBHEADING =
  'Fethr propels go-to-market teams towards new levels of productivity and lets you seamlessly perform your daily work.'

export const PRODUCTIVITY_HERO_CTA_LABEL = 'Start for free'
export const PRODUCTIVITY_HERO_CTA_HREF  = '/platform/productivity'

/**
 * Source identifier attached to every demo-request and "Talk to sales"
 * submission that originates from this page.  It is stored on the lead record
 * so the team can see exactly which page triggered the conversion.
 *
 * Keep it short, lowercase, and unique across pages
 * (e.g. 'productivity', 'data', 'ai', 'home').
 */
export const PRODUCTIVITY_HERO_FORM_SOURCE = 'productivity'

// ── Desktop hero images ────────────────────────────────────────────────────────
// Five image cards arranged in a CSS grid (lg: 12-col · xl: 7-col).
// Replace `src` to swap an image; keep `width`/`height` matching the new file
// so Next.js reserves the right amount of space before the image loads.
// `list` and `comment` are rendered with `fill` — no intrinsic size needed.

export const PRODUCTIVITY_HERO_IMAGES = {
  /** Left column, xl only, top-half. */
  note: {
    src:    '/assets/images/platform/productivity/hero/productivity-hero-note.avif',
    width:  1524,
    height: 708,
  },
  /** Right column, top-half (lg+xl). */
  email: {
    src:    '/assets/images/platform/productivity/hero/productivity-hero-email.avif',
    width:  1524,
    height: 908,
  },
  /** Center column, full height — the main app screenshot. */
  screen: {
    src:    '/assets/images/platform/productivity/hero/productivity-hero-screen.avif',
    width:  2256,
    height: 2032,
  },
  /** Left column xl / right column lg, bottom-half. Rendered with `fill`. */
  list: {
    src: '/assets/images/platform/productivity/hero/productivity-hero-list.avif',
  },
  /** Right column xl only, bottom-half. Rendered with `fill`. */
  comment: {
    src: '/assets/images/platform/productivity/hero/productivity-hero-comment.avif',
  },
} as const

// ── Mobile hero images ─────────────────────────────────────────────────────────
// Two horizontal-scroll slides, each containing two stacked images.
// Slide order and image order within each slide are preserved by the component.

export interface ProductivityMobileImage {
  src:    string
  width:  number
  height: number
}

export const PRODUCTIVITY_HERO_MOBILE_SLIDES: ProductivityMobileImage[][] = [
  // Slide 1
  [
    {
      src:    '/assets/images/platform/productivity/hero/productivity-hero-note-mobile.avif',
      width:  1524,
      height: 708,
    },
    {
      src:    '/assets/images/platform/productivity/hero/productivity-hero-list-mobile.avif',
      width:  1524,
      height: 908,
    },
  ],
  // Slide 2
  [
    {
      src:    '/assets/images/platform/productivity/hero/productivity-hero-email-mobile.avif',
      width:  1524,
      height: 908,
    },
    {
      src:    '/assets/images/platform/productivity/hero/productivity-hero-comment-mobile.avif',
      width:  1524,
      height: 708,
    },
  ],
]
