'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import type { SuiteData } from '@/data/suites'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type LabelColor = 'blue' | 'violet' | 'cyan' | 'green'

const accentColorMap: Record<string, LabelColor> = {
  '#5590F6': 'blue',
  '#22D3EE': 'cyan',
  '#8B5CF6': 'violet',
  '#10B981': 'green',
}

interface ScreenshotShowcaseProps {
  suite: SuiteData
}

export default function ScreenshotShowcase({ suite }: ScreenshotShowcaseProps) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const t = useTranslations('products')
  const st = useTranslations('suites')
  const labelColor = accentColorMap[suite.accentColor] ?? 'blue'
  const screenshots = suite.screenshots.filter((s) => s.position !== 'floating')

  let i18nScreenshots: Array<{ headline?: string; subtitle?: string }> | null = null
  try {
    i18nScreenshots = st.raw(`${suite.id}.screenshots`) as Array<{
      headline?: string
      subtitle?: string
    }>
  } catch {
    // no screenshot translations for this suite — fall back to raw data
  }

  const activeShot = screenshots[active]
  const imageSrc = activeShot?.src ?? '/images/vv/education-dashboard-en.png'

  return (
    <section className="section-wrapper bg-bg-base overflow-hidden">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-14 text-center">
          <SectionLabel color={labelColor} className="mb-4">
            {t('showcase.label')}
          </SectionLabel>
          <h2 className="text-section">{t('showcase.heading', { suite: suite.label })}</h2>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
          {/* Left column — compact title-only cards */}
          <div className="flex h-full flex-col gap-3 lg:col-span-2">
            {screenshots.map((shot, i) => {
              const isActive = active === i
              const isHovered = hovered === i

              return (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{ x: isHovered && !isActive ? 5 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative w-full flex-1 overflow-hidden rounded-xl border text-left transition-colors duration-300"
                  style={{
                    borderColor: isActive ? suite.accentColor : 'var(--color-border-default)',
                    background: isActive
                      ? `linear-gradient(135deg, ${suite.accentColor}18 0%, ${suite.gradientTo}08 100%)`
                      : isHovered
                        ? `linear-gradient(135deg, ${suite.accentColor}0c 0%, transparent 100%)`
                        : undefined,
                    boxShadow: isActive
                      ? `0 4px 24px ${suite.accentColor}22`
                      : isHovered
                        ? `0 2px 12px ${suite.accentColor}14`
                        : undefined,
                  }}
                >
                  {/* Animated left accent bar */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-0.75 origin-top rounded-r"
                    style={{ background: suite.accentColor }}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />

                  <div className="flex h-full items-center gap-4 px-5 py-4">
                    {/* Number badge */}
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={
                        isActive
                          ? { background: suite.accentColor, color: '#fff' }
                          : { background: `${suite.accentColor}22`, color: suite.accentColor }
                      }
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Headline only */}
                    <p
                      className={`text-base leading-snug font-semibold transition-colors duration-200 ${
                        isActive
                          ? 'text-text-primary'
                          : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {i18nScreenshots?.[i]?.headline ?? shot.headline ?? shot.alt}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Right column — subtitle + image */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            {/* Subtitle card above the image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`subtitle-${active}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="overflow-hidden rounded-xl border border-black/[0.06] bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
              >
                {/* Accent strip */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${suite.gradientFrom}, ${suite.gradientTo})`,
                  }}
                />
                <p className="px-4 py-3 text-sm leading-relaxed text-gray-700 dark:text-white/80">
                  {i18nScreenshots?.[active]?.subtitle ?? activeShot?.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Image card — fixed aspect ratio so all screenshots are the same size */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="border-border-default relative overflow-hidden rounded-2xl border shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
                style={{ aspectRatio: '16/10' }}
              >
                <img
                  src={imageSrc}
                  alt={activeShot?.alt ?? suite.label}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement
                    t.src = '/images/vv/education-dashboard-en.png'
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
