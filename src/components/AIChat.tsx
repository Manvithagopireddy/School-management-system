import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, X, 
  MessageSquare, Brain, 
  Lightbulb, Target, 
  Zap, Clock, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Message = ({ text, isAi, role }: { text: string, isAi: boolean, role?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}
  >
    <div className={`max-w-[85%] p-4 rounded-3xl ${
      isAi 
        ? 'bg-white/5 border border-white/10 text-white rounded-tl-lg shadow-xl' 
        : 'bg-primary text-navy font-bold rounded-tr-lg shadow-lg'
    }`}>
      {isAi && (
        <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <Sparkles size={12} /> EduNexus AI · {role?.toUpperCase()} MODE
        </div>
      )}
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  </motion.div>
);

const SuggestionChip = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-white/70 hover:text-white transition-all whitespace-nowrap"
  >
    {label}
  </motion.button>
);

const AIChat = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: `Greetings ${user?.name.split(' ')[0]}. How can I assist you with your ${user?.role} duties today?`, isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getSuggestions = () => {
    if (user?.role === 'student') return ["Predict my term 2 GPA", "Create a 4-hour study plan", "Analyze my Math weakness"];
    if (user?.role === 'teacher') return ["Find at-risk students in 10-A", "Generate Math quiz ideas", "Draft class announcement"];
    if (user?.role === 'parent') return ["Summarize Arjun's attendance", "Calculate next fee due", "PTM preparation tips"];
    return ["System status summary", "Financial audit overview"];
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, isAi: false }]);
    if (text === input) setInput('');
    setIsTyping(true);

    // Mock AI Response Logic
    await new Promise(r => setTimeout(r, 1500));
    
    let response = "That's an interesting request. As an AI assistant, I can help you analyze that data once connected to the live database. Currently, I see your performance metrics are trending upwards!";
    
    if (text.toLowerCase().includes('gpa')) response = "Based on your current grades, I predict a Term 2 GPA of 8.85, a 0.21 improvement over Term 1.";
    if (text.toLowerCase().includes('at-risk')) response = "I've identified 3 students in Grade 10-A whose attendance has dropped below 75% in the last 14 days.";
    
    setMessages(prev => [...prev, { text: response, isAi: true }]);
    setIsTyping(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* ✨ Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-2xl flex items-center justify-center z-50 transition-all duration-500 shadow-2xl ${
          isOpen ? 'bg-navy border-white/10 text-white' : 'bg-primary text-navy ai-pulse'
        }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={28} className="animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-28 right-8 w-[420px] max-w-[90vw] h-[600px] card-premium flex flex-col z-50 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-br from-indigo-900/40 to-transparent flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                     <Brain size={20} />
                  </div>
                  <div>
                     <h3 className="font-serif text-lg font-bold text-white leading-none mb-1">Nexus Intelligence</h3>
                     <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Active Context: {user?.role}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-black text-muted uppercase tracking-widest">System Live</span>
               </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
               {messages.map((m, i) => (
                 <Message key={i} text={m.text} isAi={m.isAi} role={user?.role} />
               ))}
               {isTyping && (
                 <div className="flex justify-start mb-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-3xl rounded-tl-lg flex gap-1.5 items-center">
                       <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                       <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                       <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                 </div>
               )}
            </div>

            {/* Suggestions */}
            <div className="px-6 pb-2 overflow-x-auto no-scrollbar flex gap-2 shrink-0">
               {getSuggestions().map(s => (
                 <SuggestionChip key={s} label={s} onClick={() => handleSend(s)} />
               ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/2 border-t border-white/5">
               <div className="relative flex items-center gap-3">
                  <div className="flex-1 relative">
                     <input 
                       type="text" 
                       placeholder="Ask intelligence cube..." 
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleSend()}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/30 transition-all font-medium"
                     />
                     <button 
                       onClick={() => handleSend()}
                       className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-navy rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                     >
                        <ArrowRight size={18} />
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
