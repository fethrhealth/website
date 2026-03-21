import type { Metadata } from 'next'
import { AiHeroSection } from "@/components/sections/AiHeroSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { EnrichmentSection } from "@/components/sections/EnrichmentSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { PlatformNavSection } from "@/components/sections/PlatformNavSection";
import { ScrollAccordionSection } from "@/components/sections/ScrollAccordionSection";
import TrialSection from "@/components/sections/TrialSection";
import Divider from "@/components/ui/divider";
import { AI_CALLS_HEADING, AI_CALLS_SUBHEADING, AI_CALLS_ITEMS } from "@/data/ai-calls"
import { AI_CRM_HEADING, AI_CRM_SUBHEADING, AI_CRM_ITEMS } from "@/data/ai-crm"
import { AI_NAV_CURRENT_HREF } from "@/data/ai-nav-section"
import { AI_GRID_HEADING, AI_GRID_SUBHEADING, AI_GRID_ITEMS, AI_GRID_QUOTE } from "@/data/ai-grid-section"
import { AI_ACCORDION_HEADING, AI_ACCORDION_SUBHEADING, AI_ACCORDION_ITEMS } from "@/data/ai-accordion"

export const metadata: Metadata = {
  title: 'Embedded Intelligence',
  description: 'AI built into every layer of your CRM. Enrich records, surface insights, and let Fethr Health think alongside your team.',
}

/**
 * AI page — /platform/ai
 * TODO Phase 2: Implement pixel-perfect design.
 */
export default function AIPage(): React.ReactElement {
  return (
    <main>
      <AiHeroSection />
      <CompaniesSection/>
      <Divider/>
      <FeatureGridSection
        heading={AI_GRID_HEADING}
        subheading={AI_GRID_SUBHEADING}
        cols={2}
        background='dots'
        rules='dashed'
        guideLines
        items={AI_GRID_ITEMS}
        quote={AI_GRID_QUOTE}
      />
      <Divider/>
      <ScrollAccordionSection
        heading={AI_ACCORDION_HEADING}
        subheading={AI_ACCORDION_SUBHEADING}
        items={AI_ACCORDION_ITEMS}
      />
      <EnrichmentSection
        heading={AI_CALLS_HEADING}
        subheading={AI_CALLS_SUBHEADING}
        items={AI_CALLS_ITEMS}
      />
      <Divider/>
      <FeatureGridSection
        heading={AI_CRM_HEADING}
        subheading={AI_CRM_SUBHEADING}
        cols={3}
        background="hatching"
        rules="solid"
        items={AI_CRM_ITEMS}
        divider
      />
      <PlatformNavSection currentHref={AI_NAV_CURRENT_HREF} />
      <Divider />
      <TrialSection 
        source="ai"
        headingLayout="inline"
      />
    </main>
  )
}
