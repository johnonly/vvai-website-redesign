import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { SUITES } from '@/data/suites'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'productsPage' })
  return { title: t('meta.title'), description: t('meta.description') }
}

export default async function ProductsPage() {
  const t = await getTranslations('productsPage')
  const st = await getTranslations('suites')
  const comingSoonSuiteIds = new Set(['life', 'health'])
  type HighlightItem = { icon: string; title: string; description: string }
  const highlights = t.raw('highlights.items') as HighlightItem[]
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-bg-base relative overflow-hidden pt-32 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(85,144,246,0.10) 0%, transparent 70%)',
          }}
        />
        <div className="hero-grid-overlay opacity-30" />
        <div className="content-container relative z-10 text-center">
          <ScrollReveal>
            <SectionLabel color="blue" className="mb-6">
              {t('hero.label')}
            </SectionLabel>
            <h1 className="text-display mb-5">
              {t('hero.heading') ? `${t('hero.heading')} ` : ''}
              <GradientText from="#5590F6" to="#8B5CF6">
                {t('hero.headingGradient')}
              </GradientText>
            </h1>
            <p className="text-text-secondary mx-auto text-lg" style={{ maxWidth: '868px' }}>
              {t('hero.body')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Suite Cards ──────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="violet" className="mb-4">
              {t('suites.label')}
            </SectionLabel>
            <h2 className="text-text-primary text-3xl font-bold">{t('suites.heading')}</h2>
            <p className="text-text-secondary mt-3">{t('suites.body')}</p>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {SUITES.map((suite, i) => {
              const label = st(`${suite.id}.label`)
              const headline = st(`${suite.id}.headline`)
              const subline = st(`${suite.id}.subline`)
              const isComingSoon = comingSoonSuiteIds.has(suite.id)
              const keywords = st.raw(`${suite.id}.keywords`) as string[]
              type Feature = { icon: string; title: string; description: string }
              const features = st.raw(`${suite.id}.features`) as Feature[]
              return (
                <ScrollReveal key={suite.id} delay={i * 0.1}>
                  <GlassCard className="flex h-full flex-col gap-5 p-8">
                    {/* Accent dot + label */}
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: suite.accentColor }}
                      />
                      <span
                        className="text-sm font-semibold tracking-wider uppercase"
                        style={{ color: suite.accentColor }}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Headline + subline */}
                    <div>
                      <h2 className="text-text-primary mb-2 text-2xl leading-tight font-bold">
                        {headline}
                      </h2>
                      <p className="text-text-secondary">{subline}</p>
                    </div>

                    {isComingSoon && (
                      <div className="border-border-default bg-surface/70 rounded-2xl border px-5 py-4 backdrop-blur-sm">
                        <span className="bg-brand-blue/10 text-brand-blue mb-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
                          {t('comingSoon.badge')}
                        </span>
                        <p className="text-text-primary text-sm font-semibold">
                          {t('comingSoon.title', { suite: label })}
                        </p>
                        <p className="text-text-secondary mt-1 text-sm leading-relaxed">
                          {t('comingSoon.body')}
                        </p>
                      </div>
                    )}

                    {/* Tagline keywords */}
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((kw) => (
                        <span
                          key={kw}
                          className="border-border-default bg-surface text-text-secondary rounded-full border px-3 py-1 text-xs"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Feature bullets (first 3) */}
                    <ul className="space-y-2">
                      {features.slice(0, 3).map((f) => (
                        <li
                          key={f.title}
                          className="text-text-secondary flex items-start gap-2 text-sm"
                        >
                          <span className="mt-0.5 text-base leading-none">{f.icon}</span>
                          <span>
                            <strong className="text-text-primary font-medium">{f.title}</strong> —{' '}
                            {f.description}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto pt-2">
                      <Button
                        href={suite.href}
                        variant="outline"
                        className="w-full justify-center text-sm"
                      >
                        {t('suites.explore', { label })}
                      </Button>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Platform Highlights ──────────────────────────────── */}
      <section className="section-wrapper bg-bg-base">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="blue" className="mb-4">
              {t('highlights.label')}
            </SectionLabel>
            <h2 className="text-text-primary text-3xl font-bold">
              {t('highlights.heading')}{' '}
              <GradientText from="#5590F6" to="#8B5CF6">
                {t('highlights.headingGradient')}
              </GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <GlassCard className="flex flex-col gap-3 p-6 text-center">
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="text-text-primary font-bold">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container text-center">
          <ScrollReveal>
            <h2 className="text-text-primary mb-4 text-3xl font-bold">{t('cta.heading')}</h2>
            <p className="text-text-secondary mx-auto mb-8 max-w-xl">{t('cta.body')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact">{t('cta.talkSales')}</Button>
              <Button href="/demo" variant="outline">
                {t('cta.bookDemo')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
