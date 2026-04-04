import { 
  Users, GraduationCap, Mail, Phone, 
  MapPin, Clock, Plus, Search, 
  Filter, MoreVertical, MessageSquare, 
  Calendar, CheckCircle2, ChevronRight, Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const teachersData = [
  { id: 'T001', name: 'Dr. Priya Nair',  dept: 'Mathematics', exp: '12 years',  status: 'Teaching', avatar: 'PN', color: '#f5c842' },
  { id: 'T002', name: 'James Wilson',    dept: 'Physics',     exp: '8 years',   status: 'Teaching', avatar: 'JW', color: '#2dd4bf' },
  { id: 'T003', name: 'Emily Brown',     dept: 'Chemistry',   exp: '10 years',  status: 'In Library', avatar: 'EB', color: '#a78bfa' },
  { id: 'T004', name: 'Arun Menon',      dept: 'Comp. Sci',   exp: '15 years',  status: 'Off Duty', avatar: 'AM', color: '#fb7185' },
  { id: 'T005', name: 'Emma Watson',     dept: 'English',     exp: '6 years',   status: 'Teaching', avatar: 'EW', color: '#4ade80'  },
  { id: 'T006', name: 'Robert Langdon',  dept: 'History',     exp: '20 years',  status: 'On Leave', avatar: 'RL', color: '#8b5cf6' },
  { id: 'T007', name: 'Sita Ram',        dept: 'Biology',     exp: '9 years',   status: 'Teaching', avatar: 'SR', color: '#f59e0b' },
  { id: 'T008', name: 'Daniel Craig',    dept: 'Sports',      exp: '5 years',   status: 'Field Duty', avatar: 'DC', color: '#0ea5e9' },
];

const Teachers = () => {
  const [filter, setFilter] = useState('');
  
  const filtered = teachersData.filter(t => 
    t.name.toLowerCase().includes(filter.toLowerCase()) || 
    t.dept.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black font-serif tracking-tight">Academic Faculty</h2>
          <p className="text-muted font-medium">Connect with our <span className="text-primary font-bold">certified senior faculty</span> members.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-muted hover:text-white transition-all">
             Directory PDF
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-primary text-navy px-6 py-2.5 rounded-2xl font-bold shadow-xl shadow-primary/20 text-sm"
          >
            <Plus size={20} />
            Hire Staff
          </motion.button>
        </div>
      </div>

      <div className="card-nexus p-8 shadow-2xl shadow-black/20 overflow-hidden">
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
           <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Find faculty or department..." 
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-medium text-sm"
              />
           </div>
           <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button className="px-4 py-1.5 bg-primary text-navy rounded-xl text-xs font-black uppercase tracking-widest">Card View</button>
              <button className="px-4 py-1.5 text-muted hover:text-white rounded-xl text-xs font-black uppercase tracking-widest">List View</button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((t, i) => (
             <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               key={t.id} 
               className="group relative overflow-hidden card-nexus p-0 border border-white/5 hover:border-primary/20 transition-all shadow-xl shadow-black/20 hover:shadow-primary/5 hover:scale-[1.02]"
             >
                <div className="p-8 pb-4">
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-2xl font-black shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500" style={{ color: t.color }}>
                        {t.avatar}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border shadow-lg ${
                        t.status === 'Teaching' ? 'bg-teal-400/10 text-teal-400 border-teal-400/20 shadow-[0_0_8px_#2dd4bf22]' : 'bg-white/5 text-muted border-white/10'
                      }`}>
                        {t.status}
                      </div>
                   </div>
                   
                   <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-primary transition-colors">{t.name}</h3>
                   <div className="flex items-center gap-1.5 mb-4">
                      <GraduationCap size={14} style={{ color: t.color }} />
                      <span className="text-[10px] text-muted font-bold uppercase tracking-widest">{t.dept} Faculty</span>
                   </div>

                   <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2.5 text-muted hover:text-white transition-colors cursor-default">
                         <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center"><Award size={14} /></div>
                         <span className="text-[11px] font-bold">{t.exp} Teaching Exp</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-muted hover:text-white transition-colors cursor-default">
                         <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center"><Clock size={14} /></div>
                         <span className="text-[11px] font-bold">14 Academic Papers</span>
                      </div>
                   </div>
                </div>

                <div className="mt-4 p-4 grid grid-cols-2 gap-2 bg-black/20">
                   <button className="py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/50 hover:bg-white/10 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                      <MessageSquare size={13} /> Message
                   </button>
                   <button className="py-2.5 bg-primary text-navy rounded-xl hover:scale-105 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/10">
                      <Calendar size={13} /> View Schedule
                   </button>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
