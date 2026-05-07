'use client'

import { useState } from 'react'
import MacOSDownloadDialog from './MacOSDownloadDialog'

interface MacOSDownloadCardProps {
  children: React.ReactNode
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

export default function MacOSDownloadCard({ children, translations }: MacOSDownloadCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <MacOSDownloadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        translations={translations}
      />
    </>
  )
}
