import { PageHero } from "@/components/sections/PageHero";
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
      <PageHero
        badge="Partner programs"
        heading="Partner with us to build the next generation of CRM." 
        subheading="We work with the best developers, creators, and consultants to power the next era of companies."
        paddingBottom="pb-24 lg:pb-28 xl:pb-32"
      />
      <Divider/>
      <PartnersSection />
      <TestimonialsSection items={ PARTNERS_TESTIMONIALS }/>
      <KeepUpToDateSection/>
    </main>
  )
}
