/**
 * PartnersSection — Lista de tipos de partner con imagen decorativa.
 * Pixel-perfect adaptation of attio.com's partners section.
 *
 * Datos: src/data/partners.ts
 * Imágenes: /public/partners/*.svg
 *
 * Uso:
 *   <PartnersSection />
 */

import Image from "next/image";
import Link from "next/link";
import { PARTNERS, type PartnerType } from "@/data/partners-list";
import Divider from "../ui/divider";

// ---------------------------------------------------------------------------
// Horizontal divider between cards
// ---------------------------------------------------------------------------

function HorizontalRule() {
  return (
    <svg width="100%" height="1" className="text-subtle-stroke" aria-hidden="true">
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Decorative grid lines inside the image panel (right side of each card).
// Replicates attio.com's 6-col × 9-row decoration grid exactly.
// ---------------------------------------------------------------------------

function ImagePanelDecoration() {
  return (
    <div
      className="absolute inset-0"
      // CSS Grid: 6 cols × 9 rows — used to position line groups as absolute
      // children whose containing block becomes their grid area (CSS spec).
      style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(9, 1fr)" }}
      aria-hidden="true"
    >
      {/* Group 1 — 3 dashed verticals: full height, inner horizontal zone (col 2/-2) */}
      <div
        className="flex justify-between"
        style={{ gridColumn: "2 / -2", gridRow: "1 / -1", position: "absolute", inset: 0 }}
      >
        {[0, 1, 2].map((i) => (
          <svg key={i} width="1" height="100%" className="text-subtle-stroke">
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>
        ))}
      </div>

      {/* Group 2 — 5 solid verticals: inner zone (col 2/-2, row 2/-2) */}
      <div
        className="flex justify-between"
        style={{ gridColumn: "2 / -2", gridRow: "2 / -2", position: "absolute", inset: 0 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} width="1" height="100%" className="text-subtle-stroke">
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
          </svg>
        ))}
      </div>

      {/* Group 3 — 8 horizontal lines: full width, inner vertical zone (row 2/-2) */}
      <div
        className="flex flex-col justify-between"
        style={{ gridColumn: "1 / -1", gridRow: "2 / -2", position: "absolute", inset: 0 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <svg key={i} width="100%" height="1" className="text-subtle-stroke">
            <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeLinecap="round" />
          </svg>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single partner card
// ---------------------------------------------------------------------------

function PartnerCard({ partner }: { partner: PartnerType }) {
  // Each card gets a unique SVG pattern ID to avoid clashes when multiple
  // cards are rendered on the same page.
  const dotPatternId = `partner-dots-${partner.index}`;

  return (
    // Heights: h-[400px] desktop | max-xl:h-96 (384px) tablet | max-lg:h-[336px] mobile
    // (h-100 and h-84 are Tailwind v4 — using explicit px values for v3)
    <div className="relative grid h-[400px] grid-cols-12 overflow-hidden max-xl:h-96 max-lg:h-[336px]">

      {/* ── Right panel background (desktop only) ─────────────────────
          absolute + grid-column-start/end defines the containing block
          so size-full fills exactly col 7 → end.
          col-end-[-1] = last grid line (Tailwind v3 arbitrary value).  */}
      <div className="absolute size-full bg-secondary-background col-start-7 col-end-[-1] max-lg:hidden" />

      {/* ── Dot-grid SVG — col 1/2 sets its absolute containing block ─── */}
      <svg
        width="100%"
        height="100%"
        className="text-muted-strong-background absolute inset-0 col-start-1 col-end-2 max-lg:hidden"
        aria-hidden="true"
      >
        <defs>
          <pattern id={dotPatternId} width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${dotPatternId})`} />
      </svg>

      {/* ── Vertical separator at col-2 boundary ─────────────────────── */}
      <svg
        width="1"
        height="100%"
        className="text-subtle-stroke absolute inset-y-0 col-start-2 max-lg:hidden"
        aria-hidden="true"
      >
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>

      {/* ── Vertical separator at col-7 boundary ─────────────────────── */}
      <svg
        width="1"
        height="100%"
        className="text-subtle-stroke absolute inset-y-0 col-start-7 -translate-x-1/2 max-lg:hidden"
        aria-hidden="true"
      >
        <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeLinecap="round" />
      </svg>

      {/* ── Text content panel ────────────────────────────────────────
          Desktop:  col 2 → 7   (5 of 12 columns)
          Mobile:   col 2 → -2  (full width minus outer gutters)

          IMPORTANT: no inline style here — all col placement via Tailwind
          so that max-lg variants can correctly override desktop values.
          col-end-[-2] = second-to-last grid line = "col-[2/-2]" in Attio.  */}
      {/* col-span-full en mobile = ocupa las 12 columnas (izquierda a derecha) */}
      <div className="relative flex flex-col justify-between px-6 py-6 lg:px-10 lg:py-10 col-start-2 col-end-7 max-lg:col-span-full">

        {/* Overline: "01 / App partners" */}
        <h2 className="text-overline">
          {partner.index} / {partner.label}
        </h2>

        {/* Heading: dark title + muted description */}
        <p className="text-balance text-heading-responsive-sm">
          <span>{partner.titleBold}</span>{" "}
          {/* text-black-800 = #8f99a8 — the muted gray second span */}
          <span className="font-medium text-black-800">{partner.titleMuted}</span>
        </p>

        {/* CTA button
            h-[46px] = Tailwind v4's h-11.5 → explicit px value for v3  */}
        <Link
          href={partner.ctaHref}
          className="button-outline border w-fit inline-flex cursor-pointer items-center justify-center rounded-[10px] px-3 text-sm h-9 max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base"
        >
          {partner.ctaLabel}
        </Link>
      </div>

      {/* ── Image panel (right side, desktop only) ────────────────────
          col-start-7 col-end-[-1] mirrors the background div's grid area. */}
      <div className="relative flex size-full col-start-7 col-end-[-1] max-lg:hidden">
        <ImagePanelDecoration />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            alt={partner.imageAlt}
            src={partner.imageSrc}
            width={400}
            height={400}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

export function PartnersSection() {
  return (
    <div className="container">
      {/* border-x creates the left/right sidebar borders */}
      {/* isolate creates a stacking context for the absolute overlays */}
      <div className="isolate border-x border-subtle-stroke">
        {PARTNERS.map((partner, i) => (
          <div key={partner.index}>
            {i > 0 && <HorizontalRule />}
            <PartnerCard partner={partner} />
          </div>
        ))}

        <Divider/>

        {/* Bottom spacer — h-40 desktop | h-[120px] tablet | h-[100px] mobile
            (max-xl:h-30 and max-lg:h-25 are Tailwind v4 → explicit px in v3) */}
        <div
          aria-hidden="true"
          className="grid h-40 w-full grid-cols-12 overflow-hidden max-xl:h-[120px] max-lg:h-[100px]"
        >
          <div className="col-start-2 col-end-[-2] flex justify-between" />
        </div>
      </div>
    </div>
  );
}
