import React from 'react';
import { useContent } from '../../context/ContentContext';

export default function TrustMarquee() {
  const { content } = useContent();
  const defaultLogos = [
    { name: 'Global Public School', logo: '' },
    { name: 'St. Xavier\'s High', logo: '' },
    { name: 'Greenwood Academy', logo: '' },
    { name: 'Delhi Public School', logo: '' },
    { name: 'Oakridge International', logo: '' }
  ];
  
  const clients = content?.clients?.length > 0 ? content.clients : defaultLogos;
  const all = [...clients, ...clients, ...clients];

  return (
    <section style={{ background: '#fff', padding: '60px 0', marginTop: 60 }}>
      <div className="container-main">
        <p style={{ textAlign: 'center', color: '#6B6B6B', fontSize: 14, fontWeight: 500, marginBottom: 40, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {content?.trust?.subtitle || "Trusted by leading educational institutions worldwide"}
        </p>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {all.map((client, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#6B6B6B', fontSize: 24, fontWeight: 700, opacity: 0.8, flexShrink: 0, fontFamily: "'Bricolage Grotesque'" }}>
              {client.logo ? (
                <img src={client.logo} alt={client.name} style={{ height: 40, objectFit: 'contain' }} />
              ) : (
                <><span style={{ fontSize: 28, color: '#3B82F6' }}>✦</span> {client.name}</>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
