import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHandPaper } from 'react-icons/fa';
import { useRef, useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

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
    initial: { 
      '--btn-rotate': '0deg',
      '--btn-scale': 1,
      '--btn-bg-pos': '0% 50%',
      scale: 1,
      backgroundSize: '200% 200%',
      backgroundPosition: 'var(--btn-bg-pos)'
    },
    hover: {
      '--btn-rotate': '2deg',
      '--btn-scale': 1.02,
      '--btn-bg-pos': '100% 50%',
      scale: 'var(--btn-scale)',
      rotate: 'var(--btn-rotate)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        backgroundPosition: {
          duration: 0.8,
          ease: 'easeInOut'
        }
      }
    },
    tap: { 
      scale: 0.96,
      '--btn-rotate': '0deg'
    },
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
      className="relative min-h-screen flex items-center justify-center pt-16 md:pt-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="container relative z-10 py-8 sm:py-20 md:py-32">
        <motion.div 
          className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 md:gap-16 items-center"
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

            <motion.div variants={item} className="mb-4 md:mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
                <div className="text-center sm:text-left">
                  <span className="text-base md:text-lg text-muted-foreground">Hi, I'm </span>
                  {mounted && (
                    <TypeAnimation
                      sequence={[
                        'Atif Shahzad',
                        2000,
                        'Full Stack Developer',
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      className="text-base md:text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                      repeat={Infinity}
                    />
                  )}
                </div>
              </div>
            </motion.div>

            <motion.p 
              variants={item}
              className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed text-justify"
            >
              I'm a passionate Full Stack Developer dedicated to crafting exceptional digital experiences. With expertise in modern web technologies, I build responsive, accessible, and high-performance applications that solve real-world problems.
            </motion.p>

            <motion.div 
              variants={item}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 md:mb-12"
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
                <motion.div className="relative group">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      filter: 'blur(8px)',
                      zIndex: -1,
                      transform: 'translateZ(0)'
                    }}
                  />
                  <motion.div 
                    className="relative group"
                    style={{
                      perspective: '1000px',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        filter: 'blur(12px)',
                        transform: 'translateZ(-10px)'
                      }}
                    />
                    <motion.a
                      href="#contact"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="relative px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground flex items-center justify-center gap-2 overflow-hidden group/btn h-12 w-40"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 45%, hsl(var(--primary)/0.9) 55%, hsl(var(--primary)) 100%)',
                        backgroundSize: '250% 250%',
                        boxShadow: '0 4px 20px -5px rgba(var(--primary-rgb), 0.3)',
                        transform: 'translateZ(0)',
                        borderRadius: '12px',
                        borderTopLeftRadius: '4px',
                        borderBottomRightRadius: '4px',
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="relative">Hire Me</span>
                        <motion.span
                          className="inline-flex items-center justify-center"
                          animate={{
                            x: [0, 4, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'easeInOut',
                          }}
                        >
                          <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.span>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="absolute inset-0 border-2 border-white/10 group-hover:border-white/20 transition-all duration-300"
                        style={{
                          borderRadius: '12px',
                          borderTopLeftRadius: '4px',
                          borderBottomRightRadius: '4px',
                        }}
                      />
                    </motion.a>
                  </motion.div>
                </motion.div>
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
            <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
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
*/