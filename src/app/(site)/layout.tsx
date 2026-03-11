import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { ClientFooter } from '@/components/layout/ClientFooter'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Inter Display isn't on Google Fonts — using Inter as fallback until we
// self-host the Inter Display optical-size variant.
const interDisplay = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter-display',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: {
    default: 'Fethr Health',
    template: '%s | Fethr Health',
  },
  description: 'Fethr Health — healthcare data platform.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable} ${lora.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <Navbar />
        <main className="pt-[60px]">{children}</main>
        <ClientFooter />
      </body>
    </html>
  )
}
