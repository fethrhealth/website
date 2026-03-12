'use client'

/**
 * DevelopersHeroSection
 *
 * Hero for /platform/developers — light mode only.
 *
 * Layout (three responsive variants):
 *   Desktop (≥ lg)  : 24 × 12 CSS grid.
 *                     Left text panel at col [3/14], right geometric SVG at col [15/-1].
 *   Tablet  (md–lg) : Square SVG illustration on top + 12 × 8 grid text panel.
 *   Mobile  (< md)  : Square SVG illustration on top + 12 × 12 grid text panel.
 *
 * The geometric SVG diagram on the right (desktop) / top (tablet, mobile) contains
 * four polygon shapes (two with hatch fill + stroke, two with stroke only) and
 * diagonal dashed lines as background — all ported 1:1 from attio.com DevTools.
 *
 * CSS vars used in SVG: --color-weak-stroke, --color-caption-foreground,
 * --color-primary-background, --color-surface — defined in globals.css :root.
 */

import Link from 'next/link'

// ─── Grid background lines ──────────────────────────────────────────────────
// Desktop: 23 vertical SVG lines alternating dashed / solid.
// Count: 23 lines so that justify-evenly places them across 24 columns.
const V_LINES = Array.from({ length: 23 }, (_, i) => i % 2 === 0)  // true = dashed
// Desktop: 11 horizontal SVG lines alternating dashed / solid.
const H_LINES = Array.from({ length: 11 }, (_, i) => i % 2 === 0)  // true = dashed

// ─── Geometric SVG diagram (shared across breakpoints) ──────────────────────
// Ported verbatim from attio.com HTML. Four polygon shapes on a 1600 × 1600 viewBox.
// Pattern IDs must be unique per SVG instance → passed as a prefix prop.
function GeometricDiagram({ prefix }: { prefix: string }) {
  return (
    <svg viewBox="0 0 1600 1600" className="absolute inset-0 w-full h-full">
      {/* Diagonal dashed background lines */}
      <g strokeDasharray="4 6" strokeWidth="1" stroke="var(--color-weak-stroke)">
        <line vectorEffect="non-scaling-stroke" x1="200"  y1="0"    x2="1200" y2="1600" />
        <line vectorEffect="non-scaling-stroke" x1="600"  y1="0"    x2="1600" y2="1600" />
        <line vectorEffect="non-scaling-stroke" x1="1000" y1="0"    x2="0"    y2="1600" />
        <line vectorEffect="non-scaling-stroke" x1="1400" y1="0"    x2="400"  y2="1600" />
        <line vectorEffect="non-scaling-stroke" x1="0"    y1="320"  x2="800"  y2="1600" />
        <line vectorEffect="non-scaling-stroke" x1="1600" y1="320"  x2="800"  y2="1600" />
        <line vectorEffect="non-scaling-stroke" x1="0"    y1="480"  x2="1600" y2="480"  />
        <line vectorEffect="non-scaling-stroke" x1="0"    y1="1120" x2="1600" y2="1120" />
      </g>

      {/* Shape 1 — large hexagonal (hatch fill) */}
      <g>
        <path
          fill="var(--color-primary-background)"
          d="M 700 480 L 900 480 L 600 960 L 700 1120 L 500 1120 L 400 960 L 700 480"
        />
        <path
          fill={`url(#${prefix}_hatch_a)`}
          d="M 700 480 L 900 480 L 600 960 L 700 1120 L 500 1120 L 400 960 L 700 480"
        />
        <path
          d="M 700 480 L 900 480 L 600 960 L 700 1120 L 500 1120 L 400 960 L 700 480"
          fill="none"
          stroke="var(--color-caption-foreground)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        {/* Vertex squares */}
        <g fill="var(--color-caption-foreground)">
          <rect x="692"  y="472"  width="16" height="16" />
          <rect x="892"  y="472"  width="16" height="16" />
          <rect x="592"  y="952"  width="16" height="16" />
          <rect x="692"  y="1112" width="16" height="16" />
          <rect x="492"  y="1112" width="16" height="16" />
          <rect x="392"  y="952"  width="16" height="16" />
        </g>
        <defs>
          <pattern id={`${prefix}_hatch_a`} width="1" height="16" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="var(--color-surface)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </pattern>
        </defs>
      </g>

      {/* Shape 2 — thin connecting parallelogram (stroke only, no hatch) */}
      <g>
        <path
          fill="var(--color-primary-background)"
          d="M 900 480 L 1000 640 L 700 1120 L 600 960 L 900 480"
        />
        <path
          d="M 900 480 L 1000 640 L 700 1120 L 600 960 L 900 480"
          fill="none"
          stroke="var(--color-caption-foreground)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <g fill="var(--color-caption-foreground)">
          <rect x="892" y="472"  width="16" height="16" />
          <rect x="992" y="632"  width="16" height="16" />
          <rect x="692" y="1112" width="16" height="16" />
          <rect x="592" y="952"  width="16" height="16" />
        </g>
      </g>

      {/* Shape 3 — hexagonal (hatch fill, right side) */}
      <g>
        <path
          fill="var(--color-primary-background)"
          d="M 900 800 L 800 960 L 900 1120 L 1100 1120 L 1000 960 L 1100 800 L 900 800"
        />
        <path
          fill={`url(#${prefix}_hatch_b)`}
          d="M 900 800 L 800 960 L 900 1120 L 1100 1120 L 1000 960 L 1100 800 L 900 800"
        />
        <path
          d="M 900 800 L 800 960 L 900 1120 L 1100 1120 L 1000 960 L 1100 800 L 900 800"
          fill="none"
          stroke="var(--color-caption-foreground)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <g fill="var(--color-caption-foreground)">
          <rect x="892"  y="792"  width="16" height="16" />
          <rect x="792"  y="952"  width="16" height="16" />
          <rect x="892"  y="1112" width="16" height="16" />
          <rect x="1092" y="1112" width="16" height="16" />
          <rect x="992"  y="952"  width="16" height="16" />
          <rect x="1092" y="792"  width="16" height="16" />
        </g>
        <defs>
          <pattern id={`${prefix}_hatch_b`} width="1" height="16" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="var(--color-surface)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </pattern>
        </defs>
      </g>

      {/* Shape 4 — small diamond / rhombus (stroke only, no hatch) */}
      <g>
        <path
          fill="var(--color-primary-background)"
          d="M 1100 800 L 1000 960 L 1100 1120 L 1200 960 L 1100 800"
        />
        <path
          d="M 1100 800 L 1000 960 L 1100 1120 L 1200 960 L 1100 800"
          fill="none"
          stroke="var(--color-caption-foreground)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          strokeDashoffset="0px"
          strokeDasharray="1px 1px"
        />
        <g fill="var(--color-caption-foreground)">
          <rect x="1092" y="792"  width="16" height="16" />
          <rect x="992"  y="952"  width="16" height="16" />
          <rect x="1092" y="1112" width="16" height="16" />
          <rect x="1192" y="952"  width="16" height="16" />
        </g>
      </g>
    </svg>
  )
}

// ─── Text content panel ──────────────────────────────────────────────────────
// `absolute` mode (desktop): rendered inside an absolutely-placed grid item.
// `flow` mode (tablet/mobile): fills its grid cell via flex + h-full.
function HeroText({ mode = 'absolute' }: { mode?: 'absolute' | 'flow' }) {
  const wrapper = mode === 'absolute'
    ? 'absolute flex size-full flex-col justify-center'
    : 'flex h-full flex-col justify-center'

  return (
    <div className={wrapper}>
      <p className="relative text-overline text-accent-foreground">
        [ Developer Platform ]
      </p>
      <h2 className="relative mt-6 text-heading-responsive-lg">
        Build on Fethr.
      </h2>
      <p className="relative mt-4 max-w-[28em] text-balance text-lg text-fg-tertiary">
        Connect your health data stack with the Fethr MCP, REST API, or App SDK.
      </p>
      <div className="relative mt-6 flex flex-row flex-wrap items-center gap-x-2.5 gap-y-2">
        <Link
          href="/docs"
          className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-primary"
        >
          View docs
        </Link>
        <Link
          href="/platform/developers/apps"
          className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base border button-outline"
        >
          Browse apps
        </Link>
      </div>
    </div>
  )
}

// ─── Main section ────────────────────────────────────────────────────────────
export function DevelopersHeroSection() {
  return (
    <section className="border-t border-subtle-stroke">
      <div className="container flex flex-col isolate">
        <div className="flex w-full flex-col border-x border-subtle-stroke">

          {/* ── DESKTOP (≥ lg) ─────────────────────────────────────────── */}
          <div className="isolate max-lg:hidden">
            <div
              className="relative grid w-full items-center"
              style={{
                aspectRatio: '24 / 12',
                gridTemplateColumns: 'repeat(24, 1fr)',
                gridTemplateRows: 'repeat(12, 1fr)',
              }}
            >
              {/* Grid line background */}
              <div className="absolute inset-0">
                {/* Vertical lines — 23 lines, alternating dashed / solid */}
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
                {/* Horizontal lines — 11 lines, alternating dashed / solid */}
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

              {/* Left text panel — col 3/14, all rows */}
              <div
                className="absolute size-full"
                style={{ gridColumn: '3 / 14', gridRow: '1 / -1' }}
              >
                <HeroText mode="absolute" />
              </div>

              {/* Right panel — solid bg fill (col 15 to end, all rows) */}
              <div
                className="absolute inset-0 bg-primary-background"
                style={{ gridColumn: '15 / -1', gridRow: '1 / -1' }}
              />

              {/* Right panel — SVG diagram (col 15 to end, rows 2 to -2) */}
              <div
                className="absolute inset-0 bg-primary-background"
                style={{ gridColumn: '15 / -1', gridRow: '2 / -2' }}
              >
                <GeometricDiagram prefix="d" />
              </div>

              {/* Divider — vertical line at column 15 */}
              <svg
                width="1"
                height="100%"
                className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
                style={{ gridColumn: 15 }}
              >
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
              </svg>

              {/* Divider — top horizontal dashed line (row 2) */}
              <svg
                width="100%"
                height="1"
                className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
                style={{ gridColumn: '15 / -1', gridRow: 2 }}
              >
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>

              {/* Divider — bottom horizontal dashed line (row -2) */}
              <svg
                width="100%"
                height="1"
                className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
                style={{ gridColumn: '15 / -1', gridRow: -2 }}
              >
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* ── TABLET (md – lg) ───────────────────────────────────────── */}
          <div className="isolate max-md:hidden lg:hidden">
            {/* Square illustration */}
            <div className="relative aspect-square w-full bg-primary-background">
              <GeometricDiagram prefix="t" />
            </div>

            {/* Text grid — 12 × 8, grid items stretch by default → h-full works */}
            <div
              className="relative grid w-full"
              style={{
                aspectRatio: '12 / 8',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(8, 1fr)',
              }}
            >
              <div style={{ gridColumn: '2 / -2', gridRow: '2 / -2' }}>
                <HeroText mode="flow" />
              </div>
            </div>
          </div>

          {/* ── MOBILE (< md) ──────────────────────────────────────────── */}
          <div className="isolate md:hidden">
            {/* Square illustration */}
            <div className="relative aspect-square w-full bg-primary-background">
              <GeometricDiagram prefix="m" />
            </div>

            {/* Text grid — 12 × 12, grid items stretch by default → h-full works */}
            <div
              className="relative grid w-full"
              style={{
                aspectRatio: '12 / 12',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(12, 1fr)',
              }}
            >
              <div style={{ gridColumn: '2 / -2', gridRow: '2 / -2' }}>
                <HeroText mode="flow" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
