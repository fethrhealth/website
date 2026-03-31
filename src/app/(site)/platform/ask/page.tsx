import type { Metadata } from 'next'
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
import { ASK_LIBRARY_HEADING, ASK_LIBRARY_SUBHEADING, PROMPT_CARDS, PROMPT_CARDS_TWO } from '@/data/ask-library'
import { ASK_REVIEW_QUOTE, ASK_REVIEW_AUTHOR, ASK_REVIEW_ROLE } from '@/data/ask-review'
import { ASK_CTA_HEADING, ASK_CTA_HEADING_SERIF } from '@/data/ask-cta'
import { ASK_TABS, ASK_TABS_HEADING } from '@/data/ask-tabs'
import {
  ASK_CONTEXT_EYEBROW,
  ASK_CONTEXT_HEADING,
  ASK_CONTEXT_HEADING_SUFFIX,
  ASK_CONTEXT_TRADEMARK,
  ASK_CONTEXT_FEATURES,
} from '@/data/ask-context'
import Divider from "@/components/ui/divider";

/**
 * Ask AI page — /platform/ask
 * TODO Phase 2: Implement pixel-perfect design.
 */
export const metadata: Metadata = {
  title: 'Ask Fethr',
  description: 'Ask more from your healthcare data.',
}

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
        eyebrow={ASK_CONTEXT_EYEBROW}
        heading={ASK_CONTEXT_HEADING}
        contextWord={ASK_CONTEXT_HEADING_SUFFIX}
        trademark={ASK_CONTEXT_TRADEMARK}
        features={ASK_CONTEXT_FEATURES}
      />
      <Divider/>
      <AskChatDemoSection />
      <Divider/>
      <PromptLibrarySection
        heading={ASK_LIBRARY_HEADING}
        subheading={ASK_LIBRARY_SUBHEADING}
        row1={PROMPT_CARDS}
        row2={[...PROMPT_CARDS_TWO].reverse()}
      />
      <Divider/>
      <ReviewSection
        quote={ASK_REVIEW_QUOTE}
        author={ASK_REVIEW_AUTHOR}
        role={ASK_REVIEW_ROLE}
      />
      <Divider/>
      <TrialSection
        heading={ASK_CTA_HEADING}
        headingSerif={ASK_CTA_HEADING_SERIF}
      />
    </main>
  )
}
