'use client'

/**
 * DevelopersBuildYourWaySection
 *
 * "Build your way" App SDK feature showcase for /platform/developers.
 * Light mode only. Adapted from attio.com's "Build your Attio, your way" section.
 *
 * Structure:
 *   Header      — Section heading, subtitle, "View docs" CTA
 *   Row 1       — Cards [01], [02], [03] in a 3-column desktop grid
 *                 Card 01 (8 cols wide), Card 02 (6 cols), Card 03 (6 cols)
 *   Testimonial — Full-width striped background quote (same as DevelopersMcpSection)
 *   Row 2       — Cards [04], [05], [06] in a 3-column desktop grid
 *                 Card 04 (6 cols), Card 05 (6 cols), Card 06 (8 cols wide)
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

// ─── SVG illustration: [01] Entry points ─────────────────────────────────────
function EntryPointsSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 280 160"
      fill="none"
      style={{ maxWidth: '260px' }}
      aria-hidden
    >
      <rect x="10" y="10" width="260" height="140" rx="8"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6"
        fill="var(--color-surface)" />
      <rect x="30" y="55" width="80" height="44" rx="6"
        fill="var(--color-primary-background)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <rect x="130" y="55" width="80" height="44" rx="6"
        fill="var(--color-primary-background)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <rect x="200" y="38" width="60" height="26" rx="5"
        fill="var(--color-primary-background)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <line x1="110" y1="77" x2="130" y2="77"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
    </svg>
  )
}

// ─── SVG illustration: [02] Forms ────────────────────────────────────────────
function FormsSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 220 200"
      fill="none"
      style={{ maxWidth: '200px' }}
      aria-hidden
    >
      <rect x="28" y="28" width="164" height="144" rx="8"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1"
        fill="var(--color-primary-background)" />
      <rect x="48" y="52" width="124" height="18" rx="4" fill="var(--color-surface)" />
      <rect x="48" y="80" width="124" height="18" rx="4" fill="var(--color-surface)" />
      <rect x="48" y="108" width="80" height="18" rx="4" fill="var(--color-surface)" />
      <rect x="48" y="144" width="52" height="20" rx="5"
        fill="var(--color-caption-foreground)" opacity="0.25" />
    </svg>
  )
}

// ─── SVG illustration: [03] Server functions ─────────────────────────────────
function ServerFunctionsSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 220 200"
      fill="none"
      style={{ maxWidth: '200px' }}
      aria-hidden
    >
      <circle cx="110" cy="95" r="72"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="110" cy="95" r="50"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <circle cx="110" cy="95" r="30"
        fill="var(--color-surface)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <path d="M104 89 L118 95 L104 101 Z" fill="var(--color-caption-foreground)" />
    </svg>
  )
}

// ─── SVG illustration: [04] Authentication ───────────────────────────────────
function AuthSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 220 220"
      fill="none"
      style={{ maxWidth: '200px' }}
      aria-hidden
    >
      <circle cx="110" cy="110" r="90"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="110" cy="110" r="62"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <circle cx="110" cy="110" r="36"
        fill="var(--color-surface)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <path d="M110 93 L123 100 L123 112 Q123 125 110 132 Q97 125 97 112 L97 100 Z"
        fill="var(--color-primary-background)"
        stroke="var(--color-caption-foreground)" strokeWidth="1" />
      <path d="M103 111 L109 117 L118 106"
        stroke="var(--color-caption-foreground)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// ─── SVG illustration: [05] Webhooks ─────────────────────────────────────────
function WebhooksSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 220 200"
      fill="none"
      style={{ maxWidth: '200px' }}
      aria-hidden
    >
      <circle cx="110" cy="100" r="80"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="110" cy="100" r="54"
        stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <circle cx="110" cy="100" r="30"
        fill="var(--color-surface)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <path d="M114 82 L103 100 L110 100 L106 118 L117 100 L110 100 Z"
        fill="var(--color-caption-foreground)" />
    </svg>
  )
}

// ─── SVG illustration: [06] UI components ────────────────────────────────────
function UiComponentsSvg() {
  return (
    <svg
      width="100%"
      viewBox="0 0 280 160"
      fill="none"
      style={{ maxWidth: '260px' }}
      aria-hidden
    >
      <rect x="10" y="10" width="260" height="140" rx="8"
        stroke="var(--color-weak-stroke)" strokeWidth="1" strokeDasharray="4 6"
        fill="var(--color-surface)" />
      <rect x="30" y="32" width="105" height="28" rx="6"
        fill="var(--color-primary-background)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <rect x="145" y="32" width="105" height="28" rx="6"
        fill="var(--color-primary-background)" stroke="var(--internal-color-subtle-stroke)" strokeWidth="1" />
      <rect x="30" y="74" width="220" height="18" rx="4" fill="var(--color-surface)" />
      <rect x="30" y="100" width="220" height="18" rx="4" fill="var(--color-surface)" />
    </svg>
  )
}

// ─── Card row definitions ─────────────────────────────────────────────────────

/** Row 1: Card 01 wide (8 cols), 02 + 03 medium (6 cols each). */
const ROW_1_CARDS = [
  {
    index: '01',
    description:
      'Choose entry points like record actions, widgets, or text selection to run your app inside Attio.',
    Illustration: EntryPointsSvg,
    colSpan: '3 / 11' as const,
    innerGridCols: 16 as const,
  },
  {
    index: '02',
    description: 'Create forms and define the shape and validation rules of your form data.',
    Illustration: FormsSvg,
    colSpan: '11 / 17' as const,
    innerGridCols: 12 as const,
  },
  {
    index: '03',
    description: 'Use server functions to fetch, update, or remove data from third parties.',
    Illustration: ServerFunctionsSvg,
    colSpan: '17 / 23' as const,
    innerGridCols: 12 as const,
  },
]

/** Row 2: Card 04 + 05 medium (6 cols each), 06 wide (8 cols). Mirrored from Row 1. */
const ROW_2_CARDS = [
  {
    index: '04',
    description:
      'Authenticate connections for users or entire workspaces between Attio and external parties.',
    Illustration: AuthSvg,
    colSpan: '3 / 9' as const,
    innerGridCols: 12 as const,
  },
  {
    index: '05',
    description: 'Receive external requests with webhooks to sync Attio or respond with data.',
    Illustration: WebhooksSvg,
    colSpan: '9 / 15' as const,
    innerGridCols: 12 as const,
  },
  {
    index: '06',
    description: 'Add ready-made UI components to ship polished interfaces for your app.',
    Illustration: UiComponentsSvg,
    colSpan: '15 / 23' as const,
    innerGridCols: 16 as const,
  },
]

// ─── Main section ─────────────────────────────────────────────────────────────
export function DevelopersBuildYourWaySection() {
  return (
    <section className="border-t border-subtle-stroke">
      <div className="container flex flex-col isolate">
        <div className="flex w-full flex-col border-x border-subtle-stroke">

          {/* ── HEADER — Desktop (≥ lg) ─────────────────────────────── */}
          {/* 48-column grid; dashed vertical lines at col 5 and col -5,
              content at col-[6/-6]. */}
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
              {/* Dashed vertical line — column -5 */}
              <svg
                width="1" height="100%"
                className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                style={{ gridColumn: -5 }}
              >
                <line x1="0.5" y1="0" x2="0.5" y2="100%"
                  stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <header className="col-[6/-6] flex flex-col gap-7">
                <div className="relative max-w-[22em] text-pretty text-start text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
                  <h2 className="inline text-pretty">Build your Attio, your way.</h2>{' '}
                  <p className="inline text-pretty font-medium text-black-800">
                    Extend Attio in TypeScript and React with the App SDK.
                  </p>
                </div>
                <div className="flex w-full flex-row items-center gap-x-2.5 gap-y-2">
                  <Link
                    href="/docs/sdk"
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
              <h2 className="inline text-pretty">Build your Attio, your way.</h2>{' '}
              <p className="inline text-pretty font-medium text-black-800">
                Extend Attio in TypeScript and React with the App SDK.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/docs/sdk"
                className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-outline"
              >
                View docs
              </Link>
            </div>
          </div>

          {/* ── CARDS ROW 1 — Mobile (< lg) ─────────────────────────── */}
          <div className="lg:hidden border-b border-subtle-stroke">
            {ROW_1_CARDS.map((card, i) => (
              <div
                key={card.index}
                className={i < ROW_1_CARDS.length - 1 ? 'border-b border-subtle-stroke' : ''}
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

          {/* ── CARDS ROW 1 — Desktop (≥ lg) ────────────────────────── */}
          {/* 24 × 7 grid. Card 01 → 3/11 (8 cols wide), 02 → 11/17, 03 → 17/23 */}
          <div className="isolate max-lg:hidden border-b border-subtle-stroke">
            <div
              className="relative grid w-full"
              style={{
                aspectRatio: '24 / 7',
                gridTemplateColumns: 'repeat(24, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
              }}
            >
              {ROW_1_CARDS.map(card => (
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

          {/* ── TESTIMONIAL — Desktop (≥ lg) ────────────────────────── */}
          {/* 48 × 8 grid. Background panel at col-[5/-5] with striped fill,
              solid border lines, and corner dots. Quote sits at col-[6/-6] row-[2/-2]. */}
          <div className="isolate max-lg:hidden">
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '48 / 8',
                gridTemplateColumns: 'repeat(48, 1fr)',
                gridTemplateRows: 'repeat(8, 1fr)',
              }}
            >
              {/* Striped background panel */}
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background"
                style={{ gridColumn: '5 / -5', gridRow: '1 / -1' }}
              >
                <div
                  className="absolute inset-0 size-full"
                  style={{
                    color: '#e4e7ec',
                    backgroundImage:
                      'repeating-linear-gradient(90deg, transparent, transparent 5px, currentColor 5px, currentColor 6px)',
                  }}
                />
                {/* Top border */}
                <svg width="100%" height="1"
                  className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
                  style={{ gridColumn: '1 / -1', gridRow: 1 }}>
                  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
                </svg>
                {/* Bottom border */}
                <svg width="100%" height="1"
                  className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
                  style={{ gridColumn: '1 / -1', gridRow: -1 }}>
                  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
                </svg>
                {/* Left border */}
                <svg width="1" height="100%"
                  className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                  style={{ gridColumn: 1, gridRow: '1 / -1' }}>
                  <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
                </svg>
                {/* Right border */}
                <svg width="1" height="100%"
                  className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                  style={{ gridColumn: -1, gridRow: '1 / -1' }}>
                  <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
                </svg>
                {/* Corner dots */}
                <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: 1  }} />
                <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: -1 }} />
                <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: 1  }} />
                <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: -1 }} />
              </div>

              {/* Quote + attribution — bottom-aligned inside the panel */}
              <div
                className="absolute inset-y-0 flex size-full items-end justify-between"
                style={{ gridColumn: '6 / -6', gridRow: '2 / -2' }}
              >
                <p className="max-w-[28em] text-balance font-medium text-quote-responsive text-fg-primary">
                  &ldquo;The Fethr MCP gave us instant access to Fethr&apos;s full
                  data model without any custom API work.&rdquo;
                </p>
                <div className="flex shrink-0 flex-col items-end gap-y-1 text-right">
                  <span className="text-sm font-semibold text-fg-primary">Siavash Ghorbani</span>
                  <span className="text-sm text-fg-caption">Co-founder, Stilla</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── TESTIMONIAL — Mobile (< lg) ─────────────────────────── */}
          <div className="lg:hidden border-b border-subtle-stroke px-6 py-12">
            <p className="text-quote-sm font-medium text-balance text-fg-primary">
              &ldquo;The Fethr MCP gave us instant access to Fethr&apos;s full
              data model without any custom API work.&rdquo;
            </p>
            <div className="mt-6 flex flex-col gap-y-1">
              <span className="text-sm font-semibold text-fg-primary">Siavash Ghorbani</span>
              <span className="text-sm text-fg-caption">Co-founder, Stilla</span>
            </div>
          </div>

          {/* ── CARDS ROW 2 — Mobile (< lg) ─────────────────────────── */}
          <div className="lg:hidden border-b border-subtle-stroke">
            {ROW_2_CARDS.map((card, i) => (
              <div
                key={card.index}
                className={i < ROW_2_CARDS.length - 1 ? 'border-b border-subtle-stroke' : ''}
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

          {/* ── CARDS ROW 2 — Desktop (≥ lg) ────────────────────────── */}
          {/* 24 × 7 grid. Card 04 → 3/9, 05 → 9/15, 06 → 15/23 (wide). Mirrored from Row 1. */}
          <div className="isolate max-lg:hidden border-b border-subtle-stroke">
            <div
              className="relative grid w-full"
              style={{
                aspectRatio: '24 / 7',
                gridTemplateColumns: 'repeat(24, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
              }}
            >
              {ROW_2_CARDS.map(card => (
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

          {/* ── SPACER — visual breathing room below last row ───────── */}
          {/* 24 × 3 grid with dashed vertical lines at cols 3, 9, 15, 23. */}
          <div
            className="relative grid w-full items-center max-lg:hidden"
            style={{
              aspectRatio: '24 / 3',
              gridTemplateColumns: 'repeat(24, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
            }}
          >
            {([3, 9, 15, 23] as const).map(col => (
              <svg
                key={col}
                width="1" height="100%"
                className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                style={{ gridColumn: col }}
              >
                <line x1="0.5" y1="0" x2="0.5" y2="100%"
                  stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
