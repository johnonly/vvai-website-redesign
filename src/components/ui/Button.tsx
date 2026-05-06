import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'demo'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary:
        'bg-brand-blue text-white hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-brand-blue/25',
      secondary:
        'bg-surface text-text-primary border border-border-default hover:bg-surface-hover hover:border-brand-blue/30 backdrop-blur-sm',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-border-default',
      outline: 'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
      demo: 'bg-gradient-to-r from-[#FFC43A] to-[#F68E0B] text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:scale-[0.98]',
    }

    const sizes = {
      sm: 'h-9 rounded-lg px-4 text-sm',
      md: 'h-11 rounded-xl px-6 text-sm',
      lg: 'h-13 rounded-xl px-8 text-base',
    }

    const classes = cn(base, variants[variant], sizes[size], className)

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
