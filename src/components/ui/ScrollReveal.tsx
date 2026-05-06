'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  duration?: number
  once?: boolean
  amount?: number
}

// Hidden → visible variants per direction
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.65,
  once = true,
  amount = 0.1,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  // Respect user's OS-level "reduce motion" preference
  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      variants={VARIANTS[direction]}
      initial="hidden"
      whileInView="visible"
      // margin: trigger when element is just about to leave the bottom of the viewport.
      // '0px 0px -40px 0px' = shrink trigger zone 40px from bottom only.
      // Unlike the old '-80px 0px' (which shrank from BOTH top AND bottom),
      // this fires reliably on small mobile viewports during fast scrolling.
      viewport={{ once, amount, margin: '0px 0px -40px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.0, 1.0],
      }}
    >
      {children}
    </motion.div>
  )
}
