import { useState } from 'react';
import { 
  Sparkles, Target, Zap, Clock, 
  CheckCircle2, TrendingUp,
  Brain, Lightbulb, MessageSquare,
  Play, RotateCcw, ChevronRight, BookOpen, ExternalLink, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis,
  Tooltip, ResponsiveContainer
} from 'recharts';

const predictionData = [
  { name: 'Unit 1', score: 78 },
  { name: 'Unit 2', score: 82 },
  { name: 'Midterm', score: 85 },
  { name: 'Unit 3', score: 88 },
  { name: 'Predicted Final', score: 92 },
];

const INIT_PRIORITIES = [
  { id: 1, title: 'Quantum Physics Intro', dur: '45m', sub: 'High Retention Required', color: '#f5c842', done: false, link: '/ai-planner' },
  { id: 2, title: 'Calculus: Integration', dur: '60m', sub: 'Practice Problem Set 14', color: '#2dd4bf', done: false, link: '/grades'    },
  { id: 3, title: 'Organics: Benzene',    dur: '30m', sub: 'Flashcard Review',         color: '#a78bfa', done: false, link: '/ai-flashcards' },
  { id: 4, title: 'English: Essay Ref',   dur: '20m', sub: 'Peer-review feedback',     color: '#fb7185', done: false, link: null          },
];

/* ── Peer-Review Modal ── */
const PeerReviewModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/60" onClick={onClose}>
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="w-full max-w-md rounded-[2rem] p-10 flex flex-col gap-6"
      style={{ background: 'linear-gradient(145deg,rgba(24,36,72,0.98),rgba(12,20,50,0.99))', border: '1px solid rgba(251,113,133,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black font-serif text-white">Peer-Review Feedback</h3>
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:text-white transition-all"><X size={16} /></button>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Priya M.', comment: '"Strong thesis, but paragraph 3 needs more evidence."', time: '2h ago', avatar: 'P', color: '#f5c842' },
          { name: 'Rohan G.', comment: '"Loved the intro! The conclusion could be more impactful."',  time: '4h ago', avatar: 'R', color: '#2dd4bf' },
        ].map(r => (
          <div key={r.name} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" style={{ background: `${r.color}20`, color: r.color }}>{r.avatar}</div>
              <p className="text-sm font-bold text-white">{r.name}</p>
              <p className="text-[10px] text-muted ml-auto">{r.time}</p>
            </div>
            <p className="text-xs text-muted italic leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Write your response or revision notes..."
        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white min-h-[80px] resize-none focus:outline-none focus:border-rose-400/30 transition-all"
      />
      <button className="w-full py-3 bg-rose-400 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-rose-300 transition-all">Submit Response</button>
    </motion.div>
  </div>
);

/* ── Generate Schedule ── */
const shuffled = (arr: typeof INIT_PRIORITIES) =>
  [...arr].sort(() => Math.random() - 0.5);

const AIPlanner = () => {
  const navigate = useNavigate();
  const [priorities, setPriorities] = useState(INIT_PRIORITIES);
  const [isGenerating, setIsGenerating]     = useState(false);
  const [peerModalOpen, setPeerModalOpen]   = useState(false);
  const [reviewModulesOpen, setReviewModulesOpen] = useState(false);
  const [completedIds, setCompletedIds]     = useState<number[]>([]);

  const handleGenerateSchedule = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPriorities(shuffled(INIT_PRIORITIES).map(p => ({ ...p, done: false })));
      setCompletedIds([]);
      setIsGenerating(false);
    }, 1400);
  };

  const toggleDone = (id: number) => {
    setCompletedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleItemAction = (p: typeof INIT_PRIORITIES[0]) => {
    if (p.sub.toLowerCase().includes('peer')) { setPeerModalOpen(true); return; }
    if (p.link) navigate(p.link);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
            <Sparkles size={14} /> Nexus Intelligence Engine
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight">AI Study Planner</h2>
          <p className="text-muted font-medium">Dynamic prioritization based on <span className="text-primary font-bold">Concept Mastery</span> and <span className="text-primary font-bold">Exam Proximity</span>.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prediction Card */}
        <div className="lg:col-span-2 card-premium p-8 overflow-hidden group">
           <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />
           <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5 relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Target className="text-primary" size={20} /> Grade Prediction Algorithm
              </h3>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Improving Confidence</span>
           </div>
           
           <div className="h-[240px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictionData}>
                  <defs>
                    <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#f5c842" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f5c842" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} dy={10} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgb(18,32,64)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="score" stroke="#f5c842" strokeWidth={4} fill="url(#aiGrad)" animationDuration={3000} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
           
           <div className="mt-6 p-5 rounded-3xl bg-white/2 border border-white/5 flex gap-6 items-center relative z-10">
              <div className="flex-1">
                 <p className="text-sm font-bold text-white mb-1">Final Exam Expectation: 92%</p>
                 <p className="text-[11px] text-muted leading-relaxed">System predicts a breakout performance in <span className="text-primary font-bold">Calculus</span> based on your recent 12-day study streak.</p>
              </div>
              <button
                onClick={() => setReviewModulesOpen(true)}
                className="px-6 py-3 bg-primary text-navy rounded-2xl font-black text-xs shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                Review Modules
              </button>
           </div>
        </div>

        {/* Priority Stack */}
        <div className="card-premium p-8 flex flex-col gap-4 border-primary/20 shadow-primary/5">
           <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
             <Zap className="text-primary" size={22} /> Daily Priority
           </h3>
           <div className="space-y-3 flex-1">
             <AnimatePresence mode="popLayout">
               {priorities.map((p, i) => {
                 const done = completedIds.includes(p.id);
                 return (
                   <motion.div
                     layout
                     key={p.id}
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: done ? 0.4 : 1 }}
                     transition={{ delay: i * 0.08 }}
                     className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group flex items-center gap-3"
                   >
                     <button
                       onClick={() => toggleDone(p.id)}
                       className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${done ? 'bg-teal-400 border-teal-400' : 'border-white/20 hover:border-primary'}`}
                     >
                       {done && <Check size={10} className="text-navy" />}
                     </button>
                     <div className="flex-1 min-w-0" onClick={() => handleItemAction(p)}>
                        <div className="flex justify-between items-start mb-1">
                           <p className={`text-sm font-bold text-white/90 group-hover:text-primary transition-colors truncate ${done ? 'line-through' : ''}`}>{p.title}</p>
                           <span className="text-[10px] font-mono font-bold text-muted ml-2 shrink-0">{p.dur}</span>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest leading-none" style={{ color: p.color }}>{p.sub}</p>
                     </div>
                     <ChevronRight size={14} className="text-muted/30 group-hover:text-primary transition-colors shrink-0" />
                   </motion.div>
                 );
               })}
             </AnimatePresence>
           </div>
           <button
             onClick={handleGenerateSchedule}
             disabled={isGenerating}
             className="w-full py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-black text-[10px] hover:bg-primary hover:text-navy transition-all uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
           >
             <motion.div animate={{ rotate: isGenerating ? 360 : 0 }} transition={{ duration: 0.7, repeat: isGenerating ? Infinity : 0, ease: 'linear' }}>
               <RotateCcw size={14} />
             </motion.div>
             {isGenerating ? 'Generating...' : 'Generate New Schedule'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Insights */}
        <div className="card-premium p-10 flex flex-col gap-8 bg-gradient-to-br from-indigo-900/40 to-transparent border-primary/20">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-xl border border-primary/20">
                <Brain size={32} />
              </div>
              <div>
                 <h4 className="text-2xl font-black mb-1">Nexus AI Insights</h4>
                 <p className="text-[10px] text-muted font-bold uppercase tracking-widest italic opacity-60">Last updated: 14m ago</p>
              </div>
           </div>
           
           <div className="space-y-6">
             {[
               { icon: Lightbulb, title: 'Consistency High',      sub: '92% streak match for 2 weeks. Consistency score 10/10.', color: '#4ade80', action: null },
               { icon: Clock,     title: 'Math Weakness Detected', sub: '3-D geometry is slowing you down. Practice suggested.',    color: '#f5c842', action: () => navigate('/grades') },
               { icon: MessageSquare, title: 'Faculty Suggestion', sub: 'Dr. Priya has shared extra Physics notes. Review by Monday.', color: '#a78bfa', action: () => navigate('/messages') },
             ].map(ins => (
               <div
                 key={ins.title}
                 className={`flex gap-4 group ${ins.action ? 'cursor-pointer' : ''}`}
                 onClick={() => ins.action?.()}
               >
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><ins.icon size={18} style={{ color: ins.color }} /></div>
                  <div className="border-b border-white/5 pb-4 flex-1 flex items-start justify-between">
                     <div>
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{ins.title}</p>
                        <p className="text-[11px] text-muted font-medium leading-relaxed">{ins.sub}</p>
                     </div>
                     {ins.action && <ChevronRight size={14} className="text-muted/20 group-hover:text-primary transition-colors mt-1 shrink-0" />}
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Milestone */}
        <div className="card-premium p-10 flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center shadow-2xl border-4 border-navy mb-8 relative">
              <CheckCircle2 size={40} className="text-white" />
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
           </div>
           <h3 className="text-2xl font-black font-serif mb-2">Academic Consistency: Gold</h3>
           <p className="text-[11px] text-muted font-bold uppercase tracking-[0.2em] mb-10">Top 2% of the session</p>
           
           <div className="w-full h-2 bg-white/5 rounded-full mb-4 overflow-hidden border border-white/5">
              <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-primary shadow-[0_0_15px_#f5c842]" />
           </div>
           <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-10">Next Badge: Scholar Platinum</p>
           
           <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                 <p className="text-base font-black text-white">92 / 100</p>
                 <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-1">Study Score</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                 <p className="text-base font-black text-primary">+12%</p>
                 <p className="text-[9px] text-muted font-bold uppercase tracking-widest mt-1">Vs. Last Term</p>
              </div>
           </div>
        </div>
      </div>

      {/* Review Modules Panel */}
      <AnimatePresence>
        {reviewModulesOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/60" onClick={() => setReviewModulesOpen(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-[2rem] p-10 flex flex-col gap-8"
              style={{ background: 'linear-gradient(145deg,rgba(24,36,72,0.98),rgba(12,20,50,0.99))', border: '1px solid rgba(245,200,66,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black font-serif text-white">Revision Modules</h3>
                <button onClick={() => setReviewModulesOpen(false)} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:text-white transition-all"><X size={16} /></button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Calculus: Integration by Parts', progress: 85, color: '#f5c842' },
                  { name: 'Calculus: Limits & Continuity',  progress: 72, color: '#2dd4bf' },
                  { name: 'Calculus: Differential Eqns',    progress: 58, color: '#a78bfa' },
                ].map(m => (
                  <div key={m.name} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-bold text-white">{m.name}</p>
                      <span className="text-[10px] font-black" style={{ color: m.color }}>{m.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} className="h-full rounded-full" style={{ background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setReviewModulesOpen(false); navigate('/ai-flashcards'); }}
                className="w-full py-4 bg-primary text-navy font-black rounded-2xl uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <BookOpen size={16} /> Start Flashcard Review
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Peer Review Modal */}
      <AnimatePresence>
        {peerModalOpen && <PeerReviewModal onClose={() => setPeerModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default AIPlanner;
