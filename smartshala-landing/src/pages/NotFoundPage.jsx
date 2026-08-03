import { ArrowRight } from 'lucide-react'
import Container from '../components/ui/Container'
import SmartLink from '../components/ui/SmartLink'

/**
 * 404.
 *
 * Deliberately not CMS-driven: this page has to render even when the API is
 * unreachable, which is one of the ways people end up here.
 */
const LINKS = [
  { label: 'Home', url: '/' },
  { label: 'Features', url: '/features' },
  { label: 'Pricing', url: '/pricing' },
  { label: 'FAQs', url: '/faqs' },
  { label: 'Contact', url: '/contact' },
]

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center py-20">
      <Container className="text-center">
        <p className="text-[15px] font-semibold tracking-[0.08em] text-brand">404</p>

        <h1 className="heading-tight mt-5 text-[40px] font-bold text-ink lg:text-[60px]">
          This page has been
          <span className="block text-brand">marked absent.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[520px] text-[17px] leading-[1.65] text-muted">
          The link may be out of date, or the page may have moved. Here is the way
          back.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <SmartLink
            to="/"
            className="press inline-flex h-[56px] items-center gap-3 rounded-full bg-brand px-9 text-[16.5px] font-semibold text-white shadow-[0_20px_44px_-20px_rgba(0,71,253,0.95)] hover:bg-brand-hover"
          >
            Back to home
            <ArrowRight size={20} />
          </SmartLink>

          <SmartLink
            to="/book-demo"
            className="press inline-flex h-[56px] items-center rounded-full border-[1.5px] border-brand/60 px-9 text-[16.5px] font-semibold text-brand hover:bg-brand/5"
          >
            Book a demo
          </SmartLink>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {LINKS.map((link) => (
            <li key={link.label}>
              <SmartLink
                to={link.url}
                className="text-[15px] text-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
              >
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  )
}
