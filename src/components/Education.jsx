import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaBookOpen, FaAward, FaUniversity, FaTerminal, FaStar, FaShieldAlt } from "react-icons/fa";

const educationData = [
  {
    id: 1,
    title: "BS Software Engineering",
    institution: "University of Sialkot",
    year: "2021 – 2025",
    version: "v4.0.0-stable",
    codeName: "BS_SE_SYS",
    progressValue: 95,
    progressLabel: "GPA 3.8",
    description: "Specialized study in advanced software architectural design, distributed databases, algorithm design, and cloud deployment pipelines.",
    changelog: [
      { type: "ADD", text: "Dean's List for Academic Excellence (GPA 3.8/4.0)" },
      { type: "UPG", text: "Core courses: Algorithms, Distributed Systems, Software Requirements" },
      { type: "DEP", text: "Full-stack client web systems using MERN stack and FastAPI routes" }
    ],
    skills: ["React", "Node.js", "Python", "MongoDB", "FastAPI", "AWS Systems"],
    icon: <FaGraduationCap />,
    gradient: "from-cyan-500 to-blue-500",
    colorClass: "text-primary",
    sector: "Full Stack Arch",
    status: "Stable Upgrade"
  },
  {
    id: 2,
    title: "Intermediate Pre-Engineering",
    institution: "Sialkot Cantt Christian College",
    year: "2019 – 2021",
    version: "v2.1.0-release",
    codeName: "PRE_ENG_SYS",
    progressValue: 90,
    progressLabel: "Math 90%",
    description: "Constructed the logical base for mathematical modeling, analytical reasoning, Mechanics physics systems, and mechanical calculations.",
    changelog: [
      { type: "ADD", text: "Graduated with 90% score in Mathematics & Physics modules" },
      { type: "INI", text: "Science Club Exhibition coordinator & lab supervisor" }
    ],
    skills: ["Physics", "Statistics", "Advanced Algebra", "Logics"],
    icon: <FaBookOpen />,
    gradient: "from-purple-500 to-pink-500",
    colorClass: "text-secondary",
    sector: "Analytical Core",
    status: "Completed"
  },
  {
    id: 3,
    title: "Matriculation (Science)",
    institution: "Govt. High School Saidpur",
    year: "2017 – 2019",
    version: "v1.0.0-initial",
    codeName: "MATRIC_SYS",
    progressValue: 98,
    progressLabel: "Grade A+",
    description: "Initialization of logical core concepts, algorithmic problem solving fundamentals, and physical sciences studies.",
    changelog: [
      { type: "ADD", text: "A+ Grade in Board Examinations & school honors" },
      { type: "INI", text: "School Computer Science Award winner" }
    ],
    skills: ["Computer Fundamentals", "General Sciences", "Mathematics"],
    icon: <FaAward />,
    gradient: "from-pink-500 to-orange-500",
    colorClass: "text-accent",
    sector: "Initialization",
    status: "Base Stable"
  }
];

const LargeCircularProgress = ({ value, label, colorClass, gradient }) => {
  const radius = 40;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 mx-auto">
      {/* Outer rotating dashed ring */}
      <div className="absolute inset-0 border border-dashed border-border rounded-full animate-spin-slow opacity-60" />
      <svg className="w-full h-full transform -rotate-90">
        <circle
          fill="transparent"
          stroke="currentColor"
          className="text-border/30"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius + stroke * 3}
          cy={radius + stroke * 3}
        />
        <motion.circle
          fill="transparent"
          stroke="currentColor"
          className={colorClass}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          r={normalizedRadius}
          cx={radius + stroke * 3}
          cy={radius + stroke * 3}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[10px] sm:text-xs font-black font-mono text-primaryFg">
          {label}
        </span>
        <span className="text-[7px] sm:text-[8px] font-mono text-muted uppercase tracking-widest mt-0.5">
          EFFICENCY
        </span>
      </div>
    </div>
  );
};

const getChangelogTag = (type) => {
  switch (type) {
    case "ADD":
      return <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-center inline-block min-w-[28px]">ADD</span>;
    case "UPG":
      return <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 text-center inline-block min-w-[28px]">UPG</span>;
    case "DEP":
      return <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono bg-purple-500/10 text-purple-500 border border-purple-500/20 text-center inline-block min-w-[28px]">DEP</span>;
    case "INI":
      return <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono bg-pink-500/10 text-pink-500 border border-pink-500/20 text-center inline-block min-w-[28px]">INI</span>;
    default:
      return <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono bg-gray-500/10 text-gray-400 border border-gray-500/20 text-center inline-block min-w-[28px]">LOG</span>;
  }
};

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEdu = educationData[activeIndex];

  return (
    <section id="education" className="relative py-20 lg:py-32 overflow-hidden z-10">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[30%] -left-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[90px]" />
      </div>

      <div className="container-prose relative z-10 space-y-16">
        
        {/* Section title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
            <FaUniversity className="text-secondary text-xs" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Academic Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-primaryFg">
            Education <span className="text-primary">Roadmap</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        {/* Full-width 2-column Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* Left Side: Cyber Folder Selectors (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted">Select Upgrade Core:</span>
            </div>

            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 pr-1 custom-scrollbar">
              {educationData.map((edu, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={edu.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex-shrink-0 flex items-center justify-between p-4 rounded-2xl text-left border transition-all duration-300 w-[280px] sm:w-[320px] lg:w-full select-none ${
                      isActive
                        ? "bg-surface border-primary shadow-lg shadow-primary/5 translate-x-1"
                        : "bg-surface/40 border-border text-muted hover:border-primary/30 hover:bg-surface/65"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-primary/10 text-primary" : "bg-border/20 text-muted"
                      }`}>
                        {edu.icon}
                      </div>
                      <div>
                        <div className="text-[9px] font-mono tracking-widest text-muted">{edu.codeName}</div>
                        <div className={`text-xs sm:text-sm font-extrabold tracking-tight transition-colors ${
                          isActive ? "text-primaryFg" : "text-muted hover:text-primaryFg"
                        }`}>
                          {edu.title.split(" in ")[0]}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`text-[8px] font-mono px-2 py-0.5 rounded ${
                        isActive ? "bg-primary/10 text-primary border border-primary/20" : "bg-border/30 text-muted"
                      }`}>
                        {edu.year.split(" – ")[0]}
                      </span>
                      {isActive && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Immersive Blueprint Specifications Console (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col bg-surface/50 border border-border rounded-3xl shadow-xl backdrop-blur-xl overflow-hidden min-h-[420px]"
                style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)' }}
              >
                {/* Header Window Bar */}
                <div className="bg-surface/80 border-b border-border py-3 px-6 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-[10px] font-mono text-muted tracking-widest uppercase flex items-center gap-1.5">
                    <FaTerminal className="text-primary text-[9px]" />
                    {activeEdu.version}
                  </span>
                </div>

                {/* Main Body: 2-Column Split inside details panel */}
                <div className="p-6 sm:p-8 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Diagnostics logs (md:col-span-7) */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[8px] font-mono tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded uppercase">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                        MODULE_LOADED_OK
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-primaryFg mt-3.5 tracking-tight leading-snug">
                        {activeEdu.title}
                      </h3>
                      <p className="text-xs text-muted font-bold tracking-wide uppercase mt-1">
                        Hub: {activeEdu.institution}
                      </p>
                    </div>

                    {/* Styled code log block */}
                    <div className="p-3.5 bg-background/50 border border-border rounded-xl font-mono text-xs text-muted leading-relaxed relative">
                      <div className="absolute right-3 top-2 text-[8px] text-muted-foreground uppercase select-none">CODE_SPEC</div>
                      <span className="text-secondary select-none font-bold">&gt; </span>
                      {activeEdu.description}
                    </div>

                    {/* Diagnostics changes logs */}
                    <div className="space-y-3 pt-1">
                      <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-primaryFg flex items-center gap-2">
                        <span>&gt; DIAGNOSTICS_LOG</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {activeEdu.changelog.map((log, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                            <div className="flex-shrink-0 mt-0.5">
                              {getChangelogTag(log.type)}
                            </div>
                            <span>{log.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Gauges & Loaded Dependencies (md:col-span-5) */}
                  <div className="md:col-span-5 space-y-6 flex flex-col justify-between h-full">
                    
                    {/* Big HUD gauge */}
                    <div className="space-y-3">
                      <LargeCircularProgress 
                        value={activeEdu.progressValue} 
                        label={activeEdu.progressLabel} 
                        colorClass={activeEdu.colorClass} 
                      />
                    </div>

                    {/* Core System Spec list */}
                    <div className="bg-background/40 border border-border rounded-xl p-3.5 space-y-2 font-mono text-[9px] text-muted">
                      <div className="flex justify-between items-center">
                        <span>SYS_STATUS:</span>
                        <span className="text-emerald-500 font-bold uppercase">{activeEdu.status}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SYS_CYCLE:</span>
                        <span className="text-primaryFg font-bold">{activeEdu.year}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>CORE_SECTOR:</span>
                        <span className="text-secondary font-bold uppercase">{activeEdu.sector}</span>
                      </div>
                    </div>

                    {/* Loaded tags */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted block">
                        Dependency Modules:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeEdu.skills.map((skill, i) => (
                          <span key={i} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-border/20 text-primaryFg border border-border">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Education;