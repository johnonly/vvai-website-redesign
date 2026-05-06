'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-0"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: false },
            resize: { enable: true },
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
        particles: {
          color: { value: ['#5590F6', '#8B5CF6', '#22D3EE'] },
          links: {
            color: '#5590F6',
            distance: 120,
            enable: true,
            opacity: 0.15,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: { default: 'bounce' },
            random: true,
            speed: 0.6,
            straight: false,
          },
          number: {
            density: { enable: true },
            value: 80,
          },
          opacity: { value: { min: 0.2, max: 0.6 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 2.5 } },
        },
        detectRetina: true,
      }}
    />
  )
}

