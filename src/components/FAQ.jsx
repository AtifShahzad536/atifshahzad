import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaTerminal, FaCode, FaArrowRight } from 'react-icons/fa';
import { AnimatedSection } from './AnimatedSection';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqData = [
    {
      id: "services",
      question: "What services do you offer?",
      tag: "Development",
      answer: "I specialize in building end-to-end web and mobile solutions. This includes developing high-performance frontend interfaces with React/Next.js, designing robust microservices and RESTful/GraphQL APIs using FastAPI & Node.js, and crafting cross-platform mobile apps with React Native."
    },
    {
      id: "stack",
      question: "What is your typical development stack?",
      tag: "Tech Stack",
      answer: "My core stack centers around the MERN Ecosystem (MongoDB, Express, React, Node.js) along with FastAPI (Python) for specialized backend computing. I use TailwindCSS/Vanilla CSS for modern responsive styling, PostgreSQL/MySQL/MongoDB for databases, and Git/Docker for version control."
    },
    {
      id: "roles",
      question: "Are you open to full-time roles?",
      tag: "Collaboration",
      answer: "Yes, I am actively looking for full-time remote engineering roles, long-term collaborations, and freelance contract work. I thrive in cross-functional agile teams and love solving complex development challenges."
    },
    {
      id: "performance",
      question: "How do you ensure app performance?",
      tag: "Optimization",
      answer: "I follow industry best practices such as optimizing images, leveraging modern bundlers (like Vite/Webpack) with code-splitting, lazy-loading heavy components, caching redundant API queries with Redis, and writing clean, non-blocking asynchronous backend code."
    },
    {
      id: "start",
      question: "How do we get started on a project?",
      tag: "Workflow",
      answer: "Simply navigate to the 'Get In Touch' section below and send a message, or drop an email directly. I'll get back to you within 24 hours to schedule a discovery call where we can discuss your project requirements, scope, timelines, and milestones."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden z-10" id="faq">
      {/* Background Ambient Glows */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute left-0 bottom-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" />

      <div className="container-prose px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full text-xs text-primary mb-4 font-mono shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>SYSTEM CONSOLE // FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-primaryFg">
            Frequently Asked{" "}
            <span className="text-primary">
              Questions
            </span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Click on a query on the left to initialize the response terminal on the right.
          </p>
        </AnimatedSection>

        {/* 2-Column Split Interactive Q&A Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Left Column: List of Interactive Question Tabs (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            {faqData.map((item, index) => {
              const isSelected = activeIndex === index;
              return (
                <AnimatedSection key={item.id} delay={index * 0.05}>
                  <div
                    onClick={() => setActiveIndex(index)}
                    className={`group relative p-4 rounded-xl cursor-pointer border transition-all duration-300 flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-surface border-primary text-primaryFg shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                        : 'bg-surface/40 border-border hover:border-primary/30 hover:bg-surface/60'
                    }`}
                  >
                    {/* Selected Left indicator line */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />
                    )}

                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-sm transition-colors duration-300 ${
                        isSelected ? 'bg-primary/10 text-primary' : 'bg-border/30 text-muted group-hover:text-primaryFg'
                      }`}>
                        <FaQuestionCircle />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-muted block mb-0.5">
                          {item.tag}
                        </span>
                        <h3 className={`font-semibold text-xs sm:text-sm transition-colors duration-300 ${
                          isSelected ? 'text-primaryFg font-bold' : 'text-muted group-hover:text-primaryFg'
                        }`}>
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`text-xs transition-transform duration-300 ${
                      isSelected ? 'text-primary translate-x-1' : 'text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                    }`}>
                      <FaArrowRight />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Right Column: Holographic Terminal Display (col-span-7) */}
          <div className="lg:col-span-7 h-full">
            <AnimatedSection delay={0.15}>
              <div className="relative rounded-2xl bg-surface/50 border border-border backdrop-blur-xl p-6 shadow-2xl flex flex-col min-h-[350px] justify-between overflow-hidden">
                {/* Terminal header decorations */}
                <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted tracking-widest uppercase ml-2 flex items-center gap-1.5">
                      <FaTerminal className="text-primary animate-pulse" /> RESPONSE_TERMINAL.sh
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted bg-border/40 px-2 py-0.5 rounded">
                    STATUS: ACTIVE
                  </span>
                </div>

                {/* Animated Display Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-4"
                    >
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-secondary/10 border border-secondary/20 rounded text-[11px] font-mono text-secondary">
                        <FaCode /> QUERY_ID: {faqData[activeIndex].id.toUpperCase()}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-primaryFg flex items-center gap-2">
                        <span className="text-primary font-mono select-none">&gt;</span> {faqData[activeIndex].question}
                      </h3>

                      <p className="text-muted text-sm sm:text-base leading-relaxed pl-4 border-l-2 border-primary/20 bg-primary/5 py-2 rounded-r-lg">
                        {faqData[activeIndex].answer}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Terminal footer status bar */}
                <div className="border-t border-border/40 mt-8 pt-4 flex items-center justify-between text-[10px] font-mono text-muted">
                  <span className="flex items-center gap-1">
                    <FaTerminal className="animate-pulse text-accent" /> ENGINE // READY
                  </span>
                  <span>SYSTEM PORTFOLIO v1.2</span>
                </div>

                {/* Interactive Cyber Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none -z-10" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none -z-10" />
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
