import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import FeaturesPage from './pages/FeaturesPage'
import ModulesPage from './pages/ModulesPage'
import PricingPage from './pages/PricingPage'
import BookDemoPage from './pages/BookDemoPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FaqsPage from './pages/FaqsPage'
import HelpPage from './pages/HelpPage'
import LegalPage from './pages/LegalPage'
import NotFoundPage from './pages/NotFoundPage'

/** Client-side navigation should land at the top, not keep the old scroll. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/book-demo" element={<BookDemoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/privacy" element={<LegalPage page="privacy" />} />
        <Route path="/terms" element={<LegalPage page="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
