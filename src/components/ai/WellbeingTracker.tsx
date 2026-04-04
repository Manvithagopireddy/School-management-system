import { motion } from 'motion/react';
import { 
  ShieldCheck, Activity, Coffee, 
  Moon, Zap, Sparkles, Brain, 
  TrendingUp, AlertTriangle, ArrowRight,
  User, Sun, Wind
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const fatigueData = [
  { day: 'Mon', load: 65, fatigue: 30 },
  { day: 'Tue', load: 88, fatigue: 60 },
  { day: 'Wed', load: 42, fatigue: 20 },
  { day: 'Thu', load: 95, fatigue: 75 },
  { day: 'Fri', load: 70, fatigue: 45 },
];

const activityMix = [
  { name: 'Core Study', val: 45, color: '#f5c842' },
  { name: 'Creative',   val: 25, color: '#2dd4bf' },
  { name: 'Self Learns', val: 20, color: '#a78bfa' },
  { name: 'Leisure',    val: 10, color: '#fb7185' },
];

const WellbeingTracker = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-2 text-violet-400 font-black uppercase tracking-[0.2em] text-[10px]">
            <ShieldCheck size={14} /> Nexus Holistic Intelligence
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight text-white italic">Well-being & Balance</h2>
          <p className="text-muted font-medium">Monitoring <span className="text-violet-400 font-bold">Cognitive Load</span> and <span className="text-violet-400 font-bold">Digital Presence</span> for Arjun.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5 backdrop-blur-md">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-400/20 flex items-center justify-center text-violet-400 shadow-xl shadow-violet-400/10">
                 <Sun size={20} />
              </div>
              <div><p className="text-sm font-black text-white">Balanced</p><p className="text-[10px] text-muted font-bold uppercase tracking-widest leading-none">Daily State</p></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Fatigue Graph */}
        <div className="lg:col-span-2 card-premium p-10 overflow-hidden group">
           <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-violet-400/5 rounded-full blur-3xl transition-all group-hover:bg-violet-400/10" />
           
           <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5 relative z-10">
              <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
                <Brain className="text-violet-400" size={24} /> Cognitive Load & Fatigue
              </h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted">Load</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-60" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted">Fatigue</span>
                 </div>
              </div>
           </div>

           <div className="h-[300px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={fatigueData}>
                    <defs>
                       <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#a78bfa" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="fatGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#fb7185" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} dy={10} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgb(24,24,35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                    <Area type="monotone" dataKey="load" stroke="#a78bfa" strokeWidth={4} fill="url(#loadGrad)" />
                    <Area type="monotone" dataKey="fatigue" stroke="#fb7185" strokeWidth={2} fill="url(#fatGrad)" strokeDasharray="5 5" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           
           <div className="mt-8 p-6 rounded-3xl bg-violet-500/5 border border-violet-500/10 flex gap-8 items-center relative z-10">
              <div className="flex-1">
                 <p className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                   <AlertTriangle className="text-violet-400" size={16} /> 
                   Nexus Insight: Peak exhaustion detected on Thursday
                 </p>
                 <p className="text-[11px] text-muted leading-relaxed italic opacity-80 decoration-violet-400/40 underline-offset-4 underline">Arjun consistently pushes late nights on Thursdays before Math quizzes. AI suggests Thursday evening detox.</p>
              </div>
           </div>
        </div>

        {/* Activity Mix Sidebar */}
        <div className="flex flex-col gap-8">
           <div className="card-nexus p-8 flex flex-col gap-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                 <Activity className="text-primary" size={20} /> Cognitive Mix
              </h3>
              <div className="space-y-6 flex-1">
                 {activityMix.map(a => (
                    <div key={a.name}>
                       <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted mb-2">
                          <span>{a.name}</span>
                          <span style={{ color: a.color }}>{a.val}%</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${a.val}%` }} className="h-full" style={{ background: a.color }} />
                       </div>
                    </div>
                 ))}
              </div>
              <p className="text-[10px] text-muted font-bold tracking-widest text-center mt-2 uppercase italic leading-relaxed opacity-60">"Arjun's self-learning hours have increased by **12%** this week."</p>
           </div>

           <div className="card-premium p-10 bg-gradient-to-br from-teal-400/5 via-navy to-background border-teal-400/20">
              <div className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-teal-400/10 flex items-center justify-center text-teal-400 mb-6 shadow-xl shadow-teal-400/5 border border-teal-400/20">
                    <Coffee size={28} />
                 </div>
                 <h4 className="text-xl font-bold mb-1">Break Optimization</h4>
                 <p className="text-[11px] text-teal-400 font-bold uppercase tracking-widest mb-6">Nexus Recommendation</p>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5 w-full">
                    <p className="text-xs text-muted leading-relaxed font-medium">
                       "Schedule a **15-minute off-screen activity** today between 5:30 PM & 6:00 PM to maximize retention."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Sleep & Focus Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 pb-10">
         {[
           { icon: Moon, label: 'Sleep Consistency', val: '7.5h', change: '85% match', color: '#a78bfa' },
           { icon: Zap,  label: 'Focus Peak',       val: '10 AM', change: 'Consistent', color: '#f5c842' },
           { icon: Wind, label: 'Digital Detox',    val: '45m',   change: 'Completed', color: '#2dd4bf' },
           { icon: Sparkles, label: 'Engagement',   val: 'High',  change: '+5% Up', color: '#fb7185' },
         ].map(s => (
           <div key={s.label} className="p-8 rounded-[2rem] card-nexus border-white/5 hover:border-white/10 group transition-all">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <s.icon size={22} style={{ color: s.color }} />
              </div>
              <p className="text-2xl font-black mb-1 text-white">{s.val}</p>
              <p className="text-[11px] font-black uppercase text-muted tracking-widest leading-none mb-4">{s.label}</p>
              <p className="text-[10px] font-bold" style={{ color: s.color }}>{s.change}</p>
           </div>
         ))}
      </div>
    </div>
  );
};

export default WellbeingTracker;
