'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

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

// Globe / web search icon
function IconGlobe() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5 text-accent-foreground">
      <path
        d="M7.33496 0.508789C10.7691 0.68312 13.5 3.52253 13.5 7C13.5 10.5899 10.5899 13.5 7 13.5C3.41015 13.5 0.5 10.5899 0.5 7C0.50004 3.41018 3.41017 0.5 7 0.5L7.33496 0.508789ZM5.01074 7.5C5.06064 8.90329 5.31622 10.1457 5.69336 11.0508C5.90445 11.5573 6.14339 11.9347 6.38281 12.1777C6.62056 12.4191 6.829 12.5 7 12.5C7.171 12.5 7.37944 12.4191 7.61719 12.1777C7.85661 11.9347 8.09555 11.5573 8.30664 11.0508C8.68378 10.1457 8.93936 8.90329 8.98926 7.5H5.01074ZM1.52344 7.5C1.71859 9.6655 3.16823 11.4682 5.14062 12.1768C5.00501 11.9495 4.88126 11.7004 4.77051 11.4346C4.33478 10.3886 4.06096 9.01117 4.01074 7.5H1.52344ZM9.98926 7.5C9.93904 9.01117 9.66522 10.3886 9.22949 11.4346C9.11867 11.7005 8.99412 11.9494 8.8584 12.1768C10.8312 11.4684 12.2814 9.66582 12.4766 7.5H9.98926ZM5.14062 1.82227C3.1681 2.53071 1.71865 4.33443 1.52344 6.5H4.01074C4.06096 4.98883 4.33478 3.61136 4.77051 2.56543C4.88137 2.29935 5.00484 2.04974 5.14062 1.82227ZM7 1.5C6.829 1.5 6.62056 1.58092 6.38281 1.82227C6.14339 2.06534 5.90445 2.44265 5.69336 2.94922C5.31622 3.85435 5.06064 5.09671 5.01074 6.5H8.98926C8.93936 5.09671 8.68378 3.85435 8.30664 2.94922C8.09555 2.44265 7.85661 2.06534 7.61719 1.82227C7.37944 1.58092 7.171 1.5 7 1.5ZM8.8584 1.82227C8.99429 2.04986 9.11856 2.29918 9.22949 2.56543C9.66522 3.61136 9.93904 4.98883 9.98926 6.5H12.4766C12.2813 4.33411 10.8314 2.53049 8.8584 1.82227Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Favicon-size colored square — placeholder for source site icons
function FaviconSquare({
  color,
  label,
  zIndex,
}: {
  color:   string
  label:   string
  zIndex?: number
}) {
  return (
    <div
      className="relative size-4 overflow-hidden rounded-sm border border-primary-background"
      style={{ zIndex }}
      aria-label={label}
    >
      <div className="size-full" style={{ backgroundColor: color }} />
      <div className="absolute inset-0 size-full rounded-[3px] border border-black/10" />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TabVisualVC(): ReactNode {
  const [showBubble,  setShowBubble]  = useState(false)
  const [showPill,    setShowPill]    = useState(false)
  const [showPara1,   setShowPara1]   = useState(false)
  const [showPara2,   setShowPara2]   = useState(false)
  const [showPara3,   setShowPara3]   = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      await sleep(80);  if (cancelled) return; setShowBubble(true)
      await sleep(120); if (cancelled) return; setShowPill(true)
      await sleep(100); if (cancelled) return; setShowPara1(true)
      await sleep(90);  if (cancelled) return; setShowPara2(true)
      await sleep(80);  if (cancelled) return; setShowPara3(true)
    }

    void run()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="flex size-full items-center justify-center p-6">
      {/* mask-b-from-38% fades the overflow text at the bottom */}
      <div className="mask-b-from-38% relative w-full max-w-sm">

        {/* ── User bubble ─────────────────────────────────────────────────── */}
        <BlurIn visible={showBubble}>
          <div className="mb-4 flex justify-end">
            <div className="rounded-xl bg-surface px-3.5 py-2">
              <span className="max-w-[17em] text-pretty text-sm text-fg-primary">
                what do you know about the founders of Greenleaf?
              </span>
            </div>
          </div>
        </BlurIn>

        {/* ── "Searched web" pill ──────────────────────────────────────────── */}
        <BlurIn visible={showPill}>
          <div className="mb-4 flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-primary-background px-2 py-1.5">
              <IconGlobe />
              <span className="text-sm text-accent-foreground">
                Searched web:{' '}
                <span className="text-caption-foreground">6 results</span>
              </span>
              {/* Stacked favicons */}
              <div className="flex items-center -space-x-1">
                <FaviconSquare color="#000000" label="X"    zIndex={1} />
                <FaviconSquare color="#f5c518" label="Vox"  zIndex={2} />
                <FaviconSquare color="#cc0000" label="CNET" zIndex={3} />
                {/* +3 overflow counter */}
                <div
                  className="relative z-10 flex size-4 items-center justify-center rounded-sm border border-primary-background bg-muted"
                  aria-label="+3 more"
                >
                  <span className="font-semibold text-[9px] leading-none text-muted-foreground">3</span>
                  <div className="absolute inset-0 rounded-[3px] border border-black/10" />
                </div>
              </div>
            </div>
          </div>
        </BlurIn>

        {/* ── Response paragraphs ──────────────────────────────────────────── */}
        <BlurIn visible={showPara1}>
          <div className="mb-3 px-0.5">
            <p className="font-medium text-sm leading-5 text-fg-primary">
              Here&apos;s what you should know:
            </p>
          </div>
        </BlurIn>

        <BlurIn visible={showPara2}>
          <div className="mb-3 px-0.5">
            <p className="font-medium text-sm leading-5 text-fg-primary">
              Greenleaf was founded by Alex Kowalski and Sarah Johnson, who met
              while working at Stripe. Alex was one of the early engineers who
              helped build Stripe&apos;s money movement platform, while Sarah led
              product and partnerships for startups.
            </p>
          </div>
        </BlurIn>

        <BlurIn visible={showPara3}>
          <div className="px-0.5">
            <p className="font-medium text-sm leading-5 text-fg-primary">
              The two realized there was a gap in the market for
              developer-friendly sustainability tools, and launched Greenleaf to
              help companies track and reduce their carbon footprint at scale.
            </p>
          </div>
        </BlurIn>

      </div>
    </div>
  )
}
