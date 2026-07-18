import { motion } from "framer-motion";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaDotCircle,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiCplusplus } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import * as Fa from 'react-icons/fa'
import * as Si from 'react-icons/si'
import * as Io5 from 'react-icons/io5'
import * as Md from 'react-icons/md'
import * as Ri from 'react-icons/ri'
import { useEffect, useState } from 'react'

const Skills = () => {
  const BACKEND = 'https://new-port-backend.vercel.app'
  const packs = { fa: Fa, si: Si, io5: Io5, md: Md, ri: Ri }

  const fallback = [
    { name: "React", icon: FaReact, percent: 90 },
    { name: "HTML/CSS", icon: FaHtml5, percent: 90 },
    { name: "JavaScript", icon: FaJsSquare, percent: 90 },
    { name: "Tailwind CSS", icon: SiTailwindcss, percent: 90 },
    { name: "Node.js", icon: FaNodeJs, percent: 90 },
    { name: "MongoDB", icon: SiMongodb, percent: 85 },
    { name: "SQL", icon: SiMysql, percent: 85 },
    { name: ".NET", icon: FaDotCircle, percent: 60 },
    { name: "C++", icon: SiCplusplus, percent: 70 },
  ];

  const [items, setItems] = useState(null)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND}/api/skills`)
        if (!res.ok) return
        const data = await res.json()
        if (!Array.isArray(data) || !data.length) return
        const mapped = data.map(s => {
          const lib = (s.iconLib || '').toLowerCase()
          const Icon = packs[lib]?.[s.iconName]
          return {
            name: s.name,
            icon: Icon || null,
            percent: typeof s.level === 'number' ? s.level : 0,
            iconUrl: s.iconUrl || ''
          }
        })
        setItems(mapped)
      } catch { /* silent fallback */ }
    })()
  }, [])

  const skills = items || fallback

  return (
    <section className="px-6 py-20 text-center" id="skills">
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-4xl font-bold mb-12 text-primaryFg">
        💡 My Skills & Proficiency
      </motion.h2>

      <div className="grid-auto-sm max-w-5xl mx-auto">
        {skills.map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.03 * idx }}
              className="p-6 card"
            >
              <div className="item-row mb-4">
                <span className="icon-chip icon-chip-md">
                  {Icon ? <Icon className="icon-primary" /> : null}
                </span>
                <div>
                  <div className="title">{skill.name}</div>
                  <div className="desc">Proficiency level</div>
                </div>
              </div>
              <div className="w-full bg-border/40 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
              <p className="text-right mt-1 text-sm text-muted">{skill.percent}%</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;