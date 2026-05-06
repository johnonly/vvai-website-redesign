import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pricing' })
  return { title: t('meta.title'), description: t('meta.description') }
}

const TIER_COLORS = ['#5590F6', '#22D3EE', '#8B5CF6', '#10B981']

export default async function PricingPage() {
  const t = await getTranslations('pricing')
  type Tier = { name: string; tagline: string; features: string[] }
  type FaqItem = { q: string; a: string }
  const tiers = t.raw('tiers.items') as Tier[]
  const faq = t.raw('faq.items') as FaqItem[]
  const contactChecks = t.raw('contact.checks') as string[]
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bg-base pt-32 pb-16">
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
              {t('hero.titleStart')}{' '}
              <GradientText from="#5590F6" to="#8B5CF6">
                {t('hero.titleGradient')}
              </GradientText>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              {t('hero.body')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact">{t('hero.ctaQuote')}</Button>
              <Button href="/demo" variant="outline">
                {t('hero.ctaDemo')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Suite Tiers ──────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="violet" className="mb-4">
              {t('tiers.label')}
            </SectionLabel>
            <h2 className="text-3xl font-bold text-text-primary">
              {t('tiers.title')}
            </h2>
            <p className="mt-3 text-text-secondary">
              {t('tiers.subtitle')}
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <GlassCard className="flex flex-col gap-5 p-7 h-full">
                  <div>
                    <div
                      className="mb-1 h-1 w-10 rounded-full"
                      style={{ backgroundColor: TIER_COLORS[i] }}
                    />
                    <h3 className="text-lg font-bold text-text-primary">{tier.name}</h3>
                    <p className="text-sm text-text-secondary">{tier.tagline}</p>
                  </div>
                  <ul className="flex-1 space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-0.5 text-green-400 font-bold leading-none">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-1 text-center">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: TIER_COLORS[i] }}
                    >
                      {t('tiers.contactPricing')}
                    </span>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-base">
        <div className="content-container">
          <ScrollReveal>
            <GlassCard
              className="grid gap-8 p-10 lg:grid-cols-2 lg:items-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(85,144,246,0.08) 0%, rgba(139,92,246,0.08) 100%)',
                borderColor: 'rgba(85,144,246,0.25)',
              }}
            >
              <div>
                <SectionLabel color="blue" className="mb-4">
                  {t('contact.label')}
                </SectionLabel>
                <h2 className="text-2xl font-bold text-text-primary mb-3">
                  {t('contact.title')}
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {t('contact.body')}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {contactChecks.map((check) => (
                    <li key={check} className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> {check}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <Button href="/contact" className="w-full justify-center">
                  {t('contact.ctaSales')}
                </Button>
                <Button href="/demo" variant="outline" className="w-full justify-center">
                  {t('contact.ctaDemo')}
                </Button>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="blue" className="mb-4">
              {t('faq.label')}
            </SectionLabel>
            <h2 className="text-3xl font-bold text-text-primary">{t('faq.title')}</h2>
          </ScrollReveal>

          <div className="mx-auto max-w-3xl space-y-4">
            {faq.map((item, i) => (
              <ScrollReveal key={item.q} delay={i * 0.06}>
                <GlassCard className="p-6">
                  <h3 className="mb-2 font-bold text-text-primary">{item.q}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
