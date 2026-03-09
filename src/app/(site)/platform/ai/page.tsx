import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { PlatformNavSection } from "@/components/sections/PlatformNavSection";
import TrialSection from "@/components/sections/TrialSection";
import Divider from "@/components/ui/divider";
import { ITEMS } from "@/data/platform-ai"

/**
 * AI page — /platform/ai
 * TODO Phase 2: Implement pixel-perfect design.
 */
export default function AIPage(): React.ReactElement {
  return (
    <main>
      <FeatureGridSection
        heading="CRM, meet MCP."
        subheading="Connect to Attio in AI tools and get work done anywhere, anytime."
        cols={3}
        background="hatching"
        rules="solid"
        items={ITEMS}
        bottomConnector
        divider
      />
      <PlatformNavSection currentHref="/platform/ai" />
      <Divider />
      <TrialSection />
    </main>
  )
}
