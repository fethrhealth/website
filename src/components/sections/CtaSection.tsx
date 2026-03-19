"use client";

/**
 * CtaSection — Mosaic avatar grid + heading + CTA buttons.
 * Pixel-perfect adaptation of attio.com's CTA section.
 *
 * Avatar photos: /public/avatars/avatar-01.jpg … avatar-N.jpg
 * Content / data: src/data/cta-avatars.ts
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CTA_AVATARS, CTA_CONTENT, type CtaAvatar } from "@/data/cta-avatars";
import { DemoRequestForm } from "../ui/DemoRequestForm";

// ---------------------------------------------------------------------------
// Grid layout constants
// ---------------------------------------------------------------------------

/** Number of columns in the mosaic grid */
const COLUMNS = 52;

/** Number of columns in the mobile mosaic grid */
const COLUMNS_MOBILE = 11;

/** Number of columns in the md mosaic grid */
const COLUMNS_MD = 15;

/** Number of columns in the lg mosaic grid */
const COLUMNS_LG = 38;

/** Build a boolean row where every `step`-th column (starting at `offset`) has an avatar */
function sparseRow(step: number, offset = 0): boolean[] {
  return Array.from({ length: COLUMNS }, (_, i) => (i + offset) % step === 0);
}

/** Build a boolean row where every other column has an avatar */
function alternatingRow(offset = 0): boolean[] {
  return Array.from({ length: COLUMNS }, (_, i) => (i + offset) % 2 === 0);
}

type RowBlock =
  | { type: "empty"; count: number }
  | { type: "avatar"; count: number };

const GRID_STRUCTURE: RowBlock[][] = [
  [
    { type: "empty", count: 3 },
    { type: "avatar", count: 18 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 7 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 16 },
    { type: "empty", count: 4 },
  ],
  [
    { type: "empty", count: 2 },
    { type: "avatar", count: 22 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 14 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 7 },
    { type: "empty", count: 3 },
  ],
  [
    { type: "empty", count: 3 },
    { type: "avatar", count: 6 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 24 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 10 },
    { type: "empty", count: 3 },
  ],
  [
    { type: "empty", count: 2 },
    { type: "avatar", count: 42 },
    { type: "empty", count: 2 },
    { type: "avatar", count: 2 },
    { type: "empty", count: 2 },
  ],
  [
    { type: "empty", count: 3 },
    { type: "avatar", count: 17 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 7 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 7 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 10 },
    { type: "empty", count: 3 },
  ],
  [
    { type: "empty", count: 1 },
    { type: "avatar", count: 3 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 3 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 2 },
    { type: "empty", count: 5 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 2 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 9 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 7 },
    { type: "avatar", count: 5 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 2 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
  ],
  [
    { type: "empty", count: 2 },
    { type: "avatar", count: 4 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 31 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 2 },
    { type: "empty", count: 2 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 4 },
  ],
  [
    { type: "empty", count: 2 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 2 },
    { type: "empty", count: 37 },
    { type: "avatar", count: 2 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 3 },
  ],
  [
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 40 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 1 },
  ],
  [
    { type: "empty", count: 3 },
    { type: "avatar", count: 1 },
    { type: "empty", count: 46 },
  ],
];

/**
 * Mobile mosaic layout — 6 columns, 16 rows.
 * Dense in the middle, sparse at top/bottom to create an organic oval shape.
 * Each row must sum to COLUMNS_MOBILE (6).
 */
const GRID_STRUCTURE_MOBILE: RowBlock[][] = [
  [{ type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 3 }, { type: "avatar", count: 1 }, { type: "empty", count: 2 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 1 }, { type: "empty", count: 2 }, { type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "empty", count: 1 }, { type: "avatar", count: 6 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 11 }],
  [{ type: "empty", count: 1 }, { type: "avatar", count: 8 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 9 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 8 }, { type: "empty", count: 1 }],
  [{ type: "avatar", count: 9 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 10 }, { type: "empty", count: 1 }],
  [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 7 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 7 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 10 }, { type: "empty", count: 1 }],
  [{ type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 5 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }],
  [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 2 }, { type: "avatar", count: 4 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
  [{ type: "avatar", count: 4 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 2 }, { type: "avatar", count: 1 }],
  [{ type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }],
];

/**
 * Md mosaic layout — 15 columns, 10 rows.
 * Dense in the middle rows, sparse at top/bottom. Each row must sum to COLUMNS_MD (15).
 */
const GRID_STRUCTURE_MD: RowBlock[][] = [
    [{ type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 7 }, { type: "avatar", count: 1 }, { type: "empty", count: 2 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 1 }, { type: "empty", count: 2 }, { type: "avatar", count: 2 }, { type: "empty", count: 4 }, { type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "empty", count: 1 }, { type: "avatar", count: 3 }, { type: "empty", count: 1 }, { type: "avatar", count: 4 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 12 }],
    [{ type: "empty", count: 1 }, { type: "avatar", count: 12 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 8 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 12 }, { type: "empty", count: 1 }],
    [{ type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 10 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 14 }, { type: "empty", count: 1 }],
    [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 11 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 11 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 12 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }],
    [{ type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 12 }],
    [{ type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 2 }, { type: "avatar", count: 6 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }],
    [{ type: "avatar", count: 4 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 2 }, { type: "avatar", count: 2 }],
    [{ type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 3 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 2 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }],
  ];

/**
 * Lg mosaic layout — 38 columns, 10 rows.
 * Rows 0-4: dense (many avatars). Rows 5-9: sparse (few avatars spread wide,
 * masked by the left/right gradient that's active at lg+).
 * Each row sums to COLUMNS_LG (38).
 */
const GRID_STRUCTURE_LG: RowBlock[][] = [
  [{ type: "empty", count: 2 }, { type: "avatar", count: 13 }, { type: "empty", count: 1 }, { type: "avatar", count: 5 }, { type: "empty", count: 1 }, { type: "avatar", count: 12 }, { type: "empty", count: 3 }, { type: "avatar", count: 1 }],
  [{ type: "empty", count: 1 }, { type: "avatar", count: 16 }, { type: "empty", count: 1 }, { type: "avatar", count: 10 }, { type: "empty", count: 1 }, { type: "avatar", count: 5 }, { type: "empty", count: 2 }, { type: "avatar", count: 2 }],
  [{ type: "empty", count: 2 }, { type: "avatar", count: 4 }, { type: "empty", count: 1 }, { type: "avatar", count: 18 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 7 }, { type: "empty", count: 3 }],
  [{ type: "empty", count: 1 }, { type: "avatar", count: 31 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 2 }, { type: "avatar", count: 1 }],
  [{ type: "empty", count: 2 }, { type: "avatar", count: 12 }, { type: "empty", count: 1 }, { type: "avatar", count: 5 }, { type: "empty", count: 1 }, { type: "avatar", count: 5 }, { type: "empty", count: 1 }, { type: "avatar", count: 7 }, { type: "empty", count: 4 }],
  [{ type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 4 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 7 }, { type: "avatar", count: 1 }, { type: "empty", count: 4 }, { type: "avatar", count: 3 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 5 }, { type: "avatar", count: 2 }],
  [{ type: "empty", count: 2 }, { type: "avatar", count: 3 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 24 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 3 }],
  [{ type: "empty", count: 2 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 2 }, { type: "empty", count: 29 }, { type: "avatar", count: 2 }, { type: "empty", count: 1 }],
  [{ type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 28 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }, { type: "avatar", count: 1 }, { type: "empty", count: 1 }],
  [{ type: "empty", count: 3 }, { type: "avatar", count: 1 }, { type: "empty", count: 34 }],
];

// ---------------------------------------------------------------------------
// Grid cell types + builder
// ---------------------------------------------------------------------------

type EmptyCell = { kind: "empty" };
type AvatarCell = { kind: "avatar"; avatar: CtaAvatar; delay: number };
type GridCell = EmptyCell | AvatarCell;

/**
 * Deterministic stagger delay (ms) — avoids Math.random() which causes
 * hydration mismatches in Next.js SSR.
 */
function cellDelay(rowIdx: number, colIdx: number): number {
  return 200 + ((rowIdx * 13 + colIdx * 7) % 650);
}

/**
 * Pre-computed at module level so the grid is never rebuilt on re-render.
 * Avatars are cycled if there are fewer than the total number of slots.
 * @param structure - Row block definitions (determines cell count per row)
 * @param _columns  - Column count for documentation; enforced by structure itself
 */
function buildGrid(structure: RowBlock[][], _columns: number): GridCell[][] {
  if (CTA_AVATARS.length === 0) return [];

  let avatarIndex = 0;

  return structure.map((row, ri) => {
    const cells: GridCell[] = [];

    row.forEach((block) => {
      for (let i = 0; i < block.count; i++) {
        if (block.type === "empty") {
          cells.push({ kind: "empty" });
        } else {
          const avatar = CTA_AVATARS[avatarIndex % CTA_AVATARS.length];
          avatarIndex++;
          cells.push({
            kind: "avatar",
            avatar: avatar as CtaAvatar,
            delay: cellDelay(ri, cells.length),
          });
        }
      }
    });

    return cells;
  });
}

function cellOpacity(rowIdx: number): number {
  const center = (GRID_STRUCTURE.length - 1) / 2;
  const distance = Math.abs(rowIdx - center);
  return 1 - distance * 0.15;
}

const GRID_DATA: GridCell[][] = buildGrid(GRID_STRUCTURE, COLUMNS);
const GRID_DATA_MOBILE: GridCell[][] = buildGrid(GRID_STRUCTURE_MOBILE, COLUMNS_MOBILE);
const GRID_DATA_MD: GridCell[][] = buildGrid(GRID_STRUCTURE_MD, COLUMNS_MD);
const GRID_DATA_LG: GridCell[][] = buildGrid(GRID_STRUCTURE_LG, COLUMNS_LG);

// ---------------------------------------------------------------------------
// useBreakpoint hook
// ---------------------------------------------------------------------------

type Breakpoint = "mobile" | "md" | "lg" | "xl";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("xl");

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqMd     = window.matchMedia("(max-width: 1023px)");
    const mqLg     = window.matchMedia("(max-width: 1279px)");

    const update = () => {
      if (mqMobile.matches)      setBp("mobile");
      else if (mqMd.matches)     setBp("md");
      else if (mqLg.matches)     setBp("lg");
      else                       setBp("xl");
    };

    update();
    mqMobile.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return bp;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const bp = useBreakpoint();
  const gridData =
    bp === "mobile" ? GRID_DATA_MOBILE :
    bp === "md"     ? GRID_DATA_MD     :
    bp === "lg"     ? GRID_DATA_LG     :
    GRID_DATA;

  return (
    <section className="border-b border-subtle-stroke" ref={sectionRef}>
      <div className="container w-full">
        <div
          className={[
            "relative z-[1] flex flex-col gap-10",
            "py-[60px]",                       // mobile vertical padding (py-15 → v3 compat)
            "lg:gap-0 lg:border-x lg:border-subtle-stroke lg:pb-40 lg:pt-0",
          ].join(" ")}
        >
          {/* ----------------------------------------------------------------
              Dot-grid SVG background — desktop only.
            ----------------------------------------------------------------- */}
          <svg
            width="100%"
            height="100%"
            className="text-muted-strong-background h-40 max-lg:hidden"
            style={{
              // mask-b-from-30% is Tailwind v4 — replicated with inline style
              maskImage: "linear-gradient(to bottom, black 30%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent)",
            }}
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="cta-dot-pattern"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <rect x="5.5" y="5.5" width="1" height="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dot-pattern)" />
          </svg>

          {/* ----------------------------------------------------------------
              Avatar mosaic grid
          ----------------------------------------------------------------- */}
          <div className="relative flex w-full flex-col justify-center overflow-x-clip">
            <div className="w-full">
              {gridData.map((row, ri) => (
                <div
                  key={ri}
                  className="flex justify-center gap-px pb-px last-of-type:pb-0"
                >
                  {row.map((cell, ci) =>
                    cell.kind === "empty" ? (
                      /* Empty spacer cell — same size as avatar cell */
                      <div
                        key={ci}
                        className="h-7 aspect-square lg:h-6 lg:flex-[0_0_24px]"
                      />
                    ) : (
                      /* Avatar cell with fade-in animation */
                      <motion.div
                        key={ci}
                        className="relative h-7 aspect-square lg:h-6 lg:flex-[0_0_24px]"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: cell.delay / 1000,
                          ease: "easeOut",
                        }}
                      >
                        {/*
                          Inner wrapper: rounded corners + subtle border overlay
                          after:z-1 is Tailwind v4 — using after:z-[1] for v3 compat
                        */}
                        <div className="group relative h-full w-full overflow-hidden rounded-[7px] p-px after:pointer-events-none after:absolute after:inset-px after:z-[1] after:rounded-[7px] after:border after:border-[#2E3238]/[0.08]">
                          <Image
                            alt={cell.avatar.name}
                            src={cell.avatar.src}
                            width={22}
                            height={22}
                            className="relative h-full w-full rounded-[7px] object-cover transition-all duration-300 ease-out group-hover:opacity-80"
                          />
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Left + right white fade — masks the mosaic edges on desktop */}
            <div
              className="pointer-events-none absolute inset-0 z-0 max-lg:hidden"
              style={{
                background:
                  "linear-gradient(to right, white, transparent 20%, transparent 80%, white 100%)",
              }}
            />
          </div>

          {/* ----------------------------------------------------------------
              Heading + CTA buttons
          ----------------------------------------------------------------- */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-heading-md">
              {/* Line 1 — plain text, slides up on scroll */}
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={inView ? { y: 0 } : { y: "100%" }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {CTA_CONTENT.heading}
                </motion.span>
              </span>

              {/* Line 2 — serif/italic, delayed */}
              <span className="block overflow-hidden text-heading-md-serif">
                <motion.span
                  className="block pb-0.5"
                  initial={{ y: "100%" }}
                  animate={inView ? { y: 0 } : { y: "100%" }}
                  transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {CTA_CONTENT.headingSerif}
                </motion.span>
              </span>
            </h2>

            {/* CTA row — fades in after heading */}
            <motion.div
              className="mt-6 flex w-full items-center justify-center gap-x-2 gap-y-2 max-md:flex-col max-md:items-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Desktop buttons — hidden on mobile */}
              <Link
                href={CTA_CONTENT.primaryCta.href}
                className="button-primary relative inline-flex cursor-pointer items-center justify-center rounded-[10px] px-3 text-sm h-9 max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
              >
                {CTA_CONTENT.primaryCta.label}
              </Link>

              <Link
                href={CTA_CONTENT.secondaryCta.href}
                className="button-outline relative inline-flex cursor-pointer items-center justify-center rounded-[10px] px-3 text-sm h-9 max-lg:h-[46px] max-lg:rounded-xl max-lg:px-3.5 max-lg:text-base max-md:hidden"
              >
                {CTA_CONTENT.secondaryCta.label}
              </Link>

              {/* Mobile email form — shown only on mobile */}
              <DemoRequestForm
                source="home"
                salesHref= ""
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
