import type { Metadata } from 'next'
import { CompaniesSection } from "@/components/sections/CompaniesSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { PageHero } from "@/components/sections/PageHero"
import { STARTUPS_FAQ } from "@/data/startups-faq"
import { STARTUP_COMPANY_LOGOS } from "@/data/company-logos"
import { StartupApplicationSection } from "@/components/sections/StartupApplicationSection"
import { STARTUPS_HERO } from "@/data/startups-hero"
import { STARTUPS_APPLICATION } from "@/data/startups-application"

export const metadata: Metadata = {
  title: 'Startups',
  description: 'Get 80% off Fethr Health and tools to help your startup grow. Built for the next generation of healthcare companies.',
}

export default function StartupsPage(): React.ReactElement {
  return (
    <main>
      <PageHero
        badge={STARTUPS_HERO.badge}
        heading={STARTUPS_HERO.heading}
        subheading={STARTUPS_HERO.subheading}
        paddingBottom="pb-10 lg:pb-16 xl:pb-24"
      />
      {/* TODO: Re-enable CompaniesSection when we have our own startup logos
      <CompaniesSection logos={ STARTUP_COMPANY_LOGOS }/>
      */}
      <StartupApplicationSection
        heading={STARTUPS_APPLICATION.heading}
        benefitsLabel={STARTUPS_APPLICATION.benefitsLabel}
        benefits={STARTUPS_APPLICATION.benefits}
        qualificationNote={STARTUPS_APPLICATION.qualificationNote}
      />
      <FaqSection items={STARTUPS_FAQ}/>
    </main>
  )
}
