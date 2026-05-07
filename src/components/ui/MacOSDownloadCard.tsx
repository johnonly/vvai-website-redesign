'use client'

import { useState } from 'react'
import MacOSDownloadDialog from './MacOSDownloadDialog'

interface MacOSDownloadCardProps {
  onClick: () => void
}

interface MacOSDownloadWithDialogProps {
  children: (props: MacOSDownloadCardProps) => React.ReactNode
  locale: string
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

export default function MacOSDownloadWithDialog({ children, locale, translations }: MacOSDownloadWithDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      {children({ onClick: () => setIsDialogOpen(true) })}
      <MacOSDownloadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        locale={locale}
        translations={translations}
      />
    </>
  )
}
