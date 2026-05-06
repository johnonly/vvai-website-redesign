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
  const t = await getTranslations({ locale, namespace: 'support' })
  return { title: t('meta.title'), description: t('meta.description') }
}

const CHANNEL_ICONS = ['📧', '💬', '📅', '🏢']
const RESOURCE_ICONS = ['🚀', '🔧', '🛡️', '📊']

export default async function SupportPage() {
  const t = await getTranslations('support')
  type SlaItem = { metric: string; label: string }
  type Channel = { title: string; description: string; actionLabel: string; actionHref: string }
  type Resource = { title: string; description: string; href?: string }
  const slaItems = t.raw('hero.sla') as SlaItem[]
  const channels = t.raw('channels.items') as Channel[]
  const resources = t.raw('resources.items') as Resource[]
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
              <GradientText from="#5590F6" to="#10B981">
                {t('hero.titleGradient')}
              </GradientText>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-text-secondary">
              {t('hero.body')}
            </p>
          </ScrollReveal>

          {/* SLA row */}
          <ScrollReveal delay={0.2} className="mt-10">
            <div className="flex flex-wrap justify-center gap-4">
              {slaItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center rounded-xl border border-border-default bg-surface px-6 py-4 backdrop-blur-sm"
                >
                  <span className="text-lg font-bold text-text-primary">{item.metric}</span>
                  <span className="text-xs text-text-secondary">{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Support Channels ─────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="violet" className="mb-4">
              {t('channels.label')}
            </SectionLabel>
            <h2 className="text-3xl font-bold text-text-primary">{t('channels.title')}</h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((ch, i) => (
              <ScrollReveal key={ch.title} delay={i * 0.08}>
                <GlassCard className="flex flex-col gap-4 p-7 h-full">
                  <div className="text-4xl">{CHANNEL_ICONS[i]}</div>
                  <div>
                    <h3 className="mb-2 font-bold text-text-primary">{ch.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{ch.description}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <a
                      href={ch.actionHref}
                      className="text-sm font-medium text-brand-blue hover:underline"
                    >
                      {ch.actionLabel} →
                    </a>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources ────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-base">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="blue" className="mb-4">
              {t('resources.label')}
            </SectionLabel>
            <h2 className="text-3xl font-bold text-text-primary">{t('resources.title')}</h2>
            <p className="mt-3 text-text-secondary">{t('resources.subtitle')}</p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.08}>
                <GlassCard className="flex flex-col gap-3 p-7 h-full">
                  <div className="text-4xl">{RESOURCE_ICONS[i]}</div>
                  <h3 className="font-bold text-text-primary">{r.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{r.description}</p>
                  {r.href && (
                    <a href={r.href} className="mt-auto text-sm font-medium text-brand-blue hover:underline">
                      {t('resources.learnMore')}
                    </a>
                  )}
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
            <h2 className="mb-4 text-3xl font-bold text-text-primary">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-text-secondary">
              {t('cta.body')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact">{t('cta.ctaContact')}</Button>
              <Button href="/demo" variant="outline">
                {t('cta.ctaDemo')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
