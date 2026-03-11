'use client'

/**
 * WorkflowsHeroSection
 *
 * Hero for /platform/workflows.
 *
 * Layout
 *   Left  (xl: cols 1–6)  : Badge, h1, subheading, CTAs.
 *   Right (xl: cols 7–12) : WorkflowGrid — port of the exact Attio HTML grid.
 *
 * WorkflowGrid
 *   5 cards on a fine-grained CSS grid (16 / 42 / 32 cols × 20-row grid).
 *   SVG connectors between cards (vertical, horizontal, L-shaped per breakpoint).
 *   Running → Completed animation cycles every STEP_MS ms per step.
 */

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE = [0.2, 0, 0, 1] as const
const STEP_MS = 2500                           // ms per animation step
const SEQ: number[][] = [[0], [1], [2], [3, 4]] // which card indices run per step

// ─── Card status type ─────────────────────────────────────────────────────────
type CS = 'idle' | 'running' | 'completed'

// ─── Animation hook ───────────────────────────────────────────────────────────
function useCardStatuses(active: boolean): CS[] {
  const [s, set] = useState<CS[]>(['idle', 'idle', 'idle', 'idle', 'idle'])

  useEffect(() => {
    if (!active) return
    let step = 0
    let alive = true
    let t: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!alive) return
      const group = SEQ[step % SEQ.length]!
      set(prev => { const n = [...prev] as CS[]; group.forEach(i => { n[i] = 'running' }); return n })
      t = setTimeout(() => {
        if (!alive) return
        set(prev => { const n = [...prev] as CS[]; group.forEach(i => { n[i] = 'completed' }); return n })
        step++
        if (step < SEQ.length) {
          t = setTimeout(tick, 350)
        } else {
          t = setTimeout(() => {
            if (!alive) return
            set(['idle', 'idle', 'idle', 'idle', 'idle'])
            step = 0
            t = setTimeout(tick, 400)
          }, 1500)
        }
      }, STEP_MS)
    }

    t = setTimeout(tick, 700)
    return () => { alive = false; clearTimeout(t) }
  }, [active])

  return s
}

// ─── Shared status badges ────────────────────────────────────────────────────
function RunningBadge({ on }: { on: boolean }) {
  return (
    <div className={`absolute right-0 flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0'}`}>
      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="4.5" stroke="#D1D3D6" />
        <path stroke="#5C5E63" strokeLinecap="round" d="M6 10.5a4.5 4.5 0 0 0 0-9" />
      </svg>
      <span className="text-tertiary-foreground text-xs">Running</span>
    </div>
  )
}

function CompletedBadge({ on }: { on: boolean }) {
  return (
    <div className={`absolute right-0 flex items-center gap-x-1 rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] px-[5px] py-px transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
        <path stroke="#0B935D" strokeLinecap="round" strokeLinejoin="round" d="M3 5.7 3.7 7c.5.7.7 1 1 1.2h.8c.3-.1.5-.5 1-1.2L9 3" />
      </svg>
      <span className="text-[#0B935D] text-xs">Completed</span>
    </div>
  )
}

// ─── Connection dot (blue → green on complete) ────────────────────────────────
function ConnDot({ cls, done }: { cls: string; done: boolean }) {
  return (
    <svg className={`absolute ${cls}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="4.8" fill="#fff" strokeWidth="1" className="stroke-blue-500" />
      <circle cx="6" cy="6" r="4.8" fill="#fff" strokeWidth="1" className={`stroke-green-500 transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-0'}`} />
    </svg>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

/** Card 1 — HL7 admission trigger (blue) */
const IconHL7 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 22 22">
    <rect width="20" height="20" x="1" y="1" fill="#E5EEFF" rx="6" />
    <path stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round"
      d="M7 7h8M7 11h8M7 15h5" />
    <path stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
      d="M14 13v4l2-1 2 1v-4" />
    <rect width="20" height="20" x="1" y="1" stroke="#D6E5FF" rx="6" />
  </svg>
)

/** Card 2 — Condition / eligibility check (yellow) — same as Attio */
const IconCondition = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect width="19" height="19" x=".5" y=".5" fill="#FFF3CC" rx="5.5" />
    <path stroke="#F5B900" strokeLinecap="round" strokeLinejoin="round"
      d="M7 14.7v-4.5c0-.9.7-1.5 1.5-1.5v0c.8 0 1.5-.7 1.5-1.5V5.3m-3 9.4L8.7 13M7 14.7 5.3 13M13 14.7v-4.5c0-.9-.7-1.5-1.5-1.5v0c-.8 0-1.5-.7-1.5-1.5V5.3m3 9.4L11.3 13m1.7 1.7 1.7-1.7" />
    <rect width="19" height="19" x=".5" y=".5" stroke="#FFEBAD" rx="5.5" />
  </svg>
)

/** Card 3 — Slack (exact from Attio) */
const IconSlack = (
  <svg className="rounded-[6px] border border-subtle-stroke" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
    <path fill="#f5bc00" d="M134.3 151.7c0 9.5 7.8 17.3 17.4 17.3H195c9.5 0 17.3-7.8 17.3-17.3 0-9.6-7.8-17.4-17.3-17.4h-43.3c-9.6 0-17.4 7.8-17.4 17.4zM134.3 177.7V195a17.4 17.4 0 0 0 34.7 0c0-9.5-7.8-17.3-17.3-17.3z" />
    <path fill="#f55376" d="M108.3 134.3c-9.5 0-17.3 7.8-17.3 17.4V195c0 9.5 7.8 17.3 17.3 17.3 9.6 0 17.4-7.8 17.4-17.3v-43.3c0-9.6-7.8-17.4-17.4-17.4zM82.3 134.3H65a17.4 17.4 0 0 0 0 34.7c9.5 0 17.3-7.8 17.3-17.3z" />
    <path fill="#00b3d7" d="M125.7 108.3c0-9.5-7.8-17.3-17.4-17.3H65c-9.5 0-17.3 7.8-17.3 17.3 0 9.6 7.8 17.4 17.3 17.4h43.3c9.6 0 17.4-7.8 17.4-17.4zM125.7 82.3V65A17.4 17.4 0 0 0 91 65c0 9.5 7.8 17.3 17.3 17.3z" />
    <path fill="#00b569" d="M151.7 125.7c9.5 0 17.3-7.8 17.3-17.4V65c0-9.5-7.8-17.3-17.3-17.3-9.6 0-17.4 7.8-17.4 17.3v43.3c0 9.6 7.8 17.4 17.4 17.4zM177.7 125.7H195a17.4 17.4 0 0 0 0-34.7c-9.5 0-17.3 7.8-17.3 17.3z" />
  </svg>
)

/** Card 4 — Epic EHR routing (purple brand color matching Outreach) */
const IconEHR = (
  <svg className="rounded-[6px] border border-subtle-stroke" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect width="20" height="20" fill="#EDE9FE" rx="5.5" />
    <path stroke="#6D28D9" strokeLinecap="round" strokeLinejoin="round"
      d="M5 7h10M5 10h6M5 13h4M13 11v5l2-1 2 1v-5" />
    <rect width="19" height="19" x=".5" y=".5" stroke="#DDD6FE" rx="5" />
  </svg>
)

/** Card 5 — Care queue / follow-up (same purple style) */
const IconQueue = (
  <svg className="rounded-[6px] border border-subtle-stroke" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect width="20" height="20" fill="#EDE9FE" rx="5.5" />
    <path stroke="#6D28D9" strokeLinecap="round" strokeLinejoin="round"
      d="M5 7h10M5 10.5h7M5 14h5" />
    <circle cx="14.5" cy="13.5" r="2.5" stroke="#6D28D9" strokeLinecap="round" />
    <path stroke="#6D28D9" strokeLinecap="round" d="m13.5 13.5.7.7 1.3-1.3" />
    <rect width="19" height="19" x=".5" y=".5" stroke="#DDD6FE" rx="5" />
  </svg>
)

// ─── Card component ───────────────────────────────────────────────────────────
interface CardProps {
  s: CS
  icon: React.ReactNode
  title: string
  tag: string
  desc: string
  /** Tailwind grid-placement classes (mobile + lg + xl) */
  grid: string
  /** Connection dot position class string */
  dotCls: string
  /** Optional outer rounding override (card 1 only) */
  outerRound?: string
  /** Optional inner rounding override (card 1 only) */
  innerRound?: string
  /** Visibility/display class (card 5 is hidden on mobile) */
  display?: string
  /** Show the Trigger tab above (card 1 only) */
  trigger?: boolean
  delay: number
}

function WCard({ s, icon, title, tag, desc, grid, dotCls, outerRound = '', innerRound = 'rounded-[11px]', display = 'flex', trigger = false, delay }: CardProps) {
  const done = s === 'completed'
  return (
    <motion.div
      className={`relative items-center justify-center rounded-xl bg-surface shadow-sm row-span-3 ${outerRound} ${grid} ${display}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: EASE }}
    >
      <RunningBadge on={s === 'running'} />
      <CompletedBadge on={done} />

      {/* Inner card (1px inset = border effect via bg-surface outer) */}
      <div className={`relative h-[calc(100%-2px)] w-[calc(100%-2px)] ${innerRound} bg-primary-background p-[11px]`}>
        <div className="flex gap-x-1.5 border-b border-subtle-stroke pb-[11px]">
          {icon}
          <span className="flex-1 truncate text-primary-foreground text-sm tracking-[-0.3px]">{title}</span>
          <div className="justify-self-end rounded-lg border border-subtle-stroke bg-surface-subtle px-[6px] py-px text-accent-foreground text-xs">{tag}</div>
        </div>
        <p className="mt-2 truncate text-black-800 text-xs">{desc}</p>
      </div>

      <ConnDot cls={dotCls} done={done} />

      {/* Trigger tab — card 1 only */}
      {trigger && (
        <div className="absolute left-0 flex items-center gap-x-1 rounded-t-[10px] border-x border-t border-weak-stroke bg-secondary-background px-[7.5px] py-[3.5px] text-accent-foreground text-xs" style={{ top: '-25px' }}>
          <svg className="animate-pulse" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r=".8" fill="#75777C" />
            <circle cx="6" cy="6" r="5" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
            <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
          </svg>
          <span>Trigger</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Connector SVGs ───────────────────────────────────────────────────────────
// Each connector is a grid-placed absolute div containing an SVG arrow/line.

/** Vertical arrow (down) — 12×70 */
function ConnV({ id, gridCls }: { id: string; gridCls: string }) {
  return (
    <div className={`absolute h-full w-full ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1/2 -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="12" height="70" fill="none" viewBox="0 0 12 70">
        <path stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 64 5 5 5-5M6 1v67" />
        <path stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 64 5 5 5-5M6 1v67" opacity="1" />
        <path stroke={`url(#${id})`} strokeLinecap="round" strokeWidth="1.5" d="m1 64 5 5 5-5M6 1v67" />
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="-180" x2="-60" y1="-45" y2="-90">
            <stop stopColor="#0FC27B" stopOpacity="0" />
            <stop stopColor="#0FC27B" />
            <stop offset="1" stopColor="#0FC27B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/** Horizontal arrow (right) — 100%×12 */
function ConnH({ id, gridCls }: { id: string; gridCls: string }) {
  return (
    <div className={`absolute h-full w-full ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="translate-y-1" xmlns="http://www.w3.org/2000/svg" width="100%" height="12" fill="none" viewBox="0 0 62 12" preserveAspectRatio="none">
        <path stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m56 11 5-5-5-5M1 6h59" />
        <path stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m56 11 5-5-5-5M1 6h59" opacity="1" />
        <path stroke={`url(#${id})`} strokeLinecap="round" strokeWidth="1.5" d="m56 11 5-5-5-5M1 6h59" />
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="180" x2="90" y1="-25" y2="-50">
            <stop stopColor="#0FC27B" stopOpacity="0" />
            <stop stopColor="#0FC27B" />
            <stop offset="1" stopColor="#0FC27B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/** L-shaped connector going right-then-down (tablet variant, viewBox 192×131) */
function ConnLRight({ id, gridCls, h }: { id: string; gridCls: string; h: string }) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1.5 -translate-y-4" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 192 131" preserveAspectRatio="none">
        <path stroke="#D1D3D6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m1 125 5 5 5-5M191 1v44c0 11-9 20-20 20H26C15 65 6 74 6 85v44" />
        <path stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 125 5 5 5-5M191 1v44c0 11-9 20-20 20H26C15 65 6 74 6 85v44" opacity="1" />
        <path stroke={`url(#${id})`} strokeLinecap="round" strokeWidth="1.5" d="m1 125 5 5 5-5M191 1v44c0 11-9 20-20 20H26C15 65 6 74 6 85v44" />
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="-384" x2="-192" y1="-65.5" y2="-131">
            <stop stopColor="#0FC27B" stopOpacity="0" />
            <stop stopColor="#0FC27B" />
            <stop offset="10" stopColor="#0FC27B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/** L-shaped connector going left-then-down (xl Enterprise path, viewBox 199×130) — with label */
function ConnLLeft({ id, gridCls, h, label, labelStyle }: { id: string; gridCls: string; h: string; label: string; labelStyle?: React.CSSProperties }) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1.5 -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 199 130" preserveAspectRatio="none">
        <path stroke="#D1D3D6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m1 124 5 5 5-5M198 1v43.5c0 11-9 20-20 20H26c-11 0-20 9-20 20V128" />
        <path stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 124 5 5 5-5M198 1v43.5c0 11-9 20-20 20H26c-11 0-20 9-20 20V128" opacity="1" />
        <path stroke={`url(#${id})`} strokeLinecap="round" strokeWidth="1.5" d="m1 124 5 5 5-5M198 1v43.5c0 11-9 20-20 20H26c-11 0-20 9-20 20V128" />
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="-398" x2="-199" y1="-65" y2="-130">
            <stop stopColor="#0FC27B" stopOpacity="0" />
            <stop stopColor="#0FC27B" />
            <stop offset="1" stopColor="#0FC27B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className="truncate rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px text-tertiary-foreground text-xs absolute left-1/2 top-1/2 -translate-x-[calc(50%+4px)] -translate-y-[calc(50%+11px)]"
        style={labelStyle}
      >
        {label}
      </span>
    </div>
  )
}

/** L-shaped connector going right-then-down (xl SMB path, viewBox 199×130) — with label */
function ConnLRightXL({ gridCls, h, label }: { gridCls: string; h: string; label: string }) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-px -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 199 130" preserveAspectRatio="none">
        <path stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" d="m188 124 5 5 5-5M1 1v43.5c0 11 9 20 20 20h152c11 0 20 9 20 20V128" />
      </svg>
      <span className="truncate rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px text-tertiary-foreground text-xs absolute left-1/2 top-1/2 -translate-x-[calc(50%+4px)] -translate-y-[calc(50%+11px)]">
        {label}
      </span>
    </div>
  )
}

/** L-shaped connector going right-then-down (lg SMB, viewBox 192×131) — with label */
function ConnLRightLabel({ gridCls, h, label }: { gridCls: string; h: string; label: string }) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-px -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 192 131" preserveAspectRatio="none">
        <path stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" d="m181 125 5 5 5-5M1 1v44c0 11 9 20 20 20h145c11 0 20 9 20 20v44" />
      </svg>
      <span className="truncate rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px text-tertiary-foreground text-xs absolute left-1/2 top-1/2 -translate-x-[calc(50%+4px)] -translate-y-[calc(50%+11px)]">
        {label}
      </span>
    </div>
  )
}

/** Mobile vertical connector (card 3→4) with label */
function ConnVMobile({ gridCls }: { gridCls: string }) {
  return (
    <div className={`absolute ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1/2 -translate-y-[11px] h-[101px] w-3" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 12 101" preserveAspectRatio="none">
        <path stroke="#D1D3D6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M6 1v98M1 95l5 5 5-5" />
        <path stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 1v98M1 95l5 5 5-5" opacity="1" />
        <path stroke="url(#puls-3-mobile)" strokeLinecap="round" strokeWidth="1.5" d="M6 1v98M1 95l5 5 5-5" />
        <defs>
          <linearGradient id="puls-3-mobile" gradientUnits="userSpaceOnUse" x1="-120" x2="-60" y1="-25.25" y2="-50.5">
            <stop stopColor="#0FC27B" stopOpacity="0" />
            <stop stopColor="#0FC27B" />
            <stop offset="1" stopColor="#0FC27B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// ─── Workflow grid ─────────────────────────────────────────────────────────────
function WorkflowGrid({ statuses }: { statuses: CS[] }) {
  const s = statuses  // alias

  return (
    <div
      className="relative isolate grid grid-cols-[repeat(16,1fr)] grid-rows-[repeat(20,20px)] gap-y-2.5 lg:grid-cols-[repeat(42,1fr)] xl:grid-cols-[repeat(32,1fr)] col-span-full lg:col-span-10 lg:col-start-[2] xl:col-span-6 xl:col-start-[7]"
    >
      {/* ── Card 1: ADT Trigger ── */}
      <WCard
        s={s[0]!}
        icon={IconHL7}
        title="ADT^A01 — Patient admitted"
        tag="HL7"
        desc="Trigger when a patient admission event is received."
        grid="col-start-[2] col-end-[16] row-start-[1] lg:col-start-[4] lg:col-end-[20] lg:row-start-[1] xl:col-start-[10] xl:col-end-[24]"
        outerRound="rounded-b-xl rounded-tl-none rounded-tr-xl"
        innerRound="rounded-b-[11px] rounded-tl-none rounded-tr-[11px]"
        dotCls="top-auto bottom-0 translate-y-[5.5px] lg:top-1/2 lg:right-0 lg:translate-x-[5.5px] lg:-translate-y-[5.5px] xl:top-auto xl:bottom-0 xl:left-1/2 xl:-translate-x-1/2 xl:translate-y-[5.5px]"
        trigger
        delay={0.3}
      />

      {/* ── Card 2: Eligibility check ── */}
      <WCard
        s={s[1]!}
        icon={IconCondition}
        title="Payer in network?"
        tag="Condition"
        desc="Continue if the patient's payer is in-network."
        grid="col-start-[2] col-end-[16] row-start-[6] lg:col-start-[24] lg:col-end-[40] lg:row-start-[1] xl:col-start-[10] xl:col-end-[24] xl:row-start-[6]"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
        delay={0.4}
      />

      {/* ── Card 3: Slack alert ── */}
      <WCard
        s={s[2]!}
        icon={IconSlack}
        title="Alert care team via Slack"
        tag="Slack"
        desc="Send patient summary and action buttons to Slack."
        grid="col-start-[2] col-end-[16] row-start-[11] lg:col-start-[14] lg:col-end-[30] lg:row-start-[7] xl:col-start-[10] xl:col-end-[24] xl:row-start-[11]"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
        delay={0.5}
      />

      {/* ── Card 4: Epic EHR routing ── */}
      <WCard
        s={s[3]!}
        icon={IconEHR}
        title="Route to Epic EHR"
        tag="Epic"
        desc="Send HL7 message to Epic for downstream processing."
        grid="col-start-[2] col-end-[16] row-start-[17] lg:col-start-[4] lg:col-end-[20] lg:row-start-[14] xl:col-start-[1] xl:col-end-[15] xl:row-start-[18] row-span-3"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
        delay={0.6}
      />

      {/* ── Card 5: Care queue (hidden mobile) ── */}
      <WCard
        s={s[4]!}
        icon={IconQueue}
        title="Add to care queue"
        tag="Queue"
        desc="Enqueue patient for priority care follow-up."
        grid="col-start-[2] col-end-[16] lg:col-start-[24] lg:col-end-[40] lg:row-start-[14] xl:col-start-[19] xl:col-end-[33] xl:row-start-[18]"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
        display="hidden lg:flex"
        delay={0.65}
      />

      {/* ─── Connectors ─────────────────────────────────────────────────────── */}

      {/* Vertical: card1→card2 (mobile + xl) */}
      <ConnV id="puls-1" gridCls="col-start-[9] row-start-[4] block lg:hidden xl:col-start-[17] xl:block" />

      {/* Horizontal: card1→card2 (lg only) */}
      <ConnH id="puls-1-tablet" gridCls="col-start-[20] col-end-[24] row-span-1 row-start-[2] hidden lg:block xl:hidden" />

      {/* Vertical: card2→card3 (mobile + xl) */}
      <ConnV id="puls-2" gridCls="col-start-[9] row-start-[9] block lg:hidden xl:col-start-[17] xl:block" />

      {/* L-right: card2→card3 (lg only) */}
      <ConnLRight id="puls-2-tablet" gridCls="col-start-[22] col-end-[32] row-start-[4] row-end-[7] hidden lg:block xl:hidden" h="h-[calc(100%+25px)]" />

      {/* L-right → left branch: card3→card5 (xl) — OON label */}
      <ConnLRightXL gridCls="col-start-[17] col-end-[26] row-start-[14] row-end-[18] hidden xl:block" h="h-[calc(100%+20px)]" label="OON patient" />

      {/* L-right → left branch: card3→card5 (lg) */}
      <ConnLRightLabel gridCls="col-start-[22] col-end-[32] row-start-[10] row-end-[14] hidden lg:block xl:hidden" h="h-[calc(100%+20px)]" label="OON patient" />

      {/* L-left branch: card3→card4 (xl) — In-network label (green) */}
      <ConnLLeft
        id="puls-3"
        gridCls="col-start-[8] col-end-[17] row-start-[14] row-end-[18] hidden xl:block"
        h="h-[calc(100%+20px)]"
        label="In-network"
        labelStyle={{ backgroundColor: 'rgb(221,249,228)', borderColor: 'rgb(199,244,211)', color: 'rgb(11,147,93)' }}
      />

      {/* L-left branch: card3→card4 (lg) — In-network label (green) */}
      <ConnLLeft
        id="puls-3-tablet"
        gridCls="col-start-[12] col-end-[22] row-start-[10] row-end-[14] hidden lg:block xl:hidden"
        h="h-[calc(100%+20px)]"
        label="In-network"
        labelStyle={{ backgroundColor: 'rgb(221,249,228)', borderColor: 'rgb(199,244,211)', color: 'rgb(11,147,93)' }}
      />

      {/* Vertical: card3→card4 (mobile only) */}
      <ConnVMobile gridCls="col-start-[9] row-start-[14] block lg:hidden" />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function WorkflowsHeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const statuses = useCardStatuses(isInView)

  return (
    <section ref={ref}>
      {/* Border separator (matches attio.com) */}
      <div className="border-t border-subtle-stroke">
        {/* Padding container — top only, no min-h, no items-center */}
        <div className="relative pt-10 lg:pt-16 xl:pt-35">
          {/* Main 12-col grid — gap-y handles stacking space on mobile/lg */}
          <div className="container relative grid w-full grid-cols-12 gap-x-6 gap-y-30 lg:gap-y-38">

          {/* ── Left: text content ──────────────────────────────────── */}
          <div className="col-span-full flex flex-col items-center lg:col-span-8 lg:col-start-[3] xl:col-span-4 xl:col-start-[2] xl:mt-[18px] xl:items-start">

            {/* Badge — "New" pill + label + chevron */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
            >
              <Link
                href="/platform/workflows"
                className="group inline-flex rounded-[13px] border border-subtle-stroke bg-primary-background font-medium text-[13px]/[1.4em] transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent-stroke hover:ring-[3px] hover:ring-blue-300 active:ring-1"
              >
                <div className="flex items-center gap-1.5 p-0.5 pr-2">
                  <span className="rounded-[10px] bg-gradient-to-b from-black-600 to-black-100 py-[3px] pr-2 pl-2.5 align-middle text-white-400">New</span>
                  <div className="flex items-center">
                    Automations library
                    <svg
                      className="-rotate-90 transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-focus:translate-x-[3px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.h2
              className="mt-6 text-center text-heading-responsive-lg text-primary-foreground xl:text-left tracking-[-.015em] text-nowrap"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
            >
              Automate. Iterate.
              <br/>
              Accelerate.
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 text-center text-secondary-foreground text-xl lg:max-w-lg xl:max-w-2xl xl:text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.21, ease: EASE }}
            >
              Workflows turns your GTM strategies into dynamic engines for revenue growth.
            </motion.p>

            <motion.div
              className="mt-6 flex w-full max-w-[345px] items-center justify-center gap-x-2.5 gap-y-2 max-md:flex-col max-md:items-center xl:justify-start"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28, ease: EASE }}
            >
              {/* Desktop buttons */}
              <Link
                href="/signup"
                className="button-primary relative inline-flex h-9 cursor-pointer items-center justify-center text-nowrap rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
              >
                Start for free
              </Link>
              <Link
                href="/contact"
                className="button-outline border relative inline-flex h-9 cursor-pointer items-center justify-center text-nowrap rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
              >
                Talk to sales
              </Link>
              {/* Mobile: full-width CTA + ghost */}
              <Link
                href="/signup"
                className="button-primary relative inline-flex w-full cursor-pointer items-center justify-center text-nowrap rounded-xl px-3.5 text-base h-[46px] md:hidden"
              >
                Start for free
              </Link>
              <Link
                href="/contact"
                className="button-ghost group relative inline-flex cursor-pointer items-center justify-center gap-x-1 self-center text-nowrap rounded-xl px-3.5 text-base h-[46px] md:hidden"
              >
                <span>Talk to sales</span>
                <svg
                  className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ── Right: workflow grid ─────────────────────────────────── */}
          <WorkflowGrid statuses={statuses} />

        </div>
        </div>
      </div>
    </section>
  )
}
