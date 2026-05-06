import DemoForm from '@/components/contact/DemoForm'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: t('meta.title'), description: t('meta.description') }
}

const CONTACT_ICONS = [
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
]

export default async function ContactPage() {
  const t = await getTranslations('contact')
  const infoItems = t.raw('info.items') as Array<{ label: string; value: string }>
  const stats = t.raw('why.stats') as Array<{ value: string; label: string }>
  const certs = t.raw('securityBadge.certs') as string[]
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bg-base pt-32 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(85,144,246,0.10) 0%, transparent 70%)',
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
            <p className="mx-auto max-w-xl text-lg text-text-secondary">
              {t('hero.body')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Main grid ────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* LEFT — form ─────────────────── */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <GlassCard className="p-8">
                  <h2 className="mb-1 text-xl font-bold text-text-primary">{t('form.title')}</h2>
                  <p className="mb-6 text-sm text-text-secondary">{t('form.subtitle')}</p>
                  <DemoForm submitLabel={t('form.submitLabel')} />
                </GlassCard>
              </ScrollReveal>
            </div>

            {/* RIGHT — contact info ─────────── */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              <ScrollReveal delay={0.1}>
                <GlassCard className="p-6">
                  <h3 className="mb-4 font-bold text-text-primary">{t('info.title')}</h3>
                  <div className="flex flex-col gap-4">
                    {infoItems.map((c, i) => (
                      <div key={c.label} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 text-brand-blue">
                          {CONTACT_ICONS[i] ?? CONTACT_ICONS[0]}
                        </span>
                        <div>
                          <p className="text-xs text-text-muted">{c.label}</p>
                          <p className="text-sm font-medium whitespace-pre-line text-text-primary">
                            {c.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <GlassCard className="p-6">
                  <h3 className="mb-4 font-bold text-text-primary">{t('why.title')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                        <p className="text-xs text-text-muted">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <GlassCard className="p-6">
                  <h3 className="mb-3 font-bold text-text-primary">{t('securityBadge.title')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {certs.map((cert) => (
                      <span
                        key={cert}
                        className="rounded-full border border-border-default bg-surface px-3 py-1 text-xs text-text-secondary"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
