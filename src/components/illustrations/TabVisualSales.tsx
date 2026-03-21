'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { TAB_VISUAL_SALES } from '@/data/ask-tabs'

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD_SHADOW =
  '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 2px 4px rgba(0,0,0,0.05), 0px 1px 2px rgba(0,0,0,0.04)'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

// ─── Sub-components ───────────────────────────────────────────────────────────

function BlurIn({ visible, children }: { visible: boolean; children: ReactNode }) {
  return (
    <div
      style={{
        opacity:    visible ? 1 : 0,
        filter:     visible ? 'blur(0px)' : 'blur(6px)',
        transition: 'opacity 0.25s ease, filter 0.25s ease',
      }}
    >
      {children}
    </div>
  )
}

// Checkmark icon — inside Accept pill
function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="size-3 text-fg-primary">
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M11.2649 3.07601C11.4991 3.22236 11.5703 3.53084 11.4239 3.76501L8.27903 8.79686L8.26603 8.81766C7.96584 9.29798 7.72247 9.68737 7.50209 9.9779C7.27756 10.2739 7.03718 10.5228 6.72175 10.6676C6.24572 10.8861 5.70298 10.9091 5.21014 10.7318C4.88356 10.6142 4.62295 10.3867 4.37412 10.1108C4.1299 9.83997 3.85439 9.47262 3.51455 9.01949L3.49983 8.99986L2.59994 7.80001C2.43425 7.57909 2.47902 7.26569 2.69994 7.10001C2.92085 6.93432 3.23425 6.97909 3.39994 7.20001L4.29983 8.39986C4.65789 8.87728 4.90647 9.2079 5.11672 9.44102C5.32588 9.67294 5.45274 9.75629 5.54875 9.79084C5.79517 9.87952 6.06655 9.868 6.30456 9.75874C6.3973 9.71616 6.51663 9.62236 6.70538 9.37354C6.8951 9.12343 7.11474 8.77292 7.43103 8.26686L10.5759 3.23501C10.7223 3.00084 11.0308 2.92965 11.2649 3.07601Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Cube icon — section header for deal/company record
function IconCube() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="text-muted-foreground">
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M1.807 2.575a.793.793 0 0 0-.39.69l.014 2.517c.002.284.154.546.398.685l2.134 1.218a.775.775 0 0 0 .777-.004l2.12-1.244a.793.793 0 0 0 .39-.69l-.014-2.516a.793.793 0 0 0-.398-.685L4.704 1.328a.775.775 0 0 0-.777.004L1.807 2.575Zm2.655-.62.013 2.177c0 .187.1.359.26.453l1.866 1.096a.208.208 0 0 0 .314-.183l-.013-2.177a.528.528 0 0 0-.26-.453L4.777 1.772a.208.208 0 0 0-.314.183Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Small Accept pill
function AcceptPill() {
  return (
    <div
      className="flex h-5 min-w-5 items-center gap-[3px] rounded-md bg-primary-background pl-1 pr-1.5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <IconCheck />
      <span className="font-medium text-xs text-fg-primary">{TAB_VISUAL_SALES.acceptLabel}</span>
    </div>
  )
}

// Update card — label in header, accept pill, content row
function UpdateCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl bg-primary-background" style={{ boxShadow: CARD_SHADOW }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 px-3 pb-0.5 pt-2.5">
          <span className="text-xs text-accent-foreground">{label}</span>
        </div>
        <div className="flex items-center px-2 pt-2">
          <AcceptPill />
        </div>
      </div>
      <div className="px-3 pb-1 pt-0.5">
        <div className="flex items-center gap-2 rounded-lg py-1">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TabVisualSales(): ReactNode {
  const [showBubble,   setShowBubble]   = useState(false)
  const [showSec1,     setShowSec1]     = useState(false)
  const [showCard1,    setShowCard1]    = useState(false)
  const [showCard2,    setShowCard2]    = useState(false)
  const [showSec2,     setShowSec2]     = useState(false)
  const [showCard3,    setShowCard3]    = useState(false)
  const [showSec3,     setShowSec3]     = useState(false)
  const [showCard4,    setShowCard4]    = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      await sleep(80);  if (cancelled) return; setShowBubble(true)
      await sleep(100); if (cancelled) return; setShowSec1(true)
      await sleep(80);  if (cancelled) return; setShowCard1(true)
      await sleep(80);  if (cancelled) return; setShowCard2(true)
      await sleep(80);  if (cancelled) return; setShowSec2(true)
      await sleep(80);  if (cancelled) return; setShowCard3(true)
      await sleep(80);  if (cancelled) return; setShowSec3(true)
      await sleep(80);  if (cancelled) return; setShowCard4(true)
    }

    void run()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="flex size-full items-center justify-center p-6">
      <div className="relative w-full max-w-sm">

        {/* ── User bubble ─────────────────────────────────────────────────── */}
        <BlurIn visible={showBubble}>
          <div className="mb-4 flex justify-end">
            <div className="rounded-xl bg-surface px-3.5 py-2">
              <span className="max-w-[17em] text-pretty text-sm text-fg-primary">
                {TAB_VISUAL_SALES.bubble}
              </span>
            </div>
          </div>
        </BlurIn>

        {/* ── Section 1: Deal — Basepoint // Greenleaf ────────────────────── */}
        <div className="flex flex-col">
          <BlurIn visible={showSec1}>
            <div className="flex h-[22px] items-center px-[3px]">
              <div className="flex items-center gap-[5px]">
                <div className="flex size-4 items-center justify-center rounded-[5px] border border-border bg-muted/50">
                  <IconCube />
                </div>
                <span className="font-medium text-sm text-fg-primary underline decoration-border">
                  {TAB_VISUAL_SALES.dealName}
                </span>
              </div>
            </div>
          </BlurIn>

          <div className="mt-2 flex flex-col gap-2">
            <BlurIn visible={showCard1}>
              <UpdateCard label={TAB_VISUAL_SALES.card1Label}>
                <div className="size-1.5 shrink-0 rounded-full bg-yellow-500" />
                <span className="font-medium text-sm text-fg-primary">{TAB_VISUAL_SALES.card1Value}</span>
              </UpdateCard>
            </BlurIn>
            <BlurIn visible={showCard2}>
              <UpdateCard label={TAB_VISUAL_SALES.card2Label}>
                <span className="truncate font-medium text-sm text-fg-primary">
                  {TAB_VISUAL_SALES.card2Value}
                </span>
              </UpdateCard>
            </BlurIn>
          </div>
        </div>

        {/* ── Section 2: Person — Drew Houston ────────────────────────────── */}
        {/* Image: public/avatars/ask/ask-tab-sales/person.avif */}
        <div className="mt-4 flex flex-col">
          <BlurIn visible={showSec2}>
            <div className="flex h-[22px] items-center px-[3px]">
              <div className="flex items-center gap-[5px]">
                <div className="relative size-[18px] overflow-hidden rounded-full border border-border">
                  <Image
                    src="/avatars/ask/ask-tab-sales/person.avif"
                    alt={TAB_VISUAL_SALES.personAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-sm text-fg-primary underline decoration-border">
                  {TAB_VISUAL_SALES.personName}
                </span>
              </div>
            </div>
          </BlurIn>

          <div className="mt-2">
            <BlurIn visible={showCard3}>
              <UpdateCard label={TAB_VISUAL_SALES.card3Label}>
                <span className="font-medium text-sm text-fg-primary">{TAB_VISUAL_SALES.card3Value}</span>
              </UpdateCard>
            </BlurIn>
          </div>
        </div>

        {/* ── Section 3: Company — Greenleaf ──────────────────────────────── */}
        {/* Image: public/avatars/ask/ask-tab-sales/company.avif */}
        <div className="mt-4 flex flex-col">
          <BlurIn visible={showSec3}>
            <div className="flex h-[22px] items-center px-[3px]">
              <div className="flex items-center gap-[5px]">
                <div className="relative size-4 overflow-hidden rounded-[5px] border border-border">
                  <Image
                    src="/avatars/ask/ask-tab-sales/company.avif"
                    alt={TAB_VISUAL_SALES.companyAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-sm text-fg-primary underline decoration-border">
                  {TAB_VISUAL_SALES.companyName}
                </span>
              </div>
            </div>
          </BlurIn>

          <div className="mt-2">
            <BlurIn visible={showCard4}>
              <UpdateCard label={TAB_VISUAL_SALES.card4Label}>
                <span className="font-medium text-sm text-fg-primary">{TAB_VISUAL_SALES.card4Value}</span>
              </UpdateCard>
            </BlurIn>
          </div>
        </div>

      </div>
    </div>
  )
}
