import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SmartLink from '../components/ui/SmartLink'
import LeadForm from '../components/ui/LeadForm'
import { CONTACT_FIELDS } from '../lib/leadFields'

export default function ContactPage() {
  return (
    <PageShell page="contact">
      {(sections) => (
        <>
          <PageHero content={sections?.hero} />

          <section className="py-16 lg:py-20">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
                <Reveal>
                  <LeadForm
                    content={sections?.form}
                    fields={CONTACT_FIELDS}
                    source="Contact"
                    messageLabel="Your message"
                    messagePlaceholder="Tell us what you need help with…"
                  />
                </Reveal>

                <Reveal delay={120}>
                  <div>
                    {sections?.details?.heading ? (
                      <h2 className="text-[22px] font-bold text-ink">
                        {sections.details.heading}
                      </h2>
                    ) : null}

                    <ul className="mt-7 flex flex-col gap-5">
                      {(sections?.details?.items ?? []).map((item, i) => {
                        const body = (
                          <>
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tint text-brand">
                              <Icon name={item.icon} size={21} />
                            </span>
                            <span>
                              <span className="block text-[13.5px] text-muted">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block text-[16px] font-semibold text-ink">
                                {item.value}
                              </span>
                            </span>
                          </>
                        )

                        return (
                          <li key={`${item.title}-${i}`}>
                            {item.url ? (
                              <SmartLink
                                to={item.url}
                                className="lift flex items-center gap-4 rounded-2xl border border-hairline/70 bg-white p-5 hover:border-brand/30"
                              >
                                {body}
                              </SmartLink>
                            ) : (
                              <div className="flex items-center gap-4 rounded-2xl border border-hairline/70 bg-white p-5">
                                {body}
                              </div>
                            )}
                          </li>
                        )
                      })}
                    </ul>

                    {sections?.details?.hours_value ? (
                      <div className="mt-8 rounded-2xl bg-tint/70 p-6">
                        <p className="text-[14px] font-semibold text-ink">
                          {sections.details.hours_title}
                        </p>
                        <p className="mt-1.5 text-[14.5px] text-muted">
                          {sections.details.hours_value}
                        </p>
                        {sections.details.support_note ? (
                          <p className="mt-3 border-t border-hairline pt-3 text-[13.5px] leading-[1.6] text-muted">
                            {sections.details.support_note}
                          </p>
                        ) : null}
                      </div>
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
