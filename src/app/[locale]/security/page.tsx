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
  const t = await getTranslations({ locale, namespace: 'securityPage' })
  return { title: t('meta.title'), description: t('meta.description') }
}

const DATA_SECURITY_ICONS = ['🔐', '🗄️', '📜', '🛡️', '🔑']
const CUSTOMER_SUCCESS_ICONS = ['🚀', '🕐', '♻️', '📈']

export default async function SecurityPage() {
  const t = await getTranslations('securityPage')
  type Badge = { label: string; sublabel: string }
  type SecurityItem = { title: string; description: string }
  const badges = t.raw('hero.badges') as Badge[]
  const dataItems = t.raw('dataSecurity.items') as SecurityItem[]
  const successItems = t.raw('customerSuccess.items') as SecurityItem[]
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
              {t('hero.titleStart')}{' '}
              <GradientText from="#5590F6" to="#10B981">
                {t('hero.titleGradient')}
              </GradientText>
            </h1>
            <p className="text-text-secondary mx-auto max-w-2xl text-lg">{t('hero.body')}</p>
          </ScrollReveal>

          {/* Trust badge row */}
          <ScrollReveal delay={0.2} className="mt-10">
            <div className="flex flex-wrap justify-center gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="border-border-default bg-surface flex flex-col items-center rounded-xl border px-6 py-4 backdrop-blur-sm"
                >
                  <span className="text-text-primary text-lg font-bold">{badge.label}</span>
                  <span className="text-text-secondary text-xs">{badge.sublabel}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Data Security ────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="blue" className="mb-4">
              {t('dataSecurity.label')}
            </SectionLabel>
            <h2 className="text-text-primary text-3xl font-bold">{t('dataSecurity.title')}</h2>
            <p className="text-text-secondary mx-auto mt-3 max-w-xl">{t('dataSecurity.body')}</p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dataItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <GlassCard className="flex h-full flex-col gap-4 p-7">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{DATA_SECURITY_ICONS[i]}</span>
                    <h3 className="text-text-primary leading-tight font-bold">{item.title}</h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Success ─────────────────────────────────── */}
      <section className="section-wrapper bg-bg-base">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="violet" className="mb-4">
              {t('customerSuccess.label')}
            </SectionLabel>
            <h2 className="text-text-primary text-3xl font-bold">{t('customerSuccess.title')}</h2>
            <p className="text-text-secondary mx-auto mt-3 max-w-3xl">
              {t('customerSuccess.body')}
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {successItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <GlassCard className="flex h-full flex-col gap-3 p-7 text-center">
                  <div className="text-4xl">{CUSTOMER_SUCCESS_ICONS[i]}</div>
                  <h3 className="text-text-primary font-bold">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Banner ────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal>
            <GlassCard
              className="p-10 text-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(85,144,246,0.08) 0%, rgba(16,185,129,0.08) 100%)',
                borderColor: 'rgba(85,144,246,0.25)',
              }}
            >
              <div className="mb-4 text-5xl">📜</div>
              <h2 className="text-text-primary mb-3 text-2xl font-bold">{t('compliance.title')}</h2>
              <p className="text-text-secondary mx-auto mb-8 max-w-2xl">{t('compliance.body')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact">{t('compliance.ctaSecurity')}</Button>
                <Button href="/demo" variant="outline">
                  {t('compliance.ctaDemo')}
                </Button>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
