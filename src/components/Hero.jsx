import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHandPaper } from 'react-icons/fa';
import { BsPersonWorkspace, BsArrowDown, BsArrowRight } from 'react-icons/bs';
import { MdOutlineEmail, MdOutlineWorkOutline } from 'react-icons/md';
import { SiLeetcode } from 'react-icons/si';
import { useRef, useState,React } from 'react';
import ThreeScene from './ThreeScene';
import AtifImage from '../assets/atif.jpeg';

const Hero = () => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Text animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: { 
      y: 30, 
      opacity: 0,
      filter: 'blur(5px)'
    },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 0.5,
      },
    },
  };
  
  // Text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.05),
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };
  
  // Staggered text animation with proper spacing
  const staggeredText = (text, className = '') => {
    return (
      <span className={`inline-block ${className}`}>
        {text.split(' ').map((word, i, arr) => [
          <motion.span 
            key={`word-${i}`}
            className="inline-block"
            variants={textReveal}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {word}
          </motion.span>,
          i < arr.length - 1 ? ' ' : null
        ])}
      </span>
    );
  };
  
  // Gradient text animation
  const gradientText = {
    hidden: { 
      backgroundPosition: '0% 50%',
      opacity: 0,
    },
    visible: {
      backgroundPosition: '100% 50%',
      opacity: 1,
      transition: {
        backgroundPosition: {
          duration: 3,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        },
        opacity: { duration: 0.8, delay: 0.8 },
      },
    },
  };

  // Button animation variants with theme support
  const buttonVariants = {
    initial: { 
      y: 0,
      scale: 1,
      boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
    },
    primary: {
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
      color: 'white',
      border: 'none',
      '--button-text': 'white',
      '--button-hover': 'rgba(255, 255, 255, 0.1)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
      '--button-text': 'var(--color-primary)',
      '--button-hover': 'rgba(var(--color-primary-rgb), 0.1)'
    },
    hover: { 
      y: -3,
      scale: 1.02,
      boxShadow: '0 6px 16px -2px rgba(0, 0, 0, 0.1)',
      background: [
        'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)',
        'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
      ],
      transition: {
        y: { type: 'spring', stiffness: 400, damping: 15 },
        scale: { type: 'spring', stiffness: 300 },
        background: { duration: 3, repeat: Infinity, ease: 'linear' },
        boxShadow: { duration: 0.3 }
      }
    },
    tap: { 
      y: 1,
      scale: 0.98,
      boxShadow: '0 1px 4px -1px rgba(0, 0, 0, 0.1)',
      transition: { 
        duration: 0.15,
        ease: 'easeOut'
      } 
    },
    secondaryHover: {
      background: 'rgba(var(--color-primary-rgb), 0.1)',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
      y: -3,
      scale: 1.02,
      boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.08)'
    }
  };

  // Wave animation
  const waveAnimation = {
    initial: { 
      rotate: 0,
      y: 0,
      scale: 1 
    },
    animate: { 
      rotate: [0, 14, -8, 14, -4, 10, 0],
      y: [0, -5, 2, -5, 0],
      transition: { 
        rotate: { 
          duration: 2.8, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        },
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      } 
    },
    hover: { 
      scale: 1.2,
      transition: { 
        scale: { 
          type: "spring", 
          stiffness: 400, 
          damping: 10 
        } 
      } 
    }
  };

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <FaTwitter />, href: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: <SiLeetcode />, href: "https://leetcode.com/yourusername", label: "LeetCode" },
  ];


  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-surface to-surface/80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <ThreeScene />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 py-12 sm:py-20 md:py-32">
        <motion.div 
          className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Left Column - Text Content */}
          <motion.div className="text-center lg:text-left mt-8 lg:mt-0">
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                <BsPersonWorkspace className="mr-2" />
                Full Stack Developer
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primaryFg"
              >
                <div className="inline-flex flex-wrap items-center">
                  {staggeredText("Hi, I'm Atif")}
                  <motion.span 
                    className="ml-2 text-yellow-300 inline-block"
                    variants={waveAnimation}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <FaHandPaper className="text-3xl md:text-4xl inline" />
                  </motion.span>
                </div>
                <motion.span 
                  className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                  variants={gradientText}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  Building Digital Experiences
                </motion.span>
              </motion.h1>
            </div>

            <motion.div 
              className="text-lg md:text-xl text-muted/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              <motion.p variants={item} className="mb-4">
                {staggeredText("I create exceptional digital experiences using cutting-edge web technologies, ")}
              </motion.p>
              <motion.p variants={item}>
                {staggeredText("with a strong focus on performance, accessibility, and elegant design.")}
              </motion.p>
            </motion.div>

            <motion.div 
              variants={item}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.div className="relative group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    filter: 'blur(8px)',
                    zIndex: 0,
                    transform: 'translateZ(0)'
                  }}
                  aria-hidden="true"
                />
                <motion.a
                  href="#projects"
                  className="relative px-8 py-3.5 rounded-lg font-medium overflow-hidden z-10"
                  initial={["initial", "primary"]}
                  animate={["initial", "primary"]}
                  whileHover={["hover", "primary"]}
                  whileTap="tap"
                  variants={buttonVariants}
                  style={{
                    color: 'white',
                    WebkitFontSmoothing: 'antialiased',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    zIndex: 1
                  }}
                >
                  <span className="relative z-10 flex items-center text-sm md:text-base font-semibold tracking-wide">
                    <span className="mr-2">🚀</span>
                    View My Work
                  </span>
                </motion.a>
              </motion.div>
              
              <motion.div className="relative group">
                <motion.a
                  href="#contact"
                  className="relative px-8 py-3.5 rounded-lg font-medium overflow-hidden"
                  initial={["initial", "secondary"]}
                  animate={["initial", "secondary"]}
                  whileHover={["secondaryHover"]}
                  whileTap="tap"
                  variants={buttonVariants}
                  style={{
                    WebkitFontSmoothing: 'antialiased',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    zIndex: 1,
                    transition: 'all 0.3s ease',
                    border: '2px solid var(--color-primary)'
                  }}
                >
                  <span className="relative z-10 flex items-center text-sm md:text-base font-medium">
                    <MdOutlineEmail className="mr-2 text-lg" style={{ color: 'var(--color-primary)' }} />
                    Get In Touch
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={item}
              className="flex items-center justify-center lg:justify-start space-x-6"
            >
              <div className="h-px w-8 bg-border"></div>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors text-xl"
                    whileHover={{ y: -3 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            variants={item}
            className="relative w-full max-w-xs sm:max-w-md mx-auto lg:order-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-2xl animate-blob" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-blob animation-delay-2000" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-blob animation-delay-4000" />
              
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-border/20">
                <img
                  src={AtifImage}
                  alt="Atif"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-secondary/10 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

// Add these styles to your global CSS file if not already present
/* 
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(var(--color-border), 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(var(--color-border), 0.2) 1px, transparent 1px);
  background-size: 40px 40px;
}
*/