import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';

export default function ContactForm() {
  const { content } = useContent();
  const contactInfo = content?.contactInfo || {};
  const wpUrl = import.meta.env.VITE_WP_API_URL || 'http://localhost:8883';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Use x-www-form-urlencoded to completely bypass the broken OPTIONS preflight check on the server
      const response = await fetch(`${wpUrl}/wp-json/campusloom/v1/contact?v=3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', institution: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFAFA]">
      <div className="container-main">
        
        <div className="text-center mb-16">
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-[#1A1A1A] font-['Bricolage_Grotesque'] tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
            Ready to transform your educational institution? Contact our team for a personalized demo or any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-0 max-w-[1100px] mx-auto bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E8E8E8]">
          
          {/* Left Side: Contact Info */}
          <div className="bg-[#1A1A1A] text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3B82F6] to-[#F97316] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-['Bricolage_Grotesque'] mb-8">{contactInfo.title || 'Contact Information'}</h3>
              <p className="text-[#A3A3A3] mb-12 leading-relaxed">
                {contactInfo.desc || "Fill out the form and our team will get back to you within 24 hours. We're here to help you succeed."}
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center shrink-0 text-[#3B82F6]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#A3A3A3] mb-1">Phone</div>
                    <div className="font-semibold">{contactInfo.phone || '+91 98765 43210'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center shrink-0 text-[#F97316]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#A3A3A3] mb-1">Email</div>
                    <div className="font-semibold">{contactInfo.email || 'info@smartshala.com'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center shrink-0 text-[#10B981]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#A3A3A3] mb-1">Location</div>
                    <div className="font-semibold leading-snug" dangerouslySetInnerHTML={{ __html: contactInfo.location || '123 Education Lane, Tech District<br/>New Delhi, India 110001' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="p-10 md:p-14">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-up">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-3xl font-bold font-['Bricolage_Grotesque'] text-[#1A1A1A] mb-4">Message Sent!</h3>
                <p className="text-[#6B6B6B] text-lg max-w-sm">
                  Thank you for reaching out. Our team will review your message and get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[#3B82F6] font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-fade-up">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-[#1A1A1A]">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-[#1A1A1A]">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="institution" className="text-sm font-semibold text-[#1A1A1A]">Institution Name (Optional)</label>
                  <input 
                    type="text" 
                    id="institution" 
                    name="institution" 
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Delhi Public School"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-[#1A1A1A]">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="mt-4 bg-[#1A1A1A] text-white py-4 px-8 rounded-full font-semibold text-base hover:bg-[#3B82F6] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
                
                <p className="text-xs text-center text-[#A3A3A3] mt-2">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
