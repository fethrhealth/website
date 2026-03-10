import { useId } from 'react'

/**
 * QuoteSection
 *
 * Full-width centered quote block — pixel-faithful to attio.com.
 * Dot-pattern background, border-x container, serif heading, author info.
 *
 * Usage:
 *   <QuoteSection
 *     quote='"With Fethr, we're able to conduct highly targeted outreach."'
 *     author="Margaret Shen"
 *     role="Head of Business Operations · Modal"
 *   />
 */

interface QuoteSectionProps {
  quote: string
  author: string
  role: string
}

export function QuoteSection({ quote, author, role }: QuoteSectionProps) {
  const patternId = useId()
  const words = quote.split(' ')

  return (
    <div className="container flex flex-1 flex-col max-lg:contents">
      <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke max-lg:border-none">
        <div className="relative flex min-h-[62svh] flex-col justify-center">

          {/* ── Dot background ── */}
          <svg width="100%" height="100%" className="text-muted-strong-background absolute inset-0" aria-hidden>
            <defs>
              <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
                <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>

          {/* ── Top spacer ── */}
          <div aria-hidden className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-30 max-lg:h-25">
            <div className="col-[2/-2] flex justify-between" />
          </div>

          {/* ── Quote content ── */}
          <div className="relative grid flex-1 grid-cols-12 items-center">
            <div className="col-[2/-2] flex flex-col items-center">
              <p className="max-w-[20em] text-pretty text-center text-heading-responsive-md-serif">
                {words.map((word, i) => (
                  <span key={i} className="transition-colors duration-600 ease-in-out">
                    {word}{' '}
                  </span>
                ))}
              </p>
              <p className="mt-12 text-center text-sm font-semibold text-secondary-foreground">
                {author}
              </p>
              <p className="mt-0.5 text-center text-sm text-secondary-foreground">
                {role}
              </p>
            </div>
          </div>

          {/* ── Bottom spacer ── */}
          <div aria-hidden className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-30 max-lg:h-25">
            <div className="col-[2/-2] flex justify-between" />
          </div>

        </div>
      </div>
    </div>
  )
}
