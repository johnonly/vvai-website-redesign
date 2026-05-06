'use client'

import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const CDN = '/images/vv'

export default function AudienceSplitSection() {
  const t = useTranslations('audience')
  const [active, setActive] = useState<'enterprise' | 'individual'>('enterprise')

  return (
    <section className="section-wrapper bg-bg-mid">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <h2 className="text-section">{t('title')}</h2>
        </ScrollReveal>

        {/* Toggle */}
        <ScrollReveal delay={0.1} className="mb-12 flex justify-center">
          <div className="flex rounded-2xl border border-border-default bg-surface p-1.5">
            {(['enterprise', 'individual'] as const).map((side) => (
              <button
                key={side}
                onClick={() => setActive(side)}
                className={`relative rounded-xl px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === side ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {active === side && (
                  <motion.div
                    layoutId="audience-pill"
                    className="bg-brand-blue absolute inset-0 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(`${side}.label` as any)}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: active === 'enterprise' ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: active === 'enterprise' ? 30 : -30 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid gap-10 lg:grid-cols-2 lg:items-start"
          >
            {/* Text */}
            <div>
              <h3 className="mb-2 text-3xl font-bold text-text-primary lg:text-4xl">
                {t(`${active}.headline` as any)}
              </h3>
              <p className="text-brand-blue mb-4 text-base font-medium">
                {t(`${active}.sub` as any)}
              </p>
              <p className="text-text-secondary mb-8 text-base">{t(`${active}.body` as any)}</p>
              <Button
                variant="primary"
                size="lg"
                href={active === 'enterprise' ? '/products/vv-work' : '/products'}
              >
                Explore {active === 'enterprise' ? 'Enterprise' : 'Personal'} Features
              </Button>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {(t.raw(`${active}.features` as any) as Array<{ label: string; sub: string }>).map(
                (f, i) => (
                  <ScrollReveal key={f.label} delay={i * 0.08} direction="up">
                    <GlassCard hover className="flex flex-col gap-2 p-5">
                      <div className="bg-brand-blue/20 flex h-8 w-8 items-center justify-center rounded-lg">
                        <div className="bg-brand-blue h-2 w-2 rounded-full" />
                      </div>
                      <p className="font-semibold text-text-primary">{f.label}</p>
                      <p className="text-text-secondary text-xs">{f.sub}</p>
                    </GlassCard>
                  </ScrollReveal>
                ),
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
