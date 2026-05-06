# V V AI — Animation Reference

> Complete implementation guide for all motion effects in the redesign.
> Libraries: GSAP 3 · Framer Motion · Three.js · Lenis · tsParticles

---

## 0. Mobile Animation Guidelines

### Why Mobile Needs Special Attention

Mobile viewports (iPhone 14: 390×844px logical, Galaxy S20: 360×800px) have:

- Less vertical space (after browser chrome: ~650–750px effective)
- Native touch scroll inertia — elements can fly through the viewport quickly
- No mouse events — hover-triggered animations must have touch fallbacks

### Critical Rules for Scroll-Triggered Animations

1. **Never use a negative `rootMargin` from BOTH top AND bottom** — e.g. `'-80px 0px'` contracts the trigger zone from top+bottom and silently drops fast-scrolled elements. Use `'0px 0px -40px 0px'` (bottom buffer only) or `'0px'`.
2. **Use `whileInView` + `viewport` instead of `useInView` + `useAnimation` + `useEffect`** — the direct API is more reliable during fast touch scroll because it registers/deregisters the IntersectionObserver synchronously per element.
3. **Use `amount: 0.1`** — trigger when only 10% of the element is visible so animations fire early enough on small screens.
4. **Respect `prefers-reduced-motion`** — use `useReducedMotion()` from Framer Motion and bypass animation variants when true.
5. **Keep initial offsets small** — `y: 28` instead of `y: 60` feels natural on mobile; large offsets can cause layout jitter.

### ScrollReveal Component (canonical implementation)

```tsx
// src/components/ui/ScrollReveal.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
}) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return <div className={cn(className)}>{children}</div>

  return (
    <motion.div
      className={cn(className)}
      variants={VARIANTS[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '0px 0px -40px 0px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.0, 1.0] }}
    >
      {children}
    </motion.div>
  )
}
```

### Stagger Pattern (cards / lists)

Always wrap each item individually with a staggered `delay`, never a single wrapper:

```tsx
// ✅ Correct — each card has its own IntersectionObserver
{
  items.map((item, i) => (
    <ScrollReveal key={item.id} delay={i * 0.08} direction="up">
      <Card {...item} />
    </ScrollReveal>
  ))
}

// ❌ Wrong — one observer for the whole group; all items animated as one block
;<ScrollReveal>
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</ScrollReveal>
```

---

## 1. Setup & Providers

### Package Installation

```bash
npm install gsap @gsap/react framer-motion three @react-three/fiber @react-three/drei
npm install lenis @studio-freight/react-lenis
npm install tsparticles @tsparticles/react @tsparticles/slim
npm install lottie-web @lottiefiles/react-lottie-player
npm install vanilla-tilt
# Optional:
npm install typed.js
npm install react-countup
```

### Lenis Smooth Scroll Provider

```tsx
// src/components/providers/LenisProvider.tsx
'use client'
import { ReactLenis } from '@studio-freight/react-lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false, // disable on mobile — use native touch scroll
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

### GSAP Registration (Client Component)

```tsx
// src/components/providers/GSAPProvider.tsx
'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText' // GSAP Club (paid) — or use split-type (free)
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

// Custom eases
CustomEase.create('vv-out', '0.16, 1, 0.3, 1') // fast out — matches CSS var(--ease-out)
CustomEase.create('vv-spring', '0.34, 1.56, 0.64, 1') // springy — bouncy entrance
CustomEase.create('vv-smooth', '0.25, 0.46, 0.45, 0.94')

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Integrate GSAP ScrollTrigger with Lenis
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return <>{children}</>
}
```

---

## 2. Hero Section Animations

### 2.1 Particle Field / Neural Mesh (Three.js)

```tsx
// src/components/hero/ParticleField.tsx
'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current!
    const W = mount.clientWidth,
      H = mount.clientHeight

    // Scene setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.z = 5

    // Particles
    const COUNT = 1200
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0x5590f6,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Connection lines between nearby particles
    // (use a LineSegments geometry updated each frame for close pairs — limit to 200 pairs for perf)

    // Mouse tracking parallax
    let mouseX = 0,
      mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Animation loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      particles.rotation.y += 0.0003
      particles.rotation.x += 0.0001
      // Smooth mouse parallax
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.03
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.03
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const onResize = () => {
      const W = mount.clientWidth,
        H = mount.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="pointer-events-none absolute inset-0" aria-hidden />
}
```

### 2.2 Animated Globe (Three.js)

```tsx
// src/components/hero/GlobeScene.tsx — uses @react-three/fiber + drei
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      // Subtle breathing scale
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.015
      meshRef.current.scale.setScalar(s)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#1A3A6E"
          attach="material"
          distort={0.08}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>
      {/* Glowing atmosphere ring */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial color="#5590F6" transparent opacity={0.06} side={THREE.BackSide} />
      </Sphere>
    </Float>
  )
}

export function GlobeScene() {
  return (
    <Canvas
      className="pointer-events-none absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#5590F6" />
      <pointLight position={[-5, -5, -3]} intensity={0.5} color="#8B5CF6" />
      <Globe />
    </Canvas>
  )
}
```

### 2.3 Bird Logo Particle Assembly (GSAP)

```ts
// On page load: bird logo fades + scales in from particles converging
// Use GSAP timeline + stagger

// Simplified implementation (no particle morphing — use CSS instead):
const birdEntrance = gsap.timeline({ delay: 0.3 })
birdEntrance
  .fromTo(
    '.hero-bird-logo',
    { opacity: 0, scale: 0.5, filter: 'blur(20px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'vv-out' },
  )
  .fromTo(
    '.hero-bird-glow',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
    '-=0.8',
  )

// Breathing animation (continuous):
gsap.to('.hero-bird-logo', {
  scale: 1.04,
  duration: 3,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
})
```

### 2.4 Typewriter / Text Reveal (GSAP SplitText)

```ts
// Hero H1 reveal — words appear left to right
const heroText = document.querySelector('.hero-headline')
const split = new SplitText(heroText, { type: 'words,chars' })

const tl = gsap.timeline({ delay: 0.8 })
tl.fromTo(
  split.words,
  { opacity: 0, y: 32, filter: 'blur(8px)' },
  {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.7,
    ease: 'vv-out',
    stagger: 0.05,
  },
)

// Alternative: typed.js for typewriter effect
// import Typed from 'typed.js'
// new Typed('#typed-element', {
//   strings: ['Acting on Your Words.', 'Redefining Connections.'],
//   typeSpeed: 40,
//   backSpeed: 20,
//   loop: true,
//   cursorChar: '|',
// })
```

---

## 3. Scroll-Triggered Reveals (GSAP ScrollTrigger)

### 3.1 Standard Section Fade-Up (reusable utility)

```ts
// src/lib/animations/scrollReveal.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initScrollReveal(selector: string, options?: gsap.TweenVars) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'vv-out',
        delay: ((options?.stagger as number) ?? 0.1) * (i % 4),
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          ...options?.scrollTrigger,
        },
        ...options,
      },
    )
  })
}

// Usage in component:
// useEffect(() => { initScrollReveal('.tech-card', { stagger: 0.12 }) }, [])
```

### 3.2 Card Stagger Grid

```ts
// For TechPillarsSection / FeatureGrid
gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 60, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'vv-out',
      delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    },
  )
})
```

### 3.3 Security Checklist — Sequential Tick-In

```ts
// Each security item draws in with checkmark SVG then text fades up
const items = document.querySelectorAll('.security-item')
items.forEach((item, i) => {
  const check = item.querySelector('.check-icon')
  const text = item.querySelector('.item-text')

  gsap
    .timeline({
      scrollTrigger: { trigger: item, start: 'top 88%', once: true },
    })
    .fromTo(
      check,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: 'vv-spring', delay: i * 0.12 },
    )
    .fromTo(
      text,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'vv-out' },
      '-=0.15',
    )
})
```

### 3.4 Section Heading Split-Text Reveal

```ts
// Used on every major section heading
export function animateSectionHeading(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return
  const split = new SplitText(el, { type: 'lines' })
  gsap.fromTo(
    split.lines,
    { opacity: 0, y: 48, clipPath: 'inset(100% 0% 0% 0%)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.9,
      ease: 'vv-out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    },
  )
}
```

---

## 4. Framer Motion — Component-Level Animations

### 4.1 Page Transition

```tsx
// src/components/providers/PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} {...variants}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 4.2 Pillar Tab Content Transition (liquid morph feel)

```tsx
// Inside PillarsSection.tsx
import { motion, AnimatePresence } from 'framer-motion'

const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 64 : -64,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
}

// In JSX:
<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={activePillar}
    custom={direction}
    variants={contentVariants}
    initial="enter"
    animate="center"
    exit="exit"
  >
    {/* Pillar content */}
  </motion.div>
</AnimatePresence>
```

### 4.3 Testimonial Carousel — 3D Card Arc

```tsx
// Each card uses Framer Motion with perspective transform
const cardVariants = (offset: number) => ({
  animate: {
    x: offset * 260,
    scale: 1 - Math.abs(offset) * 0.12,
    rotateY: offset * -12,
    z: -Math.abs(offset) * 100,
    opacity: Math.abs(offset) > 1 ? 0.4 : Math.abs(offset) > 0 ? 0.75 : 1,
    zIndex: 3 - Math.abs(offset),
    transition: { type: 'spring', stiffness: 260, damping: 28 },
  },
})

// Container needs: style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}
```

### 4.4 Navbar Mega Menu

```tsx
const menuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } },
}

// Stagger children:
const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.03, duration: 0.2 } }),
}
```

---

## 5. tsParticles (Alternative to Three.js for simpler builds)

```tsx
// src/components/hero/ParticlesBackground.tsx
'use client'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

const OPTIONS: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: false },
    },
    modes: {
      grab: { distance: 160, links: { opacity: 0.3 } },
    },
  },
  particles: {
    color: { value: ['#5590F6', '#8B5CF6', '#22D3EE'] },
    links: {
      color: '#5590F6',
      distance: 140,
      enable: true,
      opacity: 0.18,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: false,
      speed: 0.6,
      straight: false,
    },
    number: { density: { enable: true }, value: 80 },
    opacity: { value: { min: 0.3, max: 0.7 } },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
}

export function ParticlesBackground() {
  return (
    <Particles
      id="hero-particles"
      className="pointer-events-none absolute inset-0"
      init={loadSlim}
      options={OPTIONS}
    />
  )
}
```

---

## 6. 3D Card Tilt (vanilla-tilt)

```tsx
// src/components/ui/TiltCard.tsx
'use client'
import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  max?: number // max tilt angle — default 8
  glare?: boolean // spotlight glare effect — default true
  perspective?: number // CSS perspective — default 1200
}

export function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
  perspective = 1200,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    VanillaTilt.init(el, {
      max,
      scale: 1.02,
      speed: 400,
      glare,
      'max-glare': 0.15,
      perspective,
      gyroscope: false, // disable on mobile for perf
    })
    return () => {
      ;(el as any).vanillaTilt?.destroy()
    }
  }, [max, glare, perspective])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
```

---

## 7. Lottie Icon Animations

```tsx
// src/components/ui/LottieIcon.tsx
'use client'
import { Player } from '@lottiefiles/react-lottie-player'
import { useRef } from 'react'

interface LottieIconProps {
  src: string // path to .json file or URL
  size?: number
  autoplay?: boolean
  loop?: boolean
  playOnHover?: boolean
}

export function LottieIcon({
  src,
  size = 48,
  autoplay = false,
  loop = false,
  playOnHover = true,
}: LottieIconProps) {
  const playerRef = useRef<any>(null)

  return (
    <div
      style={{ width: size, height: size }}
      onMouseEnter={() => playOnHover && playerRef.current?.play()}
      onMouseLeave={() => playOnHover && playerRef.current?.stop()}
    >
      <Player
        ref={playerRef}
        src={src}
        autoplay={autoplay}
        loop={loop}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
```

---

## 8. Infinite Partner Logo Marquee

```css
/* CSS — no JS needed */
@keyframes marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

.marquee-wrapper {
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 1) 8%,
    rgba(0, 0, 0, 1) 92%,
    transparent 100%
  );
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-left var(--marquee-duration, 40s) linear infinite;
  gap: 48px;
}

.marquee-track--reverse {
  animation-name: marquee-right;
}

.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

/* Partner logo items */
.partner-logo {
  flex-shrink: 0;
  height: 40px;
  filter: grayscale(1) brightness(0.6);
  transition: filter 300ms ease;
}
.partner-logo:hover {
  filter: grayscale(0) brightness(1);
}
```

```tsx
// Duplicate logos array to create seamless loop:
// items = [...partners, ...partners]  → only first half is "real"
// translateX(-50%) brings it back to start seamlessly
function Marquee({ partners, direction = 'left', duration = 40 }: MarqueeProps) {
  const doubled = [...partners, ...partners]
  return (
    <div className="marquee-wrapper">
      <div
        className={`marquee-track ${direction === 'right' ? 'marquee-track--reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((p, i) => (
          <img key={i} src={p.logo} alt={p.name} className="partner-logo" />
        ))}
      </div>
    </div>
  )
}
```

---

## 9. Animated CTA Background

```css
/* Animated gradient wave — CTA section */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.cta-bg {
  position: relative;
  background: linear-gradient(
    270deg,
    #0a0e1a 0%,
    #0d1535 20%,
    #1a1040 40%,
    #0d1535 60%,
    #1a1f3c 80%,
    #0a0e1a 100%
  );
  background-size: 400% 400%;
  animation: gradient-shift 14s ease infinite;
}

/* CTA button halo pulse */
@keyframes halo-pulse {
  0%,
  100% {
    box-shadow: 0 0 24px rgba(85, 144, 246, 0.45);
  }
  50% {
    box-shadow:
      0 0 56px rgba(85, 144, 246, 0.75),
      0 0 96px rgba(139, 92, 246, 0.3);
  }
}

.btn-cta-primary {
  animation: halo-pulse 3s ease-in-out infinite;
}
```

---

## 10. Enterprise vs Individual Split — Connection Lines

```tsx
// Animated SVG lines connecting enterprise features to personal features
// Drawn with GSAP drawSVG or CSS stroke-dashoffset animation

// CSS approach:
// .connection-line {
//   stroke-dasharray: 1000;
//   stroke-dashoffset: 1000;
//   animation: draw-line 1.5s ease forwards;
// }
// @keyframes draw-line { to { stroke-dashoffset: 0; } }
// Trigger via IntersectionObserver or GSAP ScrollTrigger

// SVG element (positioned in middle of split section):
// <svg class="split-lines" ...>
//   <path d="M 50,100 Q 50,200 50,300" class="connection-line" stroke="#5590F6" stroke-width="1" fill="none" />
// </svg>
```

---

## 11. Performance & Reduced Motion

```ts
// src/lib/animations/utils.ts

// Check reduced motion preference
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Check battery level (experimental — skip heavy animations on low battery)
export async function shouldReduceAnimation(): Promise<boolean> {
  if (prefersReducedMotion()) return true
  try {
    const battery = await (navigator as any).getBattery?.()
    if (battery && battery.level < 0.2 && !battery.charging) return true
  } catch {}
  return false
}

// Use in components:
// const [reduce, setReduce] = useState(false)
// useEffect(() => { shouldReduceAnimation().then(setReduce) }, [])
// if (reduce) return <StaticFallback />
```

```css
/* CSS fallback for prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
  .cta-bg {
    animation: none;
  }
  .hero-bird-logo {
    animation: none;
  }
  .btn-cta-primary {
    animation: none;
  }
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 12. Animation Timeline Summary

| Section                 | Animation                                       | Library                  | Trigger                |
| ----------------------- | ----------------------------------------------- | ------------------------ | ---------------------- |
| Hero — background       | Particle neural mesh                            | Three.js / tsParticles   | Page load              |
| Hero — globe            | Rotating 3D globe with breathing                | Three.js / R3F           | Page load              |
| Hero — bird logo        | Particle assembly + breath                      | GSAP                     | Page load (0.3s delay) |
| Hero — headline         | Word-by-word reveal                             | GSAP SplitText           | Page load (0.8s delay) |
| Hero — CTAs             | Fade-up stagger                                 | Framer Motion            | Page load (1.2s delay) |
| Hero — cursor           | Mouse tracking parallax                         | Vanilla JS + CSS         | mousemove              |
| Pillars — tab switch    | Slide + fade transition                         | Framer AnimatePresence   | Click                  |
| Pillars — keywords      | Stagger fade-up                                 | Framer Motion            | Tab activation         |
| Audience Split — lines  | SVG path draw                                   | GSAP drawSVG / CSS       | ScrollTrigger          |
| Tech Cards — entrance   | Stagger scale-up                                | GSAP ScrollTrigger       | Scroll enter           |
| Tech Cards — hover      | 3D tilt + glare                                 | vanilla-tilt             | hover                  |
| Platform — bg image     | Parallax depth (`yPercent -6→+6`, `scrub:true`) | GSAP ScrollTrigger       | Scroll                 |
| Platform — devices      | Parallax depth                                  | GSAP ScrollTrigger scrub | Scroll                 |
| Security — checklist    | Sequential tick-in                              | GSAP ScrollTrigger       | Scroll enter           |
| Partners — marquee      | Infinite scroll                                 | CSS @keyframes           | Auto (pauses on hover) |
| Testimonials — carousel | 3D arc rotation                                 | Framer Motion            | Auto + swipe           |
| All sections — headings | Line-by-line clip reveal                        | GSAP SplitText           | ScrollTrigger          |
| All sections — cards    | Stagger fade-up                                 | GSAP / Framer Motion     | ScrollTrigger          |
| CTA — background        | Gradient wave                                   | CSS @keyframes           | Auto                   |
| CTA — button            | Halo pulse                                      | CSS @keyframes           | Auto                   |
| Page transition         | Fade + slide                                    | Framer AnimatePresence   | Route change           |
| Navbar                  | Glass transition on scroll                      | CSS + JS classList       | scroll event           |
