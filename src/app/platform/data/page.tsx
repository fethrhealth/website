import { FeatureTabsSection } from '@/components/sections/FeatureTabsSection'
import { PlatformNavSection } from '@/components/sections/PlatformNavSection'
import TrialSection from '@/components/sections/TrialSection'
import Divider from '@/components/ui/divider'
import { DATA_PAGE_TABS } from '@/data/feature-tabs'

/**
 * Data page — /platform/data
 */
export default function DataPage(): React.ReactElement {
  return (
    <main>
      <FeatureTabsSection {...DATA_PAGE_TABS} />
      <Divider/>
      <PlatformNavSection currentHref="/platform/data" />
      <Divider/>
      <TrialSection />
    </main>
  )
}
