'use client'

import { useState } from 'react'

interface MacOSDownloadDialogProps {
  isOpen: boolean
  onClose: () => void
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

export default function MacOSDownloadDialog({
  isOpen,
  onClose,
  translations: t,
}: MacOSDownloadDialogProps) {
  const [selectedChip, setSelectedChip] = useState<'intel' | 'apple' | null>(null)

  if (!isOpen) return null

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
          <ol className="text-text-secondary space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>{t.step1}</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>{t.step2}</span>
            </li>
          </ol>

          {/* Visual guide */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {/* Intel example */}
            <div className="relative flex-1 min-w-50">
              <div className="rounded-xl border border-gray-200 bg-gray-900 p-4 dark:border-gray-700">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">MacBook Pro</span>
                  <span className="rounded-md bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                    Intel
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-300">
                  <div>Processor: 2.3 GHz 8-Core Intel Core i9</div>
                  <div>Graphics: Radeon Pro 560X 4 GB</div>
                  <div>Memory: 16 GB 2400 MHz DDR4</div>
                </div>
              </div>
            </div>

            <span className="text-text-secondary text-sm font-medium">{t.orText}</span>

            {/* Apple Silicon example */}
            <div className="relative flex-1 min-w-50">
              <div className="rounded-xl border border-gray-200 bg-gray-900 p-4 dark:border-gray-700">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">MacBook Pro</span>
                  <span className="rounded-md bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                    Apple
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-300">
                  <div>Chip: Apple M2</div>
                  <div>Memory: 16 GB</div>
                  <div>Serial Number: Macintosh HD</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-text-secondary mt-4 text-xs italic">*{t.noteText}</p>
        </div>

        {/* Download buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => handleDownload('intel')}
            className="group flex-1 rounded-xl border-2 border-blue-500 bg-blue-500 px-6 py-4 text-center font-semibold text-white transition-all hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <div className="mb-2 text-lg">{t.downloadIntel}</div>
            <div className="text-xs opacity-90">{t.intelLabel}</div>
          </button>

          <button
            onClick={() => handleDownload('apple')}
            className="group flex-1 rounded-xl border-2 border-orange-500 bg-linear-to-r from-[#FFC43A] to-[#F68E0B] px-6 py-4 text-center font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
          >
            <div className="mb-2 text-lg">{t.downloadApple}</div>
            <div className="text-xs opacity-90">{t.appleLabel}</div>
          </button>
        </div>
      </div>
    </div>
  )
}
