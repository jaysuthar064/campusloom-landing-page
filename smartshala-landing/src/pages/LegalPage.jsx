import PageShell from '../components/layout/PageShell'
import Container from '../components/ui/Container'

/**
 * Shared renderer for /privacy and /terms.
 *
 * Body text is plain: a blank line starts a new paragraph, and lines beginning
 * "- " become a bullet list. Keeping it to that avoids putting an HTML editor
 * (and an XSS surface) into the CMS for two pages that rarely change.
 */
function Body({ text }) {
  const blocks = (text ?? '')
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim())
        const isList = lines.every((l) => l.startsWith('- '))

        if (isList) {
          return (
            <ul key={i} className="mt-4 flex flex-col gap-2.5 pl-1">
              {lines.map((line, j) => (
                <li key={j} className="flex gap-3 text-[16px] leading-[1.7] text-muted">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {line.slice(2)}
                </li>
              ))}
            </ul>
          )
        }

        // A run of single newlines inside a paragraph is an address block.
        if (lines.length > 1) {
          return (
            <p key={i} className="mt-4 text-[16px] leading-[1.7] text-muted">
              {lines.map((line, j) => (
                <span key={j} className="block">
                  {line}
                </span>
              ))}
            </p>
          )
        }

        return (
          <p key={i} className="mt-4 text-[16px] leading-[1.7] text-muted">
            {block}
          </p>
        )
      })}
    </>
  )
}

export default function LegalPage({ page }) {
  return (
    <PageShell page={page}>
      {(sections) => (
        <article className="py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-[760px]">
              <h1 className="heading-tight text-[36px] font-bold text-ink lg:text-[48px]">
                {sections?.hero?.heading}
              </h1>

              {sections?.hero?.updated ? (
                <p className="mt-4 text-[14px] text-muted">{sections.hero.updated}</p>
              ) : null}

              {sections?.hero?.intro ? (
                <p className="mt-8 border-l-2 border-brand/40 pl-5 text-[16.5px] leading-[1.7] text-ink">
                  {sections.hero.intro}
                </p>
              ) : null}

              <div className="mt-12 flex flex-col gap-12">
                {(sections?.body?.items ?? []).map((item, i) => (
                  <section key={`${item.title}-${i}`}>
                    <h2 className="text-[21px] font-bold text-ink">{item.title}</h2>
                    <Body text={item.body} />
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </article>
      )}
    </PageShell>
  )
}
