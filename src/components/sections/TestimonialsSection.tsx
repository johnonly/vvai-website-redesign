'use client'

import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { TESTIMONIALS } from '@/data/testimonials'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const [active, setActive] = useState(0)

  const current = TESTIMONIALS[active]

  return (
    <section className="section-wrapper bg-bg-base">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <SectionLabel color="cyan" className="mb-4">{t('label')}</SectionLabel>
          <h2 className="text-section">{t('title')}</h2>
          <p className="mt-3 text-base text-text-secondary">{t('subtitle')}</p>
        </ScrollReveal>

        {/* Featured testimonial */}
        <ScrollReveal delay={0.1}>
          <div className="mx-auto mb-12 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <GlassCard glow className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <StarRating count={current.rating} />
                  </div>
                  <blockquote className="mb-8 text-lg leading-relaxed text-text-primary">
                    &ldquo;{t(`items.${current.id}.quote`)}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={current.avatarUrl}
                      alt={current.authorName}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-blue/30"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(current.authorName)}&background=5590F6&color=fff&size=48`
                      }}
                    />
                    <div className="text-left">
                      <p className="font-semibold text-text-primary">{current.authorName}</p>
                      <p className="text-sm text-text-secondary">
                        {t(`items.${current.id}.authorTitle`)} · {current.authorOrg}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Avatar nav */}
        <ScrollReveal delay={0.2} className="flex justify-center gap-3">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              className={`relative transition-all duration-300 ${
                active === i ? 'scale-110' : 'opacity-50 hover:opacity-80'
              }`}
              aria-label={`Testimonial from ${item.authorName}`}
            >
              <img
                src={item.avatarUrl}
                alt={item.authorName}
                className={`h-10 w-10 rounded-full object-cover ${
                  active === i ? 'ring-2 ring-brand-blue' : ''
                }`}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.authorName)}&background=1A1F3C&color=5590F6&size=40`
                }}
              />
            </button>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
