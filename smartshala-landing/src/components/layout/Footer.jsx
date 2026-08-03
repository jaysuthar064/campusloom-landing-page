import { ArrowRight, ChevronRight, Globe, Mail, MapPin, Phone } from 'lucide-react'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import SmartLink from '../ui/SmartLink'

/**
 * Section 11 — Footer.
 *
 * A heavily faded dashboard sits behind the top of the footer as a watermark,
 * then the brand block, four columns, the closing CTA band and the bottom bar.
 */

/**
 * Lucide dropped brand marks in v1, so the social glyphs are inlined here.
 * Anything not in this map falls through to a normal Lucide icon.
 */
const BRAND_ICONS = {
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z',
  facebook:
    'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z',
  instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z',
  youtube:
    'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
}

function SocialIcon({ name, size = 18 }) {
  const path = BRAND_ICONS[name]
  if (!path) return <Icon name={name} size={size} />

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}
function LinkColumn({ column }) {
  if (!column?.title) return null
  const links = column.links ?? []

  return (
    <div>
      <h3 className="text-[17px] font-bold text-ink">{column.title}</h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link, i) => (
          <li key={`${link.label}-${i}`}>
            <SmartLink to={link.url || '#'}
              className="group flex items-center gap-2 text-[14.5px] text-footer-ink transition-colors hover:text-brand"
            >
              <ChevronRight size={15} className="shrink-0 text-brand" />
              {link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({ content }) {
  if (!content) return null

  const contact = content.contact
  const band = content.cta_band
  const modules = content.modules ?? []

  // Only show a social icon once it actually points somewhere. An icon linking
  // to "#" is a dead button, so it is better to show nothing until the real
  // handle is filled in.
  const socials = (content.socials ?? []).filter(
    (s) => s.url && s.url !== '#' && s.url.trim() !== '',
  )

  return (
    <footer className="relative overflow-hidden pt-20 pb-10">
      {/* Watermark — decorative, and deliberately very faint. Uses the plain
          dashboard rather than a crop of the artboard's own footer, which
          would ghost a second copy of this footer's logo and headings. */}
      <img
        src="/dashboard-panel.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 w-375 max-w-none -translate-x-1/2 opacity-[0.045] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_55%)] select-none"
      />

      <Container className="relative">
        {/* Brand block */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand text-[18px] font-bold text-white"
            >
              Ss
            </span>
            <span className="text-[28px] font-bold tracking-[-0.025em] text-ink">
              {content.brand_name}
            </span>
          </div>

          {content.headline ? (
            <p className="mt-6 text-[26px] font-bold text-ink lg:text-[30px]">
              {content.headline}
            </p>
          ) : null}
          {content.tagline ? (
            <p className="mt-3 text-[16px] text-muted">{content.tagline}</p>
          ) : null}

          {modules.length ? (
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
              {modules.map((m, i) => (
                <li key={`${m.label}-${i}`} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand" />
                  <span className="text-[15px] text-ink">{m.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Columns */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <LinkColumn column={content.col_product} />
          <LinkColumn column={content.col_company} />
          <LinkColumn column={content.col_resources} />

          {contact?.title ? (
            <div>
              <h3 className="text-[17px] font-bold text-ink">{contact.title}</h3>
              <ul className="mt-5 flex flex-col gap-4 text-[14.5px] text-footer-ink">
                {contact.phone ? (
                  <li className="flex items-center gap-3">
                    <Phone size={17} className="shrink-0 text-brand" />
                    <SmartLink to={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-brand">
                      {contact.phone}
                    </SmartLink>
                  </li>
                ) : null}
                {contact.email ? (
                  <li className="flex items-center gap-3">
                    <Mail size={17} className="shrink-0 text-brand" />
                    <SmartLink to={`mailto:${contact.email}`} className="hover:text-brand">
                      {contact.email}
                    </SmartLink>
                  </li>
                ) : null}
                {contact.website ? (
                  <li className="flex items-center gap-3">
                    <Globe size={17} className="shrink-0 text-brand" />
                    <span>{contact.website}</span>
                  </li>
                ) : null}
                {contact.company || contact.address ? (
                  <li className="flex gap-3">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-brand" />
                    <span>
                      {contact.company ? <span className="block">{contact.company}</span> : null}
                      {contact.address ? <span className="block">{contact.address}</span> : null}
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Closing CTA band */}
        {band?.title ? (
          <div className="mt-14 flex flex-col items-center gap-6 rounded-2xl border border-hairline bg-white/70 px-8 py-8 lg:flex-row lg:justify-between">
            <div className="flex items-center gap-5 text-center lg:text-left">
              <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-tint text-brand sm:flex">
                <Icon name={band.icon} size={30} />
              </span>
              <span>
                <span className="block text-[22px] font-bold text-ink">{band.title}</span>
                <span className="mt-1 block max-w-[420px] text-[14.5px] leading-[1.6] text-muted">
                  {band.description}
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {band.primary_label ? (
                <SmartLink to={band.primary_url || '#'}
                  className="press inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-brand px-7 text-[15.5px] font-semibold text-white hover:bg-brand-hover"
                >
                  {band.primary_label}
                  <ArrowRight size={19} />
                </SmartLink>
              ) : null}
              {band.secondary_label ? (
                <SmartLink to={band.secondary_url || '#'}
                  className="press inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-brand/60 px-7 text-[15.5px] font-semibold text-brand hover:bg-brand/5"
                >
                  {band.secondary_label}
                  {band.secondary_icon ? <Icon name={band.secondary_icon} size={18} /> : null}
                </SmartLink>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-hairline pt-7 sm:flex-row">
          <p className="text-[14px] text-muted">{content.copyright}</p>

          {socials.length ? (
            <ul className="flex items-center gap-3">
              {socials.map((s, i) => (
                <li key={`${s.icon}-${i}`}>
                  <SmartLink to={s.url || '#'}
                    aria-label={s.icon}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline text-ink transition-colors hover:border-brand/50 hover:text-brand"
                  >
                    <SocialIcon name={s.icon} size={18} />
                  </SmartLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  )
}
