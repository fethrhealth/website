import type { Metadata } from 'next'
import { SequencesHeroSection } from "@/components/sections/SequencesHeroSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { FeaturePreviewSection } from "@/components/sections/FeaturePreviewSection";
import { PlatformNavSection } from "@/components/sections/PlatformNavSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { ScrollAccordionSection } from "@/components/sections/ScrollAccordionSection";
import TrialSection from "@/components/sections/TrialSection";
import { ZeroTouchSection } from "@/components/sections/ZeroTouchSection";
import Divider from "@/components/ui/divider";
import { INTERACTION_ITEMS, INTERACTIONS_HEADING, INTERACTIONS_SUBHEADING } from "@/data/sequences-interactions"
import { HANDWRITTEN_WARMTH_ITEMS, HANDWRITTEN_HEADING, HANDWRITTEN_SUBHEADING } from "@/data/sequences-handwritten"
import { SEQUENCES_INSIDE_HEADING, SEQUENCES_INSIDE_DESCRIPTION, SEQUENCES_INSIDE_IMAGE_SRC, SEQUENCES_INSIDE_IMAGE_ALT, SEQUENCES_INSIDE_IMAGE_WIDTH, SEQUENCES_INSIDE_IMAGE_HEIGHT } from "@/data/sequences-inside"
import { SEQUENCES_QUOTE, SEQUENCES_QUOTE_AUTHOR, SEQUENCES_QUOTE_ROLE } from "@/data/sequences-quote"
import { ZERO_TOUCH_HEADING, ZERO_TOUCH_SUBHEADING } from "@/data/sequences-zero-touch"
import { SEQUENCES_NAV_CURRENT_HREF } from "@/data/sequences-nav-section"

export const metadata: Metadata = {
  title: 'Sequences',
  description: 'Send the right message at the right time. Build personalized outreach sequences that feel human and scale effortlessly.',
}

/**
 * Sequences page — /platform/sequences
 */
export default function SequencesPage(): React.ReactElement {
  return (
    <main>
      <SequencesHeroSection />
      <Divider/>
      <FeaturePreviewSection
        heading={SEQUENCES_INSIDE_HEADING}
        description={SEQUENCES_INSIDE_DESCRIPTION}
        imageSrc={SEQUENCES_INSIDE_IMAGE_SRC}
        imageAlt={SEQUENCES_INSIDE_IMAGE_ALT}
        imageWidth={SEQUENCES_INSIDE_IMAGE_WIDTH}
        imageHeight={SEQUENCES_INSIDE_IMAGE_HEIGHT}
      />
      <Divider/>
      <QuoteSection
        quote={SEQUENCES_QUOTE}
        author={SEQUENCES_QUOTE_AUTHOR}
        role={SEQUENCES_QUOTE_ROLE}
      />
      <Divider />
      <ZeroTouchSection
        heading={ZERO_TOUCH_HEADING}
        subheading={ZERO_TOUCH_SUBHEADING}
      />
      <Divider />
      <ScrollAccordionSection
        heading={HANDWRITTEN_HEADING}
        subheading={HANDWRITTEN_SUBHEADING}
        items={HANDWRITTEN_WARMTH_ITEMS}
      />
      <Divider />
      <FeatureGridSection
        heading={INTERACTIONS_HEADING}
        subheading={INTERACTIONS_SUBHEADING}
        cols={2}
        background='dots'
        rules='dashed'
        guideLines
        items={INTERACTION_ITEMS}
      />
      <Divider />
      <PlatformNavSection currentHref={SEQUENCES_NAV_CURRENT_HREF} />
      <TrialSection
        source="sequences"
        headingLayout="inline"
      />
    </main>
  )
}
