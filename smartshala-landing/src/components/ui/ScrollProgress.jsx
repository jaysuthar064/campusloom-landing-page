import { useEffect, useRef } from 'react'

/**
 * Reading-progress bar across the top of the page.
 *
 * Written straight to the DOM through a ref rather than React state — this
 * updates on every scroll frame, and re-rendering the tree that often would be
 * wasteful. rAF coalesces bursts of scroll events into one write per frame.
 */
export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const bar = ref.current
    if (!bar) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      bar.style.display = 'none'
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`
    }

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />
}
