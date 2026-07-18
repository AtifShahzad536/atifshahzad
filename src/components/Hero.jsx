import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaRocket } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiFastapi } from 'react-icons/si';
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

import { motion } from 'framer-motion';
import AtifImage from '../assets/atif_new.jpg';

const Hero = () => {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const marqueeRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const typingTexts = [
    "Full Stack Web Developer",
    "FastAPI & Backend Engineer",
    "React Native Mobile Builder"
  ];

  // Typing animation effect
  useEffect(() => {
    const currentText = typingTexts[currentTextIndex];
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 75;

    const type = () => {
      if (!isDeleting) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex++;
        if (charIndex > currentText.length) {
          setTimeout(() => { isDeleting = true; type(); }, 1500);
          return;
        }
      } else {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          return;
        }
      }
      setTimeout(type, isDeleting ? 30 : typingSpeed);
    };

    const timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, [currentTextIndex]);

  // Card 3D tilt movement based on mouse
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Tilt degrees
    const rY = (x / (rect.width / 2)) * 12;
    const rX = -(y / (rect.height / 2)) * 12;

    gsap.to(card, {
      rotateY: rY,
      rotateX: rX,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out"
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  }, []);

  // Background text marquee infinite horizontal scroll using GSAP
  useEffect(() => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      x: "-50%",
      duration: 25,
      ease: "none",
      repeat: -1
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center py-12 lg:py-24 overflow-hidden z-10"
      id="home"
    >
      {/* Heavy Cyber Marquee Scrolling Backdrop */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden z-0 opacity-[0.03]">
        <div ref={marqueeRef} className="text-[12vw] font-black uppercase tracking-tighter whitespace-nowrap flex gap-12 text-primaryFg">
          <span>BUILD • SECURE • DELIVER • DEVELOP •</span>
          <span>BUILD • SECURE • DELIVER • DEVELOP •</span>
        </div>
      </div>

      <div className="container-prose relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* Left Column: Typographical Showcase */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Header pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface/50 border border-border backdrop-blur-md rounded-full shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground text-primary/80">
              Open for Collaboration
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight leading-none text-primaryFg">
            <span className="block text-muted text-lg sm:text-xl font-medium tracking-widest uppercase mb-2">Hello, I'm</span>
            <span className="text-primaryFg drop-shadow-sm font-extrabold">
              Atif Shahzad
            </span>
          </h1>
 
          {/* Typed Bio */}
          <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
            <p className="text-lg sm:text-2xl font-bold text-primary">
              {displayText}
              <span className="inline-block w-1 h-5 ml-1 bg-primary animate-pulse" />
            </p>
          </div>
 
          <p className="text-sm sm:text-base text-muted max-w-lg leading-relaxed">
            I engineering fluid, high-performance web applications and native mobile interfaces.
            Specializing in the MERN Stack, FastAPI microservices, and React Native platforms to turn code ideas into robust digital products.
          </p>
 
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-background font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Get In Touch</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 bg-surface/50 hover:bg-surface border border-border hover:border-primary/20 text-primaryFg font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>View Projects</span>
              <FaRocket className="text-secondary" />
            </a>
          </div>

          {/* Quick Metrics display */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-border w-full max-w-md">
            <div>
              <div className="text-xl sm:text-3xl font-black text-primaryFg">1+</div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Years Dev Experience</div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-black text-primaryFg">10+</div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Completed Builds</div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-black text-primaryFg">100%</div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Quality Assurance</div>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Avatar with Animated Glowing Orbiting Rings */}
        <div className="lg:col-span-5 flex justify-center items-center relative w-full h-[350px] sm:h-[450px] mt-6 lg:mt-0">
          
          {/* Orbital Badges (Floating absolutely in front/around) */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-4 sm:left-10 z-20 p-2.5 bg-surface/80 border border-border rounded-xl shadow-lg flex items-center justify-center text-primary"
          >
            <SiReact className="text-2xl animate-spin-slow" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-4 sm:right-10 z-20 p-2.5 bg-surface/80 border border-border rounded-xl shadow-lg flex items-center justify-center text-accent"
          >
            <SiFastapi className="text-2xl" />
          </motion.div>

          <motion.div 
            animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -right-2 sm:-right-4 z-20 p-2.5 bg-surface/80 border border-border rounded-xl shadow-lg flex items-center justify-center text-secondary"
          >
            <SiNodedotjs className="text-2xl" />
          </motion.div>

          {/* Outer Ring 1: Moves to the Right, Rotates, and Glows */}
          <motion.div
            animate={{
              x: [0, 40, 0],
              rotate: 360,
              scale: [1, 1.03, 1]
            }}
            transition={{
              x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute w-72 h-72 sm:w-[22rem] sm:h-[22rem] rounded-full border border-primary/30 border-dashed pointer-events-none z-0 flex items-center justify-center"
            style={{
              boxShadow: '0 0 30px rgba(191, 97, 50, 0.25), inset 0 0 30px rgba(191, 97, 50, 0.15)',
            }}
          >
            {/* Glowing nodes on Ring 1 */}
            <div className="absolute top-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#00f0ff]" />
            <div className="absolute bottom-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#00f0ff]" />
            <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#ff007f]" />
          </motion.div>

          {/* Outer Ring 2: Moves to the Left, Rotates Counter-clockwise, and Glows */}
          <motion.div
            animate={{
              x: [0, -40, 0],
              rotate: -360,
              scale: [1, 1.04, 1]
            }}
            transition={{
              x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute w-[20rem] h-[20rem] sm:w-[25rem] sm:h-[25rem] rounded-full border border-secondary/30 border-double pointer-events-none z-0 flex items-center justify-center"
            style={{
              borderWidth: '3px',
              boxShadow: '0 0 35px rgba(263, 90, 64, 0.25), inset 0 0 35px rgba(263, 90, 64, 0.15)',
            }}
          >
            {/* Glowing nodes on Ring 2 */}
            <div className="absolute left-0 w-3.5 h-3.5 rounded-full bg-secondary shadow-[0_0_15px_#bc3fff]" />
            <div className="absolute right-0 w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_15px_#ff007f]" />
          </motion.div>

          {/* Floating Science/Tech Particle Sparkles */}
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute left-1/4 top-1/4 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00f0ff] z-10"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            className="absolute right-1/4 bottom-1/4 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#ff007f] z-10"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, -10, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 3.5 }}
            className="absolute right-1/3 top-1/3 w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#bc3fff] z-10"
          />

          {/* Central Image Circle with Hover Tilt & Float Animation */}
          <motion.div
            animate={{
              y: [0, -12, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05, y: -20 }}
            className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full p-1.5 bg-gradient-to-tr from-primary via-secondary to-accent z-10 shadow-2xl flex items-center justify-center cursor-pointer"
            style={{
              boxShadow: '0 0 50px rgba(191, 97, 50, 0.45), 0 0 20px rgba(263, 90, 64, 0.3)',
            }}
          >
            {/* Spinning inner gradient background border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0.5 rounded-full bg-gradient-to-r from-primary/60 via-transparent to-accent/60 -z-10"
            />

            <div className="w-full h-full rounded-full overflow-hidden border border-border bg-background/90 flex items-center justify-center relative">
              <img
                src={AtifImage}
                alt="Atif Shahzad"
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 pointer-events-none"
              />
              {/* Sci-fi Overlay highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Soft decorative ambient glow backdrop */}
          <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
