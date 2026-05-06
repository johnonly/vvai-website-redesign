const CDN = '/images/vv'

export interface SuiteFeature {
  icon: string
  title: string
  description: string
}

export interface SuiteNotice {
  badge: string
  title: string
  description: string
}

export interface SuiteScreenshot {
  src?: string
  alt?: string
  position: 'primary' | 'secondary' | 'floating'
  device: 'desktop' | 'mobile' | 'tablet'
  headline?: string
  subtitle?: string
}

export interface SuiteData {
  id: string
  slug: string
  label: string
  headline: string
  subline: string
  sublineBullets?: [string, string]
  tagline: string
  keywords: string[]
  accentColor: string
  gradientFrom: string
  gradientTo: string
  colorClass: string
  href: string
  audience: 'enterprise' | 'personal' | 'both'
  heroImage: string
  heroImages?: Record<string, string>
  screenshots: SuiteScreenshot[]
  localeScreenshotSrcs?: Record<string, string[]>
  features: SuiteFeature[]
  ctaLabel: string
  releaseStatus?: 'available' | 'comingSoon'
  notice?: SuiteNotice
}

export const SUITES: SuiteData[] = [
  {
    id: 'work',
    slug: 'work',
    label: 'VV Work',
    headline: 'One-Stop Smart Collaboration Platform',
    subline: 'Connecting You to the "V" World of Intelligence',
    sublineBullets: [
      'AI-driven workflows that eliminate repetitive tasks and unlock team potential',
      'One unified platform for communication, documents, goals, and scheduling',
    ],
    tagline: 'Smart · Convenient · Personalized · Collaborative',
    keywords: ['Smart', 'Convenient', 'Personalized', 'Collaborative'],
    accentColor: '#5590F6',
    gradientFrom: '#5590F6',
    gradientTo: '#3b82f6',
    colorClass: 'from-brand-blue to-blue-500',
    href: '/products/work',
    audience: 'enterprise',
    heroImage: `${CDN}/V%20V%20Work/vv_work__banner_img_EN.png`,
    heroImages: {
      en: `${CDN}/V%20V%20Work/vv_work__banner_img_EN.png`,
      zh: `${CDN}/V%20V%20Work/vv_work__banner_img_cn.png`,
      'zh-tw': `${CDN}/V%20V%20Work/vv_work__banner_img_CNTW.png`,
    },
    localeScreenshotSrcs: {
      en: [
        `${CDN}/V%20V%20Work/vv_work_img_EN_1.png`,
        `${CDN}/V%20V%20Work/vv_work_img_EN_2.png`,
        `${CDN}/V%20V%20Work/vv_work_img_EN_3.png`,
        `${CDN}/V%20V%20Work/vv_work_img_EN_4.png`,
      ],
      zh: [
        `${CDN}/V%20V%20Work/vv_work_img_cn_1.png`,
        `${CDN}/V%20V%20Work/vv_work_img_cn_2.png`,
        `${CDN}/V%20V%20Work/vv_work_img_cn_3.png`,
        `${CDN}/V%20V%20Work/vv_work_img_cn_4.png`,
      ],
      'zh-tw': [
        `${CDN}/V%20V%20Work/vv_work_img_CNTW_1.png`,
        `${CDN}/V%20V%20Work/vv_work_img_CNTW_2.png`,
        `${CDN}/V%20V%20Work/vv_work_img_CNTW_3.png`,
        `${CDN}/V%20V%20Work/vv_work_img_CNTW_4.png`,
      ],
    },
    screenshots: [
      {
        src: `${CDN}/V%20V%20Work/vv_work_img_EN_1.png`,
        alt: 'Enterprise management overview',
        position: 'primary',
        device: 'desktop',
      },
      {
        src: `${CDN}/V%20V%20Work/vv_work_img_EN_2.png`,
        alt: 'HR management',
        position: 'secondary',
        device: 'desktop',
      },
      {
        src: `${CDN}/V%20V%20Work/vv_work_img_EN_3.png`,
        alt: 'Work management',
        position: 'secondary',
        device: 'desktop',
      },
      {
        src: `${CDN}/V%20V%20Work/vv_work_img_EN_4.png`,
        alt: 'Communication',
        position: 'secondary',
        device: 'desktop',
      },
    ],
    features: [
      {
        icon: '🤖',
        title: 'AI Work Agent',
        description:
          'Super-intelligent AI agent that automates workflows, drafts documents, and surfaces insights on demand.',
      },
      {
        icon: '🎯',
        title: 'OKR & Project Tracking',
        description:
          'Set goals, track milestones, and keep every team aligned with transparent real-time progress boards.',
      },
      {
        icon: '💬',
        title: 'Encrypted IM & Meetings',
        description:
          'End-to-end encrypted messaging, video conferencing, and smart room booking — all in one place.',
      },
      {
        icon: '👥',
        title: 'HR Management Suite',
        description:
          'Attendance, payroll, onboarding, performance reviews — the full employee lifecycle in one platform.',
      },
      {
        icon: '⚡',
        title: 'Smart Workflows',
        description:
          'Configurable approval flows and process automation that cut manual work by up to 60%.',
      },
      {
        icon: '📊',
        title: 'Live Analytics',
        description:
          'Real-time dashboards with AI-generated summaries so leadership always has the full picture.',
      },
    ],
    ctaLabel: 'Explore VV Work',
  },
  {
    id: 'education',
    slug: 'education',
    label: 'V V Education',
    headline: 'New AI-powered Collaborative Education Services',
    subline: 'Connecting You to the "V" World of Wisdom',
    tagline: 'Collaborative · Private · Efficient · Targeted',
    keywords: ['Collaborative', 'Private', 'Efficient', 'Targeted'],
    accentColor: '#22D3EE',
    gradientFrom: '#22D3EE',
    gradientTo: '#0ea5e9',
    colorClass: 'from-brand-cyan to-sky-500',
    href: '/products/education',
    audience: 'both',
    heroImage: `${CDN}/V%20V%20Education/vv_education_banner_img_EN.png`,
    heroImages: {
      en: `${CDN}/V%20V%20Education/vv_education_banner_img_EN.png`,
      zh: `${CDN}/V%20V%20Education/vv_education_banner_CN_img.png`,
      'zh-tw': `${CDN}/V%20V%20Education/vv_education_banner_img_CNTW.png`,
    },
    localeScreenshotSrcs: {
      en: [
        `${CDN}/V%20V%20Education/vv_education_img_EN_1.png`,
        `${CDN}/V%20V%20Education/vv_education_img_EN_2.png`,
        `${CDN}/V%20V%20Education/vv_education_img_EN_3.png`,
        `${CDN}/V%20V%20Education/vv_education_img_EN_4.png`,
      ],
      zh: [
        `${CDN}/V%20V%20Education/vv_education_img_CN_1.png`,
        `${CDN}/V%20V%20Education/vv_education_img_CN_2.png`,
        `${CDN}/V%20V%20Education/vv_education_img_CN_3.png`,
        `${CDN}/V%20V%20Education/vv_education_img_CN_4.png`,
      ],
      'zh-tw': [
        `${CDN}/V%20V%20Education/vv_education_img_CNTW_1.png`,
        `${CDN}/V%20V%20Education/vv_education_img__CNTW_2.png`,
        `${CDN}/V%20V%20Education/vv_education_img_CNTW_3.png`,
        `${CDN}/V%20V%20Education/vv_education_img_CNTW_4.png`,
      ],
    },
    screenshots: [
      {
        src: `${CDN}/V%20V%20Education/vv_education_img_EN_1.png`,
        alt: 'The Next Generation of School Management',
        position: 'primary',
        device: 'desktop',
        headline: 'The Next Generation of School Management: AI-Powered, Human-Connected',
        subtitle:
          'Powering education through AI—streamlining back-office operations and connecting headquarters to parents in one seamless ecosystem.',
      },
      {
        src: `${CDN}/V%20V%20Education/vv_education_img_EN_2.png`,
        alt: 'All-in-One Operating System',
        position: 'secondary',
        device: 'mobile',
        headline: 'The All-in-One Operating System Driving Growth and Efficiency',
        subtitle:
          'Streamline the entire school enrollment lifecycle—from branding, sign-ups and billing to after-enrollment support—with AI-powered automation.',
      },
      {
        src: `${CDN}/V%20V%20Education/vv_education_img_EN_3.png`,
        alt: 'B2C Smart Teaching and Learning',
        position: 'secondary',
        device: 'desktop',
        headline: 'B2C Smart Teaching and Learning',
        subtitle:
          'Empower educators and inspire students with an AI-integrated LMS that automates lesson scheduling, teaching planning, personalizes study paths, and provides 24/7 intelligent tutoring assistants.',
      },
      {
        src: `${CDN}/V%20V%20Education/vv_education_img_EN_4.png`,
        alt: 'Home-School Smart IM Communication',
        position: 'secondary',
        device: 'mobile',
        headline: 'Home-School Smart IM Communication',
        subtitle:
          'Bridge the gap with an AI-powered IM ecosystem that delivers real-time student updates, automated event reminders, and instant multilingual translation for seamless parent-teacher collaboration.',
      },
    ],
    features: [
      {
        icon: '🏫',
        title: 'Home-School Collaboration',
        description:
          'Bridge the gap between institutions and families with real-time updates, messages, and shared learning plans.',
      },
      {
        icon: '🧠',
        title: 'AI Tutor',
        description:
          "Personalised AI-powered learning assistance that adapts to each student's pace and unique style.",
      },
      {
        icon: '📋',
        title: 'Class Management',
        description:
          'Scheduling, attendance tracking, homework distribution, and grade management — all automated.',
      },
      {
        icon: '📈',
        title: 'Learning Reports',
        description:
          'Periodic AI-generated progress reports for parents, students, and educators across multiple institutions.',
      },
      {
        icon: '🛒',
        title: 'Course Sales Platform',
        description:
          'Built-in enrollment, payment, and referral management tools to grow your education business.',
      },
      {
        icon: '🔔',
        title: 'Smart Notifications',
        description:
          'Automated alerts keep parents, students, and teachers informed — without the information overload.',
      },
    ],
    ctaLabel: 'Explore V V Education',
  },
  {
    id: 'life',
    slug: 'life',
    label: 'V V Life',
    headline: 'Your Personal and Reliable Smart Lifestyle Planner',
    subline: 'Connecting You to the "V" World of Convenience',
    sublineBullets: [
      'A proactive AI companion that organises your daily tasks, services, and plans',
      'Seamlessly connected lifestyle services — dining, travel, finance, and more',
    ],
    tagline: 'Digital · Convenient · Comprehensive · Connected',
    keywords: ['Digital', 'Convenient', 'Comprehensive', 'Connected'],
    accentColor: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#6d28d9',
    colorClass: 'from-brand-violet to-purple-700',
    href: '/products/life',
    audience: 'personal',
    releaseStatus: 'comingSoon',
    heroImage: `${CDN}/V%20V%20Life/vv_life_banner_img.png`,
    localeScreenshotSrcs: {
      en: [
        `${CDN}/V%20V%20Life/vv_life_img_en_1.png`,
        `${CDN}/V%20V%20Life/vv_life_img_en_2.png`,
        `${CDN}/V%20V%20Life/vv_life_img_en_3.png`,
        `${CDN}/V%20V%20Life/vv_life_img_en_4.png`,
      ],
      zh: [
        `${CDN}/V%20V%20Life/vv_life_img_cn_1.png`,
        `${CDN}/V%20V%20Life/vv_life_img_cn_2.png`,
        `${CDN}/V%20V%20Life/vv_life_img_cn_3.png`,
        `${CDN}/V%20V%20Life/vv_life_img_cn_4.png`,
      ],
      'zh-tw': [
        `${CDN}/V%20V%20Life/vv_life_img_CNTW_1.png`,
        `${CDN}/V%20V%20Life/vv_life_img_cntw_2.png`,
        `${CDN}/V%20V%20Life/vv_life_img_cntw_3.png`,
        `${CDN}/V%20V%20Life/vv_life_img_CNTW_4.png`,
      ],
    },
    screenshots: [
      {
        src: `${CDN}/V%20V%20Life/vv_life_img_en_1.png`,
        alt: 'Life assistant home',
        position: 'primary',
        device: 'mobile',
      },
      {
        src: `${CDN}/V%20V%20Life/vv_life_img_en_2.png`,
        alt: 'Life services',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/V%20V%20Life/vv_life_img_en_3.png`,
        alt: 'Personal planner',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/V%20V%20Life/vv_life_img_en_4.png`,
        alt: 'Life calendar',
        position: 'secondary',
        device: 'mobile',
      },
    ],
    features: [
      {
        icon: '✨',
        title: 'AI Life Assistant',
        description:
          'A proactive digital companion that anticipates your needs and acts on your words before you ask.',
      },
      {
        icon: '🍽️',
        title: 'Dining & Travel',
        description:
          'Smart restaurant discovery, reservation management, trip itineraries, and local service access.',
      },
      {
        icon: '📅',
        title: 'Life Calendar',
        description:
          'Personal and family scheduling unified in one view — work, social, health, and learning events.',
      },
      {
        icon: '🌐',
        title: 'Connected Services',
        description:
          'One-click access to a curated ecosystem of lifestyle services including finance, transport, and home.',
      },
      {
        icon: '🔒',
        title: 'Private & Secure',
        description:
          'Your personal data stays private. End-to-end encryption keeps every activity and preference protected.',
      },
      {
        icon: '🌙',
        title: 'Invisible Companion',
        description:
          "Runs quietly in the background, surfaces smart suggestions exactly when you need them, never when you don't.",
      },
    ],
    ctaLabel: 'Explore VV Life',
  },
  {
    id: 'health',
    slug: 'health',
    label: 'VV Health',
    headline: 'Your Reliable, Quick-Response Health Manager',
    subline: 'Connecting You to the "V" World of Health',
    sublineBullets: [
      'Real-time health monitoring with AI-powered insights and early risk alerts',
      'Instant access to healthcare resources, appointments, and wellness support',
    ],
    tagline: 'Smart · Reliable · Caring · Collaborative',
    keywords: ['Smart', 'Reliable', 'Caring', 'Collaborative'],
    accentColor: '#10B981',
    gradientFrom: '#10B981',
    gradientTo: '#059669',
    colorClass: 'from-brand-green to-emerald-600',
    href: '/products/health',
    audience: 'personal',
    releaseStatus: 'comingSoon',
    heroImage: `${CDN}/V%20V%20Health/vv_health_img_en_1.png`,
    heroImages: {
      en: `${CDN}/V%20V%20Health/vv_health_img_en_1.png`,
      zh: `${CDN}/V%20V%20Health/vv_health_banner_CN_img.png`,
      'zh-tw': `${CDN}/V%20V%20Health/vv_health_img_cntw_1.png`,
    },
    localeScreenshotSrcs: {
      en: [
        `${CDN}/V%20V%20Health/vv_health_img_en_1.png`,
        `${CDN}/V%20V%20Health/vv_health_img_en_2.png`,
        `${CDN}/V%20V%20Health/vv_health_img_en_3.png`,
        `${CDN}/V%20V%20Health/vv_health_img_en_4.png`,
      ],
      zh: [
        `${CDN}/V%20V%20Health/vv_health_img_CN_1.png`,
        `${CDN}/V%20V%20Health/vv_health_img_CN_2.png`,
        `${CDN}/V%20V%20Health/vv_health_img_CN_3.png`,
        `${CDN}/V%20V%20Health/vv_health_img_CN_4.png`,
      ],
      'zh-tw': [
        `${CDN}/V%20V%20Health/vv_health_img_cntw_1.png`,
        `${CDN}/V%20V%20Health/vv_health_img_cntw_2.png`,
        `${CDN}/V%20V%20Health/vv_health_img_cntw_3.png`,
        `${CDN}/V%20V%20Health/vv_health_img_cntw_4.png`,
      ],
    },
    screenshots: [
      {
        src: `${CDN}/V%20V%20Health/vv_health_img_en_1.png`,
        alt: 'Health overview dashboard',
        position: 'primary',
        device: 'mobile',
      },
      {
        src: `${CDN}/V%20V%20Health/vv_health_img_en_2.png`,
        alt: 'Health metric tracking',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/V%20V%20Health/vv_health_img_en_3.png`,
        alt: 'Appointment booking',
        position: 'secondary',
        device: 'mobile',
      },
      {
        src: `${CDN}/V%20V%20Health/vv_health_img_en_4.png`,
        alt: 'Health manager',
        position: 'secondary',
        device: 'mobile',
      },
    ],
    features: [
      {
        icon: '❤️',
        title: 'Health Overview',
        description:
          'A comprehensive health dashboard that aggregates all your metrics, records, and appointments in one view.',
      },
      {
        icon: '📆',
        title: 'Appointment Booking',
        description:
          'Quick and easy doctor booking with intelligent scheduling that respects your availability.',
      },
      {
        icon: '📁',
        title: 'Health Records',
        description:
          'Centralised and secure storage for all medical history, test results, prescriptions, and documents.',
      },
      {
        icon: '⚠️',
        title: 'AI Risk Detection',
        description:
          'Pattern-based AI alerts that identify health risks early — prevention is better than cure.',
      },
      {
        icon: '🤝',
        title: 'Care Coordination',
        description:
          'Connect seamlessly with healthcare providers, family caregivers, and specialists within the platform.',
      },
      {
        icon: '📚',
        title: 'Health Resources',
        description:
          'Curated, reliable health education content that empowers you to make informed wellness decisions.',
      },
    ],
    ctaLabel: 'Explore VV Health',
  },
]

export function getSuiteBySlug(slug: string): SuiteData | undefined {
  return SUITES.find((s) => s.slug === slug)
}
