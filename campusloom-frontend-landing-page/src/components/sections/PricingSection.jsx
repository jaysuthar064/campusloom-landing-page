import React from 'react';
import { Link } from 'react-router-dom';

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter Plan',
      desc: 'Ideal for small businesses & startups getting started with CRM.',
      price: '$29',
      features: ['Contact and lead management.', 'Task and appointment scheduling.', 'Basic reporting and analytics.', 'Integration with email and calendar.'],
      dark: false,
    },
    {
      name: 'Business Plan',
      desc: 'Growing teams needing advanced CRM capabilities and automation.',
      price: '$59',
      features: ['Customizable pipelines and workflows.', 'Team collaboration tools.', 'Advanced analytics and reporting.', 'API access and third-party integrations.'],
      dark: false,
    },
  ];

  return (
    <section id="pricing" style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        {/* Two pricing cards side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ background: '#F9FAFB', borderRadius: 24, padding: 48 }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>{plan.name}</h3>
              <p style={{ fontSize: 16, color: '#6B6B6B', marginBottom: 32, lineHeight: 1.6 }}>{plan.desc}</p>
              <div style={{ marginBottom: 32, display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", letterSpacing: '-0.03em' }}>{plan.price}</span>
                <span style={{ fontSize: 16, color: '#6B6B6B' }}>/Months</span>
              </div>
              <Link to="/contact" style={{
                display: 'block', textAlign: 'center', padding: '18px 0',
                background: '#000', color: '#fff', borderRadius: 100,
                fontWeight: 600, fontSize: 16, textDecoration: 'none',
                transition: 'transform 0.15s', marginBottom: 40,
              }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              >
                <span className="btn-text-wrapper">
                  <span className="btn-text-visible">Get Started</span>
                  <span className="btn-text-hidden">Get Started</span>
                </span>
              </Link>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 24 }}>Included features:</p>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20, fontSize: 15, color: '#6B6B6B' }}>
                  <span style={{ color: '#3B82F6', fontWeight: 700, fontSize: 16, marginTop: -2 }}>#</span>
                  {f}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Enterprise Plan */}
        <div style={{ background: '#000', borderRadius: 24, padding: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Enterprise Plan</h3>
            <p style={{ fontSize: 16, color: '#999', maxWidth: 600, lineHeight: 1.6 }}>Large organizations looking for a scalable and highly customizable CRM solution.</p>
          </div>
          <Link to="/contact" style={{
            display: 'inline-block', padding: '16px 40px',
            background: '#fff', color: '#000', borderRadius: 100,
            fontWeight: 600, fontSize: 16, textDecoration: 'none',
          }}>
            <span className="btn-text-wrapper">
              <span className="btn-text-visible">Contact Us</span>
              <span className="btn-text-hidden">Contact Us</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
