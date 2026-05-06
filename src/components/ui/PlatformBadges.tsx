'use client'

import { cn } from '@/lib/utils'

const CDN = '/images/vv'

const BADGES = [
  { label: 'App Store', sublabel: 'Download on the', icon: 'apple', href: '#' },
  { label: 'Google Play', sublabel: 'Get it on', icon: 'google-play', href: '#' },
  { label: 'Windows', sublabel: 'Download for', icon: 'windows', href: '#' },
  { label: 'Mac', sublabel: 'Download for', icon: 'apple', href: '#' },
]

interface PlatformBadgesProps {
  className?: string
  layout?: 'row' | 'grid'
}

export default function PlatformBadges({ className, layout = 'row' }: PlatformBadgesProps) {
  return (
    <div className={cn('flex flex-wrap gap-3', layout === 'grid' && 'grid grid-cols-2', className)}>
      {BADGES.map((b) => (
        <a
          key={b.label}
          href={b.href}
          className="flex items-center gap-2 rounded-xl border border-border-default bg-surface px-4 py-2.5 text-text-primary backdrop-blur-sm transition-all duration-200 hover:border-brand-blue/30 hover:bg-surface-hover"
        >
          <PlatformIcon icon={b.icon} />
          <div>
            <p className="text-[10px] leading-none text-text-secondary">{b.sublabel}</p>
            <p className="text-sm leading-tight font-semibold">{b.label}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

function PlatformIcon({ icon }: { icon: string }) {
  // Simple SVG icons inline
  if (icon === 'apple') {
    return (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    )
  }
  if (icon === 'google-play') {
    return (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.18 23.76c.35.2.75.27 1.15.22L15.6 12 12 8.4 3.18 23.76zM20.48 10.34l-2.85-1.65-3.99 3.99 3.99 3.99 2.86-1.65c.82-.47.82-1.71-.01-2.68zM2.01.43C1.77.7 1.62 1.1 1.62 1.62V22.38c0 .52.15.92.4 1.19L15.6 12 2.01.43zm11.18 9.18l-10.1-9.83c.19-.07.4-.1.63-.07.33.04.66.17.89.38L16.28 9.1l-3.09 2.51z" />
      </svg>
    )
  }
  if (icon === 'windows') {
    return (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" />
      </svg>
    )
  }
  return null
}
