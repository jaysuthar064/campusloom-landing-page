import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { ContentProvider, useContent } from './context/ContentContext';

import { motion } from 'framer-motion';

function AppContent() {
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
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', color: '#EF4444', fontSize: 20, fontWeight: 500, padding: 24, textAlign: 'center' }}>
        Failed to load CMS content.<br/>Please ensure WordPress is running at localhost:8883 and the Campus Loom Headless plugin is activated.
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
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
