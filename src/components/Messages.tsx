import { 
  MessageSquare, Search, Phone, 
  Video, Info, Send, Paperclip, 
  Image as ImageIcon, MoreVertical,
  CheckCheck, Clock, UserPlus, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const contacts = [
  { id: 1, name: 'Dr. Priya Nair', role: 'Mathematics Teacher', avatar: 'PN', status: 'Online', lastMsg: 'Arjun scored 92% in the mock test!', time: '12:45 PM', unread: 2, color: '#f5c842' },
  { id: 2, name: 'School Admin',   role: 'Administration',      avatar: 'AD', status: 'Last seen 2h ago', lastMsg: 'The fee receipt for April is generated.', time: '10:30 AM', unread: 0, color: '#2dd4bf' },
  { id: 3, name: 'Library Desk',   role: 'Resource Center',    avatar: 'LB', status: 'Online', lastMsg: 'The Calculus 12th Edition is now available.', time: 'Yesterday', unread: 0, color: '#a78bfa' },
  { id: 4, name: 'Principal Office', role: 'Management',       avatar: 'PO', status: 'Away', lastMsg: 'PTM scheduled for April 12th.', time: '2 days ago', unread: 0, color: '#fb7185' },
];

const Messages = () => {
  const [selected, setSelected] = useState(contacts[0]);
  const [msg, setMsg] = useState('');

  return (
    <div className="flex h-[calc(100vh-160px)] gap-6">
      {/* Sidebar - Contacts */}
      <div className="w-96 card-nexus p-0 flex flex-col overflow-hidden border-white/5 shadow-2xl">
         <div className="p-8 border-b border-white/5">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold font-serif">Communication Hub</h3>
               <button className="p-2.5 bg-white/5 rounded-xl text-primary hover:bg-primary/10 transition-all"><UserPlus size={18} /></button>
            </div>
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
               <input 
                 type="text" 
                 placeholder="Search conversations..." 
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all"
               />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto custom-scrollbar">
            {contacts.map(c => (
               <div 
                  key={c.id} 
                  onClick={() => setSelected(c)}
                  className={`flex items-center gap-4 p-6 cursor-pointer border-l-4 transition-all hover:bg-white/5 ${
                    selected.id === c.id ? 'bg-white/5 border-primary' : 'border-transparent'
                  }`}
               >
                  <div className="relative">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-lg shadow-inner border border-white/10" style={{ color: c.color }}>{c.avatar}</div>
                     {c.status === 'Online' && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-4 border-[#122040]"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-bold text-white truncate">{c.name}</p>
                        <p className="text-[10px] text-muted font-bold uppercase">{c.time}</p>
                     </div>
                     <div className="flex justify-between items-center">
                        <p className="text-[11px] text-muted truncate pr-4">{c.lastMsg}</p>
                        {c.unread > 0 && <span className="bg-primary text-navy text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">{c.unread}</span>}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 card-nexus p-0 flex flex-col overflow-hidden border-white/5 shadow-2xl">
         {/* Top Bar */}
         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
            <div className="flex items-center gap-4">
               <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-lg border border-white/10" style={{ color: selected.color }}>{selected.avatar}</div>
               <div>
                  <p className="text-sm font-bold text-white">{selected.name}</p>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{selected.status}</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-white transition-all"><Phone size={18} /></button>
               <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-white transition-all"><Video size={18} /></button>
               <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
               <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-white transition-all"><Info size={18} /></button>
            </div>
         </div>

         {/* Messages Container */}
         <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar bg-black/5">
            <div className="flex flex-col gap-2 max-w-[80%] self-start group">
               <div className="p-5 rounded-3xl rounded-tl-lg bg-white/5 border border-white/10 text-white leading-relaxed text-sm shadow-xl">
                  Hello! I've uploaded the performance reports for Arjun's Mathematics and Science modules. Please review them and let me know if you have any questions before the PTM.
               </div>
               <p className="px-2 text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                 10:15 AM <CheckCheck size={12} className="text-teal-400" />
               </p>
            </div>

            <div className="flex flex-col gap-2 max-w-[80%] self-end group items-end">
               <div className="p-5 rounded-3xl rounded-tr-lg bg-primary text-navy font-bold leading-relaxed text-sm shadow-xl shadow-primary/10">
                  Thank you, Dr. Priya! I'll go through them today. We are very happy with his progress.
               </div>
               <p className="px-2 text-[10px] font-black text-primary/60 uppercase tracking-widest flex items-center gap-2">
                 10:32 AM <CheckCheck size={12} />
               </p>
            </div>

            <div className="flex flex-col gap-2 max-w-[80%] self-start group">
               <div className="p-5 rounded-3xl rounded-tl-lg bg-white/5 border border-white/10 text-white leading-relaxed text-sm shadow-xl">
                  {selected.lastMsg}
               </div>
               <p className="px-2 text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                 {selected.time} <Clock size={12} />
               </p>
            </div>
         </div>

         {/* Input Box */}
         <div className="p-6 bg-white/2 border-t border-white/5">
            <div className="relative flex items-center gap-4">
               <div className="flex items-center gap-2">
                  <button className="p-3 bg-white/5 rounded-xl text-muted hover:text-primary transition-all"><Paperclip size={18} /></button>
                  <button className="p-3 bg-white/5 rounded-xl text-muted hover:text-teal-400 transition-all"><ImageIcon size={18} /></button>
               </div>
               <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Type your message here..." 
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all shadow-inner"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-navy rounded-xl shadow-lg hover:scale-105 transition-all">
                     <Send size={18} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Messages;
