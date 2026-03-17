import { AiHeroSection } from "@/components/sections/AiHeroSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { EnrichmentSection } from "@/components/sections/EnrichmentSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { PlatformNavSection } from "@/components/sections/PlatformNavSection";
import { ScrollAccordionSection } from "@/components/sections/ScrollAccordionSection";
import TrialSection from "@/components/sections/TrialSection";
import Divider from "@/components/ui/divider";
import { ITEMS, SMARTER_CALLS, AUTONOMOUS_WORK, ASK_ATTIO_ITEMS, ASK_ATTIO_QUOTE } from "@/data/platform-ai"

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
        heading='Ask Attio.'
        subheading='Search, update, and create with AI.'
        cols={2}
        background='dots'
        rules='dashed'
        guideLines
        items={ASK_ATTIO_ITEMS}
        quote={ASK_ATTIO_QUOTE}
      />
      <Divider/>
      <ScrollAccordionSection
        heading='Autonomous work in action.'
        subheading='Automate research, enrich records, run custom workflows.'
        items={ AUTONOMOUS_WORK }
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
      <TrialSection />
    </main>
  )
}
