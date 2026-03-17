import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import TrialSection from '@/components/sections/TrialSection'
import SecuritySection from '@/components/sections/SecuritySection'
import { CtaSection } from '@/components/sections/CtaSection'
import Divider from '@/components/ui/divider'
import { HomeScaleSection } from '@/components/sections/HomeScaleSection'
import { HomeBentoSection } from '@/components/sections/HomeBentoSection'
import { HomeHeroSection } from '@/components/sections/HomeHeroSection'
import { HomeAdaptiveSection } from '@/components/sections/HomeAdaptiveSection'

/**
 * Home page — pixel-perfect clone of attio.com adapted for Fethr Health.
 */
export default function HomePage(): React.ReactElement {
  return (
    <main>
      <HomeHeroSection />
      <HomeBentoSection />
      <Divider/>
      <TrialSection />
      <HomeAdaptiveSection
        index={2}
        sectionLabel="Adaptive model"
        sectionTag="/ data ↔ business"
        heading="A seismic shift in CRM flexibility."
        description="Fethr's powerful data model adapts to how your health team works, not the other way around. Your business model — perfectly reflected in your CRM."
        ctaText="Explore the data model"
        ctaHref="/platform/data"
      >
      </HomeAdaptiveSection>
      <TestimonialsSection />
      <HomeScaleSection
        index={4}
        sectionLabel="Built for scale"
        sectionTag="/ growth + security"
        heading="The platform built for high-growth health teams."
        description="Fethr handles millions of patient touchpoints with zero latency and enterprise-grade reliability."
        stats={[
          { value: '200,000,000', label: 'Patient records' },
          { value: '132', suffix: '+', label: 'Health systems' },
          { value: '7,000', suffix: '+', label: 'Clinics' },
          { value: '99.9%', label: 'Uptime' },
        ]}
      />
      <SecuritySection />
      <Divider />
      <CtaSection />
    </main>
  )
}
