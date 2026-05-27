import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 68, background: '#fff',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px',
    }}>
      <a href="/" style={{ color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 22, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 28, height: 28, background: '#1A1A1A', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>▶</span>
        SmartShala
      </a>
      <div style={{ display: 'flex', gap: 32 }}>
        {['Features', 'About', 'Pricing', 'Blog'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#6B6B6B', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = '#1A1A1A'} onMouseLeave={e => e.target.style.color = '#6B6B6B'}>{l}</a>
        ))}
      </div>
      <a href="https://campus-loom.vercel.app/login" className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>Contact</a>
    </nav>
  );
}
