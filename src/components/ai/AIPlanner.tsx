import { 
  Sparkles, Target, Zap, Clock, 
  Calendar, CheckCircle2, TrendingUp,
  Brain, Lightbulb, MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const predictionData = [
  { name: 'Unit 1', score: 78 },
  { name: 'Unit 2', score: 82 },
  { name: 'Midterm', score: 85 },
  { name: 'Unit 3', score: 88 },
  { name: 'Predicted Final', score: 92, isPredicted: true },
];

const AIPlanner = () => {
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
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Improving Confidence</span>
              </div>
           </div>
           
           <div className="h-[280px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictionData}>
                  <defs>
                    <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#f5c842" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f5c842" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} dy={10} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgb(30,53,96)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="score" stroke="#f5c842" strokeWidth={4} fill="url(#aiGrad)" animationDuration={3000} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
           
           <div className="mt-8 p-6 rounded-3xl bg-white/2 border border-white/5 flex gap-8 items-center relative z-10">
              <div className="flex-1">
                 <p className="text-sm font-bold text-white mb-1">Final Exam Expectation: 92%</p>
                 <p className="text-[11px] text-muted leading-relaxed">System predicts a breakout performance in <span className="text-primary font-bold">Calculus</span> based on your recent 12-day study streak.</p>
              </div>
              <button className="px-6 py-3 bg-primary text-navy rounded-2xl font-black text-xs shadow-lg shadow-primary/20 hover:scale-105 transition-all">Review Modules</button>
           </div>
        </div>

        {/* Priority Stack */}
        <div className="card-premium p-8 flex flex-col gap-6 border-primary/20 shadow-primary/5">
           <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
             <Zap className="text-primary" size={22} /> Daily Priority
           </h3>
           <div className="space-y-4 flex-1">
             {[
               { id: 1, title: 'Quantum Physics Intro', dur: '45m', sub: 'High Retention Required', color: '#f5c842' },
               { id: 2, title: 'Calculus: Integration', dur: '60m', sub: 'Practice Problem Set 14', color: '#2dd4bf' },
               { id: 3, title: 'Organics: Benzene',    dur: '30m', sub: 'Flashcard Review',      color: '#a78bfa' },
               { id: 4, title: 'English: Essay Ref',   dur: '20m', sub: 'Peer-review feedback',   color: '#fb7185' },
             ].map((p, i) => (
               <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={p.id} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                     <p className="text-sm font-bold text-white/90 group-hover:text-primary transition-colors">{p.title}</p>
                     <span className="text-[10px] font-mono font-bold text-muted">{p.dur}</span>
                  </div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none" style={{ color: p.color }}>{p.sub}</p>
               </motion.div>
             ))}
           </div>
           <button className="w-full py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-black text-[10px] hover:bg-primary hover:text-navy transition-all uppercase tracking-widest shadow-xl shadow-primary/5">
             Generate New Schedule
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
                { icon: Lightbulb, title: 'Consistency High', sub: '92% streak match for 2 weeks. Consistency score 10/10.', color: '#4ade80' },
                { icon: Clock,     title: 'Math Weakness Detected', sub: '3-dimensional geometry is slowing you down. Practice suggested.', color: '#f5c842' },
                { icon: MessageSquare, title: 'Faculty Suggestion', sub: 'Dr. Priya has shared extra Physics notes. Review by Monday.', color: '#a78bfa' },
              ].map(ins => (
                <div key={ins.title} className="flex gap-4 group">
                   <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><ins.icon size={18} style={{ color: ins.color }} /></div>
                   <div className="border-b border-white/5 pb-4 flex-1">
                      <p className="text-sm font-bold text-white">{ins.title}</p>
                      <p className="text-[11px] text-muted font-medium leading-relaxed">{ins.sub}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Milestone AI */}
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
    </div>
  );
};

export default AIPlanner;
