import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'light';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (light) {
      html.classList.add('light');
      html.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.remove('light');
      html.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    }
  }, [light]);

  const toggleTheme = () => setLight(prev => !prev);

  return (
    <ThemeContext.Provider value={{ light, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
