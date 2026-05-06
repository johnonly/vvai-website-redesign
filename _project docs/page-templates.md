# V V AI — Page Templates Reference

> JSX/TSX layout templates for every page type in the redesign.
> All templates use the section order defined in `vvai-redesign-plan.md`.

---

## File & Route Structure (Next.js App Router)

> **Implementation status updated** — reflects actual files on disk as of current build.

```
src/
├── app/
│   ├── icon.png                     ← Tab favicon (bird logo)
│   ├── [locale]/
│   │   ├── layout.tsx               ← Root layout (Nav + Footer + providers)
│   │   ├── page.tsx                 ← Home / Landing page
│   │   ├── products/
│   │   │   ├── page.tsx             ← ✅ Products overview (suite cards grid)
│   │   │   └── [suite]/page.tsx     ← ✅ Dynamic suite page (work/education/life/health)
│   │   ├── solutions/
│   │   │   └── page.tsx             ← ✅ Solutions (enterprise/education/personal/health sections)
│   │   ├── security/
│   │   │   └── page.tsx             ← ✅ Security & Compliance
│   │   ├── pricing/
│   │   │   └── page.tsx             ← ✅ Pricing (enterprise contact-for-quote model)
│   │   ├── about/
│   │   │   ├── page.tsx             ← ✅ About / Our Story (values, milestones, stats)
│   │   │   ├── story/page.tsx       ← ✅ Redirect → /[locale]/about
│   │   │   ├── careers/page.tsx     ← ✅ Redirect → /[locale]/join
│   │   │   └── news/page.tsx        ← ✅ News index
│   │   ├── contact/page.tsx         ← ✅ Contact (with DemoForm)
│   │   ├── demo/page.tsx            ← ✅ Book a Demo
│   │   ├── join/page.tsx            ← ✅ Careers / Join Us
│   │   ├── support/page.tsx         ← ✅ Support (7×24, channels, SLA)
│   │   ├── terms/page.tsx           ← ✅ Terms of Service
│   │   └── privacy/page.tsx         ← ✅ Privacy Policy
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               ← Bird logo (72×72px), locale switcher
│   │   └── Footer.tsx
│   ├── hero/
│   │   └── ParticlesBackground.tsx
│   ├── sections/                    ← Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── BannerSection.tsx        ← ✅ Animated banner (replaces AudienceSplitSection)
│   │   ├── PillarsSection.tsx
│   │   ├── TechPillarsSection.tsx
│   │   ├── PlatformSection.tsx
│   │   ├── SecuritySection.tsx
│   │   ├── PartnerSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CtaSection.tsx
│   ├── products/                    ← Product suite page components
│   │   ├── SuiteHero.tsx
│   │   ├── SuiteSecurityBar.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── ScreenshotShowcase.tsx
│   │   └── ModuleList.tsx
│   ├── contact/
│   │   └── DemoForm.tsx
│   └── ui/                          ← Shared primitives
│       ├── Button.tsx               ← style prop supported via ButtonHTMLAttributes
│       ├── GlassCard.tsx            ← style?: CSSProperties supported
│       ├── SectionLabel.tsx         ← color: 'blue'|'violet'|'cyan'|'green'
│       ├── GradientText.tsx
│       ├── ScrollReveal.tsx
│       └── PlatformBadges.tsx
```

### Navigation Links → Route Map

| Nav Label     | href (navigation.ts)  | File                         |
| ------------- | --------------------- | ---------------------------- |
| Products      | `/products`           | `products/page.tsx`          |
| V V Work      | `/products/work`      | `products/[suite]/page.tsx`  |
| V V Education | `/products/education` | `products/[suite]/page.tsx`  |
| V V Life      | `/products/life`      | `products/[suite]/page.tsx`  |
| V V Health    | `/products/health`    | `products/[suite]/page.tsx`  |
| Solutions     | `/solutions`          | `solutions/page.tsx`         |
| Security      | `/security`           | `security/page.tsx`          |
| Pricing       | `/pricing`            | `pricing/page.tsx`           |
| About         | `/about`              | `about/page.tsx`             |
| Our Story     | `/about`              | `about/page.tsx` (same page) |
| News          | `/about/news`         | `about/news/page.tsx`        |
| Join Us       | `/join`               | `join/page.tsx`              |
| Contact       | `/contact`            | `contact/page.tsx`           |
| Book a Demo   | `/demo`               | `demo/page.tsx`              |
| Support       | `/support`            | `support/page.tsx`           |

---

## Template 1 — Root Layout

```tsx
// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LenisProvider } from '@/components/providers/LenisProvider'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vvai.com'),
  title: {
    default: 'VV AI — Redefining Connections, Acting on Your Words',
    template: '%s | V V AI',
  },
  description: 'Providing Intelligent AI-Driven Services Across Work, Education, Life, and Health.',
  openGraph: {
    siteName: 'VV AI',
    locale: 'en_US',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

---

## Template 2 — Home / Landing Page

```tsx
// src/app/[locale]/page.tsx
import HeroSection from '@/components/sections/HeroSection'
import PillarsSection from '@/components/sections/PillarsSection'
import AudienceSplitSection from '@/components/sections/AudienceSplitSection'
import TechPillarsSection from '@/components/sections/TechPillarsSection'
import PlatformSection from '@/components/sections/PlatformSection'
import SecuritySection from '@/components/sections/SecuritySection'
import PartnerSection from '@/components/sections/PartnerSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CtaSection from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <>
      {/* S1 — Hero Banner */}
      <HeroSection />

      {/* S2 — Four Pillars Tabbed Showcase */}
      <PillarsSection />

      {/* S3 — Enterprise vs Individual Split */}
      <AudienceSplitSection />

      {/* S4 — Four Technology Pillars */}
      <TechPillarsSection />

      {/* S5 — Platform / Multi-device Reimagined */}
      <PlatformSection />

      {/* S6 — Security & Trust */}
      <SecuritySection />

      {/* S7 — Partner Logos Marquee */}
      <PartnerSection />

      {/* S8 — Customer Testimonials */}
      <TestimonialsSection />

      {/* S9 — Final CTA */}
      <CtaSection />
    </>
  )
}
```

---

## Template 3 — Product Suite Page (Work / Education / Life / Health)

```tsx
// src/app/[locale]/products/[suite]/page.tsx
// Example: Work Suite page structure

import type { Metadata } from 'next'
import SuiteHero from '@/components/products/SuiteHero'
import FeatureGrid from '@/components/products/FeatureGrid'
import ScreenshotShowcase from '@/components/products/ScreenshotShowcase'
import ModuleList from '@/components/products/ModuleList'
import SuiteSecurityBar from '@/components/products/SuiteSecurityBar'
import CtaSection from '@/components/sections/CtaSection'

interface Props {
  params: { locale: string; suite: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch suite data from CMS or static config
  return {
    title: 'Work Suite — One-Stop Smart Collaboration Platform',
    description: 'Connecting You to the V World of Intelligence.',
  }
}

export default function ProductSuitePage({ params }: Props) {
  return (
    <>
      {/* Hero — suite-specific headline & screenshot */}
      <SuiteHero suite={params.suite} />

      {/* 4–6 key feature highlights with icons */}
      <FeatureGrid suite={params.suite} />

      {/* Screenshots / product UI showcase with parallax */}
      <ScreenshotShowcase suite={params.suite} />

      {/* Full module list (accordion or grid) */}
      <ModuleList suite={params.suite} />

      {/* Mini security/trust bar (ISO, GDPR) */}
      <SuiteSecurityBar />

      {/* Final CTA */}
      <CtaSection variant="suite" />
    </>
  )
}

/* ── Section Layout (inner template) ──────────────────────── */
// SuiteHero structure:
// <section class="section-wrapper hero-bg">
//   <div class="content-container">
//     <div class="grid-2col items-center">
//       <!-- LEFT: label + h1 + subtitles + CTAs -->
//       <!-- Education suite: render two subtitle lines (subline + tagline) as a list -->
//       <!-- Other suites: render subline + keyword pills -->
//       <!-- RIGHT: device mockup / screenshot image -->
//     </div>
//   </div>
// </section>
```

---

## Template 4 — Solutions Page (For Enterprises / Education / Individuals / Healthcare)

```tsx
// src/app/[locale]/solutions/[audience]/page.tsx
import SolutionHero from '@/components/solutions/SolutionHero'
import PainPoints from '@/components/solutions/PainPoints'
import FeatureHighlights from '@/components/solutions/FeatureHighlights'
import CaseStudyStrip from '@/components/solutions/CaseStudyStrip'
import RelatedProducts from '@/components/solutions/RelatedProducts'
import CtaSection from '@/components/sections/CtaSection'

export default function SolutionPage({ params }: { params: { audience: string } }) {
  return (
    <>
      <SolutionHero audience={params.audience} />
      <PainPoints audience={params.audience} />
      <FeatureHighlights audience={params.audience} />
      <CaseStudyStrip />
      <RelatedProducts audience={params.audience} />
      <CtaSection variant="solution" />
    </>
  )
}

/* ── Layout Notes ──────────────────────────────────────────── */
// SolutionHero:    full-width dark hero + audience-specific headline + illustration
// PainPoints:      3-col card row — "Before V V AI / After V V AI" framing
// FeatureHighlights: alternating left/right screenshot + copy rows (zigzag layout)
// CaseStudyStrip:  horizontal scrolling testimonial related to this audience
// RelatedProducts: card grid of which Product Suites are relevant
```

---

## Template 5 — Security Page

```tsx
// src/app/[locale]/security/page.tsx
import SecurityHero from '@/components/security/SecurityHero'
import CertificationsBar from '@/components/security/CertificationsBar'
import SecurityFeatures from '@/components/security/SecurityFeatures'
import DataResidency from '@/components/security/DataResidency'
import ComplianceGrid from '@/components/security/ComplianceGrid'
import CtaSection from '@/components/sections/CtaSection'

export default function SecurityPage() {
  return (
    <>
      {/* Shield-themed hero */}
      <SecurityHero />

      {/* ISO 27001 · GDPR · End-to-End Encryption badges */}
      <CertificationsBar />

      {/* Feature cards matching Section 6 of landing page, expanded */}
      <SecurityFeatures />

      {/* World map: data residency regions */}
      <DataResidency />

      {/* Compliance framework grid */}
      <ComplianceGrid />

      <CtaSection variant="security" />
    </>
  )
}
```

---

## Template 6 — About / Our Story Page

```tsx
// src/app/[locale]/about/page.tsx
import AboutHero from '@/components/about/AboutHero'
import MissionBlock from '@/components/about/MissionBlock'
import Timeline from '@/components/about/Timeline'
import TeamGrid from '@/components/about/TeamGrid'
import ValuesGrid from '@/components/about/ValuesGrid'
import CtaSection from '@/components/sections/CtaSection'

export default function AboutPage() {
  return (
    <>
      {/* Headline: "Redefining Connections, Acting on Your Words" — cinematic reveal */}
      <AboutHero />

      {/* Company mission + Singapore HQ context */}
      <MissionBlock />

      {/* Company milestones timeline (horizontal scroll on mobile) */}
      <Timeline />

      {/* Team photos grid */}
      <TeamGrid />

      {/* Core values: 4-card grid (Innovation, Trust, People, Impact) */}
      <ValuesGrid />

      <CtaSection variant="about" />
    </>
  )
}
```

---

## Template 7 — News Index Page

```tsx
// src/app/[locale]/about/news/page.tsx
import NewsHero from '@/components/news/NewsHero'
import FeaturedPost from '@/components/news/FeaturedPost'
import NewsGrid from '@/components/news/NewsGrid'
import NewsFilters from '@/components/news/NewsFilters'

export default async function NewsPage() {
  // Fetch from CMS (Sanity / Contentful)
  // const posts = await fetchNews()

  return (
    <>
      <NewsHero />
      <section className="section-wrapper section-bg-base">
        <div className="content-container">
          <FeaturedPost /> {/* Latest / pinned post — large hero card */}
          <NewsFilters /> {/* Category pills: All · Product · Company · Security */}
          <NewsGrid /> {/* 3-col card grid, paginated */}
        </div>
      </section>
    </>
  )
}
```

---

## Template 8 — News Article Page

```tsx
// src/app/[locale]/about/news/[slug]/page.tsx
import ArticleHeader from '@/components/news/ArticleHeader'
import ArticleBody from '@/components/news/ArticleBody'
import ArticleSidebar from '@/components/news/ArticleSidebar'
import RelatedPosts from '@/components/news/RelatedPosts'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // const article = await fetchArticle(params.slug)

  return (
    <>
      <ArticleHeader /> {/* Featured image + category + title + author + date */}
      <div className="content-container grid-2col gap-16 py-16">
        <ArticleBody /> {/* Markdown/rich text content — prose styles */}
        <ArticleSidebar /> {/* Table of contents + recent posts + CTA */}
      </div>
      <RelatedPosts />
    </>
  )
}
```

---

## Template 9 — Contact / Book a Demo Page

```tsx
// src/app/[locale]/contact/page.tsx  OR  /demo/page.tsx
import ContactHero from '@/components/contact/ContactHero'
import DemoForm from '@/components/contact/DemoForm'
import ContactInfo from '@/components/contact/ContactInfo'
import TrustBar from '@/components/contact/TrustBar'

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="section-wrapper section-bg-mid">
        <div className="content-container grid-2col gap-16">
          {/* LEFT — Form */}
          <DemoForm />

          {/* RIGHT — Company details, offices, social */}
          <ContactInfo />
        </div>
      </section>
      {/* Social proof strip: partner logos + stats */}
      <TrustBar />
    </>
  )
}

/* ── DemoForm Fields ──────────────────────────────────────── */
// - First name *
// - Last name *
// - Company name *
// - Work email *
// - Company size (select: 1–10 / 11–50 / 51–200 / 200+)
// - Primary interest (select: work / education / life / health / all)
// - Message (textarea, optional)
// - [Book a Demo] submit button
// POST /api/demo-request  →  CRM webhook (HubSpot / Salesforce)
```

---

## Template 10 — Pricing Page

```tsx
// src/app/[locale]/pricing/page.tsx
import PricingHero from '@/components/pricing/PricingHero'
import PricingToggle from '@/components/pricing/PricingToggle' // Monthly / Annual
import PricingCards from '@/components/pricing/PricingCards'
import FeatureTable from '@/components/pricing/FeatureTable' // Full comparison
import PricingFaq from '@/components/pricing/PricingFaq'
import CtaSection from '@/components/sections/CtaSection'

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <section className="section-wrapper">
        <div className="content-container">
          <PricingToggle />
          <PricingCards />
        </div>
      </section>
      <FeatureTable />
      <PricingFaq />
      <CtaSection variant="pricing" />
    </>
  )
}

/* ── PricingCards tiers (placeholder — update with real pricing) ── */
// Free     · Personal use · Core features
// Pro      · Individual power users · AI Assistant + storage
// Team     · Up to 50 users · All Work Suite modules
// Enterprise · Unlimited · All suites + HR + BI + dedicated support
```

---

## Template 11 — Legal Pages (Terms / Privacy)

```tsx
// src/app/[locale]/terms/page.tsx  AND  /privacy/page.tsx
import LegalHero from '@/components/legal/LegalHero'
import LegalBody from '@/components/legal/LegalBody'
import LegalToc from '@/components/legal/LegalToc'

export default function TermsPage() {
  return (
    <>
      <LegalHero title="Terms of Service" lastUpdated="2026-03-29" />
      <section className="section-wrapper section-bg-base">
        <div className="content-container" style={{ maxWidth: '900px' }}>
          <div
            className="grid"
            style={{ gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start' }}
          >
            <LegalToc /> {/* Sticky sidebar ToC */}
            <LegalBody /> {/* Markdown prose content */}
          </div>
        </div>
      </section>
    </>
  )
}
```

---

## Template 12 — Join Us (Careers) Page

```tsx
// src/app/[locale]/join/page.tsx
import JoinHero from '@/components/join/JoinHero'
import ValuesStrip from '@/components/join/ValuesStrip'
import JobListings from '@/components/join/JobListings' // filtered by department
import JobModal from '@/components/join/JobModal' // sheet/modal for apply
import CtaSection from '@/components/sections/CtaSection'

export default function JoinPage() {
  return (
    <>
      <JoinHero />
      <ValuesStrip />
      <section className="section-wrapper section-bg-mid">
        <div className="content-container">
          <JobListings />
        </div>
      </section>
      <CtaSection variant="careers" />
      <JobModal />
    </>
  )
}
```

---

## Shared Section Layout Pattern

Every section follows this exact structure:

```tsx
// Skeleton for any section component
export default function SomeSection() {
  return (
    <section className="section-wrapper section-bg-[variant] relative overflow-hidden">
      {/* Optional background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* gradient, particles, grid lines etc */}
      </div>

      <div className="content-container relative z-10">
        {/* Optional eyebrow label */}
        <span className="section-label">Category</span>

        {/* Section heading */}
        <h2 className="text-section gradient-text mb-4">Section Headline</h2>

        {/* Optional sub-text */}
        <p className="text-body mb-12 max-w-2xl">Supporting description text.</p>

        {/* Content grid / cards / etc */}
        <div className="grid-3col">{/* items */}</div>
      </div>
    </section>
  )
}
```

---

## Navbar Structure

```tsx
// Top-level navigation items + mega menu structure
// See component-library.md for full Navbar component spec

const NAV_ITEMS = [
  {
    label: 'Products',
    children: [
      {
        group: 'Work Suite',
        href: '/products/work',
        items: ['Work Management', 'Communication', 'Documents', 'AI Work Agent'],
      },
      {
        group: 'Enterprise Suite',
        href: '/products/enterprise',
        items: ['HR Management', 'Enterprise Management', 'Business Intelligence'],
      },
      {
        group: 'Education Suite',
        href: '/products/education',
        items: ['Home-School Collaboration', 'Smart Classroom', 'AI Learning'],
      },
      {
        group: 'Life Suite',
        href: '/products/life',
        items: ['Life Assistant', 'Lifestyle Services'],
      },
      {
        group: 'Health Suite',
        href: '/products/health',
        items: ['Health Manager', 'Resource Sharing'],
      },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'For Enterprises', href: '/solutions/enterprise' },
      { label: 'For Education Institutions', href: '/solutions/education' },
      { label: 'For Individuals', href: '/solutions/individuals' },
      { label: 'For Healthcare', href: '/solutions/healthcare' },
    ],
  },
  { label: 'Security', href: '/security' },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'About',
    children: [
      { label: 'Our Story', href: '/about' },
      { label: 'News', href: '/about/news' },
    ],
  },
  {
    label: 'Contact',
    children: [
      { label: 'Book a Demo', href: '/demo' },
      { label: 'Contact VV', href: '/contact' },
      { label: 'Join Us', href: '/join' },
    ],
  },
]
```
