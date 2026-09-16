import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Container from '../ui/Container'
import Logo from '../ui/Logo'
import SmartLink from '../ui/SmartLink'

/**
 * Section 01 — Navbar.
 *
 * Sticky white header: logo left, menu centred, Log In + primary button right.
 * The design is desktop-only, so the mobile drawer below is my own derivation
 * (see DESIGN.md §6).
 *
 * Menu items flagged as dropdowns open on hover at desktop and on tap in the
 * drawer. Their contents come from DROPDOWNS below rather than the CMS — the
 * client design does not draw them, so this is a sensible default that can move
 * into the schema once they decide what belongs there.
 */
const DROPDOWNS = {
  Features: [
    { label: 'All features', url: '/features' },
    { label: 'Student Management', url: '/features' },
    { label: 'Attendance', url: '/features' },
    { label: 'Fee Management', url: '/features' },
    { label: 'Examinations', url: '/features' },
  ],
  Resources: [
    { label: 'Blog', url: '/blog' },
    { label: 'FAQs', url: '/faqs' },
  ],
}

function DesktopItem({ item }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)
  const links = item.has_dropdown ? DROPDOWNS[item.label] : null

  // A small delay stops the panel flickering shut as the pointer crosses the gap.
  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  if (!links?.length) {
    return (
      <SmartLink
        to={item.url || '#'}
        className="nav-link flex items-center gap-1 text-[15.5px] font-medium text-ink/85 transition-colors hover:text-brand"
      >
        {item.label}
      </SmartLink>
    )
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <SmartLink
        to={item.url || '#'}
        aria-expanded={open}
        onFocus={show}
        className="nav-link group flex items-center gap-1 text-[15.5px] font-medium text-ink/85 transition-colors hover:text-brand"
      >
        {item.label}
        <ChevronDown
          size={15}
          strokeWidth={2.25}
          className={`mt-0.5 text-ink/45 transition-all group-hover:text-brand ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </SmartLink>

      <div
        className={`absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 pt-4 transition-all ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-1 opacity-0'
        }`}
      >
        <ul className="overflow-hidden rounded-2xl border border-hairline bg-white p-2 shadow-[0_24px_60px_-24px_rgba(8,8,15,0.3)]">
          {links.map((link) => (
            <li key={link.label}>
              <SmartLink
                to={link.url}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-[14.5px] text-ink transition-colors hover:bg-tint hover:text-brand"
              >
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Navbar({ content }) {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  const rawMenu = content?.menu ?? []
  const menu = rawMenu
    .filter((item) => item.label !== 'Modules' && item.label !== 'Pricing')
    .map((item) => (item.label === 'Company' ? { ...item, has_dropdown: false } : item))
  // Client requested removing login button
  const login = null
  const cta = content?.cta

  // The header sits flat on the hero until the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
    setOpenGroup(null)
  }, [pathname])

  // Don't leave the drawer open behind a desktop layout on resize.
  useEffect(() => {
    if (!open) return
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  // Lock scrolling while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled
          ? 'shadow-[0_1px_0_0_var(--color-hairline),0_6px_24px_-16px_rgba(8,8,15,0.25)]'
          : ''
      }`}
    >
      <Container>
        {/* The artboard is 147px tall with the menu left-of-centre. Reduced to
            112px and the menu centred, at the client's request. The 1fr/auto/1fr
            grid is what centres it: the middle column sits in the middle of the
            container no matter how wide the logo or the actions are. */}
        <div className="flex h-19 items-center justify-between gap-6 lg:grid lg:h-28 lg:grid-cols-[1fr_auto_1fr]">
          <SmartLink
            to={content?.logo?.url || '/'}
            className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            aria-label={content?.logo?.text ?? 'SmartShala'}
          >
            <Logo logo={content?.logo} />
          </SmartLink>

          <nav
            className="hidden items-center justify-center gap-9 lg:flex"
            aria-label="Main"
          >
            {menu.map((item, i) => (
              <DesktopItem key={`${item.label}-${i}`} item={item} />
            ))}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center justify-end gap-7 lg:flex">
            {login?.label ? (
              <SmartLink
                to={login.url || '#'}
                target="_self"
                className="nav-link text-[15.5px] font-medium text-ink/85 transition-colors hover:text-brand"
              >
                {login.label}
              </SmartLink>
            ) : null}

            {cta?.label ? (
              <SmartLink
                to={cta.url || '#'}
                className="press inline-flex h-11.25 items-center justify-center rounded-[10px] bg-brand px-5.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,71,253,0.9)] hover:bg-brand-hover"
              >
                {cta.label}
              </SmartLink>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 ml-auto inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-hairline bg-white transition-[max-height] duration-300 ease-out lg:hidden ${
          open ? 'max-h-[85vh] overflow-y-auto' : 'max-h-0 border-t-0'
        }`}
      >
        <Container className="py-5">
          <nav className="flex flex-col" aria-label="Mobile">
            {menu.map((item, i) => {
              const links = item.has_dropdown ? DROPDOWNS[item.label] : null
              const isOpen = openGroup === item.label

              if (!links?.length) {
                return (
                  <SmartLink
                    key={`${item.label}-${i}`}
                    to={item.url || '#'}
                    className="border-b border-hairline py-3.5 text-[15.5px] font-medium text-ink"
                  >
                    {item.label}
                  </SmartLink>
                )
              }

              return (
                <div key={`${item.label}-${i}`} className="border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-3.5 text-left text-[15.5px] font-medium text-ink"
                  >
                    {item.label}
                    <ChevronDown
                      size={17}
                      className={`text-ink/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen ? (
                    <ul className="pb-3 pl-3">
                      {links.map((link) => (
                        <li key={link.label}>
                          <SmartLink
                            to={link.url}
                            className="block py-2.5 text-[14.5px] text-muted"
                          >
                            {link.label}
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            {login?.label ? (
              <SmartLink
                to={login.url || '#'}
                target="_self"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-hairline text-[15.5px] font-semibold text-ink"
              >
                {login.label}
              </SmartLink>
            ) : null}

            {cta?.label ? (
              <SmartLink
                to={cta.url || '#'}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand text-[15.5px] font-semibold text-white"
              >
                {cta.label}
              </SmartLink>
            ) : null}
          </div>
        </Container>
      </div>
    </header>
  )
}
