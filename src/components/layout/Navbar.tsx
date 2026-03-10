'use client'

import { useState, useEffect, useCallback, Fragment, type ReactNode } from 'react'
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
  icon: ReactNode
}

interface NavSection {
  heading: string
  items: NavDropdownItem[]
}

// ─── Icons (40×40 inline SVGs, stroke-based, use currentColor) ───────────────

// Ask Fethr: product icon from /public/assets/icons/navbar/
const askIcon = (
  <Image
    src="/assets/icons/navbar/ask-attio.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// AI Platform: neural nodes connected
const aiIcon = (
  <Image
    src="/assets/icons/navbar/ai.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// Data Model: table grid
const dataIcon = (
  <Image
    src="/assets/icons/navbar/data-model.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// Productivity: checklist
const productivityIcon = (
  <Image
    src="/assets/icons/navbar/productivity.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// Workflows: branching flow diagram
const workflowsIcon = (
  <Image
    src="/assets/icons/navbar/workflows.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// Sequences: email steps
const sequencesIcon = (
  <Image
    src="/assets/icons/navbar/sequences.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// Reporting: ascending bar chart
const reportingIcon = (
  <Image
    src="/assets/icons/navbar/reporting.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// Developer Platform: code brackets
const developersIcon = (
  <Image
    src="/assets/icons/navbar/developer.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// Blog: document with text
const blogIcon = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute inset-0 text-fg-tertiary" aria-hidden>
    <path d="M12 7h12l8 8v17a2 2 0 01-2 2H12a2 2 0 01-2-2V9a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M24 7v8h8" stroke="currentColor" strokeWidth="1.1" />
    <path d="M14 20h12M14 24h12M14 28h8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
)

// Startup: rocket
const startupIcon = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute inset-0 text-fg-tertiary" aria-hidden>
    <path d="M20 8c-2 5-5 9-5 15h10c0-6-3-10-5-15z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M15 23l-3 6M25 23l3 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="20" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.1" />
  </svg>
)

// Partners: two overlapping circles (people)
const partnersIcon = (
  <Image
    src="/assets/icons/navbar/partner.png"
    alt=""
    width={40}
    height={40}
    className="absolute inset-0 size-10 object-cover"
  />
)

// ─── Data ────────────────────────────────────────────────────────────────────

const PLATFORM_SECTIONS: NavSection[] = [
  {
    heading: 'Platform',
    items: [
      { title: 'Ask Fethr',       href: '/platform/ask',          description: 'Get instant answers from your data',        icon: askIcon },
      { title: 'AI',              href: '/platform/ai',           description: 'AI-native features built for your team',    icon: aiIcon },
      { title: 'Data model',      href: '/platform/data',         description: 'Flexible, real-time data infrastructure',   icon: dataIcon },
      { title: 'Productivity',    href: '/platform/productivity', description: 'Stay focused on what matters most',         icon: productivityIcon },
    ],
  },
  {
    heading: 'Automations',
    items: [
      { title: 'Workflows',       href: '/platform/workflows',    description: 'Automate your most critical processes',     icon: workflowsIcon },
      { title: 'Sequences',       href: '/platform/sequences',    description: 'Run personalized outreach at scale',        icon: sequencesIcon },
    ],
  },
  {
    heading: 'Insights',
    items: [
      { title: 'Reporting',       href: '/platform/reporting',    description: 'Track performance with live dashboards',    icon: reportingIcon },
      { title: 'Developer Platform', href: '/platform/developers', description: 'Build with powerful APIs and webhooks',   icon: developersIcon },
    ],
  },
]

const RESOURCE_ITEMS: NavDropdownItem[] = [
  { title: 'Blog',             href: '/blog',     description: 'Insights on healthcare CRM strategy',    icon: blogIcon },
  { title: 'Startup Program',  href: '/startups', description: 'Get Fethr free for up to 2 years',       icon: startupIcon },
  { title: 'Become a Partner', href: '/partners', description: 'Join our partner ecosystem',             icon: partnersIcon },
]

const STANDALONE_LINKS = [
  { title: 'Customers', href: '/customers' },
  { title: 'Pricing',   href: '/pricing' },
]

// ─── Framer Motion variants (kept from existing) ──────────────────────────────

const dropdownVariants = {
  hidden:  { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: [0.2, 0, 0, 1] as const },
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Attio-style decorative grid that sits over each nav icon */
function NavIconGrid() {
  return (
    <svg
      width="40"
      height="40"
      fill="none"
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden
    >
      <g
        className={cn(
          'stroke-white-700/40 group-hover:stroke-white-700/70',
          'dark:stroke-black-500/40 dark:group-hover:stroke-black-500/70',
          'transition-colors duration-150',
        )}
        strokeWidth="0.7"
        strokeMiterlimit="10"
      >
        {/* dashed diagonal + horizontal lines */}
        <path d="M40 14H0M40 26H0M19.947 0 20 40" strokeDasharray="1.6 1.6" />
        {/* solid grid lines */}
        <path d="M35 0v40M5 0v40M0 5h40M0 35h40" />
      </g>
    </svg>
  )
}

/** 12×12 right-arrow that slides in on group-hover */
function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="relative hidden lg:block shrink-0 text-fg-caption opacity-0 -translate-x-0.5 transition-[opacity,translate] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-200"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3536 6.35356C10.5488 6.1583 10.5488 5.84171 10.3536 5.64645L7.85355 3.14645C7.65829 2.95118 7.34171 2.95118 7.14645 3.14645C6.95118 3.34171 6.95118 3.65829 7.14645 3.85355L8.79289 5.5L2 5.50001C1.72386 5.50001 1.5 5.72386 1.5 6.00001C1.5 6.27615 1.72386 6.50001 2 6.50001L8.79289 6.5L7.14645 8.14645C6.95118 8.34171 6.95118 8.65829 7.14645 8.85355C7.34171 9.04882 7.65829 9.04882 7.85355 8.85355L10.3536 6.35356Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Single dropdown item with icon, title, description, and hover arrow */
function DropdownCard({ item }: { item: NavDropdownItem }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={item.href}
        className={cn(
          'group relative inline-flex w-full cursor-pointer items-center gap-x-3',
          'rounded-xl border border-transparent p-1.5 md:p-2',
          'transition-colors duration-150 hover:bg-surface-subtle hover:duration-75',
        )}
      >
        {/* 40×40 icon with grid overlay */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[13px] border border-subtle-stroke md:rounded-none md:border-0">
          <NavIconGrid />
          {item.icon}
        </div>

        {/* Text content */}
        <div className="flex w-full min-w-0 flex-col pr-2">
          <div className="flex w-full items-baseline justify-between gap-1.5 text-fg-primary">
            <span className="truncate text-sm">{item.title}</span>
            <ArrowIcon />
          </div>
          <p className="truncate text-sm text-fg-accent">{item.description}</p>
        </div>
      </Link>
    </NavigationMenuLink>
  )
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const triggerCn = cn(
  'h-9 bg-transparent px-3 py-1.5 text-[15px] font-medium gap-x-1.5',
  'text-fg-secondary hover:text-fg-primary',
  'hover:bg-surface-subtle data-[state=open]:bg-surface-subtle',
  'data-[state=open]:text-fg-primary',
  'rounded-[10px] border border-transparent transition-colors duration-300 hover:duration-75',
)

const plainLinkCn = cn(
  'relative inline-flex items-center h-9 px-3 rounded-[10px]',
  'text-[15px] font-medium text-fg-secondary border border-transparent',
  'hover:text-fg-primary hover:bg-surface-subtle',
  'transition-colors duration-300 hover:duration-75',
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
        'border-b border-subtle-stroke',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent',
      )}
    >
      {/* Container — logo + nav on LEFT, CTAs on RIGHT (matches Attio layout) */}
      <div className="container mx-auto px-6 h-full flex items-center justify-between">

        {/* ── LEFT: Logo + desktop nav together ─────────────────────────── */}
        <div className="flex grow items-center gap-x-9">

          {/* Logo */}
          <Link href="/" className="-mx-1.5 rounded-xl px-1.5 flex-shrink-0">
            <Image
              src="/assets/logos/logo.svg"
              alt="Fethr Health"
              width={96}
              height={28}
              priority
            />
          </Link>

          {/* Desktop nav (hidden on mobile) */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">

                {/* ── Platform dropdown ─────────────────────────────────── */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerCn}>
                    Platform
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* 2-column grid with section headers spanning full width */}
                      <ul className="w-[576px] grid grid-cols-2 gap-x-3 p-4 pt-3">
                        {PLATFORM_SECTIONS.map((section) => (
                          <Fragment key={section.heading}>
                            {/* Section header — spans both columns */}
                            <li className="col-span-2 mt-3 mb-1 px-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-fg-caption leading-4">
                                {section.heading}
                              </p>
                            </li>

                            {/* Section items */}
                            {section.items.map((item) => (
                              <li key={item.href}>
                                <DropdownCard item={item} />
                              </li>
                            ))}
                          </Fragment>
                        ))}
                      </ul>
                    </motion.div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ── Resources dropdown ────────────────────────────────── */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={triggerCn}>
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex w-[320px] flex-col gap-0.5 p-4 pt-3"
                    >
                      <li className="mb-1 px-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-fg-caption leading-4">
                          Company
                        </p>
                      </li>
                      {RESOURCE_ITEMS.map((item) => (
                        <li key={item.href}>
                          <DropdownCard item={item} />
                        </li>
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ── Standalone links ──────────────────────────────────── */}
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
        </div>

        {/* ── RIGHT: Desktop CTAs + mobile hamburger ─────────────────────── */}
        <div className="flex items-center gap-x-2.5">

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-x-2.5">
            <Link
              href="/login"
              className={cn(
                'relative inline-flex cursor-pointer items-center justify-center',
                'text-nowrap h-9 gap-x-1.5 rounded-[10px] px-3 text-sm',
                'border border-subtle-stroke bg-transparent',
                'text-fg-primary hover:bg-surface-subtle',
                'transition-colors duration-300 hover:duration-75',
              )}
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className={cn(
                'relative inline-flex cursor-pointer items-center justify-center',
                'text-nowrap h-9 gap-x-1.5 rounded-[10px] px-3 text-sm',
                'bg-fg-primary text-background border border-transparent',
                'hover:bg-fg-secondary',
                'transition-colors duration-300 hover:duration-75',
              )}
            >
              Start for free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="lg:hidden size-9 rounded-[10px] text-fg-secondary hover:text-fg-primary hover:bg-surface-subtle"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] flex flex-col p-0">
              {/* Header */}
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-subtle-stroke">
                <SheetClose asChild>
                  <Link href="/">
                    <Image
                      src="/assets/logos/logo.svg"
                      alt="Fethr Health"
                      width={80}
                      height={24}
                    />
                  </Link>
                </SheetClose>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              </SheetHeader>

              {/* Mobile nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
                <p className="px-3 py-1 text-xs font-semibold text-fg-caption uppercase tracking-wider">
                  Platform
                </p>
                {PLATFORM_SECTIONS.flatMap((s) => s.items).map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className={mobileNavLinkCn}>
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}

                <div className="my-2 border-t border-subtle-stroke" />

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

                <div className="my-2 border-t border-subtle-stroke" />

                {STANDALONE_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className={mobileNavLinkCn}>
                      {link.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Mobile CTA buttons */}
              <div className="px-6 py-6 border-t border-subtle-stroke flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className="relative inline-flex cursor-pointer items-center justify-center w-full h-[46px] gap-x-2 rounded-xl px-3.5 text-base border border-subtle-stroke bg-transparent text-fg-primary hover:bg-surface-subtle transition-colors duration-150"
                  >
                    Sign in
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/signup"
                    className="relative inline-flex cursor-pointer items-center justify-center w-full h-[46px] gap-x-2 rounded-xl px-3.5 text-base bg-fg-primary text-background hover:bg-fg-secondary transition-colors duration-150"
                  >
                    Start for free
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}
