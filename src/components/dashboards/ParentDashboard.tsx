import { 
  TrendingUp, CheckCircle2, Clock, 
  CreditCard, Calendar, MessageSquare,
  Award, BookOpen, Sparkles, Brain, Zap, ArrowRight, ShieldCheck,
  Activity, Coffee, Sun
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

const ProgressBar = ({ label, pct, color }: { label: string, pct: number, color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs font-bold mb-1.5 opacity-80 uppercase tracking-wider">
      <span>{label}</span>
      <span style={{ color }}>{pct}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
      />
    </div>
  </div>
);

const ParentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-10">
      {/* 🚀 AI Parent Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-premium p-6 border-violet-400/20 bg-gradient-to-r from-violet-400/10 to-transparent flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-violet-400/20 flex items-center justify-center text-violet-400 ai-pulse">
              <ShieldCheck size={28} />
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <Sparkles size={14} className="text-violet-400" />
                 <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em]">Nexus Intelligence · Daily Snapshot</p>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">Arjun's cognitive load is high today</h3>
              <p className="text-xs text-muted">Intense Math sessions detected. AI suggests 45m digital detox at 7 PM.</p>
           </div>
        </div>
        <Link to="/wellbeing-tracker" className="flex items-center gap-2 px-6 py-3 bg-violet-400 text-navy rounded-xl font-black text-xs hover:scale-105 transition-all shadow-lg shadow-violet-400/20">
           Review Well-being <ArrowRight size={14} />
        </Link>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black font-serif tracking-tight text-white">Hello, {user?.name.split(' ')[0]} 👨‍👩‍👧</h2>
        <p className="text-muted font-medium">Monitoring progress for <span className="text-primary font-bold">{user?.childName || 'Arjun'}</span> · Grade 10-A</p>
      </div>

      {/* Holistic Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Well-being Summary */}
         <div className="card-premium p-8 bg-gradient-to-br from-violet-900/20 to-transparent border-violet-500/20">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8 text-white">
               <Activity className="text-violet-400" size={24} /> Holistic Growth Intelligence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
               <div className="p-5 rounded-2xl bg-white/3 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                     <p className="text-[10px] font-black text-muted uppercase tracking-widest leading-none">Cognitive Load</p>
                     <Zap size={14} className="text-primary" />
                  </div>
                  <p className="text-2xl font-black text-white">High (88%)</p>
                  <p className="text-[9px] text-primary font-bold mt-1">Requires Break</p>
               </div>
               <div className="p-5 rounded-2xl bg-white/3 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                     <p className="text-[10px] font-black text-muted uppercase tracking-widest leading-none">Digital Fatigue</p>
                     <Coffee size={14} className="text-teal-400" />
                  </div>
                  <p className="text-2xl font-black text-white">Moderate</p>
                  <p className="text-[9px] text-teal-400 font-bold mt-1">45m session limit</p>
               </div>
            </div>
            <button className="w-full py-4 border border-violet-400/20 bg-violet-400/5 text-violet-400 font-black text-[10px] rounded-xl hover:bg-violet-400 hover:text-navy transition-all uppercase tracking-widest">
               Open Well-being Dashboard 🚀
            </button>
         </div>

         {/* Academic Consistency Milestone */}
         <div className="card-nexus p-8 flex flex-col justify-between group hover:border-primary/20 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 rounded-2xl bg-white/3 flex items-center justify-center text-primary border border-white/5 group-hover:scale-110 transition-transform">
                  <Award size={26} />
               </div>
               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 italic">Validated</span>
            </div>
            <div>
               <h3 className="text-xl font-bold mb-1 text-white">Scholar Platinum Milestone</h3>
               <p className="text-xs text-muted">Arjun is in the **Top 5%** for academic consistency this term. Blockchain certificate issued.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-4">
               View Blockchain Proof <ArrowRight size={14} />
            </div>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: TrendingUp, value: '86.4%', label: 'Current GPA',  change: 'Term 2 Avg', color: '#f5c842' },
          { icon: CheckCircle2, value: '94%',   label: 'Attendance',   change: '28/30 days',  color: '#2dd4bf' },
          { icon: Clock,      value: '3',      label: 'Pending Tasks', change: 'Assignments',  color: '#fb7185' },
          { icon: Sun,        value: 'Optimal', label: 'Mental State', change: 'Consistent',  color: '#a78bfa' },
        ].map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={s.label} 
            className="card-nexus p-7 shadow-xl shadow-black/20 hover:shadow-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform text-white">
              <s.icon size={26} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1 text-white">{s.value}</p>
            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-[10px] mt-2 font-bold" style={{ color: s.color }}>{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Academic Performance */}
        <div className="lg:col-span-2 card-nexus p-8">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold flex items-center gap-2 text-white">
               <BookOpen className="text-primary" size={20} /> Subject Performance
             </h3>
             <span className="text-xs font-bold text-muted bg-white/5 px-3 py-1.5 rounded-full">Report Card ▾</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <ProgressBar label="Mathematics" pct={91} color="#f5c842" />
            <ProgressBar label="Physics" pct={88} color="#2dd4bf" />
            <ProgressBar label="Chemistry" pct={82} color="#a78bfa" />
            <ProgressBar label="English" pct={94} color="#fb7185" />
            <ProgressBar label="Computer Science" pct={96} color="#2dd4bf" />
            <ProgressBar label="Biology" pct={78} color="#f5c842" />
          </div>
        </div>

        {/* Fees Section */}
        <div className="card-nexus p-8 flex flex-col gap-6">
           <h3 className="text-xl font-bold flex items-center gap-2 text-white">
             <CreditCard className="text-rose-400" size={20} /> Fee Summary
           </h3>
           <div className="space-y-4">
             {[
               { name: 'Tuition Fee – April', amt: '₹8,500', due: 'Apr 10', status: 'Paid',   color: '#2dd4bf' },
               { name: 'Transport Fee – Apr', amt: '₹1,200', due: 'Apr 10', status: 'Pending', color: '#f5c842' },
               { name: 'Exam Fee – Term 2',   amt: '₹500',   due: 'Apr 15', status: 'Pending', color: '#fb7185' },
             ].map(f => (
               <div key={f.name} className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div>
                    <p className="text-xs font-bold mb-0.5 text-white">{f.name}</p>
                    <p className="text-[10px] text-muted font-medium">Due {f.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black tracking-tight" style={{ color: f.color }}>{f.amt}</p>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${f.status === 'Paid' ? 'bg-teal-400/10 text-teal-400' : 'bg-rose-400/10 text-rose-400'}`}>
                      {f.status}
                    </span>
                  </div>
               </div>
             ))}
           </div>
           <button className="w-full py-4 bg-primary text-navy font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm mt-2">
             Pay Outstanding Fees
           </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
