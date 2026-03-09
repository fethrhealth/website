/**
 * EnrichmentSection
 *
 * Three-column feature grid with dotted background pattern + images.
 * Used on /platform/data.
 *
 * Images — place these files in public/:
 *   public/assets/images/platform/data/enrichment-new.png        (1472 × 1008)
 *   public/assets/images/platform/data/relationship-intelligence.png (1820 × 1820)
 *   public/assets/images/platform/data/data-powered-workflows.png  (2000 × 2000)
 */

import Image from 'next/image'

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    id: 'enr1',
    image: '/assets/images/platform/data/enrichment/record-enriched.webp',
    imageWidth: 1472,
    imageHeight: 1008,
    title: 'Every record, enriched.',
    description: 'Revenue to location, employee count, company size, and more.',
  },
  {
    id: 'enr2',
    image: '/assets/images/platform/data/enrichment/customer-conversations.webp',
    imageWidth: 1820,
    imageHeight: 1820,
    title: 'Customer conversations in context.',
    description:
      'Your team gets live customer context from every email, meeting, record, and more.',
  },
  {
    id: 'enr3',
    image: '/assets/images/platform/data/enrichment/data-powered.webp',
    imageWidth: 2000,
    imageHeight: 2000,
    title: 'Data-powered workflows.',
    description:
      'Automate your go-to-market decisions based on the most reliable dataset in the industry.',
  },
] as const

// ─── Section ──────────────────────────────────────────────────────────────────

export function EnrichmentSection() {
  return (
    <div className="container flex flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <header className="grid grid-cols-12 justify-items-start pt-40 pb-20 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15">
          <div className="col-[2/-2] max-w-[20em] text-pretty text-start text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
            <h2 className="inline text-pretty">
              Automatic enrichment, automatic advantage.
            </h2>{' '}
            <p className="inline text-pretty font-medium text-black-800">
              Get the context you need for every prospect, automatically drawn from 100s of sources and pre-analyzed by AI.
            </p>
          </div>
        </header>

        {/* ── Feature grid ─────────────────────────────────────────────────── */}
        <div className="relative grid grid-cols-12">

          {/* Dashed vertical guide lines that extend above the grid */}
          <div
            aria-hidden
            className="absolute -top-5 h-5 w-full overflow-hidden grid grid-cols-12 max-xl:h-30 max-lg:h-25"
          >
            <div className="col-[2/-2] flex justify-between">
              <svg width="1" height="100%" className="text-subtle-stroke">
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
              <svg width="1" height="100%" className="text-subtle-stroke">
                <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Top dashed horizontal rule */}
          <svg width="100%" height="1" className="absolute top-0 text-subtle-stroke" aria-hidden>
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>

          {/* Diagonal hatching background */}
          <div
            aria-hidden
            className="absolute inset-0 size-full text-surface-subtle"
            style={{ backgroundImage: 'repeating-linear-gradient(125deg, transparent, transparent 6px, currentColor 6px, currentColor 7px)' }}
          />

          {/* Cards */}
          <div className="relative col-[2/-2]">
            <div className="grid grid-cols-3 gap-px bg-subtle-stroke p-px max-lg:grid-cols-1">
              {ITEMS.map((item) => (
                <div key={item.id} className="grid grid-cols-12 bg-primary-background">
                  <div className="col-[2/-2] flex flex-col py-7">

                    {/* Image with dotted background */}
                    <div className="relative mb-6 aspect-square w-full">
                      {/* Dot-grid pattern */}
                      <svg width="100%" height="100%" className="absolute inset-0 text-muted-strong-bg" aria-hidden>
                        <defs>
                          <pattern id={item.id} width="10" height="10" patternUnits="userSpaceOnUse">
                            <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#${item.id})`} />
                      </svg>
                      <Image
                        src={item.image}
                        alt=""
                        width={item.imageWidth}
                        height={item.imageHeight}
                        loading="eager"
                        className="absolute inset-0 size-full object-contain"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex flex-1 flex-col justify-between">
                      <h3 className="text-balance font-semibold text-lg text-secondary-foreground lg:max-xl:text-base max-md:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-balance text-accent-foreground lg:max-xl:text-sm max-md:text-sm">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom dashed horizontal rule */}
          <svg width="100%" height="1" className="absolute bottom-0 text-subtle-stroke" aria-hidden>
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>

        </div>
      </div>
    </div>
  )
}
