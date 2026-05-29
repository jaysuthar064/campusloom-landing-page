import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import { ContentProvider, useContent } from './context/ContentContext';

import { motion } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function AppContent() {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { loading, error } = useContent();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{ width: '16px', height: '16px', background: '#3B82F6', borderRadius: '50%' }}
              animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            />
          ))}
        </div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: '#1A1A1A', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}
        >
          Loading Campus Loom...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff', padding: 24, textAlign: 'center' }}>
        <div style={{ background: '#FFF0F0', color: '#EF4444', padding: '16px 24px', borderRadius: 12, fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
          Service Unavailable
        </div>
        <p style={{ color: '#6B6B6B', fontSize: 16, maxWidth: 400, lineHeight: 1.6 }}>
          We are currently updating our systems to provide a better experience. Please try refreshing the page in a few minutes.
        </p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 24, padding: '12px 24px', background: '#000', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 600, cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={e => e.target.style.transform='scale(0.95)'} onMouseUp={e => e.target.style.transform='scale(1)'} onMouseLeave={e => e.target.style.transform='scale(1)'}>
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  )
}

export default App
