import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import ChatBotIcon from './components/ChatBotIcon';
import Preloader3D from './components/Preloader3D';
import Background from './components/Background';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      document.body.setAttribute('data-scroll', window.scrollY > 100 ? 'scrolled' : '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadingComplete = () => {
    // This will be called when the preloader's exit animation is complete
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <Background>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Preloader3D 
              title="Atif Shahzad"
              onReady={() => {
                // This will be called when loading reaches 100%
                // The actual unmount will happen after the exit animation
              }}
              onFinished={handleLoadingComplete}
            />
          ) : (
            <motion.div
              key="app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Header />
              <main>
                <Home />
              </main>
              <Footer />
              <ChatBotIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </Background>
    </ThemeProvider>
  );
};

export default App;