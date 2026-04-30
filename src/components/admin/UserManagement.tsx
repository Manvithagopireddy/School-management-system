import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Plus, Search, Shield, Edit2, Trash2,
  GraduationCap, BookOpen, UserCheck, X, Save, Eye, EyeOff
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

type Role = 'admin' | 'teacher' | 'student' | 'parent';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'Active' | 'Suspended';
  joined: string;
  avatar: string;
}

const ROLE_COLORS: Record<Role, string> = {
  admin:   '#fb7185',
  teacher: '#f5c842',
  student: '#2dd4bf',
  parent:  '#a78bfa',
};

const ROLE_ICONS: Record<Role, React.ElementType> = {
  admin:   Shield,
  teacher: GraduationCap,
  student: BookOpen,
  parent:  UserCheck,
};

const INITIAL_USERS: SystemUser[] = [
  { id: 'a1', name: 'John Doe',        email: 'admin@edunexus.com',   role: 'admin',   status: 'Active',    joined: 'Jan 2024', avatar: 'JD' },
  { id: 't1', name: 'Dr. Priya Nair',  email: 'teacher@edunexus.com', role: 'teacher', status: 'Active',    joined: 'Feb 2024', avatar: 'PN' },
  { id: 's1', name: 'Arjun Sharma',    email: 'student@edunexus.com', role: 'student', status: 'Active',    joined: 'Apr 2024', avatar: 'AS' },
  { id: 'p1', name: 'Mr. Suresh Sharma', email: 'parent@edunexus.com', role: 'parent', status: 'Active',   joined: 'Apr 2024', avatar: 'SS' },
  { id: 't2', name: 'James Wilson',    email: 'jwilson@edunexus.com', role: 'teacher', status: 'Active',    joined: 'Mar 2024', avatar: 'JW' },
  { id: 's2', name: 'Priya Menon',     email: 'pmenon@edunexus.com',  role: 'student', status: 'Active',    joined: 'Apr 2024', avatar: 'PM' },
  { id: 's3', name: 'Rohan Gupta',     email: 'rgupta@edunexus.com',  role: 'student', status: 'Suspended', joined: 'Apr 2024', avatar: 'RG' },
];

const blankUser: Omit<SystemUser, 'id'> = {
  name: '', email: '', role: 'student', status: 'Active', joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), avatar: ''
};

const UserManagement = () => {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [filter, setFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<SystemUser | null>(null);
  const [form, setForm] = useState(blankUser);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState('password');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(filter.toLowerCase()) || u.email.toLowerCase().includes(filter.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(blankUser);
    setPassword('password');
    setShowModal(true);
  };

  const openEdit = (u: SystemUser) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status, joined: u.joined, avatar: u.avatar });
    setPassword('');
    setShowModal(true);
  };

  const save = () => {
    if (!form.name || !form.email) return;
    const avatar = form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    if (editing) {
      setUsers(us => us.map(u => u.id === editing.id ? { ...u, ...form, avatar } : u));
    } else {
      const newUser: SystemUser = { id: `u${Date.now()}`, ...form, avatar };
      setUsers(us => [...us, newUser]);
    }
    setShowModal(false);
  };

  const toggleStatus = (id: string) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  const confirmDelete = (id: string) => setDeleteId(id);
  const doDelete = () => { if (deleteId) { setUsers(us => us.filter(u => u.id !== deleteId)); setDeleteId(null); } };

  const roleCounts = (['admin', 'teacher', 'student', 'parent'] as Role[]).map(r => ({
    role: r, count: users.filter(u => u.role === r).length,
  }));

  return (
    <div className="flex flex-col gap-10">
      <SectionHeader title="User Management" subtitle="Manage all system accounts and role-based access" highlight={`${users.length} users`}>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-navy px-6 py-2.5 rounded-2xl font-bold shadow-xl shadow-primary/20 text-sm"
        >
          <Plus size={18} /> Add User
        </motion.button>
      </SectionHeader>

      {/* Role Summary Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roleCounts.map(({ role, count }) => {
          const Icon = ROLE_ICONS[role];
          const color = ROLE_COLORS[role];
          return (
            <button
              key={role}
              onClick={() => setRoleFilter(roleFilter === role ? 'all' : role)}
              className="p-5 rounded-2xl border transition-all text-left group"
              style={{
                background: roleFilter === role ? `${color}18` : 'rgba(255,255,255,0.03)',
                borderColor: roleFilter === role ? `${color}40` : 'rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted capitalize">{role}</span>
              </div>
              <p className="text-2xl font-black text-white">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="card-nexus p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text" value={filter} onChange={e => setFilter(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all font-medium text-sm"
            />
          </div>
          <p className="text-xs font-bold text-muted uppercase tracking-widest">{filtered.length} results</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                {['User', 'Role', 'Email', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => {
                const color = ROLE_COLORS[u.role];
                const RIcon = ROLE_ICONS[u.role];
                return (
                  <motion.tr
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group"
                  >
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-sm" style={{ color }}>
                          {u.avatar}
                        </div>
                        <p className="text-sm font-bold text-white">{u.name}</p>
                      </div>
                    </td>
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-2">
                        <RIcon size={13} style={{ color }} />
                        <span className="text-[10px] font-black uppercase tracking-wider capitalize" style={{ color }}>{u.role}</span>
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-sm text-muted font-medium">{u.email}</td>
                    <td className="py-5 pr-4">
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className={`text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg border transition-all ${
                          u.status === 'Active'
                            ? 'bg-teal-400/10 text-teal-400 border-teal-400/20 hover:bg-teal-400/20'
                            : 'bg-rose-400/10 text-rose-400 border-rose-400/20 hover:bg-rose-400/20'
                        }`}
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="py-5 pr-4 text-[11px] text-muted font-bold">{u.joined}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(u)} className="p-2 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-primary hover:bg-primary/5 transition-all">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => confirmDelete(u.id)} className="p-2 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-rose-400 hover:bg-rose-400/5 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="card-nexus p-8 w-full max-w-lg shadow-2xl shadow-black/50"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black font-serif">{editing ? 'Edit User' : 'Add New User'}</h3>
                <button onClick={() => setShowModal(false)} className="p-2 bg-white/5 rounded-xl text-muted hover:text-white transition-all">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 block">Full Name</label>
                  <input
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 block">Email Address</label>
                  <input
                    type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="user@edunexus.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-all text-sm"
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 block">Password</label>
                  <input
                    type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder={editing ? 'Leave blank to keep existing' : 'Set password'}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-11 text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-all text-sm"
                  />
                  <button onClick={() => setShowPass(s => !s)} className="absolute right-4 top-[34px] text-muted hover:text-white transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 block">Role</label>
                    <select
                      value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as Role }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-primary/40 transition-all text-sm appearance-none"
                    >
                      {(['admin', 'teacher', 'student', 'parent'] as Role[]).map(r => (
                        <option key={r} value={r} className="bg-[#0f1a3a] capitalize">{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted mb-1.5 block">Status</label>
                    <select
                      value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as 'Active' | 'Suspended' }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-primary/40 transition-all text-sm appearance-none"
                    >
                      <option value="Active" className="bg-[#0f1a3a]">Active</option>
                      <option value="Suspended" className="bg-[#0f1a3a]">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-2xl text-muted font-bold text-sm hover:text-white transition-all">
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={save}
                  className="flex-1 py-3 bg-primary text-navy rounded-2xl font-black text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Save size={16} /> {editing ? 'Save Changes' : 'Create User'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Dialog */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="card-nexus p-8 w-full max-w-sm shadow-2xl shadow-black/50 text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-rose-400/10 flex items-center justify-center mx-auto mb-6">
                <Trash2 size={28} className="text-rose-400" />
              </div>
              <h3 className="text-lg font-black mb-2">Delete User?</h3>
              <p className="text-sm text-muted mb-8">This action cannot be undone. The user will lose all access immediately.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-2xl text-muted font-bold text-sm hover:text-white transition-all">
                  Cancel
                </button>
                <button onClick={doDelete} className="flex-1 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-rose-500/20">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
