import TestimonialsSection from '@/components/sections/TestimonialsSection'
import TrialSection from '@/components/sections/TrialSection'
import SecuritySection from '@/components/sections/SecuritySection'
import { CtaSection } from '@/components/sections/CtaSection'
import Divider from '@/components/ui/divider'

/**
 * Home page — pixel-perfect clone of attio.com adapted for Fethr Health.
 * TODO Phase 2: Build remaining sections (Hero, Features, CTA, etc.)
 */
export default function HomePage(): React.ReactElement {
  return (
    <main>
      <TrialSection />
      <TestimonialsSection />
      <SecuritySection />
      <Divider />
      <CtaSection />
    </main>
  )
}
