import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import ClosingCta from '../components/ui/ClosingCta'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'

/** Body copy is stored with a blank line between paragraphs. */
const toParagraphs = (value) =>
  (value ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

export default function AboutPage() {
  return (
    <PageShell page="about">
      {(sections) => (
        <>
          <PageHero content={sections?.hero} />

          {/* Story */}
          {sections?.story?.body ? (
            <Reveal>
              <section className="py-16 lg:py-20">
                <Container>
                  <div className="mx-auto max-w-[760px]">
                    <h2 className="heading-tight text-[28px] font-bold text-ink lg:text-[38px]">
                      {sections.story.heading}
                    </h2>
                    <div className="mt-6 flex flex-col gap-5">
                      {toParagraphs(sections.story.body).map((p, i) => (
                        <p key={i} className="text-[16.5px] leading-[1.75] text-muted">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </Container>
              </section>
            </Reveal>
          ) : null}

          {/* Numbers */}
          {sections?.stats?.items?.length ? (
            <Reveal>
              <section className="bg-tint/60 py-14 lg:py-16">
                <Container>
                  <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {sections.stats.items.map((stat, i) => (
                      <li key={`${stat.label}-${i}`} className="text-center">
                        <span className="block text-[38px] leading-none font-bold text-brand lg:text-[46px]">
                          {stat.value}
                        </span>
                        <span className="mt-3 block text-[14.5px] leading-[1.5] text-muted">
                          {stat.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Container>
              </section>
            </Reveal>
          ) : null}

          {/* Values */}
          {sections?.values?.items?.length ? (
            <Reveal>
              <section className="py-16 lg:py-24">
                <Container>
                  <div className="text-center">
                    <h2 className="heading-tight text-[28px] font-bold text-ink lg:text-[38px]">
                      {sections.values.heading}
                    </h2>
                    <p className="mt-3 text-[16px] text-muted">{sections.values.subheading}</p>
                  </div>

                  <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {sections.values.items.map((item, i) => (
                      <li
                        key={`${item.title}-${i}`}
                        className="lift flex gap-5 rounded-2xl border border-hairline/70 bg-white p-7"
                      >
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                          <Icon name={item.icon} size={25} />
                        </span>
                        <span>
                          <span className="block text-[18px] font-semibold text-ink">
                            {item.title}
                          </span>
                          <span className="mt-2 block text-[14.5px] leading-[1.65] text-muted">
                            {item.description}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Container>
              </section>
            </Reveal>
          ) : null}

          <Reveal>
            <ClosingCta content={sections?.cta} />
          </Reveal>
        </>
      )}
    </PageShell>
  )
}
