/**
 * HomeHeroIcons
 *
 * All SVG icons and illustrations extracted from HomeHeroSection.
 * Each is a named export that accepts an optional className prop.
 */

// Stroke color shared by all ProductSidebar nav icons.
const IC_S = '#75777C'

// ─── Layout helpers ───────────────────────────────────────────────────────────

export function DashedH({ className = '' }: { className?: string }) {
  return (
    <svg width="100%" height="1" className={className} aria-hidden>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

export function DashedV({ className = '' }: { className?: string }) {
  return (
    <svg width="1" height="100%" className={className} aria-hidden>
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

export function TitleSlash({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 13 26" fill="none" aria-hidden>
      <path d="m6.5 16 3-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Announcement badge ───────────────────────────────────────────────────────

export function AnnouncementChevronIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="m5.5 4 3 3-3 3" stroke="#23252A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── ProductSidebar nav icons ─────────────────────────────────────────────────

export function SidebarMonitorIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 4.75h14a1.25 1.25 0 0 1 1.25 1.25v10a1.25 1.25 0 0 1-1.25 1.25H5A1.25 1.25 0 0 1 3.75 16V6a1.25 1.25 0 0 1 1.25-1.25Z" />
      <path d="M7 10v4M12 8v6M17 9v5M8 20h8" />
    </svg>
  )
}

export function SidebarLogsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}

export function SidebarTablesIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M2.9707 15.3494L20.9707 15.355M20.9405 9.61588H2.99699M8.77661 9.61588V21.1367M20.9405 5.85547V19.1367C20.9405 20.2413 20.0451 21.1367 18.9405 21.1367H4.99699C3.89242 21.1367 2.99699 20.2413 2.99699 19.1367V5.85547C2.99699 4.7509 3.89242 3.85547 4.99699 3.85547H18.9405C20.0451 3.85547 20.9405 4.7509 20.9405 5.85547Z" />
    </svg>
  )
}

export function SidebarSchemasIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
    </svg>
  )
}

export function SidebarIntegrationsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  )
}

export function SidebarPluginsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M22.6 2.7L21.2 1.3L18.2 4.3L16.4 2.5C15.7 1.7 14.4 1.7 13.6 2.5L10.8 5.3L18.6 13.1L21.4 10.3C22.2 9.6 22.2 8.3 21.4 7.5L19.6 5.7L22.6 2.7Z" />
      <path d="M15.6 13.3L12.8 16.2L14.2 17.6L11.4 20.4C10.7 21.2 9.4 21.2 8.6 20.4L6.8 18.6L2.8 22.6L1.4 21.2L5.4 17.2L3.6 15.4C2.8 14.7 2.8 13.4 3.6 12.6L6.4 9.8L7.9 11.2L10.7 8.4L12.1 9.8L9.3 12.6L11.4 14.7L14.2 11.9L15.6 13.3Z" />
    </svg>
  )
}

export function SidebarCredentialsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 22C6.84 20.74 3 15.55 3 10V5L12 1L21 5V10C21 15.55 17.16 20.74 12 22Z" />
      <circle cx="12" cy="9" r="1.5" /><path d="M12 10.5V18" />
    </svg>
  )
}

export function SidebarWorkflowsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill={IC_S} aria-hidden className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5 2C5 1.44772 4.55228 1 4 1H2C1.44772 1 1 1.44772 1 2V4C1 4.55228 1.44772 5 2 5H4C4.55228 5 5 4.55228 5 4V2Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6 4.24988C6.15698 4.45881 6.25 4.71854 6.25 5V11C6.25 12.5188 7.48122 13.75 9 13.75H10V12.25H9C8.30964 12.25 7.75 11.6904 7.75 11V8.45015C8.12503 8.64186 8.54989 8.75 9 8.75H10V7.25H9C8.30964 7.25 7.75 6.69036 7.75 6V5C7.75 3.83401 7.02434 2.8375 6 2.43747V4.24988Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11 7C11 6.44772 11.4477 6 12 6H14C14.5523 6 15 6.44772 15 7V9C15 9.55229 14.5523 10 14 10H12C11.4477 10 11 9.55229 11 9V7Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11 12C11 11.4477 11.4477 11 12 11H14C14.5523 11 15 11.4477 15 12V14C15 14.5523 14.5523 15 14 15H12C11.4477 15 11 14.5523 11 14V12Z" />
    </svg>
  )
}

export function SidebarUsageIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
    </svg>
  )
}

export function SidebarBillingIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11" />
    </svg>
  )
}

export function SidebarSettingsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={IC_S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function SidebarQuickActionsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" fill="none" aria-hidden className={className}>
      <rect x="2" y="1" width="10" height="12" rx="2.5" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.333 3.166v4.667m0-1.667 1.053-1m0 0 2.105-2m-2.105 2 2.28 2.667" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SidebarSearchIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" fill="none" aria-hidden className={className}>
      <path d="M12.313 12.313 9.467 9.467M1.313 6.054a4.741 4.741 0 1 1 9.482 0 4.741 4.741 0 0 1-9.482 0Z" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Toolbar icons (MonitorContent + TablesContent) ───────────────────────────

export function ToolbarFilterIcon({ className }: { className?: string }) {
  return (
    <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </svg>
  )
}

export function ToolbarSortIcon({ className }: { className?: string }) {
  return (
    <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}

export function ToolbarRefreshIcon({ className }: { className?: string }) {
  return (
    <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
}

export function ToolbarSearchIcon({ className }: { className?: string }) {
  return (
    <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function ToolbarCloseXIcon({ className }: { className?: string }) {
  return (
    <svg width="3" height="3" viewBox="0 0 10 10" fill="none" className={className} aria-hidden>
      <path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Shared chevron-down used in sort buttons and Insert button. */
export function SortChevronIcon({ className }: { className?: string }) {
  return (
    <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function TableKeyIcon({ className }: { className?: string }) {
  return (
    <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" /><circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  )
}

// ─── MonitorContent selection bar ─────────────────────────────────────────────

export function CheckboxCheckIcon({ className }: { className?: string }) {
  return (
    <svg width="5" height="5" viewBox="0 0 10 10" fill="none" className={className} aria-hidden>
      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StartAllIcon({ className }: { className?: string }) {
  return (
    <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

export function StopAllIcon({ className }: { className?: string }) {
  return (
    <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

export function RestartAllIcon({ className }: { className?: string }) {
  return (
    <svg width="4" height="4" viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
      <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
    </svg>
  )
}

// ─── WorkflowBadge icons ──────────────────────────────────────────────────────

export function BadgeCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 5.727 3.742 6.9c.442.699.663 1.048.947 1.17a1 1 0 0 0 .778.007c.286-.118.512-.464.965-1.156L9 3" stroke="#0FC27B" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BadgeSpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M6 1.5a4.5 4.5 0 1 1-3.182 7.682" stroke="#9162F9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ─── WorkflowsContent / AIContent tab bar icons ───────────────────────────────

export function WorkflowEditorTabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 8v2.5a1 1 0 0 0 1 1M8 2.5h2.5a1 1 0 0 1 1 1" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10.705 5.808a1.052 1.052 0 0 1 1.487 1.487l-3.77 3.77-.722.666-.563.32-.944.276L5.5 12.5l.173-.693.277-.944.319-.563.667-.723 3.769-3.769Z" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WorkflowRunsTabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="2" y="4.5" width="10" height="5" rx="2" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12.5v-1M7 2.5v-1" stroke="#232529" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function TriggerCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="6" r=".75" fill="#75777C" />
      <circle cx="6" cy="6" r="5" stroke="#75777C" strokeWidth="1.1" />
      <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeWidth="1.1" />
    </svg>
  )
}

// ─── WorkflowCardNode card icons ──────────────────────────────────────────────

export function WorkflowPatientCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF" stroke="#D6E5FF" />
      <path d="M7.5 5.5h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" stroke="#407FF2" strokeWidth="1.2" />
      <path d="M8 8.5h4M8 10.5h2.5" stroke="#407FF2" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="13.5" cy="13.5" r="2.75" fill="#E5EEFF" stroke="#D6E5FF" />
      <path d="M12.5 13.5h2M13.5 12.5v2" stroke="#407FF2" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function WorkflowMapRecordCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#EDE9FF" stroke="#DDD5FF" />
      <path d="M6 8.5h5M13.5 11.5H8.5" stroke="#9162F9" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12 6.5l2.5 2-2.5 2M8 13.5l-2.5-2 2.5-2" stroke="#9162F9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── AIBuildCard icons ────────────────────────────────────────────────────────

export function AIEpicOrdersCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF" stroke="#D6E5FF" />
      <path d="M7 5.5h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" stroke="#407FF2" strokeWidth="1.2" />
      <path d="M8 8.5h4M8 10.5h3M8 12.5h2" stroke="#407FF2" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function AIMapDataCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#EDE9FF" stroke="#DDD5FF" />
      <circle cx="10" cy="10" r="2.5" stroke="#9162F9" strokeWidth="1.2" />
      <path d="M10 5.5v1M10 13.5v1M5.5 10h-1M15.5 10h-1" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7.4 7.4l.7.7M11.9 11.9l.7.7M7.4 12.6l.7-.7M11.9 8.1l.7-.7" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function AIOutboundOrdersCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E3FBEC" stroke="#C7F4D3" />
      <path d="M7 5.5h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" stroke="#0FC27B" strokeWidth="1.2" />
      <path d="M7.5 10l2 2 3-3" stroke="#0FC27B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── RunsPanel icons ──────────────────────────────────────────────────────────

export function RunExecutingSpinIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" fill="none" className={className} aria-hidden>
      <rect x=".5" y=".5" width="17" height="17" rx="8.5" fill="#F4F5F6" stroke="#E6E7EA" />
      <path d="M5 9a4 4 0 1 0 4-4" stroke="#75777C" strokeLinecap="round" />
    </svg>
  )
}

export function RunCompletedCheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" fill="none" className={className} aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Zm3.152-9.636a.6.6 0 1 0-1.004-.657L9.181 9.71c-.252.384-.418.636-.558.813-.14.176-.2.205-.212.21a.48.48 0 0 1-.374-.003c-.012-.005-.072-.035-.209-.213a12.33 12.33 0 0 1-.544-.822l-.377-.595a.6.6 0 1 0-1.014.642l.377.595.015.024c.226.357.417.66.592.887.178.232.39.457.685.584.416.18.888.183 1.307.01.296-.122.512-.344.694-.573.178-.225.374-.524.606-.878l.015-.023 1.968-3.005Z" fill="#0FC27B" />
    </svg>
  )
}

export function RunStepHexIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path d="M4.875 1.15a2.25 2.25 0 0 1 2.25 0L9.638 2.6a2.25 2.25 0 0 1 1.125 1.949v2.902A2.25 2.25 0 0 1 9.638 9.4l-2.513 1.45a2.25 2.25 0 0 1-2.25 0L2.362 9.4A2.25 2.25 0 0 1 1.237 7.45V4.549A2.25 2.25 0 0 1 2.362 2.6l2.513-1.45Z" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StatCompletedIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" fill="none" className={className} aria-hidden>
      <g opacity=".6" stroke="#075A39" strokeWidth="1.1">
        <path d="m4.75 7.295.277.439c.425.67.637 1.006.91 1.124a.96.96 0 0 0 .746.006c.275-.113.492-.446.927-1.11L9.25 5.25" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="5.5" />
      </g>
    </svg>
  )
}

export function StatFailedIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" fill="none" className={className} aria-hidden>
      <g opacity=".6" stroke="#772322" strokeWidth="1.1">
        <circle cx="7" cy="7" r="5.5" />
        <path d="M9 5 5 9M9 9 5 5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function StatInProgressIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" fill="none" className={className} aria-hidden>
      <path d="M1.5 7A5.5 5.5 0 1 0 7 1.5" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function StatAvgRuntimeIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" fill="none" className={className} aria-hidden>
      <circle cx="7" cy="7" r="5.75" stroke="#9FA1A7" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M7.066 3.904v2.115a.885.885 0 0 1-.884.885H4.566" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

// ─── TitleBar action icons ────────────────────────────────────────────────────

export function TitleBarHelpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 5.5a1.5 1.5 0 1 1 1.5 1.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="10" r=".5" fill="currentColor" />
    </svg>
  )
}

export function TitleBarInboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 5.5h10v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 5.5l2-3h6l2 3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 8h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function TitleBarSettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1.5L12.5 7 7 12.5 1.5 7 7 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

// ─── ProductSidebar workspace header icons ────────────────────────────────────

export function WorkspaceChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 5.25L7 9.25L11 5.25" stroke="#5C5E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WorkspaceSidebarToggleIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" fill="none" aria-hidden className={className}>
      <g stroke="#75777C" strokeWidth="1.2">
        <rect x="1.5" y="2.5" width="15" height="13" rx="3" />
        <path d="M7.8 2.725v12.5" />
        <path d="M3.975 5.425h1.35M3.975 7.674h1.35" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

// ─── AIChatPanel icons ────────────────────────────────────────────────────────

export function AIChatSparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="6.5" cy="6.5" r="2.2" stroke="#9162F9" strokeWidth="1.1" />
      <path d="M6.5 1.5v1M6.5 10.5v1M1.5 6.5h1M10.5 6.5h1" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M3.3 3.3l.7.7M9 9l.7.7M3.3 9.7l.7-.7M9 4l.7-.7" stroke="#9162F9" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function AIChatSendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M5 8.5V1.5M1.5 5L5 1.5 8.5 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── StickyTestimonial ────────────────────────────────────────────────────────

export function HeroDotPatternSvg({ className }: { className?: string }) {
  return (
    <svg width="100%" height="100%" className={className} aria-hidden>
      <defs>
        <pattern id="hero-dot-bg" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-dot-bg)" />
    </svg>
  )
}

// ─── Title bar tab icons ──────────────────────────────────────────────────────

export function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="#5C5E63" strokeWidth="1.2" />
      <path d="M3 9l2-3 2 2 2-4 2 3" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1.25" y="1.25" width="4" height="4" rx="1.5" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8.75" y="8.75" width="4" height="4" rx="2" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7.25V8C2 9.1 2.9 10 4 10H4.75" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 6.75L12 6C12 4.9 11.1 4 10 4H9.25" stroke="#5C5E63" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function TableIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="#5C5E63" strokeWidth="1.2" />
      <path d="M1 5h12" stroke="#5C5E63" strokeWidth="1.1" />
      <path d="M5.5 5v8" stroke="#5C5E63" strokeWidth="1.1" />
    </svg>
  )
}
