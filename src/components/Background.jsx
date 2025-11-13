import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Background = ({ children, enableParallax = true, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", enableParallax ? "10%" : "0%"]);

  return (
    <section 
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{ position: 'relative', zIndex: 0 }}
    >
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ 
          y: yBg,
          zIndex: -1
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </motion.div>
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};

export default Background;
