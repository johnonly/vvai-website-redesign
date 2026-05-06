'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

const CDN = '/images/vv'

const PILLARS = [
  {
    key: 'work',
    color: 'blue' as const,
    accentClass: 'bg-brand-blue',
    gradientFrom: '#5590F6',
    gradientTo: '#3b82f6',
    screenshotUrls: {
      en: `${CDN}/home/home_work_img_en.png`,
      zh: `${CDN}/home/home_work_img_cn.png`,
      'zh-tw': `${CDN}/home/home_work_img_cntw.png`,
    },
  },
  {
    key: 'education',
    color: 'violet' as const,
    accentClass: 'bg-brand-violet',
    gradientFrom: '#8B5CF6',
    gradientTo: '#6d28d9',
    screenshotUrls: {
      en: `${CDN}/home/home_education_img_en.png`,
      zh: `${CDN}/home/home_education_img_cn.png`,
      'zh-tw': `${CDN}/home/home_education_img_CNTW.png`,
    },
  },
  {
    key: 'life',
    color: 'cyan' as const,
    accentClass: 'bg-brand-cyan',
    gradientFrom: '#22D3EE',
    gradientTo: '#0ea5e9',
    screenshotUrls: {
      en: `${CDN}/home/home_life_img_en.png`,
      zh: `${CDN}/home/home_life_img_cn.png`,
      'zh-tw': `${CDN}/home/home_life_img_CNTW.png`,
    },
  },
  {
    key: 'health',
    color: 'green' as const,
    accentClass: 'bg-brand-green',
    gradientFrom: '#10B981',
    gradientTo: '#059669',
    screenshotUrls: {
      en: `${CDN}/home/home_health_img_en.png`,
      zh: `${CDN}/home/home_health_img_cn.png`,
      'zh-tw': `${CDN}/home/home_health_img_CNTW.png`,
    },
  },
]

export default function PillarsSection() {
  const t = useTranslations('pillars')
  const locale = useLocale()
  const [active, setActive] = useState(0)

  const activePillar = PILLARS[active]

  return (
    <section className="section-wrapper bg-bg-base">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <h2 className="text-section">{t('title')}</h2>
        </ScrollReveal>

        {/* Tab selectors */}
        <ScrollReveal className="mb-12" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2">
            {PILLARS.map((p, i) => (
              <button
                key={p.key}
                onClick={() => setActive(i)}
                className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === i
                    ? `border-transparent bg-gradient-to-r from-[${p.gradientFrom}] to-[${p.gradientTo}] text-white shadow-lg`
                    : 'border-border-default text-text-secondary hover:border-brand-blue/30 hover:text-text-primary'
                }`}
                style={
                  active === i
                    ? { background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }
                    : undefined
                }
              >
                {t(`${p.key}.label` as any)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            {/* Text side */}
            <div>
              <SectionLabel color={activePillar.color} className="mb-5">
                {t(`${activePillar.key}.label` as any)}
              </SectionLabel>
              <h3 className="text-text-primary mb-4 text-xl font-bold lg:text-2xl">
                {t(`${activePillar.key}.headline` as any)}
              </h3>
              <p className="text-text-secondary mb-6 text-base">
                {t(`${activePillar.key}.subline` as any)}
              </p>
              <div className="flex flex-nowrap gap-2 overflow-x-auto">
                {(t(`${activePillar.key}.keywords` as any) as string)
                  .split('·')
                  .map((kw: string, i: number) => (
                    <span
                      key={i}
                      className="border-border-default bg-surface text-text-secondary shrink-0 rounded-lg border px-3 py-1 text-sm"
                    >
                      {kw.trim()}
                    </span>
                  ))}
              </div>
            </div>

            {/* Screenshot */}
            <div className="border-border-default relative overflow-hidden rounded-2xl border shadow-2xl">
              <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${activePillar.gradientFrom}, ${activePillar.gradientTo})`,
                }}
              />
              <img
                src={
                  activePillar.screenshotUrls[locale as keyof typeof activePillar.screenshotUrls] ??
                  activePillar.screenshotUrls.en
                }
                alt={t(`${activePillar.key}.label` as any)}
                className="relative z-10 w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
