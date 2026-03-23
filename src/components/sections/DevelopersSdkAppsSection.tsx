'use client'

/**
 * DevelopersSdkAppsSection
 *
 * "The SDK behind fast, flawless apps" logo showcase for /platform/developers.
 * Adapted from attio.com's App SDK section.
 *
 * ── ✏️  To customise ──────────────────────────────────────────────────────────
 * 1. In FEATURED_APPS replace each `logo: null` with your <Image> element.
 * 2. Update `name` and `href` for each app.
 * 3. Update GITHUB_HREF / GITHUB_LABEL for your open-source repo link.
 * 4. Edit HEADING / SUBHEADING / CTA_* for copy changes.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Desktop: header → 12×2 logo grid → striped row → GitHub CTA → spacer.
 * Mobile:  header → 2×2 logo grid (first 4 apps) → striped row → GitHub CTA.
 */

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

// ─── ✏️  EDITABLE DATA ────────────────────────────────────────────────────────

const HEADING    = 'The SDK behind fast, flawless apps.'
const SUBHEADING = 'Leading teams are already building with the App SDK. Share apps internally or publish to the App Store.'
const CTA_HREF   = '/apps'
const CTA_LABEL  = 'Browse apps'

const GITHUB_HREF  = 'https://github.com/fethr'
const GITHUB_LABEL = 'See our open source app on GitHub'

export interface AppItem {
  /** App display name shown below the logo. */
  name: string
  /** Link href — use a relative path for internal routes. */
  href: string
  /**
   * Logo element. Use Next.js <Image> for best performance.
   *
   * Recommended props:
   *   width={104} height={104} alt="App name"
   *   className="size-1/3 object-contain"
   *
   * If null, a grey rounded placeholder is shown until you add the real logo.
   *
   * Example:
   *   import Image from 'next/image'
   *   logo: <Image src="/logos/my-app.png" width={104} height={104} alt="My App" className="size-1/3 object-contain" />
   */
  logo: ReactNode
}

/**
 * ✏️  FEATURED_APPS ─ add your apps here.
 *
 * Desktop: shows ALL entries in a single row (works best with 4–6 apps).
 * Mobile:  shows ONLY the first 4 in a 2×2 grid.
 */
const FEATURED_APPS: AppItem[] = [
  { name: 'App 1', href: '', logo: <Image src="/assets/icons/developers/apps/app-one.webp" width={104} height={104} alt="App 1" className="size-full object-contain" /> },
  { name: 'App 2', href: '', logo: <Image src="/assets/icons/developers/apps/app-two.png" width={104} height={104} alt="App 1" className="size-full object-contain" /> },
  { name: 'App 3', href: '', logo: <Image src="/assets/icons/developers/apps/app-three.png" width={104} height={104} alt="App 1" className="size-full object-contain" /> },
  { name: 'App 4', href: '', logo: <Image src="/assets/icons/developers/apps/app-four.png" width={104} height={104} alt="App 1" className="size-full object-contain" /> },
  { name: 'App 5', href: '', logo: <Image src="/assets/icons/developers/apps/app-five.png" width={104} height={104} alt="App 1" className="size-full object-contain" /> },
]

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Solid border SVGs + corner dots — reused for every bordered panel. */
function CardBorders() {
  return (
    <>
      <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
      <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: -1 }}>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
      <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: 1 }}>
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>
      <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: -1 }}>
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>
      <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: 1  }} />
      <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: -1 }} />
      <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: 1  }} />
      <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: -1 }} />
    </>
  )
}

/** Repeating vertical stripes background (used behind the logo grid). */
function StripeBg() {
  return (
    <div
      className="absolute inset-0 text-secondary-background hacker-mode:text-[#00180d]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, transparent, transparent 5px, currentColor 5px, currentColor 6px)',
      }}
    />
  )
}

/**
 * Single bordered logo card.
 * Absolutely positioned inside the parent CSS grid via `col` / `row` strings.
 */
function LogoCard({ name, href, logo, col, row }: AppItem & { col: string; row: string }) {
  return (
    <div
      className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background"
      style={{ gridColumn: col, gridRow: row }}
    >
      <Link href={href} className="group flex flex-col items-center justify-center bg-primary-background">
        <div className="relative flex size-full flex-col items-center justify-center p-7 [perspective:800px]">
          <div className="relative flex size-full items-center justify-center [transform-style:preserve-3d]">
            {/* Hover glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square max-h-2/3 w-1/2 rounded-2xl bg-secondary-background opacity-0 transition-opacity duration-700 group-hover:opacity-80 group-hover:duration-300" />
            {/* Logo or placeholder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1/3 flex items-center justify-center will-change-transform">
              {logo ?? <div className="size-full rounded-xl bg-subtle-stroke" />}
            </div>
          </div>
          <p className="text-balance text-center text-sm text-accent-foreground">{name}</p>
        </div>
      </Link>
      <CardBorders />
    </div>
  )
}

/** GitHub icon (Font Awesome brand path). */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 496 512" className="size-4 shrink-0 text-accent-foreground" fill="currentColor" aria-hidden>
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
    </svg>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function DevelopersSdkAppsSection() {
  const n = FEATURED_APPS.length
  // Distribute N apps evenly across columns 2..12 (10 cols) in a 12-col grid.
  const desktopCol = (i: number) =>
    `${Math.round(2 + i * (10 / n))} / ${Math.round(2 + (i + 1) * (10 / n))}`

  return (
    <section className="border-t border-subtle-stroke">
      <div className="container flex flex-1 flex-col isolate">
        <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">

          {/* ── HEADER — Desktop (≥ lg) ─────────────────────────────── */}
          <div className="isolate max-lg:hidden">
            <div
              className="relative grid w-full items-center pt-40 pb-20 max-xl:pt-30 max-xl:pb-16"
              style={{
                gridTemplateColumns: 'repeat(48, 1fr)',
                gridTemplateRows: 'repeat(1, 1fr)',
              }}
            >
              <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: 5 }}>
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: -5 }}>
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <header className="col-[6/-6] flex flex-col gap-7">
                <div className="max-w-[22em] text-pretty text-start text-heading-responsive-sm">
                  <h2 className="inline text-pretty">{HEADING}</h2>{' '}
                  <p className="inline text-pretty font-medium text-black-800">{SUBHEADING}</p>
                </div>
                <div>
                  <Link
                    href={CTA_HREF}
                    className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm button-outline hacker-mode:bg-[#001a0d] hacker-mode:text-[#00a852] hacker-mode:border-[#1a2d1a]"
                  >
                    {CTA_LABEL}
                  </Link>
                </div>
              </header>
            </div>
          </div>

          {/* ── HEADER — Mobile (< lg) ───────────────────────────────── */}
          <div className="lg:hidden px-6 py-12">
            <div className="max-w-[22em] text-pretty text-start text-heading-responsive-sm">
              <h2 className="inline text-pretty">{HEADING}</h2>{' '}
              <p className="inline text-pretty font-medium text-black-800">{SUBHEADING}</p>
            </div>
            <div className="mt-6">
              <Link
                href={CTA_HREF}
                className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm button-outline hacker-mode:bg-[#001a0d] hacker-mode:text-[#00a852] hacker-mode:border-[#1a2d1a]"
              >
                {CTA_LABEL}
              </Link>
            </div>
          </div>

          {/* ── LOGO GRID — Desktop ───────────────────────────────────── */}
          {/* 12×2 grid. Stripes at col[3/-3]. Cards fill col[2/12]. */}
          <div className="isolate max-lg:hidden">
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '12 / 2',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
              }}
            >
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: -1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>

              {/* Stripe background */}
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background overflow-hidden"
                style={{ gridColumn: '3 / -3', gridRow: '1 / -1' }}
              >
                <StripeBg />
                <CardBorders />
              </div>

              {/* Logo cards */}
              {FEATURED_APPS.map((app, i) => (
                <LogoCard key={app.name} {...app} col={desktopCol(i)} row="1 / -1" />
              ))}
            </div>
          </div>

          {/* ── GITHUB CTA — Desktop ──────────────────────────────────── */}
          {/* Striped accent row (24/2) + GitHub link row (48/2). */}
          <div className="max-lg:hidden">
            {/* Striped row */}
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '24 / 2',
                gridTemplateColumns: 'repeat(24, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
              }}
            >
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background overflow-hidden"
                style={{ gridColumn: '3 / -3', gridRow: '1 / -1' }}
              >
                <StripeBg />
                <CardBorders />
              </div>
            </div>
            {/* GitHub link row */}
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '48 / 2',
                gridTemplateColumns: 'repeat(48, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
              }}
            >
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: -1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background"
                style={{ gridColumn: '5 / -5', gridRow: '1 / -1' }}
              >
                <CardBorders />
              </div>
              <Link
                href={GITHUB_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group absolute inset-0 flex items-center justify-end gap-2"
                style={{ gridColumn: '6 / -6', gridRow: '1 / -1' }}
              >
                <GitHubIcon />
                <span className="text-pretty text-accent-foreground">{GITHUB_LABEL}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-accent-foreground" aria-hidden>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── LOGO GRID — Mobile ────────────────────────────────────── */}
          {/* First 4 apps in a 2×2 arrangement (12×10 grid). */}
          <div className="isolate lg:hidden">
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '12 / 10',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(10, 1fr)',
              }}
            >
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 6 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: -1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>

              {/* 2×2 cards — first 4 apps */}
              {([ // [appIndex, col, row]
                [0, '1 / 7',  '1 / 6' ],
                [1, '7 / 13', '1 / 6' ],
                [2, '1 / 7',  '6 / 11'],
                [3, '7 / 13', '6 / 11'],
              ] as [number, string, string][]).map(([i, col, row]) => {
                const app = FEATURED_APPS[i]
                return app ? (
                  <LogoCard key={app.name} {...app} col={col} row={row} />
                ) : null
              })}
            </div>
          </div>

          {/* ── GITHUB CTA — Mobile ───────────────────────────────────── */}
          <div className="lg:hidden">
            {/* Striped row */}
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '24 / 6',
                gridTemplateColumns: 'repeat(24, 1fr)',
                gridTemplateRows: 'repeat(6, 1fr)',
              }}
            >
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background overflow-hidden"
                style={{ gridColumn: '1 / -1', gridRow: '1 / -1' }}
              >
                <StripeBg />
                <CardBorders />
              </div>
            </div>
            {/* GitHub link row */}
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '24 / 6',
                gridTemplateColumns: 'repeat(24, 1fr)',
                gridTemplateRows: 'repeat(6, 1fr)',
              }}
            >
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background"
                style={{ gridColumn: '1 / -1', gridRow: '1 / -1' }}
              >
                <CardBorders />
              </div>
              <Link
                href={GITHUB_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group absolute inset-0 flex items-center justify-start gap-2 px-6"
                style={{ gridColumn: '1 / -1', gridRow: '1 / -1' }}
              >
                <GitHubIcon />
                <span className="text-pretty text-accent-foreground">{GITHUB_LABEL}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-accent-foreground" aria-hidden>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── SPACER ─────────────────────────────────────────────────── */}
          <div
            className="relative grid w-full items-center max-lg:hidden"
            style={{
              aspectRatio: '24 / 3',
              gridTemplateColumns: 'repeat(24, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
            }}
          >
            <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: 3 }}>
              <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
            <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: -3 }}>
              <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}
