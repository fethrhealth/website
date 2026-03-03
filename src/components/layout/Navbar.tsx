'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavDropdownItem {
  title: string
  href: string
  description: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PLATFORM_ITEMS: NavDropdownItem[] = [
  { title: 'Ask Attio',          href: '/platform/ask',         description: 'Get instant answers from your CRM data' },
  { title: 'Data Model',         href: '/platform/data',        description: 'Flexible, real-time data infrastructure' },
  { title: 'Workflows',          href: '/platform/workflows',   description: 'Automate your most critical processes' },
  { title: 'Developer Platform', href: '/platform/developers',  description: 'Build with powerful APIs and webhooks' },
  { title: 'AI Platform',        href: '/platform/ai',          description: 'AI-native features built for GTM teams' },
  { title: 'Productivity',       href: '/platform/productivity', description: 'Stay focused on what matters most' },
  { title: 'Sequences',          href: '/platform/sequences',   description: 'Run personalized outreach at scale' },
  { title: 'Reporting',          href: '/platform/reporting',   description: 'Track performance with live dashboards' },
]

const RESOURCE_ITEMS: NavDropdownItem[] = [
  { title: 'Blog',             href: '/blog',     description: 'Insights on GTM strategy and CRM' },
  { title: 'Startup Program',  href: '/startups', description: 'Get Fethr free for up to 2 years' },
  { title: 'Become a Partner', href: '/partners', description: 'Join our partner ecosystem' },
]

const STANDALONE_LINKS = [
  { title: 'Customers', href: '/customers' },
  { title: 'Pricing',   href: '/pricing' },
]

// ─── Framer Motion variants ───────────────────────────────────────────────────

const dropdownVariants = {
  hidden:  { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: [0.2, 0, 0, 1] as const },
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Single item card inside a desktop dropdown panel */
function DropdownCard({ item }: { item: NavDropdownItem }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={item.href}
        className="block rounded-md px-3 py-2.5 hover:bg-surface-subtle transition-colors duration-150"
      >
        <p className="text-sm font-medium text-fg-primary leading-none mb-1">
          {item.title}
        </p>
        <p className="text-xs text-fg-tertiary leading-snug line-clamp-2">
          {item.description}
        </p>
      </Link>
    </NavigationMenuLink>
  )
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const triggerCn = cn(
  'h-auto bg-transparent px-3 py-1.5 text-sm font-medium',
  'text-fg-secondary hover:text-fg-primary',
  'hover:bg-surface-subtle data-[state=open]:bg-surface-subtle',
  'data-[state=open]:text-fg-primary',
  'rounded-md transition-colors duration-150',
)

const plainLinkCn = cn(
  'inline-flex items-center px-3 py-1.5 rounded-md',
  'text-sm font-medium text-fg-secondary',
  'hover:text-fg-primary hover:bg-surface-subtle',
  'transition-colors duration-150',
)

const mobileNavLinkCn = cn(
  'block px-3 py-2 rounded-md',
  'text-sm font-medium text-fg-secondary',
  'hover:text-fg-primary hover:bg-surface-subtle',
  'transition-colors duration-150',
)

// ─── Main component ───────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 8)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[60px] transition-all duration-150',
        isScrolled
          ? 'bg-background border-b border-stroke-subtle shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/logo.svg"
            alt="Fethr Health"
            width={96}
            height={28}
            priority
          />
        </Link>

        {/* ── Desktop navigation ────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center" aria-label="Main navigation">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">

              {/* Platform dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCn}>
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.ul
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid w-[480px] grid-cols-2 gap-0.5 p-2"
                  >
                    {PLATFORM_ITEMS.map((item) => (
                      <li key={item.href}>
                        <DropdownCard item={item} />
                      </li>
                    ))}
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCn}>
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.ul
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex w-[260px] flex-col gap-0.5 p-2"
                  >
                    {RESOURCE_ITEMS.map((item) => (
                      <li key={item.href}>
                        <DropdownCard item={item} />
                      </li>
                    ))}
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Plain links */}
              {STANDALONE_LINKS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className={plainLinkCn}>
                      {link.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* ── Desktop CTA buttons ───────────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-x-2.5">
          <Link
            href="/login"
            className="button-outline relative inline-flex cursor-pointer items-center justify-center text-nowrap border h-9 gap-x-1.5 rounded-[10px] px-3 text-sm"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="button-primary relative inline-flex cursor-pointer items-center justify-center text-nowrap border h-9 gap-x-1.5 rounded-[10px] px-3 text-sm"
          >
            Start for free
          </Link>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────────────────── */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              className="lg:hidden text-fg-secondary hover:text-fg-primary hover:bg-surface-subtle"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] flex flex-col p-0">
            {/* Header with logo */}
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-stroke-subtle">
              <SheetClose asChild>
                <Link href="/">
                  <Image
                    src="/assets/logo.svg"
                    alt="Fethr Health"
                    width={80}
                    height={24}
                  />
                </Link>
              </SheetClose>
              {/* Required by Radix Dialog for accessibility */}
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            </SheetHeader>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
              <p className="px-3 py-1 text-xs font-semibold text-fg-caption uppercase tracking-wider">
                Platform
              </p>
              {PLATFORM_ITEMS.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className={mobileNavLinkCn}>
                    {item.title}
                  </Link>
                </SheetClose>
              ))}

              <div className="my-2 border-t border-stroke-subtle" />

              <p className="px-3 py-1 text-xs font-semibold text-fg-caption uppercase tracking-wider">
                Resources
              </p>
              {RESOURCE_ITEMS.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className={mobileNavLinkCn}>
                    {item.title}
                  </Link>
                </SheetClose>
              ))}

              <div className="my-2 border-t border-stroke-subtle" />

              {STANDALONE_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link href={link.href} className={mobileNavLinkCn}>
                    {link.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            {/* Mobile CTA buttons */}
            <div className="px-6 py-6 border-t border-stroke-subtle flex flex-col gap-2">
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="button-outline relative inline-flex cursor-pointer items-center justify-center text-nowrap border w-full h-[46px] gap-x-2 rounded-xl px-3.5 text-base"
                >
                  Sign in
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/signup"
                  className="button-primary relative inline-flex cursor-pointer items-center justify-center text-nowrap border w-full h-[46px] gap-x-2 rounded-xl px-3.5 text-base"
                >
                  Start for free
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}
