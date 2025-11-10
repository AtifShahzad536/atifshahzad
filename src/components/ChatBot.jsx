import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThreeBackground from './ThreeBackground'
import ChatIcon3D from './ChatIcon3D'

const BACKEND = 'https://new-port-backend.vercel.app'

export default function ChatBot () {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI assistant. Ask me anything about this site, projects, skills, or tools.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  const [suggestions, setSuggestions] = useState([
    'Show my featured project',
    'What technologies do I use?',
    'Give me a short summary of my site'
  ])

  const msgVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } }
  }), [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, open])

  // Recurring nudge popup every 5s (shows for 3s); paused when panel is open
  const [showNudge, setShowNudge] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!open) {
        setShowNudge(true)
        setTimeout(() => setShowNudge(false), 3000)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [open])

  async function sendMessage(e){
    e?.preventDefault()
    const content = input.trim()
    if (!content || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content }])
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      })
      const data = await res.json()
      const reply = data?.reply || 'Sorry, I could not respond right now.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'There was an error reaching the assistant. Please try again later.' }])
    } finally { setLoading(false) }
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.06 }}
        onClick={() => setOpen(v => !v)}
        aria-label="Open AI assistant"
        className="fixed z-50 bottom-6 right-6 rounded-full shadow-lg bg-primary text-primary-foreground w-14 h-14 flex items-center justify-center hover:shadow-xl"
      >
        <ChatIcon3D className="w-10 h-10" />
      </motion.button>

      {/* Recurring nudge popup */}
      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 14, scale: 0.9, rotate: -4, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, scale: 0.95, rotate: -2, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="fixed z-50 bottom-28 right-6 max-w-sm pointer-events-none"
          >
            <div className="relative px-4 py-3 rounded-2xl bg-card/95 border border-border shadow-xl text-base text-foreground">
              <span className="font-semibold">Let’s talk buddy</span>
              <span className="text-muted-foreground"> — I am genius AI</span>
              <div className="absolute -bottom-2 right-7 w-3.5 h-3.5 bg-card rotate-45 border-b border-r border-border" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="fixed z-50 top-20 right-6 w-[90vw] max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col backdrop-blur-md"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Subtle 3D background inside panel */}
            <ThreeBackground particleCount={900} particleSpeed={0.2} particleColor={'#6366f1'} enableOrb={false} style={{ opacity: 0.12 }} />

            <div className="px-4 py-3 border-b bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 flex items-center justify-between">
              <div className="font-semibold flex items-center gap-2">
                <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                AI Assistant
              </div>
              <button onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Close</button>
            </div>
            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    variants={msgVariants}
                    initial="hidden"
                    animate="show"
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted text-foreground rounded-bl-none'}`}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex justify-start"
                  >
                    <div className="px-3 py-2 rounded-lg bg-muted text-foreground rounded-bl-none inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 animate-bounce [animation-delay:120ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/70 animate-bounce [animation-delay:240ms]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={endRef} />
            </div>
            {/* Suggestions */}
            {suggestions?.length ? (
              <div className="px-3 pt-2 flex flex-wrap gap-2">
                {suggestions.slice(0, 3).map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInput(s); setTimeout(() => { document.getElementById('chatbot-input')?.focus() }, 0) }}
                    className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 border border-border"
                    type="button"
                  >{s}</button>
                ))}
              </div>
            ) : null}
            <form onSubmit={sendMessage} className="p-3 border-t bg-background/80 backdrop-blur flex items-center gap-2">
              <input
                id="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about projects, skills, tools..."
                className="flex-1 px-3 py-2 rounded-md bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm disabled:opacity-60 hover:shadow"
              >
                {loading ? '...' : 'Send'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
