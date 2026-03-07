import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * ProductivityHeroImages
 *
 * Image grid shown below the Productivity page hero header.
 * Desktop (lg): 12-col / 10-row grid with 5 cards.
 * Desktop (xl): 7-col / 11-row grid, adds Note + Comment side cards.
 * Mobile: horizontal scroll of image pairs.
 *
 * ─── IMAGES ───────────────────────────────────────────────────────────────────
 *  /public/assets/images/platform/productivity/hero/
 *    productivity-hero-note.jpg    — left col, xl only, top
 *    productivity-hero-email.jpg   — right col, top
 *    productivity-hero-screen.jpg  — center, full height
 *    productivity-hero-list.jpg    — right col, bottom
 *    productivity-hero-comment.jpg — left col, xl only, bottom
 *
 * ─── GRID MAP (xl, 7 cols × 11 rows) ─────────────────────────────────────────
 *  Note     col 1-2  row 2-5
 *  Screen   col 3-5  row 1-11  (full)
 *  Email    col 6-7  row 2-6
 *  Comment  col 1-2  row 6-9
 *  List     col 6-7  row 7-11
 *
 * ─── GRID MAP (lg, 12 cols × 10 rows) ────────────────────────────────────────
 *  Screen   col 1-7  row 1-10  (full)
 *  Email    col 8-12 row 1-5
 *  List     col 8-12 row 6-10
 *  Note + Comment: hidden at lg, only xl
 */

const cardCls = cn(
  'overflow-hidden rounded-2xl border border-subtle-stroke bg-primary-background',
  'shadow-[0px_4px_6px_-2px_rgba(28,40,64,0.04),0px_2px_3px_-2px_rgba(28,40,64,0.10)]',
)

const LINE_GRADIENT = 'opacity-30 bg-[linear-gradient(270deg,#FFF_0%,#CAD0D9_4.04%,#CAD0D9_95.87%,#FFF_100%)]'

export function ProductivityHeroImages() {
  return (
    <>
      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <div className="mt-16 hidden lg:block xl:mt-[106px] pb-24">

        {/* Top gradient rule — max-w matches attio's 1569px cap; -mb-px overlaps the grid border below */}
        <div className={cn('h-px -mb-px max-w-[1569px] mx-auto', LINE_GRADIENT)} />

        <div className={cn(
          'container relative isolate grid w-full gap-6',
          'grid-cols-12 grid-rows-[repeat(10,1fr)]',
          'xl:grid-cols-7 xl:grid-rows-[repeat(11,1fr)] xl:px-12',
        )}>

          {/* ── Vertical decorative lines ────────────────────────────────────
               Absolutely positioned within the grid. CSS Grid spec allows
               absolute children to use grid-column/row placement, which
               determines their horizontal anchor point.

               lg  (12 cols): outer lines at left-0 / right-0
                               inner lines at the col-7/8 boundary
               xl  (7 cols):  outer lines step out to -left-6 / -right-6
                               (within the xl:px-12 padding area)
                               inner lines align with the Screen card edges   ── */}

          {/* Left outer */}
          <div className="absolute top-[-100%] left-0 xl:-left-6 col-start-1 row-start-1 w-px h-[226%] opacity-30 bg-[linear-gradient(280deg,#FFF_0%,#CAD0D9_11.31%,#CAD0D9_55.37%,#FFF_100%)]" />
          {/* Left inner — lg: right edge of col-7 · xl: left edge of col-3 */}
          <div className="absolute top-[-8%] right-0 col-end-8 row-start-1 w-px h-[116%] opacity-30 xl:top-[-16%] xl:right-[unset] xl:left-0 xl:col-start-3 xl:col-end-auto xl:h-[132%] bg-[linear-gradient(280deg,#FFF_0%,#CAD0D9_12.93%,#CAD0D9_88.21%,#FFF_100%)]" />
          {/* Right inner — lg: left edge of col-8 · xl: right edge of col-5 */}
          <div className="absolute top-[-8%] left-0 col-start-8 row-start-1 w-px h-[116%] opacity-30 xl:top-[-16%] xl:left-[unset] xl:right-0 xl:col-start-auto xl:col-end-6 xl:h-[132%] bg-[linear-gradient(280deg,#FFF_0%,#CAD0D9_12.93%,#CAD0D9_88.21%,#FFF_100%)]" />
          {/* Right outer */}
          <div className="absolute top-[-100%] right-0 xl:-right-6 col-end-[-1] row-start-1 w-px h-[226%] opacity-30 bg-[linear-gradient(280deg,#FFF_0%,#CAD0D9_11.31%,#CAD0D9_55.37%,#FFF_100%)]" />

          {/* Note — xl only · col 1-2 · row 2-5 */}
          <div className={cn(
            cardCls,
            'hidden xl:block',
            'xl:col-start-1 xl:col-span-2 xl:row-start-2 xl:row-span-4',
          )}>
            <Image
              src="/assets/images/platform/productivity/hero/productivity-hero-note.avif"
              alt=""
              width={1524}
              height={708}
              className="h-full w-full rounded-[inherit] object-cover object-left-top"
              sizes="400px"
            />
          </div>

          {/* Email — lg: col 8-12 row 1-5 · xl: col 6-7 row 2-6 */}
          <div className={cn(
            cardCls,
            'col-span-5 col-start-8 row-span-5 row-start-1',
            'xl:col-start-6 xl:col-span-2 xl:row-start-2 xl:row-span-5',
          )}>
            <Image
              src="/assets/images/platform/productivity/hero/productivity-hero-email.avif"
              alt=""
              width={1524}
              height={908}
              className="h-full w-full rounded-[inherit] object-cover object-left-top"
              sizes="(max-width: 1200px) 470px, 400px"
            />
          </div>

          {/* Screen — center, full height · lg: col 1-7 · xl: col 3-5 */}
          <div className={cn(
            'isolate col-span-7 col-start-1 row-span-full row-start-1',
            'xl:col-start-3 xl:col-span-3',
            'flex rounded-3xl border border-weak-stroke p-2.5',
            'bg-[linear-gradient(199deg,#EDEFF3_11.23%,#E4E7EC_87.61%)]',
            'shadow-[0px_10px_30px_-4px_rgba(28,40,64,0.10),0px_8px_8px_-8px_rgba(28,40,64,0.10),0px_4px_4px_-6px_rgba(28,40,4,0.14),0px_0px_0px_1px_#EDEFF3]',
          )}>
            <div className="flex-1 rounded-[11px] bg-primary-background shadow-[0px_3px_3px_0px_rgba(0,0,0,0.04)]">
              <Image
                src="/assets/images/platform/productivity/hero/productivity-hero-screen.avif"
                alt=""
                width={2256}
                height={2032}
                className="h-full w-full rounded-[inherit] bg-primary-background object-cover"
                sizes="(max-width: 1200px) 50vw, 558px"
              />
            </div>
          </div>

          {/* List — lg: col 8-12 row 6-10 · xl: col 6-7 row 7-11 */}
          <div className={cn(
            cardCls,
            'relative col-span-5 col-start-8 row-span-5 row-start-6',
            'xl:col-start-1 xl:col-span-2 xl:row-start-6 xl:row-span-5',
          )}>
            <Image
              src="/assets/images/platform/productivity/hero/productivity-hero-list.avif"
              alt=""
              fill
              className="rounded-[inherit] object-cover object-left-top"
              sizes="(max-width: 1200px) 470px, 400px"
            />
          </div>

          {/* Comment — xl only · col 1-2 · row 6-9 */}
          <div className={cn(
            cardCls,
            'relative hidden xl:block',
            'xl:col-start-6 xl:col-span-2 xl:row-start-7 xl:row-span-4',
          )}>
            <Image
              src="/assets/images/platform/productivity/hero/productivity-hero-comment.avif"
              alt=""
              fill
              className="rounded-[inherit] object-cover object-left-top"
              sizes="400px"
            />
          </div>

        </div>

        {/* Bottom gradient rule */}
        <div className={cn('h-px -mt-px max-w-[1569px] mx-auto', LINE_GRADIENT)} />
      </div>

      {/* ── Mobile (horizontal scroll) ────────────────────────────────────── */}
      <div className="mt-8 block lg:hidden">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-6 [&::-webkit-scrollbar]:hidden">

          {/* Slide 1 */}
          <div className="flex w-[calc(100vw-2rem)] shrink-0 snap-start flex-col gap-y-3">
            <div className={cn(cardCls, 'overflow-hidden')}>
              <Image
                src="/assets/images/platform/productivity/hero/productivity-hero-note.jpg"
                alt=""
                width={1524}
                height={708}
                className="w-full rounded-[inherit] object-cover object-left-top"
                sizes="400px"
              />
            </div>
            <div className={cn(cardCls, 'overflow-hidden')}>
              <Image
                src="/assets/images/platform/productivity/hero/productivity-hero-list.jpg"
                alt=""
                width={1524}
                height={908}
                className="w-full rounded-[inherit] object-cover object-left-top"
                sizes="400px"
              />
            </div>
          </div>

          {/* Slide 2 */}
          <div className="flex w-[calc(100vw-2rem)] shrink-0 snap-start flex-col gap-y-3">
            <div className={cn(cardCls, 'overflow-hidden')}>
              <Image
                src="/assets/images/platform/productivity/hero/productivity-hero-email.jpg"
                alt=""
                width={1524}
                height={908}
                className="w-full rounded-[inherit] object-cover object-left-top"
                sizes="400px"
              />
            </div>
            <div className={cn(cardCls, 'overflow-hidden')}>
              <Image
                src="/assets/images/platform/productivity/hero/productivity-hero-comment.jpg"
                alt=""
                width={1524}
                height={708}
                className="w-full rounded-[inherit] object-cover object-left-top"
                sizes="400px"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
