'use client'

/**
 * RainGrid — animated canvas grid of vertical lines with parabolic endpoint distribution.
 *
 * Parabola: center lines are short, edge lines extend deepest.
 * Entry animation starts only when the canvas enters the viewport (IntersectionObserver).
 * Each line animates 0 → baseY with a random staggered delay + easeOut, then stays put.
 *
 * Props:
 *   variant     — 'dark' (black bg, default) | 'light' (white bg, gray lines)
 *   fillHeight  — when true the canvas fills its CSS container; when false a fixed 300px height
 *   className   — extra classes forwarded to the <canvas> element
 */

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface RainGridProps {
  variant?:    'dark' | 'light'
  fillHeight?: boolean
  className?:  string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_H       = 300
const LINE_COUNT      = 150
const DOT_RADIUS      = 2
const ENTER_DURATION  = 600
const ENTER_MAX_DELAY = 800

// Parabola: 0 at center, 1 at edges → center short, edges deep
const EDGE_Y_FRAC   = 0.22
const CENTER_Y_FRAC = 0.78

// Color schemes
const COLORS = {
  dark:  { bg: '#101113', r: 111, g: 121, b: 136, a: 0.4 },
  light: { bg: '#ffffff', r: 211, g: 216, b: 223, a: 1 },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function easeOut(t: number): number { return 1 - (1 - t) ** 3 }

// ─── Line data ────────────────────────────────────────────────────────────────

interface Line {
  x:          number
  baseY:      number
  currentY:   number
  enterDelay: number
  enterStart: number | null
  entered:    boolean
}

function buildLines(W: number, H: number, immediate: boolean): Line[] {
  const cx      = W / 2
  const hw      = W / 2
  const edgeY   = H * EDGE_Y_FRAC
  const centerY = H * CENTER_Y_FRAC

  return Array.from({ length: LINE_COUNT }, (_, i) => {
    const x     = (i / (LINE_COUNT - 1)) * W
    const t     = ((x - cx) / hw) ** 2
    const baseY = edgeY + (centerY - edgeY) * t

    return {
      x,
      baseY,
      currentY:   immediate ? baseY : 0,
      enterDelay: immediate ? 0 : Math.random() * ENTER_MAX_DELAY,
      enterStart: immediate ? 0 : null,
      entered:    immediate,
    }
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RainGrid({ variant = 'dark', fillHeight = false, className }: RainGridProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const linesRef     = useRef<Line[]>([])
  const rafRef       = useRef<number>(0)
  const startTimeRef = useRef<number>(Infinity)  // Infinity = not yet started
  const wRef         = useRef<number>(0)
  const hRef         = useRef<number>(0)

  const { bg, r: CR, g: CG, b: CB, a: CA } = COLORS[variant]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1

    const init = (immediate: boolean) => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      if (W === 0 || H === 0) return
      wRef.current = W
      hRef.current = H
      canvas.width  = W * dpr
      canvas.height = H * dpr
      linesRef.current = buildLines(W, H, immediate)
      // On resize, restart clock so the entry replays cleanly
      if (!immediate) startTimeRef.current = Infinity
    }

    const draw = (now: number) => {
      const ctx = canvas.getContext('2d')
      const W   = wRef.current
      const H   = hRef.current

      if (!ctx || W === 0 || H === 0) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Not yet in viewport — draw blank background and wait
      if (startTimeRef.current === Infinity) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const elapsed = now - startTimeRef.current
      const color   = `rgba(${CR},${CG},${CB},${CA})`

      for (const line of linesRef.current) {

        // Staggered entry: each line grows from 0 → baseY with easeOut
        if (!line.entered) {
          if (elapsed < line.enterDelay) continue
          if (line.enterStart === null) line.enterStart = now
          const progress = Math.min((now - line.enterStart) / ENTER_DURATION, 1)
          line.currentY = line.baseY * easeOut(progress)
          if (progress >= 1) { line.entered = true; line.currentY = line.baseY }
        }

        ctx.beginPath()
        ctx.moveTo(line.x, 0)
        ctx.lineTo(line.x, line.currentY)
        ctx.strokeStyle = color
        ctx.lineWidth   = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(line.x, line.currentY, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // Build lines and start the render loop (draws blank until observer fires)
    init(false)
    rafRef.current = requestAnimationFrame(draw)

    // Trigger entry animation when canvas enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && startTimeRef.current === Infinity) {
          startTimeRef.current = performance.now()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    const onResize = () => init(true)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block w-full', fillHeight ? 'h-full' : '', className)}
      style={fillHeight ? undefined : { height: DEFAULT_H }}
    />
  )
}
