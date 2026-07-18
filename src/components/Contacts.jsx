import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiSend, FiMapPin, FiPhone, FiCheck, FiAlertCircle } from "react-icons/fi";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const emailOk = /\S+@\S+\.\S+/.test(formData.email);
    const nameOk = formData.name.trim().length >= 2;
    const msgOk = formData.message.trim().length >= 10;

    if (formData.company) {
      setIsLoading(false);
      return; // honeypot
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
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FiMail />,
      title: "Direct Email",
      value: "atifshahzad.develper@gmail.com",
      href: "mailto:atifshahzad.develper@gmail.com",
    },
    {
      icon: <FiPhone />,
      title: "Contact Call",
      value: "+92 310 546 4116",
      href: "tel:+923105464116",
    },
    {
      icon: <FiMapPin />,
      title: "Workspace Location",
      value: "Sialkot, Pakistan",
      href: "https://maps.google.com/?q=Sialkot,Pakistan",
    },
    {
      icon: <FaWhatsapp />,
      title: "Direct WhatsApp",
      value: "+92 310 546 4116",
      href: "https://wa.me/923105464116",
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-lg" />,
      href: "https://www.linkedin.com/in/atif-shahzad903",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub className="text-lg" />,
      href: "https://github.com/AtifShahzad536",
      label: "GitHub",
    },
  ];

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden z-10">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute top-[20%] -right-[15%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-[95px]" />
        <div className="absolute bottom-[20%] -left-[10%] w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[85px]" />
      </div>

      <div className="container-prose relative z-10 space-y-16">

        {/* Title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
            <FiSend className="text-secondary text-xs" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-primaryFg">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Contact Cards info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl font-extrabold text-primaryFg">Ready for new challenges?</h3>
              <p className="text-xs sm:text-sm text-muted">
                Drop me a line through any of these communication cards or social vectors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactMethods.map((method, i) => (
                <a
                  key={i}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-surface/30 hover:bg-surface/50 border border-border hover:border-primary/20 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary text-base flex items-center justify-center flex-shrink-0">
                    {method.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-muted">
                      {method.title}
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-primaryFg/90 truncate">
                      {method.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Social handles links */}
            <div className="flex justify-center lg:justify-start items-center gap-4 pt-4 border-t border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Direct Vectors:</span>
              <div className="flex gap-2">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface/40 hover:bg-surface border border-border hover:border-primary/30 text-muted hover:text-primaryFg transition-all duration-300 flex items-center justify-center"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Form Panel */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 space-y-6">

            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="p-2 rounded-lg bg-secondary/15 text-secondary text-sm">
                <FiSend />
              </div>
              <h3 className="text-base sm:text-lg font-black text-primaryFg uppercase tracking-wider">
                Console Dispatch Message
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    <FiCheck className="text-2xl animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-primaryFg">Transmission Successful</h4>
                    <p className="text-xs text-muted">
                      Your query has been indexed. I will formulate a response shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 bg-surface hover:bg-surface/85 border border-border hover:border-primary/25 rounded-xl text-xs font-bold uppercase tracking-wider text-primaryFg transition-colors"
                  >
                    Send another query
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/35 rounded-xl text-red-400 text-xs flex items-center gap-2">
                      <FiAlertCircle className="flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        Sender Identifier *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        required
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-surface/30 border border-border focus:border-primary/40 focus:ring-0 placeholder:text-muted/40 text-primaryFg outline-none hover:bg-surface/50 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@server.com"
                        required
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-surface/30 border border-border focus:border-primary/40 focus:ring-0 placeholder:text-muted/40 text-primaryFg outline-none hover:bg-surface/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project details, hire request..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-surface/30 border border-border focus:border-primary/40 focus:ring-0 placeholder:text-muted/40 text-primaryFg outline-none hover:bg-surface/50 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Message Content *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Formulate your request..."
                      required
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-surface/30 border border-border focus:border-primary/40 focus:ring-0 placeholder:text-muted/40 text-primaryFg outline-none hover:bg-surface/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 sm:py-3.5 bg-primary text-background font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <FiSend />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
