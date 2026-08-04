import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import CountUp from '../ui/CountUp'

/**
 * Section 03 — Trust & stats.
 *
 * A row of six school logo cards, then four headline numbers.
 *
 * The crests are illustrations lifted from the artboard. They fall back by
 * position, so a school added in the CMS beyond the sixth simply has no crest
 * until one is uploaded for it.
 */
const FALLBACK_CRESTS = [
  '/schools/greenwood.png',
  '/schools/maple-heights.png',
  '/schools/st-josephs.png',
  '/schools/lotus-valley.png',
  '/schools/victoria.png',
  '/schools/cambridge.png',
]

export default function TrustStats({ content }) {
  if (!content) return null

  const { schools = [], stats = [] } = content

  return (
    <section className="pt-4 pb-20">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          line1={content.heading_line_1}
          highlight={content.heading_highlight}
          line2={content.heading_line_2}
          highlightFirst
          subheading={content.subheading}
        />

        {schools.length ? (
          <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {schools.map((school, i) => {
              const crest = school.logo?.url || FALLBACK_CRESTS[i]
              return (
                <li
                  key={`${school.name}-${i}`}
                  className="lift flex flex-col items-center justify-center rounded-2xl border border-hairline/70 bg-white px-4 py-8 text-center"
                >
                  {crest ? (
                    <img
                      src={crest}
                      alt={school.logo?.alt || school.name || ''}
                      className="mb-4 h-[72px] w-auto object-contain"
                      loading="lazy"
                    />
                  ) : null}
                  <p className="text-[17px] font-bold text-ink">{school.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">{school.subtitle}</p>
                </li>
              )
            })}
          </ul>
        ) : null}

        {stats.length ? (
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <li
                key={`${stat.label}-${i}`}
                className="lift flex items-center gap-4 rounded-2xl bg-tint/70 px-6 py-6"
              >
                <span className="icon-pop flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Icon name={stat.icon} size={26} />
                </span>
                <span>
                  <CountUp
                    value={stat.value}
                    className="block text-[30px] leading-none font-bold text-brand"
                  />
                  <span className="mt-1.5 block text-[15px] font-medium text-ink">
                    {stat.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
