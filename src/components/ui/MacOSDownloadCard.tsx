'use client'

import { useState } from 'react'
import MacOSDownloadDialog from './MacOSDownloadDialog'

interface MacOSDownloadCardProps {
  onClick: () => void
}

interface MacOSDownloadWithDialogProps {
  children: (props: MacOSDownloadCardProps) => React.ReactNode
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

export default function MacOSDownloadWithDialog({ children, translations }: MacOSDownloadWithDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      {children({ onClick: () => setIsDialogOpen(true) })}
      <MacOSDownloadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        translations={translations}
      />
    </>
  )
}
