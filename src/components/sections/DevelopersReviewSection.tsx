'use client'

/**
 * DevelopersReviewSection
 *
 * Reusable developer testimonial section for /platform/developers.
 * Light mode only. Adapted from attio.com's developer review section.
 *
 * Desktop — 24×10 CSS grid:
 *   Background  — 23 vertical + 9 horizontal lines (alternating dashed/solid)
 *   Attribution — col 2/5, row 3/4  (name + role monospace label + horizontal rule)
 *   Photo       — col 3/9, row 3/-3 (optional — rendered with mix-blend-lighten)
 *   Panel       — col 9/-3, row 4/-4 (white bg box with border SVGs + corner dots)
 *   Quote       — col 10/-4, row 4/-4 (word-span structure ready for animation)
 *
 * Mobile — simple stacked layout with quote + attribution.
 *
 * Usage:
 *   <DevelopersReviewSection
 *     quote="Your full quote text here."
 *     name="Full Name"
 *     role="// Role or Title"
 *     photo={<img src="..." className="w-full h-full object-cover" />}
 *   />
 */

import type { ReactNode } from 'react'

export interface DevelopersReviewSectionProps {
  /** Full quote text — split into words internally for per-word animation. */
  quote: string
  /** Reviewer's full name. */
  name: string
  /** Reviewer's role/title shown in monospace, e.g. "// Fethr Developer". */
  role: string
  /**
   * Optional photo element. Rendered with mix-blend-lighten so dark content
   * shows through the light section background. Pass an <img> or <Image>.
   */
  photo?: ReactNode
}

// ─── Grid line helpers ────────────────────────────────────────────────────────

// 23 vertical lines for a 24-column grid, alternating dashed/solid.
const V_LINES = Array.from({ length: 23 }, (_, i) => i % 2 === 0)
// 9 horizontal lines for a 10-row grid, alternating dashed/solid.
const H_LINES = Array.from({ length: 9 }, (_, i) => i % 2 === 0)

// ─── Section ──────────────────────────────────────────────────────────────────
export function DevelopersReviewSection({ quote, name, role, photo }: DevelopersReviewSectionProps) {
  // Split the quote into words for per-word Framer Motion animation (future).
  const words = quote.split(' ')

  return (
    <section className="border-t border-subtle-stroke">

      {/* ── Desktop (≥ lg) ──────────────────────────────────────────────── */}
      <div className="container flex flex-1 flex-col isolate max-lg:hidden">
        <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">
          <div
            className="grid w-full items-center relative"
            style={{
              aspectRatio: '24 / 10',
              gridTemplateColumns: 'repeat(24, 1fr)',
              gridTemplateRows: 'repeat(10, 1fr)',
            }}
          >

            {/* ── Background grid lines ──────────────────────────────── */}
            <div className="absolute inset-0 *:*:text-weak-stroke">
              {/* Vertical — 23 lines, justify-evenly across the container */}
              <div className="absolute inset-x-[0.5px] inset-y-0 flex justify-evenly">
                {V_LINES.map((dashed, i) => (
                  <svg key={i} width="1" height="100%" className="text-subtle-stroke">
                    <line
                      x1="0.5" y1="0" x2="0.5" y2="100%"
                      stroke="currentColor"
                      strokeLinecap="round"
                      {...(dashed ? { strokeDasharray: '4 6' } : {})}
                    />
                  </svg>
                ))}
              </div>
              {/* Horizontal — 9 lines, justify-evenly down the container */}
              <div className="absolute inset-x-0 inset-y-[0.5px] flex flex-col justify-evenly">
                {H_LINES.map((dashed, i) => (
                  <svg key={i} width="100%" height="1" className="text-subtle-stroke">
                    <line
                      x1="0" y1="0.5" x2="100%" y2="0.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      {...(dashed ? { strokeDasharray: '4 6' } : {})}
                    />
                  </svg>
                ))}
              </div>
            </div>

            {/* ── Attribution label — col 2/5, row 3/4 ──────────────── */}
            <div
              className="absolute inset-0 flex flex-col justify-end gap-1"
              style={{ gridColumn: '2 / 5', gridRow: '3 / 4' }}
            >
              <p className="font-mono text-accent-foreground text-xs uppercase">
                <span>{name}</span><br />
                <span>{role}</span>
              </p>
              <svg width="100%" height="1" className="text-accent-foreground">
                <line x1="0" y1="0.5" x2="100%" y2="0.5"
                  stroke="currentColor" strokeLinecap="round" />
              </svg>
            </div>

            {/* ── Photo — col 3/9, row 3/-3 ─────────────────────────── */}
            <div
              className="absolute inset-0"
              style={{ gridColumn: '3 / 9', gridRow: '3 / -3' }}
            >
              <div className="absolute inset-0 mix-blend-lighten">
                {photo ?? <div className="w-full h-full" />}
              </div>
            </div>

            {/* ── White panel — col 9/-3, row 4/-4 ─────────────────── */}
            {/* 1×1 sub-grid so border SVGs + corner dots anchor to edges */}
            <div
              className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background"
              style={{ gridColumn: '9 / -3', gridRow: '4 / -4' }}
            >
              {/* Top border */}
              <svg width="100%" height="1"
                className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
                style={{ gridRow: 1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5"
                  stroke="currentColor" strokeLinecap="round" />
              </svg>
              {/* Bottom border */}
              <svg width="100%" height="1"
                className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
                style={{ gridRow: -1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5"
                  stroke="currentColor" strokeLinecap="round" />
              </svg>
              {/* Left border */}
              <svg width="1" height="100%"
                className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                style={{ gridColumn: 1 }}>
                <line x1="0.5" y1="0" x2="0.5" y2="100%"
                  stroke="currentColor" strokeLinecap="round" />
              </svg>
              {/* Right border */}
              <svg width="1" height="100%"
                className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                style={{ gridColumn: -1 }}>
                <line x1="0.5" y1="0" x2="0.5" y2="100%"
                  stroke="currentColor" strokeLinecap="round" />
              </svg>
              {/* Corner dots */}
              <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: 1  }} />
              <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: -1 }} />
              <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: 1  }} />
              <div className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: -1 }} />
            </div>

            {/* ── Quote text — col 10/-4, row 4/-4 ─────────────────── */}
            {/* Each word is its own span so per-word color/opacity animation
                can be layered on with Framer Motion when ready. */}
            <div
              className="absolute inset-0 flex items-center"
              style={{ gridColumn: '10 / -4', gridRow: '4 / -4' }}
            >
              <p className="relative text-pretty font-medium text-heading-xs text-secondary-foreground">
                {/* Opening curly quote, pulled left outside the text flow */}
                <span className="absolute top-0 -left-[0.05em] -translate-x-full">&ldquo;</span>
                <span className="quote-words">
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className="relative inline-flex"
                      style={{ color: 'var(--color-secondary-foreground)' }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile (< lg) ───────────────────────────────────────────────── */}
      <div className="lg:hidden border-b border-subtle-stroke px-6 py-12">
        <p className="text-quote-sm font-medium text-balance text-secondary-foreground">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="mt-6 flex flex-col gap-y-1">
          <span className="font-mono text-xs uppercase text-accent-foreground">
            {name}
          </span>
          <span className="font-mono text-xs uppercase text-accent-foreground">
            {role}
          </span>
        </div>
      </div>

    </section>
  )
}
