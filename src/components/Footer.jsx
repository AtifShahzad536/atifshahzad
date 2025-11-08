import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-surface/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-sm text-muted text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="text-primaryFg font-semibold">Atif</span>. All rights reserved.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }} className="flex items-center gap-4">
          <a href="https://github.com/AtifShahzad536" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-xl card hover:translate-y-0.5 transition-transform">
            <FaGithub className="text-primary" />
          </a>
          <a href="https://www.linkedin.com/in/atif-shahzad903" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-xl card hover:translate-y-0.5 transition-transform">
            <FaLinkedin className="text-secondary" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;