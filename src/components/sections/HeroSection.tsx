'use client'

import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(() => import('@/components/hero/ParticlesBackground'), {
  ssr: false,
  loading: () => null,
})

const CDN = '/images/vv'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
}

const PLATFORM_BADGES = [
  { label: 'iOS', icon: 'apple' },
  { label: 'Android', icon: 'android' },
  { label: 'Windows', icon: 'windows' },
  { label: 'macOS', icon: 'apple' },
  { label: 'iPadOS', icon: 'apple' },
] as const

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="bg-bg-base relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16">
      {/* Subtle grid overlay */}
      <div className="hero-grid-overlay" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(85,144,246,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Particles */}
      <ParticlesBackground />

      {/* Content */}
      <div className="content-container relative z-10 flex flex-col items-center text-center">
        {/* Subheadline badge */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0, 1] }}
          className="mb-6"
        >
          <span
            className="border-brand-blue/30 bg-brand-blue/10 text-brand-blue inline-flex items-center rounded-full border font-semibold tracking-tight"
            style={{
              fontSize: locale === 'en' ? '18px' : '16.2px',
              gap: '9px',
              padding: '9px 21.6px',
            }}
          >
            <span
              className="bg-brand-blue animate-pulse rounded-full"
              style={{ width: '7.2px', height: '7.2px', flexShrink: 0 }}
            />
            {t('subheadline')}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          className="text-section mb-6 max-w-4xl"
          style={{ fontSize: locale === 'en' ? '36px' : '38px' }}
        >
          {t('headline')
            .split(' ')
            .map((word, i, arr) => {
              // Highlight "V V AI" and "Human–AI" in gradient
              const isHighlight = word === 'V' || word === 'AI' || word.includes('Human')
              return (
                <span key={i} className={isHighlight ? 'gradient-text' : ''}>
                  {word}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              )
            })}
        </motion.h1>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="/feeds/download">
            {t('cta_primary')}
          </Button>
          <Button variant="demo" size="lg" href="/demo">
            {t('cta_secondary')}
          </Button>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.1, 0, 1] }}
          className="text-text-muted mt-6 flex flex-wrap items-center justify-center gap-3 text-xs"
        >
          <span>Available on</span>
          {PLATFORM_BADGES.map((platform) => (
            <span
              key={platform.label}
              className="border-border-default bg-surface text-text-secondary inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs"
            >
              <PlatformBadgeIcon icon={platform.icon} />
              {platform.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero product screenshot — floating mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
        className="content-container relative z-10 mt-16 w-full"
      >
        <div className="border-border-default relative mx-auto max-w-5xl overflow-hidden rounded-2xl border shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          {/* Glow behind screenshot */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(85,144,246,0.15) 0%, rgba(139,92,246,0.1) 100%)',
            }}
          />
          <img
            src={`${CDN}/home/home_banner_img.png`}
            alt="V V AI Platform Dashboard"
            className="relative z-10 w-full object-cover"
            loading="eager"
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="text-text-muted flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-text-muted/70 h-4 w-0.5 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

function PlatformBadgeIcon({ icon }: { icon: 'apple' | 'android' | 'windows' }) {
  if (icon === 'apple') {
    return (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    )
  }

  if (icon === 'android') {
    return (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.25 8.3a.75.75 0 0 1-.65-1.12l1.55-2.74a.75.75 0 1 1 1.31.74L7.9 7.92a.75.75 0 0 1-.65.38Zm9.5 0a.75.75 0 0 1-.65-.38l-1.56-2.74a.75.75 0 1 1 1.31-.74l1.55 2.74a.75.75 0 0 1-.65 1.12ZM8 9.25A2.75 2.75 0 0 0 5.25 12v4.5A2.75 2.75 0 0 0 8 19.25h.25V21a.75.75 0 0 0 1.5 0v-1.75h4.5V21a.75.75 0 0 0 1.5 0v-1.75H16A2.75 2.75 0 0 0 18.75 16.5V12A2.75 2.75 0 0 0 16 9.25H8Zm1.5 3a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM8.32 6.75h7.36a4.26 4.26 0 0 1 3.82 2.37l.3.63H4.2l.3-.63a4.26 4.26 0 0 1 3.82-2.37Z" />
      </svg>
    )
  }

  return (
    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.4 3.6 10.9 2v9H2.4V3.6Zm9.8-1.74L21.6.5V11H12.2V1.86ZM2.4 13h8.5v9L2.4 20.4V13Zm9.8 0h9.4v10.5l-9.4-1.36V13Z" />
    </svg>
  )
}
