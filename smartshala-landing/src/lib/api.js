/**
 * Client for the SmartShala CMS REST API.
 *
 * The WordPress install is headless — it renders nothing itself, it only
 * serves the content this site is built from. See
 * cms/wp-content/plugins/smartshala-cms.
 */

const API_ROOT =
  import.meta.env.VITE_WP_API_URL?.replace(/\/$/, '') ?? 'http://localhost:8883'

const NAMESPACE = '/wp-json/smartshala/v1'

/**
 * Fetch every section of a page in one request.
 *
 * @param {string} page   Page id, e.g. "home".
 * @param {object} [opts]
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<Record<string, object>>} Sections keyed by section id.
 */
export async function fetchPage(page, { signal } = {}) {
  const response = await fetch(`${API_ROOT}${NAMESPACE}/page/${page}`, {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(
      `Could not load "${page}" content (HTTP ${response.status}). Is WordPress running at ${API_ROOT}?`,
    )
  }

  const data = await response.json()
  return data.sections ?? {}
}

export { API_ROOT }
