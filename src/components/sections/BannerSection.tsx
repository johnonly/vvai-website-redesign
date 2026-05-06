'use client'

import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRef, useState } from 'react'

const CDN = '/images/vv'

const ENTERPRISE_ICONS = [
  ['icon1-default', 'icon1-hover'],
  ['icon2-default', 'icon2-hover'],
  ['icon3-default', 'icon3-hover'],
  ['icon4-default', 'icon4-hover'],
] as const

const PERSONAL_ICONS = [
  ['icon5-default', 'icon5-hover'],
  ['icon6-default', 'icon6-hover'],
  ['icon7-default', 'icon7-hover'],
  ['icon8-default', 'icon8-hover'],
] as const

function FeatureIconBtn({
  defaultSrc,
  hoverSrc,
  label,
  sub,
}: {
  defaultSrc: string
  hoverSrc: string
  label: string
  sub: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <li
      className="flex cursor-default flex-col items-center gap-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-12 w-12 select-none">
        <Image
          src={defaultSrc}
          alt={label}
          fill
          sizes="48px"
          className={`object-contain transition-opacity duration-200 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden
          fill
          sizes="48px"
          className={`object-contain transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <p className="text-text-primary max-w-[88px] text-center text-xs leading-tight font-semibold">
        {label}
      </p>
      <p className="text-text-secondary max-w-[88px] text-center text-[10px] leading-tight">
        {sub}
      </p>
    </li>
  )
}

const slideIn = (direction: 'left' | 'right' | 'up' = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    y: direction === 'up' ? 30 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  },
})

export default function BannerSection() {
  const t = useTranslations('audience')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const enterpriseFeatures = t.raw('enterprise.features') as Array<{
    label: string
    sub: string
  }>
  const personalFeatures = t.raw('individual.features') as Array<{
    label: string
    sub: string
  }>

  return (
    <section ref={ref} className="bg-bg-base relative overflow-hidden">
      {/* Radial blue glow overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(85,144,246,0.10) 0%, transparent 65%)',
        }}
      />
      {/* Subtle earth texture at low opacity */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${CDN}/earth-inner-bg.png)`,
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '640px 640px',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 px-4 py-20">
        {/* Section heading */}
        <motion.div
          variants={slideIn('up', 0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14 text-center"
        >
          <h2 className="text-section">{t('title')}</h2>
        </motion.div>

        {/* Three-column layout: enterprise | bird | personal */}
        <div className="mx-auto flex max-w-[1300px] flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
          {/* ── LEFT: Enterprise ── */}
          <motion.div
            variants={slideIn('left', 0.15)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-full md:w-[360px] lg:w-[380px]"
          >
            <h3 className="text-text-primary mb-2 text-right text-xl font-bold">
              {t('enterprise.headline')}
            </h3>
            <p className="text-text-secondary mb-6 text-right text-sm leading-relaxed">
              {t('enterprise.sub')}
            </p>
            <ul
              className="border-border-default grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border p-5 backdrop-blur-sm"
              style={{
                background:
                  'linear-gradient(135deg, rgba(85,144,246,0.12) 0%, var(--feature-card-bg) 100%)',
                boxShadow: '0 27px 44px rgba(33,176,252,0.10)',
              }}
            >
              {enterpriseFeatures.map((feat, i) => (
                <FeatureIconBtn
                  key={feat.label}
                  defaultSrc={`${CDN}/${ENTERPRISE_ICONS[i][0]}.png`}
                  hoverSrc={`${CDN}/${ENTERPRISE_ICONS[i][1]}.png`}
                  label={feat.label}
                  sub={feat.sub}
                />
              ))}
            </ul>
          </motion.div>

          {/* ── CENTER: Animated bird logo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.65 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative h-[264px] w-[264px] flex-shrink-0"
          >
            {/* Large sonar-ping halo (matches original .group-circle-big) */}
            <div className="group-circle-big absolute inset-0 rounded-full" />

            {/* Outer breathing ring */}
            <div
              className="banner-circle-big absolute rounded-full border-[6px] border-white/20"
              style={{ inset: '-10px' }}
            />
            {/* Inner breathing ring */}
            <div className="banner-circle-sm absolute inset-[50px] rounded-full border-4 border-white/30" />

            {/* Faint dimmed logo layer */}
            <div className="bg-brand-blue/[0.06] absolute inset-0 flex items-center justify-center rounded-full">
              <Image
                src={`${CDN}/bird-logo.png`}
                alt=""
                aria-hidden
                width={200}
                height={200}
                className="opacity-10"
              />
            </div>

            {/* Bird-container art (swinging) */}
            <div className="banner-yao-bai absolute inset-0 flex items-center justify-center">
              <Image
                src={`${CDN}/bird-container.png`}
                alt=""
                aria-hidden
                width={264}
                height={264}
                className="opacity-25"
              />
            </div>

            {/* Main animated bird logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={`${CDN}/bird-logo.png`}
                alt="V V AI"
                width={200}
                height={200}
                className="banner-bird-breathe relative z-10"
              />
            </div>

            {/* Left floating circle icon — Enterprise (locale-aware) */}
            <div className="icon-left absolute top-1/2 -translate-y-1/2" aria-hidden>
              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="grad-enterprise" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#7DD8FA" />
                    <stop offset="100%" stopColor="#29A8E0" />
                  </radialGradient>
                </defs>
                <circle cx="48" cy="48" r="48" fill="url(#grad-enterprise)" />
                {/* Building icon */}
                <g transform="translate(28, 22)" fill="white" opacity="0.95">
                  <rect
                    x="5"
                    y="8"
                    width="30"
                    height="22"
                    rx="1.5"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                  />
                  <rect
                    x="0"
                    y="14"
                    width="10"
                    height="16"
                    rx="1.5"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <rect
                    x="30"
                    y="14"
                    width="10"
                    height="16"
                    rx="1.5"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <rect x="14" y="20" width="12" height="10" rx="1" fill="white" />
                  <rect x="9" y="13" width="5" height="5" rx="0.5" fill="white" opacity="0.7" />
                  <rect x="26" y="13" width="5" height="5" rx="0.5" fill="white" opacity="0.7" />
                  <line x1="0" y1="30" x2="40" y2="30" stroke="white" strokeWidth="2" />
                </g>
                <text
                  x="48"
                  y="78"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="system-ui,sans-serif"
                >
                  {t('enterprise.label')}
                </text>
              </svg>
            </div>

            {/* Right floating circle icon — Individual (locale-aware) */}
            <div className="icon-right absolute top-1/2 -translate-y-1/2" aria-hidden>
              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="grad-individual" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FAD07A" />
                    <stop offset="100%" stopColor="#F0922B" />
                  </radialGradient>
                </defs>
                <circle cx="48" cy="48" r="48" fill="url(#grad-individual)" />
                {/* Person icon */}
                <circle
                  cx="48"
                  cy="32"
                  r="9"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  opacity="0.95"
                />
                <path
                  d="M28 62c0-11 8.954-20 20-20s20 8.954 20 20"
                  stroke="white"
                  strokeWidth="2.2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <text
                  x="48"
                  y="80"
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="system-ui,sans-serif"
                >
                  {t('individual.label')}
                </text>
              </svg>
            </div>
          </motion.div>

          {/* ── RIGHT: Personal ── */}
          <motion.div
            variants={slideIn('right', 0.15)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-full md:w-[360px] lg:w-[380px]"
          >
            <h3 className="text-text-primary mb-2 text-xl font-bold">{t('individual.headline')}</h3>
            <p className="text-text-secondary mb-6 text-sm leading-relaxed">
              {t('individual.sub')}
            </p>
            <ul
              className="border-border-default grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border p-5 backdrop-blur-sm"
              style={{
                background:
                  'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, var(--feature-card-bg) 100%)',
                boxShadow: '0 27px 44px rgba(255,168,50,0.06)',
              }}
            >
              {personalFeatures.map((feat, i) => (
                <FeatureIconBtn
                  key={feat.label}
                  defaultSrc={`${CDN}/${PERSONAL_ICONS[i][0]}.png`}
                  hoverSrc={`${CDN}/${PERSONAL_ICONS[i][1]}.png`}
                  label={feat.label}
                  sub={feat.sub}
                />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
