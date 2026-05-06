'use client'

import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { useTranslations } from 'next-intl'

const CERT_BADGES = [
  { label: 'ISO 27001', sub: 'Certified' },
  { label: 'GDPR', sub: 'Compliant' },
  { label: 'End-to-End', sub: 'Encryption' },
]

export default function SecuritySection() {
  const t = useTranslations('security')
  const cards = t.raw('cards') as Array<{ title: string; items: string[] }>

  return (
    <section className="section-wrapper bg-bg-base">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <SectionLabel color="violet" className="mb-4">
            {t('label')}
          </SectionLabel>
          <h2 className="text-section">{t('title')}</h2>
        </ScrollReveal>

        {/* Cert badges */}
        <ScrollReveal delay={0.1} className="mb-12 flex flex-wrap justify-center gap-4">
          {CERT_BADGES.map((b) => (
            <div
              key={b.label}
              className="border-brand-violet/20 bg-brand-violet/5 flex items-center gap-3 rounded-2xl border px-5 py-3"
            >
              <div className="bg-brand-violet/20 flex h-8 w-8 items-center justify-center rounded-full">
                <svg
                  className="text-brand-violet h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-text-primary text-sm font-bold">{b.label}</p>
                <p className="text-text-muted text-xs">{b.sub}</p>
              </div>
            </div>
          ))}
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {cards.map((card, ci) => (
            <ScrollReveal key={card.title} delay={ci * 0.15} direction="up">
              <GlassCard className="h-full p-8">
                <h3 className="text-text-primary mb-6 text-xl font-bold">{card.title}</h3>
                <ul className="space-y-4">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-brand-violet/20 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <svg
                          className="text-brand-violet h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
