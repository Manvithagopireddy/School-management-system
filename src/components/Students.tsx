import { 
  Users, Search, Filter, Plus, 
  Mail, Download, Eye, Loader2, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import EmptyState from '@/components/shared/EmptyState';

interface Student {
  id: string; name: string; grade: string; roll: string;
  gpa: string; att: string; status: string; color: string;
}

const MOCK_STUDENTS: Student[] = [
  { id: 'S001', name: 'Arjun Sharma',   grade: 'Grade 10-A', roll: '21', gpa: '8.64', att: '94%', status: 'Active',    color: '#2dd4bf' },
  { id: 'S002', name: 'Priya Menon',    grade: 'Grade 10-A', roll: '22', gpa: '9.12', att: '98%', status: 'Active',    color: '#f5c842' },
  { id: 'S003', name: 'Rohan Gupta',    grade: 'Grade 10-B', roll: '15', gpa: '7.85', att: '82%', status: 'Active',    color: '#a78bfa' },
  { id: 'S004', name: 'Ananya Singh',   grade: 'Grade 10-A', roll: '24', gpa: '9.41', att: '100%',status: 'Active',    color: '#fb7185' },
  { id: 'S005', name: 'Kiran Patel',    grade: 'Grade 10-B', roll: '11', gpa: '8.83', att: '91%', status: 'Active',    color: '#4ade80' },
  { id: 'S006', name: 'Sneha Reddy',    grade: 'Grade 9-A',  roll: '08', gpa: '9.20', att: '96%', status: 'Active',    color: '#38bdf8' },
  { id: 'S007', name: 'Vikram Bose',    grade: 'Grade 9-B',  roll: '17', gpa: '7.40', att: '78%', status: 'Suspended', color: '#f472b6' },
  { id: 'S008', name: 'Divya Kumar',    grade: 'Grade 11-A', roll: '03', gpa: '8.95', att: '92%', status: 'Active',    color: '#c084fc' },
  { id: 'S009', name: 'Aditya Joshi',   grade: 'Grade 11-B', roll: '29', gpa: '8.10', att: '88%', status: 'Active',    color: '#fbbf24' },
  { id: 'S010', name: 'Meera Nair',     grade: 'Grade 12-A', roll: '01', gpa: '9.65', att: '99%', status: 'Active',    color: '#6ee7b7' },
];

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filter, setFilter]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [offset, setOffset]     = useState(0);
  const LIMIT = 20;

import { API_BASE_URL } from '@/config/api';

  const fetchStudents = useCallback((search: string, off: number) => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LIMIT), offset: String(off), search });
    fetch(`${API_BASE_URL}/students?${params}`)
      .then(r => r.json())
      .then((data: Student[]) => { setStudents(data); setLoading(false); })
      .catch(() => {
        // Fallback to mock data when Spring Boot server is offline
        const mock = MOCK_STUDENTS.filter(s =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.grade.toLowerCase().includes(search.toLowerCase()) ||
          s.id.toLowerCase().includes(search.toLowerCase())
        );
        setStudents(mock.slice(off, off + LIMIT));
        setLoading(false);
      });
  }, []);

  useEffect(() => { fetchStudents(filter, offset); }, [filter, offset, fetchStudents]);

  const handleSearch = (val: string) => { setFilter(val); setOffset(0); };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black font-serif tracking-tight">Student Directory</h2>
          <p className="text-muted font-medium">Managing <span className="text-primary font-bold">500 students</span> across all campuses · Live Java DB</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-muted hover:text-white transition-all">
            <Download size={16} /> Bulk Export
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-primary text-navy px-6 py-2.5 rounded-2xl font-bold shadow-xl shadow-primary/20 text-sm"
          >
            <Plus size={20} />
            Admission Entry
          </motion.button>
        </div>
      </div>

      <div className="card-nexus p-8 shadow-2xl shadow-black/20 overflow-hidden">
        <div className="flex items-center justify-between mb-10 pb-8 border-b border-white/5">
           <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Find by name, ID or grade..." 
                value={filter}
                onChange={e => handleSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-medium text-sm"
              />
           </div>
           <div className="flex items-center gap-4">
              <button className="h-12 px-6 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-muted hover:text-white transition-all flex items-center gap-2">
                 <Filter size={16} /> Advanced Filter
              </button>
              <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
              <p className="text-xs font-bold text-muted uppercase tracking-widest">
                {loading ? 'Loading...' : `${students.length} Results Found`}
              </p>
           </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-muted">
            <Loader2 className="animate-spin" size={22} />
            <span className="text-sm font-bold">Loading from Java DB...</span>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">ID & Identity</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Class & Section</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Current GPA</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted text-center">Attendance</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Account Status</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted text-right">Module Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {students.map((s, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  key={s.id} 
                  className="hover:bg-white/5 transition-colors group cursor-default"
                >
                  <td className="py-6 px-2">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-lg shadow-inner group-hover:scale-105 transition-all group-hover:border-primary/20" style={{ color: s.color }}>
                        {s.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{s.name}</p>
                        <p className="text-[10px] text-muted font-bold font-mono uppercase mt-0.5">{s.id} · ID Verified</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 font-bold text-[13px]">
                     <span className="bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5">{s.grade}</span>
                  </td>
                  <td className="py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                       <span className="text-base font-black tracking-tight" style={{ color: parseFloat(s.gpa) > 8.0 ? '#4ade80' : '#f5c842' }}>{s.gpa}</span>
                       <span className="text-[8px] font-black uppercase text-muted tracking-widest">Merit List</span>
                    </div>
                  </td>
                  <td className="py-6 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                       <span className="text-[13px] font-bold text-white/90">{s.att}</span>
                       <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: s.att }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className={`text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg border shadow-lg ${
                      s.status === 'Active' ? 'bg-teal-400/10 text-teal-400 border-teal-400/20' : 'bg-rose-400/10 text-rose-400 border-rose-400/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center justify-end gap-2">
                       <button title="View Transcript" className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-primary hover:bg-primary/5 transition-all">
                          <Target size={16} />
                       </button>
                       <button title="Send Message" className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-teal-400 hover:bg-teal-400/5 transition-all">
                          <Mail size={16} />
                       </button>
                       <button title="Full Profile" className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-violet-400 hover:bg-violet-400/5 transition-all">
                          <Eye size={16} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-muted font-bold">
            Showing {offset + 1}–{Math.min(offset + LIMIT, offset + students.length)} of 500 students
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setOffset(o => Math.max(0, o - LIMIT))}
              disabled={offset === 0}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >← Prev</button>
            <button
              onClick={() => setOffset(o => o + LIMIT)}
              disabled={students.length < LIMIT}
              className="px-4 py-2 bg-primary text-navy border border-primary/30 rounded-xl text-xs font-bold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;

