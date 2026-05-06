'use client'

import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { useLocale, useTranslations } from 'next-intl'

const CDN = '/images/vv'

export default function PlatformSection() {
  const t = useTranslations('platform')
  const locale = useLocale()
  const bullets = t.raw('bullets') as string[]
  const statLabel = (key: 'modules' | 'coreSuites' | 'partners' | 'uptimeSla') => {
    const translated = t(`stats.${key}`)
    if (locale === 'en' && translated === `platform.stats.${key}`) {
      const enFallback: Record<typeof key, string> = {
        modules: 'Modules',
        coreSuites: 'Core Suites',
        partners: 'Partners',
        uptimeSla: 'Uptime SLA',
      }
      return enFallback[key]
    }
    return translated
  }
  const stats = [
    { value: '35+', label: statLabel('modules') },
    { value: '4', label: statLabel('coreSuites') },
    { value: '100+', label: statLabel('partners') },
    { value: '99.9%', label: statLabel('uptimeSla') },
  ]

  return (
    <section className="section-wrapper platform-section-bg overflow-hidden">
      {/* Cleaner layered backdrop for readability and visual depth */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="light:from-white/40 light:to-transparent absolute inset-0 bg-linear-to-b from-white/3 via-transparent to-black/10 dark:from-white/3 dark:to-black/10" />
        <div className="platform-section-grid absolute inset-0" />
        <div className="bg-brand-blue/10 absolute top-16 -left-24 h-64 w-64 rounded-full blur-3xl" />
        <div className="bg-brand-violet/10 absolute top-1/2 -right-20 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="absolute inset-y-0 right-[8%] hidden w-px bg-linear-to-b from-transparent via-white/12 to-transparent lg:block" />
      </div>

      <div className="content-container relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-5">{t('label')}</SectionLabel>
              <h2 className="text-section mb-4">{t('title')}</h2>
              <p className="text-brand-blue mb-6 text-lg font-medium">{t('subtitle')}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <ul className="mb-8 space-y-4">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-brand-blue/20 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <svg
                        className="text-brand-blue h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary text-base leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Stats row — each stat reveals with a stagger */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <ScrollReveal key={s.label} delay={0.2 + i * 0.08} direction="up">
                  <div className="text-center">
                    <p className="text-text-primary text-2xl font-black">{s.value}</p>
                    <p className="text-text-muted text-xs">{s.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" href="/products">
                  {t('actions.explorePlatform')}
                </Button>
                <Button variant="secondary" size="md" href="/demo">
                  {t('actions.seeItLive')}
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Platform visual */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="relative mx-auto max-w-140">
              {/* Soft glow halo behind the whole cluster */}
              <div
                className="platform-float-glow pointer-events-none absolute -inset-10 z-0 rounded-[80px] opacity-20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10 overflow-visible rounded-3xl">
                <div
                  className="platform-hex-pattern pointer-events-none absolute inset-6 z-0 rounded-4xl opacity-70"
                  aria-hidden="true"
                />

                <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                  <div className="platform-ring platform-ring-1" />
                  <div className="platform-ring platform-ring-2" />
                </div>

                <div className="relative z-10 overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(10,14,26,0.35)]">
                  <img
                    src={
                      locale === 'en'
                        ? '/images/vv/home/home_platform_img_en.png'
                        : locale === 'zh-tw'
                          ? '/images/vv/home/home_platform_img_CNTW.png'
                          : '/images/vv/home/home_platform_img_cn.png'
                    }
                    alt="VV AI platform overview"
                    className="w-full"
                    draggable={false}
                  />
                </div>

                <div className="float-card-5 absolute top-[6%] right-[-2%] z-30 w-[15%] drop-shadow-[0_10px_26px_rgba(52,211,153,0.45)] sm:w-[13%]">
                  <img
                    src={`${CDN}/index_page2_img4.png`}
                    alt=""
                    className="w-full"
                    draggable={false}
                  />
                </div>

                <div className="float-card-7 absolute bottom-[16%] left-[-1%] z-20 w-[18%] drop-shadow-[0_8px_22px_rgba(85,144,246,0.32)] sm:w-[15%]">
                  <img
                    src={`${CDN}/index_page2_img7.png`}
                    alt=""
                    className="w-full"
                    draggable={false}
                  />
                </div>

                <div className="float-card-6 absolute right-[12%] bottom-[-4%] z-30 w-[26%] drop-shadow-[0_10px_28px_rgba(85,144,246,0.42)] sm:w-[22%]">
                  <img
                    src={`${CDN}/index_page2_img9.png`}
                    alt=""
                    className="w-full"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Live badge */}
              <div className="absolute -bottom-5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap">
                <div className="bg-bg-mid/80 flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-white/80 shadow-lg backdrop-blur-md">
                  <span className="bg-brand-blue h-2 w-2 animate-pulse rounded-full shadow-[0_0_6px_rgba(85,144,246,0.8)]" />
                  VV AI · Work Suite
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
