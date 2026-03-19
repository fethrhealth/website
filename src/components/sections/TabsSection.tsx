'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import type { ReactNode } from 'react'
import type { TabItem } from '@/data/platform-ask'

// ─── Web Audio click ──────────────────────────────────────────────────────────
// Short sine-wave tick played on tab change — matches Attio's UI sound.

function playTickSound(): void {
  try {
    type Ctor = typeof AudioContext
    const Ctx = (
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: Ctor }).webkitAudioContext
    )
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400, ctx.currentTime)
    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
    // Clean up after sound finishes
    setTimeout(() => { void ctx.close() }, 200)
  } catch {
    // Web Audio not available or blocked — silently ignore
  }
}

// ─── Ruler / ticker ───────────────────────────────────────────────────────────
// 200 1-px wide ticks in a 200vw strip, centered on the viewport by default.
// translateX shifts the strip so the center tick aligns under the active tab.

const TICK_COUNT = 200
const CENTER_TICK = Math.floor(TICK_COUNT / 2) // index 100

function Ruler({ translateX }: { translateX: number }) {
  return (
    <div
      className="relative h-4 w-full overflow-hidden mask-x-from-96%"
      aria-hidden="true"
    >
      {/*
       * justify-between distributes 200 × 1 px ticks evenly across 200vw.
       * Each tick is fixed at 1 px wide so they appear as thin lines with gaps.
       */}
      <div
        className="absolute inset-y-0 flex items-end justify-between"
        style={{
          left:       'calc(-50vw)',
          minWidth:   '200vw',
          transform:  `translateX(${translateX}px)`,
          transition: 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        {Array.from({ length: TICK_COUNT }, (_, i) => {
          const isCenter = i === CENTER_TICK
          return (
            <div
              key={i}
              style={{
                width:           '1px',
                height:          isCenter ? '12px' : '8px',
                backgroundColor: isCenter ? '#1c1d1f' : '#e4e7ec',
                flexShrink:      0,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Mobile Ruler ─────────────────────────────────────────────────────────────
// 40 SVG ticks in a fixed 200vw strip — always static (no translateX).
// The center tick (index 20) is taller + dark; the tab strip moves instead.

const MOBILE_TICK_COUNT  = 40
const MOBILE_CENTER_TICK = Math.floor(MOBILE_TICK_COUNT / 2) // index 20

function MobileRuler() {
  return (
    <div
      className="mask-x-from-96% relative flex h-4 w-full justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex min-w-[200vw] max-w-[200vw] items-end justify-center gap-3">
        {Array.from({ length: MOBILE_TICK_COUNT }, (_, i) => {
          const isCenter = i === MOBILE_CENTER_TICK
          return (
            <svg
              key={i}
              width="1"
              height="100%"
              className={
                isCenter
                  ? 'h-3 shrink-0 text-fg-primary'
                  : 'h-2 shrink-0 text-subtle-stroke'
              }
            >
              <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
            </svg>
          )
        })}
      </div>
    </div>
  )
}

// ─── Corner cross decoration ──────────────────────────────────────────────────
// 40 × 40 px container centered on each corner of the content panel.
// Two separate SVG lines (vertical + horizontal) form a dashed "+" shape,
// matching Attio's bento decoration exactly.

type CornerPos = 'tl' | 'tr' | 'bl' | 'br'

function CrossCorner({ position }: { position: CornerPos }) {
  const isLeft = position[1] === 'l'
  const isTop  = position[0] === 't'
  // The -0.5px offset accounts for the 1px border of the parent panel.
  const tx = isLeft ? 'calc(-50% - 0.5px)' : 'calc(50% + 0.5px)'
  const ty = isTop  ? 'calc(-50% - 0.5px)' : 'calc(50% + 0.5px)'

  return (
    <div
      aria-hidden="true"
      className={[
        'absolute z-10 size-10',
        isTop  ? 'top-0'    : 'bottom-0',
        isLeft ? 'left-0'   : 'right-0',
      ].join(' ')}
      style={{ transform: `translate(${tx}, ${ty})` }}
    >
      {/* Vertical dashed line, centered horizontally in the 40 px box */}
      <svg width="1" height="100%" className="text-subtle-stroke absolute inset-y-0 left-1/2 -translate-x-1/2">
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
      {/* Horizontal dashed line, centered vertically in the 40 px box */}
      <svg width="100%" height="1" className="text-subtle-stroke absolute inset-x-0 top-1/2 -translate-y-1/2">
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabsSectionProps {
  /** Optional section headline — renders the Attio-style centered h2 above the tabs */
  heading?: string
  tabs: TabItem[]
  /**
   * Optional animated visuals — one per tab, indexed the same as `tabs`.
   * Pass `null` or omit an entry to show the default placeholder.
   * Wire in the animated content once it's ready.
   */
  visuals?: (ReactNode | null | undefined)[]
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TabsSection({
  heading,
  tabs,
  visuals,
}: TabsSectionProps): ReactNode {

  const [activeIndex, setActiveIndex] = useState(0)
  const [rulerX, setRulerX] = useState(0)

  // Refs to each desktop tab button — used to measure position for the ruler.
  const tabRefs         = useRef<(HTMLButtonElement | null)[]>([])
  // Ref to the ruler wrapper — needed to correct for the container's left offset.
  const rulerWrapperRef = useRef<HTMLDivElement>(null)

  // ── Mobile: translateX-based tab strip ────────────────────────────────────
  // The outer div clips with overflow-hidden. The inner div moves with translateX.
  // Active tab is always centered; ruler is static (center tick = active slot).
  // This matches Attio: even edge tabs can be centered, leaving empty space.

  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const mobileInnerRef = useRef<HTMLDivElement>(null)
  const [mobileTranslateX, setMobileTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Computes translateX so that tab[index] is centered in the outer container.
  // mobileInnerRef must have position:relative for offsetLeft to be inner-relative.
  // Formula: tx = innerWidth/2 − (tab.offsetLeft + tab.offsetWidth/2)
  const centerMobileTab = useCallback((index: number) => {
    const innerEl = mobileInnerRef.current
    const tabEl   = mobileTabRefs.current[index]
    if (!innerEl || !tabEl) return
    setMobileTranslateX(innerEl.offsetWidth / 2 - (tabEl.offsetLeft + tabEl.offsetWidth / 2))
  }, [])

  // ── Desktop ruler position math ───────────────────────────────────────────
  // The 200-tick strip has CSS `left: -50vw` relative to its wrapper.
  // Therefore the center tick (index 100) sits at:
  //   rulerWrapper.left + window.innerWidth/2    (viewport coords)
  //
  // We need to apply translateX so the center tick lands on the active tab:
  //   translateX = tabCenterX − rulerWrapper.left − window.innerWidth/2
  //
  // This handles any viewport width correctly — the container is centered with
  // margin:auto, so rulerWrapper.left ≠ 0 on wide monitors.

  const updateRulerX = useCallback((index: number) => {
    const tabEl   = tabRefs.current[index]
    const rulerEl = rulerWrapperRef.current
    if (!tabEl || !rulerEl) return
    const tabRect    = tabEl.getBoundingClientRect()
    const rulerRect  = rulerEl.getBoundingClientRect()
    const tabCenterX = tabRect.left + tabRect.width / 2
    setRulerX(tabCenterX - rulerRect.left - window.innerWidth / 2)
  }, [])

  // Recalculate when active tab changes
  useEffect(() => {
    updateRulerX(activeIndex)
    centerMobileTab(activeIndex)
  }, [activeIndex, updateRulerX, centerMobileTab])

  // Recalculate on window resize (viewport center shifts)
  useEffect(() => {
    const onResize = () => {
      updateRulerX(activeIndex)
      centerMobileTab(activeIndex)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { window.removeEventListener('resize', onResize) }
  }, [activeIndex, updateRulerX, centerMobileTab])

  // ── Tab click ─────────────────────────────────────────────────────────────

  const handleTabClick = useCallback((index: number) => {
    playTickSound()
    setActiveIndex(index)
  }, [])

  // ── Mobile drag state ─────────────────────────────────────────────────────

  const drag = useRef({ active: false, startX: 0, startTX: 0, lastTX: 0 })

  // ── Active tab data ───────────────────────────────────────────────────────

  const active = tabs[activeIndex] ?? tabs[0]
  const activeVisual = visuals?.[activeIndex] ?? null

  // Empty tabs — nothing to render (caller shouldn't pass an empty array)
  if (!active) return null

  return (
    <section className="relative flex flex-1 flex-col bg-primary-background overflow-hidden">
      <div className="container flex flex-1 flex-col">
        <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          {heading != null && (
            <header className="grid grid-cols-12 justify-items-center pt-40 pb-20 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15">
              <div className="col-[2/-2] max-w-[20em] text-pretty text-heading-responsive-sm text-center mix-blend-multiply dark:mix-blend-screen">
                <h2 className="text-pretty inline">{heading}</h2>
              </div>
            </header>
          )}

          {/* ── Desktop tab strip + ruler (≥ 992 px) ────────────────────────
           * Tabs and ruler share a parent. pb-10 creates the gap between
           * the ruler and the content panel below — same structure as Attio.
          ───────────────────────────────────────────────────────────────── */}
          <div className="max-lg:hidden pb-10">

            {/* Tab buttons in col-[2/-2] grid */}
            <div className="grid grid-cols-12">
              <div className="col-[2/-2] grid grid-cols-5 justify-items-center">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    ref={el => { tabRefs.current[i] = el }}
                    type="button"
                    onClick={() => { handleTabClick(i) }}
                    className={[
                      'flex w-full items-center justify-center gap-2 px-4 py-3',
                      'text-sm font-medium transition-colors duration-150',
                      i === activeIndex
                        ? 'text-fg-primary'
                        : 'text-caption-foreground hover:text-fg-accent',
                    ].join(' ')}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ruler — full-width, slides to align center tick under active tab */}
            <div ref={rulerWrapperRef}>
              <Ruler translateX={rulerX} />
            </div>

          </div>

          {/* ── Mobile tab strip (< 992 px) ──────────────────────────────────
           * Outer clips with overflow-hidden + mask fade.
           * Inner div moves with translateX so the active tab is always
           * centered — even at extremes (empty space is allowed on either side).
          ───────────────────────────────────────────────────────────────── */}
          <div className="mask-x-from-80% relative flex w-full justify-center overflow-hidden lg:hidden">
            <div
              ref={mobileInnerRef}
              className="relative flex cursor-grab items-center justify-center gap-8 select-none active:cursor-grabbing"
              style={{
                transform:  `translateX(${mobileTranslateX}px)`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.2,0,0,1)',
                touchAction: 'none',
              }}
              onPointerDown={(e) => {
                drag.current = { active: true, startX: e.clientX, startTX: mobileTranslateX, lastTX: mobileTranslateX }
                ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
                setIsDragging(true)
              }}
              onPointerMove={(e) => {
                if (!drag.current.active) return
                const newTX = drag.current.startTX + (e.clientX - drag.current.startX)
                drag.current.lastTX = newTX
                setMobileTranslateX(newTX)
              }}
              onPointerUp={() => {
                drag.current.active = false
                setIsDragging(false)
                // Snap the tab closest to where viewport center now appears
                // in the inner div's natural coordinate space:
                //   viewportCenter_in_inner = innerWidth/2 − lastTX
                const innerEl = mobileInnerRef.current
                if (!innerEl) return
                const naturalCenter = innerEl.offsetWidth / 2 - drag.current.lastTX
                let closest = 0, minDist = Infinity
                mobileTabRefs.current.forEach((tabEl, i) => {
                  if (!tabEl) return
                  const dist = Math.abs(tabEl.offsetLeft + tabEl.offsetWidth / 2 - naturalCenter)
                  if (dist < minDist) { minDist = dist; closest = i }
                })
                handleTabClick(closest)
              }}
              onPointerCancel={() => { drag.current.active = false; setIsDragging(false) }}
            >
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  ref={el => { mobileTabRefs.current[i] = el }}
                  type="button"
                  onClick={() => { handleTabClick(i) }}
                  className={[
                    'flex shrink-0 items-center gap-2 pb-4',
                    'text-sm whitespace-nowrap transition-colors duration-300',
                    i === activeIndex
                      ? 'text-fg-primary'
                      : 'text-caption-foreground',
                  ].join(' ')}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: static tick ruler — center tick always marks the active slot */}
          <div className="lg:hidden pb-10">
            <MobileRuler />
          </div>

          {/* ── Content panel ───────────────────────────────────────────────
           * col-[2/-2] flex panel with border + 4 corner "+" decorations.
           * Desktop: left half = absolutely-positioned text, right half = visual.
           * Mobile: left half hidden, right half full-width square.
          ───────────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-12 max-lg:contents">
            {/*
             * max-lg:overflow-hidden forces aspect-ratio to act as a hard size
             * constraint on mobile (without it, flex content expands the box).
             */}
            <div className="relative col-[2/-2] flex w-full border border-subtle-stroke max-lg:border-x-0 max-lg:aspect-square max-lg:overflow-hidden">

              {/* Corner cross decorations — all breakpoints */}
              <CrossCorner position="tl" />
              <CrossCorner position="tr" />
              <CrossCorner position="bl" />
              <CrossCorner position="br" />

              {/* Left — text content (hidden on mobile) */}
              <div className="relative my-px w-1/2 bg-primary-background max-lg:hidden">

                {/* Vertical divider between left and right */}
                <svg width="1" height="100%" className="text-subtle-stroke absolute inset-y-0 right-0" aria-hidden="true">
                  <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
                </svg>

                {/* Heading — absolutely anchored to top-left */}
                <div className="absolute top-12 left-10 max-xl:left-7.5">
                  <h3 className="max-w-[20em] text-balance pr-6 font-display font-semibold text-2xl text-fg-primary">
                    {active.heading}
                  </h3>
                </div>

                {/* Description — absolutely anchored to bottom-left */}
                <div className="absolute inset-x-10 bottom-10 max-xl:inset-x-7.5 max-xl:bottom-7.5">
                  <p className="max-w-sm text-balance pr-6 text-sm text-accent-foreground">
                    {active.description}
                  </p>
                </div>

              </div>

              {/* Right — visual slot */}
              {/*
               * TODO: pass per-tab animated React nodes via the `visuals` prop.
               * Example:
               *   <TabsSection
               *     tabs={ASK_TABS}
               *     visuals={[<MeetingPrepVisual />, <PatientBriefVisual />, ...]}
               *   />
               */}
              {/*
               * max-lg:min-h-0 — prevents flex's default min-height:auto from
               * letting the visual slot expand the outer panel beyond aspect-ratio.
               */}
              <div className="relative flex aspect-square w-1/2 items-center justify-center overflow-hidden bg-secondary-background max-lg:w-full max-lg:min-h-0">

                {/* Dot grid — dots visible at edges, fade toward center */}
                <svg
                  width="100%"
                  height="100%"
                  aria-hidden="true"
                  className="text-subtle-stroke absolute inset-0 [mask-image:radial-gradient(circle,transparent_0%,black_100%)]"
                >
                  <defs>
                    <pattern id="tabs-dot-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#tabs-dot-grid)" />
                </svg>

                {/*
                 * Absolute wrapper on mobile: gives the visual a hard inset-0
                 * bounding box so overflow-hidden clips reliably regardless of
                 * the visual component's intrinsic height.
                 */}
                <div className="size-full max-lg:absolute max-lg:inset-0 flex items-center justify-center overflow-hidden">
                  {activeVisual ?? (
                    <div className="size-16 rounded-full bg-subtle-stroke opacity-50" aria-hidden="true" />
                  )}
                </div>

              </div>

            </div>
          </div>

          {/* ── Bottom spacer ────────────────────────────────────────────── */}
          <div className="h-40 max-xl:h-30 max-lg:h-25" aria-hidden="true" />

        </div>
      </div>
    </section>
  )
}
