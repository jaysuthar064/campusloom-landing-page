import Icon from './Icon'
import TextReveal from './TextReveal'

/**
 * The heading block used by nearly every section: a small pill, a two-line
 * heading with one part in brand blue, and a sub-heading.
 *
 * The blue part lands either at the start of the second line ("**Simplify**
 * Administration") or at the end ("Built for **Modern Schools.**"), which is
 * what `highlightFirst` switches between.
 */
export default function SectionHeading({
  eyebrow,
  eyebrowIcon,
  line1,
  line2,
  highlight,
  highlightFirst = false,
  subheading,
  className = '',
}) {
  const highlighted = highlight ? (
    <span className="text-brand">{highlight}</span>
  ) : null

  return (
    <div className={`text-center ${className}`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-5 py-2 text-[13px] font-semibold tracking-[0.06em] text-brand">
          {eyebrowIcon ? <Icon name={eyebrowIcon} size={15} /> : null}
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={`heading-tight text-[34px] font-bold text-ink sm:text-[44px] lg:text-[54px] ${
          eyebrow ? 'mt-6' : ''
        }`}
      >
        {line1 ? <TextReveal as="span" text={line1} className="block" /> : null}

        {highlight || line2 ? (
          <span className="block">
            {highlightFirst ? (
              <>
                {highlighted}
                {line2 ? ` ${line2}` : null}
              </>
            ) : (
              <>
                {line2 ? `${line2} ` : null}
                {highlighted}
              </>
            )}
          </span>
        ) : null}
      </h2>

      {subheading ? (
        <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[1.6] text-muted">
          {subheading}
        </p>
      ) : null}
    </div>
  )
}
