import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaGithub, FaDocker, FaCogs, FaDatabase, FaServer, FaTerminal, FaCode } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb, SiPostman, SiOpenai, SiTypescript, SiRedux, SiNextdotjs } from "react-icons/si";
import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';
import * as Io5 from 'react-icons/io5';
import * as Md from 'react-icons/md';
import * as Ri from 'react-icons/ri';
import { useEffect, useState } from 'react';

const BACKEND = 'https://new-port-backend.vercel.app';

const ToolsTech = () => {
  const packs = { fa: Fa, si: Si, io5: Io5, md: Md, ri: Ri };
  
  const fallback = [
    { name: "React", icon: <FaReact />, category: 'Frontend' },
    { name: "TypeScript", icon: <SiTypescript />, category: 'Frontend' },
    { name: "Next.js", icon: <SiNextdotjs />, category: 'Frontend' },
    { name: "Tailwind", icon: <SiTailwindcss />, category: 'Frontend' },
    { name: "Redux", icon: <SiRedux />, category: 'Frontend' },
    { name: "Node.js", icon: <FaNodeJs />, category: 'Backend' },
    { name: "Express", icon: <SiExpress />, category: 'Backend' },
    { name: "MongoDB", icon: <SiMongodb />, category: 'Database' },
    { name: "PostgreSQL", icon: <FaDatabase />, category: 'Database' },
    { name: "Docker", icon: <FaDocker />, category: 'DevOps' },
    { name: "GitHub", icon: <FaGithub />, category: 'Tools' },
    { name: "Postman", icon: <SiPostman />, category: 'Tools' },
    { name: "OpenAI", icon: <SiOpenai />, category: 'AI' },
  ];

  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState('All');
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND}/api/tools`);
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || !data.length) return;
        const mapped = data.map(t => {
          const lib = (t.iconLib || '').toLowerCase();
          const Icon = packs[lib]?.[t.iconName];
          return {
            name: t.name,
            icon: Icon ? <Icon /> : null,
            category: t.category || categorize(t.name)
          };
        });
        setItems(mapped);
      } catch { /* silent fallback */ }
    })();
  }, []);

  const categorize = (n = '') => {
    const s = n.toLowerCase();
    if (/(react|tailwind|axios|native|css|ui)/.test(s)) return 'Frontend';
    if (/(node|express|\.net|api|server)/.test(s)) return 'Backend';
    if (/(mongo|mongoose|sql|db)/.test(s)) return 'Database';
    if (/(docker|kubernetes|devops|ci|cd)/.test(s)) return 'DevOps';
    if (/(openai|groq|gemini|colab|ai|ml)/.test(s)) return 'AI';
    if (/(git|github|postman|tool)/.test(s)) return 'Tools';
    return 'Other';
  };

  const tools = (items || fallback).map(t => ({ ...t, category: t.category || categorize(t.name) }));
  const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))];
  const filtered = selected === 'All' ? tools : tools.filter(t => t.category === selected);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden z-10" id="tools">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[20%] -left-[10%] w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[95px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[85px]" />
      </div>

      <div className="container-prose relative z-10 space-y-16">
        
        {/* Section title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
            <FaCogs className="text-secondary text-xs" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">My Dev Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-primaryFg">
            Tools & <span className="text-primary">Technologies</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto">
            The programming languages, frameworks, backend environments, database engines, and design systems I employ.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-border pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                selected === category
                  ? 'bg-primary text-background border-primary shadow-lg shadow-primary/20 font-bold'
                  : 'bg-surface/50 border-border text-muted hover:text-primaryFg hover:border-primary/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid display of skills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, idx) => (
              <motion.div
                layout
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className="group relative bg-surface/40 hover:bg-surface border border-border hover:border-primary/25 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-default select-none"
              >
                {/* Tech Icon */}
                <div className="w-10 h-10 rounded-xl bg-border/25 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                  {tech.icon || <FaCode />}
                </div>
                
                {/* Tech Title */}
                <span className="text-xs sm:text-sm font-bold text-primaryFg">
                  {tech.name}
                </span>

                {/* Micro Category Tag */}
                <span className="text-[9px] font-semibold text-muted bg-border/25 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Continuous Horizontal Scrolling Marquee */}
        <div className="relative w-full overflow-hidden bg-surface/30 border border-border rounded-2xl py-6 select-none shadow-inner">
          {/* Overlay fade left and right */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-[200%] gap-12 animate-marquee whitespace-nowrap">
            {/* Array double render for seamless scroll */}
            {[...tools, ...tools].map((tech, i) => (
              <div key={i} className="inline-flex items-center gap-2.5 text-xs font-bold text-muted uppercase tracking-widest">
                <div className="text-primary text-base">
                  {tech.icon || <FaCode />}
                </div>
                <span>{tech.name}</span>
                <span className="text-secondary/40 font-black">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats counter displays at section end */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '15+', label: 'Verified Tools', desc: 'Covering Frontend, API, Database & Cloud' },
            { value: '1+', label: 'Years Active', desc: 'Deploying high performance constructs' },
            { value: '10+', label: 'Delivered Sites', desc: 'Flawless client reviews & delivery' },
            { value: '99.9%', label: 'Uptime Integrity', desc: 'Highly secured database & microservice routes' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="bg-surface/30 border border-border rounded-2xl p-5 text-center flex flex-col justify-center space-y-2 hover:border-primary/20 hover:bg-surface/50 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black text-primary">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-primaryFg">
                {stat.label}
              </div>
              <p className="text-[9px] text-muted leading-tight">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
      
      {/* Styles inject for the marquee keyframes since tailwind custom is missing */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ToolsTech;