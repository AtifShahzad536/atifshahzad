import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

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

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Header />
          <main className="overflow-hidden">
            <Home />
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;