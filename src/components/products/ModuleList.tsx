import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { getModulesForSuite, type ModuleGroup } from '@/data/modules'
import type { SuiteData } from '@/data/suites'
import { getTranslations } from 'next-intl/server'

type LabelColor = 'blue' | 'violet' | 'cyan' | 'green'

const accentColorMap: Record<string, LabelColor> = {
  '#5590F6': 'blue',
  '#22D3EE': 'cyan',
  '#8B5CF6': 'violet',
  '#10B981': 'green',
}

interface ModuleListProps {
  suite: SuiteData
}

export default async function ModuleList({ suite }: ModuleListProps) {
  const t = await getTranslations('products')
  const mt = await getTranslations('modules')
  const modules = getModulesForSuite(suite.id)
  const labelColor = accentColorMap[suite.accentColor] ?? 'blue'

  // Group modules
  const grouped = modules.reduce<Record<string, typeof modules>>((acc, mod) => {
    const key = mod.group
    if (!acc[key]) acc[key] = []
    acc[key].push(mod)
    return acc
  }, {})

  const groups = Object.entries(grouped)

  return (
    <section className="section-wrapper bg-bg-mid">
      <div className="content-container">
        {/* Header */}
        <ScrollReveal className="mb-14 text-center">
          <SectionLabel color={labelColor} className="mb-4">
            {t('moduleList.label')}
          </SectionLabel>
          <h2 className="text-section">
            {t('moduleList.headingCount', { count: modules.length })}{' '}
            <span className="gradient-text">{t('moduleList.headingGradient')}</span>
          </h2>
          <p className="text-text-secondary mx-auto mt-4 max-w-xl text-lg">
            {t('moduleList.body')}
          </p>
        </ScrollReveal>

        {/* Groups */}
        <div className="space-y-10">
          {groups.map(([group, mods], gi) => (
            <ScrollReveal key={group} delay={gi * 0.08}>
              <div>
                {/* Group label */}
                <h3 className="text-text-muted mb-4 text-sm font-bold tracking-widest uppercase">
                  {mt(`groups.${group as ModuleGroup}`)}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {mods.map((mod) => (
                    <GlassCard key={mod.id} hover className="flex items-start gap-3 p-4">
                      {/* Dot accent */}
                      <div
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{ background: suite.accentColor }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-text-primary truncate text-base font-semibold">
                            {mt(`items.${mod.id}.name`)}
                          </p>
                          {mod.isNew && (
                            <span
                              className="shrink-0 rounded-full px-1.5 py-0.5 text-xs font-bold uppercase"
                              style={{
                                background: `${suite.accentColor}22`,
                                color: suite.accentColor,
                              }}
                            >
                              {t('moduleList.new')}
                            </span>
                          )}
                        </div>
                        <p className="text-text-muted mt-0.5 text-sm leading-snug">
                          {mt(`items.${mod.id}.description`)}
                        </p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
