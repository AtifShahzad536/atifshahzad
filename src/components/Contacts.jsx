"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiMapPin,
  FiPhone,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const ContactCard = ({ icon, title, value, href, className = "" }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    }}
    className={`flex items-start p-6 rounded-2xl transition-all duration-300 border border-border/30 hover:border-primary/40 ${className}`}
  >
    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
      {icon}
    </div>
    <div className="ml-4">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <p className="mt-1 text-base font-medium">{value}</p>
    </div>
  </motion.a>
);

const Contact = () => {
  const { light } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const emailOk = /\S+@\S+\.\S+/.test(formData.email);
    const nameOk = formData.name.trim().length >= 2;
    const msgOk = formData.message.trim().length >= 10;
    if (formData.company) {
      setIsLoading(false);
      return; // honeypot field
    }
    if (!nameOk || !emailOk || !msgOk) {
      setIsLoading(false);
      setErrorMsg(
        !nameOk
          ? "Please enter your name."
          : !emailOk
          ? "Please enter a valid email."
          : "Message must be at least 10 characters."
      );
      return;
    }

    try {
      const BACKEND = "https://new-port-backend.vercel.app";
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FiMail className="text-xl" />,
      title: "Email",
      value: "atifshahzad.dev@gmail.com",
      href: "mailto:atifshahzad.dev@gmail.com",
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: "Phone",
      value: "+92 312 1234567",
      href: "tel:+923121234567",
    },
    {
      icon: <FiMapPin className="text-xl" />,
      title: "Location",
      value: "Sialkot, Pakistan",
      href: "https://maps.google.com/?q=Sialkot,Pakistan",
    },
    {
      icon: <FaWhatsapp className="text-xl" />,
      title: "WhatsApp",
      value: "+92 312 1234567",
      href: "https://wa.me/923121234567",
    },
  ];

  const socialLinks = [
    {
      icon: <FiLinkedin className="text-xl" />,
      href: "https://www.linkedin.com/in/atif-shahzad903",
      label: "LinkedIn",
    },
    {
      icon: <FiGithub className="text-xl" />,
      href: "https://github.com/AtifShahzad536",
      label: "GitHub",
    },
    {
      icon: <FaTelegramPlane className="text-xl" />,
      href: "https://t.me/yourusername",
      label: "Telegram",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary)/0.05),transparent_70%)]" />
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FiSend className="text-primary" />
            Let's work together
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have a project in mind or want to discuss opportunities? Feel free
            to reach out through the form or directly via any of the contact
            methods below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden shadow-xl"
          >
            <div className="p-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20">
              <div
                className={`p-6 md:p-8 lg:p-10 ${
                  light ? "bg-white" : "bg-card"
                }`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FiMessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Send me a message
                  </h3>
                </div>

                {/* Success / Form */}
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 px-6 py-2.5 text-sm font-medium rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {errorMsg && (
                        <div
                          className={`mb-6 p-4 rounded-lg ${
                            light
                              ? "bg-red-50 text-red-700"
                              : "bg-red-900/30 text-red-300"
                          }`}
                        >
                          {errorMsg}
                        </div>
                      )}

                      {/* Inputs */}
                      {["name", "email", "subject"].map((field) => (
                        <div key={field}>
                          <label
                            htmlFor={field}
                            className={`block text-sm font-medium mb-1 ${
                              light ? "text-gray-700" : "text-gray-300"
                            }`}
                          >
                            {field === "name"
                              ? "Your Name"
                              : field === "email"
                              ? "Email Address"
                              : "Subject"}
                          </label>
                          <input
                            type={field === "email" ? "email" : "text"}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={
                              field === "name"
                                ? "Your name"
                                : field === "email"
                                ? "Your email"
                                : "What's this about?"
                            }
                            required={field !== "subject"}
                            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:outline-none ${
                              light
                                ? "border-gray-200 bg-white text-gray-900 focus:border-primary/40 focus:ring-primary/30"
                                : "border-border/40 bg-background/60 text-white focus:border-primary/40 focus:ring-primary/20"
                            }`}
                          />
                        </div>
                      ))}

                      <div>
                        <label
                          htmlFor="message"
                          className={`block text-sm font-medium mb-1 ${
                            light ? "text-gray-700" : "text-gray-300"
                          }`}
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message"
                          required
                          className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:outline-none ${
                            light
                              ? "border-gray-200 bg-white text-gray-900 focus:border-primary/40 focus:ring-primary/30"
                              : "border-border/40 bg-background/60 text-white focus:border-primary/40 focus:ring-primary/20"
                          }`}
                        ></textarea>
                      </div>

                      {/* Honeypot */}
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="hidden"
                        tabIndex="-1"
                        autoComplete="off"
                      />

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                          isLoading
                            ? "opacity-75 cursor-not-allowed"
                            : "bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:-translate-y-0.5"
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
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
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-4 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FiUser className="text-primary" />
              Contact Information
            </h3>
            <p className={`${light ? "text-gray-600" : "text-gray-300"}`}>
              Feel free to reach out through any of these platforms. I'm always
              open to discussing new projects, ideas, or collaborations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className={`relative overflow-hidden flex items-start p-5 rounded-2xl border transition-all duration-300 ${
                    light
                      ? "bg-white/90 border-gray-200 hover:border-primary/30"
                      : "bg-card/80 border-border/30 hover:border-primary/40"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">{method.icon}</div>
                  <div className="ml-4 min-w-0 flex-1">
                    <h4
                      className={`font-medium mb-2 ${
                        light ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {method.title}
                    </h4>
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`break-all hover:underline ${
                        light ? "text-primary" : "text-primary-300"
                      }`}
                    >
                      {method.value}
                    </a>
                    {method.title === "Email" && (
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(method.value);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                          } catch {}
                        }}
                        className="ml-3 inline-flex items-center px-2 py-1 text-xs rounded-md border border-border/40 hover:border-primary/40"
                        aria-label="Copy email"
                      >
                        {copied ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4
                className={`text-lg font-semibold mb-4 ${
                  light ? "text-gray-900" : "text-white"
                }`}
              >
                Let's Connect
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                      light
                        ? "bg-white text-gray-700 hover:bg-primary/10 hover:text-primary"
                        : "bg-gray-700 text-gray-200 hover:bg-primary/20 hover:text-primary-300"
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
