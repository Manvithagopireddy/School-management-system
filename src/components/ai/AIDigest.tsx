import { 
  Sparkles, CheckCircle2, TrendingUp, 
  Target, MessageSquare, Calendar,
  Brain, Zap, Lightbulb, Clock, 
  ArrowRight, ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const AIDigest = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
            <Sparkles size={14} /> Parent Intelligence Snap
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight">AI Parent Digest</h2>
          <p className="text-muted font-medium">Daily summary of <span className="text-primary font-bold">Arjun's</span> progress and home support strategies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Child Snapshot */}
        <div className="lg:col-span-2 card-premium p-10 flex flex-col gap-8 bg-gradient-to-br from-indigo-900/40 to-transparent border-primary/20 shadow-2xl">
           <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-3xl font-black text-white shadow-2xl border-4 border-navy">
                 AS
              </div>
              <div>
                 <h3 className="text-2xl font-black text-white leading-tight">Arjun Sharma</h3>
                 <p className="text-[11px] text-primary font-black uppercase tracking-[0.2em]">Grade 10-A · Top 5% Performance</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Study Streak', value: '12 Days', color: '#f5c842' },
                { label: 'Latest Score', value: '92/100', color: '#2dd4bf' },
                { label: 'Attendance',   value: '100%',   color: '#a78bfa' },
              ].map(s => (
                <div key={s.label} className="p-5 rounded-3xl bg-white/5 border border-white/5 text-center">
                   <p className="text-2xl font-black text-white tracking-tighter" style={{ color: s.color }}>{s.value}</p>
                   <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
           </div>
           
           <div className="p-6 rounded-3xl bg-white/2 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain size={120} />
              </div>
              <h4 className="text-base font-black text-white mb-3 flex items-center gap-2">
                 <Zap className="text-primary" size={18} /> Today's Intelligence Summary
              </h4>
              <p className="text-sm text-muted leading-relaxed relative z-10 max-w-[500px]">
                 Arjun focused heavily on <span className="text-primary font-bold">Calculus Integration</span> today. His comprehension speed is 15% faster than last week. Suggesting a 20-minute break before his evening review for optimal retention.
              </p>
           </div>
        </div>

        {/* Home Support */}
        <div className="card-premium p-8 flex flex-col gap-6">
           <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
             <Lightbulb className="text-primary" size={22} /> Home Support
           </h3>
           <div className="space-y-4 flex-1">
             {[
               { id: 1, title: 'Concept Drill', sub: 'Calculus: Fundamental Theorem', color: '#f5c842' },
               { id: 2, title: 'Health & Wellness', sub: 'Hydration and Mindful Pause', color: '#2dd4bf' },
               { id: 3, title: 'Parent Check-in', sub: 'Discuss Midterm Goals (5m)', color: '#a78bfa' },
             ].map((r, i) => (
               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={r.title} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                     <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{r.title}</p>
                  </div>
                  <p className="text-[11px] font-bold text-muted uppercase tracking-widest leading-none border-l-2 pl-3" style={{ borderLeftColor: r.color }}>{r.sub}</p>
               </motion.div>
             ))}
           </div>
           <button className="w-full py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-black text-[10px] hover:bg-primary hover:text-navy transition-all uppercase tracking-widest shadow-xl shadow-primary/5">
              Email Weekly Summary
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Radar */}
        <div className="card-premium p-10 flex flex-col gap-8 bg-black/20">
           <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold font-serif">Term 2 Trajectory</h3>
              <TrendingUp className="text-primary" />
           </div>
           
           <div className="space-y-8">
              {[
                { sub: 'Mathematics', val: 91, change: '+5%', color: '#f5c842' },
                { sub: 'Physical Science', val: 88, change: '+2%', color: '#2dd4bf' },
                { sub: 'Computational Logics', val: 94, change: '+8%', color: '#a78bfa' },
                { sub: 'Literary Mastery', val: 82, change: '-1%', color: '#fb7185' },
              ].map(sub => (
                <div key={sub.sub}>
                   <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-black tracking-tight">{sub.sub}</p>
                      <p className="text-xs font-black" style={{ color: sub.color }}>{sub.val}% <span className="text-[9px] opacity-60 ml-1">{sub.change}</span></p>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${sub.val}%` }} className="h-full rounded-full" style={{ background: sub.color }} />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* AI Recommendations */}
        <div className="card-premium p-10 flex flex-col gap-6">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xl border border-primary/20">
                <ShieldCheck size={28} />
              </div>
              <h4 className="text-xl font-black">AI Safe-Environment</h4>
           </div>
           
           <div className="p-6 rounded-3xl bg-white/5 border border-white/5 mb-2 hover:border-primary/30 transition-all cursor-pointer">
              <p className="text-sm font-bold text-white mb-2 italic">"Suggest digital detox for 45 minutes between 7 PM - 8 PM."</p>
              <p className="text-[11px] text-muted leading-relaxed">Based on intense computational logic modules scheduled today, Arjun's cognitive load is high.</p>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted hover:text-white transition-all">PTM Guidance</button>
              <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted hover:text-white transition-all">Goal Setting</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIDigest;
