'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { useTranslations } from 'next-intl'

const CDN = '/images/vv'

const PARTNERS = [
  { name: 'Rhema Joy Tuition Services', logo: `${CDN}/imgi_81_default.png` },
  { name: 'Adam Kelvin Tuition Academy', logo: `${CDN}/imgi_82_default.png` },
  { name: 'ADJ Education', logo: `${CDN}/imgi_83_default.png` },
  { name: 'ARThaus', logo: `${CDN}/imgi_84_default.png` },
  { name: 'The Squirrel Centre', logo: `${CDN}/imgi_85_default.png` },
  { name: 'Math Mindset', logo: `${CDN}/imgi_86_default.png` },
  { name: 'Partner 7', logo: `${CDN}/imgi_87_default.png` },
  { name: 'Maple Tree Education Centre', logo: `${CDN}/imgi_88_Edu%20Logo%2008.681ef617.png` },
  { name: 'Tin Wong Education', logo: `${CDN}/imgi_89_Edu%20Logo%2009.f0c71d53.png` },
  { name: 'Wise Thinking Education', logo: `${CDN}/imgi_90_Edu%20Logo%2010.648bb53c.png` },
  { name: 'Learning Easy', logo: `${CDN}/imgi_91_Edu%20Logo%2011.c6a36a41.png` },
  { name: '11 Education Centre', logo: `${CDN}/imgi_92_default.png` },
]

export default function PartnerSection() {
  const t = useTranslations('partners')

  return (
    <section className="section-wrapper bg-bg-mid overflow-hidden">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <SectionLabel color="cyan" className="mb-4">
            {t('label')}
          </SectionLabel>
          <h2 className="text-section">{t('title')}</h2>
        </ScrollReveal>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks */}
        <div className="from-bg-mid pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r to-transparent" />
        <div className="from-bg-mid pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l to-transparent" />

        {/* Track */}
        <div className="animate-marquee flex gap-8 py-4">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface grayscale transition-all duration-300 hover:border-border-default hover:bg-surface-hover hover:grayscale-0 dark:border-white/20 dark:bg-white/90 dark:hover:bg-white"
              style={{ height: '130px', width: '292px', padding: '20px 41px' }}
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-full w-full object-contain opacity-70 transition-opacity hover:opacity-100 dark:opacity-100"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs text-text-muted">${p.name}</span>`
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
