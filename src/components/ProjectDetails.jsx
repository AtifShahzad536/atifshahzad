import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaPalette, FaTools, FaCheckCircle, FaExclamationTriangle, FaCalendarAlt, FaUserAlt, FaStar, FaServer, FaTerminal } from 'react-icons/fa';

const ProjectDetails = ({ project, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background text-primaryFg relative overflow-hidden z-10"
    >
      {/* Cinematic Ambient Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />
      
      {/* Floating Gradient Orbs */}
      <div className="absolute right-[-10%] top-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute left-[-10%] top-[40%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      
      {/* Header Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/80 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded bg-surface/80 hover:bg-primary/10 border border-primary/30 hover:border-primary text-primary font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] transform hover:-translate-y-0.5"
          >
            <FaArrowLeft className="group-hover:-translate-x-0.5 transition-transform" /> Back
          </button>
          
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            CASE_STUDY_NODE: {project.id}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12">
        
        {/* Title & Introduction Case Block */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-surface border border-border/60 rounded-full text-xs font-mono text-primary shadow-inner">
            <FaServer className="text-[10px] animate-pulse" /> {project.category.toUpperCase()} PROJECT
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-primaryFg">
            {project.title}
          </h1>

          <div className="w-20 h-1 bg-primary rounded-full mx-auto lg:mx-0" />
          
          <p className="text-muted text-sm sm:text-base md:text-lg max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Cinematic Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-surface/30 border border-border/60 backdrop-blur-xl rounded-2xl shadow-xl">
          <div className="space-y-1 p-3">
            <span className="text-[9px] font-mono uppercase text-muted tracking-wider flex items-center gap-1.5">
              <FaCalendarAlt className="text-secondary" /> Duration
            </span>
            <p className="text-sm font-bold text-primaryFg">4 Weeks</p>
          </div>
          <div className="space-y-1 p-3">
            <span className="text-[9px] font-mono uppercase text-muted tracking-wider flex items-center gap-1.5">
              <FaUserAlt className="text-primary" /> Role
            </span>
            <p className="text-sm font-bold text-primaryFg">Lead Engineer</p>
          </div>
          <div className="space-y-1 p-3">
            <span className="text-[9px] font-mono uppercase text-muted tracking-wider flex items-center gap-1.5">
              <FaStar className="text-accent" /> Priority
            </span>
            <p className="text-sm font-bold text-primaryFg">Production</p>
          </div>
          <div className="space-y-1 p-3">
            <span className="text-[9px] font-mono uppercase text-muted tracking-wider flex items-center gap-1.5">
              <FaCode className="text-primary" /> Category
            </span>
            <p className="text-sm font-bold text-primaryFg">{project.category}</p>
          </div>
        </div>

        {/* Large Media Slideshow Section */}
        <div className="space-y-4">
          <div className="relative w-full bg-zinc-950/80 rounded-2xl border border-border/80 overflow-hidden shadow-2xl">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <img
              src={project.images && project.images.length > 0 
                ? project.images[currentImageIndex] 
                : project.image
              }
              alt={project.title}
              className="w-full h-auto object-cover hover:scale-[1.005] transition-transform duration-500"
            />
          </div>

          {/* Thumbnail Selectors */}
          {project.images && project.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-none justify-center">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-background/50 flex-shrink-0 ${
                    i === currentImageIndex 
                      ? 'border-primary scale-95 shadow-md shadow-primary/10' 
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Structured Technical Case Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Left Column: About & Key highlights (col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Project Overview */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-primaryFg flex items-center gap-2">
                <FaPalette className="text-primary" /> Case Presentation
              </h2>
              <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-prose">
                This project represents a full design-to-delivery lifecycle. By focusing on highly performant styling tokens, asynchronous event streams, and database integrity, we built an end product optimized for both speed and user onboarding.
              </p>
            </div>

            {/* Key Highlights */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-primaryFg flex items-center gap-2">
                  <FaCheckCircle className="text-secondary" /> Feature Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="p-4 bg-surface/30 border border-border/80 rounded-xl space-y-2 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center gap-2 text-secondary text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                        <span className="font-mono text-[9px] uppercase tracking-wider">Highlight 0{i + 1}</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-light">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Tech Stack & Technical Challenges (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tech Stack widget */}
            <div className="p-6 bg-surface/40 border border-border backdrop-blur rounded-2xl space-y-4 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primaryFg flex items-center gap-2 border-b border-border pb-3">
                <FaTools className="text-primary" /> Core Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg bg-primary/5 text-primary border border-primary/20 shadow-sm hover:bg-primary/10 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges Log widget */}
            <div className="p-6 bg-zinc-950/40 border border-border backdrop-blur rounded-2xl space-y-4 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="text-xs font-bold uppercase tracking-widest text-primaryFg flex items-center gap-2 border-b border-border pb-3">
                <FaTerminal className="text-accent animate-pulse" /> Audit & Resolution
              </h3>
              
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-accent/80 bg-accent/5 border border-accent/20 px-2 py-0.5 rounded inline-block">
                  STATUS: SOLVED
                </div>
                <p className="text-xs text-muted leading-relaxed font-mono">
                  {project.challenges || "Faced performance hurdles and real-time socket latency during high throughput. Implemented query optimization indices and state caching to bring load times under 200ms."}
                </p>
              </div>
            </div>

            {/* Action buttons (Direct links) */}
            <div className="flex gap-4 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded bg-surface/80 hover:bg-primary/10 border border-primary/30 hover:border-primary text-primary font-bold text-xs uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_10px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.45)]"
                >
                  <FaGithub />
                  <span>Repository</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded bg-primary text-background font-black text-xs uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.55)]"
                >
                  <FaExternalLinkAlt className="text-[10px]" />
                  <span>Live Build</span>
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default ProjectDetails;
