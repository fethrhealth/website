import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { SocialLinkEntry, SocialPlatform } from '@/types'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string
  href: string
  external?: boolean   // renders diagonal arrow + opens in new tab
  badge?: string       // "New" label
  disabled?: boolean   // page doesn't exist yet — renders as <span>, no navigation
}

/** Minimal shape passed from FooterWrapper for dynamic legal links */
export interface FooterLegalLink {
  label: string
  href: string
}

// ─── Social platform icon map ─────────────────────────────────────────────────

const PLATFORM_META: Record<SocialPlatform, { label: string; icon: React.ReactNode }> = {
  linkedin: {
    label: 'LinkedIn',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" aria-hidden>
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
      </svg>
    ),
  },
  x: {
    label: 'X (Twitter)',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" aria-hidden>
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    ),
  },
  youtube: {
    label: 'YouTube',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" aria-hidden>
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </svg>
    ),
  },
  facebook: {
    label: 'Facebook',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" aria-hidden>
        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" aria-hidden>
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
  },
  tiktok: {
    label: 'TikTok',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" aria-hidden>
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
      </svg>
    ),
  },
  github: {
    label: 'GitHub',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="1em" width="1em" aria-hidden>
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 389.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
      </svg>
    ),
  },
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

const COLUMNS: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Refer an organization', href: '/refer' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog',         href: '/blog' },
      // { label: 'Help Center',  href: '/help',                 disabled: true },
      /* { label: 'Developers',   href: '/platform/developers' }, */
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Manifesto',        href: '/redefine' },
      /* { label: 'Become a Partner', href: '/partners',  disabled: false }, */
      { label: 'Startup Program',  href: '/startups' },
    ],
  },
  // Legal column is populated dynamically from Payload CMS via FooterWrapper
]

// ─── External link arrow (diagonal, 14×14) ───────────────────────────────────

function ExternalArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="ml-0.5 -rotate-45 text-fg-caption transition-colors duration-200 ease-in-out-cubic group-hover:text-fg-secondary group-hover:delay-50 group-focus:text-fg-secondary group-focus:delay-50 group-active:text-fg-primary group-active:duration-50"
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.1"
        d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5"
      />
    </svg>
  )
}

// ─── Single footer link row ───────────────────────────────────────────────────

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = cn(
    'group -mx-1 flex w-fit items-center rounded-lg p-1',
    'text-sm font-normal text-fg-tertiary',
    'transition-colors duration-150 ease-out',
    'hover:text-fg-secondary focus-visible:text-fg-secondary active:text-fg-primary active:duration-50',
  )

  const inner = (
    <>
      <span className="attio-group-hover-underline">{link.label}</span>
      {link.badge && (
        <div className="ml-1.5 rounded-[10px] bg-blue-500 px-1.5 py-1 text-[10px] font-normal text-white-100 leading-[7px] tracking-normal">
          {link.badge}
        </div>
      )}
      {link.external && <ExternalArrow />}
    </>
  )

  // Page doesn't exist yet — render as non-interactive span
  if (link.disabled) {
    return <span className={className}>{inner}</span>
  }

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={link.href} className={className}>
      {inner}
    </Link>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Footer({
  legalLinks = [],
  socialLinks = [],
}: {
  legalLinks?: FooterLegalLink[]
  socialLinks?: SocialLinkEntry[]
}) {
  return (
    <footer className="relative flex min-h-[40svh] w-full flex-col justify-between bg-primary-background">

      {/* ── Top border line ───────────────────────────────────────────── */}
      <svg width="100%" height="1" className="text-subtle-stroke hacker-mode:text-[#1a2d1a] shrink-0" aria-hidden>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>

      {/* ── Upper content ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 flex-1 w-full">
        <div className="grid grid-cols-12 gap-y-12 px-px pt-20 pb-12">

          {/* Logo — 1 column wide on desktop, wider on smaller screens */}
          <div className="col-[1/2] max-lg:col-[1/3] max-md:col-[1/5] max-sm:col-[1/-1]">
            <Link href="/" className="-m-1.5 inline-block w-30 rounded-lg p-1.5" aria-label="Fethr Health home">
              <Image
                src="/assets/logos/logo.svg"
                alt="Fethr Health"
                width={103}
                height={26}
                className="w-auto hacker-mode:[filter:grayscale(1)_sepia(1)_hue-rotate(100deg)_saturate(5)_brightness(1.3)]"
                priority={false}
              />
            </Link>
          </div>

          {/* Link columns — CSS multi-column masonry (matches Attio exactly) */}
          <div
            className={cn(
              'col-[5/-1] grid grid-cols-4 gap-0',
              'max-xl:col-[4/-1]',
              'max-lg:col-[1/-1] max-lg:grid-cols-2',
              'max-sm:grid-cols-2',
            )}
          >
            {COLUMNS.map((col) => (
              <div key={col.title} className="pb-7">
                <h2 className="py-1 text-sm text-fg-caption hacker-mode:text-[#005c26]">{col.title}</h2>
                <ul className="flex flex-col">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Legal column — dynamically populated from Payload CMS */}
            <div className="pb-7">
              <h2 className="py-1 text-sm text-fg-caption hacker-mode:text-[#005c26]">Legal</h2>
              {legalLinks.length > 0 && (
                <ul className="flex flex-col">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="w-full bg-secondary-background hacker-mode:bg-[#000e08]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 px-px py-10">

            {/* Social icons — managed from Payload CMS */}
            <div className="-ml-1 flex items-center gap-1">
              {socialLinks.map((social) => {
                const meta = PLATFORM_META[social.platform]
                if (!meta) return null
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    aria-label={meta.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex size-7 shrink-0 items-center justify-center rounded-lg text-fg-caption transition-colors duration-400 ease-in-out hover:text-fg-tertiary hover:duration-150 active:text-fg-secondary active:duration-50"
                  >
                    {meta.icon}
                  </a>
                )
              })}
            </div>

            {/* Copyright */}
            <p className="text-xs font-normal text-fg-caption hacker-mode:text-[#005c26]">
              © 2026 Fethr Health Inc. All rights reserved.
            </p>

          </div>
        </div>
      </div>

    </footer>
  )
}
