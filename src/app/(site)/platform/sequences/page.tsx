import { SequencesHeroSection } from "@/components/sections/SequencesHeroSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { FeaturePreviewSection } from "@/components/sections/FeaturePreviewSection";
import { PlatformNavSection } from "@/components/sections/PlatformNavSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { ScrollAccordionSection } from "@/components/sections/ScrollAccordionSection";
import TrialSection from "@/components/sections/TrialSection";
import { ZeroTouchSection } from "@/components/sections/ZeroTouchSection";
import Divider from "@/components/ui/divider";
import { HANDWRITTEN_WARMTH_ITEMS, INTERACTION_ITEMS } from "@/data/platform-sequences"

/**
 * Sequences page — /platform/sequences
 */
export default function SequencesPage(): React.ReactElement {
  return (
    <main>
      <SequencesHeroSection />
      <Divider/>
      <FeaturePreviewSection
        heading="Step inside Sequences."
        description="Convert warm signals into outreach that closes itself."
        imageSrc="/assets/images/platform/sequences/step-inside-sequences.webp"
        imageAlt="Sequences UI preview"
        imageWidth={2880}
        imageHeight={1800}
      />
      <QuoteSection
        quote={`"With Fethr, we\u2019re able to conduct highly targeted and personalized patient outreach."`}
        author="Margaret Shen"
        role="Head of Patient Operations · Modal"
      />
      <Divider />
      <ZeroTouchSection
        heading="Zero-touch follow-ups."
        subheading="Fethr keeps patients moving forward while your team focuses on care."
      />
      <Divider />
      <ScrollAccordionSection
        heading='Handwritten warmth.'
        subheading='Every touch feels 1-to-1, even when juggling 100 accounts.'
        items={HANDWRITTEN_WARMTH_ITEMS}
      />
      <Divider />
      <FeatureGridSection
        heading='Every interaction in Attio.'
        subheading='Track enrollment, replies, meetings, and status for every contact.'
        cols={2}
        background='dots'
        rules='dashed'
        guideLines
        items={INTERACTION_ITEMS}
      />
      <Divider />
      <PlatformNavSection currentHref="/platform/sequences" />
      <TrialSection
        source="sequences"
        headingLayout="inline"
      />
    </main>
  )
}
