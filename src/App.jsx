import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Preloader3D from './components/Preloader3D';

const App = () => {
  // Enable smooth scrolling
  useSmoothScroll();

  // Add scroll-based animations
  useEffect(() => {
    // Add scroll-based class to body for scroll effects
    const handleScroll = () => {
      document.body.setAttribute('data-scroll', window.scrollY > 100 ? 'scrolled' : '');
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [showContent, setShowContent] = React.useState(false);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {!showContent && (
          <Preloader3D title="Atif Shahzad" modelUrl="/models/loader.glb" onReady={() => setShowContent(true)} />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="min-h-screen bg-background text-foreground transition-colors duration-300"
        >
          <Header />
          <main className="overflow-hidden">
            <Home />
          </main>
          <Footer />
          <ChatBot />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;