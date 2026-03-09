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
  if (inline) {
    return (
      <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-subtle-stroke p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-fg-caption">
          On this page
        </p>
        <ol className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${item.id}`}
                className={[
                  'block text-sm transition-colors duration-150',
                  activeId === item.id
                    ? 'text-fg-primary'
                    : 'text-fg-accent hover:text-fg-secondary',
                ].join(' ')}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    )
  }

  // ── Sidebar variant (desktop) ────────────────────────────────────────────
  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-fg-caption">
        On this page
      </p>

      <ol className="relative space-y-0.5 border-l border-subtle-stroke pl-4">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${item.id}`}
                className={[
                  'block py-0.5 text-sm transition-colors duration-150',
                  isActive
                    ? 'font-medium text-fg-primary'
                    : 'text-fg-accent hover:text-fg-secondary',
                ].join(' ')}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
