import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SmartLink from '../ui/SmartLink'

/**
 * Section 10 — Final CTA.
 *
 * Unlike the other headings, both lines here end in blue rather than one whole
 * line being highlighted, so this doesn't use SectionHeading.
 */
export default function FinalCta({ content }) {
  if (!content) return null

  const cta = content.cta
  const trust = content.trust_items ?? []

  return (
    <section id="demo" className="relative overflow-hidden py-16 lg:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-brand/12 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-[440px] w-[440px] rounded-full bg-brand/12 blur-3xl"
      />

      <Container className="relative text-center">
        {content.eyebrow ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-5 py-2 text-[13px] font-semibold tracking-[0.06em] text-brand">
            {content.eyebrow_icon ? <Icon name={content.eyebrow_icon} size={15} /> : null}
            {content.eyebrow}
          </span>
        ) : null}

        <h2 className="heading-tight mt-7 text-[40px] font-bold text-ink sm:text-[58px] lg:text-[72px]">
          <span className="block">
            {content.line_1_plain}{' '}
            <span className="text-brand">{content.line_1_blue}</span>
          </span>
          <span className="block">
            {content.line_2_plain}{' '}
            <span className="text-brand">{content.line_2_blue}</span>
          </span>
        </h2>

        {content.subheading ? (
          <p className="mx-auto mt-7 max-w-[700px] text-[17px] leading-[1.6] text-muted lg:text-[19px]">
            {content.subheading}
          </p>
        ) : null}

        {cta?.label ? (
          <div className="mt-10">
            <SmartLink to={cta.url || '#'}
              className="press inline-flex h-[68px] items-center gap-3.5 rounded-full bg-brand px-12 text-[20px] font-semibold text-white shadow-[0_22px_50px_-20px_rgba(0,71,253,0.95)] hover:bg-brand-hover"
            >
              {cta.label}
              <ArrowRight size={24} />
            </SmartLink>
          </div>
        ) : null}

        {trust.length ? (
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            {trust.map((item, i) => (
              <li
                key={`${item.label}-${i}`}
                className={`flex items-center gap-2.5 text-[15px] text-ink ${
                  i > 0 ? 'sm:border-l sm:border-hairline sm:pl-6' : ''
                }`}
              >
                <span className="text-brand">
                  <Icon name={item.icon} size={19} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
