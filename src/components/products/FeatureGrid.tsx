import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import type { SuiteData } from '@/data/suites'
import { getTranslations } from 'next-intl/server'

type LabelColor = 'blue' | 'violet' | 'cyan' | 'green'

const accentColorMap: Record<string, LabelColor> = {
  '#5590F6': 'blue',
  '#22D3EE': 'cyan',
  '#8B5CF6': 'violet',
  '#10B981': 'green',
}

interface FeatureGridProps {
  suite: SuiteData
}

export default async function FeatureGrid({ suite }: FeatureGridProps) {
  const t = await getTranslations('products')
  const labelColor = accentColorMap[suite.accentColor] ?? 'blue'

  return (
    <section className="section-wrapper bg-bg-mid">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-14 text-center">
          <SectionLabel color={labelColor} className="mb-4">
            {t('featureGrid.label')}
          </SectionLabel>
          <h2 className="text-section">
            {t('featureGrid.heading')}{' '}
            <span className="gradient-text">{t('featureGrid.headingGradient')}</span>
          </h2>
        </ScrollReveal>

        {/* 3-col grid (2-col on tablet, 1-col on mobile) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suite.features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.07} direction="up">
              <GlassCard
                hover
                className="group relative flex h-full flex-col gap-4 overflow-hidden p-6"
              >
                {/* Subtle accent line on hover */}
                <div
                  className="absolute top-0 left-0 h-0.5 w-0 rounded-r-full transition-all duration-500 group-hover:w-full"
                  style={{
                    background: `linear-gradient(90deg, ${suite.gradientFrom}, ${suite.gradientTo})`,
                  }}
                />

                {/* Icon */}
                <span className="text-3xl" role="img" aria-hidden="true">
                  {feature.icon}
                </span>

                {/* Text */}
                <div>
                  <h3 className="text-text-primary mb-2 text-base font-bold">{feature.title}</h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
