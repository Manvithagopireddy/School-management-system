import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Sparkles, Search, Filter,
  CheckCircle2, XCircle, Clock, ChevronDown,
  BarChart3, Zap, RefreshCw, Bell
} from 'lucide-react';

type Status = 'present' | 'absent' | 'late';

interface Student {
  id: number;
  name: string;
  roll: string;
  avatar: string;
  status: Status;
  arrivalTime?: string;
  gpa: number;
  color: string;
}

const statusConfig: Record<Status, { emoji: string; label: string; dot: string; ring: string; badge: string }> = {
  present: { emoji: '🟢', label: 'Present', dot: 'bg-emerald-400', ring: 'ring-emerald-400/30', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
  absent:  { emoji: '🔴', label: 'Absent',  dot: 'bg-rose-400',   ring: 'ring-rose-400/30',   badge: 'bg-rose-400/10  text-rose-400  border-rose-400/20'  },
  late:    { emoji: '🟡', label: 'Late',    dot: 'bg-amber-400',  ring: 'ring-amber-400/30',  badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20'  },
};

const initialStudents: Student[] = [
  { id: 1,  name: 'Arjun Sharma',   roll: '01', avatar: 'A', status: 'present', arrivalTime: '8:02 AM', gpa: 86, color: '#2dd4bf' },
  { id: 2,  name: 'Priya Menon',    roll: '02', avatar: 'P', status: 'present', arrivalTime: '7:58 AM', gpa: 91, color: '#f5c842' },
  { id: 3,  name: 'Rohan Gupta',    roll: '03', avatar: 'R', status: 'late',    arrivalTime: '8:14 AM', gpa: 78, color: '#a78bfa' },
  { id: 4,  name: 'Ananya Singh',   roll: '04', avatar: 'A', status: 'present', arrivalTime: '7:55 AM', gpa: 94, color: '#fb7185' },
  { id: 5,  name: 'Kiran Patel',    roll: '05', avatar: 'K', status: 'absent',  gpa: 88,               color: '#4ade80' },
  { id: 6,  name: 'Devika Nair',    roll: '06', avatar: 'D', status: 'present', arrivalTime: '8:01 AM', gpa: 82, color: '#60a5fa' },
  { id: 7,  name: 'Sahil Verma',    roll: '07', avatar: 'S', status: 'present', arrivalTime: '8:00 AM', gpa: 75, color: '#f97316' },
  { id: 8,  name: 'Meera Joshi',    roll: '08', avatar: 'M', status: 'late',    arrivalTime: '8:19 AM', gpa: 89, color: '#e879f9' },
  { id: 9,  name: 'Aditya Kumar',   roll: '09', avatar: 'A', status: 'present', arrivalTime: '7:59 AM', gpa: 83, color: '#34d399' },
  { id: 10, name: 'Sneha Reddy',    roll: '10', avatar: 'S', status: 'absent',  gpa: 71,               color: '#fbbf24' },
  { id: 11, name: 'Vivek Bhat',     roll: '11', avatar: 'V', status: 'present', arrivalTime: '8:03 AM', gpa: 90, color: '#818cf8' },
  { id: 12, name: 'Riya Kapoor',    roll: '12', avatar: 'R', status: 'present', arrivalTime: '8:05 AM', gpa: 87, color: '#2dd4bf' },
];

const StudentCard = ({
  student, onStatusChange, isLive
}: { student: Student; onStatusChange: (id: number, s: Status) => void; isLive: boolean }) => {
  const [open, setOpen] = useState(false);
  const cfg = statusConfig[student.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative rounded-[1.75rem] p-6 flex flex-col items-center gap-3 cursor-pointer group select-none"
      style={{
        background: 'linear-gradient(145deg, rgba(24,36,72,0.85), rgba(15,26,58,0.95))',
        border: `1px solid rgba(255,255,255,0.07)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)`,
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Live pulse on present */}
      {isLive && student.status === 'present' && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
        </span>
      )}

      {/* Avatar */}
      <div
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white ring-2 ${cfg.ring} transition-all group-hover:ring-4`}
        style={{ background: `linear-gradient(135deg, ${student.color}30, ${student.color}15)`, border: `1.5px solid ${student.color}40` }}
      >
        {student.avatar}
        <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${cfg.dot} border-2 border-[#0f1a3a] shadow-lg`} />
      </div>

      {/* Name & Roll */}
      <div className="text-center">
        <p className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors">{student.name}</p>
        <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-0.5">#{student.roll}</p>
      </div>

      {/* Status Badge + Dropdown */}
      <div className="relative w-full">
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
          className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all hover:opacity-80 ${cfg.badge}`}
        >
          {cfg.emoji} {cfg.label} <ChevronDown size={10} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className="absolute bottom-full mb-2 left-0 right-0 z-50 rounded-2xl overflow-hidden border border-white/10"
              style={{ background: 'rgba(15,25,55,0.98)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
            >
              {(Object.entries(statusConfig) as [Status, typeof statusConfig[Status]][]).map(([key, c]) => (
                <button
                  key={key}
                  className="w-full flex items-center gap-2 px-4 py-3 text-[11px] font-bold hover:bg-white/5 transition-colors text-white"
                  onClick={(e) => { e.stopPropagation(); onStatusChange(student.id, key); setOpen(false); }}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {student.arrivalTime && (
        <p className="text-[9px] text-muted/50 font-bold tracking-widest uppercase">{student.arrivalTime}</p>
      )}
    </motion.div>
  );
};

const ClassroomGrid = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [search, setSearch] = useState('');
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate live updates every 20s
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 20000);
    return () => clearInterval(interval);
  }, [isLive]);

  const handleStatusChange = (id: number, status: Status) => {
    setStudents(prev => prev.map(s =>
      s.id === id ? {
        ...s,
        status,
        arrivalTime: status === 'present' ? new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : undefined,
      } : s
    ));
  };

  const filtered = students.filter(s => {
    const matchFilter = filter === 'all' || s.status === filter;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    return matchFilter && matchSearch;
  });

  const counts = {
    present: students.filter(s => s.status === 'present').length,
    absent:  students.filter(s => s.status === 'absent').length,
    late:    students.filter(s => s.status === 'late').length,
  };
  const attendancePct = Math.round((counts.present / students.length) * 100);

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-teal-400 font-black uppercase tracking-[0.2em] text-[10px]">
            <Sparkles size={14} /> Nexus Live Presence
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight text-white">Classroom Grid</h2>
          <p className="text-muted font-medium mt-1">Real-time attendance for <span className="text-teal-400 font-bold">Grade 10-A</span> — {students.length} students</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Toggle */}
          <button
            onClick={() => setIsLive(l => !l)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              isLive
                ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/20'
                : 'bg-white/5 text-muted border-white/5 hover:bg-white/10'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-muted'}`} />
            {isLive ? 'Live' : 'Paused'}
          </button>

          <button
            onClick={() => setLastUpdate(new Date())}
            className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all hover:rotate-180"
            style={{ transition: 'all 0.4s ease' }}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Present', val: counts.present, pct: attendancePct, color: '#34d399', glow: 'shadow-emerald-400/10', bg: 'from-emerald-400/5' },
          { label: 'Absent',  val: counts.absent,  pct: Math.round((counts.absent/students.length)*100), color: '#fb7185', glow: 'shadow-rose-400/10', bg: 'from-rose-400/5' },
          { label: 'Late',    val: counts.late,    pct: Math.round((counts.late/students.length)*100),   color: '#fbbf24', glow: 'shadow-amber-400/10', bg: 'from-amber-400/5' },
          { label: 'Attendance', val: `${attendancePct}%`, pct: attendancePct, color: '#60a5fa', glow: 'shadow-blue-400/10', bg: 'from-blue-400/5' },
        ].map(s => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[1.75rem] p-6 bg-gradient-to-br ${s.bg} to-transparent shadow-xl ${s.glow}`}
            style={{ border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', background: `linear-gradient(135deg, ${s.color}08, rgba(15,26,58,0.9))` }}
          >
            <p className="text-4xl font-black tracking-tighter text-white mb-1">{typeof s.val === 'string' ? s.val : s.val}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">{s.label}</p>
            <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.pct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: s.color, boxShadow: `0 0 10px ${s.color}60` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted/40" size={16} />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-4 rounded-2xl text-white text-sm font-medium placeholder-white/20 focus:outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(45,212,191,0.3)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'present', 'absent', 'late'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? 'bg-teal-400 text-navy shadow-lg shadow-teal-400/20'
                  : 'text-muted hover:text-white'
              }`}
              style={filter !== f ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
            >
              {f === 'all' ? `All (${students.length})` : `${statusConfig[f].emoji} ${f}`}
            </button>
          ))}
        </div>
      </div>

      {/* Last updated */}
      <div className="flex items-center gap-2 -mt-4">
        <Clock size={12} className="text-muted/40" />
        <p className="text-[10px] text-muted/40 font-bold uppercase tracking-widest">
          Updated {lastUpdate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
        </p>
      </div>

      {/* Student Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
        <AnimatePresence>
          {filtered.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onStatusChange={handleStatusChange}
              isLive={isLive}
            />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-muted font-serif italic text-xl py-20">
            No students match this filter
          </div>
        )}
      </motion.div>

      {/* AI Attendance Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-[2rem] p-8 flex flex-col sm:flex-row gap-6 items-start"
        style={{
          background: 'linear-gradient(135deg, rgba(245,200,66,0.06) 0%, rgba(15,26,58,0.95) 100%)',
          border: '1px solid rgba(245,200,66,0.15)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <BarChart3 size={28} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-primary" />
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Nexus AI Insight</p>
          </div>
          <p className="text-base font-bold text-white mb-1">
            {attendancePct >= 90
              ? '🔥 Excellent attendance today — class is highly engaged'
              : attendancePct >= 75
              ? '⚠️ 3 absences detected. Rohan & Kiran have missed 2+ sessions this week'
              : '🚨 Below-average attendance. Consider sending parent notifications'}
          </p>
          <p className="text-xs text-muted leading-relaxed">
            {counts.late > 0 && `${counts.late} student${counts.late > 1 ? 's' : ''} arrived late — may indicate transport issues. `}
            Nexus will auto-notify parents of absent students after 30 minutes.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-primary/10 border border-primary/20 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-navy transition-all shrink-0">
          <Bell size={14} /> Notify Parents
        </button>
      </motion.div>
    </div>
  );
};

export default ClassroomGrid;
