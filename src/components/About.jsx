'use client';

import { motion, useInView, useTransform, useViewportScroll } from 'framer-motion';
import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { FaReact, FaNodeJs, FaServer, FaMobileAlt, FaCode, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiNextdotjs, SiGraphql } from 'react-icons/si';
import { TbBrandFramer, TbCode } from 'react-icons/tb';
import { CgScreen } from 'react-icons/cg';
import ThreeScene from "./ThreeScene";

// Lazy load the TechSphere component
const TechSphere = lazy(() => import('./TechSphere'));

const About = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const isInView = true; // Simplified for now, can be enhanced with IntersectionObserver if needed
  
  // Only render Three.js components on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Client-side only scroll effects
  const [isClient, setIsClient] = useState(false);
  const y = useRef(0);
  const opacity = useRef(1);
  const scale = useRef(1);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        const start = windowHeight * 0.8; // Start animation when 80% of the viewport is scrolled
        const end = windowHeight * 1.2;   // End animation when 120% of the viewport is scrolled
        const progress = Math.min(1, Math.max(0, (scrollY - rect.top + start) / (end - start)));
        
        // Update motion values
        y.current = progress * 50;
        opacity.current = progress < 0.5 ? progress * 2 : 1 - (progress - 0.5) * 0.2;
        scale.current = 0.95 + (progress * 0.05);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: <CgScreen className="text-primary" /> },
    { id: 'backend', label: 'Backend', icon: <FaServer className="text-secondary" /> },
    { id: 'mobile', label: 'Mobile', icon: <FaMobileAlt className="text-purple-500" /> },
  ];

  const skills = [
    {
      title: 'Frontend Development',
      icon: <CgScreen className="text-4xl" />,
      description: 'Crafting beautiful, responsive UIs with modern frameworks and libraries.',
      tech: [
        { name: 'React', level: 95, icon: <FaReact className="text-[#61DAFB]" /> },
        { name: 'Next.js', level: 90, icon: <SiNextdotjs /> },
        { name: 'TypeScript', level: 88, icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: 'Tailwind', level: 92, icon: <SiTailwindcss className="text-[#38BDF8]" /> },
        { name: 'Framer Motion', level: 85, icon: <TbBrandFramer /> },
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Backend Development',
      icon: <FaServer className="text-4xl" />,
      description: 'Building scalable and efficient server-side applications and APIs.',
      tech: [
        { name: 'Node.js', level: 90, icon: <FaNodeJs className="text-[#68A063]" /> },
        { name: 'Express', level: 88, icon: <FaCode className="text-gray-600" /> },
        { name: 'MongoDB', level: 85, icon: <SiMongodb className="text-[#47A248]" /> },
        { name: 'GraphQL', level: 82, icon: <SiGraphql className="text-[#E10098]" /> },
        { name: 'PostgreSQL', level: 80, icon: <FaDatabase className="text-blue-600" /> },
      ],
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'Mobile Development',
      icon: <FaMobileAlt className="text-4xl" />,
      description: 'Creating cross-platform mobile applications with native performance.',
      tech: [
        { name: 'React Native', level: 90, icon: <FaReact className="text-[#61DAFB]" /> },
        { name: 'Expo', level: 88, icon: <SiNextdotjs /> },
        { name: 'Redux', level: 85, icon: <TbCode className="text-purple-500" /> },
        { name: 'Firebase', level: 83, icon: <FaServer className="text-orange-500" /> },
        { name: 'UI/UX', level: 87, icon: <CgScreen className="text-pink-500" /> },
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // This section intentionally left blank as we already have these declarations at the top

  return (
    <section 
      id="about" 
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ position: 'relative' }}
    >
      <ThreeScene />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Suspense fallback={<div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto" />}>
          <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isClient ? 1 : 0, 
            y: isClient ? 0 : 30,
            scale: isClient ? 1 : 0.95
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            About Me
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Crafting Digital
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experiences
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I specialize in turning complex problems into simple, beautiful, and intuitive solutions. 
            With a keen eye for design and a passion for clean code, I create digital experiences 
            that are both functional and visually stunning.
          </motion.p>

          {/* Highlights */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-muted/50 text-muted-foreground border border-border/40">
              <span className="h-2 w-2 rounded-full bg-primary" /> Performance-first UIs
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-muted/50 text-muted-foreground border border-border/40">
              <span className="h-2 w-2 rounded-full bg-secondary" /> Scalable APIs
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-muted/50 text-muted-foreground border border-border/40">
              <span className="h-2 w-2 rounded-full bg-accent" /> Delightful UX
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="rounded-2xl border border-border/30 bg-card/70 backdrop-blur-sm p-5 text-left hover:border-primary/30 transition-colors">
              <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">3+ </p>
              <p className="mt-1 text-sm text-muted-foreground">Years building for the web</p>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/70 backdrop-blur-sm p-5 text-left hover:border-primary/30 transition-colors">
              <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">20+ </p>
              <p className="mt-1 text-sm text-muted-foreground">Projects shipped end‑to‑end</p>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/70 backdrop-blur-sm p-5 text-left hover:border-primary/30 transition-colors">
              <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">10+ </p>
              <p className="mt-1 text-sm text-muted-foreground">Core technologies in daily use</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex bg-card/50 p-1 rounded-2xl border border-border/20 backdrop-blur-sm">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  activeTab === index 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </span>
                <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-primary/10 shadow-sm' 
                    : 'bg-transparent group-hover:bg-background/50'
                }`}></span>
                <span className={`absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 ${
                  activeTab === index ? 'scale-100' : 'scale-0'
                }`}></span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {skills[activeTab].tech.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="relative overflow-hidden bg-card/70 backdrop-blur-sm rounded-2xl p-5 border border-border/20 hover:border-primary/40 transition-all duration-300 group"
              whileHover={{ y: -6, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
              </div>

              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <svg width="64" height="64" viewBox="0 0 64 64" className="block">
                    <circle cx="32" cy="32" r="28" className="stroke-border" strokeWidth="6" fill="none" />
                    <motion.circle
                      cx="32" cy="32" r="28" strokeWidth="6" fill="none"
                      className="stroke-primary"
                      strokeLinecap="round"
                      strokeDasharray={`${2*Math.PI*28}`}
                      strokeDashoffset={`${(1 - tech.level/100)*2*Math.PI*28}`}
                      initial={{ strokeDashoffset: `${2*Math.PI*28}` }}
                      whileInView={{ strokeDashoffset: `${(1 - tech.level/100)*2*Math.PI*28}` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.1 * index }}
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-xs font-bold text-foreground/80">
                    {tech.level}%
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 grid place-items-center text-lg">
                      {tech.icon}
                    </div>
                    <h4 className="font-semibold text-foreground truncate">{tech.name}</h4>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.12 * index }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </Suspense>
      </div>
    </section>
  );
};

export default About;