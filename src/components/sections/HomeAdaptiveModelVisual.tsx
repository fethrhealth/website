'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ─── Dot-grid background ──────────────────────────────────────────────────────

function DotGridBg() {
  return (
    <div className="bg-[#DCDCDD] absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,#000_40%,#0000_65%)]">
      <div className="h-full w-full bg-white-100 [mask-image:linear-gradient(to_right,#0000_1px,#000_1px),linear-gradient(to_bottom,#0000_1px,#000_1px)] [mask-position:5px_5px] [mask-size:10px_10px]" />
    </div>
  )
}

// ─── Field icons (14×14 stroke-based, from attio.com) ─────────────────────────

function FiText() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <g stroke="#5C5E63" strokeWidth="1.1">
        <path d="M1.5 5.5c0-1.4 0-2.1.272-2.635.24-.47.622-.853 1.093-1.093C3.4 1.5 4.1 1.5 5.5 1.5h3c1.4 0 2.1 0 2.635.272.47.24.853.622 1.093 1.093C12.5 3.4 12.5 4.1 12.5 5.5v3c0 1.4 0 2.1-.272 2.635-.24.47-.622.853-1.093 1.093C10.6 12.5 9.9 12.5 8.5 12.5h-3c-1.4 0-2.1 0-2.635-.272-.47-.24-.853-.622-1.093-1.093C1.5 10.6 1.5 9.9 1.5 8.5v-3Z" />
        <rect width="2.37" height="2.37" x="3.78" y="3.78" rx=".68" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" d="M3.78 8.18h6.43M3.78 10.22h3.72" />
      </g>
    </svg>
  )
}

function FiEmail() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <rect width="12" height="10" x="1" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="2.5" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeWidth="1.1" d="m3.1 4.6.51.53C5.16 6.76 5.94 7.58 6.92 7.59c.98.01 1.78-.79 3.37-2.38l.6-.61" />
    </svg>
  )
}

function FiId() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <path stroke="#5C5E63" strokeWidth="1.05" d="M1 6c0-1.4 0-2.1.272-2.635.24-.47.622-.853 1.093-1.093C2.9 2 3.6 2 5 2h4c1.4 0 2.1 0 2.635.272.47.24.853.622 1.093 1.093C13 3.9 13 4.6 13 6v2c0 1.4 0 2.1-.272 2.635-.24.47-.622.853-1.093 1.093C11.1 12 10.4 12 9 12H5c-1.4 0-2.1 0-2.635-.272-.47-.24-.853-.622-1.093-1.093C1 10.1 1 9.4 1 8V6Z" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05" d="M4.77 7.83h-.527c-.656 0-1.187.532-1.187 1.188 0 .264.214.479.479.479h2.47c.264 0 .479-.215.479-.48 0-.655-.532-1.187-1.187-1.187H4.77Z" />
      <ellipse cx="4.77" cy="5.5" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05" rx="1.03" ry="1" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05" d="M8.54 6H10.94M8.54 8H10.94" />
    </svg>
  )
}

function FiPipeline() {
  return (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <rect width="2.5" height="8" x="2" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="1" />
      <rect width="2.5" height="11" x="6.25" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="1" />
      <rect width="2.5" height="5" x="10.5" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="1" />
    </svg>
  )
}

function FiCurrency() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <circle cx="7" cy="7" r="5.75" stroke="#5C5E63" strokeLinecap="round" strokeWidth="1.1" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeWidth="1.1" d="M7 3.7v1.23M7 9.07v1.23M4.89 9.07h3.07c.43 0 .84-.16 1.14-.45.3-.29.47-.68.47-1.08s-.17-.8-.47-1.08c-.3-.29-.71-.45-1.14-.45H6.03c-.43 0-.84-.16-1.14-.45-.3-.29-.47-.68-.47-1.08s.17-.8.47-1.08c.3-.29.71-.45 1.14-.45H9.06" />
    </svg>
  )
}

function FiDate() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <rect width="12" height="10" x="1" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="2.5" />
      <rect width="2" height="2" x="3.5" y="7.6" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" rx=".7" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M3.5 5.25h7M4.2 1v1.75M9.8 1v1.75" />
    </svg>
  )
}

function FiCard() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <rect width="12" height="10" x="1" y="2" stroke="#5C5E63" strokeWidth="1.1" rx="2.5" />
      <rect width="3.65" height="6" x="3" y="4" stroke="#5C5E63" strokeWidth="1.1" rx="1.05" />
      <path stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M8.65 6h2.4M8.65 8h2.4" />
    </svg>
  )
}

function FiLocation() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <path stroke="#5C5E63" strokeWidth="1.1" d="M12 6.143C12 9.84 8.928 13 7 13S2 9.84 2 6.143C2 3.303 4.239 1 7 1s5 2.303 5 5.143Z" />
      <circle cx="7" cy="6" r="1.75" stroke="#5C5E63" strokeWidth="1.1" />
    </svg>
  )
}

function FiTag() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 size-2.5 lg:size-3.5">
      <path stroke="#5C5E63" strokeWidth="1.1" d="m1.806 5.254 3.549-3.549c.29-.29.694-.439 1.104-.405l5.052.414c.342.028.613.299.641.641l.414 5.052c.034.41-.115.814-.405 1.104L8.612 12.06c-.976.976-2.559.976-3.536 0L1.806 8.79c-.976-.976-.976-2.56 0-3.536Z" />
      <circle cx="9.14" cy="4.725" r=".788" fill="#5C5E63" transform="rotate(45 9.14 4.725)" />
    </svg>
  )
}

function FiPlus() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 size-[9px] lg:size-3">
      <path stroke="#9FA1A7" strokeLinecap="round" strokeLinejoin="round" d="M6 3v6M9 6H3" />
    </svg>
  )
}

// ─── Entity icons (colored 14×14 / lg:20×20) ─────────────────────────────────

function PatientIcon() {
  return (
    <svg className="size-[14px] lg:size-5" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.6c0-1.96 0-2.94.381-3.689a3.5 3.5 0 0 1 1.53-1.53C2.66 0 3.64 0 5.6 0h2.8c1.96 0 2.94 0 3.689.381a3.5 3.5 0 0 1 1.53 1.53C14 2.66 14 3.64 14 5.6v2.8c0 1.96 0 2.94-.382 3.689a3.5 3.5 0 0 1-1.529 1.53C11.34 14 10.36 14 8.4 14H5.6c-1.96 0-2.94 0-3.689-.382a3.5 3.5 0 0 1-1.53-1.529C0 11.34 0 10.36 0 8.4V5.6Zm4.308 5.708h5.384c.595 0 1.077-.482 1.077-1.077a2.585 2.585 0 0 0-2.584-2.585h-2.37a2.585 2.585 0 0 0-2.584 2.585c0 .595.482 1.077 1.077 1.077ZM7 6.618a1.963 1.963 0 1 0 0-3.926 1.963 1.963 0 0 0 0 3.926Z" fill="#0FC27B"></path></svg>
  )
}

function ProviderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[14px] lg:size-5">
      <path fill="#0FC27B" fillRule="evenodd" d="M.381 1.911C0 2.66 0 3.64 0 5.6v2.8c0 1.96 0 2.94.381 3.689a3.5 3.5 0 0 0 1.53 1.53C2.66 14 3.64 14 5.6 14h2.8c1.96 0 2.94 0 3.689-.382a3.5 3.5 0 0 0 1.53-1.529C14 11.34 14 10.36 14 8.4V5.6c0-1.96 0-2.94-.382-3.689A3.5 3.5 0 0 0 12.09.381C11.34 0 10.36 0 8.4 0H5.6C3.64 0 2.66 0 1.911.381a3.5 3.5 0 0 0-1.53 1.53Zm2.85 4.228V7.86c0 1.207 0 1.81.235 2.27.206.406.536.735.94.942.308.156.678.209 1.248.226V10.5c0-.452 0-.678.083-.853a.862.862 0 0 1 .41-.41C5.842 9.154 6.067 9.154 6.52 9.154c.452 0 .678 0 .853.083.18.085.325.23.41.41.083.175.083.4.083.853v.799c.57-.017.94-.07 1.247-.226.405-.207.735-.536.941-.941.235-.461.235-1.064.235-2.27V6.138c0-1.206 0-1.809-.235-2.27a2.154 2.154 0 0 0-.94-.94c-.462-.236-1.065-.236-2.27-.236h-.647c-1.206 0-1.81 0-2.27.235a2.154 2.154 0 0 0-.941.941c-.235.461-.235 1.064-.235 2.27Zm1.137-1.436c0-.298.24-.539.538-.539h2.848a.538.538 0 0 1 0 1.077H4.906a.538.538 0 0 1-.538-.538Zm1.878 1.472a.538.538 0 1 0 0 1.077h2.848a.538.538 0 1 0 0-1.077H6.246Z" clipRule="evenodd" />
    </svg>
  )
}

function OrgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[14px] lg:size-5">
      <path fill="#14AED6" fillRule="evenodd" d="M.381 1.911C0 2.66 0 3.64 0 5.6v2.8c0 1.96 0 2.94.381 3.689a3.5 3.5 0 0 0 1.53 1.53C2.66 14 3.64 14 5.6 14h2.8c1.96 0 2.94 0 3.689-.382a3.5 3.5 0 0 0 1.53-1.529C14 11.34 14 10.36 14 8.4V5.6c0-1.96 0-2.94-.382-3.689A3.5 3.5 0 0 0 12.09.381C11.34 0 10.36 0 8.4 0H5.6C3.64 0 2.66 0 1.911.381a3.5 3.5 0 0 0-1.53 1.53Zm2.85 2.317c0-.298.24-.539.538-.539h2.848a.538.538 0 0 1 0 1.077H4.906a.538.538 0 0 1-.538-.538Zm1.878 1.472a.538.538 0 1 0 0 1.077h2.848a.538.538 0 1 0 0-1.077H6.246ZM4.368 8.05c0-.298.24-.539.538-.539h2.848a.538.538 0 0 1 0 1.077H4.906a.538.538 0 0 1-.538-.538Z" clipRule="evenodd" />
    </svg>
  )
}

function CustomIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-[14px] lg:size-5">
      <path fill="#0FC27B" fillRule="evenodd" d="M.381 1.911C0 2.66 0 3.64 0 5.6v2.8c0 1.96 0 2.94.381 3.689a3.5 3.5 0 0 0 1.53 1.53C2.66 14 3.64 14 5.6 14h2.8c1.96 0 2.94 0 3.689-.382a3.5 3.5 0 0 0 1.53-1.529C14 11.34 14 10.36 14 8.4V5.6c0-1.96 0-2.94-.382-3.689A3.5 3.5 0 0 0 12.09.381C11.34 0 10.36 0 8.4 0H5.6C3.64 0 2.66 0 1.911.381a3.5 3.5 0 0 0-1.53 1.53Zm5.316 3.695 1.942-1.941a2.585 2.585 0 0 1 3.73 3.577.105.105 0 0 1-.151.002L8.654 4.68a.252.252 0 0 0-.356 0L6.534 6.444a.592.592 0 0 1-.837-.838Zm-2.97-1.903a2.692 2.692 0 0 0 0 3.807l3.77 3.77a.592.592 0 0 0 .837-.838l-1.18-1.18a.43.43 0 1 1 .609-.61l1.142 1.143a.646.646 0 0 0 .914-.914L7.677 7.739a.43.43 0 0 1 .609-.61l1.18 1.18a.592.592 0 0 0 1.004-.51L8.484 5.805 7.194 7.1a1.533 1.533 0 0 1-2.188 0 1.556 1.556 0 0 1-.01-2.2l1.357-1.363a2.693 2.693 0 0 0-3.626.166Z" clipRule="evenodd" />
    </svg>
  )
}

// ─── Add object button icon ────────────────────────────────────────────────────

function AddObjIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="size-2.5 lg:size-3.5">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.5.95h-.025c-.68 0-1.223 0-1.663.036-.45.037-.84.114-1.197.296a3.05 3.05 0 0 0-1.333 1.333c-.183.358-.26.747-.297 1.198-.036.44-.036.983-.036 1.663v3.048c0 .68 0 1.223.036 1.663.037.45.114.84.297 1.198a3.05 3.05 0 0 0 1.333 1.332c.357.183.747.26 1.197.297.44.036.984.036 1.663.036h3.048c.68 0 1.224 0 1.663-.036.45-.037.84-.114 1.198-.296a3.05 3.05 0 0 0 1.333-1.333c.182-.358.26-.747.296-1.198.036-.44.036-.983.036-1.663V5.476c0-.68 0-1.223-.036-1.663-.037-.45-.114-.84-.296-1.198a3.05 3.05 0 0 0-1.333-1.333c-.358-.182-.747-.26-1.198-.296C9.746.95 9.203.95 8.523.95H5.5ZM3.113 2.262c.177-.09.405-.149.788-.18.39-.032.888-.032 1.597-.032h3c.71 0 1.208 0 1.597.032.383.031.612.09.788.18.367.187.666.486.853.853.09.177.149.405.18.788.032.389.032.888.032 1.597v3c0 .709 0 1.208-.032 1.597-.031.383-.09.611-.18.788a1.95 1.95 0 0 1-.853.852c-.176.09-.405.15-.788.18-.389.033-.888.033-1.597.033h-3c-.709 0-1.208 0-1.597-.032-.383-.032-.611-.09-.788-.18a1.95 1.95 0 0 1-.852-.853c-.09-.177-.15-.405-.18-.788-.032-.39-.033-.888-.033-1.597v-3c0-.71 0-1.208.032-1.597.032-.383.09-.611.18-.788a1.95 1.95 0 0 1 .853-.853ZM7.499 4.5a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2a.5.5 0 0 0 0-1h-2v-2Z" fill="#407FF2" />
    </svg>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Attr {
  icon: React.ReactNode
  label: string
}

interface ObjCard {
  entityIcon: React.ReactNode
  name: string
  badge: 'Standard' | 'Custom'
  attrs: Attr[]
  moreCount: number
}

// ─── Table cell value types (one per data column, col 2–4) ───────────────────

type TableCell =
  /** Blue pill — e.g. email address */
  | { type: 'email'; value: string }
  /** Grey pill with optional logo image — e.g. company */
  | { type: 'record'; label: string; logo?: string; logoW?: number; logoH?: number }
  /** Underlined plain text — e.g. LinkedIn slug */
  | { type: 'text-link'; value: string }
  /** Colored status badge */
  | { type: 'status'; label: string; color: 'blue' | 'green' | 'yellow' | 'orange' | 'red' | 'grey' | 'purple' | 'teal' | 'blue-soft' }
  /** Plain grey number / currency string */
  | { type: 'number'; value: string }
  /** Plain grey text */
  | { type: 'text'; value: string }

/** Column header definition — used for cols 2–4 and the add column */
interface TableColumnDef {
  headerIcon: React.ReactNode
  headerLabel: string
  /** If true the column is hidden below md breakpoint */
  hiddenOnMobile?: boolean
}

/** Single row in the data model table */
interface TableRowDef {
  /** Col 1: entity name */
  name: string
  /** Col 1: avatar image path — omit to render the generic person SVG */
  avatar?: string
  avatarW?: number
  avatarH?: number
  /** One cell per entry in `tableColumns` (cols 2–4) */
  cells: TableCell[]
  /** Optional cell shown in the add column when addHovered — omit to leave blank */
  addCell?: TableCell
}

interface TabConfig {
  id: string
  label: string
  leftCard: ObjCard
  rightCard: ObjCard
  centerCard: ObjCard
  addCard: ObjCard
  /** Icon shown next to the entity label in col 1 header */
  tableEntityIcon?: React.ReactNode
  /** First-column header label in the data table (e.g. "People") */
  tableEntityLabel: string
  /** Column definitions for cols 2–4 */
  tableColumns: TableColumnDef[]
  /** If set, a 5th column expands when addHovered is true */
  tableAddColumn?: TableColumnDef
  /** Rows shown in the data table */
  tableRows: TableRowDef[]
}

// ─── Tab 1 (Scale-ups / health-systems): Users table ─────────────────────────
// Logos: add raycast.png, stripe.png, anthropic.png, linear.png to /public/images/logos/

const TABLE_USERS_SU: TableRowDef[] = [
  {
    name: 'Albert Lund',
    cells: [
      { type: 'text', value: '6s59-027f-4C54-98a3-3af0b00a1a5c' },
      { type: 'status', label: 'Member', color: 'yellow' },
      { type: 'status', label: 'Light', color: 'blue-soft' },
    ],
    addCell: { type: 'record', label: 'Raycast', logo: '/images/logos/raycast.png', logoW: 1024, logoH: 1024 },
  },
  {
    name: 'Jenna Roberts',
    cells: [
      { type: 'text', value: '2d77-027f-5B23-96V9-3D9ed00a2a5c' },
      { type: 'status', label: 'Admin', color: 'orange' },
      { type: 'status', label: 'Light', color: 'blue-soft' },
    ],
    addCell: { type: 'record', label: 'Stripe', logo: '/images/logos/stripe.png', logoW: 225, logoH: 225 },
  },
  {
    name: 'David Chen',
    cells: [
      { type: 'text', value: '1dj0-d7dd-5090-ab709-5912b0276bc0' },
      { type: 'status', label: 'Admin', color: 'orange' },
      { type: 'status', label: 'Power User', color: 'purple' },
    ],
    addCell: { type: 'record', label: 'Anthropic', logo: '/images/logos/anthropic.png', logoW: 180, logoH: 180 },
  },
  {
    name: 'Marc Lopez',
    cells: [
      { type: 'text', value: '9bc0-3abd-8990-dj36-7698b0222ui4' },
      { type: 'status', label: 'Member', color: 'yellow' },
      { type: 'status', label: 'Inactive', color: 'teal' },
    ],
    addCell: { type: 'record', label: 'Linear', logo: '/images/logos/linear.png', logoW: 48, logoH: 48 },
  },
]

// ─── Placeholder rows for tabs 2-4 (replace with real data per tab) ───────────

const TABLE_PLACEHOLDER: TableRowDef[] = TABLE_USERS_SU

// ─── Tab data (Fethr Health CRM) ─────────────────────────────────────────────

const TABS: TabConfig[] = [
  {
    id: 'health-systems',
    label: 'Scale-ups',
    leftCard: {
      entityIcon: <PatientIcon />,
      name: 'User',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'User ID' },
        { icon: <FiDate />,     label: 'Engagement score' },
        { icon: <FiId />,       label: 'User type' },
      ],
      moreCount: 4,
    },
    rightCard: {
      entityIcon: <ProviderIcon />,
      name: 'Deal',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Deal name' },
        { icon: <FiId />,       label: 'Workspace' },
        { icon: <FiTag />,      label: 'Stage' },
      ],
      moreCount: 2,
    },
    centerCard: {
      entityIcon: <OrgIcon />,
      name: 'Person',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Name' },
        { icon: <FiId />,       label: 'Email' },
        { icon: <FiCard />,     label: 'Company' },
      ],
      moreCount: 12,
    },
    addCard: {
      entityIcon: <CustomIcon />,
      name: 'Workspace',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Name' },
        { icon: <FiDate />,     label: 'Company' },
        { icon: <FiPipeline />, label: 'Status' },
      ],
      moreCount: 7,
    },
    tableEntityLabel: 'User',
    tableColumns: [
      { headerIcon: <HdrTextFieldIcon />, headerLabel: 'User ID' },
      { headerIcon: <HdrSelectFieldIcon />, headerLabel: 'User type' },
      { headerIcon: <HdrSelectFieldIcon />, headerLabel: 'Engagement score', hiddenOnMobile: true },
    ],
    tableAddColumn: { headerIcon: <HdrWorkspaceIcon />, headerLabel: 'Workspace' },
    tableRows: TABLE_USERS_SU,
  },
  {
    id: 'saas-startups',
    label: 'Saas Startups',
    leftCard: {
      entityIcon: <PatientIcon />,
      name: 'Deal',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Deal name' },
        { icon: <FiEmail />,    label: 'Stage' },
        { icon: <FiCard />,     label: 'Deal value' },
      ],
      moreCount: 15,
    },
    rightCard: {
      entityIcon: <ProviderIcon />,
      name: 'Person',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Name' },
        { icon: <FiCurrency />, label: 'Email' },
        { icon: <FiPipeline />, label: 'Company' },
      ],
      moreCount: 6,
    },
    centerCard: {
      entityIcon: <OrgIcon />,
      name: 'Company',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Domain' },
        { icon: <FiCard />,     label: 'Industry' },
        { icon: <FiId />,       label: 'Location' },
      ],
      moreCount: 8,
    },
    addCard: {
      entityIcon: <CustomIcon />,
      name: 'Partnership',
      badge: 'Custom',
      attrs: [
        { icon: <FiText />,     label: 'Partnership name' },
        { icon: <FiText />,     label: 'Partnership type' },
        { icon: <FiPipeline />, label: 'Point of contact' },
      ],
      moreCount: 10,
    },
    tableEntityLabel: 'People',
    tableColumns: [
      { headerIcon: <HdrEmailIcon />, headerLabel: 'Email' },
      { headerIcon: <HdrCompanyIcon />, headerLabel: 'Company' },
      { headerIcon: <HdrLinkedInIcon />, headerLabel: 'LinkedIn', hiddenOnMobile: true },
    ],
    tableRows: TABLE_PLACEHOLDER,
  },
  {
    id: 'smbs',
    label: 'SMBs',
    leftCard: {
      entityIcon: <PatientIcon />,
      name: 'Project',
      badge: 'Custom',
      attrs: [
        { icon: <FiText />,     label: 'Company' },
        { icon: <FiDate />,     label: 'Point of contact' },
        { icon: <FiDate />,     label: 'Status' },
      ],
      moreCount: 5,
    },
    rightCard: {
      entityIcon: <ProviderIcon />,
      name: 'Company',
      badge: 'Standard',
      attrs: [
        { icon: <FiDate />,     label: 'Name' },
        { icon: <FiText />,     label: 'Industry' },
        { icon: <FiTag />,      label: 'Domain' },
      ],
      moreCount: 8,
    },
    centerCard: {
      entityIcon: <OrgIcon />,
      name: 'Person',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Email' },
        { icon: <FiTag />,      label: 'Company' },
        { icon: <FiId />,       label: 'LinkedIn' },
      ],
      moreCount: 12,
    },
    addCard: {
      entityIcon: <CustomIcon />,
      name: 'Invoice',
      badge: 'Custom',
      attrs: [
        { icon: <FiDate />,     label: 'Company' },
        { icon: <FiText />,     label: 'Status' },
        { icon: <FiTag />,      label: 'Amount' },
      ],
      moreCount: 3,
    },
    tableEntityLabel: 'People',
    tableColumns: [
      { headerIcon: <HdrEmailIcon />, headerLabel: 'Email' },
      { headerIcon: <HdrCompanyIcon />, headerLabel: 'Company' },
      { headerIcon: <HdrLinkedInIcon />, headerLabel: 'LinkedIn', hiddenOnMobile: true },
    ],
    tableRows: TABLE_PLACEHOLDER,
  },
  {
    id: 'investors',
    label: 'Investors',
    leftCard: {
      entityIcon: <PatientIcon />,
      name: 'Company',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Name' },
        { icon: <FiId />,       label: 'Domain' },
        { icon: <FiCard />,     label: 'Industry' },
      ],
      moreCount: 6,
    },
    rightCard: {
      entityIcon: <ProviderIcon />,
      name: 'Person',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Name' },
        { icon: <FiCard />,     label: 'Email' },
        { icon: <FiTag />,      label: 'Company' },
      ],
      moreCount: 11,
    },
    centerCard: {
      entityIcon: <OrgIcon />,
      name: 'Deal',
      badge: 'Standard',
      attrs: [
        { icon: <FiText />,     label: 'Company' },
        { icon: <FiTag />,      label: 'Investment amount' },
        { icon: <FiCurrency />, label: 'Deal stage' },
      ],
      moreCount: 10,
    },
    addCard: {
      entityIcon: <OrgIcon />,
      name: 'Fund',
      badge: 'Custom',
      attrs: [
        { icon: <FiText />,     label: 'Name' },
        { icon: <FiTag />,      label: 'Domain' },
        { icon: <FiCurrency />, label: 'Employees' },
      ],
      moreCount: 7,
    },
    tableEntityLabel: 'People',
    tableColumns: [
      { headerIcon: <HdrEmailIcon />, headerLabel: 'Email' },
      { headerIcon: <HdrCompanyIcon />, headerLabel: 'Company' },
      { headerIcon: <HdrLinkedInIcon />, headerLabel: 'LinkedIn', hiddenOnMobile: true },
    ],
    tableRows: TABLE_PLACEHOLDER,
  },
]

// ─── Object card ──────────────────────────────────────────────────────────────

function ObjectCard({ card }: { card: ObjCard }) {
  return (
    <div className="group relative w-[141px] lg:w-[259px] rounded-[10px] p-[7px] border lg:rounded-xl lg:p-[11px] border-[#EDEFF3] bg-white-100 shadow-[0px_2px_3px_-2px_rgba(28,40,64,0.10),0px_4px_6px_-2px_rgba(28,40,64,0.04)]">
      <div className="pointer-events-none select-none">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-x-1.5">
            {card.entityIcon}
            <div className="font-semibold text-secondary-foreground text-[10px] leading-[14px] tracking-[-0.28px] lg:text-[14px] lg:leading-5">
              {card.name}
            </div>
          </div>
          <div className={cn(
            'border font-medium rounded-md px-[3px] py-[0.5px] text-[8px] leading-[11px] lg:rounded-lg lg:px-[5px] lg:py-px lg:text-[12px] lg:leading-4',
            card.badge === 'Custom'
              ? 'border-[#D6E5FF] bg-[#E5EEFF] text-[#183C81]'
              : 'border-[#EEEFF1] bg-[#F4F5F6] text-[#75777C]',
          )}>
            {card.badge}
          </div>
        </div>

        {/* Attribute rows */}
        <div className="mt-2 border-[#EDEFF3] border-t lg:mt-3">
          {card.attrs.map((attr, i) => (
            <div key={i} className="border-[#EDEFF3] border-b pt-1 pb-[3px] pl-2 lg:pt-1.5 lg:pb-[5px] lg:pl-3">
              <div className="flex items-center gap-x-1.5">
                {attr.icon}
                <div className="font-medium text-[#5C5E63] text-[9px] leading-[11px] tracking-normal lg:text-[12px] lg:leading-4">
                  {attr.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More attributes */}
        <div className="flex items-center mt-1 gap-x-[6.5px] pl-[8.5px] lg:mt-1.5 lg:gap-x-[7px] lg:pl-[13px]">
          <FiPlus />
          <div className="font-medium text-[#9FA1A7] text-[8px] leading-[11px] tracking-[-0.16px] lg:text-[11px] lg:leading-4 lg:tracking-[-0.22px]">
            {card.moreCount} More Attributes
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Add object slot ──────────────────────────────────────────────────────────

function AddObjectSlot({
  addCard,
  hovered,
  onEnter,
}: {
  addCard: ObjCard
  hovered: boolean
  onEnter: () => void
}) {
  return (
    <button
      className={cn(
        'group relative w-[141px] lg:w-[259px] rounded-[10px] p-[7px] border lg:rounded-xl lg:p-[11px] transition-all duration-300 ease-in-out active:scale-[0.95] cursor-pointer',
        hovered
          ? 'border-[#EDEFF3] bg-white-100 shadow-[0px_2px_3px_-2px_rgba(28,40,64,0.10),0px_4px_6px_-2px_rgba(28,40,64,0.04)]'
          : 'border-white-100 bg-white-100 ring-4 ring-[#94B9FF]/25',
      )}
      onClick={() => { if (!hovered) onEnter() }}
    >
      {/* Dashed blue SVG border overlay — hidden once revealed */}
      <svg
        className="absolute inset-[-1px] h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible transition-opacity duration-300 ease-in-out"
        style={{ opacity: hovered ? 0 : 1 }}
        fill="none"
        aria-hidden
      >
        <rect x="0" y="0" rx="10" width="100%" height="100%" fill="none" stroke="#709FF5" strokeDasharray="4 4" strokeLinecap="round" />
      </svg>

      {/* Stacked: button label OR card content */}
      <div className="grid *:col-start-1 *:row-start-1">
        {/* "Add object" label — visible when not hovered */}
        <div
          className="flex items-center justify-center transition-opacity duration-300 ease-in-out gap-x-1 lg:gap-x-1.5"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          <AddObjIcon />
          <span className="font-medium text-[#407FF2] text-[10px] leading-[14px] tracking-[-0.2px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px]">
            Add object
          </span>
        </div>

        {/* Card content — revealed on hover */}
        <div
          className="pointer-events-none select-none transition-opacity duration-300 ease-in-out"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-hidden={!hovered}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-x-1.5">
              {addCard.entityIcon}
              <div className="font-semibold text-secondary-foreground text-[10px] leading-[14px] tracking-[-0.28px] lg:text-[14px] lg:leading-5">
                {addCard.name}
              </div>
            </div>
            <div className="border font-medium rounded-md px-[3px] py-[0.5px] text-[8px] leading-[11px] lg:rounded-lg lg:px-[5px] lg:py-px lg:text-[12px] lg:leading-4 border-[#D6E5FF] bg-[#E5EEFF] text-[#183C81]">
              Custom
            </div>
          </div>
          <div className="mt-2 border-[#EDEFF3] border-t lg:mt-3">
            {addCard.attrs.map((attr, i) => (
              <div key={i} className="border-[#EDEFF3] border-b pt-1 pb-[3px] pl-2 lg:pt-1.5 lg:pb-[5px] lg:pl-3">
                <div className="flex items-center gap-x-1.5">
                  {attr.icon}
                  <div className="font-medium text-[#5C5E63] text-[9px] leading-[11px] lg:text-[12px] lg:leading-4">
                    {attr.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-1 gap-x-[6.5px] pl-[8.5px] lg:mt-1.5 lg:gap-x-[7px] lg:pl-[13px]">
            <FiPlus />
            <div className="font-medium text-[#9FA1A7] text-[8px] leading-[11px] lg:text-[11px] lg:leading-4">
              {addCard.moreCount} More Attributes
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

// ─── Connector building blocks — named constants, combine freely in TAB_CONNECTORS
// Each is a single absolutely-positioned grid item placed inside the card grid.

/** User to company tab 1 */
const UserToCompany_su = (
  <div key="user-to-company-su" className="pointer-events-none absolute top-0 left-[128px] col-start-1 col-end-3 row-start-2 row-end-3">
    <svg className="h-full w-full" viewBox="0 0 215 64" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M1 0.5V29.079C1 35.255 4.16635 40.9998 9.38812 44.2978L30.1929 57.4376C35.9463 61.0713 42.6118 63 49.4166 63H215" stroke="#E4E7EC" />
    </svg>
    <div className="absolute -top-px left-px">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M -17 0 L -17 3 A 8 8 0 0 0 -9 12 L 0 12" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 17 0 L 17 3 A 8 8 0 0 1 9 12 L 0 12" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="-17" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="17" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute -right-[1.5px] bottom-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <circle cx="0" cy="-0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Person to deal tab 1 */
const PersonToDeal_su = (
  <div key="person-to-deal-su" className="pointer-events-none absolute top-0 right-[129px] bottom-[-29px] left-0 col-start-4 col-end-8 row-start-2 row-end-3">
    <svg className="h-full w-full" viewBox="0 0 592 171" fill="none" preserveAspectRatio="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M0 63.5H6.37893C18.6103 63.5 30.0049 69.7104 36.6337 79.9898L84.3663 154.009C90.9951 164.289 102.39 170.499 114.621 170.499H367.5C387.382 170.499 403.5 154.381 403.5 134.499V99C403.5 79.1177 419.608 63 439.491 63C469.733 63 512.741 63 543.098 63C549.903 63 556.554 61.0713 562.307 57.4376L583.112 44.2978C588.334 40.9998 591.5 35.255 591.5 29.079V0.5" stroke="#E4E7EC" />
    </svg>
    <div className="absolute -top-px right-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M -17 0 L -17 3 A 8 8 0 0 0 -9 12 L 0 12" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 17 0 L 17 3 A 8 8 0 0 1 9 12 L 0 12" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="-17" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0"   cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="17"  cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute bottom-[107.25px] -left-[0.5px]">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Deal to person tab 2 */
const DealToPerson_saas = (
  <div key="deal-to-person-saas" className="pointer-events-none absolute top-[53px] col-start-2 col-end-7 row-start-1 row-end-2 w-full">
    <svg className="h-full w-full" viewBox="0 0 805 31" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M0 30.5L703.04 30.5001C710.805 30.5001 718.361 27.9897 724.582 23.3436L744.918 8.15594C751.139 3.50981 758.695 0.99949 766.46 0.99949L805 0.999491" stroke="#E4E7EC" />
    </svg>
    <div className="absolute bottom-[-0.5px] left-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute top-px -right-px">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Company to person tab 2 */
const CompanyToPerson_saas = (
  <div key="company-to-person-saas" className="pointer-events-none absolute top-[109px] right-0 left-0 col-start-4 col-end-7 row-start-1 row-end-3">
    <svg className="h-full w-full" viewBox="0 0 461 88" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M461 1L396.5 1L110.904 1.00001C98.5181 1.00001 87.0021 7.36701 80.4158 17.8564L47.5842 70.1437C40.9979 80.633 29.4819 87 17.0962 87L0 87" stroke="#E4E7EC" />
    </svg>
    <div className="absolute top-px -right-px">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute -bottom-0 left-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <circle cx="-0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Project to company tab 3 */
const ProjectToCompany_smb = (
  <div key="project-to-company-smb" className="pointer-events-none absolute top-[40px] right-0 left-0 col-start-2 col-end-7 row-start-1 row-end-2 w-full">
    <svg className="h-full w-full" viewBox="0 0 806 31" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M806 1L775.46 0.999956C767.695 0.999945 760.139 3.51027 753.918 8.15641L733.582 23.3441C727.361 27.9902 719.805 30.5005 712.04 30.5005L51.5 30.5005L-2.57902e-06 30.5005" stroke="#E4E7EC" />
    </svg>
    <div className="absolute -bottom-[0.5px] left-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute top-px -right-px">
      <svg className="h-px w-px overflow-visible" fill="none">
        <circle cx="0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Company to Person tab 3 */
const CompanyToPerson_sms = (
  <div key="company-to-person-sms" className="pointer-events-none absolute top-[109px] right-0 left-0 col-start-4 col-end-7 row-start-1 row-end-3 w-full">
    <svg className="h-full w-full" viewBox="0 0 461 88" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M461 1L396.5 1L110.904 1.00001C98.5181 1.00001 87.0021 7.36701 80.4158 17.8564L47.5842 70.1437C40.9979 80.633 29.4819 87 17.0962 87L0 87" stroke="#E4E7EC" />
    </svg>
    <div className="absolute top-px -right-px">
      <svg className="h-px w-px overflow-visible" fill="none">
        <circle cx="0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute bottom-0 left-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Company to Person tab 4 */
const CompanyToPerson_in = (
  <div key="company-to-person-in" className="pointer-events-none absolute top-1/2 left-0 col-start-2 col-end-7 row-start-1 row-end-2 w-full -translate-y-1/2">
    <svg className="h-full w-full" viewBox="0 0 806 2" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M0 1L806 1" stroke="#E4E7EC" />
    </svg>
    <div className="absolute top-[0.75px] left-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <circle cx="-0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute top-[0.75px] -right-px">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Company to Deal tab 4 */
const CompanyToDeal_in = (
  <div key="company-to-deal-in" className="pointer-events-none absolute top-0 left-[128px] col-start-1 col-end-3 row-start-2 row-end-3">
    <svg className="h-full w-full" viewBox="0 0 215 64" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M1 0.5V29.079C1 35.255 4.16635 40.9998 9.38812 44.2978L30.1929 57.4376C35.9463 61.0713 42.6118 63 49.4166 63H215" stroke="#E4E7EC" />
    </svg>
    <div className="absolute -top-[0.5px] left-[1px]">
      <svg className="h-px w-px overflow-visible" fill="none">
        <circle cx="0" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute -right-px bottom-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
)

/** Workspace to user tab 1 added */
function WorkspaceToUser_su(show: boolean) {
  return (
  <div key="workspace-to-user-su" className="pointer-events-none absolute top-[82px] right-0 left-0 col-start-[2] col-end-[5] row-start-[1] row-end-[3] transition-opacity duration-300 ease-in-out" style={{ opacity: show ? 1 : 0 }}>
    <svg className="h-full w-full" viewBox="0 0 462 115" fill="none">
      <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M462 114L442.093 114C429.605 114 418.008 107.527 411.452 96.8976L362.548 17.6024C355.992 6.97263 344.395 0.500002 331.907 0.500002L0.49999 0.500002" stroke="#E4E7EC" />
    </svg>
    <div className="absolute -right-px bottom-[0.5px]">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
    <div className="absolute top-[0.5px] left-0">
      <svg className="h-px w-px overflow-visible" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
        <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        <circle cx="-0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      </svg>
    </div>
  </div>
  )
}

/** Workspace to deal tab 1 added */
function WorkspaceToDeal_su(show: boolean) {
  return (
    <div key="workspace-to-deal-su" className="pointer-events-none absolute top-[82px] right-[0px] bottom-[19px] col-start-5 col-end-7 row-start-1 row-end-2 transition-opacity duration-300 ease-in-out" style={{ opacity: show ? 1 : 0 }}>
      <svg className="h-full w-full" viewBox="0 0 216 64" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M216 1L53.5736 1.00001C39.7692 1.00001 27.1805 8.89369 21.1678 21.3198L0.999995 63" stroke="#E4E7EC" />
      </svg>
      <div className="absolute -bottom-px left-px">
        <svg className="h-px w-px overflow-visible" fill="none">
          <circle cx="0" cy="-0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-[0.75px] -right-px">
        <svg className="h-px w-px overflow-visible" fill="none">
          <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
          <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
          <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          <circle cx="0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          <circle cx="0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}

/** Company to partnership tab 2 added */
function CompanyToPartnership_saas(show: boolean) {
  return (
    <div key="company-to-partnership-saas" className="pointer-events-none absolute top-[61px] right-0 left-0 col-start-4 col-end-5 row-start-2 row-end-3 transition-opacity duration-300 ease-in-out" style={{ opacity: show ? 1 : 0 }}>
      <svg className="h-full w-full" viewBox="0 0 118 30" fill="none">
        <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M0 29L33.131 29C41.7559 29 50.0942 25.9035 56.6285 20.2739L68.8715 9.72608C75.4058 4.09651 83.7441 1 92.369 1L117.5 1" stroke="#E4E7EC" />
      </svg>
      <div className="absolute bottom-0 left-0">
        <svg className="h-px w-px overflow-visible" fill="none">
          <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
          <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" />
          <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          <circle cx="-0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          <circle cx="-0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-px -right-px">
        <svg className="h-px w-px overflow-visible" fill="none">
          <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
          <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="0" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" />
          <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          <circle cx="0.5" cy="0"   r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          <circle cx="0.5" cy="17"  r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}

/** Project to Invoice tab 3 added */
function ProjectToInvoice_smb(show: boolean) {
  return (
    <div className="pointer-events-none absolute top-0 right-0 bottom-[-29px] left-[128px] col-start-1 col-end-5 row-start-2 row-end-3 transition-opacity duration-300 ease-in-out" style={{ opacity: show ? 1 : 0 }}>
        <svg className="h-full w-full" viewBox="0 0 593 171" fill="none" preserveAspectRatio="none">
          <path pathLength="1" strokeDasharray="1 1" d="M592.5 63.5H586.121C573.89 63.5 562.495 69.7104 555.866 79.9898L508.134 154.009C501.505 164.289 490.11 170.499 477.879 170.499H225C205.118 170.499 189 154.381 189 134.499V99C189 79.1177 172.892 63 153.009 63C122.767 63 79.7586 63 49.402 63C42.5972 63 35.9463 61.0713 30.1929 57.4376L9.38812 44.2978C4.16635 40.9998 1 35.255 1 29.079V0.5" stroke="#E4E7EC" strokeDashoffset="0" />
        </svg>
        <div className="absolute top-[63.5px] -right-px">
          <svg className="h-px w-px overflow-visible" fill="none">
            <path pathLength="1" strokeDasharray="1 1" d="M 0 -17 L -3 -17 A 8 8 0 0 0 -12 -9 L -12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <path pathLength="1" strokeDasharray="1 1" d="M 0 17 L -3 17 A 8 8 0 0 1 -12 9 L -12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <circle cx="0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="0.5" cy="17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute -top-px left-px">
          <svg className="h-px w-px overflow-visible" fill="none">
            <circle cx="0" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
      </div>
  )
}

/** Company to Invoice tab 3 added */
function CompanyToInvoice_smb(show: boolean) {
  return (
    <div className="pointer-events-none absolute top-0 right-[129px] left-0 col-start-6 col-end-8 row-start-2 row-end-3 transition-opacity duration-300 ease-in-out" style={{ opacity: show ? 1 : 0 }}>
        <svg className="h-full w-full" viewBox="0 0 216 64" fill="none">
          <path pathLength="1" strokeDasharray="1 1" d="M0 63L156.115 63C168.491 63 179.998 56.6435 186.588 46.1682L215 1" stroke="#E4E7EC" strokeDashoffset="0" />
        </svg>
        <div className="absolute bottom-0 left-0">
          <svg className="h-px w-px overflow-visible" fill="none">
            <path pathLength="1" strokeDasharray="1 1" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <path pathLength="1" strokeDasharray="1 1" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="-0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="-0.5" cy="17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute -top-[0.5px] -right-[1px]">
          <svg className="h-px w-px overflow-visible" fill="none">
            <circle cx="-0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
      </div>
  )
}

/** Fund to Person tab 4 added */
function FundToPerson_in(show: boolean) {
  return (
    <div className="pointer-events-none absolute top-0 right-[129px] left-0 col-start-6 col-end-8 row-start-2 row-end-3 transition-opacity duration-300 ease-in-out" style={{ opacity: show ? 1 : 0 }}>
        <svg className="h-full w-full" viewBox="0 0 215 64" fill="none">
          <path pathLength="1" strokeDasharray="1 1" d="M214 0.5V29.079C214 35.255 210.834 40.9998 205.612 44.2978L184.807 57.4376C179.054 61.0713 172.388 63 165.583 63H0" stroke="#E4E7EC" strokeDashoffset="0" />
        </svg>
        <div className="absolute bottom-0 left-0">
          <svg className="h-px w-px overflow-visible" fill="none">
            <path pathLength="1" strokeDasharray="1 1" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <path pathLength="1" strokeDasharray="1 1" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="-0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="-0.5" cy="17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute -top-px right-0">
          <svg className="h-px w-px overflow-visible" fill="none">
            <path pathLength="1" strokeDasharray="1 1" d="M -17 0 L -17 3 A 8 8 0 0 0 -9 12 L 0 12" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <path pathLength="1" strokeDasharray="1 1" d="M 17 0 L 17 3 A 8 8 0 0 1 9 12 L 0 12" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <circle cx="-17" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="0" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="17" cy="0.5" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
      </div>
  )
}

/** Fund to Deal tab 4 added */
function FundToDeal_in(show: boolean) {
  return (
    <div className="pointer-events-none absolute top-[61px] right-0 left-0 col-start-4 col-end-5 row-start-2 row-end-3 transition-opacity duration-300 ease-in-out" style={{ opacity: show ? 1 : 0 }}>
        <svg className="h-full w-full" viewBox="0 0 118 2" fill="none">
          <path pathLength="1" strokeDasharray="1 1" d="M0 1L118 1" stroke="#E4E7EC" strokeDashoffset="0" />
        </svg>
        <div className="absolute top-px -right-px">
          <svg className="h-px w-px overflow-visible" fill="none">
            <circle cx="0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute top-px left-0">
          <svg className="h-px w-px overflow-visible" fill="none">
            <path pathLength="1" strokeDasharray="1 1" d="M 0 -17 L 3 -17 A 8 8 0 0 1 12 -9 L 12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <path pathLength="1" strokeDasharray="1 1" d="M 0 17 L 3 17 A 8 8 0 0 0 12 9 L 12 0" strokeWidth="1" stroke="#E4E7EC" strokeDashoffset="0" />
            <circle cx="-0.5" cy="-17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="-0.5" cy="0" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
            <circle cx="-0.5" cy="17" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
          </svg>
        </div>
      </div>
  )
}

// ─── TAB_CONNECTORS — pick which connectors appear per tab ────────────────────
// Add new C_* blocks above and reference them here to customise each tab.

const TAB_CONNECTORS: Record<string, React.ReactNode[]> = {
  'health-systems': [UserToCompany_su, PersonToDeal_su],
  'saas-startups': [UserToCompany_su, DealToPerson_saas, CompanyToPerson_saas],
  'smbs': [ProjectToCompany_smb, CompanyToPerson_sms],
  'investors': [CompanyToPerson_in, CompanyToDeal_in],
}

// ─── TAB_ADD_CONNECTORS — connectors that appear when the add card is revealed ──
// Each entry is a function (show: boolean) => React.ReactNode.

const TAB_ADD_CONNECTORS: Record<string, ((show: boolean) => React.ReactNode)[]> = {
  'health-systems': [WorkspaceToUser_su, WorkspaceToDeal_su],
  'saas-startups':  [CompanyToPartnership_saas],
  'smbs':           [ProjectToInvoice_smb, CompanyToInvoice_smb],
  'investors':      [FundToPerson_in, FundToDeal_in],
}

// ─── GridConnectors — renders the active tab's connector set ──────────────────

function GridConnectors({ connectors }: { connectors: React.ReactNode[] }) {
  return <>{connectors}</>
}

// ─── Desktop card grid (min-[1320px]+) ────────────────────────────────────────

function DesktopCardGrid({
  tab,
  addHovered,
  onAddEnter,
}: {
  tab: TabConfig
  addHovered: boolean
  onAddEnter: () => void
}) {
  const connectors = TAB_CONNECTORS[tab.id] ?? TAB_CONNECTORS['health-systems']!

  return (
    <div className="relative hidden min-[1320px]:block">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <DotGridBg />
      </div>

      <div className="relative px-[34px] pt-[34px] pb-16">
        <div className="relative mx-auto grid grid-cols-[auto_2fr_auto_3fr_auto_2fr_auto]">

          <div style={{ gridColumn: 1, gridRow: 1 }}>
            <ObjectCard card={tab.leftCard} />
          </div>

          <div style={{ gridColumn: 7, gridRow: 1 }}>
            <ObjectCard card={tab.rightCard} />
          </div>

          <div style={{ gridColumn: 3, gridRow: 2 }} className="-mt-5">
            <ObjectCard card={tab.centerCard} />
          </div>

          <div style={{ gridColumn: 5, gridRow: 2 }} className="-mt-5">
            <AddObjectSlot
              addCard={tab.addCard}
              hovered={addHovered}
              onEnter={onAddEnter}
            />
          </div>

          {/* Connector paths — always visible */}
          <GridConnectors connectors={connectors} />

          {/* Add-card connectors — direct grid children, opacity controlled per connector */}
          {(TAB_ADD_CONNECTORS[tab.id] ?? []).map((fn, i) => (
            <Fragment key={`add-${i}`}>{fn(addHovered)}</Fragment>
          ))}

        </div>
      </div>
    </div>
  )
}

// ─── Mobile / tablet card strip (< 1320px) ───────────────────────────────────

function MobileCardStrip({
  tab,
  addHovered,
  onAddEnter,
}: {
  tab: TabConfig
  addHovered: boolean
  onAddEnter: () => void
}) {
  return (
    <div className="relative block min-[1320px]:hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <DotGridBg />
      </div>

      <div className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-7 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="snap-center shrink-0">
          <ObjectCard card={tab.leftCard} />
        </div>
        <div className="snap-center shrink-0">
          <ObjectCard card={tab.centerCard} />
        </div>
        <div className="snap-center shrink-0">
          <ObjectCard card={tab.rightCard} />
        </div>
        <div className="snap-center shrink-0">
          <AddObjectSlot
            addCard={tab.addCard}
            hovered={addHovered}
            onEnter={onAddEnter}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Data model table (static, pixel-perfect from attio.com) ─────────────────

/** Reusable cell wrapper: stacked animation grid */
function CellContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid overflow-hidden *:col-start-1 *:row-start-1">
      <div style={{ opacity: 1, transform: 'none' }}>
        {children}
      </div>
    </div>
  )
}

/** Row-level checkbox icon */
function RowCheckIcon() {
  return (
    <svg className="size-[11px] shrink-0 lg:size-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x=".5" y=".5" width="15" height="15" rx="5.5" fill="#fff" stroke="#E6E7EA" />
    </svg>
  )
}

/** Header "@" email icon */
function HdrEmailIcon() {
  return (
    <svg className="size-2.5 shrink-0 lg:size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 5.084a1.916 1.916 0 1 0 0 3.831 1.916 1.916 0 0 0 0-3.83ZM3.985 7a3.016 3.016 0 1 1 6.03 0 3.016 3.016 0 0 1-6.03 0Z" fill="#5C5E63" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7 2.05a4.95 4.95 0 1 0 0 9.9.55.55 0 0 1 0 1.1A6.05 6.05 0 0 1 7 .95c2.363 0 3.908.9 4.844 2.153.917 1.226 1.206 2.73 1.206 3.897v.948a2.067 2.067 0 1 1-4.134 0V4.534a.55.55 0 0 1 1.1 0v3.414a.967.967 0 0 0 1.934 0V7c0-1.014-.256-2.26-.987-3.239C10.252 2.81 9.047 2.05 7 2.05Z" fill="#5C5E63" />
    </svg>
  )
}

/** Header company/phone icon */
function HdrCompanyIcon() {
  return (
    <svg className="size-2.5 shrink-0 lg:size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.976.45h2.048c.68 0 1.223 0 1.663.036.45.037.84.114 1.198.296a3.05 3.05 0 0 1 1.333 1.333c.182.358.26.747.296 1.198.036.44.036.983.036 1.663v4.048c0 .68 0 1.223-.036 1.663-.037.45-.114.84-.296 1.198a3.05 3.05 0 0 1-1.333 1.333c-.358.182-.747.26-1.198.296-.44.036-.983.036-1.663.036H5.976c-.68 0-1.223 0-1.663-.036-.45-.037-.84-.114-1.198-.296a3.05 3.05 0 0 1-1.333-1.333c-.182-.358-.26-.748-.296-1.199-.036-.44-.036-.983-.036-1.664V4.978c0-.68 0-1.225.036-1.664.037-.451.114-.84.296-1.199A3.05 3.05 0 0 1 3.115.782C3.473.6 3.862.522 4.313.486 4.753.45 5.296.45 5.976.45ZM4.403 1.582c-.383.032-.611.09-.788.18a1.95 1.95 0 0 0-.852.853c-.09.177-.15.405-.18.788-.033.39-.033.889-.033 1.599v3.996c0 .71 0 1.21.032 1.599.032.383.09.611.18.788.188.367.486.665.853.853.177.09.405.149.788.18.39.032.888.032 1.597.032h2c.71 0 1.208 0 1.597-.032.383-.031.611-.09.788-.18a1.95 1.95 0 0 0 .852-.853c.09-.177.15-.405.18-.788.033-.39.033-.888.033-1.597V5c0-.71 0-1.208-.032-1.597-.031-.383-.09-.611-.18-.788a1.95 1.95 0 0 0-.853-.852c-.177-.09-.405-.15-.788-.18C9.207 1.55 8.71 1.55 8 1.55H6c-.71 0-1.208 0-1.597.032Z" fill="#5C5E63" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.65 3.8a.55.55 0 0 1 .55-.55H8a.55.55 0 1 1 0 1.1H4.2a.55.55 0 0 1-.55-.55ZM5.45 6.6A.55.55 0 0 1 6 6.05h3.8a.55.55 0 1 1 0 1.1H6a.55.55 0 0 1-.55-.55ZM6.952 8.84h.096c.228-.001.431-.001.6.013.18.015.368.048.552.141.269.137.487.355.623.623.094.184.127.373.142.553.014.168.014.371.014.6v1.96h-1.1v-1.94c0-.255 0-.412-.01-.53a.422.422 0 0 0-.026-.143.326.326 0 0 0-.142-.143.422.422 0 0 0-.143-.025 7.366 7.366 0 0 0-.53-.01h-.056c-.254 0-.412 0-.53.01a.422.422 0 0 0-.143.025.325.325 0 0 0-.142.143.422.422 0 0 0-.025.142c-.01.119-.01.276-.01.53v1.942h-1.1v-1.962c0-.228 0-.43.013-.6.015-.18.048-.368.142-.552.136-.268.354-.486.623-.623.184-.093.372-.126.552-.141.169-.014.372-.014.6-.014Z" fill="#5C5E63" />
    </svg>
  )
}

/** Header text-field icon (rectangle + "A" letter + lines) — used for ID / text columns */
function HdrTextFieldIcon() {
  return (
    <svg className="size-2.5 shrink-0 lg:size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.976 1.45h4.048c.68 0 1.223 0 1.663.036.45.037.84.114 1.198.296a3.05 3.05 0 0 1 1.333 1.333c.182.358.26.747.296 1.198.036.44.036.983.036 1.663v2.048c0 .68 0 1.223-.036 1.663-.037.45-.114.84-.296 1.198a3.05 3.05 0 0 1-1.333 1.332c-.358.183-.747.26-1.198.297-.44.036-.983.036-1.663.036H4.976c-.68 0-1.223 0-1.663-.036-.45-.037-.84-.114-1.198-.296a3.05 3.05 0 0 1-1.333-1.333c-.182-.358-.26-.747-.296-1.198C.45 9.247.45 8.704.45 8.024V5.976c0-.68 0-1.223.036-1.663.037-.45.114-.84.296-1.198a3.05 3.05 0 0 1 1.333-1.333c.358-.182.747-.26 1.198-.296.44-.036.983-.036 1.663-.036ZM3.403 2.582c-.383.031-.611.09-.788.18a1.95 1.95 0 0 0-.852.853c-.09.177-.15.405-.18.788C1.55 4.792 1.55 5.29 1.55 6v2c0 .71 0 1.208.032 1.597.032.383.09.611.18.788.188.367.486.665.853.852.177.09.405.15.788.18.39.033.888.033 1.597.033h4c.71 0 1.208 0 1.597-.032.383-.032.611-.09.788-.18a1.95 1.95 0 0 0 .853-.853c.09-.177.149-.405.18-.788.032-.39.032-.888.032-1.597V6c0-.71 0-1.208-.032-1.597-.031-.383-.09-.611-.18-.788a1.95 1.95 0 0 0-.853-.853c-.177-.09-.405-.149-.788-.18C10.207 2.55 9.71 2.55 9 2.55H5c-.71 0-1.208 0-1.597.032Z" fill="#5C5E63" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5 3.65a.55.55 0 0 1 .517.362l2 5.5a.55.55 0 0 1-1.034.376L5.997 8.55H4.003l-.486 1.338a.55.55 0 0 1-1.034-.376l2-5.5A.55.55 0 0 1 5 3.65Zm-.597 3.8h1.194L5 5.81l-.597 1.64ZM8.1 6a.55.55 0 0 1 .55-.55h2.4a.55.55 0 1 1 0 1.1h-2.4A.55.55 0 0 1 8.1 6ZM8.1 8a.55.55 0 0 1 .55-.55h2.4a.55.55 0 1 1 0 1.1h-2.4A.55.55 0 0 1 8.1 8Z" fill="#5C5E63" />
    </svg>
  )
}

/** Header select/enum field icon (rectangle + up-down arrows + line) — used for type / score columns */
function HdrSelectFieldIcon() {
  return (
    <svg className="size-2.5 shrink-0 lg:size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.976 1.45h4.048c.68 0 1.223 0 1.663.036.45.037.84.114 1.198.296a3.05 3.05 0 0 1 1.333 1.333c.182.358.26.747.296 1.198.036.44.036.983.036 1.663v2.048c0 .68 0 1.223-.036 1.663-.037.45-.114.84-.296 1.198a3.05 3.05 0 0 1-1.333 1.333c-.358.182-.747.26-1.198.296-.44.036-.983.036-1.663.036H4.976c-.68 0-1.223 0-1.663-.036-.45-.037-.84-.114-1.198-.296a3.05 3.05 0 0 1-1.333-1.333c-.182-.358-.26-.747-.296-1.198C.45 9.247.45 8.704.45 8.024V5.976c0-.68 0-1.223.036-1.663.037-.45.114-.84.296-1.198a3.05 3.05 0 0 1 1.333-1.333c.358-.182.747-.26 1.198-.296.44-.036.983-.036 1.663-.036ZM3.403 2.582c-.383.032-.611.09-.788.18a1.95 1.95 0 0 0-.852.853c-.09.177-.15.405-.18.788-.033.39-.033.888-.033 1.597v2c0 .71 0 1.208.032 1.597.032.383.09.611.18.788.188.367.486.665.853.853.177.09.405.149.788.18.39.032.888.032 1.597.032h4c.71 0 1.208 0 1.597-.032.383-.031.611-.09.788-.18a1.95 1.95 0 0 0 .853-.853c.09-.177.149-.405.18-.788.032-.39.032-.888.032-1.597V6c0-.71 0-1.208-.032-1.597-.031-.383-.09-.611-.18-.788a1.95 1.95 0 0 0-.853-.852c-.177-.09-.405-.15-.788-.18C10.207 2.55 9.71 2.55 9 2.55H5c-.71 0-1.208 0-1.597.032Z" fill="#5C5E63" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.629 4.554a.49.49 0 0 1 .693 0l1.05 1.05a.49.49 0 0 1-.694.693l-.703-.704-.704.704a.49.49 0 0 1-.692-.693l1.05-1.05ZM9.629 9.446a.49.49 0 0 0 .693 0l1.05-1.05a.49.49 0 1 0-.693-.693l-.704.704-.703-.704a.49.49 0 0 0-.693.693l1.05 1.05ZM2.425 7a.55.55 0 0 1 .55-.55h3.85a.55.55 0 0 1 0 1.1h-3.85a.55.55 0 0 1-.55-.55Z" fill="#5C5E63" />
    </svg>
  )
}

/** Header workspace/exchange icon (bidirectional arrows) — used for the add-column Workspace */
function HdrWorkspaceIcon() {
  return (
    <svg className="size-2.5 shrink-0 lg:size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <g stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.598 4.159a5.748 5.748 0 0 1 5-2.909 5.748 5.748 0 0 1 5 2.909m-10 5.682a5.748 5.748 0 0 0 5 2.909 5.748 5.748 0 0 0 5-2.909M13.537 7h-4.69m0 0 2-2m-2 2 2 2M1.66 7h4.684m0 0-2-2m2 2-2 2" />
      </g>
    </svg>
  )
}

/** Header LinkedIn icon */
function HdrLinkedInIcon() {
  return (
    <svg className="size-2.5 shrink-0 lg:size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.476.95h3.048c.68 0 1.223 0 1.663.036.45.037.84.114 1.198.296a3.05 3.05 0 0 1 1.333 1.333c.182.358.26.747.296 1.198.036.44.036.983.036 1.663v3.048c0 .68 0 1.224-.036 1.663-.037.45-.114.84-.296 1.198a3.05 3.05 0 0 1-1.333 1.333c-.358.182-.747.26-1.198.296-.44.036-.983.036-1.663.036H5.476c-.68 0-1.223 0-1.663-.036-.45-.037-.84-.114-1.198-.296a3.05 3.05 0 0 1-1.333-1.333c-.182-.358-.26-.747-.296-1.198C.95 9.747.95 9.204.95 8.524V5.476c0-.68 0-1.223.036-1.663.037-.45.114-.84.296-1.198a3.05 3.05 0 0 1 1.333-1.333c.358-.182.747-.26 1.198-.296C4.253.95 4.796.95 5.476.95ZM3.903 2.082c-.383.031-.611.09-.788.18a1.95 1.95 0 0 0-.852.853c-.09.177-.15.405-.18.788-.033.389-.033.888-.033 1.597v3c0 .71 0 1.208.032 1.597.032.383.09.612.18.789.188.366.486.665.853.852.177.09.405.149.788.18.39.032.888.032 1.597.032h3c.71 0 1.208 0 1.597-.032.383-.031.611-.09.788-.18a1.95 1.95 0 0 0 .853-.852c.09-.177.149-.406.18-.789.032-.389.032-.888.032-1.597v-3c0-.71 0-1.208-.032-1.597-.031-.383-.09-.611-.18-.788a1.95 1.95 0 0 0-.853-.853c-.177-.09-.405-.149-.788-.18-.39-.032-.888-.032-1.597-.032h-3c-.71 0-1.208 0-1.597.032Z" fill="#5C5E63" />
      <path fillRule="evenodd" clipRule="evenodd" d="M8.015 6.873a.973.973 0 0 0-.973.973V9.37a.55.55 0 1 1-1.1 0V7.846a2.073 2.073 0 0 1 4.146 0V9.37a.55.55 0 0 1-1.1 0V7.846a.973.973 0 0 0-.973-.973Z" fill="#5C5E63" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.492 5.773a.55.55 0 0 1 .55.55V9.37a.55.55 0 1 1-1.1 0V6.323a.55.55 0 0 1 .55-.55ZM4.462 5.773a.55.55 0 0 1 .55.55V9.37a.55.55 0 1 1-1.1 0V6.323a.55.55 0 0 1 .55-.55ZM4.462 3.912a.55.55 0 0 1 .55.55v.067a.55.55 0 1 1-1.1 0v-.067a.55.55 0 0 1 .55-.55Z" fill="#5C5E63" />
    </svg>
  )
}

/** Generic grey person avatar — used when no real photo is available */
function GenericPersonAvatar() {
  return (
    <svg className="ml-1 size-[11px] shrink-0 lg:size-4" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect width="14" height="14" rx="7" fill="#E7E7E7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.556 12.408v-.037a3.333 3.333 0 0 1 3.271-3.27l.125-.001h2.221a3.333 3.333 0 0 1 3.271 3.308A6.971 6.971 0 0 1 7 14a6.971 6.971 0 0 1-4.444-1.592ZM4.645 5.5a2.444 2.444 0 1 1 4.889 0 2.444 2.444 0 0 1-4.89 0Z" fill="#969696" />
      <rect x=".5" y=".5" width="13" height="13" rx="6.5" stroke="#000" strokeOpacity=".04" />
    </svg>
  )
}

// ─── Shared cell class strings ─────────────────────────────────────────────────

const cellBase =
  'h-full w-full flex items-center truncate border-[#EEEFF1] border-r border-b font-medium text-secondary-foreground gap-x-1 pt-[7px] pb-1.5 text-[10px] leading-[14px] tracking-[-0.2px] lg:gap-x-1.5 lg:pt-[10px] lg:pb-[9px] lg:text-[14px] lg:leading-5 lg:tracking-[-0.28px]'

// ─── Expandable column cell wrapper ──────────────────────────────────────────

function ExpandableCell({ isHeader }: { isHeader?: boolean }) {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className={cn('h-full w-full border-[#EEEFF1] border-r', !isHeader && 'overflow-hidden')}>
        <div className={cn(cellBase, 'border-r-0', 'pl-1.5 lg:pl-2')}>
          <CellContent>{null}</CellContent>
        </div>
      </div>
    </div>
  )
}

// ─── Cell renderer ────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  blue:       'border-[#B8D0FF] text-[#407FF2]',
  green:      'border-[#99E6C8] text-[#148a5e]',
  yellow:     'border-[#FFEBAD] bg-[#FFF3CC] text-[#705500]',
  orange:     'border-[#FEE0C8] bg-[#FEEEE1] text-[#753501]',
  red:        'border-[#FFBCBC] text-[#b31212]',
  grey:       'border-[#E6E7EA] text-[#5C5E63]',
  purple:     'border-[#E8DDFE] bg-[#F5EEFF] text-[#4711BB]',
  teal:       'border-[#C3EDF9] bg-[#DAF4FC] text-[#0A5A70]',
  'blue-soft': 'border-[#D6E5FF] bg-[#E5EEFF] text-[#183C81]',
}

const badgeBase =
  'inline-flex items-center border font-medium tracking-normal text-[8px] leading-[8px] gap-x-[1.5px] rounded-md px-[3px] py-[2.5px] lg:gap-x-1 lg:rounded-lg lg:px-[5px] lg:py-px lg:text-[12px] lg:leading-4'

function renderTableCell(cell: TableCell): React.ReactNode {
  switch (cell.type) {
    case 'email':
      return (
        <div className={cn(badgeBase, 'border-[#B8D0FF] text-[#407FF2]')}>
          {cell.value}
        </div>
      )
    case 'record':
      return (
        <div className={cn(badgeBase, 'border-[#E6E7EA]', cell.logo && 'pl-0.5 lg:pl-[3px]')}>
          {cell.logo && (
            <div className="relative">
              <Image
                alt={cell.label}
                src={cell.logo}
                width={cell.logoW ?? 24}
                height={cell.logoH ?? 24}
                className="size-2 rounded-sm lg:size-3"
              />
              <div className="absolute inset-0 rounded-sm border-[#232529]/10 border-[0.75px]" />
            </div>
          )}
          <div>{cell.label}</div>
        </div>
      )
    case 'text-link':
      return <div className="text-[#5F5D6A] underline">{cell.value}</div>
    case 'status':
      return (
        <div className={cn(badgeBase, STATUS_COLORS[cell.color])}>
          {cell.label}
        </div>
      )
    case 'number':
    case 'text':
      return <div className="text-[#5F5D6A]">{cell.value}</div>
  }
}

// ─── Data model table ─────────────────────────────────────────────────────────

function DataModelTable({ tab, addHovered }: { tab: TabConfig; addHovered: boolean }) {
  return (
    <div className="lg:px-[108px] xl:px-[241px] -ml-6 w-[calc(100%+48px)]">
      <div className="grid w-full grid-cols-[24px_1fr_24px] grid-rows-[10px_1fr_10px] pb-20 lg:grid-rows-[24px_1fr_24px]">

        {/* ── (col1, row1) Top-left corner: right + bottom dashed lines ── */}
        <svg className="relative h-full w-full overflow-visible bottom-[-0.5px] right-[-0.5px]">
          <line x1="100%" y1="0" x2="100%" y2="100%" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
        </svg>

        {/* ── (col2, row1) Top-center: progress bar ── */}
        <div>
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 left-1/2 h-[40px] w-[240px] -translate-x-1/2 lg:w-[520px] [mask-image:linear-gradient(to_right,#0000,#000_80px,#000_calc(100%-80px),#0000)]">
              <div
                className="absolute inset-0 grid overflow-hidden *:col-start-1 *:row-start-1"
                style={{ height: 36, left: 2, top: 2, width: 516 }}
              >
                <div className="h-full w-full overflow-hidden">
                  <div className="h-full w-full bg-[#D2D7DE]" />
                </div>
                <canvas className="relative h-full w-full" width={516} height={36} />
              </div>
            </div>
          </div>
        </div>

        {/* ── (col3, row1) Top-right corner: left + bottom dashed lines ── */}
        <svg className="relative h-full w-full overflow-visible bottom-[-0.5px] left-[-0.5px]">
          <line x1="0" y1="0" x2="0" y2="100%" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
        </svg>

        {/* ── (col1, row2) Left-middle: empty ── */}
        <div />

        {/* ── (col2, row2) Center: main table grid ── */}
        <div
          className={cn(
            'grid border-[#EEEFF1] border-t border-l transition-[grid-template-columns] duration-700 [transition-timing-function:cubic-bezier(0.65,0,0.35,1)] auto-rows-[28px] lg:auto-rows-[40px] pointer-events-none select-none',
            // last col: 0fr collapsed → 1fr expanded when addHovered (only if tableAddColumn is defined)
            tab.tableAddColumn
              ? addHovered
                ? 'grid-cols-[118px_1fr_1fr_1fr] md:grid-cols-[118px_1fr_1fr_1fr_1fr] lg:grid-cols-[173px_1fr_1fr_1fr_1fr]'
                : 'grid-cols-[118px_1fr_1fr_0fr] md:grid-cols-[118px_1fr_1fr_1fr_0fr] lg:grid-cols-[173px_1fr_1fr_1fr_0fr]'
              : 'grid-cols-[118px_1fr_1fr] md:grid-cols-[118px_1fr_1fr_1fr] lg:grid-cols-[173px_1fr_1fr_1fr]',
          )}
        >

          {/* ── Header row ── */}

          {/* Col 1 header: entity icon + label */}
          <div className={cn(cellBase, 'pl-2.5 lg:pl-4')}>
            <RowCheckIcon />
            <CellContent>
              <div className="ml-1 flex items-center gap-x-1 lg:gap-x-1.5">
                {tab.tableEntityIcon}
                <span>{tab.tableEntityLabel}</span>
              </div>
            </CellContent>
          </div>

          {/* Cols 2–4 headers: dynamic per tab */}
          {tab.tableColumns.map((col) => (
            <div
              key={col.headerLabel}
              className={cn(cellBase, 'pl-1.5 lg:pl-2', col.hiddenOnMobile && 'hidden md:flex')}
            >
              <CellContent>
                <div className="flex items-center gap-x-1 lg:gap-x-1.5">
                  {col.headerIcon}
                  <div>{col.headerLabel}</div>
                </div>
              </CellContent>
            </div>
          ))}

          {/* Col 5 header: add column — only rendered when tableAddColumn is set */}
          {tab.tableAddColumn ? (
            <div className={cn(cellBase, 'pl-1.5 lg:pl-2 overflow-hidden', tab.tableAddColumn.hiddenOnMobile && 'hidden md:flex')}>
              <CellContent>
                <div className="flex items-center gap-x-1 lg:gap-x-1.5">
                  {tab.tableAddColumn.headerIcon}
                  <div>{tab.tableAddColumn.headerLabel}</div>
                </div>
              </CellContent>
            </div>
          ) : null}

          {/* ── Data rows ── */}
          {tab.tableRows.map((row) => (
            <Fragment key={row.name}>
              {/* Col 1: Name + avatar (real photo or generic placeholder) */}
              <div className={cn(cellBase, 'pl-2.5 lg:pl-4')}>
                <RowCheckIcon />
                <CellContent>
                  <div className="flex items-center gap-x-[6px]">
                    {row.avatar
                      ? <Image alt={row.name} src={row.avatar} width={row.avatarW ?? 192} height={row.avatarH ?? 192} className="ml-1 size-[11px] rounded-full lg:size-4" />
                      : <GenericPersonAvatar />
                    }
                    <div className="relative flex">
                      {row.name}
                      <div className="absolute bottom-0 -left-[0.5px] h-px w-[calc(100%+1px)] rounded-full bg-[#EEEFF1]" />
                    </div>
                  </div>
                </CellContent>
              </div>

              {/* Cols 2–4: dynamic cells */}
              {row.cells.map((cell, i) => (
                <div
                  key={i}
                  className={cn(
                    cellBase,
                    'pl-1.5 lg:pl-2',
                    tab.tableColumns[i]?.hiddenOnMobile && 'hidden md:flex',
                  )}
                >
                  <CellContent>{renderTableCell(cell)}</CellContent>
                </div>
              ))}

              {/* Col 5: add column cell — only when tableAddColumn is set */}
              {tab.tableAddColumn ? (
                <div className={cn(cellBase, 'pl-1.5 lg:pl-2 overflow-hidden', tab.tableAddColumn.hiddenOnMobile && 'hidden md:flex')}>
                  <CellContent>{row.addCell ? renderTableCell(row.addCell) : null}</CellContent>
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>

        {/* ── (col3, row2) Right-middle: empty ── */}
        <div />

        {/* ── (col1, row3) Bottom-left corner: right + top dashed lines ── */}
        <svg className="relative h-full w-full overflow-visible right-[-0.5px] top-[-0.5px]">
          <line x1="100%" y1="0" x2="100%" y2="100%" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
        </svg>

        {/* ── (col2, row3) Bottom-center: pagination dots (mobile only) ── */}
        <div>
          <div className="lg:hidden">
            <div className="flex justify-center gap-x-1.5 pt-7">
              <button className="h-1.5 w-1.5 rounded-full bg-white-700 transition-[width] [transition-duration:250ms] [transition-timing-function:cubic-bezier(0.45,0,0.55,1)]" />
              <button className="h-1.5 w-1.5 rounded-full bg-white-700 transition-[width] [transition-duration:250ms] [transition-timing-function:cubic-bezier(0.45,0,0.55,1)]" />
              <button className="h-1.5 rounded-full bg-white-700 transition-[width] [transition-duration:250ms] [transition-timing-function:cubic-bezier(0.45,0,0.55,1)] w-10" />
              <button className="h-1.5 w-1.5 rounded-full bg-white-700 transition-[width] [transition-duration:250ms] [transition-timing-function:cubic-bezier(0.45,0,0.55,1)]" />
            </div>
          </div>
        </div>

        {/* ── (col3, row3) Bottom-right corner: left + top dashed lines ── */}
        <svg className="relative h-full w-full overflow-visible left-[-0.5px] top-[-0.5px]">
          <line x1="0" y1="0" x2="0" y2="100%" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#EDEFF3" strokeDasharray="3 4" strokeLinecap="round" />
        </svg>

      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function HomeAdaptiveModelVisual() {
  const [activeTab, setActiveTab] = useState(0)
  const [addHovered, setAddHovered] = useState(false)

  const tab = TABS[activeTab]!

  function handleTabChange(i: number) {
    setActiveTab(i)
    setAddHovered(false)
  }

  return (
    <div className="container mt-10 w-full overflow-hidden">

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="scrollbar-none flex gap-x-1.5 overflow-x-scroll py-[20px] min-[450px]:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="h-full w-[22px] shrink-0" aria-hidden />
        {TABS.map((t, i) => (
          <button
            key={t.id}
            disabled={i === activeTab}
            onClick={() => handleTabChange(i)}
            className={cn(
              'relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap',
              'border transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50',
              'disabled:pointer-events-none h-8 rounded-[10px] px-2.5 text-sm',
              'border-subtle-stroke text-tertiary-foreground',
              'hover:border-subtle-stroke hover:bg-secondary-background',
              'focus-visible:border-subtle-stroke focus-visible:bg-secondary-background',
              'active:border-strong-stroke active:bg-secondary-background',
              i === activeTab && 'bg-surface-subtle pointer-events-none',
            )}
          >
            {t.label}
          </button>
        ))}
        <div className="h-full w-[22px] shrink-0" aria-hidden />
      </div>

      {/* ── Desktop grid (1320px+) ──────────────────────────────────────── */}
      <DesktopCardGrid
        tab={tab}
        addHovered={addHovered}
        onAddEnter={() => setAddHovered(true)}
      />

      {/* ── Mobile / tablet strip (< 1320px) ────────────────────────────── */}
      <MobileCardStrip
        tab={tab}
        addHovered={addHovered}
        onAddEnter={() => setAddHovered(true)}
      />

      {/* ── Data model table ─────────────────────────────────────────────── */}
      <DataModelTable tab={tab} addHovered={addHovered} />

    </div>
  )
}

