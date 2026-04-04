import { 
  TrendingUp, TrendingDown, CheckCircle2, Clock, 
  CreditCard, Sparkles, ArrowRight, ShieldCheck,
  AlertTriangle, Calendar, MessageSquare, Star,
  BookOpen, Heart, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

// ── Plain-language insight cards ──────────────────────────────────────────────
const insights = [
  {
    id: 1,
    icon: TrendingUp,
    emoji: '📈',
    headline: 'Arjun is improving in Mathematics',
    subline: 'Score went from 78% to 91% over 3 weeks. Keep it up!',
    tone: 'positive',
    color: '#2dd4bf',
    bg: 'from-teal-400/10',
    border: 'rgba(45,212,191,0.2)',
    glow: 'shadow-teal-400/10',
  },
  {
    id: 2,
    icon: AlertTriangle,
    emoji: '⚠️',
    headline: 'Attendance needs attention',
    subline: '2 absences this week. Regular attendance directly affects grades.',
    tone: 'warning',
    color: '#f5c842',
    bg: 'from-amber-400/10',
    border: 'rgba(245,200,66,0.2)',
    glow: 'shadow-amber-400/10',
  },
  {
    id: 3,
    icon: Star,
    emoji: '🏆',
    headline: 'Top performer in Computer Science',
    subline: 'Arjun scored 96% — highest in his class. Consider advanced courses.',
    tone: 'positive',
    color: '#a78bfa',
    bg: 'from-violet-400/10',
    border: 'rgba(167,139,250,0.2)',
    glow: 'shadow-violet-400/10',
  },
  {
    id: 4,
    icon: BookOpen,
    emoji: '📚',
    headline: 'Chemistry lags behind other subjects',
    subline: '78% average — the weakest subject. AI recommends 20 min extra practice daily.',
    tone: 'attention',
    color: '#fb7185',
    bg: 'from-rose-400/10',
    border: 'rgba(251,113,133,0.2)',
    glow: 'shadow-rose-400/10',
  },
  {
    id: 5,
    icon: Heart,
    emoji: '💚',
    headline: 'Mental well-being is stable',
    subline: 'Digital usage is balanced and study hours are consistent. Great balance!',
    tone: 'positive',
    color: '#4ade80',
    bg: 'from-emerald-400/10',
    border: 'rgba(74,222,128,0.2)',
    glow: 'shadow-emerald-400/10',
  },
];

const weeklyActions = [
  { text: 'Praise Arjun for his Math improvement', icon: '🎉' },
  { text: 'Discuss Wednesday absence with him', icon: '💬' },
  { text: 'Review Chemistry notes together — 20 mins', icon: '📖' },
];

const fees = [
  { name: 'Tuition Fee – April', amt: '₹8,500', due: 'Apr 10', status: 'Paid'    },
  { name: 'Transport Fee – Apr', amt: '₹1,200', due: 'Apr 10', status: 'Pending' },
  { name: 'Exam Fee – Term 2',   amt: '₹500',   due: 'Apr 15', status: 'Pending' },
];

const ParentDashboard = () => {
  const { user } = useAuth();
  const childName = 'Arjun';

  return (
    <div className="flex flex-col gap-10">
      {/* AI Snapshot Banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] p-6 flex items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(135deg, rgba(167,139,250,0.08), rgba(15,26,58,0.95))',
          border: '1px solid rgba(167,139,250,0.2)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-violet-400/15 flex items-center justify-center text-violet-400 ai-pulse">
            <ShieldCheck size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={13} className="text-violet-400" />
              <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em]">Nexus AI · Daily Snapshot</p>
            </div>
            <h3 className="text-xl font-bold text-white">{childName}'s day looks <span className="text-teal-400">balanced</span> — review today's summary below</h3>
            <p className="text-xs text-muted mt-0.5">5 insights · Last updated 9 minutes ago</p>
          </div>
        </div>
        <Link
          to="/wellbeing-tracker"
          className="flex items-center gap-2 px-5 py-3 bg-violet-400 text-navy rounded-2xl font-black text-xs hover:scale-105 transition-all shadow-lg shadow-violet-400/20 shrink-0"
        >
          Full Report <ArrowRight size={14} />
        </Link>
      </motion.div>

      {/* Header */}
      <div>
        <h2 className="text-4xl font-black font-serif tracking-tight text-white">Hello, {user?.name.split(' ')[0]} 👨‍👩‍👧</h2>
        <p className="text-muted font-medium mt-1">Here's what you need to know about <span className="text-primary font-bold">{childName}</span> this week.</p>
      </div>

      {/* ── Weekly Summary in Plain Language ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Sparkles className="text-primary" size={20} /> Weekly Summary
          </h3>
          <span className="text-[10px] text-muted font-black uppercase tracking-widest bg-white/5 px-3 py-2 rounded-full border border-white/5">Apr 1 – Apr 5</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {insights.map((ins, i) => (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-[1.75rem] p-6 flex flex-col gap-4 cursor-default"
              style={{
                background: `linear-gradient(135deg, ${ins.color}08 0%, rgba(15,26,58,0.95) 100%)`,
                border: `1px solid ${ins.border}`,
                backdropFilter: 'blur(16px)',
                boxShadow: `0 12px 40px rgba(0,0,0,0.3)`,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${ins.color}15`, border: `1px solid ${ins.color}25` }}
                >
                  {ins.emoji}
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-snug mb-1">{ins.headline}</p>
                  <p className="text-[11px] text-muted leading-relaxed">{ins.subline}</p>
                </div>
              </div>

              {ins.tone !== 'positive' && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold"
                  style={{ background: `${ins.color}10`, color: ins.color }}
                >
                  <ins.icon size={12} />
                  {ins.tone === 'warning' ? 'Action Suggested' : 'Needs Attention'}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Suggested Actions for Parent ── */}
      <div
        className="rounded-[2rem] p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(15,26,58,0.95))',
          border: '1px solid rgba(245,200,66,0.15)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
          <Award className="text-primary" size={20} /> What you can do this week
        </h3>
        <div className="flex flex-col gap-4">
          {weeklyActions.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-2xl shrink-0">{a.icon}</span>
              <p className="text-sm font-medium text-white/80">{a.text}</p>
              <CheckCircle2 size={18} className="text-muted/20 ml-auto shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom Row: Quick Stats + Fees ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { emoji: '📊', label: 'Overall GPA',    val: '86.4%', note: '↑ From last term', positive: true },
            { emoji: '🏫', label: 'Attendance',     val: '94%',   note: '28 of 30 days',    positive: true },
            { emoji: '📝', label: 'Pending Tasks',  val: '3',     note: 'Due this week',    positive: false },
            { emoji: '💪', label: 'Study Streak',   val: '12 days', note: 'Personal best!', positive: true },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.07 }}
              className="rounded-[1.75rem] p-6 flex flex-col gap-2"
              style={{
                background: 'linear-gradient(145deg, rgba(24,36,72,0.85), rgba(15,26,58,0.95))',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="text-2xl">{s.emoji}</span>
              <p className="text-2xl font-black text-white tracking-tight">{s.val}</p>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest leading-none">{s.label}</p>
              <p className={`text-[10px] font-bold mt-1 ${s.positive ? 'text-teal-400' : 'text-rose-400'}`}>{s.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Fees */}
        <div
          className="rounded-[2rem] p-8 flex flex-col gap-6"
          style={{
            background: 'linear-gradient(145deg, rgba(24,36,72,0.85), rgba(15,26,58,0.95))',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <h3 className="text-lg font-bold flex items-center gap-2 text-white">
            <CreditCard className="text-rose-400" size={20} /> Fee Summary
          </h3>
          <div className="space-y-3 flex-1">
            {fees.map(f => (
              <div
                key={f.name}
                className="flex items-center justify-between p-4 rounded-2xl transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <p className="text-xs font-bold text-white mb-0.5">{f.name}</p>
                  <p className="text-[10px] text-muted font-medium">Due {f.due}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${f.status === 'Paid' ? 'text-teal-400' : 'text-white'}`}>{f.amt}</p>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${f.status === 'Paid' ? 'bg-teal-400/10 text-teal-400' : 'bg-rose-400/10 text-rose-400'}`}>
                    {f.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-primary text-navy font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
            Pay Outstanding Fees
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div
        className="rounded-[2rem] p-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
        style={{
          background: 'linear-gradient(145deg, rgba(24,36,72,0.7), rgba(15,26,58,0.9))',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-3 sm:col-span-1">
          <Calendar className="text-primary" size={22} />
          <h3 className="text-base font-bold text-white">Upcoming</h3>
        </div>
        {[
          { emoji: '📋', label: 'PTM', date: 'Apr 12' },
          { emoji: '🧪', label: 'Chemistry Exam', date: 'Apr 18' },
          { emoji: '🎓', label: 'Science Fair', date: 'Apr 25' },
        ].map(e => (
          <div key={e.label} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <span className="text-2xl">{e.emoji}</span>
            <div>
              <p className="text-xs font-bold text-white">{e.label}</p>
              <p className="text-[10px] text-muted font-bold">{e.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentDashboard;
