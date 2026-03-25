/**
 * Company logo grids.
 *
 * Usage:
 *   <CompaniesSection logos={HOME_COMPANY_LOGOS} />
 *   <CompaniesSection logos={PARTNERS_COMPANY_LOGOS} heading="Trusted by our partners" />
 *
 * Images → /public/assets/logos/companies/[slug].svg
 * Recommended size: 172×60 px
 */

export interface CompanyLogo {
  /** Path from /public, e.g. "/assets/logos/companies/acme.svg" */
  src: string
  /** Descriptive alt text; can be empty ("") if decorative */
  alt: string
  width: number
  height: number
}

// ---------------------------------------------------------------------------
// Home page — add up to ~18 logos (desktop 6 cols × 3 rows).
// On mobile (md↓) only the first 9 are shown.
// ---------------------------------------------------------------------------
export const HOME_COMPANY_LOGOS: CompanyLogo[] = [
  { src: '/assets/logos/companies/company-1.webp',  alt: 'Company 1',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-2.webp',  alt: 'Company 2',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-3.webp',  alt: 'Company 3',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-4.webp',  alt: 'Company 4',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-5.webp',  alt: 'Company 5',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-6.webp',  alt: 'Company 6',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-7.webp',  alt: 'Company 7',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-8.webp',  alt: 'Company 8',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-9.webp',  alt: 'Company 9',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-10.webp', alt: 'Company 10', width: 172, height: 60 },
  { src: '/assets/logos/companies/company-11.webp', alt: 'Company 11', width: 172, height: 60 },
  { src: '/assets/logos/companies/company-12.webp', alt: 'Company 12', width: 172, height: 60 },
]

export const STARTUP_COMPANY_LOGOS: CompanyLogo[] = [
  { src: '/assets/logos/companies/company-1.webp',  alt: 'Company 1',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-2.webp',  alt: 'Company 2',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-3.webp',  alt: 'Company 3',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-4.webp',  alt: 'Company 4',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-5.webp',  alt: 'Company 5',  width: 172, height: 60 },
  { src: '/assets/logos/companies/company-6.webp',  alt: 'Company 6',  width: 172, height: 60 },
]
