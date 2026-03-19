'use client'

/**
 * WorkflowsHeroSection
 *
 * Hero for /platform/workflows.
 *
 * Animation sequence (top to bottom):
 *  1. Card 0 (trigger) always visible.
 *  2. Connector 0 draws + card 1 fades in → shows "Running" badge.
 *  3. Card 1 → "Completed" + connector 1 draws + card 2 fades in → "Running".
 *  4. Card 2 → "Completed" + connectors 2+3 draw + cards 3+4 fade in → "Running".
 *  5. Cards 3+4 → "Completed".
 *  6. Reset (cards 1-4 snap out) → repeat.
 *
 * Badge bug fix: badges are rendered AFTER the inner content div in the DOM
 * and given z-10, so they always appear above the white inner card.
 */

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { DemoRequestForm } from '../ui/DemoRequestForm'
import { TalkToSalesDialog } from '../ui/TalkToSalesDialog'

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE    = [0.2, 0, 0, 1] as const
const STEP    = 2000   // ms for card border animation (running → completed)
const CONN_MS = 700    // ms for each connector line to draw

// ─── Types ────────────────────────────────────────────────────────────────────
type CS = 'idle' | 'running' | 'completed'

interface AnimState {
  c: CS[]       // card statuses [0..4]
  l: boolean[]  // connector drawn? [0..3]
}

// All cards always visible — only border animation state changes
const IDLE: AnimState = {
  c: ['idle', 'idle', 'idle', 'idle', 'idle'],
  l: [false,  false,  false,  false],
}

// ─── Animation hook ───────────────────────────────────────────────────────────
function useAnim(active: boolean): AnimState {
  const [st, set] = useState<AnimState>(IDLE)

  useEffect(() => {
    if (!active) return
    let alive = true
    const ids: ReturnType<typeof setTimeout>[] = []
    const at = (ms: number, fn: () => void) => {
      ids.push(setTimeout(() => { if (alive) fn() }, ms))
    }
    const C = CONN_MS
    const D = 500  // initial delay

    at(D,                         () => set({ c: ['running',   'idle',      'idle',      'idle',      'idle'], l: [false, false, false, false] }))
    at(D + STEP,                  () => set({ c: ['completed', 'idle',      'idle',      'idle',      'idle'], l: [true,  false, false, false] }))
    at(D + STEP + C,              () => set({ c: ['completed', 'running',   'idle',      'idle',      'idle'], l: [true,  false, false, false] }))
    at(D + STEP * 2 + C,          () => set({ c: ['completed', 'completed', 'idle',      'idle',      'idle'], l: [true,  true,  false, false] }))
    at(D + STEP * 2 + C * 2,      () => set({ c: ['completed', 'completed', 'running',   'idle',      'idle'], l: [true,  true,  false, false] }))
    at(D + STEP * 3 + C * 2,      () => set({ c: ['completed', 'completed', 'completed', 'idle',      'idle'], l: [true,  true,  true,  false] }))
    at(D + STEP * 3 + C * 3,      () => set({ c: ['completed', 'completed', 'completed', 'running',   'idle'], l: [true,  true,  true,  false] }))
    at(D + STEP * 4 + C * 3,      () => set({ c: ['completed', 'completed', 'completed', 'completed', 'idle'], l: [true,  true,  true,  false] }))

    return () => { alive = false; ids.forEach(clearTimeout) }
  }, [active])

  return st
}

// ─── Running badge ─────────────────────────────────────────────────────────────
// Mirrors attio @keyframes running:
//   0%      → opacity 0, y 0   (inside card top-right)
//   15%→85% → opacity 1, y -28 (floating above card)
//   100%    → opacity 0, y 0   (slides back in)
function RunningBadge({ on }: { on: boolean }) {
  return (
    <motion.div
      className="absolute top-0 right-0 flex items-center gap-x-1 rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px"
      initial={false}
      animate={
        on
          ? { opacity: [0, 1, 1, 0], y: [0, -28, -28, 0] }
          : { opacity: 0, y: 0 }
      }
      transition={
        on
          ? { duration: STEP / 1000, times: [0, 0.15, 0.85, 1], ease: 'easeInOut' }
          : { duration: 0 }
      }
    >
      <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="4.5" stroke="#D1D3D6" />
        <path stroke="#5C5E63" strokeLinecap="round" d="M6 10.5a4.5 4.5 0 0 0 0-9" />
      </svg>
      <span className="text-tertiary-foreground text-xs">Running</span>
    </motion.div>
  )
}

// ─── Completed badge ───────────────────────────────────────────────────────────
// Mirrors attio @keyframes completed:
//   0%→85% → opacity 0, y 0   (hidden at card top-right)
//   100%   → opacity 1, y -28  (floats above card, stays permanently)
function CompletedBadge({ on }: { on: boolean }) {
  return (
    <motion.div
      className="absolute top-0 right-0 flex items-center gap-x-1 rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] px-[5px] py-px"
      initial={false}
      animate={on ? { opacity: 1, y: -28 } : { opacity: 0, y: 0 }}
      transition={on ? { duration: 0.35, ease: 'easeOut' } : { duration: 0 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
        <path stroke="#0B935D" strokeLinecap="round" strokeLinejoin="round" d="M3 5.7 3.7 7c.5.7.7 1 1 1.2h.8c.3-.1.5-.5 1-1.2L9 3" />
      </svg>
      <span className="text-[#0B935D] text-xs">Completed</span>
    </motion.div>
  )
}

// ─── Connection dot ────────────────────────────────────────────────────────────
function ConnDot({ cls, done }: { cls: string; done: boolean }) {
  return (
    <svg className={`absolute ${cls}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="4.8" fill="#fff" strokeWidth="1" className="stroke-blue-500" />
      <circle
        cx="6" cy="6" r="4.8" fill="#fff" strokeWidth="1"
        className={`stroke-green-500 transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-0'}`}
      />
    </svg>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconHL7 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 22 22">
    <rect width="20" height="20" x="1" y="1" fill="#E5EEFF" rx="6" />
    <path stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round" d="M7 7h8M7 11h8M7 15h5" />
    <path stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" d="M14 13v4l2-1 2 1v-4" />
    <rect width="20" height="20" x="1" y="1" stroke="#D6E5FF" rx="6" />
  </svg>
)

const IconCondition = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect width="19" height="19" x=".5" y=".5" fill="#FFF3CC" rx="5.5" />
    <path stroke="#F5B900" strokeLinecap="round" strokeLinejoin="round"
      d="M7 14.7v-4.5c0-.9.7-1.5 1.5-1.5v0c.8 0 1.5-.7 1.5-1.5V5.3m-3 9.4L8.7 13M7 14.7 5.3 13M13 14.7v-4.5c0-.9-.7-1.5-1.5-1.5v0c-.8 0-1.5-.7-1.5-1.5V5.3m3 9.4L11.3 13m1.7 1.7 1.7-1.7" />
    <rect width="19" height="19" x=".5" y=".5" stroke="#FFEBAD" rx="5.5" />
  </svg>
)

const IconSlack = (
  <svg className="rounded-[6px] border border-subtle-stroke" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
    <path fill="#f5bc00" d="M134.3 151.7c0 9.5 7.8 17.3 17.4 17.3H195c9.5 0 17.3-7.8 17.3-17.3 0-9.6-7.8-17.4-17.3-17.4h-43.3c-9.6 0-17.4 7.8-17.4 17.4zM134.3 177.7V195a17.4 17.4 0 0 0 34.7 0c0-9.5-7.8-17.3-17.3-17.3z" />
    <path fill="#f55376" d="M108.3 134.3c-9.5 0-17.3 7.8-17.3 17.4V195c0 9.5 7.8 17.3 17.3 17.3 9.6 0 17.4-7.8 17.4-17.3v-43.3c0-9.6-7.8-17.4-17.4-17.4zM82.3 134.3H65a17.4 17.4 0 0 0 0 34.7c9.5 0 17.3-7.8 17.3-17.3z" />
    <path fill="#00b3d7" d="M125.7 108.3c0-9.5-7.8-17.3-17.4-17.3H65c-9.5 0-17.3 7.8-17.3 17.3 0 9.6 7.8 17.4 17.3 17.4h43.3c9.6 0 17.4-7.8 17.4-17.4zM125.7 82.3V65A17.4 17.4 0 0 0 91 65c0 9.5 7.8 17.3 17.3 17.3z" />
    <path fill="#00b569" d="M151.7 125.7c9.5 0 17.3-7.8 17.3-17.4V65c0-9.5-7.8-17.3-17.3-17.3-9.6 0-17.4 7.8-17.4 17.3v43.3c0 9.6 7.8 17.4 17.4 17.4zM177.7 125.7H195a17.4 17.4 0 0 0 0-34.7c-9.5 0-17.3 7.8-17.3 17.3z" />
  </svg>
)

const IconEHR = (
  <svg className="rounded-[6px] border border-subtle-stroke" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect width="20" height="20" fill="#EDE9FE" rx="5.5" />
    <path stroke="#6D28D9" strokeLinecap="round" strokeLinejoin="round" d="M5 7h10M5 10h6M5 13h4M13 11v5l2-1 2 1v-5" />
    <rect width="19" height="19" x=".5" y=".5" stroke="#DDD6FE" rx="5" />
  </svg>
)

const IconQueue = (
  <svg className="rounded-[6px] border border-subtle-stroke" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect width="20" height="20" fill="#EDE9FE" rx="5.5" />
    <path stroke="#6D28D9" strokeLinecap="round" strokeLinejoin="round" d="M5 7h10M5 10.5h7M5 14h5" />
    <circle cx="14.5" cy="13.5" r="2.5" stroke="#6D28D9" strokeLinecap="round" />
    <path stroke="#6D28D9" strokeLinecap="round" d="m13.5 13.5.7.7 1.3-1.3" />
    <rect width="19" height="19" x=".5" y=".5" stroke="#DDD6FE" rx="5" />
  </svg>
)

// ─── AnimLine — progressive draw via Framer Motion pathLength ─────────────────
function AnimLine({ d, drawn }: { d: string; drawn: boolean }) {
  return (
    <>
      <path d={d} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" fill="none" />
      <motion.path
        d={d}
        stroke="#0FC27B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        fill="none"
        initial={false}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={{ duration: drawn ? CONN_MS / 1000 : 0, ease: 'linear' }}
      />
    </>
  )
}

// ─── Connectors ───────────────────────────────────────────────────────────────

function ConnV({ drawn, gridCls }: { drawn: boolean; gridCls: string }) {
  return (
    <div className={`absolute h-full w-full ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1/2 -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="12" height="70" fill="none" viewBox="0 0 12 70">
        <AnimLine d="m1 64 5 5 5-5M6 1v67" drawn={drawn} />
      </svg>
    </div>
  )
}

function ConnH({ drawn, gridCls }: { drawn: boolean; gridCls: string }) {
  return (
    <div className={`absolute h-full w-full ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="translate-y-1" xmlns="http://www.w3.org/2000/svg" width="100%" height="12" fill="none" viewBox="0 0 62 12" preserveAspectRatio="none">
        <AnimLine d="m56 11 5-5-5-5M1 6h59" drawn={drawn} />
      </svg>
    </div>
  )
}

function ConnLRight({ drawn, gridCls, h }: { drawn: boolean; gridCls: string; h: string }) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1.5 -translate-y-4" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 192 131" preserveAspectRatio="none">
        <AnimLine d="m1 125 5 5 5-5M191 1v44c0 11-9 20-20 20H26C15 65 6 74 6 85v44" drawn={drawn} />
      </svg>
    </div>
  )
}

function ConnLLeft({
  drawn, gridCls, h, label, labelStyle,
}: {
  drawn: boolean; gridCls: string; h: string; label: string; labelStyle?: React.CSSProperties
}) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1.5 -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 199 130" preserveAspectRatio="none">
        <AnimLine d="m1 124 5 5 5-5M198 1v43.5c0 11-9 20-20 20H26c-11 0-20 9-20 20V128" drawn={drawn} />
      </svg>
      <span
        className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+4px)] -translate-y-[calc(50%+11px)] truncate rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px text-tertiary-foreground text-xs"
        style={labelStyle}
      >
        {label}
      </span>
    </div>
  )
}

function ConnLRightXL({ drawn, gridCls, h, label }: { drawn: boolean; gridCls: string; h: string; label: string }) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-px -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 199 130" preserveAspectRatio="none">
        <AnimLine d="m188 124 5 5 5-5M1 1v43.5c0 11 9 20 20 20h152c11 0 20 9 20 20V128" drawn={drawn} />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+4px)] -translate-y-[calc(50%+11px)] truncate rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px text-tertiary-foreground text-xs">
        {label}
      </span>
    </div>
  )
}

function ConnLRightLabel({ drawn, gridCls, h, label }: { drawn: boolean; gridCls: string; h: string; label: string }) {
  return (
    <div className={`absolute ${h} w-[calc(100%+7px)] ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-px -translate-y-[11px]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 192 131" preserveAspectRatio="none">
        <AnimLine d="m181 125 5 5 5-5M1 1v44c0 11 9 20 20 20h145c11 0 20 9 20 20v44" drawn={drawn} />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+4px)] -translate-y-[calc(50%+11px)] truncate rounded-lg border border-subtle-stroke bg-surface-subtle px-[5px] py-px text-tertiary-foreground text-xs">
        {label}
      </span>
    </div>
  )
}

function ConnVMobile({ drawn, gridCls }: { drawn: boolean; gridCls: string }) {
  return (
    <div className={`absolute ${gridCls}`} style={{ zIndex: -1 }}>
      <svg className="-translate-x-1/2 -translate-y-[11px] h-[101px] w-3" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 12 101" preserveAspectRatio="none">
        <AnimLine d="M6 1v98M1 95l5 5 5-5" drawn={drawn} />
      </svg>
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  s: CS
  icon: React.ReactNode
  title: string
  tag: string
  desc: string
  grid: string
  dotCls: string
  outerRound?: string
  innerRound?: string
  display?: string
  trigger?: boolean
}

function WCard({
  s, icon, title, tag, desc, grid, dotCls,
  outerRound = '',
  innerRound = 'rounded-[11px]',
  display = 'flex',
  trigger = false,
}: CardProps) {
  const done = s === 'completed'
  // Active = running or completed → sweeping conic-gradient border.
  // Fill-mode forwards keeps the border fully green after the sweep ends.
  const active = s !== 'idle'
  return (
    <div
      className={`relative ${display} items-center justify-center rounded-xl shadow-xs row-span-3 bg-surface ${active ? 'workflows-hero-card-anim' : ''} ${outerRound} ${grid}`}
      style={active ? { '--wf-dur': `${STEP}ms` } as React.CSSProperties : undefined}
    >
      {/* ── Badges — rendered BEFORE inner div (matches Attio DOM order), z-10 keeps them above */}
      <RunningBadge on={s === 'running'} />
      <CompletedBadge on={done} />

      {/* ── Inner white card ────────────────────────────────────────────────── */}
      <div className={`relative h-[calc(100%-2px)] w-[calc(100%-2px)] ${innerRound} bg-primary-background p-[11px]`}>
        <div className="flex gap-x-1.5 border-b border-subtle-stroke pb-[11px]">
          {icon}
          <span className="flex-1 truncate text-primary-foreground text-sm tracking-[-0.3px]">{title}</span>
          <div className="justify-self-end rounded-lg border border-subtle-stroke bg-surface-subtle px-[6px] py-px text-accent-foreground text-xs">{tag}</div>
        </div>
        <p className="mt-2 truncate text-black-800 text-xs">{desc}</p>
      </div>

      <ConnDot cls={dotCls} done={done} />

      {trigger && (
        <div
          className="absolute left-0 flex items-center gap-x-1 rounded-t-[10px] border-x border-t border-weak-stroke bg-secondary-background px-[7.5px] py-[3.5px] text-accent-foreground text-xs"
          style={{ top: '-25px' }}
        >
          <svg className="animate-pulse" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r=".8" fill="#75777C" />
            <circle cx="6" cy="6" r="5" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
            <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
          </svg>
          <span>Trigger</span>
        </div>
      )}
    </div>
  )
}

// ─── Workflow grid ─────────────────────────────────────────────────────────────
function WorkflowGrid({ st }: { st: AnimState }) {
  const { c, l } = st
  return (
    <div className="relative isolate grid grid-cols-[repeat(16,1fr)] grid-rows-[repeat(20,20px)] gap-y-2.5 lg:grid-cols-[repeat(42,1fr)] xl:grid-cols-[repeat(32,1fr)] col-span-full lg:col-span-10 lg:col-start-[2] xl:col-span-6 xl:col-start-[7]">

      {/* ── Cards ──────────────────────────────────────────────────────────── */}

      {/* Card 0 — Trigger */}
      <WCard
        s={c[0]!}
        icon={IconHL7}
        title="ADT^A01 — Patient admitted"
        tag="HL7"
        desc="Trigger when a patient admission event is received."
        grid="col-start-[2] col-end-[16] row-start-[1] lg:col-start-[4] lg:col-end-[20] lg:row-start-[1] xl:col-start-[10] xl:col-end-[24]"
        outerRound="rounded-b-xl rounded-tl-none rounded-tr-xl"
        innerRound="rounded-b-[11px] rounded-tl-none rounded-tr-[11px]"
        dotCls="top-auto bottom-0 translate-y-[5.5px] lg:top-1/2 lg:right-0 lg:translate-x-[5.5px] lg:-translate-y-[5.5px] xl:top-auto xl:bottom-0 xl:left-1/2 xl:-translate-x-1/2 xl:translate-y-[5.5px]"
        trigger
      />

      {/* Card 1 — Condition */}
      <WCard
        s={c[1]!}
        icon={IconCondition}
        title="Payer in network?"
        tag="Condition"
        desc="Continue if the patient's payer is in-network."
        grid="col-start-[2] col-end-[16] row-start-[6] lg:col-start-[24] lg:col-end-[40] lg:row-start-[1] xl:col-start-[10] xl:col-end-[24] xl:row-start-[6]"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
      />

      {/* Card 2 — Slack */}
      <WCard
        s={c[2]!}
        icon={IconSlack}
        title="Alert care team via Slack"
        tag="Slack"
        desc="Send patient summary and action buttons to Slack."
        grid="col-start-[2] col-end-[16] row-start-[11] lg:col-start-[14] lg:col-end-[30] lg:row-start-[7] xl:col-start-[10] xl:col-end-[24] xl:row-start-[11]"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
      />

      {/* Card 3 — Epic EHR */}
      <WCard
        s={c[3]!}
        icon={IconEHR}
        title="Route to Epic EHR"
        tag="Epic"
        desc="Send HL7 message to Epic for downstream processing."
        grid="col-start-[2] col-end-[16] row-start-[17] lg:col-start-[4] lg:col-end-[20] lg:row-start-[14] xl:col-start-[1] xl:col-end-[15] xl:row-start-[18] row-span-3"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
      />

      {/* Card 4 — Care queue (OON branch — always static, no animation) */}
      <WCard
        s="idle"
        icon={IconQueue}
        title="Add to care queue"
        tag="Queue"
        desc="Enqueue patient for priority care follow-up."
        grid="col-start-[2] col-end-[16] lg:col-start-[24] lg:col-end-[40] lg:row-start-[14] xl:col-start-[19] xl:col-end-[33] xl:row-start-[18]"
        dotCls="bottom-0 left-1/2 -translate-x-1/2 translate-y-[5.5px]"
        display="hidden lg:flex"
      />

      {/* ── Connectors ─────────────────────────────────────────────────────── */}

      {/* conn0: card0 → card1 | vertical (mobile + xl) */}
      <ConnV drawn={l[0]!} gridCls="col-start-[9] row-start-[4] block lg:hidden xl:col-start-[17] xl:block" />
      {/* conn0: card0 → card1 | horizontal (lg tablet) */}
      <ConnH drawn={l[0]!} gridCls="col-start-[20] col-end-[24] row-span-1 row-start-[2] hidden lg:block xl:hidden" />

      {/* conn1: card1 → card2 | vertical (mobile + xl) */}
      <ConnV drawn={l[1]!} gridCls="col-start-[9] row-start-[9] block lg:hidden xl:col-start-[17] xl:block" />
      {/* conn1: card1 → card2 | L-right (lg tablet) */}
      <ConnLRight drawn={l[1]!} gridCls="col-start-[22] col-end-[32] row-start-[4] row-end-[7] hidden lg:block xl:hidden" h="h-[calc(100%+25px)]" />

      {/* conn2: card2 → card3 "In-network" | L-left (xl) */}
      <ConnLLeft
        drawn={l[2]!}
        gridCls="col-start-[8] col-end-[17] row-start-[14] row-end-[18] hidden xl:block"
        h="h-[calc(100%+20px)]"
        label="In-network"
        labelStyle={{ backgroundColor: 'rgb(221,249,228)', borderColor: 'rgb(199,244,211)', color: 'rgb(11,147,93)' }}
      />
      {/* conn2: card2 → card3 "In-network" | L-left (lg tablet) */}
      <ConnLLeft
        drawn={l[2]!}
        gridCls="col-start-[12] col-end-[22] row-start-[10] row-end-[14] hidden lg:block xl:hidden"
        h="h-[calc(100%+20px)]"
        label="In-network"
        labelStyle={{ backgroundColor: 'rgb(221,249,228)', borderColor: 'rgb(199,244,211)', color: 'rgb(11,147,93)' }}
      />
      {/* conn2: card2 → card3 | vertical (mobile) */}
      <ConnVMobile drawn={l[2]!} gridCls="col-start-[9] row-start-[14] block lg:hidden" />

      {/* conn3: card2 → card4 "OON patient" | always static gray (no animation) */}
      <ConnLRightXL
        drawn={false}
        gridCls="col-start-[17] col-end-[26] row-start-[14] row-end-[18] hidden xl:block"
        h="h-[calc(100%+20px)]"
        label="OON patient"
      />
      <ConnLRightLabel
        drawn={false}
        gridCls="col-start-[22] col-end-[32] row-start-[10] row-end-[14] hidden lg:block xl:hidden"
        h="h-[calc(100%+20px)]"
        label="OON patient"
      />

    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function WorkflowsHeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const st = useAnim(isInView)

  return (
    <section ref={ref}>
      <div className="border-t border-subtle-stroke">
        <div className="relative pt-10 lg:pt-16 xl:pt-35">
          <div className="container relative grid w-full grid-cols-12 gap-x-6 gap-y-30 lg:gap-y-38">

            {/* ── Left: text content ──────────────────────────────────── */}
            <div className="col-span-full flex flex-col items-center lg:col-span-8 lg:col-start-[3] xl:col-span-4 xl:col-start-[2] xl:mt-[18px] xl:items-start">

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
                        width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden
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
                <br />
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
                <Link
                  href="/platform/workflows"
                  className="button-primary relative inline-flex h-9 cursor-pointer items-center justify-center text-nowrap rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
                >
                  Start for free
                </Link>
                <TalkToSalesDialog
                  source="workflows-hero"
                  className="button-outline border relative inline-flex h-9 cursor-pointer items-center justify-center text-nowrap rounded-[10px] px-3 text-sm max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
                />
                <div className='md:hidden w-full'>
                  <DemoRequestForm source='workflows' />
                </div>
              </motion.div>
            </div>

            {/* ── Right: workflow grid ─────────────────────────────────── */}
            <WorkflowGrid st={st} />

          </div>
        </div>
      </div>
    </section>
  )
}
