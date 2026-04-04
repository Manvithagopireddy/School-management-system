import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Sparkles, ArrowRight, RotateCcw, 
  CheckCircle2, XCircle, Star, Target,
  Zap, ChevronLeft, ChevronRight, GraduationCap
} from 'lucide-react';

const mockCards = [
  { id: 1, front: "What is the result of applying integration by parts to x*e^x?", back: "(x - 1)e^x + C", subject: 'Mathematics', mastery: 85 },
  { id: 2, front: "State the principle behind Quantum Superposition.", back: "A particle can exist in multiple states simultaneously until measured.", subject: 'Physics', mastery: 42 },
  { id: 3, front: "Name the primary product of Benzenesulfonic acid nitration.", back: "m-nitrobenzenesulfonic acid", subject: 'Chemistry', mastery: 65 },
  { id: 4, front: "What was the immediate cause of World War I?", back: "The assassination of Archduke Franz Ferdinand.", subject: 'History', mastery: 92 },
];

const AIFlashcards = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteryData, setMasteryData] = useState(mockCards);

  const current = masteryData[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % masteryData.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + masteryData.length) % masteryData.length);
    }, 150);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
            <Brain size={14} /> Nexus Generative Study
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight">AI Flashcards</h2>
          <p className="text-muted font-medium">Spaced repetition engine based on your <span className="text-primary font-bold">Concept Gap</span> analysis.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-xl">
           <div className="text-center">
              <p className="text-xl font-black tracking-tight">{masteryData.length}</p>
              <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Active Deck</p>
           </div>
           <div className="w-[1px] h-8 bg-white/10" />
           <div className="text-center">
              <p className="text-xl font-black text-primary tracking-tight">72%</p>
              <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Avg Mastery</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Flashcard Section */}
        <div className="lg:col-span-2 flex flex-col gap-8">
           <div className="relative h-[480px] w-full perspective-2000">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentIdx}
                 initial={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                 animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1, scale: 1 }}
                 exit={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                 className="relative w-full h-full cursor-pointer preserve-3d"
                 onClick={() => setIsFlipped(!isFlipped)}
               >
                 {/* Front */}
                 <div className="absolute inset-0 card-premium p-12 flex flex-col items-center justify-center text-center backface-hidden shadow-2xl shadow-primary/5">
                    <div className="absolute top-8 left-8 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-primary ai-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">{current.subject}</span>
                    </div>
                    <p className="text-3xl font-serif font-black leading-tight text-white mb-8">
                       "{current.front}"
                    </p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-[0.3em] absolute bottom-12">Tap to flip card</p>
                 </div>

                 {/* Back */}
                 <div className="absolute inset-0 card-premium p-12 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-900/40 via-navy to-background">
                    <div className="absolute top-8 left-8 flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-emerald-400" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Answer Key</span>
                    </div>
                    <p className="text-3xl font-bold font-sans text-white/90">
                       {current.back}
                    </p>
                    <div className="absolute bottom-12 flex gap-4">
                       <button className="px-5 py-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">Struggled</button>
                       <button className="px-5 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Mastered</button>
                    </div>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>

           <div className="flex justify-between items-center px-4">
              <button 
                onClick={handlePrev}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-2">
                 {masteryData.map((_, i) => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-8 bg-primary' : 'w-2 bg-white/10'}`} />
                 ))}
              </div>
              <button 
                onClick={handleNext}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronRight size={24} />
              </button>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-8">
           <div className="card-nexus p-8 bg-gradient-to-br from-primary/5 to-transparent">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                 <Zap className="text-primary" size={20} /> Current Deck Stats
              </h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[11px] font-bold mb-2 uppercase opacity-60">
                       <span>Mathematics</span>
                       <span>85%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[11px] font-bold mb-2 uppercase opacity-60">
                       <span>Physics</span>
                       <span>42%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} className="h-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[11px] font-bold mb-2 uppercase opacity-60">
                       <span>Chemistry</span>
                       <span>65%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-violet-400" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-premium p-8 border-primary/20">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles size={24} />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold">Pro Tip</h4>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Nexus Intelligence</p>
                 </div>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-6">
                 "You are performing exceptionally in **History**. I've added more complex **Chemistry** cards to your queue to boost your mastery before the midterms."
              </p>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                 Regenerate Deck <RotateCcw size={14} />
              </button>
           </div>

           <div className="card-nexus p-8 border-emerald-500/20">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <GraduationCap className="text-emerald-400" size={18} /> Verified Mastery
              </h3>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Star size={20} fill="currentColor" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-white">Calculus Expert</p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Blockchain Issued</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIFlashcards;
