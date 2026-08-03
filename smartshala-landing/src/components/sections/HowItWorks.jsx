import { ArrowRight, ChevronRight } from 'lucide-react'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SmartLink from '../ui/SmartLink'

/**
 * Section 07 — How It Works.
 *
 * Four steps in soft ovals, joined by a line with a chevron badge. Each oval
 * carries a big ghosted number behind its icon.
 */
export default function HowItWorks({ content }) {
  if (!content) return null

  const steps = content.steps ?? []
  const cta = content.cta
  const footnote = content.footnote

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <Container>
        {/* Logo lockup */}
        {content.brand_name ? (
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-brand text-[17px] font-bold text-white"
            >
              Ss
            </span>
            <span className="text-[26px] font-bold tracking-[-0.025em] text-ink">
              {content.brand_name}
            </span>
          </div>
        ) : null}

        <h2 className="heading-tight mt-5 text-center text-[38px] font-bold text-ink sm:text-[52px] lg:text-[62px]">
          {content.heading_line_1}{' '}
          <span className="text-brand">{content.heading_highlight}</span>
        </h2>

        {content.subheading ? (
          <p className="mt-4 text-center text-[17px] text-muted lg:text-[19px]">
            {content.subheading}
          </p>
        ) : null}

        {/* Steps */}
        {steps.length ? (
          <ol className="mt-12 flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center lg:gap-0">
            {steps.map((step, i) => (
              <li
                key={`${step.title}-${i}`}
                className="flex items-center lg:flex-1 lg:justify-center"
              >
                <div className="lift relative flex w-[264px] flex-col items-center rounded-[50%] bg-white px-8 py-12 text-center shadow-[0_24px_60px_-34px_rgba(8,8,15,0.35)] lg:w-auto lg:min-w-[240px]">
                  <span
                    aria-hidden="true"
                    className="text-[46px] leading-none font-bold text-brand/12"
                  >
                    {step.number}
                  </span>

                  <span className="-mt-3 text-brand">
                    <Icon name={step.icon} size={54} strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-3 text-[21px] font-bold text-ink">{step.title}</h3>
                  <span aria-hidden="true" className="mt-2 block h-[3px] w-6 rounded bg-brand" />

                  <p className="mt-3 max-w-[190px] text-[14px] leading-[1.55] text-muted">
                    {step.caption}
                  </p>
                </div>

                {/* Connector — not after the last step. */}
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 items-center lg:flex"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_6px_18px_-8px_rgba(8,8,15,0.4)]">
                      <ChevronRight size={18} className="text-brand" />
                    </span>
                    <span className="h-px w-8 bg-brand/45" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}

        {/* Button */}
        {cta?.label ? (
          <div className="mt-14 text-center">
            <SmartLink to={cta.url || '#'}
              className="press inline-flex h-[62px] items-center gap-3 rounded-full bg-brand px-11 text-[19px] font-semibold text-white shadow-[0_20px_44px_-20px_rgba(0,71,253,0.95)] hover:bg-brand-hover"
            >
              {cta.label}
              <ArrowRight size={22} />
            </SmartLink>
          </div>
        ) : null}

        {footnote?.text ? (
          <p className="mt-6 flex items-center justify-center gap-2.5 text-[16px] font-medium text-ink">
            <span className="text-brand">
              <Icon name={footnote.icon} size={20} />
            </span>
            {footnote.text}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
