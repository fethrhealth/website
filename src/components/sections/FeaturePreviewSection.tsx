import Image from 'next/image'

/**
 * FeaturePreviewSection
 *
 * Full-width "Step inside X" section — pixel-faithful to attio.com.
 * Header grid with heading + inline description, a hairline divider,
 * and a horizontally-scrollable large screenshot on a diagonal-stripe background.
 *
 * Usage:
 *   <FeaturePreviewSection
 *     heading="Step inside Sequences."
 *     description="Convert warm signals into outreach that closes itself."
 *     imageSrc="/assets/images/platform/sequences/preview.webp"
 *     imageAlt="Sequences UI preview"
 *     imageWidth={2880}
 *     imageHeight={1800}
 *   />
 */

interface FeaturePreviewSectionProps {
  heading: string
  description: string
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
}

export function FeaturePreviewSection({
  heading,
  description,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
}: FeaturePreviewSectionProps) {
  return (
    <div className="container flex flex-1 flex-col max-lg:contents">
      <div className="flex w-full flex-1 flex-col border-x border-subtle-stroke max-lg:border-none">

        {/* ── Header ── */}
        <header className="grid grid-cols-12 justify-items-start pt-40 pb-20 max-xl:pt-30 max-xl:pb-16 max-lg:pt-25 max-lg:pb-15">
          <div className="col-[2/-2] max-w-[20em] text-pretty text-start text-heading-responsive-sm mix-blend-multiply dark:mix-blend-screen">
            <h2 className="inline text-pretty">{heading}</h2>
            {' '}
            <p className="inline text-pretty font-medium text-black-800">{description}</p>
          </div>
        </header>

        {/* ── Hairline divider ── */}
        <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden>
          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
        </svg>

        {/* ── Screenshot area ── */}
        <div className="scrollbar-none relative overflow-x-auto bg-secondary-background px-[8.3333%] py-20">
          {/* Diagonal stripe background */}
          <div
            className="pointer-events-none absolute inset-0 text-surface-subtle"
            aria-hidden
            style={{
              backgroundImage:
                'repeating-linear-gradient(125deg, transparent, transparent 6px, currentColor 6px, currentColor 7px)',
            }}
          />

          {/* Screenshot */}
          <div className="relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="w-full rounded-xl"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
