import { ArrowRight } from 'lucide-react'
import Container from './Container'
import SmartLink from './SmartLink'

/** The CTA band that closes every inner page. */
export default function ClosingCta({ content }) {
  if (!content?.heading) return null

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-tint/70 px-8 py-14 text-center lg:px-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-20 h-[340px] w-[340px] rounded-full bg-brand/12 blur-3xl"
          />

          <div className="relative">
            <h2 className="heading-tight text-[30px] font-bold text-ink lg:text-[42px]">
              {content.heading}
            </h2>

            {content.subheading ? (
              <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-[1.65] text-muted lg:text-[17px]">
                {content.subheading}
              </p>
            ) : null}

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {content.primary_label ? (
                <SmartLink to={content.primary_url || '#'}
                  className="press inline-flex h-[56px] items-center gap-3 rounded-full bg-brand px-9 text-[16.5px] font-semibold text-white shadow-[0_20px_44px_-20px_rgba(0,71,253,0.95)] hover:bg-brand-hover"
                >
                  {content.primary_label}
                  <ArrowRight size={20} />
                </SmartLink>
              ) : null}

              {content.secondary_label ? (
                <SmartLink to={content.secondary_url || '#'}
                  className="press inline-flex h-[56px] items-center rounded-full border-[1.5px] border-brand/60 px-9 text-[16.5px] font-semibold text-brand hover:bg-brand/5"
                >
                  {content.secondary_label}
                </SmartLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
