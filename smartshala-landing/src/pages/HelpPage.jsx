import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SmartLink from '../components/ui/SmartLink'

export default function HelpPage() {
  return (
    <PageShell page="help">
      {(sections) => (
        <>
          <PageHero content={sections?.hero} />

          {/* Topics */}
          <section className="py-16 lg:py-20">
            <Container>
              {sections?.topics?.heading ? (
                <h2 className="heading-tight text-center text-[28px] font-bold text-ink lg:text-[36px]">
                  {sections.topics.heading}
                </h2>
              ) : null}

              <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {(sections?.topics?.items ?? []).map((topic, i) => (
                  <li key={`${topic.title}-${i}`}>
                    <Reveal delay={i * 60}>
                      <SmartLink
                        to={topic.url || '/contact'}
                        className="lift flex h-full flex-col rounded-2xl border border-hairline/70 bg-white p-7 hover:border-brand/30"
                      >
                        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-brand">
                          <Icon name={topic.icon} size={23} />
                        </span>
                        <span className="block text-[17px] font-semibold text-ink">
                          {topic.title}
                        </span>
                        <span className="mt-2 block text-[14px] leading-[1.6] text-muted">
                          {topic.description}
                        </span>
                      </SmartLink>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </Container>
          </section>

          {/* Support */}
          {sections?.support?.heading ? (
            <Reveal>
              <section className="pb-20">
                <Container>
                  <div className="rounded-3xl bg-tint/70 px-8 py-12 text-center lg:px-14">
                    <h2 className="heading-tight text-[26px] font-bold text-ink lg:text-[34px]">
                      {sections.support.heading}
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.65] text-muted">
                      {sections.support.subheading}
                    </p>

                    <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {(sections.support.items ?? []).map((item, i) => (
                        <li key={`${item.title}-${i}`}>
                          <SmartLink
                            to={item.url || '/contact'}
                            className="lift flex flex-col items-center rounded-2xl bg-white px-6 py-7"
                          >
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                              <Icon name={item.icon} size={22} />
                            </span>
                            <span className="mt-4 block text-[13.5px] text-muted">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-[15.5px] font-semibold text-ink">
                              {item.value}
                            </span>
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Container>
              </section>
            </Reveal>
          ) : null}
        </>
      )}
    </PageShell>
  )
}
