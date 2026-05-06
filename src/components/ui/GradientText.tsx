import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  to?: string
  via?: string
}

export default function GradientText({
  children,
  className,
  from,
  to,
  via,
}: GradientTextProps) {
  const style =
    from || to
      ? {
          backgroundImage: `linear-gradient(135deg, ${from ?? '#5590F6'} 0%, ${via ? `${via} 50%, ` : ''}${to ?? '#8B5CF6'} 100%)`,
        }
      : undefined

  return (
    <span
      className={cn('gradient-text', className)}
      style={style}
    >
      {children}
    </span>
  )
}
