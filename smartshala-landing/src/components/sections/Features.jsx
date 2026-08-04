import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

/**
 * Section 05 — Features grid.
 *
 * Five across, two rows on desktop. The security line sits centred beneath it.
 */
export default function Features({ content }) {
  if (!content) return null

  const items = content.items ?? []
  const footnote = content.footnote

  return (
    <section id="features" className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          line1={content.heading_line_1}
          line2={content.heading_line_2}
          highlight={content.heading_highlight}
          subheading={content.subheading}
        />

        {items.length ? (
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((item, i) => (
              <li
                key={`${item.title}-${i}`}
                className="lift rounded-2xl border border-hairline/70 bg-white p-6 hover:border-brand/30"
              >
                <span className="icon-pop mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-brand">
                  <Icon name={item.icon} size={23} />
                </span>
                <h3 className="text-[16.5px] font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {footnote?.title ? (
          <div className="mt-12 flex items-center justify-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Icon name={footnote.icon} size={21} />
            </span>
            <span className="leading-snug">
              <span className="block text-[16px] font-semibold text-ink">
                {footnote.title}
              </span>
              <span className="block text-[13.5px] text-muted">{footnote.caption}</span>
            </span>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
