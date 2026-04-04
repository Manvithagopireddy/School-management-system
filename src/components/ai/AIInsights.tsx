import { 
  Sparkles, TrendingUp, AlertCircle, 
  Users, Target, BarChart3,
  Brain, Zap, MessageSquare, 
  CheckCircle2, TrendingDown, School
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';

const gradeDistribution = [
  { grade: 'A', count: 12, color: '#4ade80' },
  { grade: 'B', count: 18, color: '#f5c842' },
  { grade: 'C', count: 24, color: '#a78bfa' },
  { grade: 'D', count: 6,  color: '#fb7185' },
  { grade: 'E', count: 2,  color: '#f43f5e' },
];

const AIInsights = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
          <Sparkles size={14} /> Faculty Intelligence Terminal
        </div>
        <h2 className="text-4xl font-black font-serif tracking-tight">AI Class Analysis</h2>
        <p className="text-muted font-medium">Bimodal detection and <span className="text-primary font-bold">intervention suggestions</span> based on latest term results.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Grade Distribution */}
        <div className="lg:col-span-2 card-premium p-8 overflow-hidden group">
           <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />
           <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5 relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BarChart3 className="text-primary" size={20} /> Grade Distribution Analysis
              </h3>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-white/5 border border-white/10 text-muted rounded-full text-[9px] font-black uppercase tracking-widest hover:text-white transition-all cursor-pointer">Grade 10-A ▾</span>
              </div>
           </div>
           
           <div className="h-[280px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} dy={10} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgb(30,53,96)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="count" radius={[12, 12, 4, 4]}>
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} fillOpacity={0.6} stroke={entry.color} strokeWidth={2} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           
           <div className="mt-8 p-6 rounded-3xl bg-white/2 border border-white/5 flex gap-8 items-center relative z-10">
              <div className="flex-1">
                 <p className="text-sm font-bold text-white mb-1">AI Detection: Bimodal Trend</p>
                 <p className="text-[11px] text-muted leading-relaxed">The class is split between <span className="text-emerald-400 font-bold">Top Performers</span> and a <span className="text-rose-400 font-bold">Concept Gap</span> in Geometry. Recommend differentiated instruction modules.</p>
              </div>
              <button className="px-6 py-3 bg-primary text-navy rounded-2xl font-black text-xs shadow-lg shadow-primary/20 hover:scale-105 transition-all">Split Groups</button>
           </div>
        </div>

        {/* At-Risk Students */}
        <div className="card-premium p-8 flex flex-col gap-6 border-rose-500/20 shadow-rose-500/5">
           <h3 className="text-xl font-bold flex items-center gap-2 font-serif text-rose-400">
             <AlertCircle size={22} /> Risk Alerts
           </h3>
           <div className="space-y-4 flex-1">
             {[
               { id: 1, name: 'Sohan Gupta', risk: 'High', reason: 'Declining Attendance (72%)', color: '#fb7185' },
               { id: 2, name: 'Vikram Seth', risk: 'Medium', reason: 'Grade Drop in Physics (-12%)', color: '#f5c842' },
               { id: 3, name: 'Ananya Singh', risk: 'Low', reason: 'Late Submission Streak', color: '#a78bfa' },
             ].map((r, i) => (
               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={r.name} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-center mb-1.5">
                     <p className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">{r.name}</p>
                     <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border text-rose-400 border-rose-400/20">{r.risk} Risk</span>
                  </div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{r.reason}</p>
               </motion.div>
             ))}
           </div>
           <button className="w-full py-4 bg-rose-400/10 text-rose-400 border border-rose-400/20 rounded-2xl font-black text-[10px] hover:bg-rose-400 hover:text-white transition-all uppercase tracking-widest">
             Notify Parents
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Intervention AI */}
        <div className="card-premium p-10 flex flex-col gap-8 bg-gradient-to-br from-indigo-900/40 to-transparent border-primary/20">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-xl border border-primary/20">
                <Brain size={32} />
              </div>
              <div>
                 <h4 className="text-2xl font-black mb-1">Nexus Lesson Insights</h4>
                 <p className="text-[10px] text-muted font-bold uppercase tracking-widest italic opacity-60">AI Lesson Planning Support</p>
              </div>
           </div>
           
           <div className="space-y-6">
              {[
                { icon: Zap, title: 'Concept Cluster Detected', sub: 'Calculus mastery seems low. Schedule a remedial session on Tuesday.', color: '#f5c842' },
                { icon: School, title: 'Exam Readiness', sub: '10-A is 92% ready for the upcoming Math boards. Target Geometry gaps next.', color: '#2dd4bf' },
                { icon: MessageSquare, title: 'Community Pulse', sub: 'Positive uptick in parent interaction for Unit 3. Share the next reading list.', color: '#a78bfa' },
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

        {/* Action Strategy */}
        <div className="card-premium p-10 flex flex-col gap-8">
           <h3 className="text-2xl font-black font-serif mb-2">Strategy Recommendations</h3>
           <div className="space-y-4">
              {[
                { title: 'Peer-to-Peer Learning', val: '86% Match', desc: 'Pair High Performer Group A with Concept Group B for Geometry peer tutoring.', color: '#2dd4bf' },
                { title: 'Interactive Assessment', val: '92% Match', desc: 'Replace the next written test with a group project on practical calculus.', color: '#f5c842' },
                { title: 'Parent Engagement', val: '74% Match', desc: 'A targeted notice for students Vikram & Sohan is suggested to sync support.', color: '#fb7185' },
              ].map(st => (
                <div key={st.title} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-center mb-2">
                     <p className="text-sm font-black tracking-tight">{st.title}</p>
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest">{st.val}</span>
                  </div>
                  <p className="text-[11px] text-muted font-medium leading-relaxed group-hover:text-white/80 transition-colors">{st.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
