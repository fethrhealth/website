'use client'

/**
 * DevelopersForDevsSection
 *
 * "For developers, by developers" PR activity heatmap for /platform/developers.
 * Adapted from attio.com's developer activity section.
 *
 * ── Structure ─────────────────────────────────────────────────────────────────
 *   Header  — Title, subtitle, "How we build" CTA
 *   Heatmap — 52 weeks × 7 days contribution grid, colored by PR activity level
 *             Hover title shows "N PRs on MMM D" (native browser tooltip)
 *             Scrollable with left/right edge fades
 *             Footer stat: total PR count for the year
 *   Spacer  — Dashed lines at columns 3 and -3
 *
 * ── Updating the heatmap data ─────────────────────────────────────────────────
 * PR_CELLS is a flat array of 364 entries (52 cols × 7 rows, column-first order).
 * Each entry: { bg: CSS color string, title: hover label string }
 *
 * Activity levels map to colors (hex values, see LEVEL_COLOR array):
 *   0 = no PRs     → #edeff3  (white-400, barely visible)
 *   1 = 1–5 PRs    → #cad0d9  (white-800)
 *   2 = 6–15 PRs   → #8f99a8  (black-800)
 *   3 = 16–25 PRs  → #505967  (black-600)
 *   4 = 26+ PRs    → #202124  (black-200, near-black)
 *
 * To use real data: replace PR_CELLS with a fetch from GitHub's contribution
 * API inside a server component and pass it as a prop.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Link from 'next/link'
import { useEffect, useState } from 'react'

// ─── Heatmap data ─────────────────────────────────────────────────────────────

/**
 * Activity level → CSS background color.
 * These are hex values from tailwind.config.ts (light-mode scale).
 * Edit here to restyle the heatmap — goes from faint (0) to near-black (4).
 *
 *   0 = no activity  → white-400  #edeff3  (barely visible on white bg)
 *   1 = 1–5 PRs      → white-800  #cad0d9
 *   2 = 6–15 PRs     → black-800  #8f99a8
 *   3 = 16–25 PRs    → black-600  #505967
 *   4 = 26+ PRs      → black-200  #202124  (near-black, peak)
 */
const LEVEL_COLOR = [
  '#edeff3', // 0 — no activity
  '#cad0d9', // 1 — 1–5 PRs
  '#8f99a8', // 2 — 6–15 PRs
  '#505967', // 3 — 16–25 PRs
  '#202124', // 4 — 26+ PRs
] as const

/** Hacker-mode palette: dark-to-bright green scale */
const LEVEL_COLOR_HACKER = [
  '#0a160a', // 0 — no activity  (barely visible on dark bg)
  '#003d1a', // 1 — 1–5 PRs
  '#006b2e', // 2 — 6–15 PRs
  '#00a847', // 3 — 16–25 PRs
  '#00d36a', // 4 — 26+ PRs     (peak, bright green)
] as const

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const

// ─── ✏️  DATE RANGE ───────────────────────────────────────────────────────────
// The grid shows 52 weeks starting from START_YEAR/START_MONTH/START_DAY.
// The start date must be a Sunday. Changing it shifts all hover date labels.
const START_YEAR  = 2025
const START_MONTH = 3    // 1 = January … 12 = December
const START_DAY   = 16   // must be a Sunday

const GRID_START_MS = Date.UTC(START_YEAR, START_MONTH - 1, START_DAY)
const MS_PER_DAY = 86_400_000

// ─── ✏️  EDITABLE DATA ────────────────────────────────────────────────────────
//
// WEEKLY_PRS — 52 rows (weeks), each row has 7 PR counts [Sun, Mon, Tue, Wed, Thu, Fri, Sat].
// week[0]  = oldest  (Mar 16 2025)
// week[51] = most recent (Mar 8 2026)
//
// The color is derived automatically:
//   0        → level 0  (no activity,  #edeff3)
//   1–5      → level 1              (#cad0d9)
//   6–15     → level 2              (#8f99a8)
//   16–25    → level 3              (#505967)
//   26+      → level 4  (peak,       #202124)
//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WEEKLY_PRS = [
  //  Sun  Mon  Tue  Wed  Thu  Fri  Sat
  [    0,   4,   8,  12,   9,   3,   0], // week  1 — Mar 16
  [    0,   6,  11,   7,  14,   5,   0], // week  2
  [    0,   2,   9,  18,  10,   7,   0], // week  3
  [    0,   5,  13,   8,  16,   4,   0], // week  4
  [    0,   3,  10,  22,  11,   6,   0], // week  5
  [    0,   7,  14,   9,  19,   8,   0], // week  6
  [    0,   1,   6,  12,   8,   3,   0], // week  7
  [    0,   4,  11,  17,  13,   5,   0], // week  8
  [    0,   6,  15,  10,  21,   7,   0], // week  9
  [    0,   2,   8,  14,   9,   4,   0], // week 10
  [    0,   5,  12,  19,  11,   6,   0], // week 11
  [    0,   3,   9,   7,  16,   5,   0], // week 12
  [    0,   7,  13,  11,  20,   8,   0], // week 13
  [    0,   4,  10,  15,  12,   3,   0], // week 14
  [    0,   2,   7,  18,   8,   5,   0], // week 15
  [    0,   6,  14,  10,  22,   7,   0], // week 16
  [    0,   1,   9,  13,   7,   4,   0], // week 17
  [    0,   5,  11,  17,  14,   6,   0], // week 18
  [    0,   3,   8,  12,  10,   3,   0], // week 19
  [    0,   7,  15,   9,  18,   8,   0], // week 20
  [    0,   4,  10,  16,  11,   5,   0], // week 21
  [    0,   2,   6,  14,   9,   4,   0], // week 22
  [    0,   6,  13,  11,  20,   7,   0], // week 23
  [    0,   3,   9,  18,  13,   5,   0], // week 24
  [    0,   5,  12,   8,  16,   6,   0], // week 25
  [    0,   1,   7,  15,  10,   3,   0], // week 26
  [    0,   4,  11,  12,  19,   7,   0], // week 27
  [    0,   6,  14,  10,  22,   8,   0], // week 28
  [    0,   2,   9,  17,  11,   4,   0], // week 29
  [    0,   5,  13,   8,  15,   6,   0], // week 30
  [    0,   3,   8,  14,  12,   5,   0], // week 31
  [    0,   7,  11,  19,  10,   7,   0], // week 32
  [    0,   4,  15,  11,  21,   6,   0], // week 33
  [    0,   2,   7,  13,   9,   4,   0], // week 34
  [    0,   6,  12,   9,  18,   8,   0], // week 35
  [    0,   5,  10,  16,  14,   5,   0], // week 36
  [    0,   3,   8,  12,  11,   3,   0], // week 37
  [    0,   7,  14,  10,  23,   7,   0], // week 38
  [    0,   4,  11,  17,  13,   6,   0], // week 39
  [    0,   2,   9,  15,   8,   4,   0], // week 40
  [    0,   8,  16,  12,  24,   9,   0], // week 41 — sprint boost
  [    0,   6,  13,  19,  15,   7,   0], // week 42
  [    0,   9,  18,  14,  27,  10,   0], // week 43
  [    0,   5,  12,  10,  20,   6,   0], // week 44
  [    0,  10,  19,  16,  28,  11,   0], // week 45
  [    0,   7,  15,  12,  22,   8,   0], // week 46
  [    0,  11,  21,  17,  30,  12,   1], // week 47 — recency boost
  [    0,   8,  17,  14,  26,   9,   0], // week 48
  [    0,  12,  23,  19,  32,  13,   1], // week 49
  [    0,   9,  18,  15,  28,  10,   0], // week 50
  [    0,  13,  25,  21,  35,  14,   1], // week 51
  [    0,  10,  20,  17,  29,  11,   0], // week 52 — Mar 8 2026
] as const

// ─── Derived cells (do not edit below) ───────────────────────────────────────

function prToLevel(prs: number): 0 | 1 | 2 | 3 | 4 {
  if (prs === 0)  return 0
  if (prs <= 5)   return 1
  if (prs <= 15)  return 2
  if (prs <= 25)  return 3
  return 4
}

/**
 * PR_CELLS — flat array of 364 cells (52 cols × 7 rows, column-first).
 * Stores level (0–4) instead of a hardcoded color so HeatmapGrid can
 * swap palettes at render time (normal vs hacker mode).
 */
const PR_CELLS: ReadonlyArray<{ level: 0 | 1 | 2 | 3 | 4; title: string }> = (() => {
  const out: { level: 0 | 1 | 2 | 3 | 4; title: string }[] = []
  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const count = WEEKLY_PRS[week]?.[day] ?? 0
      const lv    = prToLevel(count)
      const dt    = new Date(GRID_START_MS + (week * 7 + day) * MS_PER_DAY)
      const mon   = MONTHS[dt.getUTCMonth()]!
      const dom   = dt.getUTCDate()
      const title =
        count === 0
          ? `No PRs on ${mon} ${dom}`
          : `${count} PR${count === 1 ? '' : 's'} on ${mon} ${dom}`
      out.push({ level: lv, title })
    }
  }
  return out
})()

// ─── Shared sub-components ────────────────────────────────────────────────────

/** Floating tooltip rendered at a fixed viewport position — never clipped by the scroll container. */
function HeatmapTooltip({ text, x, y }: { text: string; x: number; y: number }) {
  return (
    <div
      className="fixed z-50 pointer-events-none -translate-x-1/2 px-2 py-1 rounded-md bg-black-200 text-white-100 font-mono text-xs whitespace-nowrap"
      style={{ left: x, top: y - 8, transform: 'translate(-50%, -100%)' }}
    >
      {text}
    </div>
  )
}

/**
 * The 52×7 grid of colored PR activity squares.
 * Hovering a square shows a custom tooltip with date + PR count.
 * isHacker: swaps the color palette to hacker-mode greens.
 */
function HeatmapGrid({ isHacker }: { isHacker: boolean }) {
  const colors = isHacker ? LEVEL_COLOR_HACKER : LEVEL_COLOR
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  return (
    <>
      <div
        className="relative grid grid-flow-col grid-rows-7 w-full"
        style={{ minWidth: '800px', gridTemplateColumns: 'repeat(52, minmax(0, 1fr))' }}
      >
        {PR_CELLS.map((cell, i) => (
          <div key={i} className="p-[1px]">
            <div
              className="aspect-square rounded-[30%] transition-opacity duration-100 hover:opacity-60 cursor-default"
              style={{ backgroundColor: colors[cell.level] }}
              onMouseEnter={(e) => {
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
                setTooltip({ text: cell.title, x: r.left + r.width / 2, y: r.top })
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          </div>
        ))}
      </div>
      {tooltip && <HeatmapTooltip {...tooltip} />}
    </>
  )
}

/**
 * Solid border SVGs + corner dots for the bordered panel.
 * Used inside a `grid grid-cols-1 grid-rows-1` parent so that
 * gridRow / gridColumn values anchor to the parent's edges.
 */
function PanelBorders() {
  return (
    <>
      {/* Top border */}
      <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Bottom border */}
      <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: -1 }}>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Left border */}
      <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: 1 }}>
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Right border */}
      <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: -1 }}>
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Corner dots */}
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: 1  }} />
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: -1 }} />
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: 1  }} />
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: -1 }} />
    </>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function DevelopersForDevsSection() {
  const [isHacker, setIsHacker] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    setIsHacker(root.hasAttribute('data-hacker'))
    const observer = new MutationObserver(() =>
      setIsHacker(root.hasAttribute('data-hacker'))
    )
    observer.observe(root, { attributes: true, attributeFilter: ['data-hacker'] })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="border-t border-subtle-stroke">
      <div className="container flex flex-1 flex-col isolate">
        <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">

          {/* ── HEADER — Desktop (≥ lg) ─────────────────────────────── */}
          {/* 48-col grid. Dashed vertical lines at col 5 and col -5.
              Header content at col-[6/-6]. */}
          <div className="isolate max-lg:hidden">
            <div
              className="relative grid w-full items-center pt-40 pb-20 max-xl:pt-30 max-xl:pb-16"
              style={{
                gridTemplateColumns: 'repeat(48, 1fr)',
                gridTemplateRows: 'repeat(1, 1fr)',
              }}
            >
              {/* Dashed vertical line — col 5 */}
              <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: 5 }}>
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              {/* Dashed vertical line — col -5 */}
              <svg width="1" height="100%" className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2" style={{ gridColumn: -5 }}>
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <header className="col-[6/-6] flex flex-col gap-7">
                <div className="relative max-w-[22em] text-pretty text-start text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen hacker-mode:mix-blend-normal">
                  <h2 className="inline text-pretty">For developers, by developers.</h2>{' '}
                  <p className="inline text-pretty font-medium text-black-800">
                    We use what we build and commit to it daily.
                  </p>
                </div>
                <div className="flex w-full flex-row items-center gap-x-2.5 gap-y-2">
                  <Link
                    href="/engineering/blog"
                    className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm button-outline hacker-mode:bg-[#001a0d] hacker-mode:text-[#00a852] hacker-mode:border-[#1a2d1a]"
                  >
                    How we build
                  </Link>
                </div>
              </header>
            </div>
          </div>

          {/* ── HEADER — Mobile (< lg) ───────────────────────────────── */}
          <div className="lg:hidden px-6 py-12">
            <div className="max-w-[22em] text-pretty text-start text-heading-responsive-sm">
              <h2 className="inline text-pretty">For developers, by developers.</h2>{' '}
              <p className="inline text-pretty font-medium text-black-800">
                We use what we build and commit to it daily.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/engineering/blog"
                className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-outline hacker-mode:bg-[#001a0d] hacker-mode:text-[#00a852] hacker-mode:border-[#1a2d1a]"
              >
                How we build
              </Link>
            </div>
          </div>

          {/* ── HEATMAP — Desktop (≥ lg) ────────────────────────────── */}
          {/* Outer 48×8 grid. The 8 rows break down as:
                Row 1       — top spacing / outer dashed border
                Rows 2–8    — 7 heatmap rows (one per day of the week)
              Panel background at col[5/-5] row[1/-1] (all rows).
              Scrollable heatmap at col[5/-5] row[2/-1] (rows 2–8).
              Stat label at col[6/-6] row[-3/-1] (bottom-right, rows 6–8). */}
          <div className="isolate max-lg:hidden">
            <div
              className="relative grid w-full items-center z-[2]"
              style={{
                aspectRatio: '48 / 8',
                gridTemplateColumns: 'repeat(48, 1fr)',
                gridTemplateRows: 'repeat(8, 1fr)',
              }}
            >
              {/* Outer dashed border lines at top and bottom */}
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: -1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>

              {/* ── Panel background — solid borders + corner dots */}
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background"
                style={{ gridColumn: '5 / -5', gridRow: '1 / -1' }}
              >
                <PanelBorders />
              </div>

              {/* ── Scrollable heatmap — rows 2 to -1 (7 content rows) */}
              <div
                className="absolute inset-0 overflow-x-scroll"
                style={{
                  gridColumn: '5 / -5',
                  gridRow: '2 / -1',
                  // 1 column-width (1/48) of padding on each side, matching attio
                  paddingLeft: '2.0833333333%',
                  paddingRight: '2.0833333333%',
                  scrollbarWidth: 'none' as const,
                }}
              >
                <HeatmapGrid isHacker={isHacker} />
              </div>

              {/* ── Left edge fade — sits above scrollable content */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  gridColumn: '5 / 6',
                  gridRow: '1 / -3',
                  background: `linear-gradient(to right, ${isHacker ? '#050e05' : '#ffffff'} 20%, transparent)`,
                }}
              />
              {/* ── Right edge fade */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  gridColumn: '-6 / -5',
                  gridRow: '1 / -3',
                  background: `linear-gradient(to left, ${isHacker ? '#050e05' : '#ffffff'} 20%, transparent)`,
                }}
              />

              {/* ── Overlay border (pointer-events-none, drawn on top of scrollable content
                   so borders remain crisp even while scrolling) */}
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 pointer-events-none bg-transparent"
                style={{ gridColumn: '5 / -5', gridRow: '1 / -1' }}
              >
                <PanelBorders />
              </div>

              {/* ── Stat label — bottom-right, overlapping the last 2 rows */}
              <div
                className="absolute inset-0 flex items-center justify-end"
                style={{ gridColumn: '6 / -6', gridRow: '-3 / -1' }}
              >
                <p className="text-pretty font-mono text-accent-foreground text-xs uppercase">
                  2,847 pull requests merged in the past year
                </p>
              </div>
            </div>
          </div>

          {/* ── HEATMAP — Mobile (< lg) ──────────────────────────────── */}
          {/* Taller aspect ratio (48/20) so squares have enough height on
              narrow screens. Label moves to row[-5/-1] (bottom 4 rows). */}
          <div className="isolate lg:hidden">
            <div
              className="relative grid w-full items-center z-[2]"
              style={{
                aspectRatio: '48 / 20',
                gridTemplateColumns: 'repeat(48, 1fr)',
                gridTemplateRows: 'repeat(20, 1fr)',
              }}
            >
              {/* Outer dashed border lines */}
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: 1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="100%" height="1" className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2" style={{ gridRow: -1 }}>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>

              {/* Panel background */}
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 bg-primary-background"
                style={{ gridColumn: '5 / -5', gridRow: '1 / -1' }}
              >
                <PanelBorders />
              </div>

              {/* Scrollable heatmap */}
              <div
                className="absolute inset-0 overflow-x-scroll"
                style={{
                  gridColumn: '5 / -5',
                  gridRow: '2 / -1',
                  paddingLeft: '2.0833333333%',
                  paddingRight: '2.0833333333%',
                  scrollbarWidth: 'none' as const,
                }}
              >
                <HeatmapGrid isHacker={isHacker} />
              </div>

              {/* Left/right edge fades */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  gridColumn: '5 / 6',
                  gridRow: '1 / -5',
                  background: `linear-gradient(to right, ${isHacker ? '#050e05' : '#ffffff'} 20%, transparent)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  gridColumn: '-6 / -5',
                  gridRow: '1 / -5',
                  background: `linear-gradient(to left, ${isHacker ? '#050e05' : '#ffffff'} 20%, transparent)`,
                }}
              />

              {/* Overlay border */}
              <div
                className="absolute inset-0 grid grid-cols-1 grid-rows-1 pointer-events-none bg-transparent"
                style={{ gridColumn: '5 / -5', gridRow: '1 / -1' }}
              >
                <PanelBorders />
              </div>

              {/* Stat label */}
              <div
                className="absolute inset-0 flex items-center justify-end"
                style={{ gridColumn: '6 / -6', gridRow: '-5 / -1' }}
              >
                <p className="text-pretty font-mono text-accent-foreground text-xs uppercase">
                  2,847 PRs merged this year
                </p>
              </div>
            </div>
          </div>

          {/* ── SPACER — visual breathing room below heatmap ─────────── */}
          {/* 24×3 grid with dashed vertical lines at col 3 and col -3. */}
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
