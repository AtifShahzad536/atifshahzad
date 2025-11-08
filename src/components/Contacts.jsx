import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FiMail, FiLinkedin, FiGithub, FiSend, FiMapPin, FiPhone } from "react-icons/fi";
import ThreeScene from "./ThreeScene";

const Contact = () => {
  const { light } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const BACKEND = 'https://new-port-backend.vercel.app';
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed');
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      // Optionally show an error toast/snackbar; keep silent to preserve UI
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FiMail className="text-2xl text-primary" />,
      title: "Email",
      value: "atifshahzad.dev@gmail.com",
      href: "mailto:atifshahzad.dev@gmail.com"
    },
    {
      icon: <FiLinkedin className="text-2xl text-[#0A66C2]" />,
      title: "LinkedIn",
      value: "atif-shahzad903",
      href: "https://www.linkedin.com/in/atif-shahzad903"
    },
    {
      icon: <FiGithub className="text-2xl text-gray-800 dark:text-gray-200" />,
      title: "GitHub",
      value: "AtifShahzad536",
      href: "https://github.com/AtifShahzad536"
    },
    {
      icon: <FiMapPin className="text-2xl text-red-500" />,
      title: "Location",
      value: "Sialkot, Pakistan",
      href: "https://maps.google.com/?q=Sialkot,Pakistan"
    }
  ];

  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
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
            <FiMail className="text-2xl text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Get In Touch
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            light ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-2xl shadow-lg p-6 lg:p-8 mb-8 ${
              light ? 'bg-white' : 'bg-gray-800'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${
              light ? 'text-gray-900' : 'text-white'
            }`}>
              Send me a message
            </h3>
            
            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-lg ${
                    light 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-green-900/30 text-green-300'
                  }`}
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
                  light ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors ${
                    light 
                      ? 'border border-gray-300 bg-white text-gray-900 focus:border-transparent focus:ring-primary/50' 
                      : 'border border-gray-600 bg-gray-700 text-white focus:border-transparent focus:ring-primary/30'
                  }`}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
                  light ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors ${
                    light 
                      ? 'border border-gray-300 bg-white text-gray-900 focus:border-transparent focus:ring-primary/50' 
                      : 'border border-gray-600 bg-gray-700 text-white focus:border-transparent focus:ring-primary/30'
                  }`}
                  placeholder="Your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-1 ${
                  light ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors ${
                    light 
                      ? 'border border-gray-300 bg-white text-gray-900 focus:border-transparent focus:ring-primary/50' 
                      : 'border border-gray-600 bg-gray-700 text-white focus:border-transparent focus:ring-primary/30'
                  }`}
                  placeholder="Your message"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="text-lg" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className={`text-2xl font-bold ${
                light ? 'text-gray-900' : 'text-white'
              }`}>
                Contact Information
              </h3>
              <p className={`${light ? 'text-gray-600' : 'text-gray-300'}`}>
                Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className={`flex items-start p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
                    light 
                      ? 'bg-white hover:shadow-gray-200' 
                      : 'bg-gray-800 hover:shadow-gray-700'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {method.icon}
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <h4 className={`font-medium mb-2 ${
                      light ? 'text-gray-900' : 'text-white'
                    }`}>
                      {method.title}
                    </h4>
                    <div className={`p-3 rounded-lg ${
                      light ? 'bg-gray-50' : 'bg-gray-700/50'
                    }`}>
                      <a 
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`break-all hover:underline ${
                          light ? 'text-primary' : 'text-primary-300'
                        }`}
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
              <h4 className={`text-lg font-semibold mb-4 ${
                light ? 'text-gray-900' : 'text-white'
              }`}>
                Let's Connect
              </h4>
              <div className="flex space-x-4">
                {[
                  { 
                    icon: <FiGithub className="text-xl" />, 
                    href: "https://github.com/AtifShahzad536",
                    label: "GitHub"
                  },
                  { 
                    icon: <FiLinkedin className="text-xl" />, 
                    href: "https://www.linkedin.com/in/atif-shahzad903",
                    label: "LinkedIn"
                  },
                  { 
                    icon: <FiMail className="text-xl" />, 
                    href: "mailto:atifshahzad.dev@gmail.com",
                    label: "Email"
                  }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                      light 
                        ? 'bg-white text-gray-700 hover:bg-primary/10 hover:text-primary' 
                        : 'bg-gray-700 text-gray-200 hover:bg-primary/20 hover:text-primary-300'
                    }`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;