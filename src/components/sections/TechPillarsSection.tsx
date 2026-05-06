'use client'

import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { useTranslations } from 'next-intl'

export default function TechPillarsSection() {
  const t = useTranslations('techPillars')
  const items = t.raw('items') as Array<{ number: string; title: string; body: string }>

  return (
    <section className="section-wrapper bg-bg-base">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <SectionLabel className="mb-4">{t('label')}</SectionLabel>
          <h2 className="text-section">{t('title')}</h2>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <ScrollReveal key={item.number} delay={i * 0.1} direction="up">
              <GlassCard hover className="group relative flex h-full flex-col overflow-hidden p-6">
                {/* Number background */}
                <span className="absolute top-2 right-4 text-7xl leading-none font-black text-white/4 select-none">
                  {item.number}
                </span>

                {/* Number badge */}
                <div className="bg-brand-blue/20 mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  <span className="text-brand-blue text-sm font-bold">{item.number}</span>
                </div>

                <h3 className="text-text-primary mb-3 text-xl leading-snug font-bold">
                  {item.title}
                </h3>
                <p className="text-text-secondary flex-1 text-sm leading-relaxed">{item.body}</p>

                {/* Accent line */}
                <div className="bg-brand-blue mt-5 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-full" />
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
