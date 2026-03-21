import type { Metadata } from 'next'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import TrialSection from '@/components/sections/TrialSection'
import SecuritySection from '@/components/sections/SecuritySection'
import { CtaSection } from '@/components/sections/CtaSection'
import Divider from '@/components/ui/divider'
import { HomeScaleSection } from '@/components/sections/HomeScaleSection'
import { HomeSpeedSection } from '@/components/sections/HomeSpeedSection'
import { HomeSpeedVisual } from '@/components/sections/HomeSpeedVisual'
import { HomeBentoSection } from '@/components/sections/HomeBentoSection'
import { HomeHeroSection } from '@/components/sections/HomeHeroSection'
import { HomeAdaptiveSection } from '@/components/sections/HomeAdaptiveSection'
import {
  ADAPTIVE_SECTION_LABEL, ADAPTIVE_SECTION_TAG,
  ADAPTIVE_HEADING, ADAPTIVE_DESCRIPTION,
  ADAPTIVE_CTA_TEXT, ADAPTIVE_CTA_HREF,
} from '@/data/home-adaptive'
import {
  SPEED_SECTION_LABEL, SPEED_SECTION_TAG,
  SPEED_HEADING, SPEED_DESCRIPTION,
  SPEED_CTA_TEXT, SPEED_CTA_HREF,
} from '@/data/home-speed'
import {
  SCALE_SECTION_LABEL, SCALE_SECTION_TAG,
  SCALE_HEADING, SCALE_DESCRIPTION,
  SCALE_STATS,
} from '@/data/home-scale'

export const metadata: Metadata = {
  title: 'The CRM for modern healthcare teams',
  description: 'Fethr Health gives healthcare teams a CRM built for their world — fast, flexible, and deeply integrated with the tools they already use.',
}

/**
 * Home page — pixel-perfect clone of attio.com adapted for Fethr Health.
 */
export default function HomePage(): React.ReactElement {
  return (
    <main>
      <HomeHeroSection />
      <HomeBentoSection />
      <Divider />
      <TrialSection
        source='home'
        showSales={false}
        showPlansLink
        showImageMobile
      />
      <Divider />
      <HomeAdaptiveSection
        index={2}
        sectionLabel={ADAPTIVE_SECTION_LABEL}
        sectionTag={ADAPTIVE_SECTION_TAG}
        heading={ADAPTIVE_HEADING}
        description={ADAPTIVE_DESCRIPTION}
        ctaText={ADAPTIVE_CTA_TEXT}
        ctaHref={ADAPTIVE_CTA_HREF}
      />
      <TestimonialsSection />
      <HomeSpeedSection
        index={3}
        sectionLabel={SPEED_SECTION_LABEL}
        sectionTag={SPEED_SECTION_TAG}
        heading={SPEED_HEADING}
        description={SPEED_DESCRIPTION}
        ctaText={SPEED_CTA_TEXT}
        ctaHref={SPEED_CTA_HREF}
      >
        <HomeSpeedVisual />
      </HomeSpeedSection>
      <HomeScaleSection
        index={4}
        sectionLabel={SCALE_SECTION_LABEL}
        sectionTag={SCALE_SECTION_TAG}
        heading={SCALE_HEADING}
        description={SCALE_DESCRIPTION}
        stats={SCALE_STATS}
      />
      <Divider />
      <SecuritySection />
      <Divider />
      <CtaSection />
    </main>
  )
}
