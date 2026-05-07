'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MacOSDownloadDialogProps {
  isOpen: boolean
  onClose: () => void
  locale: string
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

export default function MacOSDownloadDialog({
  isOpen,
  onClose,
  locale,
  translations: t,
}: MacOSDownloadDialogProps) {
  const [selectedChip, setSelectedChip] = useState<'intel' | 'apple' | null>(null)

  if (!isOpen) return null

  // Map locale to image suffix
  const getLocaleSuffix = () => {
    switch (locale) {
      case 'zh':
        return 'cn'
      case 'zh-tw':
        return 'zh-tw'
      default:
        return 'en'
    }
  }

  const localeSuffix = getLocaleSuffix()

  const handleDownload = (chipType: 'intel' | 'apple') => {
    const url =
      chipType === 'intel'
        ? 'https://vv-web-assets-cdn.vv.com.sg/downloads/VV-AI-macOS-Intel.dmg'
        : 'https://vv-web-assets-cdn.vv.com.sg/downloads/VV-AI-macOS-Apple.dmg'
    window.location.href = url
    setTimeout(() => onClose(), 500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-bg-base relative w-full max-w-3xl rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary absolute right-4 top-4 rounded-lg p-2 transition-colors"
          aria-label="Close"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-text-primary mb-4 text-2xl font-bold">{t.title}</h2>
        <p className="text-text-secondary mb-6 text-sm leading-relaxed">{t.description}</p>

        {/* How to check your chip */}
        <div className="mb-8 rounded-xl bg-blue-500/5 p-6">
          <h3 className="text-text-primary mb-4 text-lg font-semibold">{t.howToCheck}</h3>
          
          {/* Text steps */}
          <div className="mb-6 space-y-2">
            <p className="text-text-secondary text-sm leading-relaxed">
              <span className="font-semibold">1.</span> {t.step1}
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              <span className="font-semibold">2.</span> {t.step2}
            </p>
          </div>

          {/* Visual guide images */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={`/images/vv/V V download/step_1_${localeSuffix}.png`}
                alt="Step 1"
                width={200}
                height={150}
                className="rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={`/images/vv/V V download/step_2_${localeSuffix}.png`}
                alt="Step 2"
                width={200}
                height={150}
                className="rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={`/images/vv/V V download/step_3_${localeSuffix}.png`}
                alt="Step 3"
                width={200}
                height={150}
                className="rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          <p className="text-text-secondary mt-4 text-xs italic">*{t.noteText}</p>
        </div>

        {/* Download buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => handleDownload('intel')}
            className="flex-1 rounded-xl bg-blue-500 px-6 py-3.5 text-center font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {t.downloadIntel}
          </button>

          <button
            onClick={() => handleDownload('apple')}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#FFC43A] to-[#F68E0B] px-6 py-3.5 text-center font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
          >
            {t.downloadApple}
          </button>
        </div>
      </div>
    </div>
  )
}
