import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'solutions' })
  return { title: t('meta.title'), description: t('meta.description') }
}

const VISUAL_CONFIG = [
  {
    labelColor: 'blue' as const,
    icon: '🏢',
    featureIcons: ['🎯', '👥', '⚡', '💬', '📊', '🔧'],
    suiteHref: '/products/work',
    comingSoon: false,
  },
  {
    labelColor: 'cyan' as const,
    icon: '🎓',
    featureIcons: ['🏫', '🧠', '📋', '📈', '🛒', '🔔'],
    suiteHref: '/products/education',
    comingSoon: false,
  },
  {
    labelColor: 'violet' as const,
    icon: '✨',
    featureIcons: ['🗣️', '🍽️', '📅', '🌐', '💼', '🔒'],
    suiteHref: '/products/life',
    comingSoon: true,
  },
  {
    labelColor: 'green' as const,
    icon: '🏥',
    featureIcons: ['💊', '📋', '🤝', '⚠️', '🌐', '🛡️'],
    suiteHref: '/products/health',
    comingSoon: true,
  },
]

export default async function SolutionsPage() {
  const t = await getTranslations('solutions')
  type SolutionItem = {
    audience: string
    headline: string
    description: string
    features: Array<{ text: string }>
    suiteLabel: string
    exploreLabel: string
  }
  const items = t.raw('items') as SolutionItem[]
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-bg-base relative overflow-hidden pt-32 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="hero-grid-overlay opacity-30" />
        <div className="content-container relative z-10 text-center">
          <ScrollReveal>
            <SectionLabel color="violet" className="mb-6">
              {t('hero.label')}
            </SectionLabel>
            <h1 className="text-display mb-5">
              {t('hero.titleStart')}{' '}
              <GradientText from="#8B5CF6" to="#5590F6">
                {t('hero.titleGradient')}
              </GradientText>
            </h1>
            <p className="text-text-secondary mx-auto max-w-2xl text-lg">{t('hero.body')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Solution Sections ────────────────────────────────── */}
      {items.map((sol, i) => {
        const vis = VISUAL_CONFIG[i]
        return (
          <section
            key={sol.audience}
            className={`section-wrapper ${i % 2 === 0 ? 'bg-bg-mid' : 'bg-bg-base'}`}
          >
            <div className="content-container">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Text side */}
                <ScrollReveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-3xl">{vis.icon}</span>
                    <SectionLabel color={vis.labelColor}>{sol.audience}</SectionLabel>
                  </div>
                  <h2 className="text-text-primary mb-4 text-3xl leading-tight font-bold">
                    {sol.headline}
                  </h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">{sol.description}</p>
                  {vis.comingSoon && (
                    <div className="border-border-default bg-surface/70 mb-6 rounded-2xl border px-5 py-4 backdrop-blur-sm">
                      <span className="bg-brand-blue/10 text-brand-blue mb-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
                        {t('comingSoon.badge')}
                      </span>
                      <p className="text-text-primary text-sm font-semibold">
                        {t('comingSoon.title', { suite: sol.suiteLabel })}
                      </p>
                      <p className="text-text-secondary mt-1 text-sm leading-relaxed">
                        {t('comingSoon.body')}
                      </p>
                    </div>
                  )}

                  <Button href={vis.suiteHref} variant="outline">
                    {sol.exploreLabel}
                  </Button>
                </ScrollReveal>

                {/* Feature list */}
                <ScrollReveal delay={0.1} className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <GlassCard className="p-8">
                    <ul className="space-y-4">
                      {sol.features.map((f, fi) => (
                        <li key={f.text} className="flex items-start gap-3">
                          <span className="mt-0.5 text-xl leading-none">
                            {vis.featureIcons[fi]}
                          </span>
                          <span className="text-text-secondary">{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </ScrollReveal>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container text-center">
          <ScrollReveal>
            <h2 className="text-text-primary mb-4 text-3xl font-bold">{t('cta.title')}</h2>
            <p className="text-text-secondary mx-auto mb-8 max-w-xl">{t('cta.body')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact">{t('cta.ctaContact')}</Button>
              <Button href="/demo" variant="demo">
                {t('cta.ctaDemo')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
