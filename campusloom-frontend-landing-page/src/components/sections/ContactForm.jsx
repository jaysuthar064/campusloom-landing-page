import React, { useEffect, useState } from 'react';

export default function ContactForm() {
  const wpUrl = import.meta.env.VITE_WP_API_URL || 'http://localhost:8883';
  const iframeUrl = `${wpUrl}/headless-contact/`;
  const [iframeHeight, setIframeHeight] = useState(800);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === 'elementor_form_height') {
        setIframeHeight(e.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section id="contact" style={{ background: '#fff', padding: '100px 0' }}>
      <div className="container-main">
        {/* Full Width Elementor Bridge */}
        <div style={{ width: '100%', minHeight: iframeHeight, position: 'relative' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', zIndex: 10 }}>
              <div style={{ width: 40, height: 40, border: '3px solid #f3f3f3', borderTop: '3px solid #1A1A1A', borderRadius: '50%', animation: 'cl-spin 1s linear infinite' }}></div>
              <style>{`
                @keyframes cl-spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}
          <iframe
            src={iframeUrl}
            title="Contact Form"
            style={{
              width: '100%',
              height: iframeHeight,
              border: 'none',
              overflow: 'hidden',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.4s ease-in-out'
            }}
            scrolling="no"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </section>
  );
}
