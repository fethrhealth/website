import { AccordionImageSection } from "@/components/sections/AccordionImageSection";
import { BentoGridSection } from "@/components/sections/BentoGridSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { ImageGridSection } from "@/components/sections/ImageGridSection";
import TrialSection from "@/components/sections/TrialSection";
import { REPORTING_EXAMPLES, REPORTING_DATA_EXPLORATION, REPORTING_ENGINE } from "@/data/platform-reporting";

/**
 * Reporting page — /platform/reporting
 * TODO Phase 2: Implement pixel-perfect design.
 */
export default function ReportingPage(): React.ReactElement {
  return (
    <main>
      <CompaniesSection/>
      <BentoGridSection
        headingMuted="The reporting engine"
        headingPrimary=" for \ngo-to-market teams."
        subtext="Access, visualize and explore all your data as quickly as you can think."
        items= { REPORTING_ENGINE }
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
  )
}
