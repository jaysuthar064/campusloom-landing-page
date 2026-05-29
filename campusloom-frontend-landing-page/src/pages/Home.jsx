import React from 'react'
import HeroSection from '../components/sections/HeroSection'
import TrustMarquee from '../components/sections/TrustMarquee'
import FeatureGrid from '../components/sections/FeatureGrid'
import WorkflowTabs from '../components/sections/WorkflowTabs'
import StatsSection from '../components/sections/StatsSection'
import SuccessFeatures from '../components/sections/SuccessFeatures'
import PricingSection from '../components/sections/PricingSection'
import TestimonialFAQ from '../components/sections/TestimonialFAQ'
import ContactForm from '../components/sections/ContactForm'
import CtaBanner from '../components/sections/CtaBanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustMarquee />
      <FeatureGrid />
      <WorkflowTabs />
      <StatsSection />
      <SuccessFeatures />
      <PricingSection />
      <TestimonialFAQ />
      <div id="contact">
        <ContactForm />
      </div>
      <CtaBanner />
    </>
  )
}
