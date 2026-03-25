/**
 * home-testimonials.ts
 * Testimonial data for TestimonialsSection.
 *
 * How to use:
 *   import { HOME_TESTIMONIALS } from '@/data/home-testimonials'
 *   <TestimonialsSection items={HOME_TESTIMONIALS} />
 *
 * Asset paths:
 *   Avatars → /public/assets/images/testimonials/<id>-avatar.png
 *   Logos   → /public/assets/logos/testimonials/<id>.svg
 *
 * logoSrc + logoWidth + logoHeight  → renders an <Image> logo
 * logoText                          → renders a plain-text label (text-overline)
 *                                     use one or the other, not both
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TestimonialFeature {
  label: string
}

export interface Testimonial {
  id:         string
  name:       string
  title:      string
  company:    string
  avatarSrc:  string
  logoSrc?:   string
  logoWidth?: number
  logoHeight?: number
  /** Plain-text label rendered with text-overline when logoSrc is absent */
  logoText?:  string
  quote:      string
  features:   TestimonialFeature[]
}

// ─── Home page ────────────────────────────────────────────────────────────────

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id:          'bravado',
    name:        'Sahil Mansuri',
    title:       'CEO & Co-founder',
    company:     'Bravado',
    avatarSrc:   '/assets/images/testimonials/bravado-avatar.png',
    logoSrc:     '/assets/logos/testimonials/bravado.svg',
    logoWidth:   168,
    logoHeight:  36,
    quote:       '"Fethr is the first healthcare CRM that feels truly modern. It\'s powerful, flexible, and fast to build with. There\'s nothing like it on the market."',
    features:    [{ label: 'Workflows' }, { label: 'Deals' }, { label: 'Reports' }],
  },
  {
    id:          'flatfile',
    name:        'David Boskovic',
    title:       'CEO & Founder',
    company:     'Flatfile',
    avatarSrc:   '/assets/images/testimonials/flatfile-avatar.png',
    logoSrc:     '/assets/logos/testimonials/flatfile.svg',
    logoWidth:   124,
    logoHeight:  36,
    quote:       '"We tried five different CRMs before Fethr. Nothing came close to this level of flexibility and automation for our healthcare workflows."',
    features:    [{ label: 'Custom objects' }, { label: 'Integrations' }, { label: 'Reports' }],
  },
  {
    id:          'snackpass',
    name:        'Jamie Marshall',
    title:       'COO & Co-founder',
    company:     'Snackpass',
    avatarSrc:   '/assets/images/testimonials/snackpass-avatar.png',
    logoSrc:     '/assets/logos/testimonials/snackpass.svg',
    logoWidth:   158,
    logoHeight:  36,
    quote:       '"Fethr completely replaced our spreadsheets and three other tools. Our patient outreach is now automated and our team saves hours every week."',
    features:    [{ label: 'Lists' }, { label: 'Workflows' }, { label: 'API' }],
  },
]

// ─── Add more arrays below for other pages ────────────────────────────────────
// export const STARTUPS_TESTIMONIALS: Testimonial[] = [ ... ]
