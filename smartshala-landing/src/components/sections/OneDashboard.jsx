import Container from '../ui/Container'
import Icon from '../ui/Icon'

/**
 * Section 04 — Everything. One Dashboard.
 *
 * The dashboard sits in the middle with capability chips down either side,
 * joined by a thin elliptical connector.
 *
 * On the artboard the chips do not line up flush — they bow outwards, sitting
 * furthest from the centre in the middle of each column. STAGGER reproduces
 * that; it is indexed by position within a side and simply stops varying if
 * more chips are added in the CMS.
 */
const STAGGER = [61, 18, 0, 0, 48, 75]

function Chip({ chip, offset, side }) {
  return (
    <li
      className="lift flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_14px_38px_-18px_rgba(8,8,15,0.28)]"
      style={side === 'left' ? { marginLeft: offset } : { marginRight: offset }}
    >
      <span className="text-brand">
        <Icon name={chip.icon} size={24} />
      </span>
      <span className="text-[15.5px] font-medium whitespace-nowrap text-ink">
        {chip.label}
      </span>
    </li>
  )
}

/** The thin arc the chips hang off. Mirrored with a transform on the right. */
function Connector({ side }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 600"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-y-8 hidden w-[120px] lg:block ${
        side === 'left' ? 'right-[-60px]' : 'left-[-60px] -scale-x-100'
      }`}
    >
      <path
        d="M4 40 C 96 130, 96 470, 4 560"
        fill="none"
        stroke="var(--color-brand)"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      {[40, 180, 300, 420, 560].map((cy) => (
        <circle key={cy} cx={cy === 300 ? 92 : cy === 180 || cy === 420 ? 78 : 4} cy={cy} r="5" fill="#fff" stroke="var(--color-brand)" strokeOpacity="0.35" />
      ))}
    </svg>
  )
}

export default function OneDashboard({ content }) {
  if (!content) return null

  const chips = content.chips ?? []
  const left = chips.filter((c) => c.side !== 'right')
  const right = chips.filter((c) => c.side === 'right')
  const image = content.dashboard_image?.url || '/dashboard-panel.png'

  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h2 className="heading-tight text-[38px] font-bold text-ink sm:text-[52px] lg:text-[64px]">
            {content.heading_line_1 ? (
              <span className="block">{content.heading_line_1}</span>
            ) : null}
            {content.heading_highlight ? (
              <span className="block text-brand">{content.heading_highlight}</span>
            ) : null}
          </h2>

          {content.subheading ? (
            <p className="mt-5 text-[17px] text-muted lg:text-[19px]">{content.subheading}</p>
          ) : null}
          {content.subheading_highlight ? (
            <p className="mt-1 text-[17px] font-semibold text-brand lg:text-[19px]">
              {content.subheading_highlight}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,240px)] lg:gap-4">
          {/* Left chips */}
          <ul className="relative order-2 flex flex-col gap-4 lg:order-1">
            <Connector side="left" />
            {left.map((chip, i) => (
              <Chip key={`${chip.label}-${i}`} chip={chip} offset={STAGGER[i] ?? 0} side="left" />
            ))}
          </ul>

          {/* Dashboard */}
          <div className="order-1 lg:order-2">
            <img
              src={image}
              alt={content.dashboard_image?.alt || 'SmartShala dashboard'}
              className="float-slow w-full"
              width={1761}
              height={1239}
              loading="lazy"
            />
          </div>

          {/* Right chips */}
          <ul className="relative order-3 flex flex-col items-end gap-4">
            <Connector side="right" />
            {right.map((chip, i) => (
              <Chip key={`${chip.label}-${i}`} chip={chip} offset={STAGGER[i] ?? 0} side="right" />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
