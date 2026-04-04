import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, MicOff, Search, Sparkles, 
  X, Brain, Zap, ArrowRight,
  ArrowUpRight, Command
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NexusVoice = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();

  const handleCommand = (cmd: string) => {
    if (cmd.toLowerCase().includes('planner')) navigate('/ai-planner');
    if (cmd.toLowerCase().includes('grade') || cmd.toLowerCase().includes('gpa')) navigate('/grades');
    if (cmd.toLowerCase().includes('schedule')) navigate('/schedule');
    if (cmd.toLowerCase().includes('flashcard')) navigate('/ai-flashcards');
    onClose();
  };

  useEffect(() => {
    let timeout: any;
    if (isListening) {
      timeout = setTimeout(() => {
        setIsListening(false);
        setTranscript('Navigating to AI Study Planner...');
        setTimeout(() => handleCommand('planner'), 1000);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isListening]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl card-premium border-primary/20 bg-gradient-to-br from-indigo-950/80 via-navy to-background p-12 relative overflow-hidden"
          >
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-muted hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center gap-10">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                <Sparkles size={16} /> Nexus Voice Control
              </div>

              <div className="relative">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isListening ? 'bg-primary/20 scale-110 shadow-[0_0_50px_#f5c842]' : 'bg-white/5 border border-white/10'}`}>
                   <button 
                     onClick={() => { setIsListening(true); setTranscript('Listening...'); }}
                     className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-primary text-navy animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'}`}
                   >
                     {isListening ? <Mic size={40} /> : <MicOff size={40} />}
                   </button>
                   {isListening && (
                     <div className="absolute inset-[-20px] border border-primary/30 rounded-full animate-ping opacity-40" />
                   )}
                </div>
              </div>

              <div className="flex flex-col gap-4 max-w-md w-full">
                 <p className={`text-2xl font-serif font-black transition-all ${isListening ? 'text-white' : 'text-white/40'}`}>
                   {transcript || '"Nexus, show me my study planner"'}
                 </p>
                 <div className="h-[1px] w-full bg-white/5 rounded-full" />
                 <div className="flex flex-wrap justify-center gap-3">
                    {['Planner', 'Schedule', 'Grades', 'Flashcards'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-muted/60">{tag}</span>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                 <div className="card-nexus p-6 bg-white/3 border-white/5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Brain size={20} fill="currentColor" /></div>
                    <div>
                       <p className="text-xs font-bold text-white mb-1">Context Aware</p>
                       <p className="text-[10px] text-muted leading-relaxed">Integrated with your current dashboard state & intent.</p>
                    </div>
                 </div>
                 <div className="card-nexus p-6 bg-white/3 border-white/5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0"><Command size={20} /></div>
                    <div>
                       <p className="text-xs font-bold text-white mb-1">Hands-Free</p>
                       <p className="text-[10px] text-muted leading-relaxed">Use voice commands to navigate without tactile input.</p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NexusVoice;
