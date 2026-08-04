import { usePageContent } from '../../lib/usePageContent'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from '../ui/ScrollProgress'

/**
 * Chrome shared by every inner page.
 *
 * The navbar and footer live on the home page's schema, so each inner page
 * loads two documents: its own content, and home for the chrome. Both are
 * plain GETs against the same origin and are cached by the browser, so the
 * second is effectively free after the first navigation.
 */
export default function PageShell({ page, children }) {
  const { sections, loading, error } = usePageContent(page)
  const { sections: home } = usePageContent('home')

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <span className="sr-only">Loading</span>
        <span
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-brand/25 border-t-brand"
        />
      </main>
    )
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <div className="max-w-md text-center">
          <p className="text-lg font-semibold text-ink">Content unavailable</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{error.message}</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <ScrollProgress />
      <Navbar content={home?.navbar} />
      <main>{children(sections)}</main>
      <Footer content={home?.footer} />
    </>
  )
}
