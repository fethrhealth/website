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
import {
  ANNOUNCEMENT_TEXT, ANNOUNCEMENT_HREF,
  HERO_HEADING, HERO_SUBHEADING, HERO_CTA_PRIMARY, HERO_CTA_PRIMARY_HREF,
  TABS,
  SIDEBAR_QUICK_ACTIONS_LABEL, SIDEBAR_KBD_PRIMARY, SIDEBAR_KBD_SEARCH,
  SIDEBAR_SECTION_MONITORING, SIDEBAR_SECTION_TOOLS, SIDEBAR_SECTION_BILLING, SIDEBAR_SECTION_SETTINGS,
  SIDEBAR_ITEM_MONITOR, SIDEBAR_ITEM_LOGS, SIDEBAR_ITEM_TABLES, SIDEBAR_ITEM_SCHEMAS,
  SIDEBAR_ITEM_INTEGRATIONS, SIDEBAR_ITEM_PLUGINS, SIDEBAR_ITEM_CREDENTIALS, SIDEBAR_ITEM_WORKFLOWS,
  SIDEBAR_ITEM_USAGE, SIDEBAR_ITEM_BILLING, SIDEBAR_ITEM_SETTINGS,
  TOOLBAR_FILTER, TOOLBAR_SORT, TOOLBAR_CLEAR_ALL, FILTER_FIELD, FILTER_IS,
  MONITOR_TOOLBAR_REFRESH, MONITOR_TOOLBAR_SEARCH,
  MONITOR_FILTER_STATUS,
  MONITOR_TABLE_HEADERS,
  MONITOR_STATUS_STARTING, MONITOR_STATUS_STARTED, MONITOR_STATUS_STOPPED,
  MONITOR_SELECTION_COUNT, MONITOR_ACTION_START_ALL, MONITOR_ACTION_STOP_ALL, MONITOR_ACTION_RESTART_ALL,
  CONNECTORS, type ConnectorRow,
  TABLES_TOOLBAR_INSERT, TABLES_FILTER_STATUS,
  TABLES_COL_ID_LABEL, TABLES_COL_ID_TYPE, TABLES_COL_DATA_TYPE, TABLES_COLUMNS,
  RACE_ROWS, type RaceRow,
  BADGE_COMPLETED, BADGE_RUNNING,
  RUNS_CURRENT_RUN, RUNS_PANEL_STEP_COUNT, RUNS_PANEL_EXECUTING, RUNS_PANEL_COMPLETED_LABEL, RUNS_PANEL_OVERVIEW,
  RUNS_STAT_COMPLETED_VAL, RUNS_STAT_COMPLETED_LBL, RUNS_STAT_FAILED_VAL, RUNS_STAT_FAILED_LBL,
  RUNS_STAT_IN_PROGRESS_VAL, RUNS_STAT_IN_PROGRESS_LBL, RUNS_STAT_AVG_VAL, RUNS_STAT_AVG_UNIT, RUNS_STAT_AVG_LBL,
  WORKFLOW_TAB_EDITOR, WORKFLOW_TAB_RUNS, WORKFLOW_TAB_LIVE, WORKFLOW_TAB_TRIGGER,
  WORKFLOWS_RUN_NUM,
  WORKFLOW_CARD1_TITLE, WORKFLOW_CARD1_SUBTITLE, WORKFLOW_CARD1_TAG,
  WORKFLOW_CARD2_TITLE, WORKFLOW_CARD2_SUBTITLE, WORKFLOW_CARD2_TAG,
  AI_RUN_NUM,
  AI_CARD1_TITLE, AI_CARD1_SUBTITLE, AI_CARD1_TAG,
  AI_CARD2_TITLE, AI_CARD2_SUBTITLE, AI_CARD2_TAG,
  AI_CARD3_TITLE, AI_CARD3_SUBTITLE, AI_CARD3_TAG,
  TITLEBAR_LABEL_MONITOR, TITLEBAR_LABEL_WORKFLOWS, TITLEBAR_LABEL_TABLES,
  TITLEBAR_BREADCRUMB_WORKFLOWS, TITLEBAR_BREADCRUMB_TABLES, TITLEBAR_BREADCRUMB_AI,
  TITLEBAR_BADGE_DEVELOPMENT,
  WORKSPACE_NAME,
  AI_CHAT_TITLE, AI_CHAT_LIVE_LABEL, AI_CHAT_PROMPT, AI_CHAT_MESSAGE, AI_CHAT_SUGGESTIONS,
  QUOTE_WORDS, TESTIMONIAL_NAME, TESTIMONIAL_ROLE,
} from '@/data/home-hero'
import {
  DashedH, DashedV, TitleSlash,
  AnnouncementChevronIcon,
  SidebarMonitorIcon, SidebarLogsIcon, SidebarTablesIcon, SidebarSchemasIcon,
  SidebarIntegrationsIcon, SidebarPluginsIcon, SidebarCredentialsIcon, SidebarWorkflowsIcon,
  SidebarUsageIcon, SidebarBillingIcon, SidebarSettingsIcon, SidebarQuickActionsIcon, SidebarSearchIcon,
  ToolbarFilterIcon, ToolbarSortIcon, ToolbarRefreshIcon, ToolbarSearchIcon as ToolbarSearchSvg, ToolbarCloseXIcon,
  SortChevronIcon, TableKeyIcon,
  CheckboxCheckIcon, StartAllIcon, StopAllIcon, RestartAllIcon,
  BadgeCheckIcon, BadgeSpinnerIcon,
  WorkflowEditorTabIcon, WorkflowRunsTabIcon, TriggerCircleIcon,
  WorkflowPatientCardIcon, WorkflowMapRecordCardIcon,
  AIEpicOrdersCardIcon, AIMapDataCardIcon, AIOutboundOrdersCardIcon,
  RunExecutingSpinIcon, RunCompletedCheckCircleIcon, RunStepHexIcon,
  StatCompletedIcon, StatFailedIcon, StatInProgressIcon, StatAvgRuntimeIcon,
  TitleBarHelpIcon, TitleBarInboxIcon, TitleBarSettingsIcon,
  WorkspaceChevronDownIcon, WorkspaceSidebarToggleIcon,
  AIChatSparkleIcon, AIChatSendIcon,
  HeroDotPatternSvg,
  MonitorIcon, WorkflowIcon, TableIcon,
} from '@/components/icons/HomeHeroIcons'

// ─── Config ──────────────────────────────────────────────────────────────────

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

// ─── Announcement badge ───────────────────────────────────────────────────────

function AnnouncementBadge(): ReactNode {
  return (
    <Link
      href={ANNOUNCEMENT_HREF}
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
        <span className="text-balance">{ANNOUNCEMENT_TEXT}</span>
        <AnnouncementChevronIcon />
      </div>
    </Link>
  )
}

// ─── CTA row ─────────────────────────────────────────────────────────────────

function HeroCTAs(): ReactNode {
  return (
    <div className="flex items-center justify-center gap-y-2 max-md:flex-col max-md:items-center mt-6 w-full gap-x-2">
      {/* Desktop primary — hidden for now */}
      {/* <Link
        href={HERO_CTA_PRIMARY_HREF}
        className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-primary max-md:hidden"
      >
        {HERO_CTA_PRIMARY}
      </Link> */}

      {/* Mobile email form — hidden for now */}
      {/* <DemoRequestForm
        source='home'
      /> */}

      {/* Desktop outline */}
      <TalkToSalesDialog
        source="home-hero"
        className="relative inline-flex cursor-pointer items-center justify-center text-nowrap border transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50 h-9 gap-x-1.5 rounded-[10px] px-3 text-sm max-lg:h-11.5 max-lg:gap-x-2 max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base button-primary max-md:hidden"
      />
    </div>
  )
}

// ─── Product sidebar ──────────────────────────────────────────────────────────
// Copy of the client's actual dashboard panel sidebar.

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
              <SidebarQuickActionsIcon />
              <span className="font-medium text-[14px] leading-5 tracking-[-0.28px]">{SIDEBAR_QUICK_ACTIONS_LABEL}</span>
            </div>
            <div className={KBD}><span className={KBD_SPAN}>{SIDEBAR_KBD_PRIMARY}</span></div>
          </div>
          <div className={`rounded-lg bg-primary-background ${BTN_SHADOW} flex items-center gap-x-1.5 py-1 pr-1 pl-1.5`}>
            <SidebarSearchIcon />
            <div className={KBD}><span className={KBD_SPAN}>{SIDEBAR_KBD_SEARCH}</span></div>
          </div>
        </div>

        {/* Nav sections */}
        <div className="flex flex-col gap-[9px] overflow-y-hidden">

          {/* Monitoring */}
          <div className="flex flex-col">
            <SideSection label={SIDEBAR_SECTION_MONITORING} />
            <ul className="flex flex-col gap-px">
              <SideItem icon={<SidebarMonitorIcon />} label={SIDEBAR_ITEM_MONITOR} active={hl === 'monitor'} />
              <SideItem icon={<SidebarLogsIcon />} label={SIDEBAR_ITEM_LOGS} />
            </ul>
          </div>

          <SideDivider />

          {/* Tools & Analytics */}
          <div className="flex flex-col">
            <SideSection label={SIDEBAR_SECTION_TOOLS} />
            <ul className="flex flex-col gap-px">
              <SideItem icon={<SidebarTablesIcon />} label={SIDEBAR_ITEM_TABLES} active={hl === 'tables'} />
              <SideItem icon={<SidebarSchemasIcon />} label={SIDEBAR_ITEM_SCHEMAS} />
              <SideItem icon={<SidebarIntegrationsIcon />} label={SIDEBAR_ITEM_INTEGRATIONS} />
              <SideItem icon={<SidebarPluginsIcon />} label={SIDEBAR_ITEM_PLUGINS} />
              <SideItem icon={<SidebarCredentialsIcon />} label={SIDEBAR_ITEM_CREDENTIALS} />
              <SideItem icon={<SidebarWorkflowsIcon />} label={SIDEBAR_ITEM_WORKFLOWS} active={hl === 'workflows'} />
            </ul>
          </div>

          <SideDivider />

          {/* Billing */}
          <div className="flex flex-col">
            <SideSection label={SIDEBAR_SECTION_BILLING} />
            <ul className="flex flex-col gap-px">
              <SideItem icon={<SidebarUsageIcon />} label={SIDEBAR_ITEM_USAGE} />
              <SideItem icon={<SidebarBillingIcon />} label={SIDEBAR_ITEM_BILLING} />
            </ul>
          </div>

          <SideDivider />

          {/* Settings */}
          <div className="flex flex-col">
            <SideSection label={SIDEBAR_SECTION_SETTINGS} />
            <ul className="flex flex-col gap-px">
              <SideItem icon={<SidebarSettingsIcon />} label={SIDEBAR_ITEM_SETTINGS} />
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Monitor content (tab 0) ─────────────────────────────────────────────────


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
  const [phase, setPhase] = useState<'entering' | 'selected' | 'pressing' | 'starting' | 'started'>('entering')

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
    // Total budget: TAB_MS (5000ms). With enterDone ≈ 1400ms, all phases must land < 4800ms.
    const t1 = setTimeout(() => setPhase('selected'),  enterDone + 200)  // bar slides in, rows selected, status still Stopped
    const t2 = setTimeout(() => setPhase('pressing'),  enterDone + 800)  // Start All button visually pressed
    const t3 = setTimeout(() => setPhase('starting'),  enterDone + 1200) // → blue spinner "Starting"
    const t4 = setTimeout(() => setPhase('started'),   enterDone + 2500) // → green "Started"

    return () => { clearInterval(rowId); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  const rowColor = (i: number): string => {
    if (i < 2) {
      if (phase === 'starting') return '#3b82f6'
      if (phase === 'started') return '#10b981'
    }
    return '#ef4444'
  }

  const rowLabel = (i: number): string => {
    if (i < 2) {
      if (phase === 'starting') return MONITOR_STATUS_STARTING
      if (phase === 'started') return MONITOR_STATUS_STARTED
    }
    return MONITOR_STATUS_STOPPED
  }

  const showBar        = phase !== 'entering'
  const startAllPressed = phase === 'pressing'

  return (
    <div className="flex h-full flex-col bg-white overflow-hidden">

      {/* ── Toolbar ── */}
      <div className="shrink-0 flex flex-wrap items-center gap-[3px] lg:gap-[6px] px-[3px] py-[3px] lg:px-[12px] lg:py-[10px] border-b border-gray-200">
        {/* Filter */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-600 hover:bg-gray-100 rounded h-[9px] lg:h-[26px]">
          <ToolbarFilterIcon className="lg:w-[13px] lg:h-[13px]" />
          <span>{TOOLBAR_FILTER}</span>
        </button>
        {/* Sort */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-600 hover:bg-gray-100 rounded h-[9px] lg:h-[26px]">
          <ToolbarSortIcon className="lg:w-[13px] lg:h-[13px]" />
          <span>{TOOLBAR_SORT}</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Refresh */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-700 border border-gray-300 rounded h-[9px] lg:h-[26px]">
          <ToolbarRefreshIcon className="lg:w-[13px] lg:h-[13px]" />
          <span>{MONITOR_TOOLBAR_REFRESH}</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Status filter chip */}
        <div className="flex items-center bg-white border border-gray-200 rounded text-[4.5px] lg:text-[11px] overflow-hidden leading-none">
          <div className="flex items-center gap-[1px] lg:gap-[4px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] bg-gray-50 border-r border-gray-200">
            <span className="text-gray-700 capitalize">{FILTER_FIELD}</span>
          </div>
          <div className="px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600 border-r border-gray-200">{FILTER_IS}</div>
          <div className="flex items-center gap-[2px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-red-500" />
            <span>{MONITOR_FILTER_STATUS}</span>
          </div>
          <button type="button" className="px-[2px] py-[1px] lg:px-[6px] lg:py-[4px] text-gray-400 border-l border-gray-200">
            <ToolbarCloseXIcon className="lg:w-[8px] lg:h-[8px]" />
          </button>
        </div>
        <button type="button" className="text-[4.5px] lg:text-[11px] text-gray-600 px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] hover:bg-gray-100 rounded">{TOOLBAR_CLEAR_ALL}</button>
        <div className="flex-1" />
        {/* Search */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-700 border border-gray-300 rounded h-[9px] lg:h-[26px]">
          <ToolbarSearchSvg className="lg:w-[13px] lg:h-[13px]" />
          <span className="hidden lg:inline">{MONITOR_TOOLBAR_SEARCH}</span>
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
              {(MONITOR_TABLE_HEADERS as readonly string[]).map((h, ci) => (
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
                      {selected && <CheckboxCheckIcon className="lg:w-[10px] lg:h-[10px]" />}
                    </div>
                  </td>
                  {/* Status */}
                  <td className="px-[2px] lg:px-[16px] py-[5px] lg:py-[10px]">
                    <div className="flex items-center gap-[3px] lg:gap-[6px]">
                      {selected && phase === 'starting' ? (
                        <svg
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                          className="w-[7px] h-[7px] lg:w-[14px] lg:h-[14px] shrink-0 animate-spin"
                          aria-hidden="true"
                        >
                          <circle cx="7" cy="7" r="6" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3.14 0" strokeDashoffset="-0.7" />
                          <circle cx="7" cy="7" r="2" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="11.309733552923255 22.61946710584651" strokeDashoffset="5.654866776461628" transform="rotate(-90 7 7)" />
                        </svg>
                      ) : (
                        <div className="size-[5px] lg:size-[10px] rounded-full shrink-0 transition-colors duration-500" style={{ backgroundColor: color }} />
                      )}
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
            <span className="text-[4.5px] lg:text-[13px] font-medium text-gray-700">{MONITOR_SELECTION_COUNT}</span>
            <button type="button" className="text-gray-400">
              <ToolbarCloseXIcon className="lg:w-[10px] lg:h-[10px]" />
            </button>
          </div>
          <div className="h-[5px] lg:h-[20px] w-px bg-gray-200" />
          {/* Actions */}
          <div className="flex items-center gap-[2px] lg:gap-[6px]">
            {/* Start All — pressed state animates during 'pressing' phase */}
            <button
              type="button"
              className="flex items-center gap-[2px] lg:gap-[6px] px-[2px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4px] lg:text-[13px] rounded transition-all duration-150"
              style={{
                backgroundColor: startAllPressed ? '#e5e7eb' : 'transparent',
                color:           '#374151',
                transform:       startAllPressed ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              <StartAllIcon className="lg:w-[13px] lg:h-[13px]" />
              {MONITOR_ACTION_START_ALL}
            </button>
            {/* Stop All */}
            <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[2px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4px] lg:text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <StopAllIcon className="lg:w-[13px] lg:h-[13px]" />
              {MONITOR_ACTION_STOP_ALL}
            </button>
            {/* Restart All */}
            <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[2px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4px] lg:text-[13px] text-gray-700 hover:bg-gray-100 rounded transition-colors">
              <RestartAllIcon className="lg:w-[13px] lg:h-[13px]" />
              {MONITOR_ACTION_RESTART_ALL}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Tables content (tab 2) ──────────────────────────────────────────────────


/** Shared chevron-down sort button used in each column header */
function SortChevron(): ReactNode {
  return (
    <button type="button" className="opacity-50 flex shrink-0 items-center justify-center p-px hover:bg-gray-200 rounded">
      <SortChevronIcon className="lg:w-[10px] lg:h-[10px]" />
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
          <ToolbarFilterIcon className="lg:w-[13px] lg:h-[13px]" />
          <span>{TOOLBAR_FILTER}</span>
        </button>
        {/* Sort */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-600 hover:bg-gray-100 rounded h-[9px] lg:h-[26px]">
          <ToolbarSortIcon className="lg:w-[13px] lg:h-[13px]" />
          <span>{TOOLBAR_SORT}</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Insert */}
        <button type="button" className="flex items-center gap-[2px] lg:gap-[6px] px-[3px] py-[1px] lg:px-[10px] lg:py-[4px] text-[4.5px] lg:text-[12px] text-gray-700 border border-gray-300 rounded h-[9px] lg:h-[26px]">
          <SortChevronIcon className="lg:w-[13px] lg:h-[13px]" />
          <span>{TABLES_TOOLBAR_INSERT}</span>
        </button>
        <div className="h-[8px] lg:h-[20px] w-px bg-gray-200" />
        {/* Status filter chip — "Started" green */}
        <div className="flex items-center bg-white border border-gray-200 rounded text-[4.5px] lg:text-[11px] overflow-hidden leading-none">
          <div className="flex items-center gap-[1px] lg:gap-[4px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] bg-gray-50 border-r border-gray-200">
            <span className="text-gray-700 capitalize">{FILTER_FIELD}</span>
          </div>
          <div className="px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600 border-r border-gray-200">{FILTER_IS}</div>
          <div className="flex items-center gap-[2px] px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] text-gray-600">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-green-500" />
            <span>{TABLES_FILTER_STATUS}</span>
          </div>
          <button type="button" className="px-[2px] py-[1px] lg:px-[6px] lg:py-[4px] text-gray-400 border-l border-gray-200">
            <ToolbarCloseXIcon className="lg:w-[8px] lg:h-[8px]" />
          </button>
        </div>
        <button type="button" className="text-[4.5px] lg:text-[11px] text-gray-600 px-[2px] py-[1px] lg:px-[8px] lg:py-[4px] hover:bg-gray-100 rounded">{TOOLBAR_CLEAR_ALL}</button>
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
                  <TableKeyIcon className="text-green-600 shrink-0 lg:w-[10px] lg:h-[10px]" />
                  <span className="font-medium text-[6px] lg:text-[10px] text-gray-900 uppercase tracking-wider whitespace-nowrap">{TABLES_COL_ID_LABEL}</span>
                  <span className="text-gray-500 text-[5px] lg:text-[9px] whitespace-nowrap">{TABLES_COL_ID_TYPE}</span>
                </div>
                <SortChevron />
              </div>
              {/* standard race */}
              {(TABLES_COLUMNS as ReadonlyArray<{ label: string; w: string }>).map((col, ci, arr) => (
                <div key={col.label} className={`flex items-center justify-between bg-gray-50 shrink-0 ${col.w} ${cp}${ci < arr.length - 1 ? ' border-r border-gray-200' : ''}`}>
                  <div className="flex items-center gap-[2px] lg:gap-[4px] min-w-0 flex-1">
                    <span className="font-medium text-[6px] lg:text-[12px] text-gray-900 uppercase tracking-wider whitespace-nowrap">{col.label}</span>
                    <span className="text-gray-500 text-[5px] lg:text-[10px] whitespace-nowrap">{TABLES_COL_DATA_TYPE}</span>
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
      <BadgeCheckIcon className="size-3" />
      <span className="text-[#0FC27B]">{BADGE_COMPLETED}</span>
    </span>
  )
  if (phase === 'running') return (
    <span className="inline-flex items-center gap-[5px] rounded-md border border-[#E8DDFE] bg-[#F5F0FF] px-[5px] pr-1.5 py-px text-[12px] font-medium leading-4">
      <BadgeSpinnerIcon className="size-3 animate-spin" />
      <span className="text-[#9162F9]">{BADGE_RUNNING}</span>
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
  return (
    <div className="flex h-full flex-col overflow-hidden">

      {/* Run #current — executing */}
      <div className="border-b border-[#EEEFF1] px-0.5 py-0.5">
        <div className="flex items-center gap-x-2 rounded-md bg-[#FBFBFB] px-3.5 pt-2.5 pb-[9px]">
          <RunExecutingSpinIcon className="animate-spin shrink-0" />
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] w-[58px]">Run #{RUNS_CURRENT_RUN}</span>
          <span className="flex-1 text-right font-medium text-[12px] leading-4 text-[#75777C]">{RUNS_PANEL_EXECUTING}</span>
        </div>
      </div>

      {/* Run #prev — completed */}
      <div className="border-b border-[#EEEFF1] px-0.5 py-0.5">
        <div className="flex items-center gap-x-2 rounded-md px-3.5 pt-2.5 pb-[9px]">
          <RunCompletedCheckCircleIcon className="shrink-0" />
          <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] w-[58px]">Run #{RUNS_CURRENT_RUN - 1}</span>
          <div className="flex items-center gap-[4px] rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] px-[5px] py-px text-[12px] text-[#5C5E63]">
            <RunStepHexIcon />
            <span>{RUNS_PANEL_STEP_COUNT}</span>
          </div>
          <span className="flex-1 text-right font-medium text-[12px] leading-4 text-[#75777C]">{RUNS_PANEL_COMPLETED_LABEL}</span>
        </div>
      </div>

      {/* Overview stats — pinned to bottom */}
      <div className="mt-auto border-t border-[#EEEFF1] px-3 pt-[5px] pb-3">
        <span className="ml-1 font-medium text-[12px] leading-4 text-[#75777C]">{RUNS_PANEL_OVERVIEW}</span>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {/* Completed */}
          <div className="relative flex flex-col rounded-xl border border-[#E7F6EF] bg-[linear-gradient(263deg,rgba(15,194,123,0.08)_6.86%,rgba(15,194,123,0.02)_96.69%)] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <StatCompletedIcon />
            </div>
            <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#095A39]">{RUNS_STAT_COMPLETED_VAL}</span>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">{RUNS_STAT_COMPLETED_LBL}</span>
          </div>
          {/* Failed */}
          <div className="relative flex flex-col rounded-xl border border-[#FEE7E7] bg-[linear-gradient(263deg,rgba(255,109,107,0.08)_6.86%,rgba(255,109,107,0.02)_96.69%)] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <StatFailedIcon />
            </div>
            <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#772322]">{RUNS_STAT_FAILED_VAL}</span>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">{RUNS_STAT_FAILED_LBL}</span>
          </div>
          {/* In progress */}
          <div className="relative flex flex-col rounded-xl border border-[#EEEFF1] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <StatInProgressIcon />
            </div>
            <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#232529]">{RUNS_STAT_IN_PROGRESS_VAL}</span>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">{RUNS_STAT_IN_PROGRESS_LBL}</span>
          </div>
          {/* Avg runtime */}
          <div className="relative flex flex-col rounded-xl border border-[#EEEFF1] px-[11px] py-[9px]">
            <div className="absolute top-[9px] right-[11px]">
              <StatAvgRuntimeIcon />
            </div>
            <div className="flex items-end">
              <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#232529]">{RUNS_STAT_AVG_VAL}</span>
              <span className="font-medium text-[11px] mb-[1px] ml-[5px] text-[#9FA1A7]">{RUNS_STAT_AVG_UNIT}</span>
            </div>
            <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">{RUNS_STAT_AVG_LBL}</span>
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
  const runNum = WORKFLOWS_RUN_NUM

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
              <WorkflowEditorTabIcon className="size-[7px] lg:size-[14px]" />
              <span className="font-medium text-[7px] lg:text-[14px] text-[#75777C]">{WORKFLOW_TAB_EDITOR}</span>
            </div>
            {/* Runs (active) */}
            <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] py-[1.5px] pr-[2px] pl-[2.5px] lg:py-[3px] lg:pr-[4px] lg:pl-[5px] cursor-pointer">
              <WorkflowRunsTabIcon className="size-[7px] lg:size-[14px]" />
              <span className="font-medium text-[7px] lg:text-[14px]">{WORKFLOW_TAB_RUNS}</span>
              <span className="inline-flex items-center justify-center border border-[#EEEFF1] bg-white text-[#5C5E63] h-[7px] lg:h-[14px] min-w-[7px] lg:min-w-[16px] px-[2px] lg:px-[3px] rounded-sm text-[4px] lg:text-[10px]">
                {runNum}
              </span>
            </div>
          </div>
          {/* Right: Live badge */}
          <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] py-px pl-[2.5px] pr-[3px] lg:py-[1px] lg:pl-[5px] lg:pr-[6px]">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-[#0FC27B]" />
            <span className="font-medium text-[5px] lg:text-[12px] leading-4 text-[#075A39]">{WORKFLOW_TAB_LIVE}</span>
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
                <TriggerCircleIcon className="size-3" />
                <span className="text-[12px] font-medium text-[#75777C]">{WORKFLOW_TAB_TRIGGER}</span>
              </div>
              <WorkflowCardNode
                phase={card1}
                title={WORKFLOW_CARD1_TITLE}
                subtitle={WORKFLOW_CARD1_SUBTITLE}
                tag={WORKFLOW_CARD1_TAG}
                dotColor="#0FC27B"
                icon={<WorkflowPatientCardIcon className="size-5 shrink-0" />}
              />
            </div>

            {/* Connector */}
            <WorkflowConnector active={connector} />

            {/* Card 2 */}
            <WorkflowCardNode
              phase={card2}
              title={WORKFLOW_CARD2_TITLE}
              subtitle={WORKFLOW_CARD2_SUBTITLE}
              tag={WORKFLOW_CARD2_TAG}
              dotColor="#266DF0"
              icon={<WorkflowMapRecordCardIcon className="size-5 shrink-0" />}
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
  const runNum = AI_RUN_NUM
  const [card1, setCard1] = useState(false)
  const [card2, setCard2] = useState(false)
  const [card3, setCard3] = useState(false)
  const [conn1, setConn1] = useState(false)
  const [conn2, setConn2] = useState(false)

  useEffect(() => {
    // AIChatPanel sends the message at 700ms — cards must appear after that.
    // +1100ms offset gives a natural "AI is generating" pause after send.
    const OFFSET = 1100
    const t1 = setTimeout(() => setCard1(true), OFFSET + 200)
    const t2 = setTimeout(() => setConn1(true), OFFSET + 700)
    const t3 = setTimeout(() => setCard2(true), OFFSET + 950)
    const t4 = setTimeout(() => setConn2(true), OFFSET + 1500)
    const t5 = setTimeout(() => setCard3(true), OFFSET + 1750)
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
              <WorkflowEditorTabIcon className="size-[7px] lg:size-[14px]" />
              <span className="font-medium text-[7px] lg:text-[14px] text-[#75777C]">{WORKFLOW_TAB_EDITOR}</span>
            </div>
            {/* Runs (active) */}
            <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#EEEFF1] bg-[#F4F5F6] py-[1.5px] pr-[2px] pl-[2.5px] lg:py-[3px] lg:pr-[4px] lg:pl-[5px] cursor-pointer">
              <WorkflowRunsTabIcon className="size-[7px] lg:size-[14px]" />
              <span className="font-medium text-[7px] lg:text-[14px]">{WORKFLOW_TAB_RUNS}</span>
              <span className="inline-flex items-center justify-center border border-[#EEEFF1] bg-white text-[#5C5E63] h-[7px] lg:h-[14px] min-w-[7px] lg:min-w-[16px] px-[2px] lg:px-[3px] rounded-sm text-[4px] lg:text-[10px]">
                {runNum}
              </span>
            </div>
          </div>
          {/* Live badge */}
          <div className="flex items-center gap-[2px] lg:gap-[6px] rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] py-px pl-[2.5px] pr-[3px] lg:py-[1px] lg:pl-[5px] lg:pr-[6px]">
            <div className="size-[3px] lg:size-[8px] rounded-full bg-[#0FC27B]" />
            <span className="font-medium text-[5px] lg:text-[12px] leading-4 text-[#075A39]">{WORKFLOW_TAB_LIVE}</span>
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
                <TriggerCircleIcon className="size-3" />
                <span className="text-[12px] font-medium text-[#75777C]">{WORKFLOW_TAB_TRIGGER}</span>
              </div>
              <AIBuildCard
                visible={card1}
                title={AI_CARD1_TITLE}
                subtitle={AI_CARD1_SUBTITLE}
                tag={AI_CARD1_TAG}
                icon={<AIEpicOrdersCardIcon className="size-5 shrink-0" />}
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
              title={AI_CARD2_TITLE}
              subtitle={AI_CARD2_SUBTITLE}
              tag={AI_CARD2_TAG}
              icon={<AIMapDataCardIcon className="size-5 shrink-0" />}
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
              title={AI_CARD3_TITLE}
              subtitle={AI_CARD3_SUBTITLE}
              tag={AI_CARD3_TAG}
              icon={<AIOutboundOrdersCardIcon className="size-5 shrink-0" />}
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

/** Per-tab title bar left content definitions */
const TITLE_BAR_DEFS = [
  // Monitor
  { icon: <MonitorIcon className="shrink-0 size-[7px] lg:size-[14px]" />, label: TITLEBAR_LABEL_MONITOR,   breadcrumb: null },
  // Workflows
  { icon: <WorkflowIcon className="shrink-0 size-[7px] lg:size-[14px]" />, label: TITLEBAR_LABEL_WORKFLOWS, breadcrumb: TITLEBAR_BREADCRUMB_WORKFLOWS },
  // Tables
  { icon: <TableIcon className="shrink-0 size-[7px] lg:size-[14px]" />,    label: TITLEBAR_LABEL_TABLES,    breadcrumb: TITLEBAR_BREADCRUMB_TABLES },
  // AI
  { icon: <WorkflowIcon className="shrink-0 size-[7px] lg:size-[14px]" />, label: TITLEBAR_LABEL_WORKFLOWS, breadcrumb: TITLEBAR_BREADCRUMB_AI },
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
              <TitleSlash className="shrink-0 text-[#E6E7EA] size-[6px] lg:size-[13px]" />
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
            <span className="text-[11px] font-medium leading-[16px] text-[#5C5E63]">{TITLEBAR_BADGE_DEVELOPMENT}</span>
          </div>

          {/* Help button */}
          <button
            type="button"
            className="flex size-[28px] items-center justify-center rounded-[8px] hover:bg-[#F4F5F6]"
            aria-label="Help"
          >
            <TitleBarHelpIcon className="size-[14px] text-[#5C5E63]" />
          </button>

          {/* Inbox button with red notification dot */}
          <button
            type="button"
            className="relative flex size-[28px] items-center justify-center rounded-[8px] hover:bg-[#F4F5F6]"
            aria-label="Inbox"
          >
            <TitleBarInboxIcon className="size-[14px] text-[#5C5E63]" />
            {/* Red dot */}
            <span className="absolute right-[5px] top-[5px] size-[5px] rounded-full bg-red-500" />
          </button>

          {/* Settings / target diamond button */}
          <button
            type="button"
            className="flex size-[28px] items-center justify-center rounded-[8px] hover:bg-[#F4F5F6]"
            aria-label="Settings"
          >
            <TitleBarSettingsIcon className="size-[14px] text-[#5C5E63]" />
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
  const message = AI_CHAT_MESSAGE
  const suggestions = AI_CHAT_SUGGESTIONS

  useEffect(() => {
    const t = setTimeout(() => setSent(true), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full flex-col">

      {/* ── Header ── */}
      <div className="shrink-0 border-b border-[#EEEFF1] px-4 py-[10px] flex items-center gap-[10px]">
        <div className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#EDE9FF]">
          <AIChatSparkleIcon className="size-[13px]" />
        </div>
        <span className="font-medium text-[14px] leading-5">{AI_CHAT_TITLE}</span>
        <div className="ml-auto flex items-center gap-[5px] rounded-lg border border-[#C7F4D3] bg-[#DDF9E4] py-[1px] pl-[5px] pr-[6px]">
          <div className="size-[7px] rounded-full bg-[#0FC27B]" />
          <span className="font-medium text-[12px] leading-4 text-[#075A39]">{AI_CHAT_LIVE_LABEL}</span>
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
            {AI_CHAT_PROMPT}
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
            <AIChatSendIcon className="size-[10px]" />
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/favicon.ico" alt="Fethr" className="size-[24px] shrink-0 rounded-[7px] border border-[rgba(0,0,0,0.08)] object-cover" />
                  <div className="flex h-full flex-1 items-center gap-[4px]">
                    <span className="font-semibold text-[#242629] text-[16px] leading-[20px] tracking-[-0.16px]">{WORKSPACE_NAME}</span>
                    <WorkspaceChevronDownIcon className="size-[14px] shrink-0" />
                  </div>
                  <WorkspaceSidebarToggleIcon />
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
                <HeroDotPatternSvg className="h-full w-full text-white-700" />
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
              <span className="font-bold text-[14px] lg:text-base">{TESTIMONIAL_NAME}&nbsp;</span>
              <span className="text-[13px] lg:text-sm">{TESTIMONIAL_ROLE}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile bottom dashed divider */}
      <DashedH className="text-subtle-stroke absolute inset-x-0 bottom-0 lg:hidden" />
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function HomeHeroSection(): ReactNode {
  const [activeTab, setActiveTab] = useState<TabIdx>(0)
  const [progress, setProgress] = useState(0)

  // Refs track mutable state inside the interval — avoids React StrictMode's
  // double-invocation of state updaters which would otherwise skip a tab each cycle...
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
      {/* <StickyTestimonial /> */}

      {/* ── Layer 2: hero overlay (now relative since testimonial is hidden) ── */}
      <div className="relative inset-x-0 top-0 overflow-x-clip border-b border-subtle-stroke bg-primary-background">
        <div className="relative grid">

          {/* Hero content — badge, h1, subtitle, CTAs */}
          <div className="container">
            <div className="flex flex-col items-center relative mt-24 mb-18 max-xl:mt-20 max-lg:mt-20 max-lg:mb-16">
              {/* <AnnouncementBadge /> */}
              <h1 className="mt-6 max-w-[15ch] font-display text-center text-heading-md md:text-heading-lg lg:text-heading-xl">
                {HERO_HEADING}
              </h1>
              <p className="mt-4 max-w-md text-pretty text-center text-lg text-accent-foreground md:text-xl">
                {HERO_SUBHEADING}
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

          {/* TODO: Re-enable CompaniesSection when we have our own logos
          <CompaniesSection maxLogos={6} />
          */}

          {/* Spacer — replaces CompaniesSection gap */}
          <div className="pb-16 lg:pb-24 xl:pb-32" />

        </div>
      </div>

    </div>
  )
}
