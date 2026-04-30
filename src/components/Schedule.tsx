import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, ChevronLeft, ChevronRight, 
  Clock, MoreVertical, Plus, Download, Share2,
  X, Check, Trash2, Edit3, Bell, Wand2
} from 'lucide-react';
import { generateAutoSchedule } from '../lib/algorithms/scheduler';

/* ─── types ──────────────────────────────────────────────── */
interface Lesson {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

/* ─── static data ─────────────────────────────────────────── */
const TIMESLOTS = ['08:00', '09:30', '11:00', '12:00', '14:00', '15:30'];
const DAYS      = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const INIT_LESSONS: Lesson[] = [
  { id:'1', day:'Mon', time:'08:00', subject:'Mathematics', teacher:'Dr. Sarah Smith', room:'201', color:'#f5c842' },
  { id:'2', day:'Mon', time:'09:30', subject:'Physics',     teacher:'James Wilson',    room:'Lab 3', color:'#2dd4bf' },
  { id:'3', day:'Tue', time:'11:00', subject:'Chemistry',   teacher:'Emily Brown',     room:'Lab 1', color:'#a78bfa' },
  { id:'4', day:'Wed', time:'08:00', subject:'CS',          teacher:'Arun Menon',      room:'204', color:'#fb7185' },
  { id:'5', day:'Thu', time:'12:00', subject:'English',     teacher:'Emma Watson',     room:'104', color:'#4ade80' },
  { id:'6', day:'Fri', time:'09:30', subject:'History',     teacher:'Robert Langdon',  room:'106', color:'#f59e0b' },
  { id:'7', day:'Sat', time:'11:00', subject:'Sports',      teacher:'Dev Singh',       room:'Ground', color:'#0ea5e9' },
];

const WEEK_DATES = ['Apr 7','Apr 8','Apr 9','Apr 10','Apr 11','Apr 12'];

const COLORS = ['#f5c842','#2dd4bf','#a78bfa','#fb7185','#4ade80','#f59e0b','#0ea5e9'];

/* ─── Export helper ──────────────────────────────────────── */
const exportScheduleCSV = (lessons: Lesson[]) => {
  const rows = [
    ['Day', 'Time', 'Subject', 'Teacher', 'Room'],
    ...lessons.map(l => [l.day, l.time, l.subject, l.teacher, l.room]),
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'schedule.csv';
  a.click();
  URL.revokeObjectURL(url);
};

/* ─── Add/Edit Modal ─────────────────────────────────────── */
const LessonModal = ({
  lesson, onSave, onClose, onDelete
}: {
  lesson: Partial<Lesson> | null;
  onSave: (l: Lesson) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
}) => {
  const [form, setForm] = useState<Partial<Lesson>>(lesson ?? { day: 'Mon', time: '08:00', color: '#f5c842' });

  const isEdit = !!lesson?.id;

  const handleSave = () => {
    if (!form.subject?.trim() || !form.teacher?.trim()) return;
    onSave({
      id:      form.id ?? String(Date.now()),
      day:     form.day ?? 'Mon',
      time:    form.time ?? '08:00',
      subject: form.subject,
      teacher: form.teacher,
      room:    form.room ?? 'TBD',
      color:   form.color ?? '#f5c842',
    });
  };

  const set = (k: keyof Lesson, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/60" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-lg rounded-[2rem] p-10 flex flex-col gap-8 relative"
        style={{
          background: 'linear-gradient(145deg, rgba(24,36,72,0.98), rgba(12,20,50,0.99))',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black font-serif text-white">{isEdit ? 'Edit Class' : 'Add New Class'}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Subject</label>
            <input
              value={form.subject ?? ''}
              onChange={e => set('subject', e.target.value)}
              placeholder="e.g. Mathematics"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Teacher</label>
            <input
              value={form.teacher ?? ''}
              onChange={e => set('teacher', e.target.value)}
              placeholder="e.g. Dr. Smith"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Day</label>
            <select value={form.day ?? 'Mon'} onChange={e => set('day', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none cursor-pointer">
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Time Slot</label>
            <select value={form.time ?? '08:00'} onChange={e => set('time', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none cursor-pointer">
              {TIMESLOTS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Room</label>
            <input
              value={form.room ?? ''}
              onChange={e => set('room', e.target.value)}
              placeholder="e.g. Lab 3"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted">Color</label>
            <div className="flex gap-2 flex-wrap pt-1">
              {COLORS.map(c => (
                <button key={c} onClick={() => set('color', c)}
                  className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${form.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-navy scale-110' : ''}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {isEdit && onDelete && (
            <button onClick={() => { onDelete(form.id!); onClose(); }}
              className="px-5 py-3 rounded-2xl bg-rose-400/10 text-rose-400 border border-rose-400/20 text-xs font-black uppercase tracking-widest hover:bg-rose-400 hover:text-white transition-all">
              <Trash2 size={14} />
            </button>
          )}
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl bg-white/5 border border-white/10 text-muted text-xs font-black uppercase tracking-widest hover:text-white transition-all">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-3 rounded-2xl bg-primary text-navy text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
            <Check size={14} /> {isEdit ? 'Update' : 'Add Class'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Day View ───────────────────────────────────────────── */
const DayView = ({ lessons, today, onEdit }: { lessons: Lesson[]; today: string; onEdit: (l: Lesson) => void }) => {
  const todayLessons = lessons.filter(l => l.day === today).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold text-muted uppercase tracking-widest">
        {today} · {WEEK_DATES[DAYS.indexOf(today)]}
      </p>
      {todayLessons.length === 0 && (
        <p className="text-center text-muted font-serif italic text-lg py-20 opacity-50">No classes today — enjoy your break!</p>
      )}
      {todayLessons.map(l => (
        <motion.div
          key={l.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 6 }}
          onClick={() => onEdit(l)}
          className="flex items-center gap-6 p-6 rounded-[1.5rem] cursor-pointer group"
          style={{ background: `linear-gradient(135deg, ${l.color}12, rgba(24,36,72,0.9))`, border: `1px solid ${l.color}25`, borderLeft: `4px solid ${l.color}` }}
        >
          <div className="text-center w-16">
            <p className="text-lg font-black text-white">{l.time}</p>
            <p className="text-[9px] text-muted font-bold uppercase tracking-widest">Slot</p>
          </div>
          <div className="flex-1">
            <p className="text-base font-black text-white group-hover:text-primary transition-colors">{l.subject}</p>
            <p className="text-xs text-muted mt-0.5">{l.teacher} · Room {l.room}</p>
          </div>
          <Edit3 size={16} className="text-muted/30 group-hover:text-primary transition-colors" />
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
import { API_BASE_URL } from '@/config/api';

const Schedule = () => {
  const [lessons, setLessons]     = useState<Lesson[]>(INIT_LESSONS);
  const [view, setView]           = useState<'week' | 'day'>('week');
  const [today, setToday]         = useState('Mon');
  const [weekOffset, setWeekOffset] = useState(0);
  const [modal, setModal]         = useState<{ open: boolean; lesson: Partial<Lesson> | null }>({ open: false, lesson: null });
  const [exportDone, setExportDone] = useState(false);
  const [dbStatus, setDbStatus]   = useState<'loading' | 'live' | 'offline'>('loading');

  // Load lessons from Spring Boot DB on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/schedule`)
      .then(r => r.json())
      .then((data: Lesson[]) => {
        if (data.length > 0) { setLessons(data); setDbStatus('live'); }
        else setDbStatus('offline');
      })
      .catch(() => setDbStatus('offline'));
  }, []);

  const weekStart = new Date(2026, 3, 7 + weekOffset * 7); // Apr 7 base
  const weekEnd   = new Date(2026, 3, 12 + weekOffset * 7);
  const weekLabel = `${weekStart.toLocaleDateString('en-US',{ month:'short', day:'numeric' })} – ${weekEnd.toLocaleDateString('en-US',{ month:'short', day:'numeric' })}`;

  const handleSave = (lesson: Lesson) => {
    setLessons(prev => {
      const exists = prev.find(l => l.id === lesson.id);
      return exists ? prev.map(l => l.id === lesson.id ? lesson : l) : [...prev, lesson];
    });
    setModal({ open: false, lesson: null });
    // Persist to Spring Boot DB
    fetch(`${API_BASE_URL}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson)
    }).catch(console.warn);
  };

  const handleDelete = (id: string) => {
    setLessons(prev => prev.filter(l => l.id !== id));
  };

  const handleExport = () => {
    exportScheduleCSV(lessons);
    setExportDone(true);
    setTimeout(() => setExportDone(false), 2000);
  };

  const openAdd = (day?: string, time?: string) => {
    setModal({ open: true, lesson: { day: day ?? 'Mon', time: time ?? '08:00', color: '#f5c842' } });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black font-serif tracking-tight text-white">Academic Timetable</h2>
            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg border ${
              dbStatus === 'live'    ? 'text-teal-400 border-teal-400/30 bg-teal-400/10' :
              dbStatus === 'offline' ? 'text-rose-400 border-rose-400/30 bg-rose-400/10' :
                                      'text-muted border-white/10 bg-white/5'
            }`}>{dbStatus === 'live' ? '● Live DB' : dbStatus === 'offline' ? '○ Offline' : '◌ Loading'}</span>
          </div>
          <p className="text-muted font-medium mt-1">Session 2025-26 · Term 2 · <span className="text-primary font-bold">Grade 10-A</span></p>
        </div>
        <div className="flex gap-3">
          <button
             onClick={() => setLessons(generateAutoSchedule())}
             className="flex items-center gap-2 border px-4 py-2.5 rounded-2xl text-xs font-bold transition-all bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white"
          >
             <Wand2 size={16} /> Auto-Gen
          </button>
          <button
            onClick={handleExport}
            className={`flex items-center gap-2 border px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              exportDone
                ? 'bg-teal-400/10 border-teal-400/30 text-teal-400'
                : 'bg-white/5 border-white/10 text-muted hover:text-white'
            }`}
          >
            {exportDone ? <><Check size={14} /> Exported!</> : <><Download size={16} /> Export CSV</>}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openAdd()}
            className="flex items-center gap-2 bg-primary text-navy px-6 py-2.5 rounded-2xl font-bold shadow-xl shadow-primary/20 text-sm"
          >
            <Plus size={20} /> Manage Schedule
          </motion.button>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-[2rem] p-8 shadow-2xl shadow-black/20 overflow-x-auto"
        style={{ background: 'linear-gradient(145deg,rgba(24,36,72,0.85),rgba(15,26,58,0.95))', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(20px)' }}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={() => setWeekOffset(o => o - 1)} className="p-2 bg-white/5 rounded-xl text-muted hover:text-white hover:bg-white/10 transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="text-center min-w-[200px]">
              <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-0.5">
                {weekOffset === 0 ? 'Current Week' : weekOffset > 0 ? `+${weekOffset} weeks` : `${weekOffset} weeks`}
              </p>
              <p className="text-lg font-black text-white tracking-tight">{weekLabel}</p>
            </div>
            <button onClick={() => setWeekOffset(o => o + 1)} className="p-2 bg-white/5 rounded-xl text-muted hover:text-white hover:bg-white/10 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Day selector (only visible in day view) */}
            {view === 'day' && (
              <div className="flex gap-1">
                {DAYS.map(d => (
                  <button key={d} onClick={() => setToday(d)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${today === d ? 'bg-primary text-navy' : 'text-muted hover:text-white bg-white/5'}`}>
                    {d}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl ml-2">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${view === 'week' ? 'bg-primary text-navy shadow-lg' : 'text-muted hover:text-white'}`}
              >
                Week View
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${view === 'day' ? 'bg-primary text-navy shadow-lg' : 'text-muted hover:text-white'}`}
              >
                Day View
              </button>
            </div>
          </div>
        </div>

        {/* View Content */}
        <AnimatePresence mode="wait">
          {view === 'day' ? (
            <motion.div key="day" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <DayView lessons={lessons} today={today} onEdit={l => setModal({ open: true, lesson: l })} />
            </motion.div>
          ) : (
            <motion.div key="week" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="min-w-[900px]">
              {/* Day headers */}
              <div className="grid grid-cols-[90px_repeat(6,1fr)] bg-white/5 rounded-2xl mb-4 text-center">
                <div className="p-4" />
                {DAYS.map((day, i) => (
                  <div key={day} className="p-4">
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{day}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{WEEK_DATES[i]}</p>
                  </div>
                ))}
              </div>

              {/* Grid rows */}
              {TIMESLOTS.map((time, idx) => (
                <div key={time} className="grid grid-cols-[90px_repeat(6,1fr)] border-b border-white/5 last:border-b-0 min-h-[110px]">
                  <div className="p-4 text-[11px] font-mono font-bold text-muted border-r border-white/5 flex flex-col justify-center items-center bg-white/2">
                    <span>{time}</span>
                    <span className="opacity-30 text-[9px] mt-0.5">{TIMESLOTS[idx + 1] ?? '17:00'}</span>
                  </div>
                  {DAYS.map(day => {
                    const lesson = lessons.find(l => l.day === day && l.time === time);
                    return (
                      <div key={`${day}-${time}`} className="p-2 border-r border-white/5 last:border-r-0 group">
                        {lesson ? (
                          <motion.div
                            layoutId={lesson.id}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            onClick={() => setModal({ open: true, lesson })}
                            className="h-full p-4 rounded-2xl border-l-[3px] cursor-pointer flex flex-col gap-1.5 relative overflow-hidden"
                            style={{
                              borderColor: lesson.color,
                              background: `linear-gradient(135deg, ${lesson.color}14, rgba(24,36,72,0.8))`,
                              border: `1px solid ${lesson.color}25`,
                              borderLeftWidth: '3px',
                              borderLeftColor: lesson.color,
                            }}
                          >
                            <h4 className="font-bold text-xs text-white">{lesson.subject}</h4>
                            <p className="text-[9px] text-muted flex items-center gap-1">
                              <Clock size={8} /> {time} · Rm {lesson.room}
                            </p>
                            <p className="text-[10px] font-bold mt-auto" style={{ color: lesson.color }}>{lesson.teacher}</p>
                          </motion.div>
                        ) : (
                          <button
                            onClick={() => openAdd(day, time)}
                            className="h-full w-full rounded-2xl border-2 border-dashed border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                          >
                            <Plus size={14} className="text-primary/50" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <LessonModal
            lesson={modal.lesson}
            onSave={handleSave}
            onClose={() => setModal({ open: false, lesson: null })}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;
