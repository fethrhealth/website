import { cn } from '@/lib/utils'

interface SectionLabelProps {
  /** Section number — rendered as [01], [02], etc. */
  index: number
  /** Main label text on the left */
  label: string
  /** Optional tag on the right — e.g. "/ growth + security" */
  tag?: string
  className?: string
}

/**
 * SectionLabel — desktop-only overline row with dashed divider.
 * Hidden on mobile (lg:block).
 *
 * Usage:
 *   <SectionLabel index={4} label="Built for scale" tag="/ growth + security" />
 */
export function SectionLabel({ index, label, tag, className }: SectionLabelProps) {
  const paddedIndex = String(index).padStart(2, '0')

  return (
    <div className={cn('hidden lg:block', className)}>
      <div className="flex items-center justify-between px-5 text-overline">
        <h2 className="flex gap-x-[6px]">
          <span>[{paddedIndex}]</span>
          <span className="text-black-800">{label}</span>
        </h2>
        {tag && <span>{tag}</span>}
      </div>
      <svg width="100%" height="1" className="text-subtle-stroke mt-5 h-px w-full">
        <line
          x1="0" y1="0.5" x2="100%" y2="0.5"
          stroke="currentColor"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
