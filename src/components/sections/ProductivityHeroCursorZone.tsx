'use client'

import { useState, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

// ─── "You" cursor SVG ─────────────────────────────────────────────────────────
// Blue (#266df0) to distinguish from John/Roza/Ethan.
// Arrow path + badge are identical in structure to the other floating cursors.

function YouCursorSVG() {
  const COLOR = '#266df0'
  return (
    <svg
      width="74"
      height="54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Drop shadow for the cursor arrow */}
        <filter
          id="you-cursor-shadow"
          x="0.09"
          y="0.25"
          width="35.5"
          height="38.3"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="2" operator="erode" in="SourceAlpha" result="e1" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix values="0 0 0 0 0.11 0 0 0 0 0.16 0 0 0 0 0.25 0 0 0 0.16 0" />
          <feBlend in2="bg" result="s1" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="4" operator="erode" in="SourceAlpha" result="e2" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix values="0 0 0 0 0.11 0 0 0 0 0.16 0 0 0 0 0.25 0 0 0 0.12 0" />
          <feBlend in2="s1" result="s2" />
          <feBlend in="SourceGraphic" in2="s2" result="shape" />
        </filter>
        {/* Drop shadow for the name badge */}
        <filter
          id="you-badge-shadow"
          x="17"
          y="22"
          width="57"
          height="32"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="2" operator="erode" in="SourceAlpha" result="e1" />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix values="0 0 0 0 0.15 0 0 0 0 0.43 0 0 0 0 0.94 0 0 0 0.08 0" />
          <feBlend in2="bg" result="s1" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="2" operator="erode" in="SourceAlpha" result="e2" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix values="0 0 0 0 0.15 0 0 0 0 0.43 0 0 0 0 0.94 0 0 0 0.12 0" />
          <feBlend in2="s1" result="s2" />
          <feBlend in="SourceGraphic" in2="s2" result="shape" />
        </filter>
      </defs>

      {/* Name badge */}
      <g filter="url(#you-badge-shadow)">
        <rect x="21" y="23" width="40" height="24" rx="8" fill={COLOR} />
        <text
          x="41"
          y="39"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="400"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        >
          You
        </text>
        <rect
          x="21.5"
          y="23.5"
          width="39"
          height="23"
          rx="7.5"
          stroke="#232529"
          strokeOpacity="0.1"
        />
      </g>

      {/* Cursor arrow — same path as the other cursors */}
      <g filter="url(#you-cursor-shadow)">
        <path
          fill={COLOR}
          d="M11.0959 7.54364L13.8798 23.319C13.9205 23.5494 14.227 23.6027 14.3431 23.3996L17.9446 17.097C17.9798 17.0353 18.0397 16.9915 18.1092 16.9766L24.3851 15.6318C24.6062 15.5844 24.6558 15.291 24.4624 15.1736L11.4719 7.2865C11.2881 7.17493 11.0586 7.33194 11.0959 7.54364Z"
        />
        <path
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.6035 7.63053L13.3874 23.4059C13.5094 24.097 14.429 24.257 14.7772 23.6477L18.3233 17.4421L24.4898 16.1207C25.1534 15.9785 25.302 15.0984 24.7219 14.7462L11.7314 6.8591C11.1801 6.52442 10.4915 6.99544 10.6035 7.63053Z"
        />
      </g>
    </svg>
  )
}

// ─── Zone wrapper ──────────────────────────────────────────────────────────────

interface Props {
  children: React.ReactNode
  /** Extra classes forwarded to the wrapper div (e.g. "relative") */
  className?: string
}

/**
 * ProductivityHeroCursorZone
 *
 * While the pointer is inside this zone on desktop, hides the native cursor
 * and renders a "You" cursor badge that follows the pointer — matching the
 * style of the ambient floating cursors (John / Roza / Ethan).
 */
// Selector for interactive elements that should restore the native cursor
const INTERACTIVE = 'a, button, input, select, textarea, label, [role="button"], [role="link"]'

export function ProductivityHeroCursorZone({ children, className }: Props) {
  const [isInZone, setIsInZone] = useState(false)
  const [isOverInteractive, setIsOverInteractive] = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Subtle spring for a natural feel — stiff enough to stay close to cursor
  const springCfg = { stiffness: 800, damping: 35, mass: 0.4 }
  const smoothX = useSpring(rawX, springCfg)
  const smoothY = useSpring(rawY, springCfg)

  // Offset: the SVG arrow tip sits at approximately (11, 7) inside the viewport
  const cursorX = useTransform(smoothX, v => v - 11)
  const cursorY = useTransform(smoothY, v => v - 7)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    },
    [rawX, rawY],
  )

  const handleMouseOver = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    setIsOverInteractive(!!target.closest(INTERACTIVE))
  }, [])

  const showCustomCursor = isInZone && !isOverInteractive

  return (
    <div
      className={cn(className, showCustomCursor && 'cursor-none max-lg:cursor-auto')}
      onMouseEnter={() => setIsInZone(true)}
      onMouseLeave={() => { setIsInZone(false); setIsOverInteractive(false) }}
      onMouseMove={handleMouseMove}
      onMouseOver={handleMouseOver}
    >
      {children}

      {/* Custom cursor — desktop only, fixed so it escapes any overflow:hidden ancestors */}
      {showCustomCursor && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999] max-lg:hidden"
          style={{ x: cursorX, y: cursorY }}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.12 }}
        >
          <YouCursorSVG />
        </motion.div>
      )}
    </div>
  )
}
