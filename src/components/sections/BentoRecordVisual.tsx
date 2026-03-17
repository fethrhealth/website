'use client'

/**
 * BentoRecordVisual
 *
 * contentB visual for the "Deploy AI" bento row (i === 1).
 * CRM record card — Basepoint company — with FlickeringGrid background fades
 * and character-reveal animation on the last two data rows.
 *
 * Structure:
 *   Outer: relative flex h-full w-full overflow-hidden (clips crosshair lines + fades)
 *     Inner: relative overflow-visible
 *       Top fade:    absolute bottom-full, FlickeringGrid + mask-linear-gradient(to top)
 *       Bottom fade: absolute top-full,   FlickeringGrid + mask-linear-gradient(to bottom)
 *       4 dashed crosshair lines (top/bottom w-[400px], left/right h-[400px])
 *       Record card: w-[251px], rounded-[12px], border #E4E7EC, white bg
 *         Header: black circle logo + "Basepoint"
 *         7 data rows: dot | label | value
 *           "Funding raised" + "Stakeholders" animate character-by-character on enter
 */

import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { BasepointLogo } from '@/components/icons/BasepointLogo'
import { DomainsIcon, NameIcon, EstimatedARRIcon, LocationIcon, CategoriesIcon, FundingRaisedIcon, StakeholdersIcon } from '@/components/icons/BentoRecordIcons'

// ─── Animated text hook ────────────────────────────────────────────────────────

function useCharReveal(text: string, trigger: boolean, delayMs = 0): string {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!trigger) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const timeoutId = setTimeout(() => {
      let i = 0
      intervalId = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length && intervalId !== null) {
          clearInterval(intervalId)
          intervalId = null
        }
      }, 35)
    }, delayMs)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId !== null) clearInterval(intervalId)
    }
  }, [trigger, text, delayMs])

  return displayed
}

// ─── Card shadow (shared with AutomationStackVisual) ──────────────────────────

const CARD_SHADOW =
  'rgba(28,40,64,0.08) 0px 10.85px 21.7px -4.34px, ' +
  'rgba(28,40,64,0.08) 0px 6.51px 6.51px -6.51px, ' +
  'rgba(28,40,64,0.12) 0px 4.34px 4.34px -4.34px'

// ─── Data row ─────────────────────────────────────────────────────────────────

function DataRow({
  icon,
  label,
  value,
}: {
  icon:  ReactNode
  label: string
  /** Accept string for plain text rows or ReactNode for custom-styled values (badges, etc.) */
  value: ReactNode
}): ReactNode {
  return (
    <div
      className="grid items-center"
      style={{ gridTemplateColumns: '12px 96px 1fr', height: 26, columnGap: 8 }}
    >
      {/* Field-type icon — 12×12 */}
      <div className="flex h-3 w-3 items-center justify-center">
        {icon}
      </div>

      {/* Field label */}
      <span
        className="truncate text-[#9CA3AF]"
        style={{ fontSize: 12, lineHeight: '16px' }}
      >
        {label}
      </span>

      {/* Field value — plain text or custom node */}
      {typeof value === 'string' ? (
        <span className="truncate text-[#1C1D1F]" style={{ fontSize: 12, lineHeight: '16px' }}>
          {value}
        </span>
      ) : (
        <div className="flex items-center overflow-hidden">
          {value}
        </div>
      )}
    </div>
  )
}

// ─── Placeholder dot — used for rows whose icon hasn't been provided yet ───────

function DotIcon({ color }: { color: string }): ReactNode {
  return <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
}

// ─── Record card ──────────────────────────────────────────────────────────────

function RecordCard({ inView }: { inView: boolean }): ReactNode {
  // Delayed character-reveal for the two AI-enriched rows
  const funding     = useCharReveal('$25M Series A', inView, 500)
  const stakeholder = useCharReveal('Adam King',     inView, 850)

  return (
    <div
      className="relative w-[251px] overflow-hidden rounded-[12px] border border-[#E4E7EC] bg-white"
      style={{ boxShadow: CARD_SHADOW }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-[#E4E7EC] px-3 py-[10px]">
        {/* Basepoint logo — black circle + white SVG mark */}
        <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#1C1D1F]">
          <BasepointLogo size={20} />
        </div>
        <span
          className="font-semibold text-[#1C1D1F]"
          style={{ fontSize: 13, lineHeight: '18px', letterSpacing: '-0.01em' }}
        >
          Basepoint
        </span>
      </div>

      {/* ── Data rows ──────────────────────────────────────────────────── */}
      <div className="px-3 py-1">

        <DataRow
          icon={<DomainsIcon />}
          label="Domains"
          value={
            <div
              className="flex h-4 w-fit items-center rounded-[6px] border px-[5px] font-medium"
              style={{ fontSize: 10, backgroundColor: '#FFFFFF', borderColor: '#B8D0FF', color: '#407FF2' }}
            >
              basepoint.com
            </div>
          }
        />
        <DataRow icon={<NameIcon />}                  label="Name"           value="Basepoint"     />
        <DataRow
          icon={<EstimatedARRIcon />}
          label="Estimated ARR"
          value={
            <div
              className="flex h-4 w-fit items-center rounded-[6px] border px-[5px] font-medium"
              style={{ fontSize: 10, backgroundColor: '#DDF9E4', borderColor: '#C7F4D3', color: '#075A39' }}
            >
              $1–10M
            </div>
          }
        />
        <DataRow icon={<LocationIcon />}  label="Location"       value="San Francisco" />
        <DataRow
          icon={<CategoriesIcon />}
          label="Categories"
          value={
            <div className="relative flex items-center gap-1.5">
              {/* Short horizontal connector line */}
              <svg width="100%" height="1" className="text-subtle-stroke absolute top-1/2 left-0 w-4 -translate-y-1/2" aria-hidden>
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
              </svg>
              <div className="relative">
                <div className="flex h-4 w-fit items-center rounded-[6px] border px-[5px] font-medium" style={{ fontSize: 10, backgroundColor: '#F5EEFF', borderColor: '#E8DDFE', color: '#4711BB' }}>SaaS</div>
              </div>
              <div className="relative">
                <div className="flex h-4 w-fit items-center rounded-[6px] border px-[5px] font-medium" style={{ fontSize: 10, backgroundColor: '#E5EEFF', borderColor: '#D6E5FF', color: '#183C81' }}>B2B</div>
              </div>
            </div>
          }
        />

        {/* Animated rows — AI-enriched (character reveal on enter) */}
        <DataRow icon={<FundingRaisedIcon />}  label="Funding raised" value={funding}       />
        <DataRow icon={<StakeholdersIcon />}  label="Stakeholders"   value={stakeholder}   />

      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoRecordVisual(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center overflow-hidden">

      {/* Inner anchor — overflow-visible so crosshairs + fades extend outside */}
      <div className="relative overflow-visible">

        {/* ── Top flickering-grid fade (above card) ─────────────────────── */}
        <div
          className="pointer-events-none absolute bottom-full left-1/2 h-10 w-[170px] -translate-x-1/2"
          style={{ maskImage: 'linear-gradient(to top, white, transparent)' }}
        >
          <FlickeringGrid
            color="#D2D7DE"
            squareSize={4}
            gridGap={6}
            maxOpacity={0.8}
            flickerChance={0.3}
            className="h-full w-full"
          />
        </div>

        {/* ── Bottom flickering-grid fade (below card) ──────────────────── */}
        <div
          className="pointer-events-none absolute top-full left-1/2 h-10 w-[170px] -translate-x-1/2"
          style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }}
        >
          <FlickeringGrid
            color="#D2D7DE"
            squareSize={4}
            gridGap={6}
            maxOpacity={0.8}
            flickerChance={0.3}
            className="h-full w-full"
          />
        </div>

        {/* ── 4 dashed crosshair lines ───────────────────────────────────── */}

        {/* Top edge — horizontal */}
        <svg
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 text-subtle-stroke"
          width="400" height="1" aria-hidden
        >
          <line x1="0" y1="0.5" x2="400" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        </svg>

        {/* Bottom edge — horizontal */}
        <svg
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-subtle-stroke"
          width="400" height="1" aria-hidden
        >
          <line x1="0" y1="0.5" x2="400" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        </svg>

        {/* Left edge — vertical */}
        <svg
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-subtle-stroke"
          width="1" height="400" aria-hidden
        >
          <line x1="0.5" y1="0" x2="0.5" y2="400" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        </svg>

        {/* Right edge — vertical */}
        <svg
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-subtle-stroke"
          width="1" height="400" aria-hidden
        >
          <line x1="0.5" y1="0" x2="0.5" y2="400" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        </svg>

        {/* ── Record card ─────────────────────────────────────────────────── */}
        <RecordCard inView={inView} />

      </div>
    </div>
  )
}
