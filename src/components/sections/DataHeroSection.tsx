'use client'

/**
 * DataHeroSection
 *
 * Hero for /platform/data — pixel-faithful to attio.com.
 *
 * ER diagram: 118-column CSS grid (--row-height: 11.3px) with 5 entity cards
 * positioned exactly as attio does it, plus SVG connector paths between cards.
 *
 * Only the text labels (entity names, field labels, "more" count) change per
 * active tab. The grid structure, icons, badges, and connectors are invariant.
 */

import { useState, useId, useRef, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  PersonEntityIcon, SellerEntityIcon, BuyerEntityIcon, CompanyEntityIcon,
  TransactionEntityIcon, WorkspaceEntityIcon, UserEntityIcon, DealEntityIcon,
  PartnershipEntityIcon, InvoicesEntityIcon,
  IconMarketplaces, IconPlg, IconPls, IconSales,
  FiText, FiEmail, FiLocation, FiId, FiPipeline, FiCurrency, FiTag, FiCard,
  FiDate, FiPlus, FiGlobe, FiBuilding, FiSeat, FiPhone, FiContact, FiCalendar,
  FiWorld, FiDollar, FiStar, FiUser, FiBank, FiGrid, FiCoin,
} from '@/components/icons/DataHeroIcons'
import { PageHero } from './PageHero'
import {
  DATA_HERO_BADGE, DATA_HERO_HEADING, DATA_HERO_SUBHEADING,
  DATA_HERO_CTA_LABEL, DATA_HERO_CTA_HREF, DATA_HERO_FORM_SOURCE,
  DATA_HERO_TABS, DATA_HERO_DESKTOP_LABELS, DATA_HERO_MOBILE_CARDS,
} from '@/data/data-hero'

const EASE_OUT = [0.2, 0, 0, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// Slot configs — fixed structure, independent of active tab
// ─────────────────────────────────────────────────────────────────────────────

interface SlotConfig {
  entityIcon: React.ReactNode
  badge: 'Standard' | 'Custom'
  fieldIcons: React.ReactNode[]
  /** Tailwind grid placement classes (base < xl) */
  gridClass: string
  /** Tailwind grid overrides for xl */
  xlGridClass: string
}

const SLOTS: SlotConfig[] = [
  {
    // 0 — top-left (Person / Patient)
    entityIcon: <PersonEntityIcon />,
    badge: 'Standard',
    fieldIcons: [<FiText key={0} />, <FiEmail key={1} />, <FiLocation key={2} />],
    gridClass: 'col-[span_27/span_27] row-span-6',
    xlGridClass: 'xl:col-[span_22/span_22]',
  },
  {
    // 1 — top-right (Seller / Provider)
    entityIcon: <SellerEntityIcon />,
    badge: 'Custom',
    fieldIcons: [<FiId key={0} />, <FiPipeline key={1} />, <FiCurrency key={2} />],
    gridClass: 'col-[span_27/span_27] col-start-[92] row-span-6',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[97]',
  },
  {
    // 2 — bottom-left (Buyer / Payer)
    entityIcon: <BuyerEntityIcon />,
    badge: 'Custom',
    fieldIcons: [<FiId key={0} />, <FiTag key={1} />],
    gridClass: 'col-[span_27/span_27] col-start-[11] row-span-5 row-start-[8]',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[21]',
  },
  {
    // 3 — bottom-center (Company / Organization)
    entityIcon: <CompanyEntityIcon />,
    badge: 'Standard',
    fieldIcons: [<FiCard key={0} />, <FiTag key={1} />],
    gridClass: 'col-[span_27/span_27] col-start-[47] row-span-5 row-start-[8]',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[49]',
  },
  {
    // 4 — bottom-right (Transaction / Claim)
    entityIcon: <TransactionEntityIcon />,
    badge: 'Standard',
    fieldIcons: [<FiCard key={0} />, <FiDate key={1} />],
    gridClass: 'col-[span_27/span_27] col-start-[82] row-span-5 row-start-[8]',
    xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[77]',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TAB_SLOT_GRID — per-tab grid position overrides for each of the 5 slots.
// null = keep the default from SLOTS. hidden:true = don't render that card.
//
// Bottom-row centering reference (base grid, 118 cols):
//   3-card group spans col 11→109. Center = col 60.
//   2 cards centered: A at col-start-[29], B at col-start-[65] (span 27, gap 9)
//   xl: A at xl:col-start-[35], B at xl:col-start-[63]  (span 22, gap 6)
// ─────────────────────────────────────────────────────────────────────────────

interface SlotGridOverride {
  gridClass: string
  xlGridClass: string
  hidden?: boolean
}

type FiveGridOverrides = [
  SlotGridOverride | null,
  SlotGridOverride | null,
  SlotGridOverride | null,
  SlotGridOverride | null,
  SlotGridOverride | null,
]

const TAB_SLOT_GRID: Partial<Record<string, FiveGridOverrides>> = {
  // plg: 2 top (unchanged) + 2 bottom centered + slot 4 hidden
  plg: [
    null,
    null,
    { gridClass: 'col-[span_27/span_27] col-start-[29] row-span-5 row-start-[8]', xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[35]' },
    { gridClass: 'col-[span_27/span_27] col-start-[65] row-span-5 row-start-[8]', xlGridClass: 'xl:col-[span_22/span_22] xl:col-start-[63]' },
    { gridClass: '', xlGridClass: '', hidden: true },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab-specific labels — only text changes between tabs
// ─────────────────────────────────────────────────────────────────────────────

// Desktop slot labels live in @/data/data-hero — imported as DATA_HERO_DESKTOP_LABELS

// ─────────────────────────────────────────────────────────────────────────────
// Connector building blocks — named constants for every connector shape.
// Each is a single absolutely-positioned grid item. Combine them freely in
// TAB_CONNECTORS below to create per-tab layouts.
// ─────────────────────────────────────────────────────────────────────────────

/** Person → Buyer: left curved arc (xl viewport only) */
const C_LeftArcXl = (
  <div key="left-arc-xl" className="absolute top-[var(--row-height)] bottom-0 left-0 col-start-[12] col-end-[21] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H107" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 14 17)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Person → Buyer: left elbow (non-xl viewports) */
const C_LeftElbow = (
  <div key="left-elbow" className="absolute top-[var(--row-height)] col-start-[14] col-end-[25] row-start-[6] row-end-[8] block h-[calc(100%+var(--row-height))] w-full xl:hidden">
    <svg className="w-[calc(100%+2px)] -translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 84 49">
      <path d="M1 0L1 4.5C1 15.5457 9.95431 24.5 21 24.5L63 24.5C74.0457 24.5 83 33.4543 83 44.5L83 49" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Center forked connector — top entity splits down to 3 bottom entities */
const C_CenterFork = (
  <div key="center-fork" className="absolute top-[calc(var(--row-height)-3px)] col-start-[60] col-end-[88] row-span-2 row-start-[6] h-[calc(100%+var(--row-height))] w-full">
    <svg className="translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 331 50">
      <path d="M330 49L330 31C330 14.4315 316.569 1 300 0.999999L31 0.999987C14.4315 0.999986 1.00003 14.4314 1.00003 31L1.00003 50" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[2px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    {/* Three-branch endpoint */}
    <svg className="absolute right-0 bottom-0" style={{ transform: 'translate(19px, 3px)' }} width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37 13V13C37 9.27247 37 7.4087 36.391 5.93853C35.5791 3.97831 34.0217 2.42092 32.0615 1.60896C30.5913 1 28.7275 1 25 1L15 1C11.2725 1 9.4087 1 7.93853 1.60896C5.97831 2.42092 4.42091 3.97831 3.60896 5.93853C3 7.4087 3 9.27247 3 13V13" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 22 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 39 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 5 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Seller → Transaction: right curved arc (xl viewport only) */
const C_RightArcXl = (
  <div key="right-arc-xl" className="absolute top-[var(--row-height)] bottom-0 left-0 col-start-[99] col-end-[108] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M106 0V52C106 74.4021 106 85.6031 101.64 94.1596C97.8053 101.686 91.6861 107.805 84.1596 111.64C75.6032 116 64.4021 116 42 116H-5.94008e-07" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    {/* Three-branch start */}
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 39)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 5)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Seller → Transaction: right elbow (non-xl viewports) */
const C_RightElbow = (
  <div key="right-elbow" className="absolute top-[var(--row-height)] col-start-[95] col-end-[106] row-start-[6] row-end-[8] block h-[calc(100%+var(--row-height))] w-full xl:hidden">
    <svg className="w-[calc(100%+2px)] -translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 84 49">
      <path d="M83 0L83 4.5C83 15.5457 74.0457 24.5 63 24.5L21 24.5C9.9543 24.5 0.999996 33.4543 0.999996 44.5L0.999996 49" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-px" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37 13V13C37 9.27247 37 7.4087 36.391 5.93853C35.5791 3.97831 34.0217 2.42092 32.0615 1.60896C30.5913 1 28.7275 1 25 1L15 1C11.2725 1 9.4087 1 7.93853 1.60896C5.97831 2.42092 4.42091 3.97831 3.60896 5.93853C3 7.4087 3 9.27247 3 13V13" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 22 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 39 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 5 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 17 1)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Person → Seller: big arc spanning the full top row */
const C_TopArc = (
  <div key="top-arc" className="absolute top-[calc(var(--row-height)/2)] col-start-[32] col-end-[92] row-span-4 row-start-[4] h-[calc(100%+var(--row-height)*1.2)] w-full xl:col-end-[97]">
    <svg className="-translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 766 115">
      <path d="M0.999995 115L0.999996 96C0.999997 79.4315 14.4315 66 31 66L630 66C646.569 66 660 52.5686 660 36L660 31C660 14.4315 673.431 1 690 1L766 1" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

/** Vertical drop below the grid — decorative tail */
const C_BottomLine = (
  <div key="deal-to-image-s" className="absolute top-0 left-0 col-start-[60] row-start-[13]">
    <svg className="-translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="2" height="80" viewBox="0 0 2 80">
      <path d="M1 0v80" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path></svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(0 1 1 0 17 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToPerson_PLG = (
  <div key="company-to-person-plg" className="absolute top-[calc(2*var(--row-height))] col-start-[23] col-end-[97] row-span-3 row-start-3 h-[calc(100%-(var(--row-height)/2))] w-full xl:top-[calc(var(--row-height)/2)] xl:col-start-23 xl:col-end-97 xl:row-start-4">
    <svg className="-translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 871 67">
      <path d="M0 1L76 1C92.5685 1 106 14.4315 106 31L106 36C106 52.5686 119.431 66 136 66L735 66C751.569 66 765 52.5686 765 36L765 31C765 14.4315 778.431 1 795 1L871 1" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 -translate-x-[3px] -translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle><circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToDeal_PLS = (
  <div key="company-to-deal-pls" className="absolute top-(--row-height) bottom-0 left-0 col-start-[12] col-end-[21] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H107" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g><path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path></g>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle><circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToPerson_PLS = (
  <div key="deal-to-person-pls" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[43] col-end-[49] row-start-10 row-end-11 xl:col-start-43 xl:col-end-49">
    <svg className="translate-y-[0.5px]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 39)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 5)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg><svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_PersonToUser_PLS = (
  <div key="person-to-user-pls" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[71] col-end-[77] row-start-10 row-end-11 xl:col-start-71 xl:col-end-77">
    <svg className="translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="20" r="2" transform="rotate(-180 13 20)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_UserToWorkspace_PLS = (
  <div key="user-to-workspace-pls" className="absolute top-(--row-height) bottom-0 left-0 col-start-[99] col-end-[108] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M106 0V52C106 74.4021 106 85.6031 101.64 94.1596C97.8053 101.686 91.6861 107.805 84.1596 111.64C75.6032 116 64.4021 116 42 116H-5.94008e-07" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 21)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3V3C3 6.72753 3 8.5913 3.60896 10.0615C4.42092 12.0217 5.97831 13.5791 7.93853 14.391C9.4087 15 11.2725 15 15 15L25 15C28.7275 15 30.5913 15 32.0615 14.391C34.0217 13.5791 35.5791 12.0217 36.391 10.0615C37 8.5913 37 6.72753 37 3V3" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 18 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 1 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(5.56363e-08 1 1 -5.56363e-08 35 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToImage_PLS = (
  <div key="deal-to-image-pls" className="absolute col-start-[-95] col-end-[-60] row-start-[13] h-[calc(100%+7*var(--row-height))] w-full xl:col-start-[-88] xl:col-end-[-60]">
    <svg className="h-[calc(100%+3px)] -translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 331 81">
      <path d="M1 0L1 10.5C0.999999 27.0685 14.4315 40.5 31 40.5L300 40.5C316.569 40.5 330 53.9315 330 70.5L330 81" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path>
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_PartnershipToCompany_S = (
  <div key="partnership-to-company-s" className="absolute top-[var(--row-height)] bottom-0 left-0 col-start-[12] col-end-[21] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H107" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px">
      </path>
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g><path d="M3 3C3 6.72753 3 8.5913 3.60896 10.0615C4.42092 12.0217 5.97831 13.5791 7.93853 14.391C9.4087 15 11.2725 15 15 15H25C28.7275 15 30.5913 15 32.0615 14.391C34.0217 13.5791 35.5791 12.0217 36.391 10.0615C37 8.5913 37 6.72753 37 3" stroke="#E4E7EC"></path><path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path>
        <path d="M5 3C5 4.10457 4.10457 5 3 5C1.89543 5 1 4.10457 1 3C1 1.89543 1.89543 1 3 1C4.10457 1 5 1.89543 5 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path>
        <path d="M39 3C39 4.10457 38.1046 5 37 5C35.8954 5 35 4.10457 35 3C35 1.89543 35.8954 1 37 1C38.1046 1 39 1.89543 39 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path></g>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToNull_S = (
  <div key="company-to-null-s" className="absolute top-[calc(var(--row-height)/2)] left-0 col-start-[28] col-end-[44] row-start-[4] row-end-[7] h-[calc(100%-var(--row-height)/2)] w-full xl:col-start-[23] xl:col-end-[39]">
    <svg className="h-[calc(100%+3px)] translate-x-0.5 -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 191 68">
      <path d="M0 1L76 1C92.5685 1 106 14.4315 106 31L106 37C106 53.5685 119.431 67 136 67L191 67" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="@-translate-x-[3px] absolute top-0 left-0 -translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC"></path>
      <circle cx="3" cy="3" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="3" cy="20" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle><circle cx="3" cy="37" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToPerson_S = (
  <div key="company-to-person-s" className="absolute top-[var(--row-height)] left-0 col-start-[32] col-end-[-32] row-start-[6] row-end-[8] w-full">
    <svg className="w-[calc(100%+2px)] -translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 661 50">
      <path d="M660 50L660 49C660 32.1984 660 23.7976 656.73 17.3803C653.854 11.7354 649.265 7.14598 643.62 4.26978C637.202 0.999972 628.802 0.999973 612 0.999973L49 0.999998C32.1984 0.999999 23.7976 0.999999 17.3803 4.2698C11.7354 7.14601 7.14601 11.7354 4.26981 17.3803C1 23.7976 1 32.1984 1 49L1 50" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2 translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37 13V13C37 9.27247 37 7.4087 36.391 5.93853C35.5791 3.97831 34.0217 2.42092 32.0615 1.60896C30.5913 1 28.7275 1 25 1L15 1C11.2725 1 9.4087 1 7.93853 1.60896C5.97831 2.42092 4.42091 3.97831 3.60896 5.93853C3 7.4087 3 9.27247 3 13V13" stroke="#E4E7EC" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 22 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 39 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 5 15)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_NullToInvoices_S = (
  <div key="null-to-invoices-s" className="absolute col-start-[55] col-end-[92] row-span-[4] row-start-[4] w-full xl:col-end-[97]">
    <svg className="-translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="75" viewBox="0 0 429 75">
      <path d="M0.5 75L0.500001 57.7013L0.500002 36.7987L0.500002 31C0.500003 14.4315 13.9315 1.00001 30.5 1.00002L429 1.00002" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_PersonToInvoices_S = (
  <div key="person-to-invoices_S" className="absolute top-(--row-height) bottom-0 left-0 col-start-[99] col-end-[108] row-start-[6] row-end-[11] hidden h-[calc(100%-var(--row-height)*1.5)] w-full xl:block">
    <svg className="h-[calc(100%+1px)] w-[calc(100%+1px)]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 107 117">
      <path d="M106 0V52C106 74.4021 106 85.6031 101.64 94.1596C97.8053 101.686 91.6861 107.805 84.1596 111.64C75.6032 116 64.4021 116 42 116H-5.94008e-07" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g><path d="M22 3C22 4.10457 21.1046 5 20 5C18.8954 5 18 4.10457 18 3C18 1.89543 18.8954 1 20 1C21.1046 1 22 1.89543 22 3Z" fill="white" stroke="#E4E7EC" strokeWidth="2"></path></g>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 21 14)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToPerson_S = (
  <div key="deal-to-person-s" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[71] col-end-[77] row-start-[10] row-end-[11] xl:col-start-[71] xl:col-end-[77]">
    <svg className="translate-y-[0.5px]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 37V37C6.72753 37 8.5913 37 10.0615 36.391C12.0217 35.5791 13.5791 34.0217 14.391 32.0615C15 30.5913 15 28.7275 15 25L15 15C15 11.2725 15 9.4087 14.391 7.93853C13.5791 5.97831 12.0217 4.42092 10.0615 3.60896C8.5913 3 6.72753 3 3 3V3" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 39)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 5)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg><svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToDeal_S = (
  <div key="company-to-deal-s" className="absolute top-[calc(var(--row-height)/2-1.5px)] col-start-[38] col-end-[47] row-start-[10] row-end-[11] xl:col-start-[43] xl:col-end-[49]">
    <svg className="translate-y-[0.5px]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M0 1L70 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(1 -4.37114e-08 -4.37114e-08 -1 1 22)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3V3C9.27247 3 7.4087 3 5.93853 3.60896C3.97831 4.42091 2.42091 5.97831 1.60896 7.93853C0.999999 9.4087 0.999999 11.2725 0.999999 15L0.999998 25C0.999998 28.7275 0.999997 30.5913 1.60896 32.0615C2.42091 34.0217 3.9783 35.5791 5.93853 36.391C7.4087 37 9.27246 37 13 37V37" stroke="#E4E7EC"></path>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 18)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
      <circle cx="2" cy="2" r="2" transform="matrix(-1 -4.37114e-08 -4.37114e-08 1 15 35)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_DealToImage_S = (
  <div key="deal-to-image-s" className="absolute top-0 left-0 col-start-[60] row-start-[13]">
    <svg className="-translate-x-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="2" height="80" viewBox="0 0 2 80">
      <path d="M1 0v80" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path></svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" transform="matrix(0 1 1 0 17 1)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

const C_CompanyToWorkspace_plg = (
  <div key="company-to-workspace-plg" className="absolute top-[var(--row-height)] col-start-[10] col-end-[29] row-span-5 row-start-[6] h-[calc(100%-var(--row-height)*1.5)] w-full xl:col-start-[12] xl:col-end-[35]">
    <svg className="-translate-x-px translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 272 117">
      <path d="M1 0V52C1 74.4021 1 85.6031 5.35974 94.1596C9.19467 101.686 15.3139 107.805 22.8404 111.64C31.3968 116 42.5979 116 65 116H272" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 37V37C9.27247 37 7.4087 37 5.93853 36.391C3.97831 35.5791 2.42092 34.0217 1.60896 32.0615C1 30.5913 1 28.7275 1 25L1 15C1 11.2725 1 9.4087 1.60896 7.93853C2.42092 5.97831 3.97831 4.42092 5.93853 3.60896C7.4087 3 9.27247 3 13 3V3" stroke="#E4E7EC" />
      <circle cx="13" cy="20" r="2" transform="rotate(-180 13 20)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="37" r="2" transform="rotate(-180 13 37)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="3" r="2" transform="rotate(-180 13 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_WorkspaceToUser_plg = (
  <div key="workspace-to-user-plg" className="absolute top-[calc(var(--row-height)/2)] col-start-[56] col-end-[64] row-span-1 row-start-[10] xl:col-start-[57] xl:col-end-[63]">
    <svg className="translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 70 2">
      <path d="M70 1L1.19209e-06 1.00001" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="15" height="38" viewBox="0 0 15 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="19" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 37V37C9.27247 37 7.4087 37 5.93853 36.391C3.97831 35.5791 2.42092 34.0217 1.60896 32.0615C1 30.5913 1 28.7275 1 25L1 15C1 11.2725 1 9.4087 1.60896 7.93853C2.42092 5.97831 3.97831 4.42092 5.93853 3.60896C7.4087 3 9.27247 3 13 3V3" stroke="#E4E7EC" />
      <circle cx="13" cy="20" r="2" transform="rotate(-180 13 20)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="37" r="2" transform="rotate(-180 13 37)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
      <circle cx="13" cy="3" r="2" transform="rotate(-180 13 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_PersonToUser_plg = (
  <div key="person-to-user-plg" className="absolute top-[var(--row-height)] col-start-[91] col-end-[110] row-span-5 row-start-[6] h-[calc(100%-var(--row-height)*1.5)] w-full xl:col-start-[85] xl:col-end-[108]">
    <svg className="translate-x-px translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 272 117">
      <path d="M271 0V52C271 74.4021 271 85.6031 266.64 94.1596C262.805 101.686 256.686 107.805 249.16 111.64C240.603 116 229.402 116 207 116H5.4551e-06" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px" strokeDashoffset="0px" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="20" r="2" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2" />
    </svg>
  </div>
)

const C_UserToImage_plg = (
  <div key="user-to-image-plg" className="absolute col-start-[-60] col-end-[-42] row-start-[13] h-[calc(100%+7*var(--row-height))] w-full xl:col-end-[-46]">
    <svg className="h-[calc(100%+3px)] translate-x-px -translate-y-px" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 167 81">
      <path d="M166 0L166 10.5C166 27.0685 152.569 40.5 136 40.5L31 40.5C14.4315 40.5 0.999994 53.9315 0.999993 70.5L0.999993 81" stroke="#E4E7EC" pathLength="1" strokeDasharray="1px 1px"></path>
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[3px]" width="38" height="15" viewBox="0 0 38 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="3" r="2" transform="rotate(90 19 3)" fill="white" stroke="#E4E7EC" strokeWidth="2"></circle>
    </svg>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// TAB_CONNECTORS — pick which connectors (and in what order) appear per tab.
// Add new C_* blocks above and reference them here to customise each tab.
// ─────────────────────────────────────────────────────────────────────────────

const TAB_CONNECTORS: Record<string, React.ReactNode[]> = {
  marketplaces: [C_LeftArcXl, C_LeftElbow, C_CenterFork, C_RightArcXl, C_RightElbow, C_TopArc, C_BottomLine],
  plg: [C_CompanyToWorkspace_plg, C_WorkspaceToUser_plg, C_CompanyToPerson_PLG, C_PersonToUser_plg, C_UserToImage_plg],
  pls: [C_CompanyToDeal_PLS, C_DealToPerson_PLS, C_PersonToUser_PLS, C_UserToWorkspace_PLS, C_CompanyToPerson_PLG, C_DealToImage_PLS],
  sales: [C_PartnershipToCompany_S, C_CompanyToNull_S, C_CompanyToPerson_S, C_NullToInvoices_S, C_PersonToInvoices_S, C_DealToPerson_S, C_CompanyToDeal_S, C_DealToImage_S],
}


// ─────────────────────────────────────────────────────────────────────────────
// Connector building blocks — named constants for every connector shape.
// Each is a single absolutely-positioned grid item. Combine them freely in
// TAB_CONNECTORS below to create per-tab layouts.
// ─────────────────────────────────────────────────────────────────────────────

const MC_PersonToBuyer_M = (
  <div key="mc-person-to-buyer-m" className="absolute -top-[calc(var(--row-height)/4)] col-start-[10] col-end-[21] row-start-[5] row-end-[6] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+2px)] -translate-x-px -translate-y-[2px] md:w-[calc(100%+3.5px)] md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 97 42" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M96 0L96 7C96 14.732 89.732 21 82 21L15 21C7.26801 21 0.999997 27.268 0.999997 35L0.999997 42" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_SellerToTransaction_M = (
  <div key="mc-seller-to-transaction-m" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-1 row-start-[10] w-full">
    <svg className="-translate-x-px" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 42L1 1.3113e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.421 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_BuyerToSeller_M = (
  <div key="mc-buyer-to-seller" className="absolute -top-[calc(var(--row-height)/5)] col-start-[19] col-end-[23] row-start-[8] row-end-[9] w-full">
    <svg className="absolute" width="100%" height="2" viewBox="0 0 33 2" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0.562012L33 0.562015" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.57901" cy="15.5619" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToTransaction_M = (
  <div key="mc-company-to-transaction" className="absolute -top-[calc(var(--row-height)/5)] col-start-[19] col-end-[23] row-start-[13] row-end-[14] w-full">
    <svg className="absolute" width="100%" height="2" viewBox="0 0 33 2" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0.562012L33 0.562015" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.57901" cy="15.5619" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToPerson_PLG = (
  <div key="mc-company-to-person-plg" className="absolute col-start-[19] col-end-[32] row-span-1 row-start-2 h-[calc(100%+var(--row-height)/3)] w-full">
    <svg className="translate-x-px -translate-y-px md:translate-x-[2px]" height="100%" width="100%" viewBox="0 0 112 34" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M111 34L111 21.0001C111 9.95434 102.046 0.999998 90.9999 0.999998L7.21619e-06 1" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-[3px] -translate-y-1/2" width="13" height="32" viewBox="0 0 13 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.57895 2.5791V2.5791C5.52174 2.5791 6.99313 2.5791 8.15379 3.05986C9.70134 3.70088 10.9309 4.9304 11.5719 6.47794C12.0526 7.6386 12.0526 9.11 12.0526 12.0528L12.0526 19.9475C12.0526 22.8903 12.0526 24.3617 11.5719 25.5224C10.9309 27.0699 9.70134 28.2994 8.15379 28.9404C6.99313 29.4212 5.52174 29.4212 2.57895 29.4212V29.4212" stroke="#E4E7EC" />
      <circle cx="2.57889" cy="15.9998" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57889" cy="2.57895" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57889" cy="29.4212" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 16.579 11.5264)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PersonToUser_PLG = (
  <div key="mc-person-to-user-plg" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-8 row-span-6 row-start-5 w-full">
    <svg className="-translate-x-px translate-y-px" width="2" height="212" viewBox="0 0 2 212" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 210L1.00001 9.53674e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.4211 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[4px]" width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="10.9474" r="1.57895" transform="rotate(-90 16 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToWorkspace_PLG = (
  <div key="mc-company-to-workspace-plg" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-2 row-start-7 w-full">
    <svg className="-translate-x-px -translate-y-[2px]" width="2" height="76" viewBox="0 0 2 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 76L1 9.53674e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.421 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.57895 10.4209V10.4209C2.57895 7.47811 2.57895 6.00672 3.05971 4.84606C3.70072 3.29851 4.93024 2.06899 6.47779 1.42798C7.63845 0.947216 9.10984 0.947216 12.0526 0.947216L19.9474 0.947216C22.8902 0.947216 24.3615 0.947216 25.5222 1.42798C27.0698 2.06899 28.2993 3.29851 28.9403 4.84606C29.421 6.00672 29.421 7.47811 29.421 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="16" cy="10.4211" r="1.57895" transform="rotate(-90 16 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="10.4211" r="1.57895" transform="rotate(-90 2.57895 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.421" cy="10.4211" r="1.57895" transform="rotate(-90 29.421 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_WorkspaceToUser_PLG = (
  <div key="mc-workspace-to-user-plg" className="absolute -top-[calc(var(--row-height)/4)] col-start-[13] col-end-[23] row-span-1 row-start-[10] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="-translate-x-px -translate-y-px md:-translate-x-[2px]" height="100%" width="100%" viewBox="0 0 92 37" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1.00008 37L1.00004 21C1.00002 9.95433 9.95433 0.999995 21 0.999996L92 0.999999" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 11.0528 13.4209)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.57895 10.9473V10.9473C2.57895 8.00448 2.57895 6.53308 3.05971 5.37242C3.70072 3.82488 4.93024 2.59536 6.47779 1.95434C7.63845 1.47358 9.10984 1.47358 12.0526 1.47358L19.9474 1.47358C22.8902 1.47358 24.3615 1.47358 25.5222 1.95434C27.0698 2.59536 28.2993 3.82488 28.9403 5.37242C29.421 6.53308 29.4211 8.00448 29.4211 10.9473V10.9473" stroke="#E4E7EC" />
      <circle cx="16" cy="10.9474" r="1.57895" transform="rotate(-90 16 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="10.9474" r="1.57895" transform="rotate(-90 2.57895 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.421" cy="10.9474" r="1.57895" transform="rotate(-90 29.421 10.9474)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToWorkspace_PLS = (
  <div key="mc-company-to-workspace-pls" className="absolute col-start-10 col-end-[23] row-span-1 row-start-2 h-[calc(100%+var(--row-height)/3)] w-full">
    <svg className="-translate-x-px -translate-y-px md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 112 34" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 34L1 15C1 7.26801 7.26802 0.999997 15 0.999997L112 1" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute top-0 right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_UserToWorkspace_PLS = (
  <div key="mc-user-to-workspace-pls" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-1 row-start-5 w-full">
    <svg className="-translate-x-px" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 42L1 1.3113e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToDeal_PLS = (
  <div key="mc-company-to-deal-pls" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-10 row-span-2 row-start-7 w-full">
    <svg className="-translate-x-px" width="2" height="76" viewBox="0 0 2 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 76L1 9.53674e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_UserToPerson_PLS = (
  <div key="mc-user-to-person-pls" className="absolute -top-[calc(var(--row-height)/3)] col-span-1 col-start-[32] row-span-1 row-start-[10] w-full">
    <svg className="-translate-x-px" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 42L1 1.3113e-06" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(5.56363e-08 1 1 -5.56363e-08 13.421 1)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2 translate-y-[3px]" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_DealToPerson_PLS = (
  <div key="mc-deal-to-person-pls" className="absolute -top-[calc(var(--row-height)/3)] col-start-10 col-end-[23] row-span-1 row-start-[13] h-[calc(100%+var(--row-height)/3)] w-full">
    <svg className="-translate-x-px translate-y-px md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 112 34" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 0L1 19C1 26.732 7.26802 33 15 33L112 33" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-[3px] translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute top-0 -translate-x-1/2 -translate-y-[3px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PartnershipToCompany_S = (
  <div key="mc-partnership-to-company-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-1 col-start-7 row-start-5 row-end-6 h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute -translate-x-px -translate-y-[2px]" width="2" height="43" viewBox="0 0 2 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 43L1 -7.15256e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_InvoiceToPerson_S = (
  <div key="mc-invoice-to-person-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-1 col-start-[35] row-start-5 row-end-6 h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute -translate-x-px -translate-y-[2px]" width="2" height="43" viewBox="0 0 2 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 43L1 -7.15256e-07" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="30" height="13" viewBox="0 0 30 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.0001" cy="10.4211" r="1.57895" transform="rotate(-90 15.0001 10.4211)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PartnershipToPerson_S = (
  <div key="mc-partnership-to-person-s" className="absolute -top-[calc(var(--row-height)/4)] col-start-[13] col-end-[29] row-start-5 row-end-6 h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+3px)] -translate-x-[2px] -translate-y-[2px] md:w-[calc(100%+3.5px)]" width="100%" height="100%" viewBox="0 0 138 43" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 0L1 7.5C1 15.232 7.26802 21.5 15 21.5L123 21.5C130.732 21.5 137 27.768 137 35.5L137 43" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToPerson_S = (
  <div key="mc-company-to-person-s" className="absolute -top-[calc(var(--row-height)/5)] col-start-[19] col-end-[23] row-start-[8] row-end-[9] w-full">
    <svg className="absolute" width="100%" height="2" viewBox="0 0 33 2" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0.562012L33 0.562015" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-[3px] -translate-y-1/2" width="13" height="31" viewBox="0 0 13 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2.57901" cy="15.5619" r="1.57895" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 translate-x-[3px] -translate-y-1/2" width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4738 3.14111V3.14111C7.53103 3.14111 6.05963 3.14111 4.89897 3.62187C3.35143 4.26289 2.12191 5.49241 1.48089 7.03995C1.00013 8.20061 1.00013 9.67201 1.00013 12.6148L1.00013 20.5095C1.00013 23.4523 1.00013 24.9237 1.48089 26.0844C2.12191 27.6319 3.35143 28.8614 4.89897 29.5025C6.05963 29.9832 7.53103 29.9832 10.4738 29.9832V29.9832" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 14.9829)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 1.56201)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-1 4.37114e-08 4.37114e-08 1 12.0527 28.4043)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_CompanyToDeal_S = (
  <div key="mc-company-to-deal-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-8 col-start-[10] row-start-[10] row-end-[11] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+2px)] -translate-x-px -translate-y-[2px] md:w-[calc(100%+3.5px)] md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 70 43" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M1 0L1 7.5C1 15.232 7.26802 21.5 15 21.5L55 21.5C62.732 21.5 69 27.768 69 35.5L69 43" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute -translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute right-0 bottom-0 translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)

const MC_PersonToDeal_S = (
  <div key="mc-person-to-deal-s" className="absolute -top-[calc(var(--row-height)/4)] col-span-8 col-start-[24] row-start-[10] row-end-[11] h-[calc(100%+var(--row-height)/1.5)] w-full">
    <svg className="absolute w-[calc(100%+2px)] -translate-x-px -translate-y-[2px] md:w-[calc(100%+3.5px)] md:-translate-x-[2px]" width="100%" height="100%" viewBox="0 0 70 43" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M69 0L69 7.5C69 15.232 62.732 21.5 55 21.5L15 21.5C7.26801 21.5 0.999997 27.768 0.999997 35.5L0.999997 43" stroke="#E4E7EC" />
    </svg>
    <svg className="absolute right-0 translate-x-1/2 -translate-y-[4px]" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 2.5791V2.5791C29.4211 5.52189 29.4211 6.99328 28.9403 8.15394C28.2993 9.70149 27.0698 10.931 25.5222 11.572C24.3616 12.0528 22.8902 12.0528 19.9474 12.0528L12.0527 12.0528C9.10987 12.0528 7.63848 12.0528 6.47782 11.572C4.93028 10.931 3.70076 9.70149 3.05974 8.15394C2.57898 6.99328 2.57898 5.52189 2.57898 2.5791V2.5791" stroke="#E4E7EC" />
      <circle cx="16" cy="2.57895" r="1.57895" transform="rotate(90 16 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="29.4211" cy="2.57895" r="1.57895" transform="rotate(90 29.4211 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="2.57895" cy="2.57895" r="1.57895" transform="rotate(90 2.57895 2.57895)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
    <svg className="absolute bottom-0 -translate-x-1/2" width="32" height="13" viewBox="0 0 32 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.4211 10.4209V10.4209C29.4211 7.47811 29.4211 6.00672 28.9403 4.84606C28.2993 3.29851 27.0698 2.06899 25.5222 1.42798C24.3616 0.947216 22.8902 0.947216 19.9474 0.947216L12.0527 0.947216C9.10987 0.947216 7.63848 0.947216 6.47782 1.42798C4.93028 2.06899 3.70076 3.29851 3.05974 4.84606C2.57898 6.00672 2.57898 7.47811 2.57898 10.4209V10.4209" stroke="#E4E7EC" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 17.579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 31 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
      <circle cx="1.57895" cy="1.57895" r="1.57895" transform="matrix(-8.74228e-08 -1 -1 8.74228e-08 4.1579 12)" fill="white" stroke="#E4E7EC" strokeWidth="1.57895" />
    </svg>
  </div>
)


// ─────────────────────────────────────────────────────────────────────────────
// MOBILE_TAB_CONNECTORS — add MC_* connector blocks above and reference here.
// Grid: 40 cols × 14 rows, --row-height: 26px, gap-y-2.
// ─────────────────────────────────────────────────────────────────────────────

const MOBILE_TAB_CONNECTORS: Record<string, React.ReactNode[]> = {
  marketplaces: [MC_PersonToBuyer_M, MC_SellerToTransaction_M, MC_BuyerToSeller_M, MC_CompanyToTransaction_M],
  plg:          [MC_CompanyToPerson_PLG, MC_PersonToUser_PLG,MC_CompanyToWorkspace_PLG, MC_WorkspaceToUser_PLG],
  pls:          [MC_CompanyToWorkspace_PLS, MC_UserToWorkspace_PLS, MC_CompanyToDeal_PLS, MC_UserToPerson_PLS, MC_DealToPerson_PLS],
  sales:        [MC_PartnershipToCompany_S, MC_InvoiceToPerson_S, MC_PartnershipToPerson_S, MC_CompanyToPerson_S, MC_CompanyToDeal_S, MC_PersonToDeal_S],
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile ER grid — 40-column grid, one card set per tab (lg:hidden)
// Connectors are intentionally omitted — added separately by the team.
// ─────────────────────────────────────────────────────────────────────────────
// ─── Mobile card full definition ─────────────────────────────────────────────
// Text fields (entityName, badge, fieldLabels, moreCount) come from
// DATA_HERO_MOBILE_CARDS in @/data/data-hero.
// Layout fields (entityIcon, fieldIcons, gridClass) stay here — they control
// which SVG icons are shown and where each card sits in the 40-column grid.

interface MobileCardDef {
  entityIcon: React.ReactNode
  entityName: string
  badge: 'Standard' | 'Custom'
  /** Tailwind grid placement classes for the 40-col mobile grid */
  gridClass: string
  fieldIcons: React.ReactNode[]
  fieldLabels: string[]
  moreCount: number
}

/** Layout-only portion of each mobile card (icons + grid position). */
type MobileCardLayout = {
  entityIcon: React.ReactNode
  fieldIcons: [React.ReactNode, React.ReactNode, React.ReactNode]
  gridClass: string
}

const MOBILE_CARD_LAYOUTS: Record<string, MobileCardLayout[]> = {
  marketplaces: [
    { entityIcon: <PersonEntityIcon size={15} />,      fieldIcons: [<FiText key={0} />,     <FiEmail key={1} />,    <FiLocation key={2} />], gridClass: 'col-[span_18/span_18] col-start-[12] row-span-4'             },
    { entityIcon: <BuyerEntityIcon size={15} />,       fieldIcons: [<FiId key={0} />,        <FiTag key={1} />,      <FiCalendar key={2} />], gridClass: 'col-[span_18/span_18] row-span-4 row-start-6'               },
    { entityIcon: <SellerEntityIcon size={15} />,      fieldIcons: [<FiId key={0} />,        <FiPipeline key={1} />, <FiCurrency key={2} />], gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-6' },
    { entityIcon: <CompanyEntityIcon size={15} />,     fieldIcons: [<FiCard key={0} />,      <FiTag key={1} />,      <FiWorld key={2} />],    gridClass: 'col-[span_18/span_18] row-span-4 row-start-[11]'            },
    { entityIcon: <TransactionEntityIcon size={15} />, fieldIcons: [<FiId key={0} />,        <FiDate key={1} />,     <FiDollar key={2} />],   gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-[11]' },
  ],
  plg: [
    { entityIcon: <PersonEntityIcon size={15} />,    fieldIcons: [<FiId key={0} />,   <FiEmail key={1} />,    <FiEmail key={2} />],    gridClass: 'col-[span_18/span_18] row-span-4'                            },
    { entityIcon: <CompanyEntityIcon size={15} />,   fieldIcons: [<FiTag key={0} />,  <FiStar key={1} />,     <FiUser key={2} />],     gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-3' },
    { entityIcon: <WorkspaceEntityIcon size={15} />, fieldIcons: [<FiBank key={0} />, <FiCalendar key={1} />, <FiBuilding key={2} />], gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-[9]' },
    { entityIcon: <UserEntityIcon size={15} />,      fieldIcons: [<FiCard key={0} />, <FiGrid key={1} />,     <FiCalendar key={2} />], gridClass: 'col-[span_18/span_18] row-span-4 row-start-[11]'             },
  ],
  pls: [
    { entityIcon: <WorkspaceEntityIcon size={15} />, fieldIcons: [<FiBank key={0} />,  <FiCalendar key={1} />, <FiBuilding key={2} />], gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4'              },
    { entityIcon: <CompanyEntityIcon size={15} />,   fieldIcons: [<FiCard key={0} />,  <FiTag key={1} />,      <FiGlobe key={2} />],    gridClass: 'col-[span_18/span_18] row-span-4 row-start-3'                },
    { entityIcon: <UserEntityIcon size={15} />,      fieldIcons: [<FiText key={0} />,  <FiEmail key={1} />,    <FiGlobe key={2} />],    gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-6' },
    { entityIcon: <DealEntityIcon size={15} />,      fieldIcons: [<FiId key={0} />,    <FiPipeline key={1} />, <FiDollar key={2} />],   gridClass: 'col-[span_18/span_18] row-span-4 row-start-[9]'              },
    { entityIcon: <PersonEntityIcon size={15} />,    fieldIcons: [<FiText key={0} />,  <FiEmail key={1} />,    <FiLocation key={2} />], gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-[11]' },
  ],
  sales: [
    { entityIcon: <PartnershipEntityIcon size={15} />, fieldIcons: [<FiId key={0} />,      <FiEmail key={1} />,   <FiLocation key={2} />], gridClass: 'col-[span_18/span_18] row-span-4'                               },
    { entityIcon: <InvoicesEntityIcon size={15} />,    fieldIcons: [<FiBuilding key={0} />, <FiPhone key={1} />,   <FiContact key={2} />],  gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4'               },
    { entityIcon: <CompanyEntityIcon size={15} />,     fieldIcons: [<FiCard key={0} />,     <FiTag key={1} />,     <FiWorld key={2} />],    gridClass: 'col-[span_18/span_18] row-span-4 row-start-6'                  },
    { entityIcon: <PersonEntityIcon size={15} />,      fieldIcons: [<FiText key={0} />,     <FiEmail key={1} />,   <FiLocation key={2} />], gridClass: 'col-[span_18/span_18] col-start-[23] row-span-4 row-start-6'  },
    { entityIcon: <DealEntityIcon size={15} />,        fieldIcons: [<FiId key={0} />,       <FiTag key={1} />,     <FiCoin key={2} />],     gridClass: 'col-[span_18/span_18] col-start-[12] row-span-4 row-start-11' },
  ],
}

/** Merged mobile cards — layout from above + text from @/data/data-hero */
const MOBILE_CARDS: Record<string, MobileCardDef[]> = Object.fromEntries(
  Object.keys(MOBILE_CARD_LAYOUTS).map(tab => [
    tab,
    MOBILE_CARD_LAYOUTS[tab]!.map((layout, i) => ({
      ...layout,
      ...DATA_HERO_MOBILE_CARDS[tab]![i]!,
    })),
  ])
) as Record<string, MobileCardDef[]>

// ─────────────────────────────────────────────────────────────────────────────
// GridConnectors — renders the active tab's connector set
// ─────────────────────────────────────────────────────────────────────────────

function GridConnectors({ connectors }: { connectors: React.ReactNode[] }) {
  return <>{connectors}</>
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab definitions — labels/images come from @/data/data-hero; icons stay here
// ─────────────────────────────────────────────────────────────────────────────

interface TabDef {
  id: string
  label: string
  src: string
  Icon: () => React.ReactElement
}

/** Maps tab id → its SVG icon component (structural — not client-editable). */
const TAB_ICON_MAP: Record<string, () => React.ReactElement> = {
  marketplaces: IconMarketplaces,
  plg:          IconPlg,
  pls:          IconPls,
  sales:        IconSales,
}

const TABS: TabDef[] = DATA_HERO_TABS.map(t => ({ ...t, Icon: TAB_ICON_MAP[t.id]! }))

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

/** Slide variants for the mobile ER grid swipe transition */
const mobileSlideVariants = {
  enter: (dir: 'left' | 'right') => ({ x: dir === 'left' ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: 'left' | 'right') => ({ x: dir === 'left' ? '-100%' : '100%', opacity: 0 }),
}

export function DataHeroSection() {
  const dotPatternId = useId()
  const [activeTab, setActiveTab] = useState<string>(TABS[0]!.id)
  const [swipeDir, setSwipeDir] = useState<'left' | 'right'>('left')
  const touchStartX = useRef(0)
  const tabBarRef = useRef<HTMLUListElement>(null)

  // Auto-scroll active tab button into view when activeTab changes
  useEffect(() => {
    const ul = tabBarRef.current
    if (!ul) return
    const btn = ul.querySelector<HTMLElement>(`[data-tab="${activeTab}"]`)
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [activeTab])

  const labels = DATA_HERO_DESKTOP_LABELS[activeTab] ?? DATA_HERO_DESKTOP_LABELS['marketplaces']!
  const connectors = TAB_CONNECTORS[activeTab] ?? TAB_CONNECTORS['marketplaces']!
  const slotGridOverrides = TAB_SLOT_GRID[activeTab] ?? null

  /** Tab change with explicit direction (for tab-bar clicks) */
  function changeTab(id: string) {
    const currentIdx = TABS.findIndex(t => t.id === activeTab)
    const nextIdx = TABS.findIndex(t => t.id === id)
    setSwipeDir(nextIdx > currentIdx ? 'left' : 'right')
    setActiveTab(id)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]!.clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const delta = e.changedTouches[0]!.clientX - touchStartX.current
    if (Math.abs(delta) < 50) return
    const currentIdx = TABS.findIndex(t => t.id === activeTab)
    if (delta < 0 && currentIdx < TABS.length - 1) {
      setSwipeDir('left')
      setActiveTab(TABS[currentIdx + 1]!.id)
    } else if (delta > 0 && currentIdx > 0) {
      setSwipeDir('right')
      setActiveTab(TABS[currentIdx - 1]!.id)
    }
  }

  return (
    <section className="relative bg-primary-background">

      {/* ── 1. Dotted background ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <svg className="h-full w-full">
          <defs>
            <pattern id={dotPatternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.75" fill="#d4d8de" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${dotPatternId})`} />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-background via-transparent to-primary-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-background via-transparent to-primary-background" />
      </div>

      {/* ── 2. PageHero ── */}
      <div className="relative z-20">
        <PageHero
          badge={DATA_HERO_BADGE}
          heading={DATA_HERO_HEADING}
          subheading={DATA_HERO_SUBHEADING}
          primaryCta={{ label: DATA_HERO_CTA_LABEL, href: DATA_HERO_CTA_HREF }}
          showSales
          mobileFormSource={DATA_HERO_FORM_SOURCE}
          showMobileSales
          paddingBottom="pb-10 lg:pb-14"
        />
      </div>

      {/* ── 3. ER diagram (attio 118-column CSS grid) — desktop only ── */}
      <div className="relative z-10 overflow-x-none -mt-[120px] max-lg:hidden">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/*
            CSS custom property --row-height drives both the grid row sizing and
            the connector height calculations (h-[calc(100%-var(--row-height)*1.5)] etc.)
          */}
          <div
            className="[--row-height:11.3px]"
            style={{ '--row-height': '11.3px' } as React.CSSProperties}
          >
            <div className="relative grid grid-cols-[repeat(118,1fr)] grid-rows-[repeat(12,var(--row-height))] gap-y-[19px]">

              {/* Connector paths — absolutely positioned inside the grid */}
              <GridConnectors connectors={connectors} />

              {/* Entity cards */}
              {SLOTS.map((slot, i) => {
                const override = slotGridOverrides?.[i] ?? null
                if (override?.hidden) return null
                const gridClass = override?.gridClass ?? slot.gridClass
                const xlGridClass = override?.xlGridClass ?? slot.xlGridClass
                return (
                  <div
                    key={i}
                    className={cn(
                      'relative flex flex-col rounded-[9.5px] border border-weak-stroke bg-primary-background p-[7px] shadow-xs',
                      'lg:rounded-xl lg:p-[11px]',
                      gridClass,
                      xlGridClass,
                    )}
                  >
                    {/* Card header: icon + entity name + badge */}
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-[7px] lg:pb-3">
                      <div className="flex items-center gap-x-[4.5px] font-semibold text-[10.9px] leading-[15.5px] -tracking-[0.22px] text-fg-primary lg:gap-x-1.5 lg:text-sm">
                        {slot.entityIcon}
                        <motion.span
                          key={activeTab + '-name-' + i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                        >
                          {labels[i]!.name}
                        </motion.span>
                      </div>
                      {slot.badge === 'Standard' ? (
                        <div className="rounded-[6.5px] border border-subtle-stroke bg-surface-subtle px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-accent-foreground lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Standard
                        </div>
                      ) : (
                        <div className="rounded-[6.5px] border border-[#D6E5FF] bg-[#E5EEFF] px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-[#183C81] lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Custom
                        </div>
                      )}
                    </div>

                    {/* Field rows */}
                    <ul>
                      {slot.fieldIcons.map((icon, fi) => (
                        <li
                          key={fi}
                          className="flex w-full items-center gap-x-[4.5px] border-b border-weak-stroke px-[9.5px] pt-[4.5px] pb-[3.5px] text-[9.5px] text-fg-tertiary max-lg:leading-[12.5px] lg:gap-x-1.5 lg:px-3 lg:pt-1.5 lg:pb-[5px] lg:text-xs"
                        >
                          {icon}
                          <motion.span
                            key={activeTab + '-field-' + i + '-' + fi}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, ease: EASE_OUT, delay: fi * 0.03 }}
                            className="truncate"
                          >
                            {labels[i]!.fieldLabels[fi]}
                          </motion.span>
                        </li>
                      ))}
                    </ul>

                    {/* More attributes footer */}
                    <div className="flex w-full items-center gap-x-1.5 px-[9.5px] pt-[4.5px] font-medium text-[8.5px] leading-[12.5px] -tracking-[0.22px] text-fg-caption lg:gap-x-2 lg:px-3 lg:pt-1.5 lg:text-[11px] lg:leading-4">
                      <FiPlus />
                      <motion.span
                        key={activeTab + '-more-' + i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                        className="truncate"
                      >
                        {labels[i]!.moreCount} More Attributes
                      </motion.span>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </div>

      {/* ── 3b. Mobile: tab bar + swipeable ER grid (hidden above lg) ── */}
      <div className="relative z-10 mt-6 lg:hidden">

        {/* Tab bar */}
        <ul ref={tabBarRef} className="scrollbar-none flex w-full justify-start overflow-x-auto overflow-y-hidden sm:justify-center">
          <div className="flex justify-start py-3 sm:justify-center">
            {TABS.map((tab) => (
              <li
                key={tab.id}
                className="px-1 py-1 first:pl-4 last:pr-4"
                style={{ maxWidth: 'fit-content', minWidth: 'fit-content' }}
              >
                <button
                  data-tab={tab.id}
                  type="button"
                  onClick={() => changeTab(tab.id)}
                  className={cn(
                    'flex shrink-0 cursor-pointer items-center gap-x-1 whitespace-nowrap rounded-[10px] border border-subtle-stroke py-[9px] pl-[9px] pr-[11px] text-sm text-tertiary-foreground',
                    'transition-[background-color,box-shadow] duration-200 ease-out',
                    'hover:bg-secondary-background',
                    'focus-visible:outline-none focus-visible:ring-3 focus-visible:active:ring-2',
                    activeTab === tab.id ? 'bg-surface-subtle' : 'bg-primary-background',
                  )}
                >
                  <tab.Icon />
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </div>
        </ul>

        {/* Swipeable ER grid */}
        <div
          className="mt-4 overflow-hidden flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={swipeDir}>
            <motion.div
              key={activeTab}
              custom={swipeDir}
              variants={mobileSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="[--row-height:26px] w-full"
              style={{ '--row-height': '26px', 'maxWidth': '400px' } as React.CSSProperties}
            >
              <div className="relative grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(14,var(--row-height))] gap-y-2 px-4 sm:px-0">
                <GridConnectors connectors={MOBILE_TAB_CONNECTORS[activeTab] ?? []} />
                {(MOBILE_CARDS[activeTab] ?? MOBILE_CARDS['marketplaces']!).map((card, i) => (
                  <div
                    key={i}
                    className={cn(
                      'relative flex flex-col rounded-[9.5px] border border-weak-stroke bg-primary-background p-[7px] shadow-xs lg:rounded-xl lg:p-[11px]',
                      card.gridClass,
                    )}
                  >
                    {/* Card header: icon + entity name + badge */}
                    <div className="flex items-center justify-between border-b border-subtle-stroke pb-[7px] lg:pb-3">
                      <div className="flex items-center gap-x-[4.5px] font-semibold text-[10.9px] leading-[15.5px] -tracking-[0.22px] text-fg-primary lg:gap-x-1.5 lg:text-sm">
                        <span className="shrink-0 basis-[15.5px] lg:basis-auto">{card.entityIcon}</span>
                        <span>{card.entityName}</span>
                      </div>
                      {card.badge === 'Standard' ? (
                        <div className="rounded-[6.5px] border border-subtle-stroke bg-surface-subtle px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-accent-foreground lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Standard
                        </div>
                      ) : (
                        <div className="rounded-[6.5px] border border-[#D6E5FF] bg-[#E5EEFF] px-[3.5px] py-[0.5px] text-[9.5px] leading-[12.5px] text-[#183C81] lg:rounded-lg lg:px-[5px] lg:py-px lg:text-xs">
                          Custom
                        </div>
                      )}
                    </div>

                    {/* Field rows */}
                    <ul>
                      {card.fieldIcons.map((icon, fi) => (
                        <li
                          key={fi}
                          className="flex w-full items-center gap-x-[4.5px] border-b border-weak-stroke px-[9.5px] pt-[4.5px] pb-[3.5px] text-[9.5px] text-fg-tertiary max-lg:leading-[12.5px] lg:gap-x-1.5 lg:px-3 lg:pt-1.5 lg:pb-[5px] lg:text-xs"
                        >
                          <span className="shrink-0 basis-[11px] lg:basis-auto">{icon}</span>
                          <span className="truncate">{card.fieldLabels[fi]}</span>
                        </li>
                      ))}
                    </ul>

                    {/* More attributes footer */}
                    <div className="flex w-full items-center gap-x-1.5 px-[9.5px] pt-[4.5px] font-medium text-[8.5px] leading-[12.5px] -tracking-[0.22px] text-fg-caption lg:gap-x-2 lg:px-3 lg:pt-1.5 lg:text-[11px] lg:leading-4">
                      <FiPlus />
                      <span className="truncate">{card.moreCount} More Attributes</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="mt-6 flex justify-center gap-x-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={cn(
                'h-2 w-2 rounded-full transition-colors duration-200',
                activeTab === tab.id ? 'bg-slate-400' : 'bg-slate-200',
              )}
              aria-label={tab.label}
            />
          ))}
        </div>

      </div>

      {/* ── 5. Tab switcher + screenshot (desktop only, lg+) ── */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 pt-20 sm:px-6 lg:px-8 max-lg:hidden">

        {/* Screenshot frame */}
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            {TABS.map((tab) =>
              activeTab === tab.id ? (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="rounded-[20px] border border-white/50 bg-[linear-gradient(199deg,#EDEFF3_11.23%,#E4E7EC_87.61%)] p-[9px] shadow-[0px_10px_30px_-4px_rgba(28,40,64,0.10),0px_8px_8px_-8px_rgba(28,40,64,0.10),0px_4px_4px_-6px_rgba(28,40,64,0.14),0px_0px_0px_1px_#EDEFF3]"
                >
                  <div className="overflow-hidden rounded-[11px] shadow-[0px_2px_6px_0px_rgba(28,40,64,0.04)]">
                    <Image
                      src={tab.src}
                      alt={tab.label}
                      width={4536}
                      height={2252}
                      className="w-full rounded-[inherit] bg-primary-background"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority={tab.id === TABS[0]!.id}
                    />
                  </div>
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </div>

        {/* Tab bar — sticky to viewport bottom while hero is in view */}
        <ul className="sticky bottom-5 mt-[52px] flex gap-x-2 rounded-[15px] bg-primary-background p-2.5 shadow-xl xl:mt-[37px]">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => changeTab(tab.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-x-1 rounded-[10px] border border-weak-stroke py-[5px] pl-[9px] pr-[11px] text-sm text-muted-foreground',
                  'transition-[background-color,box-shadow] duration-200 ease-out',
                  'hover:bg-secondary-background',
                  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:active:ring-2',
                  activeTab === tab.id && 'bg-secondary-background',
                )}
              >
                <tab.Icon />
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>

      </div>

      {/* Bottom spacer */}
      <div
        aria-hidden="true"
        className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-[7.5rem] max-lg:h-[6.25rem]"
      >
        <div className="col-[2/-2] flex justify-between" />
      </div>

    </section>
  )
}
