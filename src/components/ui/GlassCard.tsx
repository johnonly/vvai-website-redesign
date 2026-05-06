import { cn } from '@/lib/utils'
import type { CSSProperties, ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  glow?: boolean
  hover?: boolean
}

export default function GlassCard({
  children,
  className,
  style,
  glow = false,
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card',
        glow && 'shadow-[0_0_30px_rgba(85,144,246,0.15)]',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(85,144,246,0.25)]',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
