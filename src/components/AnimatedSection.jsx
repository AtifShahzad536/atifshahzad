import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const AnimatedSection = ({ 
  children, 
  id,
  className = '',
  delay = 0.2,
  yOffset = 50,
  duration = 0.6,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.2, 0.65, 0.3, 0.9],
        }
      } : {}}
    >
      {children}
    </motion.section>
  );
};

export const AnimatedDiv = ({
  children,
  className = '',
  delay = 0,
  yOffset = 30,
  duration = 0.6,
  threshold = 0.1,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.2, 0.65, 0.3, 0.9],
        }
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};
