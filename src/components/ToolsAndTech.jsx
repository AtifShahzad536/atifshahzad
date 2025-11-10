import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDocker,
  FaCogs,
  FaDotCircle,
  FaRobot,
} from "react-icons/fa";
import {
  SiAxios,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiPostman,
  SiGooglecolab,
  SiOpenai,
} from "react-icons/si";
import * as Fa from 'react-icons/fa'
import * as Si from 'react-icons/si'
import * as Io5 from 'react-icons/io5'
import * as Md from 'react-icons/md'
import * as Ri from 'react-icons/ri'
import { useEffect, useState } from 'react'

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
    <section className="relative px-6 py-24" id="tools">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-[-10%] top-[10%] h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[10%] h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-muted/40 border border-border/40">
            <FaCogs className="text-primary" />
            <span className="text-sm tracking-wide text-muted-foreground">Tools & Technologies</span>
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            The Stack I Use
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A curated set of frameworks, libraries, and platforms I use to build fast, reliable, and beautiful products.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className={`px-3.5 py-1.5 rounded-full text-sm transition-all border ${selected === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted/60'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <style>{`
          @keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        `}</style>

        <div className="space-y-6">
          <div
            onMouseEnter={() => setPausedA(true)}
            onMouseLeave={() => setPausedA(false)}
            className="relative overflow-hidden rounded-xl border border-border/40 bg-card/40"
          >
            <div
              style={{
                display: 'flex',
                gap: '12px',
                width: '200%',
                animation: `scrollLeft 24s linear infinite`,
                animationPlayState: pausedA ? 'paused' : 'running'
              }}
              className="py-4"
            >
              {[...rowA, ...rowA].map((tool, idx) => (
                <div key={`a-${idx}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 backdrop-blur border border-border/40 shadow-sm">
                  <span className="text-lg text-primary">{tool.icon}</span>
                  <span className="text-sm font-medium text-foreground/90">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            onMouseEnter={() => setPausedB(true)}
            onMouseLeave={() => setPausedB(false)}
            className="relative overflow-hidden rounded-xl border border-border/40 bg-card/40"
          >
            <div
              style={{
                display: 'flex',
                gap: '12px',
                width: '200%',
                animation: `scrollRight 26s linear infinite`,
                animationPlayState: pausedB ? 'paused' : 'running'
              }}
              className="py-4"
            >
              {[...rowB, ...rowB].map((tool, idx) => (
                <div key={`b-${idx}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 backdrop-blur border border-border/40 shadow-sm">
                  <span className="text-lg text-primary">{tool.icon}</span>
                  <span className="text-sm font-medium text-foreground/90">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsTech;