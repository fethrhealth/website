'use client'

/**
 * BentoIllustrationStack
 *
 * contentB visual for the "Automate everything" bento row.
 * 8 workflow pill cards stacked — white card body, colored 22×22 icon box.
 * Center card is fully visible; adjacent cards fade + scale toward edges.
 *
 * Pixel-faithful to Attio: card bg = white, border = rgba(#2E3238, 0.07),
 * only the icon container uses the color tokens.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Card data ───────────────────────────────────────────────────────────────

interface CardDef {
  readonly label:       string
  readonly iconBg:      string   // 22×22 icon box background
  readonly iconBorder:  string   // 22×22 icon box border
  readonly iconStroke:  string   // SVG stroke inside the icon box
  readonly opacity:     number
  readonly scale:       number
  readonly translateY:  string
}

const CARDS: readonly CardDef[] = [
  {
    label: 'Re-engage warm leads',
    iconBg: 'rgb(255,235,235)', iconBorder: 'rgb(255,220,219)', iconStroke: 'rgb(119,35,34)',
    opacity: 0, scale: 0.6, translateY: '-414%',
  },
  {
    label: 'Re-engage cold leads',
    iconBg: 'rgb(255,235,235)', iconBorder: 'rgb(255,220,219)', iconStroke: 'rgb(119,35,34)',
    opacity: 0.25, scale: 0.7, translateY: '-354.5%',
  },
  {
    label: 'MQL lead routing',
    iconBg: 'rgb(255,243,204)', iconBorder: 'rgb(255,235,173)', iconStroke: 'rgb(112,85,0)',
    opacity: 0.5, scale: 0.8, translateY: '-268%',
  },
  {
    label: 'Onboarding hand-off',
    iconBg: 'rgb(218,244,252)', iconBorder: 'rgb(195,237,249)', iconStroke: 'rgb(10,90,112)',
    opacity: 0.75, scale: 0.9, translateY: '-163.5%',
  },
  {
    label: 'New Deal email campaign',
    iconBg: 'rgb(221,249,228)', iconBorder: 'rgb(199,244,211)', iconStroke: 'rgb(7,90,57)',
    opacity: 1, scale: 1, translateY: '-50%',
  },
  {
    label: 'Lead form submissions',
    iconBg: 'rgb(245,240,255)', iconBorder: 'rgb(232,221,254)', iconStroke: 'rgb(71,17,187)',
    opacity: 0.75, scale: 0.9, translateY: '63.5%',
  },
  {
    label: 'Monitor customer health',
    iconBg: 'rgb(254,236,241)', iconBorder: 'rgb(253,221,231)', iconStroke: 'rgb(111,6,93)',
    opacity: 0.5, scale: 0.8, translateY: '168%',
  },
  {
    label: 'Renewal automation',
    iconBg: 'rgb(221,249,228)', iconBorder: 'rgb(199,244,211)', iconStroke: 'rgb(7,90,57)',
    opacity: 0.25, scale: 0.7, translateY: '254.5%',
  },
]

const CARD_SHADOW =
  'rgba(28,40,64,0.08) 0px 10.85px 21.7px -4.34px, ' +
  'rgba(28,40,64,0.08) 0px 6.51px 6.51px -6.51px, ' +
  'rgba(28,40,64,0.12) 0px 4.34px 4.34px -4.34px'

// ─── Icon ────────────────────────────────────────────────────────────────────

function AutomationIcon({ stroke }: { stroke: string }): ReactNode {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden style={{ stroke }}>
      <rect x="1.25" y="1.25" width="4" height="4" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6.75" y="6.75" width="4" height="4" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75" strokeLinecap="round" />
      <path d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916" strokeLinecap="round" />
    </svg>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function BentoIllustrationStack(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center overflow-hidden">

      {/* Dashed vertical rails */}
      <svg width="1" height="400" className="absolute text-subtle-stroke" style={{ left: 'calc(50% - 125.5px)', top: '50%', transform: 'translateY(-50%)' }} aria-hidden>
        <line x1="0.5" y1="0" x2="0.5" y2="400" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
      <svg width="1" height="400" className="absolute text-subtle-stroke" style={{ left: 'calc(50% + 125.5px)', top: '50%', transform: 'translateY(-50%)' }} aria-hidden>
        <line x1="0.5" y1="0" x2="0.5" y2="400" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>

      {/* Card stack — slides up on inView */}
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
            className="absolute left-1/2 top-1/2 flex w-[251px] items-center gap-2 rounded-[12px] border bg-white p-2"
            style={{
              transform:   `translateY(${card.translateY}) translateX(-50%) scale(${card.scale})`,
              opacity:     card.opacity,
              borderColor: 'rgba(46,50,56,0.07)',
              boxShadow:   CARD_SHADOW,
            }}
          >
            {/* Colored icon box */}
            <div
              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[8px] border"
              style={{ backgroundColor: card.iconBg, borderColor: card.iconBorder }}
            >
              <AutomationIcon stroke={card.iconStroke} />
            </div>

            {/* Label — always dark */}
            <span
              className="whitespace-nowrap font-medium text-[#1C1D1F]"
              style={{ fontSize: 13, lineHeight: '18px', letterSpacing: '-0.01em' }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
