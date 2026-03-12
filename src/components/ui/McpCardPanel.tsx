/**
 * McpCardPanel
 *
 * Reusable card panel for MCP feature sections — light mode.
 *
 * Uses a 1×1 CSS sub-grid so absolutely positioned border lines and corner
 * dots can be anchored to panel edges via `style={{ gridColumn, gridRow }}`.
 * This matches attio.com's grid decoration pattern exactly.
 *
 * Props:
 *   index         — Card number label, e.g. '01'
 *   description   — Short feature description shown at the bottom
 *   Illustration  — Zero-prop React component rendering the card's SVG
 *   innerGridCols — Column count of the inner content grid:
 *                     16 → wide / 2-up cards (Row A)
 *                     12 → narrow / 3-up cards (Row B)  [default: 16]
 */

type McpCardPanelProps = {
  index: string
  description: string
  Illustration: () => React.JSX.Element
  innerGridCols?: 12 | 16
}

export function McpCardPanel({
  index,
  description,
  Illustration,
  innerGridCols = 16,
}: McpCardPanelProps) {
  return (
    // 1×1 sub-grid — border lines and corner dots anchor to col/row edges.
    // `relative` is required so absolutely positioned children use this as
    // their containing block (CSS Grid absolute-item positioning).
    <div className="relative grid grid-cols-1 grid-rows-1 bg-primary-background w-full h-full">

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div
        className={[
          'grid bg-primary-background',
          innerGridCols === 16 ? 'grid-cols-16' : 'grid-cols-12',
        ].join(' ')}
      >
        <div className="col-[2/-2] flex flex-col gap-3 py-7">
          {/* Illustration + overline label */}
          <div className="relative w-full flex-1 min-h-[160px]">
            <p className="absolute top-0 left-0 text-overline">[{index}]</p>
            {/* Illustration fills below the label, centered, clipped at edges */}
            <div className="absolute inset-0 top-5 flex items-center justify-center overflow-hidden">
              <Illustration />
            </div>
          </div>
          {/* Feature description */}
          <p className="text-balance text-accent-foreground text-sm max-md:text-sm">
            {description}
          </p>
        </div>
      </div>

      {/* ── Border lines — solid (not dashed) ───────────────────────────── */}
      {/* Positioned via gridColumn / gridRow on the parent 1×1 sub-grid.   */}

      {/* Top */}
      <svg
        width="100%" height="1"
        className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
        style={{ gridColumn: '1 / -1', gridRow: 1 }}
      >
        <line x1="0" y1="0.5" x2="100%" y2="0.5"
          stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Bottom */}
      <svg
        width="100%" height="1"
        className="absolute text-weak-stroke inset-x-0 top-0 -translate-y-1/2"
        style={{ gridColumn: '1 / -1', gridRow: -1 }}
      >
        <line x1="0" y1="0.5" x2="100%" y2="0.5"
          stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Left */}
      <svg
        width="1" height="100%"
        className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
        style={{ gridColumn: 1, gridRow: '1 / -1' }}
      >
        <line x1="0.5" y1="0" x2="0.5" y2="100%"
          stroke="currentColor" strokeLinecap="round" />
      </svg>
      {/* Right */}
      <svg
        width="1" height="100%"
        className="absolute text-weak-stroke inset-y-0 left-0 -translate-x-1/2"
        style={{ gridColumn: -1, gridRow: '1 / -1' }}
      >
        <line x1="0.5" y1="0" x2="0.5" y2="100%"
          stroke="currentColor" strokeLinecap="round" />
      </svg>

      {/* ── Corner dots ─────────────────────────────────────────────────── */}
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: 1  }} />
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: 1,  gridRow: -1 }} />
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: 1  }} />
      <span className="absolute top-0 left-0 size-1 -translate-x-1/2 -translate-y-1/2 bg-default-stroke" style={{ gridColumn: -1, gridRow: -1 }} />
    </div>
  )
}
