'use client'

/**
 * AutomationStackVisual
 *
 * contentB visual for the "Automate everything" bento row.
 * 8 workflow pill cards stacked with absolute positioning — the center card
 * ("New Deal email campaign") is fully visible; adjacent cards fade + scale
 * toward the top/bottom edges.
 *
 * Entrance: the whole stack enters from y=60 opacity=0 → y=0 opacity=1
 * using Framer Motion useInView (fires once).
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Card data ──────────────────────────────────────────────────────────────

interface CardDef {
  readonly label:      string
  readonly bg:         string   // pill background
  readonly border:     string   // pill border color
  readonly color:      string   // icon + text color
  readonly opacity:    number
  readonly scale:      number
  readonly translateY: string   // CSS translateY value (e.g. '-50%')
}

const CARDS: readonly CardDef[] = [
  {
    label: 'Re-engage warm leads',
    bg: 'rgb(255,235,235)', border: 'rgb(255,220,219)', color: 'rgb(119,35,34)',
    opacity: 0, scale: 0.6, translateY: '-414%',
  },
  {
    label: 'Re-engage cold leads',
    bg: 'rgb(255,235,235)', border: 'rgb(255,220,219)', color: 'rgb(119,35,34)',
    opacity: 0.25, scale: 0.7, translateY: '-354.5%',
  },
  {
    label: 'MQL lead routing',
    bg: 'rgb(255,243,204)', border: 'rgb(255,235,173)', color: 'rgb(112,85,0)',
    opacity: 0.5, scale: 0.8, translateY: '-268%',
  },
  {
    label: 'Onboarding hand-off',
    bg: 'rgb(218,244,252)', border: 'rgb(195,237,249)', color: 'rgb(10,90,112)',
    opacity: 0.75, scale: 0.9, translateY: '-163.5%',
  },
  {
    label: 'New Deal email campaign',
    bg: 'rgb(221,249,228)', border: 'rgb(199,244,211)', color: 'rgb(7,90,57)',
    opacity: 1, scale: 1, translateY: '-50%',
  },
  {
    label: 'Lead form submissions',
    bg: 'rgb(245,240,255)', border: 'rgb(232,221,254)', color: 'rgb(71,17,187)',
    opacity: 0.75, scale: 0.9, translateY: '63.5%',
  },
  {
    label: 'Monitor customer health',
    bg: 'rgb(254,236,241)', border: 'rgb(253,221,231)', color: 'rgb(111,6,93)',
    opacity: 0.5, scale: 0.8, translateY: '168%',
  },
  {
    label: 'Renewal automation',
    bg: 'rgb(221,249,228)', border: 'rgb(199,244,211)', color: 'rgb(7,90,57)',
    opacity: 0.25, scale: 0.7, translateY: '254.5%',
  },
]

/** Multi-layer card shadow matching Attio's automation stack */
const CARD_SHADOW =
  'rgba(28,40,64,0.08) 0px 10.85px 21.7px -4.34px, ' +
  'rgba(28,40,64,0.08) 0px 6.51px 6.51px -6.51px, ' +
  'rgba(28,40,64,0.12) 0px 4.34px 4.34px -4.34px'

// ─── Icon ───────────────────────────────────────────────────────────────────

/** Two connected squares with curved arrows — represents an automation workflow */
function AutomationIcon({ color }: { color: string }): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect
        x="1.25" y="1.25" width="4" height="4" rx="1.5"
        stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
      />
      <rect
        x="6.75" y="6.75" width="4" height="4" rx="2"
        stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75"
        stroke={color} strokeWidth="1.25" strokeLinecap="round"
      />
      <path
        d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916"
        stroke={color} strokeWidth="1.25" strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function AutomationStackVisual(): ReactNode {
  const ref  = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* ── Dashed vertical rails flanking the 251px card track ─────────── */}
      {/* Left rail — centred at (50% − 125.5px) */}
      <svg
        width="1" height="400"
        className="absolute text-subtle-stroke"
        style={{ left: 'calc(50% - 125.5px)', top: '50%', transform: 'translateY(-50%)' }}
        aria-hidden
      >
        <line x1="0.5" y1="0" x2="0.5" y2="400" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>

      {/* Right rail — centred at (50% + 125.5px) */}
      <svg
        width="1" height="400"
        className="absolute text-subtle-stroke"
        style={{ left: 'calc(50% + 125.5px)', top: '50%', transform: 'translateY(-50%)' }}
        aria-hidden
      >
        <line x1="0.5" y1="0" x2="0.5" y2="400" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>

      {/* ── Card stack ───────────────────────────────────────────────────── */}
      {/*
       * The motion wrapper slides from y=60,opacity=0 → y=0,opacity=1 on inView.
       * Each card is absolutely positioned relative to this 251×54px anchor.
       * Cards use top-1/2 + translateY(%) to fan out above/below the center card.
       */}
      <motion.div
        className="relative"
        style={{ width: 251, height: 54 }}
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 flex items-center gap-[8px] rounded-[10px] border px-[12px] py-[10px]"
            style={{
              width:           251,
              transform:       `translate(-50%, ${card.translateY}) scale(${card.scale})`,
              opacity:         card.opacity,
              backgroundColor: card.bg,
              borderColor:     card.border,
              boxShadow:       CARD_SHADOW,
            }}
          >
            <AutomationIcon color={card.color} />
            <span
              className="whitespace-nowrap font-medium"
              style={{ color: card.color, fontSize: 13, lineHeight: '18px', letterSpacing: '-0.01em' }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
