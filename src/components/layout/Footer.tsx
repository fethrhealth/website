import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string
  href: string
  external?: boolean   // renders diagonal arrow + opens in new tab
  badge?: string       // "New" label
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  label: string
  href: string
  icon: React.ReactNode
}

// ─── Data ────────────────────────────────────────────────────────────────────

const COLUMNS: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Refer a team',      href: '/refer',    badge: 'New' },
      { label: 'Changelog',         href: '/changelog' },
      { label: 'Gmail extension',   href: '#',         external: true },
      { label: 'iOS app',           href: '#',         external: true },
      { label: 'Android app',       href: '#',         external: true },
      { label: 'Security',          href: '/security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Customers',         href: '/customers' },
      { label: 'Blog',              href: '/blog' },
      { label: 'Careers',           href: '/careers' },
      { label: 'Manifesto',         href: '/redefine' },
      { label: 'Become a partner',  href: '/partners' },
    ],
  },
  {
    title: 'Import from',
    links: [
      { label: 'Salesforce', href: '/help' },
      { label: 'HubSpot',    href: '/help' },
      { label: 'Pipedrive',  href: '/help' },
      { label: 'Zoho',       href: '/help' },
      { label: 'Excel',      href: '/help' },
      { label: 'CSV',        href: '/help' },
    ],
  },
  {
    title: 'Fethr for',
    links: [
      { label: 'Startups',              href: '/startups' },
      { label: 'Healthcare providers',  href: '/' },
      { label: 'Deal flow',             href: '/' },
    ],
  },
  {
    title: 'Apps',
    links: [
      { label: 'Gmail',    href: '#', external: true },
      { label: 'Outlook',  href: '#', external: true },
      { label: 'Slack',    href: '#', external: true },
      { label: 'Zapier',   href: '#', external: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Startup program',   href: '/startups' },
      { label: 'Help center',       href: '/help' },
      { label: 'Developer docs',    href: '#', external: true },
      { label: 'System status',     href: '#', external: true },
      { label: 'Hire an expert',    href: '/experts' },
      { label: 'Downloads',         href: '/download' },
    ],
  },
]

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" aria-hidden>
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" aria-hidden>
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" aria-hidden>
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
      </svg>
    ),
  },
]

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Terms & Conditions', href: '/legal/terms' },
  { label: 'Privacy Policy',     href: '/legal/privacy' },
]

// ─── External link arrow (diagonal, 14×14) ───────────────────────────────────

function ExternalArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="ml-0.5 -rotate-45 text-black-700 transition-colors duration-200 ease-in-out group-hover:text-white-900 group-hover:delay-50 group-active:text-white-400 group-active:duration-50"
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
    'text-sm font-normal text-white-900',
    'transition-colors duration-150 ease-out',
    'hover:text-white-400 active:text-white-200 active:duration-50',
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

export default function Footer() {
  return (
    // `dark` class forces attio-group-hover-underline into dark mode (screen blend, black halo)
    <footer className="relative flex min-h-[40svh] w-full flex-col justify-between bg-black-0 dark">

      {/* ── Top border line ───────────────────────────────────────────── */}
      <svg width="100%" height="1" className="text-black-400 shrink-0" aria-hidden>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>

      {/* ── Upper content ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 flex-1 w-full">
        <div className="grid grid-cols-12 gap-y-12 px-px pt-20 pb-12">

          {/* Logo — 1 column wide on desktop, wider on smaller screens */}
          <div className="col-[1/2] max-lg:col-[1/3] max-md:col-[1/5] max-sm:col-[1/-1]">
            <Link href="/" className="-m-1.5 inline-block rounded-lg p-1.5" aria-label="Fethr Health home">
              {/* brightness-0 invert → convierte cualquier logo oscuro en blanco */}
              <Image
                src="/assets/logos/logo.svg"
                alt="Fethr Health"
                width={103}
                height={26}
                className="w-full brightness-0 invert"
                priority={false}
              />
            </Link>
          </div>

          {/* Link columns — CSS multi-column masonry (matches Attio exactly) */}
          <div
            className={cn(
              'col-[5/-1] columns-4 gap-0',
              'max-xl:col-[4/-1] max-xl:columns-3',
              'max-lg:col-[1/-1] max-lg:columns-2',
              'max-sm:columns-1',
            )}
          >
            {COLUMNS.map((col) => (
              <div key={col.title} className="break-inside-avoid pb-7">
                <h2 className="py-1 text-sm text-black-700">{col.title}</h2>
                <ul className="flex flex-col">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="w-full bg-black-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 px-px py-10">

            {/* Social icons */}
            <div className="-ml-1 flex items-center gap-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex size-7 shrink-0 items-center justify-center rounded-lg text-black-700 transition-colors duration-300 ease-in-out hover:text-white-900 hover:duration-150 active:text-white-400 active:duration-50"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright + legal links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-normal text-black-700">
              <p>© 2026 Fethr Health Inc. All rights reserved.</p>

              <div className="flex flex-wrap items-center gap-x-6">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="-mx-1 rounded-lg p-1 transition-colors duration-300 ease-in-out hover:text-white-900 hover:duration-150 active:text-white-400 active:duration-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  )
}
