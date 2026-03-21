import type { Metadata } from 'next'
import { AiHeroSection } from "@/components/sections/AiHeroSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { EnrichmentSection } from "@/components/sections/EnrichmentSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { PlatformNavSection } from "@/components/sections/PlatformNavSection";
import { ScrollAccordionSection } from "@/components/sections/ScrollAccordionSection";
import TrialSection from "@/components/sections/TrialSection";
import Divider from "@/components/ui/divider";
import { ITEMS, SMARTER_CALLS } from "@/data/platform-ai"
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
        heading="Smarter calls, from kickoff to close."
        subheading="Every conversation captured, summarized, and synced to your CRM — instantly."
        items={ SMARTER_CALLS }
      />
      <Divider/>
      <FeatureGridSection
        heading="CRM, meet MCP."
        subheading="Connect to Attio in AI tools and get work done anywhere, anytime."
        cols={3}
        background="hatching"
        rules="solid"
        items={ITEMS}
        divider
      />
      <PlatformNavSection currentHref="/platform/ai" />
      <Divider />
      <TrialSection 
        source="ai"
        headingLayout="inline"
      />
    </main>
  )
}
