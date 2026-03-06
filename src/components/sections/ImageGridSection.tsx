import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ImageGridItem } from '@/data/image-grid'

// ─── Single image card ────────────────────────────────────────────────────────

function ImageCard({ item }: { item: ImageGridItem }) {
  return (
    <div>
      <Image
        src={item.imageSrc}
        alt={item.imageAlt ?? ''}
        width={item.imageWidth}
        height={item.imageHeight}
        className="rounded-3xl"
        loading="lazy"
      />
      <div className="mt-10 text-secondary-foreground">
        <div className="mr-5">
          <div className="font-semibold text-lg">{item.title}</div>
          <div className="mt-2.5">{item.description}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ImageGridSection({
  /** Gray-colored prefix of the heading, e.g. "Build" */
  headingMuted,
  /** Dark-colored part of the heading, e.g. " faster to go further." */
  headingPrimary,
  subtext,
  ctaLabel,
  ctaHref,
  items,
}: {
  headingMuted?: string
  headingPrimary?: string
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
  items: ImageGridItem[]
}) {
  const hasHeader = !!(headingMuted || headingPrimary)

  return (
    <section>
      <div className="container">
        <div
          className={cn(
            'border-subtle-stroke grid grid-cols-12 gap-x-6',
            'pt-10 lg:pt-16 xl:pt-24',
            // More bottom padding when there's no header above the grid
            hasHeader ? 'pb-10 lg:pb-16 xl:pb-24' : 'pb-16 lg:pb-24 xl:pb-32',
          )}
        >
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">

            {/* ── Optional header ────────────────────────────────── */}
            {hasHeader && (
              <div className="flex flex-col pb-10 lg:pb-16 xl:pb-24">
                <div className="mx-auto flex max-w-xl flex-col items-center text-center">

                  <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                    <div className="col-span-full">
                      <h2 className="text-pretty text-heading-responsive-md">
                        {headingMuted && (
                          <span style={{ color: '#727b84' }}>{headingMuted}</span>
                        )}
                        {headingPrimary && <span>{headingPrimary}</span>}
                      </h2>
                    </div>

                    {subtext && (
                      <p className="col-span-full text-pretty text-lg lg:text-xl">
                        {subtext}
                      </p>
                    )}
                  </div>

                  {/* CTA button */}
                  {ctaHref && ctaLabel && (
                    <div className="mt-6 flex w-full max-w-[345px] items-center justify-center gap-x-2.5 gap-y-2 max-md:flex-col md:w-auto md:max-w-none">
                      <Link
                        href={ctaHref}
                        className="button-outline relative inline-flex cursor-pointer items-center justify-center text-nowrap border h-10 gap-x-2 rounded-xl px-[13px] text-base transition-colors duration-300 ease-in-out hover:duration-50 active:duration-50"
                      >
                        {ctaLabel}
                      </Link>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* ── Image card grid ─────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ImageCard key={item.imageSrc} item={item} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
