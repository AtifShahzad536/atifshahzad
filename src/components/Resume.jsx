import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiFileText, FiAward, FiBriefcase, FiCode, FiBookOpen } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import ThreeScene from "./ThreeScene";

const ResumeViewer = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [isVisible, setIsVisible] = useState(false);
  const { light } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById('resume'));
    return () => observer.disconnect();
  }, []);

  const resumeData = {
    experience: [
      {
        id: 1,
        role: "Software Engineering Student",
        company: "University of Sialkot",
        duration: "2021 - Present",
        description: "Currently pursuing a degree in Software Engineering with hands-on experience in full-stack development.",
        achievements: [
          "Developed multiple full-stack applications using MERN stack (MongoDB, Express, React, Node.js)",
          "Participated in coding competitions and hackathons, enhancing problem-solving skills",
          "Collaborated on team projects using Git for version control and Agile methodologies"
        ]
      },
      {
        id: 2,
        role: "Academic Projects",
        company: "Personal Portfolio & Other Projects",
        duration: "2022 - Present",
        description: "Developed various web applications to enhance technical skills and showcase abilities.",
        achievements: [
          "Built a responsive portfolio website using React and Tailwind CSS with modern UI/UX principles",
          "Created a full-stack e-commerce platform with user authentication and payment integration",
          "Developed a task management application with real-time updates using WebSockets"
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "BSc in Software Engineering",
        institution: "University of Sialkot",
        duration: "2021 - 2025",
        description: "Specializing in Web Development and Software Architecture"
      },
      {
        id: 2,
        degree: "Intermediate in Pre-Engineering",
        institution: "Sialkot Cantt Christian College",
        duration: "2019 - 2021",
        description: "Focus on Physics, Chemistry, and Mathematics"
      }
    ],
    skills: [
      { category: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"] },
      { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Firebase"] },
      { category: "Tools", items: ["Git", "Docker", "VS Code", "Figma"] }
    ]
  };

  const tabs = [
    { id: "experience", label: "Experience", icon: <FiBriefcase /> },
    { id: "education", label: "Education", icon: <FiBookOpen /> },
    { id: "skills", label: "Skills", icon: <FiCode /> },
    { id: "full-resume", label: "Full Resume", icon: <FiFileText /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "experience":
        return (
          <div className="space-y-8">
            {resumeData.experience.map((exp) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-6 rounded-xl shadow-sm border ${
                  light 
                    ? 'bg-white border-gray-100' 
                    : 'bg-gray-800 border-gray-700'
                } hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <h3 className={`text-xl font-bold ${
                    light ? 'text-gray-900' : 'text-white'
                  }`}>{exp.role}</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {exp.duration}
                  </span>
                </div>
                <h4 className="text-lg text-primary font-medium mb-3">{exp.company}</h4>
                <p className={`mb-4 ${
                  light ? 'text-gray-600' : 'text-gray-300'
                }`}>{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span className={`${light ? 'text-gray-600' : 'text-gray-300'}`}>
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        );
      case "education":
        return (
          <div className="space-y-6">
            {resumeData.education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-6 rounded-xl shadow-sm border ${
                  light 
                    ? 'bg-white border-gray-100' 
                    : 'bg-gray-800 border-gray-700'
                } hover:shadow-md transition-shadow`}
              >
                <h3 className={`text-xl font-bold ${light ? 'text-gray-900' : 'text-white'}`}>
                  {edu.degree}
                </h3>
                <p className="text-primary font-medium my-2">{edu.institution}</p>
                <p className={`text-sm mb-2 ${light ? 'text-gray-500' : 'text-gray-400'}`}>
                  {edu.duration}
                </p>
                <p className={light ? 'text-gray-600' : 'text-gray-300'}>{edu.description}</p>
              </motion.div>
            ))}
          </div>
        );
      case "skills":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`p-6 rounded-xl shadow-sm border ${
                  light 
                    ? 'bg-white border-gray-100' 
                    : 'bg-gray-800 border-gray-700'
                } hover:shadow-md transition-shadow`}
              >
                <h3 className={`text-lg font-semibold mb-4 ${
                  light ? 'text-gray-900' : 'text-white'
                }`}>
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span 
                      key={j}
                      className="px-3 py-1.5 bg-primary/5 text-primary text-sm font-medium rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );
      case "full-resume":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className={`p-1 rounded-xl shadow-sm border overflow-hidden ${
              light ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
            }`}>
              <iframe
                src="https://docs.google.com/document/d/e/2PACX-1vS5JHltpA-4WDvQWzSFrfUxBLxKKRhifvyrOFI7ArvAlk-b26DG8Ro2ly6Coxh01rJRDdBtQ5Q6NwwF/pub?embedded=true"
                className="w-full h-[600px] rounded-lg border-0"
                title="Resume PDF"
                loading="lazy"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="resume" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <ThreeScene />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FiFileText className="text-2xl text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            My Resume
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            light ? 'text-gray-600' : 'text-gray-300'
          }`}>
            A summary of my professional journey, education, and skills
          </p>
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={`rounded-2xl shadow-sm border p-6 md:p-8 ${
            light ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Download Button */}
          <div className="mt-8 text-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <FiDownload className="text-lg" />
              Download Full Resume (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeViewer;