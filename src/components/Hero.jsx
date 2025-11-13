import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHandPaper } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ThreeScene from './ThreeScene';
import AtifImage from '../assets/atif.jpeg';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const socialIcon = {
    hidden: { scale: 0, opacity: 0 },
    show: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    }),
    hover: {
      y: -3,
      scale: 1.1,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 30px -10px rgba(0, 118, 255, 0.5)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
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

  return (
    <section 
      ref={ref} 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Background elements with Three.js */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        <ThreeScene />
      </motion.div>

      <div className="container relative z-10 py-12 sm:py-20 md:py-32">
        <motion.div 
          className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Left Column - Text Content */}
          <motion.div className="text-center lg:text-left">
            <motion.div variants={item} className="mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Available for work
              </div>
            </motion.div>

            <motion.h1 
              variants={item} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <div className="inline-flex flex-wrap items-center">
                <span className="text-muted-foreground">Hi, I'm </span>
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
              {mounted && (
                <TypeAnimation
                  sequence={[
                    'Atif Shahzad',
                    1000,
                    'A Full Stack Developer',
                    1000,
                  ]}
                  wrapper="div"
                  cursor={true}
                  repeat={Infinity}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary block mt-2"
                  style={{ display: 'inline-block' }}
                />
              )}
            </motion.h1>

            <motion.p 
              variants={item}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              I build exceptional digital experiences with modern web technologies and clean, efficient code.
            </motion.p>

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
                  href="#contact"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium text-lg flex items-center gap-2 group z-10"
                >
                  Hire Me
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={item}
              className="flex items-center justify-center lg:justify-start space-x-6"
            >
              <div className="h-px w-8 bg-border"></div>
              <div className="flex space-x-4">
                {[
                  { icon: <FaGithub />, href: "https://github.com/yourusername", label: "GitHub" },
                  { icon: <FaLinkedin />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
                  { icon: <FaTwitter />, href: "https://twitter.com/yourusername", label: "Twitter" }
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialIcon}
                    custom={index}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    whileHover="hover"
                    className="text-muted-foreground hover:text-foreground transition-colors text-xl"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div 
            variants={item}
            className="relative w-full max-w-xs sm:max-w-md mx-auto lg:order-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isInView ? 1 : 0, 
          y: isInView ? 0 : 20 
        }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-sm text-muted-foreground mb-2">Scroll down</div>
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-2 bg-foreground/70 rounded-full"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.8,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
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
*/