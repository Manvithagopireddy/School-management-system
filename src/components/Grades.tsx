import { 
  Target, TrendingUp, BookOpen, 
  Award, Download, History,
  Star, TrendingDown, ClipboardList
} from 'lucide-react';
import { motion } from 'motion/react';

const GradeCard = ({ subject, pct, letter, color }: { subject: string, pct: number, letter: string, color: string }) => (
  <div className="card-nexus p-6 text-center border-b-4" style={{ borderColor: color }}>
    <p className="text-[10px] font-black text-muted uppercase tracking-[0.15em] mb-3">{subject}</p>
    <p className="text-3xl font-black tracking-tighter" style={{ color }}>{pct}</p>
    <p className="text-[10px] text-muted font-bold mt-1 uppercase tracking-widest">{letter}</p>
  </div>
);

const ProgressBarWithLabel = ({ label, pct, color }: { label: string, pct: number, color: string }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-bold text-white/80">{label}</span>
      <span className="text-xs font-black" style={{ color }}>{pct}%</span>
    </div>
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
       <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 10px ${color}44` }}
       />
    </div>
  </div>
);

const Grades = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black font-serif tracking-tight">Academic Transcripts</h2>
          <p className="text-muted font-medium">Term 2 Academic Report · Final Results · 2025–26 Session.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-xs font-bold text-muted hover:text-primary transition-all">
            <Download size={16} /> Export Transcript (PDF)
          </button>
        </div>
      </div>

      {/* GPA Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Target, value: '86.4', label: 'Overall Score', change: 'out of 100',  color: '#f5c842' },
          { icon: TrendingUp, value: 'A-',   label: 'Letter Grade', change: 'Excellent',    color: '#2dd4bf' },
          { icon: Star,   value: '2nd',  label: 'Class Rank',  change: 'Grade 10-A',  color: '#a78bfa' },
          { icon: ClipboardList, value: '6',    label: 'Subjects',    change: 'All Passing',  color: '#4ade80' },
        ].map((s, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={s.label} className="card-nexus p-7 shadow-xl shadow-black/10 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5 border border-white/10 shadow-lg">
              <s.icon size={28} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{s.value}</p>
            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-[10px] mt-2 font-bold" style={{ color: s.color }}>{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subject-Wise Performance */}
        <div className="lg:col-span-2 space-y-8">
           <div className="card-nexus p-8">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-8 font-serif">
                <BookOpen className="text-primary" size={20} /> Subject Proficiency Index
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <GradeCard subject="Mathematics" pct={91} letter="A"  color="#f5c842" />
                <GradeCard subject="Physics"     pct={88} letter="A-" color="#2dd4bf" />
                <GradeCard subject="Chemistry"   pct={82} letter="B+" color="#a78bfa" />
                <GradeCard subject="English"     pct={94} letter="A"  color="#fb7185" />
                <GradeCard subject="Computer Sci"pct={96} letter="A+" color="#2dd4bf" />
                <GradeCard subject="Biology"     pct={78} letter="B+" color="#f59e0b" />
              </div>
           </div>

           <div className="card-nexus p-8">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                 <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
                   <Target className="text-primary" size={20} /> Detailed Report Card
                 </h3>
                 <span className="text-[10px] font-bold text-muted uppercase tracking-[0.1em]">Session 2025-26</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Subject</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Marks</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Grade</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Aptitude & Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { sub: 'Mathematics', t: 'Dr. Priya Nair', m: '91/100', g: 'A',  rem: 'Excellent – consistent performer', color: '#f5c842' },
                      { sub: 'Physics',     t: 'James Wilson',    m: '88/100', g: 'A-', rem: 'Good concept understanding',    color: '#2dd4bf' },
                      { sub: 'Chemistry',   t: 'Emily Brown',     m: '82/100', g: 'B+', rem: 'Needs work in numericals',       color: '#a78bfa' },
                      { sub: 'English',     t: 'Emma Watson',     m: '94/100', g: 'A',  rem: 'Outstanding writing skills',      color: '#fb7185' },
                      { sub: 'Computer Sci',t: 'Arun Menon',      m: '96/100', g: 'A+', rem: 'Exceptional in programming',      color: '#2dd4bf' },
                    ].map(r => (
                      <tr key={r.sub} className="hover:bg-white/5 transition-colors cursor-default">
                        <td className="py-5">
                           <p className="text-sm font-bold text-white mb-0.5">{r.sub}</p>
                           <p className="text-[10px] text-muted font-bold uppercase tracking-wider">{r.t}</p>
                        </td>
                        <td className="py-5 text-center font-black tracking-tighter text-sm text-white">{r.m}</td>
                        <td className="py-5 text-center">
                           <span className="text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg border-2" style={{ borderColor: `${r.color}33`, color: r.color, backgroundColor: `${r.color}08` }}>{r.g}</span>
                        </td>
                        <td className="py-5">
                           <p className="text-xs text-muted leading-relaxed max-w-[240px] italic">"{r.rem}"</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Progress Sidebar */}
        <div className="card-nexus p-8 flex flex-col gap-8 shadow-2xl">
           <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold font-serif leading-none">Learning Trends</h3>
              <History size={18} className="text-muted" />
           </div>
           
           <div className="flex-1 space-y-2">
             <ProgressBarWithLabel label="Mathematical Analysis" pct={91} color="#f5c842" />
             <ProgressBarWithLabel label="Scientific Reasoning" pct={85} color="#2dd4bf" />
             <ProgressBarWithLabel label="Linguistic Ability"    pct={94} color="#fb7185" />
             <ProgressBarWithLabel label="Computational Logic"   pct={96} color="#a78bfa" />
             <ProgressBarWithLabel label="Biological Concepts"   pct={78} color="#4ade80" />
           </div>

           <div className="mt-4 p-6 rounded-3xl bg-primary/5 border border-primary/20 text-center relative overflow-hidden group">
              <div className="absolute top-[-20%] left-[-10%] w-20 h-20 rounded-full bg-primary/10 blur-xl group-hover:scale-150 transition-all duration-500"></div>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Annual Goal</p>
                 <p className="text-lg font-black text-white">Top 3% Regionally</p>
                 <div className="mt-4 px-4 py-2 bg-primary text-navy rounded-xl text-[11px] font-black uppercase tracking-widest cursor-pointer hover:shadow-lg transition-all">View Analytics</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
