import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { motion } from 'framer-motion';

export default function PricingSection() {
  const { content } = useContent();
  
  // Hide section if the toggle is checked in the CMS
  if (content?.extraData?.pr_hide === '1') {
    return null;
  }
  
  const allPlans = content?.pricingPlans || [];
  
  // Render all plans dynamically
  const regularPlans = allPlans;

  return (
    <section id="pricing" style={{ background: '#fff', padding: '70px 0' }}>
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {regularPlans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.15 }} whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }} style={{ 
              background: '#F9FAFB', 
              borderRadius: 24, 
              padding: 48,
              height: '100%'
            }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>{plan.name}</h3>
              <p style={{ fontSize: 16, color: '#6B6B6B', marginBottom: 32, lineHeight: 1.6 }}>{plan.desc}</p>
              <div style={{ marginBottom: 32, display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", letterSpacing: '-0.03em' }}>{plan.price}</span>
                <span style={{ fontSize: 16, color: '#6B6B6B' }}>/Months</span>
              </div>
              <a href="/#contact" style={{
                display: 'block', textAlign: 'center', padding: '18px 0',
                background: '#000', color: '#fff', borderRadius: 100,
                fontWeight: 600, fontSize: 16, textDecoration: 'none',
                transition: 'transform 0.15s', marginBottom: 40,
              }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              >
                <span className="btn-text-wrapper">
                  <span className="btn-text-visible">{content?.extraData?.pr_btn1 || 'Get Started'}</span>
                  <span className="btn-text-hidden">{content?.extraData?.pr_btn1 || 'Get Started'}</span>
                </span>
              </a>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 24 }}>Included features:</p>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20, fontSize: 15, color: '#6B6B6B' }}>
                  <span style={{ color: '#3B82F6', fontWeight: 700, fontSize: 16, marginTop: -2 }}>#</span>
                  {f}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Enterprise / Custom Plan CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-black rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{content?.extraData?.pr_cta_t || 'Custom Solution'}</h3>
            <p style={{ fontSize: 16, color: '#999', maxWidth: 600, lineHeight: 1.6 }}>{content?.extraData?.pr_cta_s || 'Looking for a highly customizable CRM solution for a large organization? Contact us for a tailored package.'}</p>
          </div>
          <a href="/#contact" style={{
            display: 'inline-block', padding: '16px 40px',
            background: '#fff', color: '#000', borderRadius: 100,
            fontWeight: 600, fontSize: 16, textDecoration: 'none',
          }}>
            <span className="btn-text-wrapper">
              <span className="btn-text-visible">{content?.extraData?.pr_btn2 || 'Contact Us'}</span>
              <span className="btn-text-hidden">{content?.extraData?.pr_btn2 || 'Contact Us'}</span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
