import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

// Public tiny model; prefer a local file like /models/loader.glb for reliability
const MODEL_URL = "/models/loader.glb"; // change if needed

// Load an asset to drive useProgress; nothing is rendered
function HiddenAsset({ url = MODEL_URL }) {
  try { useGLTF(url); } catch {}
  return null;
}

function ProgressBridge({ onChange }) {
  const { progress, active } = useProgress();
  useEffect(() => {
    onChange?.({ progress, active });
  }, [progress, active, onChange]);
  return null;
}

export default function Preloader3D({ onReady, onFinished, modelUrl = MODEL_URL, title = "Atif Shahzad" }) {
  const [percent, setPercent] = useState(0); // displayed percent (time-driven)
  const [real, setReal] = useState(0); // real asset progress
  const [active, setActive] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mountedAt] = useState(() => performance.now());
  const DURATION = 5000; // 5 seconds from 1 -> 100

  // Color shift for the fill as progress increases
  const clamped = Math.max(0, Math.min(100, percent));
  const hue = 80 + clamped * 1.2; // greenish lime through teal
  const fillStart = `hsl(${hue}, 92%, 58%)`;
  const fillMid = `hsl(${Math.max(0, hue - 12)}, 90%, 60%)`;
  const fillEnd = `hsl(${Math.max(0, hue - 24)}, 88%, 62%)`;

  // Time-based tween to ensure ~5s duration regardless of real loading speed
  useEffect(() => {
    let raf;
    const start = performance.now();
    const easeInOut = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; // simple easeInOutQuad
    const tick = (now) => {
      const elapsed = Math.min(DURATION, now - start);
      // Start at 1% to show movement immediately
      const p = 1 + (easeInOut(elapsed / DURATION) * 99);
      setPercent(Math.min(100, Math.floor(p)));
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Exit when time-based percent reaches 100 and assets are mostly ready
  useEffect(() => {
    const realReady = real >= 95 || !active; // tolerate small remainder or no active loads
    if (percent >= 100 && realReady && !exiting) {
      onReady && onReady();
      const elapsed = performance.now() - mountedAt;
      const wait = Math.max(0, 800 - elapsed);
      const t = setTimeout(() => setExiting(true), wait);
      return () => clearTimeout(t);
    }
  }, [percent, real, active, exiting, onReady, mountedAt]);

  // Fallback real progress simulation if nothing loads (for safety)
  useEffect(() => {
    const arm = setTimeout(() => {
      if (!active && percent === 0 && !simulating) {
        setSimulating(true);
        const start = performance.now();
        const duration = 1200;
        const tick = (t) => {
          const p = Math.min(100, Math.floor(((t - start) / duration) * 100));
          setReal(p);
          if (p < 100 && simulating) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, 300);
    return () => clearTimeout(arm);
  }, [active, percent, simulating]);

  return (
    <AnimatePresence onExitComplete={() => onFinished && onFinished()}>
      {!exiting && (
        <motion.div
          key="preloader3d"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-[1000]"
          style={{
            // Grid pattern backdrop tied to theme
            backgroundColor: 'hsl(var(--background))',
            backgroundImage:
              'linear-gradient(transparent 0, transparent calc(100% - 1px), color-mix(in oklab, hsl(var(--foreground)) 12%, transparent) 1px), linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), color-mix(in oklab, hsl(var(--foreground)) 12%, transparent) 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 0'
          }}
        >
          {/* Soft vignette for camera-like depth */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(120% 80% at 50% 20%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.25) 100%)'
          }} />
          {/* Hidden Canvas to get real loading progress */}
          <Canvas className="absolute inset-0 opacity-0 pointer-events-none" camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 2]} style={{ zIndex: 1 }}>
            <React.Suspense fallback={null}>
              <HiddenAsset url={modelUrl} />
              <ProgressBridge onChange={({ progress, active }) => {
                setReal(Math.min(100, Math.floor(progress || 0)));
                setActive(!!active);
              }} />
            </React.Suspense>
          </Canvas>

          {/* Corner accents */}
          <span className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2" style={{ borderColor: 'hsl(var(--primary))' }} />
          <span className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2" style={{ borderColor: 'hsl(var(--primary))' }} />
          <span className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2" style={{ borderColor: 'hsl(var(--primary))' }} />
          <span className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2" style={{ borderColor: 'hsl(var(--primary))' }} />

          {/* Local keyframes for shimmer */}
          <style>{`
            @keyframes preloadShimmer { from { transform: translateX(-140px); } to { transform: translateX(100%); } }
          `}</style>

          {/* Centered stack */}
          <div className="absolute inset-0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <div style={{ textAlign: 'center', userSelect: 'none' }}>
              <div style={{ color: 'hsl(var(--primary))', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                <span style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}>{title}</span>
              </div>

              {/* Track */}
              <div
                role="progressbar"
                aria-label="Loading progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                style={{
                  marginTop: 24,
                  width: 'min(600px, 84vw)',
                  height: 20,
                  borderRadius: 9999,
                  backgroundColor: 'color-mix(in oklab, hsl(var(--muted)) 85%, hsl(var(--background)) 15%)',
                  marginInline: 'auto',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in oklab, hsl(var(--foreground)) 8%, transparent)'
                }}
              >
                {/* Fill with hue shift and glow */}
                <div
                  style={{
                    position: 'relative',
                    height: '100%',
                    width: `${percent}%`,
                    borderRadius: 9999,
                    background: `linear-gradient(90deg, ${fillStart} 0%, ${fillMid} 50%, ${fillEnd} 100%)`,
                    boxShadow: '0 0 18px rgba(0,0,0,0.15), 0 0 18px color-mix(in oklab, hsl(var(--primary)) 35%, transparent)',
                    transition: 'width 0.25s cubic-bezier(.2,.8,.2,1)'
                  }}
                >
                  {/* Shimmer sweep */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: 140,
                      background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.45) 50%, rgba(255,255,255,0) 100%)',
                      filter: 'blur(6px)',
                      opacity: 0.45,
                      animation: 'preloadShimmer 1.25s linear infinite'
                    }}
                  />
                </div>
                {/* In-bar percentage */}
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'hsl(var(--background))', fontWeight: 800, fontSize: 12 }}>
                  {percent}%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Preload default
useGLTF.preload(MODEL_URL);
