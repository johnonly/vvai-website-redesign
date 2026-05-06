import type { NavItem } from '@/types'

const CDN = '/images/vv'

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'products',
    href: '/products',
    children: [
      { label: 'vvWork', href: '/products/work' },
      { label: 'vvEducation', href: '/products/education' },
      { label: 'vvLife', href: '/products/life' },
      { label: 'vvHealth', href: '/products/health' },
    ],
  },
  { label: 'solutions', href: '/solutions' },
  { label: 'security', href: '/security' },
  { label: 'pricing', href: '/pricing' },
  {
    label: 'about',
    href: '/about',
    children: [
      { label: 'ourStory', href: '/about' },
      { label: 'news', href: '/about/news' },
      { label: 'joinUs', href: '/join' },
    ],
  },
  { label: 'contact', href: '/contact' },
]

export const FOOTER_LINKS = {
  products: [
    { label: 'vvWork', href: '/products/work' },
    { label: 'vvEducation', href: '/products/education' },
    { label: 'vvLife', href: '/products/life' },
    { label: 'vvHealth', href: '/products/health' },
  ],
  company: [
    { label: 'ourStory', href: '/about' },
    { label: 'news', href: '/about/news' },
    { label: 'careers', href: '/join' },
    { label: 'security', href: '/security' },
  ],
  contact: [
    { label: 'contactVV', href: '/contact' },
    { label: 'bookDemo', href: '/demo' },
    { label: 'support', href: '/support' },
  ],
}

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/vv-technology', icon: 'linkedin' },
  { label: 'Twitter', href: 'https://twitter.com/vvtechnology', icon: 'twitter' },
  { label: 'Facebook', href: 'https://facebook.com/vvtechnology', icon: 'facebook' },
]

export { CDN }
