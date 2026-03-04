import { FaqSection } from "@/components/sections/FaqSection"
import { REFER_FAQ } from "@/data/faq"

export default function ReferPage(): React.ReactElement {
  return (
    <main>
      <FaqSection items={REFER_FAQ}/>
    </main>
  )
}
