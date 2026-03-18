"use client";

/**
 * PartnersHeroSection
 *
 * Hero for /partners. Matches attio.com's partners page hero exactly:
 *   - border-x side lines (border-subtle-stroke)
 *   - Dot-pattern background visible only near the bottom (gradient mask)
 *   - badge chip → h2 heading → subheading
 *   - Attio spacing: pt-30 / max-xl:pt-25 / max-lg:pt-20 · pb-24 lg:pb-28 xl:pb-32
 *
 * To adjust the dot gradient:
 *   maskImage below — change the two stop percentages:
 *     transparent → 55% = dots invisible above this point  (raise → appear lower)
 *     black       → 100% = dots fully opaque at the bottom
 */

import { useId } from "react";
import { motion } from "framer-motion";

const EASE_EMPHASIZED = [0.2, 0, 0, 1] as const;

export function PartnersHeroSection() {
  const patternId = `partners-hero-dots-${useId().replace(/:/g, "-")}`;

  return (
    <section>
      <div className="container">

        {/* Inner wrapper — border-x creates the side decorative lines */}
        <div className="relative isolate border-x border-subtle-stroke">

          {/* Dot-pattern background
              Gradient mask: invisible above 55%, fades in from 55% → 100%.
              Change 55% to push the dots lower or higher. */}
          <svg
            width="100%" height="100%"
            className="text-muted-strong-background absolute inset-0"
            style={{
              maskImage:       "linear-gradient(to bottom, transparent 55%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 100%)",
            }}
            aria-hidden
          >
            <defs>
              <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
                <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>

          {/* Content */}
          <div className="relative z-20 grid grid-cols-12">
            <div className="relative col-[2/-2]">

              <header className="flex w-full flex-col items-center pt-30 max-xl:pt-25 max-lg:pt-20 pb-24 lg:pb-28 xl:pb-32">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_EMPHASIZED }}
                  className="mb-6 inline-block w-fit rounded-[13px] border border-weak-stroke bg-primary-background px-3 py-1.5 font-medium text-[13px]/[1.4em] text-secondary-foreground"
                >
                  <h1>Partner programs</h1>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: EASE_EMPHASIZED }}
                  className="max-w-[15em] text-balance text-center text-heading-responsive-lg"
                >
                  Partner with us to build the next generation of CRM.
                </motion.h2>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE_EMPHASIZED }}
                  className="mt-4 max-w-xl text-balance text-center text-lg text-secondary-foreground lg:text-xl"
                >
                  We work with the best developers, creators, and consultants to power the next era of companies.
                </motion.p>

              </header>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
