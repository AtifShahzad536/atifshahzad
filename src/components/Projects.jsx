import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight, FaRocket, FaCode, FaPalette } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import chatgpt from '../assets/chatgpt.png';
import home from '../assets/home.png';
import summarize from '../assets/summarize.png';
import cloth from '../assets/clothing.png';
import imports from '../assets/import.png';
import todo from '../assets/todo.png';

const BACKEND = 'https://new-port-backend.vercel.app';

const Projects = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [apiItems, setApiItems] = useState([]);
  
  const categories = ['All', 'Web', 'Full Stack', 'AI', 'Mobile App'];

  // Fetch backend projects
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
    : sourceProjects.filter(project => {
        const cat = project.category?.toLowerCase() || '';
        const sel = selectedCategory?.toLowerCase() || '';
        if (sel === 'mobile app') {
          return cat.includes('mobile') || cat.includes('app');
        }
        if (sel === 'full stack') {
          return cat.includes('full') || cat.includes('stack');
        }
        return cat.includes(sel);
      });
    
  const openProjectModal = (project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      setSelectedProject(project);
      setCurrentImageIndex(0);
      document.body.style.overflow = 'hidden';
    }
  };
  
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex(prev => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };
  
  // Preload local assets
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = projects.map(project => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = project.image;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(imagePromises);
      setIsLoading(false);
    };
    loadImages();
  }, []);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden z-10" id="projects">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[30%] -right-[15%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[90px]" />
      </div>

      <div className="container-prose relative z-10 space-y-16">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
            <FaRocket className="text-primary text-xs" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Portfolio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-primaryFg">
            My Built <span className="text-primary">Creations</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto">
            A handpicked selection of production-grade platforms, APIs, and client-centric apps that I have deployed.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-3 border-b border-border pb-6">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 transform hover:-translate-y-0.5 ${
                  isSelected
                    ? 'bg-primary/10 text-primary border-primary/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'bg-surface/50 border-border/80 text-muted hover:text-primaryFg hover:border-primary/30'
                }`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Layout Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-surface/30 border border-border rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group glass-panel glow-border flex flex-col h-full cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => openProjectModal(project)}
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden bg-background">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Category overlay */}
                  <span className="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase bg-surface/80 border border-border backdrop-blur-md px-2 py-1 rounded text-primary">
                    {project.category}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-primaryFg group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Badges footer */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[9px] font-bold px-2 py-0.5 rounded bg-border/20 text-muted border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Overlay details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg overflow-y-auto"
              onClick={closeProjectModal}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative bg-surface/95 border border-border backdrop-blur-2xl rounded-xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeProjectModal}
                  className="absolute top-2.5 right-2.5 z-50 p-1 rounded-full bg-background/90 hover:bg-primary border border-border hover:border-primary text-primaryFg hover:text-background transition-all duration-300 shadow backdrop-blur"
                >
                  <FaTimes className="text-xs" />
                </button>

                {/* Top: Slideshow Gallery with styled grid bg and full image view */}
                <div className="relative w-full h-44 sm:h-52 bg-black/40 flex flex-col items-center justify-center p-3 border-b border-border/60 overflow-hidden flex-shrink-0">
                  {/* Subtle Grid backdrop */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  <div className="absolute w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Image container ensuring image is fully visible */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={selectedProject.images && selectedProject.images.length > 0 
                        ? selectedProject.images[currentImageIndex] 
                        : selectedProject.image
                      }
                      alt={selectedProject.title}
                      className="max-w-full max-h-full object-contain rounded shadow-lg border border-border/30"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 p-1.5 rounded-full bg-surface/80 hover:bg-primary border border-border text-primaryFg hover:text-background transition-all"
                      >
                        <FaChevronLeft className="text-[8px]" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 p-1.5 rounded-full bg-surface/80 hover:bg-primary border border-border text-primaryFg hover:text-background transition-all"
                      >
                        <FaChevronRight className="text-[8px]" />
                      </button>

                      {/* Dots indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-background/60 backdrop-blur px-2 py-1 rounded-full">
                        {selectedProject.images.map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-all cursor-pointer ${
                              i === currentImageIndex ? 'bg-primary w-2.5' : 'bg-white/30'
                            }`}
                            onClick={() => setCurrentImageIndex(i)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom: Project Details pane - highly optimized space */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-black text-primaryFg tracking-tight">
                        {selectedProject.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        {selectedProject.category}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-muted leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Details columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1.5">
                      {/* Features list */}
                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div className="space-y-1">
                          <h4 className="text-[9px] font-bold uppercase text-primaryFg tracking-widest flex items-center gap-1">
                            <FaPalette className="text-secondary" /> Highlights
                          </h4>
                          <ul className="text-[10px] text-muted space-y-1 pl-0.5">
                            {selectedProject.features.slice(0, 3).map((feature, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-secondary">•</span>
                                <span className="leading-tight">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Badges */}
                      <div className="space-y-1.5">
                        <h4 className="text-[9px] font-bold uppercase text-primaryFg tracking-widest flex items-center gap-1">
                          <FaCode className="text-primary" /> Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProject.technologies.slice(0, 6).map((tech, i) => (
                            <span key={i} className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/5 text-primary border border-primary/20 shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3 pt-4 border-t border-border/80">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-surface/50 hover:bg-surface border border-border hover:border-primary/40 text-primaryFg hover:text-primary font-bold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-sm"
                      >
                        <FaGithub />
                        <span>Repository</span>
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-primary via-primary/80 to-secondary text-background hover:text-background font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:-translate-y-0.5"
                      >
                        <FaExternalLinkAlt className="text-[8px]" />
                        <span>Live Build</span>
                      </a>
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

// Static Fallbacks
const projects = [
  {
    id: 1,
    title: "ChatGPT Clone Interface",
    description: "AI-powered custom conversational agent interface built with React and Express APIs, featuring real-time message streaming and session histories.",
    github: "https://github.com/AtifShahzad536/chatgpt",
    demo: "https://chatgpt-clone-example.com",
    image: chatgpt,
    category: "AI",
    tags: ["NLP", "AI Systems", "Real-Time"],
    technologies: ["React", "Express.js", "Node.js", "OpenAI APIs", "WebSockets"],
    features: [
      "Streamed markdown text rendering",
      "Persistent dialog threads via local databases",
      "Dynamic dark theme cyberpunk coding styles",
      "Full viewport layouts scaling down to pocket mobile screens"
    ],
    images: [chatgpt, home, todo]
  },
  {
    id: 2,
    title: "Home Rent Platform",
    description: "A comprehensive booking and rental board featuring coordinate-based property queries and custom host dashboards.",
    github: "https://github.com/AtifShahzad536/HouseRent",
    demo: "https://homerent-example.com",
    image: home,
    category: "Full Stack",
    tags: ["Rentals", "B2C", "Logistics"],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe Gateways"],
    features: [
      "Full interactive map filters using Mapbox wrappers",
      "Payment processing with checkout forms",
      "Secured API tokens with JSON Web Tokens",
      "Property uploads panel for registered hosts"
    ],
    images: [home, chatgpt, todo]
  },
  {
    id: 3,
    title: "Task Scheduler Board",
    description: "Responsive productivity workspace designed on MERN architecture to coordinate task lists, labels, and deadlines.",
    github: "https://github.com/AtifShahzad536/todo",
    demo: "https://taskmanager-example.com",
    image: todo,
    category: "Web",
    tags: ["Productivity", "Agile Layouts"],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    features: [
      "Secured login authorization layers",
      "Drag and drop task boards",
      "Color-coded prioritization and filter rules",
      "Autosave sync across open browser tabs"
    ],
    images: [todo, cloth, imports]
  },
  {
    id: 4,
    title: "Import/Export Trade Panel",
    description: "Enterprise panel developed to supervise international freight shipments, documents, and cargo weights.",
    github: "https://github.com/example/import-export",
    demo: "https://sunfitsportswear.netlify.app/",
    image: imports,
    category: "Web",
    tags: ["Logistics", "B2B Solutions"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase Databases"],
    features: [
      "Document generation engines using custom layouts",
      "Live status trackers for maritime coordinates",
      "Role-based control panels for customs agents",
      "Localized language catalogs"
    ],
    images: [imports, cloth, summarize]
  },
  {
    id: 5,
    title: "Fashion E-commerce Store",
    description: "A sleek, responsive digital storefront integrating item indexes, cart controls, and webpayments checkout.",
    github: "https://github.com/example/fashion-store",
    demo: "https://sunfitwear.netlify.app/",
    image: cloth,
    category: "Web",
    tags: ["E-Commerce", "Stripe Pay"],
    technologies: ["React", "Redux Toolkit", "Stripe API", "Tailwind CSS"],
    features: [
      "Client filtering based on price ranges and sizes",
      "Persistent cart drawer using local storage hooks",
      "Automated tax calculations",
      "Framer Motion entrance transition grids"
    ],
    images: [cloth, imports, chatgpt]
  },
  {
    id: 6,
    title: "AI Document Summarizer",
    description: "Web application using AI text parsing endpoints to synthesize high-accuracy executive summaries from documents.",
    github: "https://github.com/AtifShahzad536/chatgpt-backend",
    demo: "https://ai-summarizer-example.com",
    image: summarize,
    category: "AI",
    tags: ["AI Tools", "NLP Core"],
    technologies: ["React", "Flask APIs", "Python Core", "Hugging Face APIs"],
    features: [
      "Dual extractive/abstractive processing modes",
      "Supported file formats: txt, pdf, markdown",
      "Fast API response processing via background workers",
      "User summaries logging console"
    ],
    images: [summarize, chatgpt, home]
  },
  {
    id: 7,
    title: "React Native Ride Share App",
    description: "A cross-platform mobile ride-sharing client application built with React Native, offering interactive route maps, location coordinate updates, and payment gateways integration.",
    github: "https://github.com/AtifShahzad536/rideshare-mobile",
    demo: "https://rideshare-app-example.com",
    image: home,
    category: "Mobile App",
    tags: ["Mobile", "GPS Maps", "Fintech"],
    technologies: ["React Native", "Expo", "Node.js", "Socket.io", "Stripe API"],
    features: [
      "Real-time driver location tracking using Mapbox coordinate layers",
      "Push notifications system powered by Firebase Cloud Messaging",
      "Secure Stripe mobile checkout integrations",
      "Dynamic light/dark UI themes matching user system preferences"
    ],
    images: [home, chatgpt, todo]
  }
];

export default Projects;