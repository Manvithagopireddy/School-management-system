import { 
  Map as MapIcon, Navigation, BookOpen, 
  Search, Target, Activity, Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { API_BASE_URL } from '@/config/api';

const CampusAI = () => {
  const [start, setStart] = useState('Main Block');
  const [end, setEnd] = useState('Canteen');
  const [pathResult, setPathResult] = useState<any>(null);
  const [learningPath, setLearningPath] = useState<string[]>([]);
  const [subject, setSubject] = useState('Mathematics');
  const [loadingPath, setLoadingPath] = useState(false);
  const [loadingLearn, setLoadingLearn] = useState(false);

  const findShortestPath = () => {
    setLoadingPath(true);
    fetch(`${API_BASE_URL}/campus/shortest-path?start=${start}&end=${end}`)
      .then(res => res.json())
      .then(data => { setPathResult(data); setLoadingPath(false); })
      .catch(err => { console.error(err); setLoadingPath(false); });
  };

  const findLearningPath = () => {
    setLoadingLearn(true);
    fetch(`${API_BASE_URL}/learning-path/${subject}`)
      .then(res => res.json())
      .then(data => { setLearningPath(data); setLoadingLearn(false); })
      .catch(err => { console.error(err); setLoadingLearn(false); });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black font-serif tracking-tight text-white">Campus Intelligence</h2>
        <p className="text-muted font-medium">Advanced algorithms and DSA-powered school services.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shortest Path - Dijkstra */}
        <div className="card-nexus p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Navigation size={22} />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">Campus Navigator (Dijkstra)</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Using Dijkstra's algorithm to calculate the most efficient route between buildings for students with tight schedules.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-muted tracking-widest block mb-2">Start Building</label>
              <select 
                value={start} 
                onChange={e => setStart(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50"
              >
                {['Main Block', 'Library', 'Lab A', 'Science Block', 'Canteen'].map(b => <option key={b} value={b} className="bg-navy">{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-muted tracking-widest block mb-2">Target Destination</label>
              <select 
                value={end} 
                onChange={e => setEnd(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50"
              >
                {['Main Block', 'Library', 'Lab A', 'Science Block', 'Canteen'].map(b => <option key={b} value={b} className="bg-navy">{b}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={findShortestPath}
            disabled={loadingPath}
            className="w-full py-4 bg-primary text-navy font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loadingPath ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            CALCULATE ROUTE
          </button>

          {pathResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-muted uppercase">Shortest Path Found</span>
                <span className="text-sm font-black text-primary">{pathResult.distance} Meters</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {pathResult.path.map((step: string, i: number) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-white">
                      {step}
                    </div>
                    {i < pathResult.path.length - 1 && <div className="w-4 h-[1px] bg-white/20"></div>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Learning Path - BFS */}
        <div className="card-nexus p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-400/20 text-teal-400 flex items-center justify-center">
              <BookOpen size={22} />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">Syllabus Dependency (BFS)</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Executing a Breadth-First Search on the subject dependency graph to determine the optimal learning sequence.
          </p>

          <div>
            <label className="text-[10px] font-black uppercase text-muted tracking-widest block mb-2">Select Target Subject</label>
            <select 
              value={subject} 
              onChange={e => setSubject(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-teal-400/50"
            >
              {['Mathematics', 'Physics', 'Chemistry'].map(s => <option key={s} value={s} className="bg-navy">{s}</option>)}
            </select>
          </div>

          <button 
            onClick={findLearningPath}
            disabled={loadingLearn}
            className="w-full py-4 bg-teal-400 text-navy font-black rounded-2xl shadow-xl shadow-teal-400/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loadingLearn ? <Loader2 size={20} className="animate-spin" /> : <Target size={20} />}
            MAP LEARNING PATH
          </button>

          {learningPath.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="mb-4">
                <span className="text-xs font-bold text-muted uppercase">Dependency Chain</span>
              </div>
              <div className="space-y-3">
                {learningPath.map((item, i) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center text-[10px] font-black border border-teal-400/20">
                      {i + 1}
                    </div>
                    <div className="text-sm font-bold text-white">{item}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusAI;
