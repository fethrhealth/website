'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView, motion } from 'framer-motion'
import Image from 'next/image'
import type { ReactNode } from 'react'

// ─── Category label icons (14×14) ─────────────────────────────────────────────

function SalesIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1.5L12.5 4.5V9.5L7 12.5L1.5 9.5V4.5L7 1.5Z" stroke="#6F7988" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="7" cy="7" r="2" stroke="#6F7988" strokeWidth="1.1" />
    </svg>
  )
}

function EmailIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#6F7988" strokeWidth="1.1" />
      <path d="M1.5 5L7 8.5L12.5 5" stroke="#6F7988" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function DataIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <ellipse cx="7" cy="4" rx="4.5" ry="1.5" stroke="#6F7988" strokeWidth="1.1" />
      <path d="M2.5 4V7C2.5 7.83 4.57 8.5 7 8.5S11.5 7.83 11.5 7V4" stroke="#6F7988" strokeWidth="1.1" />
      <path d="M2.5 7V10C2.5 10.83 4.57 11.5 7 11.5S11.5 10.83 11.5 10V7" stroke="#6F7988" strokeWidth="1.1" />
    </svg>
  )
}

function SupportIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="#6F7988" strokeWidth="1.1" />
      <circle cx="7" cy="7" r="2" stroke="#6F7988" strokeWidth="1.1" />
      <path d="M7 1.5V5M7 9V12.5M1.5 7H5M9 7H12.5" stroke="#6F7988" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function BillingIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#6F7988" strokeWidth="1.1" />
      <path d="M1.5 6H12.5" stroke="#6F7988" strokeWidth="1.1" />
      <circle cx="4.5" cy="9" r="1" fill="#6F7988" />
    </svg>
  )
}

function ProductIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="#6F7988" strokeWidth="1.1" />
      <rect x="8" y="1.5" width="4.5" height="4.5" rx="1" stroke="#6F7988" strokeWidth="1.1" />
      <rect x="1.5" y="8" width="4.5" height="4.5" rx="1" stroke="#6F7988" strokeWidth="1.1" />
      <rect x="8" y="8" width="4.5" height="4.5" rx="1" stroke="#6F7988" strokeWidth="1.1" />
    </svg>
  )
}

// ─── Card entity icons (18×18, from /assets/icons/home/connect-data/) ─────────

const WorkspaceColourIcon = () => (
  <Image src="/assets/icons/home/connect-data/DashboardColourIcon.svg" alt="Workspace" width={18} height={18} />
)

const CompanyColourIcon = () => (
  <Image src="/assets/icons/home/connect-data/CompanyColourIcon.svg" alt="Company" width={18} height={18} />
)

const DealColourIcon = () => (
  <Image src="/assets/icons/home/connect-data/DollarDocColourIcon.svg" alt="Deal" width={18} height={18} />
)

// ─── Label chip ───────────────────────────────────────────────────────────────

function LabelChip({ icon, label }: { icon: ReactNode; label: string }): ReactNode {
  return (
    <div
      className="relative flex items-center justify-center gap-1.5 bg-white-100"
      style={{ height: 35, width: 143 }}
    >
      {icon}
      <p className="whitespace-nowrap font-medium text-[12px] leading-[14px] tracking-[-0.02em]">
        {label}
      </p>
    </div>
  )
}

// ─── Animated count-up ────────────────────────────────────────────────────────

function AnimatedCount({ to, inView }: { to: number; inView: boolean }): ReactNode {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) { setCount(0); return }
    const steps   = 40
    const dur     = 1200
    const stepVal = Math.ceil(to / steps)
    let current   = 0
    const id = setInterval(() => {
      current = Math.min(current + stepVal, to)
      setCount(current)
      if (current >= to) clearInterval(id)
    }, dur / steps)
    return () => clearInterval(id)
  }, [inView, to])

  return <>{count.toLocaleString()}</>
}

// ─── Data card ────────────────────────────────────────────────────────────────

function DataCard({
  icon, label, count, gridClass,
}: {
  icon: ReactNode
  label: string
  count: number
  gridClass: string
}): ReactNode {
  return (
    <div
      className={`relative flex w-[180px] flex-col gap-1.5 rounded-[12px] border border-[#E4E7EC] bg-[#FFFFFF] p-[9px] ${gridClass}`}
      style={{ filter: 'drop-shadow(rgba(24,39,75,0.04) 0px 4px 4px) drop-shadow(rgba(24,39,75,0.02) 0px 2px 4px)' }}
    >
      <div className="flex w-full items-center gap-1.5">
        {icon}
        <p className="text-[12px] leading-[16px] tracking-[-0.02em]">{label}</p>
        <div className="ml-auto rounded-[8px] border border-[#EEEFF1] bg-[#F4F5F6] px-1.5 py-0.5 font-medium text-[10px] leading-[14px] tracking-[-0.02em]">
          Standard
        </div>
      </div>
      <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
      </svg>
      <p className="flex items-baseline font-medium leading-3 tracking-[-0.02em]">
        <span className="text-[11px] text-black-300 tabular-nums">
          {count.toLocaleString()}
        </span>
        <span className="text-[10px] text-black-700 pl-1">Records</span>
      </p>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoIllustrationDataFlow(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })

  // One beam animates at a time — random line picked every 3 s
  const [activeLine, setActiveLine] = useState<number>(0)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveLine(prev => {
        let next: number
        do { next = Math.floor(Math.random() * 6) } while (next === prev)
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  // Hub absorbs beam 1.2 s after beam starts — triggers a 1 s glow pulse
  const [hubPulse, setHubPulse] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => setHubPulse(p => p + 1), 550)
    return () => clearTimeout(id)
  }, [activeLine])

  // Card counts — increment when outgoing beam arrives (after 1 s travel)
  const [cardCounts, setCardCounts] = useState({ workspace: 2900, company: 3128, deal: 5518 })

  // Outgoing connector pulses — alternate: 1 beam (left), 2 beams (center + right)
  const [outLeft,   setOutLeft]   = useState(0)
  const [outCenter, setOutCenter] = useState(0)
  const [outRight,  setOutRight]  = useState(0)

  useEffect(() => {
    if (hubPulse === 0) return
    const inc = () => 1

    // Pick 1 or 2 random targets from the 3 cards
    type Target = 'left' | 'center' | 'right'
    const all: Target[] = ['left', 'center', 'right']
    const shuffled = [...all].sort(() => Math.random() - 0.5)
    const chosen = shuffled.slice(0, Math.random() < 0.5 ? 1 : 2)

    // Wait for hub glow to peak before launching outgoing beams
    const beamId = setTimeout(() => {
      if (chosen.includes('left'))   setOutLeft(p => p + 1)
      if (chosen.includes('center')) setOutCenter(p => p + 1)
      if (chosen.includes('right'))  setOutRight(p => p + 1)
    }, 600)

    // Card count increments 1 s after beams start
    const countId = setTimeout(() => {
      setCardCounts(c => ({
        workspace: c.workspace + (chosen.includes('left')   ? inc() : 0),
        deal:      c.deal      + (chosen.includes('center') ? inc() : 0),
        company:   c.company   + (chosen.includes('right')  ? inc() : 0),
      }))
    }, 1600)

    return () => { clearTimeout(beamId); clearTimeout(countId) }
  }, [hubPulse])

  return (
    <div
      ref={ref}
      className="relative flex size-full items-center justify-center overflow-hidden bg-primary-background md:min-h-[620px]"
      style={{ gridArea: 'contentA' }}
    >
      {/* Dot pattern background */}
      <svg width="100%" height="100%" className="text-muted-strong-background absolute inset-0" aria-hidden>
        <defs>
          <pattern id="bento-flow-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bento-flow-dots)" />
      </svg>

      {/* White overlay — top half */}
      <div className="absolute inset-x-0 top-0 h-[calc(50%+12px)] bg-[#FFFFFF]" />

      {/* ── Scaled grid container ───────────────────────────────────────────── */}
      <div className="relative grid scale-[70%] grid-rows-[calc(50%+12px)_calc(50%-15px)] items-center justify-items-center md:scale-100 xl:scale-90 2xl:scale-100">

        {/* ── Row 1: white bg + SVG connectors + label chips ────────────────── */}
        <div className="relative size-full bg-[#FFFFFF]">

          {/* SVG connector paths — one beam active at a time, random every 3 s */}
          {/*
            Beam length = 40 px for all paths.
            Per-path: (x1,y1)=transparent tail, (x2,y2)=solid head follow the tip around corners.
            dashoffset: initial=40 (beam off-path before start), final=-(pathLength).
            When activeLine changes, old beam unmounts and new one mounts fresh — no repeat needed.
          */}
          <div className="absolute inset-0 z-20">

            {/* Path 0 — left bottom corner: down 71.5 → right 71.5 = 143 px */}
            <svg width="108" height="72" fill="transparent" className="absolute right-1/2 bottom-0 -translate-x-[0.5px]" aria-hidden>
              <defs>
                {activeLine === 0 && (
                  <motion.linearGradient id="bfv-b0" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[0.5,0.5,0.5,0.5,32,72], y1:[0,0,31.5,71.5,71.5,71.5], x2:[0.5,0.5,0.5,40.5,72,72], y2:[0.1,40,71.5,71.5,71.5,71.5] }}
                    transition={{ times:[0,0.22,0.39,0.61,0.78,1], duration:1.2, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              <path d="M0.5 0V71.5 H72" stroke="none" />
              {activeLine === 0 && (
                <motion.path d="M0.5 0V71.5 H72" stroke="url(#bfv-b0)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999" initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -143 }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                />
              )}
            </svg>

            {/* Path 1 — right S-curve: right 36 → down 108 → right 36 = 180 px */}
            <svg width="108" height="109" fill="none" className="absolute right-1/2" style={{ bottom: 36 }} aria-hidden>
              <defs>
                {activeLine === 1 && (
                  <motion.linearGradient id="bfv-b1" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[0,0,36,36,36,72], y1:[0.5,0.5,0.5,68.5,104.5,108.5], x2:[0,36,36,36,72,72], y2:[0.5,4.5,40.5,108.5,108.5,108.5] }}
                    transition={{ times:[0,0.18,0.35,0.66,0.82,1], duration:1.2, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              <path d="M0 0.5H36 V108.5 H72" stroke="none" />
              {activeLine === 1 && (
                <motion.path d="M0 0.5H36 V108.5 H72" stroke="url(#bfv-b1)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999" initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -180 }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                />
              )}
            </svg>

            {/* Path 2 — right vertical: right 72 → down 180 = 252 px */}
            <svg width="72" height="181" fill="none" className="absolute right-1/2" style={{ bottom: 36 }} aria-hidden>
              <defs>
                {activeLine === 2 && (
                  <motion.linearGradient id="bfv-b2" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[0,0,32,72,72,72], y1:[0.5,0.5,0.5,0.5,140.5,180.5], x2:[0,40,72,72,72,72], y2:[0.5,0.5,0.5,40.5,180.5,180.5] }}
                    transition={{ times:[0,0.14,0.25,0.38,0.86,1], duration:1.2, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              <path d="M0 0.5H72 V180.5" stroke="none" />
              {activeLine === 2 && (
                <motion.path d="M0 0.5H72 V180.5" stroke="url(#bfv-b2)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999" initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -252 }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                />
              )}
            </svg>

            {/* Path 3 — left vertical reversed: left 71.5 → down 179.5 = 251 px (starts top-right) */}
            <svg width="72" height="181" fill="none" className="absolute left-1/2" style={{ bottom: 36 }} aria-hidden>
              <defs>
                {activeLine === 3 && (
                  // Beam: M72 0.5 → left 71.5 → down 179.5
                  <motion.linearGradient id="bfv-b3" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[72,72,40.5,0.5,0.5,0.5], y1:[0.5,0.5,0.5,0.5,140,180], x2:[72,32,0.5,0.5,0.5,0.5], y2:[0.5,0.5,0.5,40.5,180,180] }}
                    transition={{ times:[0,0.14,0.25,0.38,0.86,1], duration:1.2, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              <path d="M0.5 180V0.5 H72" stroke="none" />
              {activeLine === 3 && (
                <motion.path d="M72 0.5H0.5 V180" stroke="url(#bfv-b3)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999" initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -251 }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                />
              )}
            </svg>

            {/* Path 4 — left S-curve reversed: left 36 → down 108 → left 72 = 216 px (starts top-right) */}
            <svg width="108" height="109" fill="none" className="absolute left-1/2" style={{ bottom: 36 }} aria-hidden>
              <defs>
                {activeLine === 4 && (
                  // Beam: M108 0.5 → left 36 → down 108 → left 72
                  <motion.linearGradient id="bfv-b4" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[108,108,72,72,72,40,0], y1:[0.5,0.5,0.5,68.5,108.5,108.5,108.5], x2:[108,72,72,72,32,0,0], y2:[0.5,4.5,40.5,108.5,108.5,108.5,108.5] }}
                    transition={{ times:[0,0.16,0.30,0.56,0.72,0.84,1], duration:1.2, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              <path d="M0 108.5H72 V0.5 H108" stroke="none" />
              {activeLine === 4 && (
                <motion.path d="M108 0.5H72 V108.5 H0" stroke="url(#bfv-b4)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999" initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -216 }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                />
              )}
            </svg>

            {/* Path 5 — right bottom corner: down 71.5 → left 107 = 178.5 px (reversed: starts top-right) */}
            <svg width="108" height="72" fill="none" className="absolute bottom-0 left-1/2 translate-x-[0.5px]" aria-hidden>
              <defs>
                <linearGradient id="bfv-grad" gradientUnits="userSpaceOnUse" x1="100%" x2="0" y1="0" y2="100%">
                  <stop stopColor="white" stopOpacity="0" offset="100%" />
                  <stop stopColor="#A3ECE9" stopOpacity="0" offset="100%" />
                  <stop stopColor="#A3ECE9" offset="125%" />
                  <stop stopColor="#709FF5" offset="150%" />
                  <stop stopColor="white" stopOpacity="0" offset="150%" />
                </linearGradient>
                {activeLine === 5 && (
                  // Beam reversed: M107.5 0 → down 71.5 → left 107 = 178.5 px
                  // tail transparent (x1,y1) → head solid (x2,y2)
                  <motion.linearGradient id="bfv-b5" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[107.5,107.5,107.5,107.5,40.5,0.5], y1:[0,0,31.5,71.5,71.5,71.5], x2:[107.5,107.5,107.5,67.5,0.5,0.5], y2:[0,40,71.5,71.5,71.5,71.5] }}
                    transition={{ times:[0,0.18,0.33,0.51,0.82,1], duration:1.2, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              <path d="M0.5 71.5H107.5 V0" stroke="url(#bfv-grad)" />
              {activeLine === 5 && (
                <motion.path d="M107.5 0V71.5 H0.5" stroke="url(#bfv-b5)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999" initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -178.5 }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                />
              )}
            </svg>

          </div>

          {/* Vertical lines grid — 14 rows × 25 cols × 36×36px, anchored bottom */}
          <div className="absolute bottom-0 flex size-full flex-col-reverse items-center justify-start">
            {Array.from({ length: 14 }).map((_, row) => (
              <div key={row} className="relative flex items-center justify-center">
                {Array.from({ length: 25 }).map((_, col) => (
                  <div
                    key={col}
                    className="relative flex items-center justify-center"
                    style={{ height: 36, width: 36 }}
                  >
                    <svg width="1" height="100%" className="text-white-300" aria-hidden>
                      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Horizontal lines grid — 14 rows × 26 cols × 36×36px, anchored bottom */}
          <div className="absolute bottom-0 flex size-full flex-col-reverse items-center justify-start">
            {Array.from({ length: 14 }).map((_, row) => (
              <div key={row} className="relative flex items-center justify-center">
                {Array.from({ length: 26 }).map((_, col) => (
                  <div
                    key={col}
                    className="relative flex flex-col justify-end"
                    style={{ height: 36, width: 36 }}
                  >
                    <svg width="100%" height="1" className="text-white-300" aria-hidden>
                      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Label chips — 3 rows, bottom-aligned */}
          <div className="relative flex size-full flex-col items-center justify-end" style={{ bottom: 73, gap: 37 }}>
            <div className="flex items-center justify-center" style={{ gap: 109 }}>
              <LabelChip icon={<SalesIcon />}   label="Sales engagement" />
              <LabelChip icon={<EmailIcon />}   label="Email & calendar" />
            </div>
            <div className="flex items-center justify-center" style={{ gap: 181 }}>
              <LabelChip icon={<DataIcon />}    label="Data warehouses" />
              <LabelChip icon={<SupportIcon />} label="Customer support" />
            </div>
            <div className="flex items-center justify-center" style={{ gap: 109 }}>
              <LabelChip icon={<BillingIcon />} label="Billing & invoicing" />
              <LabelChip icon={<ProductIcon />} label="Product data" />
            </div>
          </div>

        </div>

        {/* ── Row 2: data cards + connectors ────────────────────────────────── */}
        <div
          className="relative grid size-full grid-cols-8 grid-rows-[70px_min-content_28px_min-content] items-center justify-items-center"
          style={{ top: 18 }}
        >

          {/* Left connector — hub → Workspace (reversed path: top-right → bottom-left) */}
          <div className="col-span-4 col-start-1 row-start-1 flex w-full -translate-x-1 justify-end">
            <svg width="132" height="70" fill="none" aria-hidden>
              <path d="M6 70V49.3438C6 42.7163 11.3726 37.3438 18 37.3438H114C120.627 37.3438 126 31.9712 126 25.3438V0" stroke="#E4E7EC" />
              <defs>
                <linearGradient id="bfv-left-grad" gradientUnits="userSpaceOnUse" x1="100%" x2="0" y1="0" y2="100%">
                  <stop stopColor="white" stopOpacity="0" offset="81.85337%" />
                  <stop stopColor="#A3ECE9" stopOpacity="0" offset="81.85337%" />
                  <stop stopColor="#A3ECE9" offset="108.36559%" />
                  <stop stopColor="#709FF5" offset="140.3218%" />
                  <stop stopColor="white" stopOpacity="0" offset="140.3218%" />
                </linearGradient>
                {outLeft > 0 && (
                  // Beam: M126,0 → down 25 → curve → left 96 → curve → down 21
                  // path ≈ 180 px, beam=60 px. (x1,y1)=tail transparent, (x2,y2)=head solid
                  <motion.linearGradient key={outLeft} id="bfv-obl" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[126,126,126,78,59,38,6], y1:[0,0,0,37,37,37,70], x2:[126,114,98,18,6,6,6], y2:[0,37,37,37,49,70,70] }}
                    transition={{ times:[0,0.18,0.25,0.58,0.66,0.75,1], duration:1, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              <path d="M6 70V49.3438C6 42.7163 11.3726 37.3438 18 37.3438H114C120.627 37.3438 126 31.9712 126 25.3438V0" stroke="url(#bfv-left-grad)" />
              {outLeft > 0 && (
                <motion.path
                  key={outLeft}
                  d="M126 0V25.3438C126 31.9712 120.627 37.3438 114 37.3438H18C11.3726 37.3438 6 42.7163 6 49.3438V70"
                  stroke="url(#bfv-obl)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999"
                  initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -180 }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              )}
            </svg>
          </div>

          {/* Center vertical line — hub → Deal (straight down 165 px) */}
          <div className="col-span-full row-span-3 row-start-1 flex size-full justify-center">
            <svg width="2" height="165" fill="none" aria-hidden>
              <path d="M0.5 0V165" stroke="#E4E7EC" />
              <defs>
                {outCenter > 0 && (
                  <motion.linearGradient key={outCenter} id="bfv-obc" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[0.5,0.5,0.5,0.5], y1:[0,0,105,165], x2:[0.5,0.5,0.5,0.5], y2:[0,60,165,165] }}
                    transition={{ times:[0,0.25,0.69,1], duration:1, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              {outCenter > 0 && (
                <motion.path
                  key={outCenter}
                  d="M0.5 0V165"
                  stroke="url(#bfv-obc)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999"
                  initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -165 }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              )}
            </svg>
          </div>

          {/* Right connector — hub → Company (reversed path: top-left → bottom-right) */}
          <div className="col-span-4 col-start-5 row-start-1 flex w-full translate-x-1">
            <svg width="132" height="70" fill="none" aria-hidden>
              <path d="M126 70V49.3438C126 42.7163 120.627 37.3438 114 37.3438H18C11.373 37.3438 6.00001 31.9712 6.00001 25.3438V0" stroke="#E4E7EC" />
              <defs>
                {outRight > 0 && (
                  // Beam: M6,0 → down 25 → curve → right 96 → curve → down 21
                  // path ≈ 180 px, beam=60 px. (x1,y1)=tail transparent, (x2,y2)=head solid
                  <motion.linearGradient key={outRight} id="bfv-obr" gradientUnits="userSpaceOnUse"
                    animate={{ x1:[6,6,6,54,73,94,126], y1:[0,0,0,37,37,37,70], x2:[6,18,34,114,126,126,126], y2:[0,37,37,37,49,70,70] }}
                    transition={{ times:[0,0.18,0.25,0.58,0.66,0.75,1], duration:1, ease:'linear' }}
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0} />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </motion.linearGradient>
                )}
              </defs>
              {outRight > 0 && (
                <motion.path
                  key={outRight}
                  d="M6 0V25.3438C6.00001 31.9712 11.373 37.3438 18 37.3438H114C120.627 37.3438 126 42.7163 126 49.3438V70"
                  stroke="url(#bfv-obr)" strokeWidth={1} strokeLinecap="round"
                  strokeDasharray="300 999"
                  initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: -180 }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              )}
            </svg>
          </div>

          {/* Workspace card */}
          <DataCard
            icon={<WorkspaceColourIcon />}
            label="Workspace"
            count={cardCounts.workspace}
            gridClass="col-span-4 col-start-1 row-start-2"
          />

          {/* Company card */}
          <DataCard
            icon={<CompanyColourIcon />}
            label="Company"
            count={cardCounts.company}
            gridClass="col-span-4 col-start-5 row-start-2"
          />

          {/* Deal card */}
          <DataCard
            icon={<DealColourIcon />}
            label="Deal"
            count={cardCounts.deal}
            gridClass="col-span-full row-start-4"
          />

        </div>

        {/* ── Center hub ──────────────────────────────────────────────────────── */}
        <div
          className="rounded-[12px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          style={{
            boxShadow: '0px 0px 0px 4px rgba(164,173,186,0.08), 0px 6px 20px -2px rgba(28,40,64,0.08), 0px 2px 6px 0px rgba(28,40,64,0.06)',
            height: 72,
            width: 72,
            backgroundColor: '#E4E7EC',
          }}
        >
          {/* Border gradient — animates on beam arrival, bg stays white */}
          <motion.div
            key={hubPulse}
            className="absolute inset-0 overflow-hidden rounded-[12px] bg-center"
            style={{ background: 'linear-gradient(to bottom, #3b82f6, transparent)' }}
            initial={{ opacity: 0 }}
            animate={hubPulse > 0 ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 1, times: [0, 0.12, 1], ease: 'easeOut' }}
          >
            <div className="absolute inset-px overflow-hidden rounded-[11px] bg-white-100" />
          </motion.div>
          <div className="absolute inset-px flex items-center justify-center rounded-[11px] bg-[#FFFFFF]">
            <Image src="/assets/icons/home/connect-data/attio.svg" alt="" width={36} height={32} />
          </div>
        </div>

      </div>
    </div>
  )
}
