import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import ClosingCta from '../components/ui/ClosingCta'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'

/** Band order and labels. Anything with an unknown group falls to the end. */
const GROUPS = [
  ['academics', 'Academics'],
  ['finance', 'Finance'],
  ['people', 'People'],
  ['operations', 'Operations'],
]

export default function ModulesPage() {
  return (
    <PageShell page="modules">
      {(sections) => {
        const items = sections?.list?.items ?? []
        const seen = new Set(GROUPS.map(([key]) => key))
        const bands = GROUPS.map(([key, label]) => [
          label,
          items.filter((m) => m.group === key),
        ])

        const ungrouped = items.filter((m) => !seen.has(m.group))
        if (ungrouped.length) bands.push(['More', ungrouped])

        return (
          <>
            <PageHero content={sections?.hero} />

            <section className="py-16 lg:py-24">
              <Container>
                <div className="flex flex-col gap-16">
                  {bands
                    .filter(([, group]) => group.length)
                    .map(([label, group]) => (
                      <Reveal key={label}>
                        <div>
                          <div className="flex items-center gap-4">
                            <h2 className="text-[22px] font-bold text-ink lg:text-[26px]">
                              {label}
                            </h2>
                            <span
                              aria-hidden="true"
                              className="h-px grow bg-hairline"
                            />
                            <span className="text-[13.5px] text-muted">
                              {group.length} module{group.length === 1 ? '' : 's'}
                            </span>
                          </div>

                          <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {group.map((item, i) => (
                              <li
                                key={`${item.title}-${i}`}
                                className="lift rounded-2xl border border-hairline/70 bg-white p-6 hover:border-brand/30"
                              >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-brand">
                                  <Icon name={item.icon} size={23} />
                                </span>
                                <h3 className="mt-5 text-[17.5px] font-semibold text-ink">
                                  {item.title}
                                </h3>
                                <p className="mt-2 text-[14px] leading-[1.65] text-muted">
                                  {item.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>
                    ))}
                </div>
              </Container>
            </section>

            <Reveal>
              <ClosingCta content={sections?.cta} />
            </Reveal>
          </>
        )
      }}
    </PageShell>
  )
}
