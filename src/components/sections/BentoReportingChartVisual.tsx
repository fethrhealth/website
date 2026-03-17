'use client'

/**
 * BentoReportingChartVisual
 *
 * contentA visual for the "Powerful reporting" bento row (i === 3).
 * Direct HTML→TSX translation of Attio's bar chart visual.
 *
 * Structure:
 *   - Time range selector (3M active)
 *   - Legend (Apr-Jun, Jul-Sep, Plus, Pro, Enterprise)
 *   - Bar chart: Y-axis labels + dashed grid + 3 month groups × 6 bars
 *   - Tooltip on July Pro column
 */

import { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Bar data ─────────────────────────────────────────────────────────────────
// Each month: 6 bars — [Plus outline, Plus solid, Pro outline, Pro solid, Enterprise outline, Enterprise solid]
// Heights in pixels exactly as measured from Attio's rendered HTML.

interface BarDatum {
  readonly h:      number   // height in px
  readonly fill:   string
  readonly stroke?: string  // dashed stroke color (outline bars only)
}

const CHART_DATA: readonly (readonly BarDatum[])[] = [
  // July
  [
    { h: 44.091,  fill: '#FFEBAD', stroke: '#FFD03D' },
    { h: 76.383,  fill: '#FFD03D' },
    { h: 130.1,   fill: '#FDC4D5', stroke: '#FB84A7' },
    { h: 211.451, fill: '#FB84A7' },
    { h: 58.0635, fill: '#D6C4FD', stroke: '#A27AFA' },
    { h: 109.606, fill: '#A27AFA' },
  ],
  // August
  [
    { h: 47.196,  fill: '#FFEBAD', stroke: '#FFD03D' },
    { h: 116.127, fill: '#FFD03D' },
    { h: 158.976, fill: '#FDC4D5', stroke: '#FB84A7' },
    { h: 260.82,  fill: '#FB84A7' },
    { h: 86.0085, fill: '#D6C4FD', stroke: '#A27AFA' },
    { h: 150.282, fill: '#A27AFA' },
  ],
  // September
  [
    { h: 64.584,  fill: '#FFEBAD', stroke: '#FFD03D' },
    { h: 136.31,  fill: '#FFD03D' },
    { h: 185.989, fill: '#FDC4D5', stroke: '#FB84A7' },
    { h: 285.66,  fill: '#FB84A7' },
    { h: 111.78,  fill: '#D6C4FD', stroke: '#A27AFA' },
    { h: 196.0,   fill: '#A27AFA' },
  ],
] as const

const MONTHS = ['July', 'August', 'September'] as const

const Y_LABELS = ['$ 2.8M', '$ 2.4M', '$ 2.0M', '$ 1.6M', '$ 1.2M', '$ 0.8M', '$ 0.4M'] as const

// ─── Bar SVG path ─────────────────────────────────────────────────────────────
// Rounded-top rectangle path matching Attio's exact geometry.
// rX = width - 1 (0.5px inset on left, 1px on right for stroke centering)

function barPath(h: number, w: number): string {
  const r   = 6
  const lX  = 0.5
  const rX  = w - 1
  const bY  = h - 0.5
  return `M ${lX} ${bY} L ${lX} ${r + lX} A ${r} ${r} 0 0 1 ${r + lX} ${lX} L ${rX - r} ${lX} A ${r} ${r} 0 0 1 ${rX} ${r + lX} L ${rX} ${bY} Z`
}

const BAR_W = 14.5078

// ─── Single bar ───────────────────────────────────────────────────────────────

function Bar({ bar, delay, inView }: { bar: BarDatum; delay: number; inView: boolean }): ReactNode {
  return (
    <motion.div
      style={{ width: BAR_W }}
      initial={{ height: 0 }}
      animate={inView ? { height: bar.h } : { height: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      <svg className="h-full w-full">
        <path
          d={barPath(bar.h, BAR_W)}
          fill={bar.fill}
          stroke={bar.stroke}
          strokeDasharray={bar.stroke ? '4 4' : undefined}
          strokeDashoffset={bar.stroke ? 3 : undefined}
          strokeLinecap={bar.stroke ? 'round' : undefined}
          strokeWidth={bar.stroke ? 1 : undefined}
        />
      </svg>
    </motion.div>
  )
}

// ─── Month group ──────────────────────────────────────────────────────────────

function MonthGroup({
  bars,
  label,
  monthIndex,
  inView,
  children,
}: {
  bars:       readonly BarDatum[]
  label:      string
  monthIndex: number
  inView:     boolean
  children?:  ReactNode
}): ReactNode {
  return (
    <div className="relative h-full w-full">
      <div className="relative flex h-full w-full items-end justify-between overflow-hidden">
        {bars.map((bar, i) => (
          <Bar
            key={i}
            bar={bar}
            inView={inView}
            delay={monthIndex * 0.15 + i * 0.05 + 0.1}
          />
        ))}
      </div>
      <span className="font-medium tracking-normal absolute left-1/2 -translate-x-1/2 text-[#75777C] bottom-[-24px] lg:text-[12px] lg:leading-4 text-[10px] leading-3">
        {label}
      </span>
      {children}
    </div>
  )
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

function Tooltip({ inView }: { inView: boolean }): ReactNode {
  return (
    <motion.div
      className="flex min-w-[180px] items-center gap-x-2 rounded-xl border border-[#EEEFF1] bg-primary-background p-2 shadow-lg lg:min-w-[240px] absolute top-[128px] left-[76%] z-[1] transition duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]"
      initial={{ opacity: 0, y: 4 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
      transition={{ duration: 0.3, delay: 1.2 }}
    >
      {/* Pink left accent bar */}
      <div className="flex-[0_0_3px] self-stretch rounded-full bg-[#FB84A7]" />

      {/* Content */}
      <div className="flex flex-col gap-y-1.5 py-1 pr-1">
        <span className="font-medium lg:tracking-[-0.28px] text-[12px] leading-4 tracking-[-0.28px] lg:text-[14px] lg:leading-5">
          Pro plan
        </span>
        <div className="flex items-center gap-x-1.5">
          <span className="font-medium lg:tracking-[-0.28px] text-[#5C5E63] text-[12px] leading-4 tracking-[-0.28px] lg:text-[14px] lg:leading-5">
            Time
          </span>
          <span className="font-medium tracking-normal inline-flex items-center py-[0.5px] lg:rounded-lg lg:border lg:px-[5px] lg:py-px text-nowrap rounded-[5px] border border-[#EEEFF1] bg-[#F4F5F6] px-[3px] text-[#5C5E63] text-[10px] leading-3 lg:text-xs">
            July 2024
          </span>
        </div>
        <div className="flex items-center gap-x-1.5">
          <span className="font-medium lg:tracking-[-0.28px] text-[#5C5E63] text-[12px] leading-4 tracking-[-0.28px] lg:text-[14px] lg:leading-5">
            Amount
          </span>
          <span className="font-medium tracking-normal inline-flex items-center py-[0.5px] lg:rounded-lg lg:border lg:px-[5px] lg:py-px text-nowrap rounded-[5px] border border-[#EEEFF1] bg-[#F4F5F6] px-[3px] text-[#5C5E63] text-[10px] leading-3 lg:text-xs">
            $ 1,920,240.00
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Legend dot SVG ───────────────────────────────────────────────────────────

function LegendDot({ fill, stroke }: { fill: string; stroke?: string }): ReactNode {
  return (
    <svg className="size-2.5 overflow-visible" viewBox="0 0 10 10">
      <rect
        x="0" y="0" width="100%" height="100%" rx="4"
        fill={fill}
        stroke={stroke}
        strokeDasharray={stroke ? '1.1 2.2' : undefined}
        strokeLinecap={stroke ? 'round' : undefined}
      />
    </svg>
  )
}

// ─── Dashed horizontal grid line ─────────────────────────────────────────────

function DashedLine(): ReactNode {
  return (
    <svg className="h-px w-full self-center overflow-visible relative top-0">
      <line
        className="[stroke-dasharray:4_5] [stroke-dashoffset:-1] [stroke-width:1px]"
        x1="0" y1="0.5" x2="100%" y2="0.5"
        stroke="#E6E7EA"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoReportingChartVisual(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-primary-background md:min-h-[620px]"
      style={{ gridArea: 'contentA' }}
    >

      {/* Dot pattern background — matches DotPatternCell used by other rows */}
      <svg width="100%" height="100%" className="pointer-events-none absolute inset-0 text-muted-strong-background" aria-hidden>
        <defs>
          <pattern id="bento-chart-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-chart-dots)" />
      </svg>

      {/* Chart content */}
      <div className="relative flex w-full flex-col items-start gap-y-4 px-5 py-10 md:gap-y-7 md:px-10">

      {/* ── Time range selector ─────────────────────────────────────────────── */}
      <div className="relative flex items-center gap-0.5 rounded-lg bg-[#F4F5F6] p-0.5">

        {/* 7D group */}
        <div className="flex gap-[1px]">
          <div className="flex h-6 items-center justify-center rounded-lg px-1.5 text-[#75777C] text-sm -tracking-[2%] transition-all duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]">
            7D
          </div>
        </div>

        <div className="h-[18px] w-[1px] bg-[#E6E7EA]" />

        {/* 30D / 3M (active) / 6M group */}
        <div className="flex gap-[1px]">
          <div className="flex h-6 items-center justify-center rounded-lg px-1.5 text-[#75777C] text-sm -tracking-[2%] transition-all duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]">
            30D
          </div>
          <div className="flex h-6 items-center justify-center rounded-lg px-1.5 text-sm -tracking-[2%] transition-all duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] bg-primary-background text-[#232529] shadow-sm">
            3M
          </div>
          <div className="flex h-6 items-center justify-center rounded-lg px-1.5 text-[#75777C] text-sm -tracking-[2%] transition-all duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]">
            6M
          </div>
        </div>

        <div className="h-[18px] w-[1px] bg-[#E6E7EA]" />

        {/* 12M group */}
        <div className="flex gap-[1px]">
          <div className="flex h-6 items-center justify-center rounded-lg px-1.5 text-[#75777C] text-sm -tracking-[2%] transition-all duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]">
            12M
          </div>
        </div>

        <div className="h-[18px] w-[1px] bg-[#E6E7EA]" />

        {/* All group */}
        <div className="flex gap-[1px]">
          <div className="flex h-6 items-center justify-center rounded-lg px-1.5 text-[#75777C] text-sm -tracking-[2%] transition-all duration-300 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)]">
            All
          </div>
        </div>

      </div>

      {/* ── Legend ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">

        <div className="flex items-center gap-x-1.5">
          <LegendDot fill="#F4F5F6" stroke="#D1D3D6" />
          <span className="font-medium tracking-normal lg:text-[12px] lg:leading-4 text-nowrap text-[#5C5E63] text-[12px] leading-4">
            Apr - Jun
          </span>
        </div>

        <div className="flex items-center gap-x-1.5">
          <LegendDot fill="#D1D3D6" />
          <span className="font-medium tracking-normal lg:text-[12px] lg:leading-4 text-nowrap text-[#5C5E63] text-[12px] leading-4">
            Jul - Sep
          </span>
        </div>

        {/* Mobile line break */}
        <div className="basis-full md:hidden" />

        <div className="flex items-center gap-x-1.5">
          <LegendDot fill="#FFD03D" />
          <span className="font-medium tracking-normal lg:text-[12px] lg:leading-4 text-nowrap text-[#5C5E63] text-[12px] leading-4">
            Plus
          </span>
        </div>

        <div className="flex items-center gap-x-1.5">
          <LegendDot fill="#FB84A7" />
          <span className="font-medium tracking-normal lg:text-[12px] lg:leading-4 text-nowrap text-[#5C5E63] text-[12px] leading-4">
            Pro
          </span>
        </div>

        <div className="flex items-center gap-x-1.5">
          <LegendDot fill="#A27AFA" />
          <span className="font-medium tracking-normal lg:text-[12px] lg:leading-4 text-nowrap text-[#5C5E63] text-[12px] leading-4">
            Enterprise
          </span>
        </div>

      </div>

      {/* ── Chart ───────────────────────────────────────────────────────────── */}
      <div className="w-full py-2 [background:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]">
        <div className="relative grid grid-cols-[auto_1fr] gap-x-[15px] gap-y-[22px] lg:gap-x-[28px] mt-5 mb-8 w-full">

          {/* Y-axis labels + dashed lines (7 rows) */}
          {Y_LABELS.map((label) => (
            <Fragment key={label}>
              <div className="flex justify-end py-1">
                <span className="font-medium tracking-normal text-[#9FA1A7] text-[10px] leading-3 lg:text-[12px] lg:leading-4">
                  {label}
                </span>
              </div>
              <DashedLine />
            </Fragment>
          ))}

          {/* Bottom axis row */}
          <div />
          <div className="h-[1.5px] w-full bg-[#EEEFF1]" />

          {/* ── Chart bars area (absolute, overlays the grid) ─────────────── */}
          <div className="absolute inset-0 col-start-2 col-end-3 row-start-1 pt-[12px] pr-[10px] pb-[1px] pl-[10px]">
            <div className="grid h-full w-full grid-cols-3 gap-x-3 lg:gap-x-5">

              {/* July — with tooltip */}
              <MonthGroup
                bars={CHART_DATA[0]!}
                label={MONTHS[0]!}
                monthIndex={0}
                inView={inView}
              >
                <Tooltip inView={inView} />
              </MonthGroup>

              {/* August */}
              <MonthGroup
                bars={CHART_DATA[1]!}
                label={MONTHS[1]!}
                monthIndex={1}
                inView={inView}
              />

              {/* September */}
              <MonthGroup
                bars={CHART_DATA[2]!}
                label={MONTHS[2]!}
                monthIndex={2}
                inView={inView}
              />

            </div>
          </div>

        </div>
      </div>

      </div>{/* end chart content */}
    </div>
  )
}
