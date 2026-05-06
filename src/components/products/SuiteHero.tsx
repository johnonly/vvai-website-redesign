import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'
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

const noticeToneMap: Record<LabelColor, { panel: string; badge: string }> = {
  blue: {
    panel: 'border-brand-blue/20 bg-brand-blue/10',
    badge: 'border-brand-blue/30 bg-brand-blue/10 text-brand-blue',
  },
  violet: {
    panel: 'border-brand-violet/20 bg-brand-violet/10',
    badge: 'border-brand-violet/30 bg-brand-violet/10 text-brand-violet',
  },
  cyan: {
    panel: 'border-brand-cyan/20 bg-brand-cyan/10',
    badge: 'border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan',
  },
  green: {
    panel: 'border-brand-green/20 bg-brand-green/10',
    badge: 'border-brand-green/30 bg-brand-green/10 text-brand-green',
  },
}

interface SuiteHeroProps {
  suite: SuiteData
}

export default async function SuiteHero({ suite }: SuiteHeroProps) {
  const t = await getTranslations('products')
  const labelColor = accentColorMap[suite.accentColor] ?? 'blue'
  const isEducationSuite = suite.id === 'education'
  const notice = suite.releaseStatus === 'comingSoon' ? suite.notice : undefined
  const noticeTone = noticeToneMap[labelColor]

  return (
    <section className="bg-bg-base relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 40%, ${suite.accentColor}18 0%, transparent 70%)`,
        }}
      />
      {/* Grid overlay */}
      <div className="hero-grid-overlay opacity-40" />

      <div className="content-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — text */}
          <div>
            <SectionLabel color={labelColor} className="mb-5">
              {suite.label}
            </SectionLabel>
            <h1 className="text-display mb-5" style={{ fontSize: 'clamp(36px, 4.75vw, 60px)' }}>
              <GradientText from={suite.gradientFrom} to={suite.gradientTo}>
                {suite.headline}
              </GradientText>
            </h1>
            {isEducationSuite ? (
              <ol className="mb-8 space-y-3">
                <li className="border-border-default bg-surface/60 flex items-start gap-3 rounded-xl border px-4 py-3">
                  <span className="text-sm font-semibold" style={{ color: suite.accentColor }}>
                    01
                  </span>
                  <p className="text-text-secondary text-lg leading-relaxed lg:text-xl">
                    {suite.subline}
                  </p>
                </li>
                <li className="border-border-default bg-surface/60 flex items-start gap-3 rounded-xl border px-4 py-3">
                  <span className="text-sm font-semibold" style={{ color: suite.accentColor }}>
                    02
                  </span>
                  <p className="text-text-secondary text-lg leading-relaxed lg:text-xl">
                    {suite.tagline}
                  </p>
                </li>
              </ol>
            ) : (
              <>
                {Array.isArray(suite.sublineBullets) && suite.sublineBullets.length > 0 ? (
                  <ul className="mb-8 space-y-2">
                    {suite.sublineBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: suite.accentColor }}
                        />
                        <p className="text-text-secondary text-lg leading-relaxed lg:text-xl">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-secondary mb-4 text-2xl font-medium">{suite.subline}</p>
                )}
                <div className="mb-8 flex flex-wrap gap-2">
                  {suite.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="border-border-default bg-surface text-text-secondary rounded-full border px-3 py-1 text-base"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                {notice ? (
                  <div className={`mb-6 rounded-xl border px-4 py-3 ${noticeTone.panel}`}>
                    <p
                      className={`mb-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.2em] uppercase ${noticeTone.badge}`}
                    >
                      {notice.badge}
                    </p>
                    <h2 className="text-text-primary mb-1 text-base font-semibold">
                      {notice.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {notice.description}
                    </p>
                  </div>
                ) : null}
              </>
            )}
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/feeds/download">
                {suite.ctaLabel}
              </Button>
              <Button variant="demo" size="lg" href="/demo">
                {t('suiteHero.demo')}
              </Button>
            </div>
          </div>

          {/* Right — primary screenshot */}
          <div className="relative">
            {/* Glow behind image */}
            <div
              className="absolute -inset-6 z-0 rounded-3xl opacity-25 blur-2xl"
              style={{
                background: `linear-gradient(135deg, ${suite.gradientFrom}, ${suite.gradientTo})`,
              }}
            />
            <div className="border-border-default relative z-10 scale-110 overflow-hidden rounded-2xl border shadow-2xl">
              <img
                src={suite.heroImage}
                alt={`${suite.label} product screenshot`}
                className="w-full object-cover"
                loading="eager"
              />
            </div>

            {/* Floating accent badge */}
            <div className="border-border-default bg-bg-base/90 absolute -right-4 -bottom-4 z-20 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-sm">
              <p className="text-text-muted text-sm">{t('suiteHero.poweredBy')}</p>
              <p className="text-base font-bold" style={{ color: suite.accentColor }}>
                {t('suiteHero.engine')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
