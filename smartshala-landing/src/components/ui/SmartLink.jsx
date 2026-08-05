import { Link } from 'react-router-dom'

/**
 * One link component for CMS-supplied URLs.
 *
 * Editors type whatever they like in wp-admin — "/pricing", "#features",
 * "https://…", "mailto:…". This picks the right element so internal routes
 * navigate client-side (no full reload) while everything else stays a plain
 * anchor, with external links getting the usual rel hardening.
 */
export default function SmartLink({ to, children, target, ...rest }) {
  const href = to || '#'

  const isExternal = /^(https?:)?\/\//i.test(href)
  const isProtocol = /^(mailto:|tel:|sms:)/i.test(href)
  const isAnchor = href.startsWith('#')

  if (isExternal) {
    // New tab by default so the marketing site is not lost, but callers can
    // override — "Log In" should take you to the app, not leave a stale tab.
    const resolved = target ?? '_blank'

    return (
      <a
        href={href}
        target={resolved}
        rel={resolved === '_blank' ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {children}
      </a>
    )
  }

  if (isProtocol || isAnchor) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  )
}
