import ScrollReveal from '@/components/ui/ScrollReveal'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  return { title: t('meta.title'), description: t('meta.description') }
}


export default async function TermsPage() {
  const t = await getTranslations('terms')
  type Section = { id: string; heading: string; body: string }
  const sections = t.raw('sections') as Section[]

  return (
    <>
      {/* Hero */}
      <section className="relative bg-bg-base pt-32 pb-12">
        <div className="hero-grid-overlay opacity-20" />
        <div className="content-container relative z-10">
          <ScrollReveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              {t('hero.badge')}
            </p>
            <h1 className="mb-3 text-4xl font-bold text-text-primary">{t('hero.title')}</h1>
            <p className="text-sm text-text-muted">{t('hero.lastUpdated')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-bg-mid py-16">
        <div className="content-container">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start">
            {/* Sticky ToC */}
            <nav className="hidden lg:block lg:sticky lg:top-24">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
                {t('toc')}
              </p>
              <ul className="space-y-1.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-sm text-text-secondary hover:text-brand-blue transition-colors"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Prose */}
            <div className="space-y-10">
              {sections.map((s) => (
                <ScrollReveal key={s.id}>
                  <section id={s.id}>
                    <h2 className="mb-3 text-lg font-bold text-text-primary">{s.heading}</h2>
                    {s.body.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-3 text-sm leading-relaxed text-text-secondary">
                        {para}
                      </p>
                    ))}
                  </section>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
