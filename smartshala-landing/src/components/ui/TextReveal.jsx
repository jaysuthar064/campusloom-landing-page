import { useEffect, useRef, useState } from 'react'

/**
 * Reveals text a word at a time when it scrolls into view.
 *
 * Words are wrapped individually rather than the whole block being faded, which
 * reads as writing rather than a panel appearing. Spaces are kept as real text
 * nodes so wrapping and justification behave normally.
 *
 * The transition lives in index.css (.text-reveal) so prefers-reduced-motion
 * can switch it off in one place.
 *
 * @param {string} text    The line to reveal.
 * @param {number} delay   Offset before the first word, in ms.
 * @param {number} stagger Gap between words, in ms.
 */
export default function TextReveal({
  text,
  delay = 0,
  stagger = 55,
  as: Tag = 'span',
  className = '',
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    observer.observe(node)

    // Never leave text invisible because an intersection was missed.
    const failSafe = setTimeout(() => setShown(true), 2000)

    return () => {
      clearTimeout(failSafe)
      observer.disconnect()
    }
  }, [])

  const words = String(text ?? '').split(' ')

  return (
    <Tag ref={ref} className={`text-reveal ${shown ? 'is-visible' : ''} ${className}`}>
      {words.map((word, i) => (
        <span key={i} style={{ transitionDelay: `${delay + i * stagger}ms` }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
