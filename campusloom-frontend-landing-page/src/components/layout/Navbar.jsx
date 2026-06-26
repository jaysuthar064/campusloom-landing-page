import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

export default function Navbar() {
  const { content } = useContent();
  const hidePricing = content?.extraData?.pr_hide === '1';

  return (
    <nav style={{ padding: '20px 0', borderBottom: '1px solid #E8E8E8', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <img src="/smartshala-logo.png" alt="SmartShala Logo" style={{ height: 120, width: 'auto', margin: '-30px 0' }} />
        </Link>
        <div className="hidden md:flex" style={{ gap: 32, alignItems: 'center' }}>
          <a href="/#features" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Features</a>
          <a href="/#workflows" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Workflows</a>
          {!hidePricing && (
            <a href="/#pricing" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Pricing</a>
          )}
          <a href="/#faq" style={{ color: '#6B6B6B', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>FAQ</a>
        </div>
        <a href="/#contact" className="btn-primary" style={{ padding: '12px 28px', fontSize: 15, textDecoration: 'none' }}>
          <span className="btn-text-wrapper">
            <span className="btn-text-visible">Contact</span>
            <span className="btn-text-hidden">Contact</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
