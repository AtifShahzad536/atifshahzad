'use client';

import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaCodeBranch, FaServer, FaDatabase, FaPalette, FaFilePdf } from 'react-icons/fa';
import { FiCode, FiCpu, FiLayers, FiTrendingUp, FiDownload } from 'react-icons/fi';
import { SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiExpress } from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaGitAlt, FaGithub } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';
import { useState } from 'react';

// PDF resume file
const RESUME_PDF = '/resume.pdf';

const skills = [
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" />, level: '90%' },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" />, level: '85%' },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, level: '88%' },
  { name: 'React', icon: <SiReact className="text-blue-400" />, level: '85%' },
  { name: 'Next.js', icon: <TbBrandNextjs className="text-black dark:text-white" />, level: '80%' },
  { name: 'Node.js', icon: <SiNodedotjs className="text-green-500" />, level: '82%' },
  { name: 'Express', icon: <SiExpress className="text-gray-700 dark:text-gray-300" />, level: '80%' },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-600" />, level: '78%' },
  { name: 'Git', icon: <FaGitAlt className="text-orange-600" />, level: '85%' },
  { name: 'GitHub', icon: <FaGithub className="text-gray-700 dark:text-white" />, level: '88%' },
];

const experiences = [
  { 
    text: '3+ years of hands-on experience in full-stack development',
    icon: <FiCode className="text-lg" />
  },
  { 
    text: 'Proficient in building responsive and interactive web applications',
    icon: <FiLayers className="text-lg" />
  },
  { 
    text: 'Strong understanding of modern JavaScript frameworks and libraries',
    icon: <FiCpu className="text-lg" />
  },
  { 
    text: 'Experience with RESTful APIs and database design',
    icon: <FaDatabase className="text-lg" />
  },
  { 
    text: 'Familiar with version control systems like Git',
    icon: <FaCodeBranch className="text-lg" />
  },
  { 
    text: 'Knowledge of UI/UX design principles',
    icon: <FaPalette className="text-lg" />
  }
];

const About = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = RESUME_PDF;
      link.download = 'Atif_Shahzad_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed text-justify mb-6">
            I'm a passionate Full Stack Developer with expertise in modern web technologies, dedicated to creating efficient, scalable, and user-friendly applications. With a strong foundation in both frontend and backend development, I bring ideas to life through clean code and innovative solutions. My approach combines technical excellence with a keen eye for design, ensuring every project delivers both functionality and exceptional user experiences.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(99, 102, 241, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={isDownloading}
              className={`group relative flex items-center justify-center gap-3 px-8 py-3.5 font-medium transition-all duration-300 overflow-hidden
                ${isDownloading 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl'
                }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 80%, 95% 100%, 5% 100%, 0 80%)',
                borderRadius: '12px 12px 8px 8px',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                {isDownloading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <FiDownload className="text-lg group-hover:animate-bounce" />
                    <span>Download Resume</span>
                  </>
                )}
              </span>
              <span className="absolute -bottom-1 left-1/2 w-3/4 h-1 bg-white/30 rounded-full transform -translate-x-1/2 group-hover:scale-x-0 transition-transform duration-300"></span>
            </motion.button>
            
            <motion.a
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              whileTap={{ scale: 0.98 }}
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 px-8 py-3.5 bg-card border-2 border-primary/20 text-foreground font-medium rounded-xl hover:bg-card/90 transition-all duration-300 overflow-hidden"
              style={{
                clipPath: 'polygon(5% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0 20%)',
                borderRadius: '12px 12px 8px 8px',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FaFilePdf className="text-xl text-red-500 group-hover:animate-pulse" />
              <span className="relative z-10">View Resume</span>
              <span className="absolute -bottom-1 left-1/2 w-3/4 h-1 bg-primary/20 rounded-full transform -translate-x-1/2 group-hover:scale-x-0 transition-transform duration-300"></span>
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Experience */}
          <div>
            <div className="flex flex-col items-center lg:items-start mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                My Experience
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            </div>
            <ul className="space-y-5">
              {experiences.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-white bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl mr-4 flex-shrink-0 transform transition-transform hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-muted-foreground text-base text-justify">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Column - Skills */}
          <div>
            <div className="flex flex-col items-center lg:items-start mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                My Skills
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-card p-4 rounded-lg border border-border/30 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <h4 className="font-medium mb-1">{skill.name}</h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{skill.level}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;