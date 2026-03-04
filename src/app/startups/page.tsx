import { FaqSection } from "@/components/sections/FaqSection"
import { STARTUPS_FAQ } from "@/data/faq"

export default function StartupsPage(): React.ReactElement {
  return (
    <main>
      <FaqSection items={STARTUPS_FAQ}/>
    </main>
  )
}
