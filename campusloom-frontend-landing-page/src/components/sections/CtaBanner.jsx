import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

export default function CtaBanner() {
  const { content } = useContent();
  return (
    <section style={{ background: '#fff', padding: '70px 0' }}>
      <div className="container-main">
        <div style={{
          background: '#3B82F6',
          borderRadius: 24,
          padding: '80px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Large Left Curve */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '-20%', 
            width: '60%', 
            paddingBottom: '60%', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.06)', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }} />
          
          {/* Large Right Curve */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            right: '-20%', 
            width: '60%', 
            paddingBottom: '60%', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.06)', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Center Icon */}
            <div style={{ 
              width: 56, 
              height: 56, 
              borderRadius: 14, 
              background: '#1A1A1A', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 24, 
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
            }}>
              <div style={{ width: 24, height: 24, background: '#A3A3A3', borderRadius: 6 }}></div>
            </div>

            <h2 style={{ color: '#fff', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {content?.extraData?.cta_t || 'The modern solutions to run your institution.'}
            </h2>
            {content?.extraData?.cta_s && <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, marginBottom: 32 }}>{content.extraData.cta_s}</p>}
            <a href="/#contact" style={{
              display: 'inline-block', padding: '16px 40px',
              background: '#000', color: '#fff', borderRadius: 100,
              fontWeight: 600, fontSize: 16, textDecoration: 'none',
              boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
            }}>
              <span className="btn-text-wrapper">
                <span className="btn-text-visible">{content?.extraData?.cta_btn2 || 'Contact Sales'}</span>
                <span className="btn-text-hidden">{content?.extraData?.cta_btn2 || 'Contact Sales'}</span>
              </span>
            </a>
            
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                {content?.extraData?.cta_ft || 'No credit card required. Cancel at anytime.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
