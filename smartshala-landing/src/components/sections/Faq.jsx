import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

/**
 * Section 09 — FAQ.
 *
 * Accordion with the first row open, as drawn. The open row gets a blue border
 * and a filled chevron; closed rows are plain with a tinted chevron.
 */
export default function Faq({ content }) {
  const [open, setOpen] = useState(0)

  if (!content) return null

  const items = content.items ?? []

  return (
    <section id="faq" className="relative overflow-hidden py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          eyebrowIcon={content.eyebrow_icon}
          line1={content.heading_line_1}
          line2={content.heading_line_2}
          highlight={content.heading_highlight}
          subheading={content.subheading}
        />

        <ul className="mx-auto mt-12 flex max-w-[880px] flex-col gap-3.5">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <li
                key={`${item.question}-${i}`}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? 'border-brand/60' : 'border-hairline'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                    <Icon name={item.icon} size={20} />
                  </span>

                  <span className="min-w-0 grow">
                    <span className="block text-[17px] font-semibold text-ink">
                      {item.question}
                    </span>
                    {isOpen && item.answer ? (
                      <span className="mt-2 block text-[14.5px] leading-[1.65] text-muted">
                        {item.answer}
                      </span>
                    ) : null}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-brand text-white' : 'bg-tint text-brand'
                    }`}
                  >
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
