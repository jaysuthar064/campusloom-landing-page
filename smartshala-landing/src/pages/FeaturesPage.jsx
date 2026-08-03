import { Check } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/ui/PageHero'
import ClosingCta from '../components/ui/ClosingCta'
import Container from '../components/ui/Container'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'

/** Bullet points are stored one per line. */
const toLines = (value) =>
  (value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export default function FeaturesPage() {
  return (
    <PageShell page="features">
      {(sections) => (
        <>
          <PageHero content={sections?.hero} />

          <section className="py-16 lg:py-24">
            <Container>
              <div className="flex flex-col gap-6">
                {(sections?.list?.items ?? []).map((item, i) => (
                  <Reveal key={`${item.title}-${i}`}>
                    <article className="lift grid gap-8 rounded-3xl border border-hairline/70 bg-white p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:p-11">
                      <div>
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tint text-brand">
                          <Icon name={item.icon} size={27} />
                        </span>
                        <h2 className="mt-6 text-[26px] font-bold text-ink lg:text-[30px]">
                          {item.title}
                        </h2>
                        <p className="mt-4 text-[16px] leading-[1.7] text-muted">
                          {item.summary}
                        </p>
                      </div>

                      <ul className="flex flex-col justify-center gap-4">
                        {toLines(item.points).map((point, p) => (
                          <li key={p} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                              <Check size={14} strokeWidth={3} />
                            </span>
                            <span className="text-[15.5px] leading-[1.6] text-ink">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
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
