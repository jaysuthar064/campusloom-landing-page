import React from 'react';

export default function CtaBanner() {
  return (
    <section style={{ background: '#fff', padding: '40px 0 100px' }}>
      <div className="container-main">
        <div style={{
          background: '#3B82F6',
          borderRadius: 24,
          padding: '80px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle decorative circles */}
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
          
          <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#1A1A1A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <span style={{ width: 20, height: 20, border: '2px solid #fff', borderRadius: 4 }}></span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 32 }}>
              The modern solutions<br/>to run your agency.
            </h2>
            <a href="https://campus-loom.vercel.app/register" style={{
              display: 'inline-block', padding: '16px 36px',
              background: '#000', color: '#fff', borderRadius: 100,
              fontWeight: 600, fontSize: 16, textDecoration: 'none',
              transition: 'transform 0.15s',
            }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >Request A Demo</a>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ border: '1px solid #fff', width: 14, height: 14, borderRadius: 3, display: 'inline-block' }}></span> No need for a credit card.</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ border: '1px solid #fff', width: 14, height: 14, borderRadius: 3, display: 'inline-block' }}></span> Cancel at anytime.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
