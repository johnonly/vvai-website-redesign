import type { SuiteData } from '@/data/suites'
import { getTranslations } from 'next-intl/server'

interface SuiteSecurityBarProps {
  suite: SuiteData
}

interface Cert {
  label: string
  sub: string
}

export default async function SuiteSecurityBar({ suite }: SuiteSecurityBarProps) {
  const t = await getTranslations('products')
  const certs = t.raw('securityBar.certs') as Cert[]

  return (
    <section className="border-border-subtle bg-bg-base border-y py-10">
      <div className="content-container">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/* Label */}
          <p className="text-text-muted shrink-0 text-sm font-semibold tracking-widest uppercase">
            {t('securityBar.label')}
          </p>

          {/* Certs */}
          <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
            {certs.map((c) => (
              <div
                key={c.label}
                className="border-border-default bg-surface flex items-center gap-2 rounded-xl border px-4 py-2.5"
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: suite.accentColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="text-text-primary text-xs font-bold">{c.label}</p>
                  <p className="text-text-muted text-[10px]">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
