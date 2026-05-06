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
  const t = await getTranslations({ locale, namespace: 'news' })
  return { title: t('meta.title'), description: t('meta.description') }
}

const CATEGORY_COLOURS: Record<string, string> = {
  product: '#5590F6',
  company: '#8B5CF6',
  security: '#10B981',
  partnerships: '#22D3EE',
}

interface Post {
  title: string
  excerpt: string
  categoryKey: string
  date: string
  readTime: string
}

export default async function NewsPage() {
  const t = await getTranslations('news')
  const posts = t.raw('posts') as Post[]
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-bg-base relative overflow-hidden pt-32 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(85,144,246,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="hero-grid-overlay opacity-30" />
        <div className="content-container relative z-10">
          <ScrollReveal>
            <SectionLabel color="blue" className="mb-6">
              {t('hero.label')}
            </SectionLabel>
            <h1 className="text-display mb-4">
              {t('hero.heading')}{' '}
              <GradientText from="#5590F6" to="#22D3EE">
                {t('hero.headingGradient')}
              </GradientText>
            </h1>
            <p className="text-text-secondary max-w-xl text-lg">{t('hero.body')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          {/* Featured post */}
          <ScrollReveal className="mb-12">
            <GlassCard hover className="grid gap-6 p-8 lg:grid-cols-2 lg:items-center">
              {/* Placeholder image */}
              <div
                className="aspect-video rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${CATEGORY_COLOURS[featured.categoryKey]}22, ${CATEGORY_COLOURS[featured.categoryKey]}08)`,
                  border: `1px solid ${CATEGORY_COLOURS[featured.categoryKey]}22`,
                }}
              />
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                    style={{
                      background: `${CATEGORY_COLOURS[featured.categoryKey]}22`,
                      color: CATEGORY_COLOURS[featured.categoryKey],
                    }}
                  >
                    {t(`categories.${featured.categoryKey}`)}
                  </span>
                  <span className="text-text-muted text-xs">{t('featured')}</span>
                </div>
                <h2 className="text-text-primary mb-3 text-2xl font-bold">{featured.title}</h2>
                <p className="text-text-secondary mb-4">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-text-muted flex gap-3 text-xs">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <Button variant="outline" size="sm" href="/about/news/coming-soon">
                    {t('readMore')}
                  </Button>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <ScrollReveal key={post.title} delay={i * 0.07}>
                <GlassCard hover className="flex h-full flex-col gap-4 p-6">
                  {/* Category badge */}
                  <span
                    className="self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                    style={{
                      background: `${CATEGORY_COLOURS[post.categoryKey]}22`,
                      color: CATEGORY_COLOURS[post.categoryKey],
                    }}
                  >
                    {t(`categories.${post.categoryKey}`)}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-text-primary mb-2 leading-snug font-bold">{post.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="border-border-subtle flex items-center justify-between border-t pt-2">
                    <div className="text-text-muted flex gap-2 text-xs">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <a
                      href="/about/news/coming-soon"
                      className="text-brand-blue text-xs hover:underline"
                    >
                      {t('readArrow')}
                    </a>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          {/* CMS note */}
          <ScrollReveal className="mt-12 text-center">
            <p className="text-text-muted text-sm">
              {t('cms')}{' '}
              <a href="/contact" className="text-brand-blue hover:underline">
                {t('subscribe')}
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
