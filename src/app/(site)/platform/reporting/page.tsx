import type { Metadata } from 'next'
import { AccordionImageSection } from "@/components/sections/AccordionImageSection";
import { BentoGridSection } from "@/components/sections/BentoGridSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { ImageGridSection } from "@/components/sections/ImageGridSection";
import { PageHero } from "@/components/sections/PageHero";
import { ReportingHeroCards } from "@/components/sections/ReportingHeroCards";
import TrialSection from "@/components/sections/TrialSection";
import Divider from "@/components/ui/divider";
import { REPORTING_EXAMPLES } from "@/data/reporting-features";
import { REPORTING_POWERFUL_SECTION, REPORTING_DATA_EXPLORATION } from "@/data/reporting-powerful";
import { REPORTING_HERO } from "@/data/reporting-hero";
import { REPORTING_TRIAL_SOURCE } from "@/data/reporting-cta";
import { REPORTING_ENGINE_SECTION, REPORTING_ENGINE } from "@/data/reporting-engine";

export const metadata: Metadata = {
  title: 'Reporting',
  description: 'Real-time reporting for healthcare teams. Create bar, funnel, pie, and more. Fethr transforms millions of data points into insights for your entire team.',
}

/**
 * Reporting page — /platform/reporting
 */
export default function ReportingPage(): React.ReactElement {
  return (
    <main>
      {/* ── Hero area — relative so the decorative circles can be positioned inside ── */}
      <div className="relative overflow-hidden">
        <PageHero
          badge={REPORTING_HERO.badge}
          heading={REPORTING_HERO.heading}
          subheading={REPORTING_HERO.subheading}
          primaryCta={REPORTING_HERO.primaryCta}
          showSales={REPORTING_HERO.showSales}
          showMobileSales={REPORTING_HERO.showMobileSales}
        />
        <ReportingHeroCards />

        {/* ── Decorative concentric circles (desktop only) ───────────────────── */}
        <div
          className="pointer-events-none overflow-hidden absolute top-10 right-0 -bottom-10 left-0 hidden lg:-top-16 lg:-bottom-16 lg:block xl:-top-24 xl:-bottom-24 -z-10"
          aria-hidden
        >
          <svg
            className="absolute top-1/2 left-1/2 w-[1604px] -translate-x-1/2 -translate-y-1/2 xl:-translate-y-[calc(50%+20px)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="100%"
            width="100%"
            viewBox="0 0 1640 1306"
          >
            <g stroke="#EDEFF3">
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '600ms' }}  d="M820 981.8a177.8 177.8 0 1 0 0-355.6 177.8 177.8 0 0 0 0 355.6Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '654ms' }}  d="M820 1053.2a249.2 249.2 0 1 0 0-498.4 249.2 249.2 0 0 0 0 498.4Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '716ms' }}  d="M820 1124.5a320.5 320.5 0 1 0 0-641 320.5 320.5 0 0 0 0 641Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '786ms' }}  d="M820 1195.9a391.9 391.9 0 1 0 0-783.8 391.9 391.9 0 0 0 0 783.8Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '864ms' }}  d="M820 1267.2a463.2 463.2 0 1 0 0-926.4 463.2 463.2 0 0 0 0 926.4Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '950ms' }}  d="M820 1338.6a534.6 534.6 0 1 0 0-1069.2 534.6 534.6 0 0 0 0 1069.2Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '1044ms' }} d="M820 1410a606 606 0 1 0 0-1212 606 606 0 0 0 0 1212Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '1146ms' }} d="M820 1481.3a677.3 677.3 0 1 0 0-1354.6 677.3 677.3 0 0 0 0 1354.6Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '1256ms' }} d="M820 1552.7a748.6 748.6 0 1 0 0-1497.3 748.6 748.6 0 0 0 0 1497.3Z" />
              <path className="animate-in fade-in fill-mode-both duration-1000 ease-out" style={{ animationDelay: '1374ms' }} d="M820 1624a820 820 0 1 0 0-1640 820 820 0 0 0 0 1640Z" />
            </g>
          </svg>

          {/* Top radial gradient — fades the circles into the page background */}
          <div className="absolute top-0 mt-[-250px] h-[500px] w-full bg-[radial-gradient(61.72%_50%_at_50%_50%,_#FFF_0%,rgba(255,255,255,0.00)_100%)] xl:-mt-[340px] xl:h-[900px]" />

          {/* Bottom linear gradient — fades circles out at the bottom edge */}
          <div className="absolute bottom-0 h-[38px] w-full bg-[linear-gradient(0deg,_#FFF_0%,_rgba(255,255,255,0.00)_100%)]" />
        </div>
      </div>

      <CompaniesSection />
      <BentoGridSection
        headingMuted={REPORTING_ENGINE_SECTION.headingMuted}
        headingPrimary={REPORTING_ENGINE_SECTION.headingPrimary}
        subtext={REPORTING_ENGINE_SECTION.subtext}
        items={REPORTING_ENGINE}
      />
      <AccordionImageSection
        headerLayout={REPORTING_POWERFUL_SECTION.headerLayout}
        headingPrimary={REPORTING_POWERFUL_SECTION.headingPrimary}
        headingMuted={REPORTING_POWERFUL_SECTION.headingMuted}
        subheading={REPORTING_POWERFUL_SECTION.subheading}
        items={REPORTING_DATA_EXPLORATION}
      />
      <ImageGridSection
        items={REPORTING_EXAMPLES}
      />
      <Divider/>
      <TrialSection
        source={REPORTING_TRIAL_SOURCE}
        headingLayout="inline"
      />
    </main>
  );
}
