import { PartnersHeroSection } from "@/components/sections/PartnersHeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PARTNERS_TESTIMONIALS } from "@/data/testimonials";
import Divider from "@/components/ui/divider";
import { KeepUpToDateSection } from "@/components/sections/KeepUpToDateSection";

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
