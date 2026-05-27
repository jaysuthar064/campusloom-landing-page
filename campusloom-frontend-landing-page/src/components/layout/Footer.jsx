import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#fff', padding: '60px 0 40px', borderTop: '1px solid #E8E8E8' }}>
      <div className="container-main">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr', gap: 40, marginBottom: 64 }}>
          {/* Logo */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, textDecoration: 'none' }}>
              <span style={{ width: 32, height: 32, background: '#1A1A1A', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </span>
              <span style={{ color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>SmartShala</span>
            </Link>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.6, maxWidth: 250 }}>
              The all-in-one digital ERP solution designed specifically for modern educational institutions.
            </p>
          </div>
          
          {/* Main Pages */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>Platform</p>
            {[{name: 'Features', link: '/#features'}, {name: 'Pricing', link: '/#pricing'}].map(l => (
              <a key={l.name} href={l.link} style={{ display: 'block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>{l.name}</a>
            ))}
            <Link to="/contact" style={{ display: 'block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>Contact Us</Link>
          </div>
          
          {/* About */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>Company</p>
            {[{name: 'About Us', link: '#'}, {name: 'Careers', link: '#'}, {name: 'Partners', link: '#'}].map(l => (
              <a key={l.name} href={l.link} style={{ display: 'block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>{l.name}</a>
            ))}
          </div>
          
          {/* Resources */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>Resources</p>
            {[{name: 'Help Center', link: '#'}, {name: 'Blog', link: '#'}, {name: 'Webinars', link: '#'}].map(l => (
              <a key={l.name} href={l.link} style={{ display: 'block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 16 }}>{l.name}</a>
            ))}
          </div>
          
          {/* Get in touch */}
          <div>
            <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 24 }}>Get in touch</p>
            <a href="mailto:info@smartshala.com" style={{ display: 'inline-block', color: '#1A1A1A', fontSize: 15, fontWeight: 600, marginBottom: 20, textDecoration: 'none' }}>info@smartshala.com</a>
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Facebook SVG */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#F7F7F7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#E8E8E8'} onMouseLeave={e => e.target.style.background = '#F7F7F7'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              {/* LinkedIn SVG */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#F7F7F7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#E8E8E8'} onMouseLeave={e => e.target.style.background = '#F7F7F7'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              {/* Twitter SVG */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#F7F7F7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = '#E8E8E8'} onMouseLeave={e => e.target.style.background = '#F7F7F7'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#6B6B6B', fontSize: 14 }}>© 2026 SmartShala, Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: '#6B6B6B', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
            <a href="#" style={{ color: '#6B6B6B', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
