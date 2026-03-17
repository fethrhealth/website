'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
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
  icon, label, count, inView, gridClass,
}: {
  icon: ReactNode
  label: string
  count: number
  inView: boolean
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
          <AnimatedCount to={count} inView={inView} />
        </span>
        <span className="text-[10px] text-black-700 pl-1">Records</span>
      </p>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BentoDataFlowVisual(): ReactNode {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })

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

          {/* SVG connector paths */}
          <div className="absolute inset-0">
            <svg width="108" height="72" fill="none" className="absolute right-1/2 bottom-0 -translate-x-[0.5px]" aria-hidden>
              <path d="M0.5 0V71.5 H72" stroke="transparent" />
            </svg>
            <svg width="108" height="109" fill="none" className="absolute right-1/2" style={{ bottom: 36 }} aria-hidden>
              <path d="M0 0.5H36 V108.5 H72" stroke="transparent" />
            </svg>
            <svg width="72" height="181" fill="none" className="absolute right-1/2" style={{ bottom: 36 }} aria-hidden>
              <path d="M0 0.5H72 V180.5" stroke="transparent" />
            </svg>
            <svg width="72" height="181" fill="none" className="absolute left-1/2" style={{ bottom: 36 }} aria-hidden>
              <path d="M0.5 180V0.5 H72" stroke="transparent" />
            </svg>
            <svg width="108" height="109" fill="none" className="absolute left-1/2" style={{ bottom: 36 }} aria-hidden>
              <path d="M0 108.5H72 V0.5 H108" stroke="transparent" />
            </svg>
            {/* Right bottom corner — gradient stroke */}
            <svg width="108" height="72" fill="none" className="absolute bottom-0 left-1/2 translate-x-[0.5px]" aria-hidden>
              <defs>
                <linearGradient id="bfv-grad" gradientUnits="userSpaceOnUse" x1="100%" x2="0" y1="0" y2="100%">
                  <stop stopColor="white" stopOpacity="0" offset="100%" />
                  <stop stopColor="#A3ECE9" stopOpacity="0" offset="100%" />
                  <stop stopColor="#A3ECE9" offset="125%" />
                  <stop stopColor="#709FF5" offset="150%" />
                  <stop stopColor="white" stopOpacity="0" offset="150%" />
                </linearGradient>
              </defs>
              <path d="M0.5 71.5H107.5 V0" stroke="url(#bfv-grad)" />
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

          {/* Left connector — two paths: base + gradient */}
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
              </defs>
              <path d="M6 70V49.3438C6 42.7163 11.3726 37.3438 18 37.3438H114C120.627 37.3438 126 31.9712 126 25.3438V0" stroke="url(#bfv-left-grad)" />
            </svg>
          </div>

          {/* Center vertical line — spans rows 1–3 */}
          <div className="col-span-full row-span-3 row-start-1 flex size-full justify-center">
            <svg width="1" height="165" fill="none" aria-hidden>
              <path d="M0.5 0V165" stroke="#E4E7EC" />
            </svg>
          </div>

          {/* Right connector — base path only */}
          <div className="col-span-4 col-start-5 row-start-1 flex w-full translate-x-1">
            <svg width="132" height="70" fill="none" aria-hidden>
              <path d="M126 70V49.3438C126 42.7163 120.627 37.3438 114 37.3438H18C11.373 37.3438 6.00001 31.9712 6.00001 25.3438V0" stroke="#E4E7EC" />
            </svg>
          </div>

          {/* Workspace card */}
          <DataCard
            icon={<WorkspaceColourIcon />}
            label="Workspace"
            count={2900}
            inView={inView}
            gridClass="col-span-4 col-start-1 row-start-2"
          />

          {/* Company card */}
          <DataCard
            icon={<CompanyColourIcon />}
            label="Company"
            count={3128}
            inView={inView}
            gridClass="col-span-4 col-start-5 row-start-2"
          />

          {/* Deal card */}
          <DataCard
            icon={<DealColourIcon />}
            label="Deal"
            count={5518}
            inView={inView}
            gridClass="col-span-full row-start-4"
          />

        </div>

        {/* ── Center hub ──────────────────────────────────────────────────────── */}
        <div
          className="rounded-[12px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            boxShadow: '0px 0px 0px 4px rgba(164,173,186,0.08), 0px 6px 20px -2px rgba(28,40,64,0.08), 0px 2px 6px 0px rgba(28,40,64,0.06)',
            height: 72,
            width: 72,
            backgroundColor: '#E4E7EC',
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-[12px] bg-center"
            style={{
              background: 'linear-gradient(rgb(112,159,245) 0%, rgb(163,236,233) 100%) 0% 0% / 400%',
              opacity: 0,
            }}
          >
            <div className="absolute inset-px overflow-hidden rounded-[11px] bg-white-100" />
          </div>
          <div className="absolute inset-px flex items-center justify-center rounded-[11px] bg-[#FFFFFF]">
            <Image src="/assets/icons/home/connect-data/attio.svg" alt="" width={36} height={32} />
          </div>
        </div>

      </div>
    </div>
  )
}
