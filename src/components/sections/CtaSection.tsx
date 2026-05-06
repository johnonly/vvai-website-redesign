'use client'

import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function CtaSection() {
  const t = useTranslations('cta')

  return (
    <section className="bg-bg-indigo relative overflow-hidden py-32">
      {/* Animated gradient background — uses --cta-gradient CSS var (theme-aware) */}
      <div className="cta-bg absolute inset-0 z-0" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(85,144,246,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div className="hero-grid-overlay opacity-30" />

      {/* Floating orbs */}
      <motion.div
        className="bg-brand-violet/10 absolute top-1/4 -left-20 h-64 w-64 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-brand-blue/10 absolute -right-20 bottom-1/4 h-64 w-64 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <div className="content-container relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-section mb-6" style={{ fontSize: 'clamp(22px, 2.72vw, 39px)' }}>
            <GradientText>{t('headline')}</GradientText>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-text-secondary mx-auto mb-10 max-w-4xl text-base lg:max-w-5xl lg:whitespace-nowrap">
            {t('subheadline')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="demo" size="lg" href="/demo">
              {t('bookDemo')}
            </Button>
            <Button variant="secondary" size="lg" href="/feeds/download">
              {t('tryFree')}
            </Button>
          </div>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal
          delay={0.35}
          className="text-text-muted mt-12 flex flex-wrap items-center justify-center gap-6 text-xs"
        >
          {[t('trust1'), t('trust2'), t('trust3'), t('trust4'), t('trust5')].map((b) => (
            <span key={b} className="flex items-center gap-1.5">
              <svg
                className="text-brand-green h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {b}
            </span>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
