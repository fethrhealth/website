import Image from 'next/image'
import { HOME_COMPANY_LOGOS, type CompanyLogo } from '@/data/company-logos'

// ─── Section ──────────────────────────────────────────────────────────────────

export function CompaniesSection({
  logos = HOME_COMPANY_LOGOS,
  heading,
}: {
  logos?: CompanyLogo[]
  /**
   * Texto pequeño opcional encima de los logos, e.g. "Trusted by leading teams".
   * Si no se pasa, no se renderiza nada.
   */
  heading?: string
}) {
  return (
    <div className="container">
      <div>
        <div className="grid grid-cols-12 justify-items-center py-[100px]">
          <div className="col-start-2 col-end-[-2]">

            {/* Optional heading */}
            {heading && (
              <p className="mb-8 text-center text-sm font-semibold text-fg-caption">
                {heading}
              </p>
            )}

            {/*
              Responsive grid:
                desktop  → 6 cols
                xl↓      → 4 cols
                md↓      → 3 cols   + hide items after the 9th (fills 3×3)

              gap-y-4.5 (18px) → gap-y-[18px] (Tailwind v4 → v3)
              py-25 (100px)    → py-[100px]   (Tailwind v4 → v3)
            */}
            <div
              className={[
                'grid max-w-7xl',
                'grid-cols-6 gap-x-8 gap-y-[18px]',
                'max-xl:grid-cols-4 max-xl:gap-y-5',
                'max-lg:gap-x-5 max-lg:gap-y-3',
                'max-md:grid-cols-3 max-md:gap-x-4 max-md:gap-y-2',
                // Hide logos after the 9th on mobile (fills 3×3 grid cleanly)
                'max-md:[&>*:nth-child(n+10)]:hidden',
              ].join(' ')}
            >
              {logos.map((logo) => (
                <Image
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="size-full h-12 object-contain max-xl:h-10"
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
