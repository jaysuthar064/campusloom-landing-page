import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Eased scrolling for the whole site.
 *
 * Lenis rather than a hand-rolled version: scroll hijacking is easy to do
 * badly, and a naive implementation breaks keyboard paging, touch momentum and
 * anchor jumps. Lenis drives the real scroll position, so everything reading
 * window.scrollY — the sticky navbar, the progress bar, IntersectionObserver
 * reveals — keeps working untouched.
 *
 * Switched off entirely under prefers-reduced-motion, where native scrolling
 * is what the person has asked for.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: quick to respond, settles without drifting.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Leave touch alone. Phones already have momentum scrolling and
      // overriding it makes the page feel detached from your finger.
      syncTouch: false,
      anchors: { offset: -120 },
    })

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Lenis owns the scroll position, so CSS smooth scrolling must stand down
    // or the two fight over anchor jumps.
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      html.style.scrollBehavior = previous
    }
  }, [])

  // Route changes are handled by ScrollToTop in App.jsx, which already knows
  // to leave hash links alone.

  return null
}
