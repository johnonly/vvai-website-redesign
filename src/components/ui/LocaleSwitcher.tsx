'use client'

import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  zh: '中文',
  'zh-tw': '繁體',
}

interface LocaleSwitcherProps {
  className?: string
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  function switchLocale(next: (typeof routing.locales)[number]) {
    router.replace(pathname, { locale: next })
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-sm font-medium transition-colors duration-200',
          'text-text-secondary hover:text-text-primary hover:bg-black/8 dark:hover:bg-white/8',
        )}
        aria-label={t('switchLanguage')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {/* Globe icon */}
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{LOCALE_LABELS[locale] ?? locale.toUpperCase()}</span>
        <svg
          className={cn(
            'h-3 w-3 transition-transform duration-200',
            open && 'rotate-180',
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('language')}
          className="bg-bg-mid/95 absolute top-full right-0 z-50 mt-2 min-w-28 rounded-2xl border border-white/10 p-1.5 shadow-2xl backdrop-blur-xl"
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={loc === locale}
              onClick={() => switchLocale(loc)}
              className={cn(
                'flex w-full items-center rounded-xl px-3 py-2 text-sm transition-colors',
                loc === locale
                  ? 'bg-brand-blue/15 font-semibold text-brand-blue'
                  : 'text-text-secondary hover:bg-white/8 hover:text-text-primary',
              )}
            >
              {LOCALE_LABELS[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
