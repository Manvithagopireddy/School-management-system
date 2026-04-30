import { motion } from 'motion/react';
import { useState } from 'react';
import {
  BarChart3, Download, TrendingUp, Users, GraduationCap,
  CreditCard, Activity, FileText, Calendar
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import SectionHeader from '@/components/shared/SectionHeader';

const feeData = [
  { month: 'Jan', collected: 620000, pending: 80000 },
  { month: 'Feb', collected: 710000, pending: 60000 },
  { month: 'Mar', collected: 830000, pending: 45000 },
  { month: 'Apr', collected: 750000, pending: 90000 },
  { month: 'May', collected: 920000, pending: 30000 },
];

const attendanceData = [
  { week: 'W1', primary: 92, secondary: 88, high: 85 },
  { week: 'W2', primary: 94, secondary: 90, high: 87 },
  { week: 'W3', primary: 89, secondary: 86, high: 83 },
  { week: 'W4', primary: 95, secondary: 91, high: 88 },
];

const gradeDistrib = [
  { name: 'A+ (90–100)', value: 22, color: '#4ade80' },
  { name: 'A  (80–89)',  value: 38, color: '#2dd4bf' },
  { name: 'B  (70–79)',  value: 25, color: '#f5c842' },
  { name: 'C  (60–69)',  value: 10, color: '#a78bfa' },
  { name: 'D  (<60)',    value: 5,  color: '#fb7185' },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'attendance' | 'grades'>('overview');

  const summaryCards = [
    { icon: Users,        value: '2,413',  label: 'Total Students',   sub: '+213 this term',  color: '#f5c842' },
    { icon: GraduationCap,value: '8',      label: 'Active Faculty',   sub: '100% utilised',   color: '#2dd4bf' },
    { icon: CreditCard,   value: '₹47.3L', label: 'Fees Collected',   sub: 'Apr 2026',         color: '#4ade80' },
    { icon: Activity,     value: '91%',    label: 'Avg Attendance',   sub: 'All divisions',    color: '#a78bfa' },
  ];

  const tabs = [
    { id: 'overview',   label: 'Overview' },
    { id: 'fees',       label: 'Fees' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'grades',     label: 'Grades' },
  ] as const;

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader title="Reports & Analytics" subtitle="Institutional performance overview and exportable data" highlight="AY 2025–26">
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-muted hover:text-white transition-all">
          <Download size={16} /> Export PDF
        </button>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest text-muted hover:text-white transition-all">
          <FileText size={16} /> Export CSV
        </button>
      </SectionHeader>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((s, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={s.label} className="card-nexus p-7 shadow-xl shadow-black/10 group hover:scale-[1.02] transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: `${s.color}18` }}>
              <s.icon size={26} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1 text-white">{s.value}</p>
            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{s.label}</p>
            <p className="text-[10px] mt-2 font-bold" style={{ color: s.color }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 p-1.5 bg-white/3 border border-white/5 rounded-2xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-primary text-navy' : 'text-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      {(activeTab === 'overview' || activeTab === 'fees') && (
        <div className="card-nexus p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
              <CreditCard className="text-primary" size={20} /> Fee Collection vs Pending
            </h3>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted)' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgb(30,53,96)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }}
                  formatter={(v: number) => [`₹${(v/1000).toFixed(0)}k`]}
                />
                <Bar dataKey="collected" name="Collected" fill="#f5c842" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending"   name="Pending"   fill="#fb718540" radius={[6, 6, 0, 0]} />
                <Legend iconType="circle" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {(activeTab === 'overview' || activeTab === 'attendance') && (
        <div className="card-nexus p-8">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-8 font-serif">
            <Activity className="text-teal-400" size={20} /> Weekly Attendance by Division
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted)', fontWeight: 600 }} />
                <YAxis domain={[75, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted)' }} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ backgroundColor: 'rgb(30,53,96)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '13px' }} formatter={(v: number) => [`${v}%`]} />
                <Line type="monotone" dataKey="primary"   name="Primary"   stroke="#f5c842" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="secondary" name="Secondary" stroke="#2dd4bf" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="high"      name="High School" stroke="#a78bfa" strokeWidth={3} dot={false} />
                <Legend iconType="circle" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {(activeTab === 'overview' || activeTab === 'grades') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-nexus p-8">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-8 font-serif">
              <BarChart3 className="text-violet-400" size={20} /> Grade Distribution
            </h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={gradeDistrib} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {gradeDistrib.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgb(30,53,96)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '13px' }} formatter={(v: number) => [`${v}%`]} />
                  <Legend iconType="circle" formatter={value => <span className="text-[11px] text-muted">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Reports List */}
          <div className="card-nexus p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 font-serif">
              <Calendar className="text-primary" size={20} /> Available Reports
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Monthly Attendance Report',  period: 'April 2026',   size: '1.2 MB', color: '#2dd4bf' },
                { label: 'Fee Collection Summary',     period: 'Q1 2026',      size: '840 KB', color: '#f5c842' },
                { label: 'Academic Result Sheet',      period: 'Term 1 2026',  size: '3.4 MB', color: '#a78bfa' },
                { label: 'Student Enrollment Report',  period: 'AY 2025–26',   size: '620 KB', color: '#fb7185' },
                { label: 'Faculty Performance Review', period: 'Mar 2026',     size: '2.1 MB', color: '#4ade80' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${r.color}18` }}>
                      <FileText size={16} style={{ color: r.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{r.label}</p>
                      <p className="text-[10px] text-muted">{r.period} · {r.size}</p>
                    </div>
                  </div>
                  <button className="p-2 bg-white/5 rounded-xl text-muted hover:text-primary hover:bg-primary/5 transition-all">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
