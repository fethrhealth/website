import type { Metadata } from 'next'
import { FaqSection } from "@/components/sections/FaqSection"
import { PageHero } from "@/components/sections/PageHero"
import { REFER_FAQ } from "@/data/faq"
import { ReferralProcessSection } from "@/components/sections/ReferralProcessSection"
import { RevenueShareSection } from "@/components/sections/RevenueShareSection"
import { ReferHeroCta } from "./ReferHeroCta"
import { ReferTrialSection } from "./ReferTrialSection"

export const metadata: Metadata = {
  title: 'Refer',
  description: 'Refer healthcare organizations to Fethr Health and earn 10% revenue share for 3 years. No cap on deal size or number of referrals.',
}

export default function ReferPage(): React.ReactElement {
  return (
    <main>
      <PageHero
        badge="Referral program"
        heading="Refer an organization. Earn 10% revenue share."
        subheading="Introduce healthcare organizations to Fethr and earn 10% of the annual engagement revenue for 3 years."
        paddingBottom="pb-0"
      />
      <ReferHeroCta />
      {/* TODO: Re-enable CompaniesSection when we have our own logos
      <CompaniesSection />
      */}
      <ReferralProcessSection
        headingBold="Our referral"
        headingMuted="process."
        subheading="Earn recurring revenue by introducing organizations to Fethr in just a few steps."
      />
      <RevenueShareSection />
      <FaqSection items={REFER_FAQ} />
      <ReferTrialSection />
    </main>
  )
}
