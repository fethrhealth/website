'use client'

/**
 * TableOfContents
 *
 * Sticky sidebar ToC rendered on the right column of a blog post.
 * Tracks active heading via IntersectionObserver on the article headings.
 * Also used inline (non-sticky) on mobile via the `inline` prop.
 */

import { useEffect, useRef, useState } from 'react'
import type { ToCItem } from '@/lib/lexical'

interface Props {
  items: ToCItem[]
  /** When true, renders a compact version embedded in the article (mobile) */
  inline?: boolean
}

export function TableOfContents({ items, inline = false }: Props) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    // Map heading ids → their position in the items array so we can
    // track which one is closest to the top of the viewport.
    const idSet = new Set(items.map((i) => i.id))

    // We keep a record of which headings are currently "visible"
    // and pick the topmost one.
    const visible = new Map<string, number>() // id → boundingTop

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (!idSet.has(id)) continue
          if (entry.isIntersecting) {
            visible.set(id, entry.boundingClientRect.top)
          } else {
            visible.delete(id)
          }
        }

        if (visible.size > 0) {
          // Pick the heading with the smallest positive top (topmost visible)
          let topId = ''
          let topY = Infinity
          visible.forEach((y, id) => {
            if (y < topY) { topY = y; topId = id }
          })
          setActiveId(topId)
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 },
    )

    const headings = document.querySelectorAll<HTMLElement>('#content h2, #content h3')
    headings.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [items])

  if (items.length === 0) return null

  // ── Inline variant (mobile) ──────────────────────────────────────────────
  // Uses `contents` so children participate directly in the parent 12-col grid.
  if (inline) {
    return (
      <div className="contents xl:hidden">
        <div className="col-span-full lg:col-[2/-2] pt-10 pb-15">
          <nav aria-label="Table of contents">
            <div className="text-overline leading-5">Table of Contents</div>
            <ul className="mt-2 flex flex-col">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id)
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={[
                    '-ml-2 flex w-fit cursor-pointer items-center justify-start text-pretty rounded-md px-2 py-1.5',
                    'text-start text-fg-caption text-sm',
                    'transition-colors duration-400 ease-in-out',
                    'hover:text-accent-foreground hover:duration-150',
                    'active:text-fg-caption active:duration-50',
                    'focus-visible:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:active:ring-2',
                    item.level === 3 ? 'pl-5' : '',
                  ].join(' ')}
                >
                  {item.text}
                </button>
              ))}
            </ul>
          </nav>
        </div>

        {/* Full-width horizontal rule below the ToC */}
        <svg width="100%" height="1" aria-hidden className="text-subtle-stroke col-[1/-1]">
          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  // ── Sidebar variant (desktop) ────────────────────────────────────────────
  return (
    <nav aria-label="Table of contents">
      <div className="flex h-8 items-center">
        <h2 className="truncate text-overline [text-box-trim:trim-both]">Table of Contents</h2>
      </div>

      <div className="mt-0.5 flex flex-col">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id)
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={[
                'relative -mx-2 flex w-full cursor-pointer items-center justify-start rounded-md px-2 py-1.5',
                'text-start text-fg-caption text-xs',
                'transition-colors duration-400 ease-in-out',
                'active:text-fg-caption active:duration-50',
                'focus-visible:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:active:ring-2',
                item.level === 3 ? 'pl-5' : '',
                isActive
                  ? '!text-fg-primary pointer-events-none'
                  : 'hover:text-fg-accent hover:duration-150',
              ].join(' ')}
            >
              <p className="text-pretty">{item.text}</p>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
