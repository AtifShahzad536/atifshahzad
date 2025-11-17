"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const BACKEND = 'https://new-port-backend.vercel.app';
const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Tell me about your skills",
    "Show me your projects",
    "How can I contact you?",
    "What's your experience?"
  ]);
  // Portfolio information
  const portfolioInfo = {
    name: "Atif Shahzad",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Python"],
    experience: "3+ years of experience in web development",
    projects: ["E-commerce platform", "Real-time chat app", "Portfolio website"],
    contact: {
      email: "atifshahzad.dev@gmail.com",
      github: "github.com/AtifShahzad",
      linkedin: "linkedin.com/in/atif-shahzad"
    }
  };

  // Sigma male responses
  const sigmaResponses = [
    "A true sigma doesn't need validation, but I'll answer that.",
    "While betas seek attention, sigmas seek knowledge. Here's what you need to know:",
    "A sigma doesn't follow trends, we set them. Here's the real deal:",
    "Most people would ask about this, but I know you're built different.",
    "I don't waste words, so listen carefully:",
    "The alpha asks questions. The sigma already knows. But since you asked:",
    "A lion doesn't concern himself with the opinions of sheep, but here's your answer:",
    "The sigma grind never stops, but I'll take a moment to answer this.",
    "Weak men seek approval. Strong men seek knowledge. Here's what you need:",
    "While others talk, sigmas act. Here's the information you need to act on:"
  ];

  const [messages, setMessages] = useState([
    { 
      text: "I'm the AI assistant for Atif Shahzad's portfolio. I'm here to answer your questions with the confidence of a sigma male. What would you like to know?", 
      sender: "bot" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const generateBotResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // First, check for direct portfolio-related questions
    if (lowerMessage.includes('who are you') || lowerMessage.includes('what is this')) {
      return `${getSigmaResponse()} I'm the AI assistant for ${portfolioInfo.name}'s portfolio. I provide information about his work and experience with the confidence of a true sigma.`;
    } 
    else if (lowerMessage.includes('experience') || lowerMessage.includes('exp')) {
      return `${getSigmaResponse()} ${portfolioInfo.experience} building cutting-edge web applications. While others talk, he delivers.`;
    }
    else if (lowerMessage.includes('skill') || lowerMessage.includes('technolog')) {
      return `${getSigmaResponse()} ${portfolioInfo.name} masters technologies like ${portfolioInfo.skills.join(', ')}. A sigma doesn't chase trends, he sets them.`;
    }
    else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return `${getSigmaResponse()} He's built ${portfolioInfo.projects.join(', ')} and more. Sigmas don't just build projects, they create legacies.`;
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('github') || lowerMessage.includes('linkedin')) {
      return `${getSigmaResponse()} A sigma's network is his net worth. Connect with him at ${portfolioInfo.contact.email} or check his GitHub at ${portfolioInfo.contact.github}.`;
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `A sigma doesn't waste time with small talk. What do you want to know about Atif's work?`;
    }
    else if (lowerMessage.includes('thank')) {
      return `Gratitude is for betas. A sigma would say 'I know I'm impressive.' Now, what else do you want to know about Atif's portfolio?`;
    }
    
    // For other queries, use the backend AI
    try {
      const response = await fetch(`${BACKEND}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      const aiResponse = data?.reply || '';
      
      // Process the AI response to maintain sigma tone
      return processAIResponse(aiResponse, userMessage);
      
    } catch (error) {
      console.error('Error calling AI backend:', error);
      return `${getSigmaResponse()} The connection is fine. The problem is on your end. Try again when you're ready.`;
    }
  };

    // Get a random sigma response
  const getSigmaResponse = () => {
    return sigmaResponses[Math.floor(Math.random() * sigmaResponses.length)];
  };

  // Clean and format AI response with sigma style
  const processAIResponse = (aiResponse, userMessage) => {
    // Remove markdown formatting
    let cleanResponse = aiResponse
      .replace(/\*\*|__|\(|\)|\[|\]|`/g, '') // Remove markdown syntax
      .replace(/\n\s*\n/g, '\n') // Remove extra newlines
      .trim();

    // Add sigma style formatting
    const sigmaStyles = [
      // (text) => `• ${text}.`, // Bullet point style
     
      (text) => `✓ ${text}`   // Checkmark style
    ];

    // Split into sentences and apply random sigma style to each
    const sentences = cleanResponse.split(/(?<=[.!?])\s+/);
    const formattedSentences = sentences.map(sentence => {
      const style = sigmaStyles[Math.floor(Math.random() * sigmaStyles.length)];
      return style(sentence);
    });

    // Add sigma header
    const sigmaHeaders = [
      "SIGMA INSIGHT",
      "SIGMA PERSPECTIVE",
      "DIRECT FROM SIGMA",
      "SIGMA ANALYSIS",
      "STRAIGHT TALK"
    ];
    
    const randomHeader = sigmaHeaders[Math.floor(Math.random() * sigmaHeaders.length)];
    const randomEmoji = ['Oh plz bs kr ','🎲'][Math.floor(Math.random() * 2)];
    
    // Format final response
    return `${randomEmoji} ${randomHeader}
${formattedSentences.join('\n')}

#SigmaMind #NoFluff`;
  };

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const content = message.trim();
    if (!content || isTyping) return;

    // Add user message
    const userMessage = { text: content, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);
    
    try {
      // First try to generate a response locally
      const localResponse = await generateBotResponse(content);
      setMessages(prev => [...prev, { text: localResponse, sender: "bot" }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        text: `${getSigmaResponse()} The connection is fine. The problem is on your end. Try again when you're ready.`, 
        sender: "bot" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Auto-close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const chatContainer = document.querySelector('.chatbot-container');
      const chatButton = document.querySelector('.chatbot-button');
      
      if (isOpen && chatContainer && !chatContainer.contains(e.target) && !chatButton.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Animation variants for messages
  const messageVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.03,
        type: 'spring',
        stiffness: 600,
        damping: 20
      }
    }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    // Auto-focus the input after setting the message
    setTimeout(() => {
      const input = document.querySelector('.chat-input');
      if (input) input.focus();
    }, 0);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      {/* Chat Window */}
      {isOpen && (
        <motion.div 
          className="chat-window bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg"
          style={{
            width: 'calc(100vw - 2rem)', 
            maxWidth: '420px',
            height: '80vh',
            maxHeight: '700px',
            '--tw-backdrop-blur': 'blur(20px)',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ 
            type: 'spring',
            damping: 25,
            stiffness: 350,
            mass: 0.5
          }}
        >
          {/* Header with glass effect */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-teal-500 p-3 flex justify-between items-center shadow-md">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-400/20 backdrop-blur-sm"></div>
            <div className="relative flex items-center space-x-3 w-full justify-between px-4">
              <motion.div 
                className="bg-white/30 p-2.5 rounded-xl backdrop-blur-sm shadow-inner"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    'inset 0 2px 10px rgba(255,255,255,0.2)',
                    'inset 0 2px 20px rgba(255,255,255,0.3)',
                    'inset 0 2px 10px rgba(255,255,255,0.2)'
                  ]
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  duration: 4,
                  ease: 'easeInOut'
                }}
              >
                <FaRobot className="text-white text-xl" />
              </motion.div>
              <div className="text-right">
                <motion.h3 
                  className="font-bold text-white text-lg drop-shadow-sm flex items-center justify-end"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-white/10 px-3 py-1 rounded-lg">Sigma AI</span>
                </motion.h3>
                <motion.p 
                  className="text-xs text-white/80 flex items-center justify-end mt-1"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="w-2 h-2 bg-lime-300 rounded-full mr-1.5 animate-pulse"></span>
                  <span className="text-white/80">Active Now</span>
                </motion.p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100/70 dark:from-gray-900/90 dark:to-gray-800/90 scrollbar-thin scrollbar-thumb-gray-300/70 dark:scrollbar-thumb-gray-600/70 scrollbar-track-transparent">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={messageVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  <motion.div 
                    className={`relative max-w-[85%] p-3.5 text-sm sm:text-base transition-all duration-200 ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-2xl rounded-tr-none shadow-lg hover:shadow-emerald-400/20' 
                        : 'bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-none shadow-sm border border-gray-100/70 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-md'
                    }`}
                    whileHover={{ 
                      y: -2,
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' 
                    }}
                  >
                    <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                    <div className={`text-xs mt-2 text-right ${msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {/* Decorative elements */}
                    {msg.sender !== 'user' && (
                      <>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white dark:bg-gray-700 transform -rotate-45 rounded-sm"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/50 dark:bg-gray-700/50 transform -rotate-45 rounded-sm"></div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              ))}
              
              {/* Typing indicator with animation */}
              {isTyping && (
                <motion.div 
                  className="flex items-center space-x-2 p-2.5 w-28 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-sm backdrop-blur-sm border border-gray-200/70 dark:border-gray-700/50 mx-auto mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      type: 'spring',
                      stiffness: 600,
                      damping: 25
                    }
                  }}
                >
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-300 ml-1">typing...</span>
                </motion.div>
              )}

              {/* Suggestions */}
              {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'user' && (
                <motion.div 
                  className="flex flex-wrap gap-2 mt-2 px-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {suggestions.map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 text-xs bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-indigo-50 dark:hover:bg-gray-600/80 transition-all duration-200"
                      whileHover={{ scale: 1.03, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>

          {/* Input Area */}
          <div className="relative">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            
            <form 
              onSubmit={handleSendMessage} 
              className="relative p-4 border-t border-gray-100/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-b-2xl"
            >
              {/* Quick Suggestions */}
              {!message && messages.length <= 1 && (
                <motion.div 
                  className="mb-3 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2 self-center">Try asking:</span>
                  {suggestions.slice(0, 2).map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                      {idx === 0 && <span className="ml-1 text-indigo-500">→</span>}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              <div className="flex items-stretch space-x-3 relative">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message Sigma Assistant..."
                    className="chat-input w-full p-3 pr-12 rounded-xl border-2 border-gray-200/80 dark:border-gray-600/50 bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-200 text-sm sm:text-base shadow-sm backdrop-blur-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setMessage('')}
                    className={`absolute right-12 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all ${
                      message 
                        ? 'opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-600/30' 
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <motion.button 
                  type="submit"
                  disabled={!message.trim()}
                  className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0 flex items-center justify-center ${
                    message.trim() 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={message.trim() ? { 
                    scale: 1.05,
                    rotate: [0, -5, 5, 0],
                    transition: { 
                      rotate: { 
                        repeat: Infinity, 
                        duration: 0.5 
                      } 
                    } 
                  } : {}}
                  whileTap={message.trim() ? { scale: 0.95 } : {}}
                  style={{
                    boxShadow: message.trim() ? '0 4px 20px -5px rgba(99, 102, 241, 0.4)' : 'none'
                  }}
                >
                  <IoMdSend className="text-lg" />
                </motion.button>
              </div>
              
              {/* Microphone button for future voice input */}
              <button 
                type="button" 
                className="absolute right-24 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label="Voice input"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ${
            isOpen 
              ? 'bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
              : 'bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
          } transition-all duration-300 group relative overflow-hidden`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"
            animate={{
              x: [-100, 100],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <div className="relative z-10">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 500,
                  damping: 20
                }}
              >
                <FaTimes className="text-2xl text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  transition: { 
                    repeat: Infinity, 
                    repeatType: 'reverse',
                    duration: 2 
                  } 
                }}
                className="relative"
              >
                <FaCommentDots className="text-2xl text-white" />
                {messages.length > 1 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      transition: { 
                        type: 'spring', 
                        stiffness: 500, 
                        damping: 15 
                      } 
                    }}
                  >
                    {messages.length - 1}
                  </motion.span>
                )}
              </motion.div>
            )}
          </div>
          
          {/* Glow effect */}
          {!isOpen && (
            <motion.span 
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.button>
        
        {/* Tooltip */}
        {!isOpen && (
          <motion.div 
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: 1 }
            }}
          >
            Chat with me
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-gray-800 transform rotate-45 -mr-1"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatBotIcon;
