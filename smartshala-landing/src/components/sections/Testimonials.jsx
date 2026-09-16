import { useState } from 'react'
import { Star } from 'lucide-react'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

/**
 * Section 08 — Testimonials.
 *
 * Three cards at a time with dots beneath. The artboard shows the middle dot
 * active, so this is a slider: the dots page through the testimonials in
 * groups of three.
 */
const FALLBACK_PHOTOS = [
  '/people/anjali-sharma.png',
  '/people/rajiv-mehta.png',
  '/people/neha-kapoor.png',
]

const PER_PAGE = 3

function Stars({ count }) {
  const n = Math.max(0, Math.min(5, Number(count) || 0))
  return (
    <span className="flex gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => (
        <Star key={i} size={16} className="fill-brand text-brand" />
      ))}
    </span>
  )
}

export default function Testimonials({ content }) {
  const items = content?.items ?? []
  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE))
  // The design shows the middle dot active, so start there.
  const [page, setPage] = useState(Math.floor((pageCount - 1) / 2))

  if (!content) return null

  const visible = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          eyebrowIcon={content.eyebrow_icon}
          line1={content.heading_line_1}
          line2={content.heading_line_2}
          highlight={content.heading_highlight}
          subheading={content.subheading}
        />

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => {
            const photo = item.photo?.url || FALLBACK_PHOTOS[page * PER_PAGE + i]
            return (
              <li
                key={`${item.name}-${i}`}
                className="lift relative flex flex-col rounded-2xl border border-hairline/70 bg-white p-7"
              >
                <div className="flex items-center gap-4">
                  {photo ? (
                    <img
                      src={photo}
                      alt={item.photo?.alt || item.name || ''}
                      className="h-[68px] w-[68px] shrink-0 rounded-full object-cover ring-2 ring-brand/25"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <p className="text-[17px] font-bold text-ink">{item.name}</p>
                    <p className="mt-0.5 text-[13.5px] text-muted">{item.role}</p>
                    <div className="mt-2">
                      <Stars count={item.rating} />
                    </div>
                  </div>
                </div>

                <blockquote className="relative mt-6 grow">
                  <p className="pr-8 text-[14.5px] leading-[1.7] text-muted">
                    {item.quote}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute right-0 bottom-0 font-serif text-[46px] leading-none text-brand/15"
                  >
                    &rdquo;
                  </span>
                </blockquote>

                <div className="mt-7 flex items-center gap-3 border-t border-hairline/70 pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                    <Icon name="map-pin" size={18} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[14px] font-semibold text-ink">
                      {item.location || 'Verified School'}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-muted">Verified School Leader</span>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        {pageCount > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Show testimonials ${i + 1} of ${pageCount}`}
                aria-current={i === page}
                className={`h-2.5 rounded-full transition-all ${
                  i === page ? 'w-2.5 bg-brand' : 'w-2.5 bg-brand/25 hover:bg-brand/45'
                }`}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
