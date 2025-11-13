import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader3D({ onReady, onFinished, title = "Atif Shahzad" }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const DURATION = 3000; // Reduced to 3 seconds

  const hue = 80 + (percent * 1.2);
  const fillStart = `hsl(${hue}, 92%, 58%)`;
  const fillMid = `hsl(${Math.max(0, hue - 12)}, 90%, 60%)`;
  const fillEnd = `hsl(${Math.max(0, hue - 24)}, 88%, 62%)`;

  // Grid background pattern
  const gridBackground = {
    backgroundImage: `
      linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px', // Increased grid size
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  };

  useEffect(() => {
    let raf;
    const start = performance.now();
    const easeInOut = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
    
    const tick = (now) => {
      const elapsed = Math.min(DURATION, now - start);
      const p = 1 + (easeInOut(elapsed / DURATION) * 99);
      const newPercent = Math.min(100, Math.floor(p));
      setPercent(newPercent);
      
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else if (newPercent >= 100 && !exiting) {
        onReady?.();
        setTimeout(() => {
          setExiting(true);
          // Small delay to allow exit animation to complete
          setTimeout(() => onFinished?.(), 1000);
        }, 800);
      }
    };
    
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [exiting, onFinished, onReady]);

  return (
    <AnimatePresence onExitComplete={() => {}}>
      {!exiting && (
        <motion.div
          key="preloader3d"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-background"
        >
          {/* Grid Background */}
          <div style={gridBackground} />
          
          {/* Animated Grid Items */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-4">
            {Array.from({ length: 36 }).map((_, i) => (
              <motion.div
                key={i}
                className="border-2 border-primary/20 rounded-md bg-primary/5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.4, 0.8, 0.4],
                  scale: [0.8, 1, 1.15, 1],
                  rotate: [0, 5, 0, -5, 0],
                  borderRadius: ['0.375rem', '1rem', '0.5rem', '0.75rem']
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-6 text-center">
            {/* Animated Spinner */}
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-primary/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: 360,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="w-full h-full rounded-full border-4 border-transparent border-t-primary/70 border-r-primary/70" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: -360,
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-primary/80" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title and Progress Bar */}
            <div className="space-y-4 w-full max-w-md mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  textShadow: [
                    '0 0 10px rgba(99, 102, 241, 0.2)',
                    '0 0 20px rgba(99, 102, 241, 0.3)',
                    '0 0 10px rgba(99, 102, 241, 0.2)'
                  ]
                }}
                transition={{ 
                  delay: 0.2, 
                  duration: 0.5,
                  textShadow: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }
                }}
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              >
                {title}
              </motion.h1>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full"
              >
                <div className="h-2.5 bg-muted/30 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full absolute top-0 left-0"
                    style={{
                      width: `${percent}%`,
                      background: `linear-gradient(90deg, ${fillStart}, ${fillMid}, ${fillEnd})`,
                      boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)',
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${percent}%`,
                      background: [
                        `linear-gradient(90deg, ${fillStart}, ${fillMid}, ${fillEnd})`,
                        `linear-gradient(90deg, ${fillEnd}, ${fillStart}, ${fillMid})`,
                        `linear-gradient(90deg, ${fillMid}, ${fillEnd}, ${fillStart})`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear',
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                    animate={{
                      left: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>
              </motion.div>
              {/* Loading Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-muted-foreground font-mono text-sm mt-4"
              >
                <motion.span
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {percent}% LOADED
                </motion.span>
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}