import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState(
    typeof window !== "undefined" ? window.location.hash || "#home" : "#home"
  );
  const headerRef = useRef(null);
  const { scrollY } = useScroll();

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  const navItems = useMemo(
    () => [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
      { name: "Tools", href: "#tools" },
      { name: "Education", href: "#education" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  const socialLinks = [
    { icon: <FaGithub className="text-xl" />, href: "https://github.com/AtifShahzad536", label: "GitHub" },
    { icon: <FaLinkedin className="text-xl" />, href: "https://linkedin.com/in/atif-shahzad903", label: "LinkedIn" },
    { icon: <FaTwitter className="text-xl" />, href: "https://twitter.com/yourusername", label: "Twitter" },
  ];

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
  }, [activeHash]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header 
        ref={headerRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          backgroundColor: isScrolled || isOpen ? 'rgba(var(--color-surface) / 0.98)' : 'rgba(var(--color-surface) / 0.85)',
          backdropFilter: isScrolled || isOpen ? 'blur(12px)' : 'blur(8px)',
          borderBottom: '1px solid rgba(var(--color-border) / 0.1)'
        }}
        transition={{ 
          duration: 0.3,
          backgroundColor: { duration: 0.2 },
          backdropFilter: { duration: 0.2 }
        }}
        className={`fixed top-0 left-0 right-0 z-50 shadow-sm transition-colors duration-300 ${
          isOpen ? 'bg-surface' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand */}
            <motion.a 
              href="#home" 
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Atif<span className="text-primary">.dev</span>
            </motion.a>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(({ name, icon, href }) => {
                const isActive = activeHash === href;
                return (
                  <motion.a
                    key={name}
                    href={href}
                    className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-primaryFg' 
                        : 'text-muted hover:text-primaryFg'
                    } hover:bg-primary/5`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative">
                      {name}
                      {isActive && (
                        <motion.span 
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                          layoutId="activeNavItem"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            {/* Right: Theme + Mobile Toggle */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-1">
                {socialLinks.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted hover:text-primaryFg hover:bg-border/10 transition-colors"
                    whileHover={{ y: -1, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
              <ThemeToggle />
              <motion.button 
                onClick={toggleMenu} 
                className="md:hidden p-2 -mr-2 rounded-lg text-muted hover:text-foreground hover:bg-border/10 transition-colors relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes className="text-xl" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars className="text-xl" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.15 } }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              onClick={closeMenu}
              key="overlay"
            />
            
            {/* Drawer */}
            <motion.div 
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-surface/95 backdrop-blur-xl border-l border-border/10 shadow-2xl z-50 flex flex-col md:hidden"
              initial={{ x: '100%' }}
              animate={{ 
                x: 0,
                transition: { 
                  type: 'spring', 
                  damping: 30, 
                  stiffness: 300,
                  delay: 0.1
                } 
              }}
              exit={{ 
                x: '100%',
                transition: { 
                  type: 'spring', 
                  damping: 40, 
                  stiffness: 200
                }
              }}
              key="drawer"
            >
              {/* Header */}
              <div className="px-5 py-4 flex justify-between items-center border-b border-border/10 bg-surface/90">
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Menu
                </h2>
                <motion.button 
                  onClick={closeMenu}
                  className="p-2 -mr-2 rounded-lg text-muted hover:text-foreground hover:bg-border/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 p-2 overflow-y-auto overscroll-contain">
                <div className="space-y-1 py-2">
                  {navItems.map(({ name, icon, href }) => {
                    const isActive = activeHash === href;
                    return (
                      <motion.a
                        key={name}
                        href={href}
                        onClick={closeMenu}
                        className={`relative flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'text-primaryFg font-semibold bg-primary/5'
                            : 'text-muted hover:text-foreground hover:bg-border/5'
                        }`}
                        initial={false}
                        whileHover={{ 
                          x: 4,
                          backgroundColor: 'rgba(var(--color-primary) / 0.03)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 400, 
                          damping: 30 
                        }}
                      >
                        <span className="relative flex-1">
                          {name}
                          {isActive && (
                            <motion.span 
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                              layoutId="mobileActiveDot"
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30
                              }}
                            />
                          )}
                        </span>
                        {isActive && (
                          <motion.span 
                            className="w-2 h-2 bg-primary rounded-full ml-2"
                            layoutId="mobileActiveDot"
                            transition={{
                              type: 'spring',
                              stiffness: 500,
                              damping: 30
                            }}
                          />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
                
                {/* Social Links */}
                <div className="px-4 py-6 border-t border-border/10 mt-4">
                  <h3 className="text-sm font-medium text-muted mb-4 px-2">Connect with me</h3>
                  <div className="flex space-x-3">
                    {socialLinks.map(({ icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-3 rounded-xl bg-border/5 hover:bg-primary/10 text-muted hover:text-foreground transition-colors flex items-center justify-center"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        aria-label={label}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </nav>
              
              {/* Footer */}
              <div className="p-4 border-t border-border/10 bg-surface/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">v1.0.0</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Add padding to account for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;