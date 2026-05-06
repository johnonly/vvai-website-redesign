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
  const t = await getTranslations({ locale, namespace: 'join' })
  return { title: t('meta.title'), description: t('meta.description') }
}

type Department = 'engineering' | 'product' | 'design' | 'sales' | 'marketing' | 'operations'

interface Job {
  id: string
  title: string
  department: Department
  location: string
  type: string
  level: string
  description: string
}

const DEPT_COLOURS: Record<Department, string> = {
  engineering: '#5590F6',
  product: '#8B5CF6',
  design: '#EC4899',
  sales: '#10B981',
  marketing: '#F59E0B',
  operations: '#22D3EE',
}

export default async function JoinPage() {
  const t = await getTranslations('join')
  const jobs = t.raw('jobs') as Job[]
  const perks = t.raw('perks') as Array<{ emoji: string; title: string }>
  const depts = t.raw('depts') as Record<string, string>
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bg-base pt-32 pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 65% 55% at 50% 25%, rgba(139,92,246,0.12) 0%, transparent 70%)',
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
            <p className="mx-auto mb-10 max-w-2xl text-lg text-text-secondary">
              {t('hero.body')}
            </p>
            <Button variant="primary" size="lg" href="#open-roles">
              {t('hero.cta')}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Perks strip ──────────────────────────────────────── */}
      <section className="border-y border-border-default bg-bg-mid py-12">
        <div className="content-container">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {perks.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.05}>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border-subtle bg-surface p-4 text-center">
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {v.emoji}
                  </span>
                  <p className="text-xs font-semibold text-text-secondary">{v.title}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open roles ───────────────────────────────────────── */}
      <section id="open-roles" className="section-wrapper bg-bg-base">
        <div className="content-container">
          <ScrollReveal className="mb-14">
            <SectionLabel color="blue" className="mb-4">
              {t('roles.label')}
            </SectionLabel>
            <h2 className="text-section">
              {t('roles.titleCount', { count: jobs.length })}{' '}
              <GradientText from="#5590F6" to="#22D3EE">
                {t('roles.titleGradient')}
              </GradientText>
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {jobs.map((job, i) => (
              <ScrollReveal key={job.id} delay={i * 0.07}>
                <GlassCard
                  hover
                  className="group flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                        style={{
                          background: `${DEPT_COLOURS[job.department]}22`,
                          color: DEPT_COLOURS[job.department],
                        }}
                      >
                        {depts[job.department] ?? job.department}
                      </span>
                      <span className="text-xs text-text-muted">{job.level}</span>
                    </div>
                    <h3 className="mb-1 font-bold text-text-primary">{job.title}</h3>
                    <p className="mb-2 text-sm text-text-secondary">{job.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-text-muted">
                      <span>📍 {job.location}</span>
                      <span>⏱ {job.type}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      href={`mailto:careers@vvai.com?subject=Application: ${encodeURIComponent(job.title)}`}
                    >
                      {t('roles.applyNow')}
                    </Button>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10 text-center">
            <p className="text-text-secondary">
              {t('roles.noRole')}{' '}
              <a
                href="mailto:careers@vvai.com"
                className="text-brand-blue hover:underline"
              >
                {t('roles.sendCV')}
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
