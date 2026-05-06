import DemoForm from '@/components/contact/DemoForm'
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
  const t = await getTranslations({ locale, namespace: 'demo' })
  return { title: t('meta.title'), description: t('meta.description') }
}

export default async function DemoPage() {
  const t = await getTranslations('demo')
  type Benefit = { icon: string; title: string; detail: string }
  const benefits = t.raw('benefits.items') as Benefit[]
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-bg-base relative overflow-hidden pt-32 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(139,92,246,0.10) 0%, transparent 70%)',
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
            <p className="text-text-secondary mx-auto max-w-xl text-lg">{t('hero.body')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Main grid ────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* LEFT — benefits ──────────────── */}
            <div className="flex flex-col gap-5 lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-section mb-6">
                  {t('benefits.titleStart')}{' '}
                  <GradientText from="#8B5CF6" to="#22D3EE">
                    {t('benefits.titleGradient')}
                  </GradientText>
                </h2>
              </ScrollReveal>
              {benefits.map((b, i) => (
                <ScrollReveal key={b.title} delay={i * 0.07}>
                  <GlassCard hover className="flex items-start gap-4 p-5">
                    <span className="text-2xl" role="img" aria-hidden="true">
                      {b.icon}
                    </span>
                    <div>
                      <p className="text-text-primary font-semibold">{b.title}</p>
                      <p className="text-text-secondary mt-1 text-sm">{b.detail}</p>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>

            {/* RIGHT — form ─────────────────── */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1}>
                <GlassCard className="p-8">
                  <h2 className="text-text-primary mb-1 text-xl font-bold">{t('form.title')}</h2>
                  <p className="text-text-secondary mb-6 text-sm">{t('form.subtitle')}</p>
                  <DemoForm submitLabel={t('form.submitLabel')} />
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
