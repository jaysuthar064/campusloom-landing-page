import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';

export default function TestimonialFAQ() {
  const [open, setOpen] = useState(0);
  const { content } = useContent();
  const faqs = content?.faqs || [];

  return (
    <section style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        {/* Two-column FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-start">
          {/* Left: Title */}
          <div>
            <h2 style={{ color: '#1A1A1A', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: content?.extraData?.faq_t || 'Got questions?<br/>We\'ve got answers.' }}></h2>
            <p style={{ color: '#6B6B6B', fontSize: 16 }}>{content?.extraData?.faq_s || 'Got questions? We\'ve got answers.'}</p>
          </div>

          {/* Right: Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: open === i ? 'none' : '1px solid #E8E8E8', paddingBottom: open === i ? 0 : 8 }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: '100%', padding: '16px 24px',
                  background: open === i ? '#000' : 'transparent',
                  borderRadius: open === i ? 16 : 0, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'background 0.2s',
                }}>
                  <span style={{ color: open === i ? '#fff' : '#1A1A1A', fontSize: 16, fontWeight: 500, textAlign: 'left', fontFamily: 'Inter' }}>{faq.q}</span>
                  <span style={{ 
                    color: open === i ? '#1A1A1A' : '#fff', 
                    background: open === i ? '#fff' : '#1A1A1A',
                    width: 24, height: 24, borderRadius: '50%',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, transform: open === i ? 'rotate(180deg)' : 'none', 
                    transition: 'transform 0.25s', flexShrink: 0, marginLeft: 16 
                  }}>▾</span>
                </button>
                <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                  <p style={{ color: '#6B6B6B', fontSize: 15, lineHeight: 1.65, padding: '20px 24px 8px' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
