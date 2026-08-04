import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

/**
 * Section 06 — Benefits.
 *
 * Sits on a tinted band with soft blue blurs bleeding in from the edges. The
 * cards differ from the feature grid: the icon sits beside the text in a round
 * chip, and each card is closed off with a short rule.
 */
export default function Benefits({ content }) {
  if (!content) return null

  const items = content.items ?? []

  return (
    <section className="relative overflow-hidden bg-tint/60 py-16 lg:py-24">
      {/* Ambient blurs — decorative only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-40 h-[420px] w-[420px] rounded-full bg-brand/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-32 h-[460px] w-[460px] rounded-full bg-brand/12 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          eyebrowIcon={content.eyebrow_icon}
          line1={content.heading_line_1}
          highlight={content.heading_highlight}
          highlightFirst
          subheading={content.subheading}
        />

        {items.length ? (
          <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li
                key={`${item.title}-${i}`}
                className="lift flex gap-5 rounded-2xl bg-white/85 p-7 shadow-[0_20px_50px_-30px_rgba(8,8,15,0.35)]"
              >
                <span className="icon-pop flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-brand-soft/70 text-brand">
                  <Icon name={item.icon} size={28} />
                </span>

                <span className="min-w-0">
                  <h3 className="text-[18px] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-muted">
                    {item.description}
                  </p>
                  <span aria-hidden="true" className="mt-5 block h-px w-24 bg-brand/25" />
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
