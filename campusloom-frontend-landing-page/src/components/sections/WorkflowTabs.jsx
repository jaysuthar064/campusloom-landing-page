import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

export default function WorkflowTabs() {
  const { content } = useContent();

  const localTabs = [
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    },
  ];

  const tabs = localTabs.map((lt, i) => {
    const cmsTab = content?.workflowTabs?.[i] || {};
    return { ...lt, label: cmsTab.label || '', title: cmsTab.title || '', desc: cmsTab.desc || '' };
  });

  return (
    <section style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        <h2 style={{ color: '#1A1A1A', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, textAlign: 'center', marginBottom: 12, letterSpacing: '-0.02em' }}>
          {content?.extraData?.wf_sub || 'All your academic workflows in a single place.'}
        </h2>

        {/* Two Side-by-Side White Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 48 }}>
          {/* Card 1: Attendance */}
          <div style={{ background: '#F7F7F7', borderRadius: 20, padding: 36, border: '1px solid #E8E8E8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: '#3B82F6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                {tabs[0].icon}
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: '#1A1A1A' }}>{tabs[0].label}</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 16, letterSpacing: '-0.015em' }}>{tabs[0].title}</h3>
            <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.65, marginBottom: 24 }}>{tabs[0].desc}</p>
            
            <Link to="/contact" className="btn-primary" style={{ marginBottom: 32 }}>
              <span className="btn-text-wrapper">
                <span className="btn-text-visible">{content?.extraData?.wf_btn || 'Book a Demo'}</span>
                <span className="btn-text-hidden">{content?.extraData?.wf_btn || 'Book a Demo'}</span>
              </span>
            </Link>

            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>Today's Attendance</span>
                <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500, background: '#F7F7F7', padding: '4px 10px', borderRadius: 100 }}>Class 10-A ▾</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 160, height: 160, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', position: 'absolute' }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="8" strokeDasharray="220 251.2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#F59E0B" strokeWidth="8" strokeDasharray="20 188.4" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="#EF4444" strokeWidth="8" strokeDasharray="10 125.6" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 28, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", textAlign: 'center' }}>92%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 12, color: '#1A1A1A', fontWeight: 500, marginTop: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }}></span>Present</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }}></span>Late</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }}></span>Absent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Teacher Portal */}
          <div style={{ background: '#F7F7F7', borderRadius: 20, padding: 36, border: '1px solid #E8E8E8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: '#22C55E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                {tabs[1].icon}
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: '#1A1A1A' }}>{tabs[1].label}</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 16, letterSpacing: '-0.015em' }}>{tabs[1].title}</h3>
            <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.65, marginBottom: 24 }}>{tabs[1].desc}</p>
            
            <Link to="/contact" className="btn-primary" style={{ marginBottom: 32 }}>
              <span className="btn-text-wrapper">
                <span className="btn-text-visible">{content?.extraData?.wf_btn || 'Book a Demo'}</span>
                <span className="btn-text-hidden">{content?.extraData?.wf_btn || 'Book a Demo'}</span>
              </span>
            </Link>

            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
                <div><span style={{ fontSize: 42, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'" }}>85%</span><div style={{ fontSize: 13, color: '#6B6B6B' }}>Syllabus completed</div></div>
                <div><span style={{ fontSize: 42, fontWeight: 800, color: '#3B82F6', fontFamily: "'Bricolage Grotesque'" }}>4.8</span><div style={{ fontSize: 13, color: '#6B6B6B' }}>Average class rating</div></div>
              </div>
              <div style={{ background: '#F9FAFB', borderRadius: 100, padding: '10px 16px', fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Mid-term grading successfully submitted.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&crop=face" alt="Teacher" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}/>
                <div><div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>Mrs. Sharma</div><div style={{ fontSize: 13, color: '#6B6B6B' }}>Upcoming PTM at 2:00 PM</div></div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#3B82F6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </span>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#E8E8E8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', cursor: 'pointer' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
