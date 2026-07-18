import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiSmartphone, FiGlobe, FiTerminal, FiLayers, FiDatabase, FiDownload } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiFastapi, SiJavascript, SiNextdotjs } from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaFilePdf, FaPalette } from 'react-icons/fa';

const RESUME_PDF = '/resume.pdf';

const skills = [
  { name: 'React', icon: <SiReact className="text-cyan-400" />, level: '90%', category: 'frontend' },
  { name: 'React Native', icon: <FiSmartphone className="text-purple-400" />, level: '85%', category: 'mobile' },
  { name: 'Node.js', icon: <SiNodedotjs className="text-green-500" />, level: '88%', category: 'backend' },
  { name: 'FastAPI', icon: <SiFastapi className="text-teal-400" />, level: '82%', category: 'backend' },
  { name: 'MongoDB', icon: <SiMongodb className="text-emerald-500" />, level: '85%', category: 'database' },
  { name: 'Express.js', icon: <SiExpress className="text-gray-400" />, level: '87%', category: 'backend' },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, level: '92%', category: 'frontend' },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" />, level: '83%', category: 'frontend' },
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" />, level: '95%', category: 'frontend' },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" />, level: '90%', category: 'frontend' },
  { name: 'Git', icon: <FaGitAlt className="text-orange-600" />, level: '88%', category: 'tools' },
  { name: 'GitHub', icon: <FaGithub className="text-white" />, level: '90%', category: 'tools' },
];

const experiences = [
  { text: 'MERN Stack & FastAPI Specialist', icon: <FiCode /> },
  { text: 'React Native Cross-Platform Native Apps', icon: <FiSmartphone /> },
  { text: 'High Performance API Microservices', icon: <FiTerminal /> },
  { text: 'Scalable Databases & MongoDB Clusters', icon: <FiDatabase /> },
  { text: 'Clean Interactive User Interface Design', icon: <FiLayers /> },
  { text: 'Modern Deployment & Version Pipelines', icon: <FaGitAlt /> }
];

const About = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = RESUME_PDF;
      link.download = 'Atif_Shahzad_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1000);
  };

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeTab);

  const categories = [
    { id: 'all', label: 'All Tech' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'tools', label: 'Tools' },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden z-10">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[20%] -left-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[90px]" />
      </div>

      <div className="container-prose relative z-10 space-y-16">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
            <FaPalette className="text-secondary text-xs" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">My Profile</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-primaryFg">
            About <span className="text-primary">My Journey</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bio & Core Expertise */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-primaryFg tracking-tight">
                Crafting Scalable Codebases With Beautiful Visual Interfaces
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed text-justify">
                I am Atif Shahzad, a Software Engineer specialized in full-stack architecture. 
                My focus lies in building high-performance endpoints with FastAPI, interactive web modules with MERN stack, 
                and polished cross-platform applications with React Native.
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed text-justify">
                I merge clean object-oriented code principles with dynamic animation libraries to construct software 
                products that deliver exceptional user retention, fast loading speeds, and robust operations.
              </p>
            </div>

            {/* Micro details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experiences.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-surface/40 border border-border rounded-xl shadow-sm hover:border-primary/20 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary text-sm flex items-center justify-center">
                    {exp.icon}
                  </div>
                  <span className="text-xs sm:text-sm text-primaryFg/90 font-medium">{exp.text}</span>
                </div>
              ))}
            </div>

            {/* Resume actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="group flex items-center gap-2 px-5 py-3 bg-primary text-background font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/15 hover:-translate-y-0.5"
              >
                <FiDownload className="group-hover:animate-bounce" />
                <span>{isDownloading ? 'Processing...' : 'Download Resume'}</span>
              </button>

              <a
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-surface/50 hover:bg-surface border border-border hover:border-primary/20 text-primaryFg font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaFilePdf className="text-accent" />
                <span>View Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Tech Stack tabbed dashboard */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-primaryFg uppercase tracking-wider">Technical Proficiency</h3>
              <p className="text-xs text-muted">Filter components to see my level of experience in each tool.</p>
            </div>

            {/* Tab Filters */}
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                    activeTab === cat.id 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'bg-transparent border-transparent text-muted hover:text-primaryFg'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="wait">
                {filteredSkills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className="p-3 bg-surface/30 border border-border rounded-xl flex items-center justify-between hover:border-primary/25 hover:bg-surface/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl flex items-center justify-center p-1 bg-border/20 rounded-lg">
                        {skill.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-bold text-primaryFg">{skill.name}</div>
                        
                        {/* Interactive mini progress bar */}
                        <div className="w-24 sm:w-28 bg-border rounded-full h-1">
                          <motion.div 
                            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: skill.level }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <span className="text-xs font-bold font-mono text-primary/80 bg-primary/5 px-2 py-0.5 rounded">
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;