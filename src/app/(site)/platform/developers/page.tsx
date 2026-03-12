import { DevelopersBuildYourWaySection } from '@/components/sections/DevelopersBuildYourWaySection'
import { DevelopersForDevsSection } from '@/components/sections/DevelopersForDevsSection'
import { DevelopersHeroSection } from '@/components/sections/DevelopersHeroSection'
import { DevelopersMcpSection } from '@/components/sections/DevelopersMcpSection'
import { DevelopersRestApiSection } from '@/components/sections/DevelopersRestApiSection'
import { DevelopersReviewSection } from '@/components/sections/DevelopersReviewSection'
import { DevelopersSdkAppsSection } from '@/components/sections/DevelopersSdkAppsSection'
import Divider from '@/components/ui/divider'

/**
 * Developers page — /platform/developers
 */
export default function DevelopersPage(): React.ReactElement {
  return (
    <main>
      <DevelopersHeroSection />
      <DevelopersMcpSection />
      <DevelopersRestApiSection />
      <DevelopersReviewSection
        quote="We’re both drawn to tools that believe in the builder economy — platforms that give you Lego blocks instead of rigid software. The Attio SDK gives the authority and autonomy back to builders."
        name="Will Stenzel"
        role="// Attio Developer"
      />
      <DevelopersBuildYourWaySection />
      <DevelopersForDevsSection />
      <DevelopersReviewSection
        quote="With the SDK, backend logic and frontend UI are seamlessly connected. It’s a joy to work with."
        name="Will Stenzel"
        role="// Fethr Developer"
      />
      <DevelopersSdkAppsSection/>
    </main>
  )
}
