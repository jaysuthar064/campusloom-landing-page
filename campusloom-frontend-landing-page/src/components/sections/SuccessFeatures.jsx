import React from 'react';

export default function SuccessFeatures() {
  const features = [
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>, 
      color: '#3B82F6', 
      title: 'Automated Report Cards', 
      desc: 'Generate customized, term-wise report cards instantly, incorporating grades, attendance, and teacher remarks.' 
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>, 
      color: '#3B82F6', 
      title: 'Online Fee Gateway', 
      desc: 'Provide parents with seamless tools to pay fees online using multiple payment gateway integrations securely.' 
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>, 
      color: '#3B82F6', 
      title: 'Instant SMS & Email Alerts', 
      desc: 'Send automated notifications for overdue fees, attendance drops, low scores, or major school announcements.' 
    }
  ];

  return (
    <section style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        <h2 style={{ color: '#1A1A1A', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, textAlign: 'center', marginBottom: 12, letterSpacing: '-0.02em' }}>
          Excellence by the numbers.
        </h2>
        <p style={{ color: '#6B6B6B', textAlign: 'center', marginBottom: 60, fontSize: 16 }}>
          Easily visualize your institution's growth and daily operations through intuitive dashboards.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
          {/* Left: Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {features.map((f, i) => (
              <div key={i} style={{ 
                padding: '0 0 0 24px', 
                borderLeft: i === 0 ? '4px solid #3B82F6' : '4px solid transparent',
                marginLeft: i === 0 ? -4 : 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: f.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{f.icon}</span>
                  <h4 style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>{f.title}</h4>
                </div>
                <p style={{ fontSize: 16, color: '#6B6B6B', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Right: White card with mock data widget */}
          <div style={{ background: '#F7F7F7', borderRadius: 24, padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 450, border: '1px solid #E8E8E8' }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '85%', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: -12, left: '5%', width: '90%', height: 20, background: '#fff', borderRadius: 20, zIndex: -1, boxShadow: '0 10px 30px rgba(0,0,0,0.04)', opacity: 0.6 }}></div>
              <div style={{ position: 'absolute', bottom: -24, left: '10%', width: '80%', height: 20, background: '#fff', borderRadius: 20, zIndex: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.02)', opacity: 0.3 }}></div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                <span style={{ width: 48, height: 48, borderRadius: 12, background: '#3B82F6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                </span>
                <div>
                  <div style={{ fontSize: 14, color: '#6B6B6B', fontWeight: 500, marginBottom: 2 }}>Total Admissions</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", letterSpacing: '-0.02em' }}>1,245</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 14, color: '#fff', background: '#F97316', padding: '6px 14px', borderRadius: 100, fontWeight: 600 }}>+15%</span>
                <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 600, textAlign: 'right', lineHeight: 1.4 }}>Admissions vs<br/>last year</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
