import TrialSection from "@/components/sections/TrialSection";
import { AskHeroSection } from '@/components/sections/AskHeroSection'
import { HomeContextSection } from '@/components/sections/HomeContextSection'
import { PromptLibrarySection } from '@/components/sections/PromptLibrarySection'
import { ReviewSection } from '@/components/sections/ReviewSection'
import { TabsSection } from '@/components/sections/TabsSection'
import { TabVisualMarketing } from '@/components/illustrations/TabVisualMarketing'
import { TabVisualSuccess }   from '@/components/illustrations/TabVisualSuccess'
import { TabVisualSales }     from '@/components/illustrations/TabVisualSales'
import { TabVisualFounders }  from '@/components/illustrations/TabVisualFounders'
import { TabVisualVC }        from '@/components/illustrations/TabVisualVC'
import { AskChatDemoSection } from '@/components/sections/AskChatDemoSection'
import { CONTEXT_FEATURES, PROMPT_CARDS } from '@/data/platform-ask'
import { ASK_TABS, ASK_TABS_HEADING } from '@/data/ask-tabs'
import Divider from "@/components/ui/divider";

/**
 * Ask AI page — /platform/ask
 * TODO Phase 2: Implement pixel-perfect design.
 */
export default function AskAIPage(): React.ReactElement {
  return (
    <main>
      <AskHeroSection />
      <Divider />
      <TabsSection
        heading={ASK_TABS_HEADING}
        tabs={ ASK_TABS }
        visuals={[
          <TabVisualMarketing key="marketing" />,
          <TabVisualSuccess   key="success" />,
          <TabVisualSales     key="sales" />,
          <TabVisualFounders  key="founders" />,
          <TabVisualVC        key="vc" />,
        ]}
      />
      <Divider/>
      <HomeContextSection
        eyebrow="Powered by"
        heading="Universal"
        trademark
        features={ CONTEXT_FEATURES }
      />
      <Divider/>
      <AskChatDemoSection />
      <Divider/>
      <PromptLibrarySection
        row1={ PROMPT_CARDS }
        row2={ [...PROMPT_CARDS].reverse() }
      />
      <Divider/>
      <ReviewSection
        quote='"Before every meeting, Ask Fethr centralizes, summarizes, and surfaces everything I need to know to give a great first impression or close the deal."'
        author="Ian Ahuja"
        role="Head of Sales & Partnerships · Lightdash"
      />
      <Divider/>
      <TrialSection
        heading="Ask more from CRM. Ask Attio." headingSerif=""
      />
    </main>
  )
}
