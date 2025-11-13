import { motion, AnimatePresence } from "framer-motion";
import { FaUniversity, FaGraduationCap, FaAward, FaBookOpen } from "react-icons/fa";
import { useState, useEffect } from "react";

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);

  const educationData = [
    {
      id: 1,
      title: "Bachelor of Science in Software Engineering",
      institution: "University of Sialkot",
      year: "2021 – 2025",
      description: "Currently pursuing a degree in Software Engineering with a focus on modern web technologies, algorithms, and software development methodologies.",
      achievements: [
        "GPA: 3.8/4.0 (Current)",
        "Coursework in Data Structures, Algorithms, Web Development, and Database Systems",
        "Active participant in coding competitions and hackathons"
      ],
      icon: <FaGraduationCap className="text-2xl" />
    },
    {
      id: 2,
      title: "Intermediate in Pre-Engineering",
      institution: "Sialkot Cantt Christian College",
      year: "2019 – 2021",
      description: "Completed intermediate education with a focus on Physics, Chemistry, and Mathematics, building a strong foundation for engineering studies.",
      achievements: [
        "Scored 90% in final examinations",
        "Member of the Science Club",
        "Participated in inter-college science exhibitions"
      ],
      icon: <FaBookOpen className="text-2xl" />
    },
    {
      id: 3,
      title: "Matriculation (Science)",
      institution: "Govt. High School Saidpur",
      year: "2017 – 2019",
      description: "Completed secondary education with a focus on science subjects, developing strong analytical and problem-solving skills.",
      achievements: [
        "A+ Grade in final examinations",
        "Active participant in science fairs",
        "Member of the school's IT club"
      ],
      icon: <FaAward className="text-2xl" />
    },
  ];

  // Auto-rotate education items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % educationData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="education" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* <ThreeScene /> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 border border-border/40 mb-4">
            <FaUniversity className="text-primary" />
            <span className="text-sm tracking-wide text-muted-foreground">Academic Background</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Education Journey
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Degrees and milestones shaping my path in software engineering and technology.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Horizontal Stepper */}
          <div className="relative mb-10">
            <div className="h-1 rounded-full bg-border/60">
              <div
                className="h-1 rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(activeIndex / Math.max(educationData.length - 1, 1)) * 100}%` }}
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-2">
              {educationData.map((edu, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={edu.id}
                    onClick={() => setActiveIndex(i)}
                    className="group flex-1 min-w-0"
                    aria-label={`Step ${i + 1}: ${edu.title}`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={`grid place-items-center w-10 h-10 rounded-full border transition-all ${isActive ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/30' : 'bg-card border-border text-muted-foreground group-hover:border-primary/40'}`}>
                        {edu.icon}
                      </div>
                      <div className="hidden md:block">
                        <p className={`text-xs font-semibold truncate max-w-[10rem] ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{edu.institution}</p>
                        <p className="text-[10px] text-muted-foreground/80">{edu.year}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Details Card */}
          {educationData[activeIndex] && (
            <motion.div
              key={educationData[activeIndex].id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative p-6 md:p-8 rounded-2xl bg-card/80 border border-border/30 shadow-sm overflow-hidden"
              onMouseEnter={() => setIsHovered(educationData[activeIndex].id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15 blur-xl" />
              </div>
              <div className="flex flex-col md:flex-row items-start gap-6 relative">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-inner">
                  {educationData[activeIndex].icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{educationData[activeIndex].title}</h3>
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                      <FaGraduationCap className="hidden md:inline" /> {educationData[activeIndex].year}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-medium mb-3">{educationData[activeIndex].institution}</p>
                  <p className="text-muted-foreground/90 mb-4 leading-relaxed">{educationData[activeIndex].description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {educationData[activeIndex].achievements.map((achievement, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm bg-muted/50 text-muted-foreground border border-border/40">
                        <FaAward className="text-[10px] md:text-[12px] text-primary" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
          <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-secondary/20 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Education;