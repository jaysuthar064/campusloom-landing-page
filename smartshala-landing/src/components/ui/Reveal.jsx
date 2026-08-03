import { useEffect, useRef, useState } from 'react'

/**
 * Fades and lifts its children into view the first time they are scrolled to.
 *
 * IntersectionObserver rather than a scroll listener, so nothing runs on the
 * main thread between intersections, and each element unobserves itself once
 * shown — the effect never replays or costs anything after the first pass.
 *
 * The actual transition lives in index.css (.reveal / .is-visible) so that
 * prefers-reduced-motion can switch all of it off in one place.
 *
 * @param {number} delay Stagger, in ms.
 * @param {string} as    Element to render, defaults to div.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // No observer (or reduced motion): show immediately, skip the effect.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)

    /*
     * Fail-safe. Content must never be left invisible because an intersection
     * was missed — a hidden section is far worse than a missed animation. If
     * nothing has fired by now, just show it.
     */
    const failSafe = setTimeout(() => setShown(true), 2000)

    return () => {
      clearTimeout(failSafe)
      observer.disconnect()
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
