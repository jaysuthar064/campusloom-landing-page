import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#fff', padding: '60px 0 40px', borderTop: '1px solid #E8E8E8' }}>
      <div className="container-main">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr', gap: 40, marginBottom: 64 }}>
          {/* Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 32, height: 32, background: '#1A1A1A', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>✦</span>
              <span style={{ color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>Orbit</span>
            </div>
          </div>
          {/* Main Pages */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>Main page</p>
            {['Home 01', 'Home 02', 'Home 03'].map(l => (
              <a key={l} href="#" style={{ display: 'block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>{l}</a>
            ))}
          </div>
          {/* About */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>About</p>
            {['About Us', 'Features', 'Career', 'Pricing'].map(l => (
              <a key={l} href="#" style={{ display: 'block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>{l}</a>
            ))}
          </div>
          {/* Resources */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>Resources</p>
            {['Blog & Article', 'Changelog', 'Contact Us', 'Error - 404'].map(l => (
              <a key={l} href="#" style={{ display: 'block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>{l}</a>
            ))}
          </div>
          {/* Get in touch */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>Get in touch</p>
            <p style={{ color: '#1A1A1A', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>info@smartshala.com</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['f', 'in', '✈'].map((icon, i) => (
                <span key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: '#1A1A1A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, cursor: 'pointer' }}>{icon}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#6B6B6B', fontSize: 14 }}>© 2026 Orbit, Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: '#6B6B6B', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
            <a href="#" style={{ color: '#6B6B6B', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Changelog</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
