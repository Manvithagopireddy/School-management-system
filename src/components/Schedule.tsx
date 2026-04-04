import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MoreVertical,
  Plus,
  Download,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';

const timeSlots = ['08:00', '09:30', '11:00', '12:00', '14:00', '15:30'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const lessons = [
  { day: 'Mon', time: '08:00', subject: 'Mathematics', teacher: 'Dr. Sarah Smith', color: '#f5c842' },
  { day: 'Mon', time: '09:30', subject: 'Physics',     teacher: 'James Wilson',    color: '#2dd4bf' },
  { day: 'Tue', time: '11:00', subject: 'Chemistry',   teacher: 'Emily Brown',     color: '#a78bfa' },
  { day: 'Wed', time: '08:00', subject: 'CS',          teacher: 'Arun Menon',      color: '#fb7185' },
  { day: 'Thu', time: '12:00', subject: 'English',     teacher: 'Emma Watson',     color: '#4ade80' },
  { day: 'Fri', time: '09:30', subject: 'History',     teacher: 'Robert Langdon',  color: '#f59e0b' },
  { day: 'Sat', time: '11:00', subject: 'Sports',      teacher: 'Dev Singh',       color: '#0ea5e9' },
];

const Schedule = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black font-serif tracking-tight">Academic Timetable</h2>
          <p className="text-muted font-medium">Session 2025-26 · Term 2 · <span className="text-primary font-bold">Grade 10-A</span></p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-xs font-bold text-muted hover:text-white transition-all">
            <Download size={16} /> Export PDF
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-primary text-navy px-6 py-2.5 rounded-2xl font-bold shadow-xl shadow-primary/20 text-sm"
          >
            <Plus size={20} />
            Manage Schedule
          </motion.button>
        </div>
      </div>

      <div className="card-nexus p-8 shadow-2xl shadow-black/20 overflow-x-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
           <div className="flex items-center gap-4">
              <button className="p-2 bg-white/5 rounded-xl text-muted hover:text-white transition-all"><ChevronLeft size={20} /></button>
              <div className="text-center min-w-[200px]">
                 <p className="text-xs font-bold text-muted uppercase tracking-widest mb-0.5">Active Week</p>
                 <p className="text-lg font-black tracking-tight">April 06 - April 12, 2026</p>
              </div>
              <button className="p-2 bg-white/5 rounded-xl text-muted hover:text-white transition-all"><ChevronRight size={20} /></button>
           </div>
           <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl">
              <button className="px-4 py-1.5 bg-primary text-navy rounded-xl text-xs font-bold">Week View</button>
              <button className="px-4 py-1.5 text-muted hover:text-white rounded-xl text-xs font-bold">Day View</button>
           </div>
        </div>

        <div className="min-w-[1000px]">
          <div className="grid grid-cols-[100px_repeat(6,1fr)] bg-white/5 rounded-2xl mb-4 text-center">
            <div className="p-4"></div>
            {days.map(day => (
              <div key={day} className="p-4 text-[10px] font-black text-muted uppercase tracking-[0.2em]">{day}</div>
            ))}
          </div>

          <div className="relative">
            {timeSlots.map((time, idx) => (
              <div key={time} className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-white/5 last:border-b-0 min-h-[120px]">
                <div className="p-6 text-[11px] font-mono font-bold text-muted border-r border-white/5 flex flex-col justify-center items-center bg-white/2">
                   <span>{time}</span>
                   <span className="opacity-40 text-[9px] mt-1">{timeSlots[idx+1] || '17:00'}</span>
                </div>
                {days.map(day => {
                  const lesson = lessons.find(l => l.day === day && l.time === time);
                  return (
                    <div key={`${day}-${time}`} className="p-3 border-r border-white/5 last:border-r-0 group">
                      {lesson ? (
                        <motion.div 
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="h-full p-5 rounded-2xl border-l-[4px] bg-white/5 shadow-xl transition-all shadow-black/10 cursor-pointer flex flex-col gap-2 relative overflow-hidden"
                          style={{ borderColor: lesson.color }}
                        >
                          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 rounded-full opacity-5" style={{ background: lesson.color }} />
                          <div className="flex justify-between items-start z-10">
                            <h4 className="font-bold text-sm tracking-tight">{lesson.subject}</h4>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={14} /></button>
                          </div>
                          <p className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5 z-10">
                            <Clock size={10} /> {time} · Room 20{idx+1}
                          </p>
                          <p className="text-[11px] font-bold mt-auto z-10" style={{ color: lesson.color }}>{lesson.teacher}</p>
                        </motion.div>
                      ) : (
                        <div className="h-full w-full rounded-2xl border-2 border-dashed border-white/5 hover:bg-white/5 transition-all flex items-center justify-center group pointer-events-none">
                           <Plus size={16} className="text-white/5 group-hover:text-white/20 transition-all" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
