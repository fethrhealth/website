'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

/** Routes that should render WITHOUT the site footer. */
const NO_FOOTER_ROUTES = ['/redefine']

export function ClientFooter() {
  const pathname = usePathname()
  if (NO_FOOTER_ROUTES.includes(pathname)) return null
  return <Footer />
}
