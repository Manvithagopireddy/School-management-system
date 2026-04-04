import { 
  Users, GraduationCap, School, TrendingUp,
  TrendingDown, BookOpen, Clock, CheckCircle2,
  AlertCircle, Activity, Globe, Shield
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const enrolmentData = [
  { name: '2021', students: 850 },
  { name: '2022', students: 1100 },
  { name: '2023', students: 1450 },
  { name: '2024', students: 1800 },
  { name: '2025', students: 2400 },
];

const attendanceStats = [
  { name: 'Primary', value: 92, color: '#f5c842' },
  { name: 'Secondary', value: 88, color: '#2dd4bf' },
  { name: 'High School', value: 85, color: '#a78bfa' },
];

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black font-serif tracking-tight">System Control Center</h2>
        <p className="text-muted font-medium">Global analytics for <span className="text-primary font-bold">EduNexus Main Campus</span>.</p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users,      value: '2.4k',  label: 'Students',   change: '+14% growth', color: '#f5c842' },
          { icon: GraduationCap, value: '184',   label: 'Faculty',    change: 'All Verified', color: '#2dd4bf' },
          { icon: School,     value: '42',    label: 'Classrooms', change: '85% Capacity', color: '#fb7185' },
          { icon: Activity,   value: '91%',   label: 'Avg Attend', change: 'Global Avg',   color: '#a78bfa' },
        ].map((s, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={s.label} className="card-nexus p-7 shadow-xl shadow-black/10 group">
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
        {/* Growth Chart */}
        <div className="lg:col-span-2 card-nexus p-8">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
               <TrendingUp className="text-primary" size={20} /> Enrolment Growth
             </h3>
             <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-primary text-navy rounded-xl text-[10px] font-black uppercase tracking-widest">Last 5 Years</button>
             </div>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={enrolmentData}>
                 <defs>
                   <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%"  stopColor="#f5c842" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#f5c842" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} dy={10} />
                 <Tooltip contentStyle={{ backgroundColor: 'rgb(30,53,96)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                 <Area type="monotone" dataKey="students" stroke="#f5c842" strokeWidth={4} fill="url(#adminGrad)" animationDuration={2500} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Division Stats */}
        <div className="card-nexus p-8 flex flex-col gap-6">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-4 font-serif">
             <School className="text-teal-400" size={22} /> Division Health
           </h3>
           <div className="space-y-8 flex-1">
             {attendanceStats.map(s => (
               <div key={s.name}>
                  <div className="flex justify-between items-center mb-2">
                     <p className="text-sm font-bold text-white">{s.name}</p>
                     <p className="text-xs font-black" style={{ color: s.color }}>{s.value}%</p>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${s.value}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full rounded-full"
                        style={{ background: s.color, boxShadow: `0 0 10px ${s.color}66` }}
                     />
                  </div>
               </div>
             ))}
           </div>
           <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 text-center relative overflow-hidden group">
              <div className="absolute top-[-20%] left-[-10%] w-20 h-20 rounded-full bg-primary/10 blur-xl"></div>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Global System Status</p>
                 <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-lg font-black text-white">Full Operational</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Logs */}
        <div className="card-nexus p-8">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
                <Globe className="text-violet-400" size={20} /> Platform Activity
              </h3>
              <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Full Log</button>
           </div>
           <div className="space-y-4">
              {[
                { type: 'Update', msg: 'System patches v2.4.1 deployed successfully.', time: '10m ago', color: '#2dd4bf' },
                { type: 'Auth',   msg: 'Multiple failed logins detected from Dev Campus.', time: '2h ago',  color: '#fb7185' },
                { type: 'Cloud',  msg: 'AWS Storage auto-sync completed (840GB synced).', time: '5h ago',  color: '#a78bfa' },
              ].map(log => (
                <div key={log.msg} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-default">
                   <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: log.color, boxShadow: `0 0 8px ${log.color}` }}></div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: log.color }}>{log.type}</span>
                         <span className="text-[10px] text-muted font-bold font-mono">{log.time}</span>
                      </div>
                      <p className="text-sm font-medium text-white/80 leading-relaxed">{log.msg}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Security / Admin actions */}
        <div className="card-nexus p-8">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-8 font-serif">
             <Shield className="text-rose-400" size={20} /> Security & Permissions
           </h3>
           <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: 'Audit Access',      sub: 'User Permissions', color: '#f5c842' },
                { icon: Globe, label: 'Manage Campus',     sub: 'Resource Config',  color: '#2dd4bf' },
                { icon: Shield, label: 'Security Firewall', sub: 'IP Blacklisting',   color: '#a78bfa' },
                { icon: Activity, label: 'Server Load',     sub: 'Real-time Monitoring', color: '#fb7185' },
              ].map(a => (
                <button key={a.label} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left flex flex-col gap-4 group">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <a.icon size={20} style={{ color: a.color }} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-white mb-0.5">{a.label}</p>
                      <p className="text-[9px] text-muted font-bold uppercase tracking-tight">{a.sub}</p>
                   </div>
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
