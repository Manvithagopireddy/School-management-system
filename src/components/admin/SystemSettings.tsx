import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Settings, Bell, Shield, Globe, Database,
  Mail, Palette, Moon, Save, ToggleLeft, ToggleRight, ChevronRight
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

interface Toggle {
  label: string;
  desc: string;
  value: boolean;
}

const SystemSettings = () => {
  const [schoolName, setSchoolName] = useState('EduNexus Main Campus');
  const [schoolEmail, setSchoolEmail] = useState('admin@edunexus.com');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');
  const [academicYear, setAcademicYear] = useState('2025 – 2026');
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState<Toggle[]>([
    { label: 'Email Notifications', desc: 'Send system alerts via email', value: true },
    { label: 'SMS Alerts', desc: 'Text message for critical events', value: false },
    { label: 'In-app Notifications', desc: 'Bell icon alerts inside EduNexus', value: true },
    { label: 'Weekly Digest', desc: 'Summary email every Monday', value: true },
  ]);

  const [security, setSecurity] = useState<Toggle[]>([
    { label: 'Two-Factor Authentication', desc: 'Require OTP on login', value: false },
    { label: 'Login Alerts', desc: 'Notify on new device logins', value: true },
    { label: 'Session Timeout (30 min)', desc: 'Auto-logout inactive sessions', value: true },
    { label: 'IP Whitelisting', desc: 'Restrict access to approved IPs', value: false },
  ]);

  const [features, setFeatures] = useState<Toggle[]>([
    { label: 'AI Assistance', desc: 'Enable Nexus AI across all modules', value: true },
    { label: 'Parent Portal', desc: 'Allow parent logins', value: true },
    { label: 'Online Fee Payment', desc: 'Enable payment gateway', value: false },
    { label: 'Digital Library', desc: 'Student access to e-resources', value: true },
  ]);

  const toggleItem = (
    list: Toggle[], setList: React.Dispatch<React.SetStateAction<Toggle[]>>, idx: number
  ) => {
    setList(l => l.map((item, i) => i === idx ? { ...item, value: !item.value } : item));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const ToggleRow = ({ item, onToggle }: { item: Toggle; onToggle: () => void }) => (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
      <div>
        <p className="text-sm font-bold text-white">{item.label}</p>
        <p className="text-[11px] text-muted mt-0.5">{item.desc}</p>
      </div>
      <button onClick={onToggle} className="shrink-0 ml-4">
        {item.value
          ? <ToggleRight size={28} className="text-primary" />
          : <ToggleLeft size={28} className="text-muted/40" />
        }
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader title="System Settings" subtitle="Configure school-wide preferences, security, and features" />

      {/* Save Banner */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="p-4 rounded-2xl bg-teal-400/10 border border-teal-400/20 text-teal-400 text-sm font-bold text-center"
        >
          ✅ Settings saved successfully!
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: School Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card-nexus p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 font-serif">
              <Globe className="text-teal-400" size={20} /> School Profile
            </h3>
            <div className="space-y-4">
              {[
                { label: 'School / Institution Name', value: schoolName, set: setSchoolName, type: 'text' },
                { label: 'Admin Contact Email', value: schoolEmail, set: setSchoolEmail, type: 'email' },
                { label: 'Timezone', value: timezone, set: setTimezone, type: 'text' },
                { label: 'Current Academic Year', value: academicYear, set: setAcademicYear, type: 'text' },
              ].map(({ label, value, set, type }) => (
                <div key={label}>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 block">{label}</label>
                  <input
                    type={type} value={value} onChange={e => set(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-primary/40 transition-all text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card-nexus p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 font-serif">
              <Bell className="text-violet-400" size={20} /> Notification Settings
            </h3>
            <div className="space-y-3">
              {notifs.map((item, i) => (
                <ToggleRow key={item.label} item={item} onToggle={() => toggleItem(notifs, setNotifs, i)} />
              ))}
            </div>
          </div>

          {/* Feature Flags */}
          <div className="card-nexus p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 font-serif">
              <Settings className="text-amber-400" size={20} /> Feature Flags
            </h3>
            <div className="space-y-3">
              {features.map((item, i) => (
                <ToggleRow key={item.label} item={item} onToggle={() => toggleItem(features, setFeatures, i)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Security Settings */}
          <div className="card-nexus p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 font-serif">
              <Shield className="text-rose-400" size={20} /> Security
            </h3>
            <div className="space-y-3">
              {security.map((item, i) => (
                <ToggleRow key={item.label} item={item} onToggle={() => toggleItem(security, setSecurity, i)} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="card-nexus p-8">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6 font-serif">
              <Database className="text-primary" size={20} /> System Tools
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Database Backup', desc: 'Last backup: 2h ago', color: '#2dd4bf' },
                { label: 'Clear Cache', desc: '124 MB cached data', color: '#f5c842' },
                { label: 'Export All Data', desc: 'Full institutional dump', color: '#a78bfa' },
                { label: 'Audit Logs', desc: 'View last 30 days', color: '#fb7185' },
              ].map(item => (
                <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-left group">
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.label}</p>
                    <p className="text-[10px] text-muted mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full py-4 bg-primary text-navy font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-sm"
          >
            <Save size={18} /> Save All Settings
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
