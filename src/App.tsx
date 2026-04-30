import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  Settings as LucideSettings, 
  Bell,
  Search,
  School,
  LogOut,
  BookOpen,
  ClipboardList,
  CheckSquare,
  Library,
  CreditCard,
  Target,
  Sparkles,
  Brain,
  Mic,
  Activity,
  Layout,
  ShieldCheck,
  Shield,
  BarChart3,
  UserCog,
  Cog,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useAuth, type UserRole } from '@/context/AuthContext';

// Components
import Login from '@/components/Login';
import AdminDashboard from '@/components/Dashboard';
import TeacherDashboard from '@/components/dashboards/TeacherDashboard';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import ParentDashboard from '@/components/dashboards/ParentDashboard';
import AIPlanner from '@/components/ai/AIPlanner';
import AIInsights from '@/components/ai/AIInsights';
import AIDigest from '@/components/ai/AIDigest';
import AIFlashcards from '@/components/ai/AIFlashcards';
import AILessonArchitect from '@/components/ai/AILessonArchitect';
import WellbeingTracker from '@/components/ai/WellbeingTracker';
import ClassroomGrid from '@/components/ai/ClassroomGrid';
import NexusVoice from '@/components/ai/NexusVoice';
import Students from '@/components/Students';
import Teachers from '@/components/Teachers';
import Schedule from '@/components/Schedule';
import Messages from '@/components/Messages';
import SettingsView from '@/components/Settings';
import AIChat from '@/components/AIChat';
import Grades from '@/components/Grades';
import Fees from '@/components/Fees';
import Attendance from '@/components/Attendance';
// Admin-only pages
import UserManagement from '@/components/admin/UserManagement';
import SystemSettings from '@/components/admin/SystemSettings';
import Reports from '@/components/admin/Reports';
import CampusAI from '@/components/CampusAI';

const SidebarItem = ({ icon: Icon, label, path, active, badge }: { icon: any, label: string, path: string, active: boolean, badge?: number }) => (
  <Link to={path}>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-4 px-8 py-3 transition-all duration-300 border-l-[3px] ${
        active 
          ? 'bg-white/5 text-white border-primary shadow-[inset_10px_0_15px_-10px_rgba(245,200,66,0.1)]' 
          : 'text-muted border-transparent hover:bg-white/3 hover:text-white'
      }`}
    >
      <Icon size={18} strokeWidth={active ? 2.5 : 2} className={active ? 'text-primary' : 'text-muted/60 group-hover:text-white'} />
      <span className={`text-[13px] font-semibold tracking-wide ${active ? 'text-white' : 'text-muted'}`}>{label}</span>
      {badge && (
        <span className="ml-auto bg-rose-500/90 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-rose-400/20">
          {badge}
        </span>
      )}
    </motion.div>
  </Link>
);

const App = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  if (!user) {
    return <Login />;
  }

  const navConfig: Record<UserRole, { section: string; items: any[] }[]> = {
    admin: [
      { section: 'Global Overview', items: [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Control Center', path: '/' },
        { id: 'students',  icon: Users,           label: 'Student Mgmt',   path: '/students' },
        { id: 'teachers',  icon: GraduationCap,   label: 'Staff Directory', path: '/teachers' },
      ]},
      { section: 'Academic Hub', items: [
        { id: 'schedule',   icon: Calendar,      label: 'Global Schedule', path: '/schedule' },
        { id: 'attendance', icon: CheckCircle2,  label: 'Attendance',      path: '/attendance' },
        { id: 'grades',     icon: Target,        label: 'Grade Book',      path: '/grades' },
        { id: 'messages',   icon: MessageSquare, label: 'System Comms',    path: '/messages', badge: 5 },
      ]},
      { section: 'Finance & Ops', items: [
        { id: 'fees',    icon: CreditCard, label: 'Fee Management', path: '/fees' },
        { id: 'reports', icon: BarChart3,  label: 'Reports',        path: '/reports' },
      ]},
      { section: 'Admin Tools', items: [
        { id: 'campus-ai',icon: Brain,         label: 'Campus AI (DSA)', path: '/campus-ai' },
        { id: 'users',    icon: UserCog,       label: 'User Management', path: '/users' },
        { id: 'settings', icon: Cog,           label: 'System Settings', path: '/system-settings' },
      ]},
    ],
    student: [
      { section: 'Main Console', items: [
        { id: 'dashboard', icon: LayoutDashboard, label: 'My Hub', path: '/' },
        { id: 'ai-planner', icon: Sparkles, label: 'AI Study Planner', path: '/ai-planner' },
        { id: 'ai-flashcards', icon: Brain, label: 'AI Flashcards', path: '/ai-flashcards' },
        { id: 'schedule', icon: Calendar, label: 'Daily Schedule', path: '/schedule' },
        { id: 'grades', icon: Target, label: 'Grades & GPA', path: '/grades' },
      ]},
      { section: 'Resource Hub', items: [
        { id: 'assignments', icon: ClipboardList, label: 'Assignments', path: '/assignments', badge: 3 },
        { id: 'library', icon: Library, label: 'Digital Library', path: '/library' },
        { id: 'messages', icon: MessageSquare, label: 'Direct Messages', path: '/messages', badge: 2 },
      ]}
    ],
    teacher: [
      { section: 'Edu Console', items: [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Class Overview', path: '/' },
        { id: 'classroom-grid', icon: Users, label: 'Live Classroom', path: '/classroom-grid' },
        { id: 'ai-lesson-architect', icon: Layout, label: 'Lesson Architect', path: '/ai-lesson-architect' },
        { id: 'ai-insights', icon: Brain, label: 'AI Class Analysis', path: '/ai-insights' },
      ]},
      { section: 'Assessments', items: [
        { id: 'assignments', icon: ClipboardList, label: 'Assignments', path: '/assignments', badge: 5 },
        { id: 'grades', icon: Target, label: 'Grade Book', path: '/grades' },
        { id: 'messages', icon: MessageSquare, label: 'Inbox', path: '/messages', badge: 4 },
      ]}
    ],
    parent: [
      { section: 'Child Snapshot', items: [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Progress Hub', path: '/' },
        { id: 'wellbeing-tracker', icon: ShieldCheck, label: 'Child Well-being', path: '/wellbeing-tracker' },
        { id: 'ai-digest', icon: Sparkles, label: 'AI Daily Digest', path: '/ai-digest' },
        { id: 'grades', icon: Target, label: 'Child Results', path: '/grades' },
      ]},
      { section: 'Finances', items: [
        { id: 'fees', icon: CreditCard, label: 'Fee Portal', path: '/fees' },
        { id: 'messages', icon: MessageSquare, label: 'Parent Chat', path: '/messages', badge: 1 },
      ]}
    ]
  };

  const sections = navConfig[user.role as UserRole] || navConfig.admin;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans relative">
      <div className="noise-overlay" />
      <div className="bg-orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <NexusVoice isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />

      {/* Sidebar - EduNexus Style */}
      <aside className="w-[280px] glass border-r border-white/5 flex flex-col pt-10 pb-8 shrink-0 z-30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
        <div className="flex items-center gap-4 px-8 mb-12">
          <div className="w-11 h-11 gradient-bg rounded-[1.25rem] flex items-center justify-center text-xl shadow-xl border border-white/20">
            🎓
          </div>
          <h1 className="font-serif text-2xl font-black tracking-tight text-white">
            Edu<span className="text-primary">Nexus</span>
          </h1>
        </div>

        {/* User Card */}
        <div className="mx-4 mb-8 p-4 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {user.avatar}
              </div>
              <div>
                 <p className="text-sm font-bold truncate max-w-[140px] text-white">{user.name}</p>
                 <p className="text-[10px] text-muted font-bold uppercase tracking-wider">{user.badge}</p>
              </div>
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {sections.map(section => (
            <div key={section.section} className="mb-6">
              <h3 className="px-7 text-[10px] font-bold text-muted uppercase tracking-[2px] mb-3 opacity-60">
                {section.section}
              </h3>
              <div className="flex flex-col">
                {section.items.map(item => (
                  <SidebarItem 
                    key={item.path}
                    icon={item.icon} 
                    label={item.label} 
                    path={item.path} 
                    active={location.pathname === item.path}
                    badge={item.badge}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-5 mt-4">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-white/10 text-muted font-bold text-xs hover:text-rose-400 hover:border-rose-400/30 hover:bg-rose-400/5 transition-all"
          >
            <LogOut size={16} /> Sign Out Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header - EduNexus Style */}
        <header className="h-20 glass border-b border-white/5 sticky top-0 z-20 flex items-center justify-between px-12 shrink-0 backdrop-blur-3xl">
          <div className="relative w-80 max-w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={16} />
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              className="w-full bg-white/3 border border-white/5 rounded-2xl py-2.5 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary/30 transition-all font-medium text-xs shadow-inner"
            />
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsVoiceOpen(true)}
              className="h-11 w-11 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary hover:bg-primary hover:text-navy transition-all shadow-xl shadow-primary/5 active:scale-95 group"
            >
              <Mic size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            <button className="h-11 w-11 glass rounded-2xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#122040]"></span>
            </button>
            
            <div className="h-10 w-[1px] bg-white/10"></div>
            
            <div className="flex items-center gap-4 cursor-default">
               <div className="text-right">
                  <p className="text-sm font-bold text-white mb-0.5">{user.name}</p>
                  <p className="text-[11px] text-muted font-bold uppercase tracking-wider">{user.role}</p>
               </div>
               <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center text-white font-extrabold text-xl shadow-lg border-2 border-white/20">
                 {user.avatar}
               </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-black/5">
          <Routes>
            <Route path="/" element={
              user.role === 'admin' ? <AdminDashboard /> : 
              user.role === 'teacher' ? <TeacherDashboard /> : 
              user.role === 'student' ? <StudentDashboard /> : 
              <ParentDashboard />
            } />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/ai-flashcards" element={<AIFlashcards />} />
            <Route path="/ai-lesson-architect" element={<AILessonArchitect />} />
            <Route path="/classroom-grid" element={<ClassroomGrid />} />
            <Route path="/wellbeing-tracker" element={<WellbeingTracker />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/ai-digest" element={<AIDigest />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/attendance" element={<Attendance />} />
            {/* Admin-only routes */}
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/system-settings" element={<SystemSettings />} />
            <Route path="/campus-ai" element={<CampusAI />} />
            
            {/* Catch-all for coming soon */}
            <Route path="*" element={<div className="flex items-center justify-center h-full text-muted font-serif italic text-2xl">Module under development...</div>} />
          </Routes>
        </div>

        {/* Floating AI Chat */}
        <AIChat />
      </main>
    </div>
  );
};

export default App;
