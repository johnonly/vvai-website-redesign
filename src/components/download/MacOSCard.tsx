'use client'

import { useState } from 'react'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import MacOSDownloadDialog from '@/components/ui/MacOSDownloadDialog'

interface MacOSCardProps {
  locale: string
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
    noteText: string
    downloadIntel: string
    downloadApple: string
  }
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
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
            <AppleIcon className="h-7 w-7" />
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
