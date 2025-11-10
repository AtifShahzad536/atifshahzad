import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import chatgpt from '../assets/chatgpt.png'
import home from '../assets/home.png'
import summarize from '../assets/summarize.png'
import cloth from '../assets/clothing.png'
import imports from '../assets/import.png'
import todo from '../assets/todo.png'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const categories = ['All', 'Web', 'Mobile', 'Full Stack'];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  // Backend wiring - Using Vercel deployment
  const BACKEND = 'https://new-port-backend.vercel.app';
  const [apiItems, setApiItems] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND}/api/projects`);
        if (!res.ok) return;
        const data = await res.json();
        const mapped = (data || []).map((p, idx) => ({
          id: p._id || idx,
          title: p.title,
          description: p.description || '',
          github: p.github || '',
          demo: p.url || '',
          image: p.imageUrl ? `${BACKEND}${p.imageUrl}` : (p.images?.[0] || ''),
          category: p.category || 'Web',
          tags: p.tags || [],
          technologies: p.technologies || [],
          features: p.features || [],
          images: p.imageUrl ? [`${BACKEND}${p.imageUrl}`] : undefined
        }));
        if (mapped.length) setApiItems(mapped);
      } catch (e) {
        // silent fallback to static content
      }
    })();
  }, []);

  const sourceProjects = apiItems.length ? apiItems : projects;
  const filteredProjects = selectedCategory === 'All'
    ? sourceProjects
    : sourceProjects.filter(project => project.category === selectedCategory);
    
  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProjectModal = () => {
    if (window && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  const nextImage = () => {
    if (selectedProject.images) {
      setCurrentImageIndex(prev => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevImage = () => {
    if (selectedProject.images) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };
  
  // Voice system removed – no auto TTS on modal open
  
  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      
      if (e.key === 'Escape') {
        closeProjectModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentImageIndex]);
  
  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = projects.map(project => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = project.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="projects">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Here are some of my recent projects. Each one was built with a focus on performance, accessibility, and user experience.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted/30 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {filteredProjects.length > 0 && (
              <FeaturedProjectCard
                key={`featured-${filteredProjects[0].id || 0}`}
                {...filteredProjects[0]}
                onClick={() => openProjectModal(filteredProjects[0])}
              />
            )}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              key={`${selectedCategory}-grid`}
            >
              {filteredProjects.slice(1).map((project, index) => (
                <ProjectCard 
                  key={project.id || index} 
                  {...project} 
                  index={index + 1} 
                  onClick={() => openProjectModal(project)}
                />
              ))}
            </motion.div>
          </>
        )}
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && closeProjectModal()}
            >
              <motion.div 
                className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
                
                {/* Project Content */}
                <div className="relative h-64 md:h-80 bg-muted/30 overflow-hidden">
                  <img 
                    src={selectedProject.images ? selectedProject.images[currentImageIndex] : selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                        aria-label="Previous image"
                      >
                        <FaChevronLeft />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                        aria-label="Next image"
                      >
                        <FaChevronRight />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(i);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === currentImageIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                            }`}
                            aria-label={`View image ${i + 1} of ${selectedProject.images.length}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{selectedProject.title}</h3>
                    <div className="flex items-center gap-3">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub className="text-lg" />
                          View Code
                        </a>
                      )}
                      {selectedProject.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt className="text-sm" />
                          Live Demo
                        </a>
                      )}
                      {/* Voice auto-starts on open; no manual button */}
                    </div>
                  </div>
                  
                  {selectedProject.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="prose prose-sm prose-invert max-w-none">
                    <p className="text-muted-foreground">{selectedProject.description}</p>
                    
                    {selectedProject.features && (
                      <div className="mt-6">
                        <h4 className="text-foreground font-medium mb-2">Key Features:</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedProject.technologies && (
                      <div className="mt-6">
                        <h4 className="text-foreground font-medium mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, i) => (
                            <span 
                              key={i}
                              className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const FeaturedProjectCard = ({ title, description, github, demo, image, onClick, tags = [], technologies = [], category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-border/30 bg-card/60 backdrop-blur-sm shadow-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`View details for ${title} project`}
    >
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/25 via-transparent to-secondary/25 blur-2xl opacity-50" />
        </div>
        <div className="absolute left-6 right-6 top-6 flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">{category || 'Project'}</span>
          {tags.slice(0, 2).map((t, i) => (
            <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted/40 text-muted-foreground border border-border/40">{t}</span>
          ))}
        </div>
        <div className="absolute left-6 right-6 bottom-6 md:max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">{title}</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">{tech}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur border border-border/40 hover:border-primary/40 hover:text-primary transition-colors text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                <FaGithub /> View Code
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                <FaExternalLinkAlt className="text-sm" /> Live Demo
              </a>
            )}
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/60 hover:bg-muted/80 transition-colors text-sm font-medium" onClick={(e) => { e.stopPropagation(); onClick?.(); }}>
              Quick View
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ title, description, github, image, index, onClick, technologies = [], category }) => {
  const isDemoAvailable = !github.includes('github.com');
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const descriptionRef = useRef(null);
  
  // Parallax effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
  
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
    setIsHovered(false);
  };
  
  // Truncate description to fit better in the hover card
  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
          }
        }
      }}
      className="group relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-sm border border-border/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`View details for ${title} project`}
    >
      {/* Hover overlay with description */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent z-10 p-6 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          transition: { duration: 0.3 }
        }}
      >
        <motion.div
          className="text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
            transition: { 
              delay: isHovered ? 0.1 : 0,
              duration: 0.3 
            }
          }}
        >
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {truncateDescription(description)}
          </p>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
            transition: { 
              delay: isHovered ? 0.2 : 0,
              duration: 0.3 
            }
          }}
        >
          <button 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-primary/90 hover:bg-primary px-4 py-2 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </motion.div>
      </motion.div>
      <div className="relative overflow-hidden rounded-t-2xl aspect-video">
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
          {/* Glow layer */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/25 via-transparent to-secondary/25 blur-xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Status badge */}
        <motion.div 
          className="absolute top-3 right-3 z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0.8,
            opacity: isHovered ? 1 : 0,
            transition: { 
              delay: isHovered ? 0.3 : 0,
              duration: 0.2
            }
          }}
          >
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary backdrop-blur-sm">
            {category || ['Web', 'Mobile', 'Full Stack'][index % 3]}
          </span>
        </motion.div>

        {/* Overlay actions */}
        <motion.div
          className="absolute top-3 left-3 z-10 flex gap-2"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -6, transition: { duration: 0.2 } }}
        >
          {github && (
            <a
              href={github}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-background/80 backdrop-blur border border-border/40 hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="View code on GitHub"
            >
              <FaGithub /> Code
            </a>
          )}
          {isDemoAvailable && (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick?.(); }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground hover:bg-primary transition-colors"
              aria-label="Open project details"
            >
              <FaExternalLinkAlt className="text-[11px]" /> Live
            </a>
          )}
        </motion.div>
      </div>
      
      {/* Tech tags */}
      <div className="p-4 pt-0">
        <div className="pt-4 border-t border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              {(technologies && technologies.length ? technologies : ['React', 'Node.js', 'Tailwind']).slice(0, 2).map((tech, i) => (
                <span key={i} className="text-xs font-medium px-2 py-1 rounded bg-muted/50 text-muted-foreground">
                  {tech}
                </span>
              ))}
              {(technologies && technologies.length ? technologies : ['React', 'Node.js', 'Tailwind']).length > 2 && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-muted/30 text-muted-foreground">
                  +{(technologies && technologies.length ? technologies : ['React', 'Node.js', 'Tailwind']).length - 2}
                </span>
              )}
            </div>
            
            <span className="text-xs text-muted-foreground">
              {category || ['Web', 'Mobile', 'Full Stack'][index % 3]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Projects data
const projects = [
  {
    id: 1,
    title: "ChatGPT Clone",
    description: "AI-powered chatbot built with React, Node.js, and Express, featuring real-time responses and conversation history.",
    github: "https://github.com/AtifShahzad536/chatgpt",
    demo: "https://chatgpt-clone-example.com",
    image: chatgpt,
    category: "Full Stack",
    tags: ["AI", "Chat", "Real-time"],
    technologies: ["React", "Node.js", "Express", "OpenAI API", "WebSockets"],
    features: [
      "Real-time chat interface with streaming responses",
      "Conversation history and persistence",
      "Markdown support for code blocks",
      "Responsive design for all devices"
    ],
    images: [chatgpt, home, todo] // Multiple images for the modal
  },
  {
    id: 2,
    title: "Home Rent Platform",
    description: "A comprehensive rental platform with advanced search, property listings, and host management system.",
    github: "https://github.com/AtifShahzad536/HouseRent",
    demo: "https://homerent-example.com",
    image: home,
    category: "Web",
    tags: ["Real Estate", "Booking", "Map Integration"],
    technologies: ["React", "Node.js", "MongoDB", "Mapbox", "Stripe"],
    features: [
      "Interactive map with property listings",
      "Advanced search and filtering",
      "Secure payment processing",
      "Host dashboard for property management"
    ]
  },
  {
    id: 3,
    title: "Task Manager",
    description: "Full-featured MERN stack todo application with user authentication and real-time updates.",
    github: "https://github.com/AtifShahzad536/todo",
    demo: "https://taskmanager-example.com",
    image: todo,
    category: "Web",
    tags: ["Productivity", "Task Management"],
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    features: [
      "User authentication and authorization",
      "Real-time task updates",
      "Drag and drop interface",
      "Task categories and priorities"
    ]
  },
  {
    id: 4,
    title: "Import/Export Portal",
    description: "Enterprise solution for managing international trade operations and logistics.",
    github: "https://github.com/example/import-export",
    demo: "https://sunfitsportswear.netlify.app/",
    image: imports,
    category: "Web",
    tags: ["Logistics", "B2B", "Enterprise"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    features: [
      "Custom dashboard for trade management",
      "Document generation and tracking",
      "Multi-language support",
      "Role-based access control"
    ]
  },
  {
    id: 5,
    title: "Fashion E-commerce",
    description: "Modern online clothing store with product filtering, cart functionality, and secure checkout.",
    github: "https://github.com/example/fashion-store",
    demo: "https://sunfitwear.netlify.app/",
    image: cloth,
    category: "Web",
    tags: ["E-commerce", "Fashion", "Shopping"],
    technologies: ["React", "Redux", "Stripe", "Tailwind CSS"],
    features: [
      "Product catalog with filters",
      "Shopping cart and wishlist",
      "Secure checkout process",
      "Order tracking"
    ]
  },
  {
    id: 6,
    title: "AI Text Summarizer",
    description: "Web application that uses AI to analyze and summarize long documents with high accuracy.",
    github: "https://github.com/AtifShahzad536/chatgpt-backend",
    demo: "https://ai-summarizer-example.com",
    image: summarize,
    category: "AI",
    tags: ["NLP", "Machine Learning", "Productivity"],
    technologies: ["Python", "Flask", "React", "Hugging Face"],
    features: [
      "Extractive and abstractive summarization",
      "Support for multiple document formats",
      "API integration",
      "User accounts for saving summaries"
    ]
  }
];

export default Projects;