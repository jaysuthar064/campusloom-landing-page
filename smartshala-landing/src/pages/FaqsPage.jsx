import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import ClosingCta from '../components/ui/ClosingCta'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'

/** Questions are stored one per line as "Question | Answer". */
const parseQuestions = (value) =>
  (value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...rest] = line.split('|')
      return { question: question.trim(), answer: rest.join('|').trim() }
    })
    .filter((q) => q.question)

function Group({ group }) {
  const questions = parseQuestions(group.questions)
  const [open, setOpen] = useState(-1)

  if (!questions.length) return null

  return (
    <div className="mt-14 first:mt-0">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <Icon name={group.icon} size={21} />
        </span>
        <h2 className="text-[22px] font-bold text-ink">{group.title}</h2>
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {questions.map((item, i) => {
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
                    <span className="mt-2 block text-[14.5px] leading-[1.7] text-muted">
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
    </div>
  )
}

export default function FaqsPage() {
  return (
    <PageShell page="faqs">
      {(sections) => (
        <>
          <PageHero content={sections?.hero} />

          <section className="py-16 lg:py-20">
            <Container>
              <div className="mx-auto max-w-[860px]">
                {(sections?.groups?.items ?? []).map((group, i) => (
                  <Reveal key={`${group.title}-${i}`}>
                    <Group group={group} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>

          <Reveal>
            <ClosingCta content={sections?.cta} />
          </Reveal>
        </>
      )}
    </PageShell>
  )
}
