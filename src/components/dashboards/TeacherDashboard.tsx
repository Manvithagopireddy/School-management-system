import { 
  Users, School, ClipboardList, 
  Target, MessageSquare, Calendar,
  TrendingUp, CheckCircle2, AlertCircle, Clock,
  Sparkles, Brain, Zap, ArrowRight, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'Mon', avg: 72 }, { name: 'Tue', avg: 78 }, { name: 'Wed', avg: 65 },
  { name: 'Thu', avg: 88 }, { name: 'Fri', avg: 82 },
];

const classes = [
  { grade: 'Grade 10-A', sub: 'Mathematics', count: 38, room: '201', avg: 88, color: '#f5c842' },
  { grade: 'Grade 10-B', sub: 'Mathematics', count: 36, room: '203', avg: 82, color: '#2dd4bf' },
  { grade: 'Grade 9-A',  sub: 'Science',    count: 35, room: 'Lab 2', avg: 79, color: '#a78bfa' },
  { grade: 'Grade 9-B',  sub: 'Science',    count: 33, room: 'Lab 2', avg: 85, color: '#4ade80'  },
];

const StudentRow = ({ name, roll, gpa, att, status, color }: any) => (
  <tr className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group cursor-pointer">
    <td className="py-4 px-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center font-bold text-sm shadow-inner group-hover:scale-105 transition-all" style={{ color }}>{name[0]}</div>
        <p className="text-sm font-bold">{name}</p>
      </div>
    </td>
    <td className="text-muted text-[11px] font-bold uppercase tracking-wider">#{roll}</td>
    <td className="text-sm font-black tracking-tight" style={{ color: parseFloat(gpa) > 85 ? '#4ade80' : parseFloat(gpa) > 75 ? '#f5c842' : '#fb7185' }}>{gpa}</td>
    <td className="text-[13px] font-bold">{att}</td>
    <td>
      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${status === 'Active' ? 'bg-teal-400/10 text-teal-400' : 'bg-rose-400/10 text-rose-400'}`}>
        {status}
      </span>
    </td>
  </tr>
);

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-10">
      {/* 🚀 AI Class Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-premium p-6 border-teal-400/20 bg-gradient-to-r from-teal-400/10 to-transparent flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-teal-400/20 flex items-center justify-center text-teal-400 ai-pulse">
              <BarChart3 size={28} />
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <Sparkles size={14} className="text-teal-400" />
                 <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">Nexus Intelligence · Performance Alert</p>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">Bimodal distribution in Grade 10-A</h3>
              <p className="text-xs text-muted">A significant gap detected in Geometry mastery levels. AI suggests group-split instruction.</p>
           </div>
        </div>
        <Link to="/ai-insights" className="flex items-center gap-2 px-6 py-3 bg-teal-400 text-navy rounded-xl font-black text-xs hover:scale-105 transition-all shadow-lg shadow-teal-400/20">
           Review Insights <ArrowRight size={14} />
        </Link>
      </motion.div>
      {/* Welcome */}
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black font-serif tracking-tight">Welcome back, Dr. Priya 👩‍🏫</h2>
        <p className="text-muted font-medium">Mathematics & Science Department · <span className="text-primary font-bold">4 active classes</span> today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users,         value: '142',  label: 'Students', sub: 'Across 4 classes', color: '#f5c842' },
          { icon: School,        value: '4',    label: 'Classes',  sub: '2 Math, 2 Science', color: '#2dd4bf' },
          { icon: ClipboardList, value: '5',    label: 'Pending',  sub: 'Review needed',    color: '#fb7185' },
          { icon: TrendingUp,    value: '88%',  label: 'Attendance', sub: 'Weekly Avg',      color: '#4ade80' },
        ].map((s, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={s.label} className="card-nexus p-7 shadow-xl shadow-black/10 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
              <s.icon size={26} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{s.value}</p>
            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-[10px] mt-2 font-bold" style={{ color: s.color }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Graph */}
        <div className="lg:col-span-2 card-nexus p-8">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
               <TrendingUp className="text-primary" size={20} /> Class Performance Trend
             </h3>
             <div className="flex gap-2">
                <button className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-primary">All Classes</button>
                <button className="px-3 py-1 hover:bg-white/5 rounded-full text-[10px] font-bold text-muted transition-all">Weekly</button>
             </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="teacherGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f5c842" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f5c842" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} dy={10} />
                <Tooltip contentStyle={{ backgroundColor: 'rgb(30,53,96)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="avg" stroke="#f5c842" strokeWidth={4} fill="url(#teacherGrad)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-nexus p-8 flex flex-col gap-6">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-4 font-serif">
             <Target className="text-teal-400" size={22} /> Instant Actions
           </h3>
           <div className="flex flex-col gap-3 flex-1">
             {[
               { icon: ClipboardList, label: 'Post Exam Schedule', color: '#f5c842' },
               { icon: MessageSquare, label: 'PTM Announcement',  color: '#2dd4bf' },
               { icon: Target,        label: 'Upload Grade Book',  color: '#a78bfa' },
               { icon: School,        label: 'Lab Safety Notice',  color: '#fb7185' },
             ].map(a => (
               <button key={a.label} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all text-left group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-all">
                    <a.icon size={18} style={{ color: a.color }} />
                  </div>
                  <span className="text-sm font-bold text-white/90">{a.label}</span>
               </button>
             ))}
           </div>
           <button className="w-full py-4 bg-primary text-navy font-black rounded-2xl shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all text-sm">
             MARK ATTENDANCE NOW
           </button>
        </div>
      </div>

      {/* Class Roster Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-nexus p-8 overflow-hidden">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
                <Users className="text-primary" size={20} /> Class 10-A Roster
              </h3>
              <button className="text-xs font-bold text-primary hover:underline">View All Students</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-white/5">
                   <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Student Name</th>
                   <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Roll</th>
                   <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">GPA</th>
                   <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Attendance</th>
                   <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 <StudentRow name="Arjun Sharma" roll="21" gpa="86.4" att="94%"  status="Active"  color="#2dd4bf" />
                 <StudentRow name="Priya Menon"  roll="22" gpa="91.2" att="98%"  status="Active"  color="#f5c842" />
                 <StudentRow name="Rohan Gupta"  roll="23" gpa="78.5" att="82%"  status="Active"  color="#a78bfa" />
                 <StudentRow name="Ananya Singh" roll="24" gpa="94.1" att="100%" status="Active"  color="#fb7185" />
                 <StudentRow name="Kiran Patel"  roll="25" gpa="88.3" att="91%"  status="Active"  color="#4ade80" />
               </tbody>
             </table>
           </div>
        </div>

        {/* Assignment Queue */}
        <div className="card-nexus p-8 flex flex-col gap-6">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-2 font-serif">
             <ClipboardList className="text-rose-400" size={20} /> Grading Queue
           </h3>
           <div className="space-y-4 flex-1">
             {[
               { title: 'Math Problem Set 12 – 10A', sub: '38 Submissions', due: 'Review', color: '#fb7185' },
               { title: 'Physics Lab Report – 10B',  sub: '32/36 Submitted',  due: 'Grade',  color: '#f5c842' },
               { title: 'Statistics Quiz – 10A',      sub: '38/38 Submitted',  due: 'Final',  color: '#2dd4bf' },
               { title: 'Chem Chapter 8 – 9A',       sub: '28/35 Submitted',  due: 'Review', color: '#a78bfa' },
             ].map(a => (
               <div key={a.title} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all group cursor-pointer hover:border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-muted group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{a.title}</p>
                    <p className="text-[10px] text-muted font-bold mt-1 uppercase tracking-wider">{a.sub}</p>
                  </div>
                  <span className="text-[9px] font-black uppercase px-2 py-1 rounded-lg bg-white/5 text-white/40 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    {a.due}
                  </span>
               </div>
             ))}
           </div>
           <div className="p-4 rounded-3xl bg-primary/5 border border-primary/10 text-center">
             <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Weekly Target</p>
             <p className="text-lg font-black text-white">42 / 50 Graded</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
