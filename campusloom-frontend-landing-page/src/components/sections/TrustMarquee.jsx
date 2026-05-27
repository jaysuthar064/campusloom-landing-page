import React from 'react';

export default function TrustMarquee() {
  const logos = ['Global Public School', 'St. Xavier\'s High', 'Greenwood Academy', 'Delhi Public School', 'Oakridge International'];
  const all = [...logos, ...logos, ...logos];

  return (
    <section style={{ background: '#fff', padding: '60px 0', marginTop: 60 }}>
      <p style={{ textAlign: 'center', color: '#1A1A1A', fontSize: 16, fontWeight: 500, marginBottom: 36 }}>
        Trusted by 10,000+ educators & institutions.
      </p>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {all.map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#6B6B6B', fontSize: 24, fontWeight: 700, opacity: 0.8, flexShrink: 0, fontFamily: "'Bricolage Grotesque'" }}>
              <span style={{ fontSize: 28, color: '#3B82F6' }}>✦</span> {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
