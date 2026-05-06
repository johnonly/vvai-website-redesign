import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import GSAPProvider from '@/components/providers/GSAPProvider'
import LenisProvider from '@/components/providers/LenisProvider'
import ThemeProvider from '@/components/providers/ThemeProvider'
import { routing } from '@/i18n/routing'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import type { ReactNode } from 'react'

const GA_MEASUREMENT_ID = 'G-ML4Z1T6JT5'

const english = localFont({
  src: '../../../public/fonts/English.woff',
  variable: '--font-sans',
  display: 'swap',
})

const englishDisplay = localFont({
  src: '../../../public/fonts/English.woff',
  variable: '--font-display',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0E1A' },
    { media: '(prefers-color-scheme: light)', color: '#eef3fc' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vvai.com'),
  title: {
    default: 'VV AI — Redefining Connections, Acting on Your Words',
    template: '%s | VV AI',
  },
  description:
    'VV AI connects enterprises and individuals to enable true Human–AI Collaboration and Co-creation across Work, Education, Life, and Health.',
  keywords: [
    'VV AI',
    'enterprise AI',
    'collaboration platform',
    'AI workplace',
    'Singapore',
    'AI assistant',
    'education platform',
    'health management',
    'ISO 27001',
  ],
  authors: [{ name: 'V V Technology Pte. Ltd.' }],
  creator: 'V V Technology Pte. Ltd.',
  publisher: 'V V Technology Pte. Ltd.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://www.vvai.com',
    languages: {
      en: 'https://www.vvai.com/en',
      zh: 'https://www.vvai.com/zh',
      'zh-TW': 'https://www.vvai.com/zh-tw',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'V V AI',
    title: 'V V AI — Redefining Connections, Acting on Your Words',
    description: 'AI-powered platform for Work, Education, Life, and Health.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'VV AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V V AI — Redefining Connections,Acting on Your Words',
    description: 'AI-powered platform for Work, Education, Life, and Health.',
    images: ['/og-image.png'],
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <>
      <div
        className={`${english.variable} ${englishDisplay.variable} bg-bg-base text-text-primary min-h-full antialiased`}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="focus:bg-brand-blue sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:ring-2 focus:ring-white focus:outline-none"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <LenisProvider>
              <GSAPProvider>
                <Navbar />
                <main id="main-content">{children}</main>
                <Footer />
              </GSAPProvider>
            </LenisProvider>
          </NextIntlClientProvider>
        </ThemeProvider>

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
      </div>
    </>
  )
}
