"use client";

/**
 * FaqSection — Reusable accordion FAQ section.
 * Pixel-perfect adaptation of attio.com's FAQ section.
 *
 * Pass a different `items` array on each page:
 *   <FaqSection items={STARTUPS_FAQ} />
 *   <FaqSection items={REFER_FAQ} heading="Got questions about referring?" />
 *
 * Data: src/data/faq.ts
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqSectionProps } from "@/data/faq";

// ---------------------------------------------------------------------------
// Custom +/– icon — replicates attio.com's bracket-style accordion toggle
// ---------------------------------------------------------------------------

function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="19.2"
      height="12"
      strokeWidth="1.5"
      stroke="currentColor"
      // mt-1.25 is Tailwind v4 → mt-[5px] in v3
      // group-data-open: is Tailwind v4 → group-data-[state=open]: in v3
      // duration-400 not in v3 default scale → duration-[400ms]
      className="mt-[5px] shrink-0 text-white-900 transition-colors duration-[400ms] ease-in-out group-hover:text-black-800 group-hover:duration-150 group-active:text-black-800 group-data-[state=open]:text-black-800"
      aria-hidden="true"
    >
      {/* Left bracket */}
      <line x1="0"    y1="0.75"  x2="20%"  y2="0.75" />
      <line x1="0.75" y1="0"    x2="0.75"  y2="100%" />
      <line x1="0"    y1="11.25" x2="20%"  y2="11.25" />

      {/* Horizontal dash */}
      <line x1="6"    y1="50%"  x2="13.2"  y2="50%" />

      {/* Vertical dash — shrinks to zero when open (+ → –) */}
      {/* transition-scale is Tailwind v4 → inline style in v3 */}
      <line
        x1="50%"
        y1="2.4"
        x2="50%"
        y2="9.6"
        style={{
          transformOrigin: "center",
          transform: isOpen ? "scaleY(0)" : "scaleY(1)",
          transition: "transform 0.4s ease-in-out",
        }}
      />

      {/* Right bracket */}
      <line x1="80%"    y1="0.75"  x2="100%"  y2="0.75" />
      <line x1="18.45"  y1="0"    x2="18.45"  y2="100%" />
      <line x1="80%"    y1="11.25" x2="100%"  y2="11.25" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function FaqSection({
  heading = "Frequently asked questions",
  items,
}: FaqSectionProps) {
  // Only one item open at a time (matches attio.com behaviour)
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6 pb-16 lg:pb-24 xl:pb-32">
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">
            <div className="mx-auto max-w-2xl space-y-4 lg:space-y-6">

              {/* Section heading */}
              <h2
                id="faq"
                className="pr-6 text-heading-responsive-md text-secondary-foreground"
              >
                {heading}
              </h2>

              {/* Accordion list */}
              <div>
                {items.map((item) => {
                  const isOpen = openId === item.id;

                  return (
                    <div
                      key={item.id}
                      id={item.id}
                      data-state={isOpen ? "open" : "closed"}
                      className="relative border-b border-weak-stroke py-7 text-base"
                    >
                      <h3>
                        {/* Trigger button — `group` enables child hover selectors */}
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-content-${item.id}`}
                          data-state={isOpen ? "open" : "closed"}
                          onClick={() => toggle(item.id)}
                          // outline-hidden is Tailwind v4 → outline-none in v3
                          // focus-visible:ring-3 is Tailwind v4 → focus-visible:ring-[3px] in v3
                          // w-[calc(100%+12px)] matches attio.com exactly
                          className="group -mx-2 -my-1.5 flex w-[calc(100%+12px)] cursor-pointer items-start justify-between gap-x-6 rounded-xl px-2 py-1.5 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/40"
                        >
                          <span className="font-semibold text-secondary-foreground">
                            {item.question}
                          </span>

                          <AccordionIcon isOpen={isOpen} />
                        </button>
                      </h3>

                      {/* Answer panel — animated height via Framer Motion */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-content-${item.id}`}
                            role="region"
                            aria-labelledby={item.id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.65, 0, 0.35, 1],
                            }}
                            className="overflow-hidden"
                          >
                            {/* pr-2 lg:pr-16 matches attio.com content indentation */}
                            <div
                              className="pr-2 pt-3 text-base text-fg-secondary lg:pr-16"
                              // answer may contain simple HTML (<strong>, <a>, <br>)
                              // content is developer-authored, not user input
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
