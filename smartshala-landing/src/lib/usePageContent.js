import { useEffect, useState } from 'react'
import { fetchPage } from './api'

/**
 * Load a page's CMS content once.
 *
 * @param {string} page Page id, e.g. "home".
 * @returns {{ sections: object|null, loading: boolean, error: Error|null }}
 */
export function usePageContent(page) {
  const [sections, setSections] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetchPage(page, { signal: controller.signal })
      .then((data) => {
        setSections(data)
        setLoading(false)
      })
      .catch((err) => {
        // Unmounting (or a fast re-render in StrictMode) is not a real error.
        if (err.name === 'AbortError') return
        setError(err)
        setLoading(false)
      })

    return () => controller.abort()
  }, [page])

  return { sections, loading, error }
}
