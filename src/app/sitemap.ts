import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.vvai.com'
const LOCALES = ['en', 'zh', 'zh-tw'] as const

const STATIC_ROUTES = [
  '',
  '/about',
  '/about/news',
  '/contact',
  '/demo',
  '/feeds/download',
  '/join',
  '/terms',
  '/privacy',
  '/products/work',
  '/products/education',
  '/products/life',
  '/products/health',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of STATIC_ROUTES) {
    const alternates: Record<string, string> = {}
    for (const locale of LOCALES) {
      alternates[locale === 'zh-tw' ? 'zh-TW' : locale] = `${BASE_URL}/${locale}${route}`
    }

    // Add one entry per locale
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route.startsWith('/products') ? 0.8 : 0.6,
        alternates: {
          languages: alternates,
        },
      })
    }
  }

  return entries
}
