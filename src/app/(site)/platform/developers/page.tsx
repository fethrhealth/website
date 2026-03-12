import { DevelopersHeroSection } from '@/components/sections/DevelopersHeroSection'
import { DevelopersMcpSection } from '@/components/sections/DevelopersMcpSection'

/**
 * Developers page — /platform/developers
 */
export default function DevelopersPage(): React.ReactElement {
  return (
    <main>
      <DevelopersHeroSection />
      <DevelopersMcpSection />
    </main>
  )
}
