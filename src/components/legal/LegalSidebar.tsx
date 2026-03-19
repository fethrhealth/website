'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarLink {
  label: string
  href: string
}

// Base classes for sidebar links — mirrors attio.com /legal aside links exactly
const LINK_BASE =
  '-mx-px rounded-sm px-px underline transition-colors duration-400 hover:duration-150 active:duration-50' +
  ' decoration-transparent hover:decoration-current active:decoration-current'

export function LegalSidebar({ links }: { links: SidebarLink[] }) {
  const pathname = usePathname()

  return (
    <aside className="flex shrink-0 flex-col gap-y-3 lg:w-48">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              LINK_BASE,
              isActive
                ? 'text-fg-link'          // active page — blue
                : 'text-accent-foreground hover:text-fg-secondary active:text-fg-primary',
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </aside>
  )
}
