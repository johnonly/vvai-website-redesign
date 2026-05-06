import FeatureGrid from '@/components/products/FeatureGrid'
import ModuleList from '@/components/products/ModuleList'
import ScreenshotShowcase from '@/components/products/ScreenshotShowcase'
import SuiteHero from '@/components/products/SuiteHero'
import SuiteSecurityBar from '@/components/products/SuiteSecurityBar'
import CtaSection from '@/components/sections/CtaSection'
import { getSuiteBySlug, SUITES, type SuiteFeature, type SuiteNotice } from '@/data/suites'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ locale: string; suite: string }>
}

export async function generateStaticParams() {
  const locales = ['en', 'zh', 'zh-tw']
  return locales.flatMap((locale) => SUITES.map((s) => ({ locale, suite: s.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, suite: suiteSlug } = await params
  const suite = getSuiteBySlug(suiteSlug)
  if (!suite) return {}
  const st = await getTranslations({ locale, namespace: 'suites' })
  const heroImage = suite.heroImages?.[locale] ?? suite.heroImages?.en ?? suite.heroImage
  const label = st(`${suite.id}.label`)
  const subline = st(`${suite.id}.subline`)
  return {
    title: `${label} — VV AI`,
    description: subline,
    openGraph: {
      title: `${label} — VV AI`,
      description: subline,
      images: [{ url: heroImage }],
    },
  }
}

export default async function ProductSuitePage({ params }: Props) {
  const { locale, suite: suiteSlug } = await params
  const suite = getSuiteBySlug(suiteSlug)

  if (!suite) notFound()

  const st = await getTranslations('suites')
  let rawBullets: string[] | undefined
  let rawNotice: SuiteNotice | undefined

  try {
    rawBullets = st.raw(`${suite.id}.sublineBullets`) as string[] | undefined
  } catch {
    rawBullets = undefined
  }

  try {
    rawNotice = st.raw(`${suite.id}.notice`) as SuiteNotice | undefined
  } catch {
    rawNotice = undefined
  }

  const localizedSuite = {
    ...suite,
    label: st(`${suite.id}.label`),
    headline: st(`${suite.id}.headline`),
    subline: st(`${suite.id}.subline`),
    sublineBullets: rawBullets as [string, string] | undefined,
    tagline: st(`${suite.id}.tagline`),
    keywords: st.raw(`${suite.id}.keywords`) as string[],
    ctaLabel: st(`${suite.id}.ctaLabel`),
    features: st.raw(`${suite.id}.features`) as SuiteFeature[],
    notice: suite.releaseStatus === 'comingSoon' ? rawNotice : undefined,
  }

  // Apply locale-specific hero image
  if (suite.heroImages) {
    localizedSuite.heroImage = suite.heroImages[locale] ?? suite.heroImages.en ?? suite.heroImage
  }

  // Apply locale-specific screenshot sources
  if (suite.localeScreenshotSrcs) {
    const localeSrcs = suite.localeScreenshotSrcs[locale] ?? suite.localeScreenshotSrcs.en ?? []
    let srcIdx = 0
    localizedSuite.screenshots = suite.screenshots.map((s) => ({
      ...s,
      src: localeSrcs[srcIdx++] ?? s.src,
    }))
  }

  return (
    <>
      <SuiteHero suite={localizedSuite} />
      <SuiteSecurityBar suite={localizedSuite} />
      <FeatureGrid suite={localizedSuite} />
      <ScreenshotShowcase suite={localizedSuite} />
      <ModuleList suite={localizedSuite} />
      <CtaSection />
    </>
  )
}
