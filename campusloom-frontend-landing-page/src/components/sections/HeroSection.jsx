import React from 'react';

export default function HeroSection() {
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  ];

  return (
    <section style={{ background: '#fff', paddingTop: 120, paddingBottom: 0 }}>
      <div className="container-main" style={{ textAlign: 'center' }}>
        {/* Avatar Badge */}
        <div className="animate-fade-up delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex' }}>
            {avatars.map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #fff', marginLeft: i > 0 ? -10 : 0, objectFit: 'cover' }} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>)}
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A' }}>500+ Happy Schools.</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-2" style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', maxWidth: 750, margin: '0 auto 20px', color: '#1A1A1A' }}>
          Simplify School Management With Smart Digital ERP Solutions.
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up delay-3" style={{ color: '#6B6B6B', fontSize: 17, maxWidth: 550, margin: '0 auto 36px', lineHeight: 1.65 }}>
          SmartShala ERP is a complete cloud-based education management platform designed to transform how modern schools operate.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-4" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://campus-loom.vercel.app/register" className="btn-primary">Get Free Demo</a>
          <a href="#features" className="btn-secondary">Explore Modules</a>
        </div>

        {/* Micro */}
        <p className="animate-fade-up delay-5" style={{ color: '#999', fontSize: 13, marginTop: 16 }}>
          ✳ No credit card required. Free 14 days trial
        </p>

        {/* Hero Images */}
        <div className="animate-fade-up delay-6" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: 16, maxWidth: 1000, margin: '60px auto 0' }}>
          {/* Main Large Image */}
          <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=550&fit=crop" alt="Team" style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block', borderRadius: 20 }} />
            {/* Floating Card */}
            <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#fff', borderRadius: 14, padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: 180 }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Students</span><span>•••</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'" }}>829</div>
              <span style={{ fontSize: 11, background: '#DCFCE7', color: '#16A34A', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>↑ 15%</span>
            </div>
          </div>
          {/* Side Image + Stat Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', flex: 1 }}>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=250&fit=crop&crop=face" alt="Person" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 14, padding: '16px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>Fee Balance</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'" }}>₹5,56,897</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
