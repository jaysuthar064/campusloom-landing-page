import React, { useState } from 'react';

export default function WorkflowTabs() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { label: 'Sales Automation', title: 'Tools and tactics to scale.', desc: 'Sales automation is the process of using technology to stream -line and automate repetitive tasks in the sales process.' },
    { label: 'Sales Automation', title: 'Tools and tactics to scale.', desc: 'Sales automation is the process of using technology to stream -line and automate repetitive tasks in the sales process.' },
  ];

  return (
    <section style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        <h2 style={{ color: '#1A1A1A', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, textAlign: 'center', marginBottom: 12, letterSpacing: '-0.02em' }}>
          All your team's workflow in a single place.
        </h2>

        {/* Two Side-by-Side White Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 48 }}>
          {tabs.map((t, i) => (
            <div key={i} style={{ background: '#F7F7F7', borderRadius: 20, padding: 36, border: '1px solid #E8E8E8' }}>
              {/* Icon Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: i === 0 ? '#3B82F6' : '#22C55E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#fff' }}>
                  {i === 0 ? '📅' : '📚'}
                </span>
                <span style={{ fontSize: 16, fontWeight: 500, color: '#1A1A1A' }}>{t.label}</span>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 16, letterSpacing: '-0.015em' }}>{t.title}</h3>
              <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.65, marginBottom: 24 }}>{t.desc}</p>
              
              <a href="https://campus-loom.vercel.app/register" className="btn-primary" style={{ marginBottom: 32 }}>Book A Demo</a>

              {/* Inner Analytics Card */}
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>Top customers</span>
                  <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500, background: '#F7F7F7', padding: '4px 10px', borderRadius: 100 }}>Weekly ▾</span>
                </div>
                {i === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 160, height: 160, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', position: 'absolute' }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="8" strokeDasharray="180 251.2" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#3B82F6" strokeWidth="8" strokeDasharray="120 188.4" />
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#F59E0B" strokeWidth="8" strokeDasharray="60 125.6" />
                      </svg>
                      <div style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'" }}>640k</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 12, color: '#1A1A1A', fontWeight: 500, marginTop: 16 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }}></span>Social app</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6' }}></span>Mobile web</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }}></span>E-commerce</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
                      <div><span style={{ fontSize: 42, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'" }}>70%</span><div style={{ fontSize: 13, color: '#6B6B6B' }}>Task completed</div></div>
                      <div><span style={{ fontSize: 42, fontWeight: 800, color: '#3B82F6', fontFamily: "'Bricolage Grotesque'" }}>32%</span><div style={{ fontSize: 13, color: '#6B6B6B' }}>Better then last month</div></div>
                    </div>
                    <div style={{ background: '#F9FAFB', borderRadius: 100, padding: '10px 16px', fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 16 }}>😍 Your work balance this week awesome!</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}/>
                      <div><div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>Wade Warren</div><div style={{ fontSize: 13, color: '#6B6B6B' }}>Now Google Meet!</div></div>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                        <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#3B82F6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>📞</span>
                        <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#EF4444', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>✕</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
