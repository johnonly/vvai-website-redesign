import BannerSection from '@/components/sections/BannerSection'
import CtaSection from '@/components/sections/CtaSection'
import HeroSection from '@/components/sections/HeroSection'
import PartnerSection from '@/components/sections/PartnerSection'
import PillarsSection from '@/components/sections/PillarsSection'
import PlatformSection from '@/components/sections/PlatformSection'
import SecuritySection from '@/components/sections/SecuritySection'
import TechPillarsSection from '@/components/sections/TechPillarsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ locale: string }>
}

const HOME_META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'VV AI — Redefining Connections, Acting on Your Words',
    description:
      'V V AI connects enterprises and individuals to enable true Human–AI Collaboration across Work, Education, Life, and Health. ISO 27001 certified.',
  },
  zh: {
    title: 'V V AI — V V AI 重塑连接 你说我做',
    description:
      'VV AI 连接企业与个人，在工作、教育、生活和健康领域实现真正的人机协作与共创。通过 ISO 27001 认证。',
  },
  'zh-tw': {
    title: 'V V AI — V V AI 重塑連結 你說我做',
    description:
      'VV AI 連結企業與個人，在工作、教育、生活和健康領域實現真正的人機協作與共創。通過 ISO 27001 認證。',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const meta = HOME_META[locale] ?? HOME_META.en

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.vvai.com/${locale}`,
      languages: {
        en: 'https://www.vvai.com/en',
        zh: 'https://www.vvai.com/zh',
        'zh-TW': 'https://www.vvai.com/zh-tw',
        'x-default': 'https://www.vvai.com/en',
      },
    },
    openGraph: {
      url: `https://www.vvai.com/${locale}`,
      title: meta.title,
      description: meta.description,
    },
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <BannerSection />
      <TechPillarsSection />
      <PlatformSection />
      <SecuritySection />
      <PartnerSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
