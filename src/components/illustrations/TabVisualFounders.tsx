'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { TAB_VISUAL_FOUNDERS } from '@/data/ask-tabs'

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

// Video camera icon — blue tinted
function IconVideo() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5 text-blue-600">
      <path
        d="M7 1.5C7.44539 1.5 7.72673 1.49862 7.96973 1.53711C9.25304 1.74056 10.2594 2.74697 10.4629 4.03027C10.4714 4.0841 10.4774 4.1403 10.4824 4.19922L11.1553 3.86328C11.4148 3.73349 11.6403 3.62024 11.8281 3.54688C12.0153 3.47378 12.2363 3.40997 12.4756 3.44531C12.8019 3.49357 13.094 3.67411 13.2832 3.94434C13.4218 4.14253 13.4641 4.36928 13.4824 4.56934C13.5008 4.77004 13.5 5.02245 13.5 5.3125V8.6875C13.5 8.9776 13.5008 9.22994 13.4824 9.43066C13.4641 9.63066 13.4217 9.85653 13.2832 10.0547C13.0941 10.3251 12.8021 10.5064 12.4756 10.5547C12.2363 10.59 12.0153 10.5262 11.8281 10.4531C11.6404 10.3798 11.4148 10.2665 11.1553 10.1367L10.4824 9.7998C10.4774 9.85908 10.4715 9.91561 10.4629 9.96973C10.2594 11.253 9.25305 12.2594 7.96973 12.4629C7.72673 12.5014 7.4454 12.5 7 12.5H5C4.30822 12.5 3.75934 12.5 3.31738 12.4639C2.86958 12.4273 2.48732 12.351 2.1377 12.1729C1.57348 11.8853 1.11472 11.4265 0.827148 10.8623C0.649016 10.5127 0.572719 10.1304 0.536133 9.68262C0.500031 9.24067 0.5 8.69177 0.5 8V6C0.5 5.30823 0.500028 4.75933 0.536133 4.31738C0.572721 3.8696 0.649011 3.48731 0.827148 3.1377C1.11472 2.57348 1.57348 2.11472 2.1377 1.82715C2.48732 1.64901 2.86959 1.57272 3.31738 1.53613C3.75934 1.50003 4.30822 1.5 5 1.5H7Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Play triangle icon — reused in header "Play all" and per-row play button
function IconPlay({ className = 'size-3 text-fg-primary' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M4.15692 2.9802C3.86361 2.81399 3.5 3.02587 3.5 3.36301V8.63681C3.5 8.97395 3.86361 9.18584 4.15693 9.01962L8.81028 6.38272C9.10771 6.21418 9.10771 5.78565 8.81028 5.6171L4.15692 2.9802ZM2.5 3.36301C2.5 2.25964 3.68998 1.5662 4.64994 2.11018L9.30329 4.74708C10.2767 5.29868 10.2767 6.70114 9.30329 7.25274L4.64994 9.88964C3.68998 10.4336 2.5 9.74018 2.5 8.63681V3.36301Z"
        fill="currentColor"
      />
    </svg>
  )
}

// IconRedirect — for suggested action
function IconRedirect() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5 text-muted-foreground">
      <path
        d="M2.5 2.5C2.22386 2.5 2 2.72386 2 3V6.5C2 7.88071 3.11929 9 4.5 9H9.29297L7.64648 10.6465L7.58203 10.7246C7.45387 10.9187 7.47562 11.1827 7.64648 11.3535C7.81735 11.5244 8.08131 11.5461 8.27539 11.418L8.35352 11.3535L10.8535 8.85352C10.9473 8.75975 11 8.63261 11 8.5C11 8.40056 10.9704 8.30419 10.916 8.22266L10.8535 8.14648L8.35352 5.64648C8.15825 5.45122 7.84175 5.45122 7.64648 5.64648C7.45122 5.84175 7.45122 6.15825 7.64648 6.35352L9.29297 8H4.5C3.67157 8 3 7.32843 3 6.5V3C3 2.72391 2.77607 2.50009 2.5 2.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Stacked mini avatar
function MiniAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-[18px] -mr-1.5 shrink-0 overflow-hidden rounded-full border-2 border-primary-background">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  )
}

// Feature row: name + avatar stack + play button + progress bar
function FeatureRow({
  name,
  avatars,
  barLeft,
  barWidth,
}: {
  name:     string
  avatars:  string[]
  barLeft:  number   // 0–100
  barWidth: number   // 0–100
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label + avatars + play */}
      <div className="flex h-5 items-center justify-between">
        <span className="truncate font-medium text-xs text-fg-primary underline decoration-border">
          {name}
        </span>
        <div className="flex items-center gap-1.5">
          {/* Stacked avatars */}
          <div className="flex items-center pr-1.5">
            {avatars.map((src, i) => (
              <MiniAvatar key={i} src={src} alt="" />
            ))}
          </div>
          {/* Per-row play button */}
          <div
            className="flex size-5 shrink-0 items-center justify-center rounded-md bg-primary-background text-fg-primary"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <IconPlay />
          </div>
        </div>
      </div>
      {/* Progress bar */}
      <div className="relative h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute h-full rounded-full"
          style={{
            left:             `${barLeft}%`,
            width:            `${barWidth}%`,
            backgroundColor: '#c3c7cf',   /* white-700 — attio default-stroke */
          }}
        />
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

// Avatars reused from ask-tab-success (same as attio's avatar-1/2/3)
const AV1 = '/avatars/ask/ask-tab-success/avatar-1.avif'
const AV2 = '/avatars/ask/ask-tab-success/avatar-2.avif'
const AV3 = '/avatars/ask/ask-tab-success/avatar-3.avif'

export function TabVisualFounders(): ReactNode {
  const [showBubble,     setShowBubble]     = useState(false)
  const [showResponse,   setShowResponse]   = useState(false)
  const [showCard,       setShowCard]       = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      await sleep(80);  if (cancelled) return; setShowBubble(true)
      await sleep(120); if (cancelled) return; setShowResponse(true)
      await sleep(110); if (cancelled) return; setShowCard(true)
      await sleep(90);  if (cancelled) return; setShowSuggestion(true)
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
                {TAB_VISUAL_FOUNDERS.bubble}
              </span>
            </div>
          </div>
        </BlurIn>

        {/* ── Response text ───────────────────────────────────────────────── */}
        <BlurIn visible={showResponse}>
          <div className="mb-4 px-0.5">
            <p className="font-medium text-sm leading-5 text-fg-primary">
              {TAB_VISUAL_FOUNDERS.responseText}
            </p>
          </div>
        </BlurIn>

        {/* ── Customer feedback card ───────────────────────────────────────── */}
        <BlurIn visible={showCard}>
          <div className="mb-6 flex flex-col rounded-xl bg-primary-background" style={{ boxShadow: CARD_SHADOW }}>

            {/* Card header */}
            <div className="flex items-center justify-between py-2 pl-2 pr-2.5">
              <div className="flex items-center gap-1.5">
                {/* Blue video icon */}
                <div className="flex size-5 items-center justify-center rounded-md border border-blue-200 bg-blue-100">
                  <IconVideo />
                </div>
                <span className="font-medium text-sm text-fg-primary underline decoration-border">
                  {TAB_VISUAL_FOUNDERS.cardTitle}
                </span>
              </div>
              {/* "Play all" pill */}
              <div
                className="flex h-5 items-center gap-[3px] rounded-md bg-primary-background px-1 text-xs text-fg-primary"
                style={{ boxShadow: CARD_SHADOW }}
              >
                <IconPlay className="size-3 text-fg-primary" />
                <span>{TAB_VISUAL_FOUNDERS.playAll}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Feature rows */}
            <div className="flex flex-col gap-3 px-3 pb-3 pt-2">
              <FeatureRow
                name={TAB_VISUAL_FOUNDERS.feature1}
                avatars={[AV1, AV2]}
                barLeft={25}
                barWidth={25}
              />
              <FeatureRow
                name={TAB_VISUAL_FOUNDERS.feature2}
                avatars={[AV1, AV2, AV3]}
                barLeft={0}
                barWidth={50}
              />
              <FeatureRow
                name={TAB_VISUAL_FOUNDERS.feature3}
                avatars={[AV2]}
                barLeft={0}
                barWidth={38}
              />
            </div>
          </div>
        </BlurIn>

        {/* ── Suggested action ────────────────────────────────────────────── */}
        <BlurIn visible={showSuggestion}>
          <div className="flex flex-col gap-1.5">
            <span className="font-medium text-xs text-accent-foreground">{TAB_VISUAL_FOUNDERS.suggestionLabel}</span>
            <div className="flex items-center gap-0.5 rounded-lg">
              <div className="flex size-8 items-center justify-center">
                <IconRedirect />
              </div>
              <span className="font-medium text-sm text-fg-primary">
                {TAB_VISUAL_FOUNDERS.suggestionText}
              </span>
            </div>
          </div>
        </BlurIn>

      </div>
    </div>
  )
}
