import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { motion } from 'framer-motion';

export default function FeatureGrid() {
  const { content } = useContent();

  const feature1 = content?.features?.[0] || { title: '', desc: '' };
  const feature2 = content?.features?.[1] || { title: '', desc: '' };

  return (
    <section id="features" style={{ background: '#fff', padding: '70px 0' }}>
      <div className="container-main" style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>

        {/* Feature 1 */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }} transition={{ duration: 0.3 }} style={{ background: '#F7F7F7', borderRadius: 20, padding: 40, border: '1px solid #E8E8E8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{content?.extraData?.feat1_l1 || 'Academic Performance'}</span>
              <span style={{ color: '#1A1A1A', fontWeight: 600 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <div style={{ width: 180, height: 180, borderRadius: '50%', background: 'conic-gradient(#3B82F6 0% 72%, #F59E0B 72% 85%, #E8E8E8 85% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                 <div style={{ width: 140, height: 140, borderRadius: '50%', background: '#F7F7F7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", lineHeight: 1 }}>{content?.extraData?.feat1_l2 || '72%'}</div>
                    <div style={{ fontSize: 13, color: '#6B6B6B', marginTop: 4, fontWeight: 500 }}>{content?.extraData?.feat1_l3 || 'Class Average'}</div>
                 </div>
              </div>
            </div>
          </motion.div>

          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, lineHeight: 1.15, color: '#1A1A1A', marginBottom: 20 }}>
              {feature1.title}
            </h2>
            <p style={{ color: '#6B6B6B', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              {feature1.desc}
            </p>
            <a href="/#features" className="btn-primary">
              <span className="btn-text-wrapper">
                <span className="btn-text-visible">{content?.extraData?.feat_btn1 || 'Explore Features'}</span>
                <span className="btn-text-hidden">{content?.extraData?.feat_btn1 || 'Explore Features'}</span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, lineHeight: 1.15, color: '#1A1A1A', marginBottom: 20 }}>
              {feature2.title}
            </h2>
            <p style={{ color: '#6B6B6B', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
              {feature2.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {[
                content?.extraData?.feat2_b1 || 'Automated reminders for pending dues.', 
                content?.extraData?.feat2_b2 || 'Customizable receipt and invoice generation.', 
                content?.extraData?.feat2_b3 || 'Reduce financial leakage with secure online gateways.'
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#1A1A1A', fontSize: 15, fontWeight: 500 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#3B82F6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  {t}
                </div>
              ))}
            </div>
            <a href="/#contact" className="btn-primary">
              <span className="btn-text-wrapper">
                <span className="btn-text-visible">{content?.extraData?.feat_btn2 || 'Book A Demo'}</span>
                <span className="btn-text-hidden">{content?.extraData?.feat_btn2 || 'Book A Demo'}</span>
              </span>
            </a>
          </div>

          <motion.div whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }} transition={{ duration: 0.3 }} style={{ background: '#F7F7F7', borderRadius: 20, padding: 40, border: '1px solid #E8E8E8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{content?.extraData?.feat2_l1 || 'Fee Collection Insights'}</span>
              <span style={{ color: '#1A1A1A', fontWeight: 600 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
              </span>
            </div>
            {/* Mock area chart */}
            <div style={{ marginTop: 20, position: 'relative', height: 180 }}>
              <svg viewBox="0 0 300 120" style={{ width: '100%', height: '100%' }}>
                <path d="M0,60 Q50,60 80,40 T150,20 T220,40 T300,60 L300,60 L0,60 Z" fill="#93C5FD"/>
                <path d="M0,60 Q50,60 80,80 T150,100 T220,80 T300,60 L300,60 L0,60 Z" fill="#93C5FD"/>
                
                <path d="M30,60 Q60,60 90,45 T150,30 T210,45 T270,60 L270,60 L30,60 Z" fill="#60A5FA"/>
                <path d="M30,60 Q60,60 90,75 T150,90 T210,75 T270,60 L270,60 L30,60 Z" fill="#60A5FA"/>

                <path d="M60,60 Q80,60 100,50 T150,40 T200,50 T240,60 L240,60 L60,60 Z" fill="#2563EB"/>
                <path d="M60,60 Q80,60 100,70 T150,80 T200,70 T240,60 L240,60 L60,60 Z" fill="#2563EB"/>

                <line x1="80" y1="10" x2="80" y2="110" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="150" y1="10" x2="150" y2="110" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="220" y1="10" x2="220" y2="110" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="4 4" />

                <rect x="135" y="0" rx="8" ry="8" width="30" height="16" fill="#F97316"/>
                <text x="150" y="11" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="600">{content?.extraData?.feat2_l2 || '32%'}</text>
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 13, color: '#1A1A1A', marginTop: 12, fontWeight: 500 }}>
              <span>{content?.extraData?.feat2_l3 || '₹3,65,900'}</span><span>{content?.extraData?.feat2_l4 || '₹8,69,900'}</span><span>{content?.extraData?.feat2_l5 || '₹6,55,800'}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
