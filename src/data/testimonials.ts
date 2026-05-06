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
