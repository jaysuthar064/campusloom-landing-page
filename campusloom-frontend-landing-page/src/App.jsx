import React from 'react'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import TrustMarquee from './components/sections/TrustMarquee'
import FeatureGrid from './components/sections/FeatureGrid'
import WorkflowTabs from './components/sections/WorkflowTabs'
import StatsSection from './components/sections/StatsSection'
import SuccessFeatures from './components/sections/SuccessFeatures'
import PricingSection from './components/sections/PricingSection'
import TestimonialFAQ from './components/sections/TestimonialFAQ'
import CtaBanner from './components/sections/CtaBanner'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <TrustMarquee />
        <FeatureGrid />
        <WorkflowTabs />
        <StatsSection />
        <SuccessFeatures />
        <PricingSection />
        <TestimonialFAQ />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}

export default App
