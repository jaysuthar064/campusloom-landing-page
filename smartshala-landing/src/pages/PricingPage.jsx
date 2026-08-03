import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import ClosingCta from '../components/ui/ClosingCta'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SmartLink from '../components/ui/SmartLink'

const toLines = (value) =>
  (value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

function PlanCard({ plan }) {
  return (
    <div
      className={`lift relative flex flex-col rounded-3xl p-8 ${
        plan.featured
          ? 'bg-brand text-white shadow-[0_30px_70px_-30px_rgba(0,71,253,0.7)]'
          : 'border border-hairline/70 bg-white'
      }`}
    >
      {plan.featured ? (
        <span className="absolute -top-3 left-8 rounded-full bg-ink px-4 py-1.5 text-[12px] font-semibold tracking-wide text-white">
          MOST POPULAR
        </span>
      ) : null}

      <h3 className={`text-[22px] font-bold ${plan.featured ? 'text-white' : 'text-ink'}`}>
        {plan.name}
      </h3>
      <p className={`mt-1 text-[14px] ${plan.featured ? 'text-white/75' : 'text-muted'}`}>
        {plan.audience}
      </p>

      <div className="mt-7 flex items-end gap-2">
        <span
          className={`text-[42px] leading-none font-bold ${
            plan.featured ? 'text-white' : 'text-ink'
          }`}
        >
          {plan.price}
        </span>
        <span className={`pb-1 text-[13.5px] ${plan.featured ? 'text-white/75' : 'text-muted'}`}>
          {plan.unit}
        </span>
      </div>

      <ul className="mt-7 flex grow flex-col gap-3.5">
        {toLines(plan.points).map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                plan.featured ? 'bg-white/20 text-white' : 'bg-brand-soft text-brand'
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span
              className={`text-[14.5px] leading-[1.55] ${
                plan.featured ? 'text-white/90' : 'text-ink'
              }`}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>

      {plan.cta_label ? (
        <SmartLink to={plan.cta_url || '/book-demo'}
          className={`press mt-8 inline-flex h-[52px] items-center justify-center rounded-xl text-[15.5px] font-semibold ${
            plan.featured
              ? 'bg-white text-brand hover:bg-white/90'
              : 'bg-brand text-white hover:bg-brand-hover'
          }`}
        >
          {plan.cta_label}
        </SmartLink>
      ) : null}
    </div>
  )
}

function PricingFaq({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <ul className="mx-auto mt-10 flex max-w-[820px] flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li
            key={i}
            className={`overflow-hidden rounded-2xl border bg-white ${
              isOpen ? 'border-brand/60' : 'border-hairline'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-4 px-6 py-5 text-left"
            >
              <span className="grow">
                <span className="block text-[16.5px] font-semibold text-ink">
                  {item.question}
                </span>
                {isOpen ? (
                  <span className="mt-2 block text-[14.5px] leading-[1.65] text-muted">
                    {item.answer}
                  </span>
                ) : null}
              </span>
              <ChevronDown
                size={19}
                className={`mt-1 shrink-0 text-brand transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function PricingPage() {
  return (
    <PageShell page="pricing">
      {(sections) => (
        <>
          <PageHero content={sections?.hero} />

          {/* Plans */}
          <section className="py-16 lg:py-20">
            <Container>
              {sections?.plans?.note ? (
                <p className="text-center text-[14px] text-muted">{sections.plans.note}</p>
              ) : null}

              <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
                {(sections?.plans?.items ?? []).map((plan, i) => (
                  <Reveal key={`${plan.name}-${i}`} delay={i * 90}>
                    <PlanCard plan={plan} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          {/* Included in every plan */}
          {sections?.included?.items?.length ? (
            <Reveal>
              <section className="bg-tint/60 py-16 lg:py-20">
                <Container>
                  <div className="text-center">
                    <h2 className="heading-tight text-[28px] font-bold text-ink lg:text-[38px]">
                      {sections.included.heading}
                    </h2>
                    <p className="mt-3 text-[16px] text-muted">
                      {sections.included.subheading}
                    </p>
                  </div>

                  <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {sections.included.items.map((item, i) => (
                      <li
                        key={`${item.title}-${i}`}
                        className="lift flex items-start gap-4 rounded-2xl bg-white p-6"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                          <Icon name={item.icon} size={22} />
                        </span>
                        <span>
                          <span className="block text-[16.5px] font-semibold text-ink">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-[14px] leading-[1.6] text-muted">
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

          {/* Pricing FAQ */}
          {sections?.faq?.items?.length ? (
            <Reveal>
              <section className="py-16 lg:py-20">
                <Container>
                  <h2 className="heading-tight text-center text-[28px] font-bold text-ink lg:text-[38px]">
                    {sections.faq.heading}
                  </h2>
                  <PricingFaq items={sections.faq.items} />
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
