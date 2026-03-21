'use client'

/**
 * BentoIllustrationPipeline
 *
 * Pixel-perfect port of the Attio workflow canvas for HomeBentoSection
 * contentA, row 0 ("Automate everything").
 *
 * Layout: 20-column × 20px CSS grid.
 * Cards are pre-placed; SVG borders animate sequentially via pathLength.
 * Connector lines draw top-to-bottom. The "+" circle activates last.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'

// ─── Animation timings ────────────────────────────────────────────────────────

const T = {
  triggerBorder: { d: 0.00, t: 0.65 },
  conn1:         { d: 0.50, t: 0.45 },
  arrowMain:     { d: 0.93, t: 0.10 },
  switchBorder:  { d: 0.85, t: 0.65 },
  branches:      { d: 1.35, t: 0.45 },
  arrowBranch:   { d: 1.78, t: 0.10 },
  enrollBorder:  { d: 1.65, t: 0.65 },
  circleStem:    { d: 2.18, t: 0.20 },
  circleNode:    { d: 2.30, t: 0.35 },
}

// ─── Card border paths (start at midpoint of top edge → clockwise) ────────────

const B_TRIGGER = 'M 140 0.5 L 267.5 0.5 A 12 12 0 0 1 279.5 12 L 279.5 12.5 L 279.5 67.5 A 12 12 0 0 1 267.5 79.5 L 268 79.5 L 12.5 79.5 A 12 12 0 0 1 0.5 68 L 0.5 68.5 L 0.5 12 L 0.5 0.5 L 12.5 0.5 Z'
const B_SWITCH  = 'M 120 0.5 L 227.5 0.5 A 12 12 0 0 1 239.5 12 L 239.5 12.5 L 239.5 67.5 A 12 12 0 0 1 227.5 79.5 L 228 79.5 L 12.5 79.5 A 12 12 0 0 1 0.5 68 L 0.5 68.5 L 0.5 12 A 12 12 0 0 1 12.5 0.5 L 12.5 0.5 Z'
const B_ENROLL  = 'M 126 0.5 L 239.5 0.5 A 12 12 0 0 1 251.5 12 L 251.5 12.5 L 251.5 67.5 A 12 12 0 0 1 239.5 79.5 L 240 79.5 L 12.5 79.5 A 12 12 0 0 1 0.5 68 L 0.5 68.5 L 0.5 12 A 12 12 0 0 1 12.5 0.5 L 12.5 0.5 Z'

// ─── Connector paths ──────────────────────────────────────────────────────────

const C_MAIN   = 'M1 1 L0.999999 31 C0.999998 42.0457 9.9543 51 21 51 L81 51 C92.0457 51 101 59.9543 101 71 L101 101'
const C_UPSELL = 'M146 1 L146 31 C146 42.0457 137.046 51 126 51 L26 51 C14.9543 51 6 59.9543 6 71 L6 101'
const C_NURTU  = 'M1 1 L0.999999 31 C0.999998 42.0457 9.9543 51 21 51 L121 51 C132.046 51 141 59.9543 141 71 L141 101'

// ─── Shared drop-shadow ───────────────────────────────────────────────────────

const SHADOW = 'drop-shadow(0px 4px 4px rgba(24,39,75,0.04)) drop-shadow(0px 2px 4px rgba(24,39,75,0.02))'

// Small caption text (matches Attio's CSS-module caption class)
const CAP = 'text-[10px] leading-[14px] tracking-[-0.01em]'

// ─── AnimPath helper ──────────────────────────────────────────────────────────

function AnimPath({
  d, stroke, delay, dur, inView,
}: {
  d: string; stroke: string; delay: number; dur: number; inView: boolean
}): ReactNode {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{ duration: dur, delay, ease: [0.4, 0, 0.2, 1] }}
    />
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function DealIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="#E5EEFF" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#D6E5FF" />
      <path d="M5.5 7.9517L5.50003 12.0484C5.50004 13.1696 5.50004 13.7302 5.71803 14.158C5.90977 14.5343 6.21573 14.8403 6.59206 15.032C7.01988 15.25 7.57993 15.25 8.70004 15.25H11.3C12.4201 15.25 12.9802 15.25 13.408 15.032C13.7843 14.8403 14.0903 14.5343 14.282 14.158C14.5 13.7302 14.5 13.1701 14.5 12.05V7.75009C14.5 6.81824 14.5 6.35232 14.3478 5.98481C14.1448 5.49468 13.7554 5.10528 13.2652 4.9023C12.8977 4.7501 12.4318 4.75011 11.5 4.75014L8.69999 4.75014C7.57989 4.75014 7.01984 4.75014 6.59202 4.96813C6.21569 5.15988 5.90973 5.46584 5.71798 5.84217C5.5 6.26999 5.5 6.83055 5.5 7.95167Z" stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.0001 6.22015V7.0794" stroke="#407FF2" strokeLinecap="round" />
      <path d="M9.99988 11.3756V12.2349" stroke="#407FF2" strokeLinecap="round" />
      <path d="M8.48368 11.3766H10.6959C11.0036 11.3766 11.2986 11.2634 11.5162 11.062C11.7337 10.8606 11.8559 10.5874 11.8559 10.3025C11.8559 10.0177 11.7337 9.74449 11.5162 9.54307C11.2986 9.34165 11.0036 9.22849 10.6959 9.22849H9.30392C8.99627 9.22849 8.70122 9.11533 8.48368 8.9139C8.26613 8.71248 8.14392 8.43929 8.14392 8.15444C8.14392 7.86958 8.26613 7.59639 8.48368 7.39497C8.70122 7.19354 8.99627 7.08038 9.30392 7.08038H11.4847" stroke="#407FF2" strokeLinecap="round" />
      <path d="M5.50342 13.6747H14.5" stroke="#407FF2" />
    </svg>
  )
}

function SwitchIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="#E5EEFF" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#D6E5FF" />
      <path d="M7.00013 14.6667L7.00013 10.1666C7.00013 9.33822 7.6717 8.66666 8.50011 8.66666C9.32854 8.66666 10.0001 7.99507 10.0001 7.16664L10 5.33332M7.00013 14.6667L8.66689 12.9999M7.00013 14.6667L5.33337 12.9999" stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.9999 14.6667L12.9999 10.1666C12.9999 9.33822 12.3283 8.66666 11.4999 8.66666C10.6715 8.66666 9.99988 7.99507 9.99991 7.16664L9.99996 5.33332M12.9999 14.6667L11.3331 12.9999M12.9999 14.6667L14.6666 12.9999" stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EnrollIcon(): ReactNode {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" fill="#E5EEFF" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#D6E5FF" />
      <path d="M8.25 9.99991L6.40553 5.90108C6.27818 5.61809 6.58774 5.33769 6.85679 5.49232L14.7 9.99991M8.25 9.99991L6.40553 14.0987C6.27818 14.3817 6.58774 14.6621 6.85679 14.5075L14.7 9.99991M8.25 9.99991H14.7" stroke="#407FF2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Green badge (Triggered / Completed) ─────────────────────────────────────

function GreenBadge({ text }: { text: string }): ReactNode {
  return (
    <div className="absolute -top-6 right-0 flex">
      <div className={`${CAP} text-nowrap border px-1.5 py-px flex h-5 items-center justify-center gap-1 rounded-md border-[#C7F4D3] bg-[#DDF9E4] pr-1.5 pl-1`}>
        <svg width="12" height="12" fill="none">
          <path d="M3 5.727 3.742 6.9c.442.699.663 1.048.947 1.17a1 1 0 0 0 .778.007c.286-.118.512-.464.965-1.156L9 3" stroke="#0B935D" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className={`${CAP} text-[#0B935D]`}>{text}</p>
      </div>
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  borderPath: string
  circleCx: number
  borderDelay: number
  borderDur: number
  inView: boolean
  badge?: string
  triggerTab?: boolean
  icon: ReactNode
  title: string
  tag: string
  desc: string
  width: number
  animated?: boolean
}

function Card({
  borderPath, circleCx, borderDelay, borderDur, inView,
  badge, triggerTab, icon, title, tag, desc, width, animated = true,
}: CardProps): ReactNode {
  return (
    <div className="relative" style={{ filter: SHADOW, height: 80, width }}>

      {/* Trigger tab (above card, for the first card only) */}
      {triggerTab && (
        <div className="flex items-center gap-x-1 rounded-t-[10px] border-[#E6E7EA] border-x border-t bg-[#FBFBFB] pt-[3px] pr-2 pb-1 pl-[7px] absolute bottom-full left-0">
          <svg width="12" height="12" fill="none">
            <circle cx="6" cy="6" r=".75" fill="#75777C" />
            <circle cx="6" cy="6" r="5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium text-[#75777C] text-[12px] leading-4 tracking-normal">Trigger</span>
        </div>
      )}

      {/* Badge */}
      {badge && <GreenBadge text={badge} />}

      {/* Card SVG: white fill + gray border + animated green border + connection circle */}
      <svg className="isolate h-full w-full overflow-visible">
        {/* Static white-filled gray border */}
        <path d={borderPath} fill="white" stroke="#E6E7EA" strokeLinecap="round" strokeLinejoin="round" />
        {/* Animated green border */}
        {animated && (
          <AnimPath d={borderPath} stroke="#0FC27B" delay={borderDelay} dur={borderDur} inView={inView} />
        )}
        {/* Connection circle at bottom-center */}
        <circle
          cx={circleCx} cy="79.5" r="5"
          fill="white"
          stroke={animated ? '#0FC27B' : '#266DF0'}
          strokeWidth="1"
        />
      </svg>

      {/* Card content */}
      <div className="absolute inset-px flex flex-col px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            {icon}
            <p className="whitespace-nowrap font-medium text-[14px] leading-[20px] tracking-[-0.02em]">{title}</p>
          </div>
          <div className={`${CAP} inline-flex items-center text-nowrap rounded-lg border px-1.5 py-px gap-x-1 border-[#EEEFF1] bg-[#F4F5F6] text-[#5C5E63]`}>
            <span>{tag}</span>
          </div>
        </div>
        <hr className="mt-2.5 mb-auto border-[#E6E7EA]" />
        <p className={`${CAP} overflow-hidden text-ellipsis whitespace-nowrap text-[#9FA1A7]`}>{desc}</p>
      </div>

    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoIllustrationPipeline(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="pointer-events-none relative flex w-full select-none items-center justify-center overflow-hidden bg-primary-background md:min-h-[620px]"
      style={{ gridArea: 'contentA' }}
    >
      {/* ── Dot pattern background ───────────────────────────────────────────── */}
      <svg width="100%" height="100%" className="text-muted-strong-background absolute inset-0" aria-hidden>
        <defs>
          <pattern id="bento-dot-workflow" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-dot-workflow)" />
      </svg>

      {/* ── Workflow grid canvas ──────────────────────────────────────────────── */}
      {/*
       * 20 columns × 20px = 400px wide. Rows are auto-sized by content.
       * Grid items use col-start / row-start for positioning.
       * Elements overflow their grid cells (intentional — positions overlap).
       */}
      <div className="pointer-events-none relative top-[22px] left-[10px] grid scale-[85%] select-none grid-cols-[repeat(20,20px)] md:left-0 md:scale-100">

        {/* ── Connector: Trigger → Switch ────────────────────────────────────── */}
        <svg
          className="col-start-9 row-start-2 -ml-px"
          width="107" height="102" viewBox="0 0 107 102" fill="none"
        >
          {/* Gray base */}
          <path d={C_MAIN} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Animated green */}
          <AnimPath d={C_MAIN} stroke="#54D490" delay={T.conn1.d} dur={T.conn1.t} inView={inView} />
          {/* Arrowhead — gray */}
          <path d="M 101 101 L96 96"    stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 101 101 L 106 96"  stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arrowhead — animated green */}
          <AnimPath d="M 101 101 L96 96"   stroke="#0FC27B" delay={T.arrowMain.d} dur={T.arrowMain.t} inView={inView} />
          <AnimPath d="M 101 101 L 106 96" stroke="#0FC27B" delay={T.arrowMain.d} dur={T.arrowMain.t} inView={inView} />
        </svg>

        {/* ── Branch left: Switch → Left Enroll (Upsell) ────────────────────── */}
        <div className="relative col-span-7 col-start-7 row-start-4 -ml-[6px]">
          <svg width="147" height="102" viewBox="0 0 147 102" fill="none">
            <path d={C_UPSELL} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
            <AnimPath d={C_UPSELL} stroke="#54D490" delay={T.branches.d} dur={T.branches.t} inView={inView} />
            {/* Arrowhead — gray */}
            <path d="M 6 101 L 11 96" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 6 101 L1 96"   stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arrowhead — animated green */}
            <AnimPath d="M 6 101 L 11 96" stroke="#54D490" delay={T.arrowBranch.d} dur={T.arrowBranch.t} inView={inView} />
            <AnimPath d="M 6 101 L1 96"   stroke="#54D490" delay={T.arrowBranch.d} dur={T.arrowBranch.t} inView={inView} />
          </svg>
          {/* "Upsell" label pill */}
          <div className={`${CAP} inline-flex items-center text-nowrap rounded-lg border px-1.5 py-px absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-normal transition-colors duration-[375ms] ease-out border-[#54D490] bg-primary-background text-[#0B935D]`}>
            Upsell
          </div>
        </div>

        {/* ── Branch right: Switch → Right Enroll (Nurture, dimmed) ─────────── */}
        <div className="relative col-span-7 col-start-14 row-start-4 -ml-px opacity-50 transition-opacity duration-[375ms] ease-in">
          <svg width="147" height="102" viewBox="0 0 147 102" fill="none">
            <path d={C_NURTU} stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arrowhead — gray */}
            <path d="M136 96 L141 101 L146 96" stroke="#D1D3D6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* "Nurture" label pill */}
          <div className={`${CAP} inline-flex items-center text-nowrap rounded-lg border px-1.5 py-px absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-normal border-[#EEEFF1] bg-[#F4F5F6] text-[#5C5E63]`}>
            Nurture
          </div>
        </div>

        {/* ── "+" activation circle ─────────────────────────────────────────── */}
        <div className="col-span-4 col-start-7 row-start-8 translate-x-[calc(-50%-0.5px)]">
          <svg width="80" height="93" viewBox="0 0 80 93" fill="none">
            {/* Stem line from left enroll card bottom */}
            <AnimPath
              d="M40.5 1 L40.5 47"
              stroke="#E6E7EA"
              delay={T.circleStem.d}
              dur={T.circleStem.t}
              inView={inView}
            />
            {/* Circle node */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: T.circleNode.t, delay: T.circleNode.d }}
            >
              <rect x="26.5" y="47" width="28" height="28" rx="14" fill="#266DF0" opacity="0.5" />
              <rect x="27" y="47.5" width="27" height="27" rx="13.5" stroke="#232529" strokeOpacity="0.1" />
              <path d="M40.5 57.5L40.5 64.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M44 61L37 61"         stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Outer glow rings */}
              <circle cx="40" cy="61" r="32"      fill="#266DF0" opacity="0.05" />
              <circle cx="40" cy="61" r="21.1692" fill="#266DF0" opacity="0.15" />
            </motion.g>
          </svg>
        </div>

        {/* ── Trigger card ──────────────────────────────────────────────────── */}
        <div className="relative col-start-2">
          <Card
            borderPath={B_TRIGGER}
            circleCx={140}
            borderDelay={T.triggerBorder.d}
            borderDur={T.triggerBorder.t}
            inView={inView}
            badge="Triggered"
            triggerTab
            icon={<DealIcon />}
            title="When Deal updated"
            tag="Deals"
            desc="Trigger when a Deal's status is updated"
            width={280}
          />
        </div>

        {/* ── Switch card ───────────────────────────────────────────────────── */}
        <div className="relative col-start-8 row-start-3">
          <Card
            borderPath={B_SWITCH}
            circleCx={120}
            borderDelay={T.switchBorder.d}
            borderDur={T.switchBorder.t}
            inView={inView}
            badge="Completed"
            icon={<SwitchIcon />}
            title="Switch"
            tag="Condition"
            desc="Route to upsell or nurture"
            width={240}
          />
        </div>

        {/* ── Left Enroll card (active — Upsell path) ───────────────────────── */}
        <div className="relative col-span-2 col-start-1 row-start-7 -translate-x-1.5">
          <Card
            borderPath={B_ENROLL}
            circleCx={126}
            borderDelay={T.enrollBorder.d}
            borderDur={T.enrollBorder.t}
            inView={inView}
            badge="Completed"
            icon={<EnrollIcon />}
            title="Enroll in sequence"
            tag="Sequences"
            desc={'Enroll person in "Power user upsell"'}
            width={252}
          />
        </div>

        {/* ── Right Enroll card (dimmed — Nurture path) ─────────────────────── */}
        <div className="relative col-span-2 col-start-[14] row-start-7 translate-x-3.5 opacity-50 transition-opacity duration-[375ms] ease-in">
          <Card
            borderPath={B_ENROLL}
            circleCx={126}
            borderDelay={0}
            borderDur={0}
            inView={false}
            animated={false}
            icon={<EnrollIcon />}
            title="Enroll in sequence"
            tag="Sequences"
            desc={'Enroll person in "Nurture"'}
            width={252}
          />
        </div>

      </div>
    </div>
  )
}
