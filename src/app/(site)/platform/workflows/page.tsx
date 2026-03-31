import type { Metadata } from 'next'
import { AccordionImageSection } from '@/components/sections/AccordionImageSection'
import { BentoGridSection } from '@/components/sections/BentoGridSection'
import { CompaniesSection } from '@/components/sections/CompaniesSection'
import { FeatureCardsSection } from '@/components/sections/FeatureCardsSection'
import { ImageGridSection } from '@/components/sections/ImageGridSection'
import TrialSection from '@/components/sections/TrialSection'
import { IntegrationCardsSection } from '@/components/sections/IntegrationCardsSection'
import { WorkflowsHeroSection } from '@/components/sections/WorkflowsHeroSection'
import { WORKFLOW_EXAMPLES, BUILD_HEADING_MUTED, BUILD_HEADING_PRIMARY, BUILD_SUBTEXT, BUILD_CTA_LABEL, BUILD_CTA_HREF } from '@/data/workflows-build'
import { LEAD_UPDATES, LEADS_HEADING_PRIMARY, LEADS_HEADING_MUTED, LEADS_SUBHEADING } from '@/data/workflows-leads'
import { WORKFLOWS_CTA_SOURCE } from '@/data/workflows-cta'
import { AUTOMATION_WITH_AI, EMAIL_HEADING_PRIMARY, EMAIL_HEADING_MUTED, EMAIL_SUBTEXT } from '@/data/workflows-email'
import { WORKFLOW_INTEGRATIONS, AUTOMATIONS_HEADING_MUTED, AUTOMATIONS_HEADING_PRIMARY, AUTOMATIONS_SUBTEXT } from '@/data/workflows-automations'
import { AUTOMATE_YOUR_WAY, AUTOMATE_HEADING_PRIMARY, AUTOMATE_HEADING_MUTED, AUTOMATE_SUBHEADING } from '@/data/workflows-automate'
import { BETTER_SYSTEMS_BENTO, BETTER_SYSTEM_FEATURES } from '@/data/workflows-better-systems'
import Divider from '@/components/ui/divider'

export const metadata: Metadata = {
  title: 'Automations & Workflows',
  description: 'The future of automation, supercharged by AI. Build powerful workflows for your healthcare team, right inside your platform.',
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
      <BentoGridSection {...BETTER_SYSTEMS_BENTO} />
      <FeatureCardsSection items={BETTER_SYSTEM_FEATURES} />
      <IntegrationCardsSection
        headerLayout='split'
        headingMuted={AUTOMATIONS_HEADING_MUTED}
        headingPrimary={AUTOMATIONS_HEADING_PRIMARY}
        subtext={AUTOMATIONS_SUBTEXT}
        items={WORKFLOW_INTEGRATIONS}
      />
      <BentoGridSection
        headingMutedFirst={false}
        headerLayout='split'
        headingPrimary={EMAIL_HEADING_PRIMARY}
        headingMuted={EMAIL_HEADING_MUTED}
        subtext={EMAIL_SUBTEXT}
        items={AUTOMATION_WITH_AI}
      />
      <AccordionImageSection
        headerLayout="split"
        headingPrimary={LEADS_HEADING_PRIMARY}
        headingMuted={LEADS_HEADING_MUTED}
        subheading={LEADS_SUBHEADING}
        items={LEAD_UPDATES}
      />
      <ImageGridSection
        items={WORKFLOW_EXAMPLES}
        headingMuted={BUILD_HEADING_MUTED}
        headingPrimary={BUILD_HEADING_PRIMARY}
        subtext={BUILD_SUBTEXT}
        ctaLabel={BUILD_CTA_LABEL}
        ctaHref={BUILD_CTA_HREF}
      />
      <Divider/>
      <TrialSection headingLayout='inline' source={WORKFLOWS_CTA_SOURCE} />
    </main>
  )
}
