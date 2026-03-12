'use client'

/**
 * DevelopersRestApiSection
 *
 * REST API feature showcase section for /platform/developers.
 * Light mode only. Adapted from attio.com's "Integrate with anything" section.
 *
 * Structure:
 *   Header  — Section heading, subtitle, "View docs" CTA
 *   Cards   — Three cards in a single row desktop grid (col layout 3/11, 11/17, 17/23)
 *             Card 01 (wide, 8 cols), Card 02 (6 cols), Card 03 (6 cols)
 *
 * SVG illustrations are named zero-prop functions defined below.
 * Replace the placeholder SVG bodies with real illustrations when ready.
 *
 * CSS vars used in SVG illustrations (from globals.css :root):
 *   --color-weak-stroke            (#edeff3) — lightest grid lines
 *   --color-surface                (#edeff3) — soft fill background
 *   --color-caption-foreground     (#a4adba) — muted / secondary text
 *   --color-primary-background     (#ffffff) — white fill
 *   --internal-color-subtle-stroke (#e4e7ec) — card borders
 */

import Link from 'next/link'
import { McpCardPanel } from '@/components/ui/McpCardPanel'

// ─── SVG illustration: [01] Custom integrations / REST API ───────────────────
// Placeholder — replace with the real illustration SVG.
// Represents: full read/write access via REST API.
export function RestApiIntegrationSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 320 180"
      fill="none"
      style={{ maxWidth: '280px' }}
      aria-hidden
    >
      {/* Placeholder: dashed border rectangle */}
      <rect
        x="10" y="10" width="300" height="160" rx="8"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6"
        fill="var(--color-surface)"
      />
      {/* Center horizontal line representing an API endpoint */}
      <line
        x1="40" y1="90" x2="280" y2="90"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1"
      />
      {/* Left node */}
      <rect x="20" y="72" width="60" height="36" rx="6"
        fill="var(--color-primary-background)"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      {/* Right node */}
      <rect x="240" y="72" width="60" height="36" rx="6"
        fill="var(--color-primary-background)"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      {/* Center node */}
      <rect x="120" y="72" width="80" height="36" rx="6"
        fill="var(--color-primary-background)"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
    </svg>
  )
}

// ─── SVG illustration: [02] Webhooks ─────────────────────────────────────────
// Placeholder — replace with the real illustration SVG.
// Represents: event-driven webhook listeners.
export function WebhookSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 220 200"
      fill="none"
      style={{ maxWidth: '200px' }}
      aria-hidden
    >
      {/* Outer dashed ring representing event broadcast */}
      <circle cx="110" cy="100" r="85"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6" />
      {/* Inner ring */}
      <circle cx="110" cy="100" r="58"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      {/* Center circle */}
      <circle cx="110" cy="100" r="32"
        fill="var(--color-surface)"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      {/* Webhook arrow / lightning bolt placeholder */}
      <path
        d="M114 80 L103 100 L110 100 L106 120 L117 100 L110 100 Z"
        fill="var(--color-caption-foreground)"
      />
    </svg>
  )
}

// ─── SVG illustration: [03] OAuth 2.0 ────────────────────────────────────────
// Placeholder — replace with the real illustration SVG.
// Represents: OAuth 2.0 authorization flow.
export function OAuthRestSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 220 220"
      fill="none"
      style={{ maxWidth: '200px' }}
      aria-hidden
    >
      {/* Outer dashed ring */}
      <circle cx="110" cy="110" r="94"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6" />
      {/* Middle ring */}
      <circle cx="110" cy="110" r="66"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      {/* Inner fill circle */}
      <circle cx="110" cy="110" r="40"
        fill="var(--color-surface)"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      {/* Shield outline */}
      <path
        d="M110 90 L124 97 L124 109 Q124 122 110 130 Q96 122 96 109 L96 97 Z"
        fill="var(--color-primary-background)"
        stroke="var(--color-caption-foreground)" strokeWidth="1" />
      {/* Checkmark */}
      <path d="M103 110 L109 116 L118 105"
        stroke="var(--color-caption-foreground)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// ─── Card definitions ─────────────────────────────────────────────────────────

/** Single row — three cards at different widths (desktop) */
const CARDS = [
  {
    index: '01',
    description: 'Create custom integrations with full read and write access.',
    Illustration: RestApiIntegrationSvg,
    /** Wide card: occupies cols 3–11 (8 col units) in the 24-col grid */
    colSpan: '3 / 11' as const,
    innerGridCols: 16 as const,
  },
  {
    index: '02',
    description: 'Listen for webhooks and take action programatically.',
    Illustration: WebhookSvg,
    /** Medium card: occupies cols 11–17 (6 col units) */
    colSpan: '11 / 17' as const,
    innerGridCols: 12 as const,
  },
  {
    index: '03',
    description: 'Authenticate and authorize access with OAuth 2.0.',
    Illustration: OAuthRestSvg,
    /** Medium card: occupies cols 17–23 (6 col units) */
    colSpan: '17 / 23' as const,
    innerGridCols: 12 as const,
  },
]

// ─── Main section ─────────────────────────────────────────────────────────────
export function DevelopersRestApiSection() {
  return (
    <section className="border-t border-subtle-stroke">
      <div className="container flex flex-col isolate">
        <div className="flex w-full flex-col border-x border-subtle-stroke">

          {/* ── HEADER — Desktop (≥ lg) ─────────────────────────────── */}
          {/* 48-column grid; height driven by pt/pb. Dashed vertical lines
              at col 5 and col -5, content at col-[6/-6]. */}
          <div className="isolate max-lg:hidden border-b border-subtle-stroke">
            <div
              className="relative grid w-full items-center pt-40 pb-20 max-xl:pt-30 max-xl:pb-16"
              style={{
                gridTemplateColumns: 'repeat(48, 1fr)',
                gridTemplateRows: 'repeat(1, 1fr)',
              }}
            >
              {/* Dashed vertical line — column 5 */}
              <svg
                width="1" height="100%"
                className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                style={{ gridColumn: 5 }}
              >
                <line x1="0.5" y1="0" x2="0.5" y2="100%"
                  stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              {/* Dashed vertical line — column -5 (5th from right) */}
              <svg
                width="1" height="100%"
                className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                style={{ gridColumn: -5 }}
              >
                <line x1="0.5" y1="0" x2="0.5" y2="100%"
                  stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              {/* Content — occupies columns 6 through -6 */}
              <header className="col-[6/-6] flex flex-col gap-7">
                <div className="relative max-w-[22em] text-pretty text-start text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
                  <h2 className="inline text-pretty">Integrate Attio with anything.</h2>{' '}
                  <p className="inline text-pretty font-medium text-black-800">
                    Start coding with a simple REST API that’s secure and built for scale.
                  </p>
                </div>
                <div className="flex w-full flex-row items-center gap-x-2.5 gap-y-2">
                  <Link
                    href="/docs/rest-api"
                    className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm button-outline"
                  >
                    View docs
                  </Link>
                </div>
              </header>
            </div>
          </div>

          {/* ── HEADER — Mobile (< lg) ───────────────────────────────── */}
          <div className="lg:hidden border-b border-subtle-stroke px-6 py-12">
            <div className="max-w-[22em] text-pretty text-start text-heading-responsive-sm">
              <h2 className="inline text-pretty">Integrate Fethr with anything.</h2>{' '}
              <p className="inline text-pretty font-medium text-black-800">
                Start coding with a simple REST API that&apos;s secure and built for scale.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/docs/rest-api"
                className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-outline"
              >
                View docs
              </Link>
            </div>
          </div>

          {/* ── CARDS — Mobile (< lg) — all 3 stacked ───────────────── */}
          <div className="lg:hidden border-b border-subtle-stroke">
            {CARDS.map((card, i) => (
              <div
                key={card.index}
                className={i < CARDS.length - 1 ? 'border-b border-subtle-stroke' : ''}
                style={{ minHeight: '280px' }}
              >
                <McpCardPanel
                  index={card.index}
                  description={card.description}
                  Illustration={card.Illustration}
                  innerGridCols={12}
                />
              </div>
            ))}
          </div>

          {/* ── CARDS ROW — Desktop (≥ lg) ──────────────────────────── */}
          {/* 24 × 7 grid. Cards anchored absolutely at their column ranges:
              Card 01 → 3/11 (8 cols, wide)
              Card 02 → 11/17 (6 cols)
              Card 03 → 17/23 (6 cols)
              Matches attio.com's "Integrate with anything" grid exactly. */}
          <div className="isolate max-lg:hidden border-b border-subtle-stroke">
            <div
              className="relative grid w-full"
              style={{
                aspectRatio: '24 / 7',
                gridTemplateColumns: 'repeat(24, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
              }}
            >
              {CARDS.map(card => (
                <div
                  key={card.index}
                  className="absolute inset-0"
                  style={{ gridColumn: card.colSpan, gridRow: '1 / -1' }}
                >
                  <McpCardPanel
                    index={card.index}
                    description={card.description}
                    Illustration={card.Illustration}
                    innerGridCols={card.innerGridCols}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── SPACER — visual breathing room below cards ──────────── */}
          {/* 24 × 3 grid with two dashed vertical lines at col 3 and col 23. */}
          <div
            className="relative grid w-full items-center max-lg:hidden"
            style={{
              aspectRatio: '24 / 3',
              gridTemplateColumns: 'repeat(24, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
            }}
          >
            <svg
              width="1" height="100%"
              className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
              style={{ gridColumn: 3 }}
            >
              <line x1="0.5" y1="0" x2="0.5" y2="100%"
                stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
            <svg
              width="1" height="100%"
              className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
              style={{ gridColumn: 23 }}
            >
              <line x1="0.5" y1="0" x2="0.5" y2="100%"
                stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}
