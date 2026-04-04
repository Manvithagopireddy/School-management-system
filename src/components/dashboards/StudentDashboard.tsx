import { 
  TrendingUp, Calendar, BookOpen, 
  Target, GraduationCap, Flame,
  CheckCircle2, Clock, Award, Star,
  Sparkles, Brain, Zap, ArrowRight, ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const subjectScores = [
  { subject: 'Math',    score: 91 },
  { subject: 'Physics', score: 88 },
  { subject: 'Chem',   score: 82 },
  { subject: 'Eng',    score: 94 },
  { subject: 'History', score: 85 },
  { subject: 'CS',     score: 96 },
];

const assignments = [
  { title: 'Calculus Problem Set 12', subject: 'Mathematics', due: 'Today, 11:59 PM', done: false, urgent: true  },
  { title: 'Physics Lab Report #04',  subject: 'Physics',     due: 'Tomorrow',        done: false, urgent: false },
  { title: 'History Essay Draft',     subject: 'History',     due: 'Apr 6',           done: false, urgent: false },
  { title: 'CS Project - Sorting',    subject: 'CS',          due: 'Submitted Apr 2',  done: true,  urgent: false },
];

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-10">
      {/* 🚀 AI Priority Highlight */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-5 border-white/5 bg-gradient-to-r from-primary/5 via-transparent to-transparent flex items-center justify-between group cursor-pointer transition-all hover:bg-primary/10"
      >
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary ai-pulse">
              <Brain size={28} />
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <Sparkles size={14} className="text-primary" />
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Nexus Intelligence · Priority Alert</p>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Study Calculus Integration today</h3>
              <p className="text-xs text-muted">Mastery gap detected in your last quiz. AI suggests 45m focused review.</p>
           </div>
        </div>
        <Link to="/ai-planner" className="flex items-center gap-2 px-6 py-3 bg-primary text-navy rounded-xl font-black text-xs hover:scale-105 transition-all shadow-lg shadow-primary/20">
           Review Plan <ArrowRight size={14} />
        </Link>
      </motion.div>

      {/* Welcome & Streak Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden p-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-800 text-white shadow-2xl shadow-indigo-500/20"
      >
        <div className="absolute top-[-20%] right-[-5%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50%] left-[-10%] w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                 <Flame className="text-amber-400" size={14} />
                 <span className="text-[10px] font-black tracking-widest uppercase">12-Day Study Streak 🔥</span>
               </div>
               <h2 className="text-6xl font-black font-serif tracking-tight mb-3 leading-none italic">Good morning, {user?.name.split(' ')[0]}!</h2>
               <p className="text-white/60 font-medium tracking-wide text-base">Class 10-A · Roll #21 · You have <span className="text-amber-400 font-bold">1 assignment</span> due tonight.</p>
            </div>
            
            <div className="flex items-center gap-12 bg-black/30 p-10 rounded-[2.5rem] backdrop-blur-xl border border-white/5 shadow-2xl">
               <div className="text-center">
                  <p className="text-5xl font-black tracking-tighter mb-1">8.64</p>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Current GPA</p>
               </div>
               <div className="h-14 w-[1px] bg-white/10"></div>
               <div className="text-center">
                  <p className="text-5xl font-black tracking-tighter mb-1">94%</p>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Attendance</p>
               </div>
            </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Performance */}
        <div className="card-nexus p-10">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-10">
            <Target className="text-primary" size={20} /> Subject Proficiency
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectScores}>
                <PolarGrid stroke="var(--border)" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '14px', fontSize: '12px' }} />
                <Radar name="Proficiency" dataKey="score" stroke="#f5c842" fill="#f5c842" fillOpacity={0.1} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
             {['Math', 'Physics', 'Chemistry'].map(s => (
               <div key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-muted/60 uppercase tracking-widest">{s}</div>
             ))}
          </div>
        </div>

        {/* Assignments Tracker */}
        <div className="card-nexus p-10 flex flex-col gap-8">
           <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <ClipboardList className="text-teal-400" size={24} /> My Assignments
              </h3>
              <span className="text-[9px] font-black text-rose-400 bg-rose-400/10 px-3 py-1.5 rounded-xl uppercase tracking-widest border border-rose-400/20">3 Pending</span>
           </div>
           <div className="space-y-4 flex-1">
             {assignments.map((a) => (
               <div key={a.title} className={`flex items-center gap-5 p-5 rounded-[1.5rem] transition-all cursor-pointer border ${a.done ? 'bg-white/3 opacity-30 border-white/2' : 'bg-white/3 border-white/5 hover:border-teal-400/30'}`}>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${a.done ? 'bg-teal-400/10 text-teal-400' : a.urgent ? 'bg-rose-400/10 text-rose-400 animate-pulse' : 'bg-primary/10 text-primary'}`}>
                    {a.done ? <CheckCircle2 size={22} /> : <BookOpen size={22} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${a.done ? 'line-through' : ''}`}>{a.title}</p>
                    <p className="text-[10px] text-muted/50 font-black uppercase tracking-widest mt-1">{a.subject} · {a.due}</p>
                  </div>
                  {!a.done && a.urgent && <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_15px_#fb7185]"></div>}
               </div>
             ))}
           </div>
           <button className="w-full py-4 bg-white/3 border border-white/5 text-white/50 font-black rounded-2xl hover:bg-white/5 hover:text-white transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
             <BookOpen size={16} /> View Lab Reports
           </button>
        </div>

        {/* Today's Schedule */}
        <div className="card-nexus p-10 flex flex-col gap-6">
           <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
             <Calendar className="text-violet-400" size={24} /> Today's Schedule
           </h3>
           <div className="space-y-4 flex-1">
             {[
               { time: '08:00', sub: 'Mathematics', room: '201', color: '#f5c842' },
               { time: '09:00', sub: 'Physics',     room: 'Lab 3', color: '#2dd4bf' },
               { time: '10:00', sub: 'English',     room: '104',   color: '#a78bfa' },
               { time: '11:00', sub: 'Chemistry',   room: 'Lab 1', color: '#fb7185' },
             ].map(s => (
               <div key={s.time} className="flex gap-6 p-5 rounded-[1.5rem] bg-white/3 border border-white/5 hover:border-white/10 transition-all group cursor-pointer">
                  <span className="text-[11px] font-mono font-black text-muted/40 w-12 pt-1 group-hover:text-primary transition-colors">{s.time}</span>
                  <div className="flex-1">
                    <p className="text-base font-bold leading-none mb-2">{s.sub}</p>
                    <p className="text-[10px] text-muted/50 font-black uppercase tracking-widest">Room {s.room}</p>
                  </div>
               </div>
             ))}
           </div>
           <button className="w-full py-4 bg-violet-500/10 text-violet-400 border border-violet-500/20 font-black rounded-2xl hover:bg-violet-500 hover:text-white transition-all text-[10px] uppercase tracking-widest mt-4">
             Check Weekly Timetable
           </button>
        </div>
      </div>

      {/* Achievement Row */}
      <div className="pb-10">
        <h3 className="text-2xl font-black mb-8 font-serif italic">Academic Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
           {[
             { icon: Award, label: 'Top Scorer', sub: 'Math Olympiad 2026', color: '#f5c842', earned: true },
             { icon: Star,  label: 'Reading Champ', sub: '50 Books Milestone', color: '#2dd4bf', earned: true },
             { icon: GraduationCap, label: 'Perfect Attendance', sub: 'Term 1 Honors', color: '#a78bfa', earned: true },
             { icon: Star, label: 'Science Lead', sub: 'Upcoming Science Fair', color: '#fb7185', earned: false },
           ].map(a => (
             <div key={a.label} className={`p-8 rounded-[2rem] border transition-all cursor-pointer flex flex-col items-center text-center ${a.earned ? 'bg-white/3 border-white/5 shadow-2xl hover:bg-white/5' : 'bg-transparent border-white/5 opacity-20'}`}>
                <div className={`w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center mb-6 shadow-inner`}>
                  <a.icon size={32} style={{ color: a.earned ? a.color : 'var(--muted)' }} />
                </div>
                <p className="text-base font-bold mb-1.5">{a.label}</p>
                <p className="text-[10px] text-muted/60 font-black uppercase tracking-widest">{a.sub}</p>
                {a.earned && <div className="mt-6 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[9px] font-black uppercase tracking-widest">Champion</div>}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
