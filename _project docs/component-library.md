# V V AI — Component Library Reference

> Reusable UI components for the redesign. Each entry covers: props, anatomy, usage, and CSS notes.
> Tech: React (Next.js 16) · TypeScript · Tailwind CSS v4 · Framer Motion / GSAP

---

## 0. ThemeToggle

A sun/moon icon button that toggles between dark and light mode. Sits in the Navbar beside the CTA buttons.

**File:** `src/components/ui/ThemeToggle.tsx`
**Provider required:** `ThemeProvider` must wrap the tree (done in `[locale]/layout.tsx`).

```tsx
// Usage — already wired into Navbar
import ThemeToggle from '@/components/ui/ThemeToggle'
;<ThemeToggle className="optional-extra-class" />
```

| Prop        | Type     | Default | Description                                        |
| ----------- | -------- | ------- | -------------------------------------------------- |
| `className` | `string` | —       | Extra Tailwind classes added to the button wrapper |

**Behaviour**

- Renders `null` (opacity-0 placeholder) on first render to prevent hydration mismatch.
- Clicking switches `next-themes` theme between `"dark"` and `"light"`.
- The sun icon is visible in dark mode; the moon icon is visible in light mode. Both animate with scale + rotate.
- Default theme is `"dark"`; user preference is persisted in `localStorage`.

**Provider** (`src/components/providers/ThemeProvider.tsx`)

```tsx
// Wraps the entire app in [locale]/layout.tsx
<ThemeProvider>
  {' '}
  // attribute="class" defaultTheme="dark" enableSystem={false}
  {children}
</ThemeProvider>
```

---

## 1. Button

```tsx
// src/components/ui/Button.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode // Leading icon
  iconRight?: React.ReactNode // Trailing icon/arrow
  loading?: boolean
  asChild?: boolean // Render as <a> or other element
}

const sizeMap = {
  sm: 'px-4 py-2.5 text-sm rounded-lg',
  md: 'px-7 py-3.5 text-base rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

const variantMap = {
  primary: `
    bg-gradient-to-br from-[#5590F6] to-[#8B5CF6]
    text-white font-semibold tracking-wide
    shadow-[0_0_24px_rgba(85,144,246,0.45)]
    hover:shadow-[0_0_40px_rgba(85,144,246,0.70),0_0_80px_rgba(139,92,246,0.30)]
    hover:-translate-y-0.5 active:translate-y-0
    transition-all duration-200
  `,
  ghost: `
    bg-transparent text-white font-semibold
    border border-white/20
    hover:bg-white/7 hover:border-[#5590F6]/50 hover:-translate-y-0.5
    transition-all duration-200
  `,
  outline: `
    bg-transparent text-[#5590F6] font-semibold
    border border-[#5590F6]/50
    hover:bg-[#5590F6]/10 hover:border-[#5590F6]
    transition-all duration-200
  `,
  text: `
    bg-transparent text-[#5590F6] font-semibold
    hover:text-white underline-offset-4 hover:underline
    transition-all duration-200
  `,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', icon, iconRight, loading, children, className, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 select-none focus-visible:ring-2 focus-visible:ring-[#5590F6]/70 focus-visible:outline-none',
        sizeMap[size],
        variantMap[variant],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  ),
)
Button.displayName = 'Button'
```

**Usage:**

```tsx
<Button variant="primary" size="lg">Book a Demo</Button>
<Button variant="ghost">Try for Free</Button>
<Button variant="primary" iconRight={<ArrowRight size={16} />}>Get Started</Button>
```

---

## 2. GlassCard

```tsx
// src/components/ui/GlassCard.tsx
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: 'blue' | 'violet' | 'cyan' | 'none'
  hover?: boolean // enable hover lift + border glow
  tilt?: boolean // enable 3D tilt via vanilla-tilt
}

// CSS:
// background: rgba(255,255,255,0.04)
// border: 1px solid rgba(255,255,255,0.08)
// backdrop-filter: blur(20px)
// border-radius: 20px
// Hover: border-color rgba(85,144,246,0.25), translateY(-4px)

export function GlassCard({
  children,
  className,
  glow = 'none',
  hover = true,
  tilt = false,
}: GlassCardProps) {
  const glowMap = {
    none: '',
    blue: 'hover:shadow-[0_0_32px_rgba(85,144,246,0.20)]',
    violet: 'hover:shadow-[0_0_32px_rgba(139,92,246,0.20)]',
    cyan: 'hover:shadow-[0_0_32px_rgba(34,211,238,0.20)]',
  }
  return (
    <div
      className={cn(
        'rounded-[20px] border border-white/8 bg-white/[0.04] p-6 backdrop-blur-xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:border-[#5590F6]/25',
        glowMap[glow],
        className,
      )}
    >
      {children}
    </div>
  )
}
```

---

## 3. SectionLabel (Eyebrow)

```tsx
// src/components/ui/SectionLabel.tsx
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'mb-6 inline-flex items-center gap-2 px-4 py-1.5',
        'rounded-full border border-[#5590F6]/25 bg-[#5590F6]/10',
        'text-xs font-semibold tracking-[0.08em] text-[#5590F6] uppercase',
        className,
      )}
    >
      {children}
    </span>
  )
}
```

---

## 4. GradientText

```tsx
// src/components/ui/GradientText.tsx
type GradientVariant = 'blue-violet' | 'blue-cyan' | 'violet-cyan' | 'full'

export function GradientText({
  children,
  variant = 'blue-violet',
  as: Tag = 'span',
  className,
}: {
  children: React.ReactNode
  variant?: GradientVariant
  as?: React.ElementType
  className?: string
}) {
  const gradients = {
    'blue-violet': 'from-[#5590F6] to-[#8B5CF6]',
    'blue-cyan': 'from-[#5590F6] to-[#22D3EE]',
    'violet-cyan': 'from-[#8B5CF6] to-[#22D3EE]',
    full: 'from-[#5590F6] via-[#8B5CF6] to-[#22D3EE]',
  }
  return (
    <Tag
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[variant],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
```

---

## 5. Navbar

```tsx
// src/components/layout/Navbar.tsx
// - Transparent on hero, transitions to glass on scroll (Y > 60px)
// - Sticky top-0 z-[200]
// - Desktop: logo | nav items | language picker | CTA button
// - Mobile: logo | hamburger — slides in MobileMenu drawer

interface NavbarProps {
  locale: string
}

// Scroll behaviour:
// useEffect → window.addEventListener('scroll', () => {
//   setScrolled(window.scrollY > 60)
// })

// Glass state CSS:
// background: rgba(10, 14, 26, 0.75)
// backdrop-filter: blur(20px)
// border-bottom: 1px solid rgba(255,255,255,0.06)
// transition: all 300ms ease

// Mega menu (Products):
// Opens on hover (desktop) or click (keyboard)
// Positioned absolute below navbar
// Glass card panel: 3-col grid of product groups
// Each group: group label (muted) + feature list items

// Language picker:
// Dropdown: English | 中文 | 繁體中文
// Updates [locale] route segment

// Height: 72px desktop, 64px mobile
// Logo: BirdLogo@2x.png + "V V AI" wordmark
```

**Navbar DOM Structure:**

```html
<header class="navbar [navbar--scrolled]">
  <nav class="content-container flex items-center justify-between">
    <a href="/" class="navbar__logo">
      <img src="/assets/logo/BirdLogo@2x.png" alt="V V AI" height="36" />
    </a>

    <!-- Desktop nav -->
    <ul class="navbar__links">
      <li class="navbar__item navbar__item--has-menu">
        <button>Products <ChevronDown /></button>
        <div class="navbar__mega-menu glass-card">
          <!-- product groups grid -->
        </div>
      </li>
      <!-- other items -->
    </ul>

    <div class="navbar__actions">
      <LanguagePicker />
      <button variant="ghost" size="sm">Log In</button>
      <button variant="primary" size="sm">Book a Demo</button>
    </div>

    <!-- Mobile only -->
    <button class="navbar__hamburger md:hidden">
      <HamburgerIcon />
    </button>
  </nav>
</header>
```

---

## 6. Footer

```tsx
// src/components/layout/Footer.tsx
// 4-col grid: Logo+tagline | Products | Company | Contact+Social
// Bottom bar: copyright | legal links | language

// Structure:
// <footer class="section-bg-base border-t border-white/6">
//   <div class="content-container">
//     <div class="grid-4col pb-12 pt-16">
//       <!-- Col 1: Logo, tagline, app store badges -->
//       <!-- Col 2: Products links (Work/Enterprise/Education/Life/Health) -->
//       <!-- Col 3: Company (About/News/Security/Pricing) -->
//       <!-- Col 4: Contact + social icons (LinkedIn, Twitter/X, WeChat, YouTube) -->
//     </div>
//     <div class="divider-glow mb-6" />
//     <div class="flex justify-between text-caption text-secondary pb-8">
//       <span>©2026 V V TECHNOLOGY PTE. LTD., All rights reserved.</span>
//       <div class="flex gap-6">
//         <a href="/terms">Terms</a>
//         <a href="/privacy">Privacy</a>
//       </div>
//       <LanguagePicker />
//     </div>
//   </div>
// </footer>
```

---

## 7. PillarTabs (Four Pillars Tabbed Section)

```tsx
// src/components/sections/PillarsSection.tsx
// Tabs: Work | Education | Life | Health
// Each tab: animated card with device mockup + feature list

const PILLARS = [
  {
    id: 'work',
    icon: '🏢',
    label: 'Work',
    headline: 'One-Stop Smart Collaboration Platform',
    subline: 'Connecting You to the "V" World of Intelligence',
    keywords: ['Smart', 'Convenient', 'Personalized', 'Collaborative'],
    color: '#5590F6',
    images: {
      primary:
        'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/index_page2_img1.d17f0bfc.png',
      // See image-assets.md for full list
    },
  },
  {
    id: 'education',
    icon: '🎓',
    label: 'Education',
    headline: 'One-Stop AI-Powered Education Collaboration Platform for All Scenarios',
    subline: 'Connecting You to the "V" World of Wisdom',
    keywords: ['Collaborative', 'Private', 'Efficient', 'Targeted'],
    color: '#22D3EE',
    images: {
      primary:
        'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/index_page4_img1.eb1ade7f.png',
    },
  },
  {
    id: 'life',
    icon: '🌆',
    label: 'Life',
    headline: 'Your Personal and Reliable Smart Lifestyle Planner',
    subline: 'Connecting You to the "V" World of Convenience',
    keywords: ['Digital', 'Convenient', 'Comprehensive', 'Connected'],
    color: '#8B5CF6',
    images: {
      primary:
        'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/index_page3_img1.39a88fc8.png',
    },
  },
  {
    id: 'health',
    icon: '🏥',
    label: 'Health',
    headline: 'Your Reliable, Quick-Response Health Manager',
    subline: 'Connecting You to the "V" World of Health',
    keywords: ['Smart', 'Reliable', 'Caring', 'Collaborative'],
    color: '#10B981',
    images: {
      primary:
        'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/index_page5_img6-1.48b9652f.png',
    },
  },
]

// Animation: tab switch triggers Framer Motion layoutId animation
// Active tab: glowing ring border + icon scale-up
// Content panel: AnimatePresence with slide + fade transition (x: 40→0, opacity: 0→1)
// Keywords: framer staggered children (delay: index * 0.05s)
```

---

## 8. AudienceSplit (Enterprise vs Individual)

```tsx
// src/components/sections/AudienceSplitSection.tsx
// Split-screen layout: left = Enterprise (deep blue), right = Personal (violet)
// Central V V logo pulses with group-breath animation
// Feature items animate in on scroll with stagger

const ENTERPRISE_FEATURES = [
  { icon: 'grid', label: 'Work Management', sub: 'Innovative Thinking' },
  { icon: 'school', label: 'Home-School Collaboration', sub: 'Smart Education' },
  { icon: 'home', label: 'Life Services', sub: 'One-Click Access' },
  { icon: 'heart', label: 'Health Management', sub: 'Resource Sharing' },
]

const PERSONAL_FEATURES = [
  { icon: 'cpu', label: 'Intelligent Assistance', sub: 'Efficient and Effortless' },
  { icon: 'book', label: 'Personalized Learning', sub: 'Learning at My Fingertips' },
  { icon: 'zap', label: 'Proactive Service', sub: 'Invisible Companion' },
  { icon: 'shield', label: 'Risk Detection', sub: 'Prevention is Key' },
]

// DOM:
// <section class="relative overflow-hidden bg-bg-base">
//   <div class="grid grid-cols-2 min-h-[600px]">
//     <!-- LEFT panel: Enterprise — gradient bg ending at center -->
//     <!-- CENTER: absolute logo + divider line -->
//     <!-- RIGHT panel: Individual — gradient bg starting at center -->
//   </div>
// </section>

// CSS split gradients:
// Left:  background: linear-gradient(to right, #0A0E1A, #0D1535)
// Right: background: linear-gradient(to left, #0A0E1A, #16103A)
// Animated connection lines between panels via canvas/SVG
```

---

## 9. TechPillarCards (Innovation Section)

```tsx
// src/components/sections/TechPillarsSection.tsx
// 4 glassmorphism cards with 3D tilt on hover
// Scroll-triggered sequential entrance (stagger 100ms)

const TECH_PILLARS = [
  {
    number: '01',
    title: 'Next-Generation AI Capabilities',
    body: 'A next-generation AI intelligence foundation, equipped with globally innovative multi-modal conversational interaction technologies...',
    icon: 'brain-circuit', // Lucide or custom SVG
    gradient: 'from-[#5590F6] to-[#8B5CF6]',
  },
  {
    number: '02',
    title: 'Industry-Leading Internal-External Collaboration',
    body: 'A powerful platform architecture that seamlessly connects internal work collaboration with external business collaboration...',
    icon: 'network',
    gradient: 'from-[#8B5CF6] to-[#22D3EE]',
  },
  {
    number: '03',
    title: 'Intelligent IM Communication Capabilities',
    body: 'End-to-end encrypted ensures privacy and data security. Covers core business communication scenarios...',
    icon: 'message-square-lock',
    gradient: 'from-[#22D3EE] to-[#5590F6]',
  },
  {
    number: '04',
    title: 'Global Data Security & Compliance',
    body: 'A globally compliant data platform aligned with international standards, including GDPR. Certified under ISO 27001...',
    icon: 'shield-check',
    gradient: 'from-[#10B981] to-[#5590F6]',
  },
]

// Card anatomy:
// - Large background number (01–04) — muted, decorative
// - Icon badge (top-left)
// - Title (H3)
// - Body text
// - Arrow link → product page
// - Hover: 3D tilt (vanilla-tilt anglMax: 8, perspective: 1200)
//         particle burst on enter
//         gradient border highlight sweeps across
```

---

## 10. PartnerMarquee

```tsx
// src/components/sections/PartnerSection.tsx
// Infinite horizontal marquee — two rows, alternating directions
// Pause on hover, fade mask on edges

interface PartnerMarqueeProps {
  speed?: number // pixels per second — default 40
  direction?: 'left' | 'right'
  partners: Partner[]
}

// CSS keyframes:
// @keyframes marquee-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
// @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) }    }

// .marquee-track {
//   display: flex;
//   width: max-content;
//   animation: marquee-left var(--marquee-dur) linear infinite;
// }
// .marquee-track:hover { animation-play-state: paused; }

// Edge fade mask:
// .marquee-wrapper {
//   mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
// }

// Partner logos: grayscale filter, hover restores colour
// img { filter: grayscale(1) opacity(0.55); transition: filter 300ms; }
// img:hover { filter: grayscale(0) opacity(1); }
```

---

## 11. TestimonialCarousel

```tsx
// src/components/sections/TestimonialsSection.tsx
// 3D card carousel with curved arc depth
// Auto-plays every 4s, pauses on hover, swipeable on mobile

interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string // CDN image URL — see image-assets.md
  quote: string
  audience: 'enterprise' | 'education' | 'life' | 'personal' // for bg accent colour
}

// CUSTOMERS from existing CDN:
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Jacky C.',
    role: 'Operations Director',
    avatar:
      'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/customer-1.9abed173.png',
    quote:
      'V V AI integrates over 30 core enterprise management functions into a single platform...',
    audience: 'enterprise',
  },
  {
    id: 2,
    name: 'Michelle L.',
    role: 'Education Center Founder',
    avatar:
      'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/customer-2.b746ddaa.png',
    quote: "V V AI's educational space...not only helped me increase course sales...",
    audience: 'education',
  },
  {
    id: 3,
    name: 'Bonny H.',
    role: 'Corporate Employee',
    avatar:
      'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/customer-3.9335c9bb.png',
    quote:
      "V V AI's office assistant is incredibly useful. It helps me organize daily to-do lists...",
    audience: 'enterprise',
  },
  {
    id: 4,
    name: 'Winnie W.',
    role: 'Marketing & Sales Representative',
    avatar:
      'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/customer-4.9618f882.png',
    quote: "Through V V AI's life assistant, I can get creative ideas for hosting clients...",
    audience: 'life',
  },
  {
    id: 5,
    name: 'Kevin S.',
    role: 'Parent',
    avatar:
      'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/customer-5.e95ceacf.png',
    quote: 'I found it can centrally manage the learning plans, bills, notifications...',
    audience: 'education',
  },
]

// Active card: center, scale(1), z-index 3
// Adjacent cards: scale(0.88), rotateY(±12deg), translateX(±240px), z-index 2
// Outermost: scale(0.76), rotateY(±24deg), translateX(±400px), z-index 1, opacity 0.5

// Audience colour accent (blurred bg spot behind active card):
// enterprise → #5590F6   education → #22D3EE   life → #8B5CF6   personal → #10B981
```

---

## 12. SecurityChecklist

```tsx
// src/components/sections/SecuritySection.tsx
// Two glass cards side by side
// Each feature item: icon + text, animates in with checkmark on scroll

interface SecurityCard {
  title: string
  items: Array<{ icon: string; text: string }>
}

const SECURITY_CARDS: SecurityCard[] = [
  {
    title: 'Data Security & Technology Assurance',
    items: [
      {
        icon: 'lock',
        text: 'End-to-end data encryption enabling secure bidirectional data transmission',
      },
      {
        icon: 'database',
        text: 'Protection against accidental deletion or loss with multiple backup methods',
      },
      { icon: 'shield', text: 'ISO 27001 certified, fully compliant with GDPR requirements' },
      {
        icon: 'alert-triangle',
        text: 'Protection against malicious attacks, anomalous requests, and high-risk operation alerts',
      },
      { icon: 'key', text: 'Unauthorized access prevented with permission controls' },
    ],
  },
  {
    title: 'Customer Success Service Assurance',
    items: [
      {
        icon: 'rocket',
        text: 'Go-live within 7 days, enabling a seamless transition to digital management',
      },
      {
        icon: 'headphones',
        text: '7×24 daily customer support to ensure stable and continuous digital operations',
      },
      {
        icon: 'refresh-cw',
        text: 'Full lifecycle operational system support, enabling intelligent operational decision-making',
      },
      {
        icon: 'trending-up',
        text: 'Ongoing and growth-enablement services to support personalized long-term decision strategies',
      },
    ],
  },
]

// Each item animation: scroll triggers checkmark SVG path draw + fade-up
// Stagger: 120ms between items
```

---

## 13. HeroSection (Anatomy)

```tsx
// src/components/sections/HeroSection.tsx
// Most complex component — see animations.md for full GSAP setup

// DOM skeleton:
// <section class="hero-bg min-h-screen flex items-center relative overflow-hidden">
//
//   <!-- Background layers (z-0) -->
//   <canvas id="particle-canvas" class="absolute inset-0 z-0" />    {/* Three.js / tsParticles */}
//   <div class="hero-bg-grid absolute inset-0 z-0" />
//   <div class="hero-bg-glow absolute inset-0 z-0" />
//
//   <!-- Content (z-10) -->
//   <div class="content-container z-10 pt-32 pb-20">
//     <div class="max-w-3xl mx-auto text-center">
//
//       <SectionLabel>Redefining Connections · Acting on Your Words</SectionLabel>
//
//       <h1 class="text-display mb-6">
//         {/* GSAP SplitText typewriter line by line */}
//         V V AI Connects Enterprises and Individuals to Enable
//         <GradientText>True Human–AI Collaboration and Co-creation</GradientText>
//       </h1>
//
//       <p class="text-body text-secondary max-w-2xl mx-auto mb-10">
//         Acting on Your Words. Redefining Connections.
//       </p>
//
//       <!-- CTAs -->
//       <div class="flex gap-4 justify-center mb-12">
//         <Button variant="primary" size="lg">Try for Free</Button>
//         <Button variant="ghost"   size="lg">Book a Demo</Button>
//       </div>
//
//       <!-- Platform icons -->
//       <PlatformBadges />
//
//     </div>
//
//     <!-- Animated globe / bird logo -->
//     <div class="hero-globe absolute right-0 top-1/2 -translate-y-1/2 z-5">
//       {/* Three.js globe OR animated bird SVG */}
//     </div>
//   </div>
// </section>

// PlatformBadges: Windows · Android · macOS · iOS · iPadOS
// Each: platform icon (SVG) + label, muted colour, space-x-6
```

---

## 14. PlatformBadges

```tsx
const PLATFORMS = [
  { icon: 'windows', label: 'Windows' },
  { icon: 'android', label: 'Android' },
  { icon: 'apple', label: 'macOS' },
  { icon: 'ios', label: 'iOS' },
  { icon: 'ipad', label: 'iPadOS' },
]

// Render as pill row: flex gap-3 flex-wrap justify-center
// Each pill: icon + label, glass-card micro style (px-3 py-1.5, rounded-full, text-caption)
```

---

## 15. LanguagePicker

```tsx
// src/components/ui/LanguagePicker.tsx
const LOCALES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'zh-tw', label: '繁體中文', flag: '🇹🇼' },
]

// Dropdown that calls router.push('/[locale]/...') on select
// Stores preference in cookie: 'NEXT_LOCALE'
// Renders as a small globe icon button → popover dropdown
```

---

## 16. AnimatedCounter

```tsx
// src/components/ui/AnimatedCounter.tsx
// Used for stats: "30% time saved", "100+ partners", "30+ modules"
interface AnimatedCounterProps {
  from?: number
  to: number
  suffix?: string // '%', '+', 'x', 'ms'
  prefix?: string // '$', '>'
  duration?: number // ms — default 1500
  triggerOnce?: boolean // IntersectionObserver — default true
}

// Implementation: GSAP gsap.to({ val: from }, { val: to, ... onUpdate: () => setDisplay(Math.round(v)) })
// OR: react-countup library
```

---

## 17. ScrollReveal Wrapper

```tsx
// src/components/ui/ScrollReveal.tsx
// Wraps any child — applies intersection-triggered animation via Framer Motion

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number // ms — for stagger
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number // px translate — default 32
  once?: boolean // animate only once — default true
  className?: string
}

// Framer whileInView variants:
const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
// <motion.div initial="hidden" whileInView="visible" viewport={{ once }} variants={variants} />
```

---

## 18. MobileMenu Drawer

```tsx
// src/components/layout/MobileMenu.tsx
// Slides in from right on hamburger tap
// Glass backdrop with blur
// Full nav tree with accordion expand for Product sub-items
// Language picker + CTA buttons at bottom

// Animation: Framer Motion x: '100%' → 0 with spring(stiffness: 300, damping: 30)
// Overlay: opacity 0→0.6 (bg-black)
// Nav items: staggered fade-up (delay: index * 0.05s)
```

---

## Component Index Summary

| Component              | File                                | Used In                |
| ---------------------- | ----------------------------------- | ---------------------- |
| `Button`               | `ui/Button.tsx`                     | Global                 |
| `GlassCard`            | `ui/GlassCard.tsx`                  | Global                 |
| `SectionLabel`         | `ui/SectionLabel.tsx`               | All sections           |
| `GradientText`         | `ui/GradientText.tsx`               | Headings               |
| `AnimatedCounter`      | `ui/AnimatedCounter.tsx`            | Stats sections         |
| `ScrollReveal`         | `ui/ScrollReveal.tsx`               | All sections           |
| `PlatformBadges`       | `ui/PlatformBadges.tsx`             | Hero, Platform section |
| `LanguagePicker`       | `ui/LanguagePicker.tsx`             | Navbar, Footer         |
| `Navbar`               | `layout/Navbar.tsx`                 | Root layout            |
| `Footer`               | `layout/Footer.tsx`                 | Root layout            |
| `MobileMenu`           | `layout/MobileMenu.tsx`             | Navbar                 |
| `HeroSection`          | `sections/HeroSection.tsx`          | Home                   |
| `PillarsSection`       | `sections/PillarsSection.tsx`       | Home                   |
| `AudienceSplitSection` | `sections/AudienceSplitSection.tsx` | Home                   |
| `TechPillarsSection`   | `sections/TechPillarsSection.tsx`   | Home                   |
| `PlatformSection`      | `sections/PlatformSection.tsx`      | Home                   |
| `SecuritySection`      | `sections/SecuritySection.tsx`      | Home, Security page    |
| `PartnerSection`       | `sections/PartnerSection.tsx`       | Home                   |
| `TestimonialsSection`  | `sections/TestimonialsSection.tsx`  | Home                   |
| `CtaSection`           | `sections/CtaSection.tsx`           | Home + all pages       |
