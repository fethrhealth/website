/**
 * home-hero.ts
 * All hardcoded text strings and data for HomeHeroSection.
 * Edit this file to update copy, labels, or table data without touching the component.
 */

// ─── Announcement badge ───────────────────────────────────────────────────────

export const ANNOUNCEMENT_TEXT = 'Meet Ask Fethr, now with MCP'
export const ANNOUNCEMENT_HREF = '/platform/ask'

// ─── Hero copy ────────────────────────────────────────────────────────────────

export const HERO_HEADING           = 'Customer relationship magic.'
export const HERO_SUBHEADING        = 'Fethr is the AI CRM for health GTM teams.'
export const HERO_CTA_PRIMARY       = 'Start for free'
export const HERO_CTA_PRIMARY_HREF  = '/signup'

// ─── Tab bar ─────────────────────────────────────────────────────────────────

export const TABS = ['Monitor', 'Workflows', 'Tables', 'AI'] as const

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export const SIDEBAR_QUICK_ACTIONS_LABEL = 'Quick actions'
export const SIDEBAR_KBD_PRIMARY         = '⌘K'
export const SIDEBAR_KBD_SEARCH          = '/'

export const SIDEBAR_SECTION_MONITORING = 'Monitoring'
export const SIDEBAR_SECTION_TOOLS      = 'Tools & Analytics'
export const SIDEBAR_SECTION_BILLING    = 'Billing'
export const SIDEBAR_SECTION_SETTINGS   = 'Settings'

export const SIDEBAR_ITEM_MONITOR      = 'Monitor'
export const SIDEBAR_ITEM_LOGS         = 'Logs'
export const SIDEBAR_ITEM_TABLES       = 'Tables'
export const SIDEBAR_ITEM_SCHEMAS      = 'Schemas'
export const SIDEBAR_ITEM_INTEGRATIONS = 'Integrations'
export const SIDEBAR_ITEM_PLUGINS      = 'Plugins'
export const SIDEBAR_ITEM_CREDENTIALS  = 'Credentials'
export const SIDEBAR_ITEM_WORKFLOWS    = 'Workflows'
export const SIDEBAR_ITEM_USAGE        = 'Usage'
export const SIDEBAR_ITEM_BILLING      = 'Billing'
export const SIDEBAR_ITEM_SETTINGS     = 'Settings'

// ─── Shared toolbar / filter chip labels ─────────────────────────────────────
// Used in both MonitorContent and TablesContent.

export const TOOLBAR_FILTER   = 'Filter'
export const TOOLBAR_SORT     = 'Sort'
export const TOOLBAR_CLEAR_ALL = 'Clear All'

export const FILTER_FIELD = 'status'
export const FILTER_IS    = 'is'

// ─── Monitor content ─────────────────────────────────────────────────────────

export const MONITOR_TOOLBAR_REFRESH = 'Refresh'
export const MONITOR_TOOLBAR_SEARCH  = 'Search Connectors'

export const MONITOR_FILTER_STATUS = 'Stopped'

export const MONITOR_TABLE_HEADERS = [
  'Status', 'Connector Name', 'Type', 'Application', 'Labels',
] as const

export const MONITOR_STATUS_STARTING = 'Starting'
export const MONITOR_STATUS_STARTED  = 'Started'
export const MONITOR_STATUS_STOPPED  = 'Stopped'

export const MONITOR_SELECTION_COUNT    = '2 selected'
export const MONITOR_ACTION_START_ALL   = 'Start All'
export const MONITOR_ACTION_STOP_ALL    = 'Stop All'
export const MONITOR_ACTION_RESTART_ALL = 'Restart All'

// ─── Monitor data (connector rows) ───────────────────────────────────────────

export interface ConnectorRow {
  readonly name: string
  readonly type: string
  readonly app: string
  readonly labels: ReadonlyArray<{ readonly color: string; readonly name: string }>
}

export const CONNECTORS: readonly ConnectorRow[] = [
  { name: 'Patient Data Sync',        type: 'HL7',    app: 'Epic EMR',       labels: [{ color: '#10b981', name: 'Production' }, { color: '#ef4444', name: 'Critical' }] },
  { name: 'Lab Results Feed',         type: 'FHIR',   app: 'Cerner',         labels: [{ color: '#3b82f6', name: 'Development' }] },
  { name: 'Insurance Verification',   type: 'HTTP',   app: 'Custom Portal',  labels: [] },
  { name: 'Radiology Interface',      type: 'HL7',    app: 'PACS System',    labels: [{ color: '#10b981', name: 'Production' }, { color: '#8b5cf6', name: 'Radiology' }] },
  { name: 'Pharmacy Orders',          type: 'FHIR',   app: 'Epic EMR',       labels: [{ color: '#f59e0b', name: 'Pharmacy' }] },
  { name: 'Billing Interface',        type: 'TCP/IP', app: 'Revenue System', labels: [{ color: '#14b8a6', name: 'Finance' }] },
  { name: 'ADT Notifications',        type: 'HL7',    app: 'Meditech',       labels: [{ color: '#10b981', name: 'Production' }] },
  { name: 'Clinical Notes Export',    type: 'FHIR',   app: 'Epic EMR',       labels: [{ color: '#8b5cf6', name: 'Radiology' }] },
  { name: 'Appointment Scheduling',   type: 'HTTP',   app: 'Cerner',         labels: [{ color: '#f59e0b', name: 'Pharmacy' }] },
  { name: 'Patient Portal Sync',      type: 'FHIR',   app: 'MyChart',        labels: [{ color: '#3b82f6', name: 'Development' }] },
]

// ─── Tables content ──────────────────────────────────────────────────────────

export const TABLES_TOOLBAR_INSERT = 'Insert'

export const TABLES_FILTER_STATUS = 'Started'

export const TABLES_COL_ID_LABEL  = 'id'
export const TABLES_COL_ID_TYPE   = 'uuid'
export const TABLES_COL_DATA_TYPE = 'text'

export const TABLES_COLUMNS = [
  { label: 'standard race',  w: 'w-[150px] lg:w-[300px]' },
  { label: 'Cerner',         w: 'w-[75px]  lg:w-[150px]' },
  { label: 'Epic',           w: 'w-[75px]  lg:w-[150px]' },
  { label: 'eClinicalWorks', w: 'w-[105px] lg:w-[210px]' },
  { label: 'Athena',         w: 'w-[90px]  lg:w-[180px]' },
] as const

// ─── Tables data (race reference rows) ───────────────────────────────────────

export interface RaceRow {
  readonly id: string
  readonly race: string
  readonly cerner: string
  readonly epic: string
  readonly ecw: string
  readonly athena: string
}

export const RACE_ROWS: readonly RaceRow[] = [
  { id: 'a1b2c3d4', race: 'American Indian or Alaska Native',             cerner: 'AI/AN', epic: 'AMIND',      ecw: 'NAT_AM',      athena: '01'  },
  { id: 'b2c3d4e5', race: 'Asian',                                        cerner: 'ASN',   epic: 'ASIAN',      ecw: 'ASIAN',       athena: '02'  },
  { id: 'c3d4e5f6', race: 'Black or African American',                    cerner: 'BLA',   epic: 'AFAM',       ecw: 'AFAM',        athena: '03'  },
  { id: 'd4e5f6g7', race: 'Native Hawaiian or Other Pacific Islander',    cerner: 'PI',    epic: 'PAC_ISL',    ecw: 'PAC_ISL',     athena: '04'  },
  { id: 'e5f6g7h8', race: 'White',                                        cerner: 'WHT',   epic: 'Caucasian',  ecw: 'Caucasian',   athena: '05'  },
  { id: 'f6g7h8i9', race: 'Other Race',                                   cerner: 'OTH',   epic: 'OTHER',      ecw: 'OTHER',       athena: '99'  },
  { id: 'g7h8i9j0', race: 'Declined to Answer',                           cerner: 'UNK',   epic: 'UNK',        ecw: 'Patient Refused', athena: 'DTA' },
  { id: 'h8i9j0k1', race: 'Multiple Race',                                cerner: 'MUL',   epic: 'MULTI',      ecw: 'MULTI',       athena: '06'  },
  { id: 'i9j0k1l2', race: 'Hispanic or Latino',                           cerner: 'HIS',   epic: 'HISPANIC',   ecw: 'LATINO',      athena: '07'  },
  { id: 'j0k1l2m3', race: 'Not Hispanic or Latino',                       cerner: 'NON',   epic: 'NON_HISP',   ecw: 'NON_LATINO',  athena: '08'  },
  { id: 'k1l2m3n4', race: 'Unknown Race',                                 cerner: 'UNK',   epic: 'UNKNOWN',    ecw: 'UNKNOWN',     athena: '09'  },
  { id: 'l2m3n4o5', race: 'Unavailable',                                  cerner: 'UNA',   epic: 'UNAVAIL',    ecw: 'UNAVAIL',     athena: '10'  },
  { id: 'm3n4o5p6', race: 'Prefer Not to Disclose',                       cerner: 'PND',   epic: 'PREFER_NOT', ecw: 'PREFER_NOT',  athena: 'PND' },
]

// ─── Workflow badge ──────────────────────────────────────────────────────────

export const BADGE_COMPLETED = 'Completed'
export const BADGE_RUNNING   = 'Running'

// ─── Runs panel ──────────────────────────────────────────────────────────────

export const RUNS_CURRENT_RUN            = 70
export const RUNS_PANEL_STEP_COUNT       = '15'
export const RUNS_PANEL_EXECUTING        = 'Executing'
export const RUNS_PANEL_COMPLETED_LABEL  = 'Completed just now'
export const RUNS_PANEL_OVERVIEW         = 'Overview'

export const RUNS_STAT_COMPLETED_VAL   = '69'
export const RUNS_STAT_COMPLETED_LBL   = 'Completed'
export const RUNS_STAT_FAILED_VAL      = '0'
export const RUNS_STAT_FAILED_LBL      = 'Failed'
export const RUNS_STAT_IN_PROGRESS_VAL = '1'
export const RUNS_STAT_IN_PROGRESS_LBL = 'In progress'
export const RUNS_STAT_AVG_VAL         = '18'
export const RUNS_STAT_AVG_UNIT        = 'seconds'
export const RUNS_STAT_AVG_LBL         = 'Avg. runtime'

// ─── Shared workflow / AI tab header labels ───────────────────────────────────
// Used in both WorkflowsContent and AIContent.

export const WORKFLOW_TAB_EDITOR  = 'Editor'
export const WORKFLOW_TAB_RUNS    = 'Runs'
export const WORKFLOW_TAB_LIVE    = 'Live'
export const WORKFLOW_TAB_TRIGGER = 'Trigger'

// ─── Workflows content (tab 1) ────────────────────────────────────────────────

export const WORKFLOWS_RUN_NUM = 70

export const WORKFLOW_CARD1_TITLE    = 'Fetch a patient'
export const WORKFLOW_CARD1_SUBTITLE = 'Search for a patient in eClinicalWorks'
export const WORKFLOW_CARD1_TAG      = 'EHR'

export const WORKFLOW_CARD2_TITLE    = 'Map Patient Record'
export const WORKFLOW_CARD2_SUBTITLE = 'Send data to iClinic'
export const WORKFLOW_CARD2_TAG      = 'Data'

// ─── AI content (tab 3) ──────────────────────────────────────────────────────

export const AI_RUN_NUM = 1

export const AI_CARD1_TITLE    = 'Incoming Epic Orders'
export const AI_CARD1_SUBTITLE = 'Receive HL7 ORM Messages from Epic'
export const AI_CARD1_TAG      = 'Form'

export const AI_CARD2_TITLE    = 'Map Data'
export const AI_CARD2_SUBTITLE = 'Map data from Epic to Cerner'
export const AI_CARD2_TAG      = 'Transform'

export const AI_CARD3_TITLE    = 'Outbound Orders to Cerncer'
export const AI_CARD3_SUBTITLE = 'Send outbound HL7 ORM messages to Cerner'
export const AI_CARD3_TAG      = 'EHR'

// ─── Title bar ────────────────────────────────────────────────────────────────

export const TITLEBAR_LABEL_MONITOR   = 'Monitor'
export const TITLEBAR_LABEL_WORKFLOWS = 'Workflows'
export const TITLEBAR_LABEL_TABLES    = 'Tables'

export const TITLEBAR_BREADCRUMB_WORKFLOWS = 'Patient data automation pipeline'
export const TITLEBAR_BREADCRUMB_TABLES    = 'Race'
export const TITLEBAR_BREADCRUMB_AI        = 'AI Interface Builder'

export const TITLEBAR_BADGE_DEVELOPMENT = 'Development'

// ─── Workspace header ────────────────────────────────────────────────────────

export const WORKSPACE_NAME = 'Fethr Health'

// ─── AI chat panel ───────────────────────────────────────────────────────────

export const AI_CHAT_TITLE       = 'Fethr AI'
export const AI_CHAT_LIVE_LABEL  = 'Live'
export const AI_CHAT_PROMPT      = 'How can I assist you?'
export const AI_CHAT_MESSAGE     = 'I want to send orders from Epic to Cerner'

export const AI_CHAT_SUGGESTIONS = [
  'Create a sample HL7 message',
  'Build an interface',
  'Upload mapping document into table',
  'Create interface documentation',
] as const

// ─── Sticky testimonial ──────────────────────────────────────────────────────

/** Words of the testimonial quote. '|' = optional line-break, not a word. */
export const QUOTE_WORDS: readonly string[] = [
  '"When', 'I', 'first', 'opened', 'Attio,', '|',
  'I', 'instantly', 'got', 'the', 'feeling', 'this', 'was', '|',
  'the', 'next', 'generation', 'of', 'CRM."',
]

export const TESTIMONIAL_NAME = 'Margaret Chen'
export const TESTIMONIAL_ROLE = 'Head of Business Operations · Modal'
