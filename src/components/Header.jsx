import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
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
      { name: "Tools & Tech", href: "#tools" },
      { name: "Education", href: "#education" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  const socialLinks = [
    { icon: <FaGithub className="text-lg" />, href: "https://github.com/AtifShahzad536", label: "GitHub" },
    { icon: <FaLinkedin className="text-lg" />, href: "https://www.linkedin.com/in/atif-shahzad903", label: "LinkedIn" },
  ];

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-4 sm:px-6 lg:px-8 py-3`}
      >
        {/* Floating Glass Capsule Wrapper */}
        <div 
          className={`mx-auto max-w-7xl rounded transition-all duration-300 border border-border/80 dark:border-white/5 shadow-soft ${
            isScrolled || isOpen
              ? 'bg-surface/75 backdrop-blur-xl border-border/80 dark:border-white/10 px-6 py-2.5 sm:py-3' 
              : 'bg-transparent px-4 py-3 border-transparent shadow-none'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo branding */}
            <motion.a 
              href="#home" 
              className="text-lg sm:text-xl font-black tracking-tight text-primary flex items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>ATIF</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </motion.a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ name, href }) => {
                const isActive = activeHash === href;
                return (
                  <a
                    key={name}
                    href={href}
                    onClick={() => setActiveHash(href)}
                    className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted hover:text-primaryFg'
                    }`}
                  >
                    <span className="relative z-10">{name}</span>
                    {isActive && (
                      <motion.span 
                        className="absolute inset-0 bg-primary/10 rounded-full border border-primary/25"
                        layoutId="activeNavItem"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Social utilities + toggles */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1">
                {socialLinks.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full text-muted hover:text-primaryFg hover:bg-border/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>

              <div className="h-5 w-[1px] bg-border hidden sm:block" />

              <ThemeToggle />

              {/* Mobile menu hamburger toggle */}
              <motion.button 
                onClick={toggleMenu} 
                className="md:hidden p-2 rounded-full text-muted hover:text-primaryFg hover:bg-border/20 transition-colors relative z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full Page Mobile Nav Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              key="mobile-overlay"
            />
            
            <motion.div 
              className="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-surface/95 border-l border-border dark:border-white/5 backdrop-blur-2xl shadow-2xl z-40 flex flex-col md:hidden pt-24 pb-6 px-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              key="mobile-drawer"
            >
              {/* Mobile links list */}
              <nav className="flex-1 flex flex-col gap-2">
                {navItems.map(({ name, href }, idx) => {
                  const isActive = activeHash === href;
                  return (
                    <motion.a
                      key={name}
                      href={href}
                      onClick={() => {
                        setActiveHash(href);
                        closeMenu();
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all ${
                        isActive
                          ? 'text-primary bg-primary/5 border border-primary/20'
                          : 'text-muted hover:text-primaryFg hover:bg-border/20 border border-transparent'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{name}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </motion.a>
                  );
                })}
              </nav>
              
              {/* Drawer footer utilities */}
              <div className="border-t border-border pt-6 mt-6 space-y-4">
                <div className="flex justify-center gap-4">
                  {socialLinks.map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-border hover:bg-border/55 text-muted hover:text-primaryFg transition-colors"
                      aria-label={label}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
                <div className="text-center text-[10px] text-muted font-mono uppercase tracking-widest">
                  Atif Shahzad © 2026
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;