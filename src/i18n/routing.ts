import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh', 'zh-tw'],
  defaultLocale: 'en',
})
