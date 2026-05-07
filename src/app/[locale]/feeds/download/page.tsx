import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import GradientText from '@/components/ui/GradientText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import MacOSCard from '@/components/download/MacOSCard'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import type { ReactElement } from 'react'

interface PageProps {
  params: Promise<{ locale: string }>
}

const PLATFORM_KEYS = ['windows', 'macos', 'ios', 'android'] as const
type PlatformKey = (typeof PLATFORM_KEYS)[number]

interface PlatformConfig {
  color: string
  badge: 'Desktop' | 'Mobile'
  downloadHref: boolean | string
  qrSrc: string | null
}

const PLATFORM_CONFIG: Record<PlatformKey, PlatformConfig> = {
  windows: {
    color: '#5590F6',
    badge: 'Desktop',
    downloadHref: 'https://vv-web-assets-cdn.vv.com.sg/downloads/VV-AI-Setup-Windows.exe',
    qrSrc: null,
  },
  macos: {
    color: '#8B8B8B',
    badge: 'Desktop',
    downloadHref: 'https://vv-web-assets-cdn.vv.com.sg/downloads/VV-AI-macOS.dmg',
    qrSrc: null,
  },
  ios: {
    color: '#007AFF',
    badge: 'Mobile',
    downloadHref: 'https://apps.apple.com/app/vv-ai',
    qrSrc: '/images/vv/download-ios.png',
  },
  android: {
    color: '#34A853',
    badge: 'Mobile',
    downloadHref: 'https://play.google.com/store/apps/details?id=sg.vv.ai',
    qrSrc: '/images/vv/download-gp.png',
  },
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.4 3.6 10.9 2v9H2.4V3.6Zm9.8-1.74L21.6.5V11H12.2V1.86ZM2.4 13h8.5v9L2.4 20.4V13Zm9.8 0h9.4v10.5l-9.4-1.36V13Z" />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.88 12.03c.02 2.13 1.87 2.84 1.89 2.85-.02.05-.3 1.04-.99 2.06-.59.88-1.21 1.75-2.17 1.77-.95.02-1.25-.56-2.33-.56-1.08 0-1.42.54-2.31.58-.92.03-1.62-.93-2.22-1.8-1.23-1.79-2.18-5.05-.91-7.24.62-1.09 1.75-1.78 2.98-1.8.9-.02 1.75.61 2.33.61.58 0 1.65-.75 2.78-.64.47.02 1.8.19 2.65 1.43-.07.05-1.58.92-1.57 2.74Zm-1.9-4.8c.49-.6.82-1.42.73-2.25-.71.03-1.58.47-2.09 1.08-.46.53-.86 1.38-.75 2.2.79.06 1.6-.4 2.1-1.03Z" />
    </svg>
  )
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.2 2.8 13.7 12 3.2 21.2Z" fill="#30A3F1" />
      <path d="M13.7 12 17.3 8.9 21.1 11.1c1 .58 1 .94 0 1.5l-3.8 2.2Z" fill="#FBBE17" />
      <path d="M3.2 2.8 16.6 10.7 13.7 12Z" fill="#37B24D" />
      <path d="M3.2 21.2 16.6 13.3 13.7 12Z" fill="#F13E35" />
    </svg>
  )
}

const PLATFORM_ICON: Record<PlatformKey, (props: { className?: string }) => ReactElement> = {
  windows: WindowsIcon,
  macos: AppleIcon,
  ios: AppStoreIcon,
  android: GooglePlayIcon,
}

const DownloadArrow = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'download.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function DownloadPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations('download')

  // Get macOS dialog translations
  const macOSDialog = {
    title: t('platforms.macos.dialog.title'),
    description: t('platforms.macos.dialog.description'),
    howToCheck: t('platforms.macos.dialog.howToCheck'),
    step1: t('platforms.macos.dialog.step1'),
    step2: t('platforms.macos.dialog.step2'),
    noteText: t('platforms.macos.dialog.noteText'),
    downloadIntel: t('platforms.macos.dialog.downloadIntel'),
    downloadApple: t('platforms.macos.dialog.downloadApple'),
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-bg-base relative overflow-hidden pt-32 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(85,144,246,0.10) 0%, transparent 70%)',
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
              <GradientText from="#5590F6" to="#22D3EE">
                {t('hero.titleGradient')}
              </GradientText>
            </h1>
            <p className="text-text-primary mx-auto mb-3 max-w-xl text-xl font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="text-text-secondary mx-auto mb-10 max-w-2xl text-base">
              {t('hero.platformsDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/demo" variant="outline" size="lg">
                {t('hero.secondaryCta')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Platform Cards ───────────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="blue" className="mb-4">
              {t('platformsLabel')}
            </SectionLabel>
            <h2 className="text-text-primary text-3xl font-bold">{t('platformsTitle')}</h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_KEYS.map((key, i) => {
              const Icon = PLATFORM_ICON[key]
              const { color, badge, downloadHref, qrSrc } = PLATFORM_CONFIG[key]
              const isDesktop = badge === 'Desktop'
              const ctaLabel = t(`platforms.${key}.cta`)
              const isMacOS = key === 'macos'

              return (
                <ScrollReveal key={key} delay={i * 0.08}>
                  {isMacOS ? (
                    <MacOSCard
                      locale={locale}
                      color={color}
                      name={t(`platforms.${key}.name`)}
                      subtitle={t(`platforms.${key}.subtitle`)}
                      ctaLabel={ctaLabel}
                      translations={macOSDialog}
                    />
                  ) : (
                    <GlassCard hover className="flex h-full flex-col p-7">
                      {/* ── Header: platform icon + badge ── */}
                      <div className="mb-5 flex items-start justify-between">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${color}18`, color }}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isDesktop
                              ? 'bg-brand-blue/10 text-brand-blue'
                              : 'bg-green-500/10 text-green-500'
                          }`}
                        >
                          {badge}
                        </span>
                      </div>

                      {/* ── Name ── */}
                      <h3 className="text-text-primary mb-2 text-lg font-bold">
                        {t(`platforms.${key}.name`)}
                      </h3>

                      {/* ── Description (flex-1 keeps visual block anchored) ── */}
                      <p className="text-text-secondary mb-6 flex-1 text-sm">
                        {t(`platforms.${key}.subtitle`)}
                      </p>

                      {/* ── Visual block: same height on all cards ── */}
                      <div className="mb-5 flex flex-col items-center gap-2">
                        {/* QR image with bird logo centred on top, or plain bird logo */}
                        <div className="relative flex h-37 w-37 items-center justify-center">
                          {qrSrc ? (
                            <Image
                              src={qrSrc}
                              alt={`QR code for ${ctaLabel}`}
                              width={148}
                              height={148}
                              className="border-border-default rounded-2xl border p-2"
                            />
                          ) : (
                            <div className="border-border-default h-37 w-37 rounded-2xl border" />
                          )}
                          {/* Bird logo centred — on QR or on empty box */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-bg-base/90 rounded-xl p-1.5 shadow">
                              <Image
                                src="/images/vv/bird-logo.png"
                                alt="V V AI"
                                width={36}
                                height={36}
                                className="h-9 w-9 object-contain"
                              />
                            </div>
                          </div>
                        </div>
                        {qrSrc && <p className="text-text-secondary text-xs">Scan to download</p>}
                      </div>

                      {/* ── Download button (orange, full-width, pinned bottom) ── */}
                      <a
                        href={downloadHref as string}
                        {...(isDesktop
                          ? { download: true }
                          : { target: '_blank', rel: 'noopener noreferrer' })}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#FFC43A] to-[#F68E0B] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/40 active:scale-[0.98]"
                      >
                        <DownloadArrow />
                        {ctaLabel}
                      </a>
                    </GlassCard>
                  )}
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Quick Start Steps ────────────────────────────────── */}
      <section className="section-wrapper bg-bg-base">
        <div className="content-container">
          <ScrollReveal className="mb-12 text-center">
            <SectionLabel color="violet" className="mb-4">
              {t('stepsLabel')}
            </SectionLabel>
            <h2 className="text-text-primary text-3xl font-bold">{t('stepsTitle')}</h2>
          </ScrollReveal>

          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            {(['one', 'two', 'three'] as const).map((stepKey, i) => (
              <ScrollReveal key={stepKey} delay={i * 0.1}>
                <GlassCard className="flex flex-col items-start gap-4 p-6">
                  <div className="bg-brand-blue/10 text-brand-blue flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(`steps.${stepKey}`)}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before You Install ───────────────────────────────── */}
      <section className="section-wrapper bg-bg-mid">
        <div className="content-container">
          <ScrollReveal>
            <GlassCard className="p-8 md:p-10">
              <h2 className="text-text-primary mb-6 text-xl font-bold">{t('notesTitle')}</h2>
              <ul className="space-y-4">
                {(['one', 'two', 'three'] as const).map((noteKey, i) => (
                  <li key={noteKey} className="flex items-start gap-3">
                    <span className="text-brand-blue mt-0.5 leading-none font-bold">{i + 1}.</span>
                    <span className="text-text-secondary text-sm">{t(`notes.${noteKey}`)}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
