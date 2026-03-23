import type { Metadata } from 'next'
import { AccordionImageSection } from '@/components/sections/AccordionImageSection'
import { BentoGridSection } from '@/components/sections/BentoGridSection'
import { CompaniesSection } from '@/components/sections/CompaniesSection'
import { FeatureCardsSection } from '@/components/sections/FeatureCardsSection'
import { ImageGridSection } from '@/components/sections/ImageGridSection'
import TrialSection from '@/components/sections/TrialSection'
import { IntegrationCardsSection } from '@/components/sections/IntegrationCardsSection'
import { WorkflowsHeroSection } from '@/components/sections/WorkflowsHeroSection'
import { WORKFLOW_EXAMPLES, LEAD_UPDATES, AUTOMATION_WITH_AI, BETTER_SYSTEM_FEATURES, WORKFLOW_INTEGRATIONS } from '@/data/platform-workflows'
import { AUTOMATE_YOUR_WAY, AUTOMATE_HEADING_PRIMARY, AUTOMATE_HEADING_MUTED, AUTOMATE_SUBHEADING } from '@/data/workflows-automate'
import Divider from '@/components/ui/divider'

export const metadata: Metadata = {
  title: 'Workflows',
  description: 'Automate the repetitive work. Build powerful workflows that keep your healthcare team moving without the manual effort.',
}

/**
 * Workflows page — /platform/workflows
 */
export default function WorkflowsPage(): React.ReactElement {
  return (
    <main>
      <WorkflowsHeroSection />
      <CompaniesSection />
      <AccordionImageSection
        headerLayout="split"
        headingPrimary={AUTOMATE_HEADING_PRIMARY}
        headingMuted={AUTOMATE_HEADING_MUTED}
        subheading={AUTOMATE_SUBHEADING}
        items={AUTOMATE_YOUR_WAY}
      />
      <FeatureCardsSection items={BETTER_SYSTEM_FEATURES} />
      <IntegrationCardsSection
        headerLayout='split'
        headingMuted='Integrate '
        headingPrimary='automations with your stack.'
        subtext='Connect the best tools in your stack with Workflows to orchestrate your GTM efforts.'
        items = { WORKFLOW_INTEGRATIONS }
      />
      <BentoGridSection
        headingMutedFirst = {false}
        headerLayout='split'
        headingPrimary="Make every email\n"
        headingMuted="relevant."
        subtext="Use your business, customer and product data to craft emails that resonate with your prospects."
        items= { AUTOMATION_WITH_AI }
      />
      <AccordionImageSection
      headerLayout="split"
      headingPrimary="Keep your leads\n"
      headingMuted="in the loop."
      subheading="No more manual work. Automate and personalize your emails and follow-ups to close more deals."
      items = { LEAD_UPDATES }
      />
      <ImageGridSection 
        items={WORKFLOW_EXAMPLES} 
        headingMuted='Build'
        headingPrimary=' faster to go further.'
        subtext='Get up and running instantly with customizable, out-of-the-box templates.'
        ctaLabel='See templates library'
        ctaHref='/platform/workflows'
      />
      <Divider/>
      <TrialSection headingLayout='inline' source='workflows'/>
    </main>
  )
}
