'use client'

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

function TaskCard({ title, due, dueMuted = false }: {
  title:     string
  due:       string
  dueMuted?: boolean
}) {
  return (
    <div className="rounded-xl bg-primary-background" style={{ boxShadow: CARD_SHADOW }}>
      <div className="flex items-center gap-2 px-2.5 py-2">
        <div className="size-4 shrink-0 rounded-full border border-black/10 bg-primary-background" />
        <p className="flex-1 truncate font-medium text-sm leading-5 tracking-tight text-fg-primary">
          {title}
        </p>
        <span className={`shrink-0 font-medium text-xs leading-4 ${dueMuted ? 'text-muted-foreground/50' : 'text-yellow-600'}`}>
          {due}
        </span>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TabVisualMarketing(): ReactNode {
  const [showBubble,     setShowBubble]     = useState(false)
  const [showResponse,   setShowResponse]   = useState(false)
  const [showCard1,      setShowCard1]      = useState(false)
  const [showCard2,      setShowCard2]      = useState(false)
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
      setShowCard1(true)

      await sleep(90)
      if (cancelled) return
      setShowCard2(true)

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
                any open requests with greenleaf?
              </span>
            </div>
          </div>
        </BlurIn>

        {/* ── Response text ───────────────────────────────────────────────── */}
        <BlurIn visible={showResponse}>
          <div className="mb-4 px-0.5">
            <p className="font-medium text-sm leading-5 text-fg-primary">
              Here are 2 open tasks to look into:
            </p>
          </div>
        </BlurIn>

        {/* ── Task cards ──────────────────────────────────────────────────── */}
        <div className="mb-6 flex flex-col gap-3">
          <BlurIn visible={showCard1}>
            <TaskCard title="Share 1-pager with the team" due="Today" />
          </BlurIn>
          <BlurIn visible={showCard2}>
            <TaskCard title="Create case study with Sarah" due="Tomorrow" dueMuted />
          </BlurIn>
        </div>

        {/* ── Suggested action ────────────────────────────────────────────── */}
        <BlurIn visible={showSuggestion}>
          <div className="flex flex-col gap-1.5">
            <span className="font-medium text-xs text-accent-foreground">Suggested action</span>
            <div className="flex items-center gap-0.5 rounded-lg">
              <div className="flex size-8 items-center justify-center">
                <IconRedirect />
              </div>
              <span className="font-medium text-sm text-fg-primary">
                Draft follow-up email to Greenleaf
              </span>
            </div>
          </div>
        </BlurIn>

      </div>
    </div>
  )
}
