# V V AI — Data Models & API Reference

> TypeScript interfaces, API route schemas, and CMS content shapes for the redesign.
> CMS: Sanity.io (primary) | Static: JSON/ts files for hardcoded content

---

## 1. Core Content Types

### 1.1 Product Suite

```ts
// src/types/products.ts

export type SuiteId = 'work' | 'enterprise' | 'education' | 'life' | 'health'

export type AudienceType = 'enterprise' | 'personal'

export interface ProductSuite {
  id: SuiteId
  audience: AudienceType
  label: string // "Work Suite"
  headline: string // "One-Stop Smart Collaboration Platform"
  subline: string // "Connecting You to the V World of Intelligence"
  tagline: string // "Smart · Convenient · Personalized · Collaborative"
  keywords: string[]
  accentColor: string // CSS hex "#5590F6"
  href: string // "/products/work"
  icon: string // icon name or SVG string
  heroImage: string // CDN URL or /public path
  screenshots: SuiteScreenshot[]
  modules: ProductModule[]
  ctaLabel?: string
}

export interface SuiteScreenshot {
  src: string // CDN or local URL
  alt: string
  position?: 'primary' | 'secondary' | 'floating'
  device?: 'desktop' | 'mobile' | 'tablet'
}

export interface ProductModule {
  id: string
  name: string // "Attendance"
  description: string // "Intelligent Time Attendance Tracking"
  group: ModuleGroup
  icon?: string
  isNew?: boolean
  href?: string
}

export type ModuleGroup =
  | 'hr-management'
  | 'enterprise-management'
  | 'work-management'
  | 'communication'
  | 'education'
  | 'life'
  | 'health'
  | 'ai-tools'
  | 'security'
```

### 1.2 Navigation Item

```ts
// src/types/navigation.ts

export interface NavItem {
  label: string
  href?: string
  icon?: string
  children?: NavChild[]
}

export interface NavChild {
  label: string
  href: string
  description?: string // short sub-text for mega menu
  icon?: string
  group?: string // groups items under a label
  isNew?: boolean
}

export interface NavGroup {
  group: string
  href: string
  items: string[]
}
```

### 1.3 Testimonial

```ts
// src/types/testimonials.ts

export type TestimonialAudience = 'enterprise' | 'education' | 'life' | 'health' | 'personal'

export interface Testimonial {
  id: number | string
  name: string
  role: string
  company?: string
  avatar: string // CDN or /public URL
  quote: string
  audience: TestimonialAudience
  rating?: number // 1–5 stars (optional)
  locale?: string // 'en' | 'zh' | 'zh-tw'
}
```

### 1.4 Partner / Logo

```ts
// src/types/partners.ts

export interface Partner {
  id: string
  name: string
  logo: string // CDN or /public URL (prefer SVG)
  logoLight?: string // light-mode variant if needed
  href?: string // optional partner link
  category?: 'education' | 'enterprise' | 'technology' | 'government'
  featured?: boolean
}
```

### 1.5 News Article (CMS)

```ts
// src/types/news.ts — mirrors Sanity schema

export interface NewsArticle {
  _id: string
  _type: 'newsArticle'
  slug: { current: string }
  title: string
  excerpt: string
  coverImage: SanityImage
  publishedAt: string // ISO 8601
  category: NewsCategory
  author: Author
  body: SanityBlock[] // Portable Text
  relatedArticles?: { _ref: string }[]
  seo?: SeoMeta
  locale: string
}

export type NewsCategory = 'product' | 'company' | 'security' | 'partnerships' | 'awards'

export interface Author {
  name: string
  avatar?: SanityImage
  role?: string
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; url?: string }
  alt?: string
  caption?: string
}

export interface SeoMeta {
  title?: string
  description?: string
  ogImage?: SanityImage
}
```

### 1.6 Job Listing (Careers)

```ts
// src/types/careers.ts

export interface JobListing {
  id: string
  title: string
  department: 'engineering' | 'product' | 'design' | 'sales' | 'marketing' | 'operations' | 'hr'
  location: string // "Singapore · Remote"
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'director'
  description: string
  requirements: string[]
  niceToHave?: string[]
  benefits?: string[]
  postedAt: string
  closingAt?: string
  isUrgent?: boolean
  applyUrl?: string
}
```

### 1.7 Demo Request (Form Submission)

```ts
// src/types/forms.ts

export interface DemoRequest {
  firstName: string
  lastName: string
  companyName: string
  workEmail: string
  workPhone?: string
  companySize: '1-10' | '11-50' | '51-200' | '201-500' | '500+'
  primaryInterest: SuiteId | 'all'
  message?: string
  locale?: string
  referrer?: string // utm_source / page URL
  captchaToken: string // reCAPTCHA v3 token
}

export interface DemoResponse {
  success: boolean
  message: string
  ticketId?: string // CRM reference
}
```

---

## 2. Static Data Files

### 2.1 Product Suites Data

```ts
// src/data/suites.ts
import type { ProductSuite } from '@/types/products'

const CDN = 'https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image'

export const SUITES: ProductSuite[] = [
  {
    id: 'work',
    audience: 'enterprise',
    label: 'Work Suite',
    headline: 'One-Stop Smart Collaboration Platform',
    subline: 'Connecting You to the "V" World of Intelligence',
    tagline: 'Smart · Convenient · Personalized · Collaborative',
    keywords: ['Smart', 'Convenient', 'Personalized', 'Collaborative'],
    accentColor: '#5590F6',
    href: '/products/work',
    icon: 'briefcase',
    heroImage: `${CDN}/index_page2_img1.d17f0bfc.png`,
    screenshots: [
      {
        src: `${CDN}/index_page2_img1.d17f0bfc.png`,
        alt: 'Work dashboard',
        position: 'primary',
        device: 'desktop',
      },
      {
        src: `${CDN}/index_page2_img2.cba306d4.png`,
        alt: 'Work tasks',
        position: 'secondary',
        device: 'desktop',
      },
      {
        src: `${CDN}/index_page2_img3.1fa2cacf.png`,
        alt: 'Work calendar',
        position: 'floating',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page2_img4.f3e7c1ad.png`,
        alt: 'Work chat',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page2_img7.586f929e.png`,
        alt: 'Work OKR',
        position: 'secondary',
        device: 'desktop',
      },
      {
        src: `${CDN}/index_page2_img8.b8b93349.png`,
        alt: 'Work documents',
        position: 'secondary',
        device: 'desktop',
      },
      {
        src: `${CDN}/index_page2_img9.fc47a119.png`,
        alt: 'Work meetings',
        position: 'secondary',
        device: 'desktop',
      },
    ],
    modules: [], // populated from MODULE_GROUPS below
    ctaLabel: 'Explore Work Suite',
  },
  {
    id: 'education',
    audience: 'enterprise',
    label: 'Education Suite',
    headline: 'New AI-powered Collaborative Education Services',
    subline: 'Connecting You to the "V" World of Wisdom',
    tagline: 'Collaborative · Private · Efficient · Targeted',
    keywords: ['Collaborative', 'Private', 'Efficient', 'Targeted'],
    accentColor: '#22D3EE',
    href: '/products/education',
    icon: 'graduation-cap',
    heroImage: `${CDN}/index_page4_img1.eb1ade7f.png`,
    screenshots: [
      {
        src: `${CDN}/index_page4_img1.eb1ade7f.png`,
        alt: 'Education dashboard',
        position: 'primary',
        device: 'desktop',
      },
      {
        src: `${CDN}/index_page4_img2.d15298b8.png`,
        alt: 'Classroom view',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page4_img3.7d863712.png`,
        alt: 'Student progress',
        position: 'floating',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page4_img4.884a40ca.png`,
        alt: 'Schedule view',
        position: 'secondary',
        device: 'desktop',
      },
      {
        src: `${CDN}/index_page4_img5.492dc2c1.png`,
        alt: 'Parent app',
        position: 'secondary',
        device: 'mobile',
      },
    ],
    modules: [],
    ctaLabel: 'Explore Education Suite',
  },
  {
    id: 'life',
    audience: 'personal',
    label: 'Life Suite',
    headline: 'Your Personal and Reliable Smart Lifestyle Planner',
    subline: 'Connecting You to the "V" World of Convenience',
    tagline: 'Digital · Convenient · Comprehensive · Connected',
    keywords: ['Digital', 'Convenient', 'Comprehensive', 'Connected'],
    accentColor: '#8B5CF6',
    href: '/products/life',
    icon: 'home',
    heroImage: `${CDN}/index_page3_img1.39a88fc8.png`,
    screenshots: [
      {
        src: `${CDN}/index_page3_img1.39a88fc8.png`,
        alt: 'Life assistant',
        position: 'primary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page3_img2.5460da6b.png`,
        alt: 'Life services',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page3_img3.26b4b49d.png`,
        alt: 'Life planner',
        position: 'floating',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page3_img4.45ea3a2a.png`,
        alt: 'Life calendar',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page3_img5.b35727f0.png`,
        alt: 'Dining assistant',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page3_img6.5c4361d5.png`,
        alt: 'Travel planner',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page3_img7.a60d3d74.png`,
        alt: 'Life overview',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page3_img8.6b59ffb8.png`,
        alt: 'Lifestyle explore',
        position: 'secondary',
        device: 'mobile',
      },
    ],
    modules: [],
    ctaLabel: 'Explore Life Suite',
  },
  {
    id: 'health',
    audience: 'personal',
    label: 'Health Suite',
    headline: 'Your Reliable, Quick-Response Health Manager',
    subline: 'Connecting You to the "V" World of Health',
    tagline: 'Smart · Reliable · Caring · Collaborative',
    keywords: ['Smart', 'Reliable', 'Caring', 'Collaborative'],
    accentColor: '#10B981',
    href: '/products/health',
    icon: 'heart-pulse',
    heroImage: `${CDN}/index_page5_img6-1.48b9652f.png`,
    screenshots: [
      {
        src: `${CDN}/index_page5_img6-1.48b9652f.png`,
        alt: 'Health overview',
        position: 'primary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page5_img3-2.cd96bc7a.png`,
        alt: 'Health tracking',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page5_img1-3.6e9cf71a.png`,
        alt: 'Health appointment',
        position: 'floating',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page5_img2-4.30adb43e.png`,
        alt: 'Health records',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page5_img10-6.10b319be.png`,
        alt: 'Health resources',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page5_img4-7.440bf8da.png`,
        alt: 'Health manager',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/index_page5_img5-8.223254d6.png`,
        alt: 'Health sharing',
        position: 'secondary',
        device: 'mobile',
      },
    ],
    modules: [],
    ctaLabel: 'Explore Health Suite',
  },
]
```

### 2.2 Module Groups Data

```ts
// src/data/modules.ts
import type { ProductModule } from '@/types/products'

export const MODULES: ProductModule[] = [
  // ── HR Management ──────────────────────────────────────────────
  {
    id: 'attendance',
    name: 'Attendance',
    description: 'Intelligent Time Attendance Tracking',
    group: 'hr-management',
  },
  {
    id: 'salary',
    name: 'Salary',
    description: 'Core Payroll Data Integration',
    group: 'hr-management',
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Multi-dimensional Performance Management',
    group: 'hr-management',
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    description: 'Eliminate Data Fragmentation, Centralize Data',
    group: 'hr-management',
  },
  {
    id: 'confirmation',
    name: 'Confirmation',
    description: 'Provide Insights & Support Decision Making',
    group: 'hr-management',
  },
  {
    id: 'staff-transfer',
    name: 'Staff Transfer',
    description: 'Convenient & Efficient Job Transfers',
    group: 'hr-management',
  },
  {
    id: 'resignations',
    name: 'Resignations',
    description: 'Seamless Digital Service Integration',
    group: 'hr-management',
  },

  // ── Enterprise Management ───────────────────────────────────────
  {
    id: 'organization',
    name: 'Organization',
    description: 'Clear Structure, Easy Adjustment',
    group: 'enterprise-management',
  },
  {
    id: 'company',
    name: 'Company',
    description: 'Agile Global Enterprise Management',
    group: 'enterprise-management',
  },
  {
    id: 'workflow',
    name: 'Workflow',
    description: 'Intelligent Processes & Efficient Approval',
    group: 'enterprise-management',
  },
  {
    id: 'policy',
    name: 'Policy',
    description: 'Flexible Configuration & Convenient Management',
    group: 'enterprise-management',
  },
  {
    id: 'office-supplies',
    name: 'Office Supplies',
    description: 'Resource Management & Cost Control',
    group: 'enterprise-management',
  },
  {
    id: 'contracts',
    name: 'Contracts',
    description: 'Smart Contract Management to Empower Business',
    group: 'enterprise-management',
  },
  {
    id: 'employees',
    name: 'Employees',
    description: 'Integrated Data Management',
    group: 'enterprise-management',
  },
  {
    id: 'access-rights',
    name: 'Access Rights',
    description: 'Flexible & Secure Management',
    group: 'enterprise-management',
  },

  // ── Work Management ─────────────────────────────────────────────
  {
    id: 'okr',
    name: 'Objective (OKR)',
    description: 'Goal Breakdown, Result-Oriented',
    group: 'work-management',
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Integrated Task Management',
    group: 'work-management',
  },
  {
    id: 'tasks',
    name: 'Tasks',
    description: 'Transparent Work & Data Quantification',
    group: 'work-management',
  },
  {
    id: 'tickets',
    name: 'Tickets',
    description: 'Problem Tracking & Closed-loop Management',
    group: 'work-management',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Real-time Team Data Management',
    group: 'work-management',
  },

  // ── Communication & Collaboration ───────────────────────────────
  {
    id: 'im',
    name: 'IM',
    description: 'Timely & Efficient Information Delivery',
    group: 'communication',
  },
  {
    id: 'meetings',
    name: 'Meetings',
    description: 'Video conferencing, teleconferencing',
    group: 'communication',
  },
  {
    id: 'meeting-rooms',
    name: 'Meeting Rooms',
    description: 'Smart room management',
    group: 'communication',
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Scheduling & coordination',
    group: 'communication',
  },
  { id: 'email', name: 'Email', description: 'Business email integration', group: 'communication' },
  {
    id: 'document',
    name: 'Document',
    description: 'Online document collaboration',
    group: 'communication',
  },
  { id: 'board', name: 'Board', description: 'Visual project boards', group: 'communication' },
  { id: 'microdisk', name: 'MicroDisk', description: 'Cloud storage', group: 'communication' },
  {
    id: 'multilingual',
    name: 'Multilingual',
    description: 'Real-time translation',
    group: 'communication',
  },

  // ── AI Tools ────────────────────────────────────────────────────
  {
    id: 'ai-work-agent',
    name: 'AI Work Agent',
    description: 'Super-intelligent AI work agent',
    group: 'ai-tools',
    isNew: true,
  },
  {
    id: 'recruitment',
    name: 'Recruitment',
    description: 'Global Recruitment Management',
    group: 'ai-tools',
  },
  {
    id: 'feedback',
    name: 'Feedback Expert',
    description: 'AI Review Management',
    group: 'ai-tools',
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'AI Customer Service',
    group: 'ai-tools',
  },
  {
    id: 'data-expert',
    name: 'Data Expert',
    description: 'AI Business Intelligence',
    group: 'ai-tools',
  },
  {
    id: 'evaluation',
    name: 'Evaluation Expert',
    description: 'Assessment & Analytics',
    group: 'ai-tools',
  },
  {
    id: 'process-expert',
    name: 'Process Expert',
    description: 'Workflow Automation',
    group: 'ai-tools',
  },
]
```

### 2.3 Testimonials Data

Quotes and author titles are fully localised — they live in the i18n message files under `testimonials.items.<id>`. The static data file only holds locale-independent fields.

**i18n message key structure** (same shape in `en.json`, `zh.json`, `zh-tw.json`):

```json
"testimonials": {
  "label": "...",
  "title": "...",
  "subtitle": "...",
  "items": {
    "t1": { "authorTitle": "Operations Director", "quote": "..." },
    "t2": { "authorTitle": "Education Center Founder", "quote": "..." },
    "t3": { "authorTitle": "Corporate Employee", "quote": "..." },
    "t4": { "authorTitle": "Marketing & Sales Representative", "quote": "..." },
    "t5": { "authorTitle": "Parent", "quote": "..." }
  }
}
```

**Static data** (`src/data/testimonials.ts`):

```ts
// src/data/testimonials.ts
import type { Testimonial } from '@/types'

const CDN = '/images/vv'

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    authorName: 'Jacky C.',
    authorOrg: 'Enterprise Client',
    avatarUrl: `${CDN}/customer-1.png`,
    rating: 5,
  },
  {
    id: 't2',
    authorName: 'Michelle L.',
    authorOrg: 'Education Partner',
    avatarUrl: `${CDN}/customer-2.png`,
    rating: 5,
  },
  {
    id: 't3',
    authorName: 'Bonny H.',
    authorOrg: 'Corporate Client',
    avatarUrl: `${CDN}/customer-3.png`,
    rating: 5,
  },
  {
    id: 't4',
    authorName: 'Winnie W.',
    authorOrg: 'VV Life User',
    avatarUrl: `${CDN}/customer-4.png`,
    rating: 5,
  },
  {
    id: 't5',
    authorName: 'Kevin S.',
    authorOrg: 'VV Life User',
    avatarUrl: `${CDN}/customer-5.png`,
    rating: 5,
  },
]
```

**`Testimonial` interface** (`src/types/index.ts`):

```ts
export interface Testimonial {
  id: string
  authorName: string
  authorOrg: string
  avatarUrl: string
  rating?: number
}
```

The component reads `quote` and `authorTitle` via `t('items.t1.quote')` / `t('items.t1.authorTitle')` using the `id` from the static entry as the dynamic key segment.

---

## 3. API Routes

### 3.1 Demo Request Submission

```ts
// src/app/api/demo-request/route.ts
import { NextRequest, NextResponse } from 'next/server'
import type { DemoRequest } from '@/types/forms'

export async function POST(req: NextRequest) {
  const body: DemoRequest = await req.json()

  // 1. Validate reCAPTCHA token (server-side call to Google)
  // 2. Sanitise inputs (strip HTML, trim whitespace)
  // 3. Forward to CRM webhook (HubSpot / Salesforce / custom)
  // 4. Send confirmation email via SendGrid / Resend
  // 5. Return success/error response

  // Rate limiting: 5 requests per IP per hour (use @vercel/kv or upstash/ratelimit)

  return NextResponse.json({ success: true, message: 'Demo request received.' })
}

// Schema validation: Zod
import { z } from 'zod'

const DemoRequestSchema = z.object({
  firstName: z.string().min(1).max(64),
  lastName: z.string().min(1).max(64),
  companyName: z.string().min(1).max(128),
  workEmail: z.string().email(),
  workPhone: z.string().max(32).optional(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']),
  primaryInterest: z.enum(['work', 'enterprise', 'education', 'life', 'health', 'all']),
  message: z.string().max(1000).optional(),
  locale: z.string().optional(),
  captchaToken: z.string().min(1),
})
```

### 3.2 News / Articles (Sanity Fetch)

```ts
// src/lib/sanity/queries.ts

export const NEWS_LIST_QUERY = `
  *[_type == "newsArticle" && locale == $locale] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    category,
    "author": author->{ name, "avatar": avatar.asset->url, role }
  }
`

export const NEWS_ARTICLE_QUERY = `
  *[_type == "newsArticle" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    category,
    "author": author->{ name, "avatar": avatar.asset->url, role },
    body,
    "relatedArticles": relatedArticles[]->{ _id, "slug": slug.current, title, "coverImage": coverImage.asset->url }
  }
`

export const PARTNER_LOGOS_QUERY = `
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    "logo": logo.asset->url,
    href,
    category,
    featured
  }
`
```

### 3.3 i18n Route Middleware

```ts
// src/middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\..*).*)'],
}
```

**`src/i18n/routing.ts`** — single source for locale config:

```ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh', 'zh-tw'],
  defaultLocale: 'en',
})
```

**`src/i18n/request.ts`** — maps locale → message file:

```ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

**`next.config.ts`** — plugin registration:

```ts
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
```

**`src/navigation.ts`** — typed locale-aware navigation helpers:

```ts
import { createNavigation } from 'next-intl/navigation'
import { routing } from './i18n/routing'

export const { Link, usePathname, useRouter, redirect, permanentRedirect } =
  createNavigation(routing)
```

**Locale switcher usage pattern**:

```ts
import { usePathname, useRouter } from '@/navigation'
import { useLocale } from 'next-intl'

const locale = useLocale()
const pathname = usePathname()
const router = useRouter()

router.replace(pathname, { locale: 'zh' })
```

> **Note:** Use `src/middleware.ts` for route middleware. If `src/proxy.ts` exists, treat it as a legacy artefact and remove it to avoid confusion.

---

## 4. Sanity CMS Schema (Content Studio)

### 4.1 News Article Schema

```ts
// sanity/schemas/newsArticle.ts
export default {
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (R: any) => R.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text', rows: 3 },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', type: 'datetime' },
    {
      name: 'category',
      type: 'string',
      options: { list: ['product', 'company', 'security', 'partnerships', 'awards'] },
    },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'locale', type: 'string', options: { list: ['en', 'zh', 'zh-tw'] } },
    { name: 'seo', type: 'seoMeta' },
  ],
}
```

### 4.2 Partner Schema

```ts
// sanity/schemas/partner.ts
export default {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'logo', type: 'image' },
    { name: 'href', type: 'url' },
    {
      name: 'category',
      type: 'string',
      options: { list: ['education', 'enterprise', 'technology', 'government'] },
    },
    { name: 'order', type: 'number' },
    { name: 'featured', type: 'boolean' },
  ],
}
```

---

## 5. Environment Variables

```bash
# .env.local

# Analytics (existing)
NEXT_PUBLIC_GA_ID=G-ML4Z1T6JT5

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=          # server-only write token

# reCAPTCHA (v3)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=      # server-only

# CRM Webhook (HubSpot example)
HUBSPOT_PORTAL_ID=
HUBSPOT_FORM_GUID=
HUBSPOT_API_KEY=           # server-only

# Email (Resend)
RESEND_API_KEY=            # server-only
RESEND_FROM_EMAIL=noreply@vvai.com

# Vercel KV (rate limiting)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# App URL
NEXT_PUBLIC_SITE_URL=https://www.vvai.com
```

---

## 6. i18n Message Keys (English baseline)

Three fully-parity files: `messages/en.json`, `messages/zh.json`, `messages/zh-tw.json`.

### Translation coverage

| Namespace      | Used by                                  | Status                              |
| -------------- | ---------------------------------------- | ----------------------------------- |
| `nav`          | `Navbar`, `Footer`                       | ✅ Wired up                         |
| `hero`         | `HeroSection`                            | ✅ Wired up                         |
| `pillars`      | `PillarsSection`                         | ✅ Wired up                         |
| `audience`     | `AudienceSplitSection`, `BannerSection`  | ✅ Wired up                         |
| `techPillars`  | `TechPillarsSection`                     | ✅ Wired up                         |
| `platform`     | `PlatformSection`                        | ✅ Wired up                         |
| `security`     | `SecuritySection`                        | ✅ Wired up                         |
| `partners`     | `PartnerSection`                         | ✅ Wired up                         |
| `testimonials` | `TestimonialsSection`                    | ✅ Wired up                         |
| `cta`          | `CtaSection`                             | ✅ Wired up                         |
| `footer`       | `Footer`                                 | ✅ Wired up                         |
| Sub-pages      | `/about`, `/pricing`, `/solutions`, etc. | ⚠️ Hardcoded English — Phase 7 task |

### Navigation label convention

`NAV_ITEMS` and `FOOTER_LINKS` in `src/data/navigation.ts` store **translation keys** as labels
(e.g. `'products'`, `'vvWork'`, `'ourStory'`). Components call `t(item.label)` via `useTranslations('nav')`.

### Full key structure (`messages/en.json`)

```json
{
  "nav": {
    "products": "Products",
    "solutions": "Solutions",
    "security": "Security",
    "pricing": "Pricing",
    "about": "About",
    "contact": "Contact",
    "bookDemo": "Book a Demo",
    "tryFree": "Try for Free",
    "login": "Log In",
    "ourStory": "Our Story",
    "news": "News",
    "contactVV": "Contact V V AI",
    "joinUs": "Join Us",
    "careers": "Careers",
    "support": "Support",
    "vvWork": "V V Work",
    "vvEducation": "V V Education",
    "vvLife": "V V Life",
    "vvHealth": "V V Health",
    "language": "Language",
    "switchLanguage": "Switch language"
  },
  "hero": {
    "headline": "V V AI Connects Enterprises and Individuals to Enable True Human–AI Collaboration and Co-creation",
    "subheadline": "Acting on Your Words. Redefining Connections.",
    "cta_primary": "Try for Free",
    "cta_secondary": "Book a Demo"
  },
  "pillars": {
    "title": "Powering Every Dimension of Your World",
    "work": {
      "label": "Work",
      "headline": "One-Stop Smart Collaboration Platform",
      "subline": "Connecting You to the \"V\" World of Intelligence",
      "keywords": "Smart · Convenient · Personalized · Collaborative"
    },
    "education": { "label": "Education", "headline": "...", "subline": "...", "keywords": "..." },
    "life":      { "label": "Life",      "headline": "...", "subline": "...", "keywords": "..." },
    "health":    { "label": "Health",    "headline": "...", "subline": "...", "keywords": "..." }
  },
  "audience": { "title": "...", "enterprise": { "..." }, "individual": { "..." } },
  "techPillars": { "label": "Core Technology", "title": "...", "items": [{ "..." }] },
  "platform":    { "label": "Platform", "title": "...", "subtitle": "...", "bullets": [] },
  "security":    { "label": "Security", "title": "...", "cards": [] },
  "partners":    { "label": "Partners", "title": "Co-Creating with 100+ Education Partners" },
  "testimonials": { "label": "Customers", "title": "What Our Customers Say", "subtitle": "..." },
  "cta": {
    "headline": "V V AI — Redefining Connections,",
    "headlineLine2": "Acting on Your Words",
    "bookDemo": "Book a Demo",
    "tryFree": "Try for Free"
  },
  "footer": {
    "tagline": "Redefining Connections, Acting on Your Words",
    "products": "Products",
    "company": "Company",
    "contact": "Contact",
    "security": "Security",
    "copyright": "©{year} V V TECHNOLOGY PTE. LTD., All rights reserved.",
    "terms": "Terms",
    "privacy": "Privacy"
  }
}
```

> `footer.copyright` uses ICU message format with a `{year}` parameter — call as `t('copyright', { year })`.
