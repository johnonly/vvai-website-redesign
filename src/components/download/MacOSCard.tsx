'use client'

import { useState } from 'react'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import MacOSDownloadDialog from '@/components/ui/MacOSDownloadDialog'

interface MacOSCardProps {
  locale: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  name: string
  subtitle: string
  ctaLabel: string
  translations: {
    title: string
    description: string
    howToCheck: string
    step1: string
    step2: string
    intelLabel: string
    appleLabel: string
    orText: string
    noteText: string
    downloadIntel: string
    downloadApple: string
  }
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

export default function MacOSCard({
  locale,
  icon: Icon,
  color,
  name,
  subtitle,
  ctaLabel,
  translations,
}: MacOSCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <GlassCard hover className="flex h-full flex-col p-7">
        {/* ── Header: platform icon + badge ── */}
        <div className="mb-5 flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${color}18`, color }}
          >
            <Icon className="h-7 w-7" />
          </div>
          <span className="bg-brand-blue/10 text-brand-blue rounded-full px-2.5 py-1 text-xs font-semibold">
            Desktop
          </span>
        </div>

        {/* ── Name ── */}
        <h3 className="text-text-primary mb-2 text-lg font-bold">{name}</h3>

        {/* ── Description (flex-1 keeps visual block anchored) ── */}
        <p className="text-text-secondary mb-6 flex-1 text-sm">{subtitle}</p>

        {/* ── Visual block: same height on all cards ── */}
        <div className="mb-5 flex flex-col items-center gap-2">
          {/* QR image with bird logo centred on top, or plain bird logo */}
          <div className="relative flex h-37 w-37 items-center justify-center">
            <div className="border-border-default h-37 w-37 rounded-2xl border" />
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
        </div>

        {/* ── Download button (orange, full-width, pinned bottom) ── */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#FFC43A] to-[#F68E0B] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/40 active:scale-[0.98]"
        >
          <DownloadArrow />
          {ctaLabel}
        </button>
      </GlassCard>

      <MacOSDownloadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        locale={locale}
        translations={translations}
      />
    </>
  )
}
