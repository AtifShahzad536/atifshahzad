import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Background = ({ children, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-background overflow-hidden ${className}`}>
      {/* Dynamic Cyberpunk Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep background mesh */}
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Diagonal scanned line shadow */}
        <div className="absolute inset-0 dark:bg-[linear-gradient(135deg,rgba(0,0,0,0.45)_0%,transparent_100%)] bg-transparent" />

        {/* Interactive Glowing Spotlights (Mouse Follower with lag) */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.15] blur-[120px] pointer-events-none hidden lg:block"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 200 }}
        />

        {/* Static Neon Orb 1: Primary (Cyan) */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[100px] pointer-events-none"
        />

        {/* Static Neon Orb 2: Secondary (Purple) */}
        <motion.div
          animate={{
            x: [0, -30, 50, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.15, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] max-w-[550px] rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-[110px] pointer-events-none"
        />

        {/* Static Neon Orb 3: Accent (Pink) */}
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, 30, 60, 0],
            scale: [1, 1.1, 0.85, 1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-[10%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-gradient-to-tr from-accent/5 to-transparent blur-[100px] pointer-events-none"
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default Background;
