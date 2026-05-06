/**
 * Typed navigation helpers — generated from the project's locale routing config.
 * Import Link, useRouter, usePathname, redirect from here (not from next/navigation)
 * whenever you need locale-aware navigation — e.g. in LocaleSwitcher.
 */
import { createNavigation } from 'next-intl/navigation'
import { routing } from './i18n/routing'

export const { Link, usePathname, useRouter, redirect, permanentRedirect } =
  createNavigation(routing)
