import { 
  CheckCircle2, AlertCircle, Clock, 
  Calendar, FileText, ChevronLeft, ChevronRight,
  TrendingDown, TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

const Attendance = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black font-serif tracking-tight">Attendance Record</h2>
          <p className="text-muted font-medium">Detailed tracking of academic year 2025–26 presence.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-xs font-bold text-muted hover:text-white transition-all">
            <FileText size={16} /> Leave Application
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: CheckCircle2, value: '28',    label: 'Days Present',  change: 'April 2026',  color: '#4ade80' },
          { icon: AlertCircle,  value: '2',     label: 'Days Absent',   change: 'Medical leave', color: '#fb7185' },
          { icon: TrendingUp,   value: '93.3%', label: 'Attendance Rate', change: 'Above 75%',    color: '#2dd4bf' },
          { icon: Calendar,     value: '30',    label: 'Total Weekdays', change: 'Current Term',  color: '#a78bfa' },
        ].map((s, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={s.label} className="card-nexus p-7 shadow-xl shadow-black/10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
              <s.icon size={26} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{s.value}</p>
            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-[10px] mt-2 font-bold" style={{ color: s.color }}>{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Grid */}
        <div className="lg:col-span-2 card-nexus p-8">
           <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
              <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
                <Calendar className="text-primary" size={20} /> Monthly Visualization
              </h3>
              <div className="flex items-center gap-4">
                 <button className="p-2 bg-white/5 rounded-xl text-muted hover:text-white transition-all"><ChevronLeft size={18} /></button>
                 <span className="text-sm font-bold tracking-tight">April 2026</span>
                 <button className="p-2 bg-white/5 rounded-xl text-muted hover:text-white transition-all"><ChevronRight size={18} /></button>
              </div>
           </div>

           <div className="grid grid-cols-7 md:grid-cols-10 gap-3 mb-10">
             {[...Array(30)].map((_, i) => {
               const day = i + 1;
               const absent = [3, 17];
               const leave = [10];
               const status = absent.includes(day) ? 'absent' : leave.includes(day) ? 'leave' : 'present';
               
               return (
                 <motion.div 
                    key={day}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center font-bold text-xs shadow-lg transition-all border border-black/20 ${
                      status === 'present' ? 'bg-teal-400/20 text-teal-400 border-teal-400/30' :
                      status === 'absent' ? 'bg-rose-400/20 text-rose-400 border-rose-400/30' :
                      'bg-amber-400/20 text-amber-400 border-amber-400/30'
                    }`}
                 >
                   <span className="opacity-50 text-[9px] mb-1">{day}</span>
                   {status === 'present' ? 'P' : status === 'absent' ? 'A' : 'L'}
                 </motion.div>
               );
             })}
           </div>

           <div className="flex gap-8 p-6 rounded-3xl bg-white/2 border border-white/5">
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]"></div>
                 <span className="text-xs font-bold text-muted">Present</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185]"></div>
                 <span className="text-xs font-bold text-muted">Absent</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#f5c842]"></div>
                 <span className="text-xs font-bold text-muted">Authorized Leave</span>
              </div>
           </div>
        </div>

        {/* Remarks Section */}
        <div className="flex flex-col gap-6">
           <div className="card-nexus p-8 bg-rose-400/5 border-rose-400/20">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-4">Absence Record</h3>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-4">
                 <p className="text-sm font-bold text-white mb-1">April 3, 2026 – Absent</p>
                 <p className="text-[11px] text-muted leading-relaxed">Medical emergency. Physician's note (Ref #M-921) submitted to class teacher. Approved.</p>
              </div>
              <button className="w-full py-3 bg-rose-400/10 text-rose-400 font-bold rounded-xl text-[10px] hover:bg-rose-400/20 transition-all uppercase tracking-widest">
                 View Official Note
              </button>
           </div>

           <div className="card-nexus p-8">
              <h3 className="text-lg font-bold mb-4 font-serif">Quick Summary</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-muted font-medium">Late Entries</span>
                    <span className="font-bold text-white">0</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-muted font-medium">Authorized Leaves</span>
                    <span className="font-bold text-white">1</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-muted font-medium">Working Days</span>
                    <span className="font-bold text-white">142</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
