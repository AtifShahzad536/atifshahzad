import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function Preloader3D({ onReady, onFinished }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [stage, setStage] = useState("loading"); // stage can be: 'loading', 'welcome', 'back'
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const DURATION = 1500; // Balanced readable loading speed

  useEffect(() => {
    let raf;
    const start = performance.now();
    const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    const tick = (now) => {
      const elapsed = Math.min(DURATION, now - start);
      const p = easeInOut(elapsed / DURATION) * 100;
      const newPercent = Math.min(100, Math.floor(p));
      setPercent(newPercent);
      
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setStage("welcome");
      }
    };
    
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Stage Transitions
  useEffect(() => {
    if (stage === "welcome") {
      const timer = setTimeout(() => {
        setStage("back");
      }, 1200);
      return () => clearTimeout(timer);
    } else if (stage === "back") {
      const timer = setTimeout(() => {
        onReady?.();
        setExiting(true);
        setTimeout(() => onFinished?.(), 600);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [stage, onReady, onFinished]);

  const bgStyle = isDark ? "bg-background" : "bg-gray-50";

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: "blur(10px)",
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${bgStyle} overflow-hidden`}
        >
          {/* CRT Glitch scan lines backdrop */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none -z-10" />

          {/* Glow orbs */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10 animate-pulse" />

          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center w-full max-w-4xl">
            <AnimatePresence mode="wait">
              {stage === "loading" && (
                <motion.div
                  key="loading-stage"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 w-full flex flex-col items-center"
                >
                  {/* Big Glitching LOADING text with surrounding animated brackets */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 font-mono font-black select-none">
                    <motion.span
                      animate={{ x: [-8, 0, -8], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-primary/40 text-7xl sm:text-[9.5rem] leading-none"
                    >
                      [
                    </motion.span>
                    
                    <h1 className="text-7xl sm:text-[9.5rem] leading-none animate-glitch animate-electric uppercase">
                      LOADING
                    </h1>
                    
                    <motion.span
                      animate={{ x: [8, 0, 8], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-primary/40 text-7xl sm:text-[9.5rem] leading-none"
                    >
                      ]
                    </motion.span>
                  </div>

                  {/* Percentage Counter */}
                  <div className="font-mono text-2xl sm:text-3xl text-primary tracking-widest font-bold">
                    {percent}%
                  </div>

                  {/* Minimal progress line */}
                  <div className="w-64 h-1 bg-surface border border-white/5 overflow-hidden rounded relative">
                    <motion.div
                      className="h-full bg-primary"
                      style={{ width: `${percent}%` }}
                      transition={{ ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {stage === "welcome" && (
                <motion.div
                  key="welcome-stage"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 w-full flex flex-col items-center"
                >
                  {/* Big Glitching WELCOME text with surrounding brackets */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 font-mono font-black select-none">
                    <motion.span
                      animate={{ x: [-8, 0, -8], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-primary/40 text-7xl sm:text-[9.5rem] leading-none"
                    >
                      [
                    </motion.span>
                    
                    <h1 className="text-7xl sm:text-[9.5rem] leading-none text-primary animate-glitch animate-electric uppercase">
                      WELCOME
                    </h1>
                    
                    <motion.span
                      animate={{ x: [8, 0, 8], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-primary/40 text-7xl sm:text-[9.5rem] leading-none"
                    >
                      ]
                    </motion.span>
                  </div>
                  <p className="text-xs font-mono tracking-[0.3em] text-muted uppercase">
                    INITIALIZING PORTFOLIO SESSION
                  </p>
                </motion.div>
              )}

              {stage === "back" && (
                <motion.div
                  key="back-stage"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 w-full flex flex-col items-center"
                >
                  {/* Big Glitching BACK text with surrounding brackets */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 font-mono font-black select-none">
                    <motion.span
                      animate={{ x: [-8, 0, -8], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-secondary/40 text-7xl sm:text-[9.5rem] leading-none"
                    >
                      [
                    </motion.span>
                    
                    <h1 className="text-7xl sm:text-[9.5rem] leading-none text-secondary animate-glitch animate-electric uppercase">
                      BACK
                    </h1>
                    
                    <motion.span
                      animate={{ x: [8, 0, 8], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-secondary/40 text-7xl sm:text-[9.5rem] leading-none"
                    >
                      ]
                    </motion.span>
                  </div>
                  <p className="text-xs font-mono tracking-[0.3em] text-muted uppercase">
                    READY FOR ACCESS NODE
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}