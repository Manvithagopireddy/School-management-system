import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '@/context/AuthContext';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

const roles: { id: UserRole; label: string; icon: string; demo: string; colorClass: string; gradient: string }[] = [
  { id: 'admin',   label: 'Admin',   icon: '👑', demo: 'admin@edunexus.com', colorClass: 'admin',   gradient: 'from-rose-400 to-red-500' },
  { id: 'student', label: 'Student', icon: '🎒', demo: 'student@edunexus.com', colorClass: 'student', gradient: 'from-teal-400 to-sky-500' },
  { id: 'teacher', label: 'Teacher', icon: '👩‍🏫', demo: 'teacher@edunexus.com', colorClass: 'teacher', gradient: 'from-amber-400 to-orange-500' },
  { id: 'parent',  label: 'Parent',  icon: '👨‍👩‍👧', demo: 'parent@edunexus.com', colorClass: 'parent',  gradient: 'from-violet-400 to-pink-500'  },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@edunexus.com');
  const [password, setPassword] = useState('password');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const found = roles.find(r => r.id === role);
    if (found) setEmail(found.demo);
    setError('');
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const ok = login(email, password, selectedRole);
    if (ok) {
      navigate('/', { replace: true });
    } else {
      setError('Invalid credentials. Select a role and use the pre-filled email.');
    }
    setLoading(false);
  };

  const current = roles.find(r => r.id === selectedRole)!;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0a1628]">
      {/* Background Orbs */}
      <div className="bg-orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="card-nexus p-12 shadow-2xl shadow-black/50 border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-11 h-11 gradient-bg rounded-2xl flex items-center justify-center text-xl shadow-xl border border-white/20">
              🎓
            </div>
            <h1 className="font-serif text-3xl font-black tracking-tight">
              Edu<span className="text-primary">Nexus</span>
            </h1>
          </div>
          <p className="text-muted/60 text-[11px] font-bold uppercase tracking-widest mb-10 ml-[60px] -mt-5">Intelligence Platform</p>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => handleRoleSelect(r.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${
                  selectedRole === r.id
                    ? `bg-white/5 text-white scale-105 shadow-xl`
                    : 'border-white/5 bg-transparent text-muted/60 hover:border-white/10 hover:text-white'
                }`}
                style={{
                   borderColor: selectedRole === r.id ? (r.id === 'admin' ? '#fb7185' : r.id === 'student' ? '#2dd4bf' : r.id === 'teacher' ? '#f5c842' : '#a78bfa') : ''
                }}
              >
                <span className="text-2xl">{r.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{r.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] text-muted font-bold uppercase tracking-[0.1em] ml-1">Account Credentials</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-medium text-sm"
              />
            </div>

            <div className="relative group">
               <input
                 type={showPass ? 'text' : 'password'}
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 placeholder="Security Pin"
                 className="w-full bg-white/3 border border-white/5 rounded-2xl py-4 px-6 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-white/10 transition-all font-medium text-sm"
               />
               <button 
                 onClick={() => setShowPass(!showPass)}
                 className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
               >
                 {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
               </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-400 text-xs font-medium"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-navy font-bold text-base shadow-xl transition-all duration-300 bg-gradient-to-r ${current.gradient} hover:shadow-black/20 flex items-center justify-center gap-2`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In as {current.label} <ArrowRight size={18} /></>
              )}
            </motion.button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-muted font-medium bg-white/5 py-3 rounded-xl px-4 inline-block">
              Demo Access: <strong>admin</strong> · <strong>student</strong> · <strong>teacher</strong> · <strong>parent</strong> <br/>
              Select role tab then press Sign In
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
