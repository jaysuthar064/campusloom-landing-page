import React from 'react';
import { useContent } from '../../context/ContentContext';

export default function StatsSection() {
  const { content } = useContent();
  const s1 = content?.stats?.[0] || { value: '', label: '', desc: '' };
  const s2 = content?.stats?.[1] || { value: '', label: '', desc: '' };
  const s3 = content?.stats?.[2] || { value: '', label: '', desc: '' };

  return (
    <section style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        <h2 style={{ color: '#1A1A1A', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, textAlign: 'center', marginBottom: 12, letterSpacing: '-0.02em' }}>
          Numbers behind our influence.
        </h2>
        <p style={{ color: '#6B6B6B', textAlign: 'center', marginBottom: 48, fontSize: 16 }}>
          {content?.extraData?.st_sub || 'See the impact our digital ecosystem brings to thousands of educational institutions.'}
        </p>

        {/* Row 1: Big photo + Orange stat card */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 400 }}>
            {/* Real classroom/students image */}
            <img src={content?.extraImages?.stats1 || "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&h=400&fit=crop"} alt="Classroom" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
          </div>
          <div style={{ background: '#F97316', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, color: '#fff', fontFamily: "'Bricolage Grotesque'", lineHeight: 1 }}>{s1.value}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginTop: 12, marginBottom: 16, lineHeight: 1.3 }}>{s1.label}</div>
            <p style={{ fontSize: 15, color: '#fff', lineHeight: 1.6, opacity: 0.9 }}>{s1.desc}</p>
          </div>
        </div>

        {/* Row 2: Blue stat + Photo + Black stat */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          <div style={{ background: '#3B82F6', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)', transform: 'scale(1.5)' }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, color: '#fff', fontFamily: "'Bricolage Grotesque'", lineHeight: 1 }}>{s2.value}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginTop: 12, marginBottom: 12 }}>{s2.label}</div>
              <p style={{ fontSize: 15, color: '#fff', lineHeight: 1.6, opacity: 0.9 }}>{s2.desc}</p>
            </div>
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 350 }}>
            {/* Student library image */}
            <img src={content?.extraImages?.stats2 || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=350&fit=crop"} alt="Students in library" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
          </div>
          <div style={{ background: '#0D0D0D', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%)', transform: 'scale(1.5)' }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 800, color: '#fff', fontFamily: "'Bricolage Grotesque'", lineHeight: 1 }}>{s3.value}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginTop: 12, marginBottom: 12 }}>{s3.label}</div>
              <p style={{ fontSize: 15, color: '#fff', lineHeight: 1.6, opacity: 0.7 }}>{s3.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
