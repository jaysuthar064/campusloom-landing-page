import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

export default function HeroSection() {
  const containerRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const { content } = useContent();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 30; // Soft parallax intensity
      const y = (e.clientY - top - height / 2) / 30;

      if (leftImgRef.current) leftImgRef.current.style.transform = `translate(${x}px, ${y}px)`;
      if (rightImgRef.current) rightImgRef.current.style.transform = `translate(${x * -0.8}px, ${y * -0.8}px)`; // inverted slight parallax
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderAnimatedText = (text, delayStart, className) => {
    if (!text) return null;
    let globalIndex = 0;
    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span key={`word-${wIdx}`} style={{ display: 'inline-block', marginRight: wIdx !== words.length - 1 ? '0.25em' : '0' }}>
        {word.split('').map((char, cIdx) => {
          const delay = delayStart + globalIndex * 0.03;
          globalIndex++;
          return (
            <span key={`char-${cIdx}`} className={className} style={{ animationDelay: `${delay}s` }}>
              {char}
            </span>
          );
        })}
      </span>
    ));
  };

  return (
    <section className="animate-fade-up" ref={containerRef} style={{ 
      padding: '80px 0 70px', 
      background: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Grid Background & Glow Blobs */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: '20%',
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      
      {/* Animated Blobs */}
      <div className="blob-1" style={{ position: 'absolute', top: '-10%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div className="blob-2" style={{ position: 'absolute', top: '20%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="container-main" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Cinematic Letter-by-Letter Headline */}
        <h1 style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 600, lineHeight: 1.1, color: '#1A1A1A', marginBottom: 24, letterSpacing: '-0.02em', margin: '0 auto 24px', width: '100%' }}>
          <span style={{ display: 'inline-block' }}>
            {renderAnimatedText(content.hero.title1, 0.1, "hero-letter")}
          </span>
          <br/>
          <span style={{ display: 'inline-block' }}>
            {renderAnimatedText(content.hero.title2, 0.8, "hero-letter-gradient")}
          </span>
        </h1>
        
        <p className="animate-fade-up delay-3" style={{ textAlign: 'center', fontSize: 'clamp(16px, 2vw, 20px)', color: '#404040', maxWidth: 800, margin: '0 auto 40px', lineHeight: 1.6, fontWeight: 500 }}>
          {content.hero.subtitle}
        </p>

        {/* Buttons */}
        <div className="animate-fade-up delay-4 flex flex-col sm:flex-row justify-center gap-4 mb-6" style={{ alignItems: 'center' }}>
          <a href="/#contact" className="btn-primary hero-btn-hover" style={{ padding: '18px 36px', fontSize: 16 }}>
            <span className="btn-text-wrapper">
              <span className="btn-text-visible">{content?.hero?.btn1 || 'Request A Demo'}</span>
              <span className="btn-text-hidden">{content?.hero?.btn1 || 'Request A Demo'}</span>
            </span>
          </a>
          <a href="/#features" className="btn-secondary" style={{ padding: '18px 36px', fontSize: 16, background: '#fff' }}>
            <span className="btn-text-wrapper">
              <span className="btn-text-visible">{content.hero.btn2 || "Explore Features"}</span>
              <span className="btn-text-hidden">{content.hero.btn2 || "Explore Features"}</span>
            </span>
          </a>
        </div>
        
        {/* Subtext */}
        <div className="animate-fade-up delay-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, color: '#1A1A1A', fontSize: 15, fontWeight: 600, marginBottom: 80 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 5"/></svg>
          {content.hero.subtext || "No credit card required. Free 14 days trial"}
        </div>

        {/* Hero Visual Area (2 Column Grid) */}
        <div className="animate-fade-up delay-5 grid grid-cols-1 md:grid-cols-[2fr_1.1fr] gap-8 max-w-[1100px] mx-auto" style={{ perspective: '1000px' }}>
          
          {/* Left Large Image */}
          <div ref={leftImgRef} className="zoom-wrapper floating" style={{ position: 'relative', borderRadius: 32, height: 500, boxShadow: '0 24px 48px rgba(0,0,0,0.08)', transition: 'transform 0.1s linear' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 32, overflow: 'hidden' }}>
              <img className="zoom-image" src={content.hero.imgLeft || "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop"} alt="Students in classroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            {/* Left Floating Card - Glassmorphism */}
            <div className="glass-card" style={{ position: 'absolute', bottom: 32, left: 32, padding: '24px 28px', borderRadius: 20, width: 240, zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 12, color: '#404040', fontWeight: 600 }}>
                <span>{content?.hero?.leftCard?.title || 'Total Enrolled'}</span><span>•••</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'" }}>{content?.hero?.leftCard?.num || '1,829'}</span>
                <span style={{ fontSize: 13, color: '#3B82F6', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', padding: '4px 10px', borderRadius: 100, fontWeight: 700 }}>{content?.hero?.leftCard?.badge || '↑ 15%'}</span>
              </div>
            </div>
          </div>

          {/* Right Smaller Image */}
          <div ref={rightImgRef} className="zoom-wrapper floating" style={{ position: 'relative', borderRadius: 32, height: 500, boxShadow: '0 24px 48px rgba(0,0,0,0.08)', animationDelay: '-3s', transition: 'transform 0.1s linear' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 32, overflow: 'hidden' }}>
              <img className="zoom-image" src={content.hero.imgRight || "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=800&fit=crop"} alt="Teacher smiling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            {/* Right Floating Card - Glassmorphism */}
            <div className="glass-card" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', padding: '24px', borderRadius: 20, width: '85%', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 12, color: '#404040', fontWeight: 600 }}>
                <span>{content?.hero?.rightCard?.title || 'Fee Balance'}</span><span>•••</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", marginBottom: 16 }}>{content?.hero?.rightCard?.num || '₹5,56,897'}</div>
              
              {/* Gradient Bar */}
              <div style={{ height: 10, borderRadius: 5, background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 40%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 100%)', marginBottom: 12 }}></div>
              
              {/* Legends */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#404040', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6' }}></span>{content?.hero?.rightCard?.legend1 || 'Collected'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }}></span>{content?.hero?.rightCard?.legend2 || 'Pending'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
