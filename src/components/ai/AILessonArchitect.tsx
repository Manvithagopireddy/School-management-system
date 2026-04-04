import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, BookOpen, Presentation, 
  FileText, ClipboardList, Send,
  ArrowRight, CheckCircle2, Layout,
  Layers, Database, FileUp, Download,
  Target, GraduationCap
} from 'lucide-react';

const mockLessons = [
  { id: 1, title: 'Introduction to Quantum Mechanics', grade: 'Grade 10-A', status: 'Drafting', progress: 85, color: '#f5c842' },
  { id: 2, title: 'Cellular Respiration Deep Dive', grade: 'Grade 9-B', status: 'Ready', progress: 100, color: '#2dd4bf' },
  { id: 3, title: 'History of Industrialization', grade: 'Grade 8-A', status: 'Pending', progress: 0, color: '#a78bfa' },
];

const AILessonArchitect = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const startGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveStep(1);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-2 text-teal-400 font-black uppercase tracking-[0.2em] text-[10px]">
            <Sparkles size={14} /> Nexus Curriculum Engine
          </div>
          <h2 className="text-4xl font-black font-serif tracking-tight text-white">AI Lesson Architect</h2>
          <p className="text-muted font-medium italic">Automate lesson structure, <span className="text-teal-400 font-bold">Presentation Slides</span>, and <span className="text-teal-400 font-bold">Formative Assessments</span>.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-muted hover:text-white transition-all">Import Syllabus</button>
           <button className="px-6 py-3 bg-teal-400 text-navy rounded-2xl text-xs font-black shadow-lg shadow-teal-400/20 active:scale-95 transition-all">Create New Architect</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Main Creation Flow */}
        <div className="lg:col-span-2 flex flex-col gap-8">
           <div className="card-premium p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/5 rounded-full blur-3xl" />
              
              {!isGenerating && activeStep === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
                   <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 bg-teal-400/10 rounded-2xl flex items-center justify-center text-teal-400">
                         <Layers size={24} />
                      </div>
                      <h3 className="text-xl font-bold">New Lesson Blueprint</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Subject Area</label>
                         <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-teal-400/30 transition-all appearance-none cursor-pointer">
                            <option>Mathematics</option>
                            <option>Physics</option>
                            <option>Biology</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Target Excellence</label>
                         <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm text-white focus:outline-none focus:border-teal-400/30 transition-all cursor-pointer">
                            <option>Concept Mastery (L1-L3)</option>
                            <option>Advanced Synthesis (L4-L5)</option>
                         </select>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Topic / Narrative Focus</label>
                      <textarea 
                        placeholder="e.g., Cellular respiration's role in ATP production for Grade 12 Advanced..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-teal-400/30 transition-all min-h-[120px] resize-none"
                      />
                   </div>

                   <div className="flex gap-4">
                      <label className="flex-1 p-5 rounded-2xl border border-white/10 bg-white/3 flex items-center gap-4 hover:border-teal-400/30 cursor-pointer transition-all">
                         <div className="w-10 h-10 rounded-xl bg-teal-400/5 flex items-center justify-center text-teal-400"><Presentation size={20} /></div>
                         <div><p className="text-xs font-bold">Auto-Slides</p><p className="text-[9px] text-muted">Generate visual deck</p></div>
                         <input type="checkbox" defaultChecked className="ml-auto w-5 h-5 accent-teal-400" />
                      </label>
                      <label className="flex-1 p-5 rounded-2xl border border-white/10 bg-white/3 flex items-center gap-4 hover:border-teal-400/30 cursor-pointer transition-all">
                         <div className="w-10 h-10 rounded-xl bg-violet-400/5 flex items-center justify-center text-violet-400"><ClipboardList size={20} /></div>
                         <div><p className="text-xs font-bold">Formative Quiz</p><p className="text-[9px] text-muted">Instant assessment</p></div>
                         <input type="checkbox" defaultChecked className="ml-auto w-5 h-5 accent-violet-400" />
                      </label>
                   </div>

                   <button 
                     onClick={startGeneration}
                     className="w-full py-5 bg-teal-400 text-navy font-black text-base rounded-2xl shadow-xl shadow-teal-400/10 hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
                   >
                     🚀 Launch Architect Engine
                   </button>
                </motion.div>
              )}

              {isGenerating && (
                 <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-24 h-24 bg-teal-400/10 rounded-full flex items-center justify-center mb-8 relative">
                       <Sparkles size={40} className="text-teal-400 ai-pulse" />
                       <div className="absolute inset-0 border-2 border-teal-400/20 rounded-full animate-spin border-t-teal-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Architecting Blueprint...</h3>
                    <p className="text-xs text-muted max-w-[280px]">Analyzing curriculum alignment and generating visual storytelling components.</p>
                 </div>
              )}

              {activeStep === 1 && !isGenerating && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                   <div className="flex justify-between items-center bg-teal-400/10 p-4 rounded-2xl border border-teal-400/20">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-navy shadow-lg font-black italic">!</div>
                         <div><p className="text-xs font-black text-teal-400 uppercase tracking-widest">Blueprint Complete</p><p className="text-[10px] text-white/50 italic">Syllabus compliance: 100%</p></div>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-3 bg-white/5 rounded-xl hover:text-white text-muted hover:bg-white/10 transition-all"><Download size={18} /></button>
                         <button className="p-3 bg-teal-400 text-navy rounded-xl shadow-lg transition-all"><Send size={18} /></button>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="p-6 rounded-2xl bg-white/3 border border-white/5">
                         <p className="text-[10px] font-black uppercase text-teal-400 tracking-widest mb-4">Structure Preview</p>
                         <div className="space-y-3">
                            {[
                               { t: 'The Mitochondrion', m: '5m', s: 'Introduction and cellular context' },
                               { t: 'Structure & Matrix', m: '15m', s: 'Folding and ATP Synthase mechanics' },
                               { t: 'The Krebs cycle', m: '20m', s: 'Step-by-step enzymatic pathways' },
                            ].map(s => (
                              <div key={s.t} className="flex gap-4 p-3 rounded-xl border-l-[3px] border-teal-400/40 bg-white/2">
                                 <p className="text-[11px] font-mono font-bold text-muted w-10">{s.m}</p>
                                 <div className="flex-1"><p className="text-sm font-bold">{s.t}</p><p className="text-[10px] text-muted">{s.s}</p></div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="card-nexus p-5 bg-violet-500/5 border-violet-500/20">
                         <p className="text-[10px] font-black text-violet-400 uppercase mb-3">AI-Genned Quiz</p>
                         <p className="text-xs font-bold mb-4">12 Multi-Choice Questions generated for this lesson.</p>
                         <button className="text-[10px] font-black uppercase text-violet-400 hover:underline">Preview Quiz →</button>
                      </div>
                      <div className="card-nexus p-5 bg-amber-500/5 border-amber-500/20">
                         <p className="text-[10px] font-black text-amber-400 uppercase mb-3 text-primary">Slide Deck</p>
                         <p className="text-xs font-bold mb-4">8 Visual storytelling slides with diagrams.</p>
                         <button className="text-[10px] font-black uppercase text-amber-500 hover:underline text-primary">Open Slides →</button>
                      </div>
                   </div>
                </motion.div>
              )}
           </div>
        </div>

        {/* Saved Library Sidebar */}
        <div className="flex flex-col gap-8">
           <div className="card-nexus p-8">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-8">
                 <Layout size={20} className="text-teal-400" /> Recent Blueprints
              </h3>
              <div className="space-y-4">
                 {mockLessons.map(l => (
                   <div key={l.id} className="p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-teal-400/20 transition-all cursor-pointer group">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-bold group-hover:text-teal-400 transition-colors text-white">{l.title}</p>
                        <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full" style={{ width: `${l.progress}%`, backgroundColor: l.color }} />
                        </div>
                      </div>
                      <p className="text-[10px] text-muted font-bold tracking-widest uppercase">{l.grade} · {l.status}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full py-3 mt-6 border border-white/5 rounded-xl text-[10px] text-muted font-bold uppercase tracking-widest hover:text-white transition-all">View All Drafts</button>
           </div>

           <div className="card-premium p-8 bg-gradient-to-br from-teal-400/5 via-navy to-background">
              <h4 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
                 <Database size={18} className="text-teal-400" /> Syllabus Sync
              </h4>
              <p className="text-xs text-muted leading-relaxed mb-6 italic opacity-80">
                 "Your current architect is synced with the **NCERT Grade 12 Physics** curriculum guidelines (2025 Revision)."
              </p>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                 <CheckCircle2 size={16} className="text-teal-400" />
                 <p className="text-[10px] font-black text-white uppercase tracking-wider">Verified Compliance</p>
              </div>
           </div>
           
           <div className="p-8 rounded-[2rem] border-2 border-teal-400/20 bg-teal-400/5 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-400/10 flex items-center justify-center text-teal-400 mb-4 shadow-xl shadow-teal-400/5">
                 <Target size={28} />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Learning Target AI</h4>
              <p className="text-[11px] text-muted font-bold uppercase tracking-widest mb-6">Mastery Goal: 85% Class Avg</p>
              <button className="w-full py-4 bg-teal-400 text-navy font-black text-xs rounded-2xl shadow-lg shadow-teal-400/20 flex items-center justify-center gap-2">
                 Adjust Goals <ArrowRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AILessonArchitect;
