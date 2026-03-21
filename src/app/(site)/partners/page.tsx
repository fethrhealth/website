import type { Metadata } from 'next'
import { PartnersHeroSection } from "@/components/sections/PartnersHeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PARTNERS_TESTIMONIALS } from "@/data/testimonials";
import Divider from "@/components/ui/divider";
import { KeepUpToDateSection } from "@/components/sections/KeepUpToDateSection";

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Grow your business with Fethr Health. Join our partner network and help healthcare teams work better.',
}

/**
 * Partners page — /partners
 * TODO Phase 2: Implement pixel-perfect design.
 */
export default function PartnersPage(): React.ReactElement {
  return (
    <main>
      <PartnersHeroSection />
      <Divider/>
      <PartnersSection />
      <TestimonialsSection items={ PARTNERS_TESTIMONIALS }/>
      <KeepUpToDateSection/>
    </main>
  )
}
