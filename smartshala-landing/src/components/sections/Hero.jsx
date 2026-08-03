import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SmartLink from '../ui/SmartLink'

/**
 * Section 02 — Hero.
 *
 * Two columns: headline / sub / buttons / trust items on the left, the product
 * visual on the right.
 *
 * The built-in visual is lifted straight from the artboard and already has the
 * four stat cards composited into it. So the CMS `floating_cards` are rendered
 * as an overlay only once a custom dashboard image is uploaded — otherwise you
 * would see each card twice.
 */

const CARD_POSITION = {
  'top-left': 'left-0 top-[12%]',
  'bottom-left': 'left-0 top-[46%]',
  'top-right': 'right-0 top-[22%]',
  'bottom-right': 'right-0 top-[58%]',
}

function FloatingCard({ card }) {
  return (
    <div
      className={`absolute w-[132px] rounded-2xl bg-white p-4 shadow-[0_18px_44px_-18px_rgba(8,8,15,0.22)] ${
        CARD_POSITION[card.position] ?? CARD_POSITION['top-left']
      }`}
    >
      {card.icon ? (
        <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-tint text-brand">
          <Icon name={card.icon} size={19} />
        </span>
      ) : null}
      <p className="text-[13px] font-semibold text-brand">{card.label}</p>
      <p className="mt-0.5 text-[19px] font-bold text-ink">{card.value}</p>
      <p className="text-[12px] text-muted">{card.caption}</p>
    </div>
  )
}

export default function Hero({ content }) {
  if (!content) return null

  const {
    heading_line_1: line1,
    heading_line_2: line2,
    heading_highlight: highlight,
    subheading,
    primary_cta: primary,
    secondary_cta: secondary,
    trust_items: trust = [],
    dashboard_image: dashboard,
    floating_cards: cards = [],
  } = content

  const customImage = dashboard?.url
  const imageSrc = customImage || '/hero-dashboard.png'

  return (
    <section className="relative overflow-hidden">
      <Container>
        {/* The design splits the row at x=576 of 1334 — a 0.785 / 1.215 ratio
            with no gutter between the columns. */}
        <div className="grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[minmax(0,0.785fr)_minmax(0,1.215fr)] lg:gap-0 lg:pt-4 lg:pb-20">
          {/* ---------------- Left ---------------- */}
          <div>
            <h1 className="heading-tight text-[46px] font-bold text-ink sm:text-[60px] lg:text-[74px]">
              {line1 ? <span className="block">{line1}</span> : null}
              {line2 ? <span className="block">{line2}</span> : null}
              {highlight ? <span className="block text-brand">{highlight}</span> : null}
            </h1>

            {subheading ? (
              <p className="mt-6 max-w-[420px] text-[17px] leading-[1.55] text-muted lg:text-[18px]">
                {subheading}
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {primary?.label ? (
                <SmartLink to={primary.url || '#'}
                  className="press inline-flex h-13.5 items-center gap-2.5 rounded-xl bg-brand px-7 text-[16px] font-semibold text-white shadow-[0_16px_34px_-16px_rgba(0,71,253,0.95)] hover:bg-brand-hover"
                >
                  {primary.icon ? <Icon name={primary.icon} size={20} /> : null}
                  {primary.label}
                </SmartLink>
              ) : null}

              {secondary?.label ? (
                <SmartLink to={secondary.url || '#'}
                  className="press inline-flex h-13.5 items-center gap-2.5 rounded-xl border-[1.5px] border-brand/60 px-7 text-[16px] font-semibold text-brand hover:bg-brand/5"
                >
                  {secondary.icon ? <Icon name={secondary.icon} size={20} /> : null}
                  {secondary.label}
                </SmartLink>
              ) : null}
            </div>

            {/* All three trust items sit on one row in the design, so this
                must not wrap at desktop. */}
            {trust.length ? (
              <ul className="mt-11 flex flex-wrap items-center gap-x-3 gap-y-5 lg:flex-nowrap">
                {trust.map((item, i) => (
                  <li
                    key={`${item.title}-${i}`}
                    className={`flex items-center gap-2 ${
                      i > 0 ? 'sm:border-l sm:border-hairline sm:pl-3' : ''
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                      <Icon name={item.icon} size={17} />
                    </span>
                    <span className="leading-tight whitespace-nowrap">
                      <span className="block text-[12.5px] font-semibold text-ink">
                        {item.title}
                      </span>
                      <span className="block text-[11px] text-muted">{item.caption}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* ---------------- Right ---------------- */}
          {/* The image bleeds past the container gutter to the viewport edge,
              as it does on the artboard. */}
          <div className="relative">
            <img
              src={imageSrc}
              alt={dashboard?.alt || 'SmartShala dashboard'}
              className="float w-full lg:-mr-13.25 lg:w-[calc(100%+53px)] lg:max-w-none"
              loading="eager"
              width={1845}
              height={1527}
            />

            {customImage
              ? cards.map((card, i) => <FloatingCard key={`${card.label}-${i}`} card={card} />)
              : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
