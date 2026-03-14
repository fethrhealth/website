'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

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

// Stacked avatar — photo from /public/avatars/ask/ask-tab-success/
function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-[18px] shrink-0 rounded-full border-2 border-primary-background overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TabVisualSuccess(): ReactNode {
  const [showBubble,     setShowBubble]     = useState(false)
  const [showResponse,   setShowResponse]   = useState(false)
  const [showCard,       setShowCard]       = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      await sleep(80)
      if (cancelled) return
      setShowBubble(true)

      await sleep(120)
      if (cancelled) return
      setShowResponse(true)

      await sleep(110)
      if (cancelled) return
      setShowCard(true)

      await sleep(90)
      if (cancelled) return
      setShowSuggestion(true)
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
                write a follow-up email
              </span>
            </div>
          </div>
        </BlurIn>

        {/* ── Response text ───────────────────────────────────────────────── */}
        <BlurIn visible={showResponse}>
          <div className="mb-4 px-0.5">
            <p className="font-medium text-sm leading-5 text-fg-primary">
              Your draft is ready.<br />
              Review and customise if needed:
            </p>
          </div>
        </BlurIn>

        {/* ── Draft email card ────────────────────────────────────────────── */}
        <BlurIn visible={showCard}>
          <div className="mb-6">
            <div className="flex flex-col rounded-xl bg-primary-background" style={{ boxShadow: CARD_SHADOW }}>
              <div className="flex flex-col gap-0.5 px-3 pb-2 pt-2.5">

                {/* Header row: label + subject + avatars */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-medium text-xs text-muted-foreground">Draft email</span>
                    <span className="font-medium text-sm leading-5 text-fg-primary">
                      RE: Follow-Up on Initial Discussion
                    </span>
                  </div>

                  {/* Stacked avatars */}
                  <div className="flex shrink-0 items-center -space-x-1 pt-0.5">
                    <Avatar src="/avatars/ask/ask-tab-success/avatar-1.avif" alt="Avatar 1" />
                    <Avatar src="/avatars/ask/ask-tab-success/avatar-2.avif" alt="Avatar 2" />
                    <Avatar src="/avatars/ask/ask-tab-success/avatar-3.avif" alt="Avatar 3" />
                    {/* +2 overflow pill */}
                    <div className="relative flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-primary-background bg-muted">
                      <span className="text-[8px] font-medium leading-none text-muted-foreground">+2</span>
                    </div>
                  </div>
                </div>

                {/* Preview line */}
                <p className="truncate text-xs text-muted-foreground/70">
                  Hi everyone, thanks for the productive check-in...
                </p>

              </div>
            </div>
          </div>
        </BlurIn>

        {/* ── Suggested action ────────────────────────────────────────────── */}
        <BlurIn visible={showSuggestion}>
          <div className="flex flex-col gap-1.5">
            <span className="font-medium text-xs text-accent-foreground">Suggested action</span>
            <div className="flex items-center gap-0.5 rounded-lg">
              <div className="flex size-8 items-center justify-center">
                <IconRedirect />
              </div>
              <span className="font-medium text-sm text-fg-primary">
                Send follow-up to Greenleaf team
              </span>
            </div>
          </div>
        </BlurIn>

      </div>
    </div>
  )
}
