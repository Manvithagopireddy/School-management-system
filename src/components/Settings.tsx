import { 
  User, Bell, Shield, 
  Palette, Globe, Lock, 
  Eye, Monitor, Moon,
  Sun, CheckCircle2, AlertCircle,
  HelpCircle, LogOut, ChevronRight,
  Database, Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

const SettingRow = ({ icon: Icon, title, sub, action, color }: any) => (
  <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group cursor-pointer">
    <div className="flex items-center gap-5">
       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-all shadow-inner border border-white/5">
         <Icon size={22} style={{ color }} />
       </div>
       <div>
          <p className="text-sm font-bold text-white mb-0.5">{title}</p>
          <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{sub}</p>
       </div>
    </div>
    {action ? action : <ChevronRight size={18} className="text-muted group-hover:text-white transition-colors" />}
  </div>
);

const Settings = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black font-serif tracking-tight">Account Parameters</h2>
          <p className="text-muted font-medium">Manage your <span className="text-primary font-bold">EduNexus Profile</span> and system preferences.</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5">
           <LogOut size={16} /> Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="card-nexus p-10 flex flex-col items-center text-center bg-gradient-to-br from-indigo-900/30 to-transparent border-primary/20 shadow-2xl">
           <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center text-4xl font-black text-white shadow-2xl border-4 border-[#122040]">
                {user?.avatar}
              </div>
              <div className="absolute bottom-1 right-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-navy shadow-xl border-4 border-[#122040] cursor-pointer hover:scale-110 transition-transform">
                 <Palette size={20} />
              </div>
           </div>
           
           <h3 className="text-2xl font-black mb-1">{user?.name}</h3>
           <p className="text-[11px] text-primary font-black uppercase tracking-[0.2em] mb-8">{user?.badge}</p>
           
           <div className="w-full space-y-4 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center px-4">
                 <p className="text-[10px] font-black text-muted uppercase tracking-widest">Employee ID</p>
                 <p className="text-xs font-mono font-bold text-white">#EDU-92831</p>
              </div>
              <div className="flex justify-between items-center px-4">
                 <p className="text-[10px] font-black text-muted uppercase tracking-widest">Work Email</p>
                 <p className="text-xs font-bold text-white truncate max-w-[140px]">{user?.email}</p>
              </div>
              <div className="flex justify-between items-center px-4">
                 <p className="text-[10px] font-black text-muted uppercase tracking-widest">Auth Status</p>
                 <span className="bg-emerald-400/10 text-emerald-400 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border border-emerald-400/20">Two-Factor Active</span>
              </div>
           </div>
        </div>

        {/* Categories */}
        <div className="lg:col-span-2 space-y-6">
           <div className="space-y-4">
              <h4 className="text-[11px] font-black text-muted uppercase tracking-[0.25em] ml-2">Personalization</h4>
              <SettingRow icon={Palette} title="UI Theme Engine" sub="Glassmorphism · Dark Mode · Custom Accents" color="#f5c842" />
              <SettingRow icon={Bell}    title="Push Notifications" sub="Real-time Alerts · Email Reports · SMS" color="#2dd4bf" />
              <SettingRow icon={Globe}   title="Language & Region" sub="English (India) · GMT +5:30" color="#a78bfa" />
           </div>

           <div className="space-y-4 pt-4">
              <h4 className="text-[11px] font-black text-muted uppercase tracking-[0.25em] ml-2">Security Hub</h4>
              <SettingRow icon={Lock}    title="Authentication Security" sub="Biometrics · Session Management · Passwords" color="#fb7185" />
              <SettingRow icon={Shield}  title="Privacy Controls" sub="Profile Visibility · Data Sharing" color="#4ade80" />
           </div>
        </div>
      </div>

      {/* Admin Specific Settings */}
      {user?.role === 'admin' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-nexus p-8">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-8 font-serif text-amber-400">
             <Database className="text-primary" size={20} /> System Infrastructure Configuration
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                 <div className="flex items-center gap-4 mb-4">
                    <Activity className="text-emerald-400" size={20} />
                    <p className="text-sm font-bold">Cloud Sync Node</p>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-widest">
                    <span>Active Clusters</span>
                    <span className="text-emerald-400">8 / 8 Online</span>
                 </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                 <div className="flex items-center gap-4 mb-4">
                    <Monitor className="text-blue-400" size={20} />
                    <p className="text-sm font-bold">Terminal Access</p>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-widest">
                    <span>Logs Retention</span>
                    <span className="text-blue-400">90 Days</span>
                 </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                 <div className="flex items-center gap-4 mb-4">
                    <HelpCircle className="text-violet-400" size={20} />
                    <p className="text-sm font-bold">Priority Support</p>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-widest">
                    <span>SLA Status</span>
                    <span className="text-violet-400">Enterprise</span>
                 </div>
              </div>
           </div>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
