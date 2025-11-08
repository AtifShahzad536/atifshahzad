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
    { name: "React.js", icon: <FaReact />, color: "text-primary" },
    { name: "React Native", icon: <FaReact />, color: "text-primary" },
    { name: "Axios", icon: <SiAxios />, color: "text-primary" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-accent" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-secondary" },
    { name: "Express.js", icon: <SiExpress />, color: "text-secondary" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-accent" },
    { name: "Mongoose", icon: <SiMongoose />, color: "text-accent" },
    { name: "Docker", icon: <FaDocker />, color: "text-primary" },
    { name: ".NET", icon: <FaDotCircle />, color: "text-secondary" },
    { name: "Postman", icon: <SiPostman />, color: "text-primary" },
    { name: "GitHub", icon: <FaGithub />, color: "text-primary" },
    { name: "Google Colab", icon: <SiGooglecolab />, color: "text-secondary" },
    { name: "Groq AI", icon: <FaRobot />, color: "text-secondary" },
    { name: "OpenAI", icon: <SiOpenai />, color: "text-secondary" },
  ];

  const [items, setItems] = useState(null)
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
            icon: Icon ? <Icon /> : null
          }
        })
        setItems(mapped)
      } catch { /* silent fallback */ }
    })()
  }, [])

  const tools = items || fallback

  return (
    <section className="px-6 py-20 text-center" id="tools">
      <div className="container-prose">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-4xl font-bold mb-12 flex justify-center items-center gap-3 text-primaryFg">
          <FaCogs className="text-primary" />
          Tools & Techs
        </motion.h2>

        <div className="grid-auto-sm justify-items-center">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.02 * idx }}
              className="flex flex-col justify-center items-center gap-3 p-6 card min-h-[160px] w-full text-center"
            >
              <span className="icon-chip icon-chip-lg">{tool.icon}</span>
              <p className="text-md font-semibold text-primaryFg">{tool.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsTech;