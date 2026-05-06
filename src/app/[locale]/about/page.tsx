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
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: t('meta.title'), description: t('meta.description') }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  type Stat = { value: string; label: string }
  type Milestone = { year: string; label: string; detail: string }
  type Value = { icon: string; title: string; description: string }
  const stats = t.raw('stats') as Stat[]
  const milestones = t.raw('timeline.items') as Milestone[]
  const values = t.raw('values.items') as Value[]
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-bg-base relative overflow-hidden pt-32 pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(85,144,246,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="hero-grid-overlay opacity-30" />
        <div className="content-container relative z-10 text-center">
          <ScrollReveal>
            <SectionLabel color="blue" className="mb-6">
              {t('hero.label')}
            </SectionLabel>
            <h1 className="text-display mx-auto mb-6 max-w-3xl">
              <GradientText from="#5590F6" to="#8B5CF6">
                {t('hero.headlineGradient')}
              </GradientText>{' '}
              <span className="text-text-primary">{t('hero.headlinePlain')}</span>
            </h1>
            <p className="text-text-secondary mx-auto mb-10 max-w-3xl text-lg xl:max-w-4xl">
              {t('hero.body')}
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="demo" size="lg" href="/demo">
                {t('hero.bookDemo')}
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                {t('hero.contact')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <section className="border-border-subtle bg-bg-mid border-y py-12">
        <div className="content-container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06} className="text-center">
                <p className="text-text-primary mb-1 text-4xl font-bold">{s.value}</p>
                <p className="text-text-secondary text-sm">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-base">
        <div className="content-container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <SectionLabel color="violet" className="mb-5">
                {t('mission.label')}
              </SectionLabel>
              <h2 className="text-section mb-5">
                {t('mission.titleStart')}{' '}
                <GradientText from="#8B5CF6" to="#22D3EE">
                  {t('mission.titleGradient')}
                </GradientText>
              </h2>
              <p className="text-text-secondary mb-4">{t('mission.body1')}</p>
              <p className="text-text-secondary">{t('mission.body2')}</p>
            </ScrollReveal>

            {/* Visual accent block */}
            <ScrollReveal direction="right">
              <GlassCard className="p-8">
                <blockquote className="text-text-secondary text-lg leading-relaxed font-medium">
                  &ldquo;
                  {t.rich('mission.quote', {
                    b: (chunks) => <span className="gradient-text font-semibold">{chunks}</span>,
                  })}
                  &rdquo;
                </blockquote>
                <p className="text-text-muted mt-4 text-sm">{t('mission.quoteAttr')}</p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal className="mb-14 text-center">
            <SectionLabel color="cyan" className="mb-4">
              {t('timeline.label')}
            </SectionLabel>
            <h2 className="text-section">
              {t('timeline.titleStart')}{' '}
              <GradientText from="#22D3EE" to="#5590F6">
                {t('timeline.titleGradient')}
              </GradientText>
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Centre line */}
            <div className="bg-border-default absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 lg:block" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.06}>
                  <div
                    className={`flex items-center gap-6 lg:gap-12 ${
                      i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <GlassCard className="inline-block p-5 text-left lg:text-inherit">
                        <p className="text-brand-blue mb-1 text-xs font-bold tracking-widest uppercase">
                          {m.year}
                        </p>
                        <p className="text-text-primary font-bold">{m.label}</p>
                        <p className="text-text-secondary mt-1 text-sm">{m.detail}</p>
                      </GlassCard>
                    </div>

                    {/* Centre dot */}
                    <div className="bg-brand-blue hidden h-3 w-3 shrink-0 rounded-full shadow-[0_0_8px_rgba(85,144,246,0.8)] lg:block" />

                    {/* Spacer */}
                    <div className="hidden flex-1 lg:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-base">
        <div className="content-container">
          <ScrollReveal className="mb-14 text-center">
            <SectionLabel color="green" className="mb-4">
              {t('values.label')}
            </SectionLabel>
            <h2 className="text-section">
              {t('values.titleStart')}{' '}
              <GradientText from="#10B981" to="#5590F6">
                {t('values.titleGradient')}
              </GradientText>
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08} direction="up">
                <GlassCard hover className="flex h-full flex-col gap-4 p-6">
                  <span className="text-3xl" role="img" aria-hidden="true">
                    {v.icon}
                  </span>
                  <div>
                    <h3 className="text-text-primary mb-2 font-bold">{v.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{v.description}</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────── */}
      <section className="border-border-subtle bg-bg-mid border-t py-20 text-center">
        <div className="content-container">
          <ScrollReveal>
            <h2 className="text-section mb-4">
              {t('cta.titleStart')}{' '}
              <GradientText from="#5590F6" to="#8B5CF6">
                {t('cta.titleGradient')}
              </GradientText>
            </h2>
            <p className="text-text-secondary mx-auto mb-8 max-w-3xl text-sm md:text-base lg:max-w-5xl lg:whitespace-nowrap">
              {t('cta.body')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="demo" size="lg" href="/demo">
                {t('cta.bookDemo')}
              </Button>
              <Button variant="secondary" size="lg" href="/join">
                {t('cta.joinTeam')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
