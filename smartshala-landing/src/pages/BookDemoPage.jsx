import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import LeadForm from '../components/ui/LeadForm'
import { DEMO_FIELDS } from '../lib/leadFields'

export default function BookDemoPage() {
  return (
    <PageShell page="book-demo">
      {(sections) => (
        <>
          <PageHero content={sections?.hero} />

          <section className="py-16 lg:py-20">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
                <Reveal>
                  <LeadForm
                    content={sections?.form}
                    fields={DEMO_FIELDS}
                    source="Demo request"
                  />
                </Reveal>

                <Reveal delay={120}>
                  <div>
                    {sections?.expect?.heading ? (
                      <h2 className="text-[22px] font-bold text-ink">
                        {sections.expect.heading}
                      </h2>
                    ) : null}

                    <ol className="mt-7 flex flex-col gap-6">
                      {(sections?.expect?.items ?? []).map((item, i) => (
                        <li key={`${item.title}-${i}`} className="flex gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tint text-brand">
                            <Icon name={item.icon} size={22} />
                          </span>
                          <span>
                            <span className="block text-[16.5px] font-semibold text-ink">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-[14.5px] leading-[1.6] text-muted">
                              {item.description}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>

                    {sections?.trust?.items?.length ? (
                      <ul className="mt-10 flex flex-col gap-3 border-t border-hairline pt-7">
                        {sections.trust.items.map((item, i) => (
                          <li
                            key={`${item.label}-${i}`}
                            className="flex items-center gap-3 text-[15px] text-ink"
                          >
                            <span className="text-brand">
                              <Icon name={item.icon} size={18} />
                            </span>
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        </>
      )}
    </PageShell>
  )
}
