import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { IntegrationCardsContent } from '@/data/integration-cards'

// ─── Heading helpers ──────────────────────────────────────────────────────────

function splitLines(text: string) {
  return text.split(/\n|\\n/).map((part, i) => (
    <span key={i}>{i > 0 && <br />}{part}</span>
  ))
}

// ─── Single integration card ──────────────────────────────────────────────────

function IntegrationCard({
  iconSrc,
  iconAlt,
  name,
  description,
}: {
  iconSrc: string
  iconAlt?: string
  name: string
  description: string
}) {
  return (
    <div className="flex items-start gap-x-[18px] rounded-xl border border-subtle-stroke p-[23px]">
      {/* Icon box */}
      <div className="flex h-[42px] min-w-[42px] items-center justify-center rounded-lg border border-subtle-stroke">
        <Image
          src={iconSrc}
          alt={iconAlt ?? name}
          width={25}
          height={25}
          className="w-[30px] h-[30px] object-contain"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold">{name}</span>
        <p className="text-sm text-tertiary-foreground">{description}</p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function IntegrationCardsSection({
  headerLayout = 'split',
  headingMuted,
  headingPrimary,
  headingMutedFirst = true,
  headingLineBreak = false,
  subtext,
  items,
}: IntegrationCardsContent) {
  const hasHeader = !!(headingMuted || headingPrimary)

  const mutedEl = headingMuted
    ? <span style={{ color: '#727b84' }}>{splitLines(headingMuted)}</span>
    : null
  const primaryEl = headingPrimary ? splitLines(headingPrimary) : null
  const sep = headingLineBreak ? <br /> : null

  const headingNode = hasHeader && (
    <h2 className="text-pretty text-heading-responsive-md">
      {headingMutedFirst
        ? <>{mutedEl}{sep}{primaryEl}</>
        : <>{primaryEl}{sep}{mutedEl}</>
      }
    </h2>
  )

  return (
    <section>
      <div className="container">
        <div className="border-subtle-stroke grid grid-cols-12 gap-x-6 pt-16 pb-16 lg:pt-24 lg:pb-24 xl:pt-32 xl:pb-32">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">

            {/* ── Optional header ───────────────────────────────── */}
            {hasHeader && (
              <div className="flex flex-col pb-10 lg:pb-16 xl:pb-24">
                {headerLayout === 'centered' ? (

                  /* Centered */
                  <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                    <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                      <div className="col-span-full">{headingNode}</div>
                      {subtext && (
                        <p className="col-span-full text-pretty text-lg lg:text-xl">{subtext}</p>
                      )}
                    </div>
                  </div>

                ) : (

                  /* Split (default) */
                  <div className="flex flex-col items-start">
                    <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                      <div className="col-span-full lg:col-span-5">{headingNode}</div>
                      {subtext && (
                        <p className="col-span-full text-pretty text-lg lg:col-start-7 lg:col-end-11 lg:text-xl">
                          {subtext}
                        </p>
                      )}
                    </div>
                  </div>

                )}
              </div>
            )}

            {/* ── Cards grid ──────────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <IntegrationCard key={i} {...item} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
