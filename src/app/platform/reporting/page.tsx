import { AccordionImageSection } from "@/components/sections/AccordionImageSection";
import { BentoGridSection } from "@/components/sections/BentoGridSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { ImageGridSection } from "@/components/sections/ImageGridSection";
import { PageHero } from "@/components/sections/PageHero";
import { ReportingHeroCards } from "@/components/sections/ReportingHeroCards";
import TrialSection from "@/components/sections/TrialSection";
import {
  REPORTING_EXAMPLES,
  REPORTING_DATA_EXPLORATION,
  REPORTING_ENGINE,
} from "@/data/platform-reporting";
/**
 * Reporting page — /platform/reporting
 */
export default function ReportingPage(): React.ReactElement {
  return (
    <main>
      <PageHero
        badge="Reporting"
        heading="Real-time reporting, total flexibility."
        subheading="Attio quickly transforms millions of your data points into insights for your entire GTM team."
        primaryCta={{ label: "Start for free", href: "/signup" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
      />
      <ReportingHeroCards />
      <CompaniesSection />
      <BentoGridSection
        headingMuted="The reporting engine"
        headingPrimary=" for \ngo-to-market teams."
        subtext="Access, visualize and explore all your data as quickly as you can think."
        items={REPORTING_ENGINE}
      />
      <AccordionImageSection
        headerLayout="centered"
        headingPrimary="Powerful"
        headingMuted=" data exploration"
        subheading="The more teams you refer, the more exclusive bundles you can claim."
        items={REPORTING_DATA_EXPLORATION}
      />
      <ImageGridSection
        items={REPORTING_EXAMPLES}
      />
      <TrialSection />
    </main>
  );
}
