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
 */
const PATTERN = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/s

// Decelerating curve — fast at first, easing into the final value.
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export default function CountUp({ value, duration = 1400, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(null)

  const match = PATTERN.exec(String(value ?? ''))

  useEffect(() => {
    const node = ref.current
    if (!node || !match) return

    const target = parseFloat(match[2].replace(/,/g, ''))
    if (!Number.isFinite(target)) return

    const decimals = (match[2].split('.')[1] ?? '').length
    const grouped = match[2].includes(',')

    const format = (n) => {
      const fixed = n.toFixed(decimals)
      return grouped ? Number(fixed).toLocaleString('en-IN') : fixed
    }

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let frame = 0
    let start = 0

    const step = (now) => {
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(format(target * easeOut(progress)))
      if (progress < 1) {
        frame = requestAnimationFrame(step)
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
  }, [match, duration])

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
