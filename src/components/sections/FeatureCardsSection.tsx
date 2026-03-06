import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { FeatureCardsContent, FeatureCardItem } from '@/data/feature-cards'

// ─── Slide-in arrow (used on optional card links) ─────────────────────────────

function SlideArrow() {
  return (
    <svg
      className="inline-block -translate-x-[3px] -rotate-90 opacity-0 transition-[opacity,translate] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      xmlns="http://www.w3.org/2000/svg"
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      aria-hidden="true"
    >
      <path
        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75"
      />
    </svg>
  )
}

// ─── Single feature card ───────────────────────────────────────────────────────

function FeatureCard({ item }: { item: FeatureCardItem }) {
  return (
    <div>
      <div className="flex items-center gap-x-3 text-base text-secondary-foreground">
        <Image
          src={item.iconSrc}
          alt={item.iconAlt ?? ''}
          width={18} height={18}
          className="w-[18px] h-[18px] shrink-0"
        />
        <span>{item.label}</span>
      </div>

      <p className="mt-2.5 text-tertiary-foreground">{item.description}</p>

      {item.linkHref && item.linkLabel && (
        <a
          href={item.linkHref}
          {...(item.linkExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}
          )}
          className="group -ml-2 mt-2 inline-flex items-center gap-x-1 rounded-[10px] py-0.5 pr-0.5 pl-2 text-fg-link transition-shadow duration-200 ease-out focus-visible:bg-secondary-background focus-visible:outline-hidden focus-visible:ring-3 focus-visible:active:ring-3"
        >
          {item.linkLabel}
          <SlideArrow />
        </a>
      )}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeatureCardsSection({ heading, subtext, items }: FeatureCardsContent) {
  const hasHeader = !!(heading || subtext)
  return (
    <section>
      <div className="container">
        <div className={cn(
          'border-subtle-stroke grid grid-cols-12 gap-x-6 pb-16 lg:pb-24 xl:pb-32',
          hasHeader ? 'pt-16 lg:pt-24 xl:pt-32' : 'pt-0',
        )}>
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">

            {/* ── Left-aligned header (optional) ─────────────── */}
            {(heading || subtext) && (
              <div className="flex flex-col pb-10 lg:pb-16 xl:pb-24">
                <div className="flex max-w-xl flex-col items-start">
                  <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                    {heading && (
                      <div className="col-span-full">
                        <h2 className="text-pretty text-heading-responsive-md">{heading}</h2>
                      </div>
                    )}
                    {subtext && (
                      <p className="col-span-full text-pretty text-lg lg:text-xl">{subtext}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Cards grid ──────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-[60px] xl:gap-x-[83px] xl:gap-y-20">
              {items.map((item, i) => (
                <FeatureCard key={i} item={item} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
