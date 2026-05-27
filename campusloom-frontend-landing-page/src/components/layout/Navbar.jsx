import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '20px 0', borderBottom: '1px solid #E8E8E8', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ width: 32, height: 32, background: '#1A1A1A', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </span>
          <span style={{ color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>SmartShala</span>
        </Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="/#features" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Features</a>
          <a href="/#about" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>About</a>
          <a href="/#pricing" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Pricing</a>
          <a href="/#blog" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Blog</a>
        </div>
        <Link to="/contact" className="btn-primary" style={{ padding: '12px 28px', fontSize: 15 }}>
          <span className="btn-text-wrapper">
            <span className="btn-text-visible">Contact</span>
            <span className="btn-text-hidden">Contact</span>
          </span>
        </Link>
      </div>
    </nav>
  );
}
