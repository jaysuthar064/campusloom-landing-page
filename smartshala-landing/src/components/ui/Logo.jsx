/**
 * The SmartShala lockup: blue rounded mark, wordmark, and the rule-flanked
 * "SCHOOL ERP" line beneath it.
 *
 * Sizes are measured off design-reference/01-navbar.png — 48px mark, 28px
 * wordmark, and rules that span the full width of the wordmark above.
 *
 * If a logo image has been uploaded in the CMS it replaces the built-in mark.
 * The design's mark is a custom interlocking "Ss" monogram which is not
 * reproducible in CSS — upload the real asset in wp-admin to match exactly.
 */
export default function Logo({ logo, className = '' }) {
  const image = logo?.image?.url
  const text = logo?.text ?? 'SmartShala'
  const tagline = logo?.tagline ?? ''

  return (
    <span className={`flex items-center gap-3.5 ${className}`}>
      {image ? (
        <img
          src={image}
          alt={logo?.image?.alt || text}
          className="h-11.5 w-11.5 shrink-0 rounded-[14px] object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-[14px] bg-brand text-[19px] font-bold tracking-tight text-white"
        >
          Ss
        </span>
      )}

      <span className="flex flex-col leading-none">
        <span className="text-[27px] font-bold tracking-[-0.025em] text-ink">
          {text}
        </span>

        {tagline ? (
          <span className="mt-[5px] flex items-center gap-2">
            <span aria-hidden="true" className="h-px flex-1 bg-brand/50" />
            <span className="text-[10px] font-semibold tracking-[0.19em] whitespace-nowrap text-brand">
              {tagline}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-brand/50" />
          </span>
        ) : null}
      </span>
    </span>
  )
}
