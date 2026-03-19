'use client'

/**
 * HomeHeroSection
 *
 * Two-layer layout:
 *  1. Sticky testimonial background — tall outer section (calc(1678px + 200vh))
 *     with a sticky inner that stays pinned while the hero scrolls away.
 *  2. Hero absolute overlay — badge, h1, CTAs, and a tabbed product UI preview.
 *     This element is position:absolute top-0 so it scrolls normally; once it
 *     scrolls off screen the testimonial is revealed underneath.
 *
 * Layer 3: Logo grid in normal flow, appears after the sticky section completes.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { CompaniesSection } from '@/components/sections/CompaniesSection'
import { DemoRequestForm } from '../ui/DemoRequestForm'
import { TalkToSalesDialog } from '../ui/TalkToSalesDialog'

// ─── Config ──────────────────────────────────────────────────────────────────

const TABS = ['Monitor', 'Workflows', 'Tables', 'AI'] as const
type TabIdx = 0 | 1 | 2 | 3

/** sidebar item id to highlight per tab */
const TAB_HIGHLIGHT: Record<TabIdx, string> = {
  0: 'monitor',
  1: 'workflows',
  2: 'tables',
  3: 'monitor',
}

const TAB_MS = 5000  // ms per tab cycle
const TICK_MS = 50    // progress update interval

// ─── Shared micro-helpers ────────────────────────────────────────────────────

function DashedH({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg width="100%" height="1" className={className} aria-hidden>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

function DashedV({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg width="1" height="100%" className={className} aria-hidden>
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

// ─── Announcement badge ───────────────────────────────────────────────────────

function AnnouncementBadge(): ReactNode {
  return (
    <Link
      href="/platform/ask"
      className="relative block border border-stroke-weak active:border-subtle-stroke transition-colors duration-300 ease-in-out"
      style={{ borderRadius: '13px' }}
    >
      {/* Static conic gradient decorative border */}
      <div
        className="absolute -inset-px pointer-events-none"
        style={{ borderRadius: '13px' }}
      >
        <div
          className="h-full w-full"
          style={{
            borderRadius: '13px',
            background:
              'conic-gradient(from 100deg at 70% 50%, #A3ECE900, #A3ECE9 20deg, #709FF5 100deg, #709FF5 120deg, #0000 200deg)',
          }}
        />
      </div>
      <div
        className="relative flex items-center gap-x-1 py-[5px] pr-[7px] pl-[11px] bg-white-100 hover:bg-[#FBFBFC] transition-colors duration-300 ease-in-out font-medium text-fg-secondary"
        style={{ borderRadius: '13px', fontSize: 13, lineHeight: '18px' }}
      >
        <span className="text-balance">Meet Ask Fethr, now with MCP</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="m5.5 4 3 3-3 3" stroke="#23252A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  )
}

// ─── CTA row ─────────────────────────────────────────────────────────────────

function HeroCTAs(): ReactNode {
  return (
    <div className="flex items-center justify-center gap-y-2 max-md:flex-col max-md:items-center mt-6 w-full gap-x-2">
      {/* Desktop primary */}
      <Link
        href="/signup"
        className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-primary max-md:hidden"
      >
        Start for free
      </Link>

      {/* Mobile email form */}
      <DemoRequestForm
        source='home'
      />

      {/* Desktop outline */}
      <TalkToSalesDialog
        source="home-hero"
        className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-outline max-md:hidden"
      />
    </div>
  )
}

// ─── Product sidebar ──────────────────────────────────────────────────────────
// Copy of the client's actual dashboard panel sidebar.

const IC_S = '#75777C'  // sidebar icon stroke color

/** Single nav row inside the sidebar */
function SideItem({
  icon,
  label,
  active = false,
}: {
  icon: ReactNode
  label: string
  active?: boolean
}): ReactNode {
  return (
    <div className="flex w-full flex-col">
      <div className={`flex items-center gap-x-1.5 rounded-[9px] px-2 py-1 ${active ? 'bg-[#F4F5F6]' : 'hover:bg-gray-50'}`}>
        {icon}
        <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{label}</span>
      </div>
    </div>
  )
}

/** Section group label */
function SideSection({ label }: { label: string }): ReactNode {
  return (
    <div className="flex items-center gap-x-1.5 px-2 py-1.5">
      <span className="font-medium text-[12px] leading-4 text-[#75777C]">{label}</span>
    </div>
  )
}

/** Horizontal divider between sections */
function SideDivider(): ReactNode {
  return <div className="shrink-0 bg-[#EEEFF1] h-px w-[calc(100%-1rem)] mx-auto" />
}

function ProductSidebar({ activeTab }: { activeTab: TabIdx }): ReactNode {
  const hl = TAB_HIGHLIGHT[activeTab]

  // ── Icons ─────────────────────────────────────────────────────────────────
  const iMonitor = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 4.75h14a1.25 1.25 0 0 1 1.25 1.25v10a1.25 1.25 0 0 1-1.25 1.25H5A1.25 1.25 0 0 1 3.75 16V6a1.25 1.25 0 0 1 1.25-1.25Z" />
      <path d="M7 10v4M12 8v6M17 9v5M8 20h8" />
    </svg>
  )
  const iLogs = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
  const iTables = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.9707 15.3494L20.9707 15.355M20.9405 9.61588H2.99699M8.77661 9.61588V21.1367M20.9405 5.85547V19.1367C20.9405 20.2413 20.0451 21.1367 18.9405 21.1367H4.99699C3.89242 21.1367 2.99699 20.2413 2.99699 19.1367V5.85547C2.99699 4.7509 3.89242 3.85547 4.99699 3.85547H18.9405C20.0451 3.85547 20.9405 4.7509 20.9405 5.85547Z" />
    </svg>
  )
  const iSchemas = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
    </svg>
  )
  const iIntegrations = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  )
  const iPlugins = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22.6 2.7L21.2 1.3L18.2 4.3L16.4 2.5C15.7 1.7 14.4 1.7 13.6 2.5L10.8 5.3L18.6 13.1L21.4 10.3C22.2 9.6 22.2 8.3 21.4 7.5L19.6 5.7L22.6 2.7Z" />
      <path d="M15.6 13.3L12.8 16.2L14.2 17.6L11.4 20.4C10.7 21.2 9.4 21.2 8.6 20.4L6.8 18.6L2.8 22.6L1.4 21.2L5.4 17.2L3.6 15.4C2.8 14.7 2.8 13.4 3.6 12.6L6.4 9.8L7.9 11.2L10.7 8.4L12.1 9.8L9.3 12.6L11.4 14.7L14.2 11.9L15.6 13.3Z" />
    </svg>
  )
  const iCredentials = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22C6.84 20.74 3 15.55 3 10V5L12 1L21 5V10C21 15.55 17.16 20.74 12 22Z" />
      <circle cx="12" cy="9" r="1.5" /><path d="M12 10.5V18" />
    </svg>
  )
  const iWorkflows = (
    <svg width="14" height="14" viewBox="0 0 16 16" fill={IC_S} aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M5 2C5 1.44772 4.55228 1 4 1H2C1.44772 1 1 1.44772 1 2V4C1 4.55228 1.44772 5 2 5H4C4.55228 5 5 4.55228 5 4V2Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6 4.24988C6.15698 4.45881 6.25 4.71854 6.25 5V11C6.25 12.5188 7.48122 13.75 9 13.75H10V12.25H9C8.30964 12.25 7.75 11.6904 7.75 11V8.45015C8.12503 8.64186 8.54989 8.75 9 8.75H10V7.25H9C8.30964 7.25 7.75 6.69036 7.75 6V5C7.75 3.83401 7.02434 2.8375 6 2.43747V4.24988Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11 7C11 6.44772 11.4477 6 12 6H14C14.5523 6 15 6.44772 15 7V9C15 9.55229 14.5523 10 14 10H12C11.4477 10 11 9.55229 11 9V7Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11 12C11 11.4477 11.4477 11 12 11H14C14.5523 11 15 11.4477 15 12V14C15 14.5523 14.5523 15 14 15H12C11.4477 15 11 14.5523 11 14V12Z" />
    </svg>
  )
  const iUsage = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
    </svg>
  )
  const iBillingIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11" />
    </svg>
  )
  const iSettings = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
  const iQuickActions = (
    <svg width="14" height="14" fill="none" aria-hidden>
      <rect x="2" y="1" width="10" height="12" rx="2.5" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.333 3.166v4.667m0-1.667 1.053-1m0 0 2.105-2m-2.105 2 2.28 2.667" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  const iSearch = (
    <svg width="14" height="14" fill="none" aria-hidden>
      <path d="M12.313 12.313 9.467 9.467M1.313 6.054a4.741 4.741 0 1 1 9.482 0 4.741 4.741 0 0 1-9.482 0Z" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const BTN_SHADOW = 'shadow-[0px_0px_2px_0px_#E0E0E0,0px_2px_4px_-2px_rgba(24,39,75,0.02),0px_4px_4px_-2px_rgba(24,39,75,0.06)]'
  const KBD = 'flex min-w-[20px] justify-center rounded-md border border-[#E6E7EA] p-[3px]'
  const KBD_SPAN = 'text-center font-normal text-[#75777C] text-[11px] leading-3 tracking-[0.22px]'

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#FBFBFB] overflow-hidden">

      {/* ── Body ── */}
      <div className="pt-[10px] pr-[7px] pl-2 flex-1 overflow-y-hidden flex flex-col">

        {/* Quick actions + search */}
        <div className={`flex gap-x-2 px-0.5 mb-2.5`}>
          <div className={`rounded-lg bg-primary-background ${BTN_SHADOW} flex flex-1 items-center justify-between py-1 pr-1 pl-1.5`}>
            <div className="flex items-center gap-x-1">
              {iQuickActions}
              <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">Quick actions</span>
            </div>
            <div className={KBD}><span className={KBD_SPAN}>⌘K</span></div>
          </div>
          <div className={`rounded-lg bg-primary-background ${BTN_SHADOW} flex items-center gap-x-1.5 py-1 pr-1 pl-1.5`}>
            {iSearch}
            <div className={KBD}><span className={KBD_SPAN}>/</span></div>
          </div>
        </div>

        {/* Nav sections */}
        <div className="flex flex-col gap-[9px] overflow-y-hidden">

          {/* Monitoring */}
          <div className="flex flex-col">
            <SideSection label="Monitoring" />
            <ul className="flex flex-col gap-px">
              <SideItem icon={iMonitor} label="Monitor" active={hl === 'monitor'} />
              <SideItem icon={iLogs} label="Logs" />
            </ul>
          </div>

          <SideDivider />

          {/* Tools & Analytics */}
          <div className="flex flex-col">
            <SideSection label="Tools & Analytics" />
            <ul className="flex flex-col gap-px">
              <SideItem icon={iTables} label="Tables" active={hl === 'tables'} />
              <SideItem icon={iSchemas} label="Schemas" />
              <SideItem icon={iIntegrations} label="Integrations" />
              <SideItem icon={iPlugins} label="Plugins" />
              <SideItem icon={iCredentials} label="Credentials" />
              <SideItem icon={iWorkflows} label="Workflows" active={hl === 'workflows'} />
            </ul>
          </div>

          <SideDivider />

          {/* Billing */}
          <div className="flex flex-col">
            <SideSection label="Billing" />
            <ul className="flex flex-col gap-px">
              <SideItem icon={iUsage} label="Usage" />
              <SideItem icon={iBillingIcon} label="Billing" />
            </ul>
          </div>

          <SideDivider />

          {/* Settings */}
          <div className="flex flex-col">
            <SideSection label="Settings" />
            <ul className="flex flex-col gap-px">
              <SideItem icon={iSettings} label="Settings" />
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Monitor content (tab 0) ─────────────────────────────────────────────────

interface ConnectorRow {
  readonly name: string
  readonly type: string
  readonly app: string
  readonly labels: ReadonlyArray<{ readonly color: string; readonly name: string }>
}

const CONNECTORS: readonly ConnectorRow[] = [
  { name: 'Patient Data Sync', type: 'HL7', app: 'Epic EMR', labels: [{ color: '#10b981', name: 'Production' }, { color: '#ef4444', name: 'Critical' }] },
  { name: 'Lab Results Feed', type: 'FHIR', app: 'Cerner', labels: [{ color: '#3b82f6', name: 'Development' }] },
  { name: 'Insurance Verification', type: 'HTTP', app: 'Custom Portal', labels: [] },
  { name: 'Radiology Interface', type: 'HL7', app: 'PACS System', labels: [{ color: '#10b981', name: 'Production' }, { color: '#8b5cf6', name: 'Radiology' }] },
  { name: 'Pharmacy Orders', type: 'FHIR', app: 'Epic EMR', labels: [{ color: '#f59e0b', name: 'Pharmacy' }] },
  { name: 'Billing Interface', type: 'TCP/IP', app: 'Revenue System', labels: [{ color: '#14b8a6', name: 'Finance' }] },
  { name: 'ADT Notifications', type: 'HL7', app: 'Meditech', labels: [{ color: '#10b981', name: 'Production' }] },
  { name: 'Clinical Notes Export', type: 'FHIR', app: 'Epic EMR', labels: [{ color: '#8b5cf6', name: 'Radiology' }] },
  { name: 'Appointment Scheduling', type: 'HTTP', app: 'Cerner', labels: [{ color: '#f59e0b', name: 'Pharmacy' }] },
  { name: 'Patient Portal Sync', type: 'FHIR', app: 'MyChart', labels: [{ color: '#3b82f6', name: 'Development' }] },
]

/**
 * Monitor tab main content — animated connector table.
 *
 * Animation sequence (auto-plays on mount, resets when tab switches):
 *  1. Rows stagger in one by one (opacity + translateY).
 *  2. First two rows get selected (blue bg, checkboxes filled) + status → "Starting" (amber).
 *  3. Status → "Started" (green) after a short delay.
 */
function MonitorContent(): ReactNode {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState<'entering' | 'starting' | 'started'>('entering')

  useEffect(() => {
    const ROW_DELAY = 110 // ms between each row appearing
    const TOTAL_ROWS = CONNECTORS.length

    // Stagger rows in
    let count = 0
    const rowId = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= TOTAL_ROWS) clearInterval(rowId)
    }, ROW_DELAY)

    const enterDone = TOTAL_ROWS * ROW_DELAY + 300
    const t1 = setTimeout(() => setPhase('starting'), enterDone)        // select + "Starting"
    const t2 = setTimeout(() => setPhase('started'), enterDone + 2000) // → "Started" green

    return () => { clearInterval(rowId); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const rowColor = (i: number): string => {
    if (i < 2) {
      if (phase === 'starting') return '#f59e0b'
      if (phase === 'started') return '#10b981'
    }
    return '#ef4444'
  }

  const rowLabel = (i: number): string => {
    if (i < 2) {
      if (phase === 'starting') return 'Starting'
      if (phase === 'started') return 'Started'
    }
    return 'Stopped'
  }

  const showBar = phase !== 'entering'

  return (
    <div className="flex h-full flex-col bg-white overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="shrink-0 flex flex-wrap items-center gap-[3px] lg:gap-[6px] px-[3px] py-[3px] lg:px-[12px] lg:py-[10px] border-b border-gray-200">
        {/* Filter */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-600 hover:bg-gray-100 rounded h-[9px] lg:h-[26px]">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lg:w-[13px] lg:h-[13px]"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" /></svg>
          <span>Filter</span>
        </button>
        {/* Sort */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-600 hover:bg-gray-100 rounded h-[9px] lg:h-[26px]">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[13px] lg:h-[13px]">
            <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
          </svg>
          <span>Sort</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Refresh */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-700 border border-gray-300 rounded h-[9px] lg:h-[26px]">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[13px] lg:h-[13px]">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Status filter chip */}
        <div className="flex items-center bg-white border border-gray-200 rounded text-[4.5px] lg:text-[11px] overflow-hidden leading-none">
          <div className="flex items-center gap-[1px] lg:gap-[4px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] bg-gray-50 border-r border-gray-200">
            <span className="text-gray-700 capitalize">status</span>
          </div>
          <div className="px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600 border-r border-gray-200">is</div>
          <div className="flex items-center gap-[2px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-red-500" />
            <span>Stopped</span>
          </div>
          <button type="button" className="px-[2px] py-[1px] lg:px-[6px] lg:py-[4px] text-gray-400 border-l border-gray-200">
            <svg width="3" height="3" viewBox="0 0 10 10" fill="none" className="lg:w-[8px] lg:h-[8px]">
              <path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <button type="button" className="text-[4.5px] lg:text-[11px] text-gray-600 px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] hover:bg-gray-100 rounded">Clear All</button>
        <div className="flex-1" />
        {/* Search */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-700 border border-gray-300 rounded h-[9px] lg:h-[26px]">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[13px] lg:h-[13px]">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <span className="hidden lg:inline">Search Connectors</span>
        </button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="h-[20px] lg:h-[36px]">
              <th className="w-[16px] lg:w-[48px] px-[3px] lg:px-[16px]">
                <div className="size-[8px] lg:size-[16px] rounded-[1px] lg:rounded border border-gray-300" />
              </th>
              {['Status', 'Connector Name', 'Type', 'Application', 'Labels'].map((h, ci) => (
                <th
                  key={h}
                  className={`px-[2px] lg:px-[16px] font-medium text-[6px] leading-[10px] lg:text-[11px] lg:leading-4 text-gray-500 uppercase tracking-wider whitespace-nowrap text-left${ci >= 3 ? ' hidden lg:table-cell' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {CONNECTORS.map((row, i) => {
              const visible = i < visibleCount
              const selected = showBar && i < 2
              const color = rowColor(i)
              const label = rowLabel(i)
              return (
                <tr
                  key={row.name}
                  className={selected ? 'bg-blue-50' : 'bg-white'}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(3px)',
                    transition: 'opacity 200ms ease, transform 200ms ease, background-color 400ms ease',
                  }}
                >
                  {/* Checkbox */}
                  <td className="w-[16px] lg:w-[48px] px-[3px] lg:px-[16px] py-[5px] lg:py-[10px]">
                    <div
                      className={`size-[8px] lg:size-[16px] rounded-[1px] lg:rounded border flex items-center justify-center transition-all duration-300 ${selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 opacity-40'}`}
                    >
                      {selected && (
                        <svg width="5" height="5" viewBox="0 0 10 10" fill="none" className="lg:w-[10px] lg:h-[10px]">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </td>
                  {/* Status */}
                  <td className="px-[2px] lg:px-[16px] py-[5px] lg:py-[10px]">
                    <div className="flex items-center gap-[3px] lg:gap-[6px]">
                      <div className="size-[5px] lg:size-[10px] rounded-full shrink-0 transition-colors duration-500" style={{ backgroundColor: color }} />
                      <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[13px] lg:leading-5 lg:tracking-[-0.28px] transition-colors duration-500" style={{ color }}>{label}</span>
                    </div>
                  </td>
                  {/* Name */}
                  <td className="px-[2px] lg:px-[16px] py-[5px] lg:py-[10px] font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] truncate text-gray-900">{row.name}</td>
                  {/* Type */}
                  <td className="px-[2px] lg:px-[16px] py-[5px] lg:py-[10px] text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[13px] lg:leading-5 lg:tracking-[-0.28px] truncate text-gray-500">{row.type}</td>
                  {/* Application — lg only */}
                  <td className="hidden lg:table-cell px-[16px] py-[10px] text-[13px] leading-5 tracking-[-0.28px] text-gray-500">{row.app}</td>
                  {/* Labels — lg only */}
                  <td className="hidden lg:table-cell px-[16px] py-[10px]">
                    <div className="flex gap-[4px] flex-wrap">
                      {row.labels.map(lbl => (
                        <div
                          key={lbl.name}
                          className="inline-flex items-center gap-[3px] px-[5px] py-[2px] text-[10px] rounded-full border"
                          style={{ backgroundColor: `${lbl.color}20`, borderColor: `${lbl.color}40` }}
                        >
                          <div className="size-[5px] rounded-full shrink-0" style={{ backgroundColor: lbl.color }} />
                          <span className="text-gray-700">{lbl.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Selection action bar (slides in after rows are selected) ── */}
      <div
        className="shrink-0 flex justify-center py-[4px] lg:py-[14px] bg-white border-t border-gray-200"
        style={{
          opacity: showBar ? 1 : 0,
          transform: showBar ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 300ms ease, transform 300ms ease',
        }}
      >
        <div className="flex items-center gap-[3px] lg:gap-[12px] bg-white border border-gray-200 rounded-[3px] lg:rounded-lg px-[4px] py-[2px] lg:px-[14px] lg:py-[8px]">
          {/* Selection count */}
          <div className="flex items-center gap-[2px] lg:gap-[6px]">
            <span className="text-[4.5px] lg:text-[13px] font-medium text-gray-700">2 selected</span>
            <button type="button" className="text-gray-400">
              <svg width="3" height="3" viewBox="0 0 10 10" fill="none" className="lg:w-[10px] lg:h-[10px]">
                <path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="h-[5px] lg:h-[20px] w-px bg-gray-200" />
          {/* Actions */}
          <div className="flex items-center gap-[2px] lg:gap-[6px]">
            {/* Start All — highlighted */}
            <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[2px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4px] lg:text-[13px] text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition-colors">
              <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[13px] lg:h-[13px]"><polygon points="6 3 20 12 6 21 6 3" /></svg>
              Start All
            </button>
            {/* Stop All */}
            <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[2px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4px] lg:text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[13px] lg:h-[13px]">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
              Stop All
            </button>
            {/* Restart All */}
            <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[2px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4px] lg:text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <svg width="4" height="4" viewBox="0 0 16 16" fill="currentColor" className="lg:w-[13px] lg:h-[13px]">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
              </svg>
              Restart All
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Tables content (tab 2) ──────────────────────────────────────────────────

interface RaceRow {
  readonly id: string
  readonly race: string
  readonly cerner: string
  readonly epic: string
  readonly ecw: string
  readonly athena: string
}

const RACE_ROWS: readonly RaceRow[] = [
  { id: 'a1b2c3d4', race: 'American Indian or Alaska Native', cerner: 'AI/AN', epic: 'AMIND', ecw: 'NAT_AM', athena: '01' },
  { id: 'b2c3d4e5', race: 'Asian', cerner: 'ASN', epic: 'ASIAN', ecw: 'ASIAN', athena: '02' },
  { id: 'c3d4e5f6', race: 'Black or African American', cerner: 'BLA', epic: 'AFAM', ecw: 'AFAM', athena: '03' },
  { id: 'd4e5f6g7', race: 'Native Hawaiian or Other Pacific Islander', cerner: 'PI', epic: 'PAC_ISL', ecw: 'PAC_ISL', athena: '04' },
  { id: 'e5f6g7h8', race: 'White', cerner: 'WHT', epic: 'Caucasian', ecw: 'Caucasian', athena: '05' },
  { id: 'f6g7h8i9', race: 'Other Race', cerner: 'OTH', epic: 'OTHER', ecw: 'OTHER', athena: '99' },
  { id: 'g7h8i9j0', race: 'Declined to Answer', cerner: 'UNK', epic: 'UNK', ecw: 'Patient Refused', athena: 'DTA' },
  { id: 'h8i9j0k1', race: 'Multiple Race', cerner: 'MUL', epic: 'MULTI', ecw: 'MULTI', athena: '06' },
  { id: 'i9j0k1l2', race: 'Hispanic or Latino', cerner: 'HIS', epic: 'HISPANIC', ecw: 'LATINO', athena: '07' },
  { id: 'j0k1l2m3', race: 'Not Hispanic or Latino', cerner: 'NON', epic: 'NON_HISP', ecw: 'NON_LATINO', athena: '08' },
  { id: 'k1l2m3n4', race: 'Unknown Race', cerner: 'UNK', epic: 'UNKNOWN', ecw: 'UNKNOWN', athena: '09' },
  { id: 'l2m3n4o5', race: 'Unavailable', cerner: 'UNA', epic: 'UNAVAIL', ecw: 'UNAVAIL', athena: '10' },
  { id: 'm3n4o5p6', race: 'Prefer Not to Disclose', cerner: 'PND', epic: 'PREFER_NOT', ecw: 'PREFER_NOT', athena: 'PND' },
]

/** Shared chevron-down sort button used in each column header */
function SortChevron(): ReactNode {
  return (
    <button type="button" className="opacity-50 flex shrink-0 items-center justify-center p-px hover:bg-gray-200 rounded">
      <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[10px] lg:h-[10px]">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}

/**
 * Tables tab main content — spreadsheet-like grid of the Race reference table.
 * Rows stagger in on mount; no further animation (static data view).
 */
function TablesContent(): ReactNode {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let count = 0
    const id = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= RACE_ROWS.length) clearInterval(id)
    }, 80)
    return () => clearInterval(id)
  }, [])

  /* Shared cell padding class */
  const cp = 'px-[3px] py-[2px] lg:px-[12px] lg:py-[12px]'

  return (
    <div className="flex h-full flex-col bg-white overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="shrink-0 flex flex-wrap items-center gap-[3px] lg:gap-[6px] px-[3px] py-[3px] lg:px-[12px] lg:py-[10px] border-b border-gray-200">
        {/* Filter */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-600 hover:bg-gray-100 rounded h-[9px] lg:h-[26px]">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lg:w-[13px] lg:h-[13px]"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" /></svg>
          <span>Filter</span>
        </button>
        {/* Sort */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-600 hover:bg-gray-100 rounded h-[9px] lg:h-[26px]">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[13px] lg:h-[13px]">
            <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
          </svg>
          <span>Sort</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Insert */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-700 border border-gray-300 rounded h-[9px] lg:h-[26px]">
          <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[13px] lg:h-[13px]"><path d="m6 9 6 6 6-6" /></svg>
          <span>Insert</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Status filter chip — "Started" green */}
        <div className="flex items-center bg-white border border-gray-200 rounded text-[4.5px] lg:text-[11px] overflow-hidden leading-none">
          <div className="flex items-center gap-[1px] lg:gap-[4px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] bg-gray-50 border-r border-gray-200">
            <span className="text-gray-700 capitalize">status</span>
          </div>
          <div className="px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600 border-r border-gray-200">is</div>
          <div className="flex items-center gap-[2px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-green-500" />
            <span>Started</span>
          </div>
          <button type="button" className="px-[2px] py-[1px] lg:px-[6px] lg:py-[4px] text-gray-400 border-l border-gray-200">
            <svg width="3" height="3" viewBox="0 0 10 10" fill="none" className="lg:w-[8px] lg:h-[8px]">
              <path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <button type="button" className="text-[4.5px] lg:text-[11px] text-gray-600 px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] hover:bg-gray-100 rounded">Clear All</button>
      </div>

      {/* ── Spreadsheet grid ── */}
      <div className="flex-1 overflow-hidden">
        {/*
         * The inner div overflows horizontally to mimic a real spreadsheet.
         * overflow-x visible inside overflow-hidden parent clips it cleanly.
         */}
        <div className="h-full overflow-x-auto overflow-y-hidden">
          <div className="inline-flex flex-col">

            {/* Header row */}
            <div className="flex bg-gray-50 border-b border-gray-200 h-[17px] lg:h-[35px]">
              {/* Checkbox column */}
              <div className="flex items-center justify-center border-r border-gray-200 w-[32px] lg:w-[65px] shrink-0">
                <div className="size-[4px] lg:size-[16px] rounded-[1px] lg:rounded border border-gray-300" />
              </div>
              {/* id — primary key column */}
              <div className={`flex items-center justify-between border-r border-gray-200 bg-gray-50 shrink-0 w-[60px] lg:w-[120px] ${cp}`}>
                <div className="flex items-center gap-[2px] lg:gap-[6px] min-w-0 flex-1">
                  <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 shrink-0 lg:w-[10px] lg:h-[10px]">
                    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                    <path d="m21 2-9.6 9.6" /><circle cx="7.5" cy="15.5" r="5.5" />
                  </svg>
                  <span className="font-medium text-[6px] lg:text-[10px] text-gray-900 uppercase tracking-wider whitespace-nowrap">id</span>
                  <span className="text-gray-500 text-[5px] lg:text-[9px] whitespace-nowrap">uuid</span>
                </div>
                <SortChevron />
              </div>
              {/* standard race */}
              {[
                { label: 'standard race', w: 'w-[150px] lg:w-[300px]' },
                { label: 'Cerner', w: 'w-[75px]  lg:w-[150px]' },
                { label: 'Epic', w: 'w-[75px]  lg:w-[150px]' },
                { label: 'eClinicalWorks', w: 'w-[105px] lg:w-[210px]' },
                { label: 'Athena', w: 'w-[90px]  lg:w-[180px]' },
              ].map((col, ci, arr) => (
                <div key={col.label} className={`flex items-center justify-between bg-gray-50 shrink-0 ${col.w} ${cp}${ci < arr.length - 1 ? ' border-r border-gray-200' : ''}`}>
                  <div className="flex items-center gap-[2px] lg:gap-[4px] min-w-0 flex-1">
                    <span className="font-medium text-[6px] lg:text-[12px] text-gray-900 uppercase tracking-wider whitespace-nowrap">{col.label}</span>
                    <span className="text-gray-500 text-[5px] lg:text-[10px] whitespace-nowrap">text</span>
                  </div>
                  <SortChevron />
                </div>
              ))}
            </div>

            {/* Data rows */}
            {RACE_ROWS.map((row, i) => (
              <div
                key={row.id}
                className="flex bg-white hover:bg-gray-50 h-[24px] lg:h-[48px] font-mono"
                style={{
                  opacity: i < visibleCount ? 1 : 0,
                  transform: i < visibleCount ? 'translateY(0)' : 'translateY(2px)',
                  transition: 'opacity 150ms ease, transform 150ms ease',
                }}
              >
                {/* Checkbox */}
                <div className={`flex items-center justify-center border-r border-b border-gray-100 bg-white shrink-0 w-[32px] lg:w-[65px] ${cp}`}>
                  <div className="size-[6px] lg:size-[16px] border border-gray-200 rounded-[1px] lg:rounded" />
                </div>
                {/* id */}
                <div className={`flex items-center border-r border-b border-gray-100 bg-white shrink-0 w-[60px] lg:w-[120px] ${cp}`}>
                  <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] truncate">{row.id}</span>
                </div>
                {/* standard race */}
                <div className={`flex items-center border-r border-b border-gray-100 bg-white shrink-0 w-[150px] lg:w-[300px] ${cp}`}>
                  <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] truncate">{row.race}</span>
                </div>
                {/* Cerner */}
                <div className={`flex items-center border-r border-b border-gray-100 bg-white shrink-0 w-[75px] lg:w-[150px] ${cp}`}>
                  <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] truncate">{row.cerner}</span>
                </div>
                {/* Epic */}
                <div className={`flex items-center border-r border-b border-gray-100 bg-white shrink-0 w-[75px] lg:w-[150px] ${cp}`}>
                  <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] truncate">{row.epic}</span>
                </div>
                {/* eClinicalWorks */}
                <div className={`flex items-center border-r border-b border-gray-100 bg-white shrink-0 w-[105px] lg:w-[210px] ${cp}`}>
                  <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] truncate">{row.ecw}</span>
                </div>
                {/* Athena */}
                <div className={`flex items-center border-b border-gray-100 bg-white shrink-0 w-[90px] lg:w-[180px] ${cp}`}>
                  <span className="font-medium text-[7px] leading-[10px] tracking-[-0.14px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px] truncate">{row.athena}</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Workflows content (tab 1) ───────────────────────────────────────────────

/**
 * SVG border path for a 302×80 workflow card.
 * Starts at top-center (151, 0.5) and traces clockwise so the stroke-dash
 * animation "paints" the border from the center outward in both directions.
 */
const CARD_BORDER_PATH =
  'M 151 0.5 L 289.5 0.5 A 12 12 0 0 1 301.5 12 L 301.5 67.5 ' +
  'A 12 12 0 0 1 289.5 79.5 L 12.5 79.5 A 12 12 0 0 1 0.5 68 ' +
  'L 0.5 0.5 L 12.5 0.5 Z'

type CardPhase2 = 'idle' | 'running' | 'completed'

/** Running (purple) or Completed (green) badge that floats above a card */
function WorkflowBadge({ phase }: { phase: CardPhase2 }): ReactNode {
  if (phase === 'completed') return (
    <span className="inline-flex items-center gap-[5px] rounded-md border border-[#C7F4D3] bg-[#DDF9E4] px-[5px] pr-1.5 py-px text-[12px] font-medium leading-4">
      <svg className="size-3" viewBox="0 0 12 12" fill="none">
        <path d="M3 5.727 3.742 6.9c.442.699.663 1.048.947 1.17a1 1 0 0 0 .778.007c.286-.118.512-.464.965-1.156L9 3" stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[#0FC27B]">Completed</span>
    </span>
  )
  if (phase === 'running') return (
    <span className="inline-flex items-center gap-[5px] rounded-md border border-[#E8DDFE] bg-[#F5F0FF] px-[5px] pr-1.5 py-px text-[12px] font-medium leading-4">
      <svg className="size-3 animate-spin" viewBox="0 0 12 12" fill="none">
        <path d="M6 1.5a4.5 4.5 0 1 1-3.182 7.682" stroke="#9162F9" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[#9162F9]">Running</span>
    </span>
  )
  return null
}

/**
 * Single workflow card with animated SVG border.
 * Border paints clockwise from top-center using stroke-dasharray animation.
 */
function WorkflowCardNode({
  phase, title, subtitle, tag, icon, dotColor = '#266DF0',
}: {
  phase: CardPhase2
  title: string
  subtitle: string
  tag: string
  icon: ReactNode
  dotColor?: string
}): ReactNode {
  const animRef = useRef<SVGAnimateElement>(null)
  const showBorder = phase !== 'idle'

  /*
   * begin="indefinite" means the SVG animation never auto-starts.
   * We trigger it imperatively via beginElement() the moment phase
   * becomes 'running', regardless of how long after page-load that is.
   */
  useEffect(() => {
    if (phase === 'running') animRef.current?.beginElement()
  }, [phase])

  return (
    <div className="relative" style={{ width: 302, height: 80 }}>
      {/* Badge floats above */}
      <div className="absolute right-0 flex" style={{ bottom: 'calc(100% + 8px)' }}>
        <WorkflowBadge phase={phase} />
      </div>

      {/* SVG border layer */}
      <svg className="absolute inset-0 isolate overflow-visible" width="302" height="80">
        <g strokeWidth="1">
          {/* Base fill + static gray border */}
          <path d={CARD_BORDER_PATH} fill="white" stroke="#E6E7EA" />

          {/* Animated green border — starts invisible; beginElement() paints it */}
          {showBorder && (
            <path
              d={CARD_BORDER_PATH}
              fill="none"
              stroke="#54D490"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="0 1"
            >
              <animate
                ref={animRef}
                attributeName="stroke-dasharray"
                values="0 1;1 0"
                dur="1.6s"
                fill="freeze"
                begin="indefinite"
              />
            </path>
          )}

          {/* Bottom-center connector dot — color indicates step status */}
          <circle
            cx="151" cy="79.5" r="5"
            fill="white"
            stroke={phase === 'completed' ? '#0FC27B' : dotColor}
          />
        </g>
      </svg>

      {/* Card text content */}
      <div className="absolute inset-[0.5px] flex flex-col p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            {icon}
            <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{title}</span>
          </div>
          <span className="inline-flex items-center rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] px-[5px] py-px text-[12px] text-[#5C5E63]">
            {tag}
          </span>
        </div>
        <hr className="border-[#E6E7EA] mt-[11px] mb-[8px]" />
        <span className="text-[12px] leading-4 font-medium text-[#75777C]">{subtitle}</span>
      </div>
    </div>
  )
}

/** Vertical connector line between two workflow cards */
function WorkflowConnector({ active }: { active: boolean }): ReactNode {
  const lineRef = useRef<SVGAnimateElement>(null)
  const arrowLRef = useRef<SVGAnimateElement>(null)
  const arrowRRef = useRef<SVGAnimateElement>(null)

  useEffect(() => {
    if (!active) return
    // Line paints immediately; arrowheads paint after line finishes
    lineRef.current?.beginElement()
    const id = setTimeout(() => {
      arrowLRef.current?.beginElement()
      arrowRRef.current?.beginElement()
    }, 300)
    return () => clearTimeout(id)
  }, [active])

  return (
    <svg className="mx-auto block" width="12" height="71" viewBox="0 0 12 71" fill="none">
      {/* Gray base — always visible */}
      <path d="M6 8 L6 63" stroke="#D1D3D6" strokeLinecap="round" />
      <path d="M6 63 L1 58" stroke="#D1D3D6" strokeLinecap="round" />
      <path d="M6 63 L11 58" stroke="#D1D3D6" strokeLinecap="round" />

      {/* Green overlay — only mounts when active (so refs reset) */}
      {active && (
        <>
          <path d="M6 8 L6 63" stroke="#54D490" strokeWidth="1.5" strokeLinecap="round" pathLength="1" strokeDasharray="0 1">
            <animate ref={lineRef} attributeName="stroke-dasharray" values="0 1;1 0" dur="0.3s" fill="freeze" begin="indefinite" />
          </path>
          <path d="M6 63 L1 58" stroke="#54D490" strokeWidth="1.5" strokeLinecap="round" pathLength="1" strokeDasharray="0 1">
            <animate ref={arrowLRef} attributeName="stroke-dasharray" values="0 1;1 0" dur="0.15s" fill="freeze" begin="indefinite" />
          </path>
          <path d="M6 63 L11 58" stroke="#54D490" strokeWidth="1.5" strokeLinecap="round" pathLength="1" strokeDasharray="0 1">
            <animate ref={arrowRRef} attributeName="stroke-dasharray" values="0 1;1 0" dur="0.15s" fill="freeze" begin="indefinite" />
          </path>
        </>
      )}
    </svg>
  )
}

/**
 * Floating runs panel — shared by Workflows (tab 1) and AI (tab 3).
 * Rendered outside the mock card, absolutely positioned in ProductUIMock.
 */
function RunsPanel(): ReactNode {
  const runNum = 70
  return (
    <div className="flex h-full flex-col overflow-hidden">

      {/* Run #70 — executing */}
      <div className="border-b border-[#EEEFF1] px-0.5 py-0.5">
        <div className="flex items-center gap-x-2 rounded-md bg-[#FBFBFB] px-3.5 pt-2.5 pb-[9px]">
          <svg className="animate-spin shrink-0" width="18" height="18" fill="none">
            <rect x=".5" y=".5" width="17" height="17" rx="8.5" fill="#F4F5F6" stroke="#E6E7EA" />
            <path d="M5 9a4 4 0 1 0 4-4" stroke="#75777C" strokeLinecap="round" />
          </svg>
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] w-[58px]">Run #{runNum}</span>
          <span className="flex-1 text-right font-medium text-[12px] leading-4 text-[#75777C]">Executing</span>
        </div>
      </div>

      {/* Run #69 — completed */}
      <div className="border-b border-[#EEEFF1] px-0.5 py-0.5">
        <div className="flex items-center gap-x-2 rounded-md px-3.5 pt-2.5 pb-[9px]">
          <svg width="18" height="18" fill="none" className="shrink-0">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Zm3.152-9.636a.6.6 0 1 0-1.004-.657L9.181 9.71c-.252.384-.418.636-.558.813-.14.176-.2.205-.212.21a.48.48 0 0 1-.374-.003c-.012-.005-.072-.035-.209-.213a12.33 12.33 0 0 1-.544-.822l-.377-.595a.6.6 0 1 0-1.014.642l.377.595.015.024c.226.357.417.66.592.887.178.232.39.457.685.584.416.18.888.183 1.307.01.296-.122.512-.344.694-.573.178-.225.374-.524.606-.878l.015-.023 1.968-3.005Z" fill="#0FC27B" />
          </svg>
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] w-[58px]">Run #{runNum - 1}</span>
          <div className="flex items-center gap-[4px] rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] px-[5px] py-px text-[12px] text-[#5C5E63]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.875 1.15a2.25 2.25 0 0 1 2.25 0L9.638 2.6a2.25 2.25 0 0 1 1.125 1.949v2.902A2.25 2.25 0 0 1 9.638 9.4l-2.513 1.45a2.25 2.25 0 0 1-2.25 0L2.362 9.4A2.25 2.25 0 0 1 1.237 7.45V4.549A2.25 2.25 0 0 1 2.362 2.6l2.513-1.45Z" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>15</span>
          </div>
          <span className="flex-1 text-right font-medium text-[12px] leading-4 text-[#75777C]">Completed just now</span>
        </div>
      </div>

      {/* Overview stats — pinned to bottom */}
      <div className="mt-auto border-t border-[#EEEFF1] px-3 pt-[5px] pb-3">
        <span className="ml-1 font-medium text-[12px] leading-4 text-[#75777C]">Overview</span>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {/* Completed */}
          <div className="relative flex flex-col rounded-xl border border-[#E7F6EF] bg-[linear-gradient(263deg,rgba(15,194,123,0.08)_6.86%,rgba(15,194,123,0.02)_96.69%)] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <svg width="14" height="14" fill="none"><g opacity=".6" stroke="#075A39" strokeWidth="1.1"><path d="m4.75 7.295.277.439c.425.67.637 1.006.91 1.124a.96.96 0 0 0 .746.006c.275-.113.492-.446.927-1.11L9.25 5.25" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7" cy="7" r="5.5" /></g></svg>
            </div>
            <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#095A39]">69</span>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">Completed</span>
          </div>
          {/* Failed */}
          <div className="relative flex flex-col rounded-xl border border-[#FEE7E7] bg-[linear-gradient(263deg,rgba(255,109,107,0.08)_6.86%,rgba(255,109,107,0.02)_96.69%)] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <svg width="14" height="14" fill="none"><g opacity=".6" stroke="#772322" strokeWidth="1.1"><circle cx="7" cy="7" r="5.5" /><path d="M9 5 5 9M9 9 5 5" strokeLinecap="round" strokeLinejoin="round" /></g></svg>
            </div>
            <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#772322]">0</span>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">Failed</span>
          </div>
          {/* In progress */}
          <div className="relative flex flex-col rounded-xl border border-[#EEEFF1] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <svg width="14" height="14" fill="none"><path d="M1.5 7A5.5 5.5 0 1 0 7 1.5" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" /></svg>
            </div>
            <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#232529]">1</span>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">In progress</span>
          </div>
          {/* Avg runtime */}
          <div className="relative flex flex-col rounded-xl border border-[#EEEFF1] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="5.75" stroke="#9FA1A7" strokeWidth="1.1" strokeLinejoin="round" /><path d="M7.066 3.904v2.115a.885.885 0 0 1-.884.885H4.566" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" /></svg>
            </div>
            <div className="flex items-end">
              <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#232529]">18</span>
              <span className="font-medium text-[11px] mb-[1px] ml-[5px] text-[#9FA1A7]">seconds</span>
            </div>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">Avg. runtime</span>
          </div>
        </div>
      </div>

    </div>
  )
}

/**
 * Workflows tab main content.
 *
 * Animation (auto-plays on mount, resets on tab switch):
 *   100ms  → card 1 border starts painting  (Running badge)
 *   1800ms → card 1 completes               (Completed badge)
 *   2000ms → connector line draws
 *   2300ms → card 2 border starts painting  (Running badge)
 *   4100ms → card 2 completes               (Completed badge)
 */
function WorkflowsContent(): ReactNode {
  const [card1, setCard1] = useState<CardPhase2>('idle')
  const [card2, setCard2] = useState<CardPhase2>('idle')
  const [connector, setConnector] = useState(false)
  const runNum = 70

  useEffect(() => {
    const t1 = setTimeout(() => setCard1('running'), 100)
    const t2 = setTimeout(() => setCard1('completed'), 1800)
    const t3 = setTimeout(() => setConnector(true), 2000)
    const t4 = setTimeout(() => setCard2('running'), 2300)
    const t5 = setTimeout(() => setCard2('completed'), 4100)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  return (
    <div className="flex h-full flex-col overflow-hidden">

      {/* Header row — Editor / Runs tabs + Live badge */}
      <div className="shrink-0 border-b border-[#EEEFF1]">
        <div className="flex items-center justify-between pt-[5px] pr-[8px] pb-[4px] pl-[6px] lg:pt-[10px] lg:pr-[16px] lg:pb-[9px] lg:pl-[12px]">
          <div className="flex items-center gap-[3px] lg:gap-[5px]">
            {/* Editor (inactive) */}
            <div className="flex items-center gap-[2px] lg:gap-[6px] opacity-60 py-[1.5px] pr-[3px] pl-[2.5px] lg:py-[3px] lg:pr-[6px] lg:pl-[5px] cursor-pointer">
              <svg className="size-[7px] lg:size-[14px]" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 8v2.5a1 1 0 0 0 1 1M8 2.5h2.5a1 1 0 0 1 1 1" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" />
                <path d="M10.705 5.808a1.052 1.052 0 0 1 1.487 1.487l-3.77 3.77-.722.666-.563.32-.944.276L5.5 12.5l.173-.693.277-.944.319-.563.667-.723 3.769-3.769Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium text-[7px] lg:text-[14px] text-[#75777C]">Editor</span>
            </div>
            {/* Runs (active) */}
            <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] py-[1.5px] pr-[2px] pl-[2.5px] lg:py-[3px] lg:pr-[4px] lg:pl-[5px] cursor-pointer">
              <svg className="size-[7px] lg:size-[14px]" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="4.5" width="10" height="5" rx="2" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 12.5v-1M7 2.5v-1" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span className="font-medium text-[7px] lg:text-[14px]">Runs</span>
              <span className="inline-flex items-center justify-center border border-[#EEEFF1] bg-white text-[#5C5E63] h-[7px] lg:h-[14px] min-w-[7px] lg:min-w-[16px] px-[2px] lg:px-[3px] rounded-sm text-[4px] lg:text-[10px]">
                {runNum}
              </span>
            </div>
          </div>
          {/* Right: Live badge */}
          <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] py-px pl-[2.5px] pr-[3px] lg:py-[1px] lg:pl-[5px] lg:pr-[6px]">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-[#0FC27B]" />
            <span className="font-medium text-[5px] lg:text-[12px] leading-4 text-[#075A39]">Live</span>
          </div>
        </div>
      </div>

      {/* Dot-grid canvas */}
      <div className="relative flex-1 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[#BABBBC]">
          <div
            className="h-full w-full bg-[#FBFBFB]"
            style={{
              maskImage: 'linear-gradient(to right,rgba(0,0,0,0) 1px,rgb(0,0,0) 1px),linear-gradient(rgba(0,0,0,0) 1px,rgb(0,0,0) 1px)',
              maskPosition: '5px 5px',
              maskSize: '10px 10px',
            }}
          />
        </div>

        <div className="relative z-10 h-full">
          {/* Run # label — top-left */}
          <div className="absolute top-[6px] left-[6px] lg:top-4 lg:left-4">
            <span className="inline-flex items-center rounded-md border border-[#E8DDFE] bg-[#F5F0FF] px-[3px] py-px lg:px-[5px] text-[5px] lg:text-[12px] font-medium leading-4">
              <span className="text-[#9162F9]">Run #{runNum}</span>
            </span>
          </div>

          {/*
             * Card stack — rendered at full scale (302px wide) then visually
             * halved at mobile via scale-50, full at lg via lg:scale-100.
             * `origin-top` keeps cards aligned to top of canvas.
             */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[44px] lg:top-[72px] scale-50 lg:scale-100 origin-top">
            {/* Trigger label + Card 1 */}
            <div className="relative mt-8">
              <div className="absolute bottom-full left-0 flex items-center gap-1 rounded-t-[10px] border border-b-0 border-[#E6E7EA] bg-[#FBFBFB] px-[7px] pb-1 pt-[3px]">
                <svg className="size-3" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r=".75" fill="#75777C" />
                  <circle cx="6" cy="6" r="5" stroke="#75777C" strokeWidth="1.1" />
                  <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeWidth="1.1" />
                </svg>
                <span className="text-[12px] font-medium text-[#75777C]">Trigger</span>
              </div>
              <WorkflowCardNode
                phase={card1}
                title="Fetch a patient"
                subtitle="Search for a patient in eClinicalWorks"
                tag="EHR"
                dotColor="#0FC27B"
                icon={
                  <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="none">
                    <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF" stroke="#D6E5FF" />
                    <path d="M7.5 5.5h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" stroke="#407FF2" strokeWidth="1.2" />
                    <path d="M8 8.5h4M8 10.5h2.5" stroke="#407FF2" strokeWidth="1.1" strokeLinecap="round" />
                    <circle cx="13.5" cy="13.5" r="2.75" fill="#E5EEFF" stroke="#D6E5FF" />
                    <path d="M12.5 13.5h2M13.5 12.5v2" stroke="#407FF2" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>

            {/* Connector */}
            <WorkflowConnector active={connector} />

            {/* Card 2 */}
            <WorkflowCardNode
              phase={card2}
              title="Map Patient Record"
              subtitle="Send data to iClinic"
              tag="Data"
              dotColor="#266DF0"
              icon={
                <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="none">
                  <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#EDE9FF" stroke="#DDD5FF" />
                  <path d="M6 8.5h5M13.5 11.5H8.5" stroke="#9162F9" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M12 6.5l2.5 2-2.5 2M8 13.5l-2.5-2 2.5-2" stroke="#9162F9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── AI content (tab 4) ──────────────────────────────────────────────────────

/**
 * Simple card for AIContent: slides in from below, plain gray border,
 * no status badges, no animated border painting.
 */
function AIBuildCard({
  visible,
  title,
  subtitle,
  tag,
  icon,
}: {
  visible: boolean
  title: string
  subtitle: string
  tag: string
  icon: ReactNode
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 302, height: 80 }}
      className="rounded-[12px] border border-[#E6E7EA] bg-white-0"
    >
      <div className="flex h-full flex-col p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            {icon}
            <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{title}</span>
          </div>
          <span className="inline-flex items-center rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] px-[5px] py-px text-[12px] text-[#5C5E63]">
            {tag}
          </span>
        </div>
        <hr className="mt-[11px] mb-[8px] border-[#E6E7EA]" />
        <span className="text-[12px] font-medium leading-4 text-[#75777C]">{subtitle}</span>
      </div>
    </motion.div>
  )
}

/**
 * AIContent — 3-step AI workflow canvas.
 * Cards slide in from below sequentially, simulating an AI building the workflow.
 * No animated borders, no Running/Completed badges.
 */
function AIContent(): ReactNode {
  const runNum = 1
  const [card1, setCard1] = useState(false)
  const [card2, setCard2] = useState(false)
  const [card3, setCard3] = useState(false)
  const [conn1, setConn1] = useState(false)
  const [conn2, setConn2] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setCard1(true), 200)
    const t2 = setTimeout(() => setConn1(true), 850)
    const t3 = setTimeout(() => setCard2(true), 1100)
    const t4 = setTimeout(() => setConn2(true), 1750)
    const t5 = setTimeout(() => setCard3(true), 2000)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  return (
    <div className="flex h-full flex-col overflow-hidden">

      {/* ── Header: Editor / Runs tabs + Live badge ── */}
      <div className="shrink-0 border-b border-[#EEEFF1]">
        <div className="flex items-center justify-between pt-[5px] pr-[8px] pb-[4px] pl-[6px] lg:pt-[10px] lg:pr-[16px] lg:pb-[9px] lg:pl-[12px]">
          <div className="flex items-center gap-[3px] lg:gap-[5px]">
            {/* Editor (inactive) */}
            <div className="flex items-center gap-[2px] lg:gap-[6px] opacity-60 py-[1.5px] pr-[3px] pl-[2.5px] lg:py-[3px] lg:pr-[6px] lg:pl-[5px] cursor-pointer">
              <svg className="size-[7px] lg:size-[14px]" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 8v2.5a1 1 0 0 0 1 1M8 2.5h2.5a1 1 0 0 1 1 1" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" />
                <path d="M10.705 5.808a1.052 1.052 0 0 1 1.487 1.487l-3.77 3.77-.722.666-.563.32-.944.276L5.5 12.5l.173-.693.277-.944.319-.563.667-.723 3.769-3.769Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium text-[7px] lg:text-[14px] text-[#75777C]">Editor</span>
            </div>
            {/* Runs (active) */}
            <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] py-[1.5px] pr-[2px] pl-[2.5px] lg:py-[3px] lg:pr-[4px] lg:pl-[5px] cursor-pointer">
              <svg className="size-[7px] lg:size-[14px]" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="4.5" width="10" height="5" rx="2" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 12.5v-1M7 2.5v-1" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <span className="font-medium text-[7px] lg:text-[14px]">Runs</span>
              <span className="inline-flex items-center justify-center border border-[#EEEFF1] bg-white text-[#5C5E63] h-[7px] lg:h-[14px] min-w-[7px] lg:min-w-[16px] px-[2px] lg:px-[3px] rounded-sm text-[4px] lg:text-[10px]">
                {runNum}
              </span>
            </div>
          </div>
          {/* Live badge */}
          <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] py-px pl-[2.5px] pr-[3px] lg:py-[1px] lg:pl-[5px] lg:pr-[6px]">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-[#0FC27B]" />
            <span className="font-medium text-[5px] lg:text-[12px] leading-4 text-[#075A39]">Live</span>
          </div>
        </div>
      </div>

      {/* ── Dot-grid canvas ── */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[#BABBBC]">
          <div
            className="h-full w-full bg-[#FBFBFB]"
            style={{
              maskImage: 'linear-gradient(to right,rgba(0,0,0,0) 1px,rgb(0,0,0) 1px),linear-gradient(rgba(0,0,0,0) 1px,rgb(0,0,0) 1px)',
              maskPosition: '5px 5px',
              maskSize: '10px 10px',
            }}
          />
        </div>

        <div className="relative z-10 h-full">
          {/* Run # label */}
          <div className="absolute top-[6px] left-[6px] lg:top-4 lg:left-4">
            <span className="inline-flex items-center rounded-md border border-[#E8DDFE] bg-[#F5F0FF] px-[3px] py-px lg:px-[5px] text-[5px] lg:text-[12px] font-medium leading-4">
              <span className="text-[#9162F9]">Run #{runNum}</span>
            </span>
          </div>

          {/* Card stack — scale-50 mobile, scale-100 lg */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[30px] lg:top-[20px] scale-50 lg:scale-100 origin-top">

            {/* Trigger label + Card 1 */}
            <div className="relative mt-8">
              <div className="absolute bottom-full left-0 flex items-center gap-1 rounded-t-[10px] border border-b-0 border-[#E6E7EA] bg-[#FBFBFB] px-[7px] pb-1 pt-[3px]">
                <svg className="size-3" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r=".75" fill="#75777C" />
                  <circle cx="6" cy="6" r="5" stroke="#75777C" strokeWidth="1.1" />
                  <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeWidth="1.1" />
                </svg>
                <span className="text-[12px] font-medium text-[#75777C]">Trigger</span>
              </div>
              <AIBuildCard
                visible={card1}
                title="Incoming Epic Orders"
                subtitle="Receive HL7 ORM Messages from Epic"
                tag="Form"
                icon={
                  <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="none">
                    <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF" stroke="#D6E5FF" />
                    <path d="M7 5.5h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" stroke="#407FF2" strokeWidth="1.2" />
                    <path d="M8 8.5h4M8 10.5h3M8 12.5h2" stroke="#407FF2" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>

            {/* Connector 1 — fades in after card 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: conn1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowConnector active={false} />
            </motion.div>

            {/* Card 2 — AI model step */}
            <AIBuildCard
              visible={card2}
              title="Map Data"
              subtitle="Map data from Epic to Cerner"
              tag="Transform"
              icon={
                <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="none">
                  <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#EDE9FF" stroke="#DDD5FF" />
                  <circle cx="10" cy="10" r="2.5" stroke="#9162F9" strokeWidth="1.2" />
                  <path d="M10 5.5v1M10 13.5v1M5.5 10h-1M15.5 10h-1" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M7.4 7.4l.7.7M11.9 11.9l.7.7M7.4 12.6l.7-.7M11.9 8.1l.7-.7" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              }
            />

            {/* Connector 2 — fades in after card 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: conn2 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowConnector active={false} />
            </motion.div>

            {/* Card 3 — action step */}
            <AIBuildCard
              visible={card3}
              title="Outbound Orders to Cerncer"
              subtitle="Send outbound HL7 ORM messages to Cerner"
              tag="EHR"
              icon={
                <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="none">
                  <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E3FBEC" stroke="#C7F4D3" />
                  <path d="M7 5.5h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" stroke="#0FC27B" strokeWidth="1.2" />
                  <path d="M7.5 10l2 2 3-3" stroke="#0FC27B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Main content area per tab ────────────────────────────────────────────────

function MainContent({ activeTab }: { activeTab: TabIdx }): ReactNode {
  if (activeTab === 0) return <MonitorContent />
  if (activeTab === 1) return <WorkflowsContent />
  if (activeTab === 2) return <TablesContent />
  return <AIContent />
}

// ─── Tab bar ─────────────────────────────────────────────────────────────────

function TabBar({
  activeTab,
  progress,
  onSelect,
}: {
  activeTab: TabIdx
  progress: number
  onSelect: (i: TabIdx) => void
}): ReactNode {
  return (
    <div className="grid w-full grid-cols-2 gap-x-px bg-subtle-stroke lg:grid-cols-4">
      {TABS.map((tab, i) => {
        const isActive = i === activeTab
        return (
          <div key={tab} className="relative w-full overflow-hidden">
            <button
              type="button"
              onClick={() => onSelect(i as TabIdx)}
              className={`flex h-16 w-full items-center justify-center border-b border-subtle-stroke px-4 font-medium text-[15px] leading-5 cursor-pointer transition-colors duration-150 ease-out ${isActive
                ? 'bg-secondary-background text-fg-secondary'
                : 'bg-primary-background text-fg-accent hover:text-fg-secondary'
                }`}
            >
              {tab}
            </button>
            {/* Progress indicator */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-subtle-stroke">
              {isActive && (
                <div
                  className="h-full bg-black-100"
                  style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Title bar ────────────────────────────────────────────────────────────────

/**
 * Shared slash divider between section label and breadcrumb in the title bar.
 * Uses a 13×26 viewBox so it scales cleanly with the dual-scale pattern.
 */
function TitleSlash(): ReactNode {
  return (
    <svg
      className="shrink-0 text-[#E6E7EA] size-[6px] lg:size-[13px]"
      viewBox="0 0 13 26"
      fill="none"
      aria-hidden
    >
      <path d="m6.5 16 3-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Icon for Monitor tab (activity line chart) */
function MonitorIcon(): ReactNode {
  return (
    <svg className="shrink-0 size-[7px] lg:size-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="#5C5E63" strokeWidth="1.2" />
      <path d="M3 9l2-3 2 2 2-4 2 3" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Icon for Workflows tab (two linked squares) */
function WorkflowIcon(): ReactNode {
  return (
    <svg className="shrink-0 size-[7px] lg:size-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1.25" y="1.25" width="4" height="4" rx="1.5" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8.75" y="8.75" width="4" height="4" rx="2" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7.25V8C2 9.1 2.9 10 4 10H4.75" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 6.75L12 6C12 4.9 11.1 4 10 4H9.25" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/** Icon for Tables tab (grid) */
function TableIcon(): ReactNode {
  return (
    <svg className="shrink-0 size-[7px] lg:size-[14px]" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="#5C5E63" strokeWidth="1.2" />
      <path d="M1 5h12" stroke="#5C5E63" strokeWidth="1.1" />
      <path d="M5.5 5v8" stroke="#5C5E63" strokeWidth="1.1" />
    </svg>
  )
}

/** Per-tab title bar left content definitions */
const TITLE_BAR_DEFS = [
  // Monitor
  { icon: <MonitorIcon />, label: 'Monitor', breadcrumb: null },
  // Workflows
  { icon: <WorkflowIcon />, label: 'Workflows', breadcrumb: 'Patient data automation pipeline' },
  // Tables
  { icon: <TableIcon />, label: 'Tables', breadcrumb: 'Race' },
  // AI
  { icon: <WorkflowIcon />, label: 'Workflows', breadcrumb: 'AI Interface Builder' },
] as const

/**
 * Tab-specific title bar for ProductUIMock.
 * Left side changes per tab; right side (Development badge + action buttons)
 * is shared and only visible at lg scale.
 */
function TitleBar({ activeTab }: { activeTab: TabIdx }): ReactNode {
  const { icon, label, breadcrumb } = TITLE_BAR_DEFS[activeTab]

  return (
    <div className="flex w-full items-center border-b border-[#EEEFF1] py-[6px] lg:pt-3 lg:pb-[11px]">
      <div className="flex w-full items-center justify-between pl-[8px] pr-[5px] lg:pl-[16px] lg:pr-[10px]">

        {/* ── Left: icon + label + optional breadcrumb ── */}
        <div className="flex min-w-0 items-center gap-[4px] lg:gap-[8px]">
          {icon}
          <span className="font-medium text-[#242629] text-[7px] leading-[10px] lg:text-[14px] lg:leading-[20px] lg:tracking-[-0.14px]">
            {label}
          </span>
          {breadcrumb && (
            <>
              <TitleSlash />
              <span className="truncate text-[#5C5E63] text-[7px] leading-[10px] lg:text-[14px] lg:leading-[20px]">
                {breadcrumb}
              </span>
            </>
          )}
        </div>

        {/* ── Right: Development badge + action buttons (lg only) ── */}
        <div className="hidden shrink-0 items-center gap-[4px] lg:flex">

          {/* Development badge */}
          <div className="flex items-center gap-[4px] rounded-[6px] border border-[#E6E7EA] bg-[#FBFBFB] px-[6px] py-[3px]">
            <span className="relative flex size-[6px] shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-[6px] rounded-full bg-green-500" />
            </span>
            <span className="text-[11px] font-medium leading-[16px] text-[#5C5E63]">Development</span>
          </div>

          {/* Help button */}
          <button
            type="button"
            className="flex size-[28px] items-center justify-center rounded-[8px] hover:bg-[#F4F5F6]"
            aria-label="Help"
          >
            <svg className="size-[14px] text-[#5C5E63]" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5.5 5.5a1.5 1.5 0 1 1 1.5 1.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="7" cy="10" r=".5" fill="currentColor" />
            </svg>
          </button>

          {/* Inbox button with red notification dot */}
          <button
            type="button"
            className="relative flex size-[28px] items-center justify-center rounded-[8px] hover:bg-[#F4F5F6]"
            aria-label="Inbox"
          >
            <svg className="size-[14px] text-[#5C5E63]" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 5.5h10v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5Z" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 5.5l2-3h6l2 3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M5 8h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {/* Red dot */}
            <span className="absolute right-[5px] top-[5px] size-[5px] rounded-full bg-red-500" />
          </button>

          {/* Settings / target diamond button */}
          <button
            type="button"
            className="flex size-[28px] items-center justify-center rounded-[8px] hover:bg-[#F4F5F6]"
            aria-label="Settings"
          >
            <svg className="size-[14px] text-[#5C5E63]" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1.5L12.5 7 7 12.5 1.5 7 7 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>

        </div>

      </div>
    </div>
  )
}

// ─── AI chat panel (col 3, tab 4 only) ───────────────────────────────────────

/**
 * Chat panel for Tab 4.
 * Pre-send state: "How can I assist you?" with suggestion pills.
 * After 700ms the message "sends" — suggestions fade out, bubble slides in,
 * input text clears.
 */
function AIChatPanel(): ReactNode {
  const [sent, setSent] = useState(false)
  const message = 'How do I connect Epic with Cerner?'

  const suggestions = [
    'Create a sample HL7 message',
    'Build an interface',
    'Upload mapping document into table',
    'Create interface documentation',
  ]

  useEffect(() => {
    const t = setTimeout(() => setSent(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full flex-col">

      {/* ── Header ── */}
      <div className="shrink-0 border-b border-[#EEEFF1] px-4 py-[10px] flex items-center gap-[10px]">
        <div className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#EDE9FF]">
          <svg className="size-[13px]" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="2.2" stroke="#9162F9" strokeWidth="1.1" />
            <path d="M6.5 1.5v1M6.5 10.5v1M1.5 6.5h1M10.5 6.5h1" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M3.3 3.3l.7.7M9 9l.7.7M3.3 9.7l.7-.7M9 4l.7-.7" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-medium text-[14px] leading-5">Fethr AI</span>
        <div className="ml-auto flex items-center gap-[5px] rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] py-[1px] pl-[5px] pr-[6px]">
          <div className="size-[7px] rounded-full bg-[#0FC27B]" />
          <span className="font-medium text-[12px] leading-4 text-[#075A39]">Live</span>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="relative flex-1 overflow-hidden">

        {/* Pre-send: centered prompt + suggestion pills */}
        <motion.div
          animate={{ opacity: sent ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
        >
          <p className="mb-4 text-center text-[14px] font-medium text-[#232529]">
            How can I assist you?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-[6px]">
            {suggestions.map(s => (
              <span
                key={s}
                className="inline-flex cursor-pointer items-center rounded-full border border-[#D9DADC] bg-transparent px-[10px] py-[5px] text-[11px] text-[#5C5E63] hover:border-[#B0B3B8] hover:text-[#232529] transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Post-send: user message bubble */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={sent ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 px-3 pt-4 flex justify-end"
        >
          <div className="max-w-[85%] rounded-[14px] rounded-br-[4px] border border-[#E6E7EA] bg-[#F4F5F6] px-3 py-2">
            <span className="text-[13px] font-medium leading-[18px] text-[#232529]">{message}</span>
          </div>
        </motion.div>

      </div>

      {/* ── Input bar ── */}
      <div className="shrink-0 border-t border-[#EEEFF1] px-3 py-[9px]">
        <div className="flex items-center gap-2 rounded-xl border border-[#E6E7EA] bg-[#F4F5F6] px-3 py-[7px]">
          <motion.span
            animate={{ opacity: sent ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="flex-1 text-[13px] leading-5 text-[#75777C] truncate"
          >
            {message}
          </motion.span>
          <motion.div
            animate={{ opacity: sent ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="shrink-0 flex size-[22px] items-center justify-center rounded-lg bg-[#232529]"
          >
            <svg className="size-[10px]" viewBox="0 0 10 10" fill="none">
              <path d="M5 8.5V1.5M1.5 5L5 1.5 8.5 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>

    </div>
  )
}

// ─── Product UI mock ──────────────────────────────────────────────────────────

function ProductUIMock({ activeTab }: { activeTab: TabIdx }): ReactNode {
  const showPanel = activeTab === 1 || activeTab === 3

  // Increment chatKey each time tab 3 becomes active so AIChatPanel remounts
  // and the send animation replays on every visit.
  const prevTabRef = useRef(activeTab)
  const [chatKey, setChatKey] = useState(0)
  useEffect(() => {
    if (activeTab === 3 && prevTabRef.current !== 3) {
      setChatKey(k => k + 1)
    }
    prevTabRef.current = activeTab
  }, [activeTab])

  return (
    <div className="relative col-span-12 mx-[calc(50%-50vw)] max-w-screen pl-4 sm:flex sm:justify-center sm:px-6 lg:mx-0 lg:ml-0 lg:w-auto lg:px-20">
      {/* Fade mask at bottom */}
      <div
        className="relative w-full max-w-[570px] p-1 max-sm:pr-0 md:max-w-none"
        style={{ maskImage: 'linear-gradient(to bottom, black, black 65%, transparent 100%)' }}
      >
        <div className="isolate">

          {/* ── Rounded mock card — full width ── */}
          <div
            className="overflow-hidden bg-white-100 h-[320px] lg:h-[640px] pointer-events-none select-none rounded-l-xl lg:rounded-xl border border-default-stroke"
            style={{
              boxShadow: '0px 2px 6px 0px rgba(28,40,64,0.06), 0px 6px 20px -2px rgba(28,40,64,0.08)',
              outline: '4px solid rgba(211,216,223,0.2)',
            }}
          >
            {/* 3-column flex-row */}
            <div className="relative flex h-full">

              {/* ── Col 1: workspace header + sidebar (lg only) ── */}
              <div className="hidden lg:flex flex-col w-[272px] shrink-0 border-r border-[#EEEFF1]">
                <div className="flex items-center h-[48px] gap-[12px] pr-[16px] pl-[12px] border-b border-[#EEEFF1] bg-[#FBFBFB]">
                  <div className="size-[24px] shrink-0 rounded-[7px] bg-gradient-to-br from-blue-500 to-blue-600 border border-[rgba(0,0,0,0.08)]" />
                  <div className="flex h-full flex-1 items-center gap-[4px]">
                    <span className="font-semibold text-[#242629] text-[16px] leading-[20px] tracking-[-0.16px]">Fethr Health</span>
                    <svg className="size-[14px] shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M3 5.25L7 9.25L11 5.25" stroke="#5C5E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <svg width="18" height="18" fill="none" aria-hidden>
                    <g stroke="#75777C" strokeWidth="1.2">
                      <rect x="1.5" y="2.5" width="15" height="13" rx="3" />
                      <path d="M7.8 2.725v12.5" />
                      <path d="M3.975 5.425h1.35M3.975 7.674h1.35" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                </div>
                <ProductSidebar activeTab={activeTab} />
              </div>

              {/* ── Col 2: title bar + main content ── */}
              <div className="flex flex-col flex-1 min-w-0">
                <TitleBar activeTab={activeTab} />
                <div className="flex-1 min-h-0 overflow-hidden">
                  <MainContent activeTab={activeTab} />
                </div>
              </div>

              {/* ── Col 3: runs panel (tab 2) or chat panel (tab 4) — slides in, lg only ── */}
              <div
                className="hidden lg:block shrink-0 overflow-hidden transition-[max-width] duration-[1000ms] ease-out"
                style={{ maxWidth: showPanel ? 300 : 0 }}
              >
                <div
                  className="flex h-full w-[300px] flex-col border-l border-[#EEEFF1] bg-white transition-transform duration-[1000ms] ease-out"
                  style={{ transform: showPanel ? 'translateX(0)' : 'translateX(100%)' }}
                >
                  {activeTab === 3
                    ? <AIChatPanel key={chatKey} />
                    : <RunsPanel />
                  }
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

// ─── Sticky testimonial ───────────────────────────────────────────────────────

/** Words of the testimonial quote. '|' = optional line-break, not a word. */
const QUOTE_WORDS: readonly string[] = [
  '"When', 'I', 'first', 'opened', 'Attio,', '|',
  'I', 'instantly', 'got', 'the', 'feeling', 'this', 'was', '|',
  'the', 'next', 'generation', 'of', 'CRM."',
]

const WORD_COUNT = QUOTE_WORDS.filter(w => w !== '|').length

/**
 * Scroll-driven word-by-word colour reveal — faded gray → dark.
 * Words start appearing at 5% scroll progress through this section
 * and are fully revealed by 50%, leaving the rest for reading time.
 */
function StickyTestimonial(): ReactNode {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [wordsLit, setWordsLit] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const wordsLitMV = useTransform(scrollYProgress, [0.3, 1], [0, WORD_COUNT])

  useMotionValueEvent(wordsLitMV, 'change', v => {
    setWordsLit(Math.min(WORD_COUNT, Math.max(0, Math.round(v))))
  })

  return (
    <section
      ref={sectionRef}
      className="flex w-full max-w-screen flex-col items-center justify-center overflow-x-clip bg-gradient-to-b from-[#FAFAFB] to-[#FFFFFF] relative"
    >
      <div className="container">
        {/*
         * Tall container = sticky pin distance.
         * 1678px ≈ height of the hero overlay; + 200vh gives extra time to
         * read the testimonial after the hero has scrolled away.
         */}
        <div
          className="relative w-full max-w-[1392px] border-subtle-stroke lg:border-x"
          style={{ height: 'calc(1678px + 200vh)' }}
        >
          <div
            className="sticky grid h-[calc(100vh-var(--site-header-height))] w-full justify-center gap-[36px] lg:grid-rows-2 lg:gap-[52px] lg:px-6 lg:pt-[72px]"
            style={{ top: 'var(--site-header-height)' }}
          >
            {/* Dot pattern bg */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 h-[120%]">
                <svg width="100%" height="100%" className="h-full w-full text-white-700" aria-hidden>
                  <defs>
                    <pattern id="hero-dot-bg" width="10" height="10" patternUnits="userSpaceOnUse">
                      <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-dot-bg)" />
                </svg>
              </div>
            </div>

            {/* Quote — scroll-driven word-by-word colour reveal */}
            <p className="max-w-[18em] self-end px-6 text-center text-[35px] text-heading-sm lg:text-heading-lg relative z-10">
              {(() => {
                let wordIdx = 0
                return QUOTE_WORDS.map((w, i) => {
                  if (w === '|') return <br key={i} className="hidden md:block" />
                  const thisIdx = wordIdx++
                  const isLit = thisIdx < wordsLit
                  return (
                    <span
                      key={i}
                      className="relative font-display inline-flex transition-colors duration-[350ms] ease-out"
                      style={{ color: isLit ? 'rgb(23, 25, 29)' : 'rgb(202, 208, 217)' }}
                    >
                      {w}<span>&nbsp;</span>
                    </span>
                  )
                })
              })()}
            </p>

            {/* Attribution — always visible, clarifies once all words are lit */}
            <p
              className="flex flex-col items-center px-6 text-center relative z-10 transition-colors duration-700 ease-out"
              style={{
                color: wordsLit >= WORD_COUNT ? 'rgb(100, 110, 125)' : 'rgb(202, 208, 217)',
              }}
            >
              <span className="font-bold text-[14px] lg:text-base">Margaret Chen&nbsp;</span>
              <span className="text-[13px] lg:text-sm">Head of Business Operations · Modal</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile bottom dashed divider */}
      <svg width="100%" height="1" className="text-subtle-stroke absolute inset-x-0 bottom-0 lg:hidden" aria-hidden>
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
      </svg>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function HomeHeroSection(): ReactNode {
  const [activeTab, setActiveTab] = useState<TabIdx>(0)
  const [progress, setProgress] = useState(0)

  // Refs track mutable state inside the interval — avoids React StrictMode's
  // double-invocation of state updaters which would otherwise skip a tab each cycle.
  const tabRef = useRef<TabIdx>(0)
  const progressRef = useRef(0)

  useEffect(() => {
    const step = 100 / (TAB_MS / TICK_MS)
    const id = setInterval(() => {
      progressRef.current += step
      if (progressRef.current >= 100) {
        progressRef.current = 0
        const next = ((tabRef.current + 1) % TABS.length) as TabIdx
        tabRef.current = next
        setActiveTab(next)
      }
      setProgress(progressRef.current)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  const handleTabSelect = (i: TabIdx): void => {
    tabRef.current = i
    progressRef.current = 0
    setActiveTab(i)
    setProgress(0)
  }

  return (
    <div className="relative max-w-screen overflow-x-clip">

      {/* ── Layer 1: sticky testimonial (background) ── */}
      <StickyTestimonial />

      {/* ── Layer 2: hero overlay (absolute, scrolls normally) ── */}
      <div className="absolute inset-x-0 top-0 overflow-x-clip border-b border-subtle-stroke bg-primary-background">
        <div className="relative grid">

          {/* Hero content — badge, h1, subtitle, CTAs */}
          <div className="container">
            <div className="flex flex-col items-center relative mt-24 mb-18 max-xl:mt-20 max-lg:mt-20 max-lg:mb-16">
              <AnnouncementBadge />
              <h1 className="mt-6 max-w-[14ch] font-display text-center text-heading-md md:text-heading-lg lg:text-heading-xl">
                Customer relationship magic.
              </h1>
              <p className="mt-4 max-w-md text-pretty text-center text-lg text-accent-foreground md:text-xl">
                Fethr is the AI CRM for health GTM teams.
              </p>
              <HeroCTAs />
            </div>
          </div>

          {/* Tab + product UI section */}
          <div className="relative border-t border-subtle-stroke bg-gradient-to-b from-[#FDFDFD] to-white-100">
            {/* Horizontal dashed accent line */}
            <DashedH className="text-subtle-stroke absolute inset-x-0 top-[11.5rem] lg:top-36" />

            <div className="container grid grid-cols-12">
              <div className="relative col-span-12 pb-7 lg:col-[2/-2]">
                {/* Dashed vertical side borders */}
                <DashedV className="text-subtle-stroke absolute -left-px top-0 h-full" />
                <DashedV className="text-subtle-stroke absolute -right-px top-0 h-full" />

                {/* Tab switcher */}
                <TabBar
                  activeTab={activeTab}
                  progress={progress}
                  onSelect={handleTabSelect}
                />
              </div>

              {/* Product UI mock (full-width breakout) */}
              <ProductUIMock activeTab={activeTab} />
            </div>
          </div>

          {/* Company logos — below the product mock, inside the hero overlay */}
          <CompaniesSection maxLogos={6} />

        </div>
      </div>

    </div>
  )
}
