import type { Metadata } from 'next'
import { AccordionImageSection } from '@/components/sections/AccordionImageSection'
import { BentoGridSection } from '@/components/sections/BentoGridSection'
import { CompaniesSection } from '@/components/sections/CompaniesSection'
import { FeatureCardsSection } from '@/components/sections/FeatureCardsSection'
import { PageHero } from '@/components/sections/PageHero'
import { ProductivityFloatingCursors } from '@/components/sections/ProductivityFloatingCursors'
import { ProductivityHeroImages } from '@/components/sections/ProductivityHeroImages'
import TrialSection from '@/components/sections/TrialSection'
import { PRODUCTIVITY_FEATURES, PRODUCTIVITY_FEATURES_HEADING, PRODUCTIVITY_FEATURES_SUBTEXT } from '@/data/productivity-features'
import { PRODUCTIVITY_CTA_SOURCE } from '@/data/productivity-cta'
import { STAY_IN_THE_FLOW, FLOW_HEADING_PRIMARY, FLOW_HEADING_MUTED, FLOW_SUBHEADING } from '@/data/productivity-flow'
import { COLLABORATE_WITH_COMMENTS, COMMENTS_HEADING_PRIMARY, COMMENTS_HEADING_MUTED, COMMENTS_SUBTEXT } from '@/data/productivity-comments'
import { NEED_FOR_SPEED, NEED_FOR_SPEED_FEATURES, SPEED_HEADING_PRIMARY, SPEED_HEADING_MUTED, SPEED_SUBHEADING } from '@/data/productivity-speed'
import { BENTO_EMAIL_RELEVANT, EMAIL_RELEVANT, EMAIL_RELEVANT_HEADING_PRIMARY, EMAIL_RELEVANT_HEADING_MUTED, EMAIL_RELEVANT_SUBTEXT } from '@/data/productivity-relevant'
import { SAME_TEAM_SAME_PAGE, SAME_TEAM_HEADING_PRIMARY, SAME_TEAM_HEADING_MUTED, SAME_TEAM_SUBHEADING } from '@/data/productivity-same-team'
import { BENTO_INTELLIGENT_CALLS, INTELLIGENT_CALLS_HEADING_PRIMARY, INTELLIGENT_CALLS_HEADING_MUTED, INTELLIGENT_CALLS_SUBTEXT } from '@/data/productivity-intelligent-calls'
import { PRODUCTIVITY_HERO_BADGE, PRODUCTIVITY_HERO_HEADING, PRODUCTIVITY_HERO_SUBHEADING, PRODUCTIVITY_HERO_CTA_LABEL, PRODUCTIVITY_HERO_CTA_HREF, PRODUCTIVITY_HERO_FORM_SOURCE } from '@/data/productivity-hero'
import { REPORTING_ENGINE } from '@/data/platform-reporting'
import { Divide } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Productivity',
  description: 'Do more with less friction. Fethr Health keeps your team in flow with tools designed for speed and collaboration.',
}

/**
 * Productivity page — /platform/productivity
 */
export default function ProductivityPage(): React.ReactElement {
  return (
    <main>
      <div className="container">
        <div className='relative'>
        <PageHero
          badge={PRODUCTIVITY_HERO_BADGE}
          heading={PRODUCTIVITY_HERO_HEADING}
          subheading={PRODUCTIVITY_HERO_SUBHEADING}
          primaryCta={{ label: PRODUCTIVITY_HERO_CTA_LABEL, href: PRODUCTIVITY_HERO_CTA_HREF }}
          showSales
          mobileFormSource={PRODUCTIVITY_HERO_FORM_SOURCE}
          showMobileSales
        />
        <ProductivityFloatingCursors />
        </div>
        <ProductivityHeroImages />
      </div>
      <CompaniesSection />
      <BentoGridSection
        headingMutedFirst={false}
        headerLayout='split'
        headingPrimary={INTELLIGENT_CALLS_HEADING_PRIMARY}
        headingMuted={INTELLIGENT_CALLS_HEADING_MUTED}
        subtext={INTELLIGENT_CALLS_SUBTEXT}
        items={BENTO_INTELLIGENT_CALLS}
      />
      <AccordionImageSection
        headerLayout="centered"
        headingPrimary={SAME_TEAM_HEADING_PRIMARY}
        headingMuted={SAME_TEAM_HEADING_MUTED}
        headingMutedFirst
        imagePosition='left'
        subheading={SAME_TEAM_SUBHEADING}
        items={SAME_TEAM_SAME_PAGE}
      />
      <BentoGridSection
        headingMutedFirst={false}
        headerLayout='split'
        headingPrimary={EMAIL_RELEVANT_HEADING_PRIMARY}
        headingMuted={EMAIL_RELEVANT_HEADING_MUTED}
        subtext={EMAIL_RELEVANT_SUBTEXT}
        items={BENTO_EMAIL_RELEVANT}
      />
      <FeatureCardsSection items={EMAIL_RELEVANT} />
      <AccordionImageSection
        headerLayout="centered"
        headingPrimary={SPEED_HEADING_PRIMARY}
        headingMuted={SPEED_HEADING_MUTED}
        headingMutedFirst
        subheading={SPEED_SUBHEADING}
        items={NEED_FOR_SPEED}
      />
      <FeatureCardsSection items={NEED_FOR_SPEED_FEATURES} />
      <BentoGridSection
        headingMutedFirst={false}
        headerLayout='split'
        headingPrimary={COMMENTS_HEADING_PRIMARY}
        headingMuted={COMMENTS_HEADING_MUTED}
        subtext={COMMENTS_SUBTEXT}
        items={COLLABORATE_WITH_COMMENTS}
      />
      <AccordionImageSection
        headerLayout="centered"
        headingPrimary={FLOW_HEADING_PRIMARY}
        headingMuted={FLOW_HEADING_MUTED}
        imagePosition='left'
        subheading={FLOW_SUBHEADING}
        items={STAY_IN_THE_FLOW}
      />
      <FeatureCardsSection
        heading={PRODUCTIVITY_FEATURES_HEADING}
        subtext={PRODUCTIVITY_FEATURES_SUBTEXT}
        items={PRODUCTIVITY_FEATURES}
      />
      <Divide/>
      <TrialSection
        source={PRODUCTIVITY_CTA_SOURCE}
        headingLayout='inline'
      />
    </main>
  )
}
