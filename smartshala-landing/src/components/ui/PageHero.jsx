import { ArrowRight } from 'lucide-react'
import Container from './Container'
import SmartLink from './SmartLink'

/**
 * The header band every inner page opens with. Same visual language as the
 * home sections — eyebrow pill, two-line heading with the second line in blue.
 */
export default function PageHero({ content }) {
  if (!content) return null

  return (
    <section className="relative overflow-hidden bg-tint/50 pt-14 pb-16 lg:pt-20 lg:pb-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 h-[400px] w-[400px] rounded-full bg-brand/12 blur-3xl"
      />

      <Container className="relative text-center">
        {content.eyebrow ? (
          <span className="inline-flex items-center rounded-full bg-brand-soft px-5 py-2 text-[13px] font-semibold tracking-[0.06em] text-brand">
            {content.eyebrow}
          </span>
        ) : null}

        <h1 className="heading-tight mt-6 text-[38px] font-bold text-ink sm:text-[50px] lg:text-[62px]">
          <span className="block">{content.heading}</span>
          {content.heading_highlight ? (
            <span className="block text-brand">{content.heading_highlight}</span>
          ) : null}
        </h1>

        {content.subheading ? (
          <p className="mx-auto mt-6 max-w-[660px] text-[17px] leading-[1.65] text-muted lg:text-[18px]">
            {content.subheading}
          </p>
        ) : null}

        {content.primary_label ? (
          <SmartLink to={content.primary_url || '#'}
            className="press mt-9 inline-flex h-[58px] items-center gap-3 rounded-full bg-brand px-9 text-[17px] font-semibold text-white shadow-[0_20px_44px_-20px_rgba(0,71,253,0.95)] hover:bg-brand-hover"
          >
            {content.primary_label}
            <ArrowRight size={20} />
          </SmartLink>
        ) : null}
      </Container>
    </section>
  )
}
