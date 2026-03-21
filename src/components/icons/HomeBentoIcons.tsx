/**
 * HomeBentoIcons.tsx
 * Simple, static SVG icons and line helpers used in HomeBentoSection.
 * Each export follows the pattern: ({ className?: string }) => ReactNode
 */

import type { ReactNode } from 'react'

/** Full-width 1px dashed horizontal rule (stroke = currentColor). */
export function DashedH({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg width="100%" height="1" className={className} aria-hidden>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

/** Full-height 1px dashed vertical rule (stroke = currentColor). */
export function DashedV({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg width="1" height="100%" className={className} aria-hidden>
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
    </svg>
  )
}

/** Full-width 1px solid horizontal rule (stroke = currentColor). */
export function SolidH({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg width="100%" height="1" className={className} aria-hidden>
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

/** Full-height 1px solid vertical rule (stroke = currentColor). */
export function SolidV({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg width="1" height="100%" className={className} aria-hidden>
      <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
    </svg>
  )
}

/** 14×14 right-pointing arrow used in bento "ghost" link buttons.
 *  Animates on parent group hover/active via Tailwind group-hover utilities. */
export function BentoArrowIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      className={`transition-[translate] duration-400 ease-in-out group-hover:translate-x-0.25 group-hover:duration-150 group-active:translate-x-0.25 group-active:duration-50${className ? ` ${className}` : ''}`}
      aria-hidden
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M2.25 7h9.5m0 0L8.357 3.5M11.75 7l-3.393 3.5" />
    </svg>
  )
}
