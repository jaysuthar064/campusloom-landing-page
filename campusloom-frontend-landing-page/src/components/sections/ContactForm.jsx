import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will contact you shortly.');
    setFormData({ name: '', email: '', institution: '', message: '' });
  };

  return (
    <section id="contact" style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          
          {/* Left: Text Content */}
          <div>
            <h2 style={{ color: '#1A1A1A', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Get in touch with our team.
            </h2>
            <p style={{ color: '#6B6B6B', fontSize: 16, lineHeight: 1.6, marginBottom: 32, maxWidth: 450 }}>
              Whether you have a question about features, pricing, or need a demo, our team is ready to answer all your questions.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F7F7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>Headquarters</div>
                  <div style={{ fontSize: 15, color: '#6B6B6B' }}>123 Education Lane, Tech District<br/>New Delhi, India 110001</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F7F7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>Email Us</div>
                  <div style={{ fontSize: 15, color: '#6B6B6B' }}>support@smartshala.com<br/>sales@smartshala.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ background: '#F9FAFB', borderRadius: 24, padding: 40, border: '1px solid #E8E8E8' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #E8E8E8', background: '#fff', fontSize: 15, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#3B82F6'} onBlur={e => e.target.style.borderColor = '#E8E8E8'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@school.edu" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #E8E8E8', background: '#fff', fontSize: 15, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#3B82F6'} onBlur={e => e.target.style.borderColor = '#E8E8E8'} />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>Institution Name</label>
                <input type="text" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} placeholder="Global Public School" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #E8E8E8', background: '#fff', fontSize: 15, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#3B82F6'} onBlur={e => e.target.style.borderColor = '#E8E8E8'} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>Message</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="How can we help you?" rows="4" style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #E8E8E8', background: '#fff', fontSize: 15, outline: 'none', resize: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#3B82F6'} onBlur={e => e.target.style.borderColor = '#E8E8E8'}></textarea>
              </div>

              <button type="submit" style={{ width: '100%', padding: '16px', background: '#1A1A1A', color: '#fff', borderRadius: 12, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, transform 0.1s' }} onMouseEnter={e => e.target.style.background = '#000'} onMouseLeave={e => e.target.style.background = '#1A1A1A'} onMouseDown={e => e.target.style.transform = 'scale(0.98)'} onMouseUp={e => e.target.style.transform = 'scale(1)'}>
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
