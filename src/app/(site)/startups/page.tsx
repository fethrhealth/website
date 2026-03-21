import type { Metadata } from 'next'
import { CompaniesSection } from "@/components/sections/CompaniesSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { PageHero } from "@/components/sections/PageHero"
import { STARTUPS_FAQ } from "@/data/faq"
import { STARTUP_COMPANY_LOGOS } from "@/data/company-logos"
import { StartupApplicationSection } from "@/components/sections/StartupApplicationSection"

export const metadata: Metadata = {
  title: 'Startups',
  description: 'Get 80% off Fethr Health and tools to help your startup grow. Built for the next generation of healthcare companies.',
}

export default function StartupsPage(): React.ReactElement {
  return (
    <main>
      <PageHero
        badge="Startup program"
        heading="Attio for startups." 
        subheading="Build on the CRM for the next generation. Get 80% off Attio and benefits to help your startup grow."
      />
      <CompaniesSection logos={ STARTUP_COMPANY_LOGOS }/>
      <StartupApplicationSection/>
      <FaqSection items={STARTUPS_FAQ}/>
    </main>
  )
}
