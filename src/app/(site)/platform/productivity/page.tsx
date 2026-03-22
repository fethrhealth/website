import type { Metadata } from 'next'
import { AccordionImageSection } from '@/components/sections/AccordionImageSection'
import { BentoGridSection } from '@/components/sections/BentoGridSection'
import { CompaniesSection } from '@/components/sections/CompaniesSection'
import { FeatureCardsSection } from '@/components/sections/FeatureCardsSection'
import { PageHero } from '@/components/sections/PageHero'
import { ProductivityFloatingCursors } from '@/components/sections/ProductivityFloatingCursors'
import { ProductivityHeroImages } from '@/components/sections/ProductivityHeroImages'
import TrialSection from '@/components/sections/TrialSection'
import { PRODUCTIVITY_FEATURES, STAY_IN_THE_FLOW, COLLABORATE_WITH_COMMENTS, EMAIL_RELEVANT, NEED_FOR_SPEED, NEED_FOR_SPEED_FEATURES, BENTO_EMAIL_RELEVANT, SAME_TEAM_SAME_PAGE, BENTO_INTELLIGENT_CALLS } from '@/data/platform-productivity'
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
        headingPrimary="Your calls,\n"
        headingMuted="made intellingent."
        subtext="Focus on your conversations while AI surfaces insights in real-time."
        items={BENTO_INTELLIGENT_CALLS}
      />
      <AccordionImageSection
        headerLayout="centered"
        headingPrimary=" Same page."
        headingMuted="Same team."
        headingMutedFirst
        imagePosition='left'
        subheading="Attio’s next-level notes allow you and your teammates to collaborate in real-time."
        items={SAME_TEAM_SAME_PAGE}
      />
      <BentoGridSection
        headingMutedFirst={false}
        headerLayout='split'
        headingPrimary="Make every email\n"
        headingMuted="relevant."
        subtext="Use your business, customer and product data to craft emails that resonate with your prospects."
        items={BENTO_EMAIL_RELEVANT}
      />
      <FeatureCardsSection items={EMAIL_RELEVANT} />
      <AccordionImageSection
        headerLayout="centered"
        headingPrimary=" for speed"
        headingMuted="The need"
        headingMutedFirst
        subheading="Search through records, notes, and tasks and take actions at the speed of lightning with Attio’s command palette."
        items={NEED_FOR_SPEED}
      />
      <FeatureCardsSection items={NEED_FOR_SPEED_FEATURES} />
      <BentoGridSection
        headingMutedFirst={false}
        headerLayout='split'
        headingPrimary=" Collaborate with \n"
        headingMuted="comments."
        subtext="Access, visualize and explore all your data as quickly as you can think."
        items={COLLABORATE_WITH_COMMENTS}
      />
      <AccordionImageSection
        headerLayout="centered"
        headingPrimary="Stay in the"
        headingMuted=" flow"
        imagePosition='left'
        subheading="Attio\’s browser extension allows you to prospect, have context and keep your CRM up-to-date at all times."
        items={STAY_IN_THE_FLOW}
      />
      <FeatureCardsSection
        heading="And that's not all..."
        subtext="From task management and templates to file sharing and more, Fethr's got your entire team covered."
        items={PRODUCTIVITY_FEATURES}
      />
      <Divide/>
      <TrialSection
        source='productivity'
        headingLayout='inline'
      />
    </main>
  )
}
