import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaGithub, FaDocker, FaCogs, FaDotCircle, FaRobot } from "react-icons/fa";
import { SiAxios, SiTailwindcss, SiExpress, SiMongodb, SiMongoose, SiPostman, SiGooglecolab, SiOpenai } from "react-icons/si";
import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';
import * as Io5 from 'react-icons/io5';
import * as Md from 'react-icons/md';
import * as Ri from 'react-icons/ri';
import { useEffect, useState } from 'react';

// Custom card component with hover effect
const TechCard = ({ tech, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10" />
    <div className="relative flex flex-col items-center p-6 bg-card/70 backdrop-blur-sm border border-border/30 rounded-2xl h-full transition-all duration-300 group-hover:border-primary/50">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary text-2xl mb-4">
        {tech.icon}
      </div>
      <h4 className="font-medium text-center text-foreground/90">{tech.name}</h4>
      <span className="mt-2 text-xs font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
        {tech.category}
      </span>
    </div>
  </motion.div>
);

const ToolsTech = () => {
  const BACKEND = 'https://new-port-backend.vercel.app'
  const packs = { fa: Fa, si: Si, io5: Io5, md: Md, ri: Ri }

  const fallback = [
    { name: "React.js", icon: <FaReact />, color: "text-primary", category: 'Frontend' },
    { name: "React Native", icon: <FaReact />, color: "text-primary", category: 'Frontend' },
    { name: "Axios", icon: <SiAxios />, color: "text-primary", category: 'Frontend' },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-accent", category: 'Frontend' },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-secondary", category: 'Backend' },
    { name: "Express.js", icon: <SiExpress />, color: "text-secondary", category: 'Backend' },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-accent", category: 'Database' },
    { name: "Mongoose", icon: <SiMongoose />, color: "text-accent", category: 'Database' },
    { name: "Docker", icon: <FaDocker />, color: "text-primary", category: 'DevOps' },
    { name: ".NET", icon: <FaDotCircle />, color: "text-secondary", category: 'Backend' },
    { name: "Postman", icon: <SiPostman />, color: "text-primary", category: 'Tools' },
    { name: "GitHub", icon: <FaGithub />, color: "text-primary", category: 'Tools' },
    { name: "Google Colab", icon: <SiGooglecolab />, color: "text-secondary", category: 'AI' },
    { name: "Groq AI", icon: <FaRobot />, color: "text-secondary", category: 'AI' },
    { name: "OpenAI", icon: <SiOpenai />, color: "text-secondary", category: 'AI' },
  ];

  const [items, setItems] = useState(null)
  const [selected, setSelected] = useState('All')
  const [pausedA, setPausedA] = useState(false)
  const [pausedB, setPausedB] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND}/api/tools`)
        if (!res.ok) return
        const data = await res.json()
        if (!Array.isArray(data) || !data.length) return
        const mapped = data.map(t => {
          const lib = (t.iconLib || '').toLowerCase()
          const Icon = packs[lib]?.[t.iconName]
          return {
            name: t.name,
            color: 'text-primary',
            icon: Icon ? <Icon /> : null,
            category: t.category || categorize(t.name)
          }
        })
        setItems(mapped)
      } catch { /* silent fallback */ }
    })()
  }, [])

  const categorize = (n = '') => {
    const s = n.toLowerCase()
    if (/(react|tailwind|axios|native|css|ui)/.test(s)) return 'Frontend'
    if (/(node|express|\.net|api|server)/.test(s)) return 'Backend'
    if (/(mongo|mongoose|sql|db)/.test(s)) return 'Database'
    if (/(docker|kubernetes|devops|ci|cd)/.test(s)) return 'DevOps'
    if (/(openai|groq|gemini|colab|ai|ml)/.test(s)) return 'AI'
    if (/(git|github|postman|tool)/.test(s)) return 'Tools'
    return 'Other'
  }

  const tools = (items || fallback).map(t => ({ ...t, category: t.category || categorize(t.name) }))
  const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))]
  const filtered = selected === 'All' ? tools : tools.filter(t => t.category === selected)
  const rowA = filtered.filter((_, i) => i % 2 === 0)
  const rowB = filtered.filter((_, i) => i % 2 === 1)

  return (
    <section className="relative py-20 overflow-hidden" id="tools">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <FaCogs className="text-sm" />
            TECHNOLOGY STACK
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My Tech Stack
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Technologies I'm proficient in and love working with
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selected === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                  : 'bg-card/60 text-muted-foreground hover:bg-card/80 border border-border/40 hover:border-primary/30'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
          >
            {filtered.map((tech, index) => (
              <TechCard key={`${tech.name}-${index}`} tech={tech} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: '50+', label: 'Technologies' },
            { value: '100%', label: 'Quality' },
            { value: '5+', label: 'Years Exp' },
            { value: '∞', label: 'Passion' },
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 text-center hover:bg-card/70 transition-colors duration-300"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsTech;