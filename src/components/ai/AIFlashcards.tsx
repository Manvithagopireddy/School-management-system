import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  Brain, Sparkles, RotateCcw, 
  CheckCircle2, Star, Zap, 
  ChevronLeft, ChevronRight, GraduationCap,
  ThumbsUp, ThumbsDown, Minus, TrendingUp, AlertTriangle
} from 'lucide-react';

type ConfidenceLevel = 'perfect' | 'good' | 'meh' | 'struggled';

interface Card {
  id: number;
  front: string;
  back: string;
  subject: string;
  mastery: number;
  confidence?: ConfidenceLevel;
  aiRevise?: boolean;
}

const initialCards: Card[] = [
  { id: 1, front: "What is the result of applying integration by parts to x·eˣ?", back: "(x − 1)eˣ + C", subject: 'Mathematics', mastery: 85, aiRevise: false },
  { id: 2, front: "State the principle behind Quantum Superposition.", back: "A particle exists in multiple states simultaneously until observed.", subject: 'Physics', mastery: 42, aiRevise: true },
  { id: 3, front: "Name the primary product of Benzenesulfonic acid nitration.", back: "m-nitrobenzenesulfonic acid", subject: 'Chemistry', mastery: 65, aiRevise: true },
  { id: 4, front: "What was the immediate cause of World War I?", back: "The assassination of Archduke Franz Ferdinand in Sarajevo, 1914.", subject: 'History', mastery: 92, aiRevise: false },
  { id: 5, front: "Define Polymorphism in Object-Oriented Programming.", back: "Ability of different objects to be treated as the same type via a shared interface.", subject: 'CS', mastery: 78, aiRevise: false },
];

const confidenceConfig = {
  perfect:  { label: 'Perfect!',  icon: Star,       color: '#f5c842', bg: 'bg-amber-400/10',  border: 'border-amber-400/30',  text: 'text-amber-400'  },
  good:     { label: 'Got it',    icon: ThumbsUp,   color: '#2dd4bf', bg: 'bg-teal-400/10',   border: 'border-teal-400/30',   text: 'text-teal-400'   },
  meh:      { label: 'Unsure',    icon: Minus,      color: '#a78bfa', bg: 'bg-violet-400/10', border: 'border-violet-400/30', text: 'text-violet-400' },
  struggled:{ label: 'Struggled', icon: ThumbsDown, color: '#fb7185', bg: 'bg-rose-400/10',   border: 'border-rose-400/30',   text: 'text-rose-400'   },
};

const subjectMastery = [
  { label: 'Mathematics', pct: 85, color: '#f5c842'  },
  { label: 'Physics',     pct: 42, color: '#fb7185',  glow: true },
  { label: 'Chemistry',   pct: 65, color: '#a78bfa'  },
  { label: 'History',     pct: 92, color: '#2dd4bf'  },
  { label: 'CS',          pct: 78, color: '#4ade80'  },
];

const AIFlashcards = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  const [sessionLog, setSessionLog] = useState<{ id: number; confidence: ConfidenceLevel }[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [filterRevise, setFilterRevise] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setCards([...initialCards].sort((a, b) => a.mastery - b.mastery));
      setCurrentIdx(0);
      setIsFlipped(false);
      setSessionLog([]);
      setIsRegenerating(false);
    }, 1300);
  };

  const handleReviewNow = () => {
    const flagged = cards.filter(c => c.aiRevise);
    if (flagged.length === 0) return;
    setCards(flagged);
    setCurrentIdx(0);
    setIsFlipped(false);
    setSessionLog([]);
    setFilterRevise(true);
  };

  const current = cards[currentIdx];
  const aiReviseCount = cards.filter(c => c.aiRevise).length;

  // Drag for swipe gesture
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const leftSwipeOpacity = useTransform(x, [-100, -30, 0], [1, 0.5, 0]);
  const rightSwipeOpacity = useTransform(x, [0, 30, 100], [0, 0.5, 1]);

  const goNext = (confidence?: ConfidenceLevel) => {
    if (confidence) {
      setCards(prev => prev.map((c, i) =>
        i === currentIdx ? { ...c, confidence, aiRevise: confidence === 'struggled' || confidence === 'meh' } : c
      ));
      if (confidence) setSessionLog(prev => [...prev, { id: current.id, confidence }]);
    }
    setIsFlipped(false);
    setSwipeDir('left');
    setTimeout(() => {
      setSwipeDir(null);
      setCurrentIdx(prev => (prev + 1) % cards.length);
    }, 200);
  };

  const goPrev = () => {
    setIsFlipped(false);
    setSwipeDir('right');
    setTimeout(() => {
      setSwipeDir(null);
      setCurrentIdx(prev => (prev - 1 + cards.length) % cards.length);
    }, 200);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -80) goNext('struggled');
    else if (info.offset.x > 80) goNext('perfect');
    x.set(0);
  };

  const avgMastery = Math.round(subjectMastery.reduce((a, b) => a + b.pct, 0) / subjectMastery.length);
  const sessionCorrect = sessionLog.filter(l => l.confidence === 'perfect' || l.confidence === 'good').length;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
            <Brain size={14} /> Nexus Spaced Repetition
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight text-white">AI Flashcards</h2>
          <p className="text-muted font-medium mt-1">Swipe right = <span className="text-teal-400 font-bold">Mastered</span> · Swipe left = <span className="text-rose-400 font-bold">Needs Review</span></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="text-center">
              <p className="text-2xl font-black tracking-tight text-white">{cards.length}</p>
              <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Cards</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-primary tracking-tight">{avgMastery}%</p>
              <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Mastery</p>
            </div>
            {aiReviseCount > 0 && (
              <>
                <div className="w-[1px] h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-black text-rose-400 tracking-tight">{aiReviseCount}</p>
                  <p className="text-[9px] text-muted font-bold uppercase tracking-widest">AI Flagged</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* AI Revision Alert */}
      {(aiReviseCount > 0 || filterRevise) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-4 p-5 rounded-2xl border ${filterRevise ? 'bg-teal-400/5 border-teal-400/20' : 'bg-rose-400/5 border-rose-400/20'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${filterRevise ? 'bg-teal-400/10 text-teal-400' : 'bg-rose-400/10 text-rose-400'}`}>
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">
              {filterRevise
                ? <>Showing <span className="text-teal-400">{cards.length} flagged cards</span> — review mode active</>
                : <>Nexus AI suggests: Review <span className="text-rose-400">{aiReviseCount} cards</span> before your exam</>
              }
            </p>
            <p className="text-[11px] text-muted mt-0.5">Physics &amp; Chemistry have the highest concept gaps based on your confidence history.</p>
          </div>
          {!filterRevise ? (
            <button
              onClick={handleReviewNow}
              className="px-4 py-2 bg-rose-400/10 text-rose-400 border border-rose-400/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-400 hover:text-white transition-all shrink-0"
            >
              Review Now
            </button>
          ) : (
            <button
              onClick={() => { setCards(initialCards); setCurrentIdx(0); setFilterRevise(false); setSessionLog([]); }}
              className="px-4 py-2 bg-white/5 text-muted border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all shrink-0"
            >
              Show All
            </button>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Card Area */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="relative h-[440px] w-full" style={{ perspective: '1400px' }}>
            {/* Swipe Hint Labels */}
            <motion.div
              style={{ opacity: leftSwipeOpacity }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="px-5 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm rotate-[-12deg] shadow-xl shadow-rose-500/40">
                REVIEW 📚
              </div>
            </motion.div>
            <motion.div
              style={{ opacity: rightSwipeOpacity }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="px-5 py-3 bg-teal-500 text-white rounded-2xl font-black text-sm rotate-[12deg] shadow-xl shadow-teal-500/40">
                MASTERED ✓
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIdx}-${swipeDir}`}
                style={{ x, rotate, opacity }}
                drag={!isFlipped ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                initial={swipeDir === 'left' ? { x: 300, opacity: 0, scale: 0.9 } : swipeDir === 'right' ? { x: -300, opacity: 0, scale: 0.9 } : { opacity: 0, scale: 0.96 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={swipeDir === 'left' ? { x: -300, opacity: 0, scale: 0.9 } : { x: 300, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-full h-full cursor-grab active:cursor-grabbing"
                onClick={() => setIsFlipped(f => !f)}
              >
                {/* Inner flip container */}
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.55, type: 'spring', stiffness: 200, damping: 22 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 rounded-[2rem] border border-white/8 flex flex-col items-center justify-center text-center p-12 select-none"
                    style={{
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, rgba(30,42,80,0.9) 0%, rgba(18,32,64,0.95) 100%)',
                      boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Top Tags */}
                    <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary ai-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted">{current.subject}</span>
                      </div>
                      {current.aiRevise && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-400/10 text-rose-400 rounded-full text-[9px] font-black border border-rose-400/20 uppercase tracking-wider">
                          <AlertTriangle size={10} /> AI Revise
                        </span>
                      )}
                    </div>

                    <p className="text-[1.6rem] font-serif font-black leading-snug text-white/95 max-w-[520px]">
                      "{current.front}"
                    </p>

                    <div className="absolute bottom-8 flex flex-col items-center gap-3">
                      <p className="text-[10px] text-muted/50 font-bold uppercase tracking-[0.3em]">
                        Tap to reveal · Swipe to rate
                      </p>
                      <div className="flex gap-1.5">
                        {cards.map((_, i) => (
                          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-6 bg-primary' : 'w-1.5 bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 rounded-[2rem] flex flex-col items-center justify-center text-center p-12 select-none"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(135deg, rgba(20,50,80,0.95) 0%, rgba(15,35,70,0.98) 100%)',
                      boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(45,212,191,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="absolute top-8 left-8 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-teal-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-teal-400">Answer</span>
                    </div>

                    <p className="text-2xl font-bold text-white/90 leading-relaxed max-w-[480px]">
                      {current.back}
                    </p>

                    {/* Confidence Buttons */}
                    <div className="absolute bottom-8 flex flex-col items-center gap-4 w-full px-12">
                      <p className="text-[9px] text-muted font-bold uppercase tracking-[0.3em]">How confident are you?</p>
                      <div className="grid grid-cols-4 gap-3 w-full">
                        {(Object.entries(confidenceConfig) as [ConfidenceLevel, typeof confidenceConfig[ConfidenceLevel]][]).map(([key, cfg]) => (
                          <button
                            key={key}
                            onClick={(e) => { e.stopPropagation(); goNext(key); }}
                            className={`py-3 rounded-2xl border text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1.5 ${cfg.bg} ${cfg.border} ${cfg.text}`}
                          >
                            <cfg.icon size={16} />
                            {cfg.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav Buttons */}
          <div className="flex justify-between items-center px-2">
            <button onClick={goPrev} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
              <ChevronLeft size={22} />
            </button>
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs font-black text-white">{currentIdx + 1} <span className="text-muted font-medium">of</span> {cards.length}</p>
              {sessionLog.length > 0 && (
                <p className="text-[10px] text-teal-400 font-bold">{sessionCorrect}/{sessionLog.length} correct this session</p>
              )}
            </div>
            <button onClick={() => goNext()} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Mastery Bars */}
          <div
            className="rounded-[2rem] p-8 flex flex-col gap-5"
            style={{
              background: 'linear-gradient(135deg, rgba(24,36,72,0.8), rgba(15,25,55,0.9))',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h3 className="text-base font-bold flex items-center gap-2 text-white">
              <Zap className="text-primary" size={18} /> Subject Mastery
            </h3>
            <div className="space-y-5">
              {subjectMastery.map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-[11px] font-bold mb-2 uppercase tracking-widest text-muted/70">
                    <span>{s.label}</span>
                    <span style={{ color: s.color }}>{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{
                        background: s.pct < 50
                          ? `linear-gradient(90deg, #fb7185, #fb718580)`
                          : `linear-gradient(90deg, ${s.color}, ${s.color}80)`,
                        boxShadow: s.pct < 50 ? '0 0 12px rgba(251,113,133,0.4)' : undefined,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Nexus Tip */}
          <div
            className="rounded-[2rem] p-8 flex flex-col gap-5"
            style={{
              background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(15,25,55,0.95))',
              border: '1px solid rgba(245,200,66,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Nexus AI Tip</h4>
                <p className="text-[9px] text-primary/70 font-black uppercase tracking-widest">Personalized</p>
              </div>
            </div>
            <p className="text-xs text-muted/80 leading-relaxed italic">
              "You're strong in <span className="text-teal-400 font-bold not-italic">History & Math</span>. Focus your next 20 minutes on <span className="text-rose-400 font-bold not-italic">Physics</span> — your confidence dropped 3x this week."
            </p>
            <button
              disabled={isRegenerating}
              className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)', color: '#f5c842' }}
              onClick={handleRegenerate}
            >
              <motion.div animate={{ rotate: isRegenerating ? 360 : 0 }} transition={{ duration: 0.6, repeat: isRegenerating ? Infinity : 0, ease: 'linear' }}>
                <RotateCcw size={14} />
              </motion.div>
              {isRegenerating ? 'Regenerating...' : 'Regenerate Deck'}
            </button>
          </div>

          {/* Session Score */}
          {sessionLog.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(45,212,191,0.05), rgba(15,25,55,0.95))',
                border: '1px solid rgba(45,212,191,0.15)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="text-teal-400" size={18} /> Session Progress
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <p className="text-xl font-black text-teal-400">{sessionCorrect}</p>
                  <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-0.5">Correct</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <p className="text-xl font-black text-rose-400">{sessionLog.length - sessionCorrect}</p>
                  <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-0.5">Review</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blockchain Badge */}
          <div
            className="rounded-[2rem] p-6 flex items-center gap-4"
            style={{
              background: 'rgba(16,185,129,0.05)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Calculus Expert</p>
              <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Blockchain Issued</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFlashcards;
