import React from 'react';

export default function SuccessFeatures() {
  const features = [
    { icon: '📋', color: '#3B82F6', title: 'Tax calculation & filing support.', desc: 'Set custom alerts for important deadlines, meetings, or any task you need to complete. Our intelligent system.' },
    { icon: '💳', color: '#3B82F6', title: 'Multi-currency Support.', desc: 'Provide tools to calculate and estimate taxes with integration options for easy filing.' },
    { icon: '🔔', color: '#3B82F6', title: 'Personalized Alerts & Notifications', desc: 'Get alerts for overspending, bill payments, low account balances, or major financial changes.' }
  ];

  return (
    <section style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        <h2 style={{ color: '#1A1A1A', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, textAlign: 'center', marginBottom: 12, letterSpacing: '-0.02em' }}>
          Success by the numbers.
        </h2>
        <p style={{ color: '#6B6B6B', textAlign: 'center', marginBottom: 60, fontSize: 16 }}>
          You can easily view your spending patterns through intuitive visual
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
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: f.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff' }}>{f.icon}</span>
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
                <span style={{ width: 48, height: 48, borderRadius: 12, background: '#3B82F6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20 }}>📄</span>
                <div>
                  <div style={{ fontSize: 14, color: '#6B6B6B', fontWeight: 500, marginBottom: 2 }}>Total order</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", letterSpacing: '-0.02em' }}>$526.40</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 14, color: '#fff', background: '#F97316', padding: '6px 14px', borderRadius: 100, fontWeight: 600 }}>+3,09</span>
                <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 600, textAlign: 'right', lineHeight: 1.4 }}>Product vs<br/>last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
