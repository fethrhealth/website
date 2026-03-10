import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <Navbar />
        <main className="pt-[60px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
