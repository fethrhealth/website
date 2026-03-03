import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string
  href: string
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
      { label: 'Refer a Team',     href: '/refer' },
      { label: 'Blog',             href: '/blog' },
      { label: 'Manifesto',        href: '/redefine' },
      { label: 'Become a Partner', href: '/partners' },
      { label: 'Startup Program',  href: '/startups' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Developers',  href: '/platform/developers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/legal/terms' },
      { label: 'Privacy Policy',     href: '/legal/privacy' },
      { label: 'Referral Policy',    href: '/legal/referral' },
    ],
  },
]

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      // LinkedIn wordmark icon
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      // X logo
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      // YouTube icon
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Terms & Conditions', href: '/legal/terms' },
  { label: 'Privacy Policy',     href: '/legal/privacy' },
]

// ─── SVG divider (replicates attio.com's wavy top border) ────────────────────

function DividerWave() {
  return (
    <div className="w-full overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-8 text-stroke-subtle"
      >
        <path
          d="M0 32 C240 0, 480 32, 720 16 C960 0, 1200 32, 1440 16 L1440 0 L0 0 Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <line
          x1="0" y1="31.5"
          x2="1440" y2="31.5"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const columnTitleCn = 'text-xs text-fg-caption font-medium py-1'

// El <Link> es el `group` — activa el subrayado del <span> inline interior
const footerLinkCn = cn(
  'group -mx-1 p-1 rounded-lg block',
  'text-sm text-fg-tertiary font-normal',
  'hover:text-fg-secondary active:text-fg-primary',
  'transition-colors duration-150 ease-out',
)

// ─── Main component ───────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-background">
      {/* Wavy divider */}
      <DividerWave />

      {/* ── Upper section ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 pt-20 pb-12 gap-y-10">

          {/* Logo — col 1-4 on desktop, full width on mobile */}
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" aria-label="Fethr Health home">
              <Image
                src="/assets/logo.svg"
                alt="Fethr Health"
                width={103}
                height={26}
                priority={false}
              />
            </Link>
          </div>

          {/* Link columns — col 5-12 on desktop, full width on mobile */}
          <div className="col-span-12 lg:col-[5/-1]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <p className={columnTitleCn}>{col.title}</p>
                  <ul className="mt-2 flex flex-col gap-0.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        {/*
                         * `group` en el <Link> (bloque de click completo)
                         * `attio-group-hover-underline` en el <span> inline interior
                         * → background-position: 0 91% se calcula sobre la línea de texto
                         */}
                        <Link href={link.href} className={footerLinkCn}>
                          <span className="attio-group-hover-underline">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Lower section ───────────────────────────────────────────── */}
      <div className="bg-background-secondary border-t border-stroke-subtle">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* Social icons */}
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={cn(
                    'flex items-center justify-center size-7 rounded-lg',
                    'text-fg-caption hover:text-fg-tertiary',
                    'transition-colors duration-150 ease-out',
                  )}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright + legal links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <p className="text-xs text-fg-caption font-normal">
                © 2026 Fethr Health Inc. All rights reserved.
              </p>
              <nav aria-label="Legal links" className="flex items-center gap-4">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-xs text-fg-caption font-normal',
                      'hover:text-fg-tertiary transition-colors duration-150 ease-out',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
