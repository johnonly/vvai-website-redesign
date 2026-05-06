import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
  color?: 'blue' | 'violet' | 'cyan' | 'green'
}

export default function SectionLabel({
  children,
  className,
  color = 'blue',
}: SectionLabelProps) {
  const colorMap = {
    blue: 'text-brand-blue border-brand-blue/30 bg-brand-blue/10',
    violet: 'text-brand-violet border-brand-violet/30 bg-brand-violet/10',
    cyan: 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10',
    green: 'text-brand-green border-brand-green/30 bg-brand-green/10',
  }

  return (
    <span
      className={cn(
        'section-label',
        colorMap[color],
        className,
      )}
    >
      {children}
    </span>
  )
}
