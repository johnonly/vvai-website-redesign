// ─── Navigation ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ─── Suites ────────────────────────────────────────────────────────────────────
export interface Suite {
  id: string
  pillar: 'work' | 'education' | 'life' | 'health'
  title: string
  description: string
  screenshotUrl: string
  colorClass: string
  accentColor: string
}

// ─── Modules ───────────────────────────────────────────────────────────────────
export interface Module {
  id: string
  suiteId: string
  name: string
  icon?: string
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  authorName: string
  authorOrg: string
  avatarUrl: string
  rating?: number
}

// ─── Partners ──────────────────────────────────────────────────────────────────
export interface Partner {
  id: string
  name: string
  logoUrl: string
  category?: string
}

// ─── Tech Pillar ───────────────────────────────────────────────────────────────
export interface TechPillar {
  number: string
  title: string
  body: string
}

// ─── Audience Features ─────────────────────────────────────────────────────────
export interface AudienceFeature {
  label: string
  sub: string
  icon?: string
}

// ─── Security Card ─────────────────────────────────────────────────────────────
export interface SecurityCard {
  title: string
  items: string[]
}

// ─── Platform Stat ─────────────────────────────────────────────────────────────
export interface PlatformStat {
  value: string
  label: string
  suffix?: string
}

// ─── Page Props (Next.js App Router) ──────────────────────────────────────────
export interface LocalePageProps {
  params: Promise<{ locale: string }>
}

export interface LocaleLayoutProps extends LocalePageProps {
  children: React.ReactNode
}
