'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import type { ReactNode } from 'react'

export default function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase)
    CustomEase.create('vv-ease', '0.25, 0.1, 0.0, 1.0')

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return <>{children}</>
}
