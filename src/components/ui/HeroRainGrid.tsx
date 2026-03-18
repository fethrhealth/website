'use client'

/**
 * HeroRainGrid — animated canvas for AskHeroSection.
 *
 * Lines grow UPWARD from the bottom. Dots sit at the top endpoint.
 *
 * Flow:
 *   ENTER     dots appear at midline bouncing (fade-in), lines rise from bottom
 *   IDLE      gentle lerp to flat — no hard snap
 *   RAIN      all dots bounce like rain (lines attached), amplitude fades in + out
 *   WAVE      single Gaussian pulse travels left → right
 *   PARABOLA  dots settle into parabola (center short, edges long)
 *   FLATTEN   dots lerp back to midline → RAIN → repeat
 */

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

// Line density: 1 line per 8px of canvas width.
// Desktop ~1200px → ~150 lines (same as before). Mobile ~375px → ~47 lines.
const LINE_DENSITY_PX = 11
const DOT_RADIUS = 1.5

const LINE_ALPHA = 0.15
const LINE_RGB   = { r: 0, g: 0, b: 0 }

// Phase durations (ms)
const ENTER_DUR = 1800
const IDLE_DUR  = 2000   // enough to fully settle from entry bounce
const RAIN_DUR  = 3500   // includes fade-in + hold + fade-out
const WAVE_DUR  = 3000
const PARA_DUR  = 3000
const FLAT_DUR  = 3500

// Y positions as fraction of canvas height (Y=0=top, Y=H=bottom)
const MID_Y_FRAC  = 0.55
const PARA_CTR    = 0.63   // center of parabola — shorter (closer to bottom)
const PARA_EDGE   = 0.35   // edges of parabola  — longer  (closer to top)

// Entry: dot bounce while lines rise
const ENTRY_BOUNCE_AMP  = 9      // px
const ENTRY_BOUNCE_RATE = 0.0022  // rad/ms  (~1 cycle per 2.8 s)
const LINE_RISE_LERP    = 0.038
const DOT_FADE_DUR      = 400    // ms

// Rain: same bounce, envelope fades in + out
const RAIN_BOUNCE_AMP   = 9      // px — same feel as entry
const RAIN_FADE_IN      = 0.15   // fraction of RAIN_DUR to fade bounce in
const RAIN_FADE_OUT_START = 0.72 // fraction of RAIN_DUR where fade-out begins

// Wave: single Gaussian pulse
const WAVE_AMP_FRAC   = 0.125
const WAVE_SIGMA_FRAC = 0.15

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number { return a + (b - a) * t }
function clamp(v: number, lo: number, hi: number): number { return v < lo ? lo : v > hi ? hi : v }

// ─── Line data ────────────────────────────────────────────────────────────────

interface DotLine {
  x:        number
  dotY:     number   // current dot Y (and line-top Y for non-entry phases)
  lineTopY: number   // line's growing top (entry phase only)
  paraY:    number   // parabola target
  delay:    number   // entry line-rise stagger (ms)
  dotPhase: number   // random phase for bounce
}

function buildLines(W: number, H: number): DotLine[] {
  const LINE_COUNT = Math.round(W / LINE_DENSITY_PX)
  const midY = H * MID_Y_FRAC
  const cx   = W / 2
  const hw   = W / 2

  // Scale parabola amplitude with canvas width so it's less pronounced on mobile.
  // At 900px+ → full amplitude (PARA_CTR - PARA_EDGE = 0.28).
  // At 375px  → ~42% of that → edges only 12% above center instead of 28%.
  const paraAmp  = (PARA_CTR - PARA_EDGE) * Math.min(1, W / 900)
  const paraEdge = PARA_CTR - paraAmp

  return Array.from({ length: LINE_COUNT }, (_, i) => {
    const x  = (i / (LINE_COUNT - 1)) * W
    const t2 = ((x - cx) / hw) ** 2
    const paraY = H * PARA_CTR - (H * PARA_CTR - H * paraEdge) * t2
    return {
      x,
      dotY:     midY,
      lineTopY: H,
      paraY,
      delay:    Math.random() * 600,
      dotPhase: Math.random() * Math.PI * 2,
    }
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

type Phase = 'enter' | 'idle' | 'rain' | 'wave' | 'parabola' | 'flatten'

export function HeroRainGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1

    let W = 0, H = 0
    let lines: DotLine[] = []
    let phase: Phase = 'enter'
    let phaseStart   = 0

    const init = (immediate: boolean) => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      if (W === 0 || H === 0) return
      canvas.width  = W * dpr
      canvas.height = H * dpr
      lines         = buildLines(W, H)

      if (immediate) {
        phase = 'idle'
        const midY = H * MID_Y_FRAC
        for (const l of lines) { l.dotY = midY; l.lineTopY = midY }
      } else {
        phase = 'enter'
      }
      phaseStart = performance.now()
    }

    const draw = (now: number) => {
      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(draw); return }
      const ctx = canvas.getContext('2d')
      if (!ctx) { rafRef.current = requestAnimationFrame(draw); return }

      const elapsed = now - phaseStart
      const midY    = H * MID_Y_FRAC

      // ── Phase transitions ────────────────────────────────────────────────
      if (phase === 'enter' && elapsed > ENTER_DUR) {
        phase = 'idle'
        phaseStart = now
        // Merge lineTopY into dotY — no hard snap on dotY (let idle lerp handle it)
        for (const l of lines) l.lineTopY = l.dotY
      } else if (phase === 'idle' && elapsed > IDLE_DUR) {
        phase = 'rain'; phaseStart = now
      } else if (phase === 'rain' && elapsed > RAIN_DUR) {
        phase = 'wave'; phaseStart = now
      } else if (phase === 'wave' && elapsed > WAVE_DUR) {
        phase = 'parabola'; phaseStart = now
      } else if (phase === 'parabola' && elapsed > PARA_DUR) {
        phase = 'flatten'; phaseStart = now
      } else if (phase === 'flatten' && elapsed > FLAT_DUR) {
        phase = 'rain'; phaseStart = now   // loop: rain → wave → parabola → flatten → rain …
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      const { r: CR, g: CG, b: CB } = LINE_RGB
      const waveAmp   = H * WAVE_AMP_FRAC
      const waveSigma = W * WAVE_SIGMA_FRAC

      for (const line of lines) {

        // ── ENTER ────────────────────────────────────────────────────────
        if (phase === 'enter') {
          // Dot bounces gently at midY from the very start
          line.dotY = midY + ENTRY_BOUNCE_AMP * Math.sin(elapsed * ENTRY_BOUNCE_RATE + line.dotPhase)

          // Line rises from bottom toward the dot, staggered
          if (elapsed > line.delay) {
            line.lineTopY = lerp(line.lineTopY, line.dotY, LINE_RISE_LERP)
          }

          const dotFade  = clamp(elapsed / DOT_FADE_DUR, 0, 1)
          const lineRise = clamp((H - line.lineTopY) / Math.max(H - line.dotY, 1), 0, 1)

          // Dot (drawn first, always visible)
          ctx.beginPath()
          ctx.arc(line.x, line.dotY, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${CR},${CG},${CB},${LINE_ALPHA * dotFade})`
          ctx.fill()

          // Line (grows upward)
          ctx.beginPath()
          ctx.moveTo(line.x, H)
          ctx.lineTo(line.x, line.lineTopY)
          ctx.strokeStyle = `rgba(${CR},${CG},${CB},${LINE_ALPHA * lineRise})`
          ctx.lineWidth = 1
          ctx.stroke()
          continue
        }

        // ── IDLE — gentle lerp to midY, no jump ───────────────────────────
        if (phase === 'idle') {
          line.dotY = lerp(line.dotY, midY, 0.06)

        // ── RAIN — bounce with fade-in / fade-out envelope ────────────────
        } else if (phase === 'rain') {
          const rT = elapsed / RAIN_DUR
          const amp = RAIN_BOUNCE_AMP * (
            rT < RAIN_FADE_IN
              ? rT / RAIN_FADE_IN
              : rT > RAIN_FADE_OUT_START
                ? 1 - (rT - RAIN_FADE_OUT_START) / (1 - RAIN_FADE_OUT_START)
                : 1
          )
          line.dotY = midY + amp * Math.sin(elapsed * ENTRY_BOUNCE_RATE + line.dotPhase)

        // ── WAVE — single Gaussian pulse left → right ─────────────────────
        } else if (phase === 'wave') {
          const waveT   = elapsed / WAVE_DUR
          const centerX = W * lerp(-0.35, 1.35, waveT)
          const dist     = line.x - centerX
          const envelope = Math.exp(-0.5 * (dist / waveSigma) ** 2)
          line.dotY = midY - waveAmp * envelope

        // ── PARABOLA ──────────────────────────────────────────────────────
        } else if (phase === 'parabola') {
          line.dotY = lerp(line.dotY, line.paraY, 0.07)

        // ── FLATTEN ───────────────────────────────────────────────────────
        } else {
          line.dotY = lerp(line.dotY, midY, 0.04)
        }

        const color = `rgba(${CR},${CG},${CB},${LINE_ALPHA})`

        ctx.beginPath()
        ctx.moveTo(line.x, H)
        ctx.lineTo(line.x, line.dotY)
        ctx.strokeStyle = color
        ctx.lineWidth   = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(line.x, line.dotY, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    init(false)
    rafRef.current = requestAnimationFrame(draw)

    const onResize = () => init(true)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block h-full w-full', className)}
    />
  )
}
