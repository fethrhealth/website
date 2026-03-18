"use client";

/**
 * PageHero — Reusable page-header hero section.
 * Pixel-perfect adaptation of attio.com's page hero.
 *
 * Covers three variants in one component:
 *   • No buttons  → badge + heading + subheading
 *   • 1 button    → + primaryCta
 *   • 2 buttons   → + primaryCta + secondaryCta + mobile email form
 *
 * Spacing (paddingTop / paddingBottom) is configurable per page via
 * Tailwind class strings passed as props.
 *
 * Usage examples:
 *
 *   // No buttons (startups page)
 *   <PageHero
 *     badge="Startup program"
 *     heading="Fethr for startups."
 *     subheading="Get 80% off and benefits to help your startup grow."
 *   />
 *
 *   // 1 button (refer page)
 *   <PageHero
 *     badge="Referral program"
 *     heading="Gift teams 10% off. Earn exclusive rewards."
 *     subheading="Refer more teams, gift them 10% off, and earn exclusive rewards."
 *     primaryCta={{ label: "Start referring", href: "/refer/start" }}
 *     paddingBottom="pb-10 lg:pb-16 xl:pb-24"
 *   />
 *
 *   // 2 buttons
 *   <PageHero
 *     heading="Customer relationship magic."
 *     subheading="Fethr is the AI CRM for clinical teams."
 *     primaryCta={{ label: "Start for free", href: "/signup" }}
 *     secondaryCta={{ label: "Talk to sales", href: "/contact" }}
 *     mobileCta="Send me a demo"
 *   />
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { DemoRequestForm } from "../ui/DemoRequestForm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroCta {
  label: string;
  href: string;
}

export interface PageHeroProps {
  /**
   * Small chip/badge rendered above the heading.
   * Attio semantics: the badge text is wrapped in <h1> when headingAs="h2",
   * so the page still has a proper h1 for SEO.
   */
  badge?: string;

  /** Main visual heading. */
  heading: string;

  /**
   * Semantic heading element for the main heading text.
   * Defaults to "h2" when a badge is provided (badge becomes the h1),
   * "h1" otherwise.
   */
  headingAs?: "h1" | "h2";

  /** Paragraph below the heading. */
  subheading?: string;

  /**
   * Primary CTA button — shown on desktop.
   * Also triggers the mobile email form when provided.
   */
  primaryCta?: HeroCta;

  /**
   * Secondary outline button — desktop only.
   * Only rendered when primaryCta is also set.
   */
  secondaryCta?: HeroCta;

  /**
   * Label for the submit button on the mobile email form.
   * Defaults to "Send me a demo". Only shown when primaryCta is set.
   */
  mobileCta?: string;

  /**
   * Source identifier passed to DemoRequestForm — stored in Payload CMS.
   * E.g. "refer-hero", "startups-hero". Only used when primaryCta is set.
   */
  mobileFormSource?: string;

  /**
   * Href for the ghost "Talk to sales" button in the mobile form.
   * Pass null to hide it. Defaults to null (hidden).
   */
  mobileFormSalesHref?: string | null;

  /**
   * Tailwind padding-top class(es) for the outer grid wrapper.
   * Default: "pt-16 lg:pt-24 xl:pt-32"
   */
  paddingTop?: string;

  /**
   * Tailwind padding-bottom class(es) for the outer grid wrapper.
   * Default: "" (no bottom padding — add it on pages that need it)
   */
  paddingBottom?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Framer Motion ease matching attio.com's emphasized curve */
const EASE_EMPHASIZED = [0.2, 0, 0, 1] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PageHero({
  badge,
  heading,
  headingAs,
  subheading,
  primaryCta,
  secondaryCta,
  mobileCta          = "Send me a demo",
  mobileFormSource,
  mobileFormSalesHref = null,
  paddingTop          = "pt-16 lg:pt-24 xl:pt-32",
  paddingBottom       = "",
}: PageHeroProps) {
  // Resolve heading element — default to h2 when badge exists (badge is the h1)
  const HeadingTag = headingAs ?? (badge ? "h2" : "h1");

  const hasCtas = Boolean(primaryCta);

  return (
    <section>
      <div className="container">
        {/* Outer grid — padding controlled by props */}
        <div
          className={[
            "grid grid-cols-12 gap-x-6",
            paddingTop,
            paddingBottom,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="col-span-12 xl:col-start-2 xl:col-end-12">
            {/*
              header with !py-0 to override the pt-30 pb-15 that attio.com uses
              (those values are overridden by !py-0 in the original too)
            */}
            <header className="flex w-full flex-col items-center py-0">

              {/* ── Badge chip ─────────────────────────────────── */}
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_EMPHASIZED }}
                  className="mb-6 inline-block w-fit rounded-[13px] border border-weak-stroke bg-primary-background px-3 py-1.5 font-medium text-[13px]/[1.4em] text-secondary-foreground"
                >
                  {/*
                    Attio wraps the badge text in <h1> when the main heading
                    is <h2> — keeps the page h1 in the DOM for SEO even though
                    the badge looks small visually.
                  */}
                  {HeadingTag === "h2" ? <h1>{badge}</h1> : <span>{badge}</span>}
                </motion.div>
              )}

              {/* ── Main heading ───────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE_EMPHASIZED }}
              >
                <HeadingTag className="max-w-[15em] text-balance text-center text-heading-responsive-lg">
                  {heading}
                </HeadingTag>
              </motion.div>

              {/* ── Subheading ─────────────────────────────────── */}
              {subheading && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE_EMPHASIZED }}
                  className="mt-4 max-w-xl text-balance text-center text-lg text-secondary-foreground lg:text-xl"
                >
                  {subheading}
                </motion.p>
              )}

              {/* ── CTA buttons ────────────────────────────────── */}
              {hasCtas && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18, ease: EASE_EMPHASIZED }}
                  className="mt-6 flex w-full items-center justify-center gap-x-2.5 gap-y-2 max-md:flex-col max-md:items-center"
                >
                  {/* Primary button — desktop only */}
                  {primaryCta && (
                    <Link
                      href={primaryCta.href}
                      className="button-primary relative inline-flex cursor-pointer items-center justify-center rounded-[10px] px-3 text-sm h-9 max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
                    >
                      {primaryCta.label}
                    </Link>
                  )}

                  {/* Secondary outline button — desktop only */}
                  {primaryCta && secondaryCta && (
                    <Link
                      href={secondaryCta.href}
                      className="button-outline border relative inline-flex cursor-pointer items-center justify-center rounded-[10px] px-3 text-sm h-9 max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
                    >
                      {secondaryCta.label}
                    </Link>
                  )}

                  {/* Mobile: email form — hidden on md+, only when primaryCta is set */}
                  {primaryCta && (
                    <DemoRequestForm
                      submitLabel={mobileCta}
                      source={mobileFormSource}
                      salesHref={mobileFormSalesHref}
                      className="max-w-xs md:hidden"
                    />
                  )}
                </motion.div>
              )}

            </header>
          </div>
        </div>
      </div>
    </section>
  );
}
