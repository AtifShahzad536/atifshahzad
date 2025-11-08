import { motion, AnimatePresence } from "framer-motion";
import { FaUniversity, FaGraduationCap, FaAward, FaBookOpen } from "react-icons/fa";
import { useState, useEffect } from "react";
import ThreeScene from "./ThreeScene";

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
      <ThreeScene />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FaUniversity className="text-2xl text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Education Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic background and continuous learning path in technology and software development.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Education Items */}
            <div className="space-y-12">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative group ${idx % 2 === 0 ? 'md:pr-8 md:pl-16' : 'md:pl-8 md:pr-16'}`}
                  onMouseEnter={() => setIsHovered(edu.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className={`relative p-6 md:p-8 rounded-2xl bg-card border border-border/20 shadow-sm transition-all duration-300 ${isHovered === edu.id ? 'shadow-lg -translate-y-1 border-primary/30' : ''}`}>
                    {/* Timeline dot */}
                    <div className="absolute -left-2 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full bg-white transition-all duration-300 ${isHovered === edu.id ? 'scale-150' : ''}`}></div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {edu.icon}
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                          <h3 className="text-xl font-bold text-foreground">{edu.title}</h3>
                          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                            {edu.year}
                          </span>
                        </div>
                        
                        <p className="text-muted-foreground font-medium mb-3">{edu.institution}</p>
                        
                        <p className="text-muted-foreground mb-4">{edu.description}</p>
                        
                        <div className="space-y-2 mt-4">
                          {edu.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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