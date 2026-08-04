import { useEffect, useRef, useState } from 'react'

/**
 * Counts a stat up when it scrolls into view.
 *
 * Values come from the CMS as free text — "5000+", "99.9%", "₹ 1.4 Cr",
 * "24/7" — so the leading number is animated and whatever surrounds it is left
 * alone. Anything without a number renders unchanged.
 *
 * Decimal places are taken from the source so "99.9%" counts in tenths rather
 * than snapping from 99 to 99.9 at the end.
 *
 * Note the effect depends on `value`, not on the parsed match. The match is a
 * new array on every render, so depending on it made the effect tear down and
 * restart on each animation frame — the number would creep up a frame at a
 * time and never arrive.
 */
const PATTERN = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/s

// Decelerating curve — fast at first, easing into the final value.
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export default function CountUp({ value, duration = 1400, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const match = PATTERN.exec(String(value ?? ''))
    if (!match) return

    const target = parseFloat(match[2].replace(/,/g, ''))
    if (!Number.isFinite(target)) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const decimals = (match[2].split('.')[1] ?? '').length
    const grouped = match[2].includes(',')

    const format = (n) => {
      const fixed = n.toFixed(decimals)
      return grouped ? Number(fixed).toLocaleString('en-IN') : fixed
    }

    let frame = 0
    let start = 0

    const step = (now) => {
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)

      if (progress < 1) {
        setDisplay(format(target * easeOut(progress)))
        frame = requestAnimationFrame(step)
      } else {
        // Land on the source text so the final value is exact, whatever the
        // formatting was.
        setDisplay(match[2])
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
          frame = requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [value, duration])

  const match = PATTERN.exec(String(value ?? ''))

  if (!match) {
    return <span className={className}>{value}</span>
  }

  const [, prefix, number, suffix] = match

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display ?? number}
      {suffix}
    </span>
  )
}
