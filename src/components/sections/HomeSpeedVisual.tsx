'use client'

/**
 * HomeSpeedVisual
 *
 * Graphic visual for HomeSpeedSection — pixel-perfect clone of the Attio
 * "data enrichment" grid visual.
 *
 * Grid layout (3 columns, 3 rows):
 *   Mobile:  [24px | 1fr  | 24px]  — bleeds 24px beyond parent on each side
 *   Desktop: [1fr  | 955px | 1fr]  — center fixed at 955px, side cols hold xl decorations
 *
 *   Row 1: corner | source pills + connector paths | corner
 *   Row 2: xl left canvas | chart container (empty slot for chart) | xl right decoration
 *   Row 3: left-border | bottom dotted pattern | right-border
 */

import { useRef } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import { HomeSpeedChartPanel } from './HomeSpeedChartPanel'
import { FlickeringGrid } from '@/components/ui/flickering-grid'

// ─── SVG / layout helpers ─────────────────────────────────────────────────────

function DashedH({ className = '' }: { className?: string }) {
  return (
    <svg width="100%" height="1" className={`text-subtle-stroke ${className}`} aria-hidden>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

function DashedV({ className = '' }: { className?: string }) {
  return (
    <svg width="1" height="100%" className={`text-subtle-stroke ${className}`} aria-hidden>
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

/** Dot-grid background pattern (gray dots on white) */
function DotGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-[#DCDCDD] ${className}`}>
      <div
        className="h-full w-full bg-white-100"
        style={{
          maskImage:
            'linear-gradient(to right, rgba(0,0,0,0) 1px, rgba(0,0,0,1) 1px), ' +
            'linear-gradient(to bottom, rgba(0,0,0,0) 1px, rgba(0,0,0,1) 1px)',
          maskPosition: '5px 5px',
          maskSize: '10px 10px',
        }}
      />
    </div>
  )
}

// ─── Pill badge ───────────────────────────────────────────────────────────────

function SourcePill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div
      className={[
        'flex items-center gap-x-2',
        'rounded-[10px] border border-white-300',
        'bg-[#FBFBFB] px-[9px] py-[3px] text-[#505967]',
        'transition-[box-shadow,background-color,color] delay-700 duration-700',
        '[transition-timing-function:cubic-bezier(0.33,1,0.68,1)]',
        'shadow-[0px_2px_3px_-3px_rgba(28,40,64,0.10),0px_4px_6px_-2px_rgba(28,40,64,0.04),0px_0px_0px_4px_#F4F5F6]',
      ].join(' ')}
    >
      {icon}
      <span className="text-[14px] font-medium leading-[140%] tracking-normal">{label}</span>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function EmailIcon() {
  return (
    <svg width="14" height="14" fill="none" aria-hidden>
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M5 1.5h-.022c-.681 0-1.223 0-1.66.036-.449.036-.83.113-1.18.291A3 3 0 0 0 .827 3.138c-.178.35-.255.731-.291 1.18C.5 4.754.5 5.296.5 5.977V8.022c0 .681 0 1.223.036 1.66.036.448.113.83.291 1.18a3 3 0 0 0 1.311 1.311c.35.178.731.255 1.18.291.437.036.979.036 1.66.036H9.022c.681 0 1.223 0 1.66-.036.448-.036.83-.113 1.18-.291a3 3 0 0 0 1.311-1.311c.178-.35.255-.732.291-1.18.036-.437.036-.979.036-1.66V5.978c0-.681 0-1.223-.036-1.66-.036-.449-.113-.83-.291-1.18a3 3 0 0 0-1.311-1.311c-.35-.178-.732-.255-1.18-.291-.437-.036-.979-.036-1.66-.036H5ZM2.592 2.718c.185-.094.42-.154.807-.186C3.79 2.5 4.292 2.5 5 2.5h4c.708 0 1.21 0 1.601.032.386.032.622.092.807.186a2 2 0 0 1 .874.874c.094.185.154.42.186.807.032.392.032.893.032 1.601v2c0 .708 0 1.21-.032 1.601-.032.386-.092.622-.186.807a2 2 0 0 1-.874.874c-.185.094-.42.154-.807.186-.392.032-.893.032-1.601.032H5c-.708 0-1.21 0-1.601-.032-.386-.032-.622-.092-.807-.186a2 2 0 0 1-.874-.874c-.094-.185-.154-.42-.186-.807C1.5 9.21 1.5 8.708 1.5 8V6c0-.708 0-1.21.032-1.601.032-.386.092-.622.186-.807a2 2 0 0 1 .874-.874Zm.765 1.932a.5.5 0 1 0-.715.7l.648.662.026.027c.747.764 1.344 1.374 1.876 1.789.55.429 1.088.698 1.724.705.637.007 1.182-.25 1.74-.667.541-.403 1.151-1 1.915-1.747l.027-.026.752-.736a.5.5 0 0 0-.7-.714l-.752.735c-.796.78-1.358 1.328-1.84 1.687-.469.35-.8.472-1.13.468-.33-.003-.66-.133-1.121-.493-.473-.37-1.023-.93-1.802-1.727l-.647-.663Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" fill="none" aria-hidden>
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M4.199.45a.55.55 0 0 1 .55.55v.45h4.5V1a.55.55 0 1 1 1.1 0v.466c.119.005.231.011.337.02.45.037.84.114 1.198.296a3.05 3.05 0 0 1 1.333 1.333c.182.358.26.747.296 1.198.036.44.036.983.036 1.663v2.048c0 .68 0 1.223-.036 1.663-.037.45-.114.84-.296 1.198a3.05 3.05 0 0 1-1.333 1.332c-.358.183-.747.26-1.198.297-.44.036-.983.036-1.663.036H4.975c-.68 0-1.223 0-1.663-.036-.45-.037-.84-.114-1.197-.296a3.05 3.05 0 0 1-1.333-1.333c-.183-.358-.26-.747-.297-1.198C.45 9.247.45 8.704.45 8.024V5.976c0-.68 0-1.223.036-1.663.037-.45.114-.84.297-1.198a3.05 3.05 0 0 1 1.333-1.333c.357-.182.747-.26 1.197-.296.106-.009.218-.015.337-.02V1a.55.55 0 0 1 .55-.55Zm5.05 2.1v.2a.55.55 0 1 0 1.1 0v-.183c.088.004.17.009.247.015.383.031.612.09.788.18.367.187.666.486.853.853.09.177.149.405.18.788.032.389.032.888.032 1.597v2c0 .71 0 1.208-.032 1.597-.031.383-.09.611-.18.788a1.95 1.95 0 0 1-.853.852c-.176.09-.405.15-.788.18-.389.033-.888.033-1.597.033H5c-.709 0-1.208 0-1.597-.032-.383-.032-.611-.09-.788-.18a1.95 1.95 0 0 1-.852-.853c-.09-.177-.15-.405-.18-.788-.032-.39-.033-.888-.033-1.597V6c0-.71 0-1.208.032-1.597.032-.383.09-.611.18-.788a1.95 1.95 0 0 1 .853-.853c.177-.09.405-.149.788-.18.078-.006.16-.011.247-.015v.183a.55.55 0 1 0 1.1 0v-.2h4.5ZM3.5 4.7a.55.55 0 1 0 0 1.1h7a.55.55 0 1 0 0-1.1h-7Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SegmentIcon() {
  return (
    <svg width="14" height="14" fill="none" aria-hidden>
      <path
        d="M8.6 9.206H1.124A.626.626 0 0 1 .5 8.582c0-.343.28-.624.624-.624H8.6c.343 0 .624.28.624.624 0 .343-.281.624-.624.624ZM7.01 13.03a6.326 6.326 0 0 1-1.796-.265.62.62 0 0 1-.405-.78.62.62 0 0 1 .78-.407c.452.14.936.219 1.42.219a4.738 4.738 0 0 0 4.573-3.387.634.634 0 0 1 .78-.421.634.634 0 0 1 .421.78c-.795 2.544-3.105 4.26-5.774 4.26ZM12.877 6.038H5.402a.626.626 0 0 1-.625-.624c0-.344.281-.624.625-.624h7.475c.343 0 .624.28.624.624 0 .343-.28.624-.624.624ZM1.828 6.038a.783.783 0 0 1-.187-.031.634.634 0 0 1-.422-.78A6.031 6.031 0 0 1 7.01.967c.609 0 1.218.093 1.795.264a.62.62 0 0 1 .406.78.62.62 0 0 1-.78.406A4.82 4.82 0 0 0 7.01 2.2a4.738 4.738 0 0 0-4.573 3.387.646.646 0 0 1-.609.452ZM10.706 3.666a.624.624 0 1 0 0-1.249.624.624 0 0 0 0 1.249ZM3.292 11.594a.624.624 0 1 0 0-1.249.624.624 0 0 0 0 1.249Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" fill="none" aria-hidden>
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M1.883 6.4h2.154A8.701 8.701 0 0 1 5.55 2.057 5.155 5.155 0 0 0 1.883 6.4Zm2.154 1.2H1.883a5.155 5.155 0 0 0 3.666 4.343A8.701 8.701 0 0 1 4.037 7.6Zm1.204 0h3.515a7.5 7.5 0 0 1-1.758 4.265A7.5 7.5 0 0 1 5.24 7.6Zm3.515-1.2H5.24a7.5 7.5 0 0 1 1.758-4.265A7.499 7.499 0 0 1 8.756 6.4ZM9.96 7.6a8.701 8.701 0 0 1-1.512 4.343A5.155 5.155 0 0 0 12.114 7.6H9.96Zm2.154-1.2H9.96a8.701 8.701 0 0 0-1.512-4.343A5.155 5.155 0 0 1 12.114 6.4ZM6.998.65a6.35 6.35 0 1 0 0 12.7 6.35 6.35 0 0 0 0-12.7Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ─── Pills data ───────────────────────────────────────────────────────────────

const PILLS = [
  { icon: <EmailIcon />, label: 'Email events' },
  { icon: <CalendarIcon />, label: 'Calendar events' },
  { icon: <SegmentIcon />, label: 'Segment events' },
  { icon: <GlobeIcon />, label: 'Data sources' },
] as const

// ─── Animation helper for connector paths ─────────────────────────────────────

function pathAnim(inView: boolean, delay: number) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 0.7, ease: 'easeInOut' as const, delay },
  }
}

/**
 * Returns inline style for a plain <path> pulse overlay.
 * Uses the SVG `pathLength="1"` attribute (set on each <path>) so the browser
 * normalises stroke-dasharray/dashoffset to 0–1 space — no Framer Motion needed.
 * The `pulse-dash` keyframe is defined in globals.css (3 s cycle: 1.5 s travel,
 * 1.5 s invisible pause).
 */
function pulseStyle(inView: boolean, delay: number): React.CSSProperties {
  if (!inView) return { opacity: 0 }
  return {
    animationName: 'pulse-dash',
    animationDuration: '1.5s',
    animationTimingFunction: 'linear',
    animationDelay: `${delay}s`,
    animationIterationCount: 1,
    animationFillMode: 'both',
    opacity: 0.85,
    // filter: 'drop-shadow(0 0 1.5px #266df0) drop-shadow(0 0 3px rgba(38,109,240,0.35))',
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HomeSpeedVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mt-5 grid w-[calc(100%+48px)] grid-cols-[24px_1fr_24px] select-none pointer-events-none lg:mt-10 lg:w-full lg:grid-cols-[1fr_955px_1fr]">

      {/* ═══════════════════════════════════════════════════════════════════
          ROW 1 — top corners + pills + connector paths
          ═══════════════════════════════════════════════════════════════════ */}

      {/* Col 1 — top-left corner: dashed lines meeting at bottom-right */}
      <div className="relative">
        <DashedH className="absolute right-0 -bottom-px" />
        <DashedV className="absolute -right-px bottom-0 h-6" />
      </div>

      {/* Col 2 — pills + dotted bg + connector SVG paths */}
      <div className="relative flex flex-col items-center pt-10">

        {/* Dotted background — fades in from the top via mask */}
        <DotGrid className="absolute inset-px [mask-image:linear-gradient(to_bottom,#0000,#000_40px)]" />

        {/* ── Mobile pills: 2 rows of 2 ─────────────────────────────── */}
        <div className="relative flex flex-col lg:hidden">
          <div className="flex justify-center gap-3">
            <SourcePill icon={PILLS[0].icon} label={PILLS[0].label} />
            <SourcePill icon={PILLS[1].icon} label={PILLS[1].label} />
          </div>
          <div className="mt-3 flex justify-center gap-3">
            <SourcePill icon={PILLS[2].icon} label={PILLS[2].label} />
            <SourcePill icon={PILLS[3].icon} label={PILLS[3].label} />
          </div>

          {/* Mobile connector SVG paths — h-[60px] spacer with animated paths */}
          <div className="relative h-[60px]">
            <div className="absolute right-[calc(50%+16px)] -bottom-px">
              <svg width="142" height="116" fill="none">
                <motion.path {...pathAnim(inView, 0.00)} d="M141 115.062V98.6114C141 93.3802 136.968 89.033 131.752 88.6397L19.4963 80.176C9.06354 79.3894 1 70.695 1 60.2326V10.5625C1 5.03965 5.47715 0.5625 11 0.5625H14" stroke="#EDEFF3" />
                <path pathLength={1} strokeDasharray="0.15 1" fill="none" stroke="#266df0" strokeWidth={1.5} strokeLinecap="round" d="M141 115.062V98.6114C141 93.3802 136.968 89.033 131.752 88.6397L19.4963 80.176C9.06354 79.3894 1 70.695 1 60.2326V10.5625C1 5.03965 5.47715 0.5625 11 0.5625H14" style={pulseStyle(inView, 0.70)} />
              </svg>
            </div>
            <div className="absolute right-[calc(50%+5px)] -bottom-px">
              <svg width="92" height="62" fill="none">
                <motion.path {...pathAnim(inView, 0.50)} d="M1 0.5V1.97926C1 12.5465 9.22066 21.2902 19.7678 21.9413L72.2322 25.1798C82.7794 25.8309 91 34.5746 91 45.1418V61.0638" stroke="#EDEFF3" />
                <path pathLength={1} strokeDasharray="0.15 1" fill="none" stroke="#266df0" strokeWidth={1.5} strokeLinecap="round" d="M1 0.5V1.97926C1 12.5465 9.22066 21.2902 19.7678 21.9413L72.2322 25.1798C82.7794 25.8309 91 34.5746 91 45.1418V61.0638" style={pulseStyle(inView, 1.20)} />
              </svg>
            </div>
            <div className="absolute -bottom-px left-[calc(50%+5px)]">
              <svg width="92" height="62" fill="none">
                <motion.path {...pathAnim(inView, 1.00)} d="M91 0.5V1.97577C91 12.543 82.7793 21.2867 72.2322 21.9378L19.7678 25.1763C9.22064 25.8274 1 34.5711 1 45.1383V61.0603" stroke="#EDEFF3" />
                <path pathLength={1} strokeDasharray="0.15 1" fill="none" stroke="#266df0" strokeWidth={1.5} strokeLinecap="round" d="M91 0.5V1.97577C91 12.543 82.7793 21.2867 72.2322 21.9378L19.7678 25.1763C9.22064 25.8274 1 34.5711 1 45.1383V61.0603" style={pulseStyle(inView, 1.70)} />
              </svg>
            </div>
            <div className="absolute -bottom-px left-[calc(50%+16px)]">
              <svg width="142" height="116" fill="none">
                <motion.path {...pathAnim(inView, 1.50)} d="M1 115.062V98.6114C1 93.3802 5.03177 89.033 10.2482 88.6397L122.504 80.176C132.936 79.3894 141 70.695 141 60.2326V10.5625C141 5.03965 136.523 0.5625 131 0.5625H128" stroke="#EDEFF3" />
                <path pathLength={1} strokeDasharray="0.15 1" fill="none" stroke="#266df0" strokeWidth={1.5} strokeLinecap="round" d="M1 115.062V98.6114C1 93.3802 5.03177 89.033 10.2482 88.6397L122.504 80.176C132.936 79.3894 141 70.695 141 60.2326V10.5625C141 5.03965 136.523 0.5625 131 0.5625H128" style={pulseStyle(inView, 2.20)} />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Desktop pills: 1 row of 4 ─────────────────────────────── */}
        <div className="relative hidden w-fit grid-cols-[auto_auto_auto_auto] gap-x-11 lg:grid">
          {PILLS.map((p) => (
            <SourcePill key={p.label} icon={p.icon} label={p.label} />
          ))}
        </div>

        {/* Desktop connector SVG paths — h-[106px] spacer with animated paths */}
        {/* Desktop connector SVG paths — h-[106px] spacer with animated paths */}
        <div className="relative hidden h-[106px] self-stretch lg:block">
          <div className="absolute top-[-0.5px] right-[calc(50%+17px)] bottom-[-0.5px]">
            <svg width="263" height="107" fill="none">
              <motion.path {...pathAnim(inView, 0.00)} d="M1 0V27.0669C1 37.229 8.62057 45.7757 18.7162 46.9361L251.37 73.678C257.428 74.3742 262 79.5022 262 85.5995V107" stroke="#EDEFF3" strokeWidth={1} />
              <path pathLength={1} strokeDasharray="0.12px 1px" fill="none" stroke="#266df0" strokeWidth={1} strokeLinecap="round" d="M1 0V27.0669C1 37.229 8.62057 45.7757 18.7162 46.9361L251.37 73.678C257.428 74.3742 262 79.5022 262 85.5995V107" style={pulseStyle(inView, 0.70)} />
            </svg>
          </div>
          <div className="absolute top-[-0.5px] right-[calc(50%+5px)] bottom-[-0.5px]">
            <svg width="92" height="107" fill="none">
              <motion.path {...pathAnim(inView, 0.50)} d="M1 0V34.7932C1 44.9842 8.66272 53.5455 18.7914 54.6709L73.2087 60.7172C83.3373 61.8426 91 70.4039 91 80.5949V107" stroke="#EDEFF3" strokeWidth={1} />
              <path pathLength={1} strokeDasharray="0.12px 1px" fill="none" stroke="#266df0" strokeWidth={1} strokeLinecap="round" d="M1 0V34.7932C1 44.9842 8.66272 53.5455 18.7914 54.6709L73.2087 60.7172C83.3373 61.8426 91 70.4039 91 80.5949V107" style={pulseStyle(inView, 1.20)} />
            </svg>
          </div>
          <div className="absolute top-[-0.5px] bottom-[-0.5px] left-[calc(50%+5px)]">
            <svg width="94" height="107" fill="none">
              <motion.path {...pathAnim(inView, 1.00)} d="M93 0V34.7501C93 44.9593 85.3106 53.5298 75.1612 54.633L18.8388 60.755C8.68935 61.8582 1 70.4287 1 80.6379V107" stroke="#EDEFF3" strokeWidth={1} />
              <path pathLength={1} strokeDasharray="0.12px 1px" fill="none" stroke="#266df0" strokeWidth={1} strokeLinecap="round" d="M93 0V34.7501C93 44.9593 85.3106 53.5298 75.1612 54.633L18.8388 60.755C8.68935 61.8582 1 70.4287 1 80.6379V107" style={pulseStyle(inView, 1.70)} />
            </svg>
          </div>
          <div className="absolute top-[-0.5px] bottom-[-0.5px] left-[calc(50%+17px)]">
            <svg width="269" height="107" fill="none">
              <motion.path {...pathAnim(inView, 1.50)} d="M268 0V27.0211C268 37.2027 260.351 45.7592 250.233 46.8961L11.6601 73.702C5.58941 74.3841 1 79.5181 1 85.627V107" stroke="#EDEFF3" strokeWidth={1} />
              <path pathLength={1} strokeDasharray="0.12px 1px" fill="none" stroke="#266df0" strokeWidth={1} strokeLinecap="round" d="M268 0V27.0211C268 37.2027 260.351 45.7592 250.233 46.8961L11.6601 73.702C5.58941 74.3841 1 79.5181 1 85.627V107" style={pulseStyle(inView, 2.20)} />
            </svg>
          </div>
        </div>
      </div>

      {/* Col 3 — top-right corner: dashed lines meeting at bottom-left */}
      <div className="relative">
        <DashedH className="absolute -bottom-px left-0" />
        <DashedV className="absolute bottom-0 -left-px h-6" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ROW 2 — xl left canvas | chart container | xl right decoration
          ═══════════════════════════════════════════════════════════════════ */}

      {/* Col 1 — xl animated dot canvas, anchored to right edge of this column */}
      <div className="relative">
        <div className="absolute top-1/2 right-0 hidden h-[316px] w-20 -translate-y-1/2 [mask-image:linear-gradient(to_left,#000,#0000_40px)] xl:block">
          <div className="h-full w-full [mask-image:radial-gradient(circle_at_158px_158px,#000_140px,#0000_170px)]">
            <div
              className="absolute inset-0 grid overflow-hidden [&>*]:col-start-1 [&>*]:row-start-1"
              style={{ height: 316, left: 2, top: 0, width: 76 } as CSSProperties}
            >
              <div className="h-full w-full overflow-hidden">
                <FlickeringGrid
                  className="relative h-full w-full"
                  maskMode
                  maskBackground="#D2D7DE"
                  maxOpacity={0.95}
                  minOpacity={0.1}
                  flickerChance={0.9}
                  squareSize={4}
                  gridGap={6}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Col 2 — chart container with CRM panel inside */}
      <div className="relative w-full border border-weak-stroke bg-[#EEEFF1]">
        {/* Highlight overlay slots — animated glow (opacity: 0 at rest) */}
        <div
          className="home-enrichment-highlight absolute -inset-px opacity-0 [background-position:calc(50%-16px)_calc(50%-100px)] lg:[background-position:calc(50%-17px)_50%]"
          style={{ '--angle': '30%' } as CSSProperties}
        />
        <div
          className="home-enrichment-highlight absolute -inset-px opacity-0 [background-position:calc(50%-5px)_calc(50%-100px)] lg:[background-position:calc(50%-5px)_50%]"
          style={{ '--angle': '30%' } as CSSProperties}
        />
        <div
          className="home-enrichment-highlight absolute -inset-px opacity-0 [background-position:calc(50%+5px)_calc(50%-100px)] lg:[background-position:calc(50%+5px)_50%]"
          style={{ '--angle': '30%' } as CSSProperties}
        />
        <div
          className="home-enrichment-highlight absolute -inset-px opacity-0 [background-position:calc(50%+16px)_calc(50%-100px)] lg:[background-position:calc(50%+17px)_50%]"
          style={{ '--angle': '30%' } as CSSProperties}
        />
        {/* Panel border absorption — one flash per pulse; glow enters at top center,
            spreads ~30% down the side edges, then fades. Fires once, no repeat. */}
        {[2.05, 2.55, 3.05, 3.55].map((t) => (
          <motion.div
            key={t}
            className="pointer-events-none absolute -inset-px"
            style={{
              background: [
                /* top edge: strong center, fades toward corners */
                'linear-gradient(90deg, transparent 15%, #709ff5 50%, transparent 85%) 0 0 / 100% 1px no-repeat',
                /* left edge: fades out at 30% height */
                'linear-gradient(180deg, #709ff5 0%, transparent 100%) 0 0 / 1px 30% no-repeat',
                /* right edge: fades out at 30% height */
                'linear-gradient(180deg, #709ff5 0%, transparent 100%) 100% 0 / 1px 30% no-repeat',
              ].join(', '),
              filter: 'blur(0.5px)',
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
            transition={{ delay: t, duration: 0.7, ease: 'easeOut', times: [0, 0.15, 1] }}
          />
        ))}
        {/* CRM contact record panel — starts building after first pulse arrives (~2 s) */}
        <HomeSpeedChartPanel baseDelay={2.0} />
      </div>

      {/* Col 3 — xl right decoration, anchored to left edge of this column */}
      <div className="relative">
        <div className="absolute top-[70px] bottom-[70px] left-0 hidden w-16 [mask-image:linear-gradient(to_right,#000,#0000_40px)] xl:block">
          <div className="h-full w-full [mask-image:radial-gradient(circle_at_-88px_158px,#000_140px,#0000_170px)]">
            <div className="h-full w-full overflow-hidden">
              <FlickeringGrid
                className="relative h-full w-full"
                maskMode
                maskBackground="#D2D7DE"
                maxOpacity={0.95}
                minOpacity={0.1}
                flickerChance={0.9}
                squareSize={4}
                gridGap={6}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ROW 3 — side border connectors + bottom dotted pattern
          ═══════════════════════════════════════════════════════════════════ */}

      {/* Col 1 — left-side continuation of chart frame */}
      <div className="relative">
        <DashedH className="absolute -top-px right-0" />
        <DashedV className="absolute top-0 -right-px" />
      </div>

      {/* Col 2 — bottom dotted grid */}
      <div>
        <DotGrid className="mx-px h-24 lg:h-[200px]" />
      </div>

      {/* Col 3 — right-side continuation of chart frame */}
      <div className="relative">
        <DashedH className="absolute -top-px left-0" />
        <DashedV className="absolute top-0 -left-px" />
      </div>

    </div>
  )
}
