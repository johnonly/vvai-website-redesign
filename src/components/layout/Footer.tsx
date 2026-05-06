import { FOOTER_LINKS, SOCIAL_LINKS } from '@/data/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  const tNav = useTranslations('nav')
  const tFooter = useTranslations('footer')

  return (
    <footer className="bg-bg-base border-border-subtle border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center">
              <Image
                src="/images/vv/Logo (1).png"
                alt="V V AI"
                width={120}
                height={40}
                className="object-contain"
                style={{ height: 'auto' }}
              />
            </Link>
            <p className="text-text-secondary mb-6 max-w-xs text-sm">{tFooter('tagline')}</p>
            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="border-border-default text-text-secondary hover:border-border-default/80 hover:text-text-primary flex h-9 w-9 items-center justify-center rounded-lg border transition-all"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-text-muted mb-4 text-xs font-semibold tracking-widest uppercase">
              {tFooter('products')}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.products.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                  >
                    {tNav(l.label as Parameters<typeof tNav>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-text-muted mb-4 text-xs font-semibold tracking-widest uppercase">
              {tFooter('company')}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                  >
                    {tNav(l.label as Parameters<typeof tNav>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-muted mb-4 text-xs font-semibold tracking-widest uppercase">
              {tFooter('contact')}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.contact.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                  >
                    {tNav(l.label as Parameters<typeof tNav>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border-subtle flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row">
          <p className="text-text-muted text-xs">{tFooter('copyright', { year })}</p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-text-muted hover:text-text-primary text-xs transition-colors"
            >
              {tFooter('terms')}
            </Link>
            <Link
              href="/privacy"
              className="text-text-muted hover:text-text-primary text-xs transition-colors"
            >
              {tFooter('privacy')}
            </Link>
            <Link
              href="/security"
              className="text-text-muted hover:text-text-primary text-xs transition-colors"
            >
              {tFooter('security')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'linkedin') {
    return (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
  if (icon === 'twitter') {
    return (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }
  if (icon === 'facebook') {
    return (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  }
  return null
}
