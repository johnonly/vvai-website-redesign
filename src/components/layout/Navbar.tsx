'use client'

import Button from '@/components/ui/Button'
import LocaleSwitcher from '@/components/ui/LocaleSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { NAV_ITEMS } from '@/data/navigation'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  function openDropdown(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg-base/85 border-border-default border-b shadow-xl shadow-black/10 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/vv/Logo (1).png"
            alt="V V AI"
            width={120}
            height={40}
            className="object-contain"
            style={{ height: 'auto' }}
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && openDropdown(item.label)}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={item.href}
                className="text-text-secondary hover:bg-border-default hover:text-text-primary flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
              >
                {t(item.label as Parameters<typeof t>[0])}
                {item.children && (
                  <svg
                    className="h-3.5 w-3.5 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={scheduleClose}
                    className="bg-bg-mid/95 border-border-default absolute top-full left-0 mt-2 min-w-[180px] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="text-text-secondary hover:bg-border-default hover:text-text-primary block rounded-xl px-4 py-2.5 text-sm transition-colors"
                      >
                        {t(child.label as Parameters<typeof t>[0])}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button variant="demo" size="sm" href="/demo">
            {t('bookDemo')}
          </Button>
          <Button variant="primary" size="sm" href="/feeds/download">
            {t('tryFree')}
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-text-secondary hover:bg-border-default flex h-10 w-10 items-center justify-center rounded-xl"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  'block h-0.5 w-5 bg-current transition-transform duration-200',
                  mobileOpen && 'translate-y-2 rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 bg-current transition-opacity duration-200',
                  mobileOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 bg-current transition-transform duration-200',
                  mobileOpen && '-translate-y-2 -rotate-45',
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="bg-bg-base/95 border-border-default overflow-hidden border-b backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:bg-border-default hover:text-text-primary block rounded-xl px-4 py-3 text-sm font-medium"
                  >
                    {t(item.label as Parameters<typeof t>[0])}
                  </Link>
                  {item.children && (
                    <div className="border-border-subtle mt-1 ml-4 space-y-0.5 border-l pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="text-text-muted hover:text-text-primary block rounded-lg px-3 py-2 text-sm"
                        >
                          {t(child.label as Parameters<typeof t>[0])}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <Button variant="demo" size="md" href="/demo" className="w-full justify-center">
                  {t('bookDemo')}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  href="/feeds/download"
                  className="w-full justify-center"
                >
                  {t('tryFree')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
