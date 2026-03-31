'use client'

import { useState, useEffect, useCallback, useRef, Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { IconMenu } from '../icons/IconMenu'
import { NAV_MENU, type NavIcon, type NavEntry } from '@/data/nav-menu'
import { TalkToSalesDialog } from '@/components/ui/TalkToSalesDialog'

// ─── Icon registry ────────────────────────────────────────────────────────────
// Maps icon keys (used in nav-menu.ts) to their JSX. Don't edit unless adding
// a new icon — to change menu items, edit src/data/nav-menu.ts instead.

const ICON_MAP: Record<NavIcon, ReactNode> = {
  ask: (
    <>
      <Image src="/assets/icons/navbar/ask-attio.png"                          alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-ask-attio-dark-3.svg" alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  ai: (
    <>
      <Image src="/assets/icons/navbar/ai.png"                     alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-ai-dark.svg" alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  data: (
    <>
      <Image src="/assets/icons/navbar/data-model.png"                      alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-data-dark.svg"     alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  productivity: (
    <>
      <Image src="/assets/icons/navbar/productivity.png"                              alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-collaboration-dark.svg"     alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  workflows: (
    <>
      <Image src="/assets/icons/navbar/workflows.png"                               alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-automations-dark.svg"      alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  sequences: (
    <>
      <Image src="/assets/icons/navbar/sequences.png"                               alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-sequences-dark-3.svg"      alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  reporting: (
    <>
      <Image src="/assets/icons/navbar/reporting.png"                           alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-reporting-dark.svg"    alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  developers: (
    <>
      <Image src="/assets/icons/navbar/developer.png"                                   alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-dev-platform-dark-3.svg"       alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
  blog: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute inset-0 text-fg-tertiary" aria-hidden>
      <path d="M12 7h12l8 8v17a2 2 0 01-2 2H12a2 2 0 01-2-2V9a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M24 7v8h8" stroke="currentColor" strokeWidth="1.1" />
      <path d="M14 20h12M14 24h12M14 28h8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  startup: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute inset-0 text-fg-tertiary" aria-hidden>
      <path d="M20 8c-2 5-5 9-5 15h10c0-6-3-10-5-15z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M15 23l-3 6M25 23l3 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="20" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  partners: (
    <>
      <Image src="/assets/icons/navbar/partner.png"                              alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hacker-mode:hidden" />
      <Image src="/assets/icons/navbar/hacker/navigation-partners-dark.svg"      alt="" width={40} height={40} loading="eager" className="absolute inset-0 size-10 object-cover hidden hacker-mode:block" />
    </>
  ),
}

// ─── Framer Motion variants ───────────────────────────────────────────────────

const dropdownVariants = {
  hidden:  { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: [0.2, 0, 0, 1] as const },
  },
}

// ─── Desktop helpers ──────────────────────────────────────────────────────────

function NavIconGrid() {
  return (
    <svg width="40" height="40" fill="none" className="absolute inset-0 z-10 pointer-events-none" aria-hidden>
      <g
        className={cn(
          'stroke-white-700/40 group-hover:stroke-white-700/70',
          'dark:stroke-black-500/40 dark:group-hover:stroke-black-500/70',
          'transition-colors duration-150',
        )}
        strokeWidth="0.7"
        strokeMiterlimit="10"
      >
        <path d="M40 14H0M40 26H0M19.947 0 20 40" strokeDasharray="1.6 1.6" />
        <path d="M35 0v40M5 0v40M0 5h40M0 35h40" />
      </g>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      className="relative hidden lg:block shrink-0 text-fg-caption opacity-0 -translate-x-0.5 transition-[opacity,translate] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-200"
      aria-hidden
    >
      <path
        fillRule="evenodd" clipRule="evenodd"
        d="M10.3536 6.35356C10.5488 6.1583 10.5488 5.84171 10.3536 5.64645L7.85355 3.14645C7.65829 2.95118 7.34171 2.95118 7.14645 3.14645C6.95118 3.34171 6.95118 3.65829 7.14645 3.85355L8.79289 5.5L2 5.50001C1.72386 5.50001 1.5 5.72386 1.5 6.00001C1.5 6.27615 1.72386 6.50001 2 6.50001L8.79289 6.5L7.14645 8.14645C6.95118 8.34171 6.95118 8.65829 7.14645 8.85355C7.34171 9.04882 7.65829 9.04882 7.85355 8.85355L10.3536 6.35356Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DropdownCard({ item }: { item: { title: string; href: string; description: string; icon: ReactNode } }) {
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
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[13px] border border-subtle-stroke md:rounded-none md:border-0">
          <NavIconGrid />
          {item.icon}
        </div>
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

// ─── Mobile accordion item ────────────────────────────────────────────────────

function MobileAccordionItem({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div className="border-b border-subtle-stroke pt-2.5 pb-[9px]">
      <h3 className="flex">
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="group flex flex-1 cursor-pointer items-center justify-between py-1.5 pl-1.5"
        >
          <span className="text-base text-primary-foreground hacker-mode:text-[#00d36a]">{label}</span>
          <svg
            className={cn(
              'h-5 w-5 text-black-500 hacker-mode:text-[#007f46] transition-transform duration-300 ease-in-out',
              isOpen && 'rotate-180',
            )}
            width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.25 7.125 9 10.875l3.75-3.75" />
          </svg>
        </button>
      </h3>
      {/* Smooth height animation via CSS grid rows trick */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const triggerCn = cn(
  'h-9 bg-transparent px-3 py-1.5 text-[15px] font-medium gap-x-1.5',
  'text-fg-secondary hover:text-fg-primary',
  'hover:bg-surface-subtle data-[state=open]:bg-surface-subtle',
  'data-[state=open]:text-fg-primary',
  'focus:bg-transparent focus:text-fg-secondary',
  'focus-visible:bg-surface-subtle focus-visible:text-fg-primary',
  'rounded-[10px] border border-transparent transition-colors duration-300 hover:duration-75',
)

// ─── Main component ───────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled]     = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openSection, setOpenSection]   = useState<string | null>(null)

  const lastHoverOpenMs = useRef(0)

  const handleTriggerPointerEnter = useCallback(() => {
    lastHoverOpenMs.current = Date.now()
  }, [])

  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    if (Date.now() - lastHoverOpenMs.current < 600) e.preventDefault()
  }, [])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 8)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll while mobile drawer is open; reset accordion on close
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setOpenSection(null)
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const closeMobile = useCallback(() => setIsMobileOpen(false), [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[68px] transition-all duration-150',
          'border-b border-subtle-stroke',
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-white-0',
        )}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">

          {/* ── LEFT: Logo + desktop nav ──────────────────────────────────── */}
          <div className="flex grow items-center gap-x-9">

            <Link href="/" className="-mx-1.5 rounded-xl px-1.5 flex-shrink-0">
              <Image
                src="/assets/logos/logo.svg"
                alt="Fethr Health"
                width={96}
                height={28}
                priority
                className="hacker-mode:[filter:grayscale(1)_sepia(1)_hue-rotate(100deg)_saturate(5)_brightness(1.3)]"
              />
            </Link>

            <nav className="hidden lg:flex items-center" aria-label="Main navigation">
              <NavigationMenu>
                <NavigationMenuList className="gap-0">

                  {NAV_MENU.map((entry) => (
                    <NavigationMenuItem key={entry.label}>
                      {entry.type === 'link' ? (
                        // Simple link — no dropdown
                        <NavigationMenuLink asChild>
                          <Link href={entry.href} className={triggerCn}>{entry.label}</Link>
                        </NavigationMenuLink>
                      ) : (
                        // Dropdown — wide grid if multiple sections, slim list if one
                        <>
                          <NavigationMenuTrigger
                            className={triggerCn}
                            onPointerEnter={handleTriggerPointerEnter}
                            onClick={handleTriggerClick}
                          >
                            {entry.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <motion.div variants={dropdownVariants} initial="hidden" animate="visible">
                              {entry.sections.length > 1 ? (
                                // Wide 2-col grid (e.g. Platform)
                                <ul className="w-[576px] grid grid-cols-2 gap-x-3 p-4 pt-3">
                                  {entry.sections.map((section) => (
                                    <Fragment key={section.heading}>
                                      <li className="col-span-2 mt-3 mb-1 px-2">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-fg-caption leading-4">
                                          {section.heading}
                                        </p>
                                      </li>
                                      {section.items.map((item) => (
                                        <li key={item.href}>
                                          <DropdownCard item={{ ...item, icon: ICON_MAP[item.icon] }} />
                                        </li>
                                      ))}
                                    </Fragment>
                                  ))}
                                </ul>
                              ) : (
                                // Slim 1-col list (e.g. Resources)
                                <ul className="flex w-[320px] flex-col gap-0.5 p-4 pt-3">
                                  {entry.sections[0] && (
                                    <li className="mb-1 px-2">
                                      <p className="text-xs font-semibold uppercase tracking-wider text-fg-caption leading-4">
                                        {entry.sections[0].heading}
                                      </p>
                                    </li>
                                  )}
                                  {entry.sections[0]?.items.map((item) => (
                                    <li key={item.href}>
                                      <DropdownCard item={{ ...item, icon: ICON_MAP[item.icon] }} />
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </motion.div>
                          </NavigationMenuContent>
                        </>
                      )}
                    </NavigationMenuItem>
                  ))}

                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          {/* ── RIGHT: Desktop CTAs + mobile hamburger ────────────────────── */}
          <div className="flex items-center gap-x-2.5">

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-x-2.5">
              {/* <Link
                href="/"
                className={cn(
                  'relative inline-flex cursor-pointer items-center justify-center',
                  'text-nowrap h-9 gap-x-1.5 rounded-[10px] px-3 text-sm',
                  'border border-subtle-stroke bg-transparent text-fg-primary',
                  'hover:bg-surface-subtle transition-colors duration-300 hover:duration-75',
                )}
              >
                Sign in
              </Link> */}
              <TalkToSalesDialog
                source="navbar"
                label="Start for free"
                className={cn(
                  'relative inline-flex cursor-pointer items-center justify-center',
                  'text-nowrap h-9 gap-x-1.5 rounded-[10px] px-3 text-sm',
                  'bg-fg-primary text-background border border-transparent',
                  'hover:bg-fg-secondary transition-colors duration-300 hover:duration-75',
                )}
              />
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center size-9 rounded-[10px] text-fg-secondary hover:text-fg-primary hover:bg-surface-subtle transition-colors duration-150"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <IconMenu className="text-black-500 dark:text-white-500 h-6 w-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile top-drop drawer (Attio-style) ─────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[60px] z-[48] bg-black/10 lg:hidden"
              onClick={closeMobile}
              aria-hidden
            />

            {/* Drawer panel — drops from below the header */}
            <motion.div
              key="mobile-drawer"
              role="dialog"
              aria-label="Menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className={cn(
                'fixed inset-x-0 top-[60px] bottom-0 z-[49] flex flex-col overflow-hidden',
                'border-b border-subtle-stroke bg-primary-background lg:hidden',
              )}
            >
              <div className="absolute inset-0 overflow-y-scroll pb-20">
                <h2 className="sr-only">Menu</h2>

                <div className="container">

                  {NAV_MENU.map((entry) => (
                    entry.type === 'link' ? (
                      // Simple link — no accordion
                      <Link
                        key={entry.label}
                        href={entry.href}
                        onClick={closeMobile}
                        className="block border-b border-subtle-stroke py-4 pl-1.5 text-base text-primary-foreground hacker-mode:text-[#00d36a]"
                      >
                        {entry.label}
                      </Link>
                    ) : (
                      // Dropdown entry → accordion
                      <MobileAccordionItem
                        key={entry.label}
                        label={entry.label}
                        isOpen={openSection === entry.label}
                        onToggle={() => setOpenSection((s) => s === entry.label ? null : entry.label)}
                      >
                        <div className="pt-1 pb-1.5">
                          {entry.sections.map((section) => (
                            <div key={section.heading}>
                              <p className="px-1.5 pt-3 pb-1 font-display text-xs font-semibold uppercase tracking-wider text-fg-caption leading-4">
                                {section.heading}
                              </p>
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={closeMobile}
                                  className="flex items-center gap-x-3 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-surface-subtle"
                                >
                                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[10px] border border-subtle-stroke">
                                    <div className="absolute inset-0 scale-[0.8]">{ICON_MAP[item.icon]}</div>
                                  </div>
                                  <div className="flex min-w-0 flex-col">
                                    <span className="text-[15px] font-medium leading-5 text-primary-foreground">{item.title}</span>
                                    <span className="truncate text-xs text-fg-accent">{item.description}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </MobileAccordionItem>
                    )
                  ))}

                  {/* CTA buttons */}
                  {/* <div className="flex flex-col gap-3 pt-5 pb-6">
                    <Link
                      href="/login"
                      onClick={closeMobile}
                      className="relative inline-flex cursor-pointer items-center justify-center w-full h-[46px] gap-x-2 rounded-xl px-3.5 text-base border border-subtle-stroke bg-transparent text-fg-primary hover:bg-surface-subtle transition-colors duration-150"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={closeMobile}
                      className="relative inline-flex cursor-pointer items-center justify-center w-full h-[46px] gap-x-2 rounded-xl px-3.5 text-base bg-fg-primary text-background hover:bg-fg-secondary transition-colors duration-150"
                    >
                      Start for free
                    </Link>
                  </div> */}

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
