"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
  /**
   * maskMode: replicates the attio-style "white mask over gradient" effect.
   *
   * Instead of drawing colored dots on transparent, the canvas fills entirely
   * white and each square is cleared then re-filled with white at varying
   * opacity. The gradient behind shines through the squares in proportion to
   * how transparent they are — so the DOTS are what show the gradient color.
   *
   * Use with a blurred conic-gradient div sitting behind the canvas.
   * maxOpacity controls the minimum white coverage (higher = less gradient).
   * minOpacity controls the minimum square opacity (lower = more gradient).
   */
  maskMode?: boolean
  /** Minimum square opacity in maskMode (0–1). Default 0.3. */
  minOpacity?: number
  /** Called once on the first animation frame — use to show the gradient behind. */
  onReady?: () => void
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  maskMode = false,
  minOpacity = 0.3,
  onReady,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`
      }
      const canvas = document.createElement("canvas")
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext("2d")
      if (!ctx) return "rgba(255, 0, 0,"
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return `rgba(${r}, ${g}, ${b},`
    }
    return toRGBA(color)
  }, [color])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.ceil(width / (squareSize + gridGap))
      const rows = Math.ceil(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        // maskMode: start fully white (maxOpacity) so gradient is hidden on mount.
        // flickerChance will gradually reveal dots over the first few frames.
        squares[i] = maskMode ? maxOpacity : Math.random() * maxOpacity
      }

      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity, maskMode, minOpacity]
  )

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = maskMode
            ? minOpacity + Math.random() * (maxOpacity - minOpacity)
            : Math.random() * maxOpacity
        }
      }
    },
    [flickerChance, maxOpacity, maskMode, minOpacity]
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      if (maskMode) {
        // Fill entire canvas white — this hides the gradient everywhere
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, width, height)

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const opacity = squares[i * rows + j] ?? 1
            const x = i * (squareSize + gridGap) * dpr
            const y = j * (squareSize + gridGap) * dpr
            const s = squareSize * dpr
            // Clear square (transparent hole) then fill with varying-opacity white.
            // Low opacity → more gradient shows through the dot.
            ctx.clearRect(x, y, s, s)
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.fillRect(x, y, s, s)
          }
        }
      } else {
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = "transparent"
        ctx.fillRect(0, 0, width, height)

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const opacity = squares[i * rows + j]
            ctx.fillStyle = `${memoizedColor}${opacity})`
            ctx.fillRect(
              i * (squareSize + gridGap) * dpr,
              j * (squareSize + gridGap) * dpr,
              squareSize * dpr,
              squareSize * dpr
            )
          }
        }
      }
    },
    [memoizedColor, squareSize, gridGap, maskMode]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext("2d") ?? null
    let animationFrameId: number | null = null
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let gridParams: ReturnType<typeof setupCanvas> | null = null

    if (canvas && container && ctx) {
      const updateCanvasSize = () => {
        const newWidth = width || container.clientWidth
        const newHeight = height || container.clientHeight
        setCanvasSize({ width: newWidth, height: newHeight })
        gridParams = setupCanvas(canvas, newWidth, newHeight)
      }

      updateCanvasSize()

      let lastTime = 0
      let readyFired = false
      const animate = (time: number) => {
        if (!isInView || !gridParams) return

        if (!readyFired) {
          readyFired = true
          onReady?.()
        }

        const deltaTime = (time - lastTime) / 1000
        lastTime = time

        updateSquares(gridParams.squares, deltaTime)
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridParams.cols,
          gridParams.rows,
          gridParams.squares,
          gridParams.dpr
        )
        animationFrameId = requestAnimationFrame(animate)
      }

      resizeObserver = new ResizeObserver(() => {
        updateCanvasSize()
      })
      resizeObserver.observe(container)

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry) setIsInView(entry.isIntersecting)
        },
        { threshold: 0 }
      )
      intersectionObserver.observe(canvas)

      if (isInView) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div
      ref={containerRef}
      className={cn(`h-full w-full ${className}`)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}
