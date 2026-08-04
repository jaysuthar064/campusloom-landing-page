import { usePageContent } from '../lib/usePageContent'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/sections/Hero'
import TrustStats from '../components/sections/TrustStats'
import OneDashboard from '../components/sections/OneDashboard'
import Features from '../components/sections/Features'
import Benefits from '../components/sections/Benefits'
import HowItWorks from '../components/sections/HowItWorks'
import Testimonials from '../components/sections/Testimonials'
import Faq from '../components/sections/Faq'
import FinalCta from '../components/sections/FinalCta'
import Footer from '../components/layout/Footer'
import Reveal from '../components/ui/Reveal'
import ScrollProgress from '../components/ui/ScrollProgress'

/**
 * The home page.
 *
 * All content comes from the SmartShala CMS, one object per section. Sections
 * are added here as each build phase lands — see Documents/DESIGN.md §7.
 */
export default function Home() {
  const { sections, loading, error } = usePageContent('home')

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
      <Navbar content={sections.navbar} />
      <main>
        {/* The hero is above the fold — revealing it would flash on load. */}
        <Hero content={sections.hero} />

        <Reveal>
          <TrustStats content={sections.trust} />
        </Reveal>
        <Reveal>
          <OneDashboard content={sections.one_dashboard} />
        </Reveal>
        <Reveal>
          <Features content={sections.features} />
        </Reveal>
        <Reveal>
          <Benefits content={sections.benefits} />
        </Reveal>
        <Reveal>
          <HowItWorks content={sections.how_it_works} />
        </Reveal>
        <Reveal>
          <Testimonials content={sections.testimonials} />
        </Reveal>
        <Reveal>
          <Faq content={sections.faq} />
        </Reveal>
        <Reveal>
          <FinalCta content={sections.final_cta} />
        </Reveal>
      </main>
      {/* Not wrapped in Reveal: you always arrive at the footer by scrolling,
          so the effect adds nothing — and if the observer ever misses, the
          whole footer stays at opacity 0 and vanishes. */}
      <Footer content={sections.footer} />
    </>
  )
}
