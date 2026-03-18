"use client"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  /** Size (px) of the travelling beam element */
  size?: number
  /** Duration of one full revolution in seconds */
  duration?: number
  /** Border width in px */
  borderWidth?: number
  /** Offset-anchor x position 0–100 (controls where on the beam element the path is anchored) */
  anchor?: number
  /** Leading colour */
  colorFrom?: string
  /** Trailing colour */
  colorTo?: string
  /** Delay in seconds (positive shifts the beam forward in its cycle) */
  delay?: number
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          "--size":         size,
          "--duration":     duration,
          "--anchor":       anchor,
          "--border-width": borderWidth,
          "--color-from":   colorFrom,
          "--color-to":     colorTo,
          "--delay":        `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        // Transparent border — the beam travels through this strip
        "[border:calc(var(--border-width)*1px)_solid_transparent]",
        // Mask: cut out padding-box so only the border strip shows
        "![mask-clip:padding-box,border-box]",
        "![mask-composite:intersect]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // ::after — the travelling beam element
        "after:absolute after:aspect-square after:content-['']",
        "after:w-[calc(var(--size)*1px)]",
        "after:[offset-anchor:calc(var(--anchor)*1%)_50%]",
        "after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
        "after:animate-border-beam",
        "after:[animation-delay:var(--delay)]",
        className,
      )}
    />
  )
}
