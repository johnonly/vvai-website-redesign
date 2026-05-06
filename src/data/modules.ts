export interface ProductModule {
  id: string
  name: string
  description: string
  group: ModuleGroup
  icon?: string
  isNew?: boolean
  suites: string[]
}

export type ModuleGroup =
  | 'hr-management'
  | 'enterprise-management'
  | 'work-management'
  | 'communication'
  | 'ai-tools'
  | 'education'
  | 'life'
  | 'health'

export const MODULES: ProductModule[] = [
  // ── HR Management ──────────────────────────────────────────────
  {
    id: 'attendance',
    name: 'Attendance',
    description: 'Intelligent Time Attendance Tracking',
    group: 'hr-management',
    suites: ['work'],
  },
  {
    id: 'salary',
    name: 'Salary',
    description: 'Core Payroll Data Integration',
    group: 'hr-management',
    suites: ['work'],
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Multi-dimensional Performance Management',
    group: 'hr-management',
    suites: ['work'],
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    description: 'Eliminate Data Fragmentation, Centralize Data',
    group: 'hr-management',
    suites: ['work'],
  },
  {
    id: 'confirmation',
    name: 'Confirmation',
    description: 'Provide Insights & Support Decision Making',
    group: 'hr-management',
    suites: ['work'],
  },
  {
    id: 'staff-transfer',
    name: 'Staff Transfer',
    description: 'Convenient & Efficient Job Transfers',
    group: 'hr-management',
    suites: ['work'],
  },
  {
    id: 'resignations',
    name: 'Resignations',
    description: 'Seamless Digital Service Integration',
    group: 'hr-management',
    suites: ['work'],
  },

  // ── Enterprise Management ───────────────────────────────────────
  {
    id: 'organization',
    name: 'Organization',
    description: 'Clear Structure, Easy Adjustment',
    group: 'enterprise-management',
    suites: ['work'],
  },
  {
    id: 'company',
    name: 'Company',
    description: 'Agile Global Enterprise Management',
    group: 'enterprise-management',
    suites: ['work'],
  },
  {
    id: 'workflow',
    name: 'Workflow',
    description: 'Intelligent Processes & Efficient Approval',
    group: 'enterprise-management',
    suites: ['work'],
  },
  {
    id: 'policy',
    name: 'Policy',
    description: 'Flexible Configuration & Convenient Management',
    group: 'enterprise-management',
    suites: ['work'],
  },
  {
    id: 'office-supplies',
    name: 'Office Supplies',
    description: 'Resource Management & Cost Control',
    group: 'enterprise-management',
    suites: ['work'],
  },
  {
    id: 'contracts',
    name: 'Contracts',
    description: 'Smart Contract Management to Empower Business',
    group: 'enterprise-management',
    suites: ['work'],
  },
  {
    id: 'employees',
    name: 'Employees',
    description: 'Integrated Data Management',
    group: 'enterprise-management',
    suites: ['work'],
  },
  {
    id: 'access-rights',
    name: 'Access Rights',
    description: 'Flexible & Secure Management',
    group: 'enterprise-management',
    suites: ['work'],
  },

  // ── Work Management ─────────────────────────────────────────────
  {
    id: 'okr',
    name: 'Objective (OKR)',
    description: 'Goal Breakdown, Result-Oriented',
    group: 'work-management',
    suites: ['work'],
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Integrated Task Management',
    group: 'work-management',
    suites: ['work'],
  },
  {
    id: 'tasks',
    name: 'Tasks',
    description: 'Transparent Work & Data Quantification',
    group: 'work-management',
    suites: ['work'],
  },
  {
    id: 'tickets',
    name: 'Tickets',
    description: 'Problem Tracking & Closed-loop Management',
    group: 'work-management',
    suites: ['work'],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Real-time Team Data Management',
    group: 'work-management',
    suites: ['work'],
  },

  // ── Communication & Collaboration ───────────────────────────────
  {
    id: 'im',
    name: 'IM',
    description: 'Timely & Efficient Information Delivery',
    group: 'communication',
    suites: ['work', 'education'],
  },
  {
    id: 'meetings',
    name: 'Meetings',
    description: 'Video conferencing & teleconferencing',
    group: 'communication',
    suites: ['work', 'education'],
  },
  {
    id: 'meeting-rooms',
    name: 'Meeting Rooms',
    description: 'Smart room management',
    group: 'communication',
    suites: ['work'],
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Scheduling & coordination',
    group: 'communication',
    suites: ['work', 'education', 'life'],
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Business email integration',
    group: 'communication',
    suites: ['work'],
  },
  {
    id: 'document',
    name: 'Document',
    description: 'Online document collaboration',
    group: 'communication',
    suites: ['work'],
  },
  {
    id: 'board',
    name: 'Board',
    description: 'Visual project boards',
    group: 'communication',
    suites: ['work'],
  },
  {
    id: 'microdisk',
    name: 'MicroDisk',
    description: 'Cloud storage',
    group: 'communication',
    suites: ['work'],
  },
  {
    id: 'multilingual',
    name: 'Multilingual',
    description: 'Real-time translation',
    group: 'communication',
    suites: ['work', 'education'],
  },

  // ── AI Tools ────────────────────────────────────────────────────
  {
    id: 'ai-work-agent',
    name: 'AI Work Agent',
    description: 'Super-intelligent AI work agent',
    group: 'ai-tools',
    suites: ['work'],
    isNew: true,
  },
  {
    id: 'recruitment',
    name: 'Recruitment',
    description: 'Global Recruitment Management',
    group: 'ai-tools',
    suites: ['work'],
  },
  {
    id: 'feedback',
    name: 'Feedback Expert',
    description: 'AI Review Management',
    group: 'ai-tools',
    suites: ['work'],
  },
  {
    id: 'ai-tutor',
    name: 'AI Tutor',
    description: 'Personalized AI tutoring for every learner',
    group: 'ai-tools',
    suites: ['education'],
    isNew: true,
  },
  {
    id: 'ai-study-companion',
    name: 'AI Study Companion',
    description: 'Always-on study support for practice and revision',
    group: 'ai-tools',
    suites: ['education'],
  },
  {
    id: 'customer-svc',
    name: 'AI Customer Service',
    description: 'AI-powered service for parent and student inquiries',
    group: 'ai-tools',
    suites: ['work', 'education'],
  },
  {
    id: 'data-expert',
    name: 'Data Expert',
    description: 'AI Business Intelligence',
    group: 'ai-tools',
    suites: ['work'],
  },
  {
    id: 'evaluation',
    name: 'Evaluation Expert',
    description: 'Assessment & Analytics',
    group: 'ai-tools',
    suites: ['work'],
  },
  {
    id: 'process-expert',
    name: 'Process Expert',
    description: 'Workflow Automation',
    group: 'ai-tools',
    suites: ['work'],
  },

  // ── Education ───────────────────────────────────────────────────
  {
    id: 'class-mgmt',
    name: 'Class Management',
    description: 'Schedule, track, and manage classes with ease',
    group: 'education',
    suites: ['education'],
  },
  {
    id: 'student-profile',
    name: 'Student Profiles',
    description: 'Comprehensive learner records & progress tracking',
    group: 'education',
    suites: ['education'],
  },
  {
    id: 'homework',
    name: 'Homework',
    description: 'Digital assignment distribution & submission',
    group: 'education',
    suites: ['education'],
  },
  {
    id: 'learning-report',
    name: 'Learning Reports',
    description: 'Periodic progress analytics for parents & staff',
    group: 'education',
    suites: ['education'],
  },
  {
    id: 'course-sales',
    name: 'Course Sales',
    description: 'Streamlined enrollment & payment platform',
    group: 'education',
    suites: ['education'],
  },
  {
    id: 'notifications',
    name: 'Smart Notifications',
    description: 'Automated alerts for parents, students, teachers',
    group: 'education',
    suites: ['education'],
  },

  // ── Life ────────────────────────────────────────────────────────
  {
    id: 'life-assistant',
    name: 'AI Life Assistant',
    description: 'Proactive personal suggestions & smart reminders',
    group: 'life',
    suites: ['life'],
    isNew: true,
  },
  {
    id: 'dining',
    name: 'Dining',
    description: 'Restaurant discovery & reservation management',
    group: 'life',
    suites: ['life'],
  },
  {
    id: 'travel',
    name: 'Travel',
    description: 'Trip planning & itinerary management',
    group: 'life',
    suites: ['life'],
  },
  {
    id: 'life-calendar',
    name: 'Life Calendar',
    description: 'Personal & family scheduling in one place',
    group: 'life',
    suites: ['life'],
  },
  {
    id: 'services',
    name: 'Life Services',
    description: 'One-click access to curated local services',
    group: 'life',
    suites: ['life'],
  },
  {
    id: 'finance',
    name: 'Personal Finance',
    description: 'Expense tracking & budget management',
    group: 'life',
    suites: ['life'],
  },

  // ── Health ──────────────────────────────────────────────────────
  {
    id: 'health-overview',
    name: 'Health Overview',
    description: 'Comprehensive health dashboard & metrics',
    group: 'health',
    suites: ['health'],
  },
  {
    id: 'appointments',
    name: 'Appointments',
    description: 'Quick doctor booking & appointment management',
    group: 'health',
    suites: ['health'],
  },
  {
    id: 'health-records',
    name: 'Health Records',
    description: 'Centralised medical history & documents',
    group: 'health',
    suites: ['health'],
  },
  {
    id: 'risk-detection',
    name: 'Risk Detection',
    description: 'AI-powered health alerts & prevention insights',
    group: 'health',
    suites: ['health'],
    isNew: true,
  },
  {
    id: 'care-coord',
    name: 'Care Coordination',
    description: 'Connect with healthcare providers seamlessly',
    group: 'health',
    suites: ['health'],
  },
  {
    id: 'health-resources',
    name: 'Health Resources',
    description: 'Curated educational health content library',
    group: 'health',
    suites: ['health'],
  },
]

export const MODULE_GROUPS: Record<ModuleGroup, string> = {
  'hr-management': 'HR Management',
  'enterprise-management': 'Enterprise Management',
  'work-management': 'Work Management',
  communication: 'Communication & Collaboration',
  'ai-tools': 'AI Tools',
  education: 'Education',
  life: 'Life',
  health: 'Health',
}

export function getModulesForSuite(suiteId: string): ProductModule[] {
  return MODULES.filter((m) => m.suites.includes(suiteId))
}
