/**
 * Testimonials data.
 *
 * Exporta un array por página/sección.
 * Pasa el array que quieras al componente:
 *   <TestimonialsSection items={STARTUPS_TESTIMONIALS} />
 *
 * Avatares → /public/assets/images/testimonials/[id]-avatar.png
 * Logos    → /public/assets/logos/testimonials/[id].svg
 */

export interface TestimonialFeature {
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarSrc: string;
  /** Use logoSrc + logoWidth + logoHeight OR logoText — not both */
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  /** Plain-text label rendered with text-overline when logoSrc is absent */
  logoText?: string;
  quote: string;
  features: TestimonialFeature[];
}

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: 'bravado',
    name: 'Sahil Mansuri',
    title: 'CEO & Co-founder',
    company: 'Bravado',
    avatarSrc: '/assets/images/testimonials/bravado-avatar.png',
    logoSrc: '/assets/logos/testimonials/bravado.svg',
    logoWidth: 168,
    logoHeight: 36,
    quote:
      '"Fethr is the first healthcare CRM that feels truly modern. It\'s powerful, flexible, and fast to build with. There\'s nothing like it on the market."',
    features: [{ label: 'Workflows' }, { label: 'Deals' }, { label: 'Reports' }],
  },
  {
    id: 'flatfile',
    name: 'David Boskovic',
    title: 'CEO & Founder',
    company: 'Flatfile',
    avatarSrc: '/assets/images/testimonials/flatfile-avatar.png',
    logoSrc: '/assets/logos/testimonials/flatfile.svg',
    logoWidth: 124,
    logoHeight: 36,
    quote:
      '"We tried five different CRMs before Fethr. Nothing came close to this level of flexibility and automation for our healthcare workflows."',
    features: [{ label: 'Custom objects' }, { label: 'Integrations' }, { label: 'Reports' }],
  },
  {
    id: 'snackpass',
    name: 'Jamie Marshall',
    title: 'COO & Co-founder',
    company: 'Snackpass',
    avatarSrc: '/assets/images/testimonials/snackpass-avatar.png',
    logoSrc: '/assets/logos/testimonials/snackpass.svg',
    logoWidth: 158,
    logoHeight: 36,
    quote:
      '"Fethr completely replaced our spreadsheets and three other tools. Our patient outreach is now automated and our team saves hours every week."',
    features: [{ label: 'Lists' }, { label: 'Workflows' }, { label: 'API' }],
  },
];

export const PARTNERS_TESTIMONIALS: Testimonial[] = [
  {
    id: 'expert-partner',
    name: 'Giacomo Caranese',
    title: 'Co-founder',
    company: 'Giacomo',
    avatarSrc: '/assets/images/testimonials/giacomo.webp',
    logoText: 'Expert Partners',
    logoWidth: 158,
    logoHeight: 36,
    quote:
      '"Attio connects me with teams that value speed, structure, and scale. Building flexible, high-impact systems on such a powerful produc is a pleasure."',
    features: [{ label: 'Email & calendar sync' }, { label: 'API' }, { label: 'Mobile app' }],
  },
  {
    id: 'creator-partner',
    name: 'Daniel Hull',
    title: 'Founder, 80x',
    company: 'Daniel',
    avatarSrc: '/assets/images/testimonials/daniel.webp',
    logoText: 'Creator Partners',
    logoWidth: 124,
    logoHeight: 36,
    quote:
      '"The Attio creator program is a wellspring of new connections, genuine inspiration, and next-gen GTM insight I haven\'t found elsewhere."',
    features: [{ label: 'Workflows' }, { label: 'Integrations' }, { label: 'Communication intelligence' }],
  },
  {
    id: 'app-partner',
    name: 'Riya Grover',
    title: 'Co-founder & CEO, Sequience',
    company: 'Riya',
    avatarSrc: '/assets/images/testimonials/riya.webp',
    logoText: 'APP PARTNERS',
    logoWidth: 168,
    logoHeight: 36,
    quote:
      '"Attio\'s developer experience is a breath of fresh air. The team is outstanding to work with - we\'re thrilled for Sequence to be part of the Attio App store."',
    features: [{ label: 'Deals' }, { label: 'Workflows' }, { label: 'Notes' }],
  },
];


// ---------------------------------------------------------------------------
// Add more arrays below for other pages, e.g.:
// export const STARTUPS_TESTIMONIALS: Testimonial[] = [ ... ]
// ---------------------------------------------------------------------------
