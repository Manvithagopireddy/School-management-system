import { 
  CreditCard, CheckCircle2, AlertCircle, 
  Download, Filter, Plus, ArrowRight,
  TrendingDown, TrendingUp, History
} from 'lucide-react';
import { motion } from 'motion/react';

const Fees = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black font-serif tracking-tight">Fee Payment Portal</h2>
          <p className="text-muted font-medium">Manage student financial accounts and tuition history.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-xs font-bold text-muted hover:text-white transition-all">
            <Filter size={16} /> Filter Record
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-primary text-navy px-6 py-2.5 rounded-2xl font-bold shadow-xl shadow-primary/20 text-sm"
          >
            <Plus size={20} />
            Quick Pay
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Outstanding Dues */}
        <div className="lg:col-span-2 card-nexus p-8">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
                <CreditCard className="text-rose-400" size={20} /> Outstanding Dues
              </h3>
              <span className="text-xs font-bold text-rose-400 bg-rose-400/10 px-3 py-1.5 rounded-full uppercase tracking-wider">₹1,700 Pending</span>
           </div>
           
           <div className="space-y-4">
             {[
               { id: 'F01', name: 'Transport Fee – April 2026', amount: '₹1,200', date: 'Due April 10, 2026', priority: 'High', color: '#fb7185' },
               { id: 'F02', name: 'Examination Fee – Term 2',  amount: '₹500',   date: 'Due April 15, 2026', priority: 'Medium', color: '#f5c842' },
             ].map(fee => (
               <div key={fee.id} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-all">
                       <AlertCircle size={22} style={{ color: fee.color }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{fee.name}</h4>
                      <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{fee.priority} Priority · {fee.date}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-lg font-black tracking-tighter" style={{ color: fee.color }}>{fee.amount}</p>
                    </div>
                    <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-white hover:bg-white/10 transition-all">
                       <ArrowRight size={18} />
                    </button>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Account Info */}
        <div className="card-nexus p-8 flex flex-col gap-8 bg-gradient-to-br from-indigo-900/40 to-transparent border-primary/20">
           <div className="text-center p-6 rounded-3xl bg-primary/5 border border-primary/10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border-2 border-primary/20 shadow-lg">
                 <CreditCard className="text-primary" size={28} />
              </div>
              <p className="text-2xl font-black text-white mb-1">₹68,000</p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Total Paid (2025-26)</p>
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <p className="text-xs font-bold text-muted">Annual Status</p>
                 <span className="text-[10px] font-black text-teal-400 uppercase">97% Cleared</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-teal-400 w-[97%] rounded-full shadow-[0_0_10px_#2dd4bf55]"></div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                 <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-2">Refunds</p>
                 <p className="text-sm font-bold text-white">₹0.00</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                 <p className="text-[10px] text-muted font-bold uppercase tracking-wider mb-2">Discounts</p>
                 <p className="text-sm font-bold text-teal-400">₹2,500</p>
              </div>
           </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="card-nexus p-8">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
           <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
             <History className="text-primary" size={20} /> Transaction History
           </h3>
           <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline">
             Download Full Statement <Download size={14} />
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Transaction ID</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Description</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Channel</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Date</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Amount</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: '#TRX-9283', desc: 'Tuition Fee – April 2026', chan: 'Net Banking', date: 'Apr 01, 2026', amt: '₹8,500', color: '#2dd4bf' },
                { id: '#TRX-8172', desc: 'Tuition Fee – March 2026', chan: 'Credit Card', date: 'Mar 02, 2026', amt: '₹8,500', color: '#2dd4bf' },
                { id: '#TRX-7034', desc: 'Annual Library Fee',      chan: 'UPI / GPay',   date: 'Feb 10, 2026', amt: '₹600',   color: '#2dd4bf' },
                { id: '#TRX-6921', desc: 'Activity Fee – Term 2',   chan: 'Net Banking', date: 'Feb 05, 2026', amt: '₹800',   color: '#2dd4bf' },
              ].map(txn => (
                <tr key={txn.id} className="hover:bg-white/5 transition-colors cursor-default">
                   <td className="py-5 font-mono text-xs font-bold text-muted">{txn.id}</td>
                   <td className="py-5">
                      <p className="text-sm font-bold text-white">{txn.desc}</p>
                   </td>
                   <td className="py-5">
                      <span className="text-[10px] font-bold text-muted px-2.5 py-1 rounded-lg border border-white/5 bg-white/2">{txn.chan}</span>
                   </td>
                   <td className="py-5 text-xs text-muted font-bold uppercase">{txn.date}</td>
                   <td className="py-5">
                      <p className="text-sm font-black tracking-tight" style={{ color: txn.color }}>{txn.amt}</p>
                   </td>
                   <td className="py-5">
                      <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-muted hover:text-primary transition-all">
                         <Download size={16} />
                      </button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fees;
