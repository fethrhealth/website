import { FaqSection } from "@/components/sections/FaqSection"
import { PageHero } from "@/components/sections/PageHero"
import { REFER_FAQ } from "@/data/faq"
import TrialSection from "@/components/sections/TrialSection"
import { CompaniesSection } from "@/components/sections/CompaniesSection"
import { ReferralProcessSection } from "@/components/sections/ReferralProcessSection"
import { AccordionImageSection } from "@/components/sections/AccordionImageSection"
import { TIER_1_REWARDS } from "@/data/rewards"

export default function ReferPage(): React.ReactElement {
  return (
    <main>
      <PageHero
        badge="Referral program"
        heading="Gift teams 10% off. Earn exclusive rewards."
        subheading="Refer more teams to Attio, gift them 10% off their subscription, and earn exclusive rewards."
        primaryCta={{ label: "Get my shareable link", href: "/refer" }}
        paddingBottom="pb-10 lg:pb-16 xl:pb-24"
      />
      <CompaniesSection />
      <ReferralProcessSection />
      <AccordionImageSection
        headerLayout="split"
        headingPrimary="Selected"
        headingMuted="just for you."
        headingLineBreak
        subheading="The more teams you refer, the more exclusive bundles you can claim."
        items={TIER_1_REWARDS}
      />
      <FaqSection items={REFER_FAQ} />
      <TrialSection />
    </main>
  )
}
