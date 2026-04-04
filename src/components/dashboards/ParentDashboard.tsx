import { 
  TrendingUp, CheckCircle2, Clock, 
  CreditCard, Calendar, MessageSquare,
  Award, BookOpen, Sparkles, Brain, Zap, ArrowRight, ShieldCheck
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
        <Link to="/ai-digest" className="flex items-center gap-2 px-6 py-3 bg-violet-400 text-navy rounded-xl font-black text-xs hover:scale-105 transition-all shadow-lg shadow-violet-400/20">
           Review Digest <ArrowRight size={14} />
        </Link>
      </motion.div>
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black font-serif tracking-tight">Hello, {user?.name.split(' ')[0]} 👨‍👩‍👧</h2>
        <p className="text-muted font-medium">Monitoring progress for <span className="text-primary font-bold">{user?.childName}</span> · Grade 10-A</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: TrendingUp, value: '86.4%', label: 'Current GPA',  change: 'Term 2 Avg', color: '#f5c842' },
          { icon: CheckCircle2, value: '94%',   label: 'Attendance',   change: '28/30 days',  color: '#2dd4bf' },
          { icon: Clock,      value: '3',      label: 'Pending Tasks', change: 'Assignments',  color: '#fb7185' },
          { icon: Award,      value: '2nd',    label: 'Class Rank',    change: 'Top 5%',      color: '#a78bfa' },
        ].map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={s.label} 
            className="card-nexus p-7 shadow-xl shadow-black/20 hover:shadow-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <s.icon size={26} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{s.value}</p>
            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-[10px] mt-2 font-bold" style={{ color: s.color }}>{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Academic Performance */}
        <div className="lg:col-span-2 card-nexus p-8">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold flex items-center gap-2">
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
           <h3 className="text-xl font-bold flex items-center gap-2">
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
                    <p className="text-xs font-bold mb-0.5">{f.name}</p>
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
           <button className="w-full py-3.5 bg-primary text-navy font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm mt-2">
             Pay Outstanding Fees
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Events */}
        <div className="card-nexus p-8">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-8">
             <Calendar className="text-violet-400" size={20} /> Upcoming School Events
           </h3>
           <div className="space-y-4">
              {[
                { title: 'Parent-Teacher Meeting', date: 'April 12', time: '9AM–1PM', loc: 'Auditorium', color: '#f5c842' },
                { title: 'Annual Sports Day',      date: 'April 20', time: 'Full Day', loc: 'Grounds', color: '#2dd4bf' },
                { title: 'Science Fair 2026',      date: 'April 25', time: '10AM–4PM', loc: 'Main Hall', color: '#a78bfa' },
              ].map(e => (
                <div key={e.title} className="flex gap-4 p-5 rounded-2xl bg-white/5 border-l-4" style={{ borderColor: e.color }}>
                   <div className="flex flex-col items-center justify-center bg-white/5 w-14 h-14 rounded-xl border border-white/5">
                      <p className="text-[10px] font-black uppercase text-muted leading-tight">{e.date.split(' ')[0]}</p>
                      <p className="text-lg font-black tracking-tighter leading-tight" style={{ color: e.color }}>{e.date.split(' ')[1]}</p>
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold mb-1">{e.title}</p>
                      <p className="text-[11px] text-muted flex items-center gap-1.5">
                         <span className="font-bold" style={{ color: e.color }}>{e.time}</span> · {e.loc}
                      </p>
                   </div>
                   <button className="self-center p-2 rounded-xl bg-white/5 text-muted hover:text-white transition-all">
                      <Calendar size={18} />
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Messaging */}
        <div className="card-nexus p-8">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold flex items-center gap-2">
               <MessageSquare className="text-primary" size={20} /> Teacher Communications
             </h3>
             <button className="text-xs font-bold text-primary hover:underline">New Message</button>
          </div>
          <div className="space-y-6">
             {[
               { from: 'Dr. Priya Nair', icon: '👩‍🏫', msg: "Arjun has shown great improvement this term in Maths!", time: 'Yesterday', color: '#f5c842' },
               { from: 'Principal Dr. Mehta', icon: '🏫', msg: "PTM invitation for April 12. Please confirm your attendance.", time: '2 days ago', color: '#2dd4bf' },
             ].map(m => (
               <div key={m.from} className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border-2 bg-white/5 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-all" style={{ borderColor: m.color }}>
                    {m.icon}
                  </div>
                  <div className="flex-1 border-b border-white/5 pb-5">
                    <div className="flex justify-between items-center mb-1.5">
                       <p className="text-sm font-bold hover:text-primary transition-colors">{m.from}</p>
                       <p className="text-[10px] text-muted font-bold uppercase">{m.time}</p>
                    </div>
                    <p className="text-[13px] text-muted leading-relaxed line-clamp-1">{m.msg}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
